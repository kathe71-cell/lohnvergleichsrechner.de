import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SALARY_DATABASE } from '../data/salaryData';
import StateComparisonTable from '../components/StateComparisonTable';
import CitationBox from '../components/CitationBox';
import Breadcrumbs from '../components/Breadcrumbs';
import EditorialTrustBox from '../components/EditorialTrustBox';
import { Search, Filter, ArrowRight, TrendingUp } from 'lucide-react';

export default function AtlasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SALARY_DATABASE.map(j => j.category)));
    return ['Alle', ...cats];
  }, []);

  const filteredJobs = useMemo(() => {
    return SALARY_DATABASE.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.kldbCode.includes(searchTerm) ||
        job.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCat = selectedCategory === 'Alle' || job.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'Entgeltatlas', url: '/entgeltatlas' }]} />
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              OFFIZIELLER DATENKATALOG · KLASSIFIKATION DER BERUFE (KLDB 2010)
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Entgeltatlas: Berufe &amp; Gehälter in Deutschland
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Strukturierte Gehaltsdatenbank nach amtlichen KldB-Schlüsseln der Bundesagentur für Arbeit. Finden Sie den Median, das untere (P25) und obere (P75) Quartil für über 20 Berufsfelder.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Berufsbezeichnung oder KldB-Code filtern..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono flex items-center justify-between">
          <span>Treffer: <strong>{filteredJobs.length}</strong> Berufe angezeigt</span>
          <span>Bundesweiter Median (40h/Woche, Vollzeit)</span>
        </div>
      </div>

      {/* Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  KldB {job.kldbCode}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +{job.trendPercent} % p.a.
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                {job.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {job.shortDesc}
              </p>

              {/* Salary Metrics */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Unteres Quartil (25 %):</span>
                  <span className="font-mono font-semibold text-slate-700">{job.p25Year.toLocaleString('de-DE')} €</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold border-y border-slate-200 py-1">
                  <span className="text-slate-900">Median (50 %):</span>
                  <span className="font-mono text-emerald-800 text-base font-extrabold">{job.medianYear.toLocaleString('de-DE')} €</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Oberes Quartil (75 %):</span>
                  <span className="font-mono font-semibold text-slate-700">{job.p75Year.toLocaleString('de-DE')} €</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                {job.typicalEducation}
              </span>
              <Link
                to={`/rechner?beruf=${job.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Im Rechner anpassen <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* State comparison table */}
      <section>
        <StateComparisonTable />
      </section>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Zitation */}
      <section>
        <CitationBox
          title="Entgeltatlas Deutschland: Amtliche Lohn- und Gehaltsstrukturen nach KldB 2010"
          url="https://lohnvergleichsrechner.de/entgeltatlas"
        />
      </section>
      </div>

    </div>
  );
}
