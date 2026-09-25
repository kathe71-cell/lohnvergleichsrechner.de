import { BookOpen, Scale, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';

export default function GuidePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          ARBEITSRECHT &amp; GEHALTSVERHANDLUNG
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Ratgeber: Entgelttransparenz, Auskunftsanspruch &amp; Verhandlung
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Fundierte juristische und strategische Einordnung des Entgelttransparenzgesetzes (§ 10 EntgTranspG), der EU-Richtlinie 2023/970 sowie praxiserprobte Verhandlungsstrategien.
        </p>
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-12">
        
        {/* Section 1: Auskunftsanspruch */}
        <section id="auskunftsanspruch" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Scale className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Kapitel 1 · Gesetzliche Grundlage
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Der individuelle Auskunftsanspruch nach § 10 EntgTranspG
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Seit Inkrafttreten des <strong>Entgelttransparenzgesetzes (EntgTranspG)</strong> im Jahr 2017 haben Beschäftigte in Deutschland unter bestimmten Voraussetzungen das Recht, Auskunft über die Kriterien und die Höhe des Entgelts von Kollegen des anderen Geschlechts zu verlangen.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Voraussetzungen für den Anspruch nach § 10 und § 12 EntgTranspG:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                <li><strong>Betriebsgröße:</strong> Mehr als 200 Beschäftigte beim selben Arbeitgeber (§ 12 Abs. 1 EntgTranspG).</li>
                <li><strong>Gleiche oder gleichwertige Tätigkeit:</strong> Der Anspruch bezieht sich auf eine konkrete Vergleichstätigkeit (Peer-Group).</li>
                <li><strong>Mindestgröße der Vergleichsgruppe:</strong> Mindestens 6 Kolleginnen oder Kollegen des anderen Geschlechts müssen diese Vergleichstätigkeit ausüben, um den Schutz vor individueller Identifizierung zu gewährleisten (§ 12 Abs. 3 EntgTranspG).</li>
                <li><strong>Auskunftsinhalt:</strong> Der Arbeitgeber muss den <em>statistischen Median</em> des monatlichen Bruttoentgelts sowie bis zu zwei Entgeltbestandteile (z. B. Boni, Dienstwagen) offenlegen.</li>
              </ul>
            </div>
            <p>
              Verfügt das Unternehmen über einen Betriebsrat, ist das Auskunftsverlangen in der Regel an diesen zu richten (§ 13 EntgTranspG). Der Arbeitgeber bzw. der Betriebsrat hat die Auskunft binnen drei Monaten schriftlich oder in Textform zu erteilen.
            </p>
          </div>
        </section>

        {/* Section 2: EU-Richtlinie */}
        <section id="eu-richtlinie" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Kapitel 2 · Europäisches Recht
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            EU-Entgelttransparenzrichtlinie (Richtlinie (EU) 2023/970)
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Mit der <strong>Richtlinie (EU) 2023/970</strong> des Europäischen Parlaments und des Rates zur Stärkung der Anwendung des Grundsatzes des gleichen Entgelts für Männer und Frauen bei gleicher oder gleichwertiger Arbeit wird das deutsche Transparenzrecht grundlegend verschärft. Die Richtlinie muss von den EU-Mitgliedstaaten bis zum <strong>7. Juni 2026</strong> in nationales Recht überführt werden.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm mb-1">Gehaltstransparenz vor der Einstellung (Art. 5)</h4>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  Arbeitgeber müssen Stellenbewerbern künftig bereits in der Stellenanzeige oder vor dem ersten Vorstellungsgespräch das Einstiegsgehalt oder die entsprechende Gehaltsspanne unaufgefordert mitteilen. Die Frage nach dem bisherigen Gehalt des Bewerbers wird unionsweit verboten.
                </p>
              </div>
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm mb-1">Beweislastumkehr bei Lohndiskriminierung (Art. 18)</h4>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  Macht ein Beschäftigter eine Benachteiligung beim Entgelt glaubhaft, kehrt sich die Beweislast um: Der Arbeitgeber muss beweisen, dass keine Ungleichbehandlung vorliegt. Schweigen oder unzureichende Auskunft gereichen dem Arbeitgeber zum Nachteil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: BAG-Rechtsprechung & Gender Pay Gap */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <AlertCircle className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Kapitel 3 · BAG-Rechtsprechung
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Das Grundsatzurteil des BAG: Verhandlungsgeschick rechtfertigt keine Ungleichbezahlung
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              In einem richtungsweisenden Urteil vom <strong>16. Februar 2023 (Az. 8 AZR 450/21)</strong> hat das Bundesarbeitsgericht (BAG) entschieden, dass ein Arbeitgeber den Grundsatz des gleichen Entgelts für gleiche oder gleichwertige Arbeit nicht dadurch aushebeln kann, dass ein männlicher Kollege im Einstellungsgespräch schlichtweg ein höheres Gehalt verhandelt hat.
            </p>
            <blockquote className="p-4 bg-slate-50 border-l-4 border-emerald-600 rounded-r-xl italic text-slate-800 text-sm sm:text-base">
              „Der Umstand, dass ein männlicher Arbeitnehmer ein höheres Entgelt verhandelt hat als eine weibliche Arbeitnehmerin bei gleicher Arbeit, begründet keinen sachlichen, geschlechtsunabhängigen Grund für eine Entgeltdifferenzierung.“ (BAG, Urteil vom 16.02.2023 – 8 AZR 450/21).
            </blockquote>
            <p>
              Dieses Urteil stärkt Arbeitnehmerinnen in Gehaltsprozessen massiv und zwingt Unternehmen zur Einführung transparenter, objektiver Vergütungsgitter auf Basis von Qualifikation, Verantwortung und Leistung.
            </p>
          </div>
        </section>

        {/* Section 4: Gehaltsverhandlung strategisch führen */}
        <section id="verhandlung" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Kapitel 4 · Verhandlungsstrategie
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gehaltsverhandlung: Argumentieren mit objektiven Medianwerten
          </h2>
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Erfolgreiche Gehaltsverhandlungen basieren nicht auf subjektiven Bedürfnissen (wie gestiegenen Lebenshaltungskosten), sondern auf <strong>wirtschaftlichem Wertbeitrag</strong> und <strong>statistisch belegten Marktdaten</strong>.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Datenbasierte Benchmark-Vorbereitung</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Nutzen Sie den Median unserer Destatis-Vergleichsdaten für Ihre KldB-Berufsgruppe, Ihr Bundesland und Ihre Unternehmensgröße. Treten Sie mit einem konkreten Korridor (z. B. 64.000 € bis 68.000 €) auf und begründen Sie Ihre Einordnung im oberen Quartil mit spezifischen Fachkenntnissen.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Leistungsnachweis quantifizieren</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Dokumentieren Sie abgeschlossene Projekte, Kosteneinsparungen, Umsatzsteigerungen oder Prozessoptimierungen der letzten 12 Monate mit konkreten Zahlen.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Steuerfreie und begünstigte Sachbezüge einbeziehen</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Wenn das Bruttogehalt an tarifliche Budgetgrenzen stößt, bieten Sachbezüge (§ 8 Abs. 2 EStG bis 50 €/Monat steuerfrei), Jobräder, bAV-Zuschüsse (§ 1a BetrAVG) oder Kita-Zuschüsse (§ 3 Nr. 33 EStG) eine deutlich höhere Netto-Wirkung als eine reguläre Bruttoerhöhung.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/rechner"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                Gehalt jetzt im Rechner statistisch vergleichen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Zitation */}
      <section>
        <CitationBox
          title="Entgelttransparenzgesetz und Verhandlungsstrategien: Juristische Grundlagen & Gehaltsbenchmarks"
          url="https://lohnvergleichsrechner.de/ratgeber"
        />
      </section>

    </div>
  );
}
