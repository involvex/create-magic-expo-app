#!/usr/bin/env bun
import { createProject, promptUser } from "../src/index";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("create-magic-expo-app")
  .description("CLI tool for scaffolding professional Expo applications")
  .version("1.0.0")
  .option("-n, --name <name>", "Project name", "my-expo-app")
  .option(
    "--navigation <type>",
    "Navigation preset (tabs|stack|drawer|none)",
    "tabs",
  )
  .option("--no-theming", "Exclude theme system")
  .option("--no-ui-components", "Exclude UI components")
  .option("-a, --author <name>", "Author name")
  .option("-d, --description <text>", "Project description")
  .option("--skip-install", "Skip installing dependencies")
  .option("--skip-git", "Skip initializing git")
  .option("-v, --verbose", "Enable verbose logging");

async function main() {
  program.parse(process.argv);
  const opts = program.opts();

  if (opts.verbose) {
    console.log("[DEBUG] CLI options:", opts);
    console.log("[DEBUG] Process.argv:", process.argv);
  }

  try {
    let options;

    if (process.argv.length > 2) {
      options = {
        projectName: opts.name,
        navigation: opts.navigation,
        theming: opts.theming,
        uiComponents: opts.uiComponents,
        author: opts.author,
        description: opts.description,
        skipInstall: opts.skipInstall,
        skipGit: opts.skipGit,
      };
      console.log(
        chalk.cyan.bold("\n✨ Creating project with CLI options...\n"),
      );
      if (opts.verbose) {
        console.log("[DEBUG] Using options:", options);
      }
    } else {
      console.log(chalk.cyan.bold("\n✨ Welcome to create-magic-expo-app!\n"));
      options = await promptUser();
    }

    await createProject(options);
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red("\nError:"), error.message);
    }
    process.exit(1);
  }
}

main();
