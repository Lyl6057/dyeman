import { getDIC, getDicT, postDicT, getXDicT, getDbDicT } from "@/config";

let matUnit = getDIC("bas_matUnit");
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: _this.hide === "1" ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? false : true
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   span: 6,
      //   placeholder: " ",
      //   type: "datetime",
      //   display: _this.hide === "6" ? false : true,
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      // },

      // {
      //   label: "出倉类型",
      //   prop: "retType",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: _this.hide === '1' ? getDIC("whse_stock_type") : getDIC('Whse_out_type'),
      //   // display: _this.hide === "1" ? true : false
      // },
      {
        label: _this.hide === "1" ? "领用人" : _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: _this.hide === "1" ? true : false,
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData:
        //   postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
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
        label: "出倉编号",
        prop: _this.hide === "1" ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        // disabled: !_this.isPlan && !_this.isAdd,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "出仓方式",
        prop: "stockType",
        span: 6,
        type: "select",
        change: val => {
          _this.changeRet(val.value);
        },
        disabled: _this.hide === "1" && _this.isAdd ? false : true,
        display: _this.hide != "1" ? false : true,
        dicData: getDIC("whse_stock_type")
      },

      {
        label: "申购单",
        prop: "appId",
        span: 6,
        click: () => {
          if (_this.form.stockType === "2") {
            return;
          }
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "spNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.mx = [];
          if (_this.form.stockType === "1") {
            _this.choiceQ.purCategory = "3";
            _this.choiceTle = "申购单";
          } else {
            _this.choiceTle = _this.$t("choicDlg.xzsqlyd");
          }
        },
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd
      },
      {
        label: "配料單號",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false,
        disabled: !_this.isAdd
      },

      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceQ = {};
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.form;
          _this.choiceTle = "领用人";
        },
        display: _this.hide === "6" || _this.hide === "1" ? true : false
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: _this.$t("energy.bz"),
        prop: _this.hide === "4" ? "retRemarks" : "traRemarks",
        span: 12,
        placeholder: " ",
        display: _this.hide === "4" || _this.hide === "5"
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
    height: "calc(100vh - 202px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "whseMaterialoid",
        prop: "whseMaterialoid",
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
        prop: _this.hide === "1" ? "stockId" : "retCode",
        cell: true,
        width: 180,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: _this.$t("whseField.ccbh"),
        prop: "woOutno",
        cell: true,
        width: 180,
        hide: _this.hide != "6" ? true : false
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        width: 90,
        dicData: getDIC("Whse_out_type")
      },
      {
        label: "出倉方式",
        prop: "stockType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC("whse_stock_type"),
        hide: _this.hide != "1"
      },

      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
        width: 200,
        hide: _this.hide === "6"
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   cell: true,
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   align: "center",
      //   hide: _this.hide != '6',
      //   width: 200,
      // },

      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "领用人",
        prop: "leader",
        cell: true,
        width: 140,
        type: "select",
        dicData: postDicT("perPersonList", "perName", "perPersonoid"),
        hide: _this.hide === "1" ? false : true
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus"),
        hide: _this.hide != "6",
        width: 120
      },

      {
        label: _this.$t("energy.bz"),
        prop: _this.hide === "4" ? "retRemarks" : "traRemarks",
        span: 6,
        cell: true,
        placeholder: " ",
        hide: _this.hide == "4" || _this.hide == "5" ? false : true,
        width: 500
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        type: "select",
        dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid")
        // hide: _this.hide === '6' || _this.hide === '1' ? false : true
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
    height: _this.hide === "1" ? "calc(100vh - 320px)" : "calc(100vh - 237px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "qty",
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
        label: "加工廠代號",
        prop: "refCode",
        cell: false,
        width: 120,
        hide: _this.hide === "1"
      },
      {
        label: _this.$t("whseField.wfjgc"),
        prop: "refName",
        cell: false,
        width: 150,
        hide: _this.hide === "1"
      },
      {
        label: _this.$t("whseField.flbh"),
        prop: "matId",
        cell: false,
        width: 250
      },
      {
        label: _this.$t("whseField.flmc"),
        prop: "matName",
        cell: false,
        width: 280
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("energy.sl"),
        prop: "qty",
        hide: false,
        width: 110
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "qtyUnit",
        hide: false,
        width: 110,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
export function rcpb3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height:
      _this.hide === "1" || _this.hide === "2"
        ? "calc(100vh - 330px)"
        : "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseCalicoinDtlbOid",
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
        label: "来胚入仓批号资料OID",
        prop: " whseCalicoinDtlbOid",
        hide: true
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prodNo",
        cell: true,
        width: 180,
        hide: _this.hide != "6" ? true : false,
        type: "select",
        dicData: getDicT(
          "whseCalicoinDtla/v1.0/list",
          "prodNo",
          "whseCalicoinDtlaoid"
        )
      },
      {
        label: _this.$t("whseField.ph2"),
        prop: "countingNo",
        cell: true,
        width: 80,
        align: "right"
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: _this.$t("whseField.zldw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: matUnit
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: _this.$t("whseField.krbph"),
        prop: "custTicket",
        cell: true,
        width: 150
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      }
    ]
  };
}

let rsxkr3CDic = getXDicT("whseAccessoriesIn");
let basWjxz = getDbDicT("basHardwarearticles", "basAdsuppliesarticles");
// 退供应商、客人明细
export function rsxkr3C(_this) {
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
        name: "retTotalpi",
        type: "sum"
      },
      {
        label: " ",
        name: "retTotalweight",
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
        label: _this.$t("whseField.rcbh"),
        prop: "$whseAccessoriesinFk",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseAccessoriesIn", "yinId", "whseAccessoriesinoid"),
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.rcbh"),
        prop: "whseAccessoriesinFk",
        cell: false,
        width: 500,
        type: "select",
        hide: false,
        props: {
          label: "whseAccessoriesinFk",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 120,
        type: "select",
        props: {
          label: "materialNum",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName",
        cell: false,
        width: 140,
        props: {
          label: "chinName",
          value: "hardwareId"
        },
        dicData: basWjxz
        // type: "select",
        // dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "model",
        cell: false,
        width: 250,
        props: {
          label: "model",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.gg"),
        prop: "itemspec",
        cell: false,
        width: 280,
        props: {
          label: "itemspec",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 150,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.rcsl"),
        prop: "poQty",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "poQty",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.thsl"),
        prop: "retQty",
        cell: true,
        width: 110,
        align: "right",
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.tcsl"), //"调仓數量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != "5" ? true : false
      },
      {
        label: _this.$t("whseField.dw"),
        prop: _this.hide === "4" ? "retCompany" : "traCompany",
        cell: false,
        width: 100,
        type: "select",
        dicData: matUnit
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
    height: "calc(100vh - 202px)",
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
        label: "whseMaterialPlanoid",
        prop: "whseMaterialPlanoid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        width: 180,
        cell: true
      },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false,

      // },
      // {
      //   label: _this.$t("labour.sbmc"),
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false
      // },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.flbh"),
        prop: "matId",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.flmc"),
        prop: "matName",
        cell: true,
        width: 230
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 160
      },
      {
        label: _this.$t("energy.sl"),
        prop: "qty",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "qtyUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
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
    height: "calc(100vh - 202px)",
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
      // {
      //   label: "外厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,

      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'

      // },
      // {
      //   label: _this.$t("labour.sbmc"),
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'
      // },
      // {
      //   label: _this.$t("whseField.wfcdh"),
      //   prop: "refCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'

      // },
      // {
      //   label: _this.$t("whseField.wfcmc"),
      //   prop: "refName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'
      // },
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
        placeholder: " "
      },
      {
        label: _this.$t("ProWorkflowInfo.sbbh"),
        prop: "equCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false
      },
      {
        label: _this.$t("whseField.gcdh"),
        prop: "refCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false
      },
      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prOn",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.flbh"),
        prop: "matId",
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
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("ProWorkflowInfo.sbbh"),
        prop: "equCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "1" ? true : false
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "1" ? true : false
      },
      {
        label: _this.$t("whseField.gcdh"),
        prop: "refCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "2" ? true : false
      },
      {
        label: _this.$t("whseField.gcmc"),
        prop: "refName",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "2" ? true : false
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prodNo",
        span: 6,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "6" ? true : false,
        type: "tree",
        dicData: getDicT(
          "whseCalicoinDtla/v1.0/list",
          "prodNo",
          "whseCalicoinDtlaoid"
        )
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.bph"),
        prop: "custTicket",
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
    height: "calc(100vh - 202px)",
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
        width: 120
      },

      {
        label: "設備编号",
        prop: "equCode",
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
