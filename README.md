# QuizCraftQA AI

[![CI](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/ci.yml)
[![Deploy](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/deploy.yml/badge.svg)](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://sudarshanchaudhari.github.io/QuizCraftQA-AI/)

AI-powered ISTQB question and study plan generator. Paste syllabus text, enter your Gemini API key, and generate exam-ready questions or a week-by-week study plan — all in the browser, no backend needed.

## Features

- Generate MCQ, True/False, and Fill-in-the-Blank questions from any ISTQB syllabus text
- Generate a personalised week-by-week study plan with weak topic focus
- Export generated questions as JSON or CSV
- Gemini API key stored in your browser only — never sent to any server
- Static app — deploys to GitHub Pages

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Go to **Settings**, enter your Gemini API key, then use **Generate Questions** or **Study Plan**.

## Getting a Gemini API Key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Create a free API key
3. Paste it into the Settings tab

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19 (no build-time JSX — uses `React.createElement`)
- Vite 4
- Tailwind CSS 3
- Gemini API (`gemini-1.5-flash`) via direct browser fetch

## Related Projects

- [QuizCraftQA](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA) — Main ISTQB quiz web app
- [QuizCraftQA-NotebookLM](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-NotebookLM) — NotebookLM prompt templates
