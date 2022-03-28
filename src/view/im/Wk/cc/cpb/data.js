import { getDIC, getDicT, postDicT, getXDicT } from "@/config/index";

export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: "woOutno",
        span: 6,
        placeholder: " "
      },
      {
        label: "出倉日期",
        prop: "woDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "2" ? true : false
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6"
      },
      // {
      //   label: _this.$t("whseField.cwzt"),
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDIC("whse_finStatus"),
      //   display: _this.hide === "6"
      // },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "WMS状态",
        prop: "wms",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "6" ? true : false,
        dicData: [
          {
            value: true,
            label: "已确认"
          },
          {
            value: false,
            label: "待确认"
          }
        ]
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
        prop: "woOutno",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan
      },
      {
        label: "出倉日期",
        prop: "woDate",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan,
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
        display: _this.hide === "6" ? false : true,
        dicData: getDIC("Whse_out_type")
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "2" ? true : false,
        disabled: true
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6",
        disabled: !_this.isAdd,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "spNo";
          // _this.choiceQ.purType = '5'
          // _this.oldData = _this.chooseData
          // _this.choiceTarget = _this.oldData;
          _this.choiceTle = "選擇貨運計劃";
        }
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus"),
        display: _this.hide === "6",
        disabled: true
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
    height: "calc(100vh - 200px)",
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
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true
      },
      {
        label: _this.$t("whseField.ccbh"),
        prop: "woOutno",
        cell: true,
        width: 180
      },

      {
        label: "出倉类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC("Whse_out_type"),
        hide: _this.hide === "6"
      },
      {
        label: "出倉日期",
        prop: "woDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
        width: 200
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        cell: true,
        width: 200,
        hide: _this.hide === "6" ? false : true
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
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "配料编号",
        prop: "retBatch",
        cell: false,
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
        width: 140,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        hide: _this.hide === "6" ? false : true
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
        prop: "retRemarks",
        span: 6,
        cell: true,
        placeholder: " ",
        hide: _this.hide == "4" || _this.hide == "3" ? false : true,
        width: 500
      },
      {
        label: "WMS状态",
        prop: "wms",
        span: 6,
        placeholder: " ",
        type: "select",
        width: 120,
        display: _this.hide === "6" ? true : false,
        dicData: [
          {
            value: true,
            label: "已确认"
          },
          {
            value: false,
            label: "待确认"
          }
        ]
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
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // showSummary: true,
    // sumColumnList: [
    //   {
    //     label: ' ',
    //     name: 'weight',
    //     type: 'sum',
    //   },
    // ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        cell: false,
        width: 140,
        hide: _this.hide === "6" ? false : true
      },
      {
        label: _this.$t("whseField.ps"),
        prop: "pidCount",
        cell: false,
        width: 120,
        hide: _this.hide === "6" ? false : true
      },
      {
        label: "订单号",
        prop: "woOrderno",
        cell: false,
        width: 140,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: "成品布编号",
        prop: "woMatno",
        cell: false,
        width: 140,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: "成品布名称",
        prop: "woMatname",
        cell: false,
        width: 700,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: "颜色",
        prop: "colorName",
        cell: true,
        width: 180,
        type: "select",
        dicData: postDicT("salPoDtlaList", "colorName", "salPoDtlaoid"),
        hide: _this.hide === "6" ? true : false
      }
      // {
      //   label: _this.$t("whseField.zl"),
      //   prop: "weight",
      //   cell: true,
      //   width: 100,
      //   align: "right",
      // },
      // {
      //   label: _this.$t('whseField.dw'),
      //   prop: "weightUnit",
      //   cell: true,
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("bas_matUnit"),
      // },
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
    page: false,
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
        label: _this.$t("whseField.gh"),
        prop: "batchNo",
        cell: true,
        width: 180
      },
      // {
      //   label: _this.$t("whseField.gh"),
      //   prop: "batchNo",
      //   cell: true, width: 150,
      //   hide: _this.hide != '6' ? true : false,
      //   // type: "select",
      //   // dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),

      // },
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
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
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

let rsxkr3CDic = getXDicT("whseCalicoinDtla/v1.0/list");
// 退供应商、客人明细
export function rsxkr3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 287px)",
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
        prop: "$whseCalicoinFk",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseCalicoin/v1.0/list", "yinId", "whseCalicoinoid"),
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "入仓编号2",
        prop: "whseCalicoinFk",
        cell: false,
        width: 500,
        type: "select",
        props: {
          label: "whseCalicoinFk",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "胚布编码",
        prop: "calicoId",
        cell: false,
        width: 140,
        type: "select",
        props: {
          label: "calicoId",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      // {
      //   label: _this.$t("whseField.pbmc"),
      //   prop: "clothName",
      //   cell: true,
      //   width: 140,
      //   type: "select",
      //   dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      // },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prodNo",
        cell: false,
        width: 140,
        dicData: getDicT(
          "whseCalicoinDtla/v1.0/list",
          "prodNo",
          "whseCalicoinDtlaoid"
        ),
        hide: _this.hide != "5" ? true : false
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic
      },
      {
        label: _this.$t("whseField.ps"),
        prop: "countingNo",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "countingNo",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === "5" ? true : false
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: false,
        width: 140,
        align: "right",
        type: "select",
        props: {
          label: "weight",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic
      },
      {
        label: "退回总疋数",
        prop: "retTotalpi",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "退回重量",
        prop: "retTotalweight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide === "5" ? true : false
      },
      {
        label: "调仓重量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != "5" ? true : false
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "retCompany",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
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
        label: "whseMaterialPlanoid",
        prop: "whseMaterialPlanoid",
        hide: true
      },
      {
        label: _this.$t("whseField.jhbh"),
        prop: "retBatch",
        width: 120,
        cell: true
      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != "1" ? true : false
      },
      {
        label: _this.$t("labour.sbmc"),
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != "1" ? true : false
      },
      {
        label: _this.$t("whseField.wfcdh"),
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != "2" ? true : false
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != "2" ? true : false
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prOn",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        cell: true,
        width: 120
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "clothName",
        cell: true,
        width: 450
      },

      // {
      //   label: _this.$t("whseField.ph"),
      //   prop: "batchNo",
      //   cell: true,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: _this.$t("whseField.bph"),
      //   prop: "custTicket",
      //   cell: true,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("bas_matUnit")
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
        label: "VWhseRetyarninoutPlanoid",
        prop: "VWhseRetyarninoutPlanoid",
        hide: true
      },
      // {
      //   label: "外厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },

      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

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
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

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
        placeholder: " "
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
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
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
      // {
      //   label: "成品布编号",
      //   prop: "calicoId",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prodNo",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: false,
      //   type: "tree",
      //   dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),
      // },

      {
        label: _this.$t("whseField.gh"),
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
        cell: true,
        width: 120
      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != "1"
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },
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
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },
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
