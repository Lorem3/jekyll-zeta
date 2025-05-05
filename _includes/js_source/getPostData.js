;function hm_getPostData( endYear ,_allyearurl) {
  endYear = ('' + endYear).substring(0,4)

  let arr = _allyearurl.split("/");
  arr.pop();
  const jsonUrlBase = arr.join("/");

  var GDATA = window['__GDATA__'] 
  if (!GDATA) {
    GDATA = {}
    window['__GDATA__'] 
  }


  let queue  = window._y_queue || []
  window._y_queue = queue;

 
  function getAllYearCfg(){
 
    
    if (GDATA['_allYear']) {
      return GDATA['_allYear'];
    }

    if (window._isFetchAllYearData == 1) {
      return new Promise(r=>{
        queue.push(r);
      })
    }

    
    window._isFetchAllYearData = 1;
    return fetch(_allyearurl)
      .then((r) => r.json())
      .then(d => { 
        window._isFetchAllYearData = 0;
        if (queue.length) {
          queue.forEach(calback=>{calback(d)});
          queue.length = 0;
        }
        GDATA['_allYear'] = d ;return d ;})
  }

  function getYearData(year) {
    year = '' + year

    if(GDATA[year]){
      return GDATA[year]
    }

    let queueFlgKey = '_singleyearFlg' + year
    let queueArrKey = '_singleyearQueue' + year
    if (GDATA[queueFlgKey] == 1) {
      // console.log('put in queue',year,Math.random())
      let arrQueue = GDATA[queueArrKey]
      if (!arrQueue) {
        arrQueue = []
        GDATA[queueArrKey] = arrQueue;
      }
      
      return  new Promise(r=>{
        arrQueue.push(r);
      });
    }


    GDATA[queueFlgKey] = 1;

   
    // console.log('RealQuery',year,Math.random())
    return fetch(`${jsonUrlBase}/${year}.json`)
      .then((r) => r.json())
      .then(d=>{
        GDATA[queueFlgKey] = 0 ;GDATA[year] = d; 
        let queue = GDATA[queueArrKey];
        // console.log('queryFinish',year)
        if(queue && queue.length){
          queue.forEach(cb=>{
            // console.log('queryFinishQueue',year,queue.length,Math.random());
            cb(d);})
          queue.length = 0;
          GDATA[queueArrKey] = undefined
        }

        return d})
      .then(d=>{
        /// 将extra 提取出来
        if(d){
          for (const key in d ) {
            if (Object.prototype.hasOwnProperty.call(d , key)) {
              const element = d [key];
              
              if (Array.isArray(element)) {
                console.log(element)
                element.forEach(postItem=>{
                  const extraItem = postItem.extra;
                  if(!extraItem) return 
                  for (const key2 in extraItem) {
                    if (Object.prototype.hasOwnProperty.call(extraItem, key2)) {
                      const extraV = extraItem[key2];
                      postItem[key2] = extraV

                      console.log(key2,extraV,postItem)
                    }
                   
                  }
                })
              }
            }
          }
        }


        return d 
      })
      .catch((e) => {
        return null;
      });
  }

  function _getAllData() {
    let year = "" +  endYear
    let preYear = "" + (Number(year) - 1);
    return getAllYearCfg()
      .then((d) => {
        let yearCfg = d;
       
        let arr = [];
        if (yearCfg[year]) {
          arr.push(getYearData(year));
        }

        if (yearCfg[preYear]) {
          arr.push(getYearData(preYear));
        }
        return Promise.all(arr).then((alldata) => {
          let combineData = {};
          let d1 = alldata[0];
          let d2 = alldata[1];
 
 

          if(d1 && d1.year){
            combineData[d1.year] = d1
          }

          if(d2 && d2.year){
            combineData[d2.year] = d2
          }

          return Promise.resolve(combineData)
        });
      });
  }


  return _getAllData()
 
};
