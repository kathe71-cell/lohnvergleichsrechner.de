import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  MapPin,
  Building2,
  Scale,
  ArrowRight
} from 'lucide-react';
import CalculatorWidget from '../components/CalculatorWidget';
import Top20Grid from '../components/Top20Grid';
import StateComparisonTable from '../components/StateComparisonTable';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION: Sachlich, utility-fokussiert, Rechner direkt above the fold */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          
          {/* Kompakte sachliche Einordnung & H1 */}
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              Lohn- &amp; Gehaltsvergleich für Deutschland
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Gehalt vergleichen – nach Beruf, Region und Erfahrung
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Vergleichen Sie Ihr Bruttoentgelt mit dem statistischen Median Ihrer Vergleichsgruppe auf Basis amtlicher Gehaltsdaten der Bundesagentur für Arbeit und des Statistischen Bundesamtes.
            </p>
          </div>

          {/* Subtiler Daten- & Methodenhinweis unmittelbar am Rechner */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 font-mono">
            <span className="font-semibold text-slate-700">Datenbasis:</span>
            <span>Bundesagentur für Arbeit (Entgeltatlas)</span>
            <span className="text-slate-300">·</span>
            <span>Destatis Verdienststatistik</span>
            <span className="text-slate-300">·</span>
            <span>30 Berufe (KldB 2010)</span>
            <span className="text-slate-300">·</span>
            <span>16 Bundesländer</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700 font-bold">Transparente Methodik</span>
          </div>

          {/* Der Rechner direkt als primäres Produkt above the fold */}
          <div id="rechner-section">
            <CalculatorWidget />
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* PFLICHT-BAUSTEIN 1: Position-0 Definitions-Box (Featured Snippet) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md bg-emerald-100 text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-emerald-900">
              Amtliche Definition &amp; Methodik
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
            Was ist ein Lohnvergleich und wie wird der Benchmark berechnet?
          </h2>
          <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-2 font-medium">
            <p>
              Ein <strong>Lohnvergleich</strong> ermittelt das marktübliche Bruttoarbeitsentgelt für eine konkrete berufliche Tätigkeit unter Berücksichtigung von Qualifikation, Berufserfahrung, Bundesland und Betriebsgröße. Als statistisch belastbare Referenzgröße dient – analog zum Grundsatz des Entgelttransparenzgesetzes (§ 11 Abs. 3 EntgTranspG) und der Rechtsprechung des Bundesarbeitsgerichts (BAG) – der statistische <strong>Median (50. Perzentil)</strong> einer repräsentativen Vergleichsgruppe auf Basis der amtlichen Verdienststrukturerhebung (Destatis) und der Klassifikation der Berufe (KldB 2010), um Verzerrungen durch Spitzengehälter auszuschließen. Ein marktbasierter Lohnvergleich dient der empirischen Gehaltseinordnung und begründet keinen gesetzlichen Auskunftsanspruch im Sinne des § 10 EntgTranspG.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <span>Statistischer Standard: Median (50 %) · Referenzgesetze: EntgTranspG &amp; Richtlinie (EU) 2023/970</span>
            <span>Datenbasis: Destatis Verdienststatistik &amp; BA-Entgeltatlas</span>
          </div>
        </section>

        {/* PFLICHT-BAUSTEIN 2: Top-20 High-Volume Entitäten Grid */}
        <section>
          <Top20Grid />
        </section>

        {/* ASYMMETRISCHES BENTO-GRID ZU DEN 4 ENTSCHEIDENDEN GEHALTSFAKTOREN */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Einflussgrößen
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Welche Faktoren bestimmen Ihr Gehalt in Deutschland?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Die empirischen Hebel der amtlichen Verdienststrukturerhebung des Statistischen Bundesamtes im Überblick.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Bento Card 1: Bundesland (Groß - 2 Spalten) */}
            <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                  <MapPin className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Faktor 1 · Bis zu 29 % Differenz
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Regionales Lohn- und Kaufkraftgefälle (Ost-West &amp; Metropolen)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Der Arbeitsort hat den stärksten exogenen Einfluss auf das Bruttogehalt. Spitzenreiter sind Hamburg (+13,4 %), Baden-Württemberg (+8,9 %) und Hessen (+7,7 %). Die ostdeutschen Bundesländer (z. B. Mecklenburg-Vorpommern mit -18,4 % und Thüringen mit -18,1 %) weisen historisch bedingt niedrigere Nominalgehälter auf, wenngleich die Lebenshaltungskosten und Mieten regional dämpfend wirken.
              </p>
              <div className="pt-2">
                <Link
                  to="/entgeltatlas"
                  className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Regionale Tabelle ansehen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Unternehmensgröße (1 Spalte) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Faktor 2
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Betriebsgröße &amp; Tarifbindung
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unternehmen mit mehr als 1.000 Mitarbeitern zahlen im Mittel <strong>20 bis 35 % höhere Entgelte</strong> als Betriebe mit weniger als 20 Beschäftigten. Grund hierfür sind höhere Tarifbindungsquoten (z. B. IG Metall, IGBCE) und strukturierte Eingruppierungssysteme.
              </p>
            </div>

            {/* Bento Card 3: Qualifikation & Studium (1 Spalte) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Faktor 3
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Bildungsabschluss &amp; Spezialisierung
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Akademiker (Master / Diplom) erzielen über das gesamte Erwerbsleben hinweg durchschnittlich <strong>30 bis 45 % höhere Gehälter</strong> als Personen mit dualer Berufsausbildung, wobei Meister- und Fachwirtabschlüsse diesen Abstand in technischen Branchen stark verringern.
              </p>
            </div>

            {/* Bento Card 4: Berufserfahrung & Verantwortung (2 Spalten) */}
            <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                  <Scale className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Faktor 4 · Seniorität &amp; Führung
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Erfahrungsstufen &amp; disziplinarische Personalverantwortung
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Der Gehaltszuwachs verläuft in den ersten 5 Berufsjahren am steilsten (ca. 5–8 % p.a.). Mit Übernahme disziplinarischer Personal- und Budgetverantwortung steigt das Entgelt typischerweise um weitere <strong>20 bis 40 %</strong> über das Niveau erfahrener Fachkräfte ohne Führungsfunktion.
              </p>
              <div className="pt-2">
                <Link
                  to="/ratgeber"
                  className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Ratgeber zur Gehaltsverhandlung lesen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Bundesland-Tabelle */}
        <section>
          <StateComparisonTable />
        </section>

        {/* PFLICHT-BAUSTEIN 4: E-E-A-T Redaktions-Trust & Datenquellen */}
        <section>
          <EditorialTrustBox />
        </section>

        {/* PFLICHT-BAUSTEIN 5: Topical Authority Ratgeber-Cards */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Wissen &amp; Rechtslage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Ratgeber rund um Gehaltstransparenz und Arbeitsrecht
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Fundierte Leitfäden zu gesetzlichen Rechten, Verhandlungsstrategien und tariflichen Rahmenbedingungen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link
              to="/ratgeber#auskunftsanspruch"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all space-y-3 group"
            >
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                § 10 EntgTranspG
              </span>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Der gesetzliche Auskunftsanspruch über Kollegengehälter
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                In Betrieben mit mehr als 200 Beschäftigten haben Arbeitnehmer das Recht zu erfahren, was Kollegen des anderen Geschlechts in vergleichbarer Position im Median verdienen.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                Leitfaden lesen <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/ratgeber#eu-richtlinie"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all space-y-3 group"
            >
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                Richtlinie (EU) 2023/970
              </span>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                EU-Entgelttransparenz: Pflichtangaben in Stellenanzeigen
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Die europäische Richtlinie verpflichtet Unternehmen, künftig bereits vor dem Bewerbungsgespräch Gehaltsbänder transparent offenzulegen. Ein Verbot von Gehaltsgeheimnissen droht.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                Leitfaden lesen <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/ratgeber#verhandlung"
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all space-y-3 group"
            >
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                Karrierestrategie
              </span>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Gehaltsverhandlung: Argumentieren mit objektiven Daten
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Wie Sie statistische Mediane, Gehalts-Benchmarks und den wirtschaftlichen Mehrwert Ihrer Leistung strukturiert einsetzen, um 8 bis 15 % Gehaltssteigerung zu realisieren.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                Leitfaden lesen <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

          </div>
        </section>

        {/* FAQ Accordion auf der Startseite */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Antworten der Fachredaktion
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Häufige Fragen zum Lohnvergleich (FAQ)
            </h3>
          </div>

          <div className="divide-y divide-slate-200">
            
            <div className="py-4 space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Warum verwendet der Lohnvergleichsrechner den Median statt des Durchschnitts?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Das arithmetische Mittel (der Durchschnitt) wird durch extrem hohe Vorstands- und Spitzengehälter stark nach oben verzerrt. Der <strong>Median (50. Perzentil)</strong> teilt alle Gehälter exakt in zwei Hälften: Genau 50 % verdienen mehr, 50 % verdienen weniger. Er spiegelt daher das reale „mittlere Einkommen“ einer Berufsgruppe wissenschaftlich exakt wider.
              </p>
            </div>

            <div className="py-4 space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Woher stammen die Gehaltsdaten von lohnvergleichsrechner.de?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Die Daten basieren auf den amtlichen Vollerhebungen der <strong>Bundesagentur für Arbeit (Entgeltatlas)</strong> und der <strong>Verdienststrukturerhebung des Statistischen Bundesamtes (Destatis)</strong> nach der amtlichen Klassifikation der Berufe (KldB 2010). Sie erfassen sozialversicherungspflichtig Vollzeitbeschäftigte in Deutschland.
              </p>
            </div>

            <div className="py-4 space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                Habe ich einen gesetzlichen Anspruch auf gleichen Lohn?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ja, nach dem Entgelttransparenzgesetz (§ 1 EntgTranspG) und Art. 157 AEUV gilt das Gebot des gleichen Entgelts für gleiche oder gleichwertige Arbeit bei Männern und Frauen. Seit dem Grundsatzurteil des Bundesarbeitsgerichts vom 16.02.2023 (8 AZR 450/21) darf ein Arbeitgeber einem Mann nicht allein deshalb mehr zahlen als einer Frau, weil er im Einstellungsgespräch besser verhandelt hat.
              </p>
            </div>

          </div>

          <div className="pt-2 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              Alle 12 Fragen &amp; Antworten ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* PFLICHT-BAUSTEIN 8.5: Zitations-Box */}
        <section>
          <CitationBox
            title="Lohnvergleichsrechner Deutschland: Datengestützte Gehaltsanalyse nach Destatis VSE & BA-Entgeltatlas"
            url="https://lohnvergleichsrechner.de/"
          />
        </section>

      </div>

    </div>
  );
}
