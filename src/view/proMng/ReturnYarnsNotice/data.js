/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-18 10:27:34
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";

let typeOfDict = getDIC("pro_typeOf")

const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: true,
  showSummary: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}

// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
        label: "退纱通知单编号",
        prop: "withdrawalNo",
        width: 160
      },
      {
        label: "退纱日期",
        prop: "happenDate",
        width: 160,
      },
      {
        label: "退纱类型",
        prop: "typeOf",
        width: 160,
        type: "select",
        dicData: typeOfDict,
      },
      {
        label: "外发厂",
        prop: "extFactId",
        width: 160,
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
      },
      {
        label: "已入仓",
        prop: "isInStock",
        width: 160,
        formatter:(row, value) => {
            return value ? '√' : "×"
        },
        align: "center"
      },
    ]
  };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        page:false,
        rowKey: "proYarnsWithdrawalDtloid",
        column: [
            {
                label: "织单号",
                prop: "weaveJobCode",
                width: 150,
                cell: true,
            },
            {
                label: "纱线编号",
                prop: "yarnsId",
                width: 100,
            },
            {
                label: "纱线名称",
                prop: "yarnsName",
                width: 350,
                overHidden: true
            },
            {
                label: "纱牌",
                prop: "yarnsCard",
                width: 80,
            },
            {
                label: "供应商批号",
                prop: "suppBatNo",
                width: 180,
                overHidden: true
            },
            {
                label: "本厂批号",
                prop: "batchNo",
                width: 100,
            },
            {
                label: "退纱数量",
                prop: "weight1",
                width: 120,
                type: "number",
                cell: true,
            },
            {
                label: "借纱退回数量",
                prop: "weight2",
                width: 120,
                type: "number",
                cell: true,
            },
            {
                label: "单位",
                prop: "weightUnit",
                width: 100,
                type: "select",
                dicData: getDIC("bas_matUnit"),
            },
            {
                label: "件数",
                prop: "cartonNumber",
                width: 80,
                type: "number",
                cell: true,
            },
            {
                label: "包装规格",
                prop: "packSize",
                width: 120,
                cell: true,
                type: "select",
                dicData: getDIC("bas_yarnPackUnit")
            }
        ]
    }
}

// 主页面查询表单皮配置
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "退纱通知单编号",
            prop: "withdrawalNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label: "退纱日期",
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
           },
           {
            label: "织单号",
            prop: "weaveJobCode",
            span: 5,
            placeholder: " ",
           },
           {
            label: "退纱类型",
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
           }
        ]
      };
}

// 通知单维护配置
export function withDrawalFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "退纱通知单编号",
            prop: "withdrawalNo",
            disabled: true,
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label: "退纱日期",
            prop: "happenDate",
            type: "date",
            valueFormat: "yyyy-MM-dd",
            span: 5,
            placeholder: " ",
           },
           {
            label: "退纱类型",
            prop: "typeOf",
            span: 5,
            type: "select",
            dicData: typeOfDict,
            placeholder: " ",
           },
           {
            label: "外发加工厂",
            prop: "extFactId",
            labelWidth: 150,
            span: 12,
           }
        ]
      };
}


// 领纱单配置
export function retYarnFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column:[
            {
                label: "织单号",
                prop: "weaveJobCode",
                span: 6
            }
        ]
    }
}

export function retYarnCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label: "织单号",
                prop: "weaveJobCode",
                width: 120,
                cell: true,
            },
            {
                label: "纱线编号",
                prop: "yarnsId",
                width: 120,
            },
            {
                label: "纱线名称",
                prop: "yarnsName",
                width: 200,
                overHidden: true
            },
            {
                label: "纱牌",
                prop: "yarnBrand",
                width: 120,
            },
            {
                label: "供应商批号",
                prop: "suppBatchNo",
                width: 120,
                overHidden: true
            },
            {
                label: "本厂批号",
                prop: "batchNo",
                width: 120,
            },
            {
                label: "领纱数量",
                prop: "totalWeight",
                width: 120,
            },
            {
                label: "单位",
                prop: "unitName",
                width: 120,
            },
        ]
    }
}


// 纱线库存表单配置
export function yarnStockFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column:[
            {
                label: "纱线编号",
                prop: "yarnId",
                span: 6
            },
            {
                label: "纱线名称",
                prop: "yarnName",
                span: 6
            }
        ]
    }
}

export function yarnStockCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label: "纱线编号",
                prop: "yarnsId",
                width: 120,
            },
            {
                label: "纱线名称",
                prop: "yarnsName",
                width: 200,
                overHidden: true
            },
            {
                label: "纱牌",
                prop: "yarnsCard",
                width: 120,
            },
            {
                label: "供应商批号",
                prop: "batId",
                width: 120,
                overHidden: true
            },
            {
                label: "本厂批号",
                prop: "batchNo",
                width: 120,
            },
            {
                label: "库存数",
                prop: "weight",
                width: 120,
                type: "number",
                align: "right",
                
            },
            {
                label: "单位",
                prop: "weightUnit",
                type: "select",
                dicData: getDIC("bas_matUnit"),
                width: 120,
            },
        ]
    }
}