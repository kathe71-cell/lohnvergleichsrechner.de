import { Link } from 'react-router-dom';
import { DATA_METADATA } from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import CitationBox from '../components/CitationBox';
import {
  ExternalLink,
  Calculator
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'Methodik & Datenquellen', url: '/methodik' }]} />

          {/* Header */}
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              TRANSPARENZBERICHT &amp; WISSENSCHAFTLICHE GRUNDLAGEN
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Methodik, Datenquellen &amp; Berechnungsverfahren
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Wie berechnet lohnvergleichsrechner.de Gehälter und Entgelt-Benchmarks? Erfahren Sie alles über amtliche Primärquellen, das statistische Perzentil-Verfahren und die Grenzen der Modellrechnung.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Version Status Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Transparenz- &amp; Datenstatus
          </span>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
            Berechnungsstand: {DATA_METADATA.lastUpdated} · BA-Stichtag: 31.12.2023 · Destatis VSE
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-600 pt-1">
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Destatis</span>
            <span className="font-bold text-slate-800">VSE 2022 / Verdiensterhebung (nach VStatG)</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">BA Entgeltatlas</span>
            <span className="font-bold text-slate-800">DEÜV-Vollzeitentgelte (Stichtag 31.12.2023)</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Regionale Faktoren</span>
            <span className="font-bold text-slate-800">Länderquotienten (BA Stichtag 31.12.2023)</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">Modellberechnung</span>
            <span className="font-bold text-slate-800">Stand {DATA_METADATA.lastUpdated}</span>
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
            Die Berechnungen und Benchmarks auf <strong>lohnvergleichsrechner.de</strong> stützen sich auf amtliche und repräsentative Erhebungen der deutschen Arbeitsmarkt- und Verdienststatistik unter strikter methodischer Differenzierung:
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Statistisches Bundesamt (Destatis) – Repräsentative Stichprobenerhebung</h3>
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
                Die Verdienststatistik des Statistischen Bundesamtes nach dem Verdienststatistikgesetz (VStatG) basiert auf einer repräsentativen Stichprobenerhebung bei wirtschaftlich aktiven Betrieben. Sie liefert die empirischen Gewichtungsfaktoren für Bildungsabschlüsse, Unternehmensgrößen und Altersstufen.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Bundesagentur für Arbeit (BA) – DEÜV-Meldedaten (KldB 2010 5-Steller)</h3>
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
                Die Beschäftigungsstatistik der BA analysiert die gesetzlichen Meldungen zur Sozialversicherung (DEÜV) aller ca. 22 Millionen sozialversicherungspflichtig Vollzeitbeschäftigten der Kerngruppe in Deutschland (Stichtag 31.12.2023, BT-Drs. 20/12571). Die Berufsverortung erfolgt exakt über den 5-stelligen amtlichen Schlüssel der Klassifikation der Berufe (KldB 2010).
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
              Warum der Median der einzig wissenschaftlich robuste Benchmark ist
            </h2>
          </div>
          <p>
            Das arithmetische Mittel (der umgangssprachliche Durchschnitt) hat in der Gehaltsstatistik einen gravierenden methodischen Mangel: Es ist extrem anfällig für Ausreißer nach oben. Wenige Vorstandsgehälter oder hohe Boni ziehen den rechnerischen Durchschnitt stark in die Höhe, obwohl die überwiegende Mehrheit der Belegschaft deutlich weniger verdient. Zudem erfasst die Sozialversicherungsstatistik Einkommen oberhalb der Beitragsbemessungsgrenze nur gedeckelt, weshalb die Bundesagentur für Arbeit berufsbezogen <strong>keine</strong> arithmetischen Mittelwerte ausweist.
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

        {/* Kapitel 3: Datenkategorien */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Datenkategorien (A, B, C) und Vermeidung von Scheingenauigkeit
            </h2>
          </div>
          <p>
            Zur maximalen Transparenz unterscheiden wir auf unserem Portal streng zwischen drei Datenkategorien:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-bold text-xs">
                Kategorie A
              </span>
              <h4 className="font-extrabold text-slate-900">Amtlicher Primärwert</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Unveränderte Werte direkt aus amtlichen Tabellen der BA und Destatis (Bundesmedian, 25. Perzentil P25, 75. Perzentil P75 nach KldB 2010).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-bold text-xs">
                Kategorie B
              </span>
              <h4 className="font-extrabold text-slate-900">Berechneter Wert</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Rein mathematisch abgeleitete Werte ohne statistische Schätzung (Monatsgehalt = Jahresgehalt / 12, rechnerischer Stundenlohn bei Wochenarbeitszeit).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                Kategorie C
              </span>
              <h4 className="font-extrabold text-slate-900">Modellierter Wert</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Individuelle Orientierungswerte über parametrisierte Multiplikatoren (Bundesland, Erfahrung, Betriebsgröße). <strong>Gerundet auf volle 100 Euro</strong>, um Scheingenauigkeit zu vermeiden.
              </p>
            </div>
          </div>
        </section>

        {/* Kapitel 4 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Einschränkungen und rechtliche Einordnung
            </h2>
          </div>
          <p>
            Trotz höchster statistischer Sorgfalt und wissenschaftlicher Modellierung unterliegt jeder Gehaltsrechner methodischen Einschränkungen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pl-2">
            <li><strong>Kein gesetzliches Vergleichsentgelt nach § 10 EntgTranspG:</strong> Unser Rechner bietet eine externe Orientierung am Gesamtmarkt. Er ersetzt nicht das gesetzliche Auskunftsverlangen nach § 10 EntgTranspG, das ausschließlich innerbetrieblich in Unternehmen ab 200 Beschäftigten gegenüber dem Arbeitgeber geltend gemacht werden kann.</li>
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
          url="https://www.lohnvergleichsrechner.de/methodik"
        />
      </section>
      </div>

    </div>
  );
}
