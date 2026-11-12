const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');const d=fs.readFileSync(path.join(__dirname,'src.jpg')).toString('base64');
const L=448,H=104,ix=50,iy=52,cx=650,cy=1075,ang=54;
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap" rel="stylesheet"><style>
body{margin:0;width:1792px;height:2400px;position:relative;background:url(data:image/jpeg;base64,${d}) no-repeat;font-family:Inter}
.c{position:absolute;left:${cx-ix}px;top:${cy-iy}px;width:${L}px;height:${H}px;transform-origin:${ix}px ${iy}px;transform:rotate(${ang}deg);border-radius:26px;background:rgba(56,48,58,.97);color:#f3e9f2}
.i{position:absolute;left:${ix-30}px;top:${iy-30}px;width:60px;height:60px;border-radius:14px;background:#efdbea;display:flex;align-items:center;justify-content:center;color:#1b1b1f;font-weight:700}
.i span{border:4px solid #1b1b1f;border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:28px}
.t{position:absolute;left:96px;top:20px;font-weight:700;font-size:23px}
.b{position:absolute;left:96px;top:52px;font-weight:500;font-size:20.5px;white-space:nowrap}
.n{position:absolute;right:20px;top:22px;font-size:17px;opacity:.65}
</style></head><body><div class="c"><div class="i"><span>R</span></div><div class="t">Revolut</div><div class="n">teraz</div><div class="b">Wpływ środków: +108 000,00 zł</div></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1792,height:2400}});await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:path.join(__dirname,'out.png')});await b.close();})();
