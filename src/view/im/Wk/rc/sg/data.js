import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let unit = getDIC("bas_matUnit")
export function rhl1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
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
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },

    {
      label: "采购单号",
      prop: "purNo",
      span: 6,
      placeholder: " ",

    },
    {
      label: "送货单号",
      prop: "deliNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "检验状态",
      prop: "yinStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC('whse_yinstatus')
    },

    {
      label: "财务状态",
      prop: "finStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC('whse_finStatus')
    },
    ],
  }
}
export function rhl2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: "入仓编号",
      prop: "yinId",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      span: 6,
      placeholder: " ",
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "采购单号",
      prop: "purNo",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: "送货单号",
      prop: "deliNo",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: "检验状态",
      prop: "yinStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      disabled: true,
      display: true,
      dicData: getDIC('whse_yinstatus')
    },
    {
      label: "财务状态",
      prop: "finStatus",
      span: 6,
      placeholder: " ",
      disabled: true,
      type: "select",
      dicData: getDIC('whse_finStatus'),
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
      dicData: postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
    },
    ],
  }


}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [{
      label: "化工原料入仓OID",
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
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      align: "center",
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: false,
      width: 200,

    },
    {
      label: "入仓类型",
      prop: "yinType",
      cell: false,
      width: 100,
      type: "select",
      dicData: _this.data === '化工原料' || _this.data === '颜料' ? getDIC('Whse_CalicoType') : _this.data === '紗線' ? getDIC('Whse_yinType') : getDIC('Whse_AccessoriesType'),

    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: false,
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: 120,
      align: "center",
    },
    {
      label: "采购单号",
      prop: "purNo",
      cell: false,
      width: 180,

    },
    {
      label: "供應商编号",
      prop: "suppId",
      cell: false,
      width: 110,
      type: "select",
      dicData: getDicT("purSinglepo", "suppId", "poNo"),
    },
    {
      label: "供應商名稱",
      prop: "$suppId",
      cell: false,
      width: 280,
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId",),

    },
    {
      label: "送货单号",
      prop: "deliNo",
      cell: false,
      width: 180,


    },



    {
      label: "检验状态",
      prop: "yinStatus",
      cell: false,
      width: 120,
      type: "select",
      dicData: getDIC('whse_yinstatus'),

    },
    {
      label: "财务状态",
      prop: "finStatus",
      cell: false,
      width: 120,
      type: "select",
      dicData: getDIC('whse_finStatus'),

    },
    {
      label: "操作员",
      prop: "sysCreatedby",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
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
      type: "date",
      width: 180,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      align: "center",
    },
    ],
  }

}
// let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
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
    sumColumnList: [{
      label: " ",
      name: 'weight',
      type: 'sum'
    },
    {
      label: " ",
      name: 'poQty',
      type: 'sum'
    },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: _this.datas === '化工原料' ? "化工原料编号" : "颜料编号",
      prop: "chemicalId",
      cell: false,
      width: 180,
      hide: _this.datas === '化工原料' || _this.datas === '颜料' ? false : true
    },
    {
      label: _this.datas === '化工原料' ? "化工原料名称" : "颜料名称",
      prop: "chemicalName",
      cell: false,
      width: 180,
      hide: _this.datas === '化工原料' || _this.datas === '颜料' ? false : true
    },
    {
      label: "材料编号",
      prop: "materialNum",
      cell: false,
      width: 180,
      hide: _this.datas === '化工原料' && _this.datas != '颜料' && _this.datas != '紗線' ? false : true
    },
    {
      label: "材料名称",
      prop: "chinName",
      cell: false,
      width: 180,
      hide: _this.datas != '化工原料' && _this.datas != '颜料' && _this.datas != '紗線' ? false : true,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      }
      // dicData: getDicT("basHardwarearticles", "chinName", "hardwareId")
    },
    {
      label: "紗線编号",
      prop: "yarnsId",
      cell: false,
      width: 180,
      hide: _this.datas != '紗線'
    },
    {
      label: "紗線名称",
      prop: "yarnsName",
      cell: false,
      width: 450,
      hide: _this.datas != '紗線',
      type: "select",
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
    },
    {
      label: "材料类型",
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
    },
    {
      label: "重量",
      prop: "weight",
      cell: false,
      width: 100,
      align: "right",
      hide: _this.datas === '化工原料' || _this.datas === '颜料' || _this.datas === '紗線' ? false : true
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas === '化工原料' || _this.datas === '颜料' || _this.datas === '紗線' ? false : true
    },
    {
      label: "数量",
      prop: "poQty",
      cell: false,
      width: 100,
      align: "right",
      hide: _this.datas != '化工原料' && _this.datas != '颜料' && _this.datas != '紗線' ? false : true,

    },
    {
      label: "单位",
      prop: "unitQty",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas != '化工原料' && _this.datas != '颜料' && _this.datas != '紗線' ? false : true,
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
    height: "calc(50vh - 198px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlboid",
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'weight',
      type: 'sum'
    },],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: "产地",
      prop: "origin",
      cell: true,
      width: 120,
      type: 'select',
      dicData: getDIC('Whse_Origin'),
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 120,
      align: "right",
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: unit,

    },
    ]
  }

}

export function rhl4C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.datas === '颜料' || _this.datas === '化工原料' ? "calc(50vh - 198px)" : "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'applyNum',
      type: 'sum'
    },],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "申购单号",
      prop: "appId",
      cell: true,
      width: 220,
    },
    {
      label: "分配数量",
      prop: "applyNum",
      cell: true,
      width: 120,
      align: "right",
    },
    ]
  }

}
export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
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
    height: "calc(100vh - 203px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    column: [{
      label: "#",
      prop: "index",
      width: 40,
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
      width: 110,
    },
    {
      label: "材料名称",
      prop: "chinName",
      cell: false,
      // width: 150,
    },
    {
      label: "型号",
      prop: "model",
      cell: false,
      width: 170,
      hide: _this.data === '紗線'
    },
    {
      label: "规格",
      prop: "itemSpec",
      cell: false,
      width: 150,
      hide: _this.data === '紗線'
    },
    {
      label: _this.data === '化工原料' || _this.data === '紗線' ? "重量" : "数量",
      prop: "deliQty",
      cell: false,
      width: 80,
      align: "right"
    },
    {
      label: "单位",
      prop: "deliUnit",
      cell: false,
      width: 60,
      type: "select",
      dicData: unit
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
