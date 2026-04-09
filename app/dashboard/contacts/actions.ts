"use server";

import { getSupabaseServerClient } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import type { LeadUpdate } from "@/lib/supabase/types";

export async function updateLeadStatus(
  leadId: string,
  status: string
): Promise<void> {
  const supabaseAdmin = getSupabaseServerClient();
  const update: LeadUpdate = { status: status as LeadUpdate["status"] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabaseAdmin as any)
    .from("leads")
    .update(update)
    .eq("id", leadId);

  if (error) {
    console.error("[updateLeadStatus] Failed:", error);
    throw new Error("Status-Update fehlgeschlagen");
  }

  revalidatePath("/dashboard/contacts");
}

export async function updateLeadNotes(
  leadId: string,
  notes: string
): Promise<void> {
  const supabaseAdmin = getSupabaseServerClient();
  const update: LeadUpdate = { notes };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabaseAdmin as any)
    .from("leads")
    .update(update)
    .eq("id", leadId);

  if (error) {
    console.error("[updateLeadNotes] Failed:", error);
    throw new Error("Notes-Update fehlgeschlagen");
  }

  revalidatePath("/dashboard/contacts");
}
