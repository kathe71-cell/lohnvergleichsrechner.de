import { Briefcase, ArrowRight } from 'lucide-react';

interface JobSearchRecommendationProps {
  jobTitle?: string;
}

export default function JobSearchRecommendation({ jobTitle }: JobSearchRecommendationProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as unknown as { va?: (type: string, data: Record<string, unknown>) => void }).va) {
      (window as unknown as { va: (type: string, data: Record<string, unknown>) => void }).va('event', {
        name: 'outbound_click',
        target: 'https://arbeitsplatz.de/',
        source_job: jobTitle || 'unknown',
      });
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-slate-100 text-slate-700">
              <Briefcase className="w-4 h-4 text-emerald-700" />
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              Passende Stellen finden
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Möchten Sie sehen, welche Stellen für diesen Beruf aktuell angeboten werden? Auf Arbeitsplatz.de finden Sie passende Stellenangebote.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="https://arbeitsplatz.de/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Aktuelle Stellenangebote auf Arbeitsplatz.de ansehen</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
