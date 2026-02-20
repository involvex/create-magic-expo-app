import { parseCliArgs, resolveCreateOptions } from "./args";
import { describe, expect, it } from "vitest";

describe("CLI arg parsing", () => {
  it("parses --yes mode and uses minimum template defaults", () => {
    const args = parseCliArgs(["my-app", "--yes", "--build-provider", "eas"]);
    const resolved = resolveCreateOptions(args);

    expect(resolved.projectName).toBe("my-app");
    expect(resolved.template).toBe("minimum");
    expect(resolved.navigation).toBe("none");
    expect(resolved.theming).toBe(false);
    expect(resolved.uiComponents).toBe(false);
    expect(resolved.buildProvider).toBe("local");
  });

  it("respects explicit interactive overrides", () => {
    const args = parseCliArgs([
      "demo-app",
      "--template",
      "showcase",
      "--navigation",
      "stack",
      "--skip-install",
    ]);
    const resolved = resolveCreateOptions(args, { skipGit: true });

    expect(resolved.template).toBe("showcase");
    expect(resolved.navigation).toBe("stack");
    expect(resolved.theming).toBe(true);
    expect(resolved.uiComponents).toBe(true);
    expect(resolved.skipInstall).toBe(true);
    expect(resolved.skipGit).toBe(true);
  });
});
