// ============================================================
// AI Growth System — Tenant CRUD API
// GET /api/tenant — Get current tenant
// PATCH /api/tenant — Update tenant settings
// ============================================================

import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import {
  getTenantByStripeCustomerId,
  getTenantById,
  updateTenant,
  type Tenant,
} from "@/lib/provisioning";

// ------ Helpers ------

async function resolveCurrentTenant(
  request: NextRequest
): Promise<Tenant | null> {
  // Try header first (set by middleware or auth layer)
  const headersList = await headers();
  const stripeCustomerId = headersList.get("x-stripe-customer-id");
  if (stripeCustomerId) {
    return getTenantByStripeCustomerId(stripeCustomerId);
  }

  // Try query parameter as fallback (for development)
  const tenantId = request.nextUrl.searchParams.get("tenantId");
  if (tenantId) {
    return getTenantById(tenantId);
  }

  const customerId = request.nextUrl.searchParams.get("stripeCustomerId");
  if (customerId) {
    return getTenantByStripeCustomerId(customerId);
  }

  return null;
}

// ------ GET: Get Current Tenant ------

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const tenant = await resolveCurrentTenant(request);

    if (!tenant) {
      return Response.json(
        { error: "Tenant not found" },
        { status: 404 }
      );
    }

    console.log(
      `[tenant] GET: tenant=${tenant.id}, plan=${tenant.plan}`
    );

    return Response.json({ tenant });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error(`[tenant] GET error: ${message}`);

    return Response.json(
      { error: "Failed to retrieve tenant", details: message },
      { status: 500 }
    );
  }
}

// ------ PATCH: Update Tenant Settings ------

interface TenantUpdateBody {
  tenantId: string;
  business?: Partial<Tenant["business"]>;
  config?: Partial<Tenant["config"]>;
  onboardingCompleted?: boolean;
}

export async function PATCH(request: NextRequest): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<TenantUpdateBody>;

    if (!body.tenantId || typeof body.tenantId !== "string") {
      return Response.json(
        { error: "Missing required field: tenantId" },
        { status: 400 }
      );
    }

    // Verify tenant exists
    const existingTenant = await getTenantById(body.tenantId);
    if (!existingTenant) {
      return Response.json(
        { error: "Tenant not found" },
        { status: 404 }
      );
    }

    // Build update payload — only allow specific fields
    const updates: Parameters<typeof updateTenant>[1] = {};

    if (body.business) {
      updates.business = body.business as Tenant["business"];
    }
    if (body.config) {
      updates.config = body.config as Tenant["config"];
    }
    if (body.onboardingCompleted !== undefined) {
      updates.onboardingCompleted = body.onboardingCompleted;
    }

    const updatedTenant = await updateTenant(body.tenantId, updates);

    if (!updatedTenant) {
      return Response.json(
        { error: "Failed to update tenant" },
        { status: 500 }
      );
    }

    console.log(
      `[tenant] PATCH: tenant=${updatedTenant.id} updated successfully`
    );

    return Response.json({ tenant: updatedTenant });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error(`[tenant] PATCH error: ${message}`);

    return Response.json(
      { error: "Failed to update tenant", details: message },
      { status: 500 }
    );
  }
}
