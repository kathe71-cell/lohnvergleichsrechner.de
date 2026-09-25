import { useParams, Link, Navigate } from 'react-router-dom';
import {
  STATE_FACTORS,
  EXPERIENCE_FACTORS,
  getStateBySlug,
  getJobById
} from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import {
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function JobStateSalaryPage() {
  const { jobId, stateSlug } = useParams<{ jobId: string; stateSlug: string }>();
  
  const job = jobId ? getJobById(jobId) : undefined;
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!job || !state) {
    return <Navigate to="/gehalt" replace />;
  }

  const shortTitle = job.title.split(' / ')[0];

  // Modellierter regionaler Median: Auf volle 100 € gerundet zur Vermeidung von Scheingenauigkeit (Kategorie C)
  const regionalMedianYear = Math.round((job.medianYear * state.factor) / 100) * 100;
  const regionalMedianMonth = Math.round(regionalMedianYear / 12);
  const regionalHourly = (regionalMedianYear / (40 * 52)).toFixed(2);
  const diffToBund = Math.round((state.factor - 1) * 100);

  // Other states that actually have dedicated landing pages for this job
  const focusStates = ["BW", "BY", "HE", "NW", "BE", "SN"];
  const otherDedicatedStates = STATE_FACTORS.filter(s => focusStates.includes(s.code) && s.code !== state.code);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs
            items={[
              { name: 'Gehalt nach Beruf', url: '/gehalt' },
              { name: shortTitle, url: `/gehalt/${job.id}` },
              { name: state.name, url: `/gehalt/${job.id}/${state.slug}` }
            ]}
          />

          {/* Header */}
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              REGIONALE AUSWERTUNG · {state.name.toUpperCase()} (FAKTOR {state.factor.toFixed(3)})
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Gehalt als <span className="text-emerald-700">{shortTitle}</span> in {state.name}: Regionaler Lohnvergleich
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Wie hoch ist das Gehalt als {shortTitle} in {state.name}? Für {state.name} ergibt sich ein modellierter Orientierungswert (Kategorie C) von rund <strong>{regionalMedianYear.toLocaleString('de-DE')} €</strong> brutto im Jahr (ca. <strong>{regionalMedianMonth.toLocaleString('de-DE')} €</strong> im Monat). Dies entspricht einer Abweichung von <strong>{diffToBund >= 0 ? `+${diffToBund} %` : `${diffToBund} %`}</strong> gegenüber dem bundesweiten Berufsmedian ({job.medianYear.toLocaleString('de-DE')} €), basierend auf dem allgemeinen regionalen Lohnniveau nach der Entgeltstatistik der Bundesagentur für Arbeit.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
              Regionaler Median ({state.name})
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Kategorie C
            </span>
          </div>
          <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
            rund {regionalMedianYear.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            ≈ <strong>rund {regionalMedianMonth.toLocaleString('de-DE')} €</strong> / Monat brutto
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Modelliert mit Landesfaktor {state.factor.toFixed(3)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              Bundesmedian (Deutschland)
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie A
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
            {job.medianYear.toLocaleString('de-DE')} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            ≈ <strong>{Math.round(job.medianYear / 12).toLocaleString('de-DE')} €</strong> / Monat brutto
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            BA Entgeltatlas (unskalierte Bundesbasis)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              Abweichung zum Bund
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie B
            </span>
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${diffToBund >= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
            {diffToBund >= 0 ? `+${diffToBund} %` : `${diffToBund} %`}
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            Index: {(state.factor * 100).toFixed(1)} (Bund = 100)
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Regionales Gehaltsniveau nach BA
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
              Stundenlohn ({state.name})
            </span>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Kategorie B
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
            {regionalHourly} €
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            bei 40h-Vollzeitwoche (52 Wochen)
          </span>
          <span className="text-[10px] text-slate-500 block mt-2">
            Mathematisch aus Landesmedian abgeleitet
          </span>
        </div>

      </div>

      {/* CTA: Rechner pre-filled */}
      <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Gehalt individuell für {state.name} im Rechner simulieren
          </h2>
          <p className="text-slate-600 text-sm">
            Passen Sie Berufserfahrung, Unternehmensgröße und Abschluss an, um Ihren genauen Netto- und Brutto-Benchmark für {state.name} zu erhalten.
          </p>
        </div>
        <Link
          to={`/rechner?beruf=${job.id}&bundesland=${state.code}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          Rechner mit {state.name} öffnen
        </Link>
      </div>

      {/* Progression in this state */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Erfahrungsstufen in {state.name}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Gehaltsentwicklung nach Berufserfahrung in {state.name}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4 rounded-l-lg">Erfahrungsstufe</th>
                <th className="py-3 px-4">Monat brutto ({state.name})</th>
                <th className="py-3 px-4">Jahr brutto ({state.name})</th>
                <th className="py-3 px-4 font-mono rounded-r-lg">Bundesweiter Vergleich</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(EXPERIENCE_FACTORS).map(([key, exp]) => {
                const stateExpYear = Math.round(regionalMedianYear * exp.factor);
                const stateExpMonth = Math.round(stateExpYear / 12);
                const federalExpYear = Math.round(job.medianYear * exp.factor);
                return (
                  <tr key={key} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {exp.label}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      ca. {stateExpMonth.toLocaleString('de-DE')} €
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-800">
                      {stateExpYear.toLocaleString('de-DE')} €
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-500">
                      Bund: {federalExpYear.toLocaleString('de-DE')} € ({diffToBund >= 0 ? `+${diffToBund} %` : `${diffToBund} %`})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Andere Bundesländer für diesen Beruf */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {job.title.split(' / ')[0]} in weiteren Bundesländern
          </h2>
          <Link
            to={`/gehalt/${job.id}`}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Alle 16 Bundesländer ansehen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherDedicatedStates.map((other) => {
            const otherMedian = Math.round(job.medianYear * other.factor);
            return (
              <Link
                key={other.code}
                to={`/gehalt/${job.id}/${other.slug}`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-2xs transition-all text-left group"
              >
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 block truncate">
                  {other.name}
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-700 mt-1 block">
                  {otherMedian.toLocaleString('de-DE')} €
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Citation Box */}
      <section>
        <CitationBox
          title={`Gehalt als ${shortTitle} in ${state.name}: Regionaler Lohnvergleich und Modellierung`}
          url={`https://lohnvergleichsrechner.de/gehalt/${job.id}/${state.slug}`}
        />
      </section>
      </div>

    </div>
  );
}
