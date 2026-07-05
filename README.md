# Anveshaka 2.0 🧬 
### Smart Community Health Decision Intelligence Platform

Anveshaka 2.0 is an advanced, full-stack Decision Intelligence application designed for local public health officials, city stakeholders, and community leads to tackle the critical challenge of healthcare resource fragmentation across India. 

Built natively within the Google Cloud ecosystem using **Google AI Studio** and **Gemini 3 Flash**, the platform transforms multi-layered, chaotic public health parameters into localized, actionable, real-time insights through a responsive natural language interface.

---

## 🚀 Key Features

*   **Command Center & Dynamic Live Analytics:** Provides real-time tracking of critical metrics (like bed deficits and facility statuses) seamlessly scaling across all 28 States, 8 Union Territories, major metros, and capital cities.
*   **Insight Lab (Predictive Forecasting):** Offers high-fidelity, deterministic visualizations comparing shifting respiratory surge events against localized supply-demand curves.
*   **Automated Workflows:** A rule-based automation engine that triggers emergency dispatches, reallocates logistics, and reassigns staff instantly when local facilities hit maximum capacities.
*   **Context-Bound Gemini Inference:** The conversational agent is dynamically coupled with the active geographic control panel. Changing your district or state parameters silently updates Gemini's system parameters for hyper-localized anomaly reasoning.

## 🛠️ Software Engineering & Architecture (S.O.L.I.D. Principles)

To ensure long-term maintainability and modular scale, the codebase has been strictly refactored under modern software design patterns:
*   **Single Responsibility Principle (SRP):** Complete decoupling of raw geographical data configurations, mathematical simulation matrix engines, and frontend React views.
*   **Open/Closed Principle (OCP):** Built utilizing an Interface Adapter pattern. While the platform currently runs a localized high-fidelity simulation engine to mirror real-world data volatility without breaking, the data service layer is fully open to direct integration with external streaming endpoints (such as national **AI Kosh Developer Toolkits**) without rewriting UI components.
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
