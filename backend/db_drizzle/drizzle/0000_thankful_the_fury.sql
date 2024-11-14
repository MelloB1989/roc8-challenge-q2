CREATE TABLE IF NOT EXISTS "data" (
	"rid" varchar PRIMARY KEY NOT NULL,
	"date" timestamp DEFAULT now(),
	"age" integer,
	"gender" integer,
	"feature_a" integer,
	"feature_b" integer,
	"feature_c" integer,
	"feature_d" integer,
	"feature_e" integer,
	"feature_f" integer,
	CONSTRAINT "data_rid_unique" UNIQUE("rid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '',
	"email" varchar,
	"password" varchar,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "views" (
	"vid" varchar PRIMARY KEY NOT NULL,
	"filters" json DEFAULT '{"ageFilter":null,"dateFilter":null,"genderFilter":null}'::json,
	"created_by" varchar,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "views_vid_unique" UNIQUE("vid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
