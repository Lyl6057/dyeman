/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-29 17:22:42
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-30 08:37:26
 */

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

export function stkinMemoUnWhseInCrudOp(_this) {
    return {
      ...mainCrudOpCommon,
      height: "calc(100vh - 225px)",
      selection: true,
      index: false,
      column: [{
          label: "入仓通知单编号",
          prop: "memoNo",
          width: 200,
        },
        {
          label: "通知单日期",
          prop: "memoDate",
          width: 150,
        },
        {
          label: "胚布疋数",
          prop: "piCount",
          width: 150,
          align: "right",
        },
        {
          label: "胚布总重量(kg)",
          prop: "clothWeight",
          width: 150,
          align: "right",
          formatter(row,value){
            return (+value || 0).toFixed(1)
          }
        },
      ]
    }
  }

