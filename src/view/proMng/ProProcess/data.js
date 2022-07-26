/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-26 11:59:09
 */


import { getDicT} from "@/config";

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


let cust = getDicT("basCustomer", "custName", "custCode");


export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 315px)",
    column: [{
        label: "生产通知单号",
        prop: "poNo",
        width: 150,
        overHidden: true,
      },
      {
        label: "版本号",
        prop: "verNo",
        width: 80,
        align: "center"
      },
      {
        label: "客单号",
        prop: "custOrderno",
        width: 150,
        overHidden: true,
      },
      {
        label: "营销订单号",
        prop: "contractNo",
        width: 150,
        overHidden: true,
      },
      {
        label: "走货日期",
        prop: "shipDate",
        width: 100,
        overHidden: true,
      },
      {
        label: "走货数量(kg)",
        prop: "shipQtyKg",
        width: 120,
        overHidden: true,
        align: "right"
      },
    ]
  }
}

export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "走货期",
      prop: "shipDate",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
      span: 6,
      placeholder: " ",
    },
    {
      label: "客户",
      prop: "custId",
      type: "select",
      dicData: cust,
      span: 4,
      placeholder: " ",
    },
    {
      label: "客单号",
      prop: "custOrderno",
      span: 4,
      placeholder: " ",
    },
    {
      label: "营销订单号",
      prop: "contractNo",
      span: 4,
      placeholder: " ",
    },
    {
      label: "生产通知单",
      prop: "poNo",
      span: 4,
      placeholder: " ",
    },
    {
      labelWidth: "120",
      label: "已入进度资料",
      prop: "isEdit",
      span: 4,
      type: "select",
      dicData: [
        {value: 1, label: "是"},
        {value: 2, label: "否"},
      ],
      placeholder: " ",
    }]

  }
}

export function dataFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "生产通知单号",
      prop: "poNo",
      span: 4,
      disabled: true,
      labelWidth: "120",
      placeholder: " "
    },
    {
      label: "版本号",
      prop: "verNo",
      span: 4,
      disabled: true,
      placeholder: " "
    },
    {
      label: "走货日期",
      prop: "shipDate",
      span: 4,
      disabled: true,
      placeholder: " "
    },
    {
      label: "走货数量(kg)",
      prop: "shipQtyKg",
      span: 4,
      disabled: true,
      labelWidth: "110",
      placeholder: " "
    },
    ]
  }
}

export function dtlCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    index: false,
    height: "calc(100vh - 255px)",
    column: [{
        label: "进度节点名称",
        prop: "processSetcode",
        width: 150,
        overHidden: true,
        align: "center",
        slot: true
      },
      {
        label: "进度日期",
        prop: "processDateValue",
        width: 150,
        type: "date",
        valueFormat: "yyyy-MM-dd",
        overHidden: true,
        cell: true,
        placeholder: " "
      },
      {
        label: "进度备注",
        prop: "processRemarks",
        cell: true,
        placeholder: " "
      }
    ]
  }
}
