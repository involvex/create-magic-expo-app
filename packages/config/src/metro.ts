// Re-export uniwind's Metro config generator
export { withUniwindConfig } from "uniwind/metro";

interface MetroConfigOptions {
  cssEntryFile?: string;
  dtsFile?: string;
  watchFolders?: string[];
}

/**
 * Options for configuring Uniwind with Metro.
 * Use this with uniwind's `withUniwindConfig` function.
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

export default { withUniwindConfig, getUniwindOptions };
