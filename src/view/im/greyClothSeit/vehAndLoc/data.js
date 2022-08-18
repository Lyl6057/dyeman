/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-16 10:26:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-17 18:09:58
 */
import { getDicNS } from "@/config/index";


let locDict = getDicNS(
    "whseLocation?warehouseType=1",
    "locationCode",
    "locationCode"
  )

// 表格公共配置
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
  
// 查询表单
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
                label: "织单号",
                prop: "weaveJobCode",
                span: 5,
                placeholder: " ",
            },
            {
                label: "整理日期",
                prop: "organizeDate",
                span: 6,
                placeholder: " ",
                type: "daterange",
            },
            {
                label: "载具编号",
                prop: "vehicle",
                span: 5,
                placeholder: " ",
               
            },
        ]
    };
}

export function mainCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        column: [{
            label: "载具编号",
            prop: "storeLoadCode",
            width: 180
          },
          {
            label: "整理日期",
            prop: "organizeDate",
            width: 120,
            align: "center",
          },
          {
            label: "原货位",
            prop: "locationCodeOld",
            width: 160,
            type: "select",
            dicData: locDict
          },
          {
            label: "新货位",
            prop: "locationCodeNew",
            width: 160,
            type: "select",
            dicData: locDict
          },
        ]
    }
}


// 新增表单维护
export function addFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 80,
        column: [{
                label: "来源",
                prop: "origin",
                span: 24,
                type: "radio",
                dicData: [
                    {label: "按织单号", value: 1},
                    {label: "按载具编号", value: 2},
                    {label: "按仓内码", value: 3, disabled: true},
                ],
                placeholder: " ",
                change: _this.handleTypeChange
            },
            {
                label: "单号",
                prop: "code",
                span: 6,
                placeholder: " ",
            },
            {
                label: "整理日期",
                prop: "organizeDate",
                span: 4,
                labelWidth: 100,
                type: "date",
                valueFormat: "yyyy-MM-dd",
                placeholder: " ",
            },
        ]
    };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        page: true,
        column: [{
            label: "载具编号",
            prop: "storeLoadCode",
            width: 180
          },
          {
            label: "原货位",
            prop: "locationCodeOld",
            width: 160,
            type: "select",
            dicData: locDict
          },
          {
            label: "新货位",
            prop: "locationCodeNew",
            width: 160,
            cell: true,
            type: "select",
            dicData: locDict
          },
          {
              label: "",
              prop: "operate",
              slot: true,
              width: 180
          }
        ]
    }
}

