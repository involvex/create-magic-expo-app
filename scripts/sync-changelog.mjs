import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

const rootChangelog = resolve("CHANGELOG.md");
const docsChangelog = resolve("docs", "changelog.md");

copyFileSync(rootChangelog, docsChangelog);
console.log("Synced CHANGELOG.md -> docs/changelog.md");
