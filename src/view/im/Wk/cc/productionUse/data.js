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
        prop: "retCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? false : true
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "date",
        display: _this.hide === "6" ? false : true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
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
        prop: "retCode",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user
      },

      // {
      //   label: _this.$t("whseField.cwzt"),
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDIC("whse_finStatus"),
      //   disabled: true
      // },
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
          _this.$nextTick(() => {
            console.log(_this.form.stockType);
          });
          if (_this.form.stockType === "2") {
            return;
          }

          _this.choiceField = "spNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.mx = [];
          _this.choiceV = !_this.choiceV;
          if (_this.form.stockType == "1") {
            _this.choiceQ.purCategory =
              _this.type == _this.$t("iaoMng.sx") ? "4" : "5";
            _this.choiceTle = _this.$t("choicDlg.xzsgd");
          } else {
            _this.choiceQ.type =
              _this.type == _this.$t("iaoMng.sx") ? "4" : "5";
            _this.choiceQ.applyState = "3";
            _this.choiceQ.collectSucceed = 0;
            _this.choiceTle = _this.$t("choicDlg.xzsqlyd");
          }
        },
        placeholder: " ",
        disabled: !_this.isAdd
      },
      {
        label: "领用人",
        prop: "leader",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: user,
        filterable: true
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
        prop: "retCode",
        cell: true,
        width: 180
      },

      {
        label: "出倉类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC("Whse_out_type")
      },
      {
        label: "出倉方式",
        prop: "stockType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("whse_stock_type")
      },
      {
        label: "出倉日期",
        prop: "retDate",
        cell: true,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
        width: 200
      },

      {
        label: "领用人",
        prop: "leader",
        cell: true,
        width: 140,
        type: "select",
        dicData: user
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        type: "select",
        dicData: user
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        width: 120
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
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "applyNum",
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
        label: "生产织单号",
        prop: "weaveJobCode",
        cell: false,
        width: 140,
        overHidden: true
      },
      {
        label: "材料編號",
        prop: "yarnsId",
        cell: false,
        width: 100
      },
      {
        label: "材料名稱",
        prop: "yarnsName",
        cell: false,
        width: 280,
        overHidden: true
      },
      {
        label: "纱牌",
        prop: "yarnBrand",
        hide: false,
        width: 120,
        overHidden: true
      },
      {
        label: "供应商批号",
        prop: "suppBatchNo",
        hide: false,
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        hide: false,
        width: 120,
        overHidden: true
      },
      {
        label: "申领数量",
        prop: "applyNum",
        hide: false,
        width: 120,
        align: "right",
        precision: 2
      },
      {
        label: "借纱数量",
        prop: "debitQty",
        cell: false,
        width: 100,
        align: "right",
        placeholder: " "
        // hide: _this.datas === _this.$t("iaoMng.sx") ? false : true
      },
      {
        label: "出货数量",
        prop: "weight",
        hide: false,
        cell: false,
        width: 120,
        align: "right",
        // type: "number",
        precision: 1,
        placeholder: " ",
        change: val => {
          if (val.value > _this.chooseData.applyNum) {
            _this.$nextTick(() => {
              _this.chooseData.weight = _this.chooseData.applyNum;
              _this.$tip.warning("出货数量不能大于申购数量!");
            });
          }
        }
      },
      {
        label: "单位",
        prop: "weightUnit",
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
      // {
      //   label: _this.$t("whseField.ph"),
      //   prop: "batchNo",
      //   cell: false,
      //   width: 200
      // },
      {
        label: "数量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: "件数",
        prop: "cartonNum",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: "包装规格",
        prop: "packSize",
        hide: false,
        width: 90,
        cell: true,
        type: "select",
        dicData: getDIC("bas_yarnPackUnit")
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      }
    ]
  };
}

let rsxkr3CDic = getXDicT("whseCalicoinDtla/v1.0/list");
let Dtlb = getXDicT("whseCalicoinDtlb/v1.0/list");
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
        type: "select",
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
        label: _this.hide === "5" ? "疋号" : _this.$t("whseField.ps"),
        prop: "countingNo",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "countingNo",
          value:
            _this.hide === "5" ? "whseCalicoinDtlboid" : "whseCalicoinDtlaoid"
        },
        dicData: _this.hide === "5" ? Dtlb : rsxkr3CDic
        // hide: _this.hide === '5' ? true : false
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
          value:
            _this.hide === "5" ? "whseCalicoinDtlboid" : "whseCalicoinDtlaoid"
        },
        dicData: _this.hide === "5" ? Dtlb : rsxkr3CDic
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
        dicData: getDIC("Whse_Transfer_unit")
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
