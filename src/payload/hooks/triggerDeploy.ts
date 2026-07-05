import type { GlobalAfterChangeHook } from "payload";

export const triggerDeploy: GlobalAfterChangeHook = async ({ req }) => {
  // Skip during seed/scripts and local saves unless explicitly enabled.
  if (req.context?.skipDeployHook) return;

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  if (!hookUrl) return;

  try {
    const response = await fetch(hookUrl, { method: "POST" });
    if (!response.ok) {
      console.error(`[payload] Deploy hook failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("[payload] Failed to trigger Vercel deploy hook:", error);
  }
};
