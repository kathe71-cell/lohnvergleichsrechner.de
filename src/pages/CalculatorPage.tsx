import CalculatorWidget from '../components/CalculatorWidget';
import CitationBox from '../components/CitationBox';
import EditorialTrustBox from '../components/EditorialTrustBox';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CalculatorPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'Rechner', url: '/rechner' }]} />
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              INTERAKTIVES BERECHNUNGSWERKZEUG
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Lohnvergleichsrechner: Ihr Gehalt im statistischen Vergleich
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Berechnen Sie auf Basis empirischer Erhebungen des Statistischen Bundesamtes und der Bundesagentur für Arbeit Ihren statistischen Gehalts-Benchmark.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* The Calculator */}
        <section>
          <CalculatorWidget />
        </section>

      {/* Methodology and Explanations */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Methodik und statistische Berechnungsgrundlagen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">1</span>
              Perzentil-Verfahren statt Durchschnitt
            </h3>
            <p>
              Unser Rechner basiert auf der statistischen Quartilsmethode. Während ein mathematischer Durchschnitt durch extreme Ausreißer (z. B. Vorstandsgehälter) verzerrt wird, markiert der <strong>Median (50. Perzentil)</strong> genau den Wert, der die untere Hälfte der Beschäftigten von der oberen Hälfte trennt. Das 25. und 75. Perzentil spannen den interquartilen Korridor auf, in dem 50 % aller Gehälter liegen.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">2</span>
              Regionale Verdienstkoeffizienten
            </h3>
            <p>
              Die Gehaltsniveaus variieren in Deutschland stark. Unser Berechnungsmodell wendet die amtlichen Verdienstindizes der einzelnen 16 Bundesländer an. Dadurch fließen reale Strukturunterschiede zwischen Metropolregionen (wie Frankfurt, München, Stuttgart, Hamburg) und ländlichen Regionen direkt in das Ergebnis ein.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">3</span>
              Einfluss von Unternehmensgröße und Tarifbindung
            </h3>
            <p>
              Großunternehmen und Konzerne mit über 1.000 Mitarbeitern weisen durch Tarifverträge (z. B. Tarifverträge der Metall- und Elektroindustrie, Chemie oder TVöD) signifikant höhere Entgelte auf. Kleinbetriebe ohne Tarifbindung bewegen sich im Schnitt 12 bis 15 % unter dem Branchenschnitt.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">4</span>
              Erfahrung und Qualifikationsstufen
            </h3>
            <p>
              Berufserfahrung spiegelt sich in einer Progression wider, die sich an typischen tariflichen Erfahrungsstufen (Stufen 1 bis 6) orientiert. Promotionen und Masterabschlüsse führen insbesondere in forschungsnahen und beratenden Berufsfeldern zu signifikanten Prämien.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Trust Box */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Zitation */}
      <section>
        <CitationBox
          title="Lohnvergleichsrechner: Statistischer Gehalts-Benchmark nach Bundesland, Beruf und Erfahrung"
          url="https://lohnvergleichsrechner.de/rechner"
        />
      </section>
      </div>

    </div>
  );
}
