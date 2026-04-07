// ============================================================
// AI Growth System — Auto-Provisioning Logic
// Temporary JSON file store until Supabase is connected
// ============================================================

import { promises as fs } from "node:fs";
import path from "node:path";

// ------ Tenant Interface ------

export interface Tenant {
  id: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: "pro" | "premium";
  status: "active" | "paused" | "cancelled";
  business: {
    name: string;
    branche: string;
    email: string;
    phone: string;
    address?: string;
    website?: string;
  };
  config: {
    aiEnabled: boolean;
    modules: Record<string, boolean>;
    template: string;
    systemPrompt: string;
  };
  healthScore: number;
  referralCode: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

// ------ File Store ------

const DATA_DIR = path.join(process.cwd(), "data");
const TENANTS_FILE = path.join(DATA_DIR, "tenants.json");

async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readTenants(): Promise<Tenant[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(TENANTS_FILE, "utf-8");
    return JSON.parse(raw) as Tenant[];
  } catch {
    return [];
  }
}

async function writeTenants(tenants: Tenant[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TENANTS_FILE, JSON.stringify(tenants, null, 2), "utf-8");
}

// ------ Referral Code Generator ------

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ------ Industry Templates ------

interface IndustryTemplate {
  modules: Record<string, boolean>;
  templateName: string;
  systemPromptBase: string;
}

const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  zahnarzt: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: true,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "zahnarzt-v1",
    systemPromptBase:
      "Du bist der KI-Assistent einer Zahnarztpraxis. Du hilfst Patienten bei Terminbuchungen, beantwortest Fragen zu Behandlungen und Kosten, und gibst allgemeine Informationen zur Praxis. Sei freundlich, professionell und empathisch. Verwende medizinische Begriffe nur wenn noetig und erklaere sie verstaendlich.",
  },
  beauty: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: true,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "beauty-v1",
    systemPromptBase:
      "Du bist der KI-Assistent eines Beauty-Studios. Du hilfst Kunden bei Terminbuchungen fuer Behandlungen, beraetest zu Services und Preisen, und gibst Pflegetipps. Sei freundlich, stilvoll und begeisternd. Foerdere Zusatzleistungen und Produktempfehlungen.",
  },
  immobilien: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: false,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "immobilien-v1",
    systemPromptBase:
      "Du bist der KI-Assistent eines Immobilienbueros. Du hilfst Interessenten bei Besichtigungsterminen, beantwortest Fragen zu Objekten und Konditionen, und qualifizierst Leads. Sei professionell, vertrauenswuerdig und gut informiert. Frage nach Budget und Wuenschen.",
  },
  handwerk: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: false,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "handwerk-v1",
    systemPromptBase:
      "Du bist der KI-Assistent eines Handwerksbetriebs. Du nimmst Anfragen entgegen, vereinbarst Besichtigungstermine, beantwortest Fragen zu Leistungen und gibst grobe Kosteneinschaetzungen. Sei zuverlaessig, direkt und kompetent. Frage nach Art des Problems und Dringlichkeit.",
  },
  physio: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: true,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "physio-v1",
    systemPromptBase:
      "Du bist der KI-Assistent einer Physiotherapie-Praxis. Du hilfst Patienten bei Terminbuchungen, informierst ueber Behandlungsmethoden und Kassenzulassungen. Sei einfuehlsam, professionell und motivierend. Frage nach Verordnung und Beschwerden.",
  },
  gastro: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: false,
      noshow: true,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "gastro-v1",
    systemPromptBase:
      "Du bist der KI-Assistent eines Restaurants. Du hilfst Gaesten bei Tischreservierungen, informierst ueber Speisekarte und Oeffnungszeiten, und nimmst spezielle Wuensche auf. Sei herzlich, gastfreundlich und aufmerksam. Frage nach Personenanzahl und Anlass.",
  },
  default: {
    modules: {
      chatbot: true,
      phone: true,
      booking: true,
      followup: true,
      noshow: true,
      reputation: true,
      reactivation: true,
      social: true,
    },
    templateName: "default-v1",
    systemPromptBase:
      "Du bist der KI-Assistent eines lokalen Unternehmens. Du hilfst Kunden bei Terminbuchungen, beantwortest Fragen zu Services und Preisen, und gibst allgemeine Informationen zum Unternehmen. Sei freundlich, professionell und hilfsbereit.",
  },
};

function getIndustryTemplate(branche: string): IndustryTemplate {
  const normalized = branche.toLowerCase().trim();
  return INDUSTRY_TEMPLATES[normalized] ?? INDUSTRY_TEMPLATES.default;
}

function generateSystemPrompt(
  branche: string,
  businessName: string
): string {
  const template = getIndustryTemplate(branche);
  return `[${businessName}]\n\n${template.systemPromptBase}\n\nWichtige Regeln:\n- Stelle dich immer als Assistent von "${businessName}" vor\n- Leite bei komplexen Fragen an das Team weiter\n- Sammle immer Kontaktdaten (Name, Telefon, Email)\n- Buche Termine proaktiv wenn moeglich\n- Antworte immer auf Deutsch`;
}

// ------ Welcome Email Payload ------

export interface WelcomeEmailPayload {
  to: string;
  subject: string;
  businessName: string;
  plan: string;
  referralCode: string;
  dashboardUrl: string;
  onboardingSteps: string[];
}

function createWelcomeEmailPayload(tenant: Tenant): WelcomeEmailPayload {
  return {
    to: tenant.business.email,
    subject: `Willkommen bei AI Growth System, ${tenant.business.name}!`,
    businessName: tenant.business.name,
    plan: tenant.plan === "premium" ? "Premium" : "Pro",
    referralCode: tenant.referralCode,
    dashboardUrl: "/dashboard/onboarding",
    onboardingSteps: [
      "Geschaeftsinformationen vervollstaendigen",
      "Telefonnummer verbinden",
      "Google Business Profil verknuepfen",
      "Chatbot personalisieren",
      "Kalender integrieren",
      "Erste Automatisierung aktivieren",
    ],
  };
}

// ------ Provisioning Functions ------

export async function provisionTenant(params: {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: "pro" | "premium";
  businessName: string;
  branche: string;
  email: string;
  phone?: string;
}): Promise<{ tenant: Tenant; welcomeEmail: WelcomeEmailPayload }> {
  const template = getIndustryTemplate(params.branche);
  const systemPrompt = generateSystemPrompt(
    params.branche,
    params.businessName
  );

  // For premium plans, enable all modules; for pro, use template defaults
  const modules =
    params.plan === "premium"
      ? Object.fromEntries(
          Object.keys(template.modules).map((k) => [k, true])
        )
      : { ...template.modules };

  const tenant: Tenant = {
    id: crypto.randomUUID(),
    stripeCustomerId: params.stripeCustomerId,
    stripeSubscriptionId: params.stripeSubscriptionId,
    plan: params.plan,
    status: "active",
    business: {
      name: params.businessName,
      branche: params.branche,
      email: params.email,
      phone: params.phone ?? "",
    },
    config: {
      aiEnabled: true,
      modules,
      template: template.templateName,
      systemPrompt,
    },
    healthScore: 100,
    referralCode: generateReferralCode(),
    createdAt: new Date().toISOString(),
    onboardingCompleted: false,
  };

  // Persist tenant
  const tenants = await readTenants();
  tenants.push(tenant);
  await writeTenants(tenants);

  console.log(
    `[provisioning] Tenant provisioned: id=${tenant.id}, plan=${tenant.plan}, branche=${params.branche}`
  );

  // Create welcome email payload
  const welcomeEmail = createWelcomeEmailPayload(tenant);
  console.log(
    `[provisioning] Welcome email prepared for: ${welcomeEmail.to}`
  );

  return { tenant, welcomeEmail };
}

// ------ Plan Activation / Updates ------

export async function activatePlan(
  stripeSubscriptionId: string,
  plan: "pro" | "premium"
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeSubscriptionId === stripeSubscriptionId
  );
  if (!tenant) {
    console.log(
      `[provisioning] activatePlan: tenant not found for subscription ${stripeSubscriptionId}`
    );
    return null;
  }

  tenant.status = "active";
  tenant.plan = plan;
  tenant.config.aiEnabled = true;
  await writeTenants(tenants);
  console.log(
    `[provisioning] Plan activated: tenant=${tenant.id}, plan=${plan}`
  );
  return tenant;
}

export async function updatePlan(
  stripeSubscriptionId: string,
  newPlan: "pro" | "premium"
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeSubscriptionId === stripeSubscriptionId
  );
  if (!tenant) {
    console.log(
      `[provisioning] updatePlan: tenant not found for subscription ${stripeSubscriptionId}`
    );
    return null;
  }

  const oldPlan = tenant.plan;
  tenant.plan = newPlan;

  // If upgrading to premium, enable all modules
  if (newPlan === "premium") {
    for (const key of Object.keys(tenant.config.modules)) {
      tenant.config.modules[key] = true;
    }
  }

  await writeTenants(tenants);
  console.log(
    `[provisioning] Plan updated: tenant=${tenant.id}, ${oldPlan} -> ${newPlan}`
  );
  return tenant;
}

export async function deactivateTenant(
  stripeSubscriptionId: string
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeSubscriptionId === stripeSubscriptionId
  );
  if (!tenant) {
    console.log(
      `[provisioning] deactivateTenant: tenant not found for subscription ${stripeSubscriptionId}`
    );
    return null;
  }

  tenant.status = "cancelled";
  tenant.config.aiEnabled = false;
  await writeTenants(tenants);
  console.log(`[provisioning] Tenant deactivated: tenant=${tenant.id}`);
  return tenant;
}

export async function pauseTenant(
  stripeSubscriptionId: string
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeSubscriptionId === stripeSubscriptionId
  );
  if (!tenant) {
    console.log(
      `[provisioning] pauseTenant: tenant not found for subscription ${stripeSubscriptionId}`
    );
    return null;
  }

  tenant.status = "paused";
  tenant.config.aiEnabled = false;
  await writeTenants(tenants);
  console.log(`[provisioning] Tenant paused: tenant=${tenant.id}`);
  return tenant;
}

export async function markPaymentSuccessful(
  stripeCustomerId: string
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeCustomerId === stripeCustomerId
  );
  if (!tenant) {
    console.log(
      `[provisioning] markPaymentSuccessful: tenant not found for customer ${stripeCustomerId}`
    );
    return null;
  }

  // If tenant was paused due to dunning, reactivate
  if (tenant.status === "paused") {
    tenant.status = "active";
    tenant.config.aiEnabled = true;
    console.log(
      `[provisioning] Tenant reactivated after successful payment: tenant=${tenant.id}`
    );
  }

  await writeTenants(tenants);
  console.log(
    `[provisioning] Payment marked successful: tenant=${tenant.id}`
  );
  return tenant;
}

export async function syncCustomerData(
  stripeCustomerId: string,
  data: { email?: string; name?: string; phone?: string }
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const tenant = tenants.find(
    (t) => t.stripeCustomerId === stripeCustomerId
  );
  if (!tenant) {
    console.log(
      `[provisioning] syncCustomerData: tenant not found for customer ${stripeCustomerId}`
    );
    return null;
  }

  if (data.email) tenant.business.email = data.email;
  if (data.name) tenant.business.name = data.name;
  if (data.phone) tenant.business.phone = data.phone;

  await writeTenants(tenants);
  console.log(
    `[provisioning] Customer data synced: tenant=${tenant.id}`
  );
  return tenant;
}

// ------ Tenant CRUD for Dashboard ------

export async function getTenantByStripeCustomerId(
  stripeCustomerId: string
): Promise<Tenant | null> {
  const tenants = await readTenants();
  return tenants.find((t) => t.stripeCustomerId === stripeCustomerId) ?? null;
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  const tenants = await readTenants();
  return tenants.find((t) => t.id === id) ?? null;
}

export async function updateTenant(
  id: string,
  updates: Partial<
    Pick<Tenant, "business" | "config" | "onboardingCompleted" | "healthScore">
  >
): Promise<Tenant | null> {
  const tenants = await readTenants();
  const index = tenants.findIndex((t) => t.id === id);
  if (index === -1) {
    console.log(
      `[provisioning] updateTenant: tenant not found for id ${id}`
    );
    return null;
  }

  const tenant = tenants[index];

  if (updates.business) {
    tenant.business = { ...tenant.business, ...updates.business };
  }
  if (updates.config) {
    tenant.config = { ...tenant.config, ...updates.config };
  }
  if (updates.onboardingCompleted !== undefined) {
    tenant.onboardingCompleted = updates.onboardingCompleted;
  }
  if (updates.healthScore !== undefined) {
    tenant.healthScore = updates.healthScore;
  }

  tenants[index] = tenant;
  await writeTenants(tenants);
  console.log(`[provisioning] Tenant updated: tenant=${tenant.id}`);
  return tenant;
}

export async function getAllTenants(): Promise<Tenant[]> {
  return readTenants();
}
