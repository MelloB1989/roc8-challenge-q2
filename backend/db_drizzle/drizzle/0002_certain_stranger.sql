ALTER TABLE "views" DROP CONSTRAINT "views_uid_users_id_fk";
--> statement-breakpoint
ALTER TABLE "views" DROP COLUMN IF EXISTS "uid";