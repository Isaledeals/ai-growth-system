"""
Lead Scraper — AI Growth System
Scrapt lokale Unternehmen von Google Maps für Cold Calling + Email-Kampagne
"""

import requests
import json
import csv
import time
from datetime import datetime

# Google Places API Key (kostenlos für erste 200 Requests/Tag)
GOOGLE_PLACES_API_KEY = "DEIN_API_KEY_HIER"

def search_local_businesses(keyword: str, location: str, radius_km: int = 30) -> list:
    """
    Sucht lokale Unternehmen via Google Places API
    
    Args:
        keyword: z.B. "Sanitärbetrieb" oder "Kosmetikstudio"
        location: z.B. "München" oder "48.1351,11.5820" (lat,lng)
        radius_km: Suchradius in km
    
    Returns:
        Liste von Business-Objekten
    """
    
    # Geocode den Standort falls Stadt-Name
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={GOOGLE_PLACES_API_KEY}"
    geo_response = requests.get(geocode_url).json()
    
    if geo_response["status"] != "OK":
        print(f"❌ Geocoding fehlgeschlagen für {location}")
        return []
    
    lat = geo_response["results"][0]["geometry"]["location"]["lat"]
    lng = geo_response["results"][0]["geometry"]["location"]["lng"]
    
    print(f"✅ Standort gefunden: {location} ({lat}, {lng})")
    
    # Places API Nearby Search
    places_url = (
        f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        f"?location={lat},{lng}"
        f"&radius={radius_km * 1000}"
        f"&keyword={keyword}"
        f"&language=de"
        f"&key={GOOGLE_PLACES_API_KEY}"
    )
    
    businesses = []
    next_page_token = None
    
    while True:
        if next_page_token:
            url = places_url + f"&pagetoken={next_page_token}"
            time.sleep(2)  # Google erfordert kurze Pause bei page tokens
        else:
            url = places_url
        
        response = requests.get(url).json()
        
        if response["status"] not in ["OK", "ZERO_RESULTS"]:
            print(f"❌ API Fehler: {response['status']}")
            break
        
        for place in response.get("results", []):
            businesses.append({
                "name": place.get("name", ""),
                "address": place.get("vicinity", ""),
                "google_place_id": place.get("place_id", ""),
                "rating": place.get("rating", "N/A"),
                "review_count": place.get("user_ratings_total", 0),
                "business_status": place.get("business_status", "OPERATIONAL"),
            })
        
        next_page_token = response.get("next_page_token")
        if not next_page_token:
            break
    
    return businesses


def enrich_with_details(place_id: str) -> dict:
    """
    Holt zusätzliche Details: Telefon, Website, Öffnungszeiten
    """
    details_url = (
        f"https://maps.googleapis.com/maps/api/place/details/json"
        f"?place_id={place_id}"
        f"&fields=name,formatted_phone_number,website,opening_hours,formatted_address"
        f"&language=de"
        f"&key={GOOGLE_PLACES_API_KEY}"
    )
    
    response = requests.get(details_url).json()
    
    if response["status"] != "OK":
        return {}
    
    result = response["result"]
    return {
        "phone": result.get("formatted_phone_number", ""),
        "website": result.get("website", ""),
        "full_address": result.get("formatted_address", ""),
    }


def export_to_csv(businesses: list, filename: str = None):
    """
    Exportiert Ergebnisse als CSV für Cold Calling + Email-Kampagne
    """
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"leads_{timestamp}.csv"
    
    if not businesses:
        print("⚠️  Keine Leads zum Exportieren")
        return
    
    fieldnames = [
        "name", "phone", "website", "full_address", 
        "rating", "review_count", "google_place_id", "review_link"
    ]
    
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        
        for biz in businesses:
            # Review-Link generieren
            biz["review_link"] = f"https://search.google.com/local/writereview?placeid={biz.get('google_place_id', '')}"
            writer.writerow(biz)
    
    print(f"✅ {len(businesses)} Leads exportiert → {filename}")
    return filename


def main():
    """
    Hauptfunktion — konfiguriere hier deine Suche
    """
    
    # KONFIGURATION
    searches = [
        {"keyword": "Sanitärbetrieb", "location": "München", "radius_km": 30},
        {"keyword": "Elektriker", "location": "München", "radius_km": 30},
        {"keyword": "Kosmetikstudio", "location": "München", "radius_km": 20},
        {"keyword": "Nagelstudio", "location": "München", "radius_km": 20},
        {"keyword": "Immobilienmakler", "location": "München", "radius_km": 30},
    ]
    
    all_leads = []
    
    for search in searches:
        print(f"\n🔍 Suche: {search['keyword']} in {search['location']}...")
        
        businesses = search_local_businesses(
            keyword=search["keyword"],
            location=search["location"],
            radius_km=search["radius_km"]
        )
        
        print(f"   Gefunden: {len(businesses)} Unternehmen")
        
        # Details anreichern (optional, aber empfohlen für Telefon/Website)
        enriched = []
        for biz in businesses[:50]:  # Max 50 pro Suche (API Quota)
            details = enrich_with_details(biz["google_place_id"])
            biz.update(details)
            enriched.append(biz)
            time.sleep(0.1)  # Rate limiting
        
        all_leads.extend(enriched)
        print(f"   Angereichert: {len(enriched)} mit Telefon/Website")
    
    # Filter: Nur Betriebe mit Telefonnummer
    leads_with_phone = [l for l in all_leads if l.get("phone")]
    print(f"\n📞 Leads mit Telefon: {len(leads_with_phone)} von {len(all_leads)}")
    
    # Exportieren
    export_to_csv(leads_with_phone, "münchen_leads.csv")


if __name__ == "__main__":
    main()


"""
USAGE:
1. Google Places API Key eintragen (kostenloses Kontingent reicht für Anfang)
2. searches[] anpassen (Branchen + Städte)
3. python lead-scraper.py
4. CSV-Datei in Brevo importieren

KOSTEN SCHÄTZUNG:
- Geocoding: 0,005$/Anfrage
- Places Nearby Search: 0,032$/Anfrage (mit Details)
- Places Details: 0,017$/Anfrage
- Für 500 Leads: ~10-15$ (einmaliger Aufwand)

ALTERNATIV: Apollo.io API (49$/Monat) für bessere Email-Daten
"""
