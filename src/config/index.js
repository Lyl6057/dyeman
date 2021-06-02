
import axios from 'axios'
import { sync } from 'rimraf';
export const webSocket = {
  setWebSoket(_this) {
    if ('WebSocket' in window) {
      _this.websocket = new WebSocket('ws://10.0.168.201:91/test');
      // _this.websocket = new WebSocket('ws://112.91.115.70:91/test');
    } else {
      alert('该浏览器不支持websocket通讯，请切换浏览器！')
    }
    //连接发生错误的回调方法
    _this.websocket.onerror = function () {
      alert("服务器连接失败，请检查网络!");
    };
    //连接成功建立的回调方法
    _this.websocket.onopen = function (event) {
      // alert("服务器连接成功!");
      _this.$tip.success("服务器连接成功!");
    }
    //接收到消息的回调方法
    _this.websocket.onmessage = function (event) {
      // // console.log(event);
      // if (event.data === 'null') {
      //   _this.$tip.warning("暂无该订单信息!");
      //   return
      // }
      // _this.setData(JSON.parse(event.data))
    }
    //连接关闭的回调方法
    _this.websocket.onclose = function () {
      _this.websocket.close();
      // _this.$tip.warning("连接关闭!");
    }
  },
  setCz(_this) {
    if ('WebSocket' in window) {
      _this.czsocket = new WebSocket('ws://127.0.0.1:44001/weight');
    } else {
      _this.$tip.error('该浏览器不支持websocket通讯，请切换浏览器！')
    }
    //连接发生错误的回调方法
    _this.czsocket.onerror = function () {
      _this.$tip.error("称重服务器连接失败，请检查网络!");
    };
    //连接成功建立的回调方法
    _this.czsocket.onopen = function (event) {
      _this.$tip.success("服务器连接成功!");
    }
    //接收到消息的回调方法
    _this.czsocket.onmessage = function (event) {

    }
    //连接关闭的回调方法
    _this.czsocket.onclose = function () {
      _this.czsocket.close();
      // _this.$tip.warning("连接关闭!");
    }
    // _this.websocket.onsend = function () {

    // }
  },
  setPrint(_this) {
    if ('WebSocket' in window) {
      _this.prsocket = new WebSocket('ws://127.0.0.1:44001/print');
    } else {
      _this.$tip.error('该浏览器不支持websocket通讯，请切换浏览器！')
    }
    //连接发生错误的回调方法
    _this.prsocket.onerror = function () {
      _this.$tip.error("打印应用连接失败，请检查是否启动!");
    };
    //连接成功建立的回调方法
    _this.prsocket.onopen = function (event) {
      _this.$tip.success("打印应用连接成功!");
    }
    //接收到消息的回调方法
    _this.prsocket.onmessage = function (event) {
    }
    //连接关闭的回调方法
    _this.prsocket.onclose = function () {
      _this.prsocket.close();
      // _this.$tip.warning("连接关闭!");
    }
    // _this.websocket.onsend = function () {

    // }
  },
}
// 获取下拉字典
export function getDIC(codeTableId) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = []
  axios
    .get("/api/getcodeValue?codeTableId=" + codeTableId)
    .then(res => {
      res.data.sort((a, b) => {
        return a.orderno - b.orderno
      })
      res.data.forEach(item => {
        resultMap.push({
          label: item.codename,
          value: item.codeid
        });
      });
    });
  return resultMap;
}

// 获取下拉字典
export async function getDbDicT(url, url2) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);
  let resultMap = []
  axios
    .get("/api/" + url)
    .then(res => {
      let data = []
      if (res.data.rows) {
        data = res.data.rows
      } else {
        data = res.data
      }
      axios
        .get("/api/" + url2)
        .then(Res => {
          if (Res.data.rows) {
            data = data.concat(Res.data.rows)
          } else {
            data = data.concat(Res.data)
          }
          data.forEach(item => {
            resultMap.push(item);

          });
        })

    });
  return resultMap;
}

// 获取字典表
export function getDicT(url, label, value, form = {}) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = []
  axios({
    url: "/api/" + url,
    method: 'get',
    params: form
  })
    .then(res => {
      let data = []
      if (res.data.rows) {
        data = res.data.rows
      } else {
        data = res.data
      }
      data.sort((a, b) => {
        return a.orderno - b.orderno
      })
      data.forEach(item => {
        for (var key in item) {
          if (item[key] === 0) {
            item[key] = '0';
          }
          if (item[key] === null) {
            item[key] = ' ';
          }
        }
        resultMap.push({
          label: item[label],
          value: item[value]
        });
      });
    });
  return resultMap;
}
export function postDicT(url, label, value, form = {}) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = []
  axios
    .post("/api/" + url, form)
    .then(res => {
      let data = []
      if (res.data.rows) {
        data = res.data.rows
      } else {
        data = res.data
      }
      data.sort((a, b) => {
        return a.orderno - b.orderno
      })
      data.forEach(item => {
        resultMap.push({
          label: item[label],
          value: item[value]
        });
      });
    });
  return resultMap;
}

export function getXDicT(url) {
  // let resultMap = _this.$store.getters.getDic(codeTableId);

  let resultMap = []
  axios
    .get("/api/" + url)
    .then(res => {
      let data = []
      if (res.data.rows) {
        data = res.data.rows
      } else {
        data = res.data
      }
      data.sort((a, b) => {
        return a.orderno - b.orderno
      })
      data.forEach(item => {
        for (var key in item) {
          if (item[key] === 0) {
            item[key] = '0';
          }
          if (item[key] === null) {
            item[key] = ' ';
          }
        }
        resultMap.push(item);
      });
    });

  return resultMap;
}


export function getNowTime(type = "date") {
  const time = new Date();
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mi = time.getMinutes();
  let s = time.getSeconds();
  m = m < 10 ? `0${m}` : m;
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  mi = mi < 10 ? `0${mi}` : mi;
  s = s < 10 ? `0${s}` : s;
  if (type == 'date') {
    return `${y}-${m}-${d}`;
  } else {
    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
  }

}
// export function getNowTime() {
//   const time = new Date();
//   let y = time.getFullYear();
//   let m = time.getMonth() + 1;
//   let d = time.getDate();
//   let h = time.getHours();
//   let mi = time.getMinutes();
//   mi = mi < 10 ? `0${mi}` : mi;

// }

export function unique(arr, val) {
  const res = new Map();
  return arr.filter((a) => !res.has(a[val]) && res.set(a[val], 1))
}


export function preFixInt(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

// 滾動至表格最低
export function toTableLow(_this, tableName = 'crud') {
  // const dom = _this.$refs[tableName].$el
  const dom1 = document.getElementById(tableName).getElementsByClassName("el-table__body-wrapper")[0];
  dom1.scrollTo(0, dom1.scrollHeight)
}