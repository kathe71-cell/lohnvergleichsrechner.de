import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobAutocomplete from '../components/JobAutocomplete';
import { SALARY_DATABASE } from '../data/salaryData';
import Breadcrumbs from '../components/Breadcrumbs';
import EditorialTrustBox from '../components/EditorialTrustBox';
import CitationBox from '../components/CitationBox';
import { Filter, ArrowRight, TrendingUp } from 'lucide-react';

export default function SalaryIndexPage() {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState('Alle');

  const categories = useMemo(() => {
    return ['Alle', ...Array.from(new Set(SALARY_DATABASE.map(j => j.category)))];
  }, []);

  const filteredJobs = useMemo(() => {
    return SALARY_DATABASE.filter(j => {
      return selectedCat === 'Alle' || j.category === selectedCat;
    });
  }, [selectedCat]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'Gehalt nach Beruf', url: '/gehalt' }]} />
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              BERUFSGEHÄLTER &amp; ENTGELTSTRUKTUREN
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Gehalt nach Beruf: Amtliche Gehälter in Deutschland
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Wie viel verdient man in welchem Beruf? Entdecken Sie verlässliche Mediane, Einstiegsgehälter, Spitzenverdienste und KldB-Aufgabenprofile auf Basis amtlicher Verdienststatistiken.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <JobAutocomplete 
              mode="navigate" 
              onSelect={(id) => navigate(`/gehalt/${id}`)}
              placeholder="Beruf suchen, z. B. Softwareentwickler..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
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

    </div>
  );
}
