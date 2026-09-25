import { Mail, Phone, MapPin, Scale } from 'lucide-react';

export default function ImprintPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
          <Scale className="w-3.5 h-3.5 text-slate-700" />
          RECHTLICHE ANGABEN NACH § 5 DDG &amp; § 18 MSTV
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Impressum
        </h1>
        <p className="text-base text-slate-600">
          Gesetzliche Anbieterkennzeichnung für lohnvergleichsrechner.de
        </p>
      </div>

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

        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            Kontakt
          </h2>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-500">Telefon:</span>
              <a
                href="tel:+4917866526230"
                className="font-mono font-bold text-slate-900 hover:text-emerald-700 transition-colors"
              >
                +49 178 6652623
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-500">E-Mail:</span>
              <a
                href="mailto:jens@kathe.org"
                className="font-mono font-bold text-emerald-700 hover:underline transition-colors"
              >
                jens@kathe.org
              </a>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 Medienstaatsvertrag (MStV)
          </h2>
          <div className="text-sm text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">Jens Kathe</p>
            <p>Hansastraße 6, 34119 Kassel</p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
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
  );
}
