import type { BuildProvider, TemplateName } from "@magic-expo/templates";
import { Templates } from "@magic-expo/templates";
import type { CreateOptions } from "./prompts";

const NAV_OPTIONS = new Set(["tabs", "stack", "drawer", "none"]);
const TEMPLATE_OPTIONS = new Set(Object.values(Templates));
const BUILD_PROVIDER_OPTIONS = new Set(["local", "eas"]);

export interface CliArgs {
  projectName?: string;
  yes: boolean;
  help: boolean;
  template?: TemplateName;
  navigation?: CreateOptions["navigation"];
  theming?: boolean;
  uiComponents?: boolean;
  buildProvider?: BuildProvider;
  skipInstall?: boolean;
  skipGit?: boolean;
}

export function parseCliArgs(argv: string[]): CliArgs {
  const parsed: CliArgs = {
    yes: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) continue;

    if (!arg.startsWith("-")) {
      parsed.projectName ??= arg;
      continue;
    }

    switch (arg) {
      case "-h":
      case "--help":
        parsed.help = true;
        break;
      case "-y":
      case "--yes":
        parsed.yes = true;
        break;
      case "--template": {
        const value = argv[i + 1];
        if (!value || !TEMPLATE_OPTIONS.has(value as TemplateName)) {
          throw new Error(
            "Invalid --template value. Use minimum, default, or showcase.",
          );
        }
        parsed.template = value as TemplateName;
        i += 1;
        break;
      }
      case "--navigation": {
        const value = argv[i + 1];
        if (!value || !NAV_OPTIONS.has(value)) {
          throw new Error(
            "Invalid --navigation value. Use tabs, stack, drawer, or none.",
          );
        }
        parsed.navigation = value as CreateOptions["navigation"];
        i += 1;
        break;
      }
      case "--build-provider": {
        const value = argv[i + 1];
        if (!value || !BUILD_PROVIDER_OPTIONS.has(value)) {
          throw new Error("Invalid --build-provider value. Use local or eas.");
        }
        parsed.buildProvider = value as BuildProvider;
        i += 1;
        break;
      }
      case "--theming":
        parsed.theming = true;
        break;
      case "--no-theming":
        parsed.theming = false;
        break;
      case "--ui-components":
        parsed.uiComponents = true;
        break;
      case "--no-ui-components":
        parsed.uiComponents = false;
        break;
      case "--skip-install":
        parsed.skipInstall = true;
        break;
      case "--skip-git":
        parsed.skipGit = true;
        break;
      default:
        throw new Error(`Unknown flag: ${arg}`);
    }
  }

  return parsed;
}

export function resolveCreateOptions(
  cliArgs: CliArgs,
  promptedOptions?: Partial<CreateOptions>,
): CreateOptions {
  const merged: CreateOptions = {
    projectName:
      cliArgs.projectName ?? promptedOptions?.projectName ?? "my-expo-app",
    template: cliArgs.yes
      ? Templates.MINIMUM
      : (cliArgs.template ?? promptedOptions?.template ?? Templates.DEFAULT),
    navigation:
      cliArgs.navigation ?? promptedOptions?.navigation ?? ("tabs" as const),
    theming: cliArgs.theming ?? promptedOptions?.theming ?? true,
    uiComponents: cliArgs.uiComponents ?? promptedOptions?.uiComponents ?? true,
    author: promptedOptions?.author,
    description: promptedOptions?.description,
    buildProvider:
      cliArgs.buildProvider ?? promptedOptions?.buildProvider ?? "local",
    skipInstall: cliArgs.skipInstall ?? promptedOptions?.skipInstall ?? false,
    skipGit: cliArgs.skipGit ?? promptedOptions?.skipGit ?? false,
  };

  if (merged.template === Templates.MINIMUM) {
    merged.navigation = "none";
    merged.theming = false;
    merged.uiComponents = false;
    merged.buildProvider = "local";
  }

  if (merged.template === Templates.SHOWCASE) {
    merged.theming = true;
    merged.uiComponents = true;
    if (merged.navigation === "none") {
      merged.navigation = "tabs";
    }
  }

  return merged;
}

export function getHelpText(): string {
  return `Usage: create-magic-expo-app [project-name] [options]

Options:
  -y, --yes                     Skip prompts and use minimum template
  --template <name>             minimum | default | showcase
  --navigation <preset>         tabs | stack | drawer | none
  --build-provider <provider>   local | eas
  --theming / --no-theming      Enable or disable theming
  --ui-components / --no-ui-components
                                Enable or disable generated UI components
  --skip-install                Skip dependency installation
  --skip-git                    Skip git initialization
  -h, --help                    Show this help message
`;
}
