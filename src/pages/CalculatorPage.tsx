import CalculatorWidget from '../components/CalculatorWidget';
import CitationBox from '../components/CitationBox';
import EditorialTrustBox from '../components/EditorialTrustBox';
import { ShieldCheck } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Intro Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          INTERAKTIVES BERECHNUNGSWERKZEUG
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Lohnvergleichsrechner: Ihr Gehalt im Marktvergleich
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Berechnen Sie auf Basis empirischer Erhebungen des Statistischen Bundesamtes und der Bundesagentur für Arbeit den fairen Marktwert Ihrer beruflichen Qualifikation.
        </p>
      </div>

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
          title="Lohnvergleichsrechner: Interaktives Marktwert-Benchmark nach Bundesland, Beruf und Erfahrung"
          url="https://lohnvergleichsrechner.de/rechner"
        />
      </section>

    </div>
  );
}
