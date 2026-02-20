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

  it("creates minimum template with local-first defaults", async () => {
    const mod = await import("./index");
    const files = mod.getTemplate({
      projectName: "demo-app",
      template: mod.Templates.MINIMUM,
      buildProvider: "eas",
    });

    const paths = files.map(file => file.path);
    expect(paths).toContain("package.json");
    expect(paths).toContain("src/app/index.tsx");
    expect(paths).not.toContain("eas.json");
    expect(paths).not.toContain("src/components/ui/Button.tsx");
  });

  it("exposes scaffold utilities", async () => {
    const mod = await import("./index");

    expect(typeof mod.scaffoldProject).toBe("function");
    expect(typeof mod.verifyScaffold).toBe("function");
  });
});
