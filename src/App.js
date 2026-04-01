import React from "react";
import ApiKeyInput from "./components/ApiKeyInput.js";
import { loadApiKey } from "./utils/storage.js";
import GenerateQuestions from "./components/GenerateQuestions.js";
import StudyPlan from "./components/StudyPlan.js";

const h = React.createElement;

const TABS = [
  { id: "generate", label: "Generate Questions" },
  { id: "study-plan", label: "Study Plan" },
  { id: "settings", label: "Settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState("generate");
  const [apiKey, setApiKey] = React.useState(() => loadApiKey());

  return h(
    "div",
    { className: "min-h-screen" },

    // ─── Header ───────────────────────────────────────────────
    h(
      "header",
      {
        className:
          "sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur",
      },
      h(
        "div",
        { className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4" },
        h(
          "div",
          null,
          h("h1", { className: "text-xl font-bold text-slate-800" }, "🤖 QuizCraftQA AI"),
          h(
            "p",
            { className: "text-xs text-slate-500" },
            "AI-powered ISTQB question & study plan generator"
          )
        ),
        h(
          "nav",
          { className: "flex items-center gap-1" },
          TABS.map((tab) =>
            h(
              "button",
              {
                key: tab.id,
                type: "button",
                onClick: () => setActiveTab(tab.id),
                className:
                  "rounded-full px-4 py-2 text-sm font-medium transition " +
                  (activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"),
              },
              tab.label
            )
          )
        )
      )
    ),

    // ─── Content ──────────────────────────────────────────────
    h(
      "main",
      { className: "mx-auto max-w-5xl px-6 py-8" },
      activeTab === "generate" &&
        h(GenerateQuestions, { apiKey }),
      activeTab === "study-plan" &&
        h(StudyPlan, { apiKey }),
      activeTab === "settings" &&
        h(ApiKeyInput, {
          apiKey,
          onSave: (key) => setApiKey(key),
          onClear: () => setApiKey(""),
        })
    )
  );
}
