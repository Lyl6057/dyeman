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

export function getExtreme(data, start, end) {
  // 获取数组中的最日期
  let maxResult = "";
  let minResult = "";
  data.forEach((item, index) => {
    if (item[start] != null && item[end] != null) {
      if (index === 0) {
        minResult = item[start].valueOf();
        maxResult = item[end].valueOf();
      }
      if (item[start].valueOf() > maxResult.valueOf()) {
        maxResult = item[start];
      }
      if (item[end].valueOf() > maxResult.valueOf()) {
        maxResult = item[end];
      }
      if (item[start].valueOf() < minResult.valueOf()) {
        minResult = item[start];
      }
      if (item[end].valueOf() < minResult.valueOf()) {
        minResult = item[end];
      }
    }
  });
  minResult = timeConversion(
    new Date(minResult).valueOf() - 15 * 1000 * 3600 * 24
  );
  maxResult = timeConversion(
    new Date(maxResult).valueOf() + 15 * 1000 * 3600 * 24
  );
  return { maxResult, minResult };
}

export function getDataPoor(start, end, type) {
  // 计算间隔天数
  start = new Date(start);
  end = new Date(end);
  type = type.toLowerCase();
  let Num = 1;
  if (type === "second") {
    Num = 1000;
  } else if (type === "minute") {
    Num = 1000 * 60;
  } else if (type === "hour") {
    Num = 1000 * 3600;
  } else {
    Num = 1000 * 3600 * 24;
  }
  return parseInt((end.getTime() - start.getTime()) / parseInt(Num));
}

export function datetimeparse(timestamp, format, prefix) {
  if (typeof timestamp == "string") {
    timestamp = Number(timestamp);
  }
  //转换时区
  let currentZoneTime = new Date(timestamp);
  let currentTimestamp = currentZoneTime.getTime();
  let offsetZone = currentZoneTime.getTimezoneOffset() / 60; //如果offsetZone>0是西区，西区晚
  let offset = null;
  //客户端时间与服务器时间保持一致，固定北京时间东八区。
  offset = offsetZone + 8;
  currentTimestamp = currentTimestamp + offset * 3600 * 1000;

  let newtimestamp = null;
  if (currentTimestamp) {
    if (currentTimestamp.toString().length === 13) {
      newtimestamp = currentTimestamp.toString();
    } else if (currentTimestamp.toString().length === 10) {
      newtimestamp = currentTimestamp + "000";
    } else {
      newtimestamp = null;
    }
  } else {
    newtimestamp = null;
  }
  let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date();
  let YYYY = dateobj.getFullYear();
  let MM =
    dateobj.getMonth() > 8
      ? dateobj.getMonth() + 1
      : "0" + (dateobj.getMonth() + 1);
  let DD = dateobj.getDate() > 9 ? dateobj.getDate() : "0" + dateobj.getDate();
  let HH =
    dateobj.getHours() > 9 ? dateobj.getHours() : "0" + dateobj.getHours();
  let mm =
    dateobj.getMinutes() > 9
      ? dateobj.getMinutes()
      : "0" + dateobj.getMinutes();
  let ss =
    dateobj.getSeconds() > 9
      ? dateobj.getSeconds()
      : "0" + dateobj.getSeconds();
  let output = "";
  let separator = "/";
  // if (format) {
  //   separator = format.match(/-/) ? '-' : '/'
  //   output += format.match(/yy/i) ? YYYY : ''
  //   output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
  //   output += format.match(/dd/i) ? (output.length ? separator : '') +  + DD : ''
  //   output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
  //   output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
  //   output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
  // } else {
  //   output += YYYY + separator + MM + separator + DD
  // }
  output = prefix ? prefix + output : { ym: YYYY + "-" + MM, d: DD };

  return newtimestamp ? output : "";
}

// 计算续住的总日期列表
export function getYearAndMonthAndDay(begin, end) {
  begin = begin.split(" ")[0];
  end = end.split(" ")[0];
  let arr1 = begin.split("-");
  let arr2 = end.split("-");
  let arr1_ = new Date();
  let arrTime = [];
  arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
  let arr2_ = new Date();
  arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
  let unixDb = arr1_.getTime();
  let unixDe = arr2_.getTime();
  for (let k = unixDb; k <= unixDe; ) {
    arrTime.push(datetimeparse(k, "yy-MM-DD"));
    k = k + 24 * 60 * 60 * 1000;
  }
  return arrTime;
}

export function getDay(day) {
  //Date()返回当日的日期和时间。
  var days = new Date();
  //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
  var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
  //setTime()以毫秒设置 Date 对象。
  days.setTime(gettimes);
  var year = days.getFullYear();
  var month = days.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var today = days.getDate();
  if (today < 10) {
    today = "0" + today;
  }
  return year + "-" + month + "-" + today;
}
