import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          DATENSCHUTZ NACH DSGVO &amp; TDDDG
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Datenschutzerklärung
        </h1>
        <p className="text-base text-slate-600">
          Informationen über die Verarbeitung personenbezogener Daten auf lohnvergleichsrechner.de
        </p>
      </div>

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
            </Link>
            .
          </p>
        </section>

        {/* Grundsatz: Sparsamkeit & Zero-CDN */}
        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-600" />
            2. Grundsatz der Datenminimierung &amp; Keine externen CDNs
          </h2>
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Website kann grundsätzlich ohne Angabe personenbezogener Daten genutzt werden.
          </p>
          <p>
            <strong>Keine externen Schriftarten (Zero-CDN):</strong> Wir binden keine externen Webfonts (wie Google Fonts oder Adobe Fonts) von Drittservern ein. Alle Schriftarten werden ausschließlich über das native System Ihres Endgeräts gerendert. Es findet somit beim Aufruf unserer Website keine Übertragung Ihrer IP-Adresse an externe Schriftarten-Server in Drittstaaten statt.
          </p>
        </section>

        {/* Server-Logfiles */}
        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-600" />
            3. Server-Logfiles &amp; Hosting (Vercel Inc.)
          </h2>
          <p>
            Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Seiten erfasst der Provider automatisch technische Informationen, die Ihr Browser übermittelt:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL (die zuvor besuchte Seite)</li>
            <li>Hostname des zugreifenden Rechners / IP-Adresse (anonymisiert)</li>
            <li>Uhrzeit der Serveranfrage</li>
          </ul>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung eines stabilen und sicheren Betriebs der Webserver. Mit dem Hosting-Anbieter besteht eine Vereinbarung zur Auftragsverarbeitung (Data Processing Addendum, DPA) nach den EU-Standardvertragsklauseln.
          </p>
        </section>

        {/* Vercel Web Analytics */}
        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            4. Vercel Web Analytics (Cookielose Webanalyse)
          </h2>
          <p>
            Diese Website nutzt <strong>Vercel Web Analytics</strong>, einen Analysedienst der Vercel Inc. Vercel Web Analytics arbeitet vollständig <strong>cookielos</strong> und speichert keinerlei dauerhafte Kennungen oder personenbezogene Profile auf Ihrem Endgerät ab.
          </p>
          <p>
            Es werden ausschließlich aggregierte Kennzahlen (z. B. aufgerufene Seitenpfade, Browsertyp, Land des Abrufs und Bildschirmauflösung) erfasst. IP-Adressen werden unmittelbar nach dem Empfang unwiderruflich pseudonymisiert und verworfen. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Reichweitenmessung und Optimierung unseres kostenlosen Informationsangebots.
          </p>
        </section>

        {/* Rechte der betroffenen Person */}
        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            5. Ihre Rechte als betroffene Person
          </h2>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Sperrung oder Löschung (Art. 17 DSGVO) dieser Daten.
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
  );
}
