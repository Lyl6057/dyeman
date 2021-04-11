//时间格式转化 Y-M-d h:m:s
export function timeConversion(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let m = date.getMinutes();
  m = m < 10 ? "0" + m : m;
  let s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}

//特殊日期时间格式转为 Y-M-d h:m:s
export function bzDate(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

//查询时，查询条件过滤控制
export function queryCtl(item1, item2) {
  let query = {};
  for (let index = 0; index < item1.column.length; index++) {
    if (item2[item1.column[index].prop] != "") {
      query[item1.column[index].prop] = item2[item1.column[index].prop]
    }
  }
  return query;
}

//根据数据长度改变表头宽度(控制数据为两行内)
export function Data_Width(item1, item2) {
  for (let i = 0; i < item1.column.length; i++) {
    let who = item1.column[i].prop;
    for (let j = 0; j < item2.length; j++) {
      if (item2[j][who] == null) {
        continue;
      }
      if (item2[j][who].length > 18) {
        item1.column[i].width =
          item2[j][who].length * 8.5;
      }
    }
  }
  return item1
}

//根据表头label长度改变表头宽度(控制表头为一行)
export function label_Width(item1) {
  for (let i = 0; i < item1.column.length; i++) {
    if (item1.column[i].label.length >= 6) {
      item1.column[i].width =
        item1.column[i].label.length * 18;
    }
  }
  return item1
}

//控制type为datetime类型的字段进行格式转换
export function isDate(item1, item2) {
  for (let index = 0; index < item1.column.length; index++) {
    if (item1.column[index].type == "datetime") {
      if (item2[item1.column[index].prop] != "" && item2[item1.column[index].prop] != null) {
        item2[item1.column[index].prop] = timeConversion(
          item2[item1.column[index].prop]
        );
      }
    }
  }
  return item2
}
//获取月份的最后一天
export function lastDay(value) {
  var date = new Date(value);
  var currentMonth = date.getMonth();
  var nextMonth = ++currentMonth;
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  var lastTime = new Date(nextMonthFirstDay - oneDay);
  var month = parseInt(lastTime.getMonth() + 1);
  var day = lastTime.getDate();
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  // return new Date(date.getFullYear() + '-' + month + '-' + day);  
  return day
}
//获取当前时间
export function nowTime(timeStamp) {
  let year = new Date(timeStamp).getFullYear();
  let month =
    new Date(timeStamp).getMonth() + 1 < 10 ?
      "0" + (new Date(timeStamp).getMonth() + 1) :
      new Date(timeStamp).getMonth() + 1;
  let date =
    new Date(timeStamp).getDate() < 10 ?
      "0" + new Date(timeStamp).getDate() :
      new Date(timeStamp).getDate();
  let hh =
    new Date(timeStamp).getHours() < 10 ?
      "0" + new Date(timeStamp).getHours() :
      new Date(timeStamp).getHours();
  let mm =
    new Date(timeStamp).getMinutes() < 10 ?
      "0" + new Date(timeStamp).getMinutes() :
      new Date(timeStamp).getMinutes();
  // let ss =
  //   new Date(timeStamp).getSeconds() < 10 ?
  //   "0" + new Date(timeStamp).getSeconds() :
  //   new Date(timeStamp).getSeconds();

  return year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm

}

// 对象转换为hash
export function obj2hash(obj) {
  let resultStr = "";
  Object.entries(obj).forEach(item => {
    resultStr += "&" + item[0] + "=" + item[1];
  });
  resultStr = "?" + resultStr.slice(1);
  return resultStr;
}

// 获取下拉字典
export function getDIC(_this, codeTableId) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  !_this.dicMap && (_this.dicMap = {})

  let resultMap = _this.dicMap[codeTableId]
  if (!resultMap || resultMap.length <= 0) {
    resultMap = [];
    _this.$http
      .post("/api/codeValue?codeTableId=" + codeTableId)
      .then(res => {
        res.data.forEach(item => {
          resultMap.push({
            label: item.codename,
            value: item.codeid
          });
        });
        // _this.$store.commit("setDicItem", {
        //   key: codeTableId,
        //   value: resultMap
        // });
        _this.dicMap[codeTableId] = resultMap;
      });
  }
  return resultMap;
}

// 获取下拉字典 - 可修改
export function getDIC2(_this, codeTableId) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  !_this.dicMap && (_this.dicMap = {})

  let resultMap = _this.dicMap[codeTableId]
  if (!resultMap || resultMap.length <= 0) {
    resultMap = [];
    _this.$http
      .get("/api/getcodeValue?codeTableId=" + codeTableId)
      .then(res => {
        res.data.forEach(item => {
          resultMap.push({
            label: item.codename,
            value: item.codeid
          });
        });
        // _this.$store.commit("setDicItem", {
        //   key: codeTableId,
        //   value: resultMap
        // });
        _this.dicMap[codeTableId] = resultMap;
      });
  }
  return resultMap;
}


export const base64Type = {
  "txt": "data:text/plain;base64,",
  "doc": "data:application/msword;base64,",
  "docx": "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
  "xls": " data:application/vnd.ms-excel;base64,",
  "xlsx": "data:application/octet-stream;base64,",
  "pdf": "data:application/pdf;base64,",
  "pptx": "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,",
  "ppt": "data:application/vnd.ms-powerpoint;base64,",
  "png": "data:image/png;base64,",
  "jpg": "data:image/jpeg;base64,",
  "gif": "data:image/gif;base64,",
  "svg": " data:image/svg+xml;base64,",
  "ioc": "data:image/x-icon;base64,",
  "bmp": "data:image/bmp;base64,"
}


export function getExtreme(data, start, end) {
  let maxResult = '';
  let minResult = '';
  data.forEach((item, index) => {
    if (item[start] != null && item[end] != null) {
      if (index === 0) {
        minResult = item[start].valueOf();
        maxResult = item[end].valueOf();
      }
      if (item[start].valueOf() > maxResult.valueOf()) {
        maxResult = item[start]
      }
      if (item[end].valueOf() > maxResult.valueOf()) {
        maxResult = item[end]
      }
      if (item[start].valueOf() < minResult.valueOf()) {
        minResult = item[start]
      }
      if (item[end].valueOf() < minResult.valueOf()) {
        minResult = item[end]
      }
    }
  })
  minResult = timeConversion(new Date(minResult).valueOf() - 15 * 1000 * 3600 * 24);
  maxResult = timeConversion(new Date(maxResult).valueOf() + 15 * 1000 * 3600 * 24)
  return { maxResult, minResult }
}

export function getDataPoor(start, end, type) {
  start = new Date(start);
  end = new Date(end);
  type = type.toLowerCase()
  let Num = 1;
  if (type === 'second') {
    Num = 1000
  } else if (type === 'minute') {
    Num = 1000 * 60
  } else if (type === 'hour') {
    Num = 1000 * 3600
  } else {
    Num = 1000 * 3600 * 24
  }
  return parseInt((end.getTime() - start.getTime()) / parseInt(Num))
}



export function datetimeparse(timestamp, format, prefix) {
  if (typeof timestamp == 'string') {
    timestamp = Number(timestamp)
  };
  //转换时区
  let currentZoneTime = new Date(timestamp);
  let currentTimestamp = currentZoneTime.getTime();
  let offsetZone = currentZoneTime.getTimezoneOffset() / 60;//如果offsetZone>0是西区，西区晚
  let offset = null;
  //客户端时间与服务器时间保持一致，固定北京时间东八区。
  offset = offsetZone + 8;
  currentTimestamp = currentTimestamp + offset * 3600 * 1000

  let newtimestamp = null;
  if (currentTimestamp) {
    if (currentTimestamp.toString().length === 13) {
      newtimestamp = currentTimestamp.toString()
    } else if (currentTimestamp.toString().length === 10) {
      newtimestamp = currentTimestamp + '000'
    } else {
      newtimestamp = null
    }
  } else {
    newtimestamp = null
  }
  ;
  let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
  let YYYY = dateobj.getFullYear()
  let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
  let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
  let HH = dateobj.getHours() > 9 ? dateobj.getHours() : '0' + dateobj.getHours()
  let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
  let ss = dateobj.getSeconds() > 9 ? dateobj.getSeconds() : '0' + dateobj.getSeconds()
  let output = '';
  let separator = '/'
  if (format) {
    separator = format.match(/-/) ? '-' : '/'
    output += format.match(/yy/i) ? YYYY : ''
    output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
    output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
    output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
    output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
    output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
  } else {
    output += YYYY + separator + MM + separator + DD
  }
  output = prefix ? (prefix + output) : output

  return newtimestamp ? output : ''

}

// 计算续住的总日期列表
export function getYearAndMonthAndDay(begin, end) {
  begin = begin.split(" ")[0]
  end = end.split(" ")[0]
  let arr1 = begin.split("-");
  let arr2 = end.split("-");
  let arr1_ = new Date();
  let arrTime = [];
  arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
  let arr2_ = new Date();
  arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
  let unixDb = arr1_.getTime();
  let unixDe = arr2_.getTime();
  for (let k = unixDb; k <= unixDe;) {
    arrTime.push(datetimeparse(k, 'yy/MM/DD'));
    k = k + 24 * 60 * 60 * 1000;
  }
  return arrTime;
}



