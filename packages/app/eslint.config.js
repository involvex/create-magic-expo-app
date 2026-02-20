// This file prevents Expo CLI from scanning for template configs
// The app package inherits ESLint config from the root

export default [
  {
    ignores: ["**/.expo/**", "**/node_modules/**", "**/dist/**"],
  },
];
