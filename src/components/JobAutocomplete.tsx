import { useState, useRef, useEffect, useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import { Search, Check } from 'lucide-react';
import { SALARY_DATABASE } from '../data/salaryData';

interface JobAutocompleteProps {
  value?: string; // Aktuelle jobId (für Calculator)
  onSelect: (jobId: string) => void;
  placeholder?: string;
  className?: string;
  mode?: 'navigate' | 'select'; 
}

export default function JobAutocomplete({ 
  value, 
  onSelect, 
  placeholder = "Beruf suchen, z. B. Softwareentwickler...",
  className = "",
  mode = 'select' 
}: JobAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialwert setzen (für Calculator)
  useEffect(() => {
    if (mode === 'select' && value && !isOpen) {
      const job = SALARY_DATABASE.find(j => j.id === value);
      if (job) {
        setQuery(job.title.split(' / ')[0]);
      }
    }
  }, [value, mode, isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset query if select mode and we closed without picking
        if (mode === 'select' && value) {
          const job = SALARY_DATABASE.find(j => j.id === value);
          if (job) setQuery(job.title.split(' / ')[0]);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mode, value]);

  const filteredJobs = useMemo(() => {
    if (!query.trim() && mode === 'select') return SALARY_DATABASE; // Zeige alle im Select-Modus bei leerer Eingabe
    if (!query.trim() && mode === 'navigate') return []; // Im Navigate-Modus leer lassen

    const searchLower = query.toLowerCase().trim();
    return SALARY_DATABASE.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(searchLower);
      const aliasMatch = job.aliases ? job.aliases.some(a => a.toLowerCase().includes(searchLower)) : false;
      const kldbMatch = job.officialKldbLabel ? job.officialKldbLabel.toLowerCase().includes(searchLower) : false;
      const descMatch = job.shortDesc.toLowerCase().includes(searchLower);
      const taskMatch = job.tasks ? job.tasks.some(t => t.toLowerCase().includes(searchLower)) : false;
      const skillMatch = job.skills ? job.skills.some(s => s.toLowerCase().includes(searchLower)) : false;
      
      return titleMatch || aliasMatch || kldbMatch || descMatch || taskMatch || skillMatch;
    }).slice(0, 10); // Max 10 Treffer für Performance und UX
  }, [query, mode]);

  const handleSelect = (jobId: string) => {
    setIsOpen(false);
    if (mode === 'select') {
      const job = SALARY_DATABASE.find(j => j.id === jobId);
      if (job) setQuery(job.title.split(' / ')[0]);
    } else {
      setQuery(''); // Reset nach Navigation
    }
    inputRef.current?.blur();
    onSelect(jobId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredJobs.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredJobs[activeIndex]) {
        handleSelect(filteredJobs[activeIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="job-listbox"
          aria-activedescendant={isOpen && filteredJobs[activeIndex] ? `job-${filteredJobs[activeIndex].id}` : undefined}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => {
            setIsOpen(true);
            if (mode === 'select') {
              // Bei Select: Alles markieren für schnelles Überschreiben
              setTimeout(() => inputRef.current?.select(), 10);
            }
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && filteredJobs.length > 0 && (
        <ul
          id="job-listbox"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-[300px] overflow-y-auto py-1.5 focus:outline-none"
        >
          {filteredJobs.map((job, index) => {
            const isSelected = index === activeIndex;
            const isCurrentValue = value === job.id && mode === 'select';
            
            return (
              <li
                key={job.id}
                id={`job-${job.id}`}
                role="option"
                aria-selected={isSelected}
                className={`relative px-4 py-2.5 cursor-pointer select-none transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-emerald-50 text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => handleSelect(job.id)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex flex-col">
                  <span className={`block truncate ${isSelected || isCurrentValue ? 'font-bold' : 'font-medium'}`}>
                    {job.title}
                  </span>
                  <span className={`block text-xs font-mono mt-0.5 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`}>
                    KldB {job.kldbCode} · Median {job.medianYear.toLocaleString('de-DE')} € / Jahr
                  </span>
                </div>
                {isCurrentValue && (
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {isOpen && query.trim() !== '' && filteredJobs.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-4 px-4 text-center">
          <p className="text-sm text-slate-500 font-medium">Kein passender Beruf gefunden.</p>
          <p className="text-xs text-slate-400 mt-1">Bitte überprüfen Sie die Schreibweise oder verwenden Sie einen übergreifenden Begriff.</p>
        </div>
      )}
    </div>
  );
}
