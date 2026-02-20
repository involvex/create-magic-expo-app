import { describe, expect, it, vi } from "vitest";

vi.mock("prompts", () => ({
  default: vi.fn(),
}));

describe("@magic-expo/cli exports", () => {
  it("exports create and prompt APIs", async () => {
    const mod = await import("./index");

    expect(typeof mod.createProject).toBe("function");
    expect(typeof mod.promptUser).toBe("function");
    expect(typeof mod.promptAdvanced).toBe("function");
  });
});
