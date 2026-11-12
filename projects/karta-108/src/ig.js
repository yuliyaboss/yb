const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');
const av=fs.readFileSync('7adc2e94-image.jpg').toString('base64');
const heart='<svg viewBox="0 0 24 24" width="30" height="30"><path fill="#fff" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 4.2 2.3h2c.6-1.2 2.1-2.3 4.2-2.3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>';
const com='<svg viewBox="0 0 24 24" width="30" height="30"><path fill="#fff" d="M12 2.5C6.5 2.5 2 6.4 2 11.3c0 2.3 1 4.4 2.7 6L4 21.5l4.4-1.8c1.1.4 2.3.6 3.6.6 5.5 0 10-3.9 10-8.9S17.5 2.5 12 2.5z"/></svg>';
const usr='<svg viewBox="0 0 24 24" width="30" height="30"><circle cx="12" cy="7.5" r="4.5" fill="#fff"/><path fill="#fff" d="M3 21c0-4.6 4-7.5 9-7.5s9 2.9 9 7.5z"/></svg>';
const T=[1,2,3].map(i=>fs.readFileSync(path.join(__dirname,'t'+i+'.jpg')).toString('base64'));
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>
body{margin:0;width:1200px;height:1200px;background:#fff;font-family:Inter,system-ui;color:#000;position:relative;overflow:hidden}
.bar{display:flex;align-items:center;justify-content:space-between;padding:50px 60px 0}
.plus{font-size:80px;font-weight:300}
.nick{font-size:58px;font-weight:700;display:flex;align-items:center;gap:14px}
.nick i{width:16px;height:16px;border-radius:50%;background:#ff3040;display:inline-block}
.ic{display:flex;gap:44px;align-items:center}
.th{width:70px;height:70px;border:7px solid #000;border-radius:50%;position:relative}
.th b{position:absolute;top:-16px;right:-16px;width:36px;height:36px;border-radius:50%;background:#ff3040;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center}
.ham{width:66px;display:flex;flex-direction:column;gap:13px}.ham s{height:7px;background:#000;border-radius:4px;display:block}
.bub{position:absolute;right:90px;top:180px;display:flex;gap:30px;background:#ff3040;color:#fff;font-weight:600;font-size:38px;padding:18px 32px;border-radius:26px}
.bub span{display:flex;align-items:center;gap:10px}
.bub:before{content:'';position:absolute;top:-18px;right:168px;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:20px solid #ff3040}
.row{display:flex;align-items:center;gap:70px;padding:70px 60px 0}
.av{width:250px;height:250px;border-radius:50%;padding:9px;background:linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7);flex:none}
.av div{width:100%;height:100%;border-radius:50%;border:9px solid #fff;box-sizing:border-box;background:url(data:image/jpeg;base64,${av}) 55% 30%/cover}
.stats{display:flex;gap:60px}
.stats div{text-align:left}.stats b{display:block;font-size:56px;font-weight:700}.stats span{font-size:36px}
.name{padding:22px 60px 0;font-size:40px;font-weight:600}
.bio{padding:8px 60px 0;font-size:36px;line-height:1.35;color:#222}
.tabs{display:flex;justify-content:space-around;margin-top:26px;border-top:1px solid #ddd}.tabs span{flex:1;text-align:center;padding:18px 0;font-size:34px;color:#999}.tabs span:first-child{color:#000;border-bottom:3px solid #000}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.grid div{aspect-ratio:1;background-size:cover;background-position:center}.btns{display:flex;gap:16px;padding:40px 60px 0}.btns div{flex:1;background:#efefef;border-radius:20px;text-align:center;font-weight:600;font-size:34px;padding:20px 0}
</style></head><body>
<div class="bar"><span class="plus">+</span><span class="nick">zen.julienne <svg width="40" height="40" viewBox="0 0 24 24"><path d="M5 9l7 7 7-7" stroke="#000" stroke-width="3" fill="none"/></svg><i></i></span>
<span class="ic"><span class="th"><b>1</b></span><span class="ham"><s></s><s></s><s></s></span></span></div>
<div class="bub"><span>${heart}100</span><span>${com}100</span><span>${usr}100</span></div>
<div class="row"><div class="av"><div></div></div>
<div class="stats"><div><b>200</b><span>posty</span></div><div><b>1 mln</b><span>obserwujący</span></div><div><b>1391</b><span>obserwowani</span></div></div></div>
<div class="name">Julienne Bosqo</div>
<div class="tabs"><span>▦</span><span>▷</span><span>☺</span></div><div class="grid">${T.map(t=>`<div style="background-image:url(data:image/jpeg;base64,${t})"></div>`).join('')}</div>
</body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1200}});await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(__dirname,'zen grid.png')});await b.close();})();
