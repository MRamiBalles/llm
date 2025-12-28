# 🧠 Cortex Lab: Hybrid Intelligence Foundry

Welcome to the **Cortex Lab**, a professional-grade research environment for developing and visualizing hybrid LLM architectures. This project integrates the efficiency of **Mamba (SSM)** with the reasoning power of **Transformers**, all within a premium **"Midnight Eclipse"** research station.

## 🚀 Core Pillars

### 1. Technical Excellence (Architecture)
- **Jamba-Style Hybrid stack**: Implementing a 3:1 Mamba-to-Transformer interleaving ratio for optimized long-context reasoning.
- **Advanced Components**: GQA (Grouped Query Attention), RoPE (Rotary Position Embeddings), and RMSNorm are standard across all modules.
- **Scaled Initialization**: Weights are scaled based on the deep hybrid stack depth to ensure training stability.

### 2. System Intelligence (Explainability)
- **Memory Dynamics Visualization**: Real-time extraction of Mamba's selective state (Δ matrix).
- **Hidden Attention Projection**: Advanced hooks for visualizing internal relational mappings.

### 3. User Experience (UI/UX)
- **Midnight Eclipse Station**: A high-fidelity, Glassmorphism-based web dashboard.
- **Mission Control**: Real-time telemetry, population diversity metrics, and architectural blueprints.

---

## 📁 Project Structure

```bash
/
├── .gemini/             # Internal configurations
├── research/            # Legacy research & experiments (Re-indexed v1-v4)
├── ui/                  # Premium Research Station
├── BIBLIOGRAPHY.md     # Academic grounding and research papers
├── ROADMAP.md          # Strategy for scaling and multi-modality
├── Cortex_Master_Lab.ipynb  # Flagship research notebook
├── cortex_model.py          # Production-grade implementation
└── scraper.py               # Scientific ArXiv pulse scraper
```

## 🛠️ Getting Started

1.  **Initialize the Pulse**: Run `python scraper.py` to populate your Knowledge Base with curated ArXiv digests.
2.  **Architectural Blueprint**: Explore the `Cortex_Master_Lab.ipynb` to understand the mathematical foundations.
3.  **Command Center**: Open `ui/index.html` to monitor evolution telemetry in real-time.

---

> [!IMPORTANT]
> This laboratory is designed for high-end AI research. Handle the interleave ratios with care as they impact both memory footprint and reasoning depth.

Developed by the **Advanced Agentic Coding Team** for the **Cortex Initiative**.