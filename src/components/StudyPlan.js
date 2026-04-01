import React from "react";
import { generateStudyPlan } from "../utils/gemini.js";

const h = React.createElement;

export default function StudyPlan({ apiKey }) {
  const [text, setText] = React.useState("");
  const [weeks, setWeeks] = React.useState(4);
  const [weakTopicsInput, setWeakTopicsInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [plan, setPlan] = React.useState("");

  async function handleGenerate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setPlan("");
    try {
      const weakTopics = weakTopicsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const result = await generateStudyPlan(apiKey, text, weeks, weakTopics);
      setPlan(result);
    } catch (e) {
      setError(e.message || "Failed to generate study plan.");
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
      h("h3", { className: "text-xl font-semibold text-slate-800" }, "Generate Study Plan"),

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
          h("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide" }, "Study weeks"),
          h(
            "select",
            {
              value: weeks,
              onChange: (e) => setWeeks(Number(e.target.value)),
              className:
                "rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            },
            [2, 4, 6, 8, 12].map((n) =>
              h("option", { key: n, value: n }, `${n} weeks`)
            )
          )
        ),
        h(
          "div",
          { className: "flex flex-col gap-1 flex-1 min-w-48" },
          h(
            "label",
            { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide" },
            "Weak topics (optional, comma-separated)"
          ),
          h("input", {
            type: "text",
            value: weakTopicsInput,
            onChange: (e) => setWeakTopicsInput(e.target.value),
            placeholder: "e.g. risk-based testing, static analysis",
            className:
              "rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
          })
        )
      ),

      !apiKey &&
        h(
          "p",
          { className: "text-xs text-amber-700 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3" },
          "Set your Gemini API key in Settings to generate a study plan."
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
        loading ? "Generating…" : "Generate Study Plan"
      )
    ),

    error &&
      h(
        "div",
        { className: "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" },
        error
      ),

    plan &&
      h(
        "section",
        {
          className:
            "rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur",
        },
        h("h4", { className: "text-base font-semibold text-slate-800 mb-4" }, "Your Study Plan"),
        h(
          "pre",
          {
            className:
              "text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans",
          },
          plan
        )
      )
  );
}
