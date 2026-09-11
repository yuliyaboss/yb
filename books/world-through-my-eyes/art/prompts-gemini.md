# 40 промптов для Gemini
## «The World Through My Eyes» — по одному на каждую страницу

## Как этим пользоваться

**В AI Studio (aistudio.google.com) — так лучше всего:**
модель `gemini-3-pro-image` (Nano Banana Pro), aspect ratio **3:4**, разрешение
максимальное (4K, если доступно). Блок A ниже вставить **один раз** в System
Instructions. Дальше на каждую страницу отправлять только её блок сцены.

**В приложении Gemini:** системной инструкции нет, поэтому Блок A придётся
приклеивать к каждому промпту сверху. Муторно, но работает.

**Лист персонажей прикладывать картинкой к каждому запросу.** Это главный
механизм консистентности — без него Мия на странице 3 и Мия на странице 37
будут разными детьми. Если генеришь лист впервые, он в `TZ-chatgpt.md`.

**Текста на страницах нет.** Заголовки набираются шрифтом при сборке PDF — так
они выйдут без опечаток и ровно по сетке KDP. Единственное исключение —
страница 40, там буквы части рисунка; если модель их покорёжит, скажи, наберу
контурными при сборке.

**Три страницы в ночной одежде** — 25, 26, 27. У Мии пижама со звёздами, у Лео
в полоску. На остальных 37 страницах одежда не меняется никогда, ни по погоде,
ни по времени суток.

---

# БЛОК A — вставить в System Instructions

```
You draw pages for a single children's coloring book. Every image you produce
must look like it came from the same hand as the attached character model
sheet.

STYLE — the most important part of the brief:
Black and white coloring book line art for children aged 4 to 7. Pure black
ink lines on a pure white background, nothing else. Three deliberate line
weights: very thick bold outer silhouette contours, medium interior structure
lines, thin light detail lines. Every shape fully closed so a child can color
inside it. Clean confident vector-style ink.

STRICTLY FORBIDDEN — never produce any of these:
no grey, no shading, no shadows, no gradients, no cross-hatching, no
stippling, no texture dots, no solid black filled areas (except tiny eye dots
and a nose dot), no color, no paper texture, no frame or border around the
page, no text or lettering of any kind unless a page explicitly asks for it.

COLORABLE AREAS: large, open, generous shapes. Every enclosed area big enough
for a crayon. Never two lines close together in parallel — the sliver between
them cannot be colored. At least 30% of the page stays clean white. Simple
beats detailed, always.

COMPOSITION: one clear focal subject filling 35-55% of the page. The connected
mass of figures, buildings and trees must reach from the upper middle of the
page down to the bottom — never leave figures huddled along the bottom edge
under a big empty sky. If the scene needs height, add a tree, a building, a
lamppost or a hill, not more clouds. Characters stand on a clear ground line.
At least one character looks at the focal subject. Keep everything important
well away from the page edges.

FACES: both eyes exactly the same size, simple solid black dots, level with
each other. Mouth is one small curved line. No eyelashes, no blush, no
nostrils, no teeth. No line ever crosses the face except a pair of glasses.

THE CAST — these five are fixed and never change:
MIA, a 6 year old girl, the tallest. Round bob haircut with blunt straight
bangs as one clean closed shape. Three freckle dots on each cheek. Pinafore
dress over a short-sleeved tee, ankle socks, sneakers, one small star on the
pinafore pocket. No bows, no frills. Wide eyes, small closed smile.
LEO, a 5 year old boy, slightly shorter. Tousled hair in four or five uneven
spikes. Round glasses, two circles and a bridge. A tee with a small paper dart
badge, shorts with one big pocket, high-top sneakers. Grin, one eyebrow higher.
WAFFLES, a dachshund. Absurdly long low body on very short stubby legs, body
length about five times body height. Very long floppy ears. One large saddle
patch across his back as a single big shape, clearly separate from the body
outline. Collar with a round bone tag.
MOMO, a kitten, smaller than the dog, proportionally large head. Exactly five
chunky stripes: three around the tail, two across the back. No collar. Tail
upright with a curl at the tip.
PIP, a sparrow, the smallest. Egg body, round head, short beak, tail cocked
up, three chest dots, exactly one wing line. Always perched or flying, never
standing on the ground.

Height order never changes: Mia taller than Leo, Leo taller than Waffles,
Waffles bigger than Momo, Momo bigger than Pip. Outfits never change.

The style must be generic and original — simple rounded geometric cartoon
shapes in the tradition of classic children's coloring books. It must never
resemble any existing cartoon, mascot or licensed character.

On every page, hide one small five-pointed star somewhere in the drawing — in
a cloud, a leaf, a rug, a reflection. Small, never touching a face, never in
the same place twice.
```

---

# СЕКЦИЯ 1 — ОБЫЧНЫЕ ВЕЩИ СТАНОВЯТСЯ ВОЛШЕБНЫМИ

Правило секции: обычное и волшебное **никогда не разносятся на две страницы**.
Коробка уже с плавниками и иллюминатором, и звёзды уже за ней. Превращение
происходит прямо сейчас, а не вспоминается.

---

## Страница 1 — The Puddle That Was an Ocean

```
A quiet street after rain. Mia stands at the left edge of a big rain puddle in
her boots, pointing down into it. The puddle is a wide horizontal oval filling
the lower third of the page, and inside its outline the water is a whole
ocean: rolling waves, a small sailboat with two sails, and a whale spouting.
Leo crouches at the right side of the puddle with one hand reaching in to
touch the little boat. Waffles the dachshund stands right in the middle of the
puddle looking unimpressed. Pip the sparrow watches from the top of a lamppost
on the left, and that lamppost carries the composition up into the top third
of the page. Two simple low rooftops behind. One drifting cloud. The sky stays
open and empty on the left.

The puddle interior is the biggest single colorable area on the page — keep it
clean and open. About 11 separate things to color.
```

---

## Страница 2 — The Box That Was a Rocket

```
A living room. A cardboard box sits in the middle of a rug, and it has already
grown rocket fins, a nose cone and a round porthole — it is both things at
once, not one turning into the other. Leo's head and both arms stick out of
the open top, gripping a control panel drawn on the inside of the flap. Mia
stands beside the box holding up a hand-drawn countdown sign with a big number
3 on it. Momo the kitten's head and one paw emerge from a smaller box behind.
A couch arm anchors the left edge. At the upper right a window shows a night
sky full of stars even though it is clearly daytime — that window is the whole
joke of the page, so make it prominent.

Tape strips on the box corners. About 12 separate things to color.
```

---

## Страница 3 — The Blanket That Was a Castle

```
A corner of a bedroom. A blanket is thrown over two chairs, and rising out of
its folds are two cone-roofed castle towers with flags, and an arched doorway
where the blanket gaps open. Mia stands in that doorway wearing a paper crown,
holding the blanket-door open with one hand and looking straight out at the
reader. Waffles the dachshund lies stretched full length across the entrance
like a very long and very bored drawbridge — his length should span almost
half the page width. Momo is under the blanket hem at the right with only one
eye and two ears showing.

Floorboard lines below, one chair leg visible at each side, one tassel on the
blanket corner. Keep it gentle and open — this is one of the simplest pages in
the book. About 9 separate things to color.
```

---

## Страница 4 — The Sofa That Was a Mountain

```
A living room becoming an alpine climb. Leo is halfway up the arm of a sofa,
one leg braced, both arms reaching for the top cushion, with a coil of rope
over his shoulder. Behind and above him a mountain range rises into the upper
half of the page, and its silhouette echoes the sofa's exact profile at a much
larger scale — that visual rhyme between furniture and mountain is the whole
idea of the page and must be obvious. The rug below is the valley floor.
Waffles sits at the base of the sofa beside a tiny flag marked as base camp.
Pip circles near the mountain peak.

Two snow lines on the peaks. Large simple shapes throughout — this should be
one of the most satisfying pages to color in the book. About 8 separate things
to color.
```

---

## Страница 5 — The Stick That Was a Magic Wand

```
A garden. Mia stands left of centre holding a crooked garden stick high above
her head, and sparkles pour off its tip and drift diagonally across the whole
upper right of the page. Beside her at the bottom left, in his own patch of
empty ground, Waffles has found a stick of his own and carries it proudly in
his mouth — and absolutely nothing is happening at his end. That contrast is
the joke.

A flower bed runs along the bottom with three flowers. One round leafy tree at
the right side, tall enough to hold that side of the page, with Pip perched on
a branch. Nine sparkles at two different sizes. Grass tufts. About 12 separate
things to color.
```

---

## Страница 6 — The Laundry Basket That Was a Boat

```
A laundry room become an ocean. Mia sits inside a wicker laundry basket that
rides a sea of spilled washing, steering with a wooden spoon. A sock is rigged
as a sail on a broom-handle mast that rises high toward the top of the page.
Waffles stands at the prow of the basket like a figurehead, looking out to
sea. Big wave lines run out across the floor in every direction.

A washing machine anchors the left side, its round door echoing a porthole,
with a shelf above holding two bottles. Scattered socks. A trail of bubbles.
Three large simple wave shapes — keep them big and colorable, not a fine
ripple pattern. About 9 separate things to color.
```

---

## Страница 7 — The Tube That Was a Telescope

```
A bedroom at night. The dominant shape is a tall window with a rounded top
filling the upper two thirds of the page. Through the glass: a huge moon with
a few large craters, a ringed planet, and a scatter of eleven stars at three
sizes. Leo kneels on the window seat below right with a cardboard tube pressed
to one eye, aimed out at the sky. Momo sits on the windowsill at the window's
lower edge, tail curled, watching the same sky — let her break across the
frame line so she does not read as a sticker stuck on.

At the far left edge, Mia is asleep under a blanket with only her bob haircut
and one hand showing. A window-seat cushion, a curtain edge. Quiet page. About
13 separate things to color.
```

---

## Страница 8 — The Umbrella That Was a Hot-Air Balloon

```
Mia and Leo hang from the handle of an open umbrella, rising above the
rooftops of their town. The umbrella has become a hot-air balloon envelope
with a wicker basket below it, caught exactly halfway between both objects —
draw it as one thing refusing to be either. Waffles hangs from the basket rim
by his teeth, body dangling at full absurd length below. Pip flies level with
them. Momo watches from a chimney far below.

This is the one page in the book that is deliberately top-weighted, because
the whole subject is leaving the ground: the balloon fills the upper half, and
the town skyline runs unusually low across the bottom — rooftops, four
chimneys, a church spire, a weather vane. Two large clouds, two distant birds.
The umbrella canopy is divided into six panels. Three ropes to the basket.

The busiest page of this section. About 16 separate things to color.
```

---

# СЕКЦИЯ 2 — МАЛЕНЬКИЕ ПРИКЛЮЧЕНИЯ

Секция про движение: они уже внутри воображения и куда-то идут.

---

## Страница 9 — The Backyard Expedition

```
A back garden that has gone jungle. Mia leads, holding a hand-drawn map open
in both hands. Leo follows a little behind and slightly smaller, wearing a
saucepan as a helmet and a backpack far too large for him — the size
difference is how the page shows distance, so keep him clearly behind her.
Waffles trots ahead of both of them, nose down on the trail.

A dashed path enters at the bottom left and curves back into a dense tree line
across the middle of the page. Four oversized leaves. One suspiciously large
flower. A mushroom, a butterfly, three grass tufts. Pip scouts from a high
branch. About 13 separate things to color.
```

---

## Страница 10 — The Treehouse Lookout

```
A big garden tree with a treehouse sitting in the fork of its branches. The
trunk rises from the ground at centre-left all the way to a large leafy canopy
at the top of the page — that canopy is the biggest single colorable mass in
the book, so keep it as one generous open shape, not a mass of individual
leaves. The treehouse sits on the branch fork BELOW the foliage with visible
plank supports underneath it; it must clearly rest on something, never float
inside a leaf blob.

Leo leans out of the treehouse window with a cardboard tube used as a
spyglass. Mia is halfway up a ladder that leans clear of the trunk without
overlapping it. Pip perches on the roof ridge. Below, Waffles has both front
paws up on the bottom rung and no idea what to do next.

A rope with a bucket, a knothole in the trunk, two bushes, grass. About 12
separate things to color.
```

---

## Страница 11 — Crossing the Great Puddle

```
A pond in a meadow with five stepping stones across it in a staggered line.
Mia is mid-stride between the third and fourth stone, arms out for balance.
Meanwhile Waffles has solved the same problem differently: he has stretched
himself between two stones at his full absurd length to make a bridge, and
Momo is walking across his back. Two solutions to one problem, side by side —
that is the page.

Give Waffles room along the lower right; this is the clearest statement of his
proportions in the whole book. Reeds at both banks, one duck on the water, two
lily pads, ripple arcs, a dragonfly. Pip perches on a reed. About 10 separate
things to color.
```

---

## Страница 12 — The Sandbox Desert

```
A sandbox that has become a desert. The wooden frame of the sandbox runs
across the lower part of the page, and two distant dunes continue that same
line outward on both sides, so the box edge and the desert horizon read as one
continuous stroke — that is the trick of the page.

Leo digs with a spade, sand flying in clods. Mia kneels beside a half-buried
wooden treasure chest whose lid is just breaking the surface. Draw her kneeling
simply — the skirt as a bell shape with knee bumps, never articulated folded
legs. A tall cactus stands at the far corner. Waffles has dug his own separate
hole and is in it up to the shoulders.

A bucket, three sand ripples, a sun high at the right, one lizard. About 13
separate things to color.
```

---

## Страница 13 — The Kite That Pulled Us Up

```
An open meadow. A big diamond kite flies high in the upper right of the page,
its face divided into four colorable panels, with three bows on its tail. The
string runs down as a single clean diagonal — the strongest line on the page —
to Mia, whose heels are just lifting off the ground. Leo has both arms around
her waist, holding on, and is rising too. Their hair blows to one side and a
wind swirl sweeps across the sky.

A low rounded hill sits behind them in the middle distance and is essential —
it keeps the page from being empty between the kite and the ground. Five grass
tufts bending in the wind, two clouds, one dandelion seed head. Pip flies.

Deliberately simple and open. About 9 separate things to color.
```

---

## Страница 14 — Campfire Under the First Star

```
A camp in the garden at dusk. A tent stands at the left, tall enough to anchor
that side, with a small flag on its pole where Pip is perched. At the centre, a
ring of stones with a fire in it, flame tongues rising. Two log seats. Mia and
Leo sit facing each other across the fire, each toasting a marshmallow on a
long stick — this is the only symmetrical moment in the entire book, so let it
be calm and balanced.

Waffles lies stretched full-length along one log like a draught excluder. Momo
is just outside the firelight, visible only as a pair of eyes. A s'more on a
plate. Three simple tree silhouettes behind at low height.

One single star high at the upper right, alone in a lot of white space — the
restraint is the point, do not add more stars. Warm and safe. About 10
separate things to color.
```

---

## Страница 15 — The Midnight Snack Quest

```
A kitchen at night. A run of cupboards fills the upper half of the page across
its width — that is what gives this indoor page its height. Leo stands on
tiptoe on a chair, reaching up for a biscuit tin on the high shelf, his hand
just below it. Mia steadies the chair with one hand and holds a torch with the
other; its beam is a long clean triangle across the cupboards and is the only
diagonal on the page.

Momo is already up on the counter and has clearly got there first. Waffles
waits below with total faith. A window at the side with the moon in it. Four
jars on the counter, a kettle, a mug, floor tiles as a few large squares.
About 13 separate things to color.
```

---

## Страница 16 — The Map We Drew Ourselves
*Страница-активность: ребёнок дорисовывает карту.*

```
A large sheet of paper spread across almost the whole page as a slightly
rotated rectangle with a torn edge, its four corners weighted down by a stone,
a mug, a shoe and Momo sitting on the fourth corner.

Drawn on the paper: a partly finished treasure map. A compass rose at the
bottom left, a coastline, a little forest of small trees, and three landmarks —
a mountain, a tall tree, a small tower. A dashed route runs from the compass
rose past the landmarks and then simply STOPS in open space about halfway up,
with a large question mark beside it. Everything beyond that point is clean
empty paper, and it must read as blank paper rather than as an unfinished
drawing — that empty half is where the child draws their own map.

Mia and Leo lie on their stomachs at the bottom edge with pencils, heads and
shoulders overlapping the bottom edge of the map so they are part of the scene.
Floorboards visible at the margins. About 10 separate things to color.
```

---

# СЕКЦИЯ 3 — А ЕСЛИ БЫ ЖИВОТНЫЕ МОГЛИ…

Каждая страница задаёт вопрос заголовком и отвечает на него картинкой.
Большие звериные тела = большие области под заливку, самая щадящая секция для
младших.

---

## Страница 17 — What If Waffles Could Fly?

```
Waffles the dachshund is airborne above the rooftops, flying badly and
joyfully, with a pair of folded paper-plane wings taped along his impossible
length. His long ears stream backwards. He lies on a shallow diagonal across
the upper half of the page at his full length — the longest single shape in
the whole book.

Pip flies alongside in formation, clearly acting as the flight instructor.
Below, Leo stands small on top of a garden wall with both arms thrown up,
having just let go of him.

A washing line strung across the lower third with three shirts hanging on it
fills the middle band. Two rooftops, two treetops, four clouds, tape strips on
the wings. About 12 separate things to color.
```

---

## Страница 18 — What If Momo Could Talk?
*Страница-активность: ребёнок вписывает, что говорит Момо.*

```
Momo the kitten sits square in the middle of a sunlit windowsill, facing the
reader directly — this is the only front-on pose in the entire book — with an
expression of complete innocence.

Above her floats a LARGE empty speech bubble with its tail pointing down
toward her head but stopping well clear of it. That bubble is the biggest
object on the page and its inside is completely empty white space — the
largest empty area in the book, because the child writes in it.

Behind her, a knocked-over plant pot with soil spilled out and a few leaves. A
window frame divides the background into four clean panes with the garden
visible through them. Pip sits outside on the window ledge looking in. A
curtain corner. About 9 separate things to color.
```

---

## Страница 19 — What If the Snail Won the Race?

```
A meadow race track with two dashed lane lines. A snail crosses the finish
line at tremendous speed, shell tilted back, a ribbon breaking across his face
— and he is drawn far larger than life, big in the foreground, because the page
is about how the snail feels. His spiral shell is one of the most satisfying
shapes in the book, so make it big and cleanly spiralled.

Waffles holds one end of the finish ribbon, which runs as a strong horizontal
across the page. It is his only job here and he is taking it very seriously.

A little way behind, under a tree at the right, a rabbit sleeps soundly with
his ears flopped — the tree holds the tall side of the page. A small crowd
cheers from the grass verge: a frog, a turtle and a duck. A small flag, three
grass tufts. No human characters on this page at all. About 10 separate things
to color.
```

---

## Страница 20 — What If the Cow Could Dance?

```
A farmyard mid-performance. A cow is up on her hind legs, front hooves out,
caught mid-spin at the centre of the page. Two sheep watch from a ranch fence
with visible admiration, their heads above the top rail. A chicken stands in
front, conducting. Leo drums on an upturned bucket. Mia claps.

A barn at the left is the tallest thing on the page and anchors it, with a
weather vane on the roof where Pip is perched. The fence runs away to the
right. The page's rhythm reads left to right: tall barn, big cow, low fence.

Three music notes in the air, one hay bale. The silliest page in the book.
About 13 separate things to color.
```

---

## Страница 21 — What If the Fish Could Climb Trees?

```
An apple tree growing at the edge of a pond, with three fish sitting quite
comfortably in its branches — one of them holding an apple. A fourth fish is
halfway up the trunk, climbing. The fish in the branches are what fill the
upper middle of the page, so spread them through the canopy.

A turtle at the base of the trunk looks up with the expression of someone who
has decided not to ask. Mia sits on the bank at the lower left with her chin in
her hands, completely accepting all of this — her calm is what makes the page
funny rather than strange, so keep her relaxed and unbothered.

The pond at the lower left with ripple arcs and reeds. Five apples in the tree,
two fallen on the ground, one leaf falling. Pip on a branch. Deadpan. About 12
separate things to color.
```

---

## Страница 22 — What If the Elephant Needed a Bath?

```
A small bathroom containing, impossibly, one full-sized elephant sitting in
the bathtub. The elephant is the biggest single figure in the entire book —
he fills the centre of the page from top to bottom and the gap between his
size and the size of the room is the whole joke. His trunk is curled up over
his own head, spraying water in big arcs.

Water is going everywhere. Waffles is soaked and delighted. A rubber duck
rides a wave. Momo is on top of the cistern, as high and as dry as she can
possibly get. The bathroom door stands open and the water is heading for the
hallway.

The tub across the lower third, a towel on a rail, a bar of soap with bubbles,
six water splashes. Draw the wall tiles as only four large squares — never a
fine grid. Big simple shapes, the easiest page to color in the second half of
the book. About 10 separate things to color.
```

---

## Страница 23 — What If the Owl Ran the Library?

```
A small library. A tall wall of bookshelves runs across two thirds of the page
from near the top down to the desk, and does all the vertical work — draw the
shelf rows as a few large blocks, never as individual book spines.

An owl in small round spectacles sits on a high stool behind the desk with a
rubber stamp raised, about to stamp an enormous book that Mia is holding up to
him. A queue of borrowers waits, reading left to right at descending heights: a
rabbit with a tower of books, a monkey hanging from the top shelf reading
upside down, and a tortoise who has clearly been in this queue for some time.

Momo is asleep in the returns basket. One high window, a rug, a hanging sign.
The most detailed page of the section. About 15 separate things to color.
```

---

## Страница 24 — What If Every Animal Came to Tea?

```
A long table in the garden under a string of bunting, with every animal from
the book seated at it. A lion sits in the big chair at the head, his mane a
generous colorable mass. A giraffe does not need a chair and is eating from
above — his neck is the single vertical that connects the table to the bunting,
so place him at centre-right. An elephant is pouring tea from a teapot, very
carefully. A rabbit, an owl, a frog and a chicken are at the table too.

Waffles is standing ON the table and nobody has noticed yet. Momo is
underneath it. Mia and Leo sit in the middle, entirely at home. Pip sits on the
bunting line.

The table runs across the page as the horizontal spine, guests on both sides at
staggered heights with the tallest at the ends so the eye stays inside the
frame. Eleven bunting triangles across the top. Teacups, a cake stand, chairs,
a tablecloth, two trees behind.

The busiest page in the book so far. About 18 separate things to color.
```

---

# СЕКЦИЯ 4 — МИРЫ СНОВ

Регистр меняется: ночь, парение, на четырёх страницах из восьми **нет линии
земли вообще**. Композиция строится вокруг центра, а не вверх от земли — именно
это даёт ощущение невесомости.

---

## Страница 25 — The Bed That Sailed Away
*Мия в пижаме со звёздами.*

```
Mia's bed, at sea, at night. The headboard is the prow of a ship, the blanket
rolls like water around it, and a sail has gone up on the bedpost, rising high
and connecting the bed to the top of the page. Mia sits upright in the middle
of the bed in star-patterned pyjamas, awake and pleased with herself. Waffles
is asleep at the foot of the bed and has noticed absolutely nothing.

Open sea all around — no floor, no walls, no room. Three big wave crests with
the waterline cutting across the bed. A large low moon at the upper left. Three
stars. One flying fish, a rope, a pillow.

Gentle and quiet. About 9 separate things to color.
```

---

## Страница 26 — The Staircase to the Moon
*Мия в ночной рубашке.*

```
A staircase made of stars, curving up as a long S-curve from the bottom left
of the page to a moon at the top right. The staircase is the only structure on
the page — this is the emptiest page in the book and it must stay that way.
Roughly half the page is clean white.

Mia is about a third of the way up, one hand resting on an invisible rail,
looking back down over her shoulder. She wears a nightdress. Pip is several
steps ahead of her, waiting.

Fourteen star-steps. The steps below her are already fading away into
sparkles. The moon with a few large craters. Two small distant planets, one
wisp of cloud. Night sky, nothing else. Pure held breath. About 11 separate
things to color.
```

---

## Страница 27 — Under the Quilt Sea
*Мия в пижаме со звёздами, Лео в полосатой.*

```
Underwater — except the water is a quilt. Across the top of the page the
surface is stitched patchwork: four large quilt squares with dashed stitch
lines, and the light coming through it is quilted too.

Mia and Leo swim below in their pyjamas, hair floating, angled downward toward
the seabed. An octopus offers them a teacup. Three fish weave past. On the
seabed at the bottom sits a great open scallop shell with a pearl in it. Momo
is inside an upturned boot, completely dry and completely furious.

Bubbles, two small shells, seaweed, a starfish. The full height of the page is
occupied from the quilt surface at the top to the sand at the bottom. The most
inventive image in the book. About 16 separate things to color.
```

---

## Страница 28 — The Planet Where It Rains Flowers

```
A small round planet, drawn so its curved horizon runs across the bottom of
the page and falls away at both sides — the smallness of the planet is the
point. The cast stands on that curve radially, tilted slightly outward at the
edges. This is the only page in the book where characters are not upright
relative to the page edge.

Flowers fall from the sky instead of rain, scattered down the whole middle of
the page — about twelve of them, big and simple. Leo holds an upside-down
umbrella already heaped with flowers. Mia catches one in her cupped hands.
Waffles has flowers caught in both of his long ears.

A planetary ring arcs behind them. Two small moons. Three craters on the
surface, one flower already growing out of the ground, a scatter of stars.
Cheerful and light. About 13 separate things to color.
```

---

## Страница 29 — The Cloud Playground

```
A playground built entirely on clouds, with no ground line anywhere on the
page. Five clouds at different heights arranged as stepping masses from the
lower left to the upper right, filling the page diagonally.

A slide runs down the edge of one cloud into another. A swing hangs from
nothing at all. Leo is airborne off the end of the slide at the centre of the
page — he is the focal point, with a few motion ticks below him. Mia swings
high. Waffles bounces on a cloud like a trampoline, all four short legs off it
at once. Momo sits primly on the smallest cloud, refusing to participate. Pip
is the only one who finds any of this normal.

A sun at the upper right, three distant birds, a fragment of rainbow, one
dropped shoe falling. Play at full volume. About 13 separate things to color.
```

---

## Страница 30 — The Forest That Woke Up

```
A forest at night. Three big tree trunks rise from the bottom of the page
clear off the top edge, dividing the page into vertical bands. The trees have
woken up — not with drawn eyes, but with little arched fairy doors and small
lit windows set into their trunks.

Mia walks a path that runs from the bottom centre back into the middle
distance, carrying a lantern. Draw the lantern light as a simple clean ring,
never a gradient or a glow. Momo pads along behind her, tail up. A friendly
owl watches from a branch — friendly, not spooky; nothing on this page is
hiding. Pip perches nearby.

Seven fireflies drifting. A ring of three toadstools to one side. Path stones,
a canopy mass above, a fragment of moon through the branches. Quietly
mysterious, never frightening. About 10 separate things to color.
```

---

## Страница 31 — The Upside-Down Town
*Страница-активность: ребёнок достраивает зеркальную половину.*

```
A lakeshore at dusk, with the waterline running horizontally across the exact
centre of the page as a mirror axis.

Above the line: a quiet town — four rooftops, a church spire, one tree. Below
the line: the same shapes reflected — except the reflection is the lively one.
Down there the windows are lit and a kite is flying.

Here is the activity: the LEFT half of the reflection is drawn solid in normal
line art. The RIGHT half of the reflection is drawn only as faint dotted
outlines, for the child to complete by following the mirror.

Mia stands on the shoreline exactly at the axis and is the only element that is
not mirrored. Pip flies above. Seven lit windows in the reflection, three
ripple lines, two clouds, a moon. About 10 separate things to color.
```

---

## Страница 32 — Leo's Dream Machine

```
A magnificent contraption standing in an open garden shed at night, clearly
built out of household objects: a funnel at the top, a boiler body made from a
laundry basket, a crank wheel taken from a bicycle, a chimney that is a rolled-
up rug, and a chute at the bottom.

The machine is a tall vertical stack filling the page from top to bottom at
centre-left. Out of the chute at the bottom right, finished dreams are pouring
onto the floor and spreading out: stars, small planets, a fish, one tiny
castle.

Leo turns the crank on the left. Mia stands on a step stool feeding one
ordinary grey pebble into the funnel at the top. Waffles and Momo watch the
chute intently. Pip sits on the chimney.

Pipes, three bolts, puffs of steam, the open shed doors, night sky with stars
beyond. An ordinary pebble goes in and a small world comes out. Keep the
machine's silhouette clear and readable — it is a stack of simple recognisable
household shapes, not a tangle. About 17 separate things to color.
```

---

# СЕКЦИЯ 5 — МИР ПОЛОН ЧУДЕС

**Здесь не добавляется никакого волшебства.** Каждая страница — то, мимо чего
ребёнок реально может пройти сегодня днём. В этом весь смысл: после тридцати
двух страниц превращений читатель научился превращать сам, и книга перестаёт
делать это за него.

---

## Страница 33 — Morning Light on the Kitchen Floor

```
A kitchen floor in early morning. A long rectangle of sunlight lies across it
as a clean outlined shape with the window's cross-bars printed inside it as
divisions — that patch of light is the main shape on the page and it runs
diagonally from the window at the upper right down to the lower left.

Momo lies in the middle of the light with her eyes shut. Waffles has arrived
to lie in it too and there is very clearly not enough room for both of them.
Mia sits on the floor in the corner of the light holding a cup.

The window above holds the top of the page. Table legs, a chair, floor tiles
as four large squares, a spoon on the floor. Everyone is at floor level — the
lowest-energy, calmest composition in the book, and that is deliberate.
Nothing magical happens. About 9 separate things to color.
```

---

## Страница 34 — The Longest Shadows

```
A pavement in late afternoon with the sun low behind. Mia, Leo and Waffles
stand in a row across the middle of the page, drawn deliberately SMALL —
because the shadows are the real subject.

Their shadows stretch enormously across the page toward the reader and run off
the bottom edge. The shadows are drawn as outlined shapes, never filled solid.
And they are not quite doing what their owners are doing: Mia's shadow has
wings. Leo's shadow is twelve feet tall. Waffles' shadow runs right off the
bottom of the page entirely.

A low wall behind them, a hedge with a scalloped top, the sun near the horizon,
a lamppost. Pip flies, and Pip's shadow is down there too. Pavement cracks, two
distant birds. Three big simple satisfying shadow shapes. About 10 separate
things to color.
```

---

## Страница 35 — A Whole World in the Garden Bed

```
Ground level, extremely close up — insect scale. Grass blades rise the full
height of the page like a forest, six of them, framing everything in vertical
strokes.

Mia lies on her front along the bottom third with her chin on her hands, face
to face with a snail sitting on a stem. The snail is small but it is the focal
point — every line in the composition points at it.

The garden bed is busy: a beetle, a ladybird, a line of five ants carrying a
leaf, a butterfly landing, a worm surfacing from the soil. One fallen leaf acts
as a bridge. Momo's enormous face looms in at the edge of the frame,
interested. Pip's feet are just visible at the very top edge.

Three soil clods, a flower head, one dew drop. About 14 separate things to
color.
```

---

## Страница 36 — The Bird Who Sang Our Song

```
A bedroom in the morning, seen from inside, with an open window filling the
centre-right of the page from near the top down past the middle. Pip sits on a
tree branch just outside, inside the window frame, mid-song — small but
unmissable.

His notes come in through the open window and drift diagonally across the room
from the upper right to the lower left: nine music notes at two sizes, floating
over a lamp, past a picture frame, along a curtain. They are the only thing
moving on the page.

Mia stands on tiptoe at the sill with both elbows on it, listening. Momo sits
on the sill beside her doing exactly the same thing, which is unusual restraint
on her part.

A floor lamp and a framed picture hold the left side. Three leaves on the
branch, a plant pot. About 10 separate things to color.
```

---

## Страница 37 — The Puddle, Again

```
The SAME street corner as page 1 — same puddle, same lamppost, same two
rooftops, same composition. Use page 1 as the base and change it by SUBTRACTING,
not by drawing a new scene.

The rain has stopped properly now. The puddle is only reflecting the sky and
the lamppost — the waves are gone, the whale is gone, the reflection lines are
calm. The puddle interior is now the largest single open area in the book.

Except: right out in the middle of it, small and clear, the little sailboat is
still there.

Mia stands on the left looking at it with her hands behind her back. Leo is
crouched beside her again on the right. Waffles is standing in the puddle
again. Momo has come too this time, and she stands in the space where the whale
used to be. Pip is on the same lamppost arm as before.

Two clouds, ripples where Waffles stands. The empty space is not a loss — it is
room left for the child. About 11 separate things to color.
```

---

## Страница 38 — Find the Wonder
*Страница-активность: поиск предметов со всей книги.*

```
A busy ordinary town street on a Saturday, fully populated — the densest page
in the book. Three shopfronts along the middle band, a road across the lower
third, a skyline above. A bus at a bus stop, a market stall with an awning, a
dog walker, a cyclist, a pigeon on a bin, a child with a balloon, a skip.

Nothing magical is happening anywhere. But hidden in the ordinary street are
things from earlier in the book: the little sailboat sits in a shop window, a
lion is on a poster, a small fairy door is at the base of a lamppost, the dream
machine's funnel is sticking out of the skip. The five main characters are
dispersed through the crowd.

Down the right-hand edge runs a narrow vertical checklist column of eleven
small framed icons showing what to find — keep it as a clean separate strip so
it never competes with the drawing.

About 18 separate things to color.
```

---

## Страница 39 — Draw What You See
*Страница-активность: ребёнок рисует своё.*

```
A wall of a room hung like a small gallery. Mia and Leo stand at either side
of a LARGE empty picture frame, holding it up between them and turned to face
the reader, their heads above its top edge, hands on the moulding.

Everything inside that frame is completely blank white paper — the single
largest empty area in the book, because this is where the child draws.

Around it on the wall hang six small framed drawings in a loose ring, each one
a little thumbnail of a scene from earlier in the book — a puddle, a rocket
box, a castle, a kite, a cloud, a star staircase. One of the six hangs
slightly crooked.

Momo sits on the lower edge of the big frame, which is exactly the sort of
thing that would ruin a real painting. Picture hooks, a wall line, a stool, a
pencil on the floor. About 10 separate things to color.
```

---

## Страница 40 — The World Through My Eyes

```
A great soap bubble floats in the middle of the page, and inside its curve, in
clean small line work, is the whole book: a puddle with an ocean in it, a
cardboard box rocket, a blanket castle, a cloud playground, a staircase of
stars, a long tea party table. Draw these six miniature scenes small with
plenty of white space between them so they read as memories rather than
clutter.

Below the bubble the entire cast stands together looking up: Mia and Leo side
by side, Waffles stretched across in front of them at full length, Momo on
Leo's shoulder in full view for once, and Pip balanced on the very top of the
bubble where he should not be able to balance at all.

Along the bottom of the page, the book's title in large hollow outlined
capital letters for the child to color in: THE WORLD THROUGH MY EYES.

Sparkles, one second smaller bubble, two drifting stars, a light suggestion of
ground. Warm and open, placed nowhere in particular. Hide the wonder star in
its hardest position of the whole book. About 16 separate things to color.
```

---

# Порядок сборки

Не по порядку номеров:

1. **Лист персонажей.** Без него не начинать вообще ничего.
2. **Страницы 1 и 37 подряд, одну за другой.** Это парный callback: 37-я —
   та же самая картинка, из которой убраны волны и кит. Если рисовать их с
   разницей в тридцать страниц, они не совпадут, и главная идея книги
   развалится.
3. **Страница 32 (машина снов) — рано.** Самая рискованная страница книги:
   сложный составной объект, которого нет ни в одном шаблоне. Если с двух
   попыток не читается — успеем упростить силуэт, а не тащить слабую картинку в
   печать.
4. Дальше секциями по порядку.

Присылай пачками по мере готовности — прогоню через `qa.py`, он численно ловит
серое, заливки и недостаточное разрешение, и соберу из принятого векторные SVG
и финальный PDF.
