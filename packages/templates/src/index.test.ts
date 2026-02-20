import { describe, expect, it } from "vitest";

describe("@magic-expo/templates exports", () => {
  it("renders template strings with options", async () => {
    const mod = await import("./index");
    const rendered = mod.renderTemplate(
      [{ path: "README.md", content: "Hello <%= locals.projectName %>" }],
      { projectName: "demo-app" },
    );

    expect(rendered[0]?.content).toBe("Hello demo-app");
  });

  it("exposes scaffold utilities", async () => {
    const mod = await import("./index");

    expect(typeof mod.scaffoldProject).toBe("function");
    expect(typeof mod.verifyScaffold).toBe("function");
  });
});
