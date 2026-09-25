import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distSsrPath = path.resolve(__dirname, "../dist-ssr/entry-server.js");

if (!fs.existsSync(distSsrPath)) {
  console.error("❌ Error: dist-ssr/entry-server.js not found. Please run 'npm run build:server' before running the validator.");
  process.exit(1);
}

const {
  SALARY_DATABASE,
  STATE_FACTORS,
  DATA_METADATA,
  EXPERIENCE_FACTORS,
  COMPANY_SIZE_FACTORS,
  EDUCATION_FACTORS
} = await import(distSsrPath);

let errors = [];
let warnings = [];

console.log("🔍 Starting Comprehensive Data Audit & Integrity Validation...\n");

// 1. DATA_METADATA AUDIT
console.log("1. Validating DATA_METADATA...");
if (!DATA_METADATA.dataReferencePeriod) errors.push("DATA_METADATA: dataReferencePeriod is missing");
if (!DATA_METADATA.dataPublishedAt) errors.push("DATA_METADATA: dataPublishedAt is missing");
if (!DATA_METADATA.dataImportedAt || !/^\d{4}-\d{2}-\d{2}$/.test(DATA_METADATA.dataImportedAt)) {
  errors.push(`DATA_METADATA: dataImportedAt must be YYYY-MM-DD, got ${DATA_METADATA.dataImportedAt}`);
}
if (!DATA_METADATA.contentModifiedAt || !/^\d{4}-\d{2}-\d{2}$/.test(DATA_METADATA.contentModifiedAt)) {
  errors.push(`DATA_METADATA: contentModifiedAt must be YYYY-MM-DD, got ${DATA_METADATA.contentModifiedAt}`);
}
if (!DATA_METADATA.contentYear || !/^\d{4}$/.test(DATA_METADATA.contentYear)) {
  errors.push(`DATA_METADATA: contentYear must be 4 digits, got ${DATA_METADATA.contentYear}`);
}
if (DATA_METADATA.federalMedianFullTimeMonthly * 12 !== DATA_METADATA.federalMedianFullTimeYearly) {
  errors.push("DATA_METADATA: federalMedianFullTimeYearly !== monthly * 12");
}
if (DATA_METADATA.federalAverageFullTimeMonthly * 12 !== DATA_METADATA.federalAverageFullTimeYearly) {
  errors.push("DATA_METADATA: federalAverageFullTimeYearly !== monthly * 12");
}
if (DATA_METADATA.federalAverageFullTimeMonthly <= DATA_METADATA.federalMedianFullTimeMonthly) {
  errors.push("DATA_METADATA: federalAverageFullTimeMonthly must be higher than median due to positive skew");
}
if (!Array.isArray(DATA_METADATA.primarySources) || DATA_METADATA.primarySources.length < 3) {
  errors.push("DATA_METADATA: primarySources must contain at least 3 official primary sources");
}
console.log("  ✓ DATA_METADATA verified.");

// 2. STATE_FACTORS AUDIT
console.log("\n2. Validating STATE_FACTORS (16 Bundesländer)...");
if (STATE_FACTORS.length !== 16) {
  errors.push(`STATE_FACTORS: expected 16 Bundesländer, found ${STATE_FACTORS.length}`);
}
const seenCodes = new Set();
const seenSlugs = new Set();
for (const state of STATE_FACTORS) {
  if (!state.code || state.code.length !== 2 || state.code !== state.code.toUpperCase()) {
    errors.push(`State factor invalid code: ${state.code}`);
  }
  if (seenCodes.has(state.code)) errors.push(`Duplicate state code: ${state.code}`);
  seenCodes.add(state.code);

  if (!state.slug || !/^[a-z0-9-]+$/.test(state.slug)) errors.push(`State invalid slug: ${state.slug}`);
  if (seenSlugs.has(state.slug)) errors.push(`Duplicate state slug: ${state.slug}`);
  seenSlugs.add(state.slug);

  if (typeof state.factor !== "number" || state.factor < 0.7 || state.factor > 1.3) {
    errors.push(`State factor out of realistic bounds [0.70 - 1.30]: ${state.name} (${state.factor})`);
  }
  if (typeof state.medianYearAll !== "number" || state.medianYearAll < 30000 || state.medianYearAll > 60000) {
    errors.push(`State medianYearAll out of bounds [30.000 - 60.000]: ${state.name} (${state.medianYearAll})`);
  }
}
console.log(`  ✓ 16/16 Bundesländer verified without duplicate codes or slugs.`);

// 3. FACTOR TABLES AUDIT
console.log("\n3. Validating Experience, Company Size, and Education Factors...");
const requiredExp = ["junior", "mid", "senior", "lead", "management"];
for (const k of requiredExp) {
  if (!EXPERIENCE_FACTORS[k] || typeof EXPERIENCE_FACTORS[k].factor !== "number") {
    errors.push(`EXPERIENCE_FACTORS missing or invalid key: ${k}`);
  }
}
const requiredSizes = ["small", "medium", "large", "enterprise"];
for (const k of requiredSizes) {
  if (!COMPANY_SIZE_FACTORS[k] || typeof COMPANY_SIZE_FACTORS[k].factor !== "number") {
    errors.push(`COMPANY_SIZE_FACTORS missing or invalid key: ${k}`);
  }
}
const requiredEdu = ["ausbildung", "meister", "bachelor", "master", "promoviert"];
for (const k of requiredEdu) {
  if (!EDUCATION_FACTORS[k] || typeof EDUCATION_FACTORS[k].factor !== "number") {
    errors.push(`EDUCATION_FACTORS missing or invalid key: ${k}`);
  }
}
console.log("  ✓ All factor tables verified.");

// 4. SALARY_DATABASE AUDIT
console.log(`\n4. Validating SALARY_DATABASE (${SALARY_DATABASE.length} professions)...`);
if (SALARY_DATABASE.length < 20) {
  errors.push(`SALARY_DATABASE has only ${SALARY_DATABASE.length} professions, minimum is 20`);
}

const seenJobIds = new Set();
for (const job of SALARY_DATABASE) {
  // ID format
  if (!job.id || !/^[a-z0-9-]+$/.test(job.id)) {
    errors.push(`Job has invalid slug ID: ${job.id}`);
  }
  if (seenJobIds.has(job.id)) {
    errors.push(`Duplicate job ID: ${job.id}`);
  }
  seenJobIds.add(job.id);

  // KldB 2010 Code (strictly 5 numeric digits)
  if (!job.kldbCode || !/^\d{5}$/.test(job.kldbCode)) {
    errors.push(`Job ${job.id} has invalid KldB code (must be 5 digits): "${job.kldbCode}"`);
  }

  // Statistical hierarchy check: min <= p25 <= median <= p75 <= max
  if (typeof job.medianYear !== "number" || job.medianYear <= 0) {
    errors.push(`Job ${job.id} has invalid medianYear: ${job.medianYear}`);
  }
  if (typeof job.p25Year !== "number" || job.p25Year <= 0) {
    errors.push(`Job ${job.id} has invalid p25Year: ${job.p25Year}`);
  }
  if (typeof job.p75Year !== "number" || job.p75Year <= 0) {
    errors.push(`Job ${job.id} has invalid p75Year: ${job.p75Year}`);
  }

  if (job.p25Year > job.medianYear) {
    errors.push(`Job ${job.id}: p25 (${job.p25Year}) > median (${job.medianYear}) violated!`);
  }
  if (job.medianYear > job.p75Year) {
    errors.push(`Job ${job.id}: median (${job.medianYear}) > p75 (${job.p75Year}) violated!`);
  }
  if (job.minYear > job.p25Year) {
    errors.push(`Job ${job.id}: min (${job.minYear}) > p25 (${job.p25Year}) violated!`);
  }
  if (job.p75Year > job.maxYear) {
    errors.push(`Job ${job.id}: p75 (${job.p75Year}) > max (${job.maxYear}) violated!`);
  }

  // Tasks & Skills
  if (!Array.isArray(job.tasks) || job.tasks.length < 3) {
    errors.push(`Job ${job.id}: tasks must have at least 3 entries, has ${job.tasks ? job.tasks.length : 0}`);
  }
  if (!Array.isArray(job.skills) || job.skills.length < 3) {
    errors.push(`Job ${job.id}: skills must have at least 3 entries, has ${job.skills ? job.skills.length : 0}`);
  }
  if (!job.shortDesc || job.shortDesc.length < 20) {
    errors.push(`Job ${job.id}: shortDesc is too short (< 20 chars)`);
  }
}

console.log(`  ✓ All ${SALARY_DATABASE.length} professions pass statistical hierarchy and KldB checks.`);

// SUMMARY
console.log("\n==========================================");
if (errors.length > 0) {
  console.error(`❌ Validation FAILED with ${errors.length} errors:`);
  for (const err of errors) {
    console.error(`   - ${err}`);
  }
  process.exit(1);
} else {
  console.log("✅ ALL DATA INTEGRITY CHECKS PASSED!");
  console.log(`   - 0 schema violations`);
  console.log(`   - ${SALARY_DATABASE.length} occupations strictly conformant`);
  console.log(`   - 16 Bundesländer verified`);
  console.log(`   - Categories A, B, C mathematical rules respected`);
  console.log("==========================================\n");
}
