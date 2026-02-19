# (2026-02-19)

### Features

- add navigation and theming packages ([aa8fea2](https://github.com/involvex/create-magic-expo-app/commit/aa8fea2ead72982c9892788d399ab518c59150f2))
- **app:** add Android prerequisites and update dependencies ([53b6818](https://github.com/involvex/create-magic-expo-app/commit/53b6818a3e30fc50e60c1ec5cc1f7983ae494f21))
- **app:** upgrade dependencies to Expo 56, React 19, RN 0.84 ([60f74ec](https://github.com/involvex/create-magic-expo-app/commit/60f74ec2f23d00f9639215db24841bfb6ce6fe78))
- upgrade to Expo 56 and React Native 0.84 ([d7d2b40](https://github.com/involvex/create-magic-expo-app/commit/d7d2b40b61f637f86cc2b412c56ebb15457a1536))

### BREAKING CHANGES

- `withUniwindConfig` is no longer re-exported from
  @magic-expo/config. Import it directly from 'uniwind/metro' and use
  `getUniwindOptions` from @magic-expo/config separately.
- Upgrading to Expo 56 and React Native 0.84 may introduce
  breaking API changes. Please review the official migration guides before
  updating.
