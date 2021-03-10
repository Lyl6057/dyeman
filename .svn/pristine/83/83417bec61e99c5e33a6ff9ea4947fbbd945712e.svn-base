import { getDIC, getDicT, getXDicT, postDicT } from '@/config'

export function rhl1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "入仓编号",
        prop: "yinId",
        span: 6,
        placeholder: " ",
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime", format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },

      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '2' || _this.hide === "8" ? true : false,

      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        display: _this.hide === '2' ? true : false,
        placeholder: " ",
      },
      {
        label: "来料编号",
        prop: "registerNo",
        display: _this.hide === '1' ? true : false,
        span: 6,
        placeholder: " ",
      },

      {
        label: "加工廠名稱",
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        display: _this.hide === "5" ? true : false,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        display: _this.hide === '5' ? false : true,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_yinstatus')
      },

      {
        label: "财务状态",
        prop: "finStatus",
        display: _this.hide === '5' ? false : true,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus')
      },
    ],
  }
}
export function rhl2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "入仓编号",
        prop: "yinId",
        span: 6,
        placeholder: " ",

      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",

        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide != '2' && _this.hide != "8" ? false : true,
        click: (val) => {
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
          //         _this.choiceTle = "染化料申购採購單";
          //         // _this.iptChange(_this.chooseData);
          //       } else {
          //         _this.choiceV = !_this.choiceV
          //         _this.choiceField = "purNo";
          //         // _this.oldData = _this.chooseData;
          //         _this.choiceTarget = _this.form;
          //         _this.choiceTle = "染化料採購單";
          //         // _this.iptChange(_this.chooseData);
          //       }
          //     })
          // } else {
          //   if (_this.hide === '8') {
          //     _this.choiceV = !_this.choiceV
          //     _this.choiceField = "purNo";
          //     // _this.oldData = _this.chooseData;
          //     _this.choiceTarget = _this.form;
          //     _this.choiceTle = "染化料申购採購單";
          //     // _this.iptChange(_this.chooseData);
          //   } else {
          // _this.choiceV = !_this.choiceV
          // _this.choiceField = "purNo";
          // // _this.oldData = _this.chooseData;
          // _this.choiceTarget = _this.form;
          // _this.choiceTle = "染化料採購單";
          // _this.iptChange(_this.chooseData);
          //   }
          // }
        },
        // change: () => {
        //   if (_this.isAdd) {
        //     _this.form.deliNo = ''
        //   }

        // }
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        display: _this.hide != '2' && _this.hide != "8" ? false : true,
        disabled: true,
        // click: (val) => {
        //   if (!_this.form.purNo) {
        //     _this.$tip.error("請先選擇採購單號！")
        //     return
        //   }
        //   _this.choiceV = !_this.choiceV
        //   // _this.choiceQ.deliType = 'chemical'
        //   _this.choiceField = "deliNo"
        //   // _this.oldData = _this.chooseData
        //   _this.choiceQ.purNo = _this.oldData.purNo
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = '送貨單'
        // },
        // change: () => {
        //   if (_this.isAdd) {
        //     _this.mx = []
        //     _this.chooseData = {}
        //   }

        // }
      },
      {
        label: "来料编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: false,
        click: () => {
          _this.choiceField = "registerNo"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.form
          _this.choiceTle = '染化料来料'
        },
      },
      {
        label: "客户",
        prop: "custId",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: true
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        disabled: false,
        display: true,
        dicData:
          getDIC('whse_yinstatus')
      },
      {
        label: "加工厂名稱",
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "5" ? true : false,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode"),
        // click: () => {
        //   _this.choiceField = "factoryId"
        //   _this.choiceV = !_this.choiceV
        //   _this.oldData = _this.chooseData
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = '外厂染化料配料计划',
        //     _this.iptChange(_this.chooseData);
        // },
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        display: true,
        disabled: true,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === '6' ? false : true,
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
      },
      // {
      //   label: "财务状态",
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
    ],
  }


}
export function rhlDetailF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "入仓编号",
        prop: "yinId",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '2' ? false : true,
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      // {
      //   label: "检验状态",
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
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        disabled: true, format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      // {
      //   label: "财务状态",
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
    ],
  }


}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '5' ? "calc(100vh - 250px)" : "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "染化料入仓OID",
        prop: "whseChemicalinoid",
        hide: true,
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
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true,
      },
      {
        label: "入仓编号",
        prop: "yinId",
        cell: false,
        width: 200,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC('Whse_CalicoType'),
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        width: 190,
        align: "center",
      },
      {
        label: "来料编号",
        prop: "registerNo",
        cell: true,
        width: 200,
        hide: _this.hide === "1" ? false : true,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        placeholder: "請選擇来料编号",
        // click: () => {
        //   _this.choiceField = "registerNo"
        //   _this.choiceV = !_this.choiceV
        //   _this.oldData = _this.chooseData
        //   _this.choiceTarget = _this.oldData
        //   _this.choiceTle = '染化料来料'
        // },
      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("salEmbryogenesis", "custCode", "registerNo"),
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "custId";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = "客戶編號";
        //   _this.iptChange(_this.chooseData);
        // },
        // placeholder: "請選擇客戶編號"
      },
      {
        label: "客戶名称",
        prop: "custName",
        cell: false,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        hide: _this.hide === "1" ? false : true,
        width: 150,
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "custId";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = "客戶編號";
        //   _this.iptChange(_this.chooseData);
        // },
        // placeholder: "請選擇客戶編號"
      },
      {
        label: "采购单号",
        prop: "purNo",
        cell: false,
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        width: 180,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: (val) => {
          // if (_this.hide === '8') {
          //   _this.choiceV = !_this.choiceV
          //   _this.choiceField = "purNo";
          //   _this.oldData = _this.chooseData;
          //   _this.choiceTarget = _this.oldData;
          //   _this.choiceTle = "染化料申购採購單";
          //   _this.iptChange(_this.chooseData);
          // } else {
          //   _this.choiceV = !_this.choiceV
          //   _this.choiceField = "purNo";
          //   _this.oldData = _this.chooseData;
          //   _this.choiceTarget = _this.oldData;
          //   _this.choiceTle = "染化料採購單";
          //   _this.iptChange(_this.chooseData);
          // }

        },
      },
      {
        label: "供應商编号",
        prop: "suppId",
        cell: false,
        hide: _this.hide === "8" ? false : true,
        width: 120,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        type: "select",
        dicData: getDicT("purSinglepo", "suppId", "poNo")
      },
      {
        label: "供應商名稱",
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
        dicData: getDicT("basSupplier", "suppName", "suppId",),
      },
      {
        label: "送货单号",
        prop: "deliNo",
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        cell: false,
        width: 180,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: (val) => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error("請先選擇採購單號！")
            return
          }
          _this.choiceV = !_this.choiceV
          // _this.choiceQ.deliType = 'chemical'
          _this.choiceField = "deliNo"
          _this.oldData = _this.chooseData
          _this.choiceQ.purNo = _this.oldData.purNo
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '送貨單'
        },
      },


      {
        label: "加工厂代號",
        prop: "factoryId",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        placeholder: "加工厂代號",
        click: () => {
          _this.choiceField = "factoryId"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '外厂染化料配料计划',
            _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "加工厂名稱",
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: "指令单",
        prop: "instructId",
        hide: true,
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
        hide: _this.hide === '5' ? true : false,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "财务状态",
        prop: "finStatus",
        cell: false,
        width: 120,
        hide: _this.hide === '5' ? true : false,
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
        width: 120
      },
      {
        label: "授权用户",
        prop: "sysReplacement",
        hide: true,
      },
      {
        label: "所属岗位",
        prop: "sysPostn",
        hide: true,
      },
      {
        label: "所属部门",
        prop: "sysDivision",
        hide: true,
      },
      {
        label: "所属组织",
        prop: "sysOrg",
        hide: true,
      },
      {
        label: "最后修改用户",
        prop: "sysLastUpdBy",
        hide: true,
        width: 150,
      },
      {
        label: "最后修改日期",
        prop: "sysLastUpd",
        hide: true,
        type: "datetime",
        width: 180,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
      },
    ],
  }

}
let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
export function rhl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 325px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
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
        hide: true,
      },
      {
        label: "染化料编码",
        prop: "chemicalId",
        cell: false,
        width: 180,
        placeholder: "請選擇染化料編碼",
        click: (val) => {
          // _this.choiceV = !_this.choiceV
          // _this.choiceField = "chemicalId";
          // _this.oldData = _this.chooseData;
          // _this.choiceTarget = _this.oldData;
          // _this.choiceTle = "化工原料";
          _this.iptChange(_this.chooseData);

        },
      },
      {
        label: "染化料名称",
        prop: "chemicalName",
        cell: false,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
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
      //   label: "生产单号",
      //   prop: "prodNo",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: "码卡号",
      //   prop: "fabticket",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: "批号",
        prop: "batchNo",
        cell: false,
        width: 220,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      // {
      //   label: "疋号",
      //   prop: "countingNo",
      //   cell: true,
      //   width: 100,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: "重量",
        prop: "weight",
        cell: false,
        width: 100,
        align: "right",

      },
      {
        label: "重量单位",
        prop: "weightUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
      },
      {
        label: "客户编号",
        prop: "custId",
        cell: false,
        hide: true,
        width: 150,
      },
    ]
  }

}
export function rhl3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 325px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlboid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
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
        hide: true,
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: true, width: 220,
        change: (val) => {
          _this.iptPhChange(_this.choosePhData);
        },
      },
      {
        label: "产地",
        prop: "origin",
        cell: true,
        width: 120,
        change: (val) => {
          _this.iptPhChange(_this.choosePhData);
        },
        type: 'select',
        dicData:
          getDIC('Whse_Origin'),
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
        change: (val) => {
          _this.iptPhChange(_this.choosePhData);
        },
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        click: (val) => {
          _this.iptPhChange(_this.choosePhData);
        },
      },

      {
        label: "染化料入仓明细产地",
        prop: "whseChemicalinDtlaFk",
        hide: true,
        width: 150,
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      }

    ]
  }

}

export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
      },
      // {
      //   label: "供应商",
      //   prop: "suppId",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "材料编号",
        prop: "materialNum",
        span: 6,
        placeholder: " ",
      },
    ],
  }
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
        align: "center",
      },
      {
        label: "采购单号",
        prop: "purNo",
        cell: false,
        width: 180,
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
        label: "送货单号",
        prop: "deliNo",
        cell: false,
        width: 180,
      },
      {
        label: "送货日期",
        prop: "deliDate",
        type: "date",
        width: 120,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
      },
      {
        label: "材料编号",
        prop: "materialNum",
        cell: false,
        width: 120,
      },
      {
        label: "材料名称",
        prop: "chinName",
        cell: false,
        width: 160,
      },
      {
        label: "型号",
        prop: "model",
        cell: false,
        width: 120,
      },
      {
        label: "规格",
        prop: "itemSpec",
        cell: false,
        width: 100,
      },
      {
        label: "重量",
        prop: "deliQty",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: "单位",
        prop: "deliUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
      },
      {
        label: "批号",
        prop: "batNo",
        cell: false,
        width: 220,
      },
    ],
  }

}

