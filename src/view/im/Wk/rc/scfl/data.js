import { getDIC, getDicT, postDicT, getXDicT } from "@/config/index";
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
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      // {
      //   label: _this.$t("whseField.chdh"),
      //   prop: "purNo",
      //   span: 6,
      //   placeholder: " ",
      //   // type: "select",
      //   // placeholder: _this.$t("whseField.xzchdh"),
      //   // click: () => {
      //   //   _this.choiceV = !_this.choiceV;
      //   //   _this.choiceField = "purNo";
      //   //   _this.choiceTarget = _this.form;
      //   //   _this.choiceTle = '採購單';
      //   // },
      //   display: _this.hide === '2' || _this.hide === '6' ? true : false,
      // },
      {
        label: _this.$t("iaoMng.fldjbh"),
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        // type: "select",
        display: _this.hide === "1" ? true : false
        // placeholder: "請選擇輔料登记编号",
        // click: () => {

        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "registerNo"
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = '來紗登記'
        // },
      },

      // {
      //   label: _this.$t("whseField.shdh"),
      //   prop: "deliNo",
      //   span: 6,
      //   placeholder: " ",
      //   // placeholder: "請選擇送货单号",
      //   display: _this.hide === '2' || _this.hide === '6' ? true : false,
      //   // type: "select",
      //   // click: () => {
      //   //   _this.choiceV = !_this.choiceV
      //   //   _this.choiceQ.deliType = 'yarns'
      //   //   _this.choiceField = "deliNo"
      //   //   _this.choiceTarget = _this.form
      //   //   _this.choiceTle = _this.$t('choicDlg.xzshd')
      //   // },
      // },
      //           {
      //   label: "创建日期",
      //   prop: "sysCreated",
      //   span: 8,
      //   placeholder: " ",
      //   disabled: true,
      //   type: "datetime",
      // },

      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yinstatus")
      }

      // {
      //   label: _this.$t("whseField.cwzt"),
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   type: "select",
      //   display: _this.hide != '4' && _this.hide != '5' ? true : false,
      //   dicData:
      //     getDIC('whse_finStatus')
      // },
    ]
  };
}
export function rsxkr2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 140,
    column: [
      {
        label: _this.$t("whseField.rcbh"),
        prop: "yinId",
        span: 6,
        placeholder: " ",
        disabled: true,
        red: true
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: false
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "4" || _this.hide === "5",
        type: "select",
        dicData: getDIC("Whse_yinType")
      },
      // {
      //   label: _this.$t("whseField.chdh"),
      //   prop: "purNo",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: _this.isAdd ? false : true,
      //   display: _this.hide === '2' || _this.hide === '6' ? true : false,
      //   click: () => {
      //     if (_this.isAdd) {
      //       _this.choiceField = "purNo"
      //       _this.dlgWidth = "100%";
      //       _this.choiceV = !_this.choiceV
      //       _this.choiceTarget = _this.form
      //       _this.choiceTle = '選擇輔料採購單'
      //     }
      //     if (_this.form.purNo === '' || _this.form.purNo === null) {
      //       _this.form.deliNo = ''
      //     }
      //   },
      // },
      // {
      //   label: _this.$t("whseField.shdh"),
      //   prop: "deliNo",
      //   span: 6,
      //   placeholder: " ",
      //   display: _this.hide === '2' || _this.hide === '6' ? true : false,
      //   disabled: _this.isAdd ? false : true,
      //   click: () => {
      //     if (!_this.form.purNo) {
      //       _this.$tip.error("请先选择采购单号!");
      //       return
      //     }
      //     if (_this.isAdd) {
      //       _this.choiceField = "deliNo"
      //       _this.choiceQ.deliType = 'yarns'
      //       _this.dlgWidth = "60%";
      //       _this.choiceV = !_this.choiceV
      //       _this.choiceTarget = _this.form
      //       _this.choiceTle = _this.$t("choicDlg.xzshd")
      //     }
      //   },
      // },
      {
        label: _this.$t("whseField.wfcmc"),
        prop: "factoryId",
        cell: false,
        type: "select",
        dicData: getDicT("vWhseRetyarninoutPlan", "refName", "refCode"),
        span: 6,
        display: _this.hide === "6",
        disabled: !_this.isAdd,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "factoryId";
          // this.choiceQ.registerNo = this.form;
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = _this.$t("choicDlg.xzwfflpl");
        }
      },
      {
        label: _this.$t("whseField.jgzld"),
        prop: "instructId",
        cell: false,
        span: 6,
        display: _this.hide === "6",
        disabled: !_this.isAdd,
        type: "select",
        dicData: getDicT("viWhseProcessinstruct", "instructId", "instructId"),
        // click: () => {
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceField = "instructId";
        //   this.choiceQ.registerNo = this.form;
        //   _this.choiceTarget = _this.form;
        //   _this.dlgWidth = "100%";
        //   _this.choiceTle = $t('iaoMng.xzzld');

        // }
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
        label: _this.$t("iaoMng.fldjbh"),
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: _this.isAdd ? false : true,
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "registerNo";
            _this.dlgWidth = "60%";
            _this.choiceV = !_this.choiceV;
            _this.choiceTarget = _this.form;
            _this.choiceTle = _this.$t("choicDlg.lfldj"); //'選擇來輔料登記'
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
        span: 6,
        cell: false,
        display: _this.hide === "1" ? true : false,
        width: 100,
        disabled: true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "5" ? false : true,
        dicData: getDIC("whse_yinstatus"),
        disabled: true
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "4",
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        disabled: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
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
    height: "calc(100vh - 232px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "輔料入仓OID",
        prop: "whseYarninoid",
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
        valueFormat: "yyyy-MM-dd HH:mm:ss"
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
        width: 180
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_AccessoriesType")
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
      // {
      //   label: _this.$t("whseField.chdh"),
      //   prop: "purNo",
      //   cell: true,
      //   hide: _this.hide === '2' || _this.hide === '6' ? false : true,
      //   width: 220,
      //   placeholder: _this.$t("whseField.xzchdh"),
      //   click: () => {
      //     _this.choiceV = !_this.choiceV;
      //     _this.choiceField = "purNo";
      //     // _this.choiceQ.purType = '5'
      //     _this.oldData = _this.chooseData
      //     _this.choiceTarget = _this.oldData;
      //     _this.choiceTle = '選擇輔料採購單';
      //   }
      // },
      // {
      //   label: "送貨單号",
      //   prop: "deliNo",
      //   cell: true,
      //   width: 180,
      //   type: "select",
      //   hide: _this.hide === '2' || _this.hide === '6' ? false : true,
      //   click: (val) => {
      //     if (!_this.chooseData.purNo) {
      //       _this.$tip.error(_this.$t("whseField.xzchdh"))
      //       return
      //     }
      //     _this.choiceV = !_this.choiceV
      //     _this.choiceQ.deliType = 'yarns'
      //     _this.choiceField = "deliNo"
      //     _this.oldData = _this.chooseData
      //     // _this.choiceQ.purNo = this.oldData.purNo
      //     _this.choiceTarget = _this.oldData
      //     _this.choiceTle = _this.$t("choicDlg.xzshd")
      //   },
      //   placeholder: "請選擇送貨單號"
      // },
      {
        label: _this.$t("iaoMng.fldjbh"), //"輔料登记编号",
        prop: "registerNo",
        cell: true,
        width: 160,
        type: "select",
        hide: _this.hide === "1" ? false : true,
        click: () => {
          _this.choiceField = "registerNo";
          _this.choiceV = !_this.choiceV;
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.lfldj");
        }
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("salIncomacc", "custNo", "registerNo")
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
        label: _this.$t("whseField.wfcdh"), // "外工厂代號",
        prop: "factoryId",
        cell: true,
        hide: _this.hide === "5" ? false : true,
        width: 150
      },
      {
        label: _this.$t("whseField.wfcmc"), //"外工厂名稱",
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseRetyarninoutPlan", "refName", "refCode")
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
        hide: _this.hide != "5" && _this.hide != "4" ? false : true,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        hide: false,
        width: 100,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
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
export function rsxkr2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === "4" ? "calc(100vh - 312px)" : "calc(100vh - 312px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"), //"材料名稱",
        prop: "materialName",
        cell: false,
        width: 290,
        type: "select",
        props: {
          label: "chinName",
          value: "hardwareId"
        },
        dicData: getXDicT("basProductivesupplies")
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 150
      },
      {
        label: _this.$t("energy.sl"),
        prop: "poQty",
        cell: true,
        width: 100,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitQty",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      }
    ]
  };
}

export function backYarn(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 242px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseYarninDtloid",
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
        label: "whseRetratyarnnoticeoid",
        prop: "whseRetratyarnnoticeoid",
        hide: true
      },
      {
        label: _this.$t("whseField.scdh"),
        prop: "poNo",
        cell: true,
        width: 150,
        click: val => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "yarnsId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "輔料系統編號";
        }
      },
      {
        label: "輔料描述",
        prop: "yarnsName",
        cell: false,
        width: 350,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
      },
      {
        label: "纱批/批号",
        prop: "batchNo",
        cell: true,
        width: 200
      },
      {
        label: "箱数",
        prop: "cartonNum",
        cell: true,
        width: 120,
        align: "right"
      },
      // {
      //   label: "每箱锭数",
      //   prop: "everySpindle",
      //   cell: true,
      //   width: 120,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: "尾箱锭数",
      //   prop: "tailSpindle",
      //   cell: true,
      //   width: 120,
      //   align: "right",
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
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: true,
        width: 180
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "placeOrigin",
        cell: true,
        width: 150,
        type: "select",
        dicData: getDIC("Whse_Origin")
      },
      {
        label: "入仓数量",
        prop: "whseNum",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        cell: true,
        width: 150,
        // type: "select",
        click: val => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.xzkh");
        },
        placeholder: "請選擇客戶編號"
      },
      {
        label: "送货单重量",
        prop: "cartonWei",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: "輔料入仓_FK",
        prop: "whseYarninFk",
        hide: true
      }
    ]
  };
}
