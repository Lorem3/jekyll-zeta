


/*********** getPostData.js ***********/

function hm_getPostData(e,t){e=(""+e).substring(0,4);let n=t.split("/");n.pop();const r=n.join("/");var l=window.__GDATA__;l||(l={},window.__GDATA__);let a=window._y_queue||[];function i(e){if(l[e=""+e])return l[e]
;let t="_singleyearFlg"+e,n="_singleyearQueue"+e;if(1==l[t]){let e=l[n];return e||(e=[],l[n]=e),new Promise((t=>{e.push(t)}))}return l[t]=1,fetch(`${r}/${e}.json`).then((e=>e.json())).then((r=>{l[t]=0,l[e]=r;let a=l[n]
;return a&&a.length&&(a.forEach((e=>{e(r)})),a.length=0,l[n]=void 0),r})).catch((e=>null))}return window._y_queue=a,function(){let n=""+e,r=""+(Number(n)-1);return(l._allYear?l._allYear:1==window._isFetchAllYearData?new Promise((e=>{a.push(e)
})):(window._isFetchAllYearData=1,fetch(t).then((e=>e.json())).then((e=>(window._isFetchAllYearData=0,a.length&&(a.forEach((t=>{t(e)})),a.length=0),l._allYear=e,e))))).then((e=>{let t=e,l=[];return t[n]&&l.push(i(n)),t[r]&&l.push(i(r)),
Promise.all(l).then((e=>{let t={},n=e[0],r=e[1];return n&&n.year&&(t[n.year]=n),r&&r.year&&(t[r.year]=r),Promise.resolve(t)}))}))}()}


