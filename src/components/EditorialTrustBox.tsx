import { CheckCircle2, FileSpreadsheet, ShieldCheck, Scale } from 'lucide-react';

export default function EditorialTrustBox() {
  const currentDate = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

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
          Stand: <strong className="text-slate-800">{currentDate}</strong> · Unabhängige Redaktion
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
            <strong className="text-slate-900 block font-semibold mb-0.5">Entgelttransparenzgesetz (EntgTranspG)</strong>
            Berechnungsmethodik orientiert am gesetzlichen Peer-Group-Vergleich (§ 10 Abs. 1 EntgTranspG) und der EU-Entgelttransparenzrichtlinie 2023/970.
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
    </div>
  );
}
