/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-25 17:58:46
 * @Description:
 */

import { getDIC, getXDicT, getDicT, postDicT, getDbDicT } from '@/config/index'

let whsehouse = getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
let kindId = getDIC("bas_censorshipVarieties")
let yarnsType = getDIC("bas_yarnsType")
let calicoType = getDIC("bas_calicoType")
let matUnit = getDIC("bas_matUnit")
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "材料种类",
        prop: "kindId",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
      },
      {
        label: "材料编号",
        prop: "materialId",
        span: 6,
        placeholder: " "
      },
      {
        label: "材料名稱",
        prop: "materialName",
        span: 12,
        placeholder: " ",
      },
    ],
  }
}
export function crudTemOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 236px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'openingQty',
        type: 'sum',
      }, {
        label: ' ',
        name: 'oldpooccupyqty',
        type: 'sum',
      },
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 160,
      },
      {
        label: "期初数量",
        prop: "openingQty",
        cell: true,
        width: 120,
      },
      {
        label: "老单占用数",
        prop: "oldpooccupyqty",
        cell: false,
        width: 120,
      },

    ],
  }

}

export function sxOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "紗線編號",
        prop: "yarnsId",
        cell: false,
        width: 100,
      },
      {
        label: "紗線名稱",
        prop: "yarnsName",
        cell: false,
        // width: 90,
      },
      {
        label: "類別",
        prop: "yarnsType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("bas_yarnsType"),
      },
      {
        label: "品种",
        prop: "yarnsKind",
        cell: false,
        type: "select",
        dicData: [],
        width: 120,
        dicData: getDIC("bas_yarnsKind"),
      },
      {
        label: "等级",
        prop: "yarnsGrade",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_yarnsGrade"),
      },
      {
        label: "亮度",
        prop: "yarnsBright",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_yarnsBright"),
      },
    ],
  }

}

export function pbOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "胚布編號",
        prop: "calicoId",
        cell: false,
        width: 100,
      },
      {
        label: "胚布名稱",
        prop: "calicoName",
        cell: false,
        // width: 90,
      },
      {
        label: "類別",
        prop: "calicoType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("bas_calicoType"),
      },
      // {
      //   label: "布類型",
      //   prop: "basEmbryoidclothFk",
      //   cell: false,
      //   type: "select",
      //   width: 120,
      //   dicData: getDIC("bas_yarnsType"),
      // },
      {
        label: "布品種",
        prop: "fabricsDesc",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_clothorg"),
      },
      {
        label: "結構",
        prop: "structureId",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_calicoStructure"),
      },
    ],
  }

}

export function hgylOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "原料编號",
        prop: "bcCode",
        cell: false,
        width: 100,
      },
      {
        label: "原料名稱",
        prop: "cnnamelong",
        cell: false,
        width: 250,
      },
      {
        label: "一級分類",
        prop: "bcClass",
        cell: false,
        type: "select",
        width: 120,
        dicData: getDIC("bas_chemicalClass"),
      },
      {
        label: "含固力/活力",
        prop: "vitality",
        cell: false,
        width: 150,
      },
      {
        label: "用途",
        prop: "bcUse",
        cell: false,
        width: 120,
      },
      {
        label: "危险等级",
        prop: "dangerlevel",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_chemicalDanger"),
      },
    ],
  }

}

export function ylOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "顏料编號",
        prop: "bcCode",
        cell: false,
        width: 100,
      },
      {
        label: "顏料名稱",
        prop: "cnnamelong",
        cell: false,
        width: 180,
      },
      {
        label: "一級分類",
        prop: "bcClass",
        cell: false,
        type: "select",
        width: 120,
        dicData: getDIC("bas_PigmentClass"),
      },
      {
        label: "力份",
        prop: "bcForce",
        cell: false,
        width: 100,
      },
      {
        label: "色光",
        prop: "bcColor",
        cell: false,
        width: 120,
      },
      {
        label: "色牢度",
        prop: "bcColorprison",
        cell: false,
        width: 120,
      },
      {
        label: "危险等级",
        prop: "bcDangerlevel",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_chemicalDanger"),
      },
    ],
  }

}

export function flOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "輔料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: "輔料名稱",
        prop: "chinName",
        cell: false,
        width: 180,
      },
      {
        label: "類別",
        prop: "basProductionaccFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basProductionacc", "topcategoryName", "basProductionaccoid")
      },
      {
        label: "型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: "规格",
        prop: "itemspec",
        cell: false,
        width: 250,
      },

    ],
  }

}
export function wjOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "材料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: "材料名稱",
        prop: "chinName",
        cell: false,
        width: 180,
      },

      {
        label: "類別",
        prop: "basHardwareFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basHardware", "topcategoryName", "basHardwareoid"),

      },
      {
        label: "品牌",
        prop: "brand",
        cell: false,
        width: 120,
      },

      {
        label: "型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: "规格",
        prop: "itemspec",
        cell: false,
        width: 250,
      },

    ],
  }

}
export function xzOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "材料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: "材料名稱",
        prop: "chinName",
        cell: false,
        width: 180,
      },

      {
        label: "類別",
        prop: "basAdsuppliesFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basAdsupplies", "topcategoryName", "basAdsuppliesoid")
      },
      {
        label: "品牌",
        prop: "brand",
        cell: false,
        width: 120,
      },
      {
        label: "型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: "规格",
        prop: "itemspec",
        cell: false,
        width: 250,
      },

    ],
  }

}

