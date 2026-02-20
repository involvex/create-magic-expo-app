/**
 * Magic Expo CLI
 *
 * Command-line interface for creating new Expo projects with Magic Expo presets.
 */

export { createProject } from "./create";
export { promptUser, promptAdvanced } from "./prompts";
export type { CreateOptions } from "./prompts";
export { getHelpText, parseCliArgs, resolveCreateOptions } from "./args";
export type { CliArgs } from "./args";
