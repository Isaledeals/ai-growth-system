// ============================================================
// Aufwind AI — Supabase convenience re-exports
// Provides named exports compatible with booking API + dashboard
// ============================================================

export {
  getSupabaseBrowserClient,
  getSupabaseServerClient,
  getSupabaseTenantClient,
  supabase,
  supabaseAdmin,
} from "./supabase/client";

export type {
  Lead,
  LeadInsert,
  LeadUpdate,
  LeadStatus,
  AufwindTenant,
  AufwindTenantInsert,
  AufwindTenantUpdate,
  AufwindTenantStatus,
  AufwindPlanType,
  AufwindActivity,
  AufwindActivityInsert,
  Tenant,
  Contact,
  Database,
} from "./supabase/types";
