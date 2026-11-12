from PIL import Image, ImageDraw, ImageFont, ImageFilter
U=''
S=1792
bg=Image.open(U+'e3d4466a-image.jpg').convert('RGB').crop((0,250,1792,2042))
W=(255,250,244);FUX=(255,45,149)
d=ImageDraw.Draw(bg)
def txt(t,font,size,xy,fill,sp=0,rot=0,shadow=True):
  f=ImageFont.truetype(font,size)
  tmp=Image.new('RGBA',(int(len(t)*size*1.2+sp*len(t)+40),int(size*1.6)),(0,0,0,0));td=ImageDraw.Draw(tmp);x=10
  for c in t: td.text((x,10),c,font=f,fill=fill);x+=td.textlength(c,font=f)+sp
  tmp=tmp.crop(tmp.getbbox())
  if rot: tmp=tmp.rotate(rot,expand=True,resample=Image.BICUBIC)
  if shadow:
    sh=Image.new('RGBA',tmp.size,(0,0,0,0));sh.putalpha(tmp.split()[3].point(lambda a:int(a*.45)));sh=sh.filter(ImageFilter.GaussianBlur(6))
    bg.paste((10,0,15),(xy[0]+4,xy[1]+6),sh)
  bg.paste(tmp,xy,tmp)
txt('PASSION','BodoniModa.ttf',210,(70,70),W,sp=18)
txt('influence','CormorantGaramond.ttf',150,(990,330),W,rot=6)
txt('дерзость','Unbounded.ttf',96,(80,345),FUX,rot=-3)
txt('S P E E D','Manrope.ttf',62,(1180,90),W,sp=10)
txt('aesthetic','CormorantGaramond.ttf',120,(1120,1240),W,rot=-4)
# perfume polaroid
b=Image.open(U+'324f6305-image.jpg').convert('RGB');b=b.crop((60,20,690,700)).resize((480,518))
card=Image.new('RGB',(540,680),(252,250,246));card.paste(b,(30,30))
cd=ImageDraw.Draw(card);f=ImageFont.truetype('CormorantGaramond.ttf',54)
t='обещала — сделала';cd.text(((540-cd.textlength(t,font=f))/2,575),t,font=f,fill=(40,30,35))
card=card.convert('RGBA');card=card.rotate(-8,expand=True,resample=Image.BICUBIC)
sh=Image.new('RGBA',card.size,(0,0,0,0));sh.putalpha(card.split()[3].point(lambda a:int(a*.5)));sh=sh.filter(ImageFilter.GaussianBlur(18))
x,y=70,1020;bg.paste((0,0,0),(x+14,y+22),sh);bg.paste(card,(x,y),card)
# check stamp
st=Image.new('RGBA',(260,260),(0,0,0,0));sd=ImageDraw.Draw(st);sd.ellipse((10,10,250,250),fill=FUX)
fs=ImageFont.truetype('Unbounded.ttf',34);sd.line([(88,100),(118,132),(176,70)],fill='white',width=16,joint='curve')
sd.text((130,170),'АКТИВИ-',font=ImageFont.truetype('Manrope.ttf',30),fill='white',anchor='mm');sd.text((130,202),'РОВАНО',font=ImageFont.truetype('Manrope.ttf',30),fill='white',anchor='mm')
st=st.rotate(12,resample=Image.BICUBIC);bg.paste(st,(500,960),st)
bg.save('star collage.jpg',quality=94)
