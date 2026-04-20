---
title: "Midjourney: De 10 Parameters Die Je Absoluut Moet Kennen"
excerpt: "Uitgebreide gids voor de 10 essentiële Midjourney-parameters: --ar, --stylize, --chaos, --weird, --tile, --stop, --quality, --style raw, --v en --c met voorbeelden en toepassingen."
date: "2026-04-19"
author: "Pulseia"
category: "AI"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

Midjourney staat bekend om de schoonheid van zijn generaties, maar veel gebruikers typen simpelweg een prompt en drukken op Enter zonder gebruik te maken van de parameters die de resultaten echt transformeren. Deze parameters vormt de overgang van de "willekeurige" modus naar de "controle" modus. Ze beheersen is het verschil tussen een gemiddelde afbeelding en een afbeelding die precies overeenkomt met je visie.

Hier zijn de 10 parameters die elke Midjourney-gebruiker moet kennen, met gedetailleerde uitleg, concrete voorbeelden en gebruikstips voor elk.

Voor een overzicht van de sterke punten van Midjourney in vergelijking met concurrenten, bekijk onze [Midjourney vs DALL-E 3 vs Stable Diffusion vergelijking](/blog/midjourney-vs-dalle-vs-stable-diffusion). Als je twijfelt tussen Midjourney en DALL-E voor jouw gebruik, helpt onze [keuzegids](/blog/dalle-vs-midjourney-guide-choix) je beslissen.

## 1. --ar (Aspect Ratio)

### Wat het doet

De parameter `--ar` bepaalt de breedte-hoogteverhouding van de gegenereerde afbeelding. Standaard produceert Midjourney vierkante afbeeldingen (1:1). Met `--ar` kun je panoramische, verticale of elk ander formaat afbeeldingen maken.

### Syntaxis

```
jouw prompt --ar 16:9
```

### Veelvoorkomende verhoudingen en toepassingen

| Verhouding | Typische afmetingen | Ideale toepassing |
|---|---|---|
| `--ar 1:1` | 1024x1024 | Vierkante Instagram-posts, pictogrammen |
| `--ar 4:3` | 1024x768 | Klassieke foto's, presentaties |
| `--ar 3:2` | 1024x683 | Standaard fotografie |
| `--ar 16:9` | 1024x576 | YouTube, presentaties, banners |
| `--ar 21:9` | 1024x439 | Film, ultra-panoramisch |
| `--ar 9:16` | 576x1024 | Stories, Reels, TikTok, posters |
| `--ar 2:3` | 683x1024 | Portretten, verticale posters |
| `--ar 3:4` | 768x1024 | Boekomslagen |

### Voorbeelden

```
Zonsondergang over een alpenmeer --ar 16:9
```
Produceert een spectaculair panoramisch landschap, ideaal voor een achtergrond of banner.

```
Portret van een elegante vrouw in een avondjurk --ar 2:3
```
Produceert een verticaal portret dat het onderwerp benadrukt.

### Pro-tip

De verhouding beïnvloedt de compositie. Een panoramisch formaat zet het model ertoe aan brede composities te maken met horizontaal verspreide elementen. Een verticaal formaat bevordert composities die gecentreerd zijn rond een lang onderwerp. Kies je verhouding voordat je je prompt schrijft, zodat het model de compositie optimaliseert voor dat formaat.

## 2. --stylize (of --s)

### Wat het doet

De parameter `--stylize` bepaalt de mate van artistieke interpretatie die Midjourney op je prompt toepast. Een lage waarde produceert afbeeldingen die trouwer zijn aan de tekst, terwijl een hoge waarde het model toelaat zijn eigen artistieke touch toe te voegen.

### Waardebereik

| Waarde | Effect | Gebruik |
|---|---|---|
| `--s 0` | Geen stijlialisatie, ruwe output | Wanneer prompttrouw cruciaal is |
| `--s 25-50` | Lichte stijlialisatie | Documentair realisme |
| `--s 100` | Standaardwaarde (v6) | Natuurlijk evenwicht |
| `--s 250-500` | Sterke stijlialisatie | Kunst, illustratie |
| `--s 750-1000` | Zeer sterke stijlialisatie | Verrassende, experimentele resultaten |

### Voorbeelden

```
Straatkat op een bank --s 0
```
Zeer trouw aan de prompt, fotografisch, zonder opsmuk.

```
Straatkat op een bank --s 750
```
Zeer gestileerde afbeelding, verzadigde kleuren, dramatische compositie — de kat wordt bijna een personage.

### Pro-tip

Voor marketingvisuals waar je precieze controle wilt, blijf op `--s 50-100`. Voor creatieve illustraties en artistieke concepten ga je naar `--s 250-500`. Daarna worden de resultaten onvoorspelbaar maar soms fascinerend.

## 3. --chaos (of --c)

### Wat het doet

De parameter `--chaos` wijzigt de variëteit aan resultaten in het initiële rooster van 4 afbeeldingen. Een lage waarde produceert 4 vergelijkbare afbeeldingen, een hoge waarde produceert 4 zeer verschillende afbeeldingen.

### Waardebereik: 0 tot 100

| Waarde | Effect | Gebruik |
|---|---|---|
| `--c 0` | Zeer consistente resultaten (standaard) | Je weet wat je wilt |
| `--c 25` | Gematigde variaties | Verkenning rond een thema |
| `--c 50` | Significante variaties | Ideezoektocht |
| `--c 100` | Sterk uiteenlopende resultaten | Maximale verkenning, serendipiteit |

### Voorbeelden

```
Futuristische stad 's nachts --c 0
```
4 consistente afbeeldingen van vergelijkbare futuristische steden.

```
Futuristische stad 's nachts --c 100
```
4 zeer verschillende afbeeldingen: de ene cyberpunk, de andere bioluminescent, weer een andere steampunk, en een minimalistische. Genoeg inspiratie te vinden.

### Pro-tip

Gebruik `--c 50-100` aan het begin van een creatief project om het spectrum aan mogelijkheden te verkennen. Zodra je een richting hebt gevonden, verlaag je de chaos en itereer je op die basis met variaties (V1-V4 knoppen).

## 4. --weird (of --w)

### Wat het doet

De parameter `--weird` introduceert "vreemdheid" in de generatie. Het duwt het model uit zijn gebruikelijke latente ruimte en produceert ongewone, surrealistische of verontrustende resultaten. Het is hét instrument voor experimentele kunst.

### Waardebereik: 0 tot 3000

| Waarde | Effect | Gebruik |
|---|---|---|
| `--w 0` | Normaal (standaard) | Standaard gebruik |
| `--w 250-500` | Iets ongewoon | Creatieve twist |
| `--w 1000-2000` | Zeer ongewoon | Surrealistische, experimentele kunst |
| `--w 2500-3000` | Extreem bizar | Abstracte kunst, glitch art |

### Voorbeelden

```
Bloementuin in de schemering --w 0
```
Een klassieke en prachtige bloementuin.

```
Bloementuin in de schemering --w 1500
```
Een tuin waar bloemen onmogelijke vormen hebben, kleuren vreemd samensmelten en het perspectief vervormt. Vaak een fascinerend resultaat.

### Pro-tip

Combineer `--weird` en `--chaos` voor maximale verkenning: `--c 100 --w 2000` produceert werkelijk unieke resultaten. Houd er rekening mee dat resultaten minder voorspelbaar en minder "mooi" worden in de conventionele zin.

## 5. --tile

### Wat het doet

De parameter `--tile` genereert afbeeldingen die als tegels herhaald kunnen worden zonder zichtbare naden. De randen van de afbeelding sluiten perfect aan, waardoor je naadloze texturen en oneindige patronen kunt maken.

### Syntaxis

```
blauw en goud geometrisch patroon --tile
```

### Veelvoorkomende toepassingen

| Toepassing | Promptvoorbeeld |
|---|---|
| Videogame-textures | `middeleeuwse steentextuur --tile` |
| Behang | `art deco bloempatroon --tile` |
| Website-achtergronden | `subtiel abstract patroon --tile` |
| Textiel | `modern ruitpatroon --tile` |
| Verpakking | `herhalend patroon voor cadeaupapier --tile` |

### Volledig voorbeeld

```
Seamless geometric pattern, art deco style, gold and navy blue, elegant --tile
```
Produceert een art decopatroon dat perfect herhaalt. Test het door het naast elkaar te kopiëren om de continuïteit te controleren.

### Pro-tip

`--tile` werkt特别好 goed met prompts die patronen beschrijven (patroon, textuur, herhalen) in plaats van narratieve scènes. Geometrische, bloemrijke en abstracte stijlen geven de beste resultaten. Vermijd prompts met specifieke onderwerpen (personen, gebouwen) die zich niet lenen voor herhaling.

## 6. --stop

### Wat het doet

De parameter `--stop` onderbreekt het generatieproces bij een bepaald percentage, voordat het volledig is voltooid. Dit produceert gedeeltelijk gegenereerde afbeeldingen die zachter, waziger of abstracter zijn.

### Waardebereik: 10 tot 100

| Waarde | Effect | Gebruik |
|---|---|---|
| `--stop 100` | Volledige generatie (standaard) | Normaal eindresultaat |
| `--stop 80-90` | Iets onafgemaakt | Zacht effect, aquarel |
| `--stop 50-70` | Gedeeltelijk gegenereerd | Schetseffect, abstract |
| `--stop 10-40` | Zeer weinig voortgang | Abstracte kunst, gestructureerde ruis |

### Voorbeelden

```
Impressionistisch portret van een vrouw --stop 80
```
Genereert een portret dat een "werk in uitvoering"-look behoudt, als een onvoltooid schilderij, met ontbrekende fijne details en een meer artistiek totaaleffect.

### Pro-tip

`--stop` is uitstekend voor het maken van afbeeldingen met een schets- of aquarelstijl. Het kan ook dienen om een basis voor te genereren die je daarna verfijnt met externe tools of door opnieuw te starten met dezelfde seed.

## 7. --quality (of --q)

### Wat het doet

De parameter `--quality` bepaalt de rekentijd die in de generatie wordt geïnvesteerd. Een hogere waarde betekent meer denoising-stappen en dus meer detail, ten koste van een langere generatietijd en een hoger GPU-verbruik.

### Beschikbare waarden

| Waarde | Tijd | Kwaliteit | GPU-verbruik |
|---|---|---|---|
| `--q 0.25` | Snel | Basis | 0,25x |
| `--q 0.5` | Gemiddeld | Tussenliggend | 0,5x |
| `--q 1` | Normaal | Compleet (standaard) | 1x |
| `--q 2` | Lang | Hoog | 2x |

### Voorbeelden

```
gedetailleerd berglandschap --q 2
```
Genereert met het dubbele aantal stappen, wat fijnere details oplevert. Nuttig voor afbeeldingen die worden vergroot of afgedrukt.

### Pro-tip

Gebruik `--q 0.5` voor snelle iteraties in de onderzoeksfase. Schakel over naar `--q 1` of `--q 2` voor de definitieve generatie. Het verschil tussen `--q 1` en `--q 2` is vaak subtiel maar zichtbaar bij fijne details en texturen.

## 8. --style raw

### Wat het doet

De parameter `--style raw` schakelt de standaard "Midjourney-stijl" uit. Zonder deze parameter past Midjourney automatisch een zekere artistieke verfraaiing toe op alle generaties. Met `--style raw` volgt het model de prompt letterlijker en produceert het neutralere, meer fotografische resultaten.

### Syntaxis

```
straatfoto in Tokio --style raw
```

### Vergelijking

| Modus | Kenmerken | Gebruik |
|---|---|---|
| Standaard (zonder --style raw) | Verrijkte kleuren, dramatische compositie, "Midjourney"-stijl | Artistieke visuals, illustraties |
| `--style raw` | Neutraler, trouwer aan de prompt, minder verfraaid | Realistische fotografie, precieze referenties |

### Voorbeelden

```
Studio portrait of a man in a suit --style raw
```
Zonder `--style raw` zou het portret verrijkte kleuren en dramatische belichting hebben. Met `--style raw` lijkt het meer op een echte studiofoto.

### Pro-tip

Voor fotorealisme-werk is `--style raw` vrijwel onmisbaar. Het elimineert de "Midjourney-look" die herkenbaar en ongewenst kan zijn in een professionele context. Combineer het met `--s 50` voor een nog trouwer resultaat.

## 9. --v (Versie)

### Wat het doet

De parameter `--v` specificeert welke versie van het Midjourney-model moet worden gebruikt. Elke versie heeft zijn eigen stilistische kenmerken en mogelijkheden.

### Beschikbare versies

| Versie | Release | Kenmerken | Sterke punten |
|---|---|---|---|
| `--v 4` | 2022 | Eerste grote versie | Schilderachtige stijl |
| `--v 5` | 2023 | Sprong in fotorealisme | Fotorealisme, anatomie |
| `--v 5.2` | 2023 | Verbetering van v5 | Consistentie, details |
| `--v 6` | 2024 | Leesbare tekst, nieuwe details | Algemene kwaliteit, tekst |
| `--v 6.1` | 2025 | Verfijning en consistentie | Fotorealisme, textuur |
| `--v 7` | 2026 (bèta) | Nieuwe architectuur | Verwacht: betere controle |

### Voorbeelden

```
Futuristisch ruimteschip cockpit --v 5.2
```
Gebruikt het v5.2-model voor een meer schilderachtige en consistente weergave.

```
Futuristisch ruimteschip cockpit --v 6.1
```
Gebruikt het v6.1-model voor een meer realistische en gedetailleerde weergave.

### Pro-tip

In 2026 is `--v 6.1` de aanbevolen standaardkeuze voor de meeste toepassingen. Probeer `--v 5.2` voor een meer geschilderde en minder fotografische stijl. Houd v7-updates in de gaten die een sprong in kwaliteit beloven.

## 10. --c (Afbeeldingsgewicht)

### Wat het doet

De parameter `--c` (of image weight) bepaalt de invloed van een referentieafbeelding ten opzichte van de tekstprompt bij een op afbeeldingen gebaseerde generatie (image prompt). Het bepaalt in hoeverre de referentieafbeelding het resultaat dicteert.

### Waardebereik

| Waarde | Effect | Gebruik |
|---|---|---|
| `--c 0` | Afbeelding genegeerd | Alleen tekstprompt |
| `--c 0.25` | Lichte invloed | Subtiele stijl van de referentie |
| `--c 0.5` | Gematigde invloed | Balans tussen tekst en afbeelding |
| `--c 1` | Sterke invloed (standaard) | Afbeelding stuurt sterk |
| `--c 2+` | Afbeelding domineert | Bijna-reproductie van de referentie |

### Voorbeelden

```
[afbeelding_url] cyberpunk landschap --c 0.5
```
Het resultaat wordt in gelijke mate beïnvloed door de referentieafbeelding en de tekst "cyberpunk landschap".

### Pro-tip

`--c 0.25-0.5` is ideaal om de stijl van een afbeelding over te dragen zonder de inhoud te kopiëren. `--c 1-2` is nuttig wanneer je wilt dat het model de compositie of kleuren van een referentie nauw volgt. Let op: deze parameter werkt alleen met afbeeldingsprompts, niet met tekst-only prompts.

## Overzichtstabel van parameters

| Parameter | Bereik | Standaard | Hoofdeffect |
|---|---|---|---|
| `--ar` | Vrije verhoudingen | 1:1 | Afbeeldingsformaat |
| `--stylize` | 0-1000 | 100 | Artistieke interpretatie |
| `--chaos` | 0-100 | 0 | Resultaatvariëteit |
| `--weird` | 0-3000 | 0 | Vreemdheid / originaliteit |
| `--tile` | Aan/Uit | Uit | Herhalend patroon |
| `--stop` | 10-100 | 100 | Gedeeltelijke generatiestop |
| `--quality` | 0.25-2 | 1 | Detailniveau |
| `--style raw` | Aan/Uit | Uit | Neutrale / realistische stijl |
| `--v` | 4-7 | 6.1 | Modelversie |
| `--c` | 0-2+ | 1 | Referentieafbeeldingsgewicht |

## Winnende parametercombinaties

### Professioneel fotorealisme

```
prompt --ar 3:2 --style raw --s 50 --v 6.1 --q 2
```

### Artistieke illustratie

```
prompt --ar 2:3 --s 500 --v 6.1 --c 50
```

### Creatieve verkenning

```
prompt --ar 16:9 --c 100 --w 1000 --v 6.1
```

### Videogame-textuur

```
prompt --tile --s 200 --style raw --v 6.1
```

### Snelle schets

```
prompt --stop 60 --s 100 --v 5.2
```

## FAQ

### Kun je alle parameters tegelijk combineren?

Technisch gezien wel, maar het wordt niet aanbevolen. Sommige parameters spreken elkaar tegen (bijvoorbeeld `--style raw` en `--s 750`). Andere combinaties produceren oncoherente resultaten. Begin met maximaal 2-3 parameters en voeg ze geleidelijk toe terwijl je hun effect observeert. De meest voorkomende combinatie is `--ar` + `--s` + `--style raw` of `--v`.

### Kan de --weird parameter een afbeelding verpesten?

Ja, hoge waarden van `--weird` (boven 2000) kunnen onleesbare of chaotische afbeeldingen produceren. Begin met gematigde waarden (250-500) en verhoog geleidelijk. De parameter is ontworpen voor experimentatie, niet voor commerciële visuele productie. Het is het beste om het te gebruiken in de creatieve onderzoeksfase.

### Is --style raw altijd beter voor fotorealisme?

In de overgrote meerderheid van de gevallen, ja. `--style raw` elimineert de automatische verfraaiing van Midjourney en produceert neutralere afbeeldingen die dichter bij echte fotografie staan. Voor bepaalde fotografische stijlen (mode, beauty) kan de standaardstijl van Midjourney echter de voorkeur hebben, omdat het een natuurlijke "magazine"-kwaliteit toevoegt. Test beide voor elk project.

### Welke Midjourney-versie moet je in 2026 gebruiken?

Versie 6.1 is de aanbevolen standaardkeuze. Het biedt de beste algemene kwaliteit, goed fotorealisme en verbeterde tekstweergave. Versie 5.2 blijft nuttig voor een meer geschilderde en picturale stijl. Versie 7 (in bèta) belooft aanzienlijke verbeteringen maar is nog niet stabiel voor productie. Vermijd versies 4 en 5, die grotendeels verouderd zijn.

### Hoe kies je tussen --chaos en --weird?

`--chaos` verhoogt de variëteit tussen de 4 afbeeldingen in het rooster: elke afbeelding is anders maar blijft "normaal." `--weird` maakt elke individuele afbeelding ongewoner en bizarder. Gebruik `--chaos` wanneer je verschillende interpretaties van hetzelfde concept wilt verkennen. Gebruik `--weird` wanneer je wilt dat de resultaten zelf verrassend of surrealistisch zijn. Je kunt ze combineren voor maximale originaliteit.

## Update — April 2026

De parameters van Midjourney blijven zich ontwikkelen met de modelversies:

- **Midjourney v6.1** heeft het gedrag van alle bestaande parameters verfijnd. `--stylize` is subtieler, `--style raw` is neutraler en `--chaos` produceert bruikbaardere variaties.
- **Midjourney v7 (bèta)** introduceert nieuwe parameters voor compositie- en belichtingscontrole, nog in de testfase. De parameter `--p` (perspectief) is experimenteel en maakt het mogelijk de kijkhoek te controleren.
- **Webinterface**: De Midjourney-webinterface integreert nu schuifregelaars voor parameters, waardoor aanpassingen intuïtiever worden. Je kunt nog steeds de tekstsyntaxis gebruiken voor nauwkeurige controle.
- **Panning en Zoom**: De zoom- en panning-functies (toegevoegd in 2024) integreren naadloos met bestaande parameters, waardoor je een afbeelding in één richting kunt uitbreiden met behoud van stijl.
- **Consistentie**: De `--cw` (character consistency) functie behoudt de consistentie van een personage over meerdere generaties, een behoefte die vaak wordt geuit door contentmakers.

Om de impact van deze parameters te vergelijken met de mogelijkheden van andere generatoren, bekijk onze [volledige vergelijking](/blog/midjourney-vs-dalle-vs-stable-diffusion) en onze [DALL-E vs Midjourney keuzegids](/blog/dalle-vs-midjourney-guide-choix).