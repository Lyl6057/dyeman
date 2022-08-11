/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-11 09:23:25
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";


import { num2ThousandthFormat } from "@/utils/tools"

const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 230px)",
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



// 主界面查询表单
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "入仓编号",
            prop: "whseInNo",
            span: 4,
            placeholder: " ",
           },
           {
            label: "入仓日期",
            prop: "whseInDate",
            type: "daterange",
            span: 5,
            placeholder: " ",
           },
           {
            label: "检验状态",
            prop: "stockState",
            span: 4,
            type: "select",
            dicData: getDIC("pro_stockState"),
            placeholder: " ",
        },
        ]
      };
}

// 待抽取列表
export function crudOp(_this) {
    return {
      ...mainCrudOpCommon,
      selection: false,
      column: [{
          label: "入仓编号",
          prop: "whseInNo",
          width: 160
        },
        {
            label: "入仓类型",
            prop: "whseInType",
            width: 160,
            type: "select",
            align: "center",
            dicData: getDIC("whse_flatType")
        },
        {
            label: "入仓日期",
            prop: "whseInDate",
            align: "center",
            width: 160
        },
        {
            label: "加工厂",
            prop: "factoryName",
            width: 160
        },
        {
            label: "检验状态",
            prop: "stockState",
            width: 160,
            align: "center",
            type: "select",
            dicData: getDIC("pro_stockState")
        },
        {
            label: "操作员",
            prop: "sysCreatedby",
            width: 160,
            type: "select",
            dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        },
      ]
    };
  }

// 查询表单皮配置
export function unCreateQueryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "收货单号",
            prop: "receiveNo",
            span: 5,
            placeholder: " ",
           },
           {
            label: "送货单号",
            prop: "deliveryNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
        ]
      };
}

// 待抽取列表
export function unCreateCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    selection: true,
    column: [{
        label: "收货单号",
        prop: "receiveNo",
        width: 160
      },
      {
        label: "订单编号",
        prop: "salPoNo",
        width: 120,
        overHidden: true
      },
      {
        label: "收货日期",
        prop: "receiveDate",
        width: 160,
        align: "center",
      },
      {
        label: "厂家发货码",
        prop: "deliveryNo",
        width: 160,
      },
      {
        label: "箱数",
        prop: "boxNum",
        width: 100,
        align: "right",
      },
      {
        label: "总包数",
        prop: "packageNum",
        width: 100,
        align: "right",
      },
    ]
  };
}

export function formOp(_this, isEdit = false){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
                label: "入仓编号",
                prop: "whseInNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
            },
            {
                label: "入仓日期",
                prop: "whseInDate",
                type: "date",
                valueFormat: "yyyy-MM-dd",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                rules:[
                    {required: true, message: "入仓日期不能为空", triggle: "blue"}
                ],
                disabled: isEdit
            },
            {
                label: "收货单号",
                prop: "receiveNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
            },
            {
                label: "操作员",
                prop: "sysCreatedby",
                span: 5,
                type: "select",
                dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
                disabled: true,
            },
        ]
    };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        showSummary: true,
        page:false,
        rowKey: "whseFlatClothInDtloid",
        sumColumnList: [
            {label: " ",name: "weight", type: "sum"},
            {label: " ",name: "inPcsNum", type: "sum"},
        ],
        column: [
            {
                label: "部位",
                prop: "pos",
                width: 100,
            },
            {
                label: "尺寸",
                prop: "size",
                width: 100,
                overHidden: true
            },

            {
                label: "单位",
                prop: "numUnit",
                width: 100,
                align: "center",
                overHidden: true,
                cell: true,
                placeholder: " "
            },
            {
                label: "入仓数量",
                prop: "inPcsNum",
                width: 100,
                cell: true,
                align: "right",
                placeholder: " ",
                formatter(r,v){
                    return num2ThousandthFormat(v,0)
                },
            },
            {
                label: "重量",
                prop: "weight",
                cell: true,
                width: 100,
                align: "right",
                formatter(r,v){
                    return num2ThousandthFormat(v,1)
                },
                overHidden: true,
                placeholder: " ",
                type: "number"
            },
            {
                label: "包号",
                prop: "packageNo",
                width: 100,
                placeholder: " ",
            },
            {
                label: "箱号",
                prop: "boxNo",
                width: 120,
                placeholder: " "
            },
            
        ]
    }
}





