---
title: "Dlaczego twoi Agenci AI Zawodza w Produkcji (i Jak to Wykryc z Langfuse)"
excerpt: "Analiza najczestszych trybow awarii agentow AI w produkcji i praktyczny przewodnik ich wykrywania i korygowania z Langfuse."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

## Wprowadzenie: Rzeczywistosc Agentow AI w Produkcji

Przejscie od prototypu do produkcji to moment, w ktorym wiekszosc projektow agentow AI napotyka powazne problemy. W rozwoju agent dziala na starannie wybranych przypadkach testowych. W produkcji staje przed nieprzewidywalnymi wejsciami, przypadkami brzegowymi, wariacjami kontekstu i uzytkownikami, ktorzy systematycznie eksploruja granice systemu.

Statystyki sa wymowne: wedlug badania Gartner opublikowanego w 2025, okolo **70% projektow autonomicznych agentow AI** napotyka znaczace problemy w ciagu pierwszych trzech miesiecy produkcji. Przyczyny sa rozne, ale dziela wspolny punkt: sa czesto **trudne do wykrycia** bez odpowiedniej observacyjnosc.

Ten artykul analizuje najczestsze tryby awarii i pokazuje, jak [Langfuse](/blog/langfuse-surveiller-agents-ia) pozwala je wykryc, zdiagnozowac i szybko skorygowac.

## 7 Najczestszych Trybow Awanii

### 1. Cichy Spadek Jakosci (Silent Quality Drift)

To prawdopodobnie najbardziej zdradliwy tryb awarii. Agent kontynuuje odpowiadanie, bez bledu technicznego, ale jakosc odpowiedzi stopniowo sie pogarsza.

**Typowe przyczyny:**
- Niezauwazna aktualizacja modelu bazowego przez dostawce
- Ewolucja bazy wiedzy (nowe dokumenty, nieaktualne dokumenty)
- Zmiana w nawykach zapytan uzytkownikow (bardziej zlozone pytania)
- Dryf temperatury w wektorowych embeddingach

**Jak wykryc z Langfuse:**

```python
# Konfiguracja automatycznych wynikow jakosci
from langfuse import Langfuse

langfuse = Langfuse()

# Na kazdym sladzie w produkcji oblicz wynik jakosci
trace = langfuse.trace(name="agent-support")

# Automatyczny wynik LLM-as-Judge
trace.score(name="quality", value=quality_score)
trace.score(name="faithfulness", value=faithfulness_score)

# Konfiguracja alertu na sredniej kroczacej
# Jesli average(quality, last_100_traces) < 3.5, wyslij alert
```

Dashboard Langfuse pozwala wizualizowac tendencje wynikow jakosci na przesuwajacych sie oknach, co czyni widocznym spadek, ktory inaczej by byl niedostrzegalny.

### 2. Eksplozje Kosztow (Cost Spikes)

Agenci AI korzystajacy z poteznych modeli jak GPT-4o czy Claude Opus moga widziec swoje koszty nagle eksploatowac.

**Typowe przyczyny:**
- Nieskonczona petla rozumowania (agent krazy bez konwergencji)
- Niezwykle dlugie zapytania konsumujace tysiace tokenow
- Uzytkownik lub bot wysylajacy tysiace zapytan
- Zmiana routingu kierujaca proste zadania do drogiego modelu

**Jak wykryc z Langfuse:**

```python
# Alert na nietypowo dlugie slady
trace = langfuse.trace(
    name="agent-rag",
    metadata={"max_tokens_budget": 5000}
)

# Jesli slad konsumuje ponad 5000 tokenow, to nietypowe
generation = trace.generation(
    name="gpt4-call",
    model="gpt-4o",
    usage={"input": 8000, "output": 2000, "total": 10000}  # Nietypowe!
)

# Konfiguracja alertu w dashboard:
# Cost per trace > 0.10 $ -> Alert Slack
# Daily cost > 50 $ -> Alert PagerDuty
```

Dla pelnego sledzenia kosztow, skonsultujcie nasz przewodnik [monitorowanie agentow AI z Langfuse](/blog/langfuse-surveiller-agents-ia).

### 3. Nieskonczone Petle i Timeouts

Agenci autonomiczni sa szczegolnie podatni na nieskonczone petle: agent wywoluje narzedzie, otrzymuje niezadawalajacy wynik, ponownie wywoluje to samo narzedzie z podobnymi parametrami i tak dalej.

**Typowe przyczyny:**
- Zle zaprojektowany prompt nie okresla jasno warunkow wyjscia
- Wadliwe narzedzie zwraca przerywane bledy
- Context window nasycony: agent gubi slad tego, co juz probowal

**Jak wykryc z Langfuse:**

```
Slad: "Agent debugowania kodu"
|--- Span: "Wywolanie narzedzia search_code" (1.2s) OK
|--- Span: "Wywolanie narzedzia search_code" (1.1s) Uwaga Duplikat
|--- Span: "Wywolanie narzedzia search_code" (1.3s) Uwaga Duplikat
|--- Span: "Wywolanie narzedzia search_code" (1.0s) Uwaga Duplikat
|--- Span: "Wywolanie narzedzia search_code" (1.2s) Blad Petla!
+--- TIMEOUT po 60 sekundach
```

Hierarchiczna struktura sladow Langfuse czyni petle natychmiast widocznymi: jesli widzicie ten sam span powtarzajacy sie, wiecie, ze jest problem.

### 4. Halucynacje w Kaskadzie

W systemach wieloagentowych halucynacja jednego agenta moze sie propagowac do kolejnych agentow, ktorzy traktuja te informacje jako pewne.

**Typowe przyczyny:**
- Pierwszy agent produkuje nieprawdziwa informacje
- Kolejni agenci ufaja wynikowi bez weryfikacji
- Brak mechanizmu krzyzowej walidacji

**Konkretny scenariusz:**

```
Agent 1 : "Gwarancja na ten produkt wynosi 5 lat"  <- Halucynacja
  |
Agent 2 : "Zgodnie z naszymi informacjami, gwarancja wynosi 5 lat,
           oto warunki..."  <- Propagacja
  |
Uzytkownik : Otrzymuje falszywa informacje
```

**Jak wykryc z Langfuse:**

```python
# Wynik zaufania na kazdym agencie
agent1_trace = langfuse.trace(name="agent-recherche")
agent1_trace.score(name="confidence", value=0.45)  # Niski wynik

# Jesli confidence < 0.6, zaalarmuj kolejnego agenta
# lub przelacz na mechanizm weryfikacji
```

Dla systematycznej oceny wiernosci waszych odpowiedzi, skonsultujcie nasze porownanie [Ragas vs Promptfoo](/blog/ragas-vs-promptfoo).

### 5. Awarije Rozumowania (Reasoning Failures)

Agenci opartie na modelach rozumowania (Chain-of-Thought, ReAct) moga zawiesc w subtelny sposob: rozumowanie jest logicznie niepoprawne, ale odpowiedz wydaje sie wiarygodna.

**Typowe przyczyny:**
- Pomylka podobnych konceptow
- Nieuzaadnione logiczne skoki w rozumowaniu
- Błąd potwierdzenia (agent ignoruje przeciwny dowod)
- Nadmierna pewnosc w wynikach wadliwych narzedzi

**Jak wykryc:**

Przegladajac slady rozumowania w Langfuse, mozecie zidentyfikowac punkty, w ktorych rozumowanie zawodzi. Kluczem jest **sledzenie kazdego etapu lancucha rozumowania** jako oddzielnego spana.

### 6. Bledy Integracji z Narzedziami

Agenci korzystajacy z zewnetrznych narzedzi (API, bazy danych, uslugi webowe) sa podatni na awarie tych uslug.

**Typowe przyczyny:**
- API strony trzeciej niedostepne lub wolne
- Zmiana formatu odpowiedzi API
- Problemy z autoryzacja (wygasle tokeny)
- Przekroczony rate limiting

**Jak wykryc z Langfuse:**

```python
# Sledzenie kazdego wywolania narzedzia z jego wynikiem
tool_span = trace.span(
    name="tool-call-weather-api",
    input={"city": "Paris", "date": "2026-04-19"},
    output={"error": "503 Service Unavailable"},
    status="error"
)

# Bledy narzedzi sa widoczne na czerwono w dashboard
# Konfiguracja alertu: tool_error_rate > 10% -> Alert
```

### 7. Nasycenie Context Window

Gdy historia rozmowy lub pobrane dokumenty przekraczaja rozmiar context window, model cicho obcina informacje, co moze prowadzic do niepelench lub niespojnych odpowiedzi.

**Typowe przyczyny:**
- Dlugie rozmowy bez mechanizmu podsumowania
- Zbyt obszerne pobieranie (zbyt wiele dokumentow zwroconych)
- Blad w obliczeniu rozmiaru tokenow

**Jak wykryc z Langfuse:**

```python
# Monitorowanie wskaznika wykorzystania context window
generation = trace.generation(
    name="gpt4-response",
    model="gpt-4o",
    usage={"input": 124000, "output": 500, "total": 124500}
)

# Jesli input_tokens zbliza sie do 128000 (limit GPT-4o), zaalarmuj
# Wskaznik: context_window_usage = input / max_tokens
# Jesli > 0.9, ryzyko obcicia
```

## Tabela Podsumowujaca Trybow Awanii

| Tryb awarii | Czestotliwosc | Gravnosc | Trudnosc wykrycia | Kluczowa metryka Langfuse |
|---|---|---|---|---|
| Cichy spadek jakosci | Bardzo wysoka | Wysoka | Bardzo trudna | Kroczacy wynik jakosci |
| Eksplozja kosztow | Wysoka | Srednia | Latwa | Koszt na slad / dzien |
| Nieskonczone petle | Srednia | Wysoka | Srednia | Liczba spanow na slad |
| Halucynacje w kaskadzie | Wysoka | Bardzo wysoka | Trudna | Wynik zaufania |
| Awarije rozumowania | Srednia | Wysoka | Trudna | Sledzenie etapow |
| Bledy narzedzi | Bardzo wysoka | Zmienna | Latwa | Wskaznik bledow na narzedzie |
| Nasycenie kontekstu | Srednia | Wysoka | Srednia | Wskaznik context window |

## Strategie Debugowania z Langfuse

### Strategia 1: Post-Mortem Kierowany przez Slady

Gdy uzytkownik zgłasza problem, pierwszym krokiem jest odnalezienie odpowiadajacego sladu w Langfuse.

```python
# Wyszukiwanie sladu po uzytkowniku i dacie
traces = langfuse.get_traces(
    user_id="client-signale-incident",
    from_timestamp="2026-04-18T00:00:00Z",
    to_timestamp="2026-04-19T00:00:00Z"
)

# Analiza kazdego spanu problemowego sladu
for trace in traces:
    for span in trace.spans:
        print(f"Span: {span.name}")
        print(f"Czas trwania: {span.duration_ms}ms")
        print(f"Status: {span.status}")
        if span.status == "error":
            print(f"Blad: {span.error_message}")
```

Ta metoda pozwala odtworzyc dokladna sciezke zapytania i zidentyfikowac punkt awarii.

### Strategia 2: Agregowana Analiza Awanii

Zamiast analizowac slady jeden po drugim, Langfuse pozwala zidentyfikowac wzorce awarii na duza skale.

- **Top bledow** -- Ktore bledy wystepuja najczesciej?
- **Dystrybucja opoznien** -- Czy jest skok opoznienia o konkretnych godzinach?
- **Korelacje** -- Czy bledy narzedzi koreluja z halucynacjami?

### Strategia 3: Testowanie w Produkcji (Shadow Mode)

Dla duzych zmian (nowy prompt, nowy model, nowy pipeline), testowanie w shadow mode jest najbezpieczniejsza strategia:

1. Wdrozyc nowa wersje rownolegle ze stara
2. Wysylac te same zapytania do obu wersji
3. Porownac wyniki i metryki w Langfuse
4. Przelaczyc dopiero gdy nowa wersja jest potwierdzona jako lepsza

```python
# Shadow mode: dwa slady dla kazdego zapytania
prod_trace = langfuse.trace(
    name="agent-rag-v1",
    version="1.0.0"
)

shadow_trace = langfuse.trace(
    name="agent-rag-v2",
    version="2.0.0",
    metadata={"shadow_mode": True}
)

# Porownaj wyniki w dashboard
```

## Pelna Konfiguracja Langfuse do Monitorowania

### Krok 1: Instrumentacja Agenta

```python
from langfuse.decorators import observe
from langfuse import Langfuse

langfuse = Langfuse()

@observe(name="agent-production")
def agent_pipeline(user_query: str, user_id: str):
    """Pelny agent z instrumentacja Langfuse."""

    # Pobieranie
    docs = retrieve_documents(user_query)
    # Dekorator @observe automatycznie przechwytuje ten span

    # Generowanie
    response = generate_response(user_query, docs)

    # Automatyczna ocena
    quality = evaluate_quality(user_query, response, docs)

    # Wynik jakosci wstrzykniety w slad
    langfuse.score_current_trace(
        name="auto_quality",
        value=quality
    )

    return response
```

### Krok 2: Konfiguracja Alertow

| Alert | Warunek | Kanal | Priorytet |
|---|---|---|---|
| Niska jakosc | avg(quality, 50 sladow) < 3.0 | Slack | Wysoki |
| Wysoki koszt | daily_cost > 100 $ | Slack + Email | Wysoki |
| Opoznienie P95 | latency_p95 > 10s | Slack | Sredni |
| Wskaznik bledow | error_rate > 5% | PagerDuty | Krytyczny |
| Wykryta petla | spans_same_name > 5 | Slack | Wysoki |
| Nasycenie kontekstu | context_usage > 0.9 | Slack | Sredni |

### Krok 3: Dashboardy Monitorowania

Skonfigurujcie przynajmniej te trzy dashboardy:

1. **Dashboard Operacyjny** -- Opoznienie, wskaznik bledow, wolumen zapytan, dostepnosc
2. **Dashboard Jakosci** -- Wyniki jakosci, wskaznik halucynacji, trafnosc
3. **Dashboard Finansowy** -- Koszty wg modelu, agenta, uzytkownika, trendy

## Przyklady Rzeczywistych Awanii i Ich Rozwiazania

### Przypadek 1: Agent Wsparcia, Ktory Halucynowal po Aktualizacji

**Objaw**: Agent wsparcia klienta nagle zaczal wymyslac polityki zwrotow po cichej aktualizacji GPT-4o.

**Wykrycie przez Langfuse**: Wynik faithfulness spadl z 0.92 do 0.61 na dwa tygodnie, widoczny na dashboard jakosci.

**Rozwiazanie**: System prompt zostal wzmocniony z jawnymi instrukcjami opierania sie wylacznie na dostarczonych dokumentach. Test regresywny [Promptfoo](/blog/ragas-vs-promptfoo) zostal dodany dla pytan o polityke.

### Przypadek 2: Autonomiczny Agent w Nieskonczonej Petli

**Objaw**: Agent debugowania kodu krazyl przez 60 sekund przed timeout, konsumujac tysiace tokenow.

**Wykrycie przez Langfuse**: Slad pokazal 12 kolejnych wywolan tego samego narzedzia wyszukiwania kodu z niemal identycznymi parametrami.

**Rozwiazanie**: Dodanie mechanizmu wykrywania petli w prompcie agenta i twardego limitu 5 kolejnych wywolan tego samego narzedzia.

### Przypadek 3: Eksplozja Kosztow przez Jednego Uzytkownika

**Objaw**: Koszty dzienne potrojily sie w jeden dzien.

**Wykrycie przez Langfuse**: Dashboard finansowy pokazal, ze jeden uzytkownik (bot scrapingu) byl odpowiedzialny za 85% kosztow.

**Rozwiazanie**: Wdrozenie rate limiting per uzytkownik i alertu na koszt na uzytkownika (max 5$/dzien).

## Checklista Zapobiegania Awanii

Przed wypuszczeniem agenta na produkcje, sprawdzcie kazdy punkt:

- [ ] Sledzenie aktywowane na wszystkich krytycznych komponentach
- [ ] Automatyczne wyniki jakosci skonfigurowane
- [ ] Alerty skonfigurowane dla 7 trybow awarii
- [ ] Dashboardy operacyjne, jakosciowe i finansowe na miejscu
- [ ] Rate limiting per uzytkownik skonfigurowany
- [ ] Twardy limit na liczbe wywolan narzedzi na slad
- [ ] Monitorowanie wskaznika wykorzystania context window
- [ ] Testy regresywne w CI/CD (Promptfoo lub Ragas)
- [ ] Runbooki udokumentowane dla kazdego typu alertu
- [ ] Tygodniowy przeglad metryk jakosci
- [ ] Zautomatyzowana procedura rollback
- [ ] Shadow mode dla duzych zmian

## Aktualizacja -- Kwiecien 2026

Praktyki monitorowania agentow AI dojrzaly znaczaco:

- **Agenci samonaprawiajacy** -- Niektore frameworki pozwalaja teraz agentom korygowac sie automatycznie, gdy Langfuse wykryje awarie (przelaczenie na model zapasowy, uproszczenie promptu, redukcja kontekstu)
- **Automatyczna korelacja** -- Langfuse v3 oferuje automatyczna korelacje miedzy metrykami jakosci a zmianami konfiguracji, pozwalajac zidentyfikowac przyczyne bez recznego dochodzenia
- **Ciagly benchmark** -- Metryki [Ragas](/blog/ragas-vs-promptfoo) moga byc uruchamiane ciagle na probce sladow produkcyjnych, zamykajac petle miedzy monitorowaniem a ocena
- **Observacyjnosc agent-agent** -- Dla systemow wieloagentowych (jak [AutoGPT](/blog/autogpt-bilan-2026) czy [OpenClaw](/blog/openclaw-test-exclusif)), Langfuse oferuje teraz rozproszone sledzenie, ktore podazuje za zapytaniami przez wiele agentow
- **Predykcyjne alertowanie** -- Oparte na modelach ML, ktore ucza sie normalnych wzorcow waszego agenta i alarmuja przed osiagnieciem progu

Dziedzina szybko ewoluuje, ale fundamentalne zasady pozostaja te same: instrumentuj, mierz, alarmuj i iteruj.

## FAQ

### Ile czasu zajmuje instrumentacja istniejacego agenta z Langfuse?

Dla prostego agenta (jedno wywolanie LLM z jednym narzedziem), liczcie okolo 1 do 2 godzin. Dla wielokomponentowego agenta z wieloma narzedziami i etapami rozumowania, liczcie pol dnia. Uzycie dekodatora `@observe` i callbackow LangChain/LlamaIndex znacznie skraca czas instrumentacji, poniewaz wiekszosc wywolan jest przechwytywana automatycznie.

### Co zrobic, jesli Langfuse sam padnie?

SDK Langfuse jest zaprojektowany na odpornosc: jesli serwer Langfuse jest niedostepny, SDK kolejkuje slady i wysyla je, gdy serwr powroci. Wasza aplikacja kontynuuje normalne dzialanie. Dla krytycznych wdrozen uzywajcie trybu self-hosted z redundantna baza danych PostgreSQL.

### Jak rozroznisc prawdziwy blad od prostej odpowiedzi zlej jakosci?

To wazne rozroznienie. Blad to niepoprawne zachowanie systemu (blad techniczny, nieskonczona petla, crash). Zla jakosc to technicznie poprawna, ale niezadowalajaca odpowiedz. Langfuse pomaga rozrozniszc oba: bledy objawiaja sie sladami w bledach (status error), podczas gdy problemy jakosci objawiaja sie niskimi wynikami na technicznie udanych sladach.

### Czy alerty Langfuse generuja duzo falszywych pozytywow?

To zalezy od konfiguracji progow. Najlepsza praktyka to zaczecie od szerokich progow i stopniowe ich zawezenie, obserwujac falszywe pozytywy. Uzycie przesuwnych okien (srednia na 50 sladach zamiast na jednym) znacznie redukuje falszywe pozytywy. Predykcyjne alertowanie Langfuse v3 jeszcze bardziej redukuje ten problem.

### Czy mozna uzywac Langfuse z agentami takimi jak AutoGPT czy OpenClaw?

Tak, z pewnymi adaptacjami. Autonomiczni agenci jak [AutoGPT](/blog/autogpt-bilan-2026) czy [OpenClaw](/blog/openclaw-test-exclusif) generuja znacznie dluzsze i bardziej zlozone slady niz prosty chatbot. Langfuse v3 z rozproszonym sledzeniem jest szczegolnie odpowiedni dla tych przypadkow. Rekomendowane jest skonfigurowanie bardziej agresywnego samplingu i ograniczenie glebokosci sladow, aby unikac przeciazenia.