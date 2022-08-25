/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:03:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-14 16:30:45
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

export function num2Thousadth(r, v) {
  return v && Number(v).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        name: "weaveJobCode",
        type: "count",
        label: " "
      },
      {
        name: "amount",
        type: "sum",
        label: " "
      },
      {
        name: "totalWeight",
        type: "sum",
        label: " "
      },
      {
        name: "subSum",
        type: "sum",
        label: " "
      },
      {
        name: "debtWeight",
        type: "sum",
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
        fixed: true
      },
      {
        label: "所需总数",
        prop: "amount",
        width: 100,
        overHidden: true,
        fixed: true,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "合计已织产量",
        prop: "totalWeight",
        width: 120,
        overHidden: true,
        fixed: true,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "当月合计",
        prop: "subSum",
        width: 100,
        overHidden: true,
        fixed: true,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "欠数",
        prop: "debtWeight",
        width: 100,
        overHidden: true,
        fixed: true,
        slot: true,
        align: "right",
        formatter: num2Thousadth
      },
      {
        label: "筒径",
        prop: "cylinderInch",
        width: 70,
        overHidden: true,
        align: "center",
      },
      {
        label: "针寸数",
        prop: "needleInch",
        width: 100,
        overHidden: true,
        align: "center",
      },
      {
        label: "总针数",
        prop: "needleNumber",
        width: 100,
        align: "center",
      },
      {
        label: "布类",
        prop: "fabricDesc",
        width: 200,
        overHidden: true,
        align: "left",
      },



    ]
  };
}
