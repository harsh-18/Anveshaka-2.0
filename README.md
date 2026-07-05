# Anveshaka 2.0 🧬 
### Smart Community Health Decision Intelligence Platform

Anveshaka 2.0 is an advanced, full-stack Decision Intelligence application designed for local public health officials, city stakeholders, and community leads to tackle the critical challenge of healthcare access optimization across India.

Built natively within the Google Cloud ecosystem using **Google AI Studio** and **Gemini 3 Flash**, the platform transforms multi-layered, chaotic public health parameters into localized, actionable intelligence.

---

## 🎥 Live Demo

**[Watch the Live Demo on Loom](https://www.loom.com/share/02a863baa4a04f2da51f94c874319f1e)**

---

## 🚀 Key Features

*   **Command Center & Dynamic Live Analytics:** Provides real-time tracking of critical metrics (like bed deficits and facility statuses) seamlessly scaling across all 28 States, 8 Union Territories, and 700+ health facilities.
*   **Insight Lab (Predictive Forecasting):** Offers high-fidelity, deterministic visualizations comparing shifting respiratory surge events against localized supply-demand curves.
*   **Automated Workflows:** A rule-based automation engine that triggers emergency dispatches, reallocates logistics, and reassigns staff instantly when local facilities hit maximum capacities.
*   **Context-Bound Gemini Inference:** The conversational agent is dynamically coupled with the active geographic control panel. Changing your district or state parameters silently updates Gemini's response context.

## 🛠️ Software Engineering & Architecture (S.O.L.I.D. Principles)

To ensure long-term maintainability and modular scale, the codebase has been strictly refactored under modern software design patterns:
*   **Single Responsibility Principle (SRP):** Complete decoupling of raw geographical data configurations, mathematical simulation matrix engines, and frontend React views.
*   **Open/Closed Principle (OCP):** Built utilizing an Interface Adapter pattern. While the platform currently runs a localized high-fidelity simulation engine to mirror real-world data volatility, the adapter allows future swaps to live APIs without UI changes.
*   **Dependency Inversion:** Frontend dashboard components depend cleanly on abstracted data models rather than hardcoded local state objects.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View the app in AI Studio: https://ai.studio/apps/d634e92f-c8d4-4a88-8f62-ff0af9ac58fc

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
