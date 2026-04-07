// ============================================================
// Aufwind AI — Database TypeScript Types
// Must match lib/supabase/schema.sql exactly
// ============================================================

// ---------------------------------------------------------------------------
// Enum types (matching PostgreSQL enums)
// ---------------------------------------------------------------------------

export type PlanType = "pro" | "premium";

export type TenantStatus = "trial" | "active" | "paused" | "cancelled";

export type ChannelType =
  | "whatsapp"
  | "webchat"
  | "phone"
  | "email"
  | "instagram"
  | "facebook";

export type DirectionType = "inbound" | "outbound";

export type ConversationStatus = "active" | "resolved" | "waiting";

export type HandlerType = "ai" | "human";

export type ContactSource =
  | "chatbot"
  | "phone"
  | "website"
  | "referral"
  | "reactivation"
  | "manual";

export type ContactStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "booked"
  | "customer"
  | "inactive";

export type ReviewPlatform = "google" | "trustpilot" | "provenexpert";

export type ReviewStatus = "requested" | "received" | "positive" | "negative";

export type AppointmentStatus =
  | "confirmed"
  | "reminded"
  | "completed"
  | "no_show"
  | "cancelled"
  | "rescheduled";

export type HealthEventType =
  | "login"
  | "conversation"
  | "review"
  | "module_toggle"
  | "settings_change"
  | "payment_success"
  | "payment_failed"
  | "support_ticket";

export type ReferralStatus = "invited" | "signed_up" | "active" | "churned";

export type DunningEventType =
  | "payment_failed"
  | "reminder_1"
  | "reminder_2"
  | "reminder_3"
  | "paused"
  | "recovered"
  | "cancelled";

// ---------------------------------------------------------------------------
// JSONB sub-types
// ---------------------------------------------------------------------------

export interface OpeningHoursDay {
  from: string; // "09:00"
  to: string;   // "18:00"
}

export type OpeningHours = {
  [day in "mo" | "di" | "mi" | "do" | "fr" | "sa" | "so"]?: OpeningHoursDay;
};

export interface ModulesConfig {
  chatbot: boolean;
  phone: boolean;
  booking: boolean;
  followup: boolean;
  noshow: boolean;
  reputation: boolean;
  reactivation: boolean;
  social: boolean;
}

export interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string; // ISO 8601
}

// ---------------------------------------------------------------------------
// Table row types
// ---------------------------------------------------------------------------

export interface Tenant {
  id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: PlanType;
  status: TenantStatus;
  business_name: string;
  branche: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  plz: string | null;
  website: string | null;
  logo_url: string | null;
  opening_hours: OpeningHours;
  services: string[];
  ai_enabled: boolean;
  modules: ModulesConfig;
  system_prompt: string | null;
  tonality: string;
  greeting: string | null;
  custom_instructions: string | null;
  referral_code: string;
  referred_by: string | null;
  health_score: number;
  onboarding_completed: boolean;
  onboarding_step: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  tenant_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: ContactSource;
  status: ContactStatus;
  tags: string[];
  notes: string | null;
  last_contact_at: string | null;
  total_value: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  tenant_id: string;
  contact_id: string | null;
  channel: ChannelType;
  direction: DirectionType;
  status: ConversationStatus;
  handled_by: HandlerType;
  summary: string | null;
  messages: ConversationMessage[];
  lead_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  tenant_id: string;
  contact_id: string | null;
  platform: ReviewPlatform;
  rating: number;
  text: string | null;
  author_name: string | null;
  request_sent_at: string | null;
  responded_at: string | null;
  status: ReviewStatus;
  created_at: string;
}

export interface Appointment {
  id: string;
  tenant_id: string;
  contact_id: string;
  service: string | null;
  scheduled_at: string;
  status: AppointmentStatus;
  reminder_24h_sent: boolean;
  reminder_1h_sent: boolean;
  created_at: string;
}

export interface HealthEvent {
  id: string;
  tenant_id: string;
  event_type: HealthEventType;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_tenant_id: string;
  referred_email: string;
  referred_tenant_id: string | null;
  status: ReferralStatus;
  reward_applied: boolean;
  created_at: string;
}

export interface DunningEvent {
  id: string;
  tenant_id: string;
  stripe_invoice_id: string | null;
  event_type: DunningEventType;
  sent_at: string;
}

// ---------------------------------------------------------------------------
// Insert types (omit auto-generated fields)
// ---------------------------------------------------------------------------

export type TenantInsert = Omit<
  Tenant,
  "id" | "referral_code" | "health_score" | "created_at" | "updated_at"
> & {
  id?: string;
  referral_code?: string;
  health_score?: number;
  created_at?: string;
  updated_at?: string;
};

export type ContactInsert = Omit<Contact, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ConversationInsert = Omit<
  Conversation,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ReviewInsert = Omit<Review, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type AppointmentInsert = Omit<Appointment, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type HealthEventInsert = Omit<HealthEvent, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ReferralInsert = Omit<Referral, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type DunningEventInsert = Omit<DunningEvent, "id" | "sent_at"> & {
  id?: string;
  sent_at?: string;
};

// ---------------------------------------------------------------------------
// Update types (all fields optional except id)
// ---------------------------------------------------------------------------

export type TenantUpdate = Partial<Omit<Tenant, "id" | "created_at">>;
export type ContactUpdate = Partial<Omit<Contact, "id" | "tenant_id" | "created_at">>;
export type ConversationUpdate = Partial<Omit<Conversation, "id" | "tenant_id" | "created_at">>;
export type ReviewUpdate = Partial<Omit<Review, "id" | "tenant_id" | "created_at">>;
export type AppointmentUpdate = Partial<Omit<Appointment, "id" | "tenant_id" | "created_at">>;

// ---------------------------------------------------------------------------
// Supabase Database type (for createClient<Database>)
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: Tenant;
        Insert: TenantInsert;
        Update: TenantUpdate;
      };
      contacts: {
        Row: Contact;
        Insert: ContactInsert;
        Update: ContactUpdate;
      };
      conversations: {
        Row: Conversation;
        Insert: ConversationInsert;
        Update: ConversationUpdate;
      };
      reviews: {
        Row: Review;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
      };
      appointments: {
        Row: Appointment;
        Insert: AppointmentInsert;
        Update: AppointmentUpdate;
      };
      health_events: {
        Row: HealthEvent;
        Insert: HealthEventInsert;
        Update: never;
      };
      referrals: {
        Row: Referral;
        Insert: ReferralInsert;
        Update: Partial<Omit<Referral, "id" | "created_at">>;
      };
      dunning_events: {
        Row: DunningEvent;
        Insert: DunningEventInsert;
        Update: never;
      };
    };
    Views: {
      tenant_overview: {
        Row: Tenant & {
          total_conversations: number;
          total_contacts: number;
          total_reviews: number;
          avg_rating: number;
          total_appointments: number;
        };
      };
      monthly_stats: {
        Row: {
          tenant_id: string;
          business_name: string;
          conversations_this_month: number;
          new_contacts_this_month: number;
          reviews_this_month: number;
          avg_rating_this_month: number;
          appointments_this_month: number;
          no_shows_this_month: number;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: {
      plan_type: PlanType;
      tenant_status: TenantStatus;
      channel_type: ChannelType;
      direction_type: DirectionType;
      conversation_status: ConversationStatus;
      handler_type: HandlerType;
      contact_source: ContactSource;
      contact_status: ContactStatus;
      review_platform: ReviewPlatform;
      review_status: ReviewStatus;
      appointment_status: AppointmentStatus;
      health_event_type: HealthEventType;
      referral_status: ReferralStatus;
      dunning_event_type: DunningEventType;
    };
  };
}
