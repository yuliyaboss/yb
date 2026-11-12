from PIL import Image
W=Image.open('6e85797a-image.jpg').convert('RGB')
k=1188/1290
def cell(c,r,span=1,label_frac=0.2):
  x=(58+c*296)*k;y=(640+r*296)*k;s=(286*span+10*(span-1))*k
  h=s*(1-label_frac)  # drop label strip
  w=h;x2=x+(s-w)/2
  return W.crop((round(x2),round(y),round(x2+w),round(y+h)))
names={'blogs':(0,0),'app':(1,0),'tv':(2,0),'billboard':(3,0),'porsche':(2,1),'uae_keys':(3,1),
'maldives':(0,2),'uae':(3,2),'vocal':(0,3),'lapland':(3,3),'pilates':(0,4),'checkup':(1,4),'english':(2,4),'body':(3,4),
'house':(0,5),'couple':(1,5),'family':(2,5),'remont':(3,5)}
import os;os.makedirs('cells',exist_ok=True)
for n,(c,r) in names.items(): cell(c,r).save(f'cells/{n}.png')
cell(1,2,2,0.14).save('cells/star.png')
