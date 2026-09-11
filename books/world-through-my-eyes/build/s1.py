"""SECTION 1 - ORDINARY THINGS BECOME MAGICAL (pages 1-8).

Every page carries a deliberate vertical plan: a background anchor that
reaches the 400-550 band, foreground figures at 300-340px, and the
transformation happening in one image rather than across two pages.
"""
from lib_ext import *
import charlib as cl
from scenes import scene_meadow, SCENE_GROUND

FG = 938          # foreground ground line
ROAD = 872


def p01_puddle():
    b = [cl.skyline(ROAD - 6, 74, 788)]
    b.append(cl.LINE(70, ROAD, 792, ROAD, 4))
    b.append(cl.LINE(70, FG, 792, FG, 4))
    b.append(cl.G(146, ROAD, cl.lamppost(0, 0, h=420), 1.0))
    b.append(cl.cloud(640, 300, 30))
    # the puddle, and the ocean inside it
    b.append(cl.E(468, 902, 238, 48, 5.5, "white"))
    b.append(cl.P("M 276 898 Q 330 886 384 898", 3))
    b.append(cl.P("M 520 916 Q 574 904 628 916", 3))
    b.append(cl.matted(cl.G(420, 894, cl.sailboat(0, 0, w=190), 1.0), 8))
    b.append(cl.matted(cl.G(626, 902, cl.whale_spout(0, 0, w=160), 1.0), 8))
    b.append(mia("point", 1.34, 196, FG))
    b.append(leo("down", 1.22, 726, FG))
    b.append(pip(146, 460, 0.66))
    b.append(wonder_star(688, 214))
    return bpage("The Puddle That Was an Ocean", "".join(b), 1)


def p02_box():
    b = [cl.rrect(500, 196, 268, 316, 12, 5.5, "white")]          # window
    b.append(cl.LINE(634, 196, 634, 512, 4))
    b.append(cl.LINE(500, 354, 768, 354, 4))
    b.append(cl.star_field(516, 214, 752, 498, n=9))
    b.append(cl.G(132, FG, cl.floor_lamp(0, 0, h=360), 1.0))
    b.append(cl.LINE(70, FG, 792, FG, 4))
    b.append(cl.rug(450, FG - 8, rx=300, ry=26))
    # Leo goes in FIRST; the box is drawn over him and hides his legs
    b.append(leo("up", 1.12, 404, 742, mat=False))
    b.append(cl.P("M 300 700 L 404 596 L 508 700 Z", 5, "white"))  # nose cone
    b.append(cl.P("M 300 700 L 236 906 L 300 890 Z", 5, "white"))  # left fin
    b.append(cl.P("M 508 700 L 572 906 L 508 890 Z", 5, "white"))  # right fin
    b.append(cl.rrect(300, 700, 208, 200, 10, 5.5, "white"))       # the box
    b.append(cl.LINE(300, 752, 508, 752, 3.5))
    b.append(cl.C(404, 828, 34, 4.5, "none"))                      # porthole
    b.append(cl.C(404, 828, 20, 3, "none"))
    b.append(mia("hold", 1.20, 692, FG))
    b.append(cl.rrect(636, 700, 104, 74, 8, 4.5, "white"))
    b.append(cl.otext(688, 758, "3", 50, 4))
    b.append(momo(186, FG, 1.15))
    b.append(wonder_star(300, 250))
    return bpage("The Box That Was a Rocket", "".join(b), 2)


def p03_blanket():
    b = []
    b.append(cl.matted(cl.G(436, FG, cl.castle_small(0, 0, w=520), 1.0), 9))
    b.append(cl.LINE(70, FG, 792, FG, 4))
    for x in range(96, 792, 62):
        b.append(cl.LINE(x, FG, x - 14, 996, 2.5))
    # the blanket draped over the castle's base
    b.append(cl.P("M 150 936 Q 160 770 300 742 L 300 742 Q 436 716 572 742 "
                  "Q 712 770 722 936 Z", 5.5, "white"))
    b.append(cl.scallop_edge(154, 718, 936, bumps=9, r=13, sw=3.5))
    b.append(cl.P("M 360 936 Q 356 812 436 792 Q 516 812 512 936 Z", 5, "white"))
    b.append(mia("hold", 1.20, 436, FG - 6, acc=("crown",)))
    b.append(waffles(232, FG, 0.92))
    b.append(momo(686, FG, 1.1, flip=True))
    b.append(wonder_star(690, 290))
    return bpage("The Blanket That Was a Castle", "".join(b), 3)


def p04_sofa():
    b = [cl.matted(cl.G(436, 756, cl.mountain_range(0, 0, w=640, peaks=3, h=360), 1.0), 9)]
    b.append(cl.LINE(70, FG, 792, FG, 4))
    b.append(cl.rug(430, FG - 6, rx=300, ry=24))
    b.append(cl.G(268, FG, cl.couch(0, 0, w=320), 1.2))
    b.append(leo("up", 1.10, 556, 762))
    b.append(waffles(248, FG, 0.92, tongue=True))
    b.append(cl.G(150, FG, cl.wooden_sign(0, 0, "CAMP", w=132), 0.9))
    b.append(pip(660, 420, 0.66, flip=True))
    b.append(wonder_star(172, 300))
    return bpage("The Sofa That Was a Mountain", "".join(b), 4)


def p05_stick():
    b = [scene_meadow(variant=1, midground=False)]
    b.append(cl.matted(cl.G(682, SCENE_GROUND - 2, cl.tree_round(0, 0, h=420), 1.0), 9))
    b.append(mia("up", 1.34, 268, SCENE_GROUND, acc=("wand",)))
    for sx, sy, sr in [(392, 468, 17), (452, 396, 13), (516, 332, 19),
                       (586, 300, 13), (352, 556, 12), (642, 372, 15)]:
        b.append(cl.sparkle(sx, sy, sr))
    b.append(waffles(566, SCENE_GROUND, 0.86))
    b.append(cl.P("M 462 806 L 620 790", 5))          # Waffles' own stick
    b.append(pip(138, 560, 0.66))
    b.append(wonder_star(160, 316))
    return bpage("The Stick That Was a Wand", "".join(b), 5)


def p06_basket():
    b = [cl.rrect(96, 560, 196, 380, 12, 5.5, "white")]      # washing machine
    b.append(cl.C(194, 700, 62, 4.5, "none"))
    b.append(cl.C(194, 700, 40, 3, "none"))
    b.append(cl.rrect(120, 590, 148, 34, 6, 3.5, "white"))
    b.append(cl.LINE(88, 440, 300, 440, 4.5))                # shelf
    b.append(cl.rrect(114, 386, 32, 54, 5, 3.5, "white"))
    b.append(cl.rrect(166, 378, 30, 62, 5, 3.5, "white"))
    b.append(cl.rrect(216, 392, 34, 48, 5, 3.5, "white"))
    b.append(cl.waves(880, 70, 792, amp=14))
    b.append(cl.waves(924, 70, 792, amp=11))
    b.append(cl.LINE(520, 812, 520, 400, 5.5))               # broom mast
    b.append(cl.G(586, 476, cl.sock(0, 0, 3.2, rot=90), 1.0))
    b.append(cl.matted(cl.G(520, 896, cl.basket(0, 0, w=264), 1.0), 8))
    b.append(cl.G(520, 826, cl.kid_sitting(MIA), 1.16))
    b.append(waffles(680, 872, 0.70, tongue=True))
    b.append(cl.G(346, 962, cl.sock(0, 0, 1.4, rot=-20), 1.0))
    b.append(wonder_star(710, 300))
    return bpage("The Basket That Was a Boat", "".join(b), 6)


def p07_tube():
    b = [cl.rrect(292, 188, 446, 592, 20, 5.5, "white")]     # the window
    b.append(cl.LINE(515, 188, 515, 780, 4))
    b.append(cl.LINE(292, 484, 738, 484, 4))
    b.append(cl.G(406, 312, cl.moon(0, 0, r=82), 1.0))
    b.append(cl.G(644, 636, cl.planet_ringed(0, 0, r=64), 1.0))
    b.append(cl.star_field(310, 206, 722, 764, n=12))
    b.append(cl.LINE(70, 780, 792, 780, 5.5))                # sill
    b.append(cl.LINE(70, FG, 792, FG, 4))
    b.append(cl.rrect(108, 784, 300, 46, 8, 4.5, "white"))   # window seat
    b.append(leo("hold_r", 1.16, 210, 784))
    b.append(cl.P("M 268 604 L 404 556 L 410 582 L 274 630 Z", 5, "white"))
    b.append(momo(658, 780, 1.2))
    b.append(cl.G(760, FG, cl.rrect(-90, -150, 180, 150, 10, 4.5, "white"), 1.0))
    b.append(wonder_star(148, 296))
    return bpage("The Tube That Was a Telescope", "".join(b), 7)


def p08_umbrella():
    b = [cl.skyline(SCENE_GROUND - 4, 74, 788)]
    b.append(cl.LINE(70, SCENE_GROUND, 792, SCENE_GROUND, 4))
    b.append(cl.cloud(156, 358, 32))
    b.append(cl.cloud(722, 440, 28))
    b.append(cl.matted(cl.G(422, 392, cl.hot_air_balloon(0, 0, h=330), 1.0), 9))
    b.append(cl.P("M 422 224 Q 422 184 452 176", 5.5))       # umbrella hook
    b.append(cl.LINE(352, 520, 366, 566, 3.5))
    b.append(cl.LINE(492, 520, 478, 566, 3.5))
    b.append(cl.G(386, 616, cl.kid_stand(MIA, pose="up"), 0.92))
    b.append(cl.GM(506, 620, cl.kid_stand(LEO, pose="up"), 0.88))
    b.append(cl.LINE(560, 574, 604, 700, 3.5))
    b.append(waffles(660, 760, 0.60, flip=True, tongue=True))
    b.append(pip(226, 540, 0.66, flip=True))
    b.append(momo(200, SCENE_GROUND - 108, 0.82))
    b.append(wonder_star(706, 300))
    return bpage("The Umbrella That Was a Balloon", "".join(b), 8)


PAGES = [("01-puddle", p01_puddle), ("02-box", p02_box), ("03-blanket", p03_blanket),
         ("04-sofa", p04_sofa), ("05-stick", p05_stick), ("06-basket", p06_basket),
         ("07-tube", p07_tube), ("08-umbrella", p08_umbrella)]
