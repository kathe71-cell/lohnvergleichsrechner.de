import { CheckCircle2, FileSpreadsheet, ShieldCheck, Scale, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DATA_METADATA } from '../data/salaryData';

export default function EditorialTrustBox() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-slate-900 text-base">
            Transparenz, Methodik &amp; Datenherkunft
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Berechnungsstand: <strong className="text-slate-800">{DATA_METADATA.calculationDate}</strong> · BA-Stichtag: <strong className="text-slate-800">{DATA_METADATA.baCensusDate}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
        <div className="flex items-start gap-2.5">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold mb-0.5">Amtliche Primärquellen</strong>
            Datenbasis der Bundesagentur für Arbeit (Entgeltatlas, KldB 2010 5-Steller) und des Statistischen Bundesamtes (Destatis Verdiensterhebung nach VStatG).
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Scale className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold mb-0.5">Median-Standard nach EntgTranspG</strong>
            Orientierung am statistischen Median-Grundsatz (§ 11 Abs. 3 EntgTranspG). Rechner dient als externer Markt-Benchmark (kein innerbetrieblicher Auskunftsanspruch).
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold mb-0.5">Statistische Robustheit</strong>
            Fokussierung auf den Median (50. Perzentil) statt verzerrender Durchschnitte. Ausweisung interquartiler Bandbreiten (P25 - P75).
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200/80">
        <div className="flex flex-wrap items-center gap-3">
          {DATA_METADATA.primarySources.map(source => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <span>{source.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ))}
        </div>
        <Link
          to="/methodik"
          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Ausführliche Methodik &amp; Quellenprüfung <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
