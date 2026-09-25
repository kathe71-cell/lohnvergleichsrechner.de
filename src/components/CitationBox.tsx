import { useState } from 'react';
import { Copy, Check, Quote } from 'lucide-react';
import { DATA_METADATA } from '../data/salaryData';

interface CitationBoxProps {
  title?: string;
  url?: string;
}

export default function CitationBox({
  title = "Lohn- und Gehaltsvergleich Deutschland: Statistische Verdienststrukturen und KldB-Klassifikation",
  url = "https://lohnvergleichsrechner.de/"
}: CitationBoxProps) {
  const [copied, setCopied] = useState(false);
  const currentYear = DATA_METADATA.contentYear;
  const citationText = `lohnvergleichsrechner.de Redaktion (${currentYear}). ${title}. Abgerufen von ${url} (Datenstand: Destatis Verdiensterhebung & Bundesagentur für Arbeit Entgeltatlas).`;

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 no-print">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
          <Quote className="w-4 h-4 text-emerald-600" />
          Wissenschaftliche Zitation (APA / Harvard Format)
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
          aria-label="Zitation in die Zwischenablage kopieren"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Kopiert!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              Zitation kopieren
            </>
          )}
        </button>
      </div>
      <p className="text-xs sm:text-sm text-slate-700 font-serif italic bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed select-all">
        "{citationText}"
      </p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span>Primärquellen: Destatis VSE / Verdienststatistik (§ 12 VStatG)</span>
        <span>·</span>
        <span>BA Entgeltatlas KldB 2010</span>
      </div>
    </div>
  );
}
