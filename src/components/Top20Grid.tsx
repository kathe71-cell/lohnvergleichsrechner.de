import { Link } from 'react-router-dom';
import { SALARY_DATABASE } from '../data/salaryData';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function Top20Grid() {
  const topJobs = SALARY_DATABASE.slice(0, 16);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Häufig gesuchte Berufsfelder
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Entgelt-Benchmarks nach Berufsbildern
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Bundesweiter Median nach KldB-Klassifikation der Bundesagentur für Arbeit (Vollzeit, 40h/Woche).
          </p>
        </div>
        <Link
          to="/entgeltatlas"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Zum vollständigen Entgeltatlas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topJobs.map((job) => (
          <Link
            key={job.id}
            to={`/rechner?beruf=${job.id}`}
            className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  KldB {job.kldbCode}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +{job.trendPercent} %
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                {job.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {job.shortDesc}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Bundesmedian
                </span>
                <span className="text-base font-extrabold font-mono text-slate-900">
                  {job.medianYear.toLocaleString('de-DE')} €
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Prüfen <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
