import { Link } from 'react-router-dom';
import { DATA_METADATA, SALARY_DATABASE } from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import StateComparisonTable from '../components/StateComparisonTable';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import {
  BarChart3,
  Scale,
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function AverageSalaryPage() {
  const topCategories = Array.from(new Set(SALARY_DATABASE.map(j => j.category))).map(cat => {
    const jobsInCat = SALARY_DATABASE.filter(j => j.category === cat);
    const avgCatMedian = Math.round(jobsInCat.reduce((sum, j) => sum + j.medianYear, 0) / jobsInCat.length);
    return {
      category: cat,
      medianYear: avgCatMedian,
      medianMonth: Math.round(avgCatMedian / 12),
      jobCount: jobsInCat.length
    };
  }).sort((a, b) => b.medianYear - a.medianYear);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      
      <Breadcrumbs items={[{ name: 'Durchschnittsgehalt Deutschland', url: '/durchschnittsgehalt' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
          DESTATIS VERDIENSTSTATISTIK · STAND {DATA_METADATA.lastUpdated.toUpperCase()}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
          Durchschnittsgehalt in Deutschland: <span className="text-emerald-700">Zahlen, Fakten &amp; Median</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Wie hoch ist das Durchschnittsgehalt und das Mediangehalt in Deutschland? Alle offiziellen Daten des Statistischen Bundesamtes (Destatis) nach Bundesland, Branche, Bildungsabschluss und Unternehmensgröße im Überblick.
        </p>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
            Bundesweiter Median (50 %)
          </span>
          <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
            {DATA_METADATA.federalMedianFullTimeMonthly.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            brutto / Monat (<strong>{DATA_METADATA.federalMedianFullTimeYearly.toLocaleString('de-DE')} €</strong> / Jahr)
          </span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-semibold inline-block mt-2">
            50 % verdienen mehr, 50 % weniger
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
            Arithmetischer Durchschnitt
          </span>
          <div className="text-3xl font-black text-slate-800 font-mono tracking-tight">
            {DATA_METADATA.federalAverageFullTimeMonthly.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            brutto / Monat (<strong>{DATA_METADATA.federalAverageFullTimeYearly.toLocaleString('de-DE')} €</strong> / Jahr)
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Verzerrt durch Spitzengehälter
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
            Höchstes Bundesland
          </span>
          <div className="text-3xl font-black text-emerald-700 font-mono tracking-tight">
            Hamburg
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            4.304 € / Mo. (+13,4 % über Bundesmedian)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
            Verdienstabstand Ost/West
          </span>
          <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
            ca. 729 €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            monatliche Differenz (West 3.896 € vs. Ost 3.167 €)
          </span>
        </div>

      </div>

      {/* Deep Dive: Median vs. Durchschnitt */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <Scale className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Median vs. Durchschnitt: Warum der Unterschied entscheidend ist
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
            <h3 className="font-extrabold text-emerald-950 text-base">Der Median: Das reale Normalgehalt (50. Perzentil)</h3>
            <p className="text-emerald-900/90 text-xs sm:text-sm">
              Ordnet man alle Vollzeitbeschäftigten der Reihe nach nach ihrem Gehalt, so verdient die Person genau in der Mitte den Median. In der amtlichen <strong>Verdienststrukturerhebung (Destatis VSE)</strong> liegt dieser bei <strong>4.100 Euro brutto im Monat</strong>; in der <strong>Entgeltstatistik der Bundesagentur für Arbeit (BA)</strong> für die 22 Mio. sozialversicherungspflichtigen Vollzeitbeschäftigten der Kerngruppe bei <strong>3.796 Euro brutto im Monat</strong> (BT-Drs. 20/12571). Der Median ist unempfindlich gegenüber Ausreißern und im <strong>Entgelttransparenzgesetz (§ 11 Abs. 3 EntgTranspG)</strong> der gesetzliche Vergleichswert.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-extrabold text-slate-900 text-base">Der Durchschnitt (4.479 € / Monat): Mathematisches Mittel</h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Das arithmetische Mittel (Destatis VSE: 4.479 € im Monat) dividiert die gesamte Lohnsumme durch alle Beschäftigten. Da Spitzenverdiener, Partner und Vorstände Millionenbeträge beziehen, nach unten hin aber durch den gesetzlichen Mindestlohn eine Grenze existiert, liegt der arithmetische Durchschnitt in Deutschland stets rund <strong>350 bis 400 Euro über dem Median</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Gehalt nach Branchen */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Branchenübersicht
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
              Durchschnittsgehalt nach Branchen &amp; Berufsfeldern
            </h2>
          </div>
          <Link
            to="/entgeltatlas"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            Zum Berufs-Entgeltatlas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCategories.map(cat => (
            <div key={cat.category} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {cat.category}
              </span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {cat.medianYear.toLocaleString('de-DE')} €
              </div>
              <div className="text-xs text-slate-500 flex justify-between items-center pt-1 border-t border-slate-200">
                <span>ca. {cat.medianMonth.toLocaleString('de-DE')} € / Monat</span>
                <span className="font-semibold text-emerald-700">{cat.jobCount} Berufe</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundesland-Tabelle */}
      <section>
        <StateComparisonTable />
      </section>

      {/* CTA To Calculator */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Liegen Sie über oder unter dem deutschen Median?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Vergleichen Sie Ihr individuelles Gehalt mit den Daten Ihrer Peer-Group nach Bundesland, Berufserfahrung und Betriebsgröße.
          </p>
        </div>
        <Link
          to="/rechner"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          Jetzt Lohnvergleich starten
        </Link>
      </div>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Citation Box */}
      <section>
        <CitationBox
          title="Durchschnittsgehalt Deutschland: Amtliche Mediane, Ost-West-Vergleich und Destatis-Statistiken"
          url="https://lohnvergleichsrechner.de/durchschnittsgehalt"
        />
      </section>

    </div>
  );
}
