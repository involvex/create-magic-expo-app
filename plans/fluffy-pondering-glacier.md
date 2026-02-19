# Fix Plan: Android Build Path Length and Ninja Manifest Issues

## Context

The Android build is failing at 95% with `ninja: error: manifest 'build.ninja' still dirty after 100 tries`. **User confirmed: JDK 24 does NOT have this issue** - the problem is specific to JDK 17's handling of long paths.

## Root Cause

The build fails because:

1. **JDK 17** is more sensitive to long paths than JDK 24 when used with CMake/ninja
2. CMake object file paths are 206/250 characters due to:
   - Bun's cache structure with long hash suffixes (`expo-modules-core@3.0.29+395f71ae3c4cac51`)
   - Nested monorepo structure (`packages/app/`)
3. The `build.ninja` manifest becomes inconsistent ("dirty") due to JDK 17's file operations failing
4. Gradle 8.14.3 doesn't fully support JDK 24 (class file version 68 issue)

**Key Finding**: The path length is manageable with JDK 24, but JDK 17's file operations fail at these lengths.

## Implementation Plan

### Step 0: Configure Bun to Use Shorter Cache Path

**File**: `bunfig.toml` (create in project root or user's home directory)

```toml
[install]
# Use shorter cache path to reduce node_modules path length
cacheDir = "D:\\temp\\bun"
# Or use: cacheDir = "C:\\temp\\bun"

[install.lockfile]
# Ensure standard node_modules structure
print = "yarn"
```

Then reinstall dependencies:

```bash
bun install
```

This creates paths like `D:\temp\bun\...` instead of the current long path, significantly reducing the overall path length.

### Step 1: Use JDK 21 (Middle Ground)

JDK 21 is supported by Gradle 8.14.3 and has better long-path handling than JDK 17.

**File**: `packages/app/android/gradle.properties`

```properties
# Force JDK 21 for Android builds (better path handling than JDK 17)
org.gradle.java.home=C:/Users/lukas/.jdks/jdk-21

# If JDK 21 is not available, try with existing JDK 17 and additional flags
# org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED
```

### Alternative 1: Upgrade Gradle to Support JDK 24

If JDK 21 doesn't work, upgrade Gradle to the latest version (8.15+) which has better JDK 24 support.

**File**: `packages/app/android/gradle/wrapper/gradle-wrapper.properties`

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.15-all.zip
```

Then use JDK 24:

```properties
org.gradle.java.home=C:/Users/lukas/.jdks/openjdk-24.0.2
```

### Alternative 2: Enable Gradle Build Cache with Short Paths

**File**: `packages/app/android/gradle.properties`

```properties
# Enable Windows long paths (Gradle 8.1+)
org.gradle.windows.long.paths=true

# Use shorter build directory
org.gradle.build.dir=build
```

### Clean All Build State

```bash
# Stop all Gradle daemons
cd packages/app/android && ./gradlew.bat --stop

# Remove all build artifacts
rimraf packages/app/android/.gradle
rimraf packages/app/android/build
rimraf packages/app/android/app/build
rimraf packages/app/android/.cxx
rimraf packages/app/android/app/.cxx
```

## Critical Files

1. **`packages/app/android/gradle.properties`** - Set JDK version
2. **`packages/app/android/gradle/wrapper/gradle-wrapper.properties`** - May need Gradle upgrade
3. **`packages/app/.gitignore`** - Ensure junction paths are excluded

## Verification

1. **Clean build state completely**
2. **Set JDK in gradle.properties to JDK 21**
3. **Run build**: `bun run android`
4. **Expected**: Build completes without ninja manifest errors

## Java Version Compatibility

| JDK Version | Gradle 8.14.3     | Path Handling                | Status                  |
| ----------- | ----------------- | ---------------------------- | ----------------------- |
| 17          | ✅ Supported      | ❌ Fails with 206 char paths | Current (broken)        |
| 21          | ✅ Supported      | ✅ Better than 17            | **Recommended**         |
| 24          | ❌ Class file v68 | ✅ Best                      | Requires Gradle upgrade |
