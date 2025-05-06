

/*********** getPostData.js [8da32e17fc]  ***********/

function hm_getPostData(e,t){e=(""+e).substring(0,4);let r=t.split("/");r.pop();const n=r.join("/");var o=window.__GDATA__;o||(o={},window.__GDATA__=o);let l=window._y_queue||[];function a(e){if(o[e=""+e])return o[e]
;let t="_singleyearFlg"+e,r="_singleyearQueue"+e;if(1==o[t]){let e=o[r];return e||(e=[],o[r]=e),new Promise((t=>{e.push(t)}))}return o[t]=1,fetch(`${n}/${e}.json`).then((e=>e.json())).then((n=>{o[t]=0,o[e]=n;let l=o[r]
;return l&&l.length&&(l.forEach((e=>{e(n)})),l.length=0,o[r]=void 0),n})).then((e=>{if(e)for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)){const r=e[t];Array.isArray(r)&&r.forEach((e=>{const t=e.extra
;if(t)for(const r in t)if(Object.prototype.hasOwnProperty.call(t,r)){const n=t[r];e[r]=n}}))}return e})).catch((e=>null))}return window._y_queue=l,function(){let r=""+e,n=""+(Number(r)-1)
;return(o._allYear?o._allYear:1==window._isFetchAllYearData?new Promise((e=>{l.push(e)})):(window._isFetchAllYearData=1,fetch(t).then((e=>e.json())).then((e=>(window._isFetchAllYearData=0,l.length&&(l.forEach((t=>{t(e)})),l.length=0),o._allYear=e,
e))))).then((e=>{let t=e,o=[];return t[r]&&o.push(a(r)),t[n]&&o.push(a(n)),Promise.all(o).then((e=>{let t={},r=e[0],n=e[1];return r&&r.year&&(t[r.year]=r),n&&n.year&&(t[n.year]=n),Promise.resolve(t)}))}))}()}
