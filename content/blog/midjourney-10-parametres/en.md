---
title: "Midjourney: The 10 Parameters You Absolutely Need to Know"
excerpt: "Detailed guide to the 10 essential Midjourney parameters: --ar, --stylize, --chaos, --weird, --tile, --stop, --quality, --style raw, --v and --c with examples and use cases."
date: "2026-04-19"
author: "Pulseia"
category: "AI"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

Midjourney is famous for the beauty of its generations, but many users simply type a prompt and hit Enter without leveraging the parameters that truly transform the results. These parameters are the transition from "random" mode to "control" mode. Mastering them is the difference between an average image and one that exactly matches your vision.

Here are the 10 parameters every Midjourney user needs to know, with detailed explanations, concrete examples, and usage tips for each one.

For an overview of Midjourney's strengths compared to its competitors, check out our [Midjourney vs DALL-E 3 vs Stable Diffusion comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion). If you're hesitating between Midjourney and DALL-E for your use case, our [choice guide](/blog/dalle-vs-midjourney-guide-choix) will help you decide.

## 1. --ar (Aspect Ratio)

### What it does

The `--ar` parameter controls the width-to-height ratio of the generated image. By default, Midjourney produces square images (1:1). With `--ar`, you can create panoramic, vertical, or any format images.

### Syntax

```
your prompt --ar 16:9
```

### Common ratios and uses

| Ratio | Typical dimensions | Ideal use |
|---|---|---|
| `--ar 1:1` | 1024x1024 | Square Instagram posts, icons |
| `--ar 4:3` | 1024x768 | Classic photos, presentations |
| `--ar 3:2` | 1024x683 | Standard photography |
| `--ar 16:9` | 1024x576 | YouTube, presentations, banners |
| `--ar 21:9` | 1024x439 | Cinema, ultra-panoramic |
| `--ar 9:16` | 576x1024 | Stories, Reels, TikTok, posters |
| `--ar 2:3` | 683x1024 | Portraits, vertical posters |
| `--ar 3:4` | 768x1024 | Book covers |

### Examples

```
Sunset over an alpine lake --ar 16:9
```
Produces a spectacular panoramic landscape, ideal for a wallpaper or banner.

```
Portrait of an elegant woman in an evening gown --ar 2:3
```
Produces a vertical portrait that highlights the subject.

### Pro tip

The ratio influences the composition. A panoramic format pushes the model to create wide compositions with elements distributed horizontally. A vertical format favors compositions centered on a tall subject. Choose your ratio before writing your prompt so the model optimizes the composition for that format.

## 2. --stylize (or --s)

### What it does

The `--stylize` parameter controls the degree of artistic interpretation Midjourney applies to your prompt. A low value produces images more faithful to the text, while a high value allows the model to add its own artistic touch.

### Value range

| Value | Effect | Use |
|---|---|---|
| `--s 0` | No stylization, raw output | When prompt fidelity is paramount |
| `--s 25-50` | Slight stylization | Documentary realism |
| `--s 100` | Default value (v6) | Natural balance |
| `--s 250-500` | Strong stylization | Art, illustration |
| `--s 750-1000` | Very strong stylization | Surprising, experimental results |

### Examples

```
Alley cat on a couch --s 0
```
Very faithful to the prompt, photographic, with no embellishment.

```
Alley cat on a couch --s 750
```
Highly stylized image, saturated colors, dramatic composition — the cat almost becomes a character.

### Pro tip

For marketing visuals where you want precise control, stay at `--s 50-100`. For creative illustrations and artistic concepts, go up to `--s 250-500`. Beyond that, results become unpredictable but sometimes fascinating.

## 3. --chaos (or --c)

### What it does

The `--chaos` parameter modifies the variety of results in the initial grid of 4 images. A low value produces 4 similar images, while a high value produces 4 very different images from each other.

### Value range: 0 to 100

| Value | Effect | Use |
|---|---|---|
| `--c 0` | Very consistent results (default) | You know what you want |
| `--c 25` | Moderate variations | Exploration around a theme |
| `--c 50` | Significant variations | Searching for ideas |
| `--c 100` | Highly divergent results | Maximum exploration, serendipity |

### Examples

```
Futuristic city at night --c 0
```
4 consistent images representing similar futuristic cities.

```
Futuristic city at night --c 100
```
4 very different images: one cyberpunk, one bioluminescent, one steampunk, one minimalist. Plenty of inspiration to be found.

### Pro tip

Use `--c 50-100` at the start of a creative project to explore the range of possibilities. Once you've found a direction, lower the chaos and iterate on that base with variations (V1-V4 buttons).

## 4. --weird (or --w)

### What it does

The `--weird` parameter introduces "weirdness" into the generation. It pushes the model out of its usual latent space, producing unusual, surreal, or unsettling results. It's the go-to tool for experimental art.

### Value range: 0 to 3000

| Value | Effect | Use |
|---|---|---|
| `--w 0` | Normal (default) | Standard use |
| `--w 250-500` | Slightly unusual | Creative twist |
| `--w 1000-2000` | Very unusual | Surreal, experimental art |
| `--w 2500-3000` | Extremely bizarre | Abstract art, glitch art |

### Examples

```
Flower garden at dusk --w 0
```
A classic and beautiful flower garden.

```
Flower garden at dusk --w 1500
```
A garden where flowers have impossible shapes, colors blend strangely, and perspective distorts. Often a fascinating result.

### Pro tip

Combine `--weird` and `--chaos` for maximum exploration: `--c 100 --w 2000` produces truly unique results. But keep in mind that results become less predictable and less "beautiful" in the conventional sense.

## 5. --tile

### What it does

The `--tile` parameter generates images that can be repeated as tiles without visible seams. The edges of the image connect perfectly, allowing you to create seamless textures and infinite patterns.

### Syntax

```
blue and gold geometric pattern --tile
```

### Common uses

| Use | Prompt example |
|---|---|
| Video game textures | `medieval stone texture --tile` |
| Wallpapers | `art deco floral pattern --tile` |
| Website backgrounds | `subtle abstract pattern --tile` |
| Textiles | `modern tartan pattern --tile` |
| Packaging | `repeating pattern for gift wrap --tile` |

### Full example

```
Seamless geometric pattern, art deco style, gold and navy blue, elegant --tile
```
Produces an art deco pattern that repeats perfectly. Test it by copying it side by side to verify continuity.

### Pro tip

`--tile` works particularly well with prompts that describe patterns (pattern, texture, repeat) rather than narrative scenes. Geometric, floral, and abstract styles yield the best results. Avoid prompts with specific subjects (characters, buildings) that don't lend themselves to repetition.

## 6. --stop

### What it does

The `--stop` parameter interrupts the generation process at a given percentage, before full completion. This produces partially generated images that are softer, blurrier, or more abstract.

### Value range: 10 to 100

| Value | Effect | Use |
|---|---|---|
| `--stop 100` | Full generation (default) | Normal final result |
| `--stop 80-90` | Slightly unfinished | Soft effect, watercolor |
| `--stop 50-70` | Partially generated | Sketch effect, abstract |
| `--stop 10-40` | Very little progress | Abstract art, structured noise |

### Examples

```
Impressionist portrait of a woman --stop 80
```
Generates a portrait that retains a "work in progress" look, like an unfinished painting, with fine details missing and an overall more artistic effect.

### Pro tip

`--stop` is excellent for creating images with a sketch or watercolor style. It can also be used to pre-generate a base that you then refine with external tools or by relaunching with the same seed.

## 7. --quality (or --q)

### What it does

The `--quality` parameter controls the computing time invested in generation. A higher value means more denoising steps and therefore more detail, at the cost of longer generation time and higher GPU consumption.

### Available values

| Value | Time | Quality | GPU consumption |
|---|---|---|---|
| `--q 0.25` | Fast | Basic | 0.25x |
| `--q 0.5` | Medium | Intermediate | 0.5x |
| `--q 1` | Normal | Complete (default) | 1x |
| `--q 2` | Long | High | 2x |

### Examples

```
detailed mountain landscape --q 2
```
Generates with double the steps, producing finer details. Useful for images that will be enlarged or printed.

### Pro tip

Use `--q 0.5` for fast iterations during the research phase. Switch to `--q 1` or `--q 2` for final generation. The difference between `--q 1` and `--q 2` is often subtle but visible on fine details and textures.

## 8. --style raw

### What it does

The `--style raw` parameter disables the default "Midjourney style." Without this parameter, Midjourney automatically applies a certain artistic embellishment to all generations. With `--style raw`, the model follows the prompt more literally and produces more neutral, more photographic results.

### Syntax

```
street photo in Tokyo --style raw
```

### Comparison

| Mode | Characteristics | Use |
|---|---|---|
| Default (without --style raw) | Enriched colors, dramatic composition, "Midjourney" style | Artistic visuals, illustrations |
| `--style raw` | More neutral, more faithful to prompt, less embellished | Realistic photography, precise references |

### Examples

```
Studio portrait of a man in a suit --style raw
```
Without `--style raw`, the portrait would have enriched colors and dramatic lighting. With it, it looks more like a real studio photo.

### Pro tip

For any photorealism work, `--style raw` is almost essential. It eliminates the "Midjourney look" that can be recognizable and undesirable in a professional context. Combine it with `--s 50` for an even more faithful result.

## 9. --v (Version)

### What it does

The `--v` parameter specifies which version of the Midjourney model to use. Each version has its own stylistic characteristics and capabilities.

### Available versions

| Version | Release | Characteristics | Strengths |
|---|---|---|---|
| `--v 4` | 2022 | First major version | Painterly style |
| `--v 5` | 2023 | Leap in photorealism | Photorealism, anatomy |
| `--v 5.2` | 2023 | Improvement on v5 | Consistency, details |
| `--v 6` | 2024 | Readable text, new details | Overall quality, text |
| `--v 6.1` | 2025 | Refinement and consistency | Photorealism, texture |
| `--v 7` | 2026 (beta) | New architecture | Expected: better control |

### Examples

```
Futuristic spaceship cockpit --v 5.2
```
Uses the v5.2 model for a more painterly and consistent render.

```
Futuristic spaceship cockpit --v 6.1
```
Uses the v6.1 model for a more realistic and detailed render.

### Pro tip

In 2026, `--v 6.1` is the recommended default choice for most uses. Try `--v 5.2` for a more painted and less photographic style. Watch for v7 updates that promise a leap in quality.

## 10. --c (Image Weight)

### What it does

The `--c` (or image weight) parameter controls the influence of a reference image relative to the text prompt during image-based generation (image prompt). It determines how much the reference image dictates the result.

### Value range

| Value | Effect | Use |
|---|---|---|
| `--c 0` | Image ignored | Text prompt only |
| `--c 0.25` | Slight influence | Subtle style from the reference |
| `--c 0.5` | Moderate influence | Balance text and image |
| `--c 1` | Strong influence (default) | Image strongly guides |
| `--c 2+` | Image dominates | Near-reproduction of the reference |

### Examples

```
[image_url] cyberpunk landscape --c 0.5
```
The result will be equally influenced by the reference image and the text "cyberpunk landscape."

### Pro tip

`--c 0.25-0.5` is ideal for transferring the style of an image without copying its content. `--c 1-2` is useful when you want the model to closely follow the composition or colors of a reference. Note that this parameter only works with image prompts, not text-only prompts.

## Parameter summary table

| Parameter | Range | Default | Main effect |
|---|---|---|---|
| `--ar` | Free ratios | 1:1 | Image format |
| `--stylize` | 0-1000 | 100 | Artistic interpretation |
| `--chaos` | 0-100 | 0 | Result variety |
| `--weird` | 0-3000 | 0 | Weirdness / originality |
| `--tile` | On/Off | Off | Repeating pattern |
| `--stop` | 10-100 | 100 | Partial generation stop |
| `--quality` | 0.25-2 | 1 | Detail level |
| `--style raw` | On/Off | Off | Neutral / realistic style |
| `--v` | 4-7 | 6.1 | Model version |
| `--c` | 0-2+ | 1 | Reference image weight |

## Winning parameter combinations

### Professional photorealism

```
prompt --ar 3:2 --style raw --s 50 --v 6.1 --q 2
```

### Artistic illustration

```
prompt --ar 2:3 --s 500 --v 6.1 --c 50
```

### Creative exploration

```
prompt --ar 16:9 --c 100 --w 1000 --v 6.1
```

### Video game texture

```
prompt --tile --s 200 --style raw --v 6.1
```

### Quick sketch

```
prompt --stop 60 --s 100 --v 5.2
```

## FAQ

### Can you combine all parameters at the same time?

Technically yes, but it's not recommended. Some parameters contradict each other (for example `--style raw` and `--s 750`). Other combinations produce incoherent results. Start with 2-3 parameters maximum and add them progressively while observing their effect. The most common combination is `--ar` + `--s` + `--style raw` or `--v`.

### Can the --weird parameter ruin an image?

Yes, high values of `--weird` (above 2000) can produce illegible or chaotic images. Start with moderate values (250-500) and increase gradually. The parameter is designed for experimentation, not for commercial visual production. It's best used during the creative research phase.

### Is --style raw always better for photorealism?

In the vast majority of cases, yes. `--style raw` eliminates Midjourney's automatic embellishment and produces images that are more neutral and closer to real photography. However, for certain photographic styles (fashion, beauty), Midjourney's default style may be preferable as it adds a natural "magazine" quality. Test both for each project.

### Which Midjourney version should you use in 2026?

Version 6.1 is the recommended default choice. It offers the best overall quality, good photorealism, and improved text rendering. Version 5.2 remains useful for a more painted and pictorial style. Version 7 (in beta) promises significant improvements but is not yet stable for production. Avoid versions 4 and 5, which are largely outdated.

### How to choose between --chaos and --weird?

`--chaos` increases the variety between the 4 images in the grid: each image is different but each remains "normal." `--weird` makes each individual image more unusual and bizarre. Use `--chaos` when you want to explore different interpretations of the same concept. Use `--weird` when you want the results themselves to be surprising or surreal. You can combine them for maximum originality.

## Update — April 2026

Midjourney's parameters continue to evolve with model versions:

- **Midjourney v6.1** has refined the behavior of all existing parameters. `--stylize` is more subtle, `--style raw` is more neutral, and `--chaos` produces more useful variations.
- **Midjourney v7 (beta)** introduces new composition and lighting control parameters, still in the testing phase. The `--p` (perspective) parameter is experimental and allows controlling the viewing angle.
- **Web interface**: The Midjourney web interface now integrates sliders for parameters, making adjustment more intuitive. You can still use text syntax for precise control.
- **Panning and Zoom**: The zoom and panning features (added in 2024) integrate seamlessly with existing parameters, allowing you to extend an image in one direction while preserving the style.
- **Consistency**: The `--cw` (character consistency) feature maintains character consistency across multiple generations, a need often expressed by content creators.

To compare the impact of these parameters with the capabilities of other generators, check out our [complete comparison](/blog/midjourney-vs-dalle-vs-stable-diffusion) and our [DALL-E vs Midjourney choice guide](/blog/dalle-vs-midjourney-guide-choix).