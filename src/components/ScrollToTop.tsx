import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname, search, hash } = useLocation();

  // Scroll to top or targeted anchor on any route/link navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (hash) {
        const elem = document.querySelector(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className="fixed bottom-20 md:bottom-8 right-6 z-40 p-3.5 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 no-print cursor-pointer border border-slate-700"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}
