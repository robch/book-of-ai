---
hide:
- toc
---
# Setup with ONNX and Phi-3 Models

```bash title="Clone/download the Phi-3 ONNX Model"
git lfs install
git clone https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx
cd Phi-3-mini-4k-instruct-onnx
git lfs checkout
```

```bash title="Configure the Model Path"
ai config --set mp Phi-3-mini-4k-instruct-onnx/directml/directml-int4-awq-block-128
```

??? tip "If you want to use the AI Toolkit VS Code Extension's downloaded models"

    [AI Toolkit VS Code Extension](https://aka.ms/WindowsAI-Studio)  
    Download the AI Toolkit VS Code Extension.  

    [AI Toolkit Documentation](https://learn.microsoft.com/windows/ai/toolkit/)  
    Learn more about the AI Toolkit on learn.microsoft.com.


