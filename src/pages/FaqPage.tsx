import { HelpCircle } from 'lucide-react';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: "Methodik & Rechner",
    question: "Warum berechnet der Rechner den Median und nicht den Durchschnittslohn?",
    answer: "Das arithmetische Mittel (Durchschnitt) ist extrem anfällig für Ausreißer nach oben: Einige wenige Millionengehälter von Vorständen heben den Schnitt künstlich an. Der Median (50. Perzentil) ist das exakte Zentrum: 50 % aller Arbeitnehmer in der definierten Vergleichsgruppe verdienen weniger, 50 % mehr. Er ist der wissenschaftlich und juristisch (z. B. im EntgTranspG) anerkannte Standard zur Feststellung marktüblicher Gehälter."
  },
  {
    category: "Methodik & Rechner",
    question: "Auf welchen Datenquellen basiert der Lohnvergleichsrechner?",
    answer: "Unser Modell stützt sich primär auf die amtlichen Daten der Verdienststrukturerhebung des Statistischen Bundesamtes (Destatis, VSE nach § 12 VStatG) sowie den Entgeltatlas der Bundesagentur für Arbeit auf Basis der Klassifikation der Berufe 2010 (KldB 2010 5-Steller). Es werden ausschließlich sozialversicherungspflichtige Vollzeitbeschäftigungen zugrunde gelegt."
  },
  {
    category: "Methodik & Rechner",
    question: "Wie wird die Wochenarbeitszeit bei Teilzeitkräften berücksichtigt?",
    answer: "Der Rechner normiert die Bruttomonats- und Bruttojahresgehälter standardmäßig auf eine 40-Stunden-Vollzeitwoche. Über den Schieberegler für Wochenarbeitsstunden (15 bis 48 Stunden) wird das Entgelt linear an das vertragliche Arbeitszeitvolumen angepasst, um eine exakte Vergleichbarkeit von Teilzeit- und Vollzeitstellen zu gewährleisten."
  },
  {
    category: "Recht & Entgelttransparenz",
    question: "Was besagt das Entgelttransparenzgesetz (§ 10 EntgTranspG)?",
    answer: "Das Gesetz gibt Arbeitnehmern in Betrieben mit in der Regel mehr als 200 Beschäftigten einen individuellen Auskunftsanspruch. Sie können erfahren, nach welchen Kriterien und in welcher Höhe Kollegen des anderen Geschlechts in einer mindestens 6 Personen umfassenden Vergleichsgruppe für gleiche oder gleichwertige Arbeit im statistischen Median vergütet werden."
  },
  {
    category: "Recht & Entgelttransparenz",
    question: "Darf der Arbeitgeber Gehälter wegen Verhandlungsgeschick unterschiedlich festsetzen?",
    answer: "Nein. Das Bundesarbeitsgericht (BAG, Urteil vom 16.02.2023 – 8 AZR 450/21) hat unmissverständlich klargestellt: Verhandlungsgeschick eines Mitarbeiters ist kein sachlicher, geschlechtsunabhängiger Grund, der ein höheres Gehalt gegenüber einer Kollegin bei gleicher Arbeit rechtfertigt. Es gilt der Grundsatz: Gleicher Lohn für gleiche Arbeit."
  },
  {
    category: "Recht & Entgelttransparenz",
    question: "Was ändert sich durch die EU-Entgelttransparenzrichtlinie bis 2026?",
    answer: "Die Richtlinie (EU) 2023/970 verpflichtet Arbeitgeber ab spätestens Juni 2026, bereits vor dem Bewerbungsgespräch Gehaltsbänder in Stellenanzeigen offenzulegen. Die Frage nach bisherigen Gehältern von Bewerbern wird unionsweit verboten, und bei Ungleichbehandlungsvorwürfen greift eine Beweislastumkehr zugunsten der Arbeitnehmer."
  },
  {
    category: "Karriere & Verhandlung",
    question: "Wie nutze ich die Ergebnisse des Lohnvergleichs in der Praxis?",
    answer: "Nutzen Sie den ermittelten Benchmark-Korridor (25. bis 75. Perzentil) als argumentative Verhandlungsspanne. Liegen Sie unter dem Median, verweisen Sie sachlich auf die objektiven Marktdaten für Ihr Bundesland und Ihre Berufsgruppe und verknüpfen Sie dies mit Ihren messbaren Projekterfolgen der letzten 12 Monate."
  },
  {
    category: "Karriere & Verhandlung",
    question: "Zählen Weihnachts- und Urlaubsgeld zum Bruttojahresgehalt?",
    answer: "Ja, im Lohnvergleichsrechner und in den Erhebungen von Destatis werden feste Jahressonderzahlungen wie 13. Monatsgehalt, vertragliches Urlaubs- und Weihnachtsgeld in das Bruttojahresgehalt eingerechnet. Unvorhersehbare, rein variable Boni ohne Rechtsanspruch werden gesondert betrachtet."
  }
];

export default function FaqPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
          HÄUFIG GESTELLTE FRAGEN
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Fragen und Antworten zum Lohnvergleich
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Fundierte Antworten zu Berechnungsmethoden, Datenquellen, arbeitsrechtlichen Auskunftsansprüchen und Tarifverträgen.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-colors space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                {faq.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {faq.question}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {faq.answer}
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
          title="Häufige Fragen zum Lohnvergleich: Methodik, Rechtslage und Entgelttransparenz"
          url="https://lohnvergleichsrechner.de/faq"
        />
      </section>

    </div>
  );
}
