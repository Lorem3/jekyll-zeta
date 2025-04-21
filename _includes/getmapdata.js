
(function () {
  var g_id = 100;

  function ymd2Date(ymd) {
    const parts = ymd.split('-').map(Number);
    if (parts.length !== 3) {
      throw new Error(`Invalid date format: ${ymd}`);
    }
    const [year, month, day] = parts;
    return new Date(year, month - 1, day); // month 从 0 开始
  };

  function normalizeYmd(ymd){
    if (ymd) {
      const arr = ymd.split('-')
      return `${arr[0]}-${arr[1].padStart(2,'0')}-${arr[2].padStart(2,'0')}`
    }

    return ymd
  }


  function getConfigFromStr(str,obj){
    if (str && str.startsWith('#')) {
      // #color #121212
      // #title 123
      let arr = str.split(' ')
      if(arr.length >= 2){
        let key = arr[0].substring(1)
        if(key ){
          obj[key] = str.substring(key.length + 2).trim()
          return 1
        }
      }
    }
    return 0
  }



  function date2ymd(t) {
    let m = t.getMonth() + 1;
    let d = t.getDate();
    return `${t.getFullYear()}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }
  /// 2025-01-01 描述，日期格式yyyy-mm-dd，空格后跟上 描述
  function getDataFromSignleLine(str0,gData) {
    if(!str0) return null
    let str = str0.trim()
    if (!str) return null

    if(gData && getConfigFromStr(str,gData)) return null


    var arr = str.split(" ")
    var date0 = arr[0]
    date0 = date0.replace('～','~')
    if (gData && date0.indexOf("~") > 0) {
      let arrRg = date0.split('~')
      let beginYmd = arrRg[0]
      let endYmd = arrRg[1]
      let dateBegin = ymd2Date(normalizeYmd(beginYmd))
      if (!dateBegin || isNaN(dateBegin)) {
        
        return
      }
      let rangCount = 7
      if(endYmd){
         let dend = ymd2Date(normalizeYmd(endYmd))
         if (dend && !isNaN(dend)) {
          rangCount = Math.floor((dend.getTime() - dateBegin.getTime())/ 86400000) + 1
         }
         
      }else{
        rangCount =  Math.floor((Date.now() - dateBegin.getTime())/ 86400000) + 1;
        if(rangCount > 7) rangCount =7
      }
 
      const desc = arr.slice(1).join(' ')
      
      let resultArr = []
      const timeStampBegin =  dateBegin.getTime()
      for (let i  = 0; i  < rangCount; i ++) {
        const ymd = date2ymd(new Date(timeStampBegin + i * 86400000))
        const newStr = ymd + ' ' + desc
        const newEle = getDataFromSignleLine(newStr)
        if(newEle){
          resultArr.push(newEle)
        }
      }
      return resultArr.length ? resultArr : null

    }



    let date = ''
    if (date0) {
      let ymd = date0.split("-")
      if (ymd.length == 3) {
        let year = ymd[0]
        let month = ymd[1]
        let day = ymd[2]

        let nY = Number(year)
        let nM = Number(month)
        let nD = Number(month)
        if (isNaN(nY) || isNaN(nD) || isNaN(nM) || nY < 1900 || nY > 2100 || nM < 1 || nM > 12 || nD < 1 || nD > 31) {
          return null
        }
        date = year + "-" + month.padStart(2, '0') + "-" + day.padStart(2, '0')
      }
    }
    else {
      return null
    }

    if (!date) {
      return null
    }
    var title = ""
    let color = undefined
    if (arr.length > 1) {
      title = arr.slice(1).join(" ")

      const regColor = /#[0-9a-fA-F]{6}/
      let colorScaned = regColor.exec(title)
      if (colorScaned && colorScaned.length) {
        color = colorScaned[0]
        title = title.replace(regColor,'')
      }

    }
    return { date: date, title: title ,color}
  }

  function fillDataObj(data, item) {
    if (!item) return
    let y = item.date.substring(0, 4);
    let m = item.date.substring(5, 7);
    let c = data.allYear[y];
    data.allYear[y] = c ? c + 1 : 1;

    let yObj = data[y]
    if (!yObj) {
      yObj = {}
      data[y] = yObj;
    }

    let arr = yObj[m]
    if (!arr) {
      arr = []
      yObj[m] = arr
    }
    arr.push(item)

  }


  async function wait (t ) {
    return new Promise(function(r){
      setTimeout(() => {
         r()
      }, t );
    })
  }
  
  function parseDataAndCeateMap(strData,node) {
   

    let allYear = {}
    let dataObj = { allYear: allYear };
 
    let Recent365Count = 0;
    let nowDate = new Date
    let Recent365YMD = `${nowDate.getFullYear() - 1}-${(nowDate.getMonth() + 1).toString().padStart(2, '0')}-${nowDate.getDate().toString().padStart(2, '0')}`
 

    strData.split("\n").forEach(function (str,idx) {
      if(idx == 0) return 
      let item = getDataFromSignleLine(str,dataObj)
      if (item && Array.isArray(item)) {
        item.forEach(e=>{
          fillDataObj(dataObj, e)
          if (e) {
            if (e.date >= Recent365YMD) {
              Recent365Count++
            }
          }
        })
      }else{
        fillDataObj(dataObj, item)
        if (item) {
          if (item.date >= Recent365YMD) {
            Recent365Count++
          }
        }
      }
      
    })


    if (dataObj.title ) {


      let divTitle = document.createElement('div')
      divTitle.className = 'custom-map-title'  
      divTitle.innerText = dataObj.title || ''

      let codeHolder = node.parentNode
      codeHolder.insertBefore(divTitle,node)
      
    }
    

    let allYearArr = Object.keys(allYear).sort().reverse()


    let RCT = dataObj['recent'];
    let showRct = true
    if (!RCT) {
      showRct = Recent365Count && allYearArr.length > 1
    }else{
      showRct = RCT == '1'
    }
    if(showRct){
      create_heatmap('lmpRecent365' + g_id ++, '', dataObj, "Last 1Y", Recent365Count,node)
    }
    
    for (let i = 0; i < allYearArr.length; i++) {
      let y = allYearArr[i]
      create_heatmap('lmp' + y + g_id ++ , y, dataObj,undefined,undefined,node)
    }

    node.style.display = 'none'

  

  };

  async function initData(){
    let arrCodes = document.querySelectorAll('pre > code')
    if (!arrCodes || arrCodes.length == 0) return

    if (arrCodes.length > 0) {
      for (let i  = 0; i  < arrCodes.length; i ++) {
        const code = arrCodes[i ];
        var strAll = code.textContent
        if (!strAll.startsWith("#mapdata")) {
          return 
        }

        parseDataAndCeateMap(strAll,code.parentNode.parentNode.parentNode)
 
        
      }
   
    }
  }

  initData()

  window['_after_dec_fun'] = function () {
    let con = document.getElementById('loveiContainer')
    if (!con) {
      let decryptContent = document.getElementById('decryptContent')
      if (!decryptContent) return
      con = document.createElement('div')
      con.id = 'loveiContainer'
      decryptContent.insertBefore(con, decryptContent.firstChild)

    }

    initData()
  }
  window['_after_enc_fun'] = function () {
    document.getElementById('loveiContainer').innerHTML = ''
  }
})();