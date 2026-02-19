import type { PromptObject } from "prompts";
import prompts from "prompts";

export interface CreateOptions {
  projectName: string;
  navigation?: "tabs" | "stack" | "drawer" | "none";
  theming?: boolean;
  uiComponents?: boolean;
  author?: string;
  description?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  features?: string[];
}

const questions: PromptObject<string>[] = [
  {
    type: "text",
    name: "projectName",
    message: "What is your project named?",
    initial: "my-expo-app",
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
    message: "Would you like to include the theme system?",
    initial: true,
  },
  {
    type: "confirm",
    name: "uiComponents",
    message: "Would you like to include UI components?",
    initial: true,
  },
  {
    type: "text",
    name: "author",
    message: "What is your name?",
    initial: "",
  },
  {
    type: "text",
    name: "description",
    message: "Project description?",
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

/**
 * Prompt the user for project options.
 */
export async function promptUser(): Promise<CreateOptions> {
  const response = await prompts(questions);

  if (!response.projectName) {
    throw new Error("Project name is required");
  }

  return {
    projectName: response.projectName,
    navigation: response.navigation as CreateOptions["navigation"],
    theming: response.theming,
    uiComponents: response.uiComponents,
    author: response.author,
    description: response.description,
    skipInstall: response.skipInstall,
    skipGit: response.skipGit,
  };
}

/**
 * Prompt for advanced options.
 */
export async function promptAdvanced(): Promise<Partial<CreateOptions>> {
  const response = await prompts([
    {
      type: "multiselect",
      name: "features",
      message: "Select additional features:",
      choices: [
        { title: "EAS Build configuration", value: "eas" },
        { title: "Local build configuration (expo prebuild)", value: "local" },
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
