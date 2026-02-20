import { mkdirSync, writeFileSync, existsSync } from "fs";
import type { TemplateFile } from "./templates";
import { join, dirname } from "path";

export interface ScaffoldOptions {
  /**
   * Target directory where the project will be created.
   */
  targetDir: string;
  /**
   * Template files to write.
   */
  files: TemplateFile[];
  /**
   * Whether to overwrite existing files.
   */
  overwrite?: boolean;
}

/**
 * Scaffold a project from template files.
 */
export function scaffoldProject(options: ScaffoldOptions): void {
  const { targetDir, files, overwrite = false } = options;

  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Write each file
  for (const file of files) {
    const filePath = join(targetDir, file.path);
    const fileDir = dirname(filePath);

    // Create directory if it doesn't exist
    if (!existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }

    // Check if file exists
    if (existsSync(filePath) && !overwrite) {
      console.log(`Skipping existing file: ${file.path}`);
      continue;
    }

    // Write file
    writeFileSync(filePath, file.content, "utf-8");
    console.log(`Created: ${file.path}`);
  }
}

/**
 * Verify scaffolded project structure.
 */
export function verifyScaffold(targetDir: string): boolean {
  const requiredFiles = [
    "package.json",
    "app.json",
    "tsconfig.json",
    "babel.config.js",
    "src/app/_layout.tsx",
    "src/app/index.tsx",
  ];

  for (const file of requiredFiles) {
    if (!existsSync(join(targetDir, file))) {
      console.error(`Missing required file: ${file}`);
      return false;
    }
  }

  return true;
}
