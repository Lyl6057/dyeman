/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-01 11:26:40
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

function fillZero(row, value) {
  return value && value.toFixed(2);
}



// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  delBtn: false,
  editBtn: false,
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
        label: "汇总日期",
        prop: "checkDate",
        span: 6,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
      },
      
    ]
  };
}
export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    menuWidth: 120,
    labelWidth:120,
    showSummary: true,
    menu: true,
    sumColumnList: [
      {
        label: " ",
        name: "checkPcount",
        type: "sum"
      },
      {
        label: " ",
        name: "chkQty",
        type: "sum"
      },
      {
        label: " ",
        name: "chkTrblPcount",
        type: "sum"
      },
      {
        label: " ",
        name: "sumTrblQty",
        type: "sum"
      }
    ],
    height: "calc(100vh - 240px)",
    column: [
      {
        label: "汇总日期",
        prop: "checkDate",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        sortable: true,
        align: "center",
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        fixed: true
      },
      {
        label: "缸号",
        prop: "vatNo",
        placeholder: " ",
        span: 6,
        width: 140,
        fixed: true,
        overHidden: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ]
      },
      {
        label: "客户",
        prop: "custId",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        readonly: true,
        dicData: cust,
        tip: "Khách hàng"
      },
      
      {
        label: "布类名称",
        tip: "Tên loại vải",
        prop: "fabName",
        readonly: true,
        placeholder: " ",
        span: 12,
        width: 200,
        overHidden: true,
        hide: true
      }, 
      
      {
        label: "检验疋数",
        prop: "checkPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ]
      },
      {
        label: "不OK疋数",
        prop: "chkTrblPcount",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        formatter: fillZero,
        rules: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ]
      },
      {
        label: "责任部门",
        prop: "chargeDpt",
        width: 150,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      {
        label: "颜色名称",
        prop: "colorName",
        readonly: true,
        width: 150,
        span: 6,
        overHidden: true,
      },
      {
        label: "检验数量(磅)",
        prop: "chkQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        rules: [
          {
            required: true,
            message: '',
            trigger: "blur"
          }
        ]
        // formatter: fillZero
      },
      
      {
        label: "不Ok数量(磅)",
        prop: "sumTrblQty",
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        // formatter: fillZero
      },
      {
        label: "问题表述",
        prop: "problemDesc",
        width: 180,
        placeholder: " ",
        span: 12,
        overHidden: true,
      },
      {
        label: "处理方案",
        prop: "solution",
        width: 180,
        placeholder: " ",
        span: 12,
        overHidden: true,
      },
      {
        label: "备注",
        prop: "remark",
        placeholder: " ",
        width: 200,
        span: 12,
        overHidden: true,
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