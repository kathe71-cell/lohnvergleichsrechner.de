import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SALARY_DATABASE } from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import { Search, Filter, ArrowRight, TrendingUp } from 'lucide-react';

export default function SalaryIndexPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('Alle');

  const categories = useMemo(() => {
    return ['Alle', ...Array.from(new Set(SALARY_DATABASE.map(j => j.category)))];
  }, []);

  const filteredJobs = useMemo(() => {
    return SALARY_DATABASE.filter(j => {
      const matchSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.kldbCode.includes(searchTerm) ||
        j.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCat === 'Alle' || j.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      
      <Breadcrumbs items={[{ name: 'Gehalt nach Beruf', url: '/gehalt' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              BERUFSGEHÄLTER &amp; ENTGELTSTRUKTUREN
            </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Gehalt nach Beruf: Amtliche Gehälter in Deutschland
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Wie viel verdient man in welchem Beruf? Entdecken Sie verlässliche Mediane, Einstiegsgehälter, Spitzenverdienste und KldB-Aufgabenprofile auf Basis amtlicher Verdienststatistiken.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Beruf suchen (z. B. Softwareentwickler, Mechatroniker, Pflegefachkraft)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCat === cat
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
          <span>{filteredJobs.length} Berufs-Landingpages verfügbar</span>
          <span>Vollzeit (40h/Woche) Bundesmedian</span>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const avgYear = Math.round(job.medianYear * 1.11);
          return (
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
                <h2 className="font-extrabold text-slate-900 text-lg mb-1">
                  <Link to={`/gehalt/${job.id}`} className="hover:text-emerald-700 transition-colors">
                    {job.title}
                  </Link>
                </h2>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {job.shortDesc}
                </p>

                {/* Salary metrics */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Median (50 %):</span>
                    <span className="font-mono text-emerald-800 text-sm font-extrabold">
                      {job.medianYear.toLocaleString('de-DE')} € p.a.
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Durchschnitt (ca.):</span>
                    <span className="font-mono font-medium text-slate-700">
                      {avgYear.toLocaleString('de-DE')} € p.a.
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Korridor (P25 - P75):</span>
                    <span className="font-mono font-medium text-slate-700">
                      {job.p25Year.toLocaleString('de-DE')} € – {job.p75Year.toLocaleString('de-DE')} €
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {job.category}
                </span>
                <Link
                  to={`/gehalt/${job.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Gehaltsprofil öffnen <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Trust */}
      <section>
        <EditorialTrustBox />
      </section>

      {/* Citation Box */}
      <section>
        <CitationBox
          title="Gehalt nach Beruf: Amtliche KldB-Entgeltstrukturen in Deutschland"
          url="https://lohnvergleichsrechner.de/gehalt"
        />
      </section>

    </div>
  );
}
