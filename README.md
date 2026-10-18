# Hodowcy — prototyp 0.3

Statyczna gra przeglądarkowa, bez zależności i procesu kompilacji.

## Publikacja na GitHub Pages

Rozpakuj ZIP i prześlij **całą zawartość** katalogu `Hodowcy-0.3` do głównego katalogu repozytorium (`main`, `/root`), zachowując foldery `css` i `js`. Zastąp istniejący `index.html`. Nie przesyłaj samego ZIP-a jako pliku w repozytorium.

## Struktura

- `index.html` — układ strony
- `css/style.css` — wygląd
- `js/config.js` — rasy, żetony, kolory
- `js/board.js` — geometria heksów, numeracja, reguły odległości
- `js/game.js` — stan gry, rozstawienie, produkcja, inspektor
- `js/renderer.js` — rysowanie SVG i interfejsu
- `js/main.js` — zdarzenia przycisków i planszy

## Poprawki

Naprawiono przypisanie numerów do oryginalnych heksów (`cells[c.i]`), co przywraca widoczne żetony i produkcję kart.

## Zakres

Prototyp obejmuje losową planszę, rozstawienie 3/4 graczy, karty startowe, rzuty kośćmi, produkcję i przestawienie inspektora po wyrzuceniu 7. Nie obejmuje jeszcze handlu, budowy po rozstawieniu, wydarzeń, odrzucania kart ani kradzieży.

Pliki ES Modules należy uruchamiać przez serwer WWW (np. GitHub Pages), nie przez podgląd HTML w aplikacji Pliki.
