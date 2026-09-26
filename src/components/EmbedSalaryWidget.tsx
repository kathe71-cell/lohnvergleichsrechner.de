import { useState, useMemo, useEffect, useRef } from 'react';
import {
  SALARY_DATABASE,
  STATE_FACTORS,
  EXPERIENCE_FACTORS,
  calculateSalaryBenchmark,
  type CalculationResult
} from '../data/salaryData';
import {
  FONT_FAMILIES,
  RADIUS_VALUES,
  resolveWidgetTheme,
  getContrastTextColor,
  isDarkTheme,
  parseHexColor,
  type WidgetBackground,
  type WidgetFont,
  type WidgetRadius
} from '../utils/widgetTheme';
import {
  Calculator,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Info,
  Search
} from 'lucide-react';

interface EmbedSalaryWidgetProps {
  initialJobId?: string;
  initialStateCode?: string;
  initialExperienceKey?: string;
  initialGross?: number;
  hideHeader?: boolean;
  accent?: string;
  bg?: WidgetBackground;
  radius?: WidgetRadius;
  font?: WidgetFont;
}

export default function EmbedSalaryWidget({
  initialJobId,
  initialStateCode,
  initialExperienceKey,
  initialGross,
  hideHeader = false,
  accent,
  bg,
  radius,
  font
}: EmbedSalaryWidgetProps) {
  // 1. Parameter Validation & Fallbacks
  const validatedInitialJob = useMemo(() => {
    if (!initialJobId) return '';
    const clean = initialJobId.toLowerCase().trim();
    const found = SALARY_DATABASE.find(
      (j) => j.id === clean || j.id.replace(/-/g, '') === clean.replace(/-/g, '')
    );
    return found ? found.id : '';
  }, [initialJobId]);

  const validatedInitialState = useMemo(() => {
    if (!initialStateCode) return 'NW';
    const clean = initialStateCode.toLowerCase().trim();
    const found = STATE_FACTORS.find(
      (s) =>
        s.code.toLowerCase() === clean ||
        s.slug.toLowerCase() === clean ||
        s.name.toLowerCase() === clean
    );
    return found ? found.code : 'NW';
  }, [initialStateCode]);

  const validatedInitialExp = useMemo(() => {
    if (!initialExperienceKey) return 'mid';
    const clean = initialExperienceKey.toLowerCase().trim();
    return clean in EXPERIENCE_FACTORS ? clean : 'mid';
  }, [initialExperienceKey]);

  // Theme resolution
  const theme = useMemo(() => {
    return resolveWidgetTheme({ accent, bg, radius, font });
  }, [accent, bg, radius, font]);

  const isDark = isDarkTheme(theme.bg);
  const accentContrastText = getContrastTextColor(theme.accent);
  const radiusPx = RADIUS_VALUES[theme.radius].px;
  const innerRadiusPx = RADIUS_VALUES[theme.radius].innerPx;
  const fontFamily = FONT_FAMILIES[theme.font].family;

  const containerBg = useMemo(() => {
    if (theme.bg === 'white') return '#ffffff';
    if (theme.bg === 'light') return '#f8fafc';
    if (theme.bg === 'dark') return '#0f172a';
    if (theme.bg === 'transparent') return 'transparent';
    const hex = parseHexColor(theme.bg);
    return hex || '#ffffff';
  }, [theme.bg]);

  // 2. Component State
  const [jobId, setJobId] = useState<string>(validatedInitialJob);
  const [stateCode, setStateCode] = useState<string>(validatedInitialState);
  const [experienceKey, setExperienceKey] = useState<string>(validatedInitialExp);
  const [userYearlyGross, setUserYearlyGross] = useState<number>(initialGross && initialGross > 0 ? initialGross : 0);
  const [grossInputMode, setGrossInputMode] = useState<'year' | 'month'>('year');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [isSearchingJob, setIsSearchingJob] = useState(false);

  // Sync if props change
  useEffect(() => {
    setJobId(validatedInitialJob);
  }, [validatedInitialJob]);

  useEffect(() => {
    setStateCode(validatedInitialState);
  }, [validatedInitialState]);

  useEffect(() => {
    setExperienceKey(validatedInitialExp);
  }, [validatedInitialExp]);

  useEffect(() => {
    if (initialGross !== undefined && initialGross > 0) {
      setUserYearlyGross(initialGross);
    }
  }, [initialGross]);

  // Current Job
  const selectedJob = useMemo(() => {
    if (!jobId) return null;
    return SALARY_DATABASE.find((j) => j.id === jobId) || null;
  }, [jobId]);

  // Filtered jobs for search
  const filteredJobs = useMemo(() => {
    if (!jobSearchQuery.trim()) return SALARY_DATABASE.slice(0, 8);
    const q = jobSearchQuery.toLowerCase().trim();
    return SALARY_DATABASE.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.kldbCode.includes(q)
    ).slice(0, 10);
  }, [jobSearchQuery]);

  // 3. Calculation using central audited logic
  const result: CalculationResult | null = useMemo(() => {
    if (!jobId || !selectedJob) return null;
    return calculateSalaryBenchmark({
      jobId,
      stateCode,
      experienceKey,
      companySizeKey: 'medium',
      educationKey: 'ausbildung',
      weeklyHours: 40,
      userYearlyGross: userYearlyGross > 0 ? userYearlyGross : undefined
    });
  }, [jobId, selectedJob, stateCode, experienceKey, userYearlyGross]);

  // Gross input handler
  const handleGrossChange = (valStr: string) => {
    const num = parseInt(valStr.replace(/\D/g, ''), 10) || 0;
    if (grossInputMode === 'month') {
      setUserYearlyGross(num * 12);
    } else {
      setUserYearlyGross(num);
    }
  };

  const displayedGrossInput = useMemo(() => {
    if (!userYearlyGross) return '';
    return grossInputMode === 'month'
      ? Math.round(userYearlyGross / 12).toString()
      : userYearlyGross.toString();
  }, [userYearlyGross, grossInputMode]);

  // 4. Auto-Resize PostMessage for Iframe parent
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const notifyParentHeight = () => {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
        const height = containerRef.current ? containerRef.current.scrollHeight + 16 : document.body.scrollHeight;
        window.parent.postMessage(
          {
            type: 'lohnvergleich:resize',
            height: Math.max(500, height)
          },
          '*'
        );
      }
    };

    notifyParentHeight();
    const timer = setTimeout(notifyParentHeight, 100);
    return () => clearTimeout(timer);
  }, [jobId, stateCode, experienceKey, userYearlyGross, isSearchingJob, theme]);

  // Difference formatters
  const diffPercent = result ? result.differencePercent : 0;
  const isAbove = result ? (result.differenceToMedian !== undefined && result.differenceToMedian >= 0) : false;
  const shortTitle = selectedJob ? selectedJob.title.split(' / ')[0] : '';

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily,
        borderRadius: `${radiusPx}px`,
        backgroundColor: containerBg,
        borderColor: isDark ? '#334155' : '#e2e8f0',
        color: isDark ? '#f8fafc' : '#0f172a'
      }}
      className={`w-full max-w-full border shadow-sm overflow-hidden p-4 sm:p-6 space-y-5 transition-colors duration-200 ${
        theme.bg === 'transparent' ? 'border-dashed' : ''
      }`}
    >
      {/* Header */}
      {!hideHeader && (
        <div
          style={{ borderColor: isDark ? '#334155' : '#f1f5f9' }}
          className="flex items-center justify-between border-b pb-3 gap-2"
        >
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: `${theme.accent}1f`,
                color: theme.accent,
                borderRadius: `${innerRadiusPx}px`
              }}
              className="p-1.5"
            >
              <Calculator className="w-4 h-4" />
            </span>
            <div>
              <h2
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="text-base sm:text-lg font-black leading-tight"
              >
                Gehaltsvergleich für Ihre Website
              </h2>
              <span
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                className="text-[11px] block"
              >
                Amtliche Daten der Bundesagentur für Arbeit &amp; Destatis
              </span>
            </div>
          </div>
          {selectedJob && (
            <span
              style={{
                backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#cbd5e1' : '#475569',
                borderRadius: `${innerRadiusPx}px`
              }}
              className="text-[10px] font-mono font-semibold px-2 py-0.5 border shrink-0"
            >
              KldB {selectedJob.kldbCode}
            </span>
          )}
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* 1. Beruf */}
        <div className="space-y-1 sm:col-span-2 relative">
          <label
            style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between"
          >
            <span>Beruf</span>
            {selectedJob && (
              <button
                type="button"
                onClick={() => setIsSearchingJob(!isSearchingJob)}
                style={{ color: theme.accent }}
                className="lowercase font-medium text-[11px] cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <Search className="w-3 h-3" />
                {isSearchingJob ? 'schließen' : 'Beruf wechseln'}
              </button>
            )}
          </label>

          {isSearchingJob ? (
            <div
              style={{
                backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                borderColor: theme.accent,
                borderRadius: `${innerRadiusPx}px`
              }}
              className="p-2.5 border shadow-xs space-y-2"
            >
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  placeholder="Beruf eingeben, z. B. Dachdecker, Controller..."
                  style={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
                  }}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border focus:outline-none focus:ring-2"
                  autoFocus
                />
              </div>
              <div
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
                }}
                className="max-h-40 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border text-xs"
              >
                {filteredJobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => {
                      setJobId(job.id);
                      setIsSearchingJob(false);
                      setJobSearchQuery('');
                    }}
                    style={{
                      backgroundColor: job.id === jobId ? `${theme.accent}1a` : 'transparent',
                      color: job.id === jobId ? theme.accent : isDark ? '#f8fafc' : '#0f172a'
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:opacity-80 transition-colors cursor-pointer ${
                      job.id === jobId ? 'font-bold' : ''
                    }`}
                  >
                    <span className="truncate pr-2">{job.title}</span>
                    <span className="text-[10px] font-mono opacity-60 shrink-0">KldB {job.kldbCode}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : !selectedJob ? (
            <button
              type="button"
              onClick={() => setIsSearchingJob(true)}
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#cbd5e1',
                borderRadius: `${innerRadiusPx}px`,
                color: isDark ? '#94a3b8' : '#64748b'
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 border border-dashed hover:border-solid hover:opacity-90 transition-all cursor-pointer text-xs group text-left"
            >
              <span className="flex items-center gap-2 font-medium">
                <Search className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                Beruf auswählen (z. B. Softwareentwickler, Kaufmann, Dachdecker...)
              </span>
              <span
                style={{
                  backgroundColor: `${theme.accent}1a`,
                  color: theme.accent,
                  borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
                }}
                className="text-[10px] font-bold px-2 py-0.5 shrink-0"
              >
                Auswählen
              </span>
            </button>
          ) : (
            <div
              onClick={() => setIsSearchingJob(true)}
              style={{
                backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: `${innerRadiusPx}px`
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 border hover:opacity-90 transition-opacity cursor-pointer text-xs"
            >
              <span
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="font-bold truncate pr-2"
              >
                {selectedJob.title}
              </span>
              <span
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  color: isDark ? '#cbd5e1' : '#64748b',
                  borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
                }}
                className="text-[10px] font-mono shrink-0 px-2 py-0.5 border"
              >
                KldB {selectedJob.kldbCode}
              </span>
            </div>
          )}
        </div>

        {/* 2. Bundesland */}
        <div className="space-y-1">
          <label
            style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            className="text-[11px] font-bold uppercase tracking-wider block"
          >
            Bundesland
          </label>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            style={{
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#f8fafc' : '#0f172a',
              borderRadius: `${innerRadiusPx}px`
            }}
            className="w-full px-3 py-2 text-xs border font-medium focus:outline-none focus:ring-2 cursor-pointer"
          >
            {STATE_FACTORS.map((s) => (
              <option key={s.code} value={s.code} className={isDark ? 'bg-slate-900 text-white' : ''}>
                {s.name} ({s.factor >= 1 ? `+${Math.round((s.factor - 1) * 100)} %` : `${Math.round((s.factor - 1) * 100)} %`})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Berufserfahrung */}
        <div className="space-y-1">
          <label
            style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            className="text-[11px] font-bold uppercase tracking-wider block"
          >
            Berufserfahrung
          </label>
          <select
            value={experienceKey}
            onChange={(e) => setExperienceKey(e.target.value)}
            style={{
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#f8fafc' : '#0f172a',
              borderRadius: `${innerRadiusPx}px`
            }}
            className="w-full px-3 py-2 text-xs border font-medium focus:outline-none focus:ring-2 cursor-pointer"
          >
            {Object.entries(EXPERIENCE_FACTORS).map(([key, item]) => (
              <option key={key} value={key} className={isDark ? 'bg-slate-900 text-white' : ''}>
                {item.label} ({item.factor.toLocaleString('de-DE', { minimumFractionDigits: item.factor % 1 === 0 ? 0 : 2 })}×)
              </option>
            ))}
          </select>
        </div>

        {/* 4. Eigenes Bruttogehalt */}
        <div
          style={{
            backgroundColor: isDark ? '#1e293b80' : `${theme.accent}0d`,
            borderColor: isDark ? '#334155' : `${theme.accent}33`,
            borderRadius: `${innerRadiusPx}px`
          }}
          className="space-y-1 sm:col-span-2 p-3 border"
        >
          <div className="flex items-center justify-between">
            <label
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              className="text-[11px] font-extrabold uppercase tracking-wider"
            >
              Ihr Bruttogehalt (optional)
            </label>
            <div
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#cbd5e1',
                borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
              }}
              className="flex items-center p-0.5 border text-[10px] font-semibold"
            >
              <button
                type="button"
                onClick={() => setGrossInputMode('year')}
                style={{
                  backgroundColor: grossInputMode === 'year' ? theme.accent : 'transparent',
                  color: grossInputMode === 'year' ? accentContrastText : isDark ? '#94a3b8' : '#64748b',
                  borderRadius: `${Math.max(2, innerRadiusPx - 4)}px`
                }}
                className="px-2 py-0.5 cursor-pointer transition-colors"
              >
                Jahr
              </button>
              <button
                type="button"
                onClick={() => setGrossInputMode('month')}
                style={{
                  backgroundColor: grossInputMode === 'month' ? theme.accent : 'transparent',
                  color: grossInputMode === 'month' ? accentContrastText : isDark ? '#94a3b8' : '#64748b',
                  borderRadius: `${Math.max(2, innerRadiusPx - 4)}px`
                }}
                className="px-2 py-0.5 cursor-pointer transition-colors"
              >
                Monat
              </button>
            </div>
          </div>
          <div className="relative mt-1">
            <input
              type="text"
              inputMode="numeric"
              value={displayedGrossInput ? Number(displayedGrossInput).toLocaleString('de-DE') : ''}
              onChange={(e) => handleGrossChange(e.target.value)}
              placeholder={grossInputMode === 'year' ? 'z. B. 48.000 €' : 'z. B. 4.000 €'}
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#cbd5e1',
                color: isDark ? '#f8fafc' : '#0f172a',
                borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
              }}
              className="w-full px-3.5 py-2 text-sm font-mono font-bold border focus:outline-none focus:ring-2"
            />
            <span
              style={{ color: isDark ? '#64748b' : '#94a3b8' }}
              className="absolute right-3.5 top-2 text-xs font-mono font-bold"
            >
              € / {grossInputMode === 'year' ? 'Jahr' : 'Monat'}
            </span>
          </div>
        </div>
      </div>

      {/* Ergebnis-Bereich */}
      {selectedJob && result ? (
        <div
          style={{
            backgroundColor: isDark ? '#0b1120' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderRadius: `${innerRadiusPx}px`
          }}
          className="border p-4 space-y-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Vergleichswert (Kategorie C) */}
            <div
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
              }}
              className="p-3.5 border shadow-2xs"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  className="text-[10px] font-mono uppercase tracking-wider font-bold"
                >
                  Vergleichswert
                </span>
                <span
                  style={{
                    backgroundColor: `${theme.accent}1a`,
                    color: theme.accent,
                    borderColor: `${theme.accent}33`,
                    borderRadius: `${Math.max(2, innerRadiusPx - 4)}px`
                  }}
                  className="text-[9px] font-mono font-bold px-1.5 py-0.2 border"
                >
                  Kategorie C
                </span>
              </div>
              <div
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="text-xl sm:text-2xl font-black font-mono tracking-tight"
              >
                {result.benchmarkMedianYear.toLocaleString('de-DE')} €
              </div>
              <span
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                className="text-[11px] block mt-0.5"
              >
                ≈ {result.benchmarkMedianMonth.toLocaleString('de-DE')} € / Monat brutto
              </span>
            </div>

            {/* Ihr Gehalt (oder Bundesmedian als Referenz) */}
            <div
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
              }}
              className="p-3.5 border shadow-2xs"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  className="text-[10px] font-mono uppercase tracking-wider font-bold"
                >
                  {userYearlyGross > 0 ? 'Ihr Gehalt' : 'Amtlicher Bundesmedian'}
                </span>
                <span
                  style={{
                    backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
                    color: isDark ? '#cbd5e1' : '#475569',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderRadius: `${Math.max(2, innerRadiusPx - 4)}px`
                  }}
                  className="text-[9px] font-mono font-bold px-1.5 py-0.2 border"
                >
                  {userYearlyGross > 0 ? 'Eingabe' : 'Kategorie A'}
                </span>
              </div>
              <div
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                className="text-xl sm:text-2xl font-black font-mono tracking-tight"
              >
                {userYearlyGross > 0
                  ? `${userYearlyGross.toLocaleString('de-DE')} €`
                  : `${selectedJob.medianYear.toLocaleString('de-DE')} €`}
              </div>
              <span
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                className="text-[11px] block mt-0.5"
              >
                {userYearlyGross > 0
                  ? `≈ ${Math.round(userYearlyGross / 12).toLocaleString('de-DE')} € / Monat`
                  : `BA-Entgeltatlas (unskalierte Bundesbasis)`}
              </span>
            </div>
          </div>

          {/* Abweichung (wenn Gehalt eingegeben) */}
          {userYearlyGross > 0 && diffPercent !== undefined && result.differenceToMedian !== undefined && (
            <div
              style={{
                backgroundColor: isAbove
                  ? isDark ? '#064e3b40' : '#ecfdf5'
                  : isDark ? '#78350f40' : '#fffbeb',
                borderColor: isAbove ? '#10b981' : '#f59e0b',
                color: isAbove
                  ? isDark ? '#a7f3d0' : '#064e3b'
                  : isDark ? '#fde68a' : '#78350f',
                borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
              }}
              className="p-3 border flex items-center gap-3"
            >
              <div
                style={{
                  backgroundColor: isAbove ? '#10b981' : '#f59e0b',
                  borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
                }}
                className="p-2 text-white shrink-0"
              >
                {isAbove ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-xs sm:text-sm">
                  {isAbove
                    ? `+${Math.abs(diffPercent).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} % über dem modellierten Vergleichswert`
                    : `−${Math.abs(diffPercent).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} % unter dem modellierten Vergleichswert`}
                </div>
                <div className="text-[11px] opacity-90 mt-0.5">
                  Differenz zum Vergleichsmedian: {isAbove ? '+' : '−'}
                  {Math.abs(result.differenceToMedian).toLocaleString('de-DE')} € / Jahr
                </div>
              </div>
            </div>
          )}

          {/* Modellierter Orientierungskorridor (P25–P75) */}
          <div
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
            }}
            className="p-3 border space-y-1.5"
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                className="font-bold uppercase tracking-wider"
              >
                Modellierter Orientierungskorridor (P25–P75)
              </span>
              <span style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="font-semibold">
                Kategorie C
              </span>
            </div>
            <div
              style={{ color: isDark ? '#f8fafc' : '#1e293b' }}
              className="text-sm sm:text-base font-extrabold font-mono"
            >
              {result.benchmarkP25Year.toLocaleString('de-DE')} € – {result.benchmarkP75Year.toLocaleString('de-DE')} €
            </div>
            <span
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              className="text-[10px] block"
            >
              50 % der Beschäftigten in diesem Profil liegen innerhalb dieser typischen Marktspanne.
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: isDark ? '#0b1120' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderRadius: `${innerRadiusPx}px`
          }}
          className="border border-dashed p-6 text-center space-y-2.5"
        >
          <div
            style={{
              backgroundColor: `${theme.accent}1a`,
              color: theme.accent,
              borderRadius: `${innerRadiusPx}px`
            }}
            className="w-10 h-10 mx-auto flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </div>
          <div
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-sm font-bold"
          >
            Bitte wählen Sie oben einen Beruf aus
          </div>
          <p
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            className="text-xs max-w-sm mx-auto"
          >
            Wählen Sie einen von über 100 amtlich erfassten Berufen, um den regionalen Gehaltskorridor und Vergleichswerte sofort zu berechnen.
          </p>
          <button
            type="button"
            onClick={() => setIsSearchingJob(true)}
            style={{
              backgroundColor: theme.accent,
              color: accentContrastText,
              borderRadius: `${Math.max(4, innerRadiusPx - 2)}px`
            }}
            className="px-4 py-2 text-xs font-bold shadow-xs hover:opacity-95 transition-opacity inline-flex items-center gap-1.5 cursor-pointer mt-1"
          >
            <Search className="w-3.5 h-3.5" />
            Beruf jetzt auswählen
          </button>
        </div>
      )}

      {/* Rechtlicher A/B/C Hinweis */}
      {selectedJob && (
        <div
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          className="text-[10px] leading-relaxed flex items-start gap-1.5 pt-0.5"
        >
          <Info className="w-3.5 h-3.5 opacity-60 shrink-0 mt-0.5" />
          <span>
            Modellrechnung (Kategorie C) basierend auf dem amtlichen Bundesmedian (Kategorie A, KldB {selectedJob.kldbCode}) der Bundesagentur für Arbeit und Destatis-Faktoren. Kein Rechtsanspruch nach § 10 EntgTranspG.
          </span>
        </div>
      )}

      {/* Attribution & Deep-Link (Zwingend & Permanent) */}
      <div
        style={{ borderColor: isDark ? '#334155' : '#f1f5f9' }}
        className="pt-2 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
      >
        <div style={{ color: isDark ? '#94a3b8' : '#475569' }}>
          Gehaltsdaten &amp; Berechnung:{' '}
          <a
            href="https://www.lohnvergleichsrechner.de/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accent }}
            className="font-bold hover:underline underline-offset-2"
          >
            Lohnvergleichsrechner.de
          </a>
        </div>

        {selectedJob && (
          <a
            href={`https://www.lohnvergleichsrechner.de/gehalt/${jobId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accent }}
            className="inline-flex items-center gap-1 font-bold hover:underline transition-opacity shrink-0"
          >
            Detaillierte Gehaltsanalyse für {shortTitle} <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
