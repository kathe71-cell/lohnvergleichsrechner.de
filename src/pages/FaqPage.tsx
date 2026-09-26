import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import Breadcrumbs from '../components/Breadcrumbs';

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
    answer: "Unser Modell stützt sich primär auf die repräsentativen Stichprobenerhebungen des Statistischen Bundesamtes (Destatis Verdienststatistik nach § 12 VStatG) sowie die amtlichen DEÜV-Meldungen des Entgeltatlasses der Bundesagentur für Arbeit auf Basis der Klassifikation der Berufe (KldB 2010 5-Steller). Es werden sozialversicherungspflichtige Vollzeitbeschäftigungen in Deutschland zugrunde gelegt."
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
    answer: "Das Bundesarbeitsgericht (BAG, Urteil vom 16.02.2023 – 8 AZR 450/21) hat entschieden, dass besseres Verhandlungsgeschick eines Mitarbeiters bei gleicher oder gleichwertiger Arbeit keine geschlechtsbezogene Entgeltungleichheit gegenüber Kolleginnen rechtfertigt (§§ 3, 7 EntgTranspG). Objektive, geschlechtsneutrale Differenzierungen – wie einschlägige Berufserfahrung, Zusatzqualifikationen oder konkrete Leistungsanforderungen – bleiben arbeitsrechtlich hingegen weiterhin zulässig."
  },
  {
    category: "Recht & Entgelttransparenz",
    question: "Was sieht die EU-Entgelttransparenzrichtlinie vor und wann gilt sie in Deutschland?",
    answer: "Die europäische Richtlinie (EU) 2023/970 sieht vor, dass Arbeitgeber künftig bereits vor dem ersten Bewerbungsgespräch Gehaltsspannen offenlegen müssen, Fragen nach dem bisherigen Gehalt unzulässig werden und bei Ungleichbehandlungsvorwürfen eine Beweislastumkehr greift. Die europäische Umsetzungsfrist endete am 7. Juni 2026. Da die Bundesregierung erklärt hat, diese Frist nicht einzuhalten, und das Gesetzgebungsverfahren zur nationalen Überführung noch aussteht, entfalten die Vorgaben für private Arbeitgeber in Deutschland erst mit dem Inkrafttreten des deutschen Umsetzungsgesetzes unmittelbare rechtliche Bindung. Bis dahin gilt das bisherige Entgelttransparenzgesetz fort."
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
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'FAQ', url: '/faq' }]} />
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              HÄUFIG GESTELLTE FRAGEN
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Fragen und Antworten zum Lohnvergleich
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Fundierte Antworten zu Berechnungsmethoden, Datenquellen, arbeitsrechtlichen Auskunftsansprüchen und Tarifverträgen.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

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
          url="https://www.lohnvergleichsrechner.de/faq"
        />
      </section>
      </div>

    </div>
  );
}
