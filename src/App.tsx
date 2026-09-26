import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StickyBottomBar from './components/StickyBottomBar';
import VercelAnalytics from './components/VercelAnalytics';

import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';
import AtlasPage from './pages/AtlasPage';
import SalaryIndexPage from './pages/SalaryIndexPage';
import JobSalaryPage from './pages/JobSalaryPage';
import JobStateSalaryPage from './pages/JobStateSalaryPage';
import AverageSalaryPage from './pages/AverageSalaryPage';
import MethodologyPage from './pages/MethodologyPage';
import GuidePage from './pages/GuidePage';
import GlossaryPage from './pages/GlossaryPage';
import FaqPage from './pages/FaqPage';
import EmbedPage from './pages/EmbedPage';
import EmbedSalaryComparisonPage from './pages/EmbedSalaryComparisonPage';
import EmbedGuidePage from './pages/EmbedGuidePage';
import ImprintPage from './pages/ImprintPage';
import PrivacyPage from './pages/PrivacyPage';

export function Layout() {
  const location = useLocation();
  const isEmbed = location.pathname.startsWith('/embed') || location.pathname === '/rechner-embed';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <VercelAnalytics />
      {!isEmbed && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rechner" element={<CalculatorPage />} />
          <Route path="/entgeltatlas" element={<AtlasPage />} />
          <Route path="/durchschnittsgehalt" element={<AverageSalaryPage />} />
          <Route path="/gehalt" element={<SalaryIndexPage />} />
          <Route path="/gehalt/:jobId" element={<JobSalaryPage />} />
          <Route path="/gehalt/:jobId/:stateSlug" element={<JobStateSalaryPage />} />
          <Route path="/methodik" element={<MethodologyPage />} />
          <Route path="/ratgeber" element={<GuidePage />} />
          <Route path="/glossar" element={<GlossaryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/embed/gehaltsvergleich" element={<EmbedSalaryComparisonPage />} />
          <Route path="/gehaltsrechner-einbinden" element={<EmbedGuidePage />} />
          <Route path="/rechner-embed" element={<EmbedPage />} />
          <Route path="/impressum" element={<ImprintPage />} />
          <Route path="/datenschutz" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isEmbed && <Footer />}
      {!isEmbed && <ScrollToTop />}
      {!isEmbed && <StickyBottomBar />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
