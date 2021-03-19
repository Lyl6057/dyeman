import { getDIC, getDicT, getXDicT, postDicT } from '@/config'

let customer = getDicT("basCustomer", "custName", "custCode")
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
        type: "datetime", format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
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
        disabled: true

      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",

        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide != '2' && _this.hide != "8" ? false : true,
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        display: _this.hide != '2' && _this.hide != "8" ? false : true,
        disabled: true,
      },
      {
        label: "来料编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd,
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "registerNo"
            _this.choiceV = !_this.choiceV
            _this.dlgWidth = "60%";
            _this.choiceTarget = _this.form
            _this.choiceTle = '選擇來顏料登記'
          }
        },
        change: () => {
          _this.mx = []
          _this.chooseData = {}
        }
      },
      {
        label: "客户",
        prop: "custName",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: true,
        type: "select",
        dicData: customer,
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
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "factoryId";
          // this.choiceQ.registerNo = this.form;
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = "選擇外廠化工原料配料計劃";


        },
      },
      {
        label: "加工指令單",
        prop: "instructId",
        cell: false,
        span: 6,
        display: _this.hide === '5',
        disabled: !_this.isAdd,
        type: "select",
        dicData:
          getDicT('viWhseProcessinstruct', "instructId", "instructId"),
        // click: () => {
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceField = "instructId";
        //   this.choiceQ.registerNo = this.form;
        //   _this.choiceTarget = _this.form;
        //   _this.dlgWidth = "100%";
        //   _this.choiceTle = "選擇指令單明細";

        // }
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.instructId === '' || _this.form.instructId === null) {
              _this.mx = []
              _this.chooseData = {}
            }
          })

        }
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        disabled: true,
        display: true,
        dicData:
          getDIC('whse_yinstatus')
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
    height: _this.hide === '5' ? "calc(100vh - 232px)" : "calc(100vh - 275px)",
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
        label: "创建日期",
        prop: "sysCreated",
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
        width: 160,
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC('Whse_DyesType'),
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: false,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 160,
        align: "center",
      },
      {
        label: "来料编号",
        prop: "registerNo",
        cell: false,
        width: 180,
        hide: _this.hide === "1" ? false : true,
        placeholder: "請選擇来料编号",
      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 120,
        type: "select",
        dicData: getDicT("pigmentIncomacc", "custNo", "registerNo"),
      },
      {
        label: "客戶名称",
        prop: "custName",
        cell: false,
        type: "select",
        dicData: customer,
        hide: _this.hide === "1" ? false : true,
        width: 280,
      },
      {
        label: "采购单号",
        prop: "purNo",
        cell: false,
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        width: 180,
      },
      {
        label: "供應商编号",
        prop: "suppId",
        cell: false,
        hide: _this.hide === "8" ? false : true,
        width: 120,
        type: "select",
        dicData: getDicT("purSinglepo", "suppId", "poNo")
      },
      {
        label: "供應商名稱",
        prop: "$suppId",
        cell: false,
        hide: _this.hide === "8" ? false : true,
        width: 300,
        type: "select",
        dicData: getDicT("basSupplier", "suppName", "suppId",),
      },
      {
        label: "送货单号",
        prop: "deliNo",
        hide: _this.hide === "2" || _this.hide === "8" ? false : true,
        cell: false,
        width: 180,
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
          _this.choiceTle = '外厂染化料配料计划'
        }
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
        label: "检验状态",
        prop: "yinStatus",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
        hide: _this.hide === '5' ? true : false,
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
    height: "calc(100vh - 315px)",
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
        label: "顏料編號",
        prop: "chemicalId",
        cell: false,
        width: 140,
      },
      {
        label: "顏料名称",
        prop: "chemicalName",
        cell: false,
        width: 350,
      },
      // {
      //   label: "染化料英文名稱 ",
      //   prop: "bcMatengname",
      //   cell: false,
      //   width: 180,
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
      // },
      // {
      //   label: "码卡号",
      //   prop: "fabticket",
      //   cell: true,
      //   width: 150,
      // },
      // {
      //   label: "批号",
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
      // // {
      // //   label: "疋号",
      // //   prop: "countingNo",
      // //   cell: true,
      // //   width: 100,
      // //   align: "right",
      // // },
      // {
      //   label: "重量",
      //   prop: "weight",
      //   cell: true,
      //   width: 100,
      //   align: "right",

      // },
      // {
      //   label: "单位",
      //   prop: "weightUnit",
      //   cell: true,
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("bas_matUnit"),
      // },
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
    height: "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
        cell: true, width: 180,
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

