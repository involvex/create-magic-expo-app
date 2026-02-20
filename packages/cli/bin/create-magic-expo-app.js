#!/usr/bin/env bun
import {
  createProject,
  getHelpText,
  parseCliArgs,
  promptUser,
  resolveCreateOptions,
} from "../src/index";
import chalk from "chalk";

console.log(chalk.cyan.bold("\n✨ Welcome to create-magic-expo-app!\n"));

async function main() {
  try {
    const cliArgs = parseCliArgs(process.argv.slice(2));

    if (cliArgs.help) {
      console.log(getHelpText());
      return;
    }

    const options = cliArgs.yes
      ? resolveCreateOptions(cliArgs)
      : resolveCreateOptions(cliArgs, await promptUser(cliArgs.projectName));

    await createProject(options);
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red("\nError:"), error.message);
    }
    process.exit(1);
  }
}

main();
