/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-05 11:23:13
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\data.js
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
  showSummary: false,
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
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "查布日期",
        prop: "planDate",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 6,
        placeholder: " "
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    labelWidth:110,
    height: "calc(100vh - 240px)",
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true,
        formslot:true,
        rules: [
          {
            required: true,
            message: "请输入缸号",
            trigger: "blur",
          },
        ],
      },
      {
        label: "查布日期",
        prop: "planDate",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        width: 120,
        sortable: true,
        span: 6,
        fixed: true,
        align: "center",
        rules: [
          {
            required: true,
            message: "请选择查布日期",
            trigger: "blur",
          },
        ],
      },
      {
        label: "计划开始",
        prop: "planStart",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        width: 150,
        sortable: true,
        overHidden:true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请选择计划开始",
            trigger: "blur",
          },
        ],
      },
      {
        label: "计划结束",
        prop: "planEnd",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        overHidden:true,
        width: 150,
        span: 6,
        rules: [
          {
            required: true,
            message: "请选择计划结束",
            trigger: "blur",
          },
        ],
      },
      {
        label: "总疋数",
        prop: "sumPid",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 80,
        type: "number",
        align: "right"
      },
      // {
      //   label: "布笼号",
      //   prop: "storeCodes",
      //   readonly: true,
      //   placeholder: " ",
      //   span: 6,
      //   width: 200,
      //   overHidden: true
      // },
      // {
      //   label: "装笼疋数",
      //   prop: "storeCode",
      //   readonly: true,
      //   placeholder: " ",
      //   span: 12,
      //   width: 120,
      //   align: "right",
      //   overHidden: true
      // },
      {
        label: "抽样数量",
        prop: "samplCount",
        placeholder: " ",
        span: 6,
        width: 130,
        align: "right",
        type: "number",
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请输入抽样数量",
            trigger: "blur",
          },
        ],
      },
      // {
      //   label: "抽样布笼",
      //   prop: "storeCode11",
      //   placeholder: " ",
      //   span: 6,
      //   width: 200,
      //   overHidden: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请选择抽样布笼",
      //       trigger: "blur",
      //     },
      //   ],
      // },
      {
        label: "完成数量",
        prop: "lossRate",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
      },
      {
        label: "完成比例(%)",
        prop: "fabricLength",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        align: "right",
        type: "number",
        overHidden: true
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
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
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
        overHidden: true
      },
      {
        label: "出库日期",
        prop: "outTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " "
      },
      {
        label: "是否回仓",
        prop: "returnFlag",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type:"switch",
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
        overHidden: true
      },
      {
        label: "回仓日期",
        prop: "returnTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " "
      },
    ]
  };
}