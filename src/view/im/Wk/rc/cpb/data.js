import { getDIC, getDicT } from "@/config/index";
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
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
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "2" ? true : false,
        dicData: getDicT("basCustomer", "custName", "custName")
      },

      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "1" ? true : false,
        dicData: getDIC("whse_finStatus")
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
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        type: "select",
        dicData: getDIC("Whse_FinishedclothType"),
        span: 6,
        display: _this.hide === "2" ? false : true,
        disabled: true
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        span: 6,
        placeholder: " ",
        disabled: false,
        type: "select",
        display: _this.hide === "2" ? true : false,
        dicData: getDicT("basCustomer", "custName", "custName"),
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custName";
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = _this.$t("choicDlg.xzkh");
        }
      },
      {
        label: _this.$t("whseField.krtzd"),
        prop: "custNotice",
        span: 6,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "2" ? true : false
      },

      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",

        type: "select",
        disabled: true,
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("energy.bz"),
        prop: "remarks",
        span: 18,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "2" ? true : false
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
        label: "成品布入仓主键OID",
        prop: "whseFinishedclothinoid",
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
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        cell: true,
        width: 160
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_FinishedclothType")
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 140,
        align: "center"
      },

      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 280,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custName";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.xzkh");
        }
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custCode",
        cell: false,
        width: 150,
        hide: true
      },

      {
        label: _this.$t("whseField.krtzd"),
        prop: "custNotice",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 120
      },

      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        cell: true,
        width: 120,
        hide: _this.hide != "2" ? false : true,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        cell: true,
        width: 135,
        type: "select",
        hide: _this.hide === "1" ? false : true,
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("energy.bz"),
        prop: "remarks",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 250
      },
      {
        label: "创建用户",
        prop: "sysCreatedby",
        hide: true
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
        type: "datetime",
        width: 180,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center"
      }
    ]
  };
}
const resolveData = getDicT("proBleadyeRunJob", "vatNo", "vatNo");

export function rsxkr2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === "2" ? "calc(100vh - 312px)" : "calc(100vh - 267px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseFinishedclothinDtloid",
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
        label: "Whse_FinishedclothIn_dtlOID",
        prop: "whseFinishedclothinDtloid",
        hide: true
      },
      {
        label: _this.$t("whseField.gh"),
        prop: "batchNo",
        cell: _this.hide === "2" || _this.hide === "1" ? true : false,
        width: 230,
        slot: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        change: val => {
          // if (!_this.chooseData.etSn) {
          //   _this.getEt();
          // }
        }
        // dicData: resolveData
        // click: () => {
        //   if (_this.hide != 2) {
        //     _this.choiceV = !_this.choiceV;
        //     _this.choiceField = "batchNo";
        //     // _this.choiceQ.purType = '5'
        //     _this.oldData = _this.chooseData
        //     _this.choiceTarget = _this.oldData;
        //     _this.choiceTle = "成品布貨物包";
        //   }

        // },
      },
      // {
      //   label: _this.$t("whseField.bph"),
      //   prop: "fabticket",
      //   cell: true,
      //   width: 230,
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
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: true,
        width: 180,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: "ET序号",
        prop: "etSn",
        cell: true,
        width: 250,
        overHideen: true
        // type: "select",
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        // dicData: []
        // click: () => {
        //   _this.dlgWidth = "100%";
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceField = "locationCode";
        //   _this.choiceTarget = _this.chooseData;
        //   _this.choiceTle = _this.$t("choicDlg.xzhw");
        // }
      },
      {
        label: "成品布入仓",
        prop: "whseFinishedclothinFk",
        hide: true,
        width: 100
      }
    ]
  };
}
