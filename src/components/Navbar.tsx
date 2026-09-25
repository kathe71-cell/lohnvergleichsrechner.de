import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, BarChart3, BookOpen, HelpCircle, Layers, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/rechner', label: 'Lohnrechner', icon: Calculator },
    { to: '/gehalt', label: 'Gehalt nach Beruf', icon: BarChart3 },
    { to: '/durchschnittsgehalt', label: 'Durchschnittsgehalt', icon: Layers },
    { to: '/entgeltatlas', label: 'Entgeltatlas', icon: BarChart3 },
    { to: '/ratgeber', label: 'Ratgeber', icon: BookOpen },
    { to: '/methodik', label: 'Methodik', icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-mono font-bold text-base shadow-xs group-hover:bg-emerald-600 transition-colors">
              €
            </div>
            <div>
              <span className="font-extrabold text-slate-950 text-base sm:text-lg tracking-tight block leading-tight">
                lohnvergleichsrechner<span className="text-emerald-700">.de</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono tracking-normal block leading-tight">
                Destatis &amp; BA Benchmark
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'bg-slate-100 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/rechner"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Lohn jetzt prüfen
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold ${
                  active
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/rechner"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white font-bold text-base shadow-sm"
            >
              <Calculator className="w-5 h-5" />
              Lohnvergleich starten
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
