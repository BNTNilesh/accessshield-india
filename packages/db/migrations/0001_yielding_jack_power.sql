CREATE TABLE IF NOT EXISTS "waitlist_signups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"company_size" varchar(50) NOT NULL,
	"phone" varchar(20),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "violations" ADD COLUMN "ai_fix" text;--> statement-breakpoint
ALTER TABLE "violations" ADD COLUMN "ai_explanation" text;--> statement-breakpoint
ALTER TABLE "violations" ADD COLUMN "ai_alt_text" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "waitlist_signups_email_idx" ON "waitlist_signups" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "waitlist_signups_created_idx" ON "waitlist_signups" USING btree ("created_at");