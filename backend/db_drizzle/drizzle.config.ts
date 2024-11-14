import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "localhost", //"192.168.29.73",
    user: "admin", //"mellob",
    password: "Mellob198978SadcDWFewd",
    database: "roc8",
    ssl: false,
  },
} satisfies Config;
