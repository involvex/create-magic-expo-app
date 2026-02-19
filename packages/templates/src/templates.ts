import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import ejs from "ejs";

export interface TemplateOptions {
  projectName: string;
  /**
   * Navigation preset to use.
   */
  navigation?: "tabs" | "stack" | "drawer" | "none";
  /**
   * Whether to include theming.
   */
  theming?: boolean;
  /**
   * Whether to include UI components.
   */
  uiComponents?: boolean;
  /**
   * Author name.
   */
  author?: string;
  /**
   * Project description.
   */
  description?: string;
}

export interface TemplateFile {
  path: string;
  content: string;
}

/**
 * Available templates.
 */
export const Templates = {
  BASE: "base",
  TABS: "tabs",
  STACK: "stack",
  DRAWER: "drawer",
} as const;

export type TemplateName = (typeof Templates)[keyof typeof Templates];

/**
 * Get all template files from a directory.
 */
function getTemplateFiles(dir: string, basePath = ""): TemplateFile[] {
  const files: TemplateFile[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const relativePath = join(basePath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getTemplateFiles(fullPath, relativePath));
    } else {
      const content = readFileSync(fullPath, "utf-8");
      files.push({
        path: relativePath,
        content,
      });
    }
  }

  return files;
}

/**
 * Render template files with EJS.
 */
export function renderTemplate(
  files: TemplateFile[],
  options: TemplateOptions,
): TemplateFile[] {
  return files.map(file => ({
    ...file,
    content: ejs.render(file.content, options, { strict: true }),
  }));
}

/**
 * Get base template files.
 */
export function getBaseTemplate(): TemplateFile[] {
  const templateDir = join(__dirname, "../templates/base");
  return getTemplateFiles(templateDir);
}

/**
 * Get navigation template files.
 */
export function getNavigationTemplate(
  navigation: TemplateOptions["navigation"],
): TemplateFile[] {
  if (!navigation || navigation === "none") return [];

  const templateDir = join(__dirname, `../templates/${navigation}`);
  return getTemplateFiles(templateDir);
}

/**
 * Get complete template based on options.
 */
export function getTemplate(options: TemplateOptions): TemplateFile[] {
  const baseFiles = getBaseTemplate();
  const navFiles = getNavigationTemplate(options.navigation);

  return renderTemplate([...baseFiles, ...navFiles], options);
}
