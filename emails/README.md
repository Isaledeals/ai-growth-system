# Email-Kampagnen — AI Growth System
**Übersicht aller 4 Zielgruppen-Sequenzen**

---

## Zielgruppen & Dateien

| Sequenz | Zielgruppe | Datei | Status |
|---------|-----------|-------|--------|
| A | Ästhetik-Kliniken & Beauty-Praxen | email-sequenz-aesthetik.md | ✅ Fertig |
| B | Zahnarztpraxen | email-sequenz-zahnarzt.md | ✅ Fertig |
| C | Immobilienmakler | email-sequenz-makler.md | ✅ Fertig |
| D | Handwerk & Dienstleister | email-sequenz-handwerk.md | ✅ Fertig |

---

## Sequenz-Struktur (alle gleich)

| Email | Tag | Thema |
|-------|-----|-------|
| 1 | 1 | Hook — das unsichtbare Problem |
| 2 | 3 | ROI-Rechnung / Pain verstärken |
| 3 | 6 | Visualisierung / Wettbewerbsvorteil |
| 4 | 10 | Fallstudie / Social Proof |
| 5 | 14 | Letzte Chance + kostenloses Gespräch |

---

## Technisches Setup

**Empfohlenes Tool:** Brevo (ehemals Sendinblue) — bis 20.000 Emails/Monat kostenlos

**Domain-Setup:**
1. Separate Sending-Domain kaufen (z.B. `hello.aigrowthsystem.de`)
2. SPF Record: `v=spf1 include:spf.brevo.com ~all`
3. DKIM: über Brevo DNS-Panel konfigurieren
4. DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@aigrowthsystem.de`
5. Domain 3-4 Wochen aufwärmen (Mailwarm oder Instantly.ai)

**Segmentierung der 13k Leads:**
```
Ästhetik/Beauty:    Suche nach "Kosmetik", "Ästhetik", "Beauty", "Klinik", "Schönheit"
Zahnarzt:           Suche nach "Zahnarzt", "Dental", "Zahnmedizin", "Zahnklinik"
Makler:             Suche nach "Immobilien", "Makler", "Real Estate", "Hausverwaltung"
Handwerk:           Suche nach "GmbH", "Handwerk", "Bau", "Sanitär", "Elektriker", "Maler"
```

**Empfohlene Metriken (Ziele):**
- Open Rate: > 40%
- Reply Rate: > 8%
- Demo-Buchungen: > 2% der Gesamtliste

---

*AI Growth System | Email Campaigns | 4 Sequenzen | 20 Emails | 14-Tage Zeitraum*
