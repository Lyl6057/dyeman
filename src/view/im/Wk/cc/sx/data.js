import { getDIC, getXDicT, getDicT, postDicT } from "@/config/index";

let whsehouse = getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid");
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ccbh"),
        prop: "retCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "配料单号",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "2" ? true : false
      }
    ]
  };
}
export function rsxkr2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.ccbh"),
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
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        disabled: true,
        dicData: getDIC("Whse_out_type")
      },

      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prOn",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
      {
        label: "配料单号",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "1" || _this.hide === "2" ? true : false
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        span: 6,
        display: _this.hide === "5",
        type: "select",
        dicData: whsehouse
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        span: 6,
        display: _this.hide === "5",
        type: "select",
        dicData: whsehouse
      },
      {
        label: _this.$t("energy.bz"),
        prop: "retRemarks",
        cell: true,
        span: 12,
        placeholder: " ",
        disabled: false,
        display: _this.hide == "4" || _this.hide == "3"
      }
    ]
  };
}
export function rsxkr1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 230px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "whseRetyarninoid",
        prop: "whseRetyarninoid",
        hide: true
      },
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "创建日期",
        prop: "sysCreated",
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center"
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true
      },
      {
        label: _this.$t("whseField.ccbh"),
        prop: "retCode",
        cell: true,
        width: 160
      },
      {
        label: "出仓类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC("Whse_out_type")
      },
      {
        label: "出倉日期",
        prop: "retDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
        width: 190
      },

      {
        label: "配料单号",
        prop: "batchNumber",
        cell: true,
        width: 180,
        hide: _this.hide === "1" || _this.hide === "2" ? false : true
        // type: "select",
        // dicData:
        //   getDicT('basCustomer', 'custCode', 'custCode')
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 100,
        type: "select",
        dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid")
      }
    ]
  };
}
export function rsxkr2C(_this) {
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
        label: " ",
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "everySpindle",
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
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true
      },
      {
        label: "設備编号",
        prop: "equId",
        cell: false,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: false,
        width: 180,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: false,
        hide: _this.hide != "2",
        width: 120
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        hide: _this.hide != "2",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        hide: true,
        // hide: _this.hide != '4',
        width: 130
        // type: "select",
        // dicData: getDicT("whseYarnin/v1.0/list", "batchNo", "yinId"),
      },
      {
        label: "纱线系统编号",
        prop: "yarnsId",
        cell: false,
        width: 130
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: false,
        // width: 450,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
      },

      {
        label: "批次/批号",
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },

      {
        label: "纱线出仓",
        prop: "WhseRetyarninFk",
        hide: true,
        width: 100
      }
    ]
  };
}

let yarninDtl = getXDicT("whseYarninDtl/v1.0/list");
let yarnin = getXDicT("whseYarnin/v1.0/list");
// 退客人明细
export function rsxkr3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "retWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "traWeight",
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
        label: "whseRetreatDtloid",
        prop: "whseRetreatDtloid",
        hide: true
      },
      {
        label: "採購入庫編號",
        prop: "whseYarninDtlFk",
        cell: false,
        width: 150,
        props: {
          label: "whseYarninFk",
          value: "whseYarninDtloid"
        },
        type: "select",
        dicData: yarninDtl
      },
      {
        label: "採購入庫編號",
        prop: "whseYarninFk",
        cell: false,
        width: 150,
        props: {
          label: "yinId",
          value: "whseYarninoid"
        },
        type: "select",
        dicData: yarnin
      },
      {
        label: "纱线系统编号",
        prop: "yarnsId",
        cell: false,
        width: 140,
        type: "select",
        props: {
          label: "yarnsId",
          value: "whseYarninDtloid"
        },
        dicData: yarninDtl
      },
      {
        label: "纱线名稱",
        prop: "yarnsName",
        cell: false,
        // width: 140,
        type: "select",
        // props: {
        //   label: "yarnsName",
        //   value: "whseYarninDtloid"
        // },
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
        overHidden: true
      },
      {
        label: "批次/批号",
        prop: "batchNo",
        cell: false,
        width: 160,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseYarninDtloid"
        },
        dicData: yarninDtl
      },
      {
        label: "入倉重量",
        prop: "weight",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "weight",
          value: "whseYarninDtloid"
        },
        dicData: yarninDtl,
        hide: _this.hide == "4" || _this.hide == "3" ? false : true
      },
      {
        label: "退回重量",
        prop: "retWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide == "4" || _this.hide == "3" ? false : true
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "retCompany",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        hide: _this.hide == "4" || _this.hide == "3" ? false : true
      },
      {
        label: "调仓重量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != "5"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "traCompany",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        hide: _this.hide != "5"
      },

      {
        label: "退客人纱",
        prop: "whseRetreatFk",
        hide: true,
        width: 100
      }
    ]
  };
}
// 本廠配料
export function planCrud(_this) {
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
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        cell: false,
        width: 150
      },

      {
        label: "設備编号",
        prop: "equId",
        cell: false,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: false,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: false,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: false,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: false,
        width: 250
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: false,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: false,
        align: "right",
        width: 100
      }
    ]
  };
}
// 外廠配料
export function PlanOutCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "VWhseRetyarninoutPlanoid",
        prop: "VWhseRetyarninoutPlanoid",
        hide: true
      },
      {
        label: "外厂配料计划编号",
        prop: "retBatch",
        cell: true,
        width: 150
      },

      {
        label: "設備编号",
        prop: "equId",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 140
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100
      }
    ]
  };
}

export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        labelWidth: 150
      },
      {
        label: _this.$t("ProWorkflowInfo.sbbh"),
        prop: "equId",
        span: 6,
        display: _this.hide === "1" ? true : false,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.gcdh"),
        prop: "refCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        span: 6,
        placeholder: " "
      },
      {
        label: "纱线批号",
        prop: "batchNo",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function sxForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "纱线系统编号",
        prop: "yarnsId",
        span: 6,
        placeholder: " ",
        display: false
      },
      {
        label: "纱线名稱",
        prop: "yarnsName",
        span: 6,
        placeholder: " ",
        display: false
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

// 退客人纱
export function whseRetreatCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        cell: true,
        width: 150
      },

      {
        label: "設備编号",
        prop: "equId",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != "2"
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100
      }
    ]
  };
}
