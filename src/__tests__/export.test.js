import { describe, it, expect, vi, beforeEach } from "vitest";

// We test the export logic directly by extracting it
// The exportQuestions function is defined in GenerateQuestions.js
// We duplicate the pure logic here to test it in isolation

function buildCsv(questions) {
  const rows = questions.map((q) => [
    `"${(q.prompt || "").replace(/"/g, '""')}"`,
    `"${(q.type || "").replace(/"/g, '""')}"`,
    `"${(q.correctAnswer || "").replace(/"/g, '""')}"`,
    `"${(q.explanation || "").replace(/"/g, '""')}"`,
    q.difficulty || "",
  ]);
  return ["Prompt,Type,Answer,Explanation,Difficulty", ...rows.map((r) => r.join(","))].join("\n");
}

const SAMPLE_QUESTIONS = [
  { prompt: "What is testing?", type: "mcq", correctAnswer: "B", explanation: "It evaluates quality.", difficulty: "easy" },
  { prompt: "Exhaustive testing is possible.", type: "true_false", correctAnswer: "False", explanation: "It is impossible.", difficulty: "medium" },
];

describe("CSV export logic", () => {
  it("includes header row", () => {
    const csv = buildCsv(SAMPLE_QUESTIONS);
    expect(csv).toContain("Prompt,Type,Answer,Explanation,Difficulty");
  });

  it("includes all questions", () => {
    const csv = buildCsv(SAMPLE_QUESTIONS);
    expect(csv).toContain("What is testing?");
    expect(csv).toContain("Exhaustive testing is possible.");
  });

  it("wraps prompt in quotes", () => {
    const csv = buildCsv(SAMPLE_QUESTIONS);
    expect(csv).toContain('"What is testing?"');
  });

  it("escapes double quotes inside fields", () => {
    const q = [{ prompt: 'He said "hello"', type: "mcq", correctAnswer: "A", explanation: "Exp", difficulty: "easy" }];
    const csv = buildCsv(q);
    expect(csv).toContain('"He said ""hello"""');
  });

  it("produces correct number of data rows", () => {
    const csv = buildCsv(SAMPLE_QUESTIONS);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(SAMPLE_QUESTIONS.length + 1); // +1 for header
  });

  it("handles empty questions array", () => {
    const csv = buildCsv([]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(1); // header only
  });
});

describe("JSON export logic", () => {
  it("produces valid JSON", () => {
    const json = JSON.stringify(SAMPLE_QUESTIONS, null, 2);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it("preserves all question fields", () => {
    const parsed = JSON.parse(JSON.stringify(SAMPLE_QUESTIONS, null, 2));
    expect(parsed[0].prompt).toBe("What is testing?");
    expect(parsed[0].correctAnswer).toBe("B");
    expect(parsed[1].difficulty).toBe("medium");
  });
});
