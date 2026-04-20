---
title: "Midjourney : les 10 Paramètres que Vous Devez Absolument Connaître"
excerpt: "Guide détaillé des 10 paramètres essentiels de Midjourney : --ar, --stylize, --chaos, --weird, --tile, --stop, --quality, --style raw, --v et --c avec exemples et cas d'usage."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

Midjourney est célèbre pour la beauté de ses générations, mais beaucoup d'utilisateurs se contentent de taper un prompt et d'appuyer sur Entrée sans exploiter les paramètres qui transforment vraiment les résultats. Ces paramètres sont le passage du mode « aléatoire » au mode « contrôle ». Les maîtriser, c'est la différence entre une image moyenne et une image exactement conforme à votre vision.

Voici les 10 paramètres que tout utilisateur de Midjourney doit connaître, avec des explications détaillées, des exemples concrets et des conseils d'utilisation pour chacun.

Pour une vue d'ensemble des forces de Midjourney par rapport à ses concurrents, consultez notre [comparaison Midjourney vs DALL-E 3 vs Stable Diffusion](/blog/midjourney-vs-dalle-vs-stable-diffusion). Si vous hésitez entre Midjourney et DALL-E pour votre usage, notre [guide de choix](/blog/dalle-vs-midjourney-guide-choix) vous aidera à décider.

## 1. --ar (Aspect Ratio)

### Ce qu'il fait

Le paramètre `--ar` contrôle le rapport largeur/hauteur de l'image générée. Par défaut, Midjourney produit des images carrées (1:1). Avec `--ar`, vous pouvez créer des images panoramiques, verticales ou dans n'importe quel format.

### Syntaxe

```
votre prompt --ar 16:9
```

### Ratios courants et usages

| Ratio | Dimensions typiques | Usage idéal |
|---|---|---|
| `--ar 1:1` | 1024x1024 | Posts Instagram carrés, icônes |
| `--ar 4:3` | 1024x768 | Photos classiques, présentations |
| `--ar 3:2` | 1024x683 | Photographie standard |
| `--ar 16:9` | 1024x576 | YouTube, présentations, bannières |
| `--ar 21:9` | 1024x439 | Cinéma, ultra-panoramique |
| `--ar 9:16` | 576x1024 | Stories, Reels, TikTok, affiches |
| `--ar 2:3` | 683x1024 | Portraits, affiches verticales |
| `--ar 3:4` | 768x1024 | Couvertures de livre |

### Exemples

```
Coucher de soleil sur un lac alpin --ar 16:9
```
Produit un paysage panoramique spectaculaire, idéal pour un fond d'écran ou une bannière.

```
Portrait d'une femme élégante en robe de soirée --ar 2:3
```
Produit un portrait vertical qui met en valeur le sujet.

### Conseil pro

Le ratio influence la composition. Un format panoramique pousse le modèle à créer des compositions larges avec des éléments répartis horizontalement. Un format vertical favorise les compositions centrées sur un sujet haut. Choisissez votre ratio avant d'écrire votre prompt pour que le modèle optimise la composition pour ce format.

## 2. --stylize (ou --s)

### Ce qu'il fait

Le paramètre `--stylize` contrôle le degré d'interprétation artistique que Midjourney applique à votre prompt. Une valeur faible produit des images plus fidèles au texte, une valeur élevée permet au modèle d'ajouter sa touche artistique personnelle.

### Plage de valeurs

| Valeur | Effet | Usage |
|---|---|---|
| `--s 0` | Aucune stylisation, sortie brute | Quand la fidélité au prompt est primordiale |
| `--s 25-50` | Légère stylisation | Réalisme documentaire |
| `--s 100` | Valeur par défaut (v6) | Équilibre naturel |
| `--s 250-500` | Forte stylisation | Art, illustration |
| `--s 750-1000` | Très forte stylisation | Résultats surprenants, expérimentaux |

### Exemples

```
Chat de gouttière sur un canapé --s 0
```
Image très fidèle au prompt, photographique, sans embellissement.

```
Chat de gouttière sur un canapé --s 750
```
Image très stylisée, couleurs saturées, composition dramatique, le chat devient presque un personnage.

### Conseil pro

Pour les visuels marketing où vous voulez un contrôle précis, restez en `--s 50-100`. Pour les illustrations créatives et les concepts artistiques, montez à `--s 250-500`. Au-delà, les résultats deviennent imprévisibles mais parfois fascinants.

## 3. --chaos (ou --c)

### Ce qu'il fait

Le paramètre `--chaos` modifie la variété des résultats dans la grille initiale de 4 images. Une valeur faible produit 4 images similaires, une valeur élevée produit 4 images très différentes les unes des autres.

### Plage de valeurs : 0 à 100

| Valeur | Effet | Usage |
|---|---|---|
| `--c 0` | Résultats très cohérents (défaut) | Vous savez ce que vous voulez |
| `--c 25` | Variations modérées | Exploration autour d'un thème |
| `--c 50` | Variations significatives | Recherche d'idées |
| `--c 100` | Résultats très divergents | Exploration maximale, sérendipité |

### Exemples

```
Futuristic city at night --c 0
```
4 images cohérentes entre elles, représentant des villes futuristes similaires.

```
Futuristic city at night --c 100
```
4 images très différentes : l'une cyberpunk, l'une bioluminescente, une steampunk, une minimaliste. De quoi trouver l'inspiration.

### Conseil pro

Utilisez `--c 50-100` au début d'un projet créatif pour explorer le champ des possibles. Une fois que vous avez trouvé une direction, baissez le chaos et itérez sur cette base avec des variations (boutons V1-V4).

## 4. --weird (ou --w)

### Ce qu'il fait

Le paramètre `--weird` introduit des « bizarreries » dans la génération. Il pousse le modèle hors de son espace latent habituel, produisant des résultats inhabituels, surréalistes ou dérangeants. C'est l'outil de choix pour l'art expérimental.

### Plage de valeurs : 0 à 3000

| Valeur | Effet | Usage |
|---|---|---|
| `--w 0` | Normal (défaut) | Usage standard |
| `--w 250-500` | Légèrement inhabituel | Twist créatif |
| `--w 1000-2000` | Très inhabituel | Art surréaliste, expérimental |
| `--w 2500-3000` | Extrêmement bizarre | Art abstrait, glitch art |

### Exemples

```
Jardin fleuri au crépuscule --w 0
```
Un jardin fleuri classique et beau.

```
Jardin fleuri au crépuscule --w 1500
```
Un jardin où les fleurs ont des formes impossibles, les couleurs fusionnent de manière étrange, la perspective se tord. Résultat souvent fascinant.

### Conseil pro

Combinez `--weird` et `--chaos` pour une exploration maximale : `--c 100 --w 2000` produit des résultats véritablement uniques. Mais gardez à l'esprit que les résultats deviennent moins prévisibles et moins « beaux » au sens conventionnel.

## 5. --tile

### Ce qu'il fait

Le paramètre `--tile` génère des images qui peuvent être répétées en mosaïque (tuiles) sans joint visible. Les bords de l'image se connectent parfaitement, ce qui permet de créer des textures et des motifs infinis.

### Syntaxe

```
motif géométrique bleu et or --tile
```

### Usages courants

| Usage | Exemple de prompt |
|---|---|
| Textures de jeu vidéo | `texture de pierre médiévale --tile` |
| Papiers peints | `motif floral art déco --tile` |
| Fonds de site web | `motif abstrait subtil --tile` |
| Textiles | `motif écossais moderne --tile` |
| Packaging | `motif répétitif pour papier cadeau --tile` |

### Exemple complet

```
Seamless geometric pattern, art deco style, gold and navy blue, elegant --tile
```
Produit un motif art déco qui se répète parfaitement. Testez-le en le copiant côte à côte pour vérifier la continuité.

### Conseil pro

`--tile` fonctionne particulièrement bien avec des prompts qui décrivent des motifs (pattern, texture, repeat) plutôt que des scènes narratives. Les styles géométriques, floraux et abstraits donnent les meilleurs résultats. Évitez les prompts avec des sujets spécifiques (personnages, bâtiments) qui ne se prêtent pas à la répétition.

## 6. --stop

### Ce qu'il fait

Le paramètre `--stop` interrompt le processus de génération à un pourcentage donné, avant la fin complète. Cela produit des images partiellement générées, plus douces, plus floues ou plus abstraites.

### Plage de valeurs : 10 à 100

| Valeur | Effet | Usage |
|---|---|---|
| `--stop 100` | Génération complète (défaut) | Résultat final normal |
| `--stop 80-90` | Légèrement inachevé | Effet doux, peinture à l'eau |
| `--stop 50-70` | Partiellement généré | Effet esquisse, abstrait |
| `--stop 10-40` | Très peu avancé | Art abstrait, bruit structuré |

### Exemples

```
Portrait impressionniste d'une femme --stop 80
```
Génère un portrait qui conserve un aspect « en cours », comme une peinture non terminée, avec des détails fins manquants et un effet global plus artistique.

### Conseil pro

`--stop` est excellent pour créer des images au style esquisse ou aquarelle. Il peut aussi servir à pré-générer une base que vous affine ensuite avec des outils externes ou en relançant avec le même seed.

## 7. --quality (ou --q)

### Ce qu'il fait

Le paramètre `--quality` contrôle le temps de calcul investi dans la génération. Une valeur plus élevée signifie plus d'étapes de débruitage et donc plus de détails, au prix d'un temps de génération plus long et d'une consommation de GPU plus élevée.

### Valeurs disponibles

| Valeur | Temps | Qualité | Consommation GPU |
|---|---|---|---|
| `--q 0.25` | Rapide | Basique | 0.25x |
| `--q 0.5` | Moyen | Intermédiaire | 0.5x |
| `--q 1` | Normal | Complète (défaut) | 1x |
| `--q 2` | Long | Haute | 2x |

### Exemples

```
paysage montagneux détaillé --q 2
```
Génère avec le double d'étapes, produisant des détails plus fins. Utile pour les images qui seront agrandies ou imprimées.

### Conseil pro

Utilisez `--q 0.5` pour les itérations rapides pendant la phase de recherche. Passez à `--q 1` ou `--q 2` pour la génération finale. La différence entre `--q 1` et `--q 2` est souvent subtile, mais visible sur les détails fins et les textures.

## 8. --style raw

### Ce qu'il fait

Le paramètre `--style raw` désactive le « style Midjourney » par défaut. Sans ce paramètre, Midjourney applique automatiquement un certain embellissement artistique à toutes les générations. Avec `--style raw`, le modèle suit le prompt de manière plus littérale et produit des résultats plus neutres, plus photographiques.

### Syntaxe

```
photo de rue à Tokyo --style raw
```

### Comparaison

| Mode | Caractéristiques | Usage |
|---|---|---|
| Défaut (sans --style raw) | Couleurs enrichies, composition dramatique, style « Midjourney » | Visuels artistiques, illustrations |
| `--style raw` | Plus neutre, plus fidèle au prompt, moins embellie | Photographie réaliste, références précises |

### Exemples

```
Studio portrait of a man in a suit --style raw
```
Sans `--style raw`, le portrait aurait des couleurs enrichies et un éclairage dramatique. Avec, il ressemble davantage à une vraie photo de studio.

### Conseil pro

Pour tout travail de photoréalisme, `--style raw` est quasi indispensable. Il élimine le « look Midjourney » qui peut être reconnaissable et peu souhaitable dans un contexte professionnel. Combinez-le avec `--s 50` pour un résultat encore plus fidèle.

## 9. --v (Version)

### Ce qu'il fait

Le paramètre `--v` spécifie la version du modèle Midjourney à utiliser. Chaque version a ses propres caractéristiques stylistiques et capacités.

### Versions disponibles

| Version | Sortie | Caractéristiques | Forces |
|---|---|---|---|
| `--v 4` | 2022 | Première version majeure | Style pictural |
| `--v 5` | 2023 | Saut en photoréalisme | Photoréalisme, anatomie |
| `--v 5.2` | 2023 | Amélioration de v5 | Cohérence, détails |
| `--v 6` | 2024 | Texte lisible, nouveaux détails | Qualité globale, texte |
| `--v 6.1` | 2025 | Affinement et cohérence | Photoréalisme, texture |
| `--v 7` | 2026 (beta) | Nouvelle architecture | Attendue : meilleur contrôle |

### Exemples

```
Futuristic spaceship cockpit --v 5.2
```
Utilise le modèle v5.2 pour un rendu plus pictural et cohérent.

```
Futuristic spaceship cockpit --v 6.1
```
Utilise le modèle v6.1 pour un rendu plus réaliste et détaillé.

### Conseil pro

En 2026, `--v 6.1` est le choix par défaut recommandé pour la majorité des usages. Testez `--v 5.2` pour un style plus peint et moins photographique. Surveillez les mises à jour de la v7 qui promet un bond en qualité.

## 10. --c (Image Weight)

### Ce qu'il fait

Le paramètre `--c` (ou image weight) contrôle l'influence d'une image de référence par rapport au prompt texte lors d'une génération à partir d'une image (image prompt). Il détermine dans quelle mesure l'image de référence dicte le résultat.

### Plage de valeurs

| Valeur | Effet | Usage |
|---|---|---|
| `--c 0` | Image ignorée | Prompt texte uniquement |
| `--c 0.25` | Légère influence | Style subtil de la référence |
| `--c 0.5` | Influence modérée | Équilibre texte et image |
| `--c 1` | Forte influence (défaut) | Image guide fortement |
| `--c 2+` | Image domine | Quasi-reproduction de la référence |

### Exemples

```
[image_url] paysage cyberpunk --c 0.5
```
Le résultat sera influencé à parts égales par l'image de référence et par le texte « paysage cyberpunk ».

### Conseil pro

`--c 0.25-0.5` est idéal pour transférer le style d'une image sans en copier le contenu. `--c 1-2` est utile quand vous voulez que le modèle suive étroitement la composition ou les couleurs d'une référence. Notez que ce paramètre fonctionne uniquement avec les image prompts, pas avec les prompts texte seuls.

## Tableau récapitulatif des paramètres

| Paramètre | Plage | Défaut | Effet principal |
|---|---|---|---|
| `--ar` | Ratios libre | 1:1 | Format de l'image |
| `--stylize` | 0-1000 | 100 | Interprétation artistique |
| `--chaos` | 0-100 | 0 | Variété des résultats |
| `--weird` | 0-3000 | 0 | Bizarrerie / originalité |
| `--tile` | On/Off | Off | Motif répétitif |
| `--stop` | 10-100 | 100 | Arrêt partiel de la génération |
| `--quality` | 0.25-2 | 1 | Niveau de détail |
| `--style raw` | On/Off | Off | Style neutre / réaliste |
| `--v` | 4-7 | 6.1 | Version du modèle |
| `--c` | 0-2+ | 1 | Poids de l'image de référence |

## Combinaisons de paramètres gagnantes

### Photoréalisme professionnel

```
prompt --ar 3:2 --style raw --s 50 --v 6.1 --q 2
```

### Illustration artistique

```
prompt --ar 2:3 --s 500 --v 6.1 --c 50
```

### Exploration créative

```
prompt --ar 16:9 --c 100 --w 1000 --v 6.1
```

### Texture de jeu vidéo

```
prompt --tile --s 200 --style raw --v 6.1
```

### Esquisse rapide

```
prompt --stop 60 --s 100 --v 5.2
```

## FAQ

### Peut-on combiner tous les paramètres en même temps ?

Techniquement oui, mais ce n'est pas recommandé. Certains paramètres se contredisent (par exemple `--style raw` et `--s 750`). D'autres combinaisons produisent des résultats incohérents. Commencez par 2-3 paramètres maximum et ajoutez-en progressivement en observant leur effet. La combinaison la plus courante est `--ar` + `--s` + `--style raw` ou `--v`.

### Le paramètre --weird peut-il ruiner une image ?

Oui, les valeurs élevées de `--weird` (au-delà de 2000) peuvent produire des images illisibles ou chaotiques. Commencez par des valeurs modérées (250-500) et augmentez progressivement. Le paramètre est conçu pour l'expérimentation, pas pour la production de visuels commerciaux. Il est préférable de l'utiliser en phase de recherche créative.

### --style raw est-il toujours meilleur pour le photoréalisme ?

Dans la grande majorité des cas, oui. `--style raw` élimine l'embellissement automatique de Midjourney et produit des images plus neutres et plus proches de la photographie réelle. Cependant, pour certains styles photographiques (mode, beauté), le style par défaut de Midjourney peut être préférable car il ajoute une qualité « magazine » naturelle. Testez les deux pour chaque projet.

### Quelle version de Midjourney utiliser en 2026 ?

La version 6.1 est le choix recommandé par défaut. Elle offre la meilleure qualité globale, un bon photoréalisme et un rendu de texte amélioré. La version 5.2 reste utile pour un style plus peint et pictural. La version 7 (en beta) promet des améliorations significatives mais n'est pas encore stable pour la production. Évitez les versions 4 et 5 qui sont largement dépassées.

### Comment choisir entre --chaos et --weird ?

`--chaos` augmente la variété entre les 4 images de la grille : chaque image est différente mais chacune reste « normale ». `--weird` rend chaque image individuelle plus inhabituelle et bizarre. Utilisez `--chaos` quand vous voulez explorer différentes interprétations d'un même concept. Utilisez `--weird` quand vous voulez que les résultats eux-mêmes soient surprenants ou surréalistes. Vous pouvez les combiner pour un maximum d'originalité.

## Mise à jour — Avril 2026

Les paramètres de Midjourney continuent d'évoluer avec les versions du modèle :

- **Midjourney v6.1** a affiné le comportement de tous les paramètres existants. `--stylize` est plus subtil, `--style raw` est plus neutre, et `--chaos` produit des variations plus utiles.
- **Midjourney v7 (beta)** introduit de nouveaux paramètres de contrôle de composition et d'éclairage, encore en phase de test. Le paramètre `--p` (perspective) est expérimental et permet de contrôler l'angle de vue.
- **Interface web** : L'interface web Midjourney intègre désormais des curseurs pour les paramètres, rendant l'ajustement plus intuitif. Vous pouvez toujours utiliser la syntaxe textuelle pour un contrôle précis.
- **Panning et Zoom** : Les fonctionnalités de zoom et de panoramique (ajoutées en 2024) s'intègrent parfaitement avec les paramètres existants, permettant d'étendre une image dans une direction tout en conservant le style.
- **Consistency** : La fonctionnalité `--cw` (character consistency) permet de maintenir la cohérence d'un personnage à travers plusieurs générations, un besoin souvent exprimé par les créateurs de contenu.

Pour comparer l'impact de ces paramètres avec les capacités des autres générateurs, consultez notre [comparaison complète](/blog/midjourney-vs-dalle-vs-stable-diffusion) et notre [guide de choix DALL-E vs Midjourney](/blog/dalle-vs-midjourney-guide-choix).