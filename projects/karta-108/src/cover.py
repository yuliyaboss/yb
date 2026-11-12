from PIL import Image, ImageDraw, ImageFont, ImageFilter
U=''
bg=Image.open(U+'e3d4466a-image.jpg').convert('RGB').crop((0,250,1792,2042))
W=(255,252,247);FUX=(255,45,149)
d=ImageDraw.Draw(bg)
f=lambda n,s: ImageFont.truetype(n,s)
def put(t,font,xy,fill=W,sp=0,anchor='la',shadow=.35):
  lay=Image.new('RGBA',bg.size,(0,0,0,0));ld=ImageDraw.Draw(lay)
  x,y=xy
  if sp:
    for c in t: ld.text((x,y),c,font=font,fill=fill);x+=ld.textlength(c,font=font)+sp
  else: ld.text(xy,t,font=font,fill=fill,anchor=anchor)
  if shadow:
    sh=Image.new('RGBA',bg.size,(0,0,0,0));sh.putalpha(lay.split()[3].point(lambda a:int(a*shadow)));sh=sh.filter(ImageFilter.GaussianBlur(5))
    bg.paste((15,5,10),(3,4),sh)
  bg.paste(lay,(0,0),lay)
# masthead
mf=f('BodoniModa.ttf',300);tw=d.textlength('VOGUE',font=mf);sp=40
put('VOGUE',mf,((1792-tw-sp*4)/2,-30),sp=sp,shadow=.25)
put('THE  SPEED  ISSUE',f('Manrope.ttf',30),(70,340),sp=6)
put('NOVEMBER 2027',f('Manrope.ttf',26),(1440,410),sp=3)
# left cover lines
y=470
put('PASSION',f('Playfair.ttf',120),(70,y),fill=FUX);y+=130
put('& the art of',f('CormorantGaramond.ttf',62),(74,y));y+=62
put('being daring',f('CormorantGaramond.ttf',62),(74,y));y+=120
put('FREEDOM',f('Unbounded.ttf',58),(70,y));y+=72
put('No boss, no limits,',f('Manrope.ttf',38),(74,y));y+=46
put('no permission needed',f('Manrope.ttf',38),(74,y));y+=110
put('AESTHETIC',f('Unbounded.ttf',58),(70,y));y+=72
put('Gold, silk and speed:',f('Manrope.ttf',38),(74,y));y+=46
put('inside LUEUR',f('Manrope.ttf',38),(74,y))
# right column
ry=1150
for head,sub in [('INFLUENCE',['How she built','1 million followers']),('SCALE',['From Warsaw to Dubai:','thinking bigger']),('VISION',['She saw it first.','Then she made it real'])]:
  put(head,f('Unbounded.ttf',44),(1420,ry),fill=FUX if head=='INFLUENCE' else W);ry+=58
  for t in sub: put(t,f('Manrope.ttf',28),(1423,ry),shadow=.8);ry+=36
  ry+=34
# name
put('JULIENNE BOSQO',f('Playfair.ttf',96),(70,1600))
# perfume cutout
p=Image.open(U+'324f6305-image.jpg').convert('RGB')
m=Image.new('L',p.size,255);
import numpy as np
a=np.array(p).astype(int);white=(a.min(axis=2)>240)
from collections import deque
H,Wd=white.shape;bgm=np.zeros_like(white);q=deque()
for x in range(Wd):
  for y0 in (0,H-1):
    if white[y0,x]: q.append((y0,x))
for y0 in range(H):
  for x in (0,Wd-1):
    if white[y0,x]: q.append((y0,x))
while q:
  y0,x=q.popleft()
  if bgm[y0,x] or not white[y0,x]: continue
  bgm[y0,x]=1
  for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
    ny,nx=y0+dy,x+dx
    if 0<=ny<H and 0<=nx<Wd and not bgm[ny,nx] and white[ny,nx]: q.append((ny,nx))
alpha=Image.fromarray(((1-bgm)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.5))
p.putalpha(alpha);p=p.crop(p.getbbox());p.thumbnail((230,230))
px=1030;py=1792-p.height-45;bg.paste(p,(px,py),p)
# check
cx,cy=px+p.width-14,py+10
d=ImageDraw.Draw(bg);d.ellipse((cx-34,cy-34,cx+34,cy+34),fill=FUX);d.line([(cx-16,cy+1),(cx-4,cy+14),(cx+18,cy-12)],fill='white',width=8)
bg.save('star collage.jpg',quality=94)
