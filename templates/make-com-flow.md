# Make.com Flow — Chatbot Template

## Haupt-Flow: WhatsApp → AI → CRM → Kalender

---

## Flow 1: Neue Nachricht empfangen (TRIGGER)

```
TRIGGER: WhatsApp Business → Neue Nachricht eingetroffen
  ↓
ROUTER: Ist es eine neue Konversation oder Fortsetzung?
  ↓
  ├── Neue Konversation → Flow 2: Begrüßung + Qualifikation
  └── Fortsetzung → Flow 3: Kontext-basierte Antwort
```

---

## Flow 2: Erstkontakt

```
1. Kontext aufbauen:
   - Kunden-Profil aus HubSpot abrufen (via Telefonnummer)
   - Falls nicht vorhanden: Neuen Kontakt anlegen

2. Begrüßungs-Nachricht senden:
   "Hallo! Ich bin die digitale Assistentin von [FIRMENNAME]. 
   Wie kann ich Ihnen heute helfen? 😊"

3. Warte auf Antwort (nächste Nachricht triggert Flow 3)
```

---

## Flow 3: AI-Antwort generieren

```
1. Konversations-History aus HubSpot laden (letzte 5 Nachrichten)

2. Claude API Request:
   - Model: claude-haiku-20241022
   - System Prompt: [Branche-spezifischer Prompt]
   - Max Tokens: 300
   - Temperature: 0.7

3. Response analysieren:
   ROUTER: Was will der Kunde?
   ├── Termin buchen → Flow 4: Terminbuchung
   ├── Preis-Anfrage → Flow 5: Preisinfo
   ├── Notfall → Flow 6: Notfall-Handling
   └── Allgemeine Frage → Antwort senden + in HubSpot loggen
```

---

## Flow 4: Terminbuchung

```
1. Verfügbare Slots von Cal.com API abrufen (nächste 3 Tage)

2. WhatsApp Nachricht:
   "Super! Ich zeige Ihnen gleich freie Termine. 
   Klicken Sie hier um direkt zu buchen: [CAL.COM LINK]"

3. Warte 30 Min, dann Check:
   → Wurde Termin gebucht? 
   ├── JA → Bestätigung senden + HubSpot Deal erstellen
   └── NEIN → Follow-up: "Haben Sie noch Fragen zu den Terminen?"
```

---

## Flow 5: After-Appointment (Review Request)

```
TRIGGER: Cal.com → Termin als "abgeschlossen" markiert
  ↓
WARTE: 2 Stunden
  ↓
WhatsApp senden:
  "Vielen Dank für Ihren Besuch bei [FIRMENNAME]! 🙏
  Wir würden uns sehr über eine kurze Google-Bewertung freuen:
  ⭐ [REVIEW LINK]
  Das hilft uns sehr! Herzlichen Dank."
  ↓
WARTE: 3 Tage
  ↓
CHECK: Hat Person eine Bewertung hinterlassen?
  ├── JA → Done
  └── NEIN → Email Follow-up: "Kleine Erinnerung..."
```

---

## Flow 6: Follow-up Sequenz (Kein Termin gebucht)

```
TRIGGER: Lead hat Interesse gezeigt aber keinen Termin gebucht
  ↓
WARTE: 24 Stunden
  ↓
WhatsApp: "Hallo! Ich wollte kurz nachfragen ob ich Ihnen noch helfen kann? 
           Noch freie Termine: [LINK]"
  ↓
WARTE: 48 Stunden
  ↓
WhatsApp: "Ich reserviere gerne einen Termin für Sie — 
           welcher Tag wäre am besten?"
  ↓
WARTE: 72 Stunden
  ↓
HubSpot: Lead als "Cold" markieren
```

---

## Branche-spezifische System-Prompts

### Sanitär / Handwerker:
```
Du bist Max, der digitale Assistent von [FIRMENNAME], einem professionellen Sanitärbetrieb.
Du bist freundlich, kompetent und löst Probleme schnell.
Qualifiziere den Bedarf: Ist es ein Notfall oder kann man einen Termin planen?
Bei Notfall: Sofort Telefonnummer für Direktkontakt geben.
Bei Termin: Direkt Buchungslink anbieten.
Antworte auf Deutsch, kurz und hilfreich. Maximal 3 Sätze pro Nachricht.
```

### Kosmetikstudio:
```
Du bist Lisa, die digitale Assistentin von [FIRMENNAME].
Du bist warm, freundlich und begeistert von Beauty-Themen.
Hilf Kundinnen beim Buchen von Terminen, erkläre Services, beantworte Fragen zu Preisen.
Frag aktiv nach: "Welche Behandlung interessiert Sie?" und biete dann Buchungslink an.
Antworte auf Deutsch, herzlich und professionell.
```

### Immobilienmakler:
```
Du bist Alex, der digitale Assistent von [FIRMENNAME] Immobilien.
Du bist professionell, diskret und kennst den lokalen Markt.
Qualifiziere Interessenten: Kaufen oder verkaufen? Welche Art von Immobilie? Welches Budget?
Ziel: Erstgespräch mit dem Makler vereinbaren.
Antworte auf Deutsch, vertrauenswürdig und kompetent.
```

---

## Make.com Kosten-Optimierung

- Haiku für Standard-Antworten (günstigste Option)
- Sonnet nur für komplexe Qualifikations-Gespräche
- Rate Limiting: Max 500 API-Calls pro Kunde/Monat
- Cache: Häufige Fragen nicht jedes Mal an AI schicken (Make.com Data Store)
