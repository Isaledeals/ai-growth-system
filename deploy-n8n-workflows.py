#!/usr/bin/env python3
"""
Deploy 5 AGS n8n workflows via REST API.
Run this script on the VPS where n8n is running.
"""

import json
import urllib.request
import urllib.error
import base64
import sys

N8N_BASE = "http://localhost:5678/api/v1"
API_KEY = "n8n_api_4656c21d7a74424a94e285d9781b74f23f978188147d05b1"
HEADERS = {
    "Content-Type": "application/json",
    "X-N8N-API-KEY": API_KEY
}

def api_call(method, path, data=None):
    url = f"{N8N_BASE}{path}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        print(f"  ERROR {e.code}: {err_body[:500]}")
        return None

def create_workflow(wf_data):
    result = api_call("POST", "/workflows", wf_data)
    if result and "id" in result:
        wf_id = result["id"]
        print(f"  Created: {result['name']} (ID: {wf_id})")
        # Activate
        act = api_call("PATCH", f"/workflows/{wf_id}", {"active": True})
        if act:
            print(f"  Activated: {act['name']} (active={act.get('active')})")
        return wf_id
    else:
        print(f"  FAILED to create workflow")
        return None

# ============================================================
# WORKFLOW 1: AGS — Onboarding
# ============================================================
def build_wf1():
    return {
        "name": "AGS \u2014 Onboarding",
        "nodes": [
            {
                "parameters": {
                    "httpMethod": "POST",
                    "path": "ags-onboarding",
                    "responseMode": "lastNode",
                    "options": {}
                },
                "id": "wf1-webhook",
                "name": "Webhook",
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2,
                "position": [250, 300],
                "webhookId": "ags-onboarding-id"
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": True,
                            "leftValue": "",
                            "typeValidation": "strict"
                        },
                        "conditions": [
                            {
                                "id": "cond1",
                                "leftValue": "={{ $json.body.package }}",
                                "rightValue": "premium",
                                "operator": {
                                    "type": "string",
                                    "operation": "equals"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "id": "wf1-if",
                "name": "Check Package",
                "type": "n8n-nodes-base.if",
                "typeVersion": 2,
                "position": [480, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"to\": \"{{ $json.body.email }}\", \"subject\": \"Willkommen bei AGS Premium!\", \"body\": \"Hallo {{ $json.body.customer_name }}, willkommen bei AGS Premium! Ihr Setup wird vorbereitet.\"}",
                    "options": {}
                },
                "id": "wf1-email-premium",
                "name": "Welcome Email Premium",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [720, 200]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"to\": \"{{ $json.body.email }}\", \"subject\": \"Willkommen bei AGS Pro!\", \"body\": \"Hallo {{ $json.body.customer_name }}, willkommen bei AGS Pro! Ihr Setup wird vorbereitet.\"}",
                    "options": {}
                },
                "id": "wf1-email-pro",
                "name": "Welcome Email Pro",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [720, 420]
            },
            {
                "parameters": {
                    "amount": 24,
                    "unit": "hours"
                },
                "id": "wf1-wait24",
                "name": "Wait 24h",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [960, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"to\": \"{{ $json.body.email }}\", \"subject\": \"AGS - Onboarding Video 1\", \"body\": \"Hier ist Ihr erstes Onboarding-Video: https://ags.example.com/onboarding/video-1\"}",
                    "options": {}
                },
                "id": "wf1-video1",
                "name": "Send Video 1",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1200, 300]
            },
            {
                "parameters": {
                    "amount": 48,
                    "unit": "hours"
                },
                "id": "wf1-wait48",
                "name": "Wait 48h",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [1440, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"to\": \"{{ $json.body.email }}\", \"subject\": \"AGS - Setup abgeschlossen!\", \"body\": \"Ihr Setup ist abgeschlossen. Sie koennen jetzt alle Features nutzen.\"}",
                    "options": {}
                },
                "id": "wf1-setup-done",
                "name": "Setup Complete Email",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1680, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "http://localhost:3000/conversation",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"message\": \"[AGS Onboarding] Neuer Kunde onboarded: {{ $json.body.customer_name }} ({{ $json.body.business_type }}, Paket: {{ $json.body.package }}). Setup abgeschlossen.\", \"role\": \"system\"}",
                    "options": {
                        "timeout": 10000
                    }
                },
                "id": "wf1-trinity",
                "name": "Notify Trinity",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1920, 300]
            }
        ],
        "connections": {
            "Webhook": {
                "main": [
                    [
                        {"node": "Check Package", "type": "main", "index": 0}
                    ]
                ]
            },
            "Check Package": {
                "main": [
                    [
                        {"node": "Welcome Email Premium", "type": "main", "index": 0}
                    ],
                    [
                        {"node": "Welcome Email Pro", "type": "main", "index": 0}
                    ]
                ]
            },
            "Welcome Email Premium": {
                "main": [
                    [
                        {"node": "Wait 24h", "type": "main", "index": 0}
                    ]
                ]
            },
            "Welcome Email Pro": {
                "main": [
                    [
                        {"node": "Wait 24h", "type": "main", "index": 0}
                    ]
                ]
            },
            "Wait 24h": {
                "main": [
                    [
                        {"node": "Send Video 1", "type": "main", "index": 0}
                    ]
                ]
            },
            "Send Video 1": {
                "main": [
                    [
                        {"node": "Wait 48h", "type": "main", "index": 0}
                    ]
                ]
            },
            "Wait 48h": {
                "main": [
                    [
                        {"node": "Setup Complete Email", "type": "main", "index": 0}
                    ]
                ]
            },
            "Setup Complete Email": {
                "main": [
                    [
                        {"node": "Notify Trinity", "type": "main", "index": 0}
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1"
        },
        "staticData": None
    }

# ============================================================
# WORKFLOW 2: AGS — No-Show Killer
# ============================================================
def build_wf2():
    return {
        "name": "AGS \u2014 No-Show Killer",
        "nodes": [
            {
                "parameters": {
                    "httpMethod": "POST",
                    "path": "ags-noshow-reminder",
                    "responseMode": "lastNode",
                    "options": {}
                },
                "id": "wf2-webhook",
                "name": "Webhook",
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2,
                "position": [250, 300],
                "webhookId": "ags-noshow-reminder-id"
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": True,
                            "leftValue": "",
                            "typeValidation": "strict"
                        },
                        "conditions": [
                            {
                                "id": "cond1",
                                "leftValue": "={{ $json.body.reminder_type }}",
                                "rightValue": "24h",
                                "operator": {
                                    "type": "string",
                                    "operation": "equals"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "id": "wf2-check-time",
                "name": "Check 24h or 1h",
                "type": "n8n-nodes-base.if",
                "typeVersion": 2,
                "position": [480, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.body.patient_phone }}\", \"message\": \"Erinnerung: Ihr Termin ist morgen um {{ $json.body.appointment_time }}. Bitte bestaetigen Sie unter: http://116.203.51.48:5678/webhook/ags-noshow-response?appointment_id={{ $json.body.appointment_id }}&action=confirm\", \"type\": \"whatsapp_24h\"}",
                    "options": {}
                },
                "id": "wf2-wa-24h",
                "name": "WhatsApp 24h Reminder",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [720, 200]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.body.patient_phone }}\", \"message\": \"Letzte Erinnerung: Ihr Termin ist in 1 Stunde um {{ $json.body.appointment_time }}. Absagen? http://116.203.51.48:5678/webhook/ags-noshow-response?appointment_id={{ $json.body.appointment_id }}&action=cancel\", \"type\": \"whatsapp_1h\"}",
                    "options": {}
                },
                "id": "wf2-wa-1h",
                "name": "WhatsApp 1h Reminder",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [720, 420]
            },
            {
                "parameters": {
                    "resume": "webhook",
                    "options": {
                        "webhookSuffix": "ags-noshow-response"
                    }
                },
                "id": "wf2-wait-response",
                "name": "Wait for Response",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [960, 300]
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": True,
                            "leftValue": "",
                            "typeValidation": "strict"
                        },
                        "conditions": [
                            {
                                "id": "cond2",
                                "leftValue": "={{ $json.query.action }}",
                                "rightValue": "cancel",
                                "operator": {
                                    "type": "string",
                                    "operation": "equals"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "id": "wf2-check-cancel",
                "name": "Check Cancelled",
                "type": "n8n-nodes-base.if",
                "typeVersion": 2,
                "position": [1200, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.body.waitlist_phone }}\", \"message\": \"Gute Nachricht! Ein Termin ist frei geworden am {{ $json.body.appointment_time }}. Moechten Sie ihn uebernehmen?\", \"type\": \"whatsapp_waitlist\"}",
                    "options": {}
                },
                "id": "wf2-waitlist",
                "name": "Contact Waitlist",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1440, 200]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "http://localhost:3000/conversation",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"message\": \"[AGS No-Show] Termin Update - Patient: {{ $json.body.patient_name }}, Appointment: {{ $json.body.appointment_id }}. Status wurde verarbeitet.\", \"role\": \"system\"}",
                    "options": {
                        "timeout": 10000
                    }
                },
                "id": "wf2-trinity",
                "name": "Notify Trinity",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1680, 300]
            }
        ],
        "connections": {
            "Webhook": {
                "main": [
                    [
                        {"node": "Check 24h or 1h", "type": "main", "index": 0}
                    ]
                ]
            },
            "Check 24h or 1h": {
                "main": [
                    [
                        {"node": "WhatsApp 24h Reminder", "type": "main", "index": 0}
                    ],
                    [
                        {"node": "WhatsApp 1h Reminder", "type": "main", "index": 0}
                    ]
                ]
            },
            "WhatsApp 24h Reminder": {
                "main": [
                    [
                        {"node": "Wait for Response", "type": "main", "index": 0}
                    ]
                ]
            },
            "WhatsApp 1h Reminder": {
                "main": [
                    [
                        {"node": "Wait for Response", "type": "main", "index": 0}
                    ]
                ]
            },
            "Wait for Response": {
                "main": [
                    [
                        {"node": "Check Cancelled", "type": "main", "index": 0}
                    ]
                ]
            },
            "Check Cancelled": {
                "main": [
                    [
                        {"node": "Contact Waitlist", "type": "main", "index": 0}
                    ],
                    [
                        {"node": "Notify Trinity", "type": "main", "index": 0}
                    ]
                ]
            },
            "Contact Waitlist": {
                "main": [
                    [
                        {"node": "Notify Trinity", "type": "main", "index": 0}
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1"
        },
        "staticData": None
    }

# ============================================================
# WORKFLOW 3: AGS — Review Request
# ============================================================
def build_wf3():
    return {
        "name": "AGS \u2014 Review Request",
        "nodes": [
            {
                "parameters": {
                    "httpMethod": "POST",
                    "path": "ags-review-request",
                    "responseMode": "lastNode",
                    "options": {}
                },
                "id": "wf3-webhook",
                "name": "Webhook",
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2,
                "position": [250, 300],
                "webhookId": "ags-review-request-id"
            },
            {
                "parameters": {
                    "amount": 2,
                    "unit": "hours"
                },
                "id": "wf3-wait2h",
                "name": "Wait 2h After Appointment",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [480, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.body.patient_phone }}\", \"email\": \"{{ $json.body.patient_email }}\", \"message\": \"Hallo {{ $json.body.patient_name }}, wie war Ihr Besuch bei {{ $json.body.business_name }}? Bewerten Sie uns (1-5): http://116.203.51.48:5678/webhook/ags-review-response?customer_id={{ $json.body.customer_id }}&score=\", \"type\": \"satisfaction_survey\"}",
                    "options": {}
                },
                "id": "wf3-survey",
                "name": "Send Satisfaction Survey",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [720, 300]
            },
            {
                "parameters": {
                    "resume": "webhook",
                    "options": {
                        "webhookSuffix": "ags-review-response"
                    }
                },
                "id": "wf3-wait-response",
                "name": "Wait for Review Response",
                "type": "n8n-nodes-base.wait",
                "typeVersion": 1.1,
                "position": [960, 300]
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": True,
                            "leftValue": "",
                            "typeValidation": "strict"
                        },
                        "conditions": [
                            {
                                "id": "cond1",
                                "leftValue": "={{ Number($json.query.score) }}",
                                "rightValue": 4,
                                "operator": {
                                    "type": "number",
                                    "operation": "gte"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "id": "wf3-check-score",
                "name": "Check Score >= 4",
                "type": "n8n-nodes-base.if",
                "typeVersion": 2,
                "position": [1200, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.body.patient_phone }}\", \"message\": \"Vielen Dank fuer Ihre positive Bewertung! Wuerden Sie uns auch auf Google bewerten? {{ $json.body.google_review_link }}\", \"type\": \"google_review_request\"}",
                    "options": {}
                },
                "id": "wf3-google-link",
                "name": "Send Google Review Link",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1440, 200]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"to\": \"owner@example.com\", \"subject\": \"AGS - Negatives Feedback\", \"body\": \"Patient {{ $json.body.patient_name }} hat eine niedrige Bewertung abgegeben. Bitte kontaktieren Sie den Patienten.\", \"type\": \"internal_feedback\"}",
                    "options": {}
                },
                "id": "wf3-internal-feedback",
                "name": "Send Internal Feedback",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1440, 420]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "http://localhost:3000/conversation",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"message\": \"[AGS Review] Negatives Feedback von {{ $json.body.patient_name }} fuer {{ $json.body.business_name }}. Score unter 4. Business Owner wurde benachrichtigt.\", \"role\": \"system\"}",
                    "options": {
                        "timeout": 10000
                    }
                },
                "id": "wf3-trinity",
                "name": "Notify Trinity Negative",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1680, 420]
            }
        ],
        "connections": {
            "Webhook": {
                "main": [
                    [
                        {"node": "Wait 2h After Appointment", "type": "main", "index": 0}
                    ]
                ]
            },
            "Wait 2h After Appointment": {
                "main": [
                    [
                        {"node": "Send Satisfaction Survey", "type": "main", "index": 0}
                    ]
                ]
            },
            "Send Satisfaction Survey": {
                "main": [
                    [
                        {"node": "Wait for Review Response", "type": "main", "index": 0}
                    ]
                ]
            },
            "Wait for Review Response": {
                "main": [
                    [
                        {"node": "Check Score >= 4", "type": "main", "index": 0}
                    ]
                ]
            },
            "Check Score >= 4": {
                "main": [
                    [
                        {"node": "Send Google Review Link", "type": "main", "index": 0}
                    ],
                    [
                        {"node": "Send Internal Feedback", "type": "main", "index": 0}
                    ]
                ]
            },
            "Send Internal Feedback": {
                "main": [
                    [
                        {"node": "Notify Trinity Negative", "type": "main", "index": 0}
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1"
        },
        "staticData": None
    }

# ============================================================
# WORKFLOW 4: AGS — Kundenreaktivierung
# ============================================================
def build_wf4():
    return {
        "name": "AGS \u2014 Kundenreaktivierung",
        "nodes": [
            {
                "parameters": {
                    "rule": {
                        "interval": [
                            {
                                "field": "cronExpression",
                                "expression": "0 9 * * *"
                            }
                        ]
                    }
                },
                "id": "wf4-schedule",
                "name": "Daily 09:00 Berlin",
                "type": "n8n-nodes-base.scheduleTrigger",
                "typeVersion": 1.2,
                "position": [250, 300]
            },
            {
                "parameters": {
                    "httpMethod": "POST",
                    "path": "ags-reactivation",
                    "responseMode": "lastNode",
                    "options": {}
                },
                "id": "wf4-webhook",
                "name": "Webhook Trigger",
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2,
                "position": [250, 500],
                "webhookId": "ags-reactivation-id"
            },
            {
                "parameters": {
                    "method": "GET",
                    "url": "https://httpbin.org/get",
                    "sendQuery": True,
                    "queryParameters": {
                        "parameters": [
                            {"name": "type", "value": "inactive_customers"},
                            {"name": "days_inactive", "value": "90"}
                        ]
                    },
                    "options": {}
                },
                "id": "wf4-fetch",
                "name": "Fetch Inactive Customers",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [480, 400]
            },
            {
                "parameters": {
                    "batchSize": 10,
                    "options": {}
                },
                "id": "wf4-batch",
                "name": "Split In Batches",
                "type": "n8n-nodes-base.splitInBatches",
                "typeVersion": 3,
                "position": [720, 400]
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": True,
                            "leftValue": "",
                            "typeValidation": "strict"
                        },
                        "conditions": [
                            {
                                "id": "cond1",
                                "leftValue": "={{ $json.days_since_visit }}",
                                "rightValue": 180,
                                "operator": {
                                    "type": "number",
                                    "operation": "gte"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "id": "wf4-critical",
                "name": "Critical > 180 days",
                "type": "n8n-nodes-base.if",
                "typeVersion": 2,
                "position": [960, 400]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.phone }}\", \"message\": \"DRINGEND: Wir vermissen Sie! Es sind ueber 6 Monate seit Ihrem letzten Besuch. Exklusives Angebot: 20% Rabatt auf Ihre naechste Behandlung!\", \"priority\": \"critical\"}",
                    "options": {}
                },
                "id": "wf4-msg-critical",
                "name": "Send Critical Message",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1200, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "https://httpbin.org/post",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"phone\": \"{{ $json.phone }}\", \"message\": \"Wir vermissen Sie! Seit ueber 3 Monaten nicht mehr bei uns. Buchen Sie jetzt Ihren naechsten Termin!\", \"priority\": \"high\"}",
                    "options": {}
                },
                "id": "wf4-msg-high",
                "name": "Send High Priority Message",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1200, 500]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "http://localhost:3000/conversation",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"message\": \"[AGS Reaktivierung] Batch verarbeitet. Kunden kontaktiert fuer Reaktivierung.\", \"role\": \"system\"}",
                    "options": {
                        "timeout": 10000
                    }
                },
                "id": "wf4-trinity",
                "name": "Log to Trinity",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [1440, 400]
            }
        ],
        "connections": {
            "Daily 09:00 Berlin": {
                "main": [
                    [
                        {"node": "Fetch Inactive Customers", "type": "main", "index": 0}
                    ]
                ]
            },
            "Webhook Trigger": {
                "main": [
                    [
                        {"node": "Fetch Inactive Customers", "type": "main", "index": 0}
                    ]
                ]
            },
            "Fetch Inactive Customers": {
                "main": [
                    [
                        {"node": "Split In Batches", "type": "main", "index": 0}
                    ]
                ]
            },
            "Split In Batches": {
                "main": [
                    [
                        {"node": "Critical > 180 days", "type": "main", "index": 0}
                    ],
                    []
                ]
            },
            "Critical > 180 days": {
                "main": [
                    [
                        {"node": "Send Critical Message", "type": "main", "index": 0}
                    ],
                    [
                        {"node": "Send High Priority Message", "type": "main", "index": 0}
                    ]
                ]
            },
            "Send Critical Message": {
                "main": [
                    [
                        {"node": "Log to Trinity", "type": "main", "index": 0}
                    ]
                ]
            },
            "Send High Priority Message": {
                "main": [
                    [
                        {"node": "Log to Trinity", "type": "main", "index": 0}
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1",
            "timezone": "Europe/Berlin"
        },
        "staticData": None
    }

# ============================================================
# WORKFLOW 5: AGS — Daily Report
# ============================================================
def build_wf5():
    return {
        "name": "AGS \u2014 Daily Report",
        "nodes": [
            {
                "parameters": {
                    "rule": {
                        "interval": [
                            {
                                "field": "cronExpression",
                                "expression": "0 8 * * *"
                            }
                        ]
                    }
                },
                "id": "wf5-schedule",
                "name": "Daily 08:00 Bangkok",
                "type": "n8n-nodes-base.scheduleTrigger",
                "typeVersion": 1.2,
                "position": [250, 300]
            },
            {
                "parameters": {
                    "method": "GET",
                    "url": "https://httpbin.org/get",
                    "sendQuery": True,
                    "queryParameters": {
                        "parameters": [
                            {"name": "type", "value": "daily_metrics"},
                            {"name": "date", "value": "={{ $now.toISODate() }}"}
                        ]
                    },
                    "options": {}
                },
                "id": "wf5-metrics",
                "name": "Gather Metrics",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [480, 300]
            },
            {
                "parameters": {
                    "jsCode": "// Format daily report\nconst now = new Date();\nconst dateStr = now.toISOString().split('T')[0];\n\n// Placeholder metrics - replace with actual data from previous node\nconst mrr = items[0].json.mrr || 0;\nconst newCustomers = items[0].json.new_customers || 0;\nconst churn = items[0].json.churn || 0;\nconst pipeline = items[0].json.pipeline || 0;\nconst activeWorkflows = items[0].json.active_workflows || 5;\nconst totalExecutions = items[0].json.total_executions || 0;\n\nconst report = `# AGS Daily Report - ${dateStr}\\n\\n` +\n  `## Revenue\\n` +\n  `- **MRR:** EUR ${mrr}\\n` +\n  `- **Pipeline:** EUR ${pipeline}\\n\\n` +\n  `## Customers\\n` +\n  `- **Neue Kunden:** ${newCustomers}\\n` +\n  `- **Churn:** ${churn}\\n\\n` +\n  `## Automation\\n` +\n  `- **Aktive Workflows:** ${activeWorkflows}\\n` +\n  `- **Ausfuehrungen heute:** ${totalExecutions}\\n\\n` +\n  `## Status\\n` +\n  `Alle Systeme operativ. Report automatisch generiert.`;\n\nreturn [{ json: { report: report, date: dateStr } }];"
                },
                "id": "wf5-format",
                "name": "Format Report",
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [720, 300]
            },
            {
                "parameters": {
                    "method": "POST",
                    "url": "http://localhost:3000/conversation",
                    "sendBody": True,
                    "specifyBody": "json",
                    "jsonBody": "={\"message\": \"{{ $json.report }}\", \"role\": \"system\"}",
                    "options": {
                        "timeout": 15000
                    }
                },
                "id": "wf5-trinity",
                "name": "Send Report to Trinity",
                "type": "n8n-nodes-base.httpRequest",
                "typeVersion": 4.2,
                "position": [960, 300]
            }
        ],
        "connections": {
            "Daily 08:00 Bangkok": {
                "main": [
                    [
                        {"node": "Gather Metrics", "type": "main", "index": 0}
                    ]
                ]
            },
            "Gather Metrics": {
                "main": [
                    [
                        {"node": "Format Report", "type": "main", "index": 0}
                    ]
                ]
            },
            "Format Report": {
                "main": [
                    [
                        {"node": "Send Report to Trinity", "type": "main", "index": 0}
                    ]
                ]
            }
        },
        "settings": {
            "executionOrder": "v1",
            "timezone": "Asia/Bangkok"
        },
        "staticData": None
    }

# ============================================================
# MAIN
# ============================================================
if __name__ == "__main__":
    workflows = [
        ("WF1 - Onboarding", build_wf1),
        ("WF2 - No-Show Killer", build_wf2),
        ("WF3 - Review Request", build_wf3),
        ("WF4 - Kundenreaktivierung", build_wf4),
        ("WF5 - Daily Report", build_wf5),
    ]

    created_ids = []
    for label, builder in workflows:
        print(f"\n{'='*50}")
        print(f"Creating {label}...")
        wf_data = builder()
        wf_id = create_workflow(wf_data)
        if wf_id:
            created_ids.append(wf_id)

    # Final verification
    print(f"\n{'='*50}")
    print("VERIFICATION - Listing all workflows:")
    result = api_call("GET", "/workflows")
    if result and "data" in result:
        for w in result["data"]:
            status = "ACTIVE" if w.get("active") else "INACTIVE"
            print(f"  {w['id']}: {w['name']} [{status}]")
        print(f"\nTotal: {len(result['data'])} workflows")
    else:
        print("Failed to list workflows")

    print(f"\nCreated IDs: {created_ids}")
    print("Done!")
