import { Link } from 'react-router-dom';
import { STATE_FACTORS } from '../data/salaryData';
import { MapPin, ArrowRight } from 'lucide-react';

export default function StateComparisonTable() {
  const sortedStates = [...STATE_FACTORS].sort((a, b) => b.factor - a.factor);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Regionales Lohngefälle
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Gehaltsvergleich nach allen 16 Bundesländern
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Abweichung zum Bundesdurchschnitt (100 %) basierend auf der amtlichen Destatis-Verdienststrukturerhebung.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-mono uppercase tracking-wider text-slate-500 bg-slate-50">
              <th className="py-3 px-4 rounded-l-lg">Rang</th>
              <th className="py-3 px-4">Bundesland</th>
              <th className="py-3 px-4">Abweichung zum Bundesschnitt</th>
              <th className="py-3 px-4 font-mono">Gesamtmedian p.a.</th>
              <th className="py-3 px-4 text-right rounded-r-lg">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedStates.map((state, idx) => {
              const diffPercent = Math.round((state.factor - 1) * 100);
              const isPositive = diffPercent >= 0;
              return (
                <tr key={state.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {state.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                      isPositive ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isPositive ? `+${diffPercent} %` : `${diffPercent} %`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {state.medianYearAll.toLocaleString('de-DE')} €
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/rechner?bundesland=${state.code}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      Filtern <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
