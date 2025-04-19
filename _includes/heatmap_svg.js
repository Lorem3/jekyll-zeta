;function createSVGMap (endYmd,dateBeginYmd) {
  const monthArr = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  const weekarr = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
 
  if (!endYmd) {
    endYmd = `${new Date().getFullYear()}-12-31`;
  }
  else if(endYmd.length == 4){
    endYmd = `${endYmd}-12-31`;
  }
  let dateEnd = new Date(date2ymd(new Date(endYmd)));
  let dateBegin =  dateBeginYmd ?   new Date(date2ymd(new Date(dateBeginYmd))) : dateBeginYmd

  const colorInit = '#eef7f2'


  const namespaceURI = "http://www.w3.org/2000/svg";
  const dayStartX = 35;
  const dayStartY = 30;
  const dayW = 12;
  const dayH = 12;
  const dayGap = 2;

  const WeekCount = 53;
  const WeekStart = 1; // sunday

  const mapW = dayStartX + (dayGap + dayW) * WeekCount + 10;
  const mapH = dayStartY + (dayGap + dayH) * 7 + 20 

  const mapId = "MP-" + Math.random().toString(16).substring(2);
  const daysId = mapId + "days";
  const tipId = mapId + "tip";

  
  const endDateDay = dateEnd.getDay();
  const endStamp = dateEnd.getTime();
  const DayCount = (WeekCount - 1) * 7 + ((7 + endDateDay - WeekStart) % 7);
  var  minYmd = getPreYearYmd(endStamp);

  const MinYmdIdx =
    DayCount - Math.floor((endStamp - new Date(minYmd)) / (24 * 3600000)) + 1;
  
  

  const TodayIdx =
    DayCount - Math.floor((endStamp - new Date(date2ymd(new Date))) / (24 * 3600000));

  console.log('xxxxx',Math.floor((endStamp - Date.now()) / (24 * 3600000)));

  const beginIdx = !dateBegin ? -1 : DayCount - Math.floor((endStamp - dateBegin.getTime()) / (24 * 3600000));

  function getPreYearYmd(stamp) {
    const t = new Date(stamp);
    let y = t.getFullYear() - 1;
    let m = t.getMonth() + 1;
    let d = t.getDate();
    let ymd = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    return ymd;
  }

  function idx2Ymd(idx) {
    let t = new Date(endStamp - (DayCount - idx) * 3600000 * 24);
    return date2ymd(t);
  }
  function date2ymd(t) {
    let m = t.getMonth() + 1;
    let d = t.getDate();
    return `${t.getFullYear()}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }

  function createDayItem(idx) {
    // if (idx < MinYmdIdx || idx > DayCount) {
    //     return
    // }

    const rc = document.createElementNS(namespaceURI, "rect");
    rc.setAttribute("width", "" + dayW);
    rc.setAttribute("height", "" + dayH);
    rc.setAttribute("rx", "1");
    rc.setAttribute("ry", "1");

    rc.setAttribute("fill", colorInit);
    const c = Math.floor(idx / 7);
    const r = idx - c * 7;

    const x = c * dayW + c * dayGap;
    const y = r * dayH + r * dayGap;

    rc.setAttribute("x", "" + x);
    rc.setAttribute("y", "" + y);
    rc.dataset.x = x 
    rc.dataset.y = y 

    let ymd = idx2Ymd(idx);
    rc.dataset.ymd = ymd;
    rc.id = "day-item-" + ymd;

    let m = ymd.substring(5, 7);
    let d = ymd.substring(8, 10);

    if (d <= "07" && idx % 7 == 0) {
      // showMonth
      let mon = monthArr[Number(m) - 1];
      let mEle = document.createElementNS(namespaceURI, "text");
      mEle.setAttribute("y",  `${dayStartY - 8}`);
      mEle.setAttribute("x", x);
      mEle.textContent = mon;
      mEle.setAttribute("fill", idx > TodayIdx ? "#878787" : "#113");
      mEle.setAttribute("font-size", "13");
      mEle.setAttribute("font-family", "monospace");
      //  mEle.setAttribute('stroke','#    f00')
      //  mEle.setAttribute('stroke-width','1')
      monthG.appendChild(mEle);
    }

    return rc;
  }

  function updateDays(dataMap) {
    const color = dataMap.color || '#40c463'

    
    const t2 = document.createElementNS(namespaceURI,'tspan')
    t2.setAttribute('font-size','12')
    t2.setAttribute('dy','0')
    t2.setAttribute('dx','10')
    t2.setAttribute('fill','#888888')
    t2.setAttribute('font-family','courier')
    t2.textContent =  '';
    tilteE.append(t2)


    let countOfItem = 0
    
    function shuffle(array) {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
    }

    let daysHoder = groupDay;
    let arrNodes = daysHoder.childNodes;
    let count = WeekCount * 7;
    let arrUpdates = new Array(count);
    for (let i = 0; i < count; i++) {
      arrUpdates[i] = i;
    }
    shuffle(arrUpdates);

    function getDayDataCount(idx, ymd) {
      let y = ymd.substring(0,4)
      let m = ymd.substring(5,7)
      let yObj = dataMap[y]
      if (yObj && yObj[m]) {
        let arr = yObj[m]
        let r = arr.filter(e=>e.date == ymd)
        return r && r.length ? r : null
      }

      return null;
    }
 
    function updateDay1(idx) {
      let node = arrNodes[idx];
      if (node) {
        if (idx < MinYmdIdx || idx > DayCount) {
          node.setAttribute("display", "none");
          return;
        }


 
        let ymd = node.dataset.ymd;
        let m = ymd.substring(5, 7);
        let isOdd = Number(m) % 2;

 
        let arrData = getDayDataCount(idx, node.dataset.ymd);
        if(arrData && arrData.length){
          countOfItem += arrData.length;
          t2.textContent = `x ${countOfItem}`
        }
        if (!arrData && (idx > TodayIdx || idx < beginIdx)) {
          node.setAttribute("fill", isOdd ? "url(#fillB)" : "url(#fillA)");


          node.onmouseenter = function () {
            node.setAttribute('stroke','#000000')
            node.setAttribute('stroke-width','1')
            showTip(node, idx, arrData);
          };
          node.onmouseleave = function () {
            node.setAttribute('stroke','')
            node.setAttribute('stroke-width','')
            showTip(node, -1);
          };

          return;
        }

        

        
        const c = arrData && arrData.length;
        let colorSet = color
        if (c) {
          let customColor = arrData.find(e=>e.color)
          if(customColor ){
            colorSet = customColor.color
          }

          node.setAttribute("class", "svg-day-1");
          node.setAttribute(
            "fill",
            c == 1
              ? colorSet + "77"
              : c == 2
              ? colorSet + "aa"
              : colorSet + "ff"
          );

          node.onmouseenter = function () {
            node.setAttribute('stroke','#000000')
            node.setAttribute('stroke-width','1')
            showTip(node, idx, arrData);
          };
          node.onmouseleave = function () {
            node.setAttribute('stroke','')
            node.setAttribute('stroke-width','')
            showTip(node, -1);
          };
        } else {


          node.onmouseenter = function () {
            node.setAttribute('stroke','#000000')
            node.setAttribute('stroke-width','1')
            showTip(node, idx, arrData);
          };
          node.onmouseleave = function () {
            node.setAttribute('stroke','')
            node.setAttribute('stroke-width','')
            showTip(node, -1);
          };

          let ymd = node.dataset.ymd;
          if (ymd) {
            let m = ymd.substring(5, 7);
            let isOdd = Number(m) % 2;
            node.setAttribute("fill", isOdd ? "#edebf0" : "#edebf0aa");
          } else {
            node.setAttribute("fill", "#efefef");
          }
        }
      }
    }

    var startIdx = 0;
    function updateMultiDays() {
      if (startIdx < arrUpdates.length) {
        const C = 19;
        var i = 0;
        while (i++ < C) {
          if (startIdx >= arrUpdates.length) return;
          updateDay1(arrUpdates[startIdx++]);
        }

        requestAnimationFrame(updateMultiDays);
      }
    }
    updateMultiDays();
  }

  // 创建 <svg> 根元素
  const svg = document.createElementNS(namespaceURI, "svg");
  svg.id = mapId;
  svg.setAttribute("width", "" + mapW);
  svg.setAttribute("height", "" + mapH);

  // svg.style.backgroundColor = "#fffff0";
  svg.style.overflow = "visible";


  let defsObj = document.createElementNS(namespaceURI, "defs");
  defsObj.innerHTML = `
    <pattern id="fillA" patternUnits="userSpaceOnUse" width="${3}" height="${3}">
        <path d="M 0 0 L 6 6" stroke="#ccc" stroke-width="1"/>
    </pattern>

    <pattern id="fillB" patternUnits="userSpaceOnUse" width="${6}" height="${6}">
        <path d="M 0 6 L 6 0" stroke="#bbb" stroke-width="1"/>
    </pattern>
  `;

  svg.appendChild(defsObj);

  const monthG = document.createElementNS(namespaceURI, "g");
  monthG.setAttribute("transform", `translate(${dayStartX}, ${0})`);
  svg.appendChild(monthG);

  const weekG = document.createElementNS(namespaceURI, "g");
  weekG.setAttribute("transform", `translate(${0}, ${dayStartY})`);
  svg.appendChild(weekG);
  function createWeek(str, pos) {
    let w2 = document.createElementNS(namespaceURI, "text");
    w2.textContent = str;
    w2.setAttribute("font-family", "monospace");
    w2.setAttribute("font-size", "13");
    w2.setAttribute("fill", "#333");
    // w2.setAttribute('text-anchor','end')
    w2.setAttribute("width", "" + (dayStartX + 10));
    w2.setAttribute("height", "" + dayH);
    w2.setAttribute("x", "5");
    const y = pos * (dayH + dayGap) + 10;
    w2.setAttribute("y", "" + y);

    weekG.appendChild(w2);
    return w2;
  }

  createWeek(weekarr[(WeekStart + 1) % 7], 1);
  createWeek(weekarr[(WeekStart + 3) % 7], 3);
  createWeek(weekarr[(WeekStart + 5) % 7], 5);

  // 创建一个 <rect> 元素（矩形）
  const groupDay = document.createElementNS(namespaceURI, "g");
  groupDay.id = daysId;
  groupDay.setAttribute("transform", `translate(${dayStartX}, ${dayStartY})`);

  svg.appendChild(groupDay);

  const fragment = document.createDocumentFragment();

  const count = 7 * 53;
  for (let i = 0; i < count; i++) {
    const rc = createDayItem(i);
    if (rc) {
      fragment.appendChild(rc);
    }
  }



  groupDay.appendChild(fragment);
 
  const  tilteE = document.createElementNS(namespaceURI, "text");
  tilteE.setAttribute("y",  `${dayStartY + (dayGap + dayH) * 7 + 10 } `);
  tilteE.setAttribute("x", `${mapW - 10}` );

  tilteE.setAttribute("fill", '#999999');
  tilteE.setAttribute("font-size", "15");
  // tilteE.setAttribute("font-weight", "medium");
  tilteE.setAttribute("font-family", "monospace");
  tilteE.setAttribute('text-anchor','end')
  tilteE.setAttribute('dominant-baseline','middle')
  svg.appendChild(tilteE)

  
  const beginYmd = idx2Ymd(MinYmdIdx)
  if (beginYmd.substring(0,4) == endYmd.substring(0,4)) {
    tilteE.textContent = beginYmd.substring(0,4)
  }else{
    tilteE.textContent = ` ~ ${endYmd}` 
  }
  

 

 
  const tipG = document.createElementNS(namespaceURI, "g");
  tipG.id = tipId;
  svg.appendChild(tipG);

  var tipState = {
    showFlag: 0,
    idx: -1,
  };
  function showTip(dayNode, dayidx, items) {
    if (dayidx < 0 ) {
      tipState.showFlag = 0;
      setTimeout(() => {
        if (tipState.showFlag == 0) {
          tipG.innerHTML = "";
        }
      }, 50);

      return;
    }

    if (tipState.showFlag == 2) {
      return;
    }

    tipState.showFlag = 1;
    tipState.idx = dayidx;
    tipG.innerHTML = "";

    const isEmpy = items ? 0 : 1
    if(!items){
      items = [{date:dayNode.dataset.ymd}]
    }

    tipG.setAttribute("class", "svg-hm-day-tip");
    var width = "200";
    const count =  items.length 
    const vSpace = 10;
    const lineH = 25;
    const height = vSpace * 2 + lineH * count + "";
    const frag = document.createDocumentFragment();
    let rcbg = document.createElementNS(namespaceURI, "rect");
    rcbg.setAttribute("fill", "#333333cc");
    
    rcbg.setAttribute("height", height);
    rcbg.setAttribute("rx", "5");
    rcbg.setAttribute("ry", "5");
    frag.append(rcbg);

    tipG.onmouseenter = function () {
      if(isEmpy)return
      tipState.showFlag = 2;
    };
    tipG.onmouseleave = function () {
      tipState.showFlag = 0;
      tipG.innerHTML = "";
    };
    let txtLen = 0
    items.forEach((e, i) => {
      let m = e.date.substring(5,7)
      let d = e.date.substring(8,10)
      m = m.startsWith('0') ? m.substring(1):m
      d = d.startsWith('0') ? d.substring(1):d
      const txt = `${m}-${d} ${e.title || ""}`;
      if(txt.length > txtLen){
        txtLen = txt.length
      }
      const txtE = document.createElementNS(namespaceURI, "text");
      txtE.textContent = txt;
      txtE.setAttribute("fill", "#fff");
      txtE.setAttribute("font-size", "16");
      txtE.setAttribute("font-family", "monospace");
      txtE.setAttribute("x", "10");
      if (e.url) {
        const xlinkNS = "http://www.w3.org/1999/xlink";
        const a = document.createElementNS(namespaceURI, "a");
        a.setAttributeNS(xlinkNS, "xlink:href", e.url);
        a.setAttribute("target", "_blank");
        txtE.setAttribute("y", "" + (vSpace + i * lineH + 18));

        a.appendChild(txtE);
        frag.appendChild(a);
      } else {
        txtE.setAttribute("y", "" + (vSpace + i * lineH + 15));
        frag.appendChild(txtE);
      }
    });

    width = txtLen * 14.55 + 25

    rcbg.setAttribute("width", width);
    tipG.appendChild(frag);

    const row = dayidx % 7;
    const column = (dayidx - row) / 7;
    const x = dayStartX + column * (dayGap + dayW) + dayW / 2 - width / 2;
    const y = dayStartY + row * (dayGap + dayH) - height - dayGap;

    tipG.setAttribute("transform", `translate(${x}, ${y})`);
  }

  return {svg,updateDays}
}
 