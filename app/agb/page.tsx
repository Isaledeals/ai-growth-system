import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB — AI Growth System",
  description:
    "Allgemeine Gesch\u00e4ftsbedingungen der DIAS SALES SOLUTIONS - FZCO f\u00fcr das AI Growth System.",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="border-b border-border/50 bg-gray-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3B82F6, #10B981)",
            }}
          >
            AI Growth System
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight gradient-text mb-10">
          Allgemeine Gesch&auml;ftsbedingungen
        </h1>

        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10">
          {/* 1. Geltungsbereich */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              1. Geltungsbereich
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Diese Allgemeinen Gesch&auml;ftsbedingungen (nachfolgend
              &bdquo;AGB&ldquo;) gelten f&uuml;r alle Vertr&auml;ge zwischen der
              DIAS SALES SOLUTIONS - FZCO, Dubai Silicon Oasis, DDP, Building A2,
              Dubai, Vereinigte Arabische Emirate (nachfolgend
              &bdquo;Anbieter&ldquo;) und dem Kunden (nachfolgend
              &bdquo;Auftraggeber&ldquo;) &uuml;ber die Nutzung des AI Growth
              System.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Das AI Growth System ist ein Done-for-you
              KI-Automatisierungsservice, der lokalen Unternehmen
              ma&szlig;geschneiderte KI-L&ouml;sungen zur Automatisierung von
              Gesch&auml;ftsprozessen bereitstellt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Abweichende oder erg&auml;nzende Bedingungen des Auftraggebers werden
              nur wirksam, wenn der Anbieter ihnen ausdr&uuml;cklich schriftlich
              zustimmt.
            </p>
          </section>

          {/* 2. Leistungsbeschreibung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              2. Leistungsbeschreibung
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Anbieter erbringt im Rahmen des gew&auml;hlten Pakets
              (Starter, Growth oder Complete) folgende Leistungen als
              Done-for-you-Service:
            </p>
            <ul className="text-muted leading-relaxed text-sm list-disc pl-5 space-y-2 mb-3">
              <li>
                Einrichtung und Konfiguration von KI-Automatisierungen
                (z.&nbsp;B. Chatbots, E-Mail-Automatisierung,
                Terminbuchungssysteme, CRM-Integration)
              </li>
              <li>
                Laufende Betreuung, Optimierung und Wartung der eingerichteten
                Systeme
              </li>
              <li>
                Regelm&auml;&szlig;ige Performance-Reports und strategische
                Beratung (je nach gew&auml;hltem Paket)
              </li>
              <li>
                Support via E-Mail und/oder Messenger (Reaktionszeiten abh&auml;ngig
                vom gew&auml;hlten Paket)
              </li>
            </ul>
            <p className="text-muted leading-relaxed text-sm">
              Der genaue Leistungsumfang ergibt sich aus der jeweiligen
              Paketbeschreibung auf der Website sowie aus individuellen
              Vereinbarungen. Der Anbieter schuldet die Einrichtung und den
              Betrieb der vereinbarten Automatisierungen, nicht jedoch einen
              bestimmten wirtschaftlichen Erfolg.
            </p>
          </section>

          {/* 3. Vertragsdauer und Kündigung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              3. Vertragsdauer und K&uuml;ndigung
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Vertrag wird auf unbestimmte Zeit geschlossen und ist
              monatlich k&uuml;ndbar. Die K&uuml;ndigung kann von beiden Seiten
              mit einer Frist von 14 Tagen zum Ende des jeweiligen
              Abrechnungsmonats erkl&auml;rt werden.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Die K&uuml;ndigung bedarf der Textform (E-Mail ist ausreichend).
              Eine K&uuml;ndigung kann an{" "}
              <a
                href="mailto:kostasdias.dubai@gmail.com"
                className="text-primary-light hover:underline"
              >
                kostasdias.dubai@gmail.com
              </a>{" "}
              gesendet werden.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Das Recht zur au&szlig;erordentlichen K&uuml;ndigung aus wichtigem
              Grund bleibt unber&uuml;hrt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Bei K&uuml;ndigung werden die eingerichteten Automatisierungen
              nach Ablauf des Vertragszeitraums deaktiviert. Der Auftraggeber
              erh&auml;lt auf Wunsch eine &Uuml;bergabe seiner Daten in einem
              g&auml;ngigen Format.
            </p>
          </section>

          {/* 4. Preise und Zahlung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              4. Preise und Zahlung
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Die monatlichen Geb&uuml;hren richten sich nach dem gew&auml;hlten
              Paket und liegen zwischen &euro;697 und &euro;1.797 netto pro
              Monat. Zus&auml;tzlich kann eine einmalige Setup-Geb&uuml;hr
              anfallen. Die aktuellen Preise sind auf der Website des Anbieters
              einsehbar.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Alle genannten Preise verstehen sich als Nettopreise. Gesetzliche
              Steuern (z.&nbsp;B. Umsatzsteuer) werden, sofern anwendbar,
              gesondert ausgewiesen.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Die Zahlung erfolgt monatlich im Voraus per Kreditkarte,
              &Uuml;berweisung oder einem vom Anbieter akzeptierten
              Zahlungsmittel. Die Rechnung wird zu Beginn jedes
              Abrechnungszeitraums gestellt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Kommt der Auftraggeber mit der Zahlung in Verzug, ist der Anbieter
              berechtigt, die Leistungen nach vorheriger Mahnung und Setzung
              einer angemessenen Nachfrist vor&uuml;bergehend einzustellen.
            </p>
          </section>

          {/* 5. Mitwirkungspflichten */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              5. Mitwirkungspflichten des Auftraggebers
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Auftraggeber stellt dem Anbieter alle f&uuml;r die
              Leistungserbringung erforderlichen Informationen, Zug&auml;nge und
              Materialien rechtzeitig zur Verf&uuml;gung.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Verz&ouml;gerungen, die durch fehlende oder versp&auml;tete
              Mitwirkung des Auftraggebers entstehen, gehen nicht zu Lasten des
              Anbieters. Der Anbieter ist in solchen F&auml;llen berechtigt,
              vereinbarte Termine entsprechend zu verschieben.
            </p>
          </section>

          {/* 6. Gewährleistung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              6. Gew&auml;hrleistung
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Anbieter erbringt seine Leistungen mit der gebotenen Sorgfalt
              und nach dem aktuellen Stand der Technik. Der Anbieter
              gew&auml;hrleistet die vertragsm&auml;&szlig;ige Funktion der
              eingerichteten Automatisierungen w&auml;hrend der Vertragslaufzeit.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              St&ouml;rungen oder Fehler werden vom Anbieter im Rahmen des
              vereinbarten Supports zeitnah behoben. Der Auftraggeber hat
              M&auml;ngel unverz&uuml;glich nach Entdeckung schriftlich
              anzuzeigen.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Eine Gew&auml;hrleistung f&uuml;r bestimmte wirtschaftliche
              Ergebnisse (z.&nbsp;B. Umsatzsteigerung, Anzahl generierter Leads)
              wird nicht &uuml;bernommen.
            </p>
          </section>

          {/* 7. Haftungsbeschränkung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              7. Haftungsbeschr&auml;nkung
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Anbieter haftet unbeschr&auml;nkt f&uuml;r Sch&auml;den aus
              der Verletzung des Lebens, des K&ouml;rpers oder der Gesundheit
              sowie f&uuml;r vors&auml;tzlich oder grob fahrl&auml;ssig
              verursachte Sch&auml;den.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              F&uuml;r leicht fahrl&auml;ssig verursachte Sch&auml;den haftet
              der Anbieter nur bei Verletzung wesentlicher Vertragspflichten
              (Kardinalpflichten). In diesem Fall ist die Haftung auf den
              vorhersehbaren, vertragstypischen Schaden begrenzt.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Die H&ouml;he der Haftung ist in jedem Fall auf die vom
              Auftraggeber in den letzten sechs Monaten gezahlten
              Verg&uuml;tungen begrenzt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Der Anbieter haftet nicht f&uuml;r Sch&auml;den, die durch
              h&ouml;here Gewalt, Ausfall von Drittanbietern (z.&nbsp;B.
              KI-Plattformen, Hosting-Provider) oder durch fehlende Mitwirkung
              des Auftraggebers entstehen.
            </p>
          </section>

          {/* 8. Datenschutz */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              8. Datenschutz
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Der Anbieter verarbeitet personenbezogene Daten des Auftraggebers
              ausschlie&szlig;lich im Rahmen der geltenden
              Datenschutzbestimmungen, insbesondere der DSGVO.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Einzelheiten zur Datenverarbeitung entnehmen Sie bitte unserer{" "}
              <Link
                href="/datenschutz"
                className="text-primary-light hover:underline"
              >
                Datenschutzerkl&auml;rung
              </Link>
              .
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Sofern im Rahmen der Leistungserbringung personenbezogene Daten
              des Auftraggebers oder seiner Kunden verarbeitet werden, schlie&szlig;en
              die Parteien bei Bedarf einen
              Auftragsverarbeitungsvertrag gem&auml;&szlig; Art. 28 DSGVO ab.
            </p>
          </section>

          {/* 9. Geheimhaltung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              9. Geheimhaltung
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Beide Parteien verpflichten sich, alle im Rahmen der
              Zusammenarbeit erlangten vertraulichen Informationen der jeweils
              anderen Partei geheim zu halten und nur f&uuml;r die
              Vertragszwecke zu verwenden. Diese Verpflichtung besteht auch
              nach Beendigung des Vertrags fort.
            </p>
          </section>

          {/* 10. Schlussbestimmungen */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              10. Schlussbestimmungen
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Es gilt das Recht der Vereinigten Arabischen Emirate (UAE) unter
              Ausschluss des UN-Kaufrechts. F&uuml;r Verbraucher innerhalb der
              EU bleiben zwingende Verbraucherschutzvorschriften des
              Aufenthaltsstaates unber&uuml;hrt.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Gerichtsstand f&uuml;r alle Streitigkeiten aus oder im
              Zusammenhang mit diesem Vertrag ist Dubai, UAE, soweit gesetzlich
              zul&auml;ssig.
            </p>
            <p className="text-muted leading-relaxed text-sm mb-3">
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder
              werden, bleibt die Wirksamkeit der &uuml;brigen Bestimmungen
              unber&uuml;hrt. Anstelle der unwirksamen Bestimmung tritt eine
              Regelung, die dem wirtschaftlichen Zweck der unwirksamen
              Bestimmung am n&auml;chsten kommt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              &Auml;nderungen und Erg&auml;nzungen dieser AGB bed&uuml;rfen der
              Textform. Der Anbieter beh&auml;lt sich das Recht vor, diese AGB
              mit angemessener Ank&uuml;ndigungsfrist zu &auml;ndern. Der
              Auftraggeber wird &uuml;ber &Auml;nderungen rechtzeitig informiert.
            </p>
          </section>

          {/* Stand */}
          <section>
            <p className="text-muted leading-relaxed text-sm italic">
              Stand: April 2026
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            &larr; Zur&uuml;ck zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
