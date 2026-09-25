import { Link, useLocation } from 'react-router-dom';
import { Calculator, BarChart3, BookOpen } from 'lucide-react';

export default function StickyBottomBar() {
  const location = useLocation();
  if (location.pathname === '/rechner-embed') return null;

  return (
    <aside aria-label="Mobile Schnellzugriff" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg no-print sticky-bottom-bar">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <Link
          to="/rechner"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs min-h-12 active:scale-95 transition-transform"
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span>Rechner</span>
        </Link>
        <Link
          to="/entgeltatlas"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs min-h-12 active:scale-95 transition-transform"
        >
          <BarChart3 className="w-4 h-4 mb-0.5 text-slate-600" />
          <span>Entgeltatlas</span>
        </Link>
        <Link
          to="/ratgeber"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs min-h-12 active:scale-95 transition-transform"
        >
          <BookOpen className="w-4 h-4 mb-0.5 text-slate-600" />
          <span>Ratgeber</span>
        </Link>
      </div>
    </aside>
  );
}
