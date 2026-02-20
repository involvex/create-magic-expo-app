/**
 * Magic Expo Templates
 *
 * Project templates for scaffolding new Expo apps with create-magic-expo-app CLI.
 */

export {
  getBaseTemplate,
  getNavigationTemplate,
  getTemplate,
  renderTemplate,
  Templates,
} from "./templates";
export type {
  BuildProvider,
  ResolvedTemplateOptions,
  TemplateFile,
  TemplateName,
  TemplateOptions,
} from "./templates";

export { scaffoldProject, verifyScaffold } from "./scaffold";
export type { ScaffoldOptions } from "./scaffold";
