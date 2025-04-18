
(function () {
  var g_id = 100;


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

  /// 2025-01-01 描述，日期格式yyyy-mm-dd，空格后跟上 描述
  function getDataFromSignleLine(str0,gData) {
    let str = str0.trim()
    if (!str) return null

    if(getConfigFromStr(str,gData)) return null


    var arr = str.split(" ")
    var date0 = arr[0]
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
      fillDataObj(dataObj, item)
      if (item) {
        if (item.date >= Recent365YMD) {
          Recent365Count++
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


    if(Recent365Count){
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