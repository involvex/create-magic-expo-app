import {
  getTemplate,
  scaffoldProject,
  verifyScaffold,
} from "@magic-expo/templates";
import type { CreateOptions } from "./prompts";
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { cwd } from "process";
import { join } from "path";
import chalk from "chalk";

export async function createProject(options: CreateOptions): Promise<void> {
  const { projectName } = options;

  console.log(chalk.cyan(`\nCreating Expo project: ${projectName}\n`));

  const targetDir = join(cwd(), projectName);

  // Check if directory exists
  try {
    mkdirSync(targetDir, { recursive: false });
  } catch {
    throw new Error(`Directory ${projectName} already exists`);
  }

  try {
    const files = getTemplate({
      projectName,
      template: options.template,
      navigation: options.navigation,
      theming: options.theming,
      uiComponents: options.uiComponents,
      author: options.author,
      description: options.description,
      buildProvider: options.buildProvider,
    });

    scaffoldProject({
      targetDir,
      files,
    });

    if (!verifyScaffold(targetDir)) {
      throw new Error("Template verification failed after scaffolding");
    }

    console.log(chalk.green("\n✓ Project scaffolded successfully\n"));

    if (!options.skipInstall) {
      console.log(chalk.cyan("Installing dependencies...\n"));
      execSync("bun install", { cwd: targetDir, stdio: "inherit" });
      console.log(chalk.green("\n✓ Dependencies installed\n"));
    }

    if (!options.skipGit) {
      console.log(chalk.cyan("Initializing git...\n"));
      execSync("git init", { cwd: targetDir, stdio: "inherit" });
      console.log(chalk.green("\n✓ Git initialized\n"));
    }

    printNextSteps(projectName, options);
  } catch (error) {
    console.error(chalk.red("\n✗ Error creating project:"), error);
    throw error;
  }
}

function printNextSteps(projectName: string, options: CreateOptions): void {
  console.log(chalk.bold("\nNext steps:\n"));
  console.log(`  ${chalk.cyan(`cd ${projectName}`)}`);

  if (options.skipInstall) {
    console.log(`  ${chalk.cyan("bun install")}`);
  }

  console.log(`  ${chalk.cyan("bun run start")}`);
  console.log(`  ${chalk.cyan("bun run android")}`);
  console.log(`\nTo build for production:\n`);
  console.log(`  ${chalk.cyan("bun run build:local")}`);
  if (options.buildProvider === "eas") {
    console.log(`  ${chalk.cyan("bun run build:eas")}`);
  }

  console.log(chalk.bold("\nHappy coding! 🎉\n"));
}
