import type { CompilerOptions } from "typescript";

/**
 * Default TypeScript configuration for Magic Expo projects.
 * Use this in your tsconfig.json or extend it programmatically.
 */
export const typescriptConfig: CompilerOptions = {
  // Environment setup & latest features
  lib: ["ESNext"],
  target: "ESNext" as never,
  module: "Preserve" as never,
  moduleDetection: "force" as never,
  jsx: "react-jsx" as never,
  allowJs: true,

  // Bundler mode
  moduleResolution: "bundler" as never,
  allowImportingTsExtensions: true,
  verbatimModuleSyntax: true,
  noEmit: true,

  // Best practices
  strict: true,
  skipLibCheck: true,
  noFallthroughCasesInSwitch: true,
  noUncheckedIndexedAccess: true,
  noImplicitOverride: true,

  // Some stricter flags (disabled by default)
  noUnusedLocals: false,
  noUnusedParameters: false,
  noPropertyAccessFromIndexSignature: false,
};

/**
 * Get a complete tsconfig object for Magic Expo projects.
 */
export function getTsconfig(
  customOptions?: Partial<CompilerOptions>,
): Record<string, unknown> {
  return {
    compilerOptions: {
      ...typescriptConfig,
      ...customOptions,
    },
  };
}
