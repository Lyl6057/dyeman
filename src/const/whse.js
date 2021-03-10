import { getDIC, getDicT, postDicT, getXDicT, getDbDicT } from '@/config/index'
import axios from 'axios';

let cust1 = getDicT("basCustomer", "custName", "custCode")
let cust2 = getDicT("basCustomer", "custCode", "custCode")
let supp = getDicT("basSupplier", "suppName", "suppId",)
let purAttr = getDIC("sal_purAttr")
let calicoType = getDIC("bas_calicoType")
let chemicalClass = getDIC("bas_chemicalClass")
let yarnsFlag = getDIC("pur_yarnsFlag")
let yarnsPaytype = getDIC("pur_yarnsPaytype")
let yarnsCollected = getDIC("pur_yarnsCollected")
let basHardware = getDicT("basHardware", "topcategoryName", "basHardwareoid")
let basAdsupplies = getDicT("basAdsupplies", "topcategoryName", "basAdsuppliesoid")
let matUnit = getDIC("bas_matUnit")

// 加工指令單明細
export function getInstructDtl(params) {
  return axios({
    url: '/api/viWhseProcessinstructdtl/page',
    method: 'get',
    params: params
  })
}
export const instructDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "指令單編號",
      prop: "instructId",
      span: 8,
      placeholder: " ",
    },
    {
      label: "批號",
      prop: "batchNo",
      span: 8,
      placeholder: " ",
    },

    {
      label: "紗線編號",
      prop: "materialId",
      span: 8,
      placeholder: " ",
    },
  ]

}

export const instructDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 20px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "指令單編號",
      prop: "instructId",
      width: 120,
    },
    {
      label: "批號",
      prop: "batchNo",
      width: 140
    },
    {
      label: "紗線編號",
      prop: "materialId",
      width: 140
    },
    {
      label: "紗線名稱",
      prop: "materialName",
      width: 350
    },
    {
      label: "重量",
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: "單位",
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: matUnit,

    },
  ]

}


// 操作员
export function getUcmlUser(params) {
  return axios({
    url: '/api/ucmlUser',
    method: 'get',
    params: params
  })
}

// 入仓分配
export function getSubscribe(params) {
  return axios({
    url: '/api/whseSubscribe/page',
    method: 'get',
    params: params
  })
}

// 来纱登记
export function getIncoming(params) {
  return axios({
    url: '/api/salIncomingyarn/page',
    method: 'get',
    params: params
  })
}
export const IncomingYarnF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "登记编号",
      prop: "registerNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客户",
      prop: "custCode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1,
    },
    {
      label: "来纱日期",
      prop: "yarnDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}
export const IncomingYarnC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "登记编号",
      prop: "registerNo",
    },
    {
      label: "客户",
      prop: "custCode",
      type: "select",
      dicData: cust1,
    },
    {
      label: "来纱日期",
      prop: "yarnDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}

// 来纱登记明細
export function getIncomingDtl(params) {
  return axios({
    url: '/api/salIncomingyarnDtl/page',
    method: 'get',
    params: params
  })
}
export const IncomingYarnDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "批号",
      prop: "batchNo",
      span: 6,
      placeholder: " ",
    },
  ]

}
export const IncomingYarnDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      width: 120
    },
    {
      label: "纱线名称",
      prop: "yarnsName",
      width: 350
    },
    {
      label: "批號",
      prop: "batchNo",
      width: 140
    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      width: 140
    },
    {
      label: "产地",
      prop: "placeOrigin",
      width: 120,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "箱数",
      prop: "carQty",
      width: 100,
      align: "right"
    },
    {
      label: "重量",
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: "單位",
      prop: "weightUnit",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit,
    },

  ]

}

// 来胚登记
export function getEmbryogenesis(params) {
  return axios({
    url: '/api/salEmbryogenesis/page',
    method: 'get',
    params: params
  })
}
export const EmbryogenesisF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "登记编号",
      prop: "registerNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客户",
      prop: "custCode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1,
    },
    {
      label: "来料日期",
      prop: "embryoDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}
export const EmbryogenesisC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "登记编号",
      prop: "registerNo",
    },
    // {
    //   label: "客户编号",
    //   prop: "custCode",
    //   type: "select",
    //   dicData: cust2,
    // },
    {
      label: "客户名称",
      prop: "custCode",
      type: "select",
      dicData: cust1,
    },
    {
      label: "来料日期",
      prop: "embryoDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}

// 来胚登记明細
export function getEmbryogenesisDtl(params) {
  return axios({
    url: '/api/salEmbryogenesisDtl/page',
    method: 'get',
    params: params
  })
}
export const EmbryogenesisDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "胚布系统编号",
      prop: "calicoId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "類別",
      prop: "calicoType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: calicoType,
    },
  ]

}
export const EmbryogenesisDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "胚布系统编号",
      prop: "calicoId",
      width: 120
    },
    {
      label: "胚布名称",
      prop: "clothName",
      // width: 350
    },
    {
      label: "類別",
      prop: "calicoType",
      width: 120,
      type: "select",
      dicData: calicoType,
    },
    {
      label: "疋数",
      prop: "countingNum",
      width: 100,
      align: "right"
    },
    {
      label: "克重",
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: "重量",
      prop: "weights",
      width: 100,
      align: "right"
    },
    {
      label: "單位",
      prop: "weightUnit",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit,
    },

  ]

}


// 來輔料登记
export function getSalIncomacc(params) {
  return axios({
    url: '/api/salIncomacc/page',
    method: 'get',
    params: params
  })
}
export const SalIncomaccF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "登记编号",
      prop: "registerNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客户",
      prop: "custNo",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust2,
    },
    {
      label: "来料日期",
      prop: "embryoDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}
export const SalIncomaccC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "登记编号",
      prop: "registerNo",
    },
    {
      label: "客户编号",
      prop: "custNo",
      type: "select",
      dicData: cust2,
    },
    {
      label: "客户名称",
      prop: "custName",
      type: "select",
      dicData: cust1,
    },
    {
      label: "来料日期",
      prop: "inDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}

// 纱线系统编号
export function getBasYarnsData(params) {
  return axios({
    url: '/api/basYarnsData/page',
    method: 'get',
    params: params
  })
}

export const BasYarnsDataF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: "紗線系统编号",
    //   prop: "yarnsId",
    //   span: 6,
    //   placeholder: " ",
    // },
    {
      label: "批号",
      prop: "batchNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "纺纱方式",
      prop: "spinningWay",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("bas_spinningWay")
    },
    {
      label: "品种",
      prop: "yarnsKind",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("bas_yarnsKind"),
    },
    // {
    //   label: "類別",
    //   prop: "yarnsType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDIC("bas_yarnsType"),
    // },
  ]

}

export const BasYarnsDataC = {
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
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "紗線系統編號",
      prop: "yarnsId",
      width: 130
    },
    {
      label: "纱线描述",
      prop: "yarnsName",
      width: 500
    },
    {
      label: "批号",
      prop: "batchNo",
      width: 130
    },
    {
      label: "色号",
      prop: "colorNo",
    },
    {
      label: "功能",
      prop: "functions",
      type: 'select',
      width: 200,
      multiple: true,
      dicData: getDIC("bas_yarnsFuntion")
    },
    {
      label: "产地",
      prop: "placeOrigin",
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "纺纱方式",
      prop: "spinningWay",
      width: 100,
      type: 'select',
      dicData: getDIC("bas_spinningWay")
    },
    {
      label: "品种",
      prop: "yarnsKind",
      type: 'select',
      dicData: getDIC("bas_yarnsKind")
    },
    {
      label: "纱牌",
      prop: "yarnsCard",
    },
  ]

}

// 胚布編碼
export function getBasCalico(params) {
  return axios({
    url: '/api/basCalico/page',
    method: 'get',
    params: params
  })
}

export const BasCalicoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: "编号",
    //   prop: "clothNo",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDicT("basEmbryoidcloth", 'basEmbryoidclothFk', 'clothNo')

    // },
    // {
    //   label: "名称",
    //   prop: "clothName",
    //   span: 8,
    //   placeholder: " ",

    // },
    {
      label: "胚布代号",
      prop: "calicoId",
      span: 8,
      placeholder: " ",
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: "类别",
      prop: "calicoType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: calicoType,
    },

    // {
    //   label: "胚布布类",
    //   prop: "basEmbryoidclothFk",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   // dicData: getDIC("bas_yarnsType"),
    // },
  ]

}

export const BasCalicoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 290px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "胚布编号",
      prop: "calicoId",
      width: 100,
    },
    {
      label: "胚布名称",
      prop: "calicoSname",
      width: 380,
      // type: "select",
      // dicData: getDicT("basEmbryoidcloth", 'clothName', 'basEmbryoidclothoid')
    },
    {
      label: "胚布全称",
      prop: "calicoName",
      width: 700,
      // type: "select",
      // dicData: getDicT("basEmbryoidcloth", 'clothName', 'basEmbryoidclothoid')
    },
    {
      label: "客人面料描述",
      prop: "gustCalicoName",
      width: 350,
    },
    {
      label: "客人成分要求",
      prop: "gustComponents",
      width: 200,
    },
    {
      label: "类别",
      prop: "calicoType",
      type: "select",
      dicData: calicoType,
      width: 80,
    },
    {
      label: "机种",
      prop: "machinetypeId",
      type: "select",
      dicData: getDIC("bas_calicoMachineType"),
      width: 120,
    },
    {
      label: "结构",
      prop: "structureId",
      type: "select",
      dicData: getDIC("bas_calicoStructure"),
      width: 100,
    },
    {
      label: "布类型",
      prop: "fabricsDesc",
      type: "select",
      dicData: getDIC("bas_clothorg"),
      width: 100,
    },
    {
      label: "纱长",
      prop: "yarnLong",
      width: 80,
      align: "right"
    },
    {
      label: "筒径",
      prop: "workDrum",
      width: 80,
      align: "right"
    },
    {
      label: "针距",
      prop: "fibreDesc",
      width: 80,
      align: "right"
      // dicData: getDIC("bas_yarnsFuntion")
    },
    {
      label: "幅宽",
      prop: "width",
      width: 80,
      align: "right"

    },
    {
      label: "克重",
      prop: "weight",
      width: 80,
      align: "right"
    },
    {
      label: "洗水方法",
      prop: "washMethod",
      width: 160,
    },

  ]

}

// 化工原料
export function getBasChemicalmat(params) {
  return axios({
    url: '/api/basChemicalmat/v1.0/listByPage',
    method: 'get',
    params: params
  })
}

export const BasChemicalmatF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: "配方类别",
    //   prop: "pfType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: [
    //     {
    //       value: 0,
    //       label: "化工原料"
    //     },
    //     {
    //       value: 1,
    //       label: "颜料"
    //     }
    //   ]
    // },
    {
      label: "一级分类",
      prop: "bcClass",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: chemicalClass
    },
    {
      label: "编号",
      prop: "bcCode",
      span: 6,
      placeholder: " ",
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: "原料名称",
      prop: "bcMatname",
      span: 6,
      placeholder: " ",

    },


    // {
    //   label: "胚布布类",
    //   prop: "basEmbryoidclothFk",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   // dicData: getDIC("bas_yarnsType"),
    // },
  ]

}

export const BasChemicalmatC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 207px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "编号",
      prop: "bcCode",
    },
    {
      label: "原料名称",
      prop: "bcMatname",

    },
    {
      label: "一级分类",
      prop: "bcClass",
      type: "select",
      dicData: chemicalClass
    },
    {
      label: "原料英文名称",
      prop: "bcMatengname",

    },

    {
      label: "色光",
      prop: "bcColor",

    },
    {
      label: "力份",
      prop: "bcForce",

    },
    // {
    //   label: "成份描述",
    //   prop: "fibreDesc",
    //   width: 200,
    //   // dicData: getDIC("bas_yarnsFuntion")
    // },


  ]

}

// 生產輔料
export function getProductivesupplies(params) {
  return axios({
    url: '/api/basProductivesupplies/page',
    method: 'get',
    params: params
  })
}

export const ProductivesuppliesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "编号",
      prop: "hardwareId",
      span: 8,
      placeholder: " ",
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: "生产大类",
      prop: "basProductionaccFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDicT("basProductionacc", "topcategoryName", "basProductionaccoid")

    },
    {
      label: "中文名称",
      prop: "chinName",
      span: 8,
      placeholder: " ",

    },

    {
      label: "型號",
      prop: "model",
      span: 8,
      placeholder: " ",
      // dicData: getDIC("bas_yarnsType"),
    },
  ]

}

export const ProductivesuppliesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "编号",
      prop: "hardwareId",
      width: 180
    },
    {
      label: "生产大类",
      prop: "basProductionaccFk",
      type: "select",
      dicData: getDicT("basProductionacc", "topcategoryName", "basProductionaccoid")
    },
    {
      label: "中文名称",
      prop: "chinName",
      width: 120

    },
    {
      label: "英文名称",
      prop: "engName",
      width: 120

    },

    {
      label: "规格",
      prop: "itemspec",

    },

    {
      label: "型号",
      prop: "model",

    },
    {
      label: "计量单位",
      prop: "msUnit",
      type: "select",
      dicData: matUnit

    },
    {
      label: "库存单位",
      prop: "skUnit",
      type: "select",
      dicData: matUnit

    },


  ]

}


// 五金
export function getBasHardwarearticles(params) {
  return axios({
    url: '/api/basHardwarearticles/page',
    method: 'get',
    params: params
  })
}

export const BasHardwarearticlesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "编号",
      prop: "hardwareId",
      span: 8,
      placeholder: " ",
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: "五金大类",
      prop: "basHardwareFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: basHardware

    },
    {
      label: "中文名称",
      prop: "chinName",
      span: 8,
      placeholder: " ",

    },

    {
      label: "型號",
      prop: "model",
      span: 8,
      placeholder: " ",
      // dicData: getDIC("bas_yarnsType"),
    },
  ]

}

export const BasHardwarearticlesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "编号",
      prop: "hardwareId",
      width: 180
    },
    {
      label: "五金大类",
      prop: "basHardwareFk",
      type: "select",
      dicData: basHardware
    },
    {
      label: "中文名称",
      prop: "chinName",
      width: 120

    },
    {
      label: "英文名称",
      prop: "engName",
      width: 120

    },

    {
      label: "规格",
      prop: "itemspec",

    },

    {
      label: "型号",
      prop: "model",

    },
    {
      label: "计量单位",
      prop: "msUnit",
      type: "select",
      dicData: matUnit

    },
    {
      label: "库存单位",
      prop: "skUnit",
      type: "select",
      dicData: matUnit

    },


  ]

}

// 行政
export function getBasAdsuppliesarticles(params) {
  return axios({
    url: '/api/basAdsuppliesarticles/page',
    method: 'get',
    params: params
  })
}

export const BasAdsuppliesarticlesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "编号",
      prop: "hardwareId",
      span: 8,
      placeholder: " ",
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: "行政大类",
      prop: "basAdsuppliesFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: basAdsupplies

    },
    {
      label: "中文名称",
      prop: "chinName",
      span: 8,
      placeholder: " ",

    },

    {
      label: "型號",
      prop: "model",
      span: 8,
      placeholder: " ",
      // dicData: getDIC("bas_yarnsType"),
    },
  ]

}

export const BasAdsuppliesarticlesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "编号",
      prop: "hardwareId",
      width: 180
    },
    {
      label: "行政大类",
      prop: "basAdsuppliesFk",
      type: "select",
      dicData: basAdsupplies

    },
    {
      label: "中文名称",
      prop: "chinName",
      width: 120

    },
    {
      label: "英文名称",
      prop: "engName",
      width: 120

    },

    {
      label: "规格",
      prop: "itemspec",

    },

    {
      label: "型号",
      prop: "model",
      width: 180

    },
    {
      label: "计量单位",
      prop: "msUnit",
      type: "select",
      dicData: matUnit

    },
    {
      label: "库存单位",
      prop: "skUnit",
      type: "select",
      dicData: matUnit

    },


  ]

}


// 胚布貨物包
export function getWhseCalicoPackBarCode(params) {
  return axios({
    url: '/api/whseCalicopackBarcode/page',
    method: 'get',
    params: params
  })
}
export function addWhseCalicoPackBarCode(params) {
  return axios({
    url: '/api/whseCalicopackBarcode',
    method: 'post',
    params: params
  })
}
export function updateWhseCalicoPackBarCode(params) {
  return axios({
    url: '/api/whseCalicopackBarcode',
    method: 'put',
    params: params
  })
}
export function delWhseCalicoPackBarCode(id) {
  return axios({
    url: '/api/whseCalicopackBarcode?whseCalicopackBarcodeoid=' + id,
    method: 'delete',
  })
}

export const WhseCalicoPackBarCodeF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "货物包码",
      prop: "barcode",
      placeholder: " ",
      span: 8,
    },
    {
      label: "生产单号",
      prop: "prodNo",
      span: 8,
      display: true,
      placeholder: " ",
    },
    {
      label: "缸号",
      prop: "batchNo",
      span: 8,
      display: true,
      placeholder: " ",
    },


  ]

}
export const WhseCalicoPackBarCodeC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "货物包码",
      prop: "barcode",
      width: 250,
      hide: false
    },
    {
      label: "缸号",
      prop: "batchNo",
      span: 8,
      width: 250,
      hide: false
    },
    {
      label: "生产单号",
      prop: "prodNo",
      hide: false,
      width: 280
    },
    {
      label: "疋数",
      prop: "countingNo",
      width: 120,
      align: "right"
    },

    {
      label: "重量",
      prop: "weight",
      width: 120,
      align: "right"
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      width: 120,
      type: "select",
      dicData: matUnit
    },
    {
      label: "码卡号",
      prop: "fabticket",
      width: 250
    },
  ]

}

// 成品布貨物包
export function getWhseFinishedclothpackBarcode(params) {
  return axios({
    url: '/api/whseFinishedclothpackBarcode/page',
    method: 'get',
    params: params
  })
}
export function addWhseFinishedclothpackBarcode(params) {
  return axios({
    url: '/api/whseFinishedclothpackBarcode',
    method: 'post',
    params: params
  })
}
export function updateWhseFinishedclothpackBarcode(params) {
  return axios({
    url: '/api/whseFinishedclothpackBarcode',
    method: 'put',
    params: params
  })
}
export function delWhseFinishedclothpackBarcode(id) {
  return axios({
    url: '/api/whseFinishedclothpackBarcode?whseFinishedclothpackBarcodeoid=' + id,
    method: 'delete',
  })
}

// 胚布訂單
export function getSalPoDtlaList(params) {
  return axios({
    url: '/api/page',
    method: 'get',
    params: params
  })
}

export const SalPoDtlaListF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "訂單號",
      prop: "poNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "胚布代號",
      prop: "fabId",
      span: 8,
      placeholder: " ",
    },
    {
      label: "布种",
      prop: "fabFabrics",
      span: 8,
      placeholder: " ",
    },
  ]

}

export const SalPoDtlaListC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "訂單號",
      prop: "poNo",
      type: "select",
      width: 140,
      dicData: getDicT("salPoList", "poNo", 'salPooid'),

    },
    {
      label: "布料编号",
      prop: "fabId",
      width: 120,
    },

    {
      label: "布料名稱",
      prop: "fabYcount",
      width: 350,
    },
    {
      label: "总成份",
      prop: "fabComponents",
      width: 280,
    },
    {
      label: "布種",
      prop: "fabFabrics",
      type: "select",
      dicData: getDIC("bas_clothorg")
    },
    {
      label: "數量",
      prop: "fabQty",
      align: "right",
      width: 100
    },
    {
      label: "數量单位",
      prop: "qtyUnit",
      width: 90
    },
  ]

}


// 紗線採購單
export function getPurYarnsPo(params) {
  return axios({
    url: '/api/purYarnspo/page',
    method: 'get',
    params: params
  })
}
export const PurYarnsPoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "採購類型",
      prop: "purType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    // {
    //   label: "付款方式",
    //   prop: "payType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]

}
export const PurYarnsPoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 208px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
      width: 180
    },
    {
      label: "採購類型",
      prop: "purType",
      type: "select",
      dicData: purAttr,
      width: 120
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId"),
      width: 240
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      dicData: getDIC("Bas_PayType"),
      width: 120
    },
    // {
    //   label: "收齊標記",
    //   prop: "collectedFlag",
    //   type: "select",
    //   dicData:yarnsCollected,
    // },
  ]

}

// 紗線採購單明細
export function getPurYarnsPoDtla(params) {
  return axios({
    url: '/api/purYarnspoDtla/page',
    method: 'get',
    params: params
  })
}
export const PurYarnsPoDtlaF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "採購類型",
      prop: "purType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    // {
    //   label: "付款方式",
    //   prop: "payType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]

}
export const PurYarnsPoDtlaC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 208px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
      width: 180
    },
    {
      label: "採購類型",
      prop: "purType",
      type: "select",
      dicData: purAttr,
      width: 120
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId"),
      width: 240
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      dicData: getDIC("Bas_PayType"),
      width: 120
    },
    // {
    //   label: "收齊標記",
    //   prop: "collectedFlag",
    //   type: "select",
    //   dicData:yarnsCollected,
    // },
  ]

}


// 胚布採購單
export function getPurCalicoPo(params) {
  return axios({
    url: '/api/purCalicopo/page',
    method: 'get',
    params: params
  })
}
export const PurCalicoPoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "採購類型",
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    {
      label: "付款方式",
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype,
    },
  ]

}
export const PurCalicoPoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
    },
    {
      label: "採購類型",
      prop: "purType",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: supp,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype,
    }, {
      label: "收齊標記",
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected,
    },
  ]

}
export function purDelisingleDtla(params) {
  return axios({
    url: '/api/purDelisingleDtla',
    method: 'get',
    params: params
  })
}
// 染化料採購單
export function getPurChemicalpo2(params) {
  return axios({
    url: '/api/purChemicalpo/page',
    method: 'get',
    params: params
  })
}
export function getPurChemicalpo(params) {
  return axios({
    url: '/api/purSinglepo/purSinglepoDtl',
    method: 'get',
    params: params
  })
}
export const PurChemicalpoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    // {
    //   label: "採購類型",
    //   prop: "purType",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: purAttr,
    // },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    // {
    //   label: "付款方式",
    //   prop: "payType",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]

}
export const PurChemicalpoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
      width: 180
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: supp,
      width: 300
    },
    {
      label: "订单日期",
      prop: "poDate",
      width: 180,
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      align: 'center'
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120,
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      width: 120,
      dicData: yarnsPaytype,
    },
    // {
    //   label: "收齊標記",
    //   prop: "collectedFlag",
    //   type: "select",
    //   width: 120,
    //   dicData:yarnsCollected,
    // },
  ]

}


// 生產輔料採購單
export function getPurMaterialspo(params) {
  return axios({
    url: '/api/purMaterialspo/page',
    method: 'get',
    params: params
  })
}
export const PurMaterialspoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "採購類型",
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    {
      label: "付款方式",
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype,
    },
  ]

}
export const PurMaterialspoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
    },
    {
      label: "採購類型",
      prop: "purType",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: supp,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype,
    }, {
      label: "收齊標記",
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected,
    },
  ]

}

// 五金採購單
export function getPurHardwarepo(params) {
  return axios({
    url: '/api/purHardwarepo/page',
    method: 'get',
    params: params
  })
}
export const PurHardwarepoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "採購單號",
      prop: "poNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "採購類型",
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag,
    },
    {
      label: "付款方式",
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype,
    },
  ]

}
export const PurHardwarepoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "採購單號",
      prop: "poNo",
    },
    {
      label: "採購類型",
      prop: "purType",
      type: "select",
      dicData: purAttr,
    },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: supp,
    },
    {
      label: "訂單狀態",
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
    }, {
      label: "付款方式",
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype,
    }, {
      label: "收齊標記",
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected,
    },
  ]

}


// 退紗通知單
export function getWhseRetratyarn(params) {
  return axios({
    url: '/api/whseRetratyarnnotice/page',
    method: 'get',
    params: params
  })
}

export const WhseRetratyarnF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "生产单号",
      prop: "poNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "纱线编号",
      prop: "yarnsId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "批号",
      prop: "batchNo",
      span: 6,
      placeholder: " ",
    },

  ]

}

export const WhseRetratyarnC = {
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
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "生产单号",
      prop: "poNo",
      width: 140,
      // type: "select",
      // dicData: getDicT("whseRetratyarnnotice", "poNo", "yarnsId"),
    },
    {
      label: "紗線系統編號",
      prop: "yarnsId",
      width: 140
    },
    {
      label: "纱线描述",
      prop: "yarnsName",
      width: 500,
      type: "select",
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
    },
    {
      label: "批号",
      prop: "batchNo",
      width: 150
    },
    {
      label: "重量",
      prop: "weight",
      align: "right",
      width: 120
    },
    {
      label: "单位",
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: matUnit
    },
  ]

}



// 送貨單
export function getPurDelivery(params) {
  return axios({
    url: '/api/purDelivery/page',
    method: 'get',
    params: params
  })
}
export const PurDeliveryF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "送貨單號",
      prop: "deliNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "供應商",
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp,
      // dicData: cust2,
    },
    {
      label: "送貨日期",
      prop: "deliDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}
export const PurDeliveryC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "送貨單號",
      prop: "deliNo",
    },
    // {
    //   label: "類型",
    //   prop: "deliType",
    //   type: "select",
    //   dicData: getDIC("pur_deliType"),
    // },
    {
      label: "供应商",
      prop: "suppId",
      type: "select",
      dicData: supp,
    },
    {
      label: "送貨日期",
      prop: "deliDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}

// 送货单明细
export function getPurDeliveryDetail(params) {
  return axios({
    url: '/api/purDelisingleDtla/page',
    method: 'get',
    params: params
  })
}
export const PurDeliveryDF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: "送貨單號",
    //   prop: "deliNo",
    //   span: 8,
    //   placeholder: " ",
    // },
    // {
    //   label: "供應商",
    //   prop: "suppId",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: supp,
    //   // dicData: cust2,
    // },
    // {
    //   label: "送貨日期",
    //   prop: "deliDate",
    //   span: 8,
    //   placeholder: " ",
    //   type: "datetime",
    //   format: "yyyy-MM-dd HH:mm:ss",
    //   valueFormat: "yyyy-MM-dd HH:mm:ss",
    // },
  ]
}
export const PurDeliveryDC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "采购订单",
      prop: "purNo",
      width: 200
    },
    {
      label: "批次號",
      prop: "batId",
      width: 80
    },
    {
      label: "材料編號",
      prop: "materialNum",
      width: 120,
      type: "select",
      dicData: getDicT("purSinglepoDtl", "materialNum", "purSinglepoDtloid")
    },
    {
      label: "材料名称",
      prop: "chinName",
      width: 200,
      type: "select",
      dicData: getDicT("purSinglepoDtl", "chinName", "purSinglepoDtloid")
    },
    {
      label: "數量",
      prop: "deliQty",
      align: "right",
      width: 120
    },
    {
      label: "单位",
      prop: "deliUnit",
      width: 120
    },
    {
      label: "送貨日期",
      prop: "cmatDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      width: 180
    },
  ]

}


// 选择客戶
export function getBasCustomer(params) {
  return axios({
    url: '/api/basCustomer/page',
    method: 'get',
    params: params
  })
}

export const BasCustomerF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "客戶名稱",
      prop: "custName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客戶代碼",
      prop: "custCode",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客戶類型",
      prop: "custType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDIC("bas_customer_type")
    },
  ]

}

export const BasCustomerC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 290px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "客戶名稱",
      prop: "custName",
    },
    {
      label: "客戶編號",
      prop: "custCode",
      type: "select",
    },
    {
      label: "客戶類型",
      prop: "custType",
      type: "select",
      dicData: getDIC("bas_customer_type")
    },
    {
      label: "備註",
      prop: "remake",
      type: "select",
    }
  ]

}


// 外厂染化料配料计划
export function getWhseChemicalPlan(params) {
  return axios({
    url: '/api/vWhseChemicalPlan/page',
    method: 'get',
    params: params
  })
}

export const WhseChemicalPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "加工廠代號",
      prop: "refCode",
      span: 8,
      placeholder: " ",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "配料计划编号",
      prop: "retBatch",
      span: 8,
      placeholder: " ",
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]

}

export const WhseChemicalPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "加工廠代號",
      prop: "refCode",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      type: "select",
    },
    {
      label: "外厂配料计划编号",
      prop: "retBatch",
      width: 220
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    // },
    {
      label: "染化料编号",
      prop: "chemicalId",
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
    },
    {
      label: "重量",
      prop: "weight",
      align: "right"
    },
    {
      label: "重量單位",
      prop: "weightUnit",
      type: "select",
      dicData: matUnit,
    }
  ]

}

// 外厂輔料配料计划
export function getWhseRetmaterialsPlan(params) {
  return axios({
    url: '/api/vWhseRetmaterialsPlan/page',
    method: 'get',
    params: params
  })
}

export const WhseRetmaterialsPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "加工廠代號",
      prop: "refCode",
      span: 8,
      placeholder: " ",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "辅料名称",
      prop: "matName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "配料计划编号",
      prop: "retBatch",
      span: 8,
      placeholder: " ",
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]

}

export const WhseRetmaterialsPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "加工廠代號",
      prop: "refCode",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      type: "select",
    },
    {
      label: "外厂配料计划编号",
      prop: "retBatch",
      width: 220
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    // },
    {
      label: "辅料编号",
      prop: "matId",
    },
    {
      label: "辅料名称",
      prop: "matName",
    },
    {
      label: "數量",
      prop: "qty",
      align: "right"
    },
    {
      label: "数量單位",
      prop: "qtyUnit",
      type: "select",
      dicData: matUnit,
    }
  ]

}

// 外厂胚布配料计划
export function getWhseMaterialoutPlan(params) {
  return axios({
    url: '/api/vWhseMaterialoutPlan/page',
    method: 'get',
    params: params
  })
}

export const WhseMaterialoutPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "加工廠代號",
      prop: "refCode",
      span: 8,
      placeholder: " ",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "胚布名称",
      prop: "clothName",
      span: 8,
      placeholder: " ",
    },
    {
      label: "配料计划编号",
      prop: "retBatch",
      span: 8,
      placeholder: " ",
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]

}

export const WhseMaterialoutPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "加工廠代號",
      prop: "refCode",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      type: "select",
    },
    {
      label: "外厂配料计划编号",
      prop: "retBatch",
      width: 220
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    // },
    {
      label: "胚布编号",
      prop: "calicoId",
    },
    {
      label: "胚布名称",
      prop: "clothName",
    },
    {
      label: "重量",
      prop: "weight",
      align: "right"
    },
    {
      label: "單位",
      prop: "weightUnit",
      type: "select",
      dicData: matUnit,
    }
  ]

}


// 外厂纱线配料计划
export function getWhseRetyarninoutPlan(params) {
  return axios({
    url: '/api/vWhseRetyarninoutPlan/page',
    method: 'get',
    params: params
  })
}

export const WhseRetyarninoutPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "加工廠代號",
      prop: "refCode",
      span: 6,
      placeholder: " ",
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      span: 6,
      placeholder: " ",
    },
    {
      label: "纱线編號",
      prop: "yarnsId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "配料计划编号",
      prop: "retBatch",
      span: 6,
      placeholder: " ",
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]

}

export const WhseRetyarninoutPlanC = {
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
      align: "center",
    },
    {
      label: "加工廠代號",
      prop: "refCode",
      width: 120
    },
    {
      label: "加工廠名稱",
      prop: "refName",
      width: 150
    },
    {
      label: "外厂配料计划编号",
      prop: "retBatch",
      width: 220
    },
    // {
    //   label: "生產單號",
    //   prop: "prOn",
    // },
    {
      label: "纱线编号",
      prop: "yarnsId",
      width: 140
    },
    {
      label: "纱线名称",
      prop: "yarnsName",
      width: 250
    },
    {
      label: "重量",
      prop: "weight",
      align: "right",
      width: 100
    },
    // {
    //   label: "單位",
    //   prop: "weightUnit",
    //   type: "select",
    //   dicData:matUnit
    // }
  ]

}


// 货运计划
export function getshipPlan(params) {
  return axios({
    url: '/api/shipPlan/v2.0/listByPage',
    method: 'get',
    params: params
  })
}

export const shipPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "货运计划编号",
      prop: "spNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "贸易方式",
      prop: "tradeMode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDIC("sal_tradeMode"),
    },
    {
      label: "运输方式",
      prop: "shipMode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDIC("Bas_TranType"),
    },
  ]

}

export const shipPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "货运计划编号",
      prop: "spNo",
    },
    {
      label: "贸易方式",
      prop: "tradeMode",
      type: "select",
      dicData: getDIC("sal_tradeMode"),
      width: 120
    },
    {
      label: "运输方式",
      prop: "shipMode",
      width: 120,
      type: "select",
      dicData: getDIC("Bas_TranType"),
    },
    {
      label: "备注",
      prop: "spRemark",
    },
  ]

}

// 订单胚布资料
export function getOrderPb(params) {
  return axios({
    url: '/api/page',
    method: 'get',
    params: params
  })
}

export const OrderPbF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "订单号",
      prop: "salPoFk",
      span: 8,
      placeholder: " ",
      type: "tree",
      dicData: postDicT("salPoList", "poNo", "salPooid"),
      // typeslot: true,
    },
    {
      label: "布料编号",
      prop: "fabId",
      span: 8,
      placeholder: " ",
    },

  ]

}

export const OrderPbC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "订单号",
      prop: "salPoFk",
      type: "select",
      dicData: postDicT("salPoList", "poNo", "salPooid"),
      width: 140
    },
    {
      label: "布料编号",
      prop: "fabId",
      width: 140
    },
    {
      label: "布料名称",
      prop: "fabName",
      // width: 500
    },
    {
      label: "颜色",
      prop: "colorName",
      width: 120
    },
    {
      label: "数量",
      prop: "fabQty",
      width: 120,
      align: "right"
    },
    {
      label: "数量单位",
      prop: "qtyUnit",
      type: "select",
      width: 120,
      dicData: matUnit
    },
    {
      label: "单价",
      prop: "unitPrice",
      width: 120,
      align: "right"
    },
    {
      label: "单价单位",
      prop: "priceUnit",
      type: "select",
      width: 120,
      dicData: matUnit
    },
  ]

}

// 胚布疋号资料
export function getPbDltb(params) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/listByPage',
    method: 'get',
    params: params
  })
}

export const PbDltbF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "生产单号",
      prop: "prodNo",
      span: 8,
      placeholder: " ",
      // type: "tree",
      // dicData: postDicT("salPoList", "poNo", "salPooid"),
      // typeslot: true,
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      span: 8,
      placeholder: " ",
    },

  ]

}

export const PbDltbC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "生产单号",
      prop: "prodNo",
      cell: true,
      width: 120,
      type: "select",
      dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),
    },
    {
      label: "批号",
      prop: "batchNo",
      width: 150,
    },
    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 80,
      align: "right",
      // click: (val) => {
      //   _this.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: "right",
      // click: (val) => {
      //   _this.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit
      // click: (val) => {
      //   _this.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      cell: true,
      width: 150,
      // click: (val) => {
      //   _this.iptPhChange(_this.choosePhData);
      // },
    }
  ]

}

// 胚布入仓明细
export function getPbDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export const PbDetaliF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "胚布編碼",
      prop: "calicoId",
      span: 8,
      placeholder: " ",
    },
    {
      label: "批号",
      prop: "batchNo",
      span: 8,
      placeholder: " ",
    },

  ]

}

export const PbDetaliC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "入仓编号",
      prop: "$whseCalicoinFk",
      cell: true,
      width: 140,
      type: "select",
      dicData: getDicT("whseCalicoin/v1.0/list", "yinId", "whseCalicoinoid"),
    },
    {
      label: "入仓编号2",
      prop: "whseCalicoinFk",
      cell: false,
      width: 140,
      type: "select",
      hide: false,
      props: {
        label: "whseCalicoinFk",
        value: "whseCalicoinDtlaoid"
      },
      dicData: getXDicT("whseCalicoinDtla/v1.0/list"),
    },
    {
      label: "胚布編碼",
      prop: "calicoId",
      width: 140,
    },
    {
      label: "胚布名称",
      prop: "clothName",
      width: 450,
    },
    {
      label: "批号",
      prop: "batchNo",
      width: 150,
    },
    {
      label: "疋數",
      prop: "countingNo",
      width: 100,
      align: "right",
    },
    {
      label: "重量",
      prop: "weight",
      width: 100,
      align: "right",
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: matUnit

    }
  ]

}

// 五金/行政入仓明细
export function getCalicoinDtla(params) {
  return axios({
    url: '/api/whseAccessoriesDtl/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export const calicoinDtlaF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "材料类型",
      prop: "materialType",
      span: 6,
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: "材料编号",
      prop: "materialNum",
      span: 6,
      placeholder: " ",
    },
    {
      label: "批号",
      prop: "batchNo",
      span: 6,
      placeholder: " ",
    },

  ]
}
let basWjxz = getDbDicT("basHardwarearticles", "basAdsuppliesarticles")
export const calicoinDtlaC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "入仓编号",
      prop: "$whseAccessoriesinFk",
      cell: true,
      width: 140,
      type: "select",
      dicData: getDicT("whseAccessoriesin/v1.0/list", "yinId", "whseAccessoriesinoid"),
    },
    {
      label: "入仓编号2",
      prop: "whseAccessoriesinFk",
      cell: false,
      width: 140,
      type: "select",
      hide: false,
      props: {
        label: "whseAccessoriesinFk",
        value: "whseAccessoriesDtloid"
      },
      dicData: getXDicT("whseAccessoriesDtl/v1.0/list"),
    },
    {
      label: "材料类型",
      prop: "materialType",
      width: 100,
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: "材料编号",
      prop: "materialNum",
      width: 140,
    },

    {
      label: "材料名称",
      prop: "materialName",
      width: 150,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      },
      cell: false,
      dicData: basWjxz
    },
    {
      label: "批号",
      prop: "batchNo",
      width: 150,
    },
    {
      label: "型号",
      prop: "model",
      width: 180,
      type: "select",
      props: {
        label: "model",
        value: "hardwareId"
      },
      dicData: basWjxz
    },
    {
      label: "规格",
      prop: "itemspec",
      width: 160,
      type: "select",
      props: {
        label: "itemspec",
        value: "hardwareId"
      },
      dicData: basWjxz
    },
    {
      label: "数量",
      prop: "poQty",
      width: 100,
      align: "right",
    },
    {
      label: "单位",
      prop: "unitQty",
      width: 100,
      type: "select",
      dicData: matUnit

    }
  ]

}

// 选择人员
export function getPersonList(params) {
  return axios({
    url: '/api/perPersonList',
    method: 'get',
    params: params
  })
}
export const PersonF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "員工編號",
      prop: "perId",
      span: 8,
      placeholder: " ",
    },
    {
      label: "姓名",
      prop: "perName",
      span: 8,
      placeholder: " ",
    },

  ]

}

export const PersonC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "員工編號",
      prop: "perId",
      cell: true,
      width: 120,
    },
    {
      label: "姓名",
      prop: "perName",
      cell: false,
      width: 120,
    },
    {
      label: "英文名 ",
      prop: "perEname",
      width: 120,
    },
    {
      label: "入職日期 ",
      prop: "entryDate",
      width: 190,
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },

    {
      label: "聯繫人",
      prop: "contactPerson",
      width: 150,
    },
    {
      label: "聯繫電話",
      prop: "call",
      width: 120,
    },
  ]

}


// 申购单
export function getSingle(params) {
  return axios({
    url: '/api/purSingle/PurSingleByPage',
    method: 'get',
    params: params
  })
}
export const SingleF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "申請編號",
      prop: "appId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "申請部門",
      prop: "appDep",
      span: 6,
      placeholder: " ",
    },
    // {
    //   label: "申購單狀態",
    //   prop: "purState",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDIC("pur_state")
    // },
  ]

}

export const SingleC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  // selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "申請編號",
      prop: "appId",
      width: 180,
    },
    {
      label: "申請部門",
      prop: "appDep",
      width: 120,
    },
    {
      label: "申請日期",
      prop: "appDate",
      width: 160,
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "申購類別",
      prop: "purCategory",
      width: 120,
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: "申購單狀態",
      prop: "purState",
      width: 120,
      type: "select",
      dicData: getDIC("pur_state")
    },
  ]

}

// 申购单明细
export function getSingleDtl(params) {
  return axios({
    url: '/api/purSingleDtl/page',
    method: 'get',
    params: params
  })
}
export const SingleDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [

  ]

}
export const SingleDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "材料編號",
      prop: "materialNum",
      width: 120,
    },
    {
      label: "材料名稱",
      prop: "chinName",
      width: 140,
    },
    {
      label: "數量",
      prop: "applyNum",
      width: 80,
      align: "right"
    },
    {
      label: "單位",
      prop: "company",
      width: 60,
      type: "select",
      dicData: matUnit
    },
    {
      label: "需求日期",
      prop: "demandDate",
      width: 100,
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "型號",
      prop: "model",
      // width: 300,
      type: "select",

    },
    {
      label: "規格",
      prop: "itemspec",
      width: 200,
      type: "select",

    },
    {
      label: "大類名稱",
      prop: "topcategoryName",
      width: 100,
      type: "select",

    },
    {
      label: "二級分類",
      prop: "seccategoryName",
      width: 100,
      type: "select",

    },
    {
      label: "三級分類",
      prop: "thirdcategoryName",
      width: 100,
      type: "select",

    },
    {
      label: "用途/備註",
      prop: "purposeRemarks",
      width: 200,
    },
  ]

}

// 色号信息(颜色)
export function getSalColor(params) {
  return axios({
    url: '/api/basColor /v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export const SalColorF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [

    {
      label: "颜色编号",
      prop: "colorNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: "颜色名称",
      prop: "colorName",
      span: 6,
      placeholder: " ",
    },
  ]

}
export const SalColorC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 390px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "颜色编号",
      prop: "colorNo",
      width: 150,
    },
    {
      label: "颜色名称",
      prop: "colorName",
      width: 200,
    },
    // {
    //   label: "品牌",
    //   prop: "basBrandFk",
    //   width: 220,
    //   type: "select",
    //   dicData: getDicT("basCustomer", "custName", "basCustomeroid")
    // },
  ]

}

// 色号资料
export function getTapcolor(params) {
  return axios({
    url: '/api/labTapcolor/page',
    method: 'get',
    params: params
  })
}
export const TapcolorF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [

    {
      label: "客户",
      prop: "custCode",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: "颜色编号",
      prop: "colorBh",
      span: 6,
      placeholder: " ",
    },
    {
      label: "颜色中文",
      prop: "colorChn",
      span: 6,
      placeholder: " ",
    },
    {
      label: "色号",
      prop: "colorNo",
      span: 6,
      placeholder: " ",
    },
  ]

}
export const TapcolorC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "色号",
      prop: "colorNo",
      width: 130,
    },
    {
      label: "客户",
      prop: "custCode",
      width: 220,
      type: "select",
      dicData: cust1
    },
    {
      label: "颜色编号",
      prop: "colorBh",
      width: 140,
    },
    {
      label: "颜色中文",
      prop: "colorChn",
      width: 120,
    },
    {
      label: "颜色来源",
      prop: "colorSource",
      width: 100,
      type: "select",
      dicData: getDIC("sal_colorSource"),
    },
    {
      label: "客色号",
      prop: "custColorBh",
      width: 130,
    },
    {
      label: "面料编号",
      prop: "fabCode",
      width: 110,
    },
    {
      label: "面料",
      prop: "fabricDesc",
      width: 400,

    },
    {
      label: "面料来源",
      prop: "fabSource",
      width: 120,
      type: "select",
      dicData: getDIC("LAP_FABSOURCE"),
    },
    {
      label: "染色类别",
      prop: "lapDyetype",
      width: 120,
      type: "select",
      dicData: getDIC("LAP_DYETYPE"),
    },
    {
      label: "是否双染",
      prop: "doubleFlag",
      width: 100,
      type: 'select',
      dicData: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ]
    },
  ]

}

// 申请领用单
export function getPurApplication(params) {
  return axios({
    url: '/api/purApplication/page',
    method: 'get',
    params: params
  })
}

export const purApplicationF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "申请类别",
      prop: "applyCategory",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: "申请单编号",
      prop: "applyCode",
      span: 6,
      placeholder: " ",
    },
    {
      label: "申请部门",
      prop: "applyDepartment",
      span: 6,
      placeholder: " ",
    },

  ]

}
export const purApplicationC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "申請單編號",
      prop: "applyCode",
      width: 140,
    },
    {
      label: "申請部門",
      prop: "applyDepartment",
      width: 120,
    },
    {
      label: "申請人",
      prop: "applyPeople",
      width: 140,
    },
    {
      label: "申請日期",
      prop: "applyDate",
      width: 140,
    },
    {
      label: "申請類別",
      prop: "applyCategory",
      width: 100,
      type: "select",
      dicData: getDIC("pur_category"),
    },
    {
      label: "申請狀態",
      prop: "apply_state",
      width: 100,
      type: "select",
      dicData: getDIC("pur_state"),
    },
  ]

}

// 申请领用单明细
export function getPurApplicationDtl(params) {
  return axios({
    url: '/api/purApplicationDtl/page',
    method: 'get',
    params: params
  })
}
export const purApplicationDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [

    {
      label: "物料编号",
      prop: "materielCode",
      span: 6,
      placeholder: " ",
    },
    {
      label: "物料名称",
      prop: "materielName",
      span: 6,
      placeholder: " ",
    },
  ]

}
export const purApplicationDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 206px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "物料编号",
      prop: "materielCode",
      width: 140,
    },
    {
      label: "物料名称",
      prop: "materielName",
      width: 140,
    },
    {
      label: "申领数量",
      prop: "applyNum",
      width: 100,
    },
    {
      label: "单位",
      prop: "company",
      width: 100,
    },
    {
      label: "用途",
      prop: "purposeRemarks",
      width: 140,
    },

    {
      label: "型号",
      prop: "model",
      width: 180,
    },
    {
      label: "规格",
      prop: "ItemSpec",
      width: 180,
    },
  ]

}

// 選擇貨位
export function getLoc(params) {
  return axios({
    url: '/api/whseLocation/page',
    method: 'get',
    params: params
  })
}
export const locF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [

    {
      label: "倉庫代號",
      prop: "warehouseId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "倉庫名稱",
      prop: "warehouseName",
      span: 6,
      placeholder: " ",
    },
    {
      label: "分區碼",
      prop: "areaCode",
      span: 6,
      placeholder: " ",
    },
  ]

}
export const locC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "倉庫代號",
      prop: "warehouseId",
      width: 140,

    },
    {
      label: "倉庫名稱",
      prop: "warehouseName",
      width: 140,
      type: "select",
      // props: {
      //   label: "warehouseId",
      //   value: "whseWarehouseoid"
      // },
      dicData: getDicT("whseWarehouse", "warehouseName", "warehouseId")
    },
    {
      label: "分區碼",
      prop: "areaCode",
      width: 100,
      type: "select",
      dicData: getDicT("whseShelves",)
    },
    {
      label: "貨位碼",
      prop: "locationCode",
      width: 160,
    },
  ]

}

