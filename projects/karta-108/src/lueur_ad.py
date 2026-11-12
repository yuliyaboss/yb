from PIL import Image, ImageDraw, ImageFont
src=Image.open('6a4c7eab-image.jpg').convert('RGB')
def grad(im,top,bot):
  w,h=im.size;m=Image.new('L',(1,h))
  for y in range(h):
    a=0
    if y<h*top: a=int(150*(1-y/(h*top)))
    if y>h*(1-bot): a=int(170*((y-h*(1-bot))/(h*bot)))
    m.putpixel((0,y),a)
  return Image.composite(Image.new('RGB',(w,h),(12,6,8)),im,m.resize((w,h)))
def spaced(d,xy,t,f,sp,fill,center_w=None):
  ws=[d.textlength(c,font=f) for c in t];tot=sum(ws)+sp*(len(t)-1)
  x=(center_w-tot)/2 if center_w else xy[0];y=xy[1]
  for c,w in zip(t,ws): d.text((x,y),c,font=f,fill=fill);x+=w+sp
def make(im,name,out):
  W,H=im.size;im=grad(im,0.22,0.26);d=ImageDraw.Draw(im)
  s=W/1792
  spaced(d,(0,int(95*s)),name,ImageFont.truetype('BodoniModa.ttf',int(190*s)),int(38*s),(250,244,236),W)
  spaced(d,(0,int(330*s)),'FINE JEWELRY',ImageFont.truetype('Manrope.ttf',int(34*s)),int(14*s),(240,228,215),W)
  tl='light you carry';f=ImageFont.truetype('CormorantGaramond.ttf',int(78*s))
  d.text(((W-d.textlength(tl,font=f))/2,H-int(250*s)),tl,font=f,fill=(250,244,236))
  spaced(d,(0,H-int(130*s)),'WARSZAWA  ·  DUBAI',ImageFont.truetype('Manrope.ttf',int(30*s)),int(12*s),(225,210,200),W)
  im.save(out,quality=94)
make(src.copy(),'LUEUR','LUEUR — editorial 3x4.jpg')
sq=src.crop((0,300,1792,2092));make(sq,'LUEUR','LUEUR — карта 1x1.jpg')
