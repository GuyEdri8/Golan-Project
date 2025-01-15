CREATE TABLE IF NOT EXISTS "project_editors" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"editor_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now(),
	"added_by" integer NOT NULL,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"kinde_id" varchar NOT NULL,
	"email" varchar NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"picture" text,
	"role" varchar DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "project_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "department" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "contact_email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "contact_phone" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "owner_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_editors" ADD CONSTRAINT "project_editors_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_editors" ADD CONSTRAINT "project_editors_editor_id_users_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_editors" ADD CONSTRAINT "project_editors_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "milestones";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "budget_used";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "budget_remaining";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "notes";