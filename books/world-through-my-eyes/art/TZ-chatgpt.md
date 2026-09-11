# ТЗ для генерации картинок в ChatGPT
## «The World Through My Eyes» — книга-раскраска, 40 страниц

Документ самодостаточный: всё, что нужно вставить в ChatGPT, лежит здесь
готовыми блоками. Английский в промптах — намеренно, image-модели слушаются
английского заметно лучше, и весь канон книги написан на нём же.

Порядок работы жёсткий: **сначала лист персонажей, потом страницы.** Лист — это
не разминка, а референс, который прикладывается к каждому следующему запросу.
Без него Мия на странице 3 и Мия на странице 37 будут разными детьми, и это
главный способ загубить книгу-раскраску.

---

## 0. Настройки перед стартом

| Параметр | Значение |
|---|---|
| Модель | GPT Image (просто попроси картинку в ChatGPT) |
| Формат | портретный, **2:3** или **3:4** |
| Размер | максимальный из доступных |
| Язык промпта | английский, блоки ниже вставлять целиком |

Одно важное предупреждение про ChatGPT: он любит «улучшать» запрос — добавить
фон, тени, подписи, рамочку. Если в ответе появилось что-то, чего нет в
промпте, **не проси починить — перегенерируй заново тем же промптом.** Правки
поверх уже испорченной картинки почти всегда тянут за собой новые артефакты.

---

## 1. ЛИСТ ПЕРСОНАЖЕЙ — генерим первым

Вставить в ChatGPT целиком, одним сообщением:

```
Create a CHARACTER MODEL SHEET for a children's coloring book. Portrait
orientation, 2:3.

STYLE — this is the most important part of the brief:
Black and white coloring book line art for children aged 4 to 7. Pure black
ink lines on a pure white background, nothing else. Three deliberate line
weights: very thick bold outer silhouette contours, medium interior structure
lines, thin light detail lines. Every shape fully closed so a child can color
inside it. Clean confident vector-style ink.

STRICTLY FORBIDDEN — do not produce any of these:
no grey, no shading, no shadows, no gradients, no cross-hatching, no
stippling, no texture dots, no solid black filled areas (except tiny eye dots
and a nose dot), no color, no paper texture, no background scenery, no frame
or border around the page.

COLORABLE AREAS: large, open, generous shapes. Every enclosed area big enough
for a crayon. Never two lines close together in parallel. Lots of white space.
Simple beats detailed.

FACES: both eyes exactly the same size, simple solid black dots, level with
each other. Mouth is one small curved line. No eyelashes, no blush, no
nostrils, no teeth. No line ever crosses the face except a pair of glasses.

The style must be generic and original — simple rounded geometric cartoon
shapes in the tradition of classic children's coloring books. It must not
resemble any existing cartoon, mascot or licensed character.

LAYOUT — five characters spaced far apart on white, no outlines touching:

TOP ROW — two children standing full body, front view, feet on the same level,
arms relaxed and held clear of the body so the silhouettes read cleanly:

MIA, a 6 year old girl, the tallest of the five. A round bob haircut with
blunt straight bangs, drawn as one clean closed rounded shape with no strands
or texture lines. No glasses. Three small freckle dots on each cheek at
slightly uneven heights. A simple pinafore dress over a short-sleeved tee,
ankle socks and sneakers. The pinafore has one outline, one hem line and one
square front pocket, with a single small five-pointed star on that pocket.
No bows, no frills, no trim, no buttons. Wide round eyes, small closed smile.

LEO, a 5 year old boy, slightly shorter than Mia. Tousled hair in four or five
uneven spikes, deliberately not symmetrical. Round glasses drawn as two simple
circles joined by a bridge. No freckles. A tee with a small paper dart badge
on the chest, shorts with one big patch pocket, high-top sneakers. A cheerful
grin, eyebrows raised with one higher than the other.

MIDDLE ROW — one dog alone, spanning the width of the row:

WAFFLES, a dachshund in full side view facing right. The joke of the character
is his proportion: an absurdly LONG low body on very SHORT stubby legs, body
length about five times body height — exaggerate this confidently. Very long
floppy ears hanging past his jaw. One large saddle patch across his back: a
single big smooth-edged shape starting behind the shoulders and ending before
the hips, clearly separated from the body outline so it can be colored a
different color — not spots, not fur texture. A collar high on the neck with
one round tag hanging clear of the chest, a simple bone shape on the tag.
Calm, patient, faintly unimpressed expression.

BOTTOM ROW — two small animals side by side:

MOMO, a kitten sitting in front view, clearly smaller than the dog, with a
proportionally large head. Exactly five CHUNKY stripes: three wide bands
around the tail and two wide bands across the back, each broad enough to
color. Never thin tabby striping. No collar at all. Tail held upright with a
curl at the tip. Curious, alert, wide eyes.

PIP, a tiny sparrow perched in side view on a short simple branch, the
smallest character on the page. Simple egg-shaped body, round head, short
triangular beak, tail cocked up. Three small speckle dots on the chest at
uneven heights. Exactly one wing line — never two parallel lines. Always
perched, never standing on the ground.

RELATIVE SIZES, and this is canon: Mia tallest, Leo slightly shorter, Waffles
low but very long, Momo clearly smaller than the dog, Pip tiniest of all.

LETTERING: print each character's name in bold capital letters directly
beneath that character — MIA, LEO, WAFFLES, MOMO, PIP — as hollow outlined
letters a child could color in. No other text anywhere on the page.

The whole page must read as one consistent hand: same ink weight system, same
degree of simplification, same friendly geometry for all five characters.
```

### Приёмка листа — проверить до того, как двигаться дальше

Лист уходит в референсы на все 40 страниц, поэтому брак здесь размножится
сорок раз. Гоняй, пока не выполнено всё:

- [ ] Чистый белый фон, **ни одного серого пятна**, никаких теней под фигурами
- [ ] Нет штриховки, точечной заливки, «мохнатой» шерсти
- [ ] Нет крупных чёрных залитых областей (кроме точек-глаз и носа)
- [ ] Мия и Лео читаются как **разные дети** на расстоянии вытянутой руки:
      круглое каре против торчащих вихров, очки только у Лео
- [ ] У Лео очки не превратились в сплошные чёрные кругляши
- [ ] Такса реально длинная — если пропорция ближе к обычной собаке, гони заново
- [ ] Седловидное пятно на спине таксы — **одно крупное**, отделено от контура
- [ ] У Момо ровно пять широких полос, а не мелкая полосатость
- [ ] Все пять имён написаны без опечаток (модели часто ломают буквы)
- [ ] Контуры замкнуты — нет «дырок», через которые цвет вытечет наружу
- [ ] Между фигурами есть воздух, ничьи контуры не слиплись

Пришли мне готовый лист — прогоню через `art/qa.py`, он ловит серое и заливки
численно, по пикселям, а не на глаз.

---

## 2. Дальше: страницы книги

Каждую страницу генерим **в том же чате**, приложив утверждённый лист
персонажей картинкой, и начиная сообщение так:

```
Using the attached character model sheet as the exact reference for all
characters — same faces, same hair, same outfits, same proportions, same line
weights — draw ONE page of the same coloring book.

[дальше блок STYLE и FORBIDDEN из промпта выше — вставлять целиком каждый раз]

PAGE COMPOSITION RULES:
One focal subject that fills 35-55% of the page. Three to seven secondary
elements, each with its own closed outline. At least 30% of the page stays
white. The scene must run from the upper middle of the page down to the
bottom — never leave figures huddled along the bottom edge under a big empty
sky. Characters stand on a clear ground line. At least one character looks
directly at the focal subject. Nothing important within a finger's width of
the page edge. No frame, no border, no caption text.

THE SCENE:
[описание конкретной страницы из 03-storyboard.md]
```

Описания всех сорока страниц уже написаны — в `03-storyboard.md`, по каждой
есть сцена, состав персонажей, композиция, список вторичных деталей и
сложность. Переносить оттуда в промпт нужно блоки **Scene**, **Main action**,
**Environment** и **Secondary details**.

### Пример — страница 1, «The Puddle That Was an Ocean»

```
THE SCENE:
A quiet street after rain. Mia stands at the left edge of a big rain puddle in
her boots, pointing down into it. The puddle is a wide horizontal oval filling
the lower third of the page, and inside its outline the water is a whole
ocean: rolling waves, a small sailboat with two sails, and a whale spouting.
Leo crouches at the right side of the puddle with one hand reaching in to
touch the little boat. Waffles the dachshund stands right in the middle of the
puddle looking unimpressed. Pip the sparrow watches from the top of a
lamppost on the left, which carries the composition up into the top third of
the page. Two simple low rooftops behind. One drifting cloud. The sky stays
open and empty on the left.

Hide one small five-pointed star somewhere in the drawing — in the cloud, in
the puddle, on a rooftop. It must be small and not touch any face.
```

Та самая спрятанная звезда есть на всех 40 страницах — это «Wonder Star» из
визуальной библии, фишка, ради которой ребёнок возвращается к уже раскрашенной
странице. Каждый раз прячь её в новом месте.

---

## 3. Что делать с разрешением — важный момент про печать

ChatGPT отдаёт примерно 1024×1536. Для KDP в формате 8.5×11 дюймов при 300 dpi
нужно **2550×3300**. То есть напрямую из чата в типографию файл не уедет: на
бумаге линия будет мылить и рваться по краям.

Лечится это легко и почти без потерь — именно потому, что у нас чистая чёрная
линия на белом:

1. Ты присылаешь PNG из ChatGPT.
2. Я векторизую их в репозитории (трассировка контуров), получаются SVG.
3. Дальше масштаб не ограничен ничем, а `interior/assemble.py` уже умеет
   собирать SVG в готовый 84-страничный блок под KDP.

Плюс векторизация заодно дочищает серый анти-алиасинг по краям линий, так что
на выходе получается ровно то, что требует визуальная библия: чистый чёрный,
одно значение, без полутонов.

Скажи, когда будут первые картинки, — соберу векторизатор.

---

## 4. Частые провалы и чем их лечить

| Что пришло | Что дописать в промпт |
|---|---|
| Серые тени под фигурами | `absolutely no shadows under the characters, no ground shading` |
| Штриховка в «тёмных» местах | `no cross-hatching anywhere, all areas are left empty white` |
| Слишком мелкие детали | `simplify aggressively, fewer and larger shapes, this is for a 4 year old` |
| Персонажи «поплыли» между страницами | приложить лист персонажей заново и дописать `match the reference sheet exactly` |
| Рамка вокруг страницы | `no frame, no border, the drawing floats on plain white` |
| Подписи и буквы на странице | `no text anywhere on the page` |
| Такса вышла обычной собакой | `the body must be five times longer than it is tall, extremely elongated` |
| Лица «жутковатые» | `both eyes identical simple black dots, one small curved line for the mouth, nothing else on the face` |

---

## 5. Юридический момент, о котором стоит знать заранее

Страница копирайта в `interior/assemble.py` уже содержит строку
«Illustrations created with AI assistance» — это честно и для KDP безопасно.

Две вещи, которые стоит держать в голове при генерации:

- Не проси стилизовать «под Disney», «под Pixar», «в стиле Bluey» и т.п., и не
  принимай результат, где персонаж узнаваемо похож на существующего. В промпте
  выше про это есть отдельная строка — не убирай её.
- Сохраняй промпты, которыми сгенерированы принятые картинки. Если понадобится
  что-то перегенерировать или доказать происхождение — они пригодятся. Можешь
  просто присылать их мне вместе с картинками, положу рядом с файлами.
