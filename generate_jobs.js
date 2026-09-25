const fs = require('fs');

const baseJobs = [
  // IT & Digitales
  {
    id: "softwareentwickler",
    title: "Softwareentwickler",
    aliases: ["Software Engineer", "Programmierer", "Anwendungsentwickler"],
    category: "IT & Digitales",
    kldbCode: "43414",
    officialKldbLabel: "Experte - Softwareentwicklung",
    requirementLevel: 4,
    medianYear: 62400, p25Year: 51200, p75Year: 75800, minYear: 44000, maxYear: 98000,
    trendPercent: 4.8, typicalEducation: "Informatik-Studium",
    shortDesc: "Konzeption, Entwicklung und Wartung von Softwareanwendungen, Cloud-Architekturen und Schnittstellen."
  },
  {
    id: "fachinformatiker-anwendungsentwicklung",
    title: "Fachinformatiker Anwendungsentwicklung",
    aliases: ["Fachinformatiker AE", "App-Entwickler"],
    category: "IT & Digitales",
    kldbCode: "43412",
    officialKldbLabel: "Fachkraft - Softwareentwicklung",
    requirementLevel: 2,
    medianYear: 45600, p25Year: 38200, p75Year: 56400, minYear: 32000, maxYear: 70000,
    trendPercent: 4.1, typicalEducation: "Duale Ausbildung",
    shortDesc: "Realisierung kundenspezifischer Softwareanwendungen sowie Test und Anpassung bestehender Anwendungen."
  },
  {
    id: "it-systemadministrator",
    title: "IT-Systemadministrator",
    aliases: ["Systemadministrator", "Sysadmin", "IT-Admin"],
    category: "IT & Digitales",
    kldbCode: "43223",
    officialKldbLabel: "Spezialist - Systemadministration",
    requirementLevel: 3,
    medianYear: 55200, p25Year: 44500, p75Year: 68000, minYear: 38000, maxYear: 85000,
    trendPercent: 3.5, typicalEducation: "Ausbildung + Weiterbildung / Studium",
    shortDesc: "Administration, Überwachung und Konfiguration komplexer IT-Infrastrukturen und Netzwerke."
  },
  {
    id: "fachinformatiker-systemintegration",
    title: "Fachinformatiker Systemintegration",
    aliases: ["Fachinformatiker SI", "Netzwerkadministrator"],
    category: "IT & Digitales",
    kldbCode: "43222",
    officialKldbLabel: "Fachkraft - Systemadministration",
    requirementLevel: 2,
    medianYear: 44200, p25Year: 36500, p75Year: 54100, minYear: 31000, maxYear: 65000,
    trendPercent: 3.8, typicalEducation: "Duale Ausbildung",
    shortDesc: "Planung, Installation und Betrieb von IT-Systemen und Netzwerken sowie IT-Support."
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    aliases: ["Data Analyst", "Machine Learning Engineer"],
    category: "IT & Digitales",
    kldbCode: "43134",
    officialKldbLabel: "Experte - Datenwissenschaft",
    requirementLevel: 4,
    medianYear: 68500, p25Year: 55000, p75Year: 84000, minYear: 48000, maxYear: 110000,
    trendPercent: 5.5, typicalEducation: "Master-Studium Informatik/Mathematik",
    shortDesc: "Analyse großer Datenmengen zur Mustererkennung und Entwicklung prädiktiver KI-Modelle."
  },
  {
    id: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    aliases: ["IT Security Consultant", "Penetration Tester", "InfoSec Specialist"],
    category: "IT & Digitales",
    kldbCode: "43124",
    officialKldbLabel: "Experte - IT-Sicherheit",
    requirementLevel: 4,
    medianYear: 72000, p25Year: 58500, p75Year: 88500, minYear: 50000, maxYear: 120000,
    trendPercent: 6.2, typicalEducation: "IT-Studium / Spezialzertifizierungen",
    shortDesc: "Identifikation von Schwachstellen, Abwehr von Cyber-Angriffen und Sicherstellung der Informationssicherheit."
  },
  {
    id: "it-projektmanager",
    title: "IT-Projektmanager",
    aliases: ["IT-Projektleiter", "Scrum Master", "Agile Coach"],
    category: "IT & Digitales",
    kldbCode: "43314",
    officialKldbLabel: "Experte - IT-Koordination",
    requirementLevel: 4,
    medianYear: 69800, p25Year: 56000, p75Year: 86000, minYear: 48000, maxYear: 115000,
    trendPercent: 4.0, typicalEducation: "Studium Wirtschaftsinformatik",
    shortDesc: "Planung und Steuerung komplexer IT-Projekte, Ressourcenmanagement und Stakeholder-Kommunikation."
  },
  {
    id: "webentwickler",
    title: "Webentwickler",
    aliases: ["Frontend Developer", "Web Developer", "Frontend Entwickler"],
    category: "IT & Digitales",
    kldbCode: "43423",
    officialKldbLabel: "Spezialist - Webprogrammierung",
    requirementLevel: 3,
    medianYear: 48500, p25Year: 40000, p75Year: 60000, minYear: 35000, maxYear: 80000,
    trendPercent: 3.5, typicalEducation: "Ausbildung oder Bachelor",
    shortDesc: "Gestaltung und technische Umsetzung funktionaler und responsiver Web-Frontends."
  },
  
  // Kaufmännische Berufe
  {
    id: "kaufmann-bueromanagement",
    title: "Kaufmann für Büromanagement",
    aliases: ["Bürokauffrau", "Bürokaufmann", "Kauffrau für Büromanagement"],
    category: "Kaufmännische Berufe",
    kldbCode: "71402",
    officialKldbLabel: "Fachkraft - Büro- und Sekretariat",
    requirementLevel: 2,
    medianYear: 39500, p25Year: 32000, p75Year: 48000, minYear: 28000, maxYear: 58000,
    trendPercent: 2.1, typicalEducation: "Duale Ausbildung",
    shortDesc: "Organisation, Verwaltung und Sachbearbeitung in Büro- und Geschäftssekretariaten."
  },
  {
    id: "industriekaufmann",
    title: "Industriekaufmann",
    aliases: ["Industriekauffrau"],
    category: "Kaufmännische Berufe",
    kldbCode: "71302",
    officialKldbLabel: "Fachkraft - Unternehmensorganisation",
    requirementLevel: 2,
    medianYear: 44800, p25Year: 36500, p75Year: 54000, minYear: 31000, maxYear: 68000,
    trendPercent: 2.5, typicalEducation: "Duale Ausbildung",
    shortDesc: "Kaufmännische Steuerung von betriebswirtschaftlichen Abläufen in Industrieunternehmen."
  },
  {
    id: "bankkaufmann",
    title: "Bankkaufmann",
    aliases: ["Bankkauffrau", "Kundenberater Bank"],
    category: "Kaufmännische Berufe",
    kldbCode: "72112",
    officialKldbLabel: "Fachkraft - Bankwesen",
    requirementLevel: 2,
    medianYear: 52400, p25Year: 43500, p75Year: 64000, minYear: 35000, maxYear: 80000,
    trendPercent: 1.5, typicalEducation: "Duale Ausbildung",
    shortDesc: "Beratung von Privat- und Firmenkunden zu Finanzprodukten, Anlageformen und Krediten."
  },
  {
    id: "versicherungskaufmann",
    title: "Versicherungskaufmann",
    aliases: ["Kaufmann für Versicherungen", "Versicherungskauffrau"],
    category: "Kaufmännische Berufe",
    kldbCode: "72122",
    officialKldbLabel: "Fachkraft - Versicherungswesen",
    requirementLevel: 2,
    medianYear: 51800, p25Year: 41000, p75Year: 65000, minYear: 33000, maxYear: 85000,
    trendPercent: 1.2, typicalEducation: "Duale Ausbildung",
    shortDesc: "Kundenberatung zu Versicherungspolicen sowie Schaden- und Leistungsabwicklung."
  },
  {
    id: "personalsachbearbeiter",
    title: "Personalsachbearbeiter",
    aliases: ["HR Assistant", "Personalreferent (Junior)"],
    category: "Kaufmännische Berufe",
    kldbCode: "71522",
    officialKldbLabel: "Fachkraft - Personalwesen",
    requirementLevel: 2,
    medianYear: 43200, p25Year: 35000, p75Year: 52000, minYear: 30000, maxYear: 65000,
    trendPercent: 2.8, typicalEducation: "Kaufmännische Ausbildung",
    shortDesc: "Verwaltung von Personalakten, Vorbereitung der Entgeltabrechnung und Vertragserstellung."
  },
  {
    id: "hr-manager",
    title: "HR Manager",
    aliases: ["Personalreferent", "Human Resources Manager", "Personalleiter"],
    category: "Kaufmännische Berufe",
    kldbCode: "71524",
    officialKldbLabel: "Experte - Personalwesen",
    requirementLevel: 4,
    medianYear: 62500, p25Year: 48000, p75Year: 81000, minYear: 40000, maxYear: 110000,
    trendPercent: 3.5, typicalEducation: "BWL-Studium Schwerpunkt Personal",
    shortDesc: "Strategische Personalplanung, Recruiting, Mitarbeiterentwicklung und arbeitsrechtliche Beratung."
  },
  
  // Finanzen, Recht & Controlling
  {
    id: "controller",
    title: "Controller",
    aliases: ["Financial Controller", "Beteiligungscontroller", "Projektcontroller"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71624",
    officialKldbLabel: "Experte - Controlling",
    requirementLevel: 4,
    medianYear: 68500, p25Year: 55000, p75Year: 86000, minYear: 45000, maxYear: 120000,
    trendPercent: 3.2, typicalEducation: "BWL-Studium Schwerpunkt Finanzen",
    shortDesc: "Kaufmännische Steuerung, Budgetüberwachung, Abweichungsanalysen und Management-Reporting."
  },
  {
    id: "buchhalter",
    title: "Buchhalter",
    aliases: ["Finanzbuchhalter", "Debitorenbuchhalter", "Kreditorenbuchhalter"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71612",
    officialKldbLabel: "Fachkraft - Buchhaltung",
    requirementLevel: 2,
    medianYear: 41500, p25Year: 34500, p75Year: 51000, minYear: 28000, maxYear: 65000,
    trendPercent: 2.5, typicalEducation: "Kaufmännische Ausbildung",
    shortDesc: "Kontierung und Verbuchung von Geschäftsvorfällen, Rechnungsprüfung sowie Zahlungsverkehr."
  },
  {
    id: "bilanzbuchhalter",
    title: "Bilanzbuchhalter",
    aliases: ["Hauptbuchhalter", "Senior Accountant"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71613",
    officialKldbLabel: "Spezialist - Buchhaltung",
    requirementLevel: 3,
    medianYear: 55800, p25Year: 46000, p75Year: 68500, minYear: 38000, maxYear: 90000,
    trendPercent: 3.0, typicalEducation: "Weiterbildung (IHK)",
    shortDesc: "Erstellung von Monats- und Jahresabschlüssen nach HGB/IFRS sowie steuerliche Vorbereitungen."
  },
  {
    id: "steuerfachangestellter",
    title: "Steuerfachangestellter",
    aliases: ["Steuerfachangestellte"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71632",
    officialKldbLabel: "Fachkraft - Steuerberatung",
    requirementLevel: 2,
    medianYear: 38500, p25Year: 31500, p75Year: 47000, minYear: 26000, maxYear: 60000,
    trendPercent: 4.1, typicalEducation: "Duale Ausbildung",
    shortDesc: "Unterstützung bei Steuererklärungen, Lohnbuchhaltung und Vorbereitung von Jahresabschlüssen."
  },
  {
    id: "wirtschaftspruefer",
    title: "Wirtschaftsprüfer",
    aliases: ["Auditor", "Prüfungsleiter"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71634",
    officialKldbLabel: "Experte - Wirtschaftsprüfung",
    requirementLevel: 4,
    medianYear: 85000, p25Year: 65000, p75Year: 110000, minYear: 55000, maxYear: 180000,
    trendPercent: 3.0, typicalEducation: "Staatsexamen / WP-Examen",
    shortDesc: "Prüfung von Jahres- und Konzernabschlüssen sowie gutachterliche Tätigkeiten."
  },
  {
    id: "unternehmensjurist",
    title: "Unternehmensjurist",
    aliases: ["Legal Counsel", "Syndikusanwalt", "Rechtsberater"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71214",
    officialKldbLabel: "Experte - Rechtsberatung",
    requirementLevel: 4,
    medianYear: 82000, p25Year: 62000, p75Year: 105000, minYear: 50000, maxYear: 160000,
    trendPercent: 2.9, typicalEducation: "Jura-Studium (Staatsexamen)",
    shortDesc: "Inhouse-Beratung in vertragsrechtlichen, arbeitsrechtlichen und gesellschaftsrechtlichen Fragestellungen."
  },
  {
    id: "rechtsanwalt",
    title: "Rechtsanwalt",
    aliases: ["Anwalt", "Fachanwalt"],
    category: "Finanzen, Recht & Controlling",
    kldbCode: "71214",
    officialKldbLabel: "Experte - Rechtsberatung",
    requirementLevel: 4,
    medianYear: 78000, p25Year: 55000, p75Year: 110000, minYear: 45000, maxYear: 250000,
    trendPercent: 2.5, typicalEducation: "2. Staatsexamen",
    shortDesc: "Rechtliche Beratung, Vertretung vor Gericht und Gestaltung von Verträgen."
  },
  
  // Vertrieb & Marketing
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    aliases: ["Online Marketing Manager", "Marketing Referent", "Digital Marketing Manager"],
    category: "Vertrieb & Marketing",
    kldbCode: "92114",
    officialKldbLabel: "Experte - Marketing",
    requirementLevel: 4,
    medianYear: 54000, p25Year: 42000, p75Year: 68000, minYear: 35000, maxYear: 95000,
    trendPercent: 3.5, typicalEducation: "Studium BWL/Medien",
    shortDesc: "Konzeption, Planung und Umsetzung zielgruppenspezifischer Marketing- und Werbekampagnen."
  },
  {
    id: "vertriebsmitarbeiter",
    title: "Vertriebsmitarbeiter",
    aliases: ["Sales Manager", "Außendienstmitarbeiter", "Kundenberater Vertrieb"],
    category: "Vertrieb & Marketing",
    kldbCode: "62203",
    officialKldbLabel: "Spezialist - Technischer Vertrieb",
    requirementLevel: 3,
    medianYear: 58500, p25Year: 45000, p75Year: 78000, minYear: 35000, maxYear: 120000,
    trendPercent: 2.8, typicalEducation: "Kaufm. Ausbildung + Weiterbildung",
    shortDesc: "Kundenakquise, Beratung zu Produkten/Dienstleistungen, Angebotserstellung und Vertragsverhandlungen."
  },
  {
    id: "key-account-manager",
    title: "Key Account Manager",
    aliases: ["Großkundenbetreuer", "KAM", "Senior Sales Manager"],
    category: "Vertrieb & Marketing",
    kldbCode: "62204",
    officialKldbLabel: "Experte - Technischer Vertrieb",
    requirementLevel: 4,
    medianYear: 74500, p25Year: 58000, p75Year: 95000, minYear: 45000, maxYear: 140000,
    trendPercent: 3.2, typicalEducation: "Studium / Fundierte Praxis",
    shortDesc: "Strategische Betreuung und Umsatzentwicklung der wichtigsten B2B-Großkunden des Unternehmens."
  },
  {
    id: "verkaeufer",
    title: "Verkäufer",
    aliases: ["Kassierer", "Verkäuferin im Einzelhandel", "Einzelhandelskaufmann"],
    category: "Vertrieb & Marketing",
    kldbCode: "62102",
    officialKldbLabel: "Fachkraft - Verkauf",
    requirementLevel: 2,
    medianYear: 31200, p25Year: 26000, p75Year: 38000, minYear: 22000, maxYear: 45000,
    trendPercent: 2.5, typicalEducation: "Ausbildung im Einzelhandel",
    shortDesc: "Kundenberatung, Kassentätigkeiten und Warenpräsentation im filialisierten Einzelhandel."
  },
  
  // Medizin & Gesundheit
  {
    id: "assistenzarzt",
    title: "Assistenzarzt",
    aliases: ["Arzt in Weiterbildung", "Stationsarzt"],
    category: "Medizin & Gesundheit",
    kldbCode: "81414",
    officialKldbLabel: "Experte - Humanmedizin (ohne Spezialisierung)",
    requirementLevel: 4,
    medianYear: 74500, p25Year: 64000, p75Year: 88000, minYear: 55000, maxYear: 98000,
    trendPercent: 3.0, typicalEducation: "Medizinstudium & Approbation",
    shortDesc: "Patientenversorgung auf Station unter fachärztlicher Aufsicht sowie Teilnahme an Bereitschaftsdiensten."
  },
  {
    id: "facharzt",
    title: "Facharzt",
    aliases: ["Klinikarzt", "Arzt"],
    category: "Medizin & Gesundheit",
    kldbCode: "81424",
    officialKldbLabel: "Experte - Humanmedizin (mit Spezialisierung)",
    requirementLevel: 4,
    medianYear: 95000, p25Year: 80000, p75Year: 115000, minYear: 70000, maxYear: 150000,
    trendPercent: 2.5, typicalEducation: "Facharztweiterbildung",
    shortDesc: "Eigenverantwortliche fachärztliche Diagnostik und Behandlung von Patienten in Klinik oder Praxis."
  },
  {
    id: "oberarzt",
    title: "Oberarzt",
    aliases: ["Leitender Arzt"],
    category: "Medizin & Gesundheit",
    kldbCode: "81494",
    officialKldbLabel: "Experte - Medizinische Führungskräfte",
    requirementLevel: 4,
    medianYear: 125000, p25Year: 105000, p75Year: 145000, minYear: 90000, maxYear: 180000,
    trendPercent: 2.0, typicalEducation: "Facharzt mit mehrjähriger Praxis",
    shortDesc: "Medizinische und organisatorische Leitung von Fachbereichen sowie fachliche Führung von Assistenzärzten."
  },
  {
    id: "gesundheits-und-krankenpfleger",
    title: "Pflegefachkraft",
    aliases: ["Gesundheits- und Krankenpfleger", "Krankenschwester", "Altenpfleger"],
    category: "Medizin & Gesundheit",
    kldbCode: "81302",
    officialKldbLabel: "Fachkraft - Gesundheits- und Krankenpflege",
    requirementLevel: 2,
    medianYear: 44800, p25Year: 38500, p75Year: 52000, minYear: 32000, maxYear: 62000,
    trendPercent: 4.5, typicalEducation: "Pflegeausbildung (Generalistik)",
    shortDesc: "Stationäre und ambulante pflegerische Versorgung und Betreuung von Patienten sowie Dokumentation."
  },
  {
    id: "medizinische-fachangestellte",
    title: "Medizinische Fachangestellte",
    aliases: ["MFA", "Arzthelferin", "Medizinischer Fachangestellter"],
    category: "Medizin & Gesundheit",
    kldbCode: "81102",
    officialKldbLabel: "Fachkraft - Arzt- & Praxishilfe",
    requirementLevel: 2,
    medianYear: 33500, p25Year: 28000, p75Year: 41000, minYear: 24000, maxYear: 50000,
    trendPercent: 3.5, typicalEducation: "Ausbildung zur MFA",
    shortDesc: "Assistenz bei ärztlichen Untersuchungen, Patientenbetreuung und Praxisorganisation."
  },
  {
    id: "physiotherapeut",
    title: "Physiotherapeut",
    aliases: ["Krankengymnast", "Sportphysiotherapeut"],
    category: "Medizin & Gesundheit",
    kldbCode: "81712",
    officialKldbLabel: "Fachkraft - Physiotherapie",
    requirementLevel: 2,
    medianYear: 36800, p25Year: 31500, p75Year: 44000, minYear: 26000, maxYear: 55000,
    trendPercent: 4.0, typicalEducation: "Staatlich anerkannte Ausbildung",
    shortDesc: "Durchführung physiotherapeutischer Heilbehandlungen zur Wiederherstellung der Bewegungsfähigkeit."
  },
  {
    id: "apotheker",
    title: "Apotheker",
    aliases: ["Pharmazeut"],
    category: "Medizin & Gesundheit",
    kldbCode: "81514",
    officialKldbLabel: "Experte - Pharmazie",
    requirementLevel: 4,
    medianYear: 68000, p25Year: 55000, p75Year: 82000, minYear: 45000, maxYear: 105000,
    trendPercent: 2.1, typicalEducation: "Studium Pharmazie & Approbation",
    shortDesc: "Beratung zu Arzneimitteln, Ausgabe verschreibungspflichtiger Medikamente und Rezepturherstellung."
  },
  
  // Handwerk & Bau
  {
    id: "mechatroniker",
    title: "Mechatroniker",
    aliases: ["Kfz-Mechatroniker", "Industriemechatroniker"],
    category: "Handwerk & Bau",
    kldbCode: "26112",
    officialKldbLabel: "Fachkraft - Mechatronik",
    requirementLevel: 2,
    medianYear: 42500, p25Year: 35000, p75Year: 51500, minYear: 30000, maxYear: 65000,
    trendPercent: 3.2, typicalEducation: "Duale Ausbildung",
    shortDesc: "Zusammenbau und Instandhaltung von komplexen mechatronischen Anlagen und Maschinen."
  },
  {
    id: "anlagenmechaniker-shk",
    title: "Anlagenmechaniker SHK",
    aliases: ["Sanitärinstallateur", "Heizungsbauer", "Klempner"],
    category: "Handwerk & Bau",
    kldbCode: "34212",
    officialKldbLabel: "Fachkraft - Klempnerei, Sanitär, Heizung, Klima",
    requirementLevel: 2,
    medianYear: 41500, p25Year: 34500, p75Year: 49500, minYear: 28000, maxYear: 60000,
    trendPercent: 5.1, typicalEducation: "Duale Ausbildung",
    shortDesc: "Installation, Wartung und Reparatur von Heizungs-, Klima- und Sanitäranlagen."
  },
  {
    id: "elektriker",
    title: "Elektroniker",
    aliases: ["Elektriker", "Elektroinstallateur"],
    category: "Handwerk & Bau",
    kldbCode: "26212",
    officialKldbLabel: "Fachkraft - Energietechnik",
    requirementLevel: 2,
    medianYear: 43200, p25Year: 35500, p75Year: 52000, minYear: 29000, maxYear: 65000,
    trendPercent: 4.5, typicalEducation: "Duale Ausbildung",
    shortDesc: "Planung, Installation und Prüfung elektronischer Gebäudeausrüstungen und Energienetze."
  },
  {
    id: "tischler",
    title: "Tischler",
    aliases: ["Schreiner", "Holzmechaniker"],
    category: "Handwerk & Bau",
    kldbCode: "22312",
    officialKldbLabel: "Fachkraft - Tischlerei",
    requirementLevel: 2,
    medianYear: 36500, p25Year: 30500, p75Year: 43500, minYear: 25000, maxYear: 55000,
    trendPercent: 2.2, typicalEducation: "Duale Ausbildung",
    shortDesc: "Fertigung und Montage von Möbeln, Innenausbauten sowie Holzfenstern und -türen."
  },
  
  // Industrie & Technik
  {
    id: "maschinenbauingenieur",
    title: "Maschinenbauingenieur",
    aliases: ["Konstrukteur (Ing.)", "Mechanical Engineer"],
    category: "Ingenieurwesen & Technik",
    kldbCode: "27114",
    officialKldbLabel: "Experte - Maschinenbau",
    requirementLevel: 4,
    medianYear: 72500, p25Year: 58000, p75Year: 90000, minYear: 48000, maxYear: 125000,
    trendPercent: 3.5, typicalEducation: "Ingenieurstudium (M.Sc./Dipl.)",
    shortDesc: "Entwicklung, Berechnung und Konstruktion von Maschinen, Anlagen und mechanischen Komponenten."
  },
  {
    id: "elektroingenieur",
    title: "Elektroingenieur",
    aliases: ["Hardware-Entwickler", "Electrical Engineer"],
    category: "Ingenieurwesen & Technik",
    kldbCode: "26214",
    officialKldbLabel: "Experte - Energietechnik",
    requirementLevel: 4,
    medianYear: 74200, p25Year: 59500, p75Year: 92000, minYear: 50000, maxYear: 130000,
    trendPercent: 4.2, typicalEducation: "Ingenieurstudium",
    shortDesc: "Forschung und Entwicklung im Bereich elektronischer Schaltungen, Systeme und Steuerungstechnik."
  },
  {
    id: "wirtschaftsingenieur",
    title: "Wirtschaftsingenieur",
    aliases: ["Industrial Engineer", "Projektingenieur"],
    category: "Ingenieurwesen & Technik",
    kldbCode: "27314",
    officialKldbLabel: "Experte - Wirtschaftsingenieurwesen",
    requirementLevel: 4,
    medianYear: 76500, p25Year: 61000, p75Year: 95000, minYear: 50000, maxYear: 135000,
    trendPercent: 3.8, typicalEducation: "Studium Wirtschaftsingenieurwesen",
    shortDesc: "Schnittstellenfunktion zwischen technischen Anforderungen und betriebswirtschaftlicher Planung."
  },
  {
    id: "bauingenieur",
    title: "Bauingenieur",
    aliases: ["Bauleiter", "Tragwerksplaner", "Statiker"],
    category: "Ingenieurwesen & Technik",
    kldbCode: "31114",
    officialKldbLabel: "Experte - Hochbau",
    requirementLevel: 4,
    medianYear: 62500, p25Year: 51000, p75Year: 76000, minYear: 42000, maxYear: 105000,
    trendPercent: 2.9, typicalEducation: "Studium Bauingenieurwesen",
    shortDesc: "Planung, statische Berechnung und Bauleitung von Hoch- und Tiefbauprojekten."
  },
  
  // Soziales & Bildung
  {
    id: "erzieher",
    title: "Erzieher",
    aliases: ["Kindergärtner", "Pädagogische Fachkraft"],
    category: "Bildung & Soziales",
    kldbCode: "83112",
    officialKldbLabel: "Fachkraft - Erziehung",
    requirementLevel: 2,
    medianYear: 46200, p25Year: 40500, p75Year: 54000, minYear: 34000, maxYear: 65000,
    trendPercent: 3.5, typicalEducation: "Fachschulausbildung (staatl. anerkannt)",
    shortDesc: "Betreuung, Förderung und frühkindliche Bildung in Kitas und Vorschuleinrichtungen."
  },
  {
    id: "sozialarbeiter",
    title: "Sozialarbeiter",
    aliases: ["Sozialpädagoge", "Sozialpädagogin"],
    category: "Bildung & Soziales",
    kldbCode: "83124",
    officialKldbLabel: "Experte - Sozialarbeit und Sozialpädagogik",
    requirementLevel: 4,
    medianYear: 51500, p25Year: 44000, p75Year: 60500, minYear: 38000, maxYear: 75000,
    trendPercent: 2.8, typicalEducation: "Studium Soziale Arbeit (B.A.)",
    shortDesc: "Unterstützung und Beratung von Menschen in schwierigen Lebenslagen, Krisenintervention."
  },
  {
    id: "gymnasiallehrer",
    title: "Gymnasiallehrer",
    aliases: ["Lehrer (Gymnasium)", "Studienrat"],
    category: "Bildung & Soziales",
    kldbCode: "84144",
    officialKldbLabel: "Experte - Lehrkräfte allgemeinbildende Schulen",
    requirementLevel: 4,
    medianYear: 76500, p25Year: 65000, p75Year: 90000, minYear: 52000, maxYear: 110000,
    trendPercent: 2.5, typicalEducation: "Lehramtsstudium & Referendariat",
    shortDesc: "Unterricht, Leistungskontrolle und Erziehungsaufgaben in der Sekundarstufe II."
  },
  {
    id: "grundschullehrer",
    title: "Grundschullehrer",
    aliases: ["Lehrer (Grundschule)"],
    category: "Bildung & Soziales",
    kldbCode: "84124",
    officialKldbLabel: "Experte - Lehrkräfte Primarstufe",
    requirementLevel: 4,
    medianYear: 71500, p25Year: 61000, p75Year: 84000, minYear: 50000, maxYear: 100000,
    trendPercent: 3.0, typicalEducation: "Lehramtsstudium & Referendariat",
    shortDesc: "Pädagogische Förderung und Grundlagenunterricht für Schüler der Klassen 1 bis 4."
  },
  
  // Logistik & Verkehr
  {
    id: "berufskraftfahrer",
    title: "Berufskraftfahrer",
    aliases: ["LKW-Fahrer", "Kraftfahrer", "Fernfahrer"],
    category: "Logistik & Verkehr",
    kldbCode: "52122",
    officialKldbLabel: "Fachkraft - Berufskraftverkehr",
    requirementLevel: 2,
    medianYear: 34500, p25Year: 29500, p75Year: 40500, minYear: 25000, maxYear: 50000,
    trendPercent: 4.2, typicalEducation: "Duale Ausbildung",
    shortDesc: "Sicherer Transport von Gütern im Nah- und Fernverkehr sowie Kontrolle der Verladung."
  },
  {
    id: "fachkraft-lagerlogistik",
    title: "Fachkraft für Lagerlogistik",
    aliases: ["Lagerist", "Lagermitarbeiter"],
    category: "Logistik & Verkehr",
    kldbCode: "51312",
    officialKldbLabel: "Fachkraft - Lagerwirtschaft",
    requirementLevel: 2,
    medianYear: 35200, p25Year: 29800, p75Year: 42500, minYear: 24000, maxYear: 52000,
    trendPercent: 3.1, typicalEducation: "Duale Ausbildung",
    shortDesc: "Annahme, fachgerechte Einlagerung und Kommissionierung von Waren und Gütern."
  },
  {
    id: "einkaufsleiter",
    title: "Einkaufsleiter",
    aliases: ["Head of Purchasing", "Supply Chain Manager", "Strategischer Einkäufer"],
    category: "Logistik & Verkehr",
    kldbCode: "71324",
    officialKldbLabel: "Experte - Einkauf",
    requirementLevel: 4,
    medianYear: 84500, p25Year: 65000, p75Year: 110000, minYear: 50000, maxYear: 160000,
    trendPercent: 3.0, typicalEducation: "BWL-Studium oder Weiterbildung",
    shortDesc: "Strategische Lieferantenauswahl, Preisverhandlungen und Sicherstellung der globalen Supply Chain."
  },
  
  // Gastronomie & Hotellerie
  {
    id: "koch",
    title: "Koch",
    aliases: ["Köchin", "Küchenchef (Junior)", "Chef de Partie"],
    category: "Gastronomie & Hotellerie",
    kldbCode: "63222",
    officialKldbLabel: "Fachkraft - Speisenzubereitung",
    requirementLevel: 2,
    medianYear: 31500, p25Year: 26500, p75Year: 38000, minYear: 22000, maxYear: 48000,
    trendPercent: 4.8, typicalEducation: "Duale Ausbildung",
    shortDesc: "Fachgerechte Zubereitung von Speisen, Menüplanung und Einhaltung von Lebensmittelhygiene."
  },
  {
    id: "hotelfachkraft",
    title: "Hotelfachkraft",
    aliases: ["Hotelfachmann", "Hotelfachfrau", "Rezeptionist"],
    category: "Gastronomie & Hotellerie",
    kldbCode: "63312",
    officialKldbLabel: "Fachkraft - Hotelservice",
    requirementLevel: 2,
    medianYear: 30200, p25Year: 25500, p75Year: 35500, minYear: 21000, maxYear: 45000,
    trendPercent: 3.5, typicalEducation: "Duale Ausbildung",
    shortDesc: "Betreuung von Hotelgästen am Empfang, Zimmerreservierung und Veranstaltungsorganisation."
  },
  {
    id: "kellner",
    title: "Restaurantfachkraft",
    aliases: ["Kellner", "Servicekraft", "Ober"],
    category: "Gastronomie & Hotellerie",
    kldbCode: "63322",
    officialKldbLabel: "Fachkraft - Gastronomieservice",
    requirementLevel: 2,
    medianYear: 28500, p25Year: 24000, p75Year: 34000, minYear: 20000, maxYear: 42000,
    trendPercent: 3.0, typicalEducation: "Ausbildung im Gastgewerbe",
    shortDesc: "Fachgerechte Beratung, Bedienung und Abrechnung von Gästen im Gastronomiebetrieb."
  },
  
  // Verwaltung & Sonstige
  {
    id: "verwaltungsfachangestellter",
    title: "Verwaltungsfachangestellter",
    aliases: ["Sachbearbeiter ÖD", "Verwaltungsmitarbeiter"],
    category: "Verwaltung & öffentlicher Bereich",
    kldbCode: "73112",
    officialKldbLabel: "Fachkraft - Öffentliche Verwaltung",
    requirementLevel: 2,
    medianYear: 42500, p25Year: 36000, p75Year: 50500, minYear: 31000, maxYear: 62000,
    trendPercent: 2.1, typicalEducation: "Ausbildung im öffentlichen Dienst",
    shortDesc: "Bürosachbearbeitung und Anwendung von Rechtsvorschriften in Behörden und Kommunen."
  },
  {
    id: "grafikdesigner",
    title: "Grafikdesigner",
    aliases: ["Mediengestalter", "Kommunikationsdesigner", "Art Director"],
    category: "Marketing, Medien & Kommunikation",
    kldbCode: "93123",
    officialKldbLabel: "Spezialist - Grafikdesign",
    requirementLevel: 3,
    medianYear: 41500, p25Year: 33500, p75Year: 52000, minYear: 28000, maxYear: 75000,
    trendPercent: 2.0, typicalEducation: "Design-Studium oder Ausbildung",
    shortDesc: "Visuelle Gestaltung von Print- und Digitalmedien, Markenentwicklung und Layouting."
  }
];

fs.writeFileSync('generated_jobs.json', JSON.stringify(baseJobs, null, 2));
