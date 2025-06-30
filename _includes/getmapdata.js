

/*********** getmapdata.js [764740ab30]  ***********/

!function(){var t=100;function e(t){const e=t.split("-").map(Number);if(3!==e.length)throw new Error(`Invalid date format: ${t}`);const[n,r,l]=e;return new Date(n,r-1,l)}function n(t,e){if(t){const n=t.split("-")
;if(3==n.length)return`${n[0]}-${n[1].padStart(2,"0")}-${n[2].padStart(2,"0")}`;if(2==n.length)return`${e}-${n[0].padStart(2,"0")}-${n[1].padStart(2,"0")}`}return t}function r(t){let e=t.getMonth()+1,n=t.getDate()
;return`${t.getFullYear()}-${e<10?"0"+e:e}-${n<10?"0"+n:n}`}function l(t,i,a){if(!t)return null;let o=t.trim();if(!o)return null;if(i&&function(t,e){if(t&&t.startsWith("#")){let n=t.split(" ");if(n.length>=2){let r=n[0].substring(1)
;if(r)return e[r]=t.substring(r.length+2).trim(),1}}return 0}(o,i))return null;var u=o.split(" "),s=u[0];if(s=s.replace("～","~"),i&&s.indexOf("~")>0){let t=s.split("~"),o=t[0],f=t[1],c=e(n(o,a));if(!c||isNaN(c))return;let d=7;if(f){let t=e(n(f,a))
;t&&!isNaN(t)&&(d=Math.floor((t.getTime()-c.getTime())/864e5)+1)}else d=Math.floor((Date.now()-c.getTime())/864e5)+1,d>7&&(d=7);const g=u.slice(1).join(" ");let p=[];const m=c.getTime();for(let t=0;t<d;t++){
const e=r(new Date(m+864e5*t))+" "+g,n=l(e,i,a);n&&p.push(n)}return p.length?p:null}let f="";if(!s)return null;{let t=s.split("-"),e=0,n=0,r=0;if(a&&2==t.length)e=a,n=t[0],r=t[1];else{if(3!=t.length)return;e=t[0],n=t[1],r=t[2]}
let l=Number(e),i=Number(n),o=Number(n);if(isNaN(l)||isNaN(o)||isNaN(i)||l<1900||l>2100||i<1||i>12||o<1||o>31)return null;f=e+"-"+n.padStart(2,"0")+"-"+r.padStart(2,"0")}if(!f)return null;var c="";let d;if(u.length>1){c=u.slice(1).join(" ")
;const t=/#[0-9a-fA-F]{6}/;let e=t.exec(c);e&&e.length?(d=e[0],c=c.replace(t,"")):d=i&&i.color||"#40c463"}return d=d||i&&i.color||"#40c463",{date:f,title:c,color:d}}function i(t,e){if(!e)return
;let n=e.date.substring(0,4),r=e.date.substring(5,7),l=t.allYear[n];t.allYear[n]=l?l+1:1;let i=t[n];i||(i={},t[n]=i);let a=i[r];a||(a=[],i[r]=a),a.push(e)}function a(e,n){let r={},a={allYear:r
},o=0,u=new Date,s=`${u.getFullYear()-1}-${(u.getMonth()+1).toString().padStart(2,"0")}-${u.getDate().toString().padStart(2,"0")}`,f=null;if(e.split("\n").forEach((function(t,e){if(0==e)return;let n=l(t,a,f);n&&Array.isArray(n)?n.forEach((t=>{i(a,t),
t&&(f=t.date.substring(0,4),t.date>=s&&o++)})):(i(a,n),n&&(f=n.date.substring(0,4),n.date>=s&&o++))})),a.title){let t=document.createElement("div");t.className="custom-map-title",t.innerText=a.title||"",n.parentNode.insertBefore(t,n)}
let c=Object.keys(r).sort().reverse(),d=a.recent,g=!0;g=d?"1"==d:o&&c.length>1,g&&create_heatmap_lv("lmpRecent365"+t++,"",a,"Last 1Y",o,n);for(let e=0;e<c.length;e++){let r=c[e];create_heatmap_lv("lmp"+r+t++,r,a,void 0,void 0,n)}
n.style.display="none"}async function o(){let t=document.querySelectorAll("pre > code");if(t&&0!=t.length&&t.length>0)for(let n=0;n<t.length;n++){const r=t[n];var e=r.textContent;if(!e.startsWith("#mapdata"))return
;a(e,r.parentNode.parentNode.parentNode)}}o(),window._after_dec_fun=function(){let t=document.getElementById("loveiContainer");if(!t){let e=document.getElementById("decryptContent");if(!e)return;t=document.createElement("div"),t.id="loveiContainer",
e.insertBefore(t,e.firstChild)}o()},window._after_enc_fun=function(){document.getElementById("loveiContainer").innerHTML=""}}();
