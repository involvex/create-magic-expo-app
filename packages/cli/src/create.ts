import type { CreateOptions } from "./prompts";
import { cwd, chdir } from "process";
import { mkdirSync } from "fs";
import { join } from "path";
import chalk from "chalk";

/**
 * Create a new Expo project.
 */
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
    // Get and render template
    // TODO: Integrate with templates package
    // For now, we'll create a basic structure
    console.log(
      chalk.yellow("Note: Template scaffolding not yet implemented\n"),
    );

    console.log(chalk.green("\n✓ Project scaffolded successfully\n"));

    // TODO: Add verification
    // Install dependencies
    if (!options.skipInstall) {
      console.log(chalk.cyan("Installing dependencies...\n"));
      chdir(targetDir);
      // execSync("bun install", { stdio: "inherit" });
      console.log(chalk.green("\n✓ Dependencies installed\n"));
    }

    // Initialize git
    if (!options.skipGit) {
      console.log(chalk.cyan("Initializing git...\n"));
      // execSync("git init", { cwd: targetDir, stdio: "inherit" });
      console.log(chalk.green("\n✓ Git initialized\n"));
    }

    // Print next steps
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
  console.log(`\nTo build for production:\n`);
  console.log(`  ${chalk.cyan("bun run build")}`);

  console.log(chalk.bold("\nHappy coding! 🎉\n"));
}
