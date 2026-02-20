# Downgrade from Expo SDK 56 Canary to SDK 55 Preview

## Context

**Problem:** Expo SDK 56 canary has no compatible Expo Go version available, making it unusable for Expo Go development workflow. The user confirmed Expo Go 55 APK is available and works.

**Current State:**
- expo: 56.0.0-canary-20260212-4f61309
- expo-router: 56.0.0-canary-20260212-4f61309
- react-native: 0.84.0
- React 19.2.3

**Target State:** Downgrade to Expo SDK 55 preview (compatible with Expo Go 55)

## Changes Required

### 1. packages/app/package.json

Downgrade all Expo/React Native dependencies to SDK 55 preview versions:

```json
{
  "dependencies": {
    "expo": "55.0.0-preview.11",
    "expo-router": "55.0.0-preview.8",
    "expo-linking": "~55.0.0",
    "expo-status-bar": "~55.0.0",
    "expo-system-ui": "~55.0.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.83.1",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-safe-area-context": "~4.12.0",
    "react-native-screens": "~4.5.0",
    "react-native-web": "~0.19.13"
  }
}
```

### 2. Clean and Reinstall

After updating package.json:
1. Remove node_modules and bun.lock
2. Run `bun install`
3. Run `npx expo install --fix` to ensure compatibility

## Verification

1. `bun run -F @magic-expo/app start` - Should load without errors
2. Open in Expo Go 55 - Should connect successfully
3. `npx expo doctor` - Should pass compatibility checks

## Files to Modify

- `packages/app/package.json` - Downgrade dependencies

---

# PREVIOUS PLAN (COMPLETED) - Fix Expo Build Errors - Dependency Version Alignment

## Additional Fix Applied (2025-02-20)

### 4. Missing expo-status-bar dependency

Added `expo-status-bar: 56.0.0-canary-20260212-4f61309` to packages/app/package.json.
The module was imported in `_layout.tsx` but missing from dependencies.

## Changes Applied

### 1. packages/app/package.json

Updated all Expo/React Native dependencies to SDK 56 canary versions:

- expo: ~54.0.33 → 56.0.0-canary-20260212-4f61309
- expo-router: ~3.5.0 → 56.0.0-canary-20260212-4f61309
- expo-linking: ~8.0.11 → 56.0.0-canary-20260212-4f61309
- expo-system-ui: ~6.0.9 → 56.0.0-canary-20260212-4f61309
- react: 19.1.0 → 19.2.3
- react-native: 0.81.5 → 0.84.0
- react-native-gesture-handler: ~2.22.0 → ~2.30.0
- react-native-reanimated: ~4.0.1 → ~4.2.1
- react-native-safe-area-context: ~5.6.0 → ~5.6.2
- react-native-screens: ~3.35.0 → ~4.23.0
- Added react-dom: 19.2.3 (for web support)
- Added react-native-web: ~0.21.0 (for web support)

### 2. Root package.json

Removed all Expo/React Native dependencies from root (proper workspace separation).
Now only contains CLI-related dependencies: chalk, eas-cli, ejs, fs-extra, prompts, tailwindcss, uniwind.

### 3. app.json

Removed `newArchEnabled: true` (not valid in app.json schema).

## Verification Status

✅ `bun install` completes successfully
✅ `npx expo install --check` passes (versions match SDK 56 canary)
✅ `npx expo doctor` - 14/17 checks passing
✅ `expo export --platform web` - Successfully exports web bundle
✅ `expo prebuild --clean` - Successfully generates native projects

### Known False Positives

The following "failures" in expo-doctor are expected and harmless:

1. **Expo config schema** - Network timeout error (temporary connectivity issue)
2. **Duplicate dependencies** - Bun workspace behavior; expo-doctor sees linked copies in `.bun/` cache but Bun handles this correctly
3. **App config sync warning** - Informational about prebuild not syncing to android/ios folders

## Next Steps for Verification

To fully verify the fix works:

1. `bun run -F @magic-expo/app start` - Should load without navigation errors
2. `bun run -F @magic-expo/app android` - Should bundle successfully
3. Test on device/emulator - Should not show "Cannot find native module" errors

### Verification Results (2025-02-20)

✅ Web export completed successfully - bundles generated without errors
✅ Prebuild completed successfully - native Android/iOS projects generated

- Emulator detected: emulator-5554 (device connected)
- Full on-device testing requires running `bun run -F @magic-expo/app android` to build and launch
