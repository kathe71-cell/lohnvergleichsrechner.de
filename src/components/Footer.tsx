import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, ExternalLink } from 'lucide-react';
import { DATA_METADATA } from '../data/salaryData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-mono font-bold text-lg group-hover:bg-emerald-500 transition-colors">
                €
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                lohnvergleichsrechner<span className="text-emerald-400">.de</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Datengestütztes Vergleichsportal für Gehälter, Löhne und Stundenverrechnungssätze in Deutschland. Wissenschaftliche Modellierung auf Basis amtlicher Primärquellen (Statistisches Bundesamt Destatis &amp; Bundesagentur für Arbeit).
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> 100 % Werbefrei
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-mono">
                <Scale className="w-3.5 h-3.5" /> EntgTranspG &amp; KldB 2010
              </span>
            </div>
          </div>

          {/* Tools & Rechner */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Rechner &amp; Daten
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rechner" className="hover:text-emerald-400 transition-colors">
                  Lohnvergleichsrechner
                </Link>
              </li>
              <li>
                <Link to="/gehalt" className="hover:text-emerald-400 transition-colors">
                  Gehalt nach Beruf
                </Link>
              </li>
              <li>
                <Link to="/durchschnittsgehalt" className="hover:text-emerald-400 transition-colors">
                  Durchschnittsgehalt Deutschland
                </Link>
              </li>
              <li>
                <Link to="/entgeltatlas" className="hover:text-emerald-400 transition-colors">
                  Berufs-Entgeltatlas
                </Link>
              </li>
              <li>
                <Link to="/rechner-embed" className="hover:text-emerald-400 transition-colors">
                  Webmaster Rechner-Widget
                </Link>
              </li>
            </ul>
          </div>

          {/* Ratgeber & Wissen */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Recht &amp; Methodik
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/methodik" className="hover:text-emerald-400 transition-colors font-medium">
                  Methodik &amp; Datenquellen
                </Link>
              </li>
              <li>
                <Link to="/ratgeber" className="hover:text-emerald-400 transition-colors">
                  Entgelttransparenz (§ 10 EntgTranspG)
                </Link>
              </li>
              <li>
                <Link to="/ratgeber#eu-richtlinie" className="hover:text-emerald-400 transition-colors">
                  EU-Entgelttransparenzrichtlinie
                </Link>
              </li>
              <li>
                <Link to="/glossar" className="hover:text-emerald-400 transition-colors">
                  Fachglossar (Median vs. Mittelwert)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                  Häufige Fragen (FAQ)
                </Link>
              </li>
              <li>
                <a
                  href="https://www.destatis.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors text-xs"
                >
                  Destatis Verdienststatistik <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches & Transparenz */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Transparenz
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                  → Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
              <li className="pt-2">
                <span className="block text-xs text-slate-500 leading-snug">
                  Hinweis: Modellberechnung zur Gehaltseinordnung. Keine Rechts- oder Steuerberatung.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {DATA_METADATA.contentYear} lohnvergleichsrechner.de · Alle Rechte vorbehalten.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>§ 5 DDG</span>
            <span>·</span>
            <span>DSGVO-konform</span>
            <span>·</span>
            <span>Zero-CDN-Fonts</span>
            <span>·</span>
            <span>Werbefrei</span>
            <span>·</span>
            <span>Destatis &amp; BA-Referenz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
