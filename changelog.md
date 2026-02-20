#  (2026-02-20)


### Build System

* downgrade Expo SDK from 56 canary to 55 preview ([e22568e](https://github.com/involvex/create-magic-expo-app/commit/e22568e726236bcbefeb4bf3f4dd8031cb95b079))


### Features

* **app:** implement auth, theme, and testing setup ([614577e](https://github.com/involvex/create-magic-expo-app/commit/614577e00ddcb5151a93a5bdeb158632900a8dfc))
* **app:** implement tab navigation and component library ([dfbc56f](https://github.com/involvex/create-magic-expo-app/commit/dfbc56f250b064d49c1ad107184b37be2c842f88))
* **app:** switch to managed Expo prebuild workflow ([624e61d](https://github.com/involvex/create-magic-expo-app/commit/624e61d6d2e6458aa3313da03b9cf4514faa1e46))


### BREAKING CHANGES

* **app:** The native Android project files have been removed.
The app now uses Expo's managed workflow with prebuild. Native code
is generated automatically and should not be committed. Projects
depending on the committed native files will need to migrate to the
managed workflow and run `expo prebuild` to generate native code.
* **app:** The app navigation structure has been completely
refactored from a single-page layout to a tab-based system. The old
src/app/index.tsx has been replaced with a tab layout in src/app/(tabs)/.
Any hardcoded navigation or deep links to the previous route structure
will need to be updated.
* This downgrades the Expo SDK from 56 canary to 55 preview. Any code written against SDK 56 canary APIs may need adjustment. The project now targets Expo SDK 55 preview, which is compatible with Expo Go 55.



