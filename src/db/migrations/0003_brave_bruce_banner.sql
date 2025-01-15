CREATE TABLE IF NOT EXISTS "project_settlements" (
	"project_id" integer NOT NULL,
	"settlement_id" integer NOT NULL,
	"is_main_settlement" boolean DEFAULT false,
	"budget_allocation" numeric(10, 2),
	"specific_goals" jsonb,
	"settlement_status" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"budget" numeric(10, 2),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"status" text DEFAULT 'active' NOT NULL,
	"location" text NOT NULL,
	"priority" integer,
	"milestones" jsonb,
	"budget_used" numeric(10, 2) DEFAULT '0',
	"budget_remaining" numeric(10, 2),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"department" text,
	"contact_email" text,
	"contact_phone" text,
	"notes" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_settlements" ADD CONSTRAINT "project_settlements_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_settlements" ADD CONSTRAINT "project_settlements_settlement_id_settlements_settlement_id_fk" FOREIGN KEY ("settlement_id") REFERENCES "public"."settlements"("settlement_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
