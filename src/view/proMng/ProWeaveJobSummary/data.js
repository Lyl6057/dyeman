/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-14 10:27:06
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
        label: "生产单号",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "订单编号",
        prop: "salPoNo",
        span: 6,
        placeholder: " ",
        
      },
      {
        label: "纱线名称",
        prop: "yarnName",
        span: 6,
        placeholder: " ",
      },
      {
        label: "本厂批号",
        prop: "factoryYarnBatch",
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
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: "yarnAmount",
        type: "sum"
      }
    ],
    column: [
      {
        label: "生产单号",
        prop: "weaveJobCode",
        width: 140,
        overHidden: true,
      },
      {
        label: "订单编号",
        prop: "salPoNo",
        width: 140,
        overHidden: true,
      },
      {
        label: "织胚数量",
        prop: "amount",
        width: 140,
        align: "right",
        overHidden: true,
      },
      {
        label: "纱线名称",
        prop: "yarnName",
        width: 200,
        overHidden: true,
      },
      {
        label: "纱牌",
        prop: "yarnBrand",
        width: 140,
        overHidden: true,
      },
      {
        label: "供应商批号",
        prop: "yarnBatch",
        width: 140,
        overHidden: true,
      },
      {
        label: "本厂批号",
        prop: "factoryYarnBatch",
        width: 140,
        overHidden: true,
      },
      {
        label: "用纱比例",
        prop: "yarnRatio",
        width: 140,
        formatter: (row, value) => {
          return Number(value || 0).toFixed(2) + "%"
        }        
      },
      {
        label: "数量",
        prop: "yarnAmount",
        width: 100,
        align: "right",
        formatter: (row, value) => {
          return value || "0"
        }
      },
      {
        label: "单位",
        prop: "unitName",
        width: 120,
        overHidden: true,
      },
    ]
  };
}
