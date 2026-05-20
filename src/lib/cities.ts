/**
 * Données des villes ciblées pour le SEO local de Pulse IA
 * Côte entre Alicante et Valence (Costa Blanca)
 */

export interface CityData {
  slug: string;
  name: string;
  comarque: string;
  province: string;
  postalCodes: string[];
  urbanisations: string[];
  neighboringSlugs: string[];
  economyType: "tourisme" | "immobilier" | "commerce-local" | "startup" | "mixte";
  description: string;
  serviceFocus: string;
}

export const CITIES: CityData[] = [
  // ─── Marina Baixa ───
  {
    slug: "alicante",
    name: "Alicante",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03000"],
    urbanisations: ["Playa de San Juan", "Cabo de las Navas", "Vistahermosa"],
    neighboringSlugs: ["el-campello", "sant-joan-dalacant", "villajoyosa"],
    economyType: "mixte",
    description:
      "Alicante, capitale de la province, est un pôle économique majeur de la Costa Blanca. Entre son port actif, son aéroport international et ses plages mythiques, la ville attire entreprises et expatriés. Nous accompagnons les sociétés locales dans leur digitalisation avec des sites performants et des agents IA autonomes.",
    serviceFocus: "sites vitrines multilingues et automatisation des processus commerciaux",
  },
  {
    slug: "el-campello",
    name: "El Campello",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03560"],
    urbanisations: ["Coveta Fuma", "Muchavista", "Cala de les Palmeretes"],
    neighboringSlugs: ["alicante", "sant-joan-dalacant", "villajoyosa"],
    economyType: "tourisme",
    description:
      "Entre Alicante et Villajoyosa, El Campello attire chaque année des milliers de touristes grâce à ses plages et son port de pêche. Les commerces, restaurants et locations saisonnières ont un besoin croissant de visibilité digitale. Nous créons des sites web et des chatbots IA pour capter cette clientèle internationale.",
    serviceFocus: "sites de locations saisonnières et chatbots pour la relation client",
  },
  {
    slug: "sant-joan-dalacant",
    name: "Sant Joan d'Alacant",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03550"],
    urbanisations: ["Ciudad de Asís", "Playa de Sant Joan"],
    neighboringSlugs: ["alicante", "el-campello", "villajoyosa"],
    economyType: "mixte",
    description:
      "Sant Joan d'Alacant, situé entre Alicante et la côte, conjugue vie résidentielle et proximité immédiate de la mer. Son environnement calme attire familles et retraités, tandis que son tissu commercial local se digitalise. Nous aidons les entreprises à créer une présence web qui reflète cette qualité de vie.",
    serviceFocus: "sites vitrines élégants et référencement local",
  },
  {
    slug: "villajoyosa",
    name: "Villajoyosa",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03570"],
    urbanisations: ["Bol Nou", "Montiboli", "Gasparot", "Playa Paraíso"],
    neighboringSlugs: ["el-campello", "benidorm", "la-nucia"],
    economyType: "tourisme",
    description:
      "Villajoyosa, célèbre pour ses maisons colorées et son patrimoine chocolatier, est une perle authentique de la Costa Blanca. Le tourisme culturel et gastronomique y est florissant. Nous concevons des sites web immersifs et des assistants IA pour valoriser cette identité unique auprès des visiteurs.",
    serviceFocus: "sites touristiques immersifs et présence digitale artisanale",
  },
  {
    slug: "benidorm",
    name: "Benidorm",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03500", "03501", "03502", "03503"],
    urbanisations: ["Levante", "Poniente", "Rincón de Loix", "Sierra Cortina"],
    neighboringSlugs: ["villajoyosa", "finestrat", "la-nucia", "lalfas-del-pi"],
    economyType: "tourisme",
    description:
      "Benidorm, capitale du tourisme de la Costa Blanca, accueille des millions de visiteurs chaque année. La concurrence est féroce entre hôtels, restaurants et agences d'activités. Un site web rapide, multilingue et un chatbot IA sont devenus indispensables pour se démarquer et convertir les touristes en clients.",
    serviceFocus: "sites multilingues ultra-rapides, chatbots IA et référencement hôtelier",
  },
  {
    slug: "finestrat",
    name: "Finestrat",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03509"],
    urbanisations: ["Sierra Cortina", "Balcon de Finestrat", "Torreón"],
    neighboringSlugs: ["benidorm", "la-nucia", "polop"],
    economyType: "immobilier",
    description:
      "Finestrat, nichée au pied de la Sierra Cortina, concentre de nombreuses résidences de prestige et complexes hôteliers modernes. Le marché immobilier y est très dynamique, avec une forte demande étrangère. Nous créons des sites web haut de gamme et des portails immobiliers IA pour capter cette clientèle internationale.",
    serviceFocus: "portails immobiliers multilingues et sites de résidences de prestige",
  },
  {
    slug: "la-nucia",
    name: "La Nucia",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03530"],
    urbanisations: ["Bello Horizonte", "Coloma", "Entrepinos", "Los Arcos"],
    neighboringSlugs: ["benidorm", "finestrat", "polop", "lalfas-del-pi"],
    economyType: "mixte",
    description:
      "La Nucia, ville résidentielle prisée à proximité de Benidorm, offre un cadre de vie exceptionnel avec son stade d'athlétisme de renommée internationale. Les entreprises locales, du commerce de proximité aux services aux expatriés, gagnent à se digitaliser pour toucher cette population cosmopolite.",
    serviceFocus: "sites de services aux expatriés et référencement local",
  },
  {
    slug: "polop",
    name: "Polop",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03520"],
    urbanisations: ["Monte Polop", "Polop de la Marina"],
    neighboringSlugs: ["finestrat", "la-nucia", "altea"],
    economyType: "immobilier",
    description:
      "Polop, avec ses vues panoramiques sur la Sierra de Bernia et la mer, attire de nombreux acheteurs étrangers en quête de tranquillité. Les agences immobilières du secteur ont besoin de sites performants et multilingues pour présenter leurs biens à une clientèle internationale exigeante.",
    serviceFocus: "sites immobiliers avec visites virtuelles et chatbots de qualification",
  },
  {
    slug: "lalfas-del-pi",
    name: "L'Alfàs del Pi",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03580", "03581"],
    urbanisations: ["El Albir", "Playa de l'Alfàs", "Carrer de l'Amaral"],
    neighboringSlugs: ["benidorm", "la-nucia", "altea"],
    economyType: "tourisme",
    description:
      "L'Alfàs del Pi et son célèbre quartier d'El Albir attirent une clientèle nord-européenne et française fidèle. Entre plage, festivals et cinéma, le tissu commercial a besoin d'une présence web à la hauteur de cette diversité culturelle. Nous créons des sites multilingues pensés pour les expatriés et touristes.",
    serviceFocus: "sites multilingues pour le tourisme et les services aux expatriés",
  },
  {
    slug: "altea",
    name: "Altea",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03590", "03599"],
    urbanisations: ["Altea la Vella", "Cap Negret", "El Mascarat", "Puerto Campomanes", "La Olla"],
    neighboringSlugs: ["lalfas-del-pi", "calpe", "callosa-den-sarria"],
    economyType: "mixte",
    description:
      "Altea, joyau de la Costa Blanca, séduit par sa vieille ville blanche, son port de plaisance et sa communauté artistique internationale. Les galeries, restaurants et agences immobilières du secteur bénéficient d'une clientèle exigeante qui attend une expérience digitale à la hauteur. Nous créons des sites élégants et des agents IA pour capter cette audience premium.",
    serviceFocus: "sites élégants, portails immobiliers et chatbots pour le tourisme haut de gamme",
  },
  {
    slug: "callosa-den-sarria",
    name: "Callosa d'en Sarrià",
    comarque: "Marina Baixa",
    province: "Alicante",
    postalCodes: ["03510"],
    urbanisations: ["Fonts d'Algar", "El Riu"],
    neighboringSlugs: ["altea", "benidorm", "polop"],
    economyType: "tourisme",
    description:
      "Callosa d'en Sarrià est réputée pour ses magnifiques Fonts d'Algar, une attraction naturelle majeure de la Costa Blanca. Le tourisme rural et familial y est très présent, avec des restaurants, gîtes et activités outdoor. Nous aidons les entreprises locales à se faire trouver en ligne par les milliers de visiteurs de la région.",
    serviceFocus: "sites de tourisme rural et réservation en ligne",
  },

  // ─── Marina Alta ───
  {
    slug: "calpe",
    name: "Calpe",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03710"],
    urbanisations: ["Canuta", "Carrió", "Ortembach", "Maryvilla", "La Fustera", "Puerto Blanco"],
    neighboringSlugs: ["altea", "benissa", "teulada"],
    economyType: "tourisme",
    description:
      "Calpe et son emblématique Peñón de Ifach dominent la Costa Blanca Nord. La ville attire chaque année des milliers de touristes et d'acheteurs étrangers avec ses plages et sa pêche traditionnelle. Les agences immobilières et les hôteliers ont besoin d'une présence digitale irréprochable pour convertir cette clientèle internationale.",
    serviceFocus: "sites immobiliers multilingues et portails touristiques avec réservation",
  },
  {
    slug: "benissa",
    name: "Benissa",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03720"],
    urbanisations: ["Fanadix", "San Jaime", "La Fustera", "Montemar", "Pinets"],
    neighboringSlugs: ["calpe", "teulada", "benitachell"],
    economyType: "immobilier",
    description:
      "Benissa allie patrimoine historique et prestigieuses urbanisations côtières comme San Jaime et Fanadix. Le marché immobilier local cible une clientèle fortunée européenne à la recherche de villas avec vue sur mer. Nous concevons des sites web haut de gamme et des portails immobiliers IA pour séduire cette audience exigeante.",
    serviceFocus: "portails immobiliers premium et sites de villas de luxe",
  },
  {
    slug: "teulada",
    name: "Teulada",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03724", "03725"],
    urbanisations: ["Moraira", "Cap Blanc", "Paichi", "San Jaime", "Sabatera", "Benimeit"],
    neighboringSlugs: ["calpe", "benissa", "benitachell"],
    economyType: "immobilier",
    description:
      "Teulada et son port de Moraira forment l'un des spots immobiliers les plus prisés de la Costa Blanca Nord. Villas de luxe, plages intimes et marina séduisent une clientèle internationale fortunée. Les agences immobilières locales ont besoin de sites performants, multilingues et d'agents IA pour qualifier les acheteurs potentiels.",
    serviceFocus: "sites immobiliers de luxe multilingues et chatbots de qualification",
  },
  {
    slug: "benitachell",
    name: "Benitachell",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03726"],
    urbanisations: ["Cumbre del Sol", "Los Molinos", "Pueblo de la Paz"],
    neighboringSlugs: ["benissa", "teulada", "xabia"],
    economyType: "immobilier",
    description:
      "Benitachell, perchée sur les falaises entre Moraira et Jávea, abrite la célèbre urbanisation Cumbre del Sol. Ce décor spectaculaire attire une clientèle premium en quête de villas avec vue sur la Méditerranée. Nous créons des sites web immersifs et des visites virtuelles pour valoriser ces biens d'exception.",
    serviceFocus: "sites avec visites virtuelles et présentation immersive de biens immobiliers",
  },
  {
    slug: "xabia",
    name: "Jávea",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03730", "03738", "03739"],
    urbanisations: ["Arenal", "Duanes de la Mar", "Montgó", "Tosalet", "Balcon al Mar", "Costa Nova", "La Granadella"],
    neighboringSlugs: ["denia", "benitachell", "teulada"],
    economyType: "mixte",
    description:
      "Jávea (Xàbia en valencien) est l'une des destinations les plus prisées de la Costa Blanca Nord, avec ses trois zones distinctes : le port, la plage de l'Arenal et la vieille ville. Entre tourisme, immobilier de luxe et communauté expatriée, les entreprises locales doivent absolument proposer une expérience digitale multilingue et raffinée.",
    serviceFocus: "sites multilingues premium, portails immobiliers et chatbots IA",
  },
  {
    slug: "denia",
    name: "Dénia",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03700"],
    urbanisations: ["Las Rotas", "Las Marinas", "La Pedrera", "Montgó", "El Montgó"],
    neighboringSlugs: ["xabia", "pedreguer", "gata-de-gorgos"],
    economyType: "mixte",
    description:
      "Dénia, au pied du Montgó et face à la Méditerranée, est une ville au caractère bien trempé. Gastronomie réputée (creative city de l'UNESCO), port actif avec ferry pour les Baléares, et un immobilier qui attire les Francophones. Les commerces et agences de la ville ont besoin de sites web qui reflètent cette richesse culturelle et économique.",
    serviceFocus: "sites gastronomiques, portails immobiliers et sites de transport/marina",
  },
  {
    slug: "pedreguer",
    name: "Pedreguer",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03750"],
    urbanisations: ["Monte Pedreguer", "Monte Sella", "La Xara"],
    neighboringSlugs: ["denia", "ondara", "gata-de-gorgos"],
    economyType: "immobilier",
    description:
      "Pedreguer, entre Dénia et la vallée, concentre d'importantes zones résidentielles comme Monte Sella et Monte Pedreguer. Sa proximité avec Dénia et ses tarifs immobiliers plus accessibles attirent familles et retraités européens. Les agences locales ont besoin de sites performants pour présenter ces opportunités.",
    serviceFocus: "sites immobiliers familiaux et portails de résidences",
  },
  {
    slug: "ondara",
    name: "Ondara",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03760"],
    urbanisations: ["Les Deveses", "Zona Comercial"],
    neighboringSlugs: ["denia", "pedreguer", "el-verger"],
    economyType: "commerce-local",
    description:
      "Ondara est réputée pour son gigantesque centre commercial Portal de la Marina, qui draine une clientèle sur toute la Marina Alta. Les boutiques et restaurants du centre-ville historique complètent ce tissu commercial dynamique. Nous aidons les commerçants à créer une présence web qui capte les clients locaux et les touristes de passage.",
    serviceFocus: "sites e-commerce et vitrines digitales pour le commerce de proximité",
  },
  {
    slug: "gata-de-gorgos",
    name: "Gata de Gorgos",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03740"],
    urbanisations: ["Centre historique"],
    neighboringSlugs: ["denia", "pedreguer", "el-verger"],
    economyType: "commerce-local",
    description:
      "Gata de Gorgos est célèbre dans toute la région pour son artisanat du rotin et de la vannerie. Cette tradition séculaire attire des visiteurs curieux de découvrir des savoir-faire authentiques. Nous créons des sites vitrines qui valorisent cette identité artisanale et permettent de vendre en ligne ces produits uniques.",
    serviceFocus: "sites vitrines artisanaux et boutiques en ligne pour l'artisanat local",
  },
  {
    slug: "el-verger",
    name: "El Verger",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03770"],
    urbanisations: ["Els Poblets", "Miraflor"],
    neighboringSlugs: ["ondara", "gata-de-gorgos", "els-poblets"],
    economyType: "mixte",
    description:
      "El Verger, au cœur de la région des oranges, est une ville agricole et résidentielle à la fois. Sa proximité avec la côte et Dénia en fait une zone attractive pour les expatriés recherchant le calme tout en restant proche des services. Les entreprises locales profitent d'une clientèle stable et diversifiée.",
    serviceFocus: "sites vitrines et référencement pour les services locaux",
  },
  {
    slug: "els-poblets",
    name: "Els Poblets",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03779"],
    urbanisations: ["Playa Santa Ana", "Miraflor"],
    neighboringSlugs: ["el-verger", "denia", "xabia"],
    economyType: "tourisme",
    description:
      "Els Poblets, entre Dénia et la plage de l'Arenal à Jávea, offre un accès direct à la mer dans un cadre résidentiel paisible. Les locations saisonnières et les restaurants de bord de mer y sont très demandés. Nous créons des sites web et des systèmes de réservation pour aider ces entreprises à maximiser leur saison.",
    serviceFocus: "sites de locations saisonnières et systèmes de réservation en ligne",
  },
  {
    slug: "pego",
    name: "Pego",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03780"],
    urbanisations: ["Monte Pego"],
    neighboringSlugs: ["denia", "orba", "el-verger"],
    economyType: "immobilier",
    description:
      "Pego et sa célèbre urbanisation Monte Pego attirent une clientèle européenne en quête de tranquillité et de vues panoramiques sur la mer et les rizières. L'immobilier y est très actif, avec des villas et appartements recherchés par les expatriés. Nous concevons des portails immobiliers performants pour ce marché spécifique.",
    serviceFocus: "portails immobiliers et sites de résidences avec vues panoramiques",
  },
  {
    slug: "orba",
    name: "Orba",
    comarque: "Marina Alta",
    province: "Alicante",
    postalCodes: ["03790"],
    urbanisations: ["Orbeta", "Centre historique"],
    neighboringSlugs: ["pego", "denia", "pedreguer"],
    economyType: "mixte",
    description:
      "Orba, village typique de la Marina Alta, allie authenticité valencienne et communauté expatriée bien établie. Son centre historique, ses artisans et sa vie de quartier créent un environnement unique. Les commerces et services locaux ont tout à gagner d'une présence digitale qui s'adresse à cette population cosmopolite.",
    serviceFocus: "sites vitrines multilingues pour le commerce et les services locaux",
  },

  // ─── La Safor ───
  {
    slug: "oliva",
    name: "Oliva",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46780"],
    urbanisations: ["Playa de Oliva", "Pau Pi", "Sector 5", "Burguera", "Rabdells"],
    neighboringSlugs: ["piles", "daimus", "gandia"],
    economyType: "tourisme",
    description:
      "Oliva, avec ses 10 kilomètres de plages préservées, est un haut lieu du tourisme familial sur la Costa de Valencia. Les locations saisonnières, les campings et les restaurants de bord de mer y sont florissants. Nous aidons ces entreprises à se digitaliser avec des sites web attractifs et des outils de réservation automatisés.",
    serviceFocus: "sites touristiques familiaux et systèmes de réservation",
  },
  {
    slug: "piles",
    name: "Piles",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46712"],
    urbanisations: ["Playa de Piles"],
    neighboringSlugs: ["oliva", "daimus", "bellreguard"],
    economyType: "tourisme",
    description:
      "Piles est une petite commune côtière de la Safor, prisée pour sa plage tranquille et son ambiance authentique. Les locations saisonnières et les établissements de restauration y trouvent une clientèle fidèle à la recherche de calme. Nous créons des sites web simples et efficaces pour capter cette clientèle.",
    serviceFocus: "sites de locations saisonnières et vitrines pour restaurants",
  },
  {
    slug: "daimus",
    name: "Daimús",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46710"],
    urbanisations: ["Playa de Daimús"],
    neighboringSlugs: ["oliva", "piles", "bellreguard"],
    economyType: "tourisme",
    description:
      "Daimús, face à la mer et à proximité de Gandia, attire des familles et retraités en quête de sérénité sur la Costa de Valencia. Le marché des locations saisonnières y est actif, avec une forte saison estivale. Un site web optimisé et un chatbot de réservation peuvent transformer considérablement l'activité des propriétaires locaux.",
    serviceFocus: "sites de locations saisonnières et chatbots de réservation",
  },
  {
    slug: "bellreguard",
    name: "Bellreguard",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46713"],
    urbanisations: ["Playa de Bellreguard", "Mareny"],
    neighboringSlugs: ["daimus", "piles", "guardamar-de-la-safor"],
    economyType: "tourisme",
    description:
      "Bellreguard, entre Gandia et Oliva, dispose d'une agréable plage familiale qui attire chaque été des milliers de vacanciers. Les restaurants de poissons et les locations de bungalows y sont très prisés. Nous aidons les entreprises locales à créer une présence web qui capte les touristes dès la phase de recherche.",
    serviceFocus: "sites touristiques et systèmes de réservation pour locations",
  },
  {
    slug: "guardamar-de-la-safor",
    name: "Guardamar de la Safor",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46711"],
    urbanisations: ["Playa de Miramar"],
    neighboringSlugs: ["bellreguard", "daimus", "gandia"],
    economyType: "tourisme",
    description:
      "Guardamar de la Safor (souvent appelé Miramar) est une station balnéaire paisible de la Safor, entre Gandia et Oliva. Ses plages larges et son ambiance familiale attirent une clientèle fidèle. Les hôtels, restaurants et locations saisonnières bénéficient d'une forte saisonnalité qu'un site web bien pensé peut optimiser.",
    serviceFocus: "sites hôteliers et portails de réservation saisonnière",
  },
  {
    slug: "gandia",
    name: "Gandia",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46700", "46730"],
    urbanisations: ["Puerto de Gandia", "Playa de Gandia", "Grau de Gandia", "Beniopa", "Benirredrà"],
    neighboringSlugs: ["oliva", "xeraco", "tavernes-de-la-valldigna", "guardamar-de-la-safor"],
    economyType: "mixte",
    description:
      "Gandia est la plus grande ville de la Safor et un pôle économique majeur de la province de Valence. Entre son port actif, ses kilomètres de plage et son centre historique, la ville concentre commerces, industries et tourisme. Les entreprises locales ont besoin de solutions digitales variées, du site vitrine au portail e-commerce en passant par l'automatisation IA.",
    serviceFocus: "sites vitrines, e-commerce, chatbots IA et référencement pour tous secteurs",
  },
  {
    slug: "tavernes-de-la-valldigna",
    name: "Tavernes de la Valldigna",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46760"],
    urbanisations: ["Playa de Tavernes", "Mareny de Sant Llorenç"],
    neighboringSlugs: ["gandia", "xeraco", "xeresa"],
    economyType: "tourisme",
    description:
      "Tavernes de la Valldigna se distingue par ses magnifiques plages bordées de dunes et de rizières, au cœur du Parc Naturel de l'Albufera. Le tourisme éco-responsable et familial y est très présent. Nous aidons les entreprises locales à valoriser ce patrimoine naturel unique à travers des sites web immersifs et des stratégies digitales respectueuses.",
    serviceFocus: "sites de tourisme éco-responsable et réservation en ligne",
  },
  {
    slug: "xeraco",
    name: "Xeraco",
    comarque: "La Safor",
    province: "Valence",
    postalCodes: ["46770"],
    urbanisations: ["Playa de Xeraco"],
    neighboringSlugs: ["gandia", "tavernes-de-la-valldigna", "cullera"],
    economyType: "tourisme",
    description:
      "Xeraco (Jaraco en castillan) est une station balnéaire familiale réputée pour sa plage de sable fin et ses eaux tranquilles. Les campings, locations saisonnières et restaurants de bord de mer y prospèrent en saison. Nous créons des sites web optimisés pour capter les familles en quête de vacances sereines sur la Costa de Valencia.",
    serviceFocus: "sites touristiques familiaux et systèmes de réservation",
  },

  // ─── Ribera Baixa & Horta Sud ───
  {
    slug: "cullera",
    name: "Cullera",
    comarque: "Ribera Baixa",
    province: "Valence",
    postalCodes: ["46400"],
    urbanisations: ["Playa de Cullera", "Cap Blanc", "El Brosquil", "Marenyet"],
    neighboringSlugs: ["xeraco", "sueca", "sollana"],
    economyType: "tourisme",
    description:
      "Cullera est l'une des destinations balnéaires les plus populaires de la province de Valence. Entre ses plages, sa forteresse arabe et sa gastronomie, la ville attire chaque été des centaines de milliers de visiteurs. Les hôtels, restaurants et parcs aquatiques locaux ont besoin d'une présence digitale à la hauteur de cette affluence.",
    serviceFocus: "sites touristiques à fort trafic, chatbots et réservation en ligne",
  },
  {
    slug: "sueca",
    name: "Sueca",
    comarque: "Ribera Baixa",
    province: "Valence",
    postalCodes: ["46410"],
    urbanisations: ["Playa de Sueca", "El Perelló", "El Perellonet"],
    neighboringSlugs: ["cullera", "sollana", "alzira"],
    economyType: "mixte",
    description:
      "Sueca conjugue patrimoine gastronomique (célèbre pour sa paella) et plages comme El Perelló et El Perellonet. Entre tourisme, agriculture et industrie, la ville offre un tissu économique diversifié. Les entreprises locales bénéficient d'une clientèle locale stable et d'un afflux touristique estival qu'un bon site web peut valoriser.",
    serviceFocus: "sites gastronomiques, vitrines et e-commerce pour produits locaux",
  },
  {
    slug: "sollana",
    name: "Sollana",
    comarque: "Ribera Baixa",
    province: "Valence",
    postalCodes: ["46430"],
    urbanisations: ["El Romaní"],
    neighboringSlugs: ["sueca", "cullera", "alzira"],
    economyType: "commerce-local",
    description:
      "Sollana est une commune agricole et résidentielle de la Ribera Baixa, proche de l'Albufera. Son tissu commercial local, ses restaurants traditionnels et ses services aux riverains forment une économie de proximité solide. Nous aidons ces entreprises à se faire trouver en ligne par les habitants et les visiteurs de la région.",
    serviceFocus: "sites vitrines et référencement local pour le commerce de proximité",
  },
  {
    slug: "alzira",
    name: "Alzira",
    comarque: "Ribera Alta",
    province: "Valence",
    postalCodes: ["46600"],
    urbanisations: ["Centre", "Zones industrielles"],
    neighboringSlugs: ["sueca", "sollana", "carcaixent"],
    economyType: "mixte",
    description:
      "Alzira est un pôle économique et commercial majeur de la Ribera, avec une vieille ville historique, des zones industrielles et un tissu de PME actif. Les entreprises locales, qu'elles soient commerciales, industrielles ou de services, ont besoin de solutions digitales robustes pour se développer. Nous créons des sites et des outils d'automatisation adaptés à cette diversité.",
    serviceFocus: "sites vitrines, e-commerce B2B et automatisation pour PME",
  },
  {
    slug: "valence",
    name: "Valence",
    comarque: "Horta Sud",
    province: "Valence",
    postalCodes: ["46001"],
    urbanisations: ["Ciutat Vella", "Eixample", "Ruzafa", "Malvarrosa", "El Cabanyal", "Benimaclet"],
    neighboringSlugs: ["torrent", "mislata", "paterna", "burjassot"],
    economyType: "startup",
    description:
      "Valence, troisième plus grande ville d'Espagne, est un écosystème technologique et startup en pleine expansion. Entre ses universités renommées, ses incubateurs et sa qualité de vie, la ville attire talents et entrepreneurs du monde entier. Les entreprises valenciennes ont besoin de solutions digitales de pointe pour se démarquer dans cet environnement compétitif.",
    serviceFocus: "sites corporate, applications web et automatisation IA avancée",
  },
];

// ─── Helpers ───

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

export function getCitiesByComarque(comarque: string): CityData[] {
  return CITIES.filter((c) => c.comarque.toLowerCase() === comarque.toLowerCase());
}

export function getNeighboringCities(slug: string): CityData[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.neighboringSlugs.map((s) => getCityBySlug(s)).filter(Boolean) as CityData[];
}

export function getComarques(): string[] {
  return [...new Set(CITIES.map((c) => c.comarque))];
}
