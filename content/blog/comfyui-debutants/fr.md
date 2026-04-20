---
title: "ComfyUI Expliqué aux Débutants : Comment Prendre le Contrôle Total de Stable Diffusion"
excerpt: "Guide complet pour débuter avec ComfyUI, l'interface node-based qui donne un contrôle total sur Stable Diffusion. Installation, interface, premiers pas et astuces."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "15 min"
coverImage: "/blog/comfyui-debutants/cover.jpg"
---

Si vous avez déjà utilisé Stable Diffusion via Automatic1111 ou des services en ligne, vous connaissez probablement les limites de ces interfaces quand il s'agit de contrôler précisément chaque étape de la génération. **ComfyUI** change la donne. C'est une interface node-based (basée sur des noeuds) qui vous offre un contrôle granulaire sur chaque composant du processus de génération. Et le meilleur : elle est gratuite, open source et étonnamment puissante.

Dans ce guide, nous vous expliquons tout depuis l'installation jusqu'à la création de vos premiers workflows avancés.

## Qu'est-ce que ComfyUI ?

ComfyUI est une interface graphique pour Stable Diffusion qui utilise un système de noeuds (nodes) connectés entre eux pour définir le workflow de génération d'images. Chaque noeud représente une opération spécifique : charger un modèle, écrire un prompt, appliquer un sampler, sauvegarder une image, etc.

Contrairement à Automatic1111 où vous remplissez des champs dans un formulaire, dans ComfyUI vous connectez visuellement des blocs entre eux, comme un circuit. Cela vous permet de voir exactement ce qui se passe à chaque étape, de brancher ou débrancher des composants, et de créer des pipelines complexes impossibles à réaliser avec une interface traditionnelle.

### Pourquoi choisir ComfyUI ?

- **Contrôle total** : Chaque paramètre est visible et modifiable
- **Transparence** : Vous voyez le flux de données à travers les noeuds
- **Flexibilité** : Créez des workflows sur mesure impossibles ailleurs
- **Performance** : Plus rapide qu'Automatic1111 grâce à l'optimisation du flux
- **Communauté** : Des milliers de workflows et noeuds personnalisés partagés en ligne
- **Gratuit et open source** : Aucun coût de licence

Pour comprendre comment ComfyUI s'intègre dans une stratégie professionnelle avec Stable Diffusion, consultez notre [guide pour obtenir des résultats professionnels](/blog/stable-diffusion-resultats-pro).

## Prérequis matériels et logiciels

Avant d'installer ComfyUI, vérifiez que votre système répond aux exigences minimales.

### Configuration matérielle recommandée

| Composant | Minimum | Recommandé | Idéal |
|---|---|---|---|
| GPU (VRAM) | 8 Go | 12 Go | 24 Go (RTX 4090) |
| RAM | 16 Go | 32 Go | 64 Go |
| Stockage | 20 Go SSD | 100 Go SSD | 500 Go NVMe |
| CPU | 4 coeurs | 8 coeurs | 12+ coeurs |

Les modèles SDXL nécessitent au minimum 8 Go de VRAM pour fonctionner correctement. Les modèles SD1.5 peuvent tourner sur 6 Go. Si vous n'avez pas de GPU suffisant, des solutions cloud comme RunPod ou Google Colab restent viables.

### Logiciels requis

- Python 3.10 ou 3.11
- Git
- CUDA Toolkit (pour les GPU NVIDIA)
- Un navigateur web moderne (Chrome, Firefox, Edge)

## Installation de ComfyUI

### Méthode 1 : Installation manuelle (recommandée pour apprendre)

```bash
# Cloner le dépôt
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate sur Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer ComfyUI
python main.py
```

Une fois lancé, ouvrez votre navigateur à l'adresse `http://127.0.0.1:8188` pour accéder à l'interface.

### Méthode 2 : Installation via ComfyUI Portable (Windows)

Pour les utilisateurs Windows, un package portable est disponible sur le GitHub de ComfyUI. Il inclut Python, les dépendances et l'interface prêts à l'emploi. Il suffit de télécharger, décompresser et lancer `run_nvidia_gpu.bat`.

### Méthode 3 : Via le gestionnaire ComfyUI-Manager

ComfyUI-Manager est une extension qui simplifie l'installation de noeuds personnalisés et de modèles. Pour l'installer :

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
```

Redémarrez ComfyUI et un nouveau menu Manager apparaît dans l'interface.

## Comprendre l'interface de ComfyUI

Quand vous ouvrez ComfyUI pour la première fois, l'interface peut sembler intimidante. Décomposons-la.

### Les zones principales

| Zone | Description |
|---|---|
| **Canvas** | L'espace de travail où vous placez et connectez les noeuds |
| **Menu latéral** | Actions rapides : sauvegarder, charger, exécuter |
| **Barre d'outils** | Zoom, navigation, mode queue |
| **Panneau d'info** | Détails du noeud sélectionné, paramètres |

### Navigation dans le canvas

- **Clic gauche** : Sélectionner un noeud
- **Clic gauche + glisser** : Déplacer un noeud
- **Clic droit** : Menu contextuel pour ajouter un noeud
- **Molette de souris** : Zoomer / dézoomer
- **Clic milieu + glisser** : Déplacer la vue
- **Double-clic sur le canvas** : Recherche rapide de noeud

### Ajouter un noeud

Faites un clic droit sur le canvas, puis naviguez dans les catégories pour trouver le noeud souhaité. Vous pouvez aussi utiliser la recherche rapide en tapant le nom du noeud après un double-clic.

## Les noeuds essentiels à connaître

Voici les noeuds que vous utiliserez dans pratiquement tous vos workflows.

### Noeuds de chargement

| Noeud | Fonction | Ports de sortie |
|---|---|---|
| **CheckpointLoaderSimple** | Charge un modèle SD complet | MODEL, CLIP, VAE |
| **LoraLoader** | Applique un LoRA au modèle | MODEL, CLIP |
| **VAELoader** | Charge un VAE spécifique | VAE |
| **ControlNetLoader** | Charge un modèle ControlNet | CONTROL_NET |
| **CLIPVisionLoader** | Charge un encodeur CLIP Vision | CLIP_VISION |

### Noeuds de prompt

| Noeud | Fonction |
|---|---|
| **CLIPTextEncode** | Encode un prompt textuel (positif ou négatif) |
| ** ConditioningZeroOut** | Désactive un conditionnement |
| **ConditioningCombine** | Combine plusieurs conditionnements |

### Noeuds de génération

| Noeud | Fonction |
|---|---|
| **KSampler** | Le moteur de génération principal : applique le sampling |
| **KSamplerAdvanced** | Version avancée avec contrôle sur les étapes |
| **SamplerCustom** | Contrôle encore plus fin du processus de sampling |

### Noeuds de post-traitement

| Noeud | Fonction |
|---|---|
| **VAEDecode** | Convertit le latent en image visible |
| **VAEEncode** | Convertit une image en latent (pour img2img) |
| **SaveImage** | Sauvegarde l'image sur le disque |
| **PreviewImage** | Affiche un aperçu sans sauvegarder |

## Votre premier workflow : génération text-to-image

Commençons par le workflow le plus basique : générer une image à partir d'un prompt texte.

### Étape 1 : Charger le modèle

1. Clic droit sur le canvas > Add Node > Loaders > CheckpointLoaderSimple
2. Dans le champ `ckpt_name`, sélectionnez votre modèle (par exemple `sd_xl_base_1.0.safetensors`)

### Étape 2 : Configurer les prompts

1. Ajoutez deux noeuds **CLIPTextEncode**
2. Connectez le port `CLIP` du CheckpointLoader aux deux noeuds CLIPTextEncode
3. Dans le premier, écrivez votre prompt positif
4. Dans le second, écrivez votre prompt négatif

**Exemple de prompt positif :** `Portrait d'une femme avec des lunettes, éclairage doux, fond flou, photographie professionnelle, haute qualité`

**Exemple de prompt négatif :** `flou, déformé, mauvaise anatomie, texte, watermark, basse qualité`

### Étape 3 : Configurer le KSampler

1. Ajoutez un noeud **KSampler**
2. Connectez les ports comme suit :
   - `MODEL` du CheckpointLoader vers `model` du KSampler
   - `CONDITIONING` du prompt positif vers `positive` du KSampler
   - `CONDITIONING` du prompt négatif vers `negative` du KSampler
   - Ajoutez un noeud **EmptyLatentImage** et connectez son `LATENT` vers `latent_image` du KSampler

### Étape 4 : Paramétrer le KSampler

| Paramètre | Valeur recommandée | Description |
|---|---|---|
| steps | 20-30 | Nombre d'étapes de débruitage |
| cfg | 7-8 | Force d'influence du prompt |
| sampler_name | euler_ancestral | Algorithme de sampling |
| scheduler | normal | Planification du bruit |
| denoise | 1.0 | Force de débruitage (1.0 = image from scratch) |

### Étape 5 : Décoder et sauvegarder

1. Ajoutez un noeud **VAEDecode**
2. Connectez `LATENT` du KSampler vers `samples` du VAEDecode
3. Connectez `VAE` du CheckpointLoader vers `vae` du VAEDecode
4. Ajoutez un noeud **SaveImage**
5. Connectez `IMAGE` du VAEDecode vers `images` du SaveImage

### Étape 6 : Générer !

Cliquez sur le bouton **Queue Prompt** (ou appuyez sur Ctrl+Entrée). ComfyUI exécute le workflow dans l'ordre des connexions et affiche l'image résultat.

## Workflow templates essentiels

Une fois le workflow de base maîtrisé, voici des templates pour des cas d'usage avancés.

### Template 1 : Génération avec LoRA

Ajoutez un noeud **LoraLoader** entre le CheckpointLoader et le KSampler. Connectez les ports `MODEL` et `CLIP` du LoRA vers le KSampler. Spécifiez le nom du LoRA et ajustez les forces (strength_model et strength_clip entre 0.5 et 1.0).

Ce workflow est essentiel pour maintenir un style cohérent, comme nous l'expliquons dans notre [guide pour des résultats professionnels avec Stable Diffusion](/blog/stable-diffusion-resultats-pro).

### Template 2 : ControlNet pour le contrôle de pose

1. Chargez une image de référence avec **LoadImage**
2. Ajoutez un noeud **ControlNetApply**
3. Connectez le ControlNet, l'image de conditionnement et le modèle
4. Le ControlNet guide la génération pour respecter la pose, les contours ou la profondeur de l'image de référence

### Template 3 : Img2Img (génération à partir d'une image)

1. Chargez une image avec **LoadImage**
2. Encodez-la en latent avec **VAEEncode**
3. Connectez le latent au port `latent_image` du KSampler
4. Réglez `denoise` entre 0.3 et 0.7 pour contrôler le degré de transformation

### Template 4 : Upscaling avec un modèle ESA

1. Générez votre image normalement
2. Ajoutez un noeud **UpscaleLatent** ou **UpscaleImage**
3. Passez l'image upscalée dans un second KSampler avec un `denoise` faible (0.2-0.4) pour affiner les détails
4. Sauvegardez le résultat final

### Template 5 : Passage haute résolution (Hires Fix)

Le Hires Fix consiste à générer d'abord à basse résolution, puis à upscaler et affiner. Ce workflow se construit en deux étapes dans ComfyUI :

1. Premier KSampler à 512x512 ou 1024x1024
2. Upscale à 2x
3. Second KSampler avec denoise 0.3-0.5 pour affiner les détails à haute résolution

## Astuces pour les débutants

### Commencez simple

Ne cherchez pas à construire des workflows complexes dès le début. Maîtrisez le workflow text-to-image basique avant d'ajouter des LoRA, ControlNet ou des étapes d'upscaling. La complexité viendra naturellement.

### Utilisez les workflows de la communauté

ComfyUI possède une communauté active qui partage des workflows complets au format JSON. Vous pouvez les importer directement via le menu Load. C'est le meilleur moyen d'apprendre : analysez un workflow qui fonctionne, modifiez-le progressivement et comprenez chaque connexion.

### Sauvegardez vos workflows

Prenez l'habitude de sauvegarder vos workflows régulièrement avec Ctrl+S. Vous pouvez aussi les exporter en JSON pour les partager ou les réutiliser. Un workflow bien construit est un outil précieux que vous réutiliserez souvent.

### Apprenez les raccourcis clavier

| Raccouti | Action |
|---|---|
| Ctrl+Entrée | Lancer la génération |
| Ctrl+S | Sauvegarder le workflow |
| Ctrl+O | Charger un workflow |
| Ctrl+Z | Annuler la dernière action |
| Suppr | Supprimer le noeud sélectionné |
| Ctrl+D | Dupliquer le noeud sélectionné |
| M | Basculer en mode déplacement |

### Surveillez la consommation VRAM

ComfyUI affiche la consommation VRAM dans la console. Si vous voyez des erreurs CUDA Out of Memory, essayez ces solutions :

- Réduisez la résolution du latent (512x512 au lieu de 1024x1024)
- Activez le mode `--lowvram` au lancement
- Utilisez des modèles quantifiés (FP8, GGUF)
- Passez par `--fp16-vae` pour réduire la consommation du VAE

## ComfyUI vs Automatic1111

| Critère | ComfyUI | Automatic1111 |
|---|---|---|
| Facilité de début | Difficile | Moyenne |
| Contrôle granulaire | Excellent | Limité |
| Performance | Meilleure | Bonne |
| Flexibilité des workflows | Illimitée | Limitée aux onglets |
| Communauté et extensions | Très active | Très active |
| Courbe d'apprentissage | Raide | Modérée |
| Idéal pour | Pros et power users | Utilisateurs généraux |

ComfyUI n'est pas « meilleur » qu'Automatic1111 ; il est différent. Si Automatic1111 est une voiture automatique, ComfyUI est une voiture de course avec boîte manuelle. Plus de contrôle, plus de puissance, mais plus d'apprentissage.

## Ressources pour aller plus loin

- **ComfyUI GitHub** : Le dépôt officiel avec la documentation
- **ComfyUI-Manager** : Pour installer facilement des noeuds personnalisés
- **Comfy Workflows** : Un site communautaire de partage de workflows
- **Reddit r/ComfyUI** : Discussions, partages et aide
- **YouTube** : De nombreux tutoriels vidéo détaillés

Pour comparer Stable Diffusion avec d'autres générateurs, consultez notre [comparaison Midjourney vs DALL-E 3 vs Stable Diffusion](/blog/midjourney-vs-dalle-vs-stable-diffusion).

## FAQ

### ComfyUI est-il vraiment gratuit ?

Oui, ComfyUI est entièrement gratuit et open source. Vous pouvez l'utiliser, le modifier et le distribuer sans aucune restriction de licence. Les seuls coûts sont le matériel (GPU) ou les services cloud si vous n'avez pas de machine suffisante. Les modèles Stable Diffusion eux-mêmes sont gratuits pour un usage non commercial en général, mais vérifiez les licences spécifiques.

### Ai-je besoin d'être développeur pour utiliser ComfyUI ?

Non, mais cela aide pour les aspects techniques comme l'installation et le dépannage. ComfyUI est une interface visuelle, vous n'écrivez pas de code pour l'utiliser au quotidien. Cependant, comprendre les concepts de base (latent, VAE, CLIP, sampling) est essentiel. Ce guide et les ressources communautaires vous donneront les bases nécessaires.

### Peut-on utiliser ComfyUI sans GPU NVIDIA ?

Techniquement oui, mais c'est déconseillé. ComfyUI fonctionne principalement avec CUDA (NVIDIA). Il existe un support ROCm pour les GPU AMD et un support MPS pour les puces Apple Silicon, mais la compatibilité et les performances sont inférieures. Si vous n'avez pas de GPU NVIDIA, envisagez une solution cloud comme RunPod ou Google Colab.

### Comment importer un workflow partagé par quelqu'un d'autre ?

C'est très simple. Téléchargez le fichier JSON du workflow, puis dans ComfyUI allez dans le menu Load (ou Ctrl+O) et sélectionnez le fichier. Les noeuds manquants seront signalés et vous pourrez les installer via ComfyUI-Manager. Assurez-vous aussi d'avoir les modèles et LoRA requis dans vos dossiers.

### ComfyUI est-il adapté à la production professionnelle ?

Absolument. De nombreux studios et agences utilisent ComfyUI en production. Son système de workflows reproductibles, son API intégrée et sa capacité à automatiser des pipelines complexes en font un outil de choix pour les environnements professionnels. L'API permet d'intégrer ComfyUI dans des pipelines CI/CD ou des produits SaaS.

## Mise à jour — Avril 2026

ComfyUI continue d'évoluer à un rythme soutenu. Voici les dernières évolutions :

- **ComfyUI v0.3+** : L'interface a été considérablement améliorée avec un meilleur gestionnaire de noeuds, la sauvegarde automatique des workflows et une recherche de noeuds plus rapide. Le mode sombre est enfin disponible nativement.
- **ComfyUI-Manager** : L'extension de gestion est devenue indispensable. Elle permet d'installer, mettre à jour et gérer les noeuds personnalisés en un clic, avec vérification automatique des dépendances.
- **Support des nouveaux modèles** : ComfyUI supporte désormais nativement SD3.5, Flux, PixArt et les modèles de nouvelle génération. Les noeuds se mettent à jour automatiquement pour supporter les nouvelles architectures.
- **API et automatisation** : L'API de ComfyUI s'est enrichie avec le support des websockets pour le suivi en temps réel, l'exécution par lots et les hooks de post-traitement. Cela facilite grandement l'intégration dans des workflows de production.
- **Noeuds communautaires** : L'écosystème de noeuds personnalisés a explosé avec plus de 2 000 noeuds disponibles. Des packs de noeuds spécialisés existent pour l'animation, la vidéo, l'édition sélective et les effets de post-traitement.
- **Impact de Flux** : Le modèle Flux de Black Forest Labs a trouvé dans ComfyUI son interface de prédilection. Les workflows Flux sont devenus un standard et la communauté a rapidement adopté ce nouveau modèle pour sa qualité exceptionnelle.

Si vous hésitiez à franchir le pas, 2026 est le moment idéal. L'écosystème est mature, la documentation est riche et la communauté est plus active que jamais.