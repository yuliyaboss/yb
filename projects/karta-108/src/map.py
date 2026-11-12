from PIL import Image, ImageDraw, ImageFont
U=''
S=''
INK=(20,8,31);FUX=(255,45,149);EMPTY=(36,21,47);MUTE=(150,130,165)
F=lambda n,s: ImageFont.truetype(n+'.ttf',s)
def src(k):
  if k=='income': return Image.open('Доход 108 000 zł.jpg').convert('RGB').crop((150,350,1450,1650))
  if k=='fund': return Image.open('Фонд изобилия 1 000 000 USD.png').convert('RGB').crop((195,325,1095,1225))
  if k=='zen': return Image.open('zen grid.png').convert('RGB')
  if k=='rabbit': return Image.open(U+'ae259a5d-image.jpg').convert('RGB').crop((0,150,1792,1942))
  if k=='lueur': return Image.open(S+'LUEUR — карта 1x1.jpg').convert('RGB')
  if k=='star': return Image.open('star collage.jpg').convert('RGB')
  if k=='med': return Image.open(U+'e9979c35-image.png').convert('RGB').crop((0,700,3584,4284))
  if k=='comm': return Image.open(U+'e954948a-image.jpg').convert('RGB')
  if k is None: return None
  return Image.open(f'cells/{k}.png').convert('RGB')
def fit(im,s):
  w,h=im.size;m=min(w,h);im=im.crop(((w-m)//2,(h-m)//2,(w-m)//2+m,(h-m)//2+m));return im.resize((s,s),Image.LANCZOS)
L=[ # (col,row,span,key,label,pink)
 (0,0,2,'star','',False),
 (2,0,1,'lapland','Лапландия',False),(3,0,1,'uae','ОАЭ',False),
 (2,1,1,'vocal','Вокал',False),(3,1,1,'maldives','Мальдивы',True),
 (0,2,1,'zen','Блог-магнит · 1 mln',False),(1,2,1,'app','IT · приложения',False),(2,2,1,'rabbit','freegen · игрушка',False),(3,2,1,'lueur','LUEUR Maison',True),
 (0,3,1,'income','Доход 100 000+',False),(1,3,1,'porsche','Porsche Cayenne',False),(2,3,1,'house','Дом в Варшаве',False),(3,3,1,'fund','Фонд $1 000 000',True),
 (0,4,1,'pilates','Пилатес',False),(1,4,1,'checkup','Чекап',False),(2,4,1,'med','Штиль · энергия',False),(3,4,1,'body','Образ · тело',True),
 (0,5,1,'couple','Мы вдвоём',False),(1,5,1,'family','Наша семья · и сын',False),(2,5,1,'remont','Ремонт и уют',False),(3,5,1,'comm','Моё комьюнити',True),
]
def tile(k,s,lab,f,pink):
  im=src(k)
  if im is None:
    t=Image.new('RGB',(s,s),EMPTY);d=ImageDraw.Draw(t);tw=d.textlength(lab,font=f);d.text(((s-tw)/2,s/2-f.size/2),lab,font=f,fill=FUX);return t
  t=grade(fit(im,s))
  if not lab: return t
  g=Image.new('L',(1,s))
  for y in range(s): g.putpixel((0,y),int(max(0,(y-s*.62)/(s*.38))*190))
  t=Image.composite(Image.new('RGB',(s,s),(10,0,20)),t,g.resize((s,s)))
  ImageDraw.Draw(t).text((int(s*.06),s-int(s*.06)-f.size),lab,font=f,fill=(255,255,255));return t
import numpy as np
def grade(im):
  a=np.asarray(im).astype(float)/255
  lum=(a*[.3,.59,.11]).sum(2,keepdims=True)
  a=a*0.8+lum*0.2                      # soften saturation
  a=0.05+a*0.9                         # lift blacks, soften highlights
  a=a+(np.array([0.025,0.01,-0.02]))*(1-abs(lum-0.5)*1.2)   # warm cream tone
  a=0.5+(a-0.5)*0.94                   # gentle contrast
  return Image.fromarray((np.clip(a,0,1)*255).astype('uint8'))
def board(cell,gap,f,fs,r):
  W=cell*4+gap*3;H=cell*6+gap*5;b=Image.new('RGB',(W,H),INK);d=ImageDraw.Draw(b)
  for c,ro,sp,k,lab,pink in L:
    s=cell*sp+gap*(sp-1);x=c*(cell+gap);y=ro*(cell+gap)
    m=Image.new('L',(s,s),0);ImageDraw.Draw(m).rounded_rectangle((0,0,s-1,s-1),radius=r,fill=255)
    b.paste(tile(k,s,lab,fs if sp==2 else f,pink),(x,y),m)
    if pink or sp==2:
      d.rounded_rectangle((x,y,x+s-1,y+s-1),radius=r,outline=FUX,width=max(4,cell//55))
    if pink:
      pf=F('Manrope',int(f.size*.7));t='ЗАЦЕЛЬ';tw=d.textlength(t,font=pf);px=x+s-tw-int(cell*.12);py=y+s-int(s*.06)-pf.size-int(cell*.005)
      d.rounded_rectangle((px-int(cell*.04),py-int(cell*.015),px+tw+int(cell*.04),py+pf.size+int(cell*.03)),radius=99,fill=FUX)
      d.text((px,py),t,font=pf,fill=(255,255,255))
  return b
# print
bd=board(600,18,F('Manrope',38),F('Unbounded',50),28);pad=90;top=330
o=Image.new('RGB',(bd.width+pad*2,bd.height+top+pad),INK);o.paste(bd,(pad,top));d=ImageDraw.Draw(o)
d.text((pad,95),'КАРТА',font=F('Unbounded',150),fill=(255,255,255));d.text((pad+d.textlength('КАРТА ',font=F('Unbounded',150)),95),'108',font=F('Unbounded',150),fill=FUX)
sub='жизнь на максималках';sf=F('Manrope',46);d.text((o.width-pad-d.textlength(sub,font=sf),165),sub,font=sf,fill=MUTE)
o.save('Карта 108.jpg',quality=92)
# phone
P=Image.new('RGB',(1290,2796),INK);bd=board(286,10,F('Manrope',20),F('Unbounded',26),16)
x=(1290-bd.width)//2;y=640;P.paste(bd,(x,y));d=ImageDraw.Draw(P)
d.text((x,y-120),'108',font=F('Unbounded',90),fill=FUX)
sf=F('Manrope',34);d.text((x+bd.width-d.textlength(sub,font=sf),y-80),sub,font=sf,fill=MUTE)
P.save('Карта 108 — заставка.jpg',quality=92)
