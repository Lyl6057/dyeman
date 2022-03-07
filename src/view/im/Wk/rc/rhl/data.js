import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

let customer = getDicT("basCustomer", "custName", "custCode");
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
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },

      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" || _this.hide === "8" ? true : false
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        display: _this.hide === "2" ? true : false,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.llbh"),
        prop: "registerNo",
        display: _this.hide === "1" ? true : false,
        span: 6,
        placeholder: " "
      },

      {
        label: _this.$t("whseField.wfjgc"),
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        display: _this.hide === "5" ? true : false,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        display: _this.hide === "5" ? false : true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yinstatus")
      },

      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        display: _this.hide === "5" ? false : true,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_finStatus")
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
        type: "datetime",

        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide != "2" && _this.hide != "8" ? false : true,
        click: val => {
          // if (_this.mx.length > 0) {
          //   _this.$tip
          //     .cofirm(
          //       "採購單號變化將同時清空對應的明細，是否繼續？",
          //       _this,
          //       {}
          //     )
          //     .then(() => {
          //       if (_this.hide === '8') {
          //         _this.choiceV = !_this.choiceV
          //         _this.choiceField = "purNo";
          //         // _this.oldData = _this.chooseData;
          //         _this.choiceTarget = _this.form;
          //         _this.choiceTle = this.$t("choicDlg.rhlsgcgd");
          //         // _this.iptChange(_this.chooseData);
          //       } else {
          //         _this.choiceV = !_this.choiceV
          //         _this.choiceField = "purNo";
          //         // _this.oldData = _this.chooseData;
          //         _this.choiceTarget = _this.form;
          //         _this.choiceTle = _this.$t("choicDlg.xzylcgd");
          //         // _this.iptChange(_this.chooseData);
          //       }
          //     })
          // } else {
          //   if (_this.hide === '8') {
          //     _this.choiceV = !_this.choiceV
          //     _this.choiceField = "purNo";
          //     // _this.oldData = _this.chooseData;
          //     _this.choiceTarget = _this.form;
          //     _this.choiceTle = this.$t("choicDlg.rhlsgcgd");
          //     // _this.iptChange(_this.chooseData);
          //   } else {
          // _this.choiceV = !_this.choiceV
          // _this.choiceField = "purNo";
          // // _this.oldData = _this.chooseData;
          // _this.choiceTarget = _this.form;
          // _this.choiceTle = _this.$t("choicDlg.xzylcgd");
          // _this.iptChange(_this.chooseData);
          //   }
          // }
        }
        // change: () => {
        //   if (_this.isAdd) {
        //     _this.form.deliNo = ''
        //   }

        // }
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        display: _this.hide != "2" && _this.hide != "8" ? false : true,
        disabled: true
        // click: (val) => {
        //   if (!_this.form.purNo) {
        //     _this.$tip.error(_this.$t("whseField.xzchdh"))
        //     return
        //   }
        //   _this.choiceV = !_this.choiceV
        //   // _this.choiceQ.deliType = 'chemical'
        //   _this.choiceField = "deliNo"
        //   // _this.oldData = _this.chooseData
        //   _this.choiceQ.purNo = _this.oldData.purNo
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = _this.$t('choicDlg.xzshd')
        // },
        // change: () => {
        //   if (_this.isAdd) {
        //     _this.mx = []
        //     _this.chooseData = {}
        //   }

        // }
      },
      {
        label: _this.$t("whseField.llbh"),
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd,
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "registerNo";
            _this.choiceV = !_this.choiceV;
            _this.dlgWidth = "60%";
            _this.choiceTarget = _this.form;
            _this.choiceTle = _this.$t("choicDlg.xzlyl");
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
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: true,
        type: "select",
        dicData: customer
      },

      {
        label: _this.$t("whseField.wfcmc"),
        prop: "factoryId",
        cell: false,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode"),
        span: 6,
        display: _this.hide === "5",
        disabled: !_this.isAdd,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "factoryId";
          // this.choiceQ.registerNo = this.form;
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = _this.$t("choicDlg.xzwfylpl");
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
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        disabled: true,
        display: true,
        dicData: getDIC("whse_yinstatus")
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        display: true,
        disabled: true,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === "6" ? false : true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      }
      // {
      //   label: _this.$t("whseField.cwzt"),
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
    ]
  };
}
export function rhlDetailF(_this) {
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
      // {
      //   label: _this.$t("whseField.jyzt"),
      //   prop: "yinStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   display: true,
      //   dicData:
      //     getDIC('whse_yinstatus')
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
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        disabled: true,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true
      }
      // {
      //   label: _this.$t("whseField.cwzt"),
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
    ]
  };
}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === "5" ? "calc(100vh - 232px)" : "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "染化料入仓OID",
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
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: val => {
          _this.iptChange(_this.chooseData);
        },
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
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
        cell: false,
        width: 180,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        }
      },
      {
        label: _this.$t("whseField.rclx"),
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("Whse_ChemType"),
        change: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.rcrq"),
        prop: "yinDate",
        cell: false,
        type: "datetime",
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
        width: 160,
        align: "center"
      },
      {
        label: _this.$t("whseField.llbh"),
        prop: "registerNo",
        cell: false,
        width: 180,
        hide: _this.hide === "1" ? false : true,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        }
        // click: () => {
        //   _this.choiceField = "registerNo"
        //   _this.choiceV = !_this.choiceV
        //   _this.oldData = _this.chooseData
        //   _this.choiceTarget = _this.oldData
        //   _this.choiceTle = '染化料来料'
        // },
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 120,
        type: "select",
        dicData: getDicT("", "custNo", "registerNo")
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "custId";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = _this.$t("whseField.khbh");
        //   _this.iptChange(_this.chooseData);
        // },
        // placeholder: "請選擇客戶編號"
      },
      {
        label: _this.$t("whseField.khmc"),
        prop: "custName",
        cell: false,
        type: "select",
        dicData: customer,
        hide: _this.hide === "1" ? false : true,
        width: 280
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "custId";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = _this.$t("whseField.khbh");
        //   _this.iptChange(_this.chooseData);
        // },
        // placeholder: "請選擇客戶編號"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        cell: false,
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        width: 180,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        click: val => {
          // if (_this.hide === '8') {
          //   _this.choiceV = !_this.choiceV
          //   _this.choiceField = "purNo";
          //   _this.oldData = _this.chooseData;
          //   _this.choiceTarget = _this.oldData;
          //   _this.choiceTle = this.$t("choicDlg.rhlsgcgd");
          //   _this.iptChange(_this.chooseData);
          // } else {
          //   _this.choiceV = !_this.choiceV
          //   _this.choiceField = "purNo";
          //   _this.oldData = _this.chooseData;
          //   _this.choiceTarget = _this.oldData;
          //   _this.choiceTle = _this.$t("choicDlg.xzylcgd");
          //   _this.iptChange(_this.chooseData);
          // }
        }
      },
      {
        label: _this.$t("whseField.gysbh"),
        prop: "suppId",
        cell: false,
        hide: _this.hide === "8" ? false : true,
        width: 120,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        type: "select",
        dicData: getDicT("purSinglepo", "suppId", "poNo")
      },
      {
        label: _this.$t("whseField.gysmc"),
        prop: "$suppId",
        cell: false,
        hide: _this.hide === "8" ? false : true,
        width: 300,
        // change: (val) => {
        //   if (val.value === '') {
        //     _this.iptChange(_this.chooseData);
        //   }
        // },
        type: "select",
        dicData: getDicT("basSupplier", "suppName", "suppId")
      },
      {
        label: _this.$t("whseField.shdh"),
        prop: "deliNo",
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        cell: false,
        width: 180,
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        click: val => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error(_this.$t("whseField.xzchdh"));
            return;
          }
          _this.choiceV = !_this.choiceV;
          // _this.choiceQ.deliType = 'chemical'
          _this.choiceField = "deliNo";
          _this.oldData = _this.chooseData;
          _this.choiceQ.purNo = _this.oldData.purNo;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = _this.$t("choicDlg.xzshd");
        }
      },

      {
        label: _this.$t("whseField.wfcdh"),
        prop: "factoryId",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        placeholder: _this.$t("whseField.wfcdh"),
        click: () => {
          _this.choiceField = "factoryId";
          _this.choiceV = !_this.choiceV;
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          (_this.choiceTle = _this.$t("choicDlg.xzwfylpl")),
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
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: _this.$t("whseField.zld"),
        prop: "instructId",
        hide: true
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC("whse_yinstatus"),
        hide: _this.hide === "5" ? true : false,
        change: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.cwzt"),
        prop: "finStatus",
        cell: false,
        width: 135,
        hide: _this.hide === "5" ? true : false,
        type: "select",
        dicData: getDIC("whse_finStatus"),
        click: val => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: _this.$t("whseField.czy"),
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        width: 120
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
        focus: val => {
          _this.iptChange(_this.chooseData);
        },
        change: val => {
          if (val.value === "") {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center"
      }
    ]
  };
}
let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
export function rhl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 312px)",
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
        label: "Whse_ChemicalIn_dtlaOID",
        prop: "whseChemicalinDtlaoid",
        hide: true
      },
      {
        label: _this.$t("whseField.ylbh"), //"化工原料編號",
        prop: "chemicalId",
        cell: false,
        width: 140
      },
      {
        label: _this.$t("whseField.ylmc"),
        prop: "chemicalName",
        cell: false
        // width: 350,
      },
      // {
      //   label: "染化料英文名稱 ",
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
      // {
      //   label: _this.$t("whseField.ph"),
      //   prop: "batchNo",
      //   cell: true,
      //   width: 180,
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.chooseData.list.forEach((item, index) => {
      //         item.batchNo = _this.chooseData.batchNo
      //       })
      //     })
      //   }
      // },
      // {
      //   label: _this.$t("whseField.ph2"),
      //   prop: "countingNo",
      //   cell: true,
      //   width: 100,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
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
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        cell: false,
        hide: true,
        width: 150
      }
    ]
  };
}
export function rhl3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
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
      {
        label: "Whse_ChemicalIn_dtlbOID",
        prop: " whseChemicalinDtlboid",
        hide: true
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        width: 180,
        change: val => {
          _this.iptPhChange(_this.choosePhData);
        }
      },
      {
        label: _this.$t("whseField.cd"),
        prop: "origin",
        cell: true,
        width: 120,
        change: val => {
          _this.iptPhChange(_this.choosePhData);
        },
        type: "select",
        dicData: getDIC("Whse_Origin")
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
        change: val => {
          _this.iptPhChange(_this.choosePhData);
        }
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        click: val => {
          _this.iptPhChange(_this.choosePhData);
        }
      },

      {
        label: "染化料入仓明细产地",
        prop: "whseChemicalinDtlaFk",
        hide: true,
        width: 150
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
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
        prop: "purNo",
        span: 6,
        placeholder: " "
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
        placeholder: " "
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        span: 6,
        placeholder: " "
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
    height: "calc(100vh - 208px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    column: [
      // {
      //   label: "#",
      //   prop: "check",
      //   width: 55,
      //   cell: true,
      //   type: "switch",
      //   // activeIconClass: "el-icon-check",
      //   // inactiveIconClass: "el-icon-check",
      //   // dicData: [
      //   //   {
      //   //     value: true,
      //   //     label: " "
      //   //   },
      //   //   {
      //   //     value: false,
      //   //     label: " "
      //   //   }
      //   // ],
      //   click: (val) => {
      //     _this.cellClick()
      //   }
      // },
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.chdh"),
        prop: "purNo",
        cell: false,
        width: 180
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
        width: 180
      },
      {
        label: _this.$t("whseField.shrq"),
        prop: "deliDate",
        type: "date",
        width: 120,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialNum",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chinName",
        cell: false,
        width: 160
      },
      {
        label: _this.$t("whseField.xh"),
        prop: "model",
        cell: false,
        width: 120
      },
      {
        label: _this.$t("whseField.gg"),
        prop: "itemSpec",
        cell: false,
        width: 100
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "deliQty",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "deliUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batNo",
        cell: false,
        width: 220
      }
    ]
  };
}
