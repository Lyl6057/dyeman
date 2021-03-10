/*
 * @Author: Lyl
 * @Date: 2021-02-25 09:13:34
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-05 11:51:30
 * @Description:
 */



import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let unit = getDIC("bas_matUnit") // 單位
export function sxForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出仓编号",
        prop: "retCode",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        disabled: true
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        disabled: true,
        dicData: getDIC('Whse_out_type'),
      },
      {
        label: "配料单号",
        prop: _this.tle === '紗線' ? "batchNumber" : "retBatch",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
      },

    ],
  }


}
export function sxCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'weight',
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
        label: "纱线编号",
        prop: "yarnsId",
        cell: false,
        width: 120,
      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: false,
        width: 450,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
      },

      {
        label: "批次/批号",
        prop: "batchNo",
        cell: false,
        width: 180,
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit,
      },
    ],
  }

}

export function pbCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
    ],
    column: [{
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
      prop: "clothName",
      cell: false,
      width: 650,
      type: "select",
      // props: {
      //   label: "yarnsName",
      //   value: "yarnsId"
      // },
      dicData: getDicT("basCalico", "calicoName", "calicoId")
    },
    ]
  }

}
export function pbDtlbCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "批號",
      prop: "batchNo",
      cell: false,
      width: 160,
    },
    {
      label: "疋號",
      prop: "countingNo",
      cell: false,
      width: 80,
      align: "right",
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: "right",
    },
    {
      label: "單位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: unit
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      cell: false,
      width: 140,
    },

    ],
  }

}

let basChemicalmat = getXDicT("BasChemicalmatNew") // 化工原料

export function hgylCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },

    {
      label: "原料編號",
      prop: "chemicalId", // bcCode
      cell: false,
      width: 100,
    },
    {
      label: "原料名稱",
      prop: "chemicalName",//CNNameLong
      cell: false,
      width: 250,
    },
    {
      label: "英文名稱",
      prop: "ennamelong",
      cell: false,
      width: 250,
      props: {
        label: "ennamelong",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    {
      label: "型号",
      prop: "modeltype",
      cell: false,
      width: 120,
      props: {
        label: "modeltype",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    {
      label: "含固力/活力",
      prop: "vitality",
      cell: false,
      width: 120,
      props: {
        label: "vitality",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    ]
  }

}
export function hgylDtlbCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 238px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: "产地",
      prop: "origin",
      cell: true,
      width: 120,
      type: 'select',
      dicData: getDIC('Whse_Origin'),
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 120,
      align: "right",
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: unit,

    },

    ],
  }

}
let basPigment = getXDicT("basPigment") // 颜料
export function ylCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },

    {
      label: "原料編號",
      prop: "chemicalId", // bcCode
      cell: false,
      width: 100,
    },
    {
      label: "原料名稱",
      prop: "chemicalName",//CNNameLong
      cell: false,
      width: 250,
    },
    {
      label: "英文名稱",
      prop: "ennamelong",
      cell: false,
      width: 250,
      props: {
        label: "ennamelong",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
    },
    {
      label: "色光",
      prop: "bcColor",
      cell: false,
      width: 120,
      props: {
        label: "bcColor",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
    },
    {
      label: "力份",
      prop: "bcForce",
      cell: false,
      width: 120,
      props: {
        label: "bcForce",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
    },
    ]
  }

}
export function ylDtlbCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: "产地",
      prop: "origin",
      cell: true,
      width: 120,
      type: 'select',
      dicData: getDIC('Whse_Origin'),
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 120,
      align: "right",
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: unit,

    },

    ],
  }

}

