import React from "react";
import { generateQuestions } from "../utils/gemini.js";

const h = React.createElement;

const QUESTION_TYPES = [
  { value: "mixed", label: "Mixed" },
  { value: "mcq", label: "Multiple Choice" },
  { value: "true_false", label: "True / False" },
  { value: "fill_blank", label: "Fill in the Blank" },
];

function QuestionCard({ q, index }) {
  const [revealed, setRevealed] = React.useState(false);

  const diffColor =
    q.difficulty === "easy"
      ? "border-accent/60 bg-accent/10 text-accent"
      : q.difficulty === "hard"
      ? "border-red-500/40 bg-red-500/10 text-red-600"
      : "border-yellow-400/40 bg-yellow-50 text-yellow-700";

  return h(
    "div",
    {
      className:
        "rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3",
    },
    h(
      "div",
      { className: "flex items-start justify-between gap-3" },
      h(
        "p",
        { className: "text-sm font-medium text-slate-800 leading-relaxed" },
        `Q${index + 1}. ${q.prompt}`
      ),
      h(
        "span",
        {
          className: `text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${diffColor}`,
        },
        q.difficulty
      )
    ),
    q.options &&
      h(
        "ul",
        { className: "space-y-1" },
        q.options.map((opt, i) =>
          h(
            "li",
            { key: i, className: "text-sm text-slate-600 flex gap-2" },
            h(
              "span",
              { className: "text-xs font-semibold uppercase text-slate-400" },
              `${String.fromCharCode(65 + i)}.`
            ),
            opt
          )
        )
      ),
    h(
      "button",
      {
        type: "button",
        onClick: () => setRevealed((r) => !r),
        className: "text-xs text-primary underline hover:no-underline transition",
      },
      revealed ? "Hide answer" : "Show answer"
    ),
    revealed &&
      h(
        "div",
        {
          className:
            "rounded-2xl border border-slate-200 bg-white p-4 space-y-1",
        },
        h(
          "p",
          { className: "text-sm font-semibold text-accent" },
          `Answer: ${q.correctAnswer}`
        ),
        h("p", { className: "text-xs italic text-slate-500" }, q.explanation)
      )
  );
}

export default function GenerateQuestions({ apiKey }) {
  const [text, setText] = React.useState("");
  const [questionType, setQuestionType] = React.useState("mixed");
  const [count, setCount] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);

  async function handleGenerate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setQuestions([]);
    try {
      const result = await generateQuestions(apiKey, text, questionType, count);
      setQuestions(result);
    } catch (e) {
      setError(e.message || "Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  }

  return h(
    "div",
    { className: "space-y-6" },

    h(
      "section",
      {
        className:
          "space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur",
      },
      h("h3", { className: "text-xl font-semibold text-slate-800" }, "Generate Questions"),

      h("textarea", {
        value: text,
        onChange: (e) => setText(e.target.value),
        placeholder: "Paste your ISTQB syllabus text here…",
        rows: 6,
        className:
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y",
      }),

      h(
        "div",
        { className: "flex flex-wrap gap-4" },
        h(
          "div",
          { className: "flex flex-col gap-1" },
          h("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide" }, "Question type"),
          h(
            "select",
            {
              value: questionType,
              onChange: (e) => setQuestionType(e.target.value),
              className:
                "rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            },
            QUESTION_TYPES.map((t) =>
              h("option", { key: t.value, value: t.value }, t.label)
            )
          )
        ),
        h(
          "div",
          { className: "flex flex-col gap-1" },
          h("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide" }, "Count"),
          h(
            "select",
            {
              value: count,
              onChange: (e) => setCount(Number(e.target.value)),
              className:
                "rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            },
            [3, 5, 10, 15].map((n) => h("option", { key: n, value: n }, n))
          )
        )
      ),

      !apiKey &&
        h(
          "p",
          { className: "text-xs text-amber-700 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3" },
          "Set your Gemini API key in Settings to generate questions."
        ),

      h(
        "button",
        {
          type: "button",
          onClick: handleGenerate,
          disabled: loading || !text.trim() || !apiKey,
          className:
            "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition disabled:opacity-60 hover:bg-primary/90",
        },
        loading ? "Generating…" : "Generate Questions"
      )
    ),

    error &&
      h(
        "div",
        { className: "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" },
        error
      ),

    questions.length > 0 &&
      h(
        "section",
        {
          className:
            "space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur",
        },
        h(
          "p",
          { className: "text-sm font-semibold text-slate-700" },
          `${questions.length} question${questions.length !== 1 ? "s" : ""} generated`
        ),
        questions.map((q, i) => h(QuestionCard, { key: i, q, index: i }))
      )
  );
}
