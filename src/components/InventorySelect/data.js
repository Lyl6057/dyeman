/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:53
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-04 11:57:22
 */


export const matTypeEnum = {
    // 纱线
    1: {

    }
}



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

export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column:[
        {
            label: "材料名称",
            prop: "yarnsName",
            placeholder: " ",
            span: 6
        },
        {
            label: "纱牌",
            prop: "yarnsCard",
            placeholder: " ",
            span: 6
        },
        {
            label: "供应商批号",
            prop: "batId",
            placeholder: " ",
            span: 6
        },
        {
            label: "本厂批号",
            prop: "batchNo",
            placeholder: " ",
            span: 6
        },
        {
            label: "货位码",
            prop: "locationCode",
            placeholder: " ",
            span: 6
        }
    ]
  }
}


export function invCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        selection: true,
        column:[
            {
                label: "材料编号",
                prop:  'yarnsId', //"matCode",
                width: 100,
                overHidden: true
            },
            {
                label: "材料名称",
                prop:  "yarnsName", // "matName",
                width: 200,
                overHidden: true
            },
            {
                label: "本厂批号",
                prop: "batchNo",
                width: 100,
                overHidden: true
            },
            {
                label: "纱牌",
                prop: "yarnsCard",
                width: 100,
                overHidden: true
            },
            {
                label: "供应商批号",
                prop: "batId",
                width: 120,
                overHidden: true
            },
            {
                label: "库存数",
                prop: "weight",
                align: "right",
                width: 100,
                overHidden: true
            },
            {
                label: "重量",
                prop: "weightUnit",
                width: 100,
                overHidden: true
            },
            {
                label: "货位码",
                prop: "locationCode",
                width: 100,
                overHidden: true
            }
        ]
    }
}
