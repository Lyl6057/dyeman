/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:03:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-12 08:54:53
 * @Description:
 */

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    column: [
      {
        labelWidth: 120,
        label: "统计月份",
        prop: "searchMonth",
        type: "month",
        valueFormat: "MM",
        span: 8,
        placeholder: " "
      },
     
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    showSummary: true,
    sumColumnList: [
      {
        name: "sum",
        type: "sum",
        label: " "
      },
      {
        name: "weaveJobCode",
        type: "count",
        label: " "
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },
      {
        label: "织造生产单号",
        prop: "weaveJobCode",
        width: 150,
        overHidden: true,
        sortable: true,
        fixed: true
      }
    
    ]
  };
}
