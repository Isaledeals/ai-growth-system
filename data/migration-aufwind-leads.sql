-- ============================================================
-- Aufwind AI — Migration: Closer CRM Tables
-- Ausführen in: Supabase SQL Editor (Dashboard)
-- URL: https://supabase.com/dashboard/project/enmdkhaueqkvaajbvmrr/sql
-- ============================================================

-- 1. leads Tabelle (Demo-Bookings von Landing Page)
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

-- 2. aufwind_tenants (Aufwind-Kunden — getrennt von iSale tenants)
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

-- 3. aufwind_activities (Activity Log pro Tenant)
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

-- Done.
