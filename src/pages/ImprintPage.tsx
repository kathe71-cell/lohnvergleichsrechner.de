import { Mail, Phone, MapPin, Scale } from 'lucide-react';

export default function ImprintPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              RECHTLICHE ANGABEN NACH § 5 DDG &amp; § 18 MSTV
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Impressum
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Gesetzliche Anbieterkennzeichnung für lohnvergleichsrechner.de
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Operator Data Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
            </h2>
            <div className="text-slate-900 font-medium space-y-1 text-base">
              <p className="font-bold text-lg">Jens Kathe</p>
              <p className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                Hansastraße 6, 34119 Kassel, Deutschland
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Kontakt</h3>
              <div className="space-y-2">
                <a href="mailto:jens-kathe@web.de" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  jens-kathe@web.de
                </a>
                <p className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  +49 174 8192809
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Verantwortlich für Inhalte</h3>
              <p className="text-slate-700 flex items-center gap-2">
                <Scale className="w-4 h-4 text-slate-400 shrink-0" />
                Jens Kathe (Anschrift wie oben)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 text-sm text-slate-600 shadow-xs">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Hinweis zu Modellrechnungen</h3>
            <p>
              Die auf lohnvergleichsrechner.de bereitgestellten Rechner, Richtwerte und statistischen Analysen stellen beispielhafte Modellrechnungen dar. Sie dienen der allgemeinen Information und Orientierung. Sie begründen keinen Rechtsanspruch und ersetzen keine individuelle Rechtsberatung durch einen Fachanwalt für Arbeitsrecht oder Steuerberater.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
