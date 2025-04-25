function _InitEnc(
  preFix,
  contentEnc,
  keyData,
  TestData,
  forbid_cache_password
) {
  function uint8ArrayToHex(uint8Array) {
    return Array.from(uint8Array)
      .map((byte) => byte.toString(16).padStart(2, "0")) // 转换每个字节为2位16进制
      .join(""); // 连接成字符串
  }

  !(function () {
    const substl = crypto.subtle;

    const encid = preFix;
    const encryptedContent = contentEnc;
    const base64str = encryptedContent.substring(3);
    const bfMsg = base64js.decode(base64str);
    const bfIv = bfMsg.subarray(0, 12);
    const bfCipher = bfMsg.subarray(12);

    async function genKey(psw) {
      var keyRaw = new TextEncoder().encode(psw);
      var key = await substl.importKey("raw", keyRaw, "PBKDF2", false, [
        "deriveBits",
      ]);
      const salt = "this is a salt string 20221019";
      let pbkdf2 = {
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: 12345,
        salt: new TextEncoder().encode(salt),
      };
      return await substl.deriveBits(pbkdf2, key, 256);
    }

    async function decryptRaw(bf, key, outV) {
      if (bf.length < 8) {
        if (outV) {
          outV.count = bf.length;
        }
        throw "err";
      }
      let count = 0;
      for (let i = 0; i < 4; i++) {
        count |= (bf[i] ^ bf[i + 4] ^ i) << ((3 - i) * 8);
      }

      if (outV) {
        outV.count = count;
      }
      if (bf.length < count) {
        return;
      }

      let bfIv = bf.slice(4, 20);
      let bfCipher = bf.slice(20, count);

      var aeskey = {
        name: "AES-CTR",
      };
      var keyObj = await substl.importKey("raw", key, aeskey, false, [
        "decrypt",
      ]);
      var aesDec = { name: "AES-CTR", counter: bfIv, length: 64 };
      try {
        let bfDec = await substl.decrypt(aesDec, keyObj, bfCipher);
        return new Uint8Array(bfDec);
      } catch (error) {
        throw error;
      }
    }

    async function decryptBase64Msg(msg64, key) {
      const base64str = msg64;
      const bfMsg = base64js.decode(base64str);
      return await decryptRaw(bfMsg, key);
    }
    async function checkKey(key) {
      const arrTest = TestData.split(".");
      const testData = arrTest[0];
      const testDataEnc = arrTest[1];
      const bfTestData = base64js.decode(testDataEnc);

      const bfKeyData = base64js.decode(keyData);
      let keyBf = null;
      let C = 0;
      let sum = 0;
      while (C++ < 400) {
        if (sum >= bfKeyData.length) {
          break;
        }
        let bfSub = bfKeyData.slice(sum);

        try {
          let outV = { count: 0 };
          let d = await decryptRaw(bfSub, key, outV);

          sum += outV.count;
          if (d) {
            let dec = await decryptRaw(bfTestData, d);
            let s = new TextDecoder().decode(dec);
            if (s == testData) {
              keyBf = d;
              break;
            }
          } else {
          }
        } catch (error) {}
      }

      return keyBf;
    }

    async function decrypt(key0, isCached) {
      // const key = Uint8Array([...]); // 32 bytes key
      var key = "";
      if (isCached) {
        key = readKey();
      } else {
        var keyS = preFix + key0 + preFix;
        key = await genKey(keyS);
      }
      if (key.length == 0) {
        return;
      }
      try {
        let keyBf = await checkKey(key);
        if (!keyBf) {
          throw "error psw";
        }
        var bfDec = await decryptBase64Msg(contentEnc, keyBf);
        var plain = new TextDecoder().decode(bfDec);
        setKey(key);
        document.getElementById("encrypted").style.display = "none";
        // / show decrypted

        document.getElementById("decrypted").style.display = "block";
        document.getElementById("decryptContent").innerHTML = plain;

        const DECFUN = window["_after_dec_fun"];

        if (DECFUN && typeof DECFUN == "function") {
          DECFUN();
        }
        setTimeout(function () {
          var loadevent = document.createEvent("Event");
          loadevent.initEvent("load", true, true);

          var DOMContentLoaded_event = document.createEvent("Event");
          DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);

          window.dispatchEvent(loadevent);
          window.dispatchEvent(DOMContentLoaded_event);
        }, 100);
      } catch (error) {
        console.log(error);
        // alert("wrong password.")
        document.getElementById("passwordinput").classList.add("errPsw");
        setTimeout(() => {
          document.getElementById("passwordinput").classList.remove("errPsw");
        }, 500);
      }
    }

    document.getElementById("DecryptBtn").onclick = function () {
      var key = document.getElementById("passwordinput").value;
      decrypt(key);
    };

    document.getElementById("EncryptBtn").onclick = function () {
      /// hide input
      document.getElementById("encrypted").style.display = "block";
      // / show decrypted
      document.getElementById("decrypted").style.display = "none";
      document.getElementById("decryptContent").innerHTML = ":)";

      clearKey();

      const ENCFUN = window["_after_enc_fun"];
      if (ENCFUN && typeof ENCFUN == "function") {
        ENCFUN();
      }
    };

    document.getElementById("ClearBtn1").onclick = function () {
      localStorage.clear();
      document.getElementById("passwordinput").value = "";
    };
    document.getElementById("ClearBtn2").onclick = function () {
      localStorage.clear();
    };

    function readKey0() {}
    function setKey0(value) {}
    function clearKey0() {}

    function readKey1() {
      var key = encid;
      var v = localStorage.getItem(key);
      if (v) {
        return base64js.decode(v);
      } else {
        return null;
      }
    }
    function setKey1(value) {
      var key = encid;
      var arr = new Uint8Array(value);
      var b64 = base64js.encode(arr);
      return localStorage.setItem(key, b64);
    }
    function clearKey1() {
      var key = encid;
      localStorage.removeItem(key);
    }

    const readKey = forbid_cache_password ? readKey0 : readKey1;
    const setKey = forbid_cache_password ? setKey0 : setKey1;
    const clearKey = forbid_cache_password ? clearKey0 : clearKey1;

    var cachekey = readKey();
    if (cachekey) {
      decrypt(cachekey, true);
    }
  })();
}
