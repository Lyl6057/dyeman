import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let unit = getDIC("bas_matUnit") // 單位
let basChemicalmat = getXDicT("BasChemicalmatNew") // 化工原料
let basPigment = getXDicT("basPigment") // 颜料

// console.log(basChemicalmat);
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
      disabled: true,
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
    height: "calc(100vh - 275px)",
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
      width: 180,

    },
    {
      label: "入仓类型",
      prop: "yinType",
      cell: false,
      width: 100,
      type: "select",
      dicData: _this.data === '化工原料' || _this.data === '颜料' ? getDIC('Whse_CalicoType') : getDIC('Whse_AccessoriesType'),

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
      width: 160,

    },
    {
      label: "供應商编号",
      prop: "suppId",
      cell: false,
      width: 110,
      type: "select",
      dicData: _this.data === '紗線' ? getDicT("purYarnspo", "suppId", "poNo") : _this.data === '胚布' ? getDicT("purCalicopo", "suppId", "poNo") : _this.data === '顏料' ? getDicT("purDelivery", "suppId", "deliNo", { deliType: "dyes" }) : getDicT("purChemicalpo", "suppId", "poNo"),
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
      width: 160,
    },
    {
      label: "检验状态",
      prop: "yinStatus",
      cell: false,
      width: 110,
      type: "select",
      dicData: getDIC('whse_yinstatus'),

    },
    {
      label: "财务状态",
      prop: "finStatus",
      cell: false,
      width: 110,
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
      width: 110
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
    height: "calc(100vh - 310px)",
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
      hide: _this.datas === '生產輔料' ? false : true
    },
    {
      label: "材料名称",
      prop: "chinName",
      cell: false,
      width: 180,
      hide: _this.datas === '生產輔料' ? false : true,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      }
      // dicData: getDicT("basHardwarearticles", "chinName", "hardwareId")
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
      hide: _this.datas === '化工原料' || _this.datas === '颜料' ? false : true
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas === '化工原料' || _this.datas === '颜料' ? false : true
    },
    {
      label: "数量",
      prop: "poQty",
      cell: false,
      width: 100,
      align: "right",
      hide: _this.datas != '化工原料' && _this.datas != '颜料' ? false : true,

    },
    {
      label: "单位",
      prop: "unitQty",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas != '化工原料' && _this.datas != '颜料' ? false : true,
    },
    ]
  }

}
export function sx2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 310px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'cartNum',
      type: 'sum'
    },
    {
      label: " ",
      name: 'netWei',
      type: 'sum'
    },
    {
      label: " ",
      name: 'whseNum',
      type: 'sum'
    },
    {
      label: " ",
      name: 'weight',
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
      label: "紗線編號",
      prop: "yarnsId",
      cell: false,
      width: 100,
    },
    {
      label: "紗線名稱",
      prop: "yarnsName",
      cell: false,
      width: 350,
      type: "select",
      // props: {
      //   label: "yarnsName",
      //   value: "yarnsId"
      // },
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: false,
      width: 120,
    },
    {
      label: "送貨單箱數",
      prop: "cartonNum", //cartNum
      cell: false,
      width: 110,
      align: "right",
    },
    {
      label: "送貨單重量",
      prop: "cartonWei", // netWei
      cell: false,
      width: 110,
      align: "right",
    },
    {
      label: "入倉箱數",
      prop: "whseNum",
      cell: true,
      width: 110,
      align: "right",
    },
    {
      label: "入倉重量",
      prop: "weight",
      cell: true,
      width: 110,
      align: "right",
    },
    {
      label: "单位",
      prop: "weightUnit", // weiUnit
      cell: false,
      width: 80,
      type: "select",
      dicData: unit,
    },
    {
      label: "每箱釘數",
      prop: "everySpindle",
      cell: true,
      width: 100,
      align: "right",
    },
    {
      label: "尾箱釘數",
      prop: "tailSpindle",
      cell: true,
      width: 100,
      align: "right",
    },
    {
      label: "紗牌",
      prop: "yarnsCard",
      cell: false,
      width: 120,
    },
    {
      label: "產地",
      prop: "placeOrigin",
      cell: false,
      width: 100,
    },
    ]
  }

}
export function pb2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 310px)",
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
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },

    {
      label: "胚布編號",
      prop: "calicoId",
      cell: false,
      width: 100,
    },
    {
      label: "胚布名稱",
      prop: "clothName",
      cell: false,
      width: 650,
      type: "select",
      // props: {
      //   label: "yarnsName",
      //   value: "yarnsId"
      // },
      dicData: getDicT("basCalico", "calicoName", "calicoId")
    },
    ]
  }

}

export function hgyl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 310px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },

    {
      label: "原料編號",
      prop: "chemicalId", // bcCode
      cell: false,
      width: 100,
    },
    {
      label: "原料名稱",
      prop: "chemicalName",//CNNameLong
      cell: false,
      width: 250,
    },
    {
      label: "英文名稱",
      prop: "ennamelong",
      cell: false,
      width: 250,
      props: {
        label: "ennamelong",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    {
      label: "型号",
      prop: "modeltype",
      cell: false,
      width: 120,
      props: {
        label: "modeltype",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    {
      label: "含固力/活力",
      prop: "vitality",
      cell: false,
      width: 120,
      props: {
        label: "vitality",
        value: "bcCode"
      },
      type: "select",
      dicData: basChemicalmat
    },
    ]
  }

}

export function yl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 310px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },

    {
      label: "顏料編號",
      prop: "chemicalId", // bcCode
      cell: false,
      width: 100,
    },
    {
      label: "顏料名稱",
      prop: "chemicalName",//CNNameLong
      cell: false,
      width: 250,
    },
    {
      label: "英文名稱",
      prop: "ennamelong",
      cell: false,
      width: 250,
      props: {
        label: "ennamelong",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
    },
    {
      label: "色光",
      prop: "bcColor",
      cell: false,
      width: 120,
      props: {
        label: "bcColor",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
    },
    {
      label: "力份",
      prop: "bcForce",
      cell: false,
      width: 120,
      props: {
        label: "bcForce",
        value: "bcCode"
      },
      type: "select",
      dicData: basPigment
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
    height: "calc(100vh - 272px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
    height: _this.datas === '颜料' || _this.datas === '化工原料' ? "calc(50vh - 198px)" : "calc(100vh - 285px)",
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
      label: "送货单号",
      prop: "deliNo",
      span: 6,
      placeholder: " ",
      disabled: _this.upDate
    },
    {
      label: "纱线编号",
      prop: "yarnsId",
      span: 6,
      placeholder: " ",
      display: _this.data === '紗線'
    },
    {
      label: "胚布编号",
      prop: "calicoId",
      span: 6,
      placeholder: " ",
      display: _this.data === '胚布'
    },
    {
      label: "原料编号",
      prop: "bcCode",
      span: 6,
      placeholder: " ",
      display: _this.data === '化工原料' || _this.data === '顏料'
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
    height: _this.upDate ? "calc(100vh - 180px)" : "calc(100vh - 200px)",
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
      prop: "poNo",
      cell: false,
      width: 170,
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
      width: 170,
    },
    // {
    //   label: "送货日期",
    //   prop: "deliDate",
    //   type: "date",
    //   width: 120,
    //   format: "yyyy-MM-dd",
    //   valueFormat: "yyyy-MM-dd",
    //   align: "center",
    // },
    {
      label: "紗線编号",
      prop: "yarnsId",
      cell: false,
      width: 110,
      hide: _this.data != '紗線'
    },
    {
      label: "紗線名稱",
      prop: "yarnsName",
      cell: false,
      hide: _this.data != '紗線'
      // width: 150,
    },
    {
      label: "胚布编号",
      prop: "calicoId",
      cell: false,
      width: 110,
      hide: _this.data != '胚布'
    },
    {
      label: "胚布名稱",
      prop: "calicoName",
      cell: false,
      hide: _this.data != '胚布'
      // width: 150,
    },
    {
      label: _this.data === '化工原料' ? "原料编号" : "顏料编号",
      prop: "bcCode",
      cell: false,
      width: 110,
      hide: _this.data != '化工原料' && _this.data != '顏料',
    },
    {
      label: _this.data === '化工原料' ? "原料名稱" : "顏料名稱",
      prop: "cnnamelong",
      cell: false,
      hide: _this.data != '化工原料' && _this.data != '顏料',
      width: 350,
    },

    {
      label: "重量",
      prop: "deliQty",
      cell: false,
      width: 80,
      align: "right",
      hide: _this.data != '化工原料' && _this.data != '顏料',
    },
    {
      label: "单位",
      prop: "deliUnit",
      cell: false,
      width: 60,
      type: "select",
      dicData: unit,
      hide: _this.data != '化工原料' && _this.data != '顏料',
    },
    {
      label: _this.data === '紗線' ? "箱數" : "箱數",
      prop: "cartNum",
      cell: false,
      width: 80,
      align: "right",
      hide: _this.data != '紗線'
    },

    {
      label: _this.data === '紗線' ? "重量" : "重量",
      prop: "netWei",
      cell: false,
      width: 80,
      align: "right",
      hide: _this.data != '紗線' && _this.data != '胚布'
    },
    {
      label: "单位",
      prop: "weiUnit",
      cell: false,
      width: 60,
      type: "select",
      hide: _this.data != '紗線' && _this.data != '胚布',
      dicData: unit
    },

    {
      label: "批号",
      prop: "batchNo",
      cell: false,
      width: 180,
    },
    ],
  }

}
