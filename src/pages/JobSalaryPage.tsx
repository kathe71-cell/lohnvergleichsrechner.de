import { useParams, Link, Navigate } from 'react-router-dom';
import {
  SALARY_DATABASE,
  STATE_FACTORS,
  EXPERIENCE_FACTORS,
  getRelatedJobs
} from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import {
  Briefcase,
  MapPin,
  Calculator,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  HelpCircle
} from 'lucide-react';

export default function JobSalaryPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = SALARY_DATABASE.find(j => j.id === jobId);

  if (!job) {
    return <Navigate to="/gehalt" replace />;
  }

  const shortTitle = job.title.split(' / ')[0];
  const relatedJobs = getRelatedJobs(job.id, 4);
  const medianMonth = Math.round(job.medianYear / 12);
  const p25Month = Math.round(job.p25Year / 12);
  const p75Month = Math.round(job.p75Year / 12);
  const hourlyRate = (job.medianYear / (40 * 52)).toFixed(2);

  // Top Bundesländer calculations
  const stateHighlights = STATE_FACTORS.map(state => {
    const stateMedian = Math.round(job.medianYear * state.factor);
    const stateMonth = Math.round(stateMedian / 12);
    return {
      state,
      stateMedian,
      stateMonth
    };
  }).sort((a, b) => b.stateMedian - a.stateMedian);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      
      <Breadcrumbs
        items={[
          { name: 'Gehalt nach Beruf', url: '/gehalt' },
          { name: shortTitle, url: `/gehalt/${job.id}` }
        ]}
      />

      {/* Hero Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-bold">
          <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
          KLDB-SCHLÜSSEL {job.kldbCode} · {job.category.toUpperCase()}
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
          <span className="text-emerald-700">{shortTitle}</span> Gehalt: Was verdient man in Deutschland?
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {job.shortDesc} Aktuelle Gehaltsdaten, regionale Unterschiede und statistische Quartile nach der Entgeltstatistik der Bundesagentur für Arbeit.
        </p>
      </div>

      {/* Answer-First Lead Box */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-2 text-slate-800">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          Amtlicher Gehaltsüberblick (Kurzantwort)
        </div>
        <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
          Der bundesweite Median für <strong>{shortTitle}</strong> beträgt <strong>{medianMonth.toLocaleString('de-DE')} €</strong> brutto im Monat bzw. <strong>{job.medianYear.toLocaleString('de-DE')} €</strong> im Jahr (Basis: amtliche Entgeltstatistik der Bundesagentur für Arbeit, Vollzeitbeschäftigte). Das mittlere 50-%-Intervall (25. bis 75. Perzentil) reicht von <strong>{p25Month.toLocaleString('de-DE')} €</strong> bis <strong>{p75Month.toLocaleString('de-DE')} €</strong> monatlich.
        </p>
      </div>

      {/* KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
              Median (P50)
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Kategorie A
            </span>
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
            {job.medianYear.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            ≈ <strong>{medianMonth.toLocaleString('de-DE')} €</strong> / Monat brutto
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Amtliche BA-Meldungen (KldB {job.kldbCode})
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              25. Perzentil (P25)
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie A
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 font-mono tracking-tight">
            {job.p25Year.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            ≈ <strong>{p25Month.toLocaleString('de-DE')} €</strong> / Monat brutto
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            25 % der Beschäftigten verdienen weniger
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              75. Perzentil (P75)
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie A
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 font-mono tracking-tight">
            {job.p75Year.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            ≈ <strong>{p75Month.toLocaleString('de-DE')} €</strong> / Monat brutto
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            25 % der Beschäftigten verdienen mehr
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              Rechner. Stundenlohn
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie B
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono tracking-tight">
            {hourlyRate} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            bei 40 Wochenstunden (52 Wochen)
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Mathematisch aus Median abgeleitet
          </span>
        </div>

      </div>

      {/* CTA To Calculator */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 text-xs font-mono font-bold">
            <Calculator className="w-3.5 h-3.5" /> INTERAKTIVER VERGLEICH
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Eigenen Lohn als {job.title.split(' / ')[0]} berechnen
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Geben Sie Ihr Bundesland, Ihre Berufserfahrung und Ihre Wochenarbeitszeit ein, um Ihre individuelle Peer-Group-Position zu bestimmen.
          </p>
        </div>
        <Link
          to={`/rechner?beruf=${job.id}`}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-emerald-700" />
          Im Rechner anpassen
        </Link>
      </div>

      {/* Section: Gehalt nach Berufserfahrung */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Karriereprogression
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Gehalt nach Berufserfahrung für {shortTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Modellierte Orientierungswerte (Kategorie C) basierend auf empirischen Senioritätsfaktoren bezogen auf den Berufsmedian ({job.medianYear.toLocaleString('de-DE')} €). Die amtliche BA-Entgeltstatistik weist keine Auswertungen nach Berufsjahren für Einzelberufe aus.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4 rounded-l-lg">Erfahrungsstufe</th>
                <th className="py-3 px-4">Monatsgehalt (brutto)</th>
                <th className="py-3 px-4">Jahresgehalt (brutto)</th>
                <th className="py-3 px-4 rounded-r-lg">Einstufungsbeschreibung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(EXPERIENCE_FACTORS).map(([key, exp]) => {
                const expYear = Math.round(job.medianYear * exp.factor);
                const expMonth = Math.round(expYear / 12);
                return (
                  <tr key={key} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {exp.label}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      ca. {expMonth.toLocaleString('de-DE')} €
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-800">
                      {expYear.toLocaleString('de-DE')} €
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {exp.desc}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Regionaler Vergleich nach Bundesländern */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Regionale Gehaltsspanne
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Gehalt nach Bundesland: {shortTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Modellierte Orientierungswerte (Kategorie C): Berechnet durch Verknüpfung des bundesweiten Berufsmedians (Kategorie A) mit dem allgemeinen regionalen Lohnniveau des jeweiligen Bundeslandes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stateHighlights.map(({ state, stateMedian, stateMonth }) => {
            const diff = Math.round((state.factor - 1) * 100);
            return (
              <Link
                key={state.code}
                to={`/gehalt/${job.id}/${state.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all bg-white group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {state.name}
                    </span>
                    <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      diff >= 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {diff >= 0 ? `+${diff} %` : `${diff} %`}
                    </span>
                  </div>
                  <div className="text-lg font-black font-mono text-slate-900">
                    {stateMedian.toLocaleString('de-DE')} €
                  </div>
                  <span className="text-[11px] text-slate-500">
                    ca. {stateMonth.toLocaleString('de-DE')} € / Mo.
                  </span>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                  Regionaldaten ansehen <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section: Aufgaben und typische Qualifikationen */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Berufsbild, typische Aufgaben &amp; Ausbildungsweg (KldB {job.kldbCode})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Typische Aufgaben in der Praxis
            </h3>
            <ul className="space-y-2">
              {job.tasks?.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              Qualifikation &amp; gefragte Kompetenzen
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Typischer Bildungsweg</span>
                <span className="font-bold text-slate-900">{job.typicalEducation}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Wichtige Fachkenntnisse</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills?.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verwandte Berufe (Silo-Verlinkung) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Verwandte Berufe im Bereich {job.category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedJobs.map((relJob) => (
            <Link
              key={relJob.id}
              to={`/gehalt/${relJob.id}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  KldB {relJob.kldbCode}
                </span>
                <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors line-clamp-1">
                  {relJob.title}
                </h3>
                <span className="font-mono font-bold text-slate-800 text-sm block mt-2">
                  Median: {relJob.medianYear.toLocaleString('de-DE')} €
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold mt-3 flex items-center gap-0.5">
                Profil öffnen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Häufige Fragen zum Gehalt als {shortTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Antworten auf Basis amtlicher Verdienststatistiken und transparenter Modellrechnungen.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden bg-slate-50/50 hover:bg-slate-50 transition-colors" open>
            <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base">
              <span>Wie hoch ist das Mediangehalt als {shortTitle} in Deutschland?</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 group-open:rotate-180 transition-transform">
                ↓
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Der bundesweite Median für vollzeitbeschäftigte {shortTitle} liegt bei <strong>{medianMonth.toLocaleString('de-DE')} €</strong> brutto im Monat ({job.medianYear.toLocaleString('de-DE')} € im Jahr). Genau 50 % der Beschäftigten in diesem Beruf verdienen mehr und 50 % weniger (amtliche Entgeltstatistik der Bundesagentur für Arbeit, KldB-Code {job.kldbCode}).
            </div>
          </details>

          <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base">
              <span>Wie viel verdient man als {shortTitle} beim Berufseinstieg?</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 group-open:rotate-180 transition-transform">
                ↓
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Beim Berufseinstieg (unter 3 Jahre Erfahrung) liegt das modellierte Orientierungsgehalt (Kategorie C) bei ca. <strong>{Math.round((job.medianYear * 0.82) / 12).toLocaleString('de-DE')} €</strong> brutto monatlich ({Math.round(job.medianYear * 0.82).toLocaleString('de-DE')} € jährlich). Das statistische 25. Perzentil (P25) aller Beschäftigten dieser Berufsgruppe beträgt <strong>{p25Month.toLocaleString('de-DE')} €</strong> im Monat.
            </div>
          </details>

          <details className="group border border-slate-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base">
              <span>In welchem Bundesland verdient man als {shortTitle} am meisten?</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 group-open:rotate-180 transition-transform">
                ↓
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Auf Basis der allgemeinen regionalen Lohnniveaus der Bundesländer erzielen Beschäftigte in <strong>Hamburg</strong> (ca. {Math.round((job.medianYear * 1.134) / 12).toLocaleString('de-DE')} € / Monat), <strong>Hessen</strong> (ca. {Math.round((job.medianYear * 1.095) / 12).toLocaleString('de-DE')} € / Monat) und <strong>Baden-Württemberg</strong> (ca. {Math.round((job.medianYear * 1.094) / 12).toLocaleString('de-DE')} € / Monat) rechnerisch die höchsten Gehälter. Hinweis: Hierbei handelt es sich um modellierte Orientierungswerte (Kategorie C), die aus dem Bundesmedian und den amtlichen Landesfaktoren abgeleitet werden.
            </div>
          </details>
        </div>
      </section>

      {/* Editorial Trust Box */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Citation Box */}
      <section>
        <CitationBox
          title={`Gehaltsvergleich ${job.title}: Statistische Mediane und KldB-Klassifikation`}
          url={`https://lohnvergleichsrechner.de/gehalt/${job.id}`}
        />
      </section>

    </div>
  );
}
