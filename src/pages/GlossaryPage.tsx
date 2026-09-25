import { useState } from 'react';
import { Search } from 'lucide-react';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  legalRef?: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Median (50. Perzentil)",
    category: "Statistik",
    definition: "Der Wert, der eine geordnete Datenmenge genau in zwei Hälften teilt. 50 % der Beschäftigten verdienen weniger, 50 % verdienen mehr. Im Gegensatz zum arithmetischen Mittel ist der Median robust gegenüber extremen Ausreißern (z. B. Spitzengehälter des Managements).",
    legalRef: "§ 11 Abs. 3 EntgTranspG"
  },
  {
    term: "Arithmetisches Mittel (Durchschnitt)",
    category: "Statistik",
    definition: "Die Summe aller Gehälter geteilt durch die Anzahl der Personen. Da wenige extrem hohe Einkommen den Durchschnitt stark nach oben ziehen, liegt das arithmetische Mittel in Deutschland in der Regel 10 bis 15 % über dem realen Median.",
    legalRef: "Destatis Fachserie 16"
  },
  {
    term: "Klassifikation der Berufe (KldB 2010)",
    category: "Berufssystematik",
    definition: "Das fünfstellige hierarchische System der Bundesagentur für Arbeit zur standardisierten Erfassung von Berufsfeldern, Anforderungsniveaus (Helfer, Fachkraft, Spezialist, Experte) und Tätigkeiten.",
    legalRef: "BA KldB 2010"
  },
  {
    term: "Auskunftsanspruch",
    category: "Arbeitsrecht",
    definition: "Gesetzlicher Anspruch von Beschäftigten in Unternehmen mit in der Regel mehr als 200 Mitarbeitern auf Mitteilung des Medians des Entgelts einer mindestens 6 Personen umfassenden Vergleichsgruppe des anderen Geschlechts.",
    legalRef: "§ 10 EntgTranspG"
  },
  {
    term: "Interquartilsabstand (IQR / P25 - P75)",
    category: "Statistik",
    definition: "Der Bereich zwischen dem 25. Perzentil (unteres Quartil) und dem 75. Perzentil (oberes Quartil). Er bildet die mittleren 50 % aller Arbeitnehmer ab und markiert den typischen Gehaltskorridor einer Branche.",
    legalRef: "VSE Methodik"
  },
  {
    term: "Gender Pay Gap (bereinigt vs. unbereinigt)",
    category: "Ökonomie",
    definition: "Der unbereinigte Gender Pay Gap vergleicht den Durchschnittslohn aller Frauen und Männer (in DE ca. 18 %). Der bereinigte Gender Pay Gap (ca. 6 %) rechnet strukturelle Unterschiede in Berufswahl, Branche, Beschäftigungsumfang und Qualifikation heraus.",
    legalRef: "Destatis Verdienststatistik"
  },
  {
    term: "Geldwerter Vorteil & Sachbezug",
    category: "Steuerrecht",
    definition: "Leistungen des Arbeitgebers an Arbeitnehmer, die nicht in Geld ausgezahlt werden (z. B. Firmenwagen, Jobticket, Verpflegungszuschüsse). Sachbezüge bis 50 Euro monatlich sind steuer- und sozialabgabenfrei.",
    legalRef: "§ 8 Abs. 2 EStG"
  },
  {
    term: "Tarifbindung & Eingruppierung",
    category: "Tarifrecht",
    definition: "Rechtliche Verpflichtung von Arbeitgebern und Arbeitnehmern an einen Tarifvertrag (z. B. TVöD, TV-L, IG Metall). Die Eingruppierung in Entgeltgruppen richtet sich streng nach den Merkmalen der ausgeübten Tätigkeit.",
    legalRef: "§ 3 TVG"
  },
  {
    term: "Arbeitgeber-Brutto (Personalzusatzkosten)",
    category: "Lohnbuchhaltung",
    definition: "Die Gesamtkosten des Arbeitgebers für einen Mitarbeiter. Es setzt sich aus dem Bruttogehalt des Arbeitnehmers und den gesetzlichen Arbeitgeberanteilen zur Sozialversicherung (ca. 20,5 %: KV, PV, RV, AV, U1, U2, Insolvenzgeldumlage) zusammen.",
    legalRef: "SGB IV & SGB V"
  },
  {
    term: "Entgeltgleichheitsgebot",
    category: "Arbeitsrecht",
    definition: "Verfassungs- und europarechtlicher Grundsatz, wonach Frauen und Männer bei gleicher oder gleichwertiger Arbeit Anspruch auf das gleiche Entgelt haben. Eine Besserbezahlung darf nicht allein mit individuellem Verhandlungsgeschick begründet werden.",
    legalRef: "Art. 157 AEUV · BAG 8 AZR 450/21"
  },
  {
    term: "Variable Vergütung (Bonus, Provision)",
    category: "Vergütungssysteme",
    definition: "Erfolgs- oder leistungsabhängiger Gehaltsbestandteil, dessen Auszahlung an persönliche Zielvereinbarungen (MbO), Teamziele oder den Unternehmenserfolg gekoppelt ist.",
    legalRef: "§ 611a BGB"
  },
  {
    term: "Überstundenvergütung & Abgeltungsklauseln",
    category: "Arbeitsrecht",
    definition: "Regelungen zur Bezahlung oder zum Freizeitausgleich geleisteter Mehrarbeit. Pauschale Klauseln wie 'Überstunden sind mit dem Gehalt abgegolten' sind nach BAG-Rechtsprechung bei Fachkräften ohne Spitzengehalt unwirksam.",
    legalRef: "§ 307 BGB · BAG 5 AZR 517/09"
  }
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              FACHBEGRIFFE &amp; DEFINITIONEN
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Glossar: Lohn, Gehalt &amp; Entgeltrecht
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Wichtige ökonomische, steuerliche und arbeitsrechtliche Fachbegriffe von Median über Entgelttransparenz bis Arbeitgeber-Brutto verständlich erklärt.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Begriff suchen (z. B. Median, Gender Pay Gap, Sachbezug)..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-xs"
        />
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.term}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                {item.category}
              </span>
              {item.legalRef && (
                <span className="text-xs font-mono text-slate-400">
                  {item.legalRef}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {item.term}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Zitation */}
      <section>
        <CitationBox
          title="Glossar Lohnvergleich und Entgeltrecht: Fachbegriffe nach Destatis und Arbeitsrecht"
          url="https://lohnvergleichsrechner.de/glossar"
        />
      </section>
      </div>

    </div>
  );
}
