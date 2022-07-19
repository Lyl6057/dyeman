/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-19 10:31:52
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
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
};

export function stkinMemoCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 275px)",
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
        label: "通知单数量(kg)",
        prop: "memoWeight",
        width: 150,
        align: "right",
        formatter(row,value){
          return (+value || 0).toFixed(1)
        }
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        width: 150,
      },
      {
        label: "入仓数量(kg)",
        prop: "whseInWeight",
        width: 150,
        align: "right"
      },
    ]
  }
}

export function stkinMemoQueryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "通知单日期",
      prop: "memoDate",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
      span: 5,
      placeholder: " ",
    }]

  }
}

export function unStoreFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "日期",
      prop: "lastCheckTime",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
      span: 6,
      placeholder: " ",
    }]

  }
}

export function unStoreCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 275px)",
    selection: true,
    index:false,
    column: [
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 120,
      },
      {
        label: "生产单号",
        prop: "weaveJobCode",
        width: 130,
      },
      {
        label: "已验布疋数",
        prop: "piCount",
        width: 120,
        align: "right"
      },
      {
        label: "最后验布时间",
        prop: "lastCheckTime",
        width: 180,
      },
      {
        label: "重量(kg)",
        prop: "realWeight",
        width: 120,
        align: "right"
      },
    ]
  }
}

// 
export function stkinMemoFormOp(_this) {
  return {
    ...formOpCommon,
    column: [{
      label: "入仓通知单编号",
      prop: "memoNo",
      labelWidth: "150",
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label: "通知单日期",
      prop: "memoDate",
      span: 6,
      placeholder: " ",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    }]
  }
}

// 明细数据
export function stkinMemoDtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "id",
    height: "calc(100vh - 150px)",
    column: [
      {
        label: "生产单号",
        prop: "weaveJobCode",
        width: 150
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 100
      },
      {
        label: "布票号",
        prop: "noteCode",
        width: 160
      },
      {
        label: "疋号",
        prop: "eachNumber",
        width: 100,
        align: "right"
      },
      {
        label: "胚布重量(kg)",
        prop: "clothWeight",
        width: 120,
        align: "right",
        formatter(row, value){
          return value && (+value || 0).toFixed(2)
        }
      }
    ]
  }
}

