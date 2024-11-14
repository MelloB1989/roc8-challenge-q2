import {
  pgTable,
  json,
  varchar,
  timestamp,
  unique,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().unique(),
  name: varchar("name").default(""),
  email: varchar("email").unique(),
  password: varchar("password"),
});

export const data = pgTable("data", {
  rid: varchar("rid").primaryKey().unique(),
  date: timestamp("timestamp", { mode: "string" }).default(sql`now()`),
  age: integer("age"), // 0 for 15-25 and 1 for >25, assuming age is in this range
  gender: integer("gender"), // 0 for female and 1 for male
  feature_a: integer("feature_a"),
  feature_b: integer("feature_b"),
  feature_c: integer("feature_c"),
  feature_d: integer("feature_d"),
  feature_e: integer("feature_e"),
  feature_f: integer("feature_f"),
});

export const views = pgTable("views", {
  vid: varchar("vid").primaryKey().unique(),
  filters: json("filters").default({
    ageFilter: null,
    dateFilter: null,
    genderFilter: null,
  }),
  created_by: varchar("created_by").references(() => users.id),
  created_at: timestamp("created_at").default(sql`now()`),
});
