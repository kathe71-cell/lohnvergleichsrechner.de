import { useState, useMemo } from 'react';
import {
  SALARY_DATABASE,
  STATE_FACTORS,
  EXPERIENCE_FACTORS
} from '../data/salaryData';
import {
  FONT_FAMILIES,
  RADIUS_VALUES,
  THEME_PRESETS,
  DEFAULT_THEME,
  parseHexColor,
  getLuminance,
  isDarkTheme,
  type WidgetBackground,
  type WidgetFont,
  type WidgetRadius
} from '../utils/widgetTheme';
import EmbedSalaryWidget from '../components/EmbedSalaryWidget';
import Breadcrumbs from '../components/Breadcrumbs';
import CitationBox from '../components/CitationBox';
import EditorialTrustBox from '../components/EditorialTrustBox';
import {
  Code2,
  Check,
  Copy,
  Sparkles,
  Smartphone,
  Monitor,
  ShieldCheck,
  Database,
  Building2,
  Layers,
  ExternalLink,
  Palette,
  Sliders,
  Sun,
  Moon
} from 'lucide-react';

export default function EmbedGuidePage() {
  // Content selection
  const [selectedJob, setSelectedJob] = useState<string>('dachdecker');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedExp, setSelectedExp] = useState<string>('');

  // Design customization
  const [accentColor, setAccentColor] = useState<string>('#059669');
  const [bgType, setBgType] = useState<WidgetBackground>('white');
  const [customBgHex, setCustomBgHex] = useState<string>('#ffffff');
  const [radius, setRadius] = useState<WidgetRadius>('16');
  const [font, setFont] = useState<WidgetFont>('system');

  // Preview & copy states
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<'mobile' | 'desktop'>('desktop');

  // Effective Background
  const effectiveBg = useMemo<WidgetBackground>(() => {
    if (bgType === 'custom') {
      const parsed = parseHexColor(customBgHex);
      return parsed || '#ffffff';
    }
    return bgType;
  }, [bgType, customBgHex]);

  // Apply Preset
  const handleApplyPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setAccentColor(preset.accent);
    setBgType(preset.bg);
    setRadius(preset.radius);
    setFont(preset.font);
  };

  // Build target query string (only include non-default parameters for minimal URL length)
  const embedUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedJob) params.set('beruf', selectedJob);
    if (selectedState) params.set('bundesland', selectedState);
    if (selectedExp) params.set('erfahrung', selectedExp);

    // Design parameters: only non-default values
    const normAccent = parseHexColor(accentColor);
    if (normAccent && normAccent.toLowerCase() !== DEFAULT_THEME.accent.toLowerCase()) {
      params.set('accent', normAccent.replace('#', ''));
    }

    if (effectiveBg !== DEFAULT_THEME.bg) {
      if (effectiveBg.startsWith('#')) {
        params.set('bg', effectiveBg.replace('#', ''));
      } else {
        params.set('bg', effectiveBg);
      }
    }

    if (radius !== DEFAULT_THEME.radius) {
      params.set('radius', radius);
    }

    if (font !== DEFAULT_THEME.font) {
      params.set('font', font);
    }

    const qs = params.toString();
    return `https://lohnvergleichsrechner.de/embed/gehaltsvergleich${qs ? `?${qs}` : ''}`;
  }, [selectedJob, selectedState, selectedExp, accentColor, effectiveBg, radius, font]);

  // Standard Iframe Embed Snippet
  const iframeSnippet = useMemo(() => {
    return `<iframe\n  src="${embedUrl}"\n  width="100%"\n  height="650"\n  style="border:none;border-radius:${radius}px;overflow:hidden;max-width:100%;"\n  loading="lazy"\n  title="Gehaltsvergleich"\n></iframe>`;
  }, [embedUrl, radius]);

  // Optional Auto-Height Script Snippet
  const autoHeightSnippet = useMemo(() => {
    return `<!-- Optional: Automatische Höhenanpassung ohne Scrollbalken -->\n<script>\n  window.addEventListener('message', function(e) {\n    if (e.data && e.data.type === 'lohnvergleich:resize') {\n      var ifr = document.querySelector('iframe[src*="lohnvergleichsrechner.de/embed"]');\n      if (ifr) ifr.style.height = e.data.height + 'px';\n    }\n  });\n</script>`;
  }, []);

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Contrast indicator
  const normAccent = parseHexColor(accentColor) || '#059669';
  const lum = getLuminance(normAccent);
  const isDarkPreview = isDarkTheme(effectiveBg);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs
            items={[{ name: 'Gehaltsrechner einbinden', url: '/gehaltsrechner-einbinden' }]}
          />

          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold inline-block">
              KOSTENLOSES WEB-WIDGET FÜR PARTNER &amp; WEBMASCHINEN
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Gehaltsrechner kostenlos auf der eigenen Website einbinden
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Bieten Sie Besuchern, Jobsuchenden und Fachkräften einen interaktiven Gehaltsvergleich direkt auf Ihrer Seite. Passen Sie Farben, Schrift und Eckenradius flexibel an Ihr Corporate Design an – 100 % DSGVO-konform und wartungsfrei.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* INTERAKTIVER KONFIGURATOR & LIVE-PREVIEW */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              SCHRITT 1 &amp; 2: WIDGET KONFIGURIEREN &amp; VORSCHAU TESTEN
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Live-Konfigurator &amp; Einbettungscode
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Wählen Sie Voreinstellungen und visuelles Design. Der Einbettungscode und die Live-Vorschau aktualisieren sich in Echtzeit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Linke Spalte: Konfiguration & Code */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Presets Bar */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  Design-Presets
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                        accentColor === preset.accent && bgType === preset.bg && radius === preset.radius
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600 shadow-2xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          style={{ backgroundColor: preset.accent }}
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                        />
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {preset.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 line-clamp-1 block">
                        {preset.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inhaltliche Voreinstellungen */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3.5">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Inhaltliche Voreinstellungen
                </h3>

                {/* Beruf vorauswählen */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Beruf vorauswählen (optional)
                  </label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Keine Vorauswahl (Standard)</option>
                    {SALARY_DATABASE.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} (KldB {j.kldbCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bundesland vorauswählen */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Bundesland vorauswählen (optional)
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Keine Vorauswahl (Nutzer wählt selbst)</option>
                    {STATE_FACTORS.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Berufserfahrung */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Berufserfahrung vorauswählen (optional)
                  </label>
                  <select
                    value={selectedExp}
                    onChange={(e) => setSelectedExp(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Standard (Berufserfahren 3–5 Jahre)</option>
                    {Object.entries(EXPERIENCE_FACTORS).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DESIGN ANPASSEN */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-emerald-600" />
                    Design anpassen
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    100 % DSGVO-konform
                  </span>
                </div>

                {/* 1. Akzentfarbe */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Akzentfarbe (Buttons &amp; Highlights)
                    </label>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      {accentColor.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={normAccent}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-9 h-9 p-0.5 rounded-lg border border-slate-300 cursor-pointer bg-white"
                      title="Farbe mit Color-Picker wählen"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      placeholder="#059669"
                      maxLength={7}
                      className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {/* Quick Palette */}
                    <div className="flex items-center gap-1">
                      {['#059669', '#2563eb', '#4f46e5', '#d97706', '#0f172a'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setAccentColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-md border border-slate-300 cursor-pointer transition-transform hover:scale-110 ${
                            accentColor.toLowerCase() === c.toLowerCase() ? 'ring-2 ring-emerald-500 ring-offset-1' : ''
                          }`}
                          title={`Palette: ${c}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>
                      {lum > 0.55
                        ? 'Helle Akzentfarbe: Textfarbe wird automatisch dunkel (#0f172a) für WCAG-Kontrast.'
                        : 'Dunkle Akzentfarbe: Textfarbe wird automatisch reinweiß (#ffffff) für WCAG-Kontrast.'}
                    </span>
                  </div>
                </div>

                {/* 2. Hintergrund */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Hintergrund
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                    {[
                      { id: 'white', label: 'Weiß', icon: Sun },
                      { id: 'light', label: 'Hell (Slate)', icon: Sun },
                      { id: 'dark', label: 'Dunkel', icon: Moon },
                      { id: 'transparent', label: 'Transparent', icon: Layers }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBgType(item.id as WidgetBackground)}
                        className={`p-2 rounded-xl border text-center font-medium cursor-pointer transition-colors ${
                          bgType === item.id
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Optional Custom HEX */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setBgType('custom')}
                      className={`text-xs px-2.5 py-1 rounded-lg border cursor-pointer font-medium ${
                        bgType === 'custom'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Eigener HEX:
                    </button>
                    {bgType === 'custom' && (
                      <div className="flex items-center gap-1.5 flex-1">
                        <input
                          type="color"
                          value={parseHexColor(customBgHex) || '#ffffff'}
                          onChange={(e) => setCustomBgHex(e.target.value)}
                          className="w-7 h-7 p-0.5 rounded border border-slate-300 bg-white cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customBgHex}
                          onChange={(e) => setCustomBgHex(e.target.value)}
                          placeholder="#ffffff"
                          maxLength={7}
                          className="w-24 px-2 py-1 text-xs font-mono bg-white border border-slate-300 rounded text-slate-800"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Eckenradius */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Eckenradius (Border Radius)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {Object.entries(RADIUS_VALUES).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setRadius(key as WidgetRadius)}
                        className={`py-1.5 text-xs rounded-xl border text-center font-medium cursor-pointer transition-colors ${
                          radius === key
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label.split(' ')[0]} {item.label.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Schriftart (Web-Safe / System-Fonts) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Schriftart (System / Web-Safe, 0 Third-Party Requests)
                  </label>
                  <select
                    value={font}
                    onChange={(e) => setFont(e.target.value as WidgetFont)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {Object.entries(FONT_FAMILIES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generierter Iframe-Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-600" />
                    Fertiger Iframe-Code
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(iframeSnippet, setCopiedCode)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? 'Code kopiert!' : 'Code kopieren'}
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    <code>{iframeSnippet}</code>
                  </pre>
                </div>
                <p className="text-[11px] text-slate-500">
                  Fügen Sie diesen HTML-Code an der gewünschten Stelle in Ihr CMS (WordPress, Webflow, Typo3 etc.) ein.
                </p>
              </div>

              {/* Optionales Auto-Height Snippet */}
              <details className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 cursor-pointer group">
                <summary className="font-bold flex items-center justify-between select-none">
                  <span>Optional: Automatische Höhenanpassung ohne Scrollbalken</span>
                  <span className="text-emerald-700 text-[11px] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                  Das Widget sendet bei Größenänderungen ein standardisiertes <code>postMessage</code>-Event. Mit folgendem kleinen Skript passt sich der Iframe auf Ihrer Seite automatisch auf die exakte Pixelhöhe an:
                </p>
                <div className="relative pt-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(autoHeightSnippet, setCopiedScript)}
                    className="absolute right-2 top-3 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
                  >
                    {copiedScript ? 'Kopiert!' : 'Kopieren'}
                  </button>
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-[10px] font-mono overflow-x-auto leading-normal">
                    <code>{autoHeightSnippet}</code>
                  </pre>
                </div>
              </details>
            </div>

            {/* Rechte Spalte: Live-Vorschau */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Live-Vorschau des Widgets
                </span>
                <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-xs font-medium border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPreviewWidth('desktop')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                      previewWidth === 'desktop' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop (100 %)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewWidth('mobile')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                      previewWidth === 'mobile' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile (375 px)
                  </button>
                </div>
              </div>

              {/* Preview Container Frame (adapts background to preview theme realistically) */}
              <div
                style={{
                  backgroundColor: isDarkPreview ? '#020617' : effectiveBg === 'light' ? '#f1f5f9' : '#f8fafc',
                  borderColor: isDarkPreview ? '#1e293b' : '#e2e8f0'
                }}
                className="p-4 sm:p-6 rounded-2xl border flex justify-center items-start overflow-x-auto min-h-[540px] transition-colors duration-200"
              >
                <div
                  className={`transition-all duration-300 ${
                    previewWidth === 'mobile' ? 'w-[375px] max-w-full' : 'w-full'
                  }`}
                >
                  <EmbedSalaryWidget
                    initialJobId={selectedJob}
                    initialStateCode={selectedState}
                    initialExperienceKey={selectedExp}
                    accent={normAccent}
                    bg={effectiveBg}
                    radius={radius}
                    font={font}
                  />
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400 font-mono">
                Aktuelle Embed-URL:{' '}
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline inline-flex items-center gap-0.5"
                >
                  {embedUrl.replace('https://lohnvergleichsrechner.de', '')} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRAXISBEISPIEL: INTEGRATION AUF BERUFSSEITEN */}
        <section className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                PRAXISBEISPIEL
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Integration auf Berufs- &amp; Stellenprofilen
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600/40 self-start sm:self-auto">
              Live-taugliches Muster
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                Nahtloser Mehrwert für Jobbörsen &amp; Karriereportale
              </h3>
              <p>
                Auf berufsbezogenen Inhaltsseiten (z. B. Berufsbeschreibungen oder Stellenangeboten für Dachdecker) wird das Widget einfach mit dem URL-Parameter <code>?beruf=dachdecker</code> eingebettet.
              </p>
              <p>
                Der Nutzer sieht direkt das passende Berufsprofil voreingestellt, kann sein Wunsch-Bundesland sowie seine Berufserfahrung anpassen und sofort sein Gehalt mit dem amtlichen Bundes- und Landesmedian vergleichen.
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-700/40 space-y-2.5">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Beispiel-Code mit Berufsvorauswahl (Dachdecker):
              </span>
              <pre className="text-xs font-mono text-emerald-200 bg-black/40 p-3 rounded-lg overflow-x-auto leading-normal">
{`<iframe
  src="https://lohnvergleichsrechner.de/embed/gehaltsvergleich?beruf=dachdecker"
  width="100%"
  height="650"
  style="border:none;border-radius:16px;overflow:hidden;"
  loading="lazy"
  title="Gehaltsvergleich Dachdecker"
></iframe>`}
              </pre>
            </div>
          </div>
        </section>

        {/* VORTEILE FÜR WEBSITEBETREIBER */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              VORTEILE FÜR WEBMASCHINEN &amp; PUBLISHER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Warum Lohnvergleichsrechner.de einbinden?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">118 geprüfte KldB-Berufe</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Voller Zugriff auf 118 detaillierte Berufsbilder nach der amtlichen Klassifikation der Berufe (KldB 2010 Fassung 2020) der Bundesagentur für Arbeit.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Zentrale Datenpflege</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sie müssen keine eigene Gehaltsdatenbank pflegen oder aktualisieren. Neue Erhebungen und Statistiken werden automatisch im Widget aktualisiert.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">100 % DSGVO-konform</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keine Tracking-Cookies, kein Fingerprinting, keine Werbenetzwerke im Widget. Vollständig datenschutzfreundlich und rechtssicher in der EU.
              </p>
            </div>
          </div>
        </section>

        {/* 3-SCHRITTE ANLEITUNG */}
        <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            In 3 Schritten integrieren
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Widget konfigurieren</h3>
              <p className="text-xs text-slate-600">
                Wählen Sie optional Beruf und Bundesland aus und passen Sie Akzentfarbe, Hintergrund und Schrift an Ihre Seite an.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">HTML-Code kopieren</h3>
              <p className="text-xs text-slate-600">
                Kopieren Sie das vorgefertigte, responsive Iframe-Snippet mit einem Klick in die Zwischenablage.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Auf Website einfügen</h3>
              <p className="text-xs text-slate-600">
                Fügen Sie den Iframe in Ihren Artikel, Ihr Jobportal oder Ihre Bildungsseite ein. Fertig!
              </p>
            </div>
          </div>
        </section>

        {/* TRUST & CITATION BOX */}
        <EditorialTrustBox />

        <CitationBox
          title="Gehaltsrechner kostenlos auf der eigenen Website einbinden: Web-Widget & Iframe-Integration"
          url="https://lohnvergleichsrechner.de/gehaltsrechner-einbinden"
        />
      </div>
    </div>
  );
}
