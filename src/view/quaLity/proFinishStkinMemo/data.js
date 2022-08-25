/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-24 10:33:27
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
        align: "center"
      },
      {
        label: "通知单数量(kg)",
        prop: "memoWeight",
        width: 150,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        width: 150,
        align: "center"
      },
      {
        label: "入仓数量(kg)",
        prop: "whseInWeight",
        width: 150,
        align: "right",
        formatter(r,v){
          return v && _this.$num2ThousandthFormat(v,1)
        }
        
      },
      {
        label: "生成时间",
        prop: "sysCreated",
        width: 170,
        align: "center"
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
      span: 6,
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
    },
    {
      prop: "vatNo",
      label: "缸号",
      span: 6
    }
  ]

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
        label: "缸号",
        prop: "vatNo",
        width: 150,
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 120,
        overHidden: true
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
        label: "缸号",
        prop: "vatNo",
        width: 170
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 150,
        overhidden: true
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 180,
        overHidden: true,
      },
      {
        label: "疋号",
        prop: "pidNo",
        width: 100,
        align: "right"
      },
      {
        label: "净重量(kg)",
        prop: "netWeight",
        width: 120,
        align: "right",
        formatter(row, value){
          return value && (+value || 0).toFixed(2)
        }
      }
    ]
  }
}

