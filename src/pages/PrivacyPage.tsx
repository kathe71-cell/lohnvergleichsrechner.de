import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-6 sm:pt-8 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <Breadcrumbs items={[{ name: 'Datenschutz', url: '/datenschutz' }]} />
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
              DATENSCHUTZ NACH DSGVO &amp; TDDDG
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Datenschutzerklärung
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Informationen über die Verarbeitung personenbezogener Daten auf lohnvergleichsrechner.de
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 text-sm text-slate-700 leading-relaxed shadow-xs">
          
          {/* Verantwortlicher */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              1. Verantwortlicher für die Datenverarbeitung
            </h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und sonstiger datenschutzrechtlicher Bestimmungen ist der im Impressum genannte Betreiber der Website.
            </p>
            <p className="font-semibold text-slate-900">
              Vollständige Kontaktdaten siehe{' '}
              <Link to="/impressum" className="text-emerald-700 hover:underline">
                Impressum
              </Link>.
            </p>
          </section>

          {/* Keine Cookies */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-emerald-600" />
              2. Keine Cookies &amp; Kein Tracking
            </h2>
            <p>
              Diese Website ist so konzipiert, dass sie <strong>vollkommen ohne zustimmungspflichtige Cookies</strong> und ohne invasive Tracking-Tools (wie Google Analytics oder Meta Pixel) auskommt.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Wir setzen keine Analyse-Cookies.</li>
              <li>Wir setzen keine Werbe-Cookies.</li>
              <li>Wir erstellen keine Nutzerprofile.</li>
              <li>Das lästige Cookie-Banner entfällt somit gemäß § 25 Abs. 2 TTDSG / TDDDG.</li>
            </ul>
          </section>

          {/* Hosting */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-600" />
              3. Hosting &amp; Server-Logfiles (Vercel)
            </h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet.
            </p>
            <p>
              Bei jedem Aufruf der Website erfasst der Provider automatisiert Daten und Informationen vom Computersystem des aufrufenden Rechners. Folgende Daten werden hierbei in den Server-Logfiles erhoben:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>IP-Adresse (anonymisiert bzw. gekürzt)</li>
              <li>Datum und Uhrzeit der Serveranfrage</li>
            </ul>
            <p>
              Rechtsgrundlage für die vorübergehende Speicherung dieser Daten ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und fehlerfreien Bereitstellung der Website). Ein Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO mit Vercel wurde geschlossen.
            </p>
          </section>

          {/* Lokale Berechnungen */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              4. Lokale Berechnungen (Rechner-Tool)
            </h2>
            <p>
              Alle Eingaben, die Sie in den Lohnvergleichsrechner tätigen (Beruf, Bundesland, Erfahrung, Unternehmensgröße, Gehalt), werden <strong>ausschließlich lokal in Ihrem Browser</strong> (Client-Side) verarbeitet.
            </p>
            <p>
              Ihre Gehaltsdaten werden:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
              <li>NICHT an unsere Server gesendet.</li>
              <li>NICHT in einer Datenbank gespeichert.</li>
              <li>NICHT für Analysezwecke ausgewertet.</li>
            </ul>
            <p>
              Die Parameter werden lediglich zur Generierung der teilbaren URL in die Adresszeile (als URL-Parameter) geschrieben.
            </p>
          </section>

          {/* Rechte */}
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              5. Ihre Rechte als betroffene Person
            </h2>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO).</li>
              <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO).</li>
              <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO).</li>
              <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO).</li>
            </ul>
            <p>
              Da wir jedoch (wie oben beschrieben) ohnehin keine Bestandsdaten oder Nutzerprofile speichern, laufen entsprechende Anfragen in der Regel ins Leere.
            </p>
            <p>
              Darüber hinaus steht Ihnen ein Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).
            </p>
          </section>

          {/* Aktualität */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono">
            Stand: September 2026 · DSGVO-konform
          </div>

        </div>
      </div>
    </div>
  );
}
