/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-01 09:08:56
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "织单号",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        
      },
      {
        label: "订单号",
        prop: "custPoNo",
        span: 6,
        placeholder: " ",
      },
    ]
  };
}

const  crudOption = {
  menu: false,
  addBtn: false,
  cancelBtn: false,
  editBtn: false,
  delBtn: false,
  menuWidth: 80,
  border: true,
  index: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 235px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  labelWidth: 100,
  selection: false,
  showSummary: false,
}

export function mainCrud(_this) {
  return {
    ...crudOption,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "pidCount",
        type: "sum"
      }
    ],
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        width: 140,
        overHidden: true,
      },
      {
        label: "织单号",
        prop: "weaveJobCode",
        width: 130,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "订单号",
        prop: "custPoNo",
        width: 150,
        overHidden: true,
      },
      {
        label: "备布重量",
        prop: "clothWeight",
        width: 150,
        align: "right",
        formatter: (row, value) => {
          return value || "0"
        }
      },
      {
        label: "疋数",
        prop: "pidCount",
        width: 100,
        align: "right",
        formatter: (row, value) => {
          return value || "0"
        }
      },
    ]
  };
}
