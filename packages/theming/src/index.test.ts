import { describe, expect, it } from "vitest";

describe("@magic-expo/theming exports", () => {
  it("creates theme objects with custom colors", async () => {
    const mod = await import("./types");
    const theme = mod.createTheme("dark", { primary: "#123456" });

    expect(theme.colorScheme).toBe("dark");
    expect(theme.colors.primary).toBe("#123456");
  });

  it("returns symbol props based on color scheme", async () => {
    const mod = await import("./symbols");

    expect(mod.getSymbolProps("dark")).toEqual({ variant: "filled" });
    expect(mod.getSymbolProps("light")).toEqual({ variant: "regular" });
  });
});
