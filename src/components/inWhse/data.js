/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-10 15:42:22
 * @Description:
 */

import { getDIC, getXDicT, getDicT, postDicT, getDbDicT } from '@/config/index'

let whsehouse = getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
let kindId = getDIC("bas_censorshipVarieties")
let yarnsType = getDIC("bas_yarnsType")
let calicoType = getDIC("bas_calicoType")
let matUnit = getDIC("bas_matUnit")
import store from '@/store/index' // 多語言 store.state
const lang = store.state.lang
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.clzl"),// "材料种类",
        prop: "kindId",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
      },
      {
        label: _this.$t("whseField.clbh"),//"材料编号",
        prop: "materialId",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.clmc"),//"材料名稱",
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
        label: _this.$t("whseField.ph"),//"批号",
        prop: "batchNo",
        cell: true,
        width: 160,
      },
      {
        label: _this.$t("whseField.qcsl"),//"期初数量",
        prop: "openingQty",
        cell: true,
        width: 120,
      },
      {
        label: _this.$t("whseField.ldzys"),// "老单占用数",
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.sxbh"),//"紗線編號",
        prop: "yarnsId",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.sxmc"),// "紗線名稱",
        prop: "yarnsName",
        cell: false,
        // width: 90,
      },
      {
        label: "批號",// "類別",
        prop: "batchNo",
        cell: false,
        width: 120,
      },
      {
        label: "重量",//"品种",
        prop: "weight",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: "單位",//"亮度",
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("matUnit"),
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.pbbh"),// "胚布編號",
        prop: "calicoId",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.pbmc"),// "胚布名稱",
        prop: "calicoName",
        cell: false,
        // width: 90,
      },
      {
        label: "批號",// "類別",
        prop: "batchNo",
        cell: false,
        width: 150,
      },
      {
        label: "重量",//"布品種",
        prop: "weight",
        cell: false,
        width: 120,
      },
      {
        label: "單位",// "結構",
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: matUnit,
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.ylbh"),// "原料编號",
        prop: "bcCode",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.ylmc"),//"原料名稱",
        prop: lang === '1' ? "cnnamelong" : lang === '2' ? "ennamelong" : "vinamelong",
        cell: false,
        width: 350,
      },
      {
        label: "批號",// "一級分類",
        prop: "batchNo",
        cell: false,
        width: 150,
      },
      {
        label: "重量",// "含固力/活力",
        prop: "vitality",
        cell: false,
        width: 150,
      },
      {
        label: _this.$t("whseField.yt"),// "用途",
        prop: "bcUse",
        cell: false,
        width: 120,
      },
      {
        label: _this.$t("whseField.wxdj"),// "危险等级",
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.ylbh1"),//"顏料编號",
        prop: "bcCode",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.ylmc1"),// "顏料名稱",
        prop: lang === '1' ? "cnnamelong" : lang === '2' ? "ennamelong" : "vinamelong",
        cell: false,
        width: 350,
      },
      {
        label: _this.$t("whseField.yjfl"),// "一級分類",
        prop: "bcClass",
        cell: false,
        type: "select",
        width: 120,
        dicData: getDIC("bas_PigmentClass"),
      },
      {
        label: _this.$t("whseField.lf"),//"力份",
        prop: "bcForce",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.sg"),// "色光",
        prop: "bcColor",
        cell: false,
        width: 120,
      },
      {
        label: _this.$t("whseField.sld"),//"色牢度",
        prop: "bcColorprison",
        cell: false,
        width: 120,
      },
      {
        label: _this.$t("whseField.wxdj"),// "危险等级",
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.flbh"),// "輔料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.flmc"),// "輔料名稱",
        prop: lang === '1' ? "cnnamelong" : lang === '2' ? "ennamelong" : "vinamelong",
        cell: false,
        width: 350,
      },
      {
        label: _this.$t("whseField.lb"),//"類別",
        prop: "basProductionaccFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basProductionacc", "topcategoryName", "basProductionaccoid")
      },
      {
        label: _this.$t("whseField.xh"),//"型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: _this.$t("whseField.gg"),// "规格",
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.clbh"),//"材料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.clmc"),//"材料名稱",
        prop: lang === '1' ? "chinName" : lang === '2' ? "engName" : "engName",
        cell: false,
        width: 350,
      },

      {
        label: _this.$t("whseField.lb"),// "類別",
        prop: "basHardwareFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basHardware", "topcategoryName", "basHardwareoid"),

      },
      {
        label: _this.$t("whseField.pp"),//"品牌",
        prop: "brand",
        cell: false,
        width: 120,
      },

      {
        label: _this.$t("whseField.xh"),// "型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: _this.$t("whseField.gg"),//"规格",
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
    height: "calc(100vh - 197px)",
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
        label: _this.$t("whseField.clbh"),//"材料编號",
        prop: "hardwareId",
        cell: false,
        width: 100,
      },
      {
        label: _this.$t("whseField.clmc"),//"材料名稱",
        prop: lang === '1' ? "chinName" : lang === '2' ? "engName" : "engName",
        cell: false,
        width: 350,
      },

      {
        label: _this.$t("whseField.lb"),// "類別",
        prop: "basAdsuppliesFk",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDicT("basAdsupplies", "topcategoryName", "basAdsuppliesoid")
      },
      {
        label: _this.$t("whseField.pp"),//"品牌",
        prop: "brand",
        cell: false,
        width: 120,
      },
      {
        label: _this.$t("whseField.xh"),//"型号",
        prop: "model",
        cell: false,
        width: 250,
      },
      {
        label: _this.$t("whseField.gg"),//"规格",
        prop: "itemspec",
        cell: false,
        width: 250,
      },

    ],
  }

}

