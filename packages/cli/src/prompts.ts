import type { BuildProvider, TemplateName } from "@magic-expo/templates";
import { Templates } from "@magic-expo/templates";
import type { PromptObject } from "prompts";
import prompts from "prompts";

export interface CreateOptions {
  projectName: string;
  template?: TemplateName;
  navigation?: "tabs" | "stack" | "drawer" | "none";
  theming?: boolean;
  uiComponents?: boolean;
  author?: string;
  description?: string;
  buildProvider?: BuildProvider;
  skipInstall?: boolean;
  skipGit?: boolean;
  features?: string[];
}

export async function promptUser(
  initialProjectName?: string,
): Promise<CreateOptions> {
  const questions: PromptObject<string>[] = [
    {
      type: "text",
      name: "projectName",
      message: "What is your project named?",
      initial: initialProjectName || "my-expo-app",
      validate: (name: string) => {
        if (!name) return "Project name is required";
        if (!/^[a-z0-9-]+$/.test(name)) {
          return "Project name can only contain lowercase letters, numbers, and hyphens";
        }
        return true;
      },
    },
    {
      type: "select",
      name: "template",
      message: "Which template tier would you like?",
      choices: [
        { title: "Default - modern app starter", value: Templates.DEFAULT },
        {
          title: "Showcase - full feature demo app",
          value: Templates.SHOWCASE,
        },
        { title: "Minimum - fastest setup", value: Templates.MINIMUM },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "navigation",
      message: "Which navigation preset would you like?",
      choices: [
        { title: "Tabs - Bottom tab navigation", value: "tabs" },
        { title: "Stack - Header-based navigation", value: "stack" },
        { title: "Drawer - Side drawer navigation", value: "drawer" },
        { title: "None - No navigation preset", value: "none" },
      ],
      initial: 0,
    },
    {
      type: "confirm",
      name: "theming",
      message: "Include adaptive light/dark theming?",
      initial: true,
    },
    {
      type: "confirm",
      name: "uiComponents",
      message: "Include generated UI components?",
      initial: true,
    },
    {
      type: "select",
      name: "buildProvider",
      message: "Choose build workflow",
      choices: [
        { title: "Local-first (expo run:android)", value: "local" },
        { title: "Optional EAS support", value: "eas" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "author",
      message: "Author name (optional)",
      initial: "",
    },
    {
      type: "text",
      name: "description",
      message: "Project description (optional)",
      initial: "",
    },
    {
      type: "confirm",
      name: "skipInstall",
      message: "Skip installing dependencies?",
      initial: false,
    },
    {
      type: "confirm",
      name: "skipGit",
      message: "Skip initializing git?",
      initial: false,
    },
  ];

  const response = await prompts(questions);

  if (!response.projectName) {
    throw new Error("Project name is required");
  }

  return {
    projectName: response.projectName,
    template: response.template as CreateOptions["template"],
    navigation: response.navigation as CreateOptions["navigation"],
    theming: response.theming,
    uiComponents: response.uiComponents,
    author: response.author,
    description: response.description,
    buildProvider: response.buildProvider as CreateOptions["buildProvider"],
    skipInstall: response.skipInstall,
    skipGit: response.skipGit,
  };
}

export async function promptAdvanced(): Promise<Partial<CreateOptions>> {
  const response = await prompts([
    {
      type: "multiselect",
      name: "features",
      message: "Select additional features:",
      choices: [
        { title: "Showcase app screens", value: "showcase" },
        {
          title: "Local build commands (expo run:android)",
          value: "local-build",
        },
        { title: "Optional EAS script", value: "eas-optional" },
        { title: "Example screens and components", value: "examples" },
        {
          title: "Testing setup (Jest + React Native Testing Library)",
          value: "testing",
        },
      ],
    },
  ]);

  return response as Partial<CreateOptions>;
}
