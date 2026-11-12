const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');const D=__dirname;
const img=k=>'data:image/jpeg;base64,'+fs.readFileSync(path.join(D,'tiles',k+'.jpg')).toString('base64');
const map='data:image/jpeg;base64,'+fs.readFileSync(path.join(D,'Карта 108.jpg')).toString('base64');
const L=n=>Array.from({length:n},()=>'<div class="ln"></div>').join('');
const S=[
 {t:'Реализация',k:[['zen','Блог-магнит · 1 mln'],['app','IT · приложения'],['rabbit','freegen · игрушка']],z:['lueur','LUEUR Maison']},
 {t:'Деньги',k:[['income','Доход 100 000+ zł'],['porsche','Porsche Cayenne'],['house','Дом в Варшаве']],z:['fund','Фонд $1 000 000']},
 {t:'Яркость',k:[['lapland','Лапландия'],['uae','ОАЭ'],['vocal','Вокал']],z:['maldives','Мальдивы']},
 {t:'Я',k:[['pilates','Пилатес'],['checkup','Чекап'],['med','Штиль · энергия']],z:['body','Образ · тело']},
 {t:'Мы',k:[['couple','Мы вдвоём'],['family','Наша семья · и сын'],['remont','Ремонт и уют']],z:['comm','Моё комьюнити']},
];
const page=(inner,cls='')=>`<section class="page ${cls}">${inner}<div class="foot"><span>ПРОТОКОЛ 108 · МОЯ КАРТА</span><span class="pn"></span></div></section>`;
const goal=([k,n])=>`<div class="goal"><img src="${img(k)}"><div class="g"><b>${n}</b>
<div class="r"><span>Делаю</span><i></i></div><div class="r"><span>Открываю возможность</span><i></i></div><div class="r"><span>Проживаю уже сейчас</span><i></i></div><div class="r f"><span>Первый шаг · дата</span><i></i></div></div></div>`;
const sphere=s=>page(`<div class="cap">Сфера</div><h2>${s.t}</h2>
${s.k.map(goal).join('')}
<div class="zc"><img src="${img(s.z[0])}"><div><div class="pill">ЗАЦЕЛЬ</div><b>${s.z[1]}</b><p>Без срока. Это направление: ради чего три цели выше.</p><div class="r"><span>Как она меняет мою жизнь</span><i></i></div><i class="ln2"></i></div></div>`);
const ritual=page(`<div class="cap">Каждое утро · 7 минут · до телефона</div><h2>Кто я сегодня</h2>
<p class="lead">Карта — не картинка на стене. Это пульт. Утром ты не просто просыпаешься: ты включаешь нужную версию себя.</p>
<div class="steps">
<div><em>1 · 1 мин</em><b>Посмотри на карту</b><p>Не на всю. Найди глазами один кадр, который сегодня отзывается. Это кадр дня.</p></div>
<div><em>2 · 2 мин</em><b>Дыхание диафрагмой</b><p>Ладонь на живот. Вдох носом на 4 счёта — живот наружу. Пауза 4. Выдох ртом на 8. Шесть кругов. Длинный выдох включает спокойствие, тело перестаёт сжиматься.</p></div>
<div><em>3 · 1 мин</em><b>Сжимаюсь или расширяюсь?</b><p>Проверь тело: плечи, челюсть, живот. Если сжата — выдохни и отпусти. Решения из сжатия — это решения из страха.</p></div>
<div><em>4 · 2 мин</em><b>Войди в кадр</b><p>Закрой глаза и проживи кадр дня как уже случившийся: запах, ткань, звук, чувство в груди. Не «хочу», а «есть».</p></div>
<div><em>5 · 1 мин</em><b>Один ход</b><p>Спроси: что сегодня сделала бы она, я из кадра? Запиши один ход. Только один.</p></div>
</div>
<div class="say"><span>Фраза входа</span>Я — Julienne. Passion, freedom, aesthetic. Я выбираю расширяться. Сегодня мой ход: ______________</div>`);
const energy=page(`<div class="cap">Энергия → деньги</div><h2>Правила обмена</h2>
<p class="lead">Деньги — это энергия и внимание, вложенные в дело. Энергия либо утекает, либо работает. Задача — закрыть утечки и платить себе.</p>
<div class="two">
<div><h3>Где утекает · закрыть</h3>
<div class="r"><span>Незакрытые обещания</span><i></i></div><div class="r"><span>Хвосты и недоделки</span><i></i></div><div class="r"><span>Чужие драмы, новости</span><i></i></div><div class="r"><span>«Да» вместо «нет»</span><i></i></div><div class="r"><span>Долги и кредиты</span><i></i></div></div>
<div><h3>Компенсация · моё правило</h3><p class="sm">Каждая цель с карты просит энергию. За каждую я заранее решаю, <b>что отдаю взамен</b>: время, внимание, отказ от лишнего, смелость. Нет обмена — нет движения.</p>
<div class="r"><span>Цель</span><i></i></div><div class="r"><span>Отдаю взамен</span><i></i></div><div class="r"><span>Отказываюсь от</span><i></i></div></div></div>
<h3>Поток денег · с каждого прихода</h3>
<div class="flow"><div><b>100%</b>пришло</div><div><b>10%</b>фонд изобилия<br><small>не трогаю</small></div><div><b>10%</b>долги<br><small>сверх платежей</small></div><div class="p"><b>5%</b>долг перед собой<br><small>Miel Bébé ✓</small></div><div><b>75%</b>жизнь и дело</div></div>
<div class="two" style="margin-top:4mm"><div><h3>Железно</h3><p class="sm">Не беру в долг и не даю в долг: лучше подарить. Никаких кредитов и лизингов. Покупаю только за свои.</p></div>
<div><h3>Долг перед собой · следующий</h3>${L(3)}</div></div>
<div class="two"><div><h3>Что меня заряжает</h3>${L(6)}</div><div><h3>Что меня сливает</h3>${L(6)}</div></div>`);
const chakra=page(`<div class="cap">Энергия · тело · деньги</div><h2>Чакры и эгрегоры</h2>
<p class="lead">Деньги застревают там, где застряло чувство. Нашла эмоцию → нашла центр → прожила телом → поток идёт дальше.</p>
<div class="ch">
<div><em>1 · Муладхара · копчик</em><b>Страх</b><p>«Не хватит», «потеряю», выживание. Блок: держусь за то, что есть, боюсь рисковать.</p><small>Отпускаю: ноги в пол, выдох вниз, «я в безопасности, у меня есть опора».</small><div class="r"><span>Мой страх сегодня</span><i></i></div></div>
<div><em>2 · Свадхистана · низ живота</em><b>Вина</b><p>«Не заслужила», стыжусь хотеть, удовольствие = грех. Блок: не беру, не принимаю подарки и деньги.</p><small>Отпускаю: движение бёдрами, вода, «мне можно хотеть и получать».</small><div class="r"><span>За что я себя виню</span><i></i></div></div>
<div><em>3 · Манипура · солнечное</em><b>Стыд</b><p>«Что скажут», боюсь заявить цену и себя. Блок: занижаю ценник, прячусь, не продаю.</p><small>Отпускаю: дыхание диафрагмой, огонь, «я заявляю себя и свою цену».</small><div class="r"><span>Где я прячусь</span><i></i></div></div>
</div>
<h3>Верхние центры · как деньги выходят в мир</h3>
<div class="ch ch4">
<div><em>4 · Анахата · сердце</em><b>Обида</b><p>Закрываюсь, «мне никто не помогает». Отпускаю: прощаю, благодарю, открываю грудь.</p></div>
<div><em>5 · Вишудха · горло</em><b>Молчание</b><p>Не говорю о продукте, не прошу. Отпускаю: звук, вокал, «говорю и продаю вслух».</p></div>
<div><em>6 · Аджна · лоб</em><b>Туман</b><p>Сомнения, нет картинки. Отпускаю: карта, визуализация кадра, одна цель.</p></div>
<div><em>7 · Сахасрара · макушка</em><b>Пустота</b><p>Нет смысла, «зачем всё». Отпускаю: штиль, медитация, служу большему.</p></div>
</div>
<h3>Дневник блока · когда сжимаюсь</h3>
<div class="r"><span>Что случилось</span><i></i></div><div class="r"><span>Чувство · где в теле</span><i></i></div><div class="r"><span>Центр · что делаю</span><i></i></div><div class="r"><span>После · что изменилось</span><i></i></div>
<div class="two" style="margin-top:1mm"><div><h3>Эгрегоры · моя система</h3><p class="sm">Эгрегор — общее поле людей с одной идеей. Он кормит того, кто кормит его. Я выбираю, в какие поля вкладываю внимание, и выхожу из тех, что сливают.</p>
<div class="r"><span>Питают · вкладываю</span><i></i></div><div class="r"><span>Сливают · выхожу</span><i></i></div></div>
<div><h3>Мои поля</h3><p class="sm"><b>Денег:</b> обмен, честный ценник, «не беру и не даю в долг». <b>Рода:</b> благодарность, «беру силу, оставляю тяжесть». <b>Дела:</b> блог, LUEUR, freegen, IT. <b>Смелых женщин:</b> моё комьюнити.</p></div></div>
<div class="say"><span>Проверка перед решением</span>Это решение из страха, вины или стыда? Если да — сначала прожить телом, потом решать.</div>`);
const html=`<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800&family=Manrope:wght@400;600;700&family=Playfair+Display:ital@1&display=swap" rel="stylesheet"><style>
@page{size:A4;margin:0}*{box-sizing:border-box;margin:0;padding:0}
body{counter-reset:pg;font-family:Manrope;color:#14081F;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:14mm 15mm 10mm;display:flex;flex-direction:column;page-break-after:always;counter-increment:pg;position:relative;background:#fff;overflow:hidden}
.page:before{content:'';position:absolute;left:0;top:0;width:100%;height:2mm;background:linear-gradient(90deg,#FF2D95,#7B2CFF)}
.mapp{padding:0;background:#14081F}.mapp:before{display:none}.mapp img{width:100%;height:100%;object-fit:contain}.mapp .foot{display:none}
.cap{font-size:7pt;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#FF2D95}
h2{font-family:Unbounded;font-weight:800;font-size:22pt;margin:1mm 0 3mm}
h3{font-family:Unbounded;font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase;margin:4mm 0 2mm}
.lead{font-family:'Playfair Display';font-style:italic;font-size:12pt;color:#3a2f44;margin-bottom:4mm;max-width:170mm}
.goal{flex:1;display:grid;grid-template-columns:52mm 1fr;align-items:center;gap:5mm;padding:3mm 0;border-top:.4mm solid #14081F}
.goal img{width:52mm;height:52mm;object-fit:cover;border-radius:3mm}
.g b{font-family:Unbounded;font-size:10.5pt;display:block;margin-bottom:1.5mm}
.r{display:grid;grid-template-columns:40mm 1fr;align-items:end;gap:2mm;height:9.5mm}
.r span{font-size:6.6pt;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8f8698;padding-bottom:1mm}
.r i{display:block;border-bottom:.3mm solid #e2dbe7;height:100%}
.r.f span{color:#FF2D95}
.zc{margin-top:3mm;display:grid;grid-template-columns:44mm 1fr;gap:5mm;border:.6mm solid #FF2D95;border-radius:4mm;padding:3mm}
.zc img{width:44mm;height:44mm;object-fit:cover;border-radius:3mm}
.zc b{font-family:Unbounded;font-size:11pt;display:block;margin:1.5mm 0}.zc p{font-size:8pt;color:#8f8698}
.ln2{display:block;border-bottom:.3mm solid #e2dbe7;height:8mm}
.pill{display:inline-block;background:#FF2D95;color:#fff;font-size:6.5pt;font-weight:700;letter-spacing:.15em;border-radius:9mm;padding:.8mm 3mm}
.steps{display:flex;flex-direction:column;gap:3mm;flex:1}
.steps div{flex:1;display:flex;flex-direction:column;justify-content:center;border-left:1.2mm solid #FF2D95;padding:2mm 0 2mm 5mm;background:#FFF4FA;border-radius:0 3mm 3mm 0}
.steps em{font-style:normal;font-size:6.8pt;font-weight:700;letter-spacing:.2em;color:#FF2D95}
.steps b{font-family:Unbounded;font-size:12pt;display:block;margin:1.5mm 0}.steps p{font-size:10pt;line-height:1.45}
.say{margin-top:4mm;background:#14081F;color:#fff;border-radius:4mm;padding:5mm;font-family:'Playfair Display';font-style:italic;font-size:12pt;line-height:1.5}
.say span{display:block;font-family:Manrope;font-style:normal;font-size:6.8pt;letter-spacing:.25em;text-transform:uppercase;color:#FF2D95;margin-bottom:1mm}
.two{display:grid;grid-template-columns:1fr 1fr;gap:7mm}.sm{font-size:8.6pt;line-height:1.45;margin-bottom:2mm}
.flow{display:grid;grid-template-columns:repeat(5,1fr);gap:2mm}.flow div{background:#F3EEF6;border-radius:3mm;padding:3mm;font-size:8pt;font-weight:600;min-height:24mm}
.flow div:first-child{background:#14081F;color:#fff}.flow .p{background:#FF2D95;color:#fff}.flow b{font-family:Unbounded;font-size:13pt;display:block}.flow small{font-weight:400;opacity:.8}
.ch{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}.ch>div{background:#FFF4FA;border-top:1.2mm solid #FF2D95;border-radius:0 0 3mm 3mm;padding:3mm}.ch em{font-style:normal;font-size:6.2pt;font-weight:700;letter-spacing:.12em;color:#FF2D95;text-transform:uppercase}.ch b{font-family:Unbounded;font-size:13pt;display:block;margin:1.5mm 0}.ch p{font-size:8.4pt;line-height:1.4;margin-bottom:2mm}.ch small{display:block;font-size:7.8pt;color:#5a4d66;font-style:italic;margin-bottom:1mm}.ch .r{grid-template-columns:1fr}.ch .r span{padding:0}.ch4{grid-template-columns:repeat(4,1fr)}.ch4 b{font-size:10.5pt}.ch4 p{font-size:7.8pt}.ch4 em{font-size:5.6pt;letter-spacing:.08em}
.ln{border-bottom:.3mm solid #e2dbe7;height:8mm}
.foot{margin-top:auto;padding-top:4mm;display:flex;justify-content:space-between;font-size:6.4pt;font-weight:700;letter-spacing:.24em;color:#8f8698}.pn:before{content:counter(pg,decimal-leading-zero)}
</style></head><body>
<section class="page mapp"><img src="${map}"></section>
${ritual}${energy}${chakra}${S.map(sphere).join('')}
</body></html>`;
(async()=>{fs.writeFileSync(path.join(D,'insert.html'),html);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+path.join(D,'insert.html'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const over=await p.evaluate(()=>[...document.querySelectorAll('.page')].map((pg,i)=>{const r=pg.getBoundingClientRect();const bt=Math.max(...[...pg.querySelectorAll('*')].map(e=>e.getBoundingClientRect().bottom));return bt>r.bottom+1?i+1:null}).filter(Boolean));
console.log('overflow pages',over);
await p.pdf({path:path.join(D,'Протокол 108 — моя карта (вкладыш).pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
await p.setViewportSize({width:794,height:1123});const ps=await p.$$('.page');for(const i of [1,2,3,4])await ps[i].screenshot({path:path.join(D,'ins-'+i+'.png')});await b.close();})();
