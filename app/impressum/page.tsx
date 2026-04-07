import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — Aufwind AI",
  description:
    "Impressum der DIAS SALES SOLUTIONS - FZCO. Angaben gemäß gesetzlicher Vorgaben.",
};

export default function ImpressumPage() {
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
            Aufwind AI
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
          Impressum
        </h1>

        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10">
          {/* Angaben */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Angaben gem&auml;&szlig; &sect; 5 TMG
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Hinweis: Die DIAS SALES SOLUTIONS - FZCO ist eine in den
              Vereinigten Arabischen Emiraten (UAE) registrierte Gesellschaft.
              Die nachfolgenden Angaben erfolgen in Anlehnung an &sect; 5 TMG
              f&uuml;r Nutzer aus dem deutschsprachigen Raum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Unternehmensangaben
            </h2>
            <div className="text-muted leading-relaxed text-sm space-y-1">
              <p className="text-foreground font-medium">
                DIAS SALES SOLUTIONS - FZCO
              </p>
              <p>Dubai Silicon Oasis</p>
              <p>DDP, Building A2</p>
              <p>Dubai, Vereinigte Arabische Emirate (UAE)</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Vertreten durch
            </h2>
            <div className="text-muted leading-relaxed text-sm space-y-1">
              <p>Gesch&auml;ftsf&uuml;hrer: Kostas Dias</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Kontakt
            </h2>
            <div className="text-muted leading-relaxed text-sm space-y-1">
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:kontakt@aufwind.ai"
                  className="text-primary-light hover:underline"
                >
                  kontakt@aufwind.ai
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RSt V
            </h2>
            <div className="text-muted leading-relaxed text-sm space-y-1">
              <p>Kostas Dias</p>
              <p>Dubai Silicon Oasis</p>
              <p>DDP, Building A2</p>
              <p>Dubai, UAE</p>
            </div>
          </section>

          {/* EU-Streitschlichtung */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              EU-Streitschlichtung
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Die Europ&auml;ische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
              nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Haftung f&uuml;r Inhalte
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG
              f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte
              oder gespeicherte fremde Informationen zu &uuml;berwachen oder
              nach Umst&auml;nden zu forschen, die auf eine rechtswidrige
              T&auml;tigkeit hinweisen. Verpflichtungen zur Entfernung oder
              Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche
              Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
              konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von
              entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Haftung f&uuml;r Links
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir
              f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr
              &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist
              stets der jeweilige Anbieter oder Betreiber der Seiten
              verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
              Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e
              &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt
              der Verlinkung nicht erkennbar. Eine permanente inhaltliche
              Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Urheberrecht
            </h2>
            <p className="text-muted leading-relaxed text-sm">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
              bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors
              bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
              f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
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
