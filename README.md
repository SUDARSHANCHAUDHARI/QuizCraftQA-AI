# QuizCraftQA AI

[![CI](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/ci.yml)
[![Deploy](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/deploy.yml/badge.svg)](https://github.com/SUDARSHANCHAUDHARI/QuizCraftQA-AI/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://sudarshanchaudhari.github.io/QuizCraftQA-AI/)

AI-powered ISTQB question and study plan generator. Paste syllabus text, enter your Gemini API key, and generate exam-ready questions or a week-by-week study plan — all in the browser, no backend needed.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Getting a Gemini API Key](#getting-a-gemini-api-key)
- [Build for Production](#build-for-production)
- [Tech Stack](#tech-stack)
- [Related Projects](#related-projects)
- [About](#about)

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

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)
