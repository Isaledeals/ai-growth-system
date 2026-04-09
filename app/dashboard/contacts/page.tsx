// ============================================================
// Aufwind AI — Closer Dashboard: Contacts / Leads
// Server Component — fetches real leads from Supabase
// ============================================================

import { getSupabaseServerClient } from "@/lib/supabase/client";
import type { Lead } from "@/lib/supabase";
import ContactsClient from "./ContactsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactsPage() {
  let leads: Lead[] = [];

  try {
    const supabaseAdmin = getSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[ContactsPage] Supabase fetch error:", error);
    } else {
      leads = (data as Lead[]) ?? [];
    }
  } catch (err) {
    console.error(
      "[ContactsPage] Unexpected error:",
      err instanceof Error ? err.message : err
    );
  }

  return <ContactsClient leads={leads} />;
}
