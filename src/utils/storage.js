const SS_KEY = "quizcraftqa_ai_gemini_key";
const LS_KEY = "quizcraftqa_ai_gemini_key";
const LS_REMEMBER = "quizcraftqa_ai_remember";

export function loadApiKey() {
  try {
    const remember = localStorage.getItem(LS_REMEMBER) === "true";
    return remember
      ? localStorage.getItem(LS_KEY) || ""
      : sessionStorage.getItem(SS_KEY) || "";
  } catch {
    return "";
  }
}

export function saveApiKey(key, remember) {
  try {
    if (remember) {
      localStorage.setItem(LS_KEY, key);
      localStorage.setItem(LS_REMEMBER, "true");
      sessionStorage.removeItem(SS_KEY);
    } else {
      sessionStorage.setItem(SS_KEY, key);
      localStorage.removeItem(LS_KEY);
      localStorage.setItem(LS_REMEMBER, "false");
    }
  } catch {}
}

export function clearApiKey() {
  try {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_REMEMBER);
    sessionStorage.removeItem(SS_KEY);
  } catch {}
}

export function getRemember() {
  try { return localStorage.getItem(LS_REMEMBER) === "true"; } catch { return false; }
}

export function setRemember(val) {
  try { localStorage.setItem(LS_REMEMBER, String(val)); } catch {}
}
