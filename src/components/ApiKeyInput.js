import React from "react";
import { saveApiKey, clearApiKey, getRemember, setRemember } from "../utils/storage.js";

const h = React.createElement;

export default function ApiKeyInput({ apiKey, onSave, onClear }) {
  const [draft, setDraft] = React.useState(apiKey || "");
  const [remember, setRememberState] = React.useState(() => getRemember());
  const [saved, setSaved] = React.useState(!!apiKey);

  function handleSave() {
    if (!draft.trim()) return;
    saveApiKey(draft.trim(), remember);
    setSaved(true);
    onSave(draft.trim());
  }

  function handleClear() {
    clearApiKey();
    setDraft("");
    setSaved(false);
    onClear();
  }

  function toggleRemember(val) {
    setRememberState(val);
    setRemember(val);
  }

  return h(
    "section",
    {
      className:
        "space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur",
    },
    h("h3", { className: "text-xl font-semibold text-slate-800" }, "Settings"),

    h(
      "div",
      { className: "rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4" },
      h("p", { className: "text-sm font-semibold text-slate-700" }, "Gemini API Key"),
      h(
        "p",
        { className: "text-xs text-slate-500" },
        "Your key is stored only in your browser and never sent to any server. ",
        h(
          "a",
          {
            href: "https://aistudio.google.com/app/apikey",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary underline",
          },
          "Get a free key at aistudio.google.com"
        ),
        "."
      ),

      saved
        ? h(
            "div",
            { className: "flex items-center gap-3" },
            h(
              "div",
              { className: "flex items-center gap-2 text-accent font-medium text-sm" },
              h("span", null, "✓"),
              h("span", null, "API key saved")
            ),
            h(
              "button",
              {
                type: "button",
                onClick: handleClear,
                className:
                  "ml-auto text-xs text-slate-500 hover:text-red-500 underline transition-colors",
              },
              "Clear key"
            )
          )
        : h(
            "div",
            { className: "space-y-3" },
            h("input", {
              type: "password",
              value: draft,
              onChange: (e) => setDraft(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && handleSave(),
              placeholder: "AIza...",
              className:
                "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            }),
            h(
              "div",
              { className: "flex items-center justify-between" },
              h(
                "label",
                { className: "flex items-center gap-2 text-sm text-slate-600 cursor-pointer" },
                h("input", {
                  type: "checkbox",
                  checked: remember,
                  onChange: (e) => toggleRemember(e.target.checked),
                  className: "h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40",
                }),
                "Remember across sessions"
              ),
              h(
                "button",
                {
                  type: "button",
                  onClick: handleSave,
                  disabled: !draft.trim(),
                  className:
                    "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition disabled:opacity-60 hover:bg-primary/90",
                },
                "Save key"
              )
            )
          )
    )
  );
}
