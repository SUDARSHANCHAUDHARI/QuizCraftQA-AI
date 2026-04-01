import { describe, it, expect, beforeEach } from "vitest";
import { loadApiKey } from "../utils/storage.js";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe("loadApiKey", () => {
  it("returns empty string when nothing is stored", () => {
    expect(loadApiKey()).toBe("");
  });

  it("reads from sessionStorage when remember is false", () => {
    localStorage.setItem("quizcraftqa_ai_remember", "false");
    sessionStorage.setItem("quizcraftqa_ai_gemini_key", "session-key");
    expect(loadApiKey()).toBe("session-key");
  });

  it("reads from localStorage when remember is true", () => {
    localStorage.setItem("quizcraftqa_ai_remember", "true");
    localStorage.setItem("quizcraftqa_ai_gemini_key", "local-key");
    expect(loadApiKey()).toBe("local-key");
  });

  it("returns empty string when remember is true but no key stored", () => {
    localStorage.setItem("quizcraftqa_ai_remember", "true");
    expect(loadApiKey()).toBe("");
  });

  it("prefers localStorage over sessionStorage when remember is true", () => {
    localStorage.setItem("quizcraftqa_ai_remember", "true");
    localStorage.setItem("quizcraftqa_ai_gemini_key", "local-key");
    sessionStorage.setItem("quizcraftqa_ai_gemini_key", "session-key");
    expect(loadApiKey()).toBe("local-key");
  });
});
