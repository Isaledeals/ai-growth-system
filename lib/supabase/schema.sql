-- ============================================================
-- Aufwind AI — Complete Supabase Database Schema
-- Run this entire file in Supabase SQL Editor (one-shot)
-- ============================================================

-- 0. Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. ENUM TYPES
-- ============================================================

DO $$ BEGIN
  CREATE TYPE plan_type AS ENUM ('pro', 'premium');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE tenant_status AS ENUM ('trial', 'active', 'paused', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE channel_type AS ENUM ('whatsapp', 'webchat', 'phone', 'email', 'instagram', 'facebook');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE direction_type AS ENUM ('inbound', 'outbound');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE conversation_status AS ENUM ('active', 'resolved', 'waiting');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE handler_type AS ENUM ('ai', 'human');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE contact_source AS ENUM ('chatbot', 'phone', 'website', 'referral', 'reactivation', 'manual');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE contact_status AS ENUM ('new', 'contacted', 'qualified', 'booked', 'customer', 'inactive');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE review_platform AS ENUM ('google', 'trustpilot', 'provenexpert');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE review_status AS ENUM ('requested', 'received', 'positive', 'negative');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('confirmed', 'reminded', 'completed', 'no_show', 'cancelled', 'rescheduled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE health_event_type AS ENUM ('login', 'conversation', 'review', 'module_toggle', 'settings_change', 'payment_success', 'payment_failed', 'support_ticket');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE referral_status AS ENUM ('invited', 'signed_up', 'active', 'churned');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE dunning_event_type AS ENUM ('payment_failed', 'reminder_1', 'reminder_2', 'reminder_3', 'paused', 'recovered', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================================
-- 2. HELPER FUNCTIONS
-- ============================================================

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Generate a unique 8-char referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := UPPER(SUBSTRING(encode(gen_random_bytes(6), 'base64') FROM 1 FOR 8));
    -- Remove ambiguous characters
    code := REPLACE(REPLACE(REPLACE(code, '/', 'X'), '+', 'Y'), '=', 'Z');
    SELECT EXISTS(SELECT 1 FROM tenants WHERE referral_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 3. TABLES
-- ============================================================

-- ----- tenants -----
CREATE TABLE IF NOT EXISTS tenants (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT,
  plan                    plan_type NOT NULL DEFAULT 'pro',
  status                  tenant_status NOT NULL DEFAULT 'trial',
  business_name           TEXT NOT NULL,
  branche                 TEXT NOT NULL,
  email                   TEXT NOT NULL,
  phone                   TEXT,
  address                 TEXT,
  city                    TEXT,
  plz                     TEXT,
  website                 TEXT,
  logo_url                TEXT,
  opening_hours           JSONB DEFAULT '{}'::jsonb,
  services                JSONB DEFAULT '[]'::jsonb,
  ai_enabled              BOOLEAN DEFAULT TRUE,
  modules                 JSONB DEFAULT '{"chatbot": true, "phone": true, "booking": true, "followup": true, "noshow": true, "reputation": true, "reactivation": true, "social": true}'::jsonb,
  system_prompt           TEXT,
  tonality                TEXT DEFAULT 'informell',
  greeting                TEXT,
  custom_instructions     TEXT,
  referral_code           TEXT UNIQUE DEFAULT generate_referral_code(),
  referred_by             TEXT,
  health_score            INTEGER DEFAULT 100 CHECK (health_score >= 0 AND health_score <= 100),
  onboarding_completed    BOOLEAN DEFAULT FALSE,
  onboarding_step         INTEGER DEFAULT 0,
  last_login_at           TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ----- contacts -----
CREATE TABLE IF NOT EXISTS contacts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name              TEXT,
  email             TEXT,
  phone             TEXT,
  source            contact_source DEFAULT 'manual',
  status            contact_status DEFAULT 'new',
  tags              JSONB DEFAULT '[]'::jsonb,
  notes             TEXT,
  last_contact_at   TIMESTAMPTZ,
  total_value       NUMERIC(12,2) DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ----- conversations -----
CREATE TABLE IF NOT EXISTS conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  contact_id      UUID REFERENCES contacts(id) ON DELETE SET NULL,
  channel         channel_type NOT NULL,
  direction       direction_type NOT NULL DEFAULT 'inbound',
  status          conversation_status NOT NULL DEFAULT 'active',
  handled_by      handler_type NOT NULL DEFAULT 'ai',
  summary         TEXT,
  messages        JSONB DEFAULT '[]'::jsonb,
  lead_score      INTEGER CHECK (lead_score IS NULL OR (lead_score >= 0 AND lead_score <= 100)),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ----- reviews -----
CREATE TABLE IF NOT EXISTS reviews (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  contact_id        UUID REFERENCES contacts(id) ON DELETE SET NULL,
  platform          review_platform NOT NULL,
  rating            INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text              TEXT,
  author_name       TEXT,
  request_sent_at   TIMESTAMPTZ,
  responded_at      TIMESTAMPTZ,
  status            review_status NOT NULL DEFAULT 'requested',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ----- appointments -----
CREATE TABLE IF NOT EXISTS appointments (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  contact_id          UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  service             TEXT,
  scheduled_at        TIMESTAMPTZ NOT NULL,
  status              appointment_status NOT NULL DEFAULT 'confirmed',
  reminder_24h_sent   BOOLEAN DEFAULT FALSE,
  reminder_1h_sent    BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ----- health_events -----
CREATE TABLE IF NOT EXISTS health_events (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  event_type    health_event_type NOT NULL,
  metadata      JSONB DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ----- referrals -----
CREATE TABLE IF NOT EXISTS referrals (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  referred_email      TEXT NOT NULL,
  referred_tenant_id  UUID REFERENCES tenants(id) ON DELETE SET NULL,
  status              referral_status NOT NULL DEFAULT 'invited',
  reward_applied      BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ----- dunning_events -----
CREATE TABLE IF NOT EXISTS dunning_events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT,
  event_type        dunning_event_type NOT NULL,
  sent_at           TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 4. INDEXES
-- ============================================================

-- tenants
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_plan ON tenants(plan);
CREATE INDEX IF NOT EXISTS idx_tenants_referral_code ON tenants(referral_code);
CREATE INDEX IF NOT EXISTS idx_tenants_stripe_customer ON tenants(stripe_customer_id);

-- conversations
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_created ON conversations(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_channel ON conversations(channel);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);

-- contacts
CREATE INDEX IF NOT EXISTS idx_contacts_tenant_id ON contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_tenant_status ON contacts(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone);

-- reviews
CREATE INDEX IF NOT EXISTS idx_reviews_tenant_id ON reviews(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_platform ON reviews(platform);
CREATE INDEX IF NOT EXISTS idx_reviews_tenant_platform ON reviews(tenant_id, platform);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- appointments
CREATE INDEX IF NOT EXISTS idx_appointments_tenant_id ON appointments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant_scheduled ON appointments(tenant_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- health_events
CREATE INDEX IF NOT EXISTS idx_health_events_tenant_id ON health_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_health_events_event_type ON health_events(event_type);
CREATE INDEX IF NOT EXISTS idx_health_events_created_at ON health_events(created_at);
CREATE INDEX IF NOT EXISTS idx_health_events_tenant_type_created ON health_events(tenant_id, event_type, created_at DESC);

-- referrals
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_tenant_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- dunning_events
CREATE INDEX IF NOT EXISTS idx_dunning_events_tenant_id ON dunning_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dunning_events_type ON dunning_events(event_type);


-- ============================================================
-- 5. TRIGGERS
-- ============================================================

-- updated_at triggers for tables that have the column
DROP TRIGGER IF EXISTS trg_tenants_updated_at ON tenants;
CREATE TRIGGER trg_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_conversations_updated_at ON conversations;
CREATE TRIGGER trg_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dunning_events ENABLE ROW LEVEL SECURITY;

-- Helper: extract tenant_id from JWT claims
-- We use a custom claim "tenant_id" set via Supabase Auth hooks
CREATE OR REPLACE FUNCTION public.tenant_id()
RETURNS UUID AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id',
    ''
  )::uuid;
$$ LANGUAGE sql STABLE;

-- ----- tenants policies -----
DROP POLICY IF EXISTS "Tenants can view own row" ON tenants;
CREATE POLICY "Tenants can view own row" ON tenants
  FOR SELECT USING (id = public.tenant_id());

DROP POLICY IF EXISTS "Tenants can update own row" ON tenants;
CREATE POLICY "Tenants can update own row" ON tenants
  FOR UPDATE USING (id = public.tenant_id());

-- ----- contacts policies -----
DROP POLICY IF EXISTS "Contacts scoped to tenant" ON contacts;
CREATE POLICY "Contacts scoped to tenant" ON contacts
  FOR ALL USING (tenant_id = public.tenant_id());

-- ----- conversations policies -----
DROP POLICY IF EXISTS "Conversations scoped to tenant" ON conversations;
CREATE POLICY "Conversations scoped to tenant" ON conversations
  FOR ALL USING (tenant_id = public.tenant_id());

-- ----- reviews policies -----
DROP POLICY IF EXISTS "Reviews scoped to tenant" ON reviews;
CREATE POLICY "Reviews scoped to tenant" ON reviews
  FOR ALL USING (tenant_id = public.tenant_id());

-- ----- appointments policies -----
DROP POLICY IF EXISTS "Appointments scoped to tenant" ON appointments;
CREATE POLICY "Appointments scoped to tenant" ON appointments
  FOR ALL USING (tenant_id = public.tenant_id());

-- ----- health_events policies -----
DROP POLICY IF EXISTS "Health events scoped to tenant" ON health_events;
CREATE POLICY "Health events scoped to tenant" ON health_events
  FOR ALL USING (tenant_id = public.tenant_id());

-- ----- referrals policies -----
DROP POLICY IF EXISTS "Referrals scoped to referrer" ON referrals;
CREATE POLICY "Referrals scoped to referrer" ON referrals
  FOR ALL USING (referrer_tenant_id = public.tenant_id());

-- ----- dunning_events policies -----
DROP POLICY IF EXISTS "Dunning events scoped to tenant" ON dunning_events;
CREATE POLICY "Dunning events scoped to tenant" ON dunning_events
  FOR ALL USING (tenant_id = public.tenant_id());

-- Service role bypass: service_role key always bypasses RLS by default in Supabase.
-- No additional policy needed for server-side operations.


-- ============================================================
-- 7. VIEWS (convenience)
-- ============================================================

-- Active tenants with key metrics (for admin use via service role)
CREATE OR REPLACE VIEW tenant_overview AS
SELECT
  t.id,
  t.business_name,
  t.branche,
  t.plan,
  t.status,
  t.health_score,
  t.email,
  t.created_at,
  t.last_login_at,
  (SELECT COUNT(*) FROM conversations c WHERE c.tenant_id = t.id) AS total_conversations,
  (SELECT COUNT(*) FROM contacts ct WHERE ct.tenant_id = t.id) AS total_contacts,
  (SELECT COUNT(*) FROM reviews r WHERE r.tenant_id = t.id) AS total_reviews,
  (SELECT COALESCE(AVG(r.rating), 0) FROM reviews r WHERE r.tenant_id = t.id) AS avg_rating,
  (SELECT COUNT(*) FROM appointments a WHERE a.tenant_id = t.id) AS total_appointments
FROM tenants t;

-- Monthly stats per tenant (current month)
CREATE OR REPLACE VIEW monthly_stats AS
SELECT
  t.id AS tenant_id,
  t.business_name,
  (SELECT COUNT(*) FROM conversations c
   WHERE c.tenant_id = t.id
   AND c.created_at >= date_trunc('month', NOW())) AS conversations_this_month,
  (SELECT COUNT(*) FROM contacts ct
   WHERE ct.tenant_id = t.id
   AND ct.created_at >= date_trunc('month', NOW())) AS new_contacts_this_month,
  (SELECT COUNT(*) FROM reviews r
   WHERE r.tenant_id = t.id
   AND r.created_at >= date_trunc('month', NOW())) AS reviews_this_month,
  (SELECT COALESCE(AVG(r.rating), 0) FROM reviews r
   WHERE r.tenant_id = t.id
   AND r.created_at >= date_trunc('month', NOW())) AS avg_rating_this_month,
  (SELECT COUNT(*) FROM appointments a
   WHERE a.tenant_id = t.id
   AND a.created_at >= date_trunc('month', NOW())) AS appointments_this_month,
  (SELECT COUNT(*) FROM appointments a
   WHERE a.tenant_id = t.id
   AND a.status = 'no_show'
   AND a.scheduled_at >= date_trunc('month', NOW())) AS no_shows_this_month
FROM tenants t;


-- ============================================================
-- 8. AUFWIND CLOSER CRM TABLES
-- ============================================================

-- ----- leads (demo bookings from landing page) -----
CREATE TABLE IF NOT EXISTS public.leads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ DEFAULT now(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  branche        TEXT,
  employees      TEXT,
  problem        TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  status         TEXT DEFAULT 'neu' CHECK (status IN ('neu', 'kontaktiert', 'demo_gebucht', 'angebot', 'abschluss', 'verloren')),
  notes          TEXT,
  closer_id      TEXT,
  source         TEXT DEFAULT 'landing_page'
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access leads" ON public.leads;
CREATE POLICY "Service role full access leads" ON public.leads
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- ----- aufwind_tenants (Aufwind-Kunden, separate von iSale tenants) -----
CREATE TABLE IF NOT EXISTS public.aufwind_tenants (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ DEFAULT now(),
  business_name         TEXT NOT NULL,
  branche               TEXT,
  email                 TEXT NOT NULL,
  phone                 TEXT,
  plan                  TEXT DEFAULT 'pro' CHECK (plan IN ('pro', 'premium')),
  status                TEXT DEFAULT 'onboarding' CHECK (status IN ('onboarding', 'active', 'paused', 'cancelled')),
  stripe_customer_id    TEXT,
  onboarding_completed  BOOLEAN DEFAULT false,
  config                JSONB DEFAULT '{}'::jsonb,
  lead_id               UUID REFERENCES public.leads(id)
);

ALTER TABLE public.aufwind_tenants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access aufwind_tenants" ON public.aufwind_tenants;
CREATE POLICY "Service role full access aufwind_tenants" ON public.aufwind_tenants
  USING (true) WITH CHECK (true);

-- ----- aufwind_activities (activity log per tenant) -----
CREATE TABLE IF NOT EXISTS public.aufwind_activities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT now(),
  tenant_id   UUID REFERENCES public.aufwind_tenants(id),
  type        TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata    JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.aufwind_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access aufwind_activities" ON public.aufwind_activities;
CREATE POLICY "Service role full access aufwind_activities" ON public.aufwind_activities
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_aufwind_activities_tenant ON public.aufwind_activities(tenant_id);
CREATE INDEX IF NOT EXISTS idx_aufwind_activities_created ON public.aufwind_activities(created_at DESC);


-- ============================================================
-- 9. DONE
-- ============================================================
-- Schema ready. All tables, indexes, triggers, RLS policies,
-- and convenience views are in place.
