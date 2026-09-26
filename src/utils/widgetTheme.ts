export type WidgetFont = 'system' | 'arial' | 'verdana' | 'trebuchet' | 'georgia';
export type WidgetRadius = '0' | '8' | '12' | '16';
export type WidgetBackground = 'white' | 'light' | 'dark' | 'transparent' | string;

export interface WidgetThemeConfig {
  accent: string;       // Validated HEX (e.g. #059669)
  bg: WidgetBackground; // 'white' | 'light' | 'dark' | 'transparent' | custom HEX
  radius: WidgetRadius; // '0' | '8' | '12' | '16'
  font: WidgetFont;     // 'system' | 'arial' | 'verdana' | 'trebuchet' | 'georgia'
}

export const DEFAULT_THEME: WidgetThemeConfig = {
  accent: '#059669',
  bg: 'white',
  radius: '16',
  font: 'system'
};

export const FONT_FAMILIES: Record<WidgetFont, { label: string; family: string }> = {
  system: {
    label: 'System / Standard',
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  arial: {
    label: 'Arial',
    family: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
  },
  verdana: {
    label: 'Verdana',
    family: 'Verdana, Geneva, sans-serif'
  },
  trebuchet: {
    label: 'Trebuchet MS',
    family: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif'
  },
  georgia: {
    label: 'Georgia',
    family: 'Georgia, Cambria, "Times New Roman", Times, serif'
  }
};

export const RADIUS_VALUES: Record<WidgetRadius, { label: string; px: number; innerPx: number }> = {
  '0': { label: '0 px (Eckig)', px: 0, innerPx: 0 },
  '8': { label: '8 px (Subtil)', px: 8, innerPx: 6 },
  '12': { label: '12 px (Modern)', px: 12, innerPx: 8 },
  '16': { label: '16 px (Weich)', px: 16, innerPx: 10 }
};

export interface ThemePreset {
  id: string;
  label: string;
  desc: string;
  accent: string;
  bg: WidgetBackground;
  radius: WidgetRadius;
  font: WidgetFont;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Lohnvergleichsrechner Originaldesign',
    accent: '#059669',
    bg: 'white',
    radius: '16',
    font: 'system'
  },
  {
    id: 'light',
    label: 'Hell',
    desc: 'Neutral & dezent für helle Websites',
    accent: '#2563eb',
    bg: 'light',
    radius: '12',
    font: 'system'
  },
  {
    id: 'dark',
    label: 'Dunkel',
    desc: 'Optimiert für Dark-Mode Websites',
    accent: '#10b981',
    bg: 'dark',
    radius: '12',
    font: 'system'
  }
];

/**
 * Validates and normalizes a HEX color string.
 * Accepts "059669", "#059669", "abc", "#abc"
 * Returns lowercase normalized "#rrggbb" or null if invalid.
 */
export function parseHexColor(input?: string | null): string | null {
  if (!input) return null;
  const clean = input.trim().replace(/^#|^%23/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return '#' + clean.split('').map((c) => c + c).join('').toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return '#' + clean.toLowerCase();
  }
  return null;
}

/**
 * Calculates relative luminance (W3C WCAG 2.1 algorithm)
 */
export function getLuminance(hexColor: string): number {
  const clean = hexColor.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/**
 * Returns whether a color needs light or dark text for optimal WCAG AAA/AA contrast.
 */
export function getContrastTextColor(hexBg: string): string {
  const lum = getLuminance(hexBg);
  return lum > 0.55 ? '#0f172a' : '#ffffff';
}

/**
 * Determines whether the widget is rendered in a dark environment.
 */
export function isDarkTheme(bg: WidgetBackground): boolean {
  if (bg === 'dark') return true;
  if (bg === 'white' || bg === 'light' || bg === 'transparent') return false;
  const hex = parseHexColor(bg);
  if (hex) {
    return getLuminance(hex) < 0.35;
  }
  return false;
}

/**
 * Safely resolves and validates theme options from parameters or props against allowlist.
 */
export function resolveWidgetTheme(params: {
  accent?: string | null;
  bg?: string | null;
  radius?: string | null;
  font?: string | null;
}): WidgetThemeConfig {
  // 1. Accent
  let accent = DEFAULT_THEME.accent;
  if (params.accent) {
    const parsed = parseHexColor(params.accent);
    if (parsed) accent = parsed;
  }

  // 2. Background
  let bg: WidgetBackground = DEFAULT_THEME.bg;
  if (params.bg) {
    const cleanBg = params.bg.toLowerCase().trim();
    if (cleanBg === 'white' || cleanBg === 'light' || cleanBg === 'dark' || cleanBg === 'transparent') {
      bg = cleanBg;
    } else {
      const parsedHex = parseHexColor(cleanBg);
      if (parsedHex) bg = parsedHex;
    }
  }

  // 3. Radius
  let radius: WidgetRadius = DEFAULT_THEME.radius;
  if (params.radius && (params.radius === '0' || params.radius === '8' || params.radius === '12' || params.radius === '16')) {
    radius = params.radius;
  }

  // 4. Font
  let font: WidgetFont = DEFAULT_THEME.font;
  if (params.font && params.font in FONT_FAMILIES) {
    font = params.font as WidgetFont;
  }

  return { accent, bg, radius, font };
}
