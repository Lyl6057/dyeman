/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-08 10:19:30
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";

let typeOfDict = getDIC("pro_typeOf")

import { num2ThousandthFormat } from "@/utils/tools"

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




// 主页面查询表单皮配置
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
            label: "收货单号",
            prop: "receiveNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label: "收货日期",
            prop: "receiveDate",
            labelWidth: 150,
            type: "daterange",
            span: 6,
            placeholder: " ",
           },
           {
            label: "厂家送货单",
            prop: "deliveryNo",
            labelWidth: 150,
            span: 5,
            placeholder: " ",
           },
           {
            label: "审核状态",
            prop: "stockState",
            type: "select",
            span: 5,
            dicData: getDIC("pro_stockState"),
          },
        ]
      };
}

// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
        label: "收货单号",
        prop: "receiveNo",
        width: 160
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
      {
        label: "审核状态",
        prop: "stockState",
        type: "select",
        dicData: getDIC("pro_stockState"),
        width: 160,
        align: "center",
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        align: "center",
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
                label: "收货单号",
                prop: "receiveNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                disabled: true
            },
            {
                label: "收货日期",
                prop: "receiveDate",
                type: "date",
                valueFormat: "yyyy-MM-dd",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                rules:[
                    {required: true, message: "收货日期不能为空", triggle: "blue"}
                ],
                disabled: isEdit
            },
            {
                label: "厂家送货单",
                prop: "deliveryNo",
                labelWidth: 150,
                span: 5,
                placeholder: " ",
                rules:[
                    {required: true, message: "厂家送货单不能为空", triggle: "blue"}
                ],
                disabled: isEdit
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
        selection: true,
        page:false,
        rowKey: "proCollarAccountDtloid",
        column: [
            {
                label: "织单号",
                prop: "weaveJobCode",
                width: 150,
            },
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
                label: "计划条数",
                prop: "pcsNum",
                width: 120,
                align: "right",
                overHidden: true
            },
            {
                label: "单位",
                prop: "unit",
                width: 100,
                align: "center",
                overHidden: true,
                cell: true,
                placeholder: " "
            },
            {
                label: "实际条数",
                prop: "realPcsNum",
                width: 100,
                cell: true,
                align: "right",
                placeholder: " ",
                type: "number"
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
                cell: true,
                placeholder: " ",
                rules:[
                    {required: true, message: "包号不能为空", triggle: "blue"}
                ]
            },
            {
                label: "箱号",
                prop: "boxNo",
                width: 120,
                cell: true,
                placeholder: " "
            },
            
        ]
    }
}

// 未生成台账数据
export function unCreateFormOp(_this){
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

export function unCreateCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label: "织单号",
                prop: "weaveJobCode",
                width: "140"
            },
            {
                label: "加工厂",
                prop: "outFactoryName",
                width: "120"
            },
            {
                label: "订单号",
                prop: "salPoNo",
                width: "120",
                overHidden: true
            },
            {
                label: "胚布交期",
                prop: "calicoDate",
                width: "120",
                align: "center",
            },
            {
                label: "开单日期",
                prop: "billDate",
                width: "120",
                align: "center",
            },
            {
                label: "颜色",
                prop: "colorName",
                width: "120",
                overHidden: true
            },
            {
                label: "布类类别",
                prop: "fabricDesc",
                overHidden: true
            },
           
        ]
    }
}




