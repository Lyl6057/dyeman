/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-18 10:12:06
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

function fillZero(row, value) {
  return value && value.toFixed(2);
}

// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
};


export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: "日期",
        prop: "dayId",
        span: 6,
        placeholder: " "
      },
    ]
  };
}
export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth:110,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "productQty",
        type: "sum"
      },
      {
        label: " ",
        name: "hairQty",
        type: "sum"
      },
      {
        label: " ",
        name: "collarQty",
        type: "sum"
      },
      {
        label: " ",
        name: "receivedQty",
        type: "sum"
      },
      {
        label: " ",
        name: "outQty",
        type: "sum"
      }
    ],
    height: "calc(100vh - 240px)",
    column: [
      {
        label: "日期",
        prop: "dayId",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        sortable: true,
        // display: false,
        align: "center"
      },
      {
        label: "成品数量(kg)",
        prop: "productQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: "钳毛",
        prop: "hairQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label: "折领",
        prop: "collarQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label: "持单量(kg)",
        prop: "receivedQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label: "完成量(kg)",
        prop: "outQty",
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        align: "right"
      },
      {
        label: "异常数量(kg)",
        prop: "exceptQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right"
      },
    ]
  };
}

export function qcCheckStorePlanCrud(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 310px)",
    index: false,
    column: [
      {
        label: "序号",
        prop: "waitOutSn",
        cell: true,
        placeholder: " ",
        span: 6,
        width: 60,
        align: "center",
        overHidden: true
      },
      {
        label: "布笼号",
        prop: "storeLoadCode",
        placeholder: " ",
        span: 6,
        width: 200,
        cell: true,
        overHidden: true
      },
      
      {
        label: "出库完成",
        prop: "outFlag",
        cell: true,
        disabled: false,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
        align: "center",
        dicData:[
          {
            label:"否",
            value:false,
          },
          {
            label:"是",
            value:true,
          }
        ],
        overHidden: true,
        change: (val) => {
          _this.$nextTick(() =>{
            setTimeout(() => {
              if (!_this.dtlCurIdx) return;
              val.value ? 
              _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].outTime = _this.$getNowTime("datetime") 
              : _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].outTime = ""
            });
          })
        }
      },
      {
        label: "出库日期",
        prop: "outTime",
        type: "datetime",
        cell: true,
        width: 180,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " "
      },
      {
        label: "是否回仓",
        prop: "returnFlag",
        disabled: false,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
        align: "center",
        cell: true,
        dicData:[
          {
            label:"否",
            value:false,
          },
          {
            label:"是",
            value:true,
          }
        ],
        overHidden: true,
        change: (val) => {
          _this.$nextTick(() =>{
            setTimeout(() => {
              if (!_this.dtlCurIdx) return;
              val.value ? 
              _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].returnTime = _this.$getNowTime("datetime") 
              : _this.qcCheckStorePlanList[_this.dtlCurIdx - 1].returnTime = ""
            });
          })
        }
      },
      {
        label: "回仓日期",
        prop: "returnTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        width: 180,
        cell: true,
        placeholder: " "
      },
      {
        label: "总疋数",
        prop: "pidCount",
        placeholder: " ",
        span: 6,
        width: 90,
        cell: false,
        align: "right",
        overHidden: true
      },
      {
        label: "疋号",
        prop: "piNos",
        placeholder: " ",
        span: 6,
        // width: 200,
        cell: false,
        overHidden: true
      },
    ]
  };
}