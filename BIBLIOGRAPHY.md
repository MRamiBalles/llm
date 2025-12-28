# 📚 Cortex Lab: Research Bibliography

This project is grounded in cutting-edge research in Stateful Space Models (SSM) and Hybrid Transformer architectures. Below are the foundational papers that informed the implementation of the Cortex-13 system.

## 🐍 State Space Models & Mamba
- **Gu, A., & Dao, T. (2023).** *Mamba: Linear-Time Sequence Modeling with Selective State Spaces.* [arXiv:2312.00752](https://arxiv.org/abs/2312.00752)
    - *Contribution*: Provided the selective SSM mechanism and the concept of the hardware-aware Scan.
- **Fu, D. Y., et al. (2023).** *Hungry Hungry Hippos: Towards Language Modeling with State Space Models.* [arXiv:2302.10866](https://arxiv.org/abs/2302.10866)
    - *Contribution*: Foundational work on H3 blocks and the transition from CNNs to SSMs.

## 🔄 Hybrid Architectures
- **Lieber, O., et al. (2024).** *Jamba: A Hybrid Transformer-Mamba Language Model.* [arXiv:2403.19830](https://arxiv.org/abs/2403.19830)
    - *Contribution*: Inspired the 3:1 interleaving ratio and the integration of MoE with hybrid blocks.
- **Poli, M., et al. (2023).** *Hyena Hierarchy: Towards Larger Convolutional Language Models.* [arXiv:2302.10866](https://arxiv.org/abs/2302.10866)
    - *Contribution*: Efficient long-context modeling using sub-quadratic attention alternatives.

## ⚖️ Mixture of Experts (MoE)
- **Shazeer, N., et al. (2017).** *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer.* [arXiv:1701.06538](https://arxiv.org/abs/1701.06538)
    - *Contribution*: Foundational concept for MoE gates and expert specialization.
- **Jiang, A. Q., et al. (2024).** *Mixtral of Experts.* [arXiv:2401.04088](https://arxiv.org/abs/2401.04088)
    - *Contribution*: Advanced routing strategies and sparse-activations for high-parameter efficiency.

## 🛠️ Optimization & Components
- **Vaswani, A., et al. (2017).** *Attention Is All You Need.* [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)
    - *Contribution*: The Multi-Head Attention mechanism and the original Transformer paradigm.
- **Su, J., et al. (2021).** *RoFormer: Enhanced Transformer with Rotary Position Embedding.* [arXiv:2104.09864](https://arxiv.org/abs/2104.09864)
    - *Contribution*: RoPE (Rotary Position Embeddings) for relative position awareness.
- **Zhang, B., & Sennrich, R. (2019).** *Root Mean Square Layer Normalization.* [arXiv:1910.07467](https://arxiv.org/abs/1910.07467)
    - *Contribution*: RMSNorm for training stability and computational efficiency.

---
> [!NOTE]
> All implementations in `cortex_model.py` and `Cortex_Master_Lab.ipynb` are derived from these sources, adapted for the Cortex Lab's specific focus on hybrid intelligence.
