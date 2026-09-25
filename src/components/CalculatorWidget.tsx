import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  STATE_FACTORS,
  EXPERIENCE_FACTORS,
  COMPANY_SIZE_FACTORS,
  EDUCATION_FACTORS,
  calculateSalaryBenchmark,
  type CalculationResult
} from '../data/salaryData';
import CustomDropdown from './CustomDropdown';
import JobAutocomplete from './JobAutocomplete';
import {
  Calculator,
  Share2,
  Printer,
  Check,
  TrendingUp,
  TrendingDown,
  Info,
  Code2,
  Sparkles,
  Building2,
  GraduationCap,
  MapPin,
  Briefcase,
  ArrowRight,
  BookOpen,
  Scale
} from 'lucide-react';

interface CalculatorWidgetProps {
  isEmbed?: boolean;
}

export default function CalculatorWidget({ isEmbed = false }: CalculatorWidgetProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial State from URL params or defaults
  const initialJobId = searchParams.get('beruf') || 'softwareentwickler';
  const initialStateCode = searchParams.get('bundesland') || 'BW';
  const initialExp = searchParams.get('exp') || 'mid';
  const initialCompany = searchParams.get('size') || 'medium';
  const initialEdu = searchParams.get('edu') || 'bachelor';
  const initialGross = searchParams.get('gehalt') ? Number(searchParams.get('gehalt')) : 65000;
  const initialHours = searchParams.get('hours') ? Number(searchParams.get('hours')) : 40;

  const [jobId, setJobId] = useState(initialJobId);
  const [stateCode, setStateCode] = useState(initialStateCode);
  const [experienceKey, setExperienceKey] = useState(initialExp);
  const [companySizeKey, setCompanySizeKey] = useState(initialCompany);
  const [educationKey, setEducationKey] = useState(initialEdu);
  const [weeklyHours, setWeeklyHours] = useState(initialHours);
  const [userYearlyGross, setUserYearlyGross] = useState<number>(initialGross);
  const [grossInputMode, setGrossInputMode] = useState<'year' | 'month'>('year');
  const [monthlyInput, setMonthlyInput] = useState<number>(Math.round(initialGross / 12));

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  // Sync monthly vs yearly input
  const handleYearlyChange = (val: number) => {
    setUserYearlyGross(val);
    setMonthlyInput(Math.round(val / 12));
  };

  const handleMonthlyChange = (val: number) => {
    setMonthlyInput(val);
    setUserYearlyGross(val * 12);
  };

  // Perform Calculation
  const result: CalculationResult = useMemo(() => {
    return calculateSalaryBenchmark({
      jobId,
      stateCode,
      experienceKey,
      companySizeKey,
      educationKey,
      weeklyHours,
      userYearlyGross: userYearlyGross > 0 ? userYearlyGross : undefined
    });
  }, [jobId, stateCode, experienceKey, companySizeKey, educationKey, weeklyHours, userYearlyGross]);

  // Update URL params without full page reload
  useEffect(() => {
    const isDefault = 
      jobId === 'softwareentwickler' &&
      stateCode === 'BW' &&
      experienceKey === 'mid' &&
      companySizeKey === 'medium' &&
      educationKey === 'bachelor' &&
      weeklyHours === 40 &&
      userYearlyGross === 65000;

    const hasExistingParams = searchParams.toString().length > 0;

    if (!isEmbed && (!isDefault || hasExistingParams)) {
      const params = new URLSearchParams();
      params.set('beruf', jobId);
      params.set('bundesland', stateCode);
      params.set('exp', experienceKey);
      params.set('size', companySizeKey);
      params.set('edu', educationKey);
      params.set('hours', weeklyHours.toString());
      if (userYearlyGross) params.set('gehalt', userYearlyGross.toString());
      setSearchParams(params, { replace: true });
    }
  }, [jobId, stateCode, experienceKey, companySizeKey, educationKey, weeklyHours, userYearlyGross, isEmbed, searchParams, setSearchParams]);

  // Copy share URL
  const copyShareUrl = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const embedCodeSnippet = `<iframe src="https://lohnvergleichsrechner.de/rechner-embed?beruf=${jobId}&bundesland=${stateCode}" width="100%" height="780" style="border:none;border-radius:12px;overflow:hidden;" title="Lohnvergleichsrechner"></iframe>\n<p style="font-size:12px;color:#64748b;text-align:right;">Bereitgestellt von <a href="https://lohnvergleichsrechner.de/" target="_blank" rel="noopener">lohnvergleichsrechner.de</a></p>`;

  const copyEmbedCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(embedCodeSnippet);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Visual marker position in corridor (0 to 100%)
  const corridorMin = Math.round(result.benchmarkP25Year * 0.7);
  const corridorMax = Math.round(result.benchmarkP75Year * 1.3);
  const getMarkerPercent = (val: number) => {
    const clamped = Math.max(corridorMin, Math.min(corridorMax, val));
    return ((clamped - corridorMin) / (corridorMax - corridorMin)) * 100;
  };

  const p25Percent = getMarkerPercent(result.benchmarkP25Year);
  const p50Percent = getMarkerPercent(result.benchmarkMedianYear);
  const p75Percent = getMarkerPercent(result.benchmarkP75Year);
  const userPercent = userYearlyGross ? getMarkerPercent(userYearlyGross) : null;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${isEmbed ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Lohn- &amp; Gehaltsvergleichsrechner
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Modelliert nach Destatis-Verdiensterhebung &amp; KldB-Klassifikation der Bundesagentur für Arbeit
          </p>
        </div>

        {/* Action Buttons */}
        {!isEmbed && (
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={copyShareUrl}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
              title="Aktuelle Konfiguration als Link kopieren"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
              {copiedLink ? 'Link kopiert!' : 'Teilen'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
              title="Datenblatt drucken oder als PDF speichern"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              Drucken / PDF
            </button>
            <button
              onClick={() => setShowEmbedCode(!showEmbedCode)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              title="Rechner auf eigener Website einbetten"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              Einbetten
            </button>
          </div>
        )}
      </div>

      {/* Embed Code Section */}
      {showEmbedCode && !isEmbed && (
        <div className="my-4 p-4 bg-slate-900 rounded-xl text-white space-y-3 no-print">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Responsive Iframe-Embed-Code
            </span>
            <button
              onClick={copyEmbedCode}
              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
              {copiedEmbed ? 'Kopiert!' : 'Code kopieren'}
            </button>
          </div>
          <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-emerald-400">
            {embedCodeSnippet}
          </pre>
          <p className="text-xs text-slate-400">
            Sie können diesen Rechner kostenlos in Ihren redaktionellen Blog, Kanzleiauftritt oder Karriereportal einbinden.
          </p>
        </div>
      )}

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6 pb-8">
        
        {/* Berufsauswahl */}
        <div className="space-y-1.5 lg:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            Beruf / Tätigkeit (KldB 2010)
          </label>
          <JobAutocomplete
            value={jobId}
            onSelect={setJobId}
            mode="select"
          />
          <span className="text-xs text-slate-500 block truncate">
            {result.job.shortDesc}
          </span>
        </div>

        {/* Bundesland */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            Bundesland / Arbeitsort
          </label>
          <CustomDropdown
            value={stateCode}
            onChange={setStateCode}
            options={STATE_FACTORS.map((s) => ({
              value: s.code,
              label: s.name,
              sublabel: s.factor >= 1 ? `+${Math.round((s.factor - 1) * 100)} %` : `${Math.round((s.factor - 1) * 100)} %`
            }))}
          />
          <span className="text-xs text-slate-500 block">
            Regionaler Verdienstfaktor: {result.state.factor.toFixed(3)}
          </span>
        </div>

        {/* Berufserfahrung */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Berufserfahrung
          </label>
          <CustomDropdown
            value={experienceKey}
            onChange={setExperienceKey}
            options={Object.entries(EXPERIENCE_FACTORS).map(([key, item]) => ({
              value: key,
              label: item.label,
              sublabel: item.desc
            }))}
          />
          <span className="text-xs text-slate-500 block truncate">
            {result.experience.desc}
          </span>
        </div>

        {/* Unternehmensgröße */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Unternehmensgröße
          </label>
          <CustomDropdown
            value={companySizeKey}
            onChange={setCompanySizeKey}
            options={Object.entries(COMPANY_SIZE_FACTORS).map(([key, item]) => ({
              value: key,
              label: item.label,
              sublabel: `Tarifmultiplikator: ${item.factor}x`
            }))}
          />
          <span className="text-xs text-slate-500 block">
            Tarifbindung &amp; Betriebsgröße-Multiplikator: {result.companySize.factor}x
          </span>
        </div>

        {/* Bildungsabschluss */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Höchster Abschluss
          </label>
          <CustomDropdown
            value={educationKey}
            onChange={setEducationKey}
            options={Object.entries(EDUCATION_FACTORS).map(([key, item]) => ({
              value: key,
              label: item.label,
              sublabel: `Bildungskoeffizient: ${item.factor}x`
            }))}
          />
          <span className="text-xs text-slate-500 block">
            Qualifikationskoeffizient: {result.education.factor}x
          </span>
        </div>

        {/* Wochenarbeitszeit */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Wochenarbeitszeit
            </label>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {weeklyHours} Stunden
            </span>
          </div>
          <input
            type="range"
            min={15}
            max={48}
            step={0.5}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>15h (Teilzeit)</span>
            <span>38,5h (Tarif)</span>
            <span>40h (Vollzeit)</span>
          </div>
        </div>

        {/* Eigenes Gehalt (Optional zum direkten Benchmark-Abgleich) */}
        <div className="space-y-1.5 lg:col-span-2 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              Eigenes Bruttogehalt zur Einordnung (optional)
            </label>
            <div className="flex items-center rounded-lg bg-white p-0.5 border border-emerald-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setGrossInputMode('year')}
                className={`px-2 py-0.5 rounded cursor-pointer ${grossInputMode === 'year' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-600'}`}
              >
                Jahr
              </button>
              <button
                type="button"
                onClick={() => setGrossInputMode('month')}
                className={`px-2 py-0.5 rounded cursor-pointer ${grossInputMode === 'month' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-600'}`}
              >
                Monat
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              step={100}
              value={grossInputMode === 'year' ? userYearlyGross || '' : monthlyInput || ''}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (grossInputMode === 'year') {
                  handleYearlyChange(val);
                } else {
                  handleMonthlyChange(val);
                }
              }}
              placeholder={grossInputMode === 'year' ? "z. B. 58000 €" : "z. B. 4833 €"}
              className="w-full pl-3.5 pr-12 py-2 rounded-lg border border-emerald-300 bg-white text-slate-900 font-mono font-bold text-base focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">
              € {grossInputMode === 'year' ? '/ Jahr' : '/ Mo.'}
            </span>
          </div>
          <span className="text-[11px] text-emerald-900/80 block">
            Vergleicht Ihren aktuellen Verdienst in Echtzeit mit dem statistischen Peer-Group-Median.
          </span>
        </div>

      </div>

      {/* RESULT SECTION */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Core KPIs Banner */}
        {/* Core KPIs Banner (Kategorien A, B, C transparent aufgeschlüsselt) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Individueller Modellwert (Kategorie C) */}
          <div className="bg-white p-5 rounded-xl border border-emerald-200/80 shadow-xs relative">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                Modell-Benchmark
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Kategorie C
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
              rund {result.benchmarkMedianYear.toLocaleString('de-DE')} €
            </div>
            <span className="text-xs text-slate-500 block mt-1">
              ≈ <strong>rund {result.benchmarkMedianMonth.toLocaleString('de-DE')} €</strong> / Mo. brutto
            </span>
            <span className="text-[10px] text-slate-500 block mt-2">
              Individuelle Modellanpassung für Ihre Parameter
            </span>
          </div>

          {/* 2. Amtlicher Bundesmedian (Kategorie A) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
                Amtlicher Bundesmedian
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Kategorie A
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              {result.federalJobMedianYear.toLocaleString('de-DE')} €
            </div>
            <span className="text-xs text-slate-500 block mt-1">
              ≈ <strong>{result.federalJobMedianMonth.toLocaleString('de-DE')} €</strong> / Mo. brutto
            </span>
            <span className="text-[10px] text-slate-500 block mt-2">
              BA Entgeltatlas (unskalierte Bundesbasis)
            </span>
          </div>

          {/* 3. Modellierter Korridor (Kategorie C) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
                Korridor (P25 – P75)
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Kategorie C
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-800 font-mono tracking-tight">
              {result.benchmarkP25Year.toLocaleString('de-DE')} € – {result.benchmarkP75Year.toLocaleString('de-DE')} €
            </div>
            <span className="text-xs text-slate-500 block mt-1">
              50 % der Vergleichsgruppe liegen hier
            </span>
            <span className="text-[10px] text-slate-500 block mt-2">
              Interquartilsabstand (statistisch robust)
            </span>
          </div>

          {/* 4. Stundenlohn (Kategorie B) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
                Rechner. Stundenlohn
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Kategorie B
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono tracking-tight">
              {result.benchmarkHourly.toFixed(2)} €
            </div>
            <span className="text-xs text-slate-500 block mt-1">
              bei {result.weeklyHours}h/Woche (52 Wochen)
            </span>
            <span className="text-[10px] text-slate-500 block mt-2">
              Mathematisch abgeleitet (Monat / Arbeitszeit)
            </span>
          </div>

        </div>

        {/* Rechtlicher & Methodischer Transparenzhinweis */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-2xs">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
            Statistischer Markt-Orientierungswert – Kein Rechtsanspruch
          </div>
          <p className="leading-relaxed">
            Dieser Rechner liefert eine mathematisch-statistische Marktmodellierung auf Basis amtlicher Primärdaten (Destatis / BA Entgeltatlas). Es handelt sich <strong>nicht</strong> um ein individuelles Vergleichsentgelt im Sinne des § 10 EntgTranspG und begründet keine arbeitsrechtlichen Ansprüche oder Gehaltsgarantien. Ein Auskunftsanspruch nach § 10 EntgTranspG gilt ausschließlich innerbetrieblich in Unternehmen mit in der Regel mehr als 200 Beschäftigten gegenüber dem eigenen Arbeitgeber.
          </p>
        </div>

        {/* Eigener Vergleichsstatus (wenn Gehalt eingegeben) */}
        {result.differenceToMedian !== undefined && result.differencePercent !== undefined && (
          <div className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            result.differenceToMedian >= 0
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                result.differenceToMedian >= 0 ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                {result.differenceToMedian >= 0 ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-base sm:text-lg break-words hyphens-auto">
                  {result.differenceToMedian >= 0
                    ? `Überdurchschnittlich: +${result.differencePercent} % über dem Benchmark-Median`
                    : `Verhandlungspotenzial: ${result.differencePercent} % unter dem Benchmark-Median`}
                </h4>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">
                  Differenz zum statistischen Vergleichsmedian: <strong>{result.differenceToMedian >= 0 ? '+' : ''}{result.differenceToMedian.toLocaleString('de-DE')} €</strong> pro Jahr.
                  Geschätzter Perzentilrang: ca. <strong>Top {100 - (result.percentileRank || 50)} %</strong> in der Peer-Group.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual Corridor Boxplot Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex justify-between items-end text-[10px] sm:text-xs font-bold text-slate-700 pb-1">
            <span className="text-slate-500 leading-tight">
              <span className="hidden sm:inline">Unteres Quartil (25 %): </span>
              <span className="sm:hidden">P25:<br/></span>
              {result.benchmarkP25Year.toLocaleString('de-DE')} €
            </span>
            <span className="font-extrabold text-slate-900 font-mono bg-slate-100 px-2 py-1 rounded-md text-center leading-tight">
              Median<span className="hidden sm:inline">: </span><br className="sm:hidden"/>
              {result.benchmarkMedianYear.toLocaleString('de-DE')} €
            </span>
            <span className="text-slate-500 text-right leading-tight">
              <span className="hidden sm:inline">Oberes Quartil (75 %): </span>
              <span className="sm:hidden">P75:<br/></span>
              {result.benchmarkP75Year.toLocaleString('de-DE')} €
            </span>
          </div>

          {/* Visual Track */}
          <div className="relative w-full h-8 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            {/* 25% to 75% Highlight Box */}
            <div
              className="absolute top-0 bottom-0 bg-emerald-100/90 border-x-2 border-emerald-500"
              style={{
                left: `${p25Percent}%`,
                width: `${Math.max(4, p75Percent - p25Percent)}%`
              }}
            />

            {/* Median Marker Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-slate-900 z-10"
              style={{ left: `${p50Percent}%` }}
              title={`Median: ${result.benchmarkMedianYear} €`}
            />

            {/* User Salary Marker */}
            {userPercent !== null && (
              <div
                className="absolute top-0 bottom-0 w-2.5 bg-amber-500 rounded-full z-20 shadow-md transform -translate-x-1/2 ring-2 ring-white"
                style={{ left: `${userPercent}%` }}
                title={`Ihr Gehalt: ${result.userYearlyGross?.toLocaleString('de-DE')} €`}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 pt-2">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2.5 h-2.5 bg-emerald-200 border border-emerald-500 rounded-sm flex-shrink-0" />
                Interquartilsbereich (50 %)
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 bg-slate-900 rounded-full flex-shrink-0" />
                Regionaler Median
              </span>
              {userPercent !== null && (
                <span className="inline-flex items-center gap-1.5 font-bold text-amber-800 whitespace-nowrap">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full ring-1 ring-amber-300 flex-shrink-0" />
                  Ihr Gehalt ({result.userYearlyGross?.toLocaleString('de-DE')} €)
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] text-slate-400 mt-2 sm:mt-0 flex-shrink-0">
              Quelle: BA / Destatis
            </span>
          </div>
        </div>

        {/* Netto-Orientierung & Abgaben-Indikation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Geschätztes Netto-Entgelt (Orientierungswert nach § 38b EStG)
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 block">Steuerklasse I (Ledig, keine Kinder):</span>
              <span className="text-lg font-bold font-mono text-slate-900">
                ca. {result.approxNetMonthTaxClass1.toLocaleString('de-DE')} € netto / Monat
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                (inkl. ca. 20,5 % Sozialversicherungsbeiträge AN-Anteil)
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 block">Steuerklasse III (Verheiratet, Alleinverdiener):</span>
              <span className="text-lg font-bold font-mono text-slate-900">
                ca. {result.approxNetMonthTaxClass3.toLocaleString('de-DE')} € netto / Monat
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                (unter Berücksichtigung des Ehegattensplittings)
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Modellrechnung. Die tatsächliche Höhe hängt von individuellen Steuermerkmalen, Freibeträgen, Krankenkassen-Zusatzbeitrag und Kirchensteuerpflicht ab.
          </p>
        </div>

        {/* NÄCHSTE SCHRITTE & CONVERSION BEREICH (Keine Sackgasse) */}
        {!isEmbed && (
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 space-y-4 no-print">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Nächste Schritte &amp; Detailanalysen für Ihre Karriere
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <Link
                to={`/gehalt/${result.job.id}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                    <span>Berufsprofil &amp; Aufgaben</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Detaillierte Gehaltsstrukturen, KldB-Aufgaben und Qualifikationsstufen für <strong>{result.job.title.split(' / ')[0]}</strong>.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 mt-3 inline-block">
                  Bericht öffnen →
                </span>
              </Link>

              <Link
                to={`/gehalt/${result.job.id}/${result.state.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                    <span>{result.state.name} Spezialreport</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Regionale Abweichung ({result.state.factor >= 1 ? `+${Math.round((result.state.factor - 1) * 100)} %` : `${Math.round((result.state.factor - 1) * 100)} %`}) und Kaufkraftvergleich für <strong>{result.state.name}</strong>.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 mt-3 inline-block">
                  Regionaldaten ansehen →
                </span>
              </Link>

              <Link
                to="/ratgeber#verhandlung"
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                    <span>Gehaltsverhandlung führen</span>
                    <BookOpen className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Wie Sie den ermittelten Median und interquartilen Korridor in Jahresgesprächen argumentativ einsetzen.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 mt-3 inline-block">
                  Leitfaden lesen →
                </span>
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
