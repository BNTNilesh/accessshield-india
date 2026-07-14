CREATE TABLE IF NOT EXISTS "document_scan_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"document_name" text NOT NULL,
	"document_type" text NOT NULL,
	"document_size_bytes" bigint,
	"page_count" integer,
	"s3_key" text NOT NULL,
	"s3_bucket" text DEFAULT 'accessshield-uploads-prod' NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"progress_percent" integer DEFAULT 0,
	"standards" text[] DEFAULT ARRAY['WCAG_2_1_AA','GIGW_3_0','PDF_UA','IS_17802']::text[] NOT NULL,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document_scan_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"organisation_id" uuid NOT NULL,
	"document_name" text NOT NULL,
	"document_type" text NOT NULL,
	"total_violations" integer DEFAULT 0 NOT NULL,
	"critical_count" integer DEFAULT 0 NOT NULL,
	"serious_count" integer DEFAULT 0 NOT NULL,
	"moderate_count" integer DEFAULT 0 NOT NULL,
	"minor_count" integer DEFAULT 0 NOT NULL,
	"compliance_score" integer DEFAULT 0 NOT NULL,
	"violations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"summary" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"gigw_checkpoint_results" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ai_summary" text,
	"scan_duration_seconds" double precision,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "document_scan_results_job_id_unique" UNIQUE("job_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document_violations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"organisation_id" uuid NOT NULL,
	"violation_id" text NOT NULL,
	"checkpoint_id" text NOT NULL,
	"standard" text NOT NULL,
	"severity" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"location" text,
	"wcag_criterion" text,
	"impact" text,
	"remediation" text,
	"auto_fixable" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_scan_jobs" ADD CONSTRAINT "document_scan_jobs_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_scan_results" ADD CONSTRAINT "document_scan_results_job_id_document_scan_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."document_scan_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_scan_results" ADD CONSTRAINT "document_scan_results_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_violations" ADD CONSTRAINT "document_violations_job_id_document_scan_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."document_scan_jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_violations" ADD CONSTRAINT "document_violations_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_jobs_org_id" ON "document_scan_jobs" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_jobs_status" ON "document_scan_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_jobs_created" ON "document_scan_jobs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_results_job_id" ON "document_scan_results" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_results_org_id" ON "document_scan_results" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_violations_job_id" ON "document_violations" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_violations_severity" ON "document_violations" USING btree ("job_id","severity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_violations_category" ON "document_violations" USING btree ("job_id","category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_doc_violations_checkpoint" ON "document_violations" USING btree ("checkpoint_id");