!function(){var t=100;function e(t){const e=t.split("-").map(Number);if(3!==e.length)throw new Error(`Invalid date format: ${t}`);const[n,r,l]=e;return new Date(n,r-1,l)}function n(t){if(t){
const e=t.split("-");return`${e[0]}-${e[1].padStart(2,"0")}-${e[2].padStart(2,"0")}`}return t}function r(t){let e=t.getMonth()+1,n=t.getDate()
;return`${t.getFullYear()}-${e<10?"0"+e:e}-${n<10?"0"+n:n}`}function l(t,i){if(!t)return null;let a=t.trim();if(!a)return null;if(i&&function(t,e){if(t&&t.startsWith("#")){let n=t.split(" ")
;if(n.length>=2){let r=n[0].substring(1);if(r)return e[r]=t.substring(r.length+2).trim(),1}}return 0}(a,i))return null;var o=a.split(" "),u=o[0];if(u=u.replace("～","~"),i&&u.indexOf("~")>0){
let t=u.split("~"),i=t[0],a=t[1],f=e(n(i));if(!f||isNaN(f))return;let s=7;if(a){let t=e(n(a));t&&!isNaN(t)&&(s=Math.floor((t.getTime()-f.getTime())/864e5)+1)
}else s=Math.floor((Date.now()-f.getTime())/864e5)+1,s>7&&(s=7);const c=o.slice(1).join(" ");let d=[];const g=f.getTime();for(let t=0;t<s;t++){const e=l(r(new Date(g+864e5*t))+" "+c);e&&d.push(e)}
return d.length?d:null}let f="";if(!u)return null;{let t=u.split("-");if(3==t.length){let e=t[0],n=t[1],r=t[2],l=Number(e),i=Number(n),a=Number(n)
;if(isNaN(l)||isNaN(a)||isNaN(i)||l<1900||l>2100||i<1||i>12||a<1||a>31)return null;f=e+"-"+n.padStart(2,"0")+"-"+r.padStart(2,"0")}}if(!f)return null;var s="";let c;if(o.length>1){
s=o.slice(1).join(" ");const t=/#[0-9a-fA-F]{6}/;let e=t.exec(s);e&&e.length&&(c=e[0],s=s.replace(t,""))}return{date:f,title:s,color:c}}function i(t,e){if(!e)return
;let n=e.date.substring(0,4),r=e.date.substring(5,7),l=t.allYear[n];t.allYear[n]=l?l+1:1;let i=t[n];i||(i={},t[n]=i);let a=i[r];a||(a=[],i[r]=a),a.push(e)}function a(e,n){let r={},a={allYear:r
},o=0,u=new Date,f=`${u.getFullYear()-1}-${(u.getMonth()+1).toString().padStart(2,"0")}-${u.getDate().toString().padStart(2,"0")}`;if(e.split("\n").forEach((function(t,e){if(0==e)return;let n=l(t,a)
;n&&Array.isArray(n)?n.forEach((t=>{i(a,t),t&&t.date>=f&&o++})):(i(a,n),n&&n.date>=f&&o++)})),a.title){let t=document.createElement("div");t.className="custom-map-title",t.innerText=a.title||"",
n.parentNode.insertBefore(t,n)}let s=Object.keys(r).sort().reverse(),c=a.recent,d=!0;d=c?"1"==c:o&&s.length>1,d&&create_heatmap_lv("lmpRecent365"+t++,"",a,"Last 1Y",o,n);for(let e=0;e<s.length;e++){
let r=s[e];create_heatmap_lv("lmp"+r+t++,r,a,void 0,void 0,n)}n.style.display="none"}async function o(){let t=document.querySelectorAll("pre > code")
;if(t&&0!=t.length&&t.length>0)for(let n=0;n<t.length;n++){const r=t[n];var e=r.textContent;if(!e.startsWith("#mapdata"))return;a(e,r.parentNode.parentNode.parentNode)}}o(),
window._after_dec_fun=function(){let t=document.getElementById("loveiContainer");if(!t){let e=document.getElementById("decryptContent");if(!e)return;t=document.createElement("div"),
t.id="loveiContainer",e.insertBefore(t,e.firstChild)}o()},window._after_enc_fun=function(){document.getElementById("loveiContainer").innerHTML=""}}();