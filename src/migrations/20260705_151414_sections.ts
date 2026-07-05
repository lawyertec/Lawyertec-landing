import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { mapLandingContentToPayload } from '../lib/landing-content-map'
import { defaultLandingContent } from '../lib/landing-content'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_landing_blocks_features_items_icon" AS ENUM('research', 'document', 'memory', 'projects');
  CREATE TYPE "public"."enum_landing_blocks_how_it_works_steps_preview_style" AS ENUM('simple', 'tags', 'citation');
  CREATE TABLE "landing_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_landing_blocks_features_items_icon" NOT NULL
  );
  
  CREATE TABLE "landing_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_blocks_use_cases_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"caption" varchar NOT NULL
  );
  
  CREATE TABLE "landing_blocks_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_blocks_how_it_works_steps_preview_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "landing_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"preview_style" "enum_landing_blocks_how_it_works_steps_preview_style" DEFAULT 'simple' NOT NULL,
  	"preview_text" varchar,
  	"preview_highlight" varchar
  );
  
  CREATE TABLE "landing_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_blocks_waitlist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_highlight" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"footnote" varchar NOT NULL,
  	"block_name" varchar
  );
  
  DROP TABLE "landing_features_items" CASCADE;
  DROP TABLE "landing_stats" CASCADE;
  DROP TABLE "landing_use_cases_items" CASCADE;
  DROP TABLE "landing_how_it_works_steps_preview_tags" CASCADE;
  DROP TABLE "landing_how_it_works_steps" CASCADE;
  ALTER TABLE "landing_blocks_features_items" ADD CONSTRAINT "landing_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_features" ADD CONSTRAINT "landing_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_stats_items" ADD CONSTRAINT "landing_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_stats" ADD CONSTRAINT "landing_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_use_cases_items" ADD CONSTRAINT "landing_blocks_use_cases_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_blocks_use_cases_items" ADD CONSTRAINT "landing_blocks_use_cases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_blocks_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_use_cases" ADD CONSTRAINT "landing_blocks_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_how_it_works_steps_preview_tags" ADD CONSTRAINT "landing_blocks_how_it_works_steps_preview_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_how_it_works_steps" ADD CONSTRAINT "landing_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_how_it_works" ADD CONSTRAINT "landing_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_blocks_waitlist" ADD CONSTRAINT "landing_blocks_waitlist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_blocks_features_items_order_idx" ON "landing_blocks_features_items" USING btree ("_order");
  CREATE INDEX "landing_blocks_features_items_parent_id_idx" ON "landing_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_features_order_idx" ON "landing_blocks_features" USING btree ("_order");
  CREATE INDEX "landing_blocks_features_parent_id_idx" ON "landing_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_features_path_idx" ON "landing_blocks_features" USING btree ("_path");
  CREATE INDEX "landing_blocks_stats_items_order_idx" ON "landing_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "landing_blocks_stats_items_parent_id_idx" ON "landing_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_stats_order_idx" ON "landing_blocks_stats" USING btree ("_order");
  CREATE INDEX "landing_blocks_stats_parent_id_idx" ON "landing_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_stats_path_idx" ON "landing_blocks_stats" USING btree ("_path");
  CREATE INDEX "landing_blocks_use_cases_items_order_idx" ON "landing_blocks_use_cases_items" USING btree ("_order");
  CREATE INDEX "landing_blocks_use_cases_items_parent_id_idx" ON "landing_blocks_use_cases_items" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_use_cases_items_image_idx" ON "landing_blocks_use_cases_items" USING btree ("image_id");
  CREATE INDEX "landing_blocks_use_cases_order_idx" ON "landing_blocks_use_cases" USING btree ("_order");
  CREATE INDEX "landing_blocks_use_cases_parent_id_idx" ON "landing_blocks_use_cases" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_use_cases_path_idx" ON "landing_blocks_use_cases" USING btree ("_path");
  CREATE INDEX "landing_blocks_how_it_works_steps_preview_tags_order_idx" ON "landing_blocks_how_it_works_steps_preview_tags" USING btree ("_order");
  CREATE INDEX "landing_blocks_how_it_works_steps_preview_tags_parent_id_idx" ON "landing_blocks_how_it_works_steps_preview_tags" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_how_it_works_steps_order_idx" ON "landing_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "landing_blocks_how_it_works_steps_parent_id_idx" ON "landing_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_how_it_works_order_idx" ON "landing_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "landing_blocks_how_it_works_parent_id_idx" ON "landing_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_how_it_works_path_idx" ON "landing_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "landing_blocks_waitlist_order_idx" ON "landing_blocks_waitlist" USING btree ("_order");
  CREATE INDEX "landing_blocks_waitlist_parent_id_idx" ON "landing_blocks_waitlist" USING btree ("_parent_id");
  CREATE INDEX "landing_blocks_waitlist_path_idx" ON "landing_blocks_waitlist" USING btree ("_path");
  ALTER TABLE "landing" DROP COLUMN "features_eyebrow";
  ALTER TABLE "landing" DROP COLUMN "features_title";
  ALTER TABLE "landing" DROP COLUMN "features_subtitle";
  ALTER TABLE "landing" DROP COLUMN "use_cases_eyebrow";
  ALTER TABLE "landing" DROP COLUMN "use_cases_title";
  ALTER TABLE "landing" DROP COLUMN "use_cases_subtitle";
  ALTER TABLE "landing" DROP COLUMN "how_it_works_eyebrow";
  ALTER TABLE "landing" DROP COLUMN "how_it_works_title";
  ALTER TABLE "landing" DROP COLUMN "how_it_works_subtitle";
  ALTER TABLE "landing" DROP COLUMN "waitlist_title";
  ALTER TABLE "landing" DROP COLUMN "waitlist_title_highlight";
  ALTER TABLE "landing" DROP COLUMN "waitlist_description";
  ALTER TABLE "landing" DROP COLUMN "waitlist_footnote";
  DROP TYPE "public"."enum_landing_features_items_icon";
  DROP TYPE "public"."enum_landing_how_it_works_steps_preview_style";`)

  const existingSections = await db.execute(sql`
    SELECT id FROM landing_blocks_features LIMIT 1
  `)

  if (!existingSections.rows.length) {
    await payload.updateGlobal({
      slug: 'landing',
      data: mapLandingContentToPayload(defaultLandingContent),
      context: { skipDeployHook: true },
    })
    console.log('Seeded default landing sections after schema migration.')
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_landing_features_items_icon" AS ENUM('research', 'document', 'memory', 'projects');
  CREATE TYPE "public"."enum_landing_how_it_works_steps_preview_style" AS ENUM('simple', 'tags', 'citation');
  CREATE TABLE "landing_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_landing_features_items_icon" NOT NULL
  );
  
  CREATE TABLE "landing_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_use_cases_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"caption" varchar NOT NULL
  );
  
  CREATE TABLE "landing_how_it_works_steps_preview_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "landing_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"preview_style" "enum_landing_how_it_works_steps_preview_style" DEFAULT 'simple' NOT NULL,
  	"preview_text" varchar,
  	"preview_highlight" varchar
  );
  
  DROP TABLE "landing_blocks_features_items" CASCADE;
  DROP TABLE "landing_blocks_features" CASCADE;
  DROP TABLE "landing_blocks_stats_items" CASCADE;
  DROP TABLE "landing_blocks_stats" CASCADE;
  DROP TABLE "landing_blocks_use_cases_items" CASCADE;
  DROP TABLE "landing_blocks_use_cases" CASCADE;
  DROP TABLE "landing_blocks_how_it_works_steps_preview_tags" CASCADE;
  DROP TABLE "landing_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "landing_blocks_how_it_works" CASCADE;
  DROP TABLE "landing_blocks_waitlist" CASCADE;
  ALTER TABLE "landing" ADD COLUMN "features_eyebrow" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "features_title" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "features_subtitle" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "use_cases_eyebrow" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "use_cases_title" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "use_cases_subtitle" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "how_it_works_eyebrow" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "how_it_works_title" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "how_it_works_subtitle" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "waitlist_title" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "waitlist_title_highlight" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "waitlist_description" varchar NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "waitlist_footnote" varchar NOT NULL;
  ALTER TABLE "landing_features_items" ADD CONSTRAINT "landing_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_stats" ADD CONSTRAINT "landing_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_use_cases_items" ADD CONSTRAINT "landing_use_cases_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_use_cases_items" ADD CONSTRAINT "landing_use_cases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_how_it_works_steps_preview_tags" ADD CONSTRAINT "landing_how_it_works_steps_preview_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_how_it_works_steps" ADD CONSTRAINT "landing_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_features_items_order_idx" ON "landing_features_items" USING btree ("_order");
  CREATE INDEX "landing_features_items_parent_id_idx" ON "landing_features_items" USING btree ("_parent_id");
  CREATE INDEX "landing_stats_order_idx" ON "landing_stats" USING btree ("_order");
  CREATE INDEX "landing_stats_parent_id_idx" ON "landing_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_use_cases_items_order_idx" ON "landing_use_cases_items" USING btree ("_order");
  CREATE INDEX "landing_use_cases_items_parent_id_idx" ON "landing_use_cases_items" USING btree ("_parent_id");
  CREATE INDEX "landing_use_cases_items_image_idx" ON "landing_use_cases_items" USING btree ("image_id");
  CREATE INDEX "landing_how_it_works_steps_preview_tags_order_idx" ON "landing_how_it_works_steps_preview_tags" USING btree ("_order");
  CREATE INDEX "landing_how_it_works_steps_preview_tags_parent_id_idx" ON "landing_how_it_works_steps_preview_tags" USING btree ("_parent_id");
  CREATE INDEX "landing_how_it_works_steps_order_idx" ON "landing_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "landing_how_it_works_steps_parent_id_idx" ON "landing_how_it_works_steps" USING btree ("_parent_id");
  DROP TYPE "public"."enum_landing_blocks_features_items_icon";
  DROP TYPE "public"."enum_landing_blocks_how_it_works_steps_preview_style";`)
}
