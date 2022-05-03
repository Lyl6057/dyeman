/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-03 17:00:30
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
    column: [
      {
        label: "查布日期",
        prop: "planDate",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 140,
        sortable: true,
        fixed: true
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true
      },
      {
        label: "总疋数",
        prop: "sumPid",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number"
      },
      {
        label: "抽样数量",
        prop: "samplNw",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 130,
        type: "number",
        overHidden: true
      },
      {
        label: "完成数量",
        prop: "lossRate",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
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
        type: "number",
        overHidden: true
      },
      {
        label: "布笼号",
        prop: "storeCodes",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true
      },
      {
        label: "装笼疋数",
        prop: "storeCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 160,
        overHidden: true
      },
      {
        label: "抽样布笼",
        prop: "storeCode11",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true
      }
    ]
  };
}
