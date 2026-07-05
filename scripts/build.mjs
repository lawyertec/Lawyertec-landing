import { execSync } from "node:child_process";

const run = (command) => execSync(command, { stdio: "inherit" });

run("payload generate:importmap");

const databaseUri = process.env.DATABASE_URI?.trim();
const isCiCompile = process.env.CI === "true" && !process.env.VERCEL;

if (databaseUri) {
  run("payload migrate");
} else if (isCiCompile) {
  console.log("[build] Skipping payload migrate — no DATABASE_URI (CI compile check).");
} else if (process.env.NODE_ENV === "production") {
  console.error("[build] DATABASE_URI is required to run payload migrate in production.");
  process.exit(1);
} else {
  console.log("[build] Skipping payload migrate — DATABASE_URI not set.");
}

run("next build");
