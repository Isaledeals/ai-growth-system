// ============================================================
// Aufwind AI — Supabase Client (Browser + Server)
// ============================================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ---------------------------------------------------------------------------
// Environment variables
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ---------------------------------------------------------------------------
// Browser client (anon key — respects RLS)
// Used in Client Components and browser-side fetches.
// ---------------------------------------------------------------------------

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (browserClient) return browserClient;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return browserClient;
}

// ---------------------------------------------------------------------------
// Server client (service role key — bypasses RLS)
// Used in API routes, webhooks, and server-side operations.
// NEVER expose this client to the browser.
// ---------------------------------------------------------------------------

export function getSupabaseServerClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// ---------------------------------------------------------------------------
// Convenience: create a client scoped to a specific tenant
// Useful when you need to perform operations as a specific tenant
// without relying on auth session (e.g., in cron jobs).
// ---------------------------------------------------------------------------

export function getSupabaseTenantClient(
  tenantId: string
): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        // Custom claim for RLS — the auth.tenant_id() function reads this
        "x-tenant-id": tenantId,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// ---------------------------------------------------------------------------
// Shorthand exports
// ---------------------------------------------------------------------------

/** Browser client (singleton, respects RLS) */
export const supabase =
  typeof window !== "undefined" ? getSupabaseBrowserClient() : null;

/** Server client factory (bypasses RLS) — call as function, not singleton */
export const supabaseAdmin = getSupabaseServerClient;
