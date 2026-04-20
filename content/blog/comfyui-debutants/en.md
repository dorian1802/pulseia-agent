---
title: "ComfyUI Explained for Beginners: How to Take Full Control of Stable Diffusion"
excerpt: "Complete guide to getting started with ComfyUI, the node-based interface that gives total control over Stable Diffusion. Installation, interface, first steps, and tips."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "15 min"
coverImage: "/blog/placeholder-cover.svg"
---

If you've used Stable Diffusion via Automatic1111 or online services, you probably know the limitations of those interfaces when it comes to precisely controlling every step of generation. **ComfyUI** changes the game. It's a node-based interface that gives you granular control over every component of the generation process. And the best part: it's free, open source, and surprisingly powerful.

In this guide, we explain everything from installation to creating your first advanced workflows.

## What is ComfyUI?

ComfyUI is a graphical interface for Stable Diffusion that uses a system of connected nodes to define the image generation workflow. Each node represents a specific operation: load a model, write a prompt, apply a sampler, save an image, etc.

Unlike Automatic1111 where you fill in form fields, in ComfyUI you visually connect blocks together, like a circuit. This lets you see exactly what happens at each step, plug or unplug components, and create complex pipelines that are impossible with a traditional interface.

### Why choose ComfyUI?

- **Total control**: Every parameter is visible and modifiable
- **Transparency**: You see the data flow through the nodes
- **Flexibility**: Create custom workflows impossible elsewhere
- **Performance**: Faster than Automatic1111 thanks to flow optimization
- **Community**: Thousands of workflows and custom nodes shared online
- **Free and open source**: No license cost

To understand how ComfyUI fits into a professional strategy with Stable Diffusion, check out our [guide to achieving professional results](/blog/stable-diffusion-resultats-pro).

## Hardware and software prerequisites

Before installing ComfyUI, verify your system meets the minimum requirements.

### Recommended hardware configuration

| Component | Minimum | Recommended | Ideal |
|---|---|---|---|
| GPU (VRAM) | 8 GB | 12 GB | 24 GB (RTX 4090) |
| RAM | 16 GB | 32 GB | 64 GB |
| Storage | 20 GB SSD | 100 GB SSD | 500 GB NVMe |
| CPU | 4 cores | 8 cores | 12+ cores |

SDXL models require at least 8 GB of VRAM to run properly. SD1.5 models can run on 6 GB. If you don't have a sufficient GPU, cloud solutions like RunPod or Google Colab remain viable.

### Required software

- Python 3.10 or 3.11
- Git
- CUDA Toolkit (for NVIDIA GPUs)
- A modern web browser (Chrome, Firefox, Edge)

## Installing ComfyUI

### Method 1: Manual installation (recommended for learning)

```bash
# Clone the repository
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Launch ComfyUI
python main.py
```

Once launched, open your browser at `http://127.0.0.1:8188` to access the interface.

### Method 2: Installation via ComfyUI Portable (Windows)

For Windows users, a portable package is available on ComfyUI's GitHub. It includes Python, dependencies, and the interface ready to go. Just download, extract, and run `run_nvidia_gpu.bat`.

### Method 3: Via ComfyUI-Manager

ComfyUI-Manager is an extension that simplifies installing custom nodes and models. To install it:

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
```

Restart ComfyUI and a new Manager menu will appear in the interface.

## Understanding the ComfyUI interface

When you open ComfyUI for the first time, the interface can seem intimidating. Let's break it down.

### Main areas

| Area | Description |
|---|---|
| **Canvas** | The workspace where you place and connect nodes |
| **Side menu** | Quick actions: save, load, execute |
| **Toolbar** | Zoom, navigation, queue mode |
| **Info panel** | Details of the selected node, parameters |

### Canvas navigation

- **Left click**: Select a node
- **Left click + drag**: Move a node
- **Right click**: Context menu to add a node
- **Mouse wheel**: Zoom in / out
- **Middle click + drag**: Pan the view
- **Double-click on canvas**: Quick node search

### Adding a node

Right-click on the canvas, then navigate through categories to find the desired node. You can also use the quick search by typing the node name after a double-click.

## Essential nodes to know

Here are the nodes you'll use in virtually every workflow.

### Loading nodes

| Node | Function | Output ports |
|---|---|---|
| **CheckpointLoaderSimple** | Loads a complete SD model | MODEL, CLIP, VAE |
| **LoraLoader** | Applies a LoRA to the model | MODEL, CLIP |
| **VAELoader** | Loads a specific VAE | VAE |
| **ControlNetLoader** | Loads a ControlNet model | CONTROL_NET |
| **CLIPVisionLoader** | Loads a CLIP Vision encoder | CLIP_VISION |

### Prompt nodes

| Node | Function |
|---|---|
| **CLIPTextEncode** | Encodes a text prompt (positive or negative) |
| **ConditioningZeroOut** | Disables a conditioning |
| **ConditioningCombine** | Combines multiple conditionings |

### Generation nodes

| Node | Function |
|---|---|
| **KSampler** | The main generation engine: applies sampling |
| **KSamplerAdvanced** | Advanced version with step control |
| **SamplerCustom** | Even finer control over the sampling process |

### Post-processing nodes

| Node | Function |
|---|---|
| **VAEDecode** | Converts latent to visible image |
| **VAEEncode** | Converts an image to latent (for img2img) |
| **SaveImage** | Saves the image to disk |
| **PreviewImage** | Shows a preview without saving |

## Your first workflow: text-to-image generation

Let's start with the most basic workflow: generating an image from a text prompt.

### Step 1: Load the model

1. Right-click on the canvas > Add Node > Loaders > CheckpointLoaderSimple
2. In the `ckpt_name` field, select your model (for example `sd_xl_base_1.0.safetensors`)

### Step 2: Configure the prompts

1. Add two **CLIPTextEncode** nodes
2. Connect the `CLIP` port of the CheckpointLoader to both CLIPTextEncode nodes
3. In the first, write your positive prompt
4. In the second, write your negative prompt

**Example positive prompt:** `Portrait of a woman with glasses, soft lighting, blurred background, professional photography, high quality`

**Example negative prompt:** `blurry, deformed, bad anatomy, text, watermark, low quality`

### Step 3: Configure the KSampler

1. Add a **KSampler** node
2. Connect the ports as follows:
   - `MODEL` from CheckpointLoader to `model` on KSampler
   - `CONDITIONING` from the positive prompt to `positive` on KSampler
   - `CONDITIONING` from the negative prompt to `negative` on KSampler
   - Add an **EmptyLatentImage** node and connect its `LATENT` to `latent_image` on KSampler

### Step 4: Set KSampler parameters

| Parameter | Recommended value | Description |
|---|---|---|
| steps | 20-30 | Number of denoising steps |
| cfg | 7-8 | Prompt influence strength |
| sampler_name | euler_ancestral | Sampling algorithm |
| scheduler | normal | Noise scheduling |
| denoise | 1.0 | Denoising strength (1.0 = from scratch) |

### Step 5: Decode and save

1. Add a **VAEDecode** node
2. Connect `LATENT` from KSampler to `samples` on VAEDecode
3. Connect `VAE` from CheckpointLoader to `vae` on VAEDecode
4. Add a **SaveImage** node
5. Connect `IMAGE` from VAEDecode to `images` on SaveImage

### Step 6: Generate!

Click the **Queue Prompt** button (or press Ctrl+Enter). ComfyUI executes the workflow in connection order and displays the resulting image.

## Essential workflow templates

Once you've mastered the basic workflow, here are templates for advanced use cases.

### Template 1: Generation with LoRA

Add a **LoraLoader** node between the CheckpointLoader and the KSampler. Connect the `MODEL` and `CLIP` ports from the LoRA to the KSampler. Specify the LoRA name and adjust the strengths (strength_model and strength_clip between 0.5 and 1.0).

This workflow is essential for maintaining a consistent style, as we explain in our [guide for professional results with Stable Diffusion](/blog/stable-diffusion-resultats-pro).

### Template 2: ControlNet for pose control

1. Load a reference image with **LoadImage**
2. Add a **ControlNetApply** node
3. Connect the ControlNet, conditioning image, and model
4. The ControlNet guides generation to respect the pose, edges, or depth of the reference image

### Template 3: Img2Img (generation from an image)

1. Load an image with **LoadImage**
2. Encode it to latent with **VAEEncode**
3. Connect the latent to the `latent_image` port of the KSampler
4. Set `denoise` between 0.3 and 0.7 to control the degree of transformation

### Template 4: Upscaling with an ESR model

1. Generate your image normally
2. Add an **UpscaleLatent** or **UpscaleImage** node
3. Pass the upscaled image through a second KSampler with low `denoise` (0.2-0.4) to refine details
4. Save the final result

### Template 5: High-resolution pass (Hires Fix)

Hires Fix involves generating first at low resolution, then upscaling and refining. This workflow is built in two steps in ComfyUI:

1. First KSampler at 512x512 or 1024x1024
2. Upscale to 2x
3. Second KSampler with denoise 0.3-0.5 to refine details at high resolution

## Tips for beginners

### Start simple

Don't try to build complex workflows from the start. Master the basic text-to-image workflow before adding LoRAs, ControlNets, or upscaling steps. Complexity will come naturally.

### Use community workflows

ComfyUI has an active community that shares complete workflows in JSON format. You can import them directly via the Load menu. This is the best way to learn: analyze a working workflow, modify it gradually, and understand each connection.

### Save your workflows

Get in the habit of saving your workflows regularly with Ctrl+S. You can also export them as JSON to share or reuse. A well-built workflow is a valuable tool you'll reuse often.

### Learn keyboard shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+Enter | Launch generation |
| Ctrl+S | Save workflow |
| Ctrl+O | Load workflow |
| Ctrl+Z | Undo last action |
| Delete | Delete selected node |
| Ctrl+D | Duplicate selected node |
| M | Toggle move mode |

### Monitor VRAM consumption

ComfyUI displays VRAM consumption in the console. If you see CUDA Out of Memory errors, try these solutions:

- Reduce the latent resolution (512x512 instead of 1024x1024)
- Enable `--lowvram` mode at launch
- Use quantized models (FP8, GGUF)
- Use `--fp16-vae` to reduce VAE consumption

## ComfyUI vs Automatic1111

| Criterion | ComfyUI | Automatic1111 |
|---|---|---|
| Beginner ease | Difficult | Medium |
| Granular control | Excellent | Limited |
| Performance | Better | Good |
| Workflow flexibility | Unlimited | Limited to tabs |
| Community and extensions | Very active | Very active |
| Learning curve | Steep | Moderate |
| Ideal for | Pros and power users | General users |

ComfyUI isn't "better" than Automatic1111; it's different. If Automatic1111 is an automatic car, ComfyUI is a race car with manual transmission. More control, more power, but more learning.

## Resources for going further

- **ComfyUI GitHub**: The official repository with documentation
- **ComfyUI-Manager**: For easily installing custom nodes
- **Comfy Workflows**: A community site for sharing workflows
- **Reddit r/ComfyUI**: Discussions, shares, and help
- **YouTube**: Many detailed video tutorials

To compare Stable Diffusion with other generators, check out our [Midjourney vs DALL-E 3 vs Stable Diffusion comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion).

## FAQ

### Is ComfyUI really free?

Yes, ComfyUI is entirely free and open source. You can use, modify, and distribute it without any license restrictions. The only costs are hardware (GPU) or cloud services if you don't have a sufficient machine. Stable Diffusion models themselves are generally free for non-commercial use, but check specific licenses.

### Do I need to be a developer to use ComfyUI?

No, but it helps for technical aspects like installation and troubleshooting. ComfyUI is a visual interface; you don't write code for daily use. However, understanding basic concepts (latent, VAE, CLIP, sampling) is essential. This guide and community resources will give you the necessary foundations.

### Can I use ComfyUI without an NVIDIA GPU?

Technically yes, but it's not recommended. ComfyUI primarily runs with CUDA (NVIDIA). There is ROCm support for AMD GPUs and MPS support for Apple Silicon chips, but compatibility and performance are inferior. If you don't have an NVIDIA GPU, consider a cloud solution like RunPod or Google Colab.

### How do I import a workflow shared by someone else?

It's very simple. Download the workflow JSON file, then in ComfyUI go to the Load menu (or Ctrl+O) and select the file. Missing nodes will be flagged and you can install them via ComfyUI-Manager. Also make sure you have the required models and LoRAs in your folders.

### Is ComfyUI suitable for professional production?

Absolutely. Many studios and agencies use ComfyUI in production. Its reproducible workflow system, built-in API, and ability to automate complex pipelines make it a tool of choice for professional environments. The API allows integrating ComfyUI into CI/CD pipelines or SaaS products.

## Update — April 2026

ComfyUI continues to evolve at a steady pace. Here are the latest developments:

- **ComfyUI v0.3+**: The interface has been significantly improved with a better node manager, automatic workflow saving, and faster node search. Dark mode is finally available natively.
- **ComfyUI-Manager**: The management extension has become indispensable. It lets you install, update, and manage custom nodes in one click, with automatic dependency checking.
- **New model support**: ComfyUI now natively supports SD3.5, Flux, PixArt, and next-generation models. Nodes update automatically to support new architectures.
- **API and automation**: ComfyUI's API has been enriched with websocket support for real-time tracking, batch execution, and post-processing hooks. This greatly facilitates integration into production workflows.
- **Community nodes**: The custom node ecosystem has exploded with over 2,000 nodes available. Specialized node packs exist for animation, video, selective editing, and post-processing effects.
- **Flux impact**: The Flux model from Black Forest Labs found its ideal interface in ComfyUI. Flux workflows have become a standard and the community quickly adopted this new model for its exceptional quality.

If you were hesitating to take the plunge, 2026 is the ideal time. The ecosystem is mature, documentation is rich, and the community is more active than ever.