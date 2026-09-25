import CalculatorWidget from '../components/CalculatorWidget';

export default function EmbedPage() {
  return (
    <div className="bg-slate-50 min-h-screen p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <CalculatorWidget isEmbed={true} />
        <div className="pt-2 text-center text-xs text-slate-500 font-mono">
          Bereitgestellt von{' '}
          <a
            href="https://lohnvergleichsrechner.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline font-bold"
          >
            lohnvergleichsrechner.de
          </a>{' '}
          · Destatis &amp; BA-Entgeltatlas Benchmark
        </div>
      </div>
    </div>
  );
}
