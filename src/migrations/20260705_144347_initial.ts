import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_landing_features_items_icon" AS ENUM('research', 'document', 'memory', 'projects');
  CREATE TYPE "public"."enum_landing_how_it_works_steps_preview_style" AS ENUM('simple', 'tags', 'citation');
  CREATE TYPE "public"."enum_landing_chat_demo_tools_icon" AS ENUM('search', 'calc', 'brain');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_marquee_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
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
  	"image" varchar NOT NULL,
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
  
  CREATE TABLE "landing_chat_demo_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_landing_chat_demo_tools_icon" NOT NULL
  );
  
  CREATE TABLE "landing_chat_demo_highlight_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL
  );
  
  CREATE TABLE "landing_seo_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  CREATE TABLE "landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nav_functions_label" varchar NOT NULL,
  	"nav_how_it_works_label" varchar NOT NULL,
  	"nav_waitlist_cta" varchar NOT NULL,
  	"hero_badge" varchar NOT NULL,
  	"hero_title_line1" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"marquee_heading" varchar NOT NULL,
  	"features_eyebrow" varchar NOT NULL,
  	"features_title" varchar NOT NULL,
  	"features_subtitle" varchar NOT NULL,
  	"use_cases_eyebrow" varchar NOT NULL,
  	"use_cases_title" varchar NOT NULL,
  	"use_cases_subtitle" varchar NOT NULL,
  	"how_it_works_eyebrow" varchar NOT NULL,
  	"how_it_works_title" varchar NOT NULL,
  	"how_it_works_subtitle" varchar NOT NULL,
  	"waitlist_title" varchar NOT NULL,
  	"waitlist_title_highlight" varchar NOT NULL,
  	"waitlist_description" varchar NOT NULL,
  	"waitlist_footnote" varchar NOT NULL,
  	"chat_demo_project_title" varchar NOT NULL,
  	"chat_demo_question" varchar NOT NULL,
  	"chat_demo_answer" varchar NOT NULL,
  	"chat_demo_footer_note" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_marquee_sources" ADD CONSTRAINT "landing_marquee_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_features_items" ADD CONSTRAINT "landing_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_stats" ADD CONSTRAINT "landing_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_use_cases_items" ADD CONSTRAINT "landing_use_cases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_how_it_works_steps_preview_tags" ADD CONSTRAINT "landing_how_it_works_steps_preview_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_how_it_works_steps" ADD CONSTRAINT "landing_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_chat_demo_tools" ADD CONSTRAINT "landing_chat_demo_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_chat_demo_highlight_terms" ADD CONSTRAINT "landing_chat_demo_highlight_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_seo_keywords" ADD CONSTRAINT "landing_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_marquee_sources_order_idx" ON "landing_marquee_sources" USING btree ("_order");
  CREATE INDEX "landing_marquee_sources_parent_id_idx" ON "landing_marquee_sources" USING btree ("_parent_id");
  CREATE INDEX "landing_features_items_order_idx" ON "landing_features_items" USING btree ("_order");
  CREATE INDEX "landing_features_items_parent_id_idx" ON "landing_features_items" USING btree ("_parent_id");
  CREATE INDEX "landing_stats_order_idx" ON "landing_stats" USING btree ("_order");
  CREATE INDEX "landing_stats_parent_id_idx" ON "landing_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_use_cases_items_order_idx" ON "landing_use_cases_items" USING btree ("_order");
  CREATE INDEX "landing_use_cases_items_parent_id_idx" ON "landing_use_cases_items" USING btree ("_parent_id");
  CREATE INDEX "landing_how_it_works_steps_preview_tags_order_idx" ON "landing_how_it_works_steps_preview_tags" USING btree ("_order");
  CREATE INDEX "landing_how_it_works_steps_preview_tags_parent_id_idx" ON "landing_how_it_works_steps_preview_tags" USING btree ("_parent_id");
  CREATE INDEX "landing_how_it_works_steps_order_idx" ON "landing_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "landing_how_it_works_steps_parent_id_idx" ON "landing_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_chat_demo_tools_order_idx" ON "landing_chat_demo_tools" USING btree ("_order");
  CREATE INDEX "landing_chat_demo_tools_parent_id_idx" ON "landing_chat_demo_tools" USING btree ("_parent_id");
  CREATE INDEX "landing_chat_demo_highlight_terms_order_idx" ON "landing_chat_demo_highlight_terms" USING btree ("_order");
  CREATE INDEX "landing_chat_demo_highlight_terms_parent_id_idx" ON "landing_chat_demo_highlight_terms" USING btree ("_parent_id");
  CREATE INDEX "landing_seo_keywords_order_idx" ON "landing_seo_keywords" USING btree ("_order");
  CREATE INDEX "landing_seo_keywords_parent_id_idx" ON "landing_seo_keywords" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_marquee_sources" CASCADE;
  DROP TABLE "landing_features_items" CASCADE;
  DROP TABLE "landing_stats" CASCADE;
  DROP TABLE "landing_use_cases_items" CASCADE;
  DROP TABLE "landing_how_it_works_steps_preview_tags" CASCADE;
  DROP TABLE "landing_how_it_works_steps" CASCADE;
  DROP TABLE "landing_chat_demo_tools" CASCADE;
  DROP TABLE "landing_chat_demo_highlight_terms" CASCADE;
  DROP TABLE "landing_seo_keywords" CASCADE;
  DROP TABLE "landing" CASCADE;
  DROP TYPE "public"."enum_landing_features_items_icon";
  DROP TYPE "public"."enum_landing_how_it_works_steps_preview_style";
  DROP TYPE "public"."enum_landing_chat_demo_tools_icon";`)
}
