ALTER TABLE "data" RENAME COLUMN "date" TO "timestamp";--> statement-breakpoint
ALTER TABLE "views" ADD COLUMN "uid" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_uid_users_id_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
