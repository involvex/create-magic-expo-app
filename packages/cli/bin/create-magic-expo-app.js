#!/usr/bin/env bun
import { createProject, promptUser } from "../src/index";
import chalk from "chalk";

console.log(chalk.cyan.bold("\n✨ Welcome to create-magic-expo-app!\n"));

async function main() {
  try {
    const options = await promptUser();
    await createProject(options);
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red("\nError:"), error.message);
    }
    process.exit(1);
  }
}

main();
