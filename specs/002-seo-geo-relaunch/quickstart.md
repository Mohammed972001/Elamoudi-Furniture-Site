# Quickstart: one weekly release

1. **Check locks.** Read `C:/Users/mohammed/.claude/scripts/seo-log/elamoudi.md`. Do not touch the
   title or description of any page whose lock date is in the future.
2. **Branch.** Work on one branch per release, `relaunch/Rn-<topic>`.
3. **Gates**, in order:
   ```bash
   npx tsc --noEmit && npm run lint && npm run build
   ```
4. **Check the build output** for the change. For example, count the FAQ blocks:
   ```bash
   grep -o '"@type":"FAQPage"' .open-next/assets/products/parket.html | wc -l
   ```
   The exact path depends on the OpenNext output; grep the built HTML for the page.
5. **Dupcheck** any new or rewritten text:
   ```bash
   node C:/Users/mohammed/.claude/scripts/dupcheck.mjs elamoudi
   ```
   Every page must be under 30%.
6. **Ship.** Merge to `main` and push. GitHub Actions deploys to Cloudflare in about 1 minute.
   Confirm it with:
   ```bash
   gh run list --limit 1
   ```
7. **Check live.** `curl` the changed URLs and confirm the new text and JSON-LD. Run Google's
   rich-results test on one product page.
8. **Notify.** Ping IndexNow for the changed URLs. List up to 10 URLs for the user to request
   indexing by hand in Search Console.
9. **Log** the release in `seo-log/elamoudi.md` with the date, the pages, why, the new lock dates,
   the review date and the commit.
10. **Commit message** says why. It ends with:
    `Assisted-by: Claude (Anthropic) — review, planning & commit message (not code authorship)`
