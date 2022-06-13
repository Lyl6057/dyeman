import { getDIC, getDicT, getXDicT, postDicT, getDicNS } from "@/config";
let unit = getDIC("bas_matUnit"); // 單位
let basChemicalmat = getXDicT("BasChemicalmatNew"); // 化工原料
let basPigment = getXDicT("basPigment"); // 颜料

export function rhl1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },

      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        display: _this.data != _this.$t("whseField.cpb"),
        placeholder: " "
      },
      {
        label: _this.$t("whseField.shdh"),
        display: _this.data != _this.$t("whseField.cpb"),
        prop: "deliNo",
        span: 6,
        placeholder: " "
      },
      // {
      //   label: _this.$t("whseField.jyzt"),
      //   prop: "yinStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDIC("whse_yinstatus"),
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.getData();
      //     });
      //   }
      // },

      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus"),
        change: () => {
          _this.$nextTick(() => {
            _this.getData();
          });
        }
      }
    ]
  };
}
export function rhl2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: false
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.datas != _this.$t("whseField.cpb"),
        disabled: false
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        display: _this.datas != _this.$t("whseField.cpb"),
        span: 6,
        placeholder: " ",
        disabled: false
      },
      // {
      //   label: _this.$t("whseField.jyzt"),
      //   prop: "yinStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   disabled: false,
      //   display: true,
      //   dicData: getDIC("whse_yinstatus")
      // },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        disabled: false,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.czy"), // "操作员",
        prop: "sysCreatedby",
        display: true,
        disabled: true,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      }
    ]
  };
}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height:
      _this.data == _this.$t("whseField.cpb")
        ? "calc(100vh - 230px)"
        : "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "化工原料入仓OID",
        prop: "whseChemicalinoid",
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
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData:
          _this.data === _this.$t("iaoMng.hgyl") ||
          _this.data === _this.$t("iaoMng.yl")
            ? getDIC("Whse_CalicoType")
            : getDIC("Whse_AccessoriesType")
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        cell: false,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 120,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        overHidden: true,
        placeholder: " ",
        hide: _this.data == _this.$t("whseField.cpb"),
        width: 140
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        overHidden: true,
        hide: _this.data == _this.$t("whseField.cpb"),
        width: 140
      },
      // {
      //   label: _this.$t("whseField.jyzt"),
      //   prop: "yinStatus",
      //   cell: false,
      //   width: 120,
      //   type: "select",
      //   dicData: getDIC("whse_yinstatus")
      // },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        cell: false,
        width: 135,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.rczt"),
        prop: "stockState",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_outStatus"),
        // hide: _this.hide != "6",
        width: 120
      },
      {
        label: _this.$t("whseField.czy"), //"操作员",
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        width: 110
      },
      {
        label: "授权用户",
        prop: "sysReplacement",
        hide: true
      },
      {
        label: "所属岗位",
        prop: "sysPostn",
        hide: true
      },
      {
        label: "所属部门",
        prop: "sysDivision",
        hide: true
      },
      {
        label: "所属组织",
        prop: "sysOrg",
        hide: true
      },
      {
        label: "最后修改用户",
        prop: "sysLastUpdBy",
        hide: true,
        width: 150
      },
      {
        label: "最后修改日期",
        prop: "sysLastUpd",
        hide: true,
        type: "date",
        width: 180,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      }
    ]
  };
}
// let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
export function rhl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
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
      },
      {
        label: " ",
        name: "poQty",
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
        label:
          _this.datas === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylbh")
            : _this.$t("whseField.ylbh1"),
        prop: "chemicalId",
        cell: false,
        width: 180,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label:
          _this.datas === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylmc")
            : _this.$t("whseField.ylmc1"),
        prop: "chemicalName",
        cell: false,
        width: 180,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 180,
        hide: _this.datas === _this.$t("iaoMng.scfl") ? false : true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chinName",
        cell: false,
        width: 180,
        hide: _this.datas === _this.$t("iaoMng.scfl") ? false : true,
        type: "select",
        props: {
          label: "chinName",
          value: "hardwareId"
        }
        // dicData: getDicT("basHardwarearticles", "chinName", "hardwareId")
      },
      {
        label: _this.$t("whseField.clzl"),
        prop: "materialType",
        cell: false,
        width: 180,
        hide: true
      },
      // {
      //   label: "化工原料英文名稱 ",
      //   prop: "bcMatengname",
      //   cell: false,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      //   props: {
      //     label: "bcMatengname",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: "色光",
      //   prop: "bcColor",
      //   cell: false,
      //   width: 100,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      //   props: {
      //     label: "bcColor",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: "力份 ",
      //   prop: "bcForce",
      //   width: 100,
      //   props: {
      //     label: "bcForce",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: Chemicalmat
      // },
      // {
      //   label: _this.$t("whseField.scdh"),
      //   prop: "prodNo",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: _this.$t("whseField.mkh"),
      //   prop: "fabticket",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: "本厂批号",
        prop: "batchNos",
        cell: false,
        width: 220
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: false,
        width: 100,
        align: "right",
        type: "number",
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit,
        hide:
          _this.datas === _this.$t("iaoMng.hgyl") ||
          _this.datas === _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: false,
        type: "number",
        width: 100,
        align: "right",
        hide:
          _this.datas != _this.$t("iaoMng.hgyl") &&
          _this.datas != _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: false,
        width: 100,
        type: "select",
        dicData: unit,
        hide:
          _this.datas != _this.$t("iaoMng.hgyl") &&
          _this.datas != _this.$t("iaoMng.yl")
            ? false
            : true
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}
export function sx2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "cartNum",
        type: "sum"
      },
      {
        label: " ",
        name: "netWei",
        type: "sum"
      },
      {
        label: " ",
        name: "whseNum",
        type: "sum"
      },
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
      //   label: _this.$t("whseField.sxbh"),
      //   prop: "yarnsId",
      //   cell: true,
      //   width: 130
      // },
      {
        label: _this.$t("whseField.sxmc"),
        prop: "yarnsId",
        cell: true,
        width: 350,
        type: "select",
        slot: true,
        // props: {
        //   label: "yarnsName",
        //   value: "yarnsId"
        // },
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: true,
        width: 140,
        overHidden: true
      },
      {
        label: "本厂纱批号",
        prop: "batchNos",
        cell: false,
        width: 140
      },

      {
        label: _this.$t("whseField.shdxs"), //"送貨單箱數",
        prop: "cartonNum", //cartNum
        cell: true,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.shdzl"), //"送貨單重量",
        prop: "cartonWei", // netWei
        cell: true,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.rcxs"), // "入倉箱數",
        prop: "whseNum",
        cell: true,
        width: 110,
        align: "right"
      },
      {
        label: _this.$t("whseField.rczl"), //"入倉重量",
        prop: "weight",
        cell: true,
        width: 110,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit", // weiUnit
        cell: true,
        width: 100,
        type: "select",
        dicData: unit
      },
      // {
      //   label: _this.$t("whseField.mxds"), //"每箱釘數",
      //   prop: "everySpindle",
      //   cell: true,
      //   width: 100,
      //   align: "right"
      // },
      // {
      //   label: _this.$t("whseField.wxds"), //"尾箱釘數",
      //   prop: "tailSpindle",
      //   cell: true,
      //   width: 100,
      //   align: "right"
      // },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120
      },
      {
        label: _this.$t("whseField.sp"), //"紗牌",
        prop: "yarnsCard",
        cell: true,
        width: 120,
        type: "select",
        overHidden: true,
        dicData: getDIC("bas_yarnBrand")
      },
      {
        label: _this.$t("whseField.cd"), //"產地",
        prop: "placeOrigin",
        cell: true,
        type: "select",
        overHidden: true,
        dicData: getDIC("bas_yarnorigin"),
        width: 120
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}
export function pb2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "countingNo",
        type: "sum"
      },
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
      //   label: _this.$t("whseField.pbbh"), //"胚布編號",
      //   prop: "calicoId",
      //   cell: true,
      //   width: 100
      // },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "clothName",
        cell: true,
        slot: true,
        // overHidden: true,
        width: 350,
        type: "select",
        dicData: getDicT("basCalico", "clothName", "calicoId")
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "prodNo",
        cell: true,
        width: 200,
        placeholder: _this.$t("whseField.qxzscdh") //"請選擇生產單號",
      },

      {
        label: "载具编号",
        prop: "fabticket",
        cell: true,
        width: 140
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS(
          "whseLocation?warehouseType=1",
          "locationCode",
          "locationCode"
        ),
        // dicData: getDicT("whseLocation", "locationCode", "locationCode"),
        width: 180
      },
      {
        label: _this.$t("whseField.ps"),
        prop: "countingNo",
        cell: true,
        width: 80,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        type: "number",
        width: 90,
        align: "right"
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}

// const resolveData = getDicT("proBleadyeRunJob", "vatNo", "vatNo");
export function cpb2C(_this) {
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
        name: "countingNo",
        type: "count"
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
        label: _this.$t("whseField.gh"),
        prop: "batchNo",
        cell: false,
        width: 200,
        type: "select",
        slot: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true
        // dicData: resolveData
      },
      // {
      //   label: _this.$t("whseField.bph"),
      //   prop: "fabticket",
      //   cell: true,
      //   width: 230
      // },
      {
        label: _this.$t("whseField.ph2"),
        prop: "countingNo",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
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
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: true,
        width: 250,
        overHidden: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS(
          "whseLocation?warehouseType=2",
          "locationCode",
          "locationCode"
        )
        // dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: _this.$t("whseField.etxh"), //"ET序号",
        prop: "etSn",
        cell: true,
        width: 250,
        overHideen: true
      },
      {
        label: "成品布入仓",
        prop: "whseFinishedclothinFk",
        hide: true,
        width: 100
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}

export function hgyl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
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

      // {
      //   label: _this.$t("whseField.ylbh"),
      //   prop: "chemicalId", // bcCode
      //   cell: false,
      //   width: 140
      // },
      {
        label: _this.$t("whseField.ylmc"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        slot: true,
        width: 350,
        props: {
          label: "cnnamelong",
          value: "bcCode"
        },
        type: "select",
        dicData: basChemicalmat
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: true,
        width: 140,
        overHidden: true
      },
      {
        label: "本厂批号",
        prop: "batchNos",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: unit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120
      },
      {
        label: _this.$t("whseField.hblx"), //"货币类型",
        prop: "currencyType",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_money_type")
      },
      // {
      //   label: _this.$t("whseField.xh"),
      //   prop: "modeltype",
      //   cell: true,
      //   width: 120,
      //   props: {
      //     label: "modeltype",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: basChemicalmat
      // },
      // {
      //   label: _this.$t("whseField.hglhl"), //"含固力/活力",
      //   prop: "vitality",
      //   cell: true,
      //   width: 120,
      //   props: {
      //     label: "vitality",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: basChemicalmat
      // }
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}

export function yl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
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

      // {
      //   label: _this.$t("whseField.ylbh1"),
      //   prop: "chemicalId", // bcCode
      //   cell: false,
      //   width: 120
      // },
      {
        label: _this.$t("whseField.ylmc1"),
        prop: "chemicalId", //CNNameLong
        cell: true,
        width: 350,
        slot: true,
        // overHidden: true,
        dicData: basPigment
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: true,
        width: 140,
        overHidden: true
      },
      {
        label: "本厂批号",
        prop: "batchNos",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: unit
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120
      },
      {
        label: _this.$t("whseField.hblx"), // "货币类型",
        prop: "currencyType",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_money_type")
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      // {
      //   label: _this.$t("whseField.ywmc"),
      //   prop: "ennamelong",
      //   cell: false,
      //   width: 250,
      //   overHidden: true,
      //   props: {
      //     label: "ennamelong",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: basPigment
      // },
      // {
      //   label: _this.$t("whseField.sg"), //"色光",
      //   prop: "bcColor",
      //   cell: false,
      //   width: 120,
      //   props: {
      //     label: "bcColor",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: basPigment
      // },
      // {
      //   label: _this.$t("whseField.lf"), //"力份",
      //   prop: "bcForce",
      //   cell: false,
      //   width: 120,
      //   props: {
      //     label: "bcForce",
      //     value: "bcCode"
      //   },
      //   type: "select",
      //   dicData: basPigment
      // }
    ]
  };
}

export function yjxz2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "poQty",
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
      //   label: "材料類型",
      //   prop: "materialType", // bcCode
      //   cell: true,
      //   width: 120,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: _this.datas,
      //       value:
      //         _this.datas == _this.$t("choicDlg.wj")
      //           ? "1"
      //           : _this.datas == _this.$t("choicDlg.xz")
      //           ? "2"
      //           : "3"
      //     },
      //     {
      //       label: "行政用品",
      //       value: "2"
      //     },
      //     {
      //       label: "生產輔料",
      //       value: "3"
      //     }
      //   ]
      // },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialNum", //CNNameLong
        cell: true,
        width: 350,
        slot: true
        // overHidden: true
        // dicData: basPigment
      },

      {
        label: "本厂批号",
        prop: "batchNos",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 120,
        type: "select",
        dicData: unit
      },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        width: 100,
        align: "right",
        type: "number"
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "checkStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
    ]
  };
}

export function rhl3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    roykey: "whseChemicalinDtlboid",
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
      //   label: "本厂批号",
      //   prop: "batchNo",
      //   cell: false,
      //   width: 220
      // },
      {
        label: _this.$t("energy.dj"),
        prop: "price",
        cell: true,
        type: "number",
        width: 120,
        hide: _this.datas === _this.$t("iaoMng.sx") ? false : true
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "origin",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("bas_yarnorigin"),
        hide: _this.datas === _this.$t("iaoMng.sx") ? false : true
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
        type: "number"
      },
      {
        label: _this.$t("whseField.hwm"), //"貨位碼",
        prop: "storageNo",
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS(
          "whseLocation?warehouseType=" +
            (_this.datas == _this.$t("iaoMng.sx")
              ? "0"
              : _this.datas == _this.$t("iaoMng.pb")
              ? "1"
              : _this.datas == _this.$t("iaoMng.hgyl")
              ? "3"
              : _this.datas == _this.$t("iaoMng.scfl")
              ? "5"
              : _this.datas == _this.$t("choicDlg.wj")
              ? "6"
              : _this.datas == _this.$t("choicDlg.xz")
              ? "7"
              : _this.datas == _this.$t("choicDlg.rl")
              ? "8"
              : _this.datas == _this.$t("choicDlg.sb")
              ? "9"
              : "4"),
          "locationCode",
          "locationCode"
        ),
        width: 180
      }
      // {
      //   label: _this.$t("whseField.dw"),
      //   prop: "weightUnit",
      //   cell: true,
      //   width: 100,
      //   type: "select",
      //   dicData: unit
      // }
    ]
  };
}

export function wjxz3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    roykey: "whseChemicalinDtlboid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "cartonNum",
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
        label: _this.$t("whseField.hwm"),
        prop: "boxCarId",
        cell: true,
        width: 180,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS(
          "whseLocation?warehouseType=" +
            (_this.datas === _this.$t("choicDlg.scfl")
              ? "5"
              : _this.datas === _this.$t("choicDlg.wj")
              ? "6"
              : "7"),
          "locationCode",
          "locationCode"
        )

        // dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: _this.$t("whseField.xs"),
        prop: "cartonNum",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 120,
        type: "number",
        align: "right"
      }
    ]
  };
}

export function rhl4C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height:
      _this.datas === _this.$t("iaoMng.yl") ||
      _this.datas === _this.$t("iaoMng.hgyl")
        ? "calc(50vh - 198px)"
        : "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "applyNum",
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
        label: _this.$t("whseField.sgdh"),
        prop: "appId",
        cell: true,
        width: 220
      },
      {
        label: _this.$t("whseField.fpsl"),
        prop: "applyNum",
        cell: true,
        width: 120,
        align: "right"
      }
    ]
  };
}
export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseField.chdh"),
        prop: "poNo",
        span: 6,
        placeholder: " ",
        disabled: _this.upDate
      },
      // {
      //   label: "供应商",
      //   prop: "suppId",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: _this.upDate
      },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        span: 6,
        placeholder: " ",
        display: _this.data === _this.$t("iaoMng.sx")
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        span: 6,
        placeholder: " ",
        display: _this.data === _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.ylbh"),
        prop: "bcCode",
        span: 6,
        placeholder: " ",
        display:
          _this.data === _this.$t("iaoMng.hgyl") ||
          _this.data === _this.$t("iaoMng.yl")
      }
    ]
  };
}
export function planCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.upDate ? "calc(100vh - 180px)" : "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 40,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "poNo",
        cell: false,
        width: 170
      },
      // {
      //   label: "供應商",
      //   prop: "suppId",
      //   cell: false,
      //   width: 120,
      //   type: "select",
      //   dicData: getDicT("purSinglepo", "suppName", "suppId")
      // },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        cell: false,
        width: 170
      },
      // {
      //   label: _this.$t('whseField.shrq'),
      //   prop: "deliDate",
      //   type: "date",
      //   width: 120,
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   align: "center",
      // },
      {
        label: _this.$t("whseField.sxbh"),
        prop: "yarnsId",
        cell: false,
        width: 130,
        hide: _this.data != _this.$t("iaoMng.sx")
      },
      {
        label: _this.$t("whseField.sxmc"), //"紗線名稱",
        prop: "yarnsName",
        cell: false,
        overHidden: true,
        hide: _this.data != _this.$t("iaoMng.sx")
        // width: 150,
      },
      {
        label: _this.$t("whseField.pbbh"),
        prop: "calicoId",
        cell: false,
        width: 120,
        hide: _this.data != _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "calicoName",
        cell: false,
        hide: _this.data != _this.$t("iaoMng.pb")
        // width: 150,
      },
      {
        label:
          _this.data === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylbh")
            : _this.$t("whseField.ylbh1"),
        prop: "bcCode",
        cell: false,
        width: 140,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label:
          _this.data === _this.$t("iaoMng.hgyl")
            ? _this.$t("whseField.ylmc")
            : _this.$t("whseField.ylmc1"),
        prop: "cnnamelong",
        cell: false,
        overHidden: true,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl"),
        width: 350
      },

      {
        label: _this.$t("whseField.zl"),
        prop: "deliQty",
        cell: false,
        width: 80,
        align: "right",
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "deliUnit",
        cell: false,
        width: 60,
        type: "select",
        dicData: unit,
        hide:
          _this.data != _this.$t("iaoMng.hgyl") &&
          _this.data != _this.$t("iaoMng.yl")
      },
      {
        label: _this.$t("whseField.xs"),
        prop: "cartNum",
        cell: false,
        width: 80,
        overHidden: true,
        align: "right",
        hide: _this.data != _this.$t("iaoMng.sx")
      },

      {
        label:
          _this.data === _this.$t("iaoMng.sx")
            ? _this.$t("whseField.zl")
            : _this.$t("whseField.zl"),
        prop: "netWei",
        cell: false,
        width: 80,
        align: "right",
        hide:
          _this.data != _this.$t("iaoMng.sx") &&
          _this.data != _this.$t("iaoMng.pb")
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weiUnit",
        cell: false,
        width: 60,
        type: "select",
        hide:
          _this.data != _this.$t("iaoMng.sx") &&
          _this.data != _this.$t("iaoMng.pb"),
        dicData: unit
      },

      {
        label: "本厂批号",
        prop: "batchNo",
        cell: false,
        width: 180
      }
    ]
  };
}
