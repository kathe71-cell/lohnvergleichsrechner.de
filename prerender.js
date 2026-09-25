import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");
const { render, SALARY_DATABASE, STATE_FACTORS } = await import("./dist-ssr/entry-server.js");

// 1. Core pages
const coreRoutes = [
  {
    url: "/",
    title: "Lohnvergleichsrechner: Gehälter & Löhne in Deutschland vergleichen",
    desc: "Unabhängiges Vergleichsportal für Gehälter und Löhne in Deutschland. Interaktiver Rechner nach Destatis-Verdienststatistik & BA-Entgeltatlas."
  },
  {
    url: "/rechner",
    title: "Lohnvergleichsrechner: Interaktiver Gehaltsvergleich & Marktwert-Benchmark",
    desc: "Ermitteln Sie Ihren Marktwert im statistischen Median nach Beruf, Bundesland, Qualifikation und Unternehmensgröße auf Basis amtlicher Primärquellen."
  },
  {
    url: "/durchschnittsgehalt",
    title: "Durchschnittsgehalt Deutschland: Zahlen, Fakten & Median (Destatis)",
    desc: "Wie hoch ist das Durchschnittsgehalt in Deutschland? Alle amtlichen Destatis-Zahlen nach Bundesland, Branche, Bildungsabschluss und Median vs. Durchschnitt."
  },
  {
    url: "/gehalt",
    title: "Gehalt nach Beruf: Amtliche KldB-Entgelttabellen in Deutschland",
    desc: "Wie viel verdient man in welchem Beruf? Entdecken Sie verlässliche Mediane, Einstiegsgehälter und KldB-Aufgabenprofile auf Basis amtlicher Verdienststatistiken."
  },
  {
    url: "/entgeltatlas",
    title: "Entgeltatlas Deutschland: Amtliche KldB-Gehaltsstrukturen nach Beruf",
    desc: "Umfassende Gehaltsdatenbank nach KldB 2010 der Bundesagentur für Arbeit. Mediane, untere (P25) und obere (P75) Quartile sowie Bundesland-Vergleich."
  },
  {
    url: "/methodik",
    title: "Methodik & Datenquellen: Lohn- und Gehaltsvergleich nach Destatis",
    desc: "Transparenzbericht von lohnvergleichsrechner.de: Datenbasis (Destatis VSE & BA-Entgeltatlas), statistische Quartilsmethode und Grenzen der Modellrechnung."
  },
  {
    url: "/ratgeber",
    title: "Ratgeber Entgelttransparenz: Auskunftsanspruch (§ 10) & Gehaltsverhandlung",
    desc: "Juristischer und strategischer Leitfaden zu Auskunftsansprüchen nach § 10 EntgTranspG, EU-Richtlinie 2023/970 und Verhandlungsstrategien."
  },
  {
    url: "/glossar",
    title: "Glossar: Fachbegriffe zu Gehalt, Tarifrecht & Lohnvergleich",
    desc: "Wichtige Begriffe von Median, arithmetischem Mittel und KldB 2010 bis Sachbezug und Arbeitgeber-Brutto verständlich erklärt."
  },
  {
    url: "/faq",
    title: "Häufig gestellte Fragen (FAQ) zum Lohnvergleich & Datenquellen",
    desc: "Antworten auf die wichtigsten Fragen zu Datenherkunft (Destatis/BA), Berechnungsmethoden, Teilzeit und arbeitsrechtlichen Ansprüchen."
  },
  {
    url: "/rechner-embed",
    title: "Lohnvergleichsrechner Widget: Kostenloses Rechner-Embed für Webmaster",
    desc: "Kostenloses interaktives Rechner-Widget zur Einbettung in redaktionelle Websites, Fachportale und Kanzlei-Websites."
  },
  {
    url: "/impressum",
    title: "Impressum | lohnvergleichsrechner.de",
    desc: "Gesetzliche Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 2 MStV für lohnvergleichsrechner.de."
  },
  {
    url: "/datenschutz",
    title: "Datenschutzerklärung | lohnvergleichsrechner.de",
    desc: "Informationen zur Datenverarbeitung, DSGVO-Konformität, Zero-CDN und cookieloser Webanalyse auf lohnvergleichsrechner.de."
  }
];

// 2. Curated Profession Pages
const professionRoutes = SALARY_DATABASE.map(job => {
  const shortTitle = job.title.split(' / ')[0];
  return {
    url: `/gehalt/${job.id}`,
    title: `Was verdient ein/e ${shortTitle}? Gehalt & Median (KldB ${job.kldbCode})`,
    desc: `Aktueller Gehaltsreport für ${shortTitle}: Bundesweiter Median bei ${job.medianYear.toLocaleString('de-DE')} € p.a. Einstiegsgehalt, Erfahrungsstufen & Bundesland-Vergleich.`
  };
});

// 3. Curated High-Intent Profession & State Landingpages
// Selected top professions across key economic regions
const topFocusJobs = ["softwareentwickler", "erzieher", "gesundheits-und-krankenpfleger", "mechatroniker", "controller", "maschinenbauingenieur"];
const topFocusStates = ["BW", "BY", "HE", "NW", "BE", "SN"];

const regionalRoutes = [];
for (const jobId of topFocusJobs) {
  const job = SALARY_DATABASE.find(j => j.id === jobId);
  if (!job) continue;
  const shortTitle = job.title.split(' / ')[0];

  for (const stateCode of topFocusStates) {
    const state = STATE_FACTORS.find(s => s.code === stateCode);
    if (!state) continue;

    const regionalMedian = Math.round(job.medianYear * state.factor);
    const diff = Math.round((state.factor - 1) * 100);

    regionalRoutes.push({
      url: `/gehalt/${job.id}/${state.slug}`,
      title: `Gehalt als ${shortTitle} in ${state.name}: Regionaler Median & Auswertung`,
      desc: `Gehaltsvergleich für ${shortTitle} in ${state.name}: Regionaler Median liegt bei ${regionalMedian.toLocaleString('de-DE')} € p.a. (${diff >= 0 ? `+${diff} %` : `${diff} %`} im Vergleich zum Bundesschnitt).`
    });
  }
}

const allRoutes = [...coreRoutes, ...professionRoutes, ...regionalRoutes];

console.log(`Starting prerendering of ${allRoutes.length} curated SEO routes for lohnvergleichsrechner.de...`);

for (const route of allRoutes) {
  try {
    const { html: appHtml } = render(route.url);
    let rendered = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    rendered = rendered.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    rendered = rendered.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);
    
    const fullUrl = `https://lohnvergleichsrechner.de${route.url === "/" ? "" : route.url}`;
    rendered = rendered.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);
    rendered = rendered.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
    rendered = rendered.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.desc}" />`);
    rendered = rendered.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.desc}" />`);

    const filePath = route.url === "/" ? "dist/index.html" : `dist${route.url}/index.html`;
    const absolutePath = toAbsolute(filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, rendered);
    console.log(`  ✓ ${route.url} -> ${filePath} (${(rendered.length / 1024).toFixed(1)} kB)`);
  } catch (err) {
    console.error(`  ✗ Error prerendering ${route.url}:`, err);
    process.exit(1);
  }
}

// Generate updated sitemap.xml with all canonical routes
const today = "2026-09-25";
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => {
  let priority = "0.7";
  let changefreq = "monthly";
  if (r.url === "/") { priority = "1.0"; changefreq = "daily"; }
  else if (r.url === "/rechner" || r.url === "/durchschnittsgehalt" || r.url === "/gehalt") { priority = "0.9"; changefreq = "weekly"; }
  else if (r.url.startsWith("/gehalt/")) { priority = "0.8"; changefreq = "monthly"; }
  else if (r.url === "/impressum" || r.url === "/datenschutz") { priority = "0.3"; changefreq = "yearly"; }
  
  return `  <url>
    <loc>https://lohnvergleichsrechner.de${r.url === "/" ? "" : r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;

fs.writeFileSync(toAbsolute("dist/sitemap.xml"), sitemapXml);
fs.writeFileSync(toAbsolute("public/sitemap.xml"), sitemapXml);
console.log(`✓ Updated sitemap.xml with ${allRoutes.length} canonical URLs and lastmod ${today}`);

console.log("Prerendering complete!");
