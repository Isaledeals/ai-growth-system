import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerkl\u00e4rung — AI Growth System",
  description:
    "Datenschutzerkl\u00e4rung der DIAS SALES SOLUTIONS - FZCO. Informationen zum Umgang mit Ihren personenbezogenen Daten.",
};

export default function DatenschutzPage() {
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
          Datenschutzerkl&auml;rung
        </h1>

        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10">
          {/* 1. Überblick */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="text-base font-medium text-foreground mb-2">
              Allgemeine Hinweise
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              Die folgenden Hinweise geben einen einfachen &Uuml;berblick
              dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn
              Sie diese Website besuchen. Personenbezogene Daten sind alle
              Daten, mit denen Sie pers&ouml;nlich identifiziert werden
              k&ouml;nnen. Ausf&uuml;hrliche Informationen zum Thema
              Datenschutz entnehmen Sie unserer unter diesem Text aufgef&uuml;hrten
              Datenschutzerkl&auml;rung.
            </p>
          </section>

          {/* 2. Verantwortliche Stelle */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              2. Verantwortliche Stelle
            </h2>
            <div className="text-muted leading-relaxed text-sm space-y-1">
              <p className="text-foreground font-medium">
                DIAS SALES SOLUTIONS - FZCO
              </p>
              <p>Dubai Silicon Oasis</p>
              <p>DDP, Building A2</p>
              <p>Dubai, Vereinigte Arabische Emirate (UAE)</p>
              <p className="mt-3">Vertreten durch: Kostas Dias</p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:kostasdias.dubai@gmail.com"
                  className="text-primary-light hover:underline"
                >
                  kostasdias.dubai@gmail.com
                </a>
              </p>
            </div>
            <p className="text-muted leading-relaxed text-sm mt-4">
              Verantwortliche Stelle ist die nat&uuml;rliche oder juristische
              Person, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke
              und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B.
              Namen, E-Mail-Adressen o.&nbsp;&Auml;.) entscheidet.
            </p>
          </section>

          {/* 3. Datenerfassung auf dieser Website */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die
              Sie in ein Kontaktformular eingeben. Andere Daten werden
              automatisch oder nach Ihrer Einwilligung beim Besuch der Website
              durch unsere IT-Systeme erfasst. Das sind vor allem technische
              Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
              sobald Sie diese Website betreten.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2">
              Wof&uuml;r nutzen wir Ihre Daten?
            </h3>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gew&auml;hrleisten. Andere Daten
              k&ouml;nnen zur Analyse Ihres Nutzerverhaltens verwendet werden.
              Sofern Sie &uuml;ber die Website einen Vertrag abschlie&szlig;en
              oder eine Anfrage stellen, werden Ihre Daten zur
              Vertragsabwicklung bzw. Bearbeitung Ihrer Anfrage genutzt.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2">
              Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
              Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben au&szlig;erdem ein
              Recht, die Berichtigung oder L&ouml;schung dieser Daten zu
              verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
              erteilt haben, k&ouml;nnen Sie diese Einwilligung jederzeit
              f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das
              Recht, unter bestimmten Umst&auml;nden die Einschr&auml;nkung der
              Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des
              Weiteren steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen
              Aufsichtsbeh&ouml;rde zu.
            </p>
          </section>

          {/* 4. Hosting */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              4. Hosting
            </h2>
            <h3 className="text-base font-medium text-foreground mb-2">
              Vercel
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA (nachfolgend &bdquo;Vercel&ldquo;). Wenn Sie
              unsere Website besuchen, werden Ihre personenbezogenen Daten auf
              den Servern von Vercel verarbeitet. Hierbei k&ouml;nnen auch
              personenbezogene Daten an den Mutterkonzern von Vercel in die USA
              &uuml;bermittelt werden. Die Daten&uuml;bertragung in die USA wird
              auf die EU-Standardvertragsklauseln gest&uuml;tzt. Details finden
              Sie unter:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:underline"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              . Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
              m&ouml;glichst zuverl&auml;ssigen Darstellung unserer Website.
            </p>
          </section>

          {/* 5. Allgemeine Hinweise und Pflichtinformationen */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              5. Allgemeine Hinweise und Pflichtinformationen
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2">
              Datenschutz
            </h3>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer
              pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend den
              gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerkl&auml;rung. Wenn Sie diese Website benutzen, werden
              verschiedene personenbezogene Daten erhoben. Die vorliegende
              Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben
              und wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu
              welchem Zweck das geschieht.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
              ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen
              eine bereits erteilte Einwilligung jederzeit widerrufen. Die
              Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
              Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2">
              Recht auf Daten&uuml;bertragbarkeit
            </h3>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
              Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert
              verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen,
              maschinenlesbaren Format aush&auml;ndigen zu lassen. Sofern Sie
              die direkte &Uuml;bertragung der Daten an einen anderen
              Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch
              machbar ist.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2">
              Auskunft, L&ouml;schung und Berichtigung
            </h3>
            <p className="text-muted leading-relaxed text-sm">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und
              Empf&auml;nger und den Zweck der Datenverarbeitung und ggf. ein
              Recht auf Berichtigung oder L&ouml;schung dieser Daten. Hierzu
              sowie zu weiteren Fragen zum Thema personenbezogene Daten
              k&ouml;nnen Sie sich jederzeit an uns wenden.
            </p>
          </section>

          {/* 6. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              6. Cookies
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;.
              Cookies sind kleine Datenpakete und richten auf Ihrem Endger&auml;t
              keinen Schaden an. Sie werden entweder vor&uuml;bergehend
              f&uuml;r die Dauer einer Sitzung (Session-Cookies) oder dauerhaft
              (permanente Cookies) auf Ihrem Endger&auml;t gespeichert.
              Session-Cookies werden nach Ende Ihres Besuchs automatisch
              gel&ouml;scht. Permanente Cookies bleiben auf Ihrem Endger&auml;t
              gespeichert, bis Sie diese selbst l&ouml;schen oder eine
              automatische L&ouml;schung durch Ihren Webbrowser erfolgt.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Cookies, die zur Durchf&uuml;hrung des elektronischen
              Kommunikationsvorgangs oder zur Bereitstellung bestimmter, von
              Ihnen erw&uuml;nschter Funktionen erforderlich sind, werden auf
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der
              Websitebetreiber hat ein berechtigtes Interesse an der Speicherung
              von technisch notwendigen Cookies zur technisch fehlerfreien und
              optimierten Bereitstellung seiner Dienste. Sofern eine
              Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt
              die Speicherung der betreffenden Cookies ausschlie&szlig;lich auf
              Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
          </section>

          {/* 7. Kontaktformular */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              7. Kontaktformular und E-Mail-Kontakt
            </h2>
            <p className="text-muted leading-relaxed text-sm mb-4">
              Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen
              lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der
              von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
              weiter.
            </p>
            <p className="text-muted leading-relaxed text-sm">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung
              eines Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung
              vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen
              &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem
              berechtigten Interesse an der effektiven Bearbeitung der an uns
              gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt
              wurde. Die von Ihnen im Kontaktformular eingegebenen Daten
              verbleiben bei uns, bis Sie uns zur L&ouml;schung auffordern, Ihre
              Einwilligung zur Speicherung widerrufen oder der Zweck f&uuml;r
              die Datenspeicherung entf&auml;llt. Zwingende gesetzliche
              Bestimmungen &ndash; insbesondere Aufbewahrungsfristen &ndash;
              bleiben unber&uuml;hrt.
            </p>
          </section>

          {/* 8. Analyse-Tools */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              8. Analyse-Tools und Werbung
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Wir setzen derzeit keine Analyse-Tools oder Werbetracker von
              Drittanbietern ein. Sollte sich dies in Zukunft &auml;ndern,
              werden wir diese Datenschutzerkl&auml;rung entsprechend
              aktualisieren und Sie gegebenenfalls um Ihre Einwilligung bitten.
            </p>
          </section>

          {/* 9. SSL/TLS */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              9. SSL- bzw. TLS-Verschl&uuml;sselung
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
              &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel
              Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-
              bzw. TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte
              Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
              von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und
              an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw.
              TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die Daten,
              die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen
              werden.
            </p>
          </section>

          {/* 10. Aktualität */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              10. Aktualit&auml;t und &Auml;nderung dieser
              Datenschutzerkl&auml;rung
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Diese Datenschutzerkl&auml;rung ist aktuell g&uuml;ltig und hat
              den Stand April 2026. Durch die Weiterentwicklung unserer Website
              und Angebote oder aufgrund ge&auml;nderter gesetzlicher bzw.
              beh&ouml;rdlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerkl&auml;rung zu &auml;ndern.
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
