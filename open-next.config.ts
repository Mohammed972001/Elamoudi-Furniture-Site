import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// The home page regenerates every 5 minutes (approved reviews): R2 keeps the generated
// pages and the Durable Object queue runs the background regeneration. No on-demand
// tag revalidation is used, so there is no tag cache.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
