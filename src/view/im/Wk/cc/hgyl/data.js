import { getDIC, getDicT, postDicT, getXDicT } from "@/config/index";
let matUnit = getDIC("bas_matUnit");
let rlData = getXDicT("BasChemicalmatNew");
let user = getDicT("ucmlUser", "employeename", "ucmlUseroid");
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
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        type: "date",
        display: _this.hide === "6" ? false : true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "出倉编号",
        prop: "woOutno",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? true : false
      },
      {
        label: "出倉日期",
        prop: "woDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        display: _this.hide === "6" ? true : false
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6"
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus"),
        display: _this.hide === "6"
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        // hide: _this.hide != "6",
        width: 120
      },
      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user,
        filterable: true,
        display:
          _this.hide === "6" || _this.hide === "1" || _this.hide === "2"
            ? true
            : false
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: user
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
        prop: _this.hide === "1" ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan
      },
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false,
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
        dicData: user
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6",
        disabled: true
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
        label: "申購單",
        prop: "appId",
        span: 6,
        click: () => {
          if (_this.form.stockType === "2") {
            return;
          }
          _this.choiceField = "spNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.mx = [];
          if (_this.form.stockType === "1") {
            _this.choiceQ.purCategory = "5";
            _this.choiceTle = _this.$t("choicDlg.xzsgd");
          } else {
            _this.choiceQ.type = "5";
            _this.choiceQ.applyState = "3";
            _this.choiceQ.collectSucceed = 0;
            _this.choiceTle = _this.$t("choicDlg.xzsqlyd");
          }
          _this.choiceV = !_this.choiceV;
        },
        placeholder: " ",
        display: _this.hide === "2" || _this.hide === "1" ? true : false,
        disabled: !_this.isAdd
      },
      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user,
        filterable: true,
        // click: () => {
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceQ = {};
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.form;
        //   _this.choiceTle = _this.$t("choicDlg.xzlyr");
        // },
        display:
          _this.hide === "6" || _this.hide === "1" || _this.hide === "2"
            ? true
            : false
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: user,
        disabled: true
        // hide: _this.hide === '6' || _this.hide === '1' ? false : true
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
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
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
        label: "出倉类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC("Whse_out_type"),
        hide: _this.hide != "1"
      },
      {
        label: "出倉方式",
        prop: "stockType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("whse_stock_type"),
        hide: _this.hide != "1"
      },
      {
        label: "出倉日期",
        prop: _this.hide === "1" ? "stockDate" : "retDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
        width: 200,
        hide: _this.hide === "6"
      },
      {
        label: "出倉日期",
        prop: "woDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        focus: val => {
          _this.iptChange(_this.chooseData);
        },
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
        hide: _this.hide != "6",
        width: 200
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        cell: true,
        width: 200,
        hide: _this.hide === "6" ? false : true,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "spNo";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "货运计划编号";
        },
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        }
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        },
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid")
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
        click: () => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: "领用人",
        prop: "leader",
        cell: true,
        width: 140,
        type: "select",
        dicData: user,
        hide: _this.hide === "1" ? false : true
      },
      {
        label: "配料编号",
        prop: "retBatch",
        cell: false,
        width: 180,
        hide: _this.hide === "2" ? false : true,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        }
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
        dicData: user
        // hide: _this.hide === "6" ? false : true
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        // hide: _this.hide != "6",
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
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "applyNum",
        type: "sum"
      },
      {
        label: " ",
        name: "stockQty",
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
        label: "材料編號",
        prop: "materialId",
        cell: false,
        width: 100
      },
      {
        label: "材料名稱",
        prop: "materialName",
        cell: false,
        width: 250,
        overHidden: true
      },
      {
        label: "大類名稱",
        prop: "bcClass",
        cell: false,
        width: 120,
        type: "select",
        props: {
          label: "bcClass",
          value: "bcCode"
        },
        dicData: rlData
      },
      {
        label: "大類名稱",
        prop: "$bcClass",
        cell: false,
        width: 120,
        type: "select",
        overHidden: true,
        // props: {
        //   label: "bcClass",
        //   value: "bcCode"
        // },
        dicData: getDIC("bas_chemicalClass")
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "model",
        cell: false,
        width: 130,
        overHidden: true,
        // hide: true,
        props: {
          label: "modeltype",
          value: "bcCode"
        },
        dicData: rlData
      },
      {
        label: "分子式",
        prop: "bcForce",
        cell: true,
        width: 130,
        type: "select",
        props: {
          label: "basChemicalmatfcnameFk",
          value: "bcCode"
        },
        dicData: rlData,
        hide: true
      },
      {
        label: "分子式1",
        prop: "$bcForce",
        hide: true,
        cell: true,
        width: 130,
        type: "select",
        overHidden: true,
        // props: {
        //   label: "moleculeformula",
        //   value: "basChemicalmatfcnameoid"
        // },
        dicData: getDicT(
          "basChemicalmatfcname",
          "moleculeformula",
          "basChemicalmatfcnameoid"
        )
      },

      {
        label: "含固力/活力",
        prop: "vitality",
        hide: false,
        width: 130,
        type: "select",
        overHidden: true,
        props: {
          label: "vitality",
          value: "bcCode"
        },
        dicData: rlData,
        precision: 0
        // props: {
        //   label: "bcColor",
        //   value: "bcCode"
        // },
        // dicData: getDIC("bas_ColorLight")
      },
      {
        label: "危险等级",
        prop: "dangerlevel",
        hide: false,
        width: 130,
        type: "select",
        props: {
          label: "dangerlevel",
          value: "bcCode"
        },
        dicData: rlData
      },
      {
        label: "危险等级",
        prop: "$dangerlevel",
        overHidden: true,
        hide: false,
        width: 130,
        type: "select",
        // props: {
        //   label: "bcColorprison",
        //   value: "bcCode"
        // },
        dicData: getDIC("bas_chemicalDanger")
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        hide: false,
        width: 120,
        overHidden: true
      },
      {
        label: "申购数量",
        prop: "applyNum",
        hide: false,
        width: 90,
        align: "right"
      },
      // {
      //   label: "申购单位",
      //   prop: "company",
      //   hide: false,
      //   width: 90,
      //   type: "select",
      //   dicData: matUnit
      // },
      {
        label: "出货数量",
        prop: "stockQty",
        hide: false,
        cell: false,
        width: 120,
        align: "right",
        type: "number",
        placeholder: " ",
        change: val => {
          if (val.value > _this.chooseData.applyNum) {
            _this.$nextTick(() => {
              _this.chooseData.stockQty = _this.chooseData.applyNum;
              _this.$tip.warning("出货数量不能大于申购数量!");
            });
          }
        }
      },
      {
        label: "单位",
        prop: "stockUnit",
        hide: false,
        width: 90,
        cell: false,
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
        ? "calc(100vh - 320px)"
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
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        // width: 180,
        hide: _this.hide === "6" ? true : false
      },
      {
        label: "数量",
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
        cell: false,
        width: 100,
        type: "select",
        dicData: matUnit
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
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
    height: "calc(100vh - 210px)",
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
        cell: true,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != "1" ? true : false
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },
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
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },
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
        width: 180,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        cell: true,
        width: 120,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "clothName",
        cell: true,
        width: 450,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
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
        align: "right",
        click: val => {
          _this.iptChange(_this.chooseData);
        }
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
        width: 140,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        align: "right",
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
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
        width: 120,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
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
        width: 180,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: true,
        width: 120,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsName",
        cell: true,
        width: 250,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },

      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.ds"),
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      }
    ]
  };
}
