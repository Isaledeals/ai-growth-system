#!/usr/bin/env bash
# ============================================================
# Aufwind AI — Deploy "AGS — Monthly Report" n8n workflow
# (Workflow-Name AGS bleibt aus Migrations-Sicherheit)
# ------------------------------------------------------------
# Deploys a monthly report workflow to the n8n instance running
# on the VPS at 116.203.51.48. The script is idempotent: if a
# workflow with the same name already exists, it will be updated
# in place (and re-activated) instead of creating a duplicate.
#
# Usage:
#   N8N_API_KEY=xxx ./scripts/deploy-monthly-report-workflow.sh
#
# Environment variables:
#   N8N_URL      (default: http://116.203.51.48:5678)
#   N8N_API_KEY  (required — see n8n Settings → API)
#   TELEGRAM_CHAT_ID (optional — used for low-health alerts)
# ============================================================
set -euo pipefail

WORKFLOW_NAME="AGS — Monthly Report"
N8N_URL="${N8N_URL:-http://116.203.51.48:5678}"
N8N_API_KEY="${N8N_API_KEY:-}"
TRINITY_API="${TRINITY_API:-http://localhost:3000}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# ------------------------------------------------------------
# Preflight
# ------------------------------------------------------------
if [[ -z "${N8N_API_KEY}" ]]; then
  echo "ERROR: N8N_API_KEY is not set." >&2
  echo "  Generate one in n8n → Settings → API and re-run:" >&2
  echo "  N8N_API_KEY=... $0" >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is required but not installed." >&2
  exit 1
fi

HAS_JQ=0
if command -v jq >/dev/null 2>&1; then
  HAS_JQ=1
fi

echo "==> Target n8n: ${N8N_URL}"
echo "==> Workflow:    ${WORKFLOW_NAME}"

# ------------------------------------------------------------
# Workflow JSON definition
# ------------------------------------------------------------
# Nodes:
#   1. Schedule Trigger — 1st of month, 09:00 Europe/Berlin
#   2. HTTP Request     — GET /api/growth/customers (list tenants)
#   3. Split In Batches — iterate per tenant
#   4. HTTP Request     — POST /api/growth/send-email (monthly report)
#   5. IF               — health_score < 50
#   6. Telegram         — alert on low health
# ------------------------------------------------------------
WORKFLOW_JSON=$(cat <<EOF
{
  "name": "${WORKFLOW_NAME}",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 9 1 * *"
            }
          ]
        },
        "timezone": "Europe/Berlin"
      },
      "id": "schedule-trigger",
      "name": "Schedule: 1st of Month 09:00",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "${TRINITY_API}/api/growth/customers",
        "options": {
          "timeout": 15000
        }
      },
      "id": "fetch-customers",
      "name": "Fetch Customers",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "fieldToSplitOut": "data",
        "options": {}
      },
      "id": "split-tenants",
      "name": "Split Tenants",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "${TRINITY_API}/api/growth/send-email",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"to\": \"{{ \$json.email }}\",\n  \"tenantId\": \"{{ \$json.id }}\",\n  \"subject\": \"Dein monatlicher AGS-Report\",\n  \"html\": \"<!doctype html><html><body style='font-family:Inter,system-ui,sans-serif;background:#0A0F1C;color:#F1F5F9;padding:32px'><div style='max-width:560px;margin:0 auto;background:#111827;border:1px solid #374151;border-radius:16px;padding:32px'><h1 style='margin:0 0 8px;font-size:22px;background:linear-gradient(135deg,#3B82F6,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>Dein monatlicher AGS-Report</h1><p style='color:#9CA3AF;margin:0 0 24px'>Hallo {{ \$json.name }}, hier sind deine Wachstums-Zahlen vom letzten Monat.</p><table style='width:100%;border-collapse:collapse'><tr><td style='padding:8px 0;color:#9CA3AF'>Neue Leads</td><td style='padding:8px 0;text-align:right;color:#F1F5F9;font-weight:600'>{{ \$json.metrics.new_leads || 0 }}</td></tr><tr><td style='padding:8px 0;color:#9CA3AF'>Google-Rating</td><td style='padding:8px 0;text-align:right;color:#F1F5F9;font-weight:600'>{{ \$json.metrics.google_rating || '—' }}</td></tr><tr><td style='padding:8px 0;color:#9CA3AF'>Health-Score</td><td style='padding:8px 0;text-align:right;color:#10B981;font-weight:600'>{{ \$json.health_score }}/100</td></tr></table><a href='https://aufwind.ai/dashboard/reports' style='display:inline-block;margin-top:24px;padding:12px 24px;background:linear-gradient(135deg,#3B82F6,#10B981);color:#fff;text-decoration:none;border-radius:10px;font-weight:600'>Vollständigen Report ansehen</a><p style='color:#6B7280;font-size:12px;margin-top:32px'>Automatisch generiert am {{ \$now.format('DD.MM.YYYY') }}</p></div></body></html>\"\n}",
        "options": {
          "timeout": 20000
        }
      },
      "id": "send-report",
      "name": "Send Report Email",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "id": "health-low",
              "leftValue": "={{ \$json.health_score }}",
              "rightValue": 50,
              "operator": {
                "type": "number",
                "operation": "smaller"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "check-health",
      "name": "Health < 50?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [1120, 300]
    },
    {
      "parameters": {
        "chatId": "${TELEGRAM_CHAT_ID}",
        "text": "=AGS Alert: Kunde {{ \$json.name }} ({{ \$json.id }}) hat einen Health-Score von {{ \$json.health_score }}/100. Bitte pruefen.",
        "additionalFields": {
          "parse_mode": "Markdown"
        }
      },
      "id": "telegram-alert",
      "name": "Telegram Alert",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [1340, 220],
      "continueOnFail": true
    }
  ],
  "connections": {
    "Schedule: 1st of Month 09:00": {
      "main": [[{ "node": "Fetch Customers", "type": "main", "index": 0 }]]
    },
    "Fetch Customers": {
      "main": [[{ "node": "Split Tenants", "type": "main", "index": 0 }]]
    },
    "Split Tenants": {
      "main": [[{ "node": "Send Report Email", "type": "main", "index": 0 }]]
    },
    "Send Report Email": {
      "main": [[{ "node": "Health < 50?", "type": "main", "index": 0 }]]
    },
    "Health < 50?": {
      "main": [
        [{ "node": "Telegram Alert", "type": "main", "index": 0 }],
        []
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "saveExecutionProgress": true,
    "saveManualExecutions": true,
    "saveDataErrorExecution": "all",
    "saveDataSuccessExecution": "all"
  }
}
EOF
)

# ------------------------------------------------------------
# Helper — pretty-extract a JSON field without jq if needed
# ------------------------------------------------------------
extract_field() {
  local field="$1"
  local json="$2"
  if [[ "${HAS_JQ}" -eq 1 ]]; then
    echo "${json}" | jq -r ".${field} // empty"
  else
    echo "${json}" | sed -n "s/.*\"${field}\":[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" | head -n 1
  fi
}

# ------------------------------------------------------------
# Step 1: Check whether workflow already exists
# ------------------------------------------------------------
echo "==> Checking existing workflows..."
LIST_RESPONSE=$(curl -sS \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  -H "Accept: application/json" \
  "${N8N_URL}/api/v1/workflows?limit=250")

EXISTING_ID=""
if [[ "${HAS_JQ}" -eq 1 ]]; then
  EXISTING_ID=$(echo "${LIST_RESPONSE}" \
    | jq -r --arg name "${WORKFLOW_NAME}" \
      '.data[]? | select(.name == $name) | .id' \
    | head -n 1)
else
  # Fallback pattern match — works for basic JSON output
  EXISTING_ID=$(echo "${LIST_RESPONSE}" \
    | tr ',' '\n' \
    | grep -B1 "\"name\":\"${WORKFLOW_NAME}\"" \
    | grep '"id"' \
    | sed -n 's/.*"id":"\([^"]*\)".*/\1/p' \
    | head -n 1)
fi

# ------------------------------------------------------------
# Step 2: Create or update
# ------------------------------------------------------------
if [[ -n "${EXISTING_ID}" ]]; then
  echo "==> Workflow exists (id=${EXISTING_ID}). Updating in place..."
  RESPONSE=$(curl -sS -X PUT \
    -H "Content-Type: application/json" \
    -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
    -d "${WORKFLOW_JSON}" \
    "${N8N_URL}/api/v1/workflows/${EXISTING_ID}")
  WORKFLOW_ID="${EXISTING_ID}"
else
  echo "==> Workflow not found. Creating..."
  RESPONSE=$(curl -sS -X POST \
    -H "Content-Type: application/json" \
    -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
    -d "${WORKFLOW_JSON}" \
    "${N8N_URL}/api/v1/workflows")
  WORKFLOW_ID=$(extract_field "id" "${RESPONSE}")
fi

if [[ -z "${WORKFLOW_ID}" ]]; then
  echo "ERROR: Could not determine workflow id. Raw response:" >&2
  echo "${RESPONSE}" >&2
  exit 1
fi

# ------------------------------------------------------------
# Step 3: Activate workflow
# ------------------------------------------------------------
echo "==> Activating workflow (id=${WORKFLOW_ID})..."
ACTIVATE_RESPONSE=$(curl -sS -X POST \
  -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
  -H "Accept: application/json" \
  "${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}/activate" || true)

# Some n8n versions use PATCH /workflows/{id} with { active: true }
if [[ "${ACTIVATE_RESPONSE}" == *"error"* || -z "${ACTIVATE_RESPONSE}" ]]; then
  curl -sS -X PATCH \
    -H "Content-Type: application/json" \
    -H "X-N8N-API-KEY: ${N8N_API_KEY}" \
    -d '{"active": true}' \
    "${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}" >/dev/null || true
fi

echo "==> Done."
echo "    Workflow: ${WORKFLOW_NAME}"
echo "    ID:       ${WORKFLOW_ID}"
echo "    URL:      ${N8N_URL}/workflow/${WORKFLOW_ID}"
