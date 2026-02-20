import { describe, expect, it } from "vitest";

describe("@magic-expo/config exports", () => {
  it("returns a tsconfig object with overrides", async () => {
    const mod = await import("./index");
    const tsconfig = mod.getTsconfig({ strict: false });

    expect(tsconfig).toHaveProperty("compilerOptions");
    expect((tsconfig.compilerOptions as { strict?: boolean }).strict).toBe(
      false,
    );
  }, 15000);

  it("exposes eslint and prettier config helpers", async () => {
    const mod = await import("./index");

    expect(typeof mod.getEslintConfig).toBe("function");
    expect(mod.prettierConfig).toBeDefined();
  }, 15000);
});
