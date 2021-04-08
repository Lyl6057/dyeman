/*
 * @Author: Lyl
 * @Date: 2021-04-08 19:31:40
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-08 19:33:36
 * @Description: 
 */


export const analysisExcel = (file, option) => {
  // 声明一个文件读取器
  return new Promise((resolve, reject) => {
    let origin = option.column.filter(item => !item.hide);
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    // 文件读取成功时触发事件
    fileReader.onload = e => {
      try {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        // 只读取首个sheet表
        let SheetName = workbook.SheetNames[0];
        let reg = /([A-z]+)([1-9]+)/;
        let resultMap = [];
        let rule = {};
        // 检验 excel 是否符合 (未实现)
        // ...!ref: "A1:J3"
        let vaild = workbook.Sheets[SheetName]["!ref"].split(":");
        let value =
          vaild[1].match(reg)[1].charCodeAt() -
          vaild[0].match(reg)[1].charCodeAt() +
          1;
        if (origin.length != value) {
          reject("属性名不对应");
        }
        // 取值
        Object.entries(workbook.Sheets[SheetName]).forEach(cell => {
          if (!cell[0].match(reg)) return; // 匹配为null
          // tItem[1] => A  => 列  tItem[2] ==> 1 => 行
          // 数字一样的同一对象，   字母一样的同一属性
          let tItem = cell[0].match(reg);
          let row = tItem[2],
            col = tItem[1];

          // 获取对应的属性对象{prop,label,type}
          if (row == "1") {
            rule[col] = origin.find(item => item.label == cell[1].v);
          }
          //
          resultMap[row] || (resultMap[row] = {});
          //判断类型
          if (rule[col] === undefined) {
            rule[col] = "";
          }
          if (rule[col] != undefined && rule[col].type === "date") {
            cell[1].v = transDate(cell[1].v);
          }
          if (rule[col] != undefined && rule[col].type === "time") {
            cell[1].v = transTime(cell[1].v);
          }
          resultMap[row][rule[col].prop] = cell[1].v;
        });
        resolve(resultMap.splice(2));
      } catch (err) {
        console.error(err);
      }
    };
  });
};

function transDate(date) {
  if (!date) return date;
  if (typeof date === "string") return date;
  if (typeof date === "number") {
    // excel中 日期转换数字的  1900年至今
    let now = new Date(
      (date - 2) * (24 * 60 * 60 * 1000) + new Date("1900-01-01").getTime()
    );
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    return `${y}-${m}-${d}`;
  }
}
function transTime(time) {
  if (!time) return time;
  if (typeof time === "string") return time;
  if (typeof time === "number") {
    let t = time * (24 * 60 * 60), // 獲取時間的總秒數
      h = Math.floor(t / 3600), // 獲取時
      m = Math.floor((t % 3600) / 60), // 獲取分鐘數
      s = Math.floor((t % 3600) % 60);
    return `${h}:${m}:${s}`;
  }
}
