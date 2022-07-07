import { getDIC, getDicT, postDicT, getDicNS } from "@/config/index";

export function rcpb1F(_this) {
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
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        display: _this.hide === "2" ? true : false,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.lpbh"),
        prop: "registerNo",
        display: _this.hide === "1" ? true : false,
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },
      //           {
      //   label: "创建日期",
      //   prop: "sysCreated",
      //   span: 8,
      //   placeholder: " ",
      //   disabled: true,
      //   type: "datetime",
      // },

      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        display: _this.hide === "1" || _this.hide === "2" ? true : false,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus")
      }
    ]
  };
}
export function rcpb2F(_this) {
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
        disabled: false,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },

      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide != "2" ? false : true
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "2" ? true : false
      },
      {
        label: _this.$t("whseField.lpbh"),
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd,
        click: val => {
          if (_this.isAdd) {
            _this.choiceV = !_this.choiceV;
            _this.choiceField = "registerNo";
            _this.choiceTarget = _this.form;
            _this.dlgWidth = "60%";
            _this.choiceTle = _this.$t("choicDlg.lpdj");
          }
        },
        change: () => {
          _this.mx = [];
          _this.chooseData = {};
          _this.$nextTick(() => {
            if (_this.form.registerNo === "") {
              _this.form.custName = "";
            }
          });
        }
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        cell: false,
        display: _this.hide === "1" ? true : false,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        span: 6,
        disabled: true
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        type: "select",
        dicData: getDIC("Whse_CalicoType"),
        span: 6,
        display: _this.hide === "6" || _this.hide === "4" || _this.hide === "7",
        disabled: true
      },
      {
        label: _this.$t("whseField.wfjgc"),
        prop: "factoryId",
        cell: false,
        type: "select",
        dicData: getDicT("vWhseMaterialoutPlan", "refName", "refCode"),
        span: 6,
        display: _this.hide === "5",
        disabled: !_this.isAdd,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "factoryId";
          // this.choiceQ.registerNo = this.form;
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = _this.$t("choicDlg.xzwfpbpl");
        }
      },
      {
        label: _this.$t("whseField.jgzld"),
        prop: "instructId",
        cell: false,
        span: 6,
        display: _this.hide === "5",
        disabled: !_this.isAdd,
        type: "select",
        dicData: getDicT("viWhseProcessinstruct", "instructId", "instructId"),
        change: () => {
          _this.$nextTick(() => {
            if (
              _this.form.instructId === "" ||
              _this.form.instructId === null
            ) {
              _this.mx = [];
              _this.chooseData = {};
            }
          });
        }
      },
      {
        label: "入仓通知单",
        prop: "deliNo",
        disabled: true,
        span: 6,
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        display: _this.hide === "2" ? true : false,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus"),
        disabled: true
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        disabled: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
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
    ]
  };
}
export function rcpbDetailF(_this) {
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
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "2" ? false : true
      },
      {
        label: _this.$t("whseField.djbh"),
        prop: "registerNo",
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
        disabled: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true
      }
    ]
  };
}
export function rcpb1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height:
      _this.hide === "6" ||
      _this.hide === "4" ||
      _this.hide === "5" ||
      _this.hide === "7"
        ? "calc(100vh - 233px)"
        : "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "胚布入仓OID",
        prop: "whseCalicoinoid",
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
        width: 200
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDIC("Whse_CalicoType")
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 190,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 220,
        placeholder: _this.$t("whseField.xzchdh"),
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "purNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.xzpbcgd");
        }
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        cell: true,
        width: 180,
        hide: _this.hide === "2" ? false : true,
        click: val => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error(_this.$t("whseField.xzchdh"));
            return;
          }
          _this.choiceV = !_this.choiceV;
          _this.choiceQ.deliType = "calico";
          _this.choiceField = "deliNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.shd");
        }
      },
      {
        label: _this.$t("whseField.lpbh"),
        prop: "registerNo",
        cell: true,
        width: 180,
        hide: _this.hide === "1" ? false : true
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("salEmbryogenesis", "custCode", "registerNo")
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        width: 280
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },

      {
        label: _this.$t("whseField.wfcdh"),
        prop: "factoryId",
        cell: true,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        click: () => {
          _this.choiceField = "factoryId";
          _this.choiceV = !_this.choiceV;
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          (_this.choiceTle = _this.$t("choicDlg.xzwfpbpl")), //'外厂胚布配料计划',
            _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseMaterialoutPlan", "refName", "refCode")
      },
      {
        label: _this.$t("whseField.zld"),
        prop: "instructId",
        hide: true
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        cell: true,
        width: 135,
        hide: _this.hide === "1" || _this.hide === "2" ? false : true,
        type: "select",
        dicData: getDIC("whse_finStatus")
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
export function rcpb2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 312px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseCalicoinDtlaoid",
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
      {
        label: "来胚入仓明细OID",
        prop: "whseCalicoinDtlaoid",
        hide: true
      },
      {
        label: _this.$t("choicDlg.pbbm"),
        prop: "calicoId",
        cell: false,
        width: 120,
        hide: _this.hide === "6" || _this.hide === "7" ? true : false,
        click: val => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "calicoId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.pbbm");
        }
      },
      {
        label: _this.$t("whseField.pbmc"),
        prop: "clothName",
        cell: false,
        width: 650,
        hide: _this.hide === "6" || _this.hide === "7" ? true : false,
        click: val => {}
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        cell: true,
        width: 140,
        hide: _this.hide === "6" || _this.hide === "7" ? false : true
      },
      {
        label: _this.$t("whseField.ps"),
        prop: "countingNo",
        hide:
          _this.hide === "6" || _this.hide === "7" || _this.hide === "5"
            ? false
            : true,
        cell: true,
        width: 100,
        align: "right"
      },
      
      // {
      //   label: _this.$t("whseField.hwm"),
      //   prop: "locationCode",
      //   cell: true,
      //   hide: _this.hide === "6" || _this.hide === "7" ? false : true,
      //   width: 180,
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      //   type: "select",
      //   dicData: getDicNS(
      //     "whseLocation?warehouseType=1",
      //     "locationCode",
      //     "locationCode"
      //   )
      // },
      // {
      //   label: _this.$t("whseField.zl"),
      //   prop: "weight",
      //   cell: true,
      //   width: 100,
      //   align: "right"
      // },
      

      // {
      //   label: _this.$t("whseField.zldw"),
      //   prop: "weightUnit",
      //   hide: _this.hide === '4' || _this.hide === '7' ? true : false,
      //   cell: _this.hide != '6' ? true : false,
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("bas_matUnit"),

      // }
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
        ? "calc(100vh - 315px)"
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
        width: 170
      },
      {
        label: _this.$t("whseField.ph2"),
        prop: "pidNo",
        cell: true,
        width: 70,
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
        label: _this.$t("whseField.zldw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: _this.$t("whseField.krbph"),
        prop: "noteCode",
        cell: true,
        width: 150
      },
      
    ]
  };
}
