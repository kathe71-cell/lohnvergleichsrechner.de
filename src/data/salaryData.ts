export interface JobSalary {
  id: string;
  title: string;
  category: string;
  kldbCode: string;
  medianYear: number;
  p25Year: number;
  p75Year: number;
  minYear: number;
  maxYear: number;
  trendPercent: number;
  typicalEducation: string;
  shortDesc: string;
}

export interface StateFactor {
  code: string;
  name: string;
  factor: number; // 1.0 = Bundesschnitt
  medianYearAll: number;
  capital: string;
}

export const STATE_FACTORS: StateFactor[] = [
  { code: "BW", name: "Baden-Württemberg", factor: 1.075, medianYearAll: 47800, capital: "Stuttgart" },
  { code: "BY", name: "Bayern", factor: 1.065, medianYearAll: 47200, capital: "München" },
  { code: "BE", name: "Berlin", factor: 0.985, medianYearAll: 43800, capital: "Berlin" },
  { code: "BB", name: "Brandenburg", factor: 0.835, medianYearAll: 37100, capital: "Potsdam" },
  { code: "HB", name: "Bremen", factor: 0.995, medianYearAll: 44200, capital: "Bremen" },
  { code: "HH", name: "Hamburg", factor: 1.095, medianYearAll: 48600, capital: "Hamburg" },
  { code: "HE", name: "Hessen", factor: 1.080, medianYearAll: 48000, capital: "Wiesbaden" },
  { code: "MV", name: "Mecklenburg-Vorpommern", factor: 0.795, medianYearAll: 35400, capital: "Schwerin" },
  { code: "NI", name: "Niedersachsen", factor: 0.955, medianYearAll: 42500, capital: "Hannover" },
  { code: "NW", name: "Nordrhein-Westfalen", factor: 1.025, medianYearAll: 45600, capital: "Düsseldorf" },
  { code: "RP", name: "Rheinland-Pfalz", factor: 0.975, medianYearAll: 43400, capital: "Mainz" },
  { code: "SL", name: "Saarland", factor: 0.940, medianYearAll: 41800, capital: "Saarbrücken" },
  { code: "SN", name: "Sachsen", factor: 0.825, medianYearAll: 36700, capital: "Dresden" },
  { code: "ST", name: "Sachsen-Anhalt", factor: 0.815, medianYearAll: 36200, capital: "Magdeburg" },
  { code: "SH", name: "Schleswig-Holstein", factor: 0.945, medianYearAll: 42000, capital: "Kiel" },
  { code: "TH", name: "Thüringen", factor: 0.810, medianYearAll: 36000, capital: "Erfurt" }
];

export const EXPERIENCE_FACTORS: Record<string, { label: string; factor: number; desc: string }> = {
  junior: { label: "Berufseinsteiger (< 2 Jahre)", factor: 0.82, desc: "Grundlegendes Fachwissen, Einarbeitungsphase" },
  mid: { label: "2 bis 5 Jahre Erfahrung", factor: 1.0, desc: "Eigenständige Projektabwicklung, gefestigte Praxis" },
  senior: { label: "6 bis 10 Jahre Erfahrung", factor: 1.18, desc: "Tiefes Spezialwissen, Mentoring und Prozessverantwortung" },
  lead: { label: "Mehr als 10 Jahre / Senior Expert", factor: 1.34, desc: "Strategische Expertise, übergreifende Führung" },
  management: { label: "Teamleiter / Personalverantwortung", factor: 1.48, desc: "Direkte disziplinarische und budgetäre Führung" }
};

export const COMPANY_SIZE_FACTORS: Record<string, { label: string; factor: number }> = {
  small: { label: "1 - 20 Mitarbeiter (Kleinbetrieb)", factor: 0.88 },
  medium: { label: "21 - 250 Mitarbeiter (Mittelstand)", factor: 0.98 },
  large: { label: "251 - 1.000 Mitarbeiter (Gehobener Mittelstand)", factor: 1.08 },
  enterprise: { label: "Über 1.000 Mitarbeiter (Konzern)", factor: 1.22 }
};

export const EDUCATION_FACTORS: Record<string, { label: string; factor: number }> = {
  ausbildung: { label: "Duale Berufsausbildung / Gesellenbrief", factor: 0.92 },
  meister: { label: "Fachwirt / Meister / Techniker", factor: 1.04 },
  bachelor: { label: "Bachelor-Abschluss (FH / Universität)", factor: 1.08 },
  master: { label: "Master / Diplom / Staatsexamen", factor: 1.22 },
  promoviert: { label: "Promotion (Dr. / Ph.D.)", factor: 1.38 }
};

export const SALARY_DATABASE: JobSalary[] = [
  // IT & Digitales
  {
    id: "softwareentwickler",
    title: "Softwareentwickler / Software Engineer",
    category: "IT & Digitales",
    kldbCode: "43124",
    medianYear: 62400,
    p25Year: 51200,
    p75Year: 75800,
    minYear: 44000,
    maxYear: 98000,
    trendPercent: 4.8,
    typicalEducation: "Informatik-Studium oder Fachinformatiker AE",
    shortDesc: "Konzeption, Entwicklung und Wartung von Softwareanwendungen, Cloud-Architekturen und Schnittstellen."
  },
  {
    id: "data-scientist",
    title: "Data Scientist / Machine Learning Engineer",
    category: "IT & Digitales",
    kldbCode: "43134",
    medianYear: 68500,
    p25Year: 56000,
    p75Year: 83200,
    minYear: 48000,
    maxYear: 105000,
    trendPercent: 6.2,
    typicalEducation: "Master/Promotion Informatik, Mathematik oder Data Science",
    shortDesc: "Modellierung statistischer Algorithmen, Predictive Analytics und Training neuronaler Netze."
  },
  {
    id: "it-systemadministrator",
    title: "IT-Systemadministrator / DevOps Engineer",
    category: "IT & Digitales",
    kldbCode: "43113",
    medianYear: 53800,
    p25Year: 44200,
    p75Year: 64500,
    minYear: 38000,
    maxYear: 82000,
    trendPercent: 3.9,
    typicalEducation: "Fachinformatiker Systemintegration oder Wirtschaftsinformatik",
    shortDesc: "Administration hybrider IT-Infrastrukturen, CI/CD-Pipelines, Monitoring und Netzwerksicherheit."
  },
  {
    id: "cyber-security-analyst",
    title: "Cyber Security Analyst / Information Security Manager",
    category: "IT & Digitales",
    kldbCode: "43144",
    medianYear: 71200,
    p25Year: 58500,
    p75Year: 86900,
    minYear: 49000,
    maxYear: 112000,
    trendPercent: 7.1,
    typicalEducation: "IT-Sicherheit / Informatik Studium",
    shortDesc: "Identifikation von IT-Schwachstellen, Vorfallreaktion (SOC), Pen-Testing und ISO 27001-Audits."
  },
  {
    id: "product-owner",
    title: "Product Owner / Product Manager",
    category: "IT & Digitales",
    kldbCode: "43214",
    medianYear: 65800,
    p25Year: 54000,
    p75Year: 79500,
    minYear: 45000,
    maxYear: 99000,
    trendPercent: 4.5,
    typicalEducation: "Wirtschaftswissenschaften oder Wirtschaftsinformatik",
    shortDesc: "Verantwortung für Produkt-Backlog, Sprint-Priorisierung und Stakeholder-Alignment in agilen Teams."
  },

  // Ingenieurwesen & Technik
  {
    id: "maschinenbauingenieur",
    title: "Maschinenbauingenieur",
    category: "Ingenieurwesen & Technik",
    kldbCode: "25114",
    medianYear: 64200,
    p25Year: 52800,
    p75Year: 77400,
    minYear: 45000,
    maxYear: 96000,
    trendPercent: 3.4,
    typicalEducation: "B.Sc. / M.Sc. Maschinenbau",
    shortDesc: "Auslegung, Konstruktion und Simulation von mechanischen Baugruppen, Antrieben und Fertigungsanlagen."
  },
  {
    id: "elektroingenieur",
    title: "Elektroingenieur / Hardwareentwickler",
    category: "Ingenieurwesen & Technik",
    kldbCode: "25124",
    medianYear: 66800,
    p25Year: 54500,
    p75Year: 80900,
    minYear: 47000,
    maxYear: 99000,
    trendPercent: 4.1,
    typicalEducation: "B.Sc. / M.Sc. Elektrotechnik",
    shortDesc: "Entwicklung elektronischer Schaltungen, Leiterplatten-Design, EMV-Prüfung und Leistungselektronik."
  },
  {
    id: "wirtschaftsingenieur",
    title: "Wirtschaftsingenieur",
    category: "Ingenieurwesen & Technik",
    kldbCode: "25104",
    medianYear: 65100,
    p25Year: 53200,
    p75Year: 78900,
    minYear: 46000,
    maxYear: 98000,
    trendPercent: 3.8,
    typicalEducation: "Wirtschaftsingenieurwesen Studium",
    shortDesc: "Optimierung technischer und betriebswirtschaftlicher Schnittstellen in Produktion, Logistik und Einkauf."
  },
  {
    id: "qualitaetsingenieur",
    title: "Qualitätsingenieur / QM-Beauftragter",
    category: "Ingenieurwesen & Technik",
    kldbCode: "27304",
    medianYear: 59400,
    p25Year: 49000,
    p75Year: 71200,
    minYear: 42000,
    maxYear: 88000,
    trendPercent: 3.2,
    typicalEducation: "Ingenieurstudium oder Techniker mit QM-Zertifikat",
    shortDesc: "Sicherung von Qualitätsstandards nach ISO 9001 / IATF 16949, FMEA-Analysen und Reklamationsmanagement."
  },

  // Finanzen, Recht & Controlling
  {
    id: "controller",
    title: "Controller / Financial Analyst",
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71524",
    medianYear: 61800,
    p25Year: 50400,
    p75Year: 74900,
    minYear: 43000,
    maxYear: 94000,
    trendPercent: 3.7,
    typicalEducation: "Betriebswirtschaftslehre (Schwerpunkt Controlling/Finanzen)",
    shortDesc: "Budgetplanung, Soll-Ist-Vergleiche, Liquiditätssteuerung und Erstellung von Management-Berichten."
  },
  {
    id: "buchhalter",
    title: "Finanzbuchhalter / Bilanzbuchhalter",
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71513",
    medianYear: 48600,
    p25Year: 40200,
    p75Year: 58900,
    minYear: 34000,
    maxYear: 74000,
    trendPercent: 3.5,
    typicalEducation: "Kaufmännische Ausbildung mit IHK-Bilanzbuchhalter",
    shortDesc: "Hauptbuchhaltung, Monats- und Jahresabschlüsse nach HGB/IFRS sowie Umsatzsteuervoranmeldungen."
  },
  {
    id: "wirtschaftspruefer",
    title: "Wirtschaftsprüfer / Audit Manager",
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71534",
    medianYear: 89400,
    p25Year: 71000,
    p75Year: 112000,
    minYear: 58000,
    maxYear: 145000,
    trendPercent: 4.2,
    typicalEducation: "Wirtschaftsprüfer-Examen (WP-Examen)",
    shortDesc: "Gesetzliche Jahresabschlussprüfungen von Kapitalgesellschaften, Sonderprüfungen und Gutachten."
  },
  {
    id: "unternehmensjurist",
    title: "Volljurist / Syndikusrechtsanwalt",
    category: "Finanzen, Recht & Controlling",
    kldbCode: "73114",
    medianYear: 84600,
    p25Year: 66500,
    p75Year: 108000,
    minYear: 54000,
    maxYear: 140000,
    trendPercent: 3.9,
    typicalEducation: "1. & 2. Juristisches Staatsexamen",
    shortDesc: "Vertragsgestaltung, gesellschaftsrechtliche Beratung, Compliance und Vertretung in Rechtsstreitigkeiten."
  },

  // Medizin, Pflege & Gesundheit
  {
    id: "assistenzarzt",
    title: "Assistenzarzt (Krankenhaus)",
    category: "Medizin & Gesundheit",
    kldbCode: "81414",
    medianYear: 72800,
    p25Year: 61500,
    p75Year: 84900,
    minYear: 55000,
    maxYear: 98000,
    trendPercent: 4.4,
    typicalEducation: "Medizinstudium & Approbation",
    shortDesc: "Stationäre Patientenversorgung, Stationsarbeit und Nachtdienste im Rahmen der Facharztweiterbildung (TV-Ärzte)."
  },
  {
    id: "oberarzt",
    title: "Oberarzt",
    category: "Medizin & Gesundheit",
    kldbCode: "81424",
    medianYear: 124500,
    p25Year: 104000,
    p75Year: 148000,
    minYear: 95000,
    maxYear: 195000,
    trendPercent: 3.6,
    typicalEducation: "Facharztanerkennung & langjährige Klinikerfahrung",
    shortDesc: "Fachliche Leitung eines Teilbereichs im Krankenhaus, Durchführung komplexer Eingriffe und Rufbereitschaften."
  },
  {
    id: "gesundheits-und-krankenpfleger",
    title: "Pflegefachkraft / Krankenpfleger",
    category: "Medizin & Gesundheit",
    kldbCode: "81312",
    medianYear: 43200,
    p25Year: 36800,
    p75Year: 51200,
    minYear: 32000,
    maxYear: 62000,
    trendPercent: 5.1,
    typicalEducation: "3-jährige Ausbildung zur Pflegefachfrau / zum Pflegefachmann",
    shortDesc: "Grund- und Behandlungspflege, Medikamentengabe, Wundversorgung und Dokumentation im Schichtdienst (TVöD-P)."
  },
  {
    id: "physiotherapeut",
    title: "Physiotherapeut",
    category: "Medizin & Gesundheit",
    kldbCode: "81712",
    medianYear: 34800,
    p25Year: 29500,
    p75Year: 41200,
    minYear: 26000,
    maxYear: 52000,
    trendPercent: 4.2,
    typicalEducation: "Ausbildung oder Bachelor Physiotherapie",
    shortDesc: "Rehabilitative Bewegungstherapie, manuelle Lymphdrainage und Präventionsbehandlung."
  },

  // Handwerk, Industrie & Bau
  {
    id: "elektriker",
    title: "Elektroniker für Energie- und Gebäudetechnik",
    category: "Handwerk & Bau",
    kldbCode: "26252",
    medianYear: 41600,
    p25Year: 35100,
    p75Year: 49400,
    minYear: 30000,
    maxYear: 61000,
    trendPercent: 4.6,
    typicalEducation: "Ausbildung Elektroniker Gebäude- & Energietechnik",
    shortDesc: "Installation elektrischer Anlagen, Schaltschrankbau, PV-Systeme und Wallboxen in Gewerbe und Wohnbau."
  },
  {
    id: "anlagenmechaniker-shk",
    title: "Anlagenmechaniker SHK (Sanitär, Heizung, Klima)",
    category: "Handwerk & Bau",
    kldbCode: "34212",
    medianYear: 42800,
    p25Year: 36200,
    p75Year: 50800,
    minYear: 31000,
    maxYear: 63000,
    trendPercent: 5.4,
    typicalEducation: "Ausbildung Anlagenmechaniker SHK",
    shortDesc: "Installation moderner Wärmepumpen, Gas- und Pelletheizungen sowie Sanitärsysteme nach GEG-Standard."
  },
  {
    id: "mechatroniker",
    title: "Mechatroniker / Industriemechaniker",
    category: "Handwerk & Bau",
    kldbCode: "27212",
    medianYear: 45200,
    p25Year: 38400,
    p75Year: 53600,
    minYear: 33000,
    maxYear: 66000,
    trendPercent: 3.8,
    typicalEducation: "Ausbildung Mechatroniker",
    shortDesc: "Instandhaltung, Programmierung und Reparatur komplexer Produktionsstraßen und Roboteranlagen."
  },
  {
    id: "bauingenieur",
    title: "Bauingenieur / Bauleiter",
    category: "Handwerk & Bau",
    kldbCode: "31114",
    medianYear: 58900,
    p25Year: 48500,
    p75Year: 71500,
    minYear: 41000,
    maxYear: 92000,
    trendPercent: 3.9,
    typicalEducation: "B.Eng. / M.Eng. Bauingenieurwesen",
    shortDesc: "Koordination von Hoch- und Tiefbauprojekten, statische Berechnungen, Abrechnung und Bauüberwachung nach VOB."
  },

  // Marketing, Vertrieb & Vertriebsmanagement
  {
    id: "key-account-manager",
    title: "Key Account Manager / B2B-Vertrieb",
    category: "Vertrieb & Marketing",
    kldbCode: "61114",
    medianYear: 67400,
    p25Year: 53000,
    p75Year: 86500,
    minYear: 42000,
    maxYear: 125000,
    trendPercent: 4.0,
    typicalEducation: "Kaufmännische Ausbildung oder Studium mit Vertriebsfokus",
    shortDesc: "Betreuung von Großkunden, Verhandlung mehrjähriger Rahmenverträge inklusive Provisions- und Bonusanteilen."
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager / Online Marketing Manager",
    category: "Vertrieb & Marketing",
    kldbCode: "92114",
    medianYear: 49800,
    p25Year: 41200,
    p75Year: 61500,
    minYear: 35000,
    maxYear: 78000,
    trendPercent: 3.5,
    typicalEducation: "Studium Marketing / Medienwissenschaften oder Ausbildung",
    shortDesc: "Steuerung von Performance-Marketing-Kampagnen (SEA/SEO), Social Media, Branding und Budgetallokation."
  },
  {
    id: "vertriebsleiter",
    title: "Vertriebsleiter / Head of Sales",
    category: "Vertrieb & Marketing",
    kldbCode: "61124",
    medianYear: 96800,
    p25Year: 76000,
    p75Year: 128000,
    minYear: 62000,
    maxYear: 175000,
    trendPercent: 4.3,
    typicalEducation: "Wirtschaftsstudium mit langjähriger Führungserfahrung",
    shortDesc: "Disziplinarische Leitung der Vertriebsorganisation, Go-to-Market-Strategien und Umsatzverantwortung."
  },

  // Bildung, Pädagogik & Soziales
  {
    id: "gymnasiallehrer",
    title: "Gymnasiallehrer (A13 / E13)",
    category: "Bildung & Soziales",
    kldbCode: "84124",
    medianYear: 58800,
    p25Year: 51200,
    p75Year: 66400,
    minYear: 46000,
    maxYear: 78000,
    trendPercent: 3.1,
    typicalEducation: "Lehramtsstudium & 2. Staatsexamen (Referendariat)",
    shortDesc: "Unterricht in der Sekundarstufe I & II, Vorbereitung auf das Abitur nach Landesbesoldungsgesetzen (A13)."
  },
  {
    id: "erzieher",
    title: "Erzieher / Pädagogische Fachkraft",
    category: "Bildung & Soziales",
    kldbCode: "83112",
    medianYear: 41800,
    p25Year: 35600,
    p75Year: 48200,
    minYear: 31000,
    maxYear: 56000,
    trendPercent: 4.9,
    typicalEducation: "Fachschulausbildung zum staatlich anerkannten Erzieher",
    shortDesc: "Frühkindliche Bildung, Entwicklungsdokumentation und Elternarbeit in Kindertagesstätten (TVöD SuE S 8a)."
  },
  {
    id: "sozialarbeiter",
    title: "Sozialarbeiter / Sozialpädagoge (B.A.)",
    category: "Bildung & Soziales",
    kldbCode: "83124",
    medianYear: 46400,
    p25Year: 39500,
    p75Year: 53800,
    minYear: 34000,
    maxYear: 64000,
    trendPercent: 4.1,
    typicalEducation: "B.A. Soziale Arbeit & staatliche Anerkennung",
    shortDesc: "Beratung von Hilfebedürftigen, Jugendhilfe, Bewährungshilfe und Eingliederungsmanagement (TVöD SuE S 11b/S 12)."
  },

  // Logistik, Transport & Einkauf
  {
    id: "berufskraftfahrer",
    title: "Berufskraftfahrer (LKW-Fern- & Nahverkehr)",
    category: "Logistik & Transport",
    kldbCode: "52122",
    medianYear: 35600,
    p25Year: 30200,
    p75Year: 42100,
    minYear: 26000,
    maxYear: 51000,
    trendPercent: 4.7,
    typicalEducation: "Ausbildung Berufskraftfahrer oder Führerschein CE mit BKrFQG",
    shortDesc: "Warentransport im Nah- und Fernverkehr, Ladungssicherung, Lenk- und Ruhezeiten sowie Spesenabrechnung."
  },
  {
    id: "einkaufsleiter",
    title: "Strategischer Einkäufer / Einkaufleiter",
    category: "Logistik & Transport",
    kldbCode: "71314",
    medianYear: 67200,
    p25Year: 54100,
    p75Year: 84200,
    minYear: 44000,
    maxYear: 110000,
    trendPercent: 3.6,
    typicalEducation: "Betriebswirtschaftslehre oder Wirtschaftsingenieurwesen",
    shortDesc: "Lieferantenmanagement, globale Ausschreibungen, Preisverhandlungen und Risikomanagement in Lieferketten."
  },
  {
    id: "fachkraft-lagerlogistik",
    title: "Fachkraft für Lagerlogistik",
    category: "Logistik & Transport",
    kldbCode: "51312",
    medianYear: 36200,
    p25Year: 30800,
    p75Year: 42900,
    minYear: 26500,
    maxYear: 51000,
    trendPercent: 3.9,
    typicalEducation: "Duale Ausbildung Fachkraft für Lagerlogistik",
    shortDesc: "Wareneingangsprüfung, Kommissionierung, Inventur und Steuerung automatisierter Hochregallager."
  }
];

export interface CalculationResult {
  job: JobSalary;
  state: StateFactor;
  experience: { label: string; factor: number; desc: string };
  companySize: { label: string; factor: number };
  education: { label: string; factor: number };
  weeklyHours: number;
  userYearlyGross?: number;
  benchmarkMedianYear: number;
  benchmarkP25Year: number;
  benchmarkP75Year: number;
  benchmarkMedianMonth: number;
  benchmarkHourly: number;
  differenceToMedian?: number;
  differencePercent?: number;
  percentileRank?: number;
  approxNetMonthTaxClass1: number;
  approxNetMonthTaxClass3: number;
}

export function calculateSalaryBenchmark(params: {
  jobId: string;
  stateCode: string;
  experienceKey: string;
  companySizeKey: string;
  educationKey: string;
  weeklyHours?: number;
  userYearlyGross?: number;
}): CalculationResult {
  const job = SALARY_DATABASE.find((j) => j.id === params.jobId) || SALARY_DATABASE[0];
  const state = STATE_FACTORS.find((s) => s.code === params.stateCode) || STATE_FACTORS[0];
  const experience = EXPERIENCE_FACTORS[params.experienceKey] || EXPERIENCE_FACTORS.mid;
  const companySize = COMPANY_SIZE_FACTORS[params.companySizeKey] || COMPANY_SIZE_FACTORS.medium;
  const education = EDUCATION_FACTORS[params.educationKey] || EDUCATION_FACTORS.ausbildung;
  const weeklyHours = params.weeklyHours || 40;

  // Combined multiplier
  const combinedFactor = state.factor * experience.factor * companySize.factor * education.factor;
  const hoursRatio = weeklyHours / 40;

  const benchmarkMedianYear = Math.round(job.medianYear * combinedFactor * hoursRatio);
  const benchmarkP25Year = Math.round(job.p25Year * combinedFactor * hoursRatio);
  const benchmarkP75Year = Math.round(job.p75Year * combinedFactor * hoursRatio);
  const benchmarkMedianMonth = Math.round(benchmarkMedianYear / 12);
  const benchmarkHourly = Number((benchmarkMedianYear / (weeklyHours * 52)).toFixed(2));

  let differenceToMedian: number | undefined;
  let differencePercent: number | undefined;
  let percentileRank: number | undefined;

  if (params.userYearlyGross && params.userYearlyGross > 0) {
    differenceToMedian = params.userYearlyGross - benchmarkMedianYear;
    differencePercent = Number(((differenceToMedian / benchmarkMedianYear) * 100).toFixed(1));

    // Approximate percentile using normal curve fit around p25 and p75
    if (params.userYearlyGross <= benchmarkP25Year) {
      const ratio = params.userYearlyGross / benchmarkP25Year;
      percentileRank = Math.max(5, Math.min(25, Math.round(ratio * 25)));
    } else if (params.userYearlyGross <= benchmarkMedianYear) {
      const ratio = (params.userYearlyGross - benchmarkP25Year) / (benchmarkMedianYear - benchmarkP25Year);
      percentileRank = Math.round(25 + ratio * 25);
    } else if (params.userYearlyGross <= benchmarkP75Year) {
      const ratio = (params.userYearlyGross - benchmarkMedianYear) / (benchmarkP75Year - benchmarkMedianYear);
      percentileRank = Math.round(50 + ratio * 25);
    } else {
      const ratio = Math.min(2, (params.userYearlyGross - benchmarkP75Year) / (benchmarkP75Year * 0.4));
      percentileRank = Math.min(99, Math.round(75 + ratio * 20));
    }
  }

  // Realistic simplified German tax & social contributions estimation for reference
  // Standard social insurance is ~20% employee share (RV 9.3%, KV 7.3% + 0.85% Zusatz, PV 2.3%, AV 1.3%)
  const grossMonthly = params.userYearlyGross ? Math.round(params.userYearlyGross / 12) : benchmarkMedianMonth;
  const socialContribution = grossMonthly * 0.205;
  
  // Tax Class 1 estimate (Single, without church tax)
  const taxableIncome1 = Math.max(0, grossMonthly - 1000); // Grundfreibetrag ~12k
  const taxEst1 = taxableIncome1 * (taxableIncome1 > 4000 ? 0.26 : 0.17);
  const approxNetMonthTaxClass1 = Math.round(Math.max(grossMonthly * 0.52, grossMonthly - socialContribution - taxEst1));

  // Tax Class 3 estimate (Married, single earner)
  const taxEst3 = taxableIncome1 * (taxableIncome1 > 4000 ? 0.15 : 0.08);
  const approxNetMonthTaxClass3 = Math.round(Math.max(grossMonthly * 0.62, grossMonthly - socialContribution - taxEst3));

  return {
    job,
    state,
    experience,
    companySize,
    education,
    weeklyHours,
    userYearlyGross: params.userYearlyGross,
    benchmarkMedianYear,
    benchmarkP25Year,
    benchmarkP75Year,
    benchmarkMedianMonth,
    benchmarkHourly,
    differenceToMedian,
    differencePercent,
    percentileRank,
    approxNetMonthTaxClass1,
    approxNetMonthTaxClass3
  };
}
