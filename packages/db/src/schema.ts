import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

/** Reusable timestamp columns — all dates stored as ISO 8601 in UTC */
const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
};

/** Multi-tenancy column present on every tenant-scoped table */
const orgId = () =>
  uuid('organisation_id')
    .notNull()
    .references(() => organisations.id, { onDelete: 'cascade' });

// ─── Enums ───────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum('user_role', [
  'super_admin',
  'customer_admin',
  'accessibility_officer',
  'developer',
  'auditor',
]);

export const assetTypeEnum = pgEnum('asset_type', [
  'website',
  'web_app',
  'mobile_app',
  'document',
  'pdf',
]);

export const scanStatusEnum = pgEnum('scan_status', ['pending', 'running', 'completed', 'failed']);

export const issueStatusEnum = pgEnum('issue_status', [
  'open',
  'in_progress',
  'resolved',
  'wont_fix',
  'duplicate',
]);

export const issueSeverityEnum = pgEnum('issue_severity', [
  'critical',
  'serious',
  'moderate',
  'minor',
]);

export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled',
]);

export const certificateStatusEnum = pgEnum('certificate_status', ['active', 'expired', 'revoked']);

export const auditActionEnum = pgEnum('audit_action', [
  'create',
  'update',
  'delete',
  'login',
  'logout',
  'scan',
  'export',
  'invite',
]);

// ─── Organisations ───────────────────────────────────────────────────────────

export const organisations = pgTable(
  'organisations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    gstin: varchar('gstin', { length: 15 }),
    billingEmail: varchar('billing_email', { length: 255 }),
    isActive: boolean('is_active').notNull().default(true),
    planTier: varchar('plan_tier', { length: 50 }).notNull().default('starter'),
    ...timestamps,
  },
  (table) => ({
    slugIdx: index('organisations_slug_idx').on(table.slug),
  }),
);

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    /** Supabase Auth user ID */
    authUserId: uuid('auth_user_id').notNull().unique(),
    email: varchar('email', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 255 }),
    role: userRoleEnum('role').notNull().default('developer'),
    isActive: boolean('is_active').notNull().default(true),
    mfaEnabled: boolean('mfa_enabled').notNull().default(false),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true, mode: 'string' }),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('users_org_idx').on(table.organisationId),
    authUserIdx: index('users_auth_user_idx').on(table.authUserId),
    emailIdx: index('users_email_idx').on(table.email),
  }),
);

// ─── Assets ──────────────────────────────────────────────────────────────────

export const assets = pgTable(
  'assets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    name: varchar('name', { length: 255 }).notNull(),
    url: text('url').notNull(),
    type: assetTypeEnum('type').notNull().default('website'),
    description: text('description'),
    isActive: boolean('is_active').notNull().default(true),
    lastScannedAt: timestamp('last_scanned_at', { withTimezone: true, mode: 'string' }),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('assets_org_idx').on(table.organisationId),
    urlIdx: index('assets_url_idx').on(table.url),
  }),
);

// ─── Scans ───────────────────────────────────────────────────────────────────

export const scans = pgTable(
  'scans',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    assetId: uuid('asset_id')
      .notNull()
      .references(() => assets.id, { onDelete: 'cascade' }),
    initiatedBy: uuid('initiated_by').references(() => users.id, { onDelete: 'set null' }),
    status: scanStatusEnum('status').notNull().default('pending'),
    wcagLevel: varchar('wcag_level', { length: 10 }).notNull().default('AA'),
    wcagVersion: varchar('wcag_version', { length: 10 }).notNull().default('2.2'),
    pagesScanned: integer('pages_scanned').notNull().default(0),
    violationCount: integer('violation_count').notNull().default(0),
    score: integer('score'),
    startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' }),
    completedAt: timestamp('completed_at', { withTimezone: true, mode: 'string' }),
    errorMessage: text('error_message'),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('scans_org_idx').on(table.organisationId),
    assetIdx: index('scans_asset_idx').on(table.assetId),
    statusIdx: index('scans_status_idx').on(table.status),
  }),
);

// ─── Violations ──────────────────────────────────────────────────────────────

export const violations = pgTable(
  'violations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    scanId: uuid('scan_id')
      .notNull()
      .references(() => scans.id, { onDelete: 'cascade' }),
    ruleId: varchar('rule_id', { length: 100 }).notNull(),
    impact: issueSeverityEnum('impact').notNull(),
    description: text('description').notNull(),
    helpUrl: text('help_url'),
    wcagCriteria: varchar('wcag_criteria', { length: 50 }).array(),
    selector: text('selector'),
    html: text('html'),
    pageUrl: text('page_url'),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('violations_org_idx').on(table.organisationId),
    scanIdx: index('violations_scan_idx').on(table.scanId),
    ruleIdx: index('violations_rule_idx').on(table.ruleId),
  }),
);

// ─── Issues (tracked remediation items) ────────────────────────────────────

export const issues = pgTable(
  'issues',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    violationId: uuid('violation_id').references(() => violations.id, { onDelete: 'set null' }),
    assetId: uuid('asset_id')
      .notNull()
      .references(() => assets.id, { onDelete: 'cascade' }),
    assignedTo: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description'),
    status: issueStatusEnum('status').notNull().default('open'),
    severity: issueSeverityEnum('severity').notNull(),
    dueDate: timestamp('due_date', { withTimezone: true, mode: 'string' }),
    resolvedAt: timestamp('resolved_at', { withTimezone: true, mode: 'string' }),
    resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('issues_org_idx').on(table.organisationId),
    assetIdx: index('issues_asset_idx').on(table.assetId),
    statusIdx: index('issues_status_idx').on(table.status),
    assignedIdx: index('issues_assigned_idx').on(table.assignedTo),
  }),
);

// ─── Certificates ────────────────────────────────────────────────────────────

export const certificates = pgTable(
  'certificates',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    assetId: uuid('asset_id')
      .notNull()
      .references(() => assets.id, { onDelete: 'cascade' }),
    scanId: uuid('scan_id')
      .notNull()
      .references(() => scans.id, { onDelete: 'cascade' }),
    certificateNumber: varchar('certificate_number', { length: 100 }).notNull().unique(),
    status: certificateStatusEnum('status').notNull().default('active'),
    wcagLevel: varchar('wcag_level', { length: 10 }).notNull().default('AA'),
    wcagVersion: varchar('wcag_version', { length: 10 }).notNull().default('2.2'),
    issuedAt: timestamp('issued_at', { withTimezone: true, mode: 'string' }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' }).notNull(),
    revokedAt: timestamp('revoked_at', { withTimezone: true, mode: 'string' }),
    revokeReason: text('revoke_reason'),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('certificates_org_idx').on(table.organisationId),
    assetIdx: index('certificates_asset_idx').on(table.assetId),
    statusIdx: index('certificates_status_idx').on(table.status),
  }),
);

// ─── Reports ─────────────────────────────────────────────────────────────────

export const reports = pgTable(
  'reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    scanId: uuid('scan_id')
      .notNull()
      .references(() => scans.id, { onDelete: 'cascade' }),
    generatedBy: uuid('generated_by').references(() => users.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 500 }).notNull(),
    format: varchar('format', { length: 20 }).notNull().default('pdf'),
    storagePath: text('storage_path'),
    fileSizeBytes: integer('file_size_bytes'),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('reports_org_idx').on(table.organisationId),
    scanIdx: index('reports_scan_idx').on(table.scanId),
  }),
);

// ─── Invoices (amounts in paise — integer) ───────────────────────────────────

export const invoices = pgTable(
  'invoices',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
    status: invoiceStatusEnum('status').notNull().default('draft'),
    /** Amount in paise (1 INR = 100 paise) */
    subtotalPaise: integer('subtotal_paise').notNull(),
    /** GST amount in paise */
    gstPaise: integer('gst_paise').notNull().default(0),
    /** Total amount in paise */
    totalPaise: integer('total_paise').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('INR'),
    billingPeriodStart: timestamp('billing_period_start', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    billingPeriodEnd: timestamp('billing_period_end', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    dueDate: timestamp('due_date', { withTimezone: true, mode: 'string' }).notNull(),
    paidAt: timestamp('paid_at', { withTimezone: true, mode: 'string' }),
    lineItems: jsonb('line_items').$type<InvoiceLineItem[]>().notNull().default([]),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('invoices_org_idx').on(table.organisationId),
    statusIdx: index('invoices_status_idx').on(table.status),
  }),
);

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  /** Unit price in paise */
  unitPricePaise: number;
  /** Line total in paise */
  totalPaise: number;
}

// ─── Widget Preferences ──────────────────────────────────────────────────────

export const widgetPreferences = pgTable(
  'widget_preferences',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    assetId: uuid('asset_id').references(() => assets.id, { onDelete: 'cascade' }),
    /** Widget position on page */
    position: varchar('position', { length: 20 }).notNull().default('bottom-right'),
    primaryColor: varchar('primary_color', { length: 7 }).notNull().default('#005fcc'),
    language: varchar('language', { length: 10 }).notNull().default('en'),
    features: jsonb('features').$type<WidgetFeatures>().notNull().default({
      textSize: true,
      contrast: true,
      screenReader: true,
      keyboardNav: true,
      dyslexiaFont: false,
      highlightLinks: true,
      pauseAnimations: true,
    }),
    isEnabled: boolean('is_enabled').notNull().default(true),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('widget_prefs_org_idx').on(table.organisationId),
    assetIdx: index('widget_prefs_asset_idx').on(table.assetId),
  }),
);

export interface WidgetFeatures {
  textSize: boolean;
  contrast: boolean;
  screenReader: boolean;
  keyboardNav: boolean;
  dyslexiaFont: boolean;
  highlightLinks: boolean;
  pauseAnimations: boolean;
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organisationId: orgId(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    action: auditActionEnum('action').notNull(),
    resourceType: varchar('resource_type', { length: 100 }).notNull(),
    resourceId: uuid('resource_id'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    ...timestamps,
  },
  (table) => ({
    orgIdx: index('audit_logs_org_idx').on(table.organisationId),
    userIdx: index('audit_logs_user_idx').on(table.userId),
    actionIdx: index('audit_logs_action_idx').on(table.action),
    createdIdx: index('audit_logs_created_idx').on(table.createdAt),
  }),
);

// ─── Waitlist Signups ────────────────────────────────────────────────────────

export const waitlistSignups = pgTable(
  'waitlist_signups',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }).notNull(),
    companySize: varchar('company_size', { length: 50 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: index('waitlist_signups_email_idx').on(table.email),
    createdIdx: index('waitlist_signups_created_idx').on(table.createdAt),
  }),
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const organisationsRelations = relations(organisations, ({ many }) => ({
  users: many(users),
  assets: many(assets),
  scans: many(scans),
  invoices: many(invoices),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [users.organisationId],
    references: [organisations.id],
  }),
  assignedIssues: many(issues),
}));

export const assetsRelations = relations(assets, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [assets.organisationId],
    references: [organisations.id],
  }),
  scans: many(scans),
  issues: many(issues),
  certificates: many(certificates),
  widgetPreferences: many(widgetPreferences),
}));

export const scansRelations = relations(scans, ({ one, many }) => ({
  organisation: one(organisations, {
    fields: [scans.organisationId],
    references: [organisations.id],
  }),
  asset: one(assets, { fields: [scans.assetId], references: [assets.id] }),
  initiatedByUser: one(users, { fields: [scans.initiatedBy], references: [users.id] }),
  violations: many(violations),
  reports: many(reports),
  certificates: many(certificates),
}));

export const violationsRelations = relations(violations, ({ one, many }) => ({
  scan: one(scans, { fields: [violations.scanId], references: [scans.id] }),
  issues: many(issues),
}));

export const issuesRelations = relations(issues, ({ one }) => ({
  organisation: one(organisations, {
    fields: [issues.organisationId],
    references: [organisations.id],
  }),
  asset: one(assets, { fields: [issues.assetId], references: [assets.id] }),
  violation: one(violations, { fields: [issues.violationId], references: [violations.id] }),
  assignee: one(users, { fields: [issues.assignedTo], references: [users.id] }),
}));
