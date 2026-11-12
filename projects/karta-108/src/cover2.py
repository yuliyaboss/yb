from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np
from collections import deque
U=''
bg=Image.open(U+'e3d4466a-image.jpg').convert('RGB').crop((0,250,1792,2042))
# cinematic grade: lift blacks, warm highlights/teal shadows, slight desat, vignette, grain
a=np.asarray(bg).astype(float)/255
a=a*0.92+0.04
lum=a.mean(axis=2,keepdims=True)
a=a*0.88+lum*0.12
a[...,0]+= (lum[...,0]-0.5)*0.06; a[...,2]-= (lum[...,0]-0.5)*0.07; a[...,1]+= (lum[...,0]-0.5)*0.01
H,W=a.shape[:2];yy,xx=np.mgrid[0:H,0:W];r=np.sqrt(((xx-W/2)/(W/2))**2+((yy-H/2)/(H/2))**2)
a*= (1-0.32*np.clip(r-0.55,0,1)**1.5)[...,None]
a+=np.random.normal(0,0.018,(H,W,1))
bg=Image.fromarray((np.clip(a,0,1)*255).astype('uint8'))
Wt=(250,246,240);FUX=(255,62,150)
f=lambda n,s: ImageFont.truetype(n,s)
def put(t,font,xy,fill=Wt,sp=0,shadow=.5,blur=8):
  lay=Image.new('RGBA',bg.size,(0,0,0,0));ld=ImageDraw.Draw(lay);x,y=xy
  if sp:
    for c in t: ld.text((x,y),c,font=font,fill=fill);x+=ld.textlength(c,font=font)+sp
  else: ld.text(xy,t,font=font,fill=fill)
  sh=Image.new('RGBA',bg.size,(0,0,0,0));sh.putalpha(lay.split()[3].point(lambda v:int(v*shadow)));sh=sh.filter(ImageFilter.GaussianBlur(blur))
  bg.paste((10,4,8),(2,3),sh);bg.paste(lay,(0,0),lay)
d=ImageDraw.Draw(bg)
mf=f('BodoniModa.ttf',280);sp=34;tw=sum(d.textlength(c,font=mf)+sp for c in 'VOGUE')-sp
put('VOGUE',mf,((1792-tw)/2,-20),sp=sp,shadow=.3,blur=12)
put('THE SPEED ISSUE',f('Manrope.ttf',22),(80,330),sp=8,shadow=.6)
put('NOVEMBER 2027',f('Manrope.ttf',22),(1500,330),sp=6,shadow=.6)
H1=f('Bodoni6.ttf',66);SUB=f('PlayfairI.ttf',30)
def tw_(t,font,sp=0): return sum(d.textlength(c,font=font)+sp for c in t)-sp
def block(x,y,head,subs,pink=False,right=False):
  hx=x-tw_(head,H1,3) if right else x
  put(head,H1,(hx,y),fill=FUX if pink else Wt,sp=3);y+=82
  for s in subs:
    sx=x-tw_(s,SUB) if right else x+2
    put(s,SUB,(sx,y),shadow=.75,blur=6);y+=38
  return y+44
y=520
y=block(80,y,'PASSION',['& the art of being daring'],True)
y=block(80,y,'FREEDOM',['No boss, no limits,','no permission needed'])
y=block(80,y,'AESTHETIC',['Gold, silk and speed:','inside LUEUR'])
ry=1020
ry=block(1712,ry,'INFLUENCE',['How she built','1 million followers'],True,True)
ry=block(1712,ry,'SCALE',['Thinking bigger','than ever'],right=True)
ry=block(1712,ry,'VISION',['She saw it first.','Then she made it real'],right=True)
# name
put('JULIENNE BOSQO',f('Bodoni6.ttf',84),(80,1640),sp=6,shadow=.55)
# perfume to left edge, small
p=Image.open(U+'324f6305-image.jpg').convert('RGB');ar=np.array(p).astype(int);white=ar.min(axis=2)>240
h,w=white.shape;bgm=np.zeros_like(white);q=deque([(0,0),(0,w-1),(h-1,0),(h-1,w-1)])
while q:
  y0,x0=q.popleft()
  if not(0<=y0<h and 0<=x0<w) or bgm[y0,x0] or not white[y0,x0]: continue
  bgm[y0,x0]=1;q.extend([(y0+1,x0),(y0-1,x0),(y0,x0+1),(y0,x0-1)])
p.putalpha(Image.fromarray(((1-bgm)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.5)));p=p.crop(p.getbbox());p.thumbnail((170,170))
p=p.rotate(-6,expand=True,resample=Image.BICUBIC)
px,py=80,1400
sh=Image.new('RGBA',p.size,(0,0,0,0));sh.putalpha(p.split()[3].point(lambda v:int(v*.5)));sh=sh.filter(ImageFilter.GaussianBlur(10))
bg.paste((0,0,0),(px+8,py+12),sh);bg.paste(p,(px,py),p)
dd=ImageDraw.Draw(bg);cx,cy=px+p.width-6,py+14
dd.ellipse((cx-22,cy-22,cx+22,cy+22),fill=FUX);dd.line([(cx-10,cy+1),(cx-2,cy+9),(cx+12,cy-8)],fill='white',width=6)
bg.save('star collage.jpg',quality=95)
