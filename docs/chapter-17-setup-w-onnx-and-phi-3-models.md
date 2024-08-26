---
hide:
- toc
---
# Setup with ONNX and Phi-3 Models

```bash title="Install Git LFS"
git lfs install
```

```bash title="Clone the Phi-3 ONNX Model Repository"
git clone https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx
cd Phi-3-mini-4k-instruct-onnx
git lfs checkout
```

```bash title="Configure the Model Path"
ai config --set mp Phi-3-mini-4k-instruct-onnx/directml/directml-int4-awq-block-128
```

??? tip "Alternatively, you can use the AI Toolkit to Visual Studio Code to download the model"

    [AI Toolkit VS Code Extension](https://aka.ms/WindowsAI-Studio)  
    Download the AI Toolkit VS Code Extension.  

    [AI Toolkit Documentation](https://learn.microsoft.com/windows/ai/toolkit/)  
    Learn more about the AI Toolkit on learn.microsoft.com.


