import { Link } from 'react-router-dom';
import { DATA_METADATA } from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import CitationBox from '../components/CitationBox';
import {
  ShieldCheck,
  ExternalLink,
  Calculator
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      
      <Breadcrumbs items={[{ name: 'Methodik & Datenquellen', url: '/methodik' }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          TRANSPARENZBERICHT &amp; WISSENSCHAFTLICHE GRUNDLAGEN
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
          Methodik, Datenquellen &amp; Berechnungsverfahren
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Wie berechnet lohnvergleichsrechner.de Gehälter und Entgelt-Benchmarks? Erfahren Sie alles über amtliche Primärquellen, das statistische Perzentil-Verfahren und die Grenzen der Modellrechnung.
        </p>
      </div>

      {/* Version Status Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Aktualitätsstatus des Datenbestands
          </span>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
            Version {DATA_METADATA.version} · Stand {DATA_METADATA.lastUpdated}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 pt-1">
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Destatis Verdienststatistik</span>
            <span className="font-bold text-slate-800">{DATA_METADATA.destatisSurvey}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Bundesagentur für Arbeit</span>
            <span className="font-bold text-slate-800">{DATA_METADATA.baStats}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Rechtsgrundlage</span>
            <span className="font-bold text-slate-800">{DATA_METADATA.bmasRef}</span>
          </div>
        </div>
      </div>

      {/* Detailkapitel */}
      <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        
        {/* Kapitel 1 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Amtliche Primärquellen und Stichprobenumfang
            </h2>
          </div>
          <p>
            Im Gegensatz zu kommerziellen Gehaltsportalen, die häufig auf unüberprüften Selbstangaben einzelner Internetnutzer basieren, stützt sich <strong>lohnvergleichsrechner.de</strong> ausschließlich auf amtliche und repräsentative Vollerhebungen:
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Statistisches Bundesamt (Destatis) – Verdienststrukturerhebung (VSE)</h3>
                <a
                  href="https://www.destatis.de/DE/Themen/Arbeit/Verdienste/_inhalt.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  destatis.de <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Die Verdienststrukturerhebung nach § 12 Verdienststatistikgesetz (VStatG) erfasst die tatsächlichen Bruttoverdienste von Millionen Beschäftigten aus den Lohnabrechnungen der Unternehmen. Sie liefert die empirischen Koeffizienten für Bundesländer, Altersgruppen, Bildungsabschlüsse und Branchen.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Bundesagentur für Arbeit (BA) – Entgeltatlas (KldB 2010)</h3>
                <a
                  href="https://entgeltatlas.arbeitsagentur.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  arbeitsagentur.de <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Die Beschäftigungsstatistik der BA analysiert die Meldungen zur Sozialversicherung aller sozialversicherungspflichtig Vollzeitbeschäftigten in Deutschland. Die Zuordnung erfolgt über den 5-stelligen Schlüssel der Klassifikation der Berufe 2010 (KldB 2010).
              </p>
            </div>
          </div>
        </section>

        {/* Kapitel 2 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Warum der Median der einzig juristisch haltbare Benchmark ist
            </h2>
          </div>
          <p>
            Das arithmetische Mittel (der umgangssprachliche Durchschnitt) hat in der Gehaltsstatistik einen gravierenden methodischen Mangel: Es ist extrem anfällig für Ausreißer nach oben. Wenige Vorstandsgehälter oder hohe Boni ziehen den rechnerischen Durchschnitt stark in die Höhe, obwohl die überwiegende Mehrheit der Belegschaft deutlich weniger verdient.
          </p>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-slate-800 text-sm space-y-2">
            <p>
              <strong>Beispiel:</strong> In einer Abteilung mit 9 Angestellten zu je 3.500 € und einem Abteilungsleiter mit 20.000 € beträgt das Durchschnittsgehalt 5.150 €. Der <strong>Median</strong> beträgt hingegen exakt <strong>3.500 €</strong> und bildet die Realität der Angestellten wahrheitsgetreu ab.
            </p>
            <p className="text-xs text-emerald-950 font-mono">
              Aus diesem Grund schreibt der Gesetzgeber in § 11 Abs. 3 des Entgelttransparenzgesetzes (EntgTranspG) zwingend die Angabe des statistischen Medians vor.
            </p>
          </div>
        </section>

        {/* Kapitel 3 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Einschränkungen und Grenzen der Modellrechnung
            </h2>
          </div>
          <p>
            Trotz höchster statistischer Sorgfalt und wissenschaftlicher Modellierung unterliegt jeder Gehaltsrechner methodischen Einschränkungen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pl-2">
            <li><strong>Sonderzahlungen &amp; Boni:</strong> Feste Jahressonderzahlungen (13. Monatsgehalt, vertragliches Urlaubsgeld) sind im Bruttojahresgehalt enthalten. Stark schwankende, rein erfolgsabhängige Tantiemen ohne Rechtsanspruch können im Modell nur standardisiert abgebildet werden.</li>
            <li><strong>Individuelle Leistungszulagen:</strong> Außertarifliche Leistungszulagen, AT-Boni oder besondere Verhandlungssituationen in Nischenbranchen können im Einzelfall zu Abweichungen vom Benchmark führen.</li>
            <li><strong>Keine individuelle Rechts- oder Steuerberatung:</strong> Die Netto-Orientierungswerte stellen Richtwerte nach § 38b EStG dar. Die exakte Steuerlast hängt von persönlichen Freibeträgen, Vorsorgeaufwendungen und Kirchensteuer ab.</li>
          </ul>
        </section>

      </div>

      {/* CTA To Calculator */}
      <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-white">Gehalt jetzt datengestützt vergleichen</h3>
          <p className="text-xs text-slate-400 mt-0.5">Nutzen Sie den Rechner auf Basis der hier beschriebenen Methodik.</p>
        </div>
        <Link
          to="/rechner"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shrink-0"
        >
          <Calculator className="w-4 h-4" />
          Zum Rechner
        </Link>
      </div>

      {/* Citation Box */}
      <section>
        <CitationBox
          title="Methodik und Datenherkunft: Lohn- und Gehaltsvergleich nach Destatis und KldB 2010"
          url="https://lohnvergleichsrechner.de/methodik"
        />
      </section>

    </div>
  );
}
