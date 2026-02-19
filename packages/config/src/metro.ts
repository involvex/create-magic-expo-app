interface MetroConfigOptions {
  cssEntryFile?: string;
  dtsFile?: string;
  watchFolders?: string[];
}

/**
 * Options for configuring Uniwind with Metro.
 */
export type { MetroConfigOptions };

/**
 * Get Uniwind Metro configuration options.
 *
 * @param options - Configuration options
 * @param options.cssEntryFile - Path to global.css file (default: "./src/global.css")
 * @param options.dtsFile - Path to uniwind types file (default: "./src/uniwind-types.d.ts")
 * @returns Uniwind configuration object
 */
export function getUniwindOptions(options: MetroConfigOptions = {}) {
  const {
    cssEntryFile = "./src/global.css",
    dtsFile = "./src/uniwind-types.d.ts",
  } = options;

  return {
    cssEntryFile,
    dtsFile,
  };
}

/**
 * Helper function to apply Uniwind configuration to a Metro config.
 * This is a convenience wrapper around uniwind's withUniwindConfig.
 *
 * Usage in your metro.config.js:
 * ```js
 * import { withUniwindConfig } from 'uniwind/metro';
 * import { getDefaultConfig } from 'expo/metro-config';
 * import { getUniwindOptions } from '@magic-expo/config';
 *
 * const config = getDefaultConfig(__dirname);
 * export default withUniwindConfig(config, getUniwindOptions());
 * ```
 */
export function withUniwindConfig() {
  // This is a placeholder - the actual implementation uses uniwind's withUniwindConfig
  // The consumer should use the pattern shown in the JSDoc above
  throw new Error(
    "withUniwindConfig is not directly importable from @magic-expo/config. " +
      "Please use: `import { withUniwindConfig } from 'uniwind/metro'` " +
      "and `import { getUniwindOptions } from '@magic-expo/config'`",
  );
}

export default { getUniwindOptions, withUniwindConfig };
