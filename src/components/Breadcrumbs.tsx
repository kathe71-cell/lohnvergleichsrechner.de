import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Startseite', url: '/' }, ...items];

  // Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.lohnvergleichsrechner.de${item.url === '/' ? '' : item.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-2.5 px-1 no-print">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-emerald-700 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span className="sr-only">Startseite</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                    {isLast ? (
                      <span className="text-slate-800 font-bold truncate max-w-[240px] sm:max-w-none" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        to={item.url}
                        className="hover:text-emerald-700 transition-colors truncate max-w-[180px] sm:max-w-none"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
