/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-28 10:35:00
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
        label: "开单日期",
        prop: "workDate",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
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
  height: "calc(100vh - 245px)",
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
        prop: "salPoNo",
        width: 150,
        overHidden: true,
      },
      {
        label: "开单日期",
        prop: "workDate",
        width: 110,
        formatter: (row, value) => {
          return value && (value.slice(0,10))
        }
      },
      {
        label: "交货日期",
        prop: "deliveDate",
        width: 110,
        formatter: (row, value) => {
          return value && (value.slice(0,10))
        }
      },
      {
        label: "重量(KG)",
        prop: "clothWeight",
        width: 110,
        align: "right",
        formatter: (row, value) => {
          return value && Number(value).toFixed(2);
        }
      },
      {
        label: "布票号",
        prop: "clothNoteCode",
        width: 150,
        overHidden: true,
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
      {
        label: "备布重量",
        prop: "preCalicoWeight",
        width: 150,
        align: "right",
        formatter: (row, value) => {
          return (+value || 0).toFixed(1)
        }
      },
      
    ]
  };
}
