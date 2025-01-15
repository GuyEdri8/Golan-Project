CREATE TABLE IF NOT EXISTS "settlement_statistics" (
	"id" serial NOT NULL,
	"settlement_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"house_holds" integer NOT NULL,
	"population" integer NOT NULL,
	"population_2030" integer NOT NULL,
	"growth_rate" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settlements" (
	"settlement_id" serial PRIMARY KEY NOT NULL,
	"settlement_name" varchar NOT NULL
);
--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "authenticator" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
DROP TABLE "verificationToken" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settlement_statistics" ADD CONSTRAINT "settlement_statistics_settlement_id_settlements_settlement_id_fk" FOREIGN KEY ("settlement_id") REFERENCES "public"."settlements"("settlement_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
