

/*********** heatmap.js [28cffbc911]  ***********/

function __filldata(e,t,n,a,l,r,c,s){function o(e){let t=new Date(y-36e5*($-1-e)*24),n=t.getMonth()+1,a=t.getDate();return`${t.getFullYear()}-${n<10?"0"+n:n}-${a<10?"0"+a:a}`}const i=parseInt(n),h=s&&s.color;var m=s&&s.beginDate
;m&&10!=m.length&&(beginDateArr=m.split("-"),3==beginDateArr.length&&(m=`${beginDateArr[0]}-${beginDateArr[1].padStart(2,"0")}-${beginDateArr[2].padStart(2,"0")}`));var d=window._G_DATA;d||(d={},window._G_DATA=d);const u=function(e){
let t=e.getMonth()+1,n=e.getDate();return`${e.getFullYear()}-${t<10?"0"+t:t}-${n<10?"0"+n:n}`}(new Date);var p=`${t}-12-31`;t&&4==t.length?p=`${t}-12-31`:t&&10==t.length?p=t:t||(p=u),t=p.substring(0,4)
;const f=`${Number(t)-1}${p.substring(4)}`,g=t&&4==t.length?new Date(p):new Date,y=g.getTime(),w=Math.random().toString(16).substring(2);let b=c.split("/");b.pop();const D=b.join("/"),E=(g.getDay()-i+7)%7+1,$=364+E;let _=window._y_queue||[]
;window._y_queue=_,function(){let e=""+g.getFullYear(),t=""+(e-1);function n(e){if(e=""+e,s)return Promise.resolve(s[e]);if(d[e])return d[e];let t="_singleyearFlg"+e,n="_singleyearQueue"+e;if(1==d[t]){let e=d[n];return e||(e=[],d[n]=e),
new Promise((t=>{e.push(t)}))}return d[t]=1,fetch(`${D}/${e}.json`).then((e=>e.json())).then((a=>{d[t]=0,d[e]=a;let l=d[n];return l&&l.length&&(l.forEach((e=>{e(a)})),l.length=0,d[n]=void 0),a})).catch((e=>null))}
(s&&s.allYear?Promise.resolve(s.allYear):d._allYear?d._allYear:1==window._isFetchAllYearData?new Promise((e=>{_.push(e)})):(window._isFetchAllYearData=1,fetch(c).then((e=>e.json())).then((e=>(window._isFetchAllYearData=0,_.length&&(_.forEach((t=>{
t(e)})),_.length=0),d._allYear=e,e))))).then((l=>{let r=l,c=[];r[e]&&c.push(n(e)),r[t]&&c.push(n(t)),Promise.all(c).then((e=>{let t={},n=e[0],l=e[1];for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)){const a=n[e];t["K1-"+e]=a}
for(const e in l)if(Object.prototype.hasOwnProperty.call(l,e)){const n=l[e];t["K2-"+e]=n}!function(e){if(!e)return;let t=document.getElementById(w).childNodes,n={};for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)){const a=e[t]
;Array.isArray(a)&&a.forEach((e=>{if(e.date){let t=n[e.date];t||(t=[],n[e.date]=t),t.push(e)}}))}let l=[];for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&l.push(e);var r=$-1;function c(e){let t=e.length;for(;0!=t;){
let n=Math.floor(Math.random()*t);t--,[e[t],e[n]]=[e[n],e[t]]}}const s=new Array($);let i=$;for(;i-- >0;)s[i]=i;function d(){if(r<0)return;const e=s[r--];let a=o(e),l=n[a],c=!1;f&&(c=a<f);let i=a>u;const d=t[e];if(d.dataset.x=a,
c)d.classList="heatmap-day-cell hm-check-notyet";else if(i)d.classList=parseInt(a.substring(5,7))%2==1?"heatmap-day-cell hm-check-future-b":"heatmap-day-cell hm-check-future-a";else if(m&&a<m&&(!l||0==l.length)){
const e=parseInt(a.substring(5,7))%2==1?"hm-check-future-b":"hm-check-future-a";d.classList=`heatmap-day-cell ${e}`}else{const e=parseInt(a.substring(5,7))%2==1?"hm-check-no-b":"hm-check-no-a"
;if(d.classList=`heatmap-day-cell ${l?l.length>2?"hm-check3":2==l.length?"hm-check2":"hm-check":e}`,l&&l.length){let e=l.find((function(e){return e.color}));d.style.backgroundColor=e?e.color:h+(l.length>2?"ff":l.length>1?"cc":"99")}if(l&&l.length>0){
let e=1==l.length,t=document.createElement("div");if(e){let e=document.createElement("a");e.href=l[0].url?l[0].url:"javascript:void(0);",d.appendChild(e)}t.className="hm-tip";l.forEach((e=>{let n=document.createElement("a");n.className="hm-tiplink",
n.href=e.url||"javascript:void(0);",t.appendChild(n);let l=document.createElement("span");l.className="hm-date",l.innerText=a.substring(5),n.appendChild(l);let r=document.createElement("span");r.className="hm-title",r.innerText=e.title,
n.appendChild(r)})),d.appendChild(t)}}}function p(){let e=a;for((!e||e<=0)&&(e=8);e--;)d();r>=0&&requestAnimationFrame(p)}c(s),requestAnimationFrame(p)}(t)}))}))}(),function(){let t=document.getElementById(e)
;const n=document.createDocumentFragment(),a=document.createElement("div");a.className="heatmap-month",n.appendChild(a);const c=l.split(" ");g.getMonth();let s=E-1,h=[];for(let e=0;e<c.length;e++){let e=document.createElement("span")
;e.className="heatmap-month-cell",a.appendChild(e),h.push(e)}for(let e=0,t=0;e<53&&t<c.length;e++){const n=o(7*e),a=n.substring(5,7),l=n.substring(8,10);if(l<="07"){let n=h[t++];n.innerText=c[Number(a)-1],n.style.gridColumnStart=e+1,
n.style.gridColumnEnd="span 4"}}const m=document.createElement("div");m.className="heatmap-week";const d=r.split(" ");for(let e=0;e<d.length;e++){const t=(e+i)%7;let n=document.createElement("div");n.className="heatmap-week-cell",
n.innerHTML=e%2?`<span>${d[t]}</span>`:"",m.appendChild(n)}n.appendChild(m);const u=document.createElement("div");u.className="heatmap-day",u.id=w;for(let e=0;e<53;e++)for(let t=0;t<7&&!(t>s&&52==e);t++){let e=document.createElement("span")
;e.classList="heatmap-day-cell hm-check-nodata",u.appendChild(e)}n.appendChild(u),t.append(n)}()}
