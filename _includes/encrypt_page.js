function _InitEnc(e,t,n,c,o){!function(){const a=crypto.subtle,r=e,i=t.substring(3),d=base64js.decode(i);d.subarray(0,12),d.subarray(12);async function l(e,t,n){
if(e.length<8)throw n&&(n.count=e.length),"err";let c=0;for(let t=0;t<4;t++)c|=(e[t]^e[t+4]^t)<<8*(3-t);if(n&&(n.count=c),e.length<c)return;let o=e.slice(4,20),r=e.slice(20,c)
;var i=await a.importKey("raw",t,{name:"AES-CTR"},!1,["decrypt"]),d={name:"AES-CTR",counter:o,length:64};try{let e=await a.decrypt(d,i,r);return new Uint8Array(e)}catch(e){throw e}}
async function s(o,r){var i="";if(r)i=u();else{var d=e+o+e;i=await async function(e){var t=(new TextEncoder).encode(e),n=await a.importKey("raw",t,"PBKDF2",!1,["deriveBits"]);let c={name:"PBKDF2",
hash:"SHA-256",iterations:12345,salt:(new TextEncoder).encode("this is a salt string 20221019")};return await a.deriveBits(c,n,256)}(d)}if(0!=i.length)try{let e=await async function(e){
const t=c.split("."),o=t[0],a=t[1],r=base64js.decode(a),i=base64js.decode(n);let d=null,s=0,u=0;for(;s++<400&&!(u>=i.length);){let t=i.slice(u);try{let n={count:0},c=await l(t,e,n);if(u+=n.count,c){
let e=await l(r,c);if((new TextDecoder).decode(e)==o){d=c;break}}}catch(e){}}return d}(i);if(!e)throw"error psw";var s=await async function(e,t){const n=e,c=base64js.decode(n);return await l(c,t)
}(t,e),m=(new TextDecoder).decode(s);y(i),document.getElementById("encrypted").style.display="none",document.getElementById("decrypted").style.display="block",
document.getElementById("decryptContent").innerHTML=m;const o=window._after_dec_fun;o&&"function"==typeof o&&o(),setTimeout((function(){var e=document.createEvent("Event");e.initEvent("load",!0,!0)
;var t=document.createEvent("Event");t.initEvent("DOMContentLoaded",!0,!0),window.dispatchEvent(e),window.dispatchEvent(t)}),100)}catch(e){
document.getElementById("passwordinput").classList.add("errPsw"),setTimeout((()=>{document.getElementById("passwordinput").classList.remove("errPsw")}),500)}}
document.getElementById("DecryptBtn").onclick=function(){s(document.getElementById("passwordinput").value)},document.getElementById("EncryptBtn").onclick=function(){
document.getElementById("encrypted").style.display="block",document.getElementById("decrypted").style.display="none",document.getElementById("decryptContent").innerHTML=":)",m()
;const e=window._after_enc_fun;e&&"function"==typeof e&&e()},document.getElementById("ClearBtn1").onclick=function(){localStorage.clear(),document.getElementById("passwordinput").value=""},
document.getElementById("ClearBtn2").onclick=function(){localStorage.clear()};const u=o?function(){}:function(){var e=r,t=localStorage.getItem(e);return t?base64js.decode(t):null
},y=o?function(e){}:function(e){var t=r,n=new Uint8Array(e),c=base64js.encode(n);return localStorage.setItem(t,c)},m=o?function(){}:function(){var e=r;localStorage.removeItem(e)};var w=u();w&&s(w,!0)
}()}