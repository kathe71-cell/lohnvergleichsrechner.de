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
  tasks?: string[];
  skills?: string[];
}

export interface StateFactor {
  code: string;
  slug: string;
  name: string;
  factor: number; // 1.0 = Bundesschnitt (3.796 € / Monat gem. BA Entgeltstatistik)
  medianYearAll: number;
  medianMonthAll: number;
  capital: string;
}

export const DATA_METADATA = {
  version: "2024/2025",
  dataReferencePeriod: "2023 / 2024",
  dataPublishedAt: "Juni 2024 (BA Entgeltatlas) / August 2024 (BT-Drs. 20/12571) / Oktober 2024 (Destatis VSE)",
  dataImportedAt: "2026-09-25",
  contentModifiedAt: "2026-09-25",
  contentYear: "2026",
  lastUpdated: "September 2026",
  destatisSurvey: "Statistisches Bundesamt (Destatis) - Verdienststrukturerhebung (VSE) nach § 12 VStatG",
  baStats: "Bundesagentur für Arbeit - Statistik der sozialversicherungspflichtig Vollzeitbeschäftigten (KldB 2010 5-Steller, Stichtag 31.12.2023; BT-Drs. 20/12571)",
  bmasRef: "BMAS - Entgelttransparenzgesetz (§ 10 EntgTranspG) & Richtlinie (EU) 2023/970",
  // BA Entgeltstatistik (Kerngruppe Vollzeit, Stichtag 31.12.2023, 21.989.270 Beschäftigte, BT-Drs. 20/12571)
  baMedianFullTimeMonthly: 3796,
  baMedianFullTimeYearly: 45552,
  // Destatis VSE (Verdienststrukturerhebung, Wirtschaftsabschnitte B bis S, alle Betriebe)
  destatisMedianFullTimeMonthly: 4100,
  destatisMedianFullTimeYearly: 49200,
  destatisAverageFullTimeMonthly: 4479, // Destatis arithmetisches Mittel Vollzeit
  destatisAverageFullTimeYearly: 53748,
  // Bundesreferenz für Rechner & allgemeine Vergleiche
  federalMedianFullTimeMonthly: 4100,
  federalMedianFullTimeYearly: 49200,
  federalAverageFullTimeMonthly: 4479,
  federalAverageFullTimeYearly: 53748,
  primarySources: [
    {
      name: "Statistisches Bundesamt (Destatis)",
      title: "Verdienste und Arbeitskosten in Deutschland (VSE nach § 12 VStatG)",
      url: "https://www.destatis.de/DE/Themen/Arbeit/Verdienste/_inhalt.html"
    },
    {
      name: "Bundesagentur für Arbeit (BA)",
      title: "Entgeltatlas nach KldB 2010 & Entgeltstatistik (Stichtag 31.12.2023, BT-Drs. 20/12571)",
      url: "https://entgeltatlas.arbeitsagentur.de/"
    },
    {
      name: "Bundesministerium für Arbeit und Soziales (BMAS)",
      title: "Entgelttransparenz und gleiches Entgelt für gleiche Arbeit",
      url: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Entgelttransparenz/entgelttransparenz.html"
    }
  ]
};

export const STATE_FACTORS: StateFactor[] = [
  // Datenbasis: Statistik der Bundesagentur für Arbeit, Stichtag 31.12.2023, BT-Drs. 20/12571 Tabelle 8
  // Bundesschnitt Vollzeit-Kerngruppe = 3.796 €/Monat (45.552 €/Jahr). Faktor = Median Land / Median Bund
  { code: "HH", slug: "hamburg", name: "Hamburg", factor: 1.134, medianMonthAll: 4304, medianYearAll: 51648, capital: "Hamburg" },
  { code: "BW", slug: "baden-wuerttemberg", name: "Baden-Württemberg", factor: 1.089, medianMonthAll: 4134, medianYearAll: 49608, capital: "Stuttgart" },
  { code: "HE", slug: "hessen", name: "Hessen", factor: 1.077, medianMonthAll: 4087, medianYearAll: 49044, capital: "Wiesbaden" },
  { code: "BE", slug: "berlin", name: "Berlin", factor: 1.049, medianMonthAll: 3982, medianYearAll: 47784, capital: "Berlin" },
  { code: "BY", slug: "bayern", name: "Bayern", factor: 1.040, medianMonthAll: 3948, medianYearAll: 47376, capital: "München" },
  { code: "HB", slug: "bremen", name: "Bremen", factor: 1.038, medianMonthAll: 3942, medianYearAll: 47304, capital: "Bremen" },
  { code: "NW", slug: "nordrhein-westfalen", name: "Nordrhein-Westfalen", factor: 1.007, medianMonthAll: 3821, medianYearAll: 45852, capital: "Düsseldorf" },
  { code: "SL", slug: "saarland", name: "Saarland", factor: 0.993, medianMonthAll: 3770, medianYearAll: 45240, capital: "Saarbrücken" },
  { code: "RP", slug: "rheinland-pfalz", name: "Rheinland-Pfalz", factor: 0.977, medianMonthAll: 3707, medianYearAll: 44484, capital: "Mainz" },
  { code: "NI", slug: "niedersachsen", name: "Niedersachsen", factor: 0.956, medianMonthAll: 3627, medianYearAll: 43524, capital: "Hannover" },
  { code: "SH", slug: "schleswig-holstein", name: "Schleswig-Holstein", factor: 0.929, medianMonthAll: 3526, medianYearAll: 42312, capital: "Kiel" },
  { code: "SN", slug: "sachsen", name: "Sachsen", factor: 0.838, medianMonthAll: 3182, medianYearAll: 38184, capital: "Dresden" },
  { code: "BB", slug: "brandenburg", name: "Brandenburg", factor: 0.836, medianMonthAll: 3173, medianYearAll: 38076, capital: "Potsdam" },
  { code: "ST", slug: "sachsen-anhalt", name: "Sachsen-Anhalt", factor: 0.831, medianMonthAll: 3152, medianYearAll: 37824, capital: "Magdeburg" },
  { code: "TH", slug: "thueringen", name: "Thüringen", factor: 0.819, medianMonthAll: 3109, medianYearAll: 37308, capital: "Erfurt" },
  { code: "MV", slug: "mecklenburg-vorpommern", name: "Mecklenburg-Vorpommern", factor: 0.816, medianMonthAll: 3098, medianYearAll: 37176, capital: "Schwerin" }
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
    shortDesc: "Konzeption, Entwicklung und Wartung von Softwareanwendungen, Cloud-Architekturen und Schnittstellen.",
    tasks: [
      "Architekturdesign und Programmierung moderner Web-, Backend- und Cloud-Anwendungen",
      "Erstellung automatisierter Unit-, Integrations- und End-to-End-Tests",
      "Code Reviews und Mitwirkung an CI/CD-Deployment-Pipelines",
      "Refactoring von Legacy-Systemen und Optimierung von Datenbankabfragen"
    ],
    skills: ["TypeScript / JavaScript", "Python / Java / Go", "Docker & Kubernetes", "Cloud (AWS / Azure)", "SQL / NoSQL"]
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
    shortDesc: "Modellierung statistischer Algorithmen, Predictive Analytics und Training neuronaler Netze.",
    tasks: [
      "Bereinigung und statistische Aufbereitung strukturierter und unstrukturierter Massendaten",
      "Entwicklung prädiktiver Machine-Learning- und Deep-Learning-Modelle",
      "Deployment von ML-Pipelines in Produktionsumgebungen (MLOps)",
      "Übersetzung komplexer Datenanalysen in handlungsorientierte Business-Insights"
    ],
    skills: ["Python (pandas, scikit-learn)", "PyTorch / TensorFlow", "SQL & Big Data", "Statistik", "Data Warehousing"]
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
    shortDesc: "Administration hybrider IT-Infrastrukturen, CI/CD-Pipelines, Monitoring und Netzwerksicherheit.",
    tasks: [
      "Betrieb und Überwachung von Server-Infrastrukturen (Linux & Windows Server)",
      "Netzwerkadministration (VLAN, VPN, Firewall, DNS, DHCP)",
      "Automatisierung von Infrastrukturen mittels Ansible, Terraform oder Scripts",
      "Incident Management und 2nd/3rd-Level-Support bei Ausfällen"
    ],
    skills: ["Linux / Windows Server", "Netzwerktechnik", "Terraform / Ansible", "Active Directory", "Monitoring (Prometheus/Grafana)"]
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
    shortDesc: "Identifikation von IT-Schwachstellen, Vorfallreaktion (SOC), Pen-Testing und ISO 27001-Audits.",
    tasks: [
      "Analyse verdächtiger Netzwerkaktivitäten und Abwehr von Cyberangriffen im SOC",
      "Durchführung von Schwachstellen-Scans und Penetration Tests",
      "Erstellung von Sicherheitsrichtlinien und Notfallplänen nach BSI IT-Grundschutz",
      "Begleitung externer Audits und Zertifizierungen (ISO/IEC 27001)"
    ],
    skills: ["SIEM (Splunk, Elastic)", "Incident Response", "Penetration Testing", "BSI Grundschutz / ISO 27001", "Kryptographie"]
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
    shortDesc: "Verantwortung für Produkt-Backlog, Sprint-Priorisierung und Stakeholder-Alignment in agilen Teams.",
    tasks: [
      "Definition der Produktvision, Roadmap und Priorisierung des Product Backlogs",
      "Erstellung präziser User Stories mit klaren Akzeptanzkriterien",
      "Enge Abstimmung mit Entwicklerteams, UI/UX-Designern und dem Management",
      "Erfolgsmessung anhand von KPIs (Retention, Conversion, Churn, ROI)"
    ],
    skills: ["Scrum / Kanban / Agile", "Backlog Management (Jira)", "User Research", "Datenanalyse", "Stakeholder Management"]
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
    shortDesc: "Auslegung, Konstruktion und Simulation von mechanischen Baugruppen, Antrieben und Fertigungsanlagen.",
    tasks: [
      "3D-CAD-Konstruktion von Bauteilen und komplexen Maschinenbaugruppen",
      "Durchführung von FEM-Festigkeitsberechnungen und Strömungssimulationen",
      "Begleitung von Prototypenbau, Prüfstandsversuchen und Serienanlauf",
      "Erstellung technischer Dokumentationen nach Maschinenrichtlinie / CE-Norm"
    ],
    skills: ["CAD (SolidWorks, CATIA, Siemens NX)", "FEM-Simulation", "Werkstoffkunde", "Maschinendynamik", "Fertigungsverfahren"]
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
    shortDesc: "Entwicklung elektronischer Schaltungen, Leiterplatten-Design, EMV-Prüfung und Leistungselektronik.",
    tasks: [
      "Entwicklung analoger und digitaler Schaltungen für Steuergeräte und Leistungselektronik",
      "Layout-Erstellung für mehrlagige Leiterplatten (PCB Design)",
      "EMV-Messungen und Durchführung von Typ- und Umweltprüfungen",
      "Inbetriebnahme und Fehlersuche an Prüfständen mit Oszilloskopen und Logikanalysatoren"
    ],
    skills: ["Schaltungsentwurf (Altium Designer, Eagle)", "EMV-Prüfung", "Mikrocontroller (ARM, STM32)", "Messtechnik", "Leistungselektronik"]
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
    shortDesc: "Optimierung technischer und betriebswirtschaftlicher Schnittstellen in Produktion, Logistik und Einkauf.",
    tasks: [
      "Wirtschaftlichkeitsberechnungen für Produktionserweiterungen und Neuinvestitionen",
      "Prozessanalyse und Wertstromoptimierung in Fertigung und Supply Chain",
      "Technisches Lieferantenmanagement und Vertragsverhandlungen im Einkauf",
      "Leitung interdisziplinärer Projekte an der Schnittstelle von Technik und Finanzen"
    ],
    skills: ["Supply Chain Management", "Projektmanagement", "Produktionsplanung", "Kosten- und Leistungsrechnung", "Lean Manufacturing"]
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
    shortDesc: "Sicherung von Qualitätsstandards nach ISO 9001 / IATF 16949, FMEA-Analysen und Reklamationsmanagement.",
    tasks: [
      "Planung und Durchführung interner und externer Qualitätsaudits",
      "Erstellung von Risikoanalysen mittels Design- und Prozess-FMEA",
      "Bearbeitung von Kunden- und Lieferantenreklamationen (8D-Reports, Ishikawa)",
      "Statistische Prozessregelung (SPC) und kontinuierliche Fehlerminimierung"
    ],
    skills: ["ISO 9001 / IATF 16949", "FMEA", "8D-Report", "Auditierung", "Statistische Prozesslenkung (SPC)"]
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
    shortDesc: "Budgetplanung, Soll-Ist-Vergleiche, Liquiditätssteuerung und Erstellung von Management-Berichten.",
    tasks: [
      "Erstellung monatlicher Soll-Ist-Vergleiche und Abweichungsanalysen",
      "Koordination des jährlichen Budgetierungs- und Forecast-Prozesses",
      "Berechnung von Deckungsbeiträgen, Produktkalkulationen und Investitionsrechnungen",
      "Aufbereitung aussagekräftiger Dashboards für Geschäftsführung und Abteilungsleiter"
    ],
    skills: ["Financial Modeling", "SAP CO / FI", "Kostenrechnung", "Power BI / Tableau", "IFRS & HGB"]
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
    shortDesc: "Hauptbuchhaltung, Monats- und Jahresabschlüsse nach HGB/IFRS sowie Umsatzsteuervoranmeldungen.",
    tasks: [
      "Prüfung, Kontierung und Verbuchung laufender Geschäftsvorfälle",
      "Vorbereitung und Erstellung von Monats-, Quartals- und Jahresabschlüssen nach HGB",
      "Abwicklung des Zahlungsverkehrs, Mahnwesen und Kontenabstimmung",
      "Erstellung von Umsatzsteuervoranmeldungen und statistischen Meldungen"
    ],
    skills: ["DATEV / SAP FI", "HGB Rechnungslegung", "Steuerrecht", "Umsatzsteuer", "Bilanzierung"]
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
    shortDesc: "Gesetzliche Jahresabschlussprüfungen von Kapitalgesellschaften, Sonderprüfungen und Gutachten.",
    tasks: [
      "Leitung gesetzlicher und freiwilliger Jahresabschlussprüfungen",
      "Prüfung interner Kontrollsysteme (IKS) und Risikomanagementstrukturen",
      "Erstellung von Prüfungsberichten und Erteilung des Bestätigungsvermerks",
      "Fachliche Beratung bei Unternehmensbewertungen und Due-Diligence-Prozessen"
    ],
    skills: ["HGB & IFRS Prüfungsstandards", "IDW Prüfungsstandards", "Konzernrechnungslegung", "Due Diligence", "Compliance"]
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
    shortDesc: "Vertragsgestaltung, gesellschaftsrechtliche Beratung, Compliance und Vertretung in Rechtsstreitigkeiten.",
    tasks: [
      "Prüfung und Verhandlung nationaler und internationaler Wirtschaftsverträge",
      "Juristische Begleitung von Unternehmenstransaktionen und Umstrukturierungen",
      "Beratung der Fachbereiche in arbeitsrechtlichen, datenschutzrechtlichen und haftungsrechtlichen Fragen",
      "Koordination und Steuerung extern beauftragter Kanzleien bei Gerichtsprozessen"
    ],
    skills: ["Wirtschaftsrecht (BGB, HGB)", "Vertragsgestaltung", "Arbeitsrecht", "DSGVO / Compliance", "Verhandlungsführung"]
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
    shortDesc: "Stationäre Patientenversorgung, Stationsarbeit und Nachtdienste im Rahmen der Facharztweiterbildung (TV-Ärzte).",
    tasks: [
      "Aufnahme, Diagnostik und Therapie stationärer Patienten unter fachärztlicher Supervision",
      "Durchführung medizinischer Interventionen, Punktionen und Wundversorgungen",
      "Teilnahme an Bereitschafts- und Schichtdiensten in der Notaufnahme",
      "Führung der digitalen Patientenakte, Medikationspläne und Entlassbriefe"
    ],
    skills: ["Klinische Diagnostik", "Notfallmedizin", "TV-Ärzte Tarifrecht", "Pharmakotherapie", "Patientenkommunikation"]
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
    shortDesc: "Fachliche Leitung eines Teilbereichs im Krankenhaus, Durchführung komplexer Eingriffe und Rufbereitschaften.",
    tasks: [
      "Fachliche und organisatorische Leitung einer Station oder Abteilung",
      "Durchführung anspruchsvoller operativer und diagnostischer Eingriffe",
      "Anleitung und Weiterbildung der Assistenzärzte zum Facharzt",
      "Wirtschaftliche Steuerung des Bereichs nach DRG-Fallpauschalen"
    ],
    skills: ["Facharztkompetenz", "Operationsleitung", "Führungserfahrung", "Klinisches Risikomanagement", "DRG-Kodierung"]
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
    shortDesc: "Grund- und Behandlungspflege, Medikamentengabe, Wundversorgung und Dokumentation im Schichtdienst (TVöD-P).",
    tasks: [
      "Ganzheitliche Grund- und Behandlungspflege von Patienten",
      "Fachgerechte Verabreichung von Medikamenten und Infusionen nach ärztlicher Anordnung",
      "Versorgung akuter und chronischer Wunden nach modernen Pflegestandards",
      "Digitale Pflegedokumentation und Kommunikation mit Angehörigen und Ärzten"
    ],
    skills: ["Behandlungspflege", "TVöD-P / TV-L", "Wundmanagement", "Schichtdienstorganisation", "Notfallmaßnahmen"]
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
    shortDesc: "Rehabilitative Bewegungstherapie, manuelle Lymphdrainage und Präventionsbehandlung.",
    tasks: [
      "Befunderhebung und Erstellung individueller Therapiepläne",
      "Durchführung manueller Therapien, Krankengymnastik und Lymphdrainage",
      "Anleitung von Patienten zu eigenständigen Präventions- und Reha-Übungen",
      "Dokumentation von Behandlungsverläufen und Abrechnung nach Heilmittelkatalog"
    ],
    skills: ["Manuelle Therapie", "Krankengymnastik", "Heilmittel-Richtlinien", "Anatomie & Physiologie", "Rehabilitation"]
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
    shortDesc: "Installation elektrischer Anlagen, Schaltschrankbau, PV-Systeme und Wallboxen in Gewerbe und Wohnbau.",
    tasks: [
      "Verlegung von Leitungen und Installation elektrischer Verteiler",
      "Montage und Inbetriebnahme von PV-Anlagen, Speichern und Wärmepumpen-Stromversorgungen",
      "Prüfung elektrischer Anlagen nach DGUV Vorschrift 3 (DIN VDE 0100)",
      "Fehlersuche und Instandsetzung bei Stromausfällen und Störungen"
    ],
    skills: ["VDE-Vorschriften", "Gebäudeautomation (KNX)", "DGUV V3 Prüfung", "Schaltschrankbau", "Photovoltaik"]
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
    shortDesc: "Installation moderner Wärmepumpen, Gas- und Pelletheizungen sowie Sanitärsysteme nach GEG-Standard.",
    tasks: [
      "Installation und hydraulischer Abgleich von Wärmepumpen und modernen Heizsystemen",
      "Montage hochwertiger Sanitärinstallationen im Neubau und bei Altbausanierungen",
      "Wartung und Instandhaltung von Lüftungs- und Klimageräten",
      "Kundenberatung zur energetischen Sanierung und Fördermitteln nach dem GEG"
    ],
    skills: ["Wärmepumpentechnik", "Gebäudeenergiegesetz (GEG)", "Hydraulischer Abgleich", "Rohrleitungsbau", "Trinkwasserhygiene (VDI 6023)"]
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
    shortDesc: "Instandhaltung, Programmierung und Reparatur komplexer Produktionsstraßen und Roboteranlagen.",
    tasks: [
      "Aufbau, Verdrahtung und Justierung mechatronischer Baugruppen",
      "Wartung und präventive Instandhaltung automatisierter Fertigungsstraßen",
      "Fehlersuche an SPS-Steuerungen (Siemens S7 / TIA Portal) und Pneumatiksystemen",
      "Optimierung von Taktzeiten und Minimierung von Stillstandszeiten in der Industrie"
    ],
    skills: ["SPS-Programmierung (TIA Portal)", "Pneumatik & Hydraulik", "Sensorik & Aktorik", "Robotertechnik", "IG-Metall-Tarif"]
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
    shortDesc: "Koordination von Hoch- und Tiefbauprojekten, statische Berechnungen, Abrechnung und Bauüberwachung nach VOB.",
    tasks: [
      "Bauüberwachung hinsichtlich Terminen, Qualität und Arbeitssicherheit vor Ort",
      "Kostenkontrolle, Nachtragsmanagement und Rechnungsprüfung nach VOB/B",
      "Koordination von Nachunternehmern, Handwerkern und Fachingenieuren",
      "Erstellung von Ausschreibungen und Leistungsverzeichnissen"
    ],
    skills: ["VOB/B und HOAI", "Bauleitung", "Termin- & Kostenplanung", "Statik & Konstruktion", "BIM (Building Information Modeling)"]
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
    shortDesc: "Betreuung von Großkunden, Verhandlung mehrjähriger Rahmenverträge inklusive Provisions- und Bonusanteilen.",
    tasks: [
      "Strategische Betreuung und Weiterentwicklung von Top-Kunden (Bestandskunden)",
      "Verhandlung von Rahmenverträgen, Preiskonditionen und SLAs auf C-Level",
      "Markt- und Wettbewerbsanalysen zur Identifikation neuer Vertriebspotenziale",
      "Erstellung präziser Umsatz-Forecasts und Pipeline-Management im CRM"
    ],
    skills: ["B2B-Vertrieb", "Key Account Betreuung", "Verhandlungsführung", "CRM (Salesforce / HubSpot)", "Pipeline Management"]
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
    shortDesc: "Steuerung von Performance-Marketing-Kampagnen (SEA/SEO), Social Media, Branding und Budgetallokation.",
    tasks: [
      "Konzeption und Optimierung digitaler Werbekampagnen (Google Ads, Meta, LinkedIn)",
      "Suchmaschinenoptimierung (SEO) und Erstellung reichweitenstarker Inhalte",
      "Performance-Tracking, Conversion-Rate-Optimierung (CRO) und ROI-Monitoring",
      "Steuerung externer Agenturen, Freelancer und Budgetallokation"
    ],
    skills: ["Performance Marketing (SEA/SMA)", "SEO & Content Marketing", "Google Analytics 4", "Conversion Optimierung", "Brand Management"]
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
    shortDesc: "Disziplinarische Leitung der Vertriebsorganisation, Go-to-Market-Strategien und Umsatzverantwortung.",
    tasks: [
      "Disziplinarische Führung, Motivation und Coaching des gesamten Vertriebsteams",
      "Entwicklung und Umsetzung von Go-to-Market- und Expansionsstrategien",
      "Definition von Vertriebszielen, Provisionsmodellen und KPIs",
      "Direktes Sponsoring von strategischen Großabschlüssen"
    ],
    skills: ["Vertriebsstrategie", "Mitarbeiterführung", "Provisionssysteme", "Umsatzverantwortung", "Executive Reporting"]
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
    shortDesc: "Unterricht in der Sekundarstufe I & II, Vorbereitung auf das Abitur nach Landesbesoldungsgesetzen (A13).",
    tasks: [
      "Fachdidaktische Vorbereitung und Durchführung des Fachunterrichts",
      "Konzeption, Durchführung und Korrektur von Klausuren und Prüfungen",
      "Pädagogische Beratung von Schülern und Erziehungsberechtigten",
      "Mitwirkung an Konferenzen, Schulentwicklung und Studienfahrten"
    ],
    skills: ["Fachdidaktik", "Landesbesoldungsgesetz (A13)", "Pädagogik", "Klassenführung", "Konfliktmanagement"]
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
    shortDesc: "Frühkindliche Bildung, Entwicklungsdokumentation und Elternarbeit in Kindertagesstätten (TVöD SuE S 8a).",
    tasks: [
      "Pädagogische Betreuung und Förderung von Kindern im Elementarbereich",
      "Erstellung strukturierter Beobachtungs- und Entwicklungsdokumentationen",
      "Planung und Durchführung von Bildungsangeboten und Projekten",
      "Regelmäßige Entwicklungsgespräche mit Eltern nach dem Orientierungsplan"
    ],
    skills: ["Frühkindliche Bildung", "TVöD SuE (S 8a)", "Entwicklungsbeobachtung", "Elternarbeit", "Inklusion"]
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
    shortDesc: "Beratung von Hilfebedürftigen, Jugendhilfe, Bewährungshilfe und Eingliederungsmanagement (TVöD SuE S 11b/S 12).",
    tasks: [
      "Einzelfallhilfe und psychosoziale Beratung von Klienten in Krisensituationen",
      "Erstellung von Hilfe- und Förderplänen in Kooperation mit Kostenträgern",
      "Vermittlung von behördlichen Sozialleistungen nach SGB II, VIII und XII",
      "Interdisziplinäre Zusammenarbeit mit Jugendämtern, Gerichten und Kliniken"
    ],
    skills: ["Sozialrecht (SGB VIII / XII)", "Krisenintervention", "Hilfeplanung", "TVöD SuE", "Netzwerkarbeit"]
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
    shortDesc: "Warentransport im Nah- und Fernverkehr, Ladungssicherung, Lenk- und Ruhezeiten sowie Spesenabrechnung.",
    tasks: [
      "Sicherer Warentransport mit schweren Nutzfahrzeugen (Sattelzüge, Hängerzüge)",
      "Fachgerechte Ladungssicherung nach VDI 2700",
      "Einhaltung gesetzlicher Sozialvorschriften (Lenk- und Ruhezeiten nach VO (EG) 561/2006)",
      "Fahrzeugabfahrtkontrolle und Pflege des zugeteilten LKWs"
    ],
    skills: ["Führerscheinklasse CE", "Fahrerkarte & BKrFQG", "Ladungssicherung", "Tourenplanung", "Digitaler Tachograph"]
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
    shortDesc: "Lieferantenmanagement, globale Ausschreibungen, Preisverhandlungen und Risikomanagement in Lieferketten.",
    tasks: [
      "Globale Beschaffungsmarktanalyse und Durchführung strategischer Ausschreibungen",
      "Verhandlung von Rahmenverträgen, Staffelpreisen und Lieferkonditionen",
      "Bewertung von Lieferantenrisiken und Einhaltung des Lieferkettensorgfaltspflichtengesetzes (LkSG)",
      "Ermittlung von Einsparpotenzialen durch Total-Cost-of-Ownership-Analysen (TCO)"
    ],
    skills: ["Strategischer Einkauf", "Lieferantenmanagement", "LkSG Compliance", "TCO-Analyse", "SAP MM"]
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
    shortDesc: "Wareneingangsprüfung, Kommissionierung, Inventur und Steuerung automatisierter Hochregallager.",
    tasks: [
      "Fachgerechte Warenannahme und Prüfung auf Beschädigungen und Vollständigkeit",
      "Einlagerung und Kommissionierung mittels Flurförderzeugen und Pick-by-Voice",
      "Verpackung und Versandvorbereitung von Gütern unter Beachtung von Gefahrgutvorschriften (ADR)",
      "Buchung aller Warenbewegungen im Warenwirtschaftssystem (WMS / ERP)"
    ],
    skills: ["Gabelstaplerschein", "Warenwirtschaftssysteme", "Kommissionierung", "Ladungssicherung", "Inventur"]
  }
];

/**
 * Datenklassifikation:
 * - Kategorie A (Primärwert): Amtliche Bundeswerte (z. B. unskalierter Bundesmedian des Berufs aus BA Entgeltatlas)
 * - Kategorie B (Berechneter Wert): Rein mathematische Ableitungen (z. B. Monatslohn = Jahreslohn / 12, Stundenlohn, Differenz)
 * - Kategorie C (Modellierter Wert): Multiplikatorenbasiertes Modell für individuelle Parameter, gerundet auf volle 100 € zur Vermeidung von Scheingenauigkeit
 */
export interface CalculationResult {
  job: JobSalary;
  state: StateFactor;
  experience: { label: string; factor: number; desc: string };
  companySize: { label: string; factor: number };
  education: { label: string; factor: number };
  weeklyHours: number;
  userYearlyGross?: number;
  // Kategorie A: Amtlicher Primärwert des Berufs (Bundesmedian Vollzeit KldB)
  federalJobMedianYear: number;
  federalJobMedianMonth: number;
  // Kategorie C: Individueller Modell-Orientierungswert (auf 100 € gerundet)
  benchmarkMedianYear: number;
  benchmarkP25Year: number;
  benchmarkP75Year: number;
  // Kategorie B: Mathematische Ableitungen
  benchmarkMedianMonth: number;
  benchmarkHourly: number;
  differenceToMedian?: number;
  differencePercent?: number;
  percentileRank?: number;
  // Kategorie C: Netto-Schätzwerte
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

  // Combined multiplier (Kategorie C)
  const combinedFactor = state.factor * experience.factor * companySize.factor * education.factor;
  const hoursRatio = weeklyHours / 40;

  // Modellierter Orientierungswert: Gerundet auf volle 100 € zur Vermeidung unbegründeter Scheingenauigkeit
  const rawMedianYear = job.medianYear * combinedFactor * hoursRatio;
  const benchmarkMedianYear = Math.round(rawMedianYear / 100) * 100;
  const benchmarkP25Year = Math.round((job.p25Year * combinedFactor * hoursRatio) / 100) * 100;
  const benchmarkP75Year = Math.round((job.p75Year * combinedFactor * hoursRatio) / 100) * 100;

  // Kategorie B: Mathematisch abgeleitete Monatswerte & Stundenlohn
  const benchmarkMedianMonth = Math.round(benchmarkMedianYear / 12);
  const benchmarkHourly = Number((benchmarkMedianYear / (weeklyHours * 52)).toFixed(2));

  // Kategorie A: Amtliche Primärwerte des Berufs (unskalierter Bundesmedian)
  const federalJobMedianYear = job.medianYear;
  const federalJobMedianMonth = Math.round(job.medianYear / 12);

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

  // Realistic simplified German tax & social contributions estimation for reference (Kategorie C)
  const grossMonthly = params.userYearlyGross ? Math.round(params.userYearlyGross / 12) : benchmarkMedianMonth;
  const socialContribution = grossMonthly * 0.205;
  
  // Tax Class 1 estimate (Single, without church tax)
  const taxableIncome1 = Math.max(0, grossMonthly - 1000);
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
    federalJobMedianYear,
    federalJobMedianMonth,
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

// Helpers
export function getStateBySlug(slug: string): StateFactor | undefined {
  return STATE_FACTORS.find(s => s.slug === slug.toLowerCase());
}

export function getStateByCode(code: string): StateFactor | undefined {
  return STATE_FACTORS.find(s => s.code.toUpperCase() === code.toUpperCase());
}

export function getJobById(id: string): JobSalary | undefined {
  return SALARY_DATABASE.find(j => j.id === id);
}

export function getRelatedJobs(jobId: string, limit: number = 3): JobSalary[] {
  const current = getJobById(jobId);
  if (!current) return SALARY_DATABASE.slice(0, limit);
  const sameCategory = SALARY_DATABASE.filter(j => j.category === current.category && j.id !== jobId);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = SALARY_DATABASE.filter(j => j.id !== jobId && !sameCategory.includes(j));
  return [...sameCategory, ...others].slice(0, limit);
}
