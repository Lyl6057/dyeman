/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:26:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-30 11:15:55
 */

import {
    getDIC,
    getDicT
  } from "@/config/index";


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
            label: "生产单号",
            prop: "weaveJobCode",
            span: 4,
            placeholder: " ",
           },
           {
            label: "缸号",
            prop: "vatNo",
            span: 5,
            placeholder: " ",
           },
           {
            label: "备布单号",
            prop: "sheetNo",
            span: 4,
            placeholder: " ",
           },
           {
               label: "状态",
               span: 4,
               prop: "preState",
               type: "radio",
               dicData:getDIC("whse_prep_state")
           }
        ]
      };
}

// 待抽取列表
export function crudOp(_this) {
    return {
      ...mainCrudOpCommon,
      selection: false,
      column: [{
          label: "缸号",
          prop: "vatNo",
          width: 160
        },{
            label: "生产单号",
            prop: "weaveJobCode",
            width: 160
        },{
            label: "开单日期",
            prop: "workDate",
            width: 160
        },{
            label: "交货日期",
            prop: "deliveDate",
            width: 160
        },{
            label: "客户",
            prop: "custName",
            width: 160
        },{
            label: "订单编号",
            prop: "salPoNo",
            width: 160
        },{
            label: "预胚数量(KG)",
            prop: "clothWeight",
            width: 160,
            align: "right",
            formatter(r,v){
                return v && _this.$num2ThousandthFormat(v,1)
            }
        },{
            label: "备布单号",
            prop: "sheetNo",
            width: 160
        },{
            label: "状态",
            prop: "preState",
            width: 160,
            type: "select",
            dicData: getDIC("whse_prep_state"),
            align: "center"
        },{
            label: "备胚数量(KG)",
            prop: "preClothWeight",
            width: 160,
            align: "right",
            formatter(r,v){
                return v && _this.$num2ThousandthFormat(v,1)
            }
        }
        
      ]
    };
  }

// 查询表单皮配置
export function unCreateQueryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [ ]
      };
}

// 待抽取列表
export function unCreateCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    selection: true,
    column: [{
        label: "缸号",
        prop: "vatNo",
        width: 160
      },{
        label: "生产单号",
        prop: "weaveJobCode",
        width: 160
      },{
        label: "开单日期",
        prop: "workDate",
        width: 160,
        align: "center",
      },{
        label: "交货日期",
        prop: "deliveDate",
        width: 160,
        align: "center",
      },{
        label: "客户",
        prop: "custName",
        width: 160
      },{
        label: "订单编号",
        prop: "salPoNo",
        width: 160
      },{
        label: "预胚数量(KG)",
        prop: "clothWeight",
        width: 160,
        align: "right",
        formatter(r,v){
            return v && _this.$num2ThousandthFormat(v,1)
        }
      },
      
    ]
  };
}

export function formOp(_this, isEdit = false){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 120,
        column: [{
                label: "缸号",
                prop: "vatNo",
                span: 5,
                placeholder: " ",
                disabled: true
            },{
                label: "生产单号",
                prop: "weaveJobCode",
                span: 5,
                placeholder: " ",
                disabled: true
            },{
                label: "预胚数量(KG)",
                prop: "clothWeight",
                span: 5,
                placeholder: " ",
                disabled: true,
                row: true
            },{
                label: "备布日期",
                prop: "preDate",
                span: 5,
                placeholder: " ",
                type: "datetime",
                valueFormat: "yyyy-MM-dd",
                format: "yyyy-MM-dd"
            },{
                label: "胚布单号",
                prop: "sheetNo",
                span: 5,
                placeholder: " ",
                disabled: true,
            },{
                label: "备布数量(KG)",
                prop: "prepClothWeight",
                span: 5,
                placeholder: " ",
                disabled: true,
                formslot: true,
            },{
                label: "相差",
                prop: "diffWeight",
                span: 5,
                placeholder: " ",
                disabled: true
            },
        ]
    };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        page:false,
        index: true,
        column: [
            {
                label: "布票号",
                prop: "noteCode",
                width: 200,
                slot: true,
            },
            {
                label: "重量(KG)",
                prop: "realWeight",
                width: 100,
                align: "right",
                formatter(r,v) {
                    return v && _this.$num2ThousandthFormat(v,1)
                }
            },
            
        ]
    }
}


// 台账选择数据
export function clothNoteSelQueryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 120,
        column: [
            {
                label: "载具编号",
                prop: "storeLoadCode",
                span: 5
            },
            {
                label: "布票编号",
                prop: "noteCode",
                span: 5
            },
            {
                label: "机号",
                prop: "loomNo",
                span: 5
            },
            {
                label: "疋号",
                prop: "eachNumber",
                span: 5
            },
        ]
    }
}

export function clothNoteSelCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        page: true,
        selection: true,
        column: [{
            label: "載具編號",
            prop: "storeLoadCode",
            width: 150
        },{
            label: "布票號",
            prop: "noteCode",
            width: 180
        },{
            label: "機號",
            prop: "loomNo",
            width: 150
        },{
            label: "值機工號",
            prop: "workNo",
            width: 150
        },{
            label: "匹號",
            prop: "eachNumber",
            width: 150
        },{
            label: "毛重",
            prop: "gramWeight",
            width: 150
        },{
            label: "重量",
            prop: "clothWeight",
            width: 150
        },{
            label: "存儲位置",
            prop: "storeSiteCode",
            width: 150
        },{
            label: "備注",
            prop: "remark",
            overHide: true
        }]
    }
}

