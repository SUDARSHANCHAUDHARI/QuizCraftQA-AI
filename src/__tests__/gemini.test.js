import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateQuestions, generateStudyPlan } from "../utils/gemini.js";

const FAKE_KEY = "AIzaFakeKey123";

function mockFetch(text, ok = true, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status,
      json: async () =>
        ok
          ? { candidates: [{ content: { parts: [{ text }] } }] }
          : { error: { message: `Error ${status}` } },
    })
  );
}

beforeEach(() => vi.restoreAllMocks());

// ── generateQuestions ──────────────────────────────────────────────────────────

describe("generateQuestions", () => {
  it("parses a valid JSON array response", async () => {
    const questions = [
      { type: "mcq", prompt: "Q?", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "Because", difficulty: "easy" },
    ];
    mockFetch(JSON.stringify(questions));
    const result = await generateQuestions(FAKE_KEY, "syllabus text", "mcq", 1);
    expect(result).toHaveLength(1);
    expect(result[0].prompt).toBe("Q?");
  });

  it("strips markdown code fences before parsing", async () => {
    const questions = [{ type: "true_false", prompt: "T?", correctAnswer: "True", explanation: "Yes", difficulty: "easy" }];
    mockFetch("```json\n" + JSON.stringify(questions) + "\n```");
    const result = await generateQuestions(FAKE_KEY, "syllabus text", "true_false", 1);
    expect(result).toHaveLength(1);
  });

  it("extracts JSON array embedded in extra text", async () => {
    const questions = [{ type: "mcq", prompt: "Q?", options: ["A", "B"], correctAnswer: "A", explanation: "Exp", difficulty: "medium" }];
    mockFetch("Here are your questions:\n" + JSON.stringify(questions) + "\nDone.");
    const result = await generateQuestions(FAKE_KEY, "text", "mcq", 1);
    expect(result[0].prompt).toBe("Q?");
  });

  it("throws a clear error when JSON cannot be parsed", async () => {
    mockFetch("Sorry, I cannot generate that.");
    await expect(generateQuestions(FAKE_KEY, "text", "mcq", 1)).rejects.toThrow(
      /parse Gemini response/i
    );
  });

  it("throws on 400 with invalid API key message", async () => {
    mockFetch("", false, 400);
    await expect(generateQuestions(FAKE_KEY, "text", "mcq", 1)).rejects.toThrow(
      /Invalid API key/i
    );
  });

  it("throws on 429 rate limit", async () => {
    mockFetch("", false, 429);
    await expect(generateQuestions(FAKE_KEY, "text", "mcq", 1)).rejects.toThrow(
      /Rate limit/i
    );
  });

  it("throws when Gemini returns empty text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ candidates: [{ content: { parts: [{ text: "" }] } }] }),
      })
    );
    await expect(generateQuestions(FAKE_KEY, "text", "mcq", 1)).rejects.toThrow(
      /empty response/i
    );
  });

  it("throws on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(generateQuestions(FAKE_KEY, "text", "mcq", 1)).rejects.toThrow();
  });
});

// ── generateStudyPlan ──────────────────────────────────────────────────────────

describe("generateStudyPlan", () => {
  it("returns plain text study plan", async () => {
    mockFetch("Week 1: Test basics\nWeek 2: Static testing");
    const result = await generateStudyPlan(FAKE_KEY, "syllabus", 2, []);
    expect(result).toContain("Week 1");
  });

  it("includes weak topics in the prompt sent to Gemini", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "Plan" }] } }] }),
    });
    vi.stubGlobal("fetch", fetchMock);
    await generateStudyPlan(FAKE_KEY, "syllabus", 4, ["risk-based testing", "static analysis"]);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.contents[0].parts[0].text).toContain("risk-based testing");
    expect(body.contents[0].parts[0].text).toContain("static analysis");
  });

  it("does not mention weak topics when list is empty", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "Plan" }] } }] }),
    });
    vi.stubGlobal("fetch", fetchMock);
    await generateStudyPlan(FAKE_KEY, "syllabus", 4, []);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.contents[0].parts[0].text).not.toContain("weak topics");
  });

  it("truncates syllabus text to 3000 chars", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "Plan" }] } }] }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const longText = "x".repeat(5000);
    await generateStudyPlan(FAKE_KEY, longText, 4, []);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    const sentText = body.contents[0].parts[0].text;
    expect(sentText).toContain("x".repeat(3000));
    expect(sentText).not.toContain("x".repeat(3001));
  });
});
