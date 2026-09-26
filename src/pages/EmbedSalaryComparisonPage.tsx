import { useSearchParams } from 'react-router-dom';
import EmbedSalaryWidget from '../components/EmbedSalaryWidget';

export default function EmbedSalaryComparisonPage() {
  const [searchParams] = useSearchParams();

  const berufParam = searchParams.get('beruf') || searchParams.get('job') || undefined;
  const bundeslandParam = searchParams.get('bundesland') || searchParams.get('state') || undefined;
  const erfahrungParam = searchParams.get('erfahrung') || searchParams.get('exp') || undefined;
  const gehaltParam = searchParams.get('gehalt') ? parseInt(searchParams.get('gehalt')!, 10) : undefined;

  // Design parameters
  const accentParam = searchParams.get('accent') || searchParams.get('color') || undefined;
  const bgParam = searchParams.get('bg') || searchParams.get('background') || searchParams.get('theme') || undefined;
  const radiusParam = (searchParams.get('radius') as any) || undefined;
  const fontParam = (searchParams.get('font') as any) || undefined;

  return (
    <div className="w-full min-h-screen p-2 sm:p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="sr-only">Gehaltsvergleich Widget – Lohnvergleichsrechner.de</h1>
        <EmbedSalaryWidget
          initialJobId={berufParam}
          initialStateCode={bundeslandParam}
          initialExperienceKey={erfahrungParam}
          initialGross={gehaltParam}
          accent={accentParam}
          bg={bgParam}
          radius={radiusParam}
          font={fontParam}
        />
      </div>
    </div>
  );
}
