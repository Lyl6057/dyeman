/*
 * @Author: Lyl
 * @Date: 2021-02-25 09:13:34
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-12 16:44:35
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let unit = getDIC("bas_matUnit"); // 單位
export function sxForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ccbh"), // "出仓编号",
        prop: "retCode",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.ccrq"), // "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: _this.$t("whseField.cclx"), //"出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        disabled: true,
        dicData: getDIC("Whse_out_type")
      },
      {
        label: _this.$t("whseField.pldh"), // "配料单号",
        prop: _this.tle === _this.$t("iaoMng.sx") ? "batchNumber" : "retBatch",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.czy"), // "操作员",
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      }
    ]
  };
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
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.sxbh"), // "纱线编号",
        prop: "yarnsId",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"), //"纱线名称",
        prop: "yarnsName",
        cell: false,
        width: 450,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
      },

      {
        label: _this.$t("whseField.ph"), // "批次/批号",
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.zl"), //"重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"), //"单位",
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit
      }
    ]
  };
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
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.pbbh"), //"胚布編號",
        prop: "calicoId",
        cell: false,
        width: 100
      },
      {
        label: _this.$t("whseField.pbmc"), //"胚布名稱",
        prop: "clothName",
        cell: false,
        width: 650,
        type: "select",
        // props: {
        //   label: "yarnsName",
        //   value: "yarnsId"
        // },
        dicData: getDicT("basCalico", "calicoName", "calicoId")
      }
    ]
  };
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
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.ph"), // "批號",
        prop: "batchNo",
        cell: false,
        width: 160
      },
      {
        label: _this.$t("whseField.ph2"), //"疋號",
        prop: "countingNo",
        cell: false,
        width: 80,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"), // "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"), // "單位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: unit
      },
      {
        label: _this.$t("whseField.krbph"), //"客人布票号",
        prop: "custTicket",
        cell: false,
        width: 140
      }
    ]
  };
}

let basChemicalmat = getXDicT("BasChemicalmatNew"); // 化工原料

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
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.ylbh"), //"原料編號",
        prop: "chemicalId", // bcCode
        cell: false,
        width: 100
      },
      {
        label: _this.$t("whseField.ylmc"), //"原料名稱",
        prop: "chemicalName", //CNNameLong
        cell: false,
        width: 250
      },
      {
        label: _this.$t("whseField.ywmc"), //"英文名稱",
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
        label: _this.$t("whseField.xh"), //"型号",
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
        label: _this.$t("whseField.hglhl"), //"含固力/活力",
        prop: "vitality",
        cell: false,
        width: 120,
        props: {
          label: "vitality",
          value: "bcCode"
        },
        type: "select",
        dicData: basChemicalmat
      }
    ]
  };
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
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.ph"), //"批号",
        prop: "batchNo",
        cell: true,
        width: 220
      },
      {
        label: _this.$t("whseField.cd"), // "产地",
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_Origin")
      },
      {
        label: _this.$t("whseField.zl"), //"重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"), //"单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: unit
      }
    ]
  };
}
let basPigment = getXDicT("basPigment"); // 颜料
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
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },

      {
        label: _this.$t("whseField.ylbh"), //"原料編號",
        prop: "chemicalId", // bcCode
        cell: false,
        width: 100
      },
      {
        label: _this.$t("whseField.ylmc"), // "原料名稱",
        prop: "chemicalName", //CNNameLong
        cell: false,
        width: 250
      },
      {
        label: _this.$t("whseField.ywmc"), // "英文名稱",
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
        label: _this.$t("whseField.sg"), //"色光",
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
        label: _this.$t("whseField.lf"), //"力份",
        prop: "bcForce",
        cell: false,
        width: 120,
        props: {
          label: "bcForce",
          value: "bcCode"
        },
        type: "select",
        dicData: basPigment
      }
    ]
  };
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
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.ph"), // "批号",
        prop: "batchNo",
        cell: true,
        width: 220
      },
      {
        label: _this.$t("whseField.cd"), // "产地",
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_Origin")
      },
      {
        label: _this.$t("whseField.zl"), //"重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"), // "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: unit
      }
    ]
  };
}
