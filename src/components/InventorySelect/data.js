/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:53
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-12 17:26:25
 */
import {
    getDIC,
  } from "@/config/index";

export const matTypeEnum = {
    // 纱线
    0: {
        stockTableName: "viewYarnStock",
        materialIdKey: "yarnsId",
        materialNameKey: "yarnsName",
        locationCodeKey: "locationCode",
        weightKey: "weight"
    },
    // 化工
    3: {
        stockTableName: "viewChemicalStock",
        materialIdKey: "chemicalId",
        materialNameKey: "chemicalName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 染料
    4: {
        stockTableName: "viewDyestuffStock",
        materialIdKey: "chemicalId",
        materialNameKey: "chemicalName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 辅料
    5: {
        stockTableName: "viewAccessoriesStock",
        materialIdKey: "accessoriesId",
        materialNameKey: "accessoriesName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
    // 五金
    6: {
        stockTableName: "viewHardwareStock",
        materialIdKey: "accessoriesId",
        materialNameKey: "accessoriesName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
    },
     // 行政
    7: {
        stockTableName: "viewOfficeStock",
        materialIdKey: "officeId",
        materialNameKey: "officeName",
        locationCodeKey: "storageNo",
        weightKey: "stock"
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
            prop: matTypeEnum[_this.matType].materialNameKey,
            placeholder: " ",
            span: 6
        },
        {
            label: "纱牌",
            prop: "yarnsCard",
            placeholder: " ",
            span: 6,
            display: _this.matType != '0'
        },
        {
            label: "供应商批号",
            prop: "batId",
            placeholder: " ",
            span: 6,
            display: _this.matType == '0'
        },
        {
            label: "本厂批号",
            prop: "batchNo",
            placeholder: " ",
            span: 6
        },
        {
            label: "货位码",
            prop: matTypeEnum[_this.matType].locationCodeKey,
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
        height: "calc(100vh - 235px)",
        column:[
            {
                label: "材料编号",
                prop: matTypeEnum[_this.matType].materialIdKey,
                width: 100,
                overHidden: true
            },
            {
                label: "材料名称",
                prop: matTypeEnum[_this.matType].materialNameKey,
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
                overHidden: true,
                hide: _this.matType != '0'
            },
            {
                label: "供应商批号",
                prop: "batId",
                width: 120,
                overHidden: true,
                hide: _this.matType != '0'
            },
            {
                label: "库存数",
                prop: matTypeEnum[_this.matType].weightKey,
                align: "right",
                width: 100,
                overHidden: true,
                hide: _this.hideOtherCol
            },
            {
                label: "单位",
                prop: "weightUnit",
                width: 100,
                overHidden: true,
                type: "select",
                dicData: getDIC("bas_matUnit"),
                hide: _this.hideOtherCol
            },
            {
                label: "货位码",
                prop: matTypeEnum[_this.matType].locationCodeKey,
                width: 100,
                overHidden: true,
                hide: _this.hideOtherCol
            }
        ]
    }
}
