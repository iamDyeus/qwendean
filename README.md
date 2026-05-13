<p align="center">
  <img src="https://github.com/user-attachments/assets/3a6c6f37-5434-4ec9-9224-d8f498947bb3" alt="Qwendean" />
</p>

<p align="center">
  <strong>“Heterogeneous Agentic AI for UI Code Generation”</strong> <br/>
  A research project exploring fine-tuned Small Language Models (SLMs) in a multi-agent architecture for production-ready React/Next.js landing page generation.
</p>
<br/>



## Overview

This repository contains two main components:

- **`/academic`** — paper, LaTeX source, dataset documentation, and finetuning notebooks
- **`/app`** — Production implementation: Electron desktop app, FastAPI server for Langraph agent, and Next.js preview toolkit

## Key Innovation

Instead of using a single large model for everything, Qwendean uses **specialized models for specialized tasks**:

- **Gemma 4 E2B** (2.3B) — handles conversation, requirements gathering, and task decomposition
- **Qwendean** (fine-tuned Qwen3-4B) — generates ShadCN/Tailwind/React components with high consistency

**Result:** 3-5× faster generation, lower cost, better output consistency than general-purpose LLMs.

## Quick Start

### Prerequisites

- Node.js 20+, Python 3.11+, Ollama
- Models: `hf.co/iamdyeus/qwendean-4b-GGUF:latest` and `gemma4:e2b`


## Paper Abstract

This work introduces a heterogeneous agentic AI architecture using fine-tuned SLMs for efficient UI component generation. Unlike monolithic LLM approaches, we separate orchestration (lightweight general-purpose model) from execution (domain-specialist model). Fine-tuning used LoRA with rsLoRA at 16-bit precision on 4,100+ samples. Empirical results show better cohesion, consistency, and 3-5× latency reduction compared to homogeneous baselines.

## Citation

If you use this work, please cite:

```bibtex
@misc{qwendean2026,
  title={Heterogeneous Agentic AI System Using Fine-Tuned SLMs},
  author={Arsh, Akshay Rajput, Swarnendu Ghosh},
  year={2026},
  note={Available at \url{https://github.com/iamDyeus/qwendean}}
}
```



