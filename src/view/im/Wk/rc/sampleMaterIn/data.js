/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-16 14:53:01
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";

function fillZero(row, value) {
  return value && value.toFixed(2);
}

let examState = getDIC("whse_retState");
let opreator = getDicT("ucmlUser", "employeename", "ucmlUseroid");

export const dataPropEnum = {
  3: {
    samNoteKey: "chemicalforsampleNote",
    samIdKey: "chemicalId",
    samNameKey: "chemicalName",
    // 入仓字段字典
    matOidKey: "whseChemicalinoid",
    matFkKey: "whseChemicalinFk",
    matDtlaOidKey: "whseChemicalinDtlaoid",
    matDtlaFkKey: "whseChemicalinDtlaFk",
    matDtlbOidKey: "whseChemicalinDtlboid",
    matCodeKey: "chemicalId",
    matNameKey: "chemicalName",
    // 表名字典
    purSamDtlaTableName: "purChemicalforsampleDtl",
    whseTableName: "whseChemicalin",
    whseDtlaTableName: "whseChemicalinDtla",
    whseDtlbTableName: "whseChemicalinDtlb",
  },
  4: {
    samNoteKey: "dyesaforsampleNote",
    samIdKey: "chemicalId",
    samNameKey: "chemicalName",
    // 入仓字段字典
    matOidKey: "whseDyesalinoid",
    matFkKey: "whseDyesalinFk",
    matDtlaOidKey: "whseDyesainDtlaoid",
    matDtlaFkKey: "whseDyesainDtlaFk",
    matDtlbOidKey: "whseDyesainDtlboid",
    matCodeKey: "chemicalId",
    matNameKey: "chemicalName",
    // 表名字典
    purSamDtlaTableName: "purDyesaforsampleDtl",
    whseTableName: "whseDyesalin",
    whseDtlaTableName: "whseDyesalInDtla",
    whseDtlbTableName: "whseDyesalInDtlb",
  }
}



// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  showSummary: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
}
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
};

export function whseInCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 185px)",
    column: [{
        label: "入仓编号",
        prop: "yinId",
        width: 200,
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        width: 100,
      },
      {
        label: "样品通知单编号",
        prop: "registerNo",
        width: 150,
      },
      {
        label: "供应商编号",
        prop: "suppId",
        width: 120,
      },
      {
        label: "供应商名称",
        prop: "suppName",
        width: 150,
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        width: 100,
        type: "select",
        dicData: getDIC("whse_yinStatus")
      },
      {
        label: "财务状态",
        prop: "finStatus",
        width: 100,
        type: "select",
        dicData: getDIC("whse_finStatus")
      },
      {
        label: "入仓状态",
        prop: "stockState",
        type: "select",
        dicData: examState,
        width: 100,
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        type: "select",
        dicData: opreator,
        width: 100,
      },
    ]
  }
}

export function whseInFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "入仓编号",
      prop: "yinId",
      span: 5,
      placeholder: " ",
    }, {
      label: "入仓日期",
      prop: "yinDate",
      span: 5,
      placeholder: " ",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
    }, {
      label: "样品通知单编号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    }]

  }
}


export function unStockSampleFormOp(_this){
  let {samIdKey,samNoteKey} = dataPropEnum[_this.imWkType];
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "供应商名称",
      prop: "suppName",
      span: 5,
      placeholder: " ",
    }, {
      label: "样品通知单",
      prop: samNoteKey,
      span: 5,
      placeholder: " ",
    }]
  }
}

export function unStockSampleCrudOp(_this) {
  let { samIdKey,samNameKey,samNoteKey } = dataPropEnum[_this.imWkType];
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 225px)",
    selection: true,  
    column: [{
        label: "样品通知单",
        prop: samNoteKey,
        width: 120,
      },
      {
        label: "样品编号",
        prop: samIdKey,
        width: 100,
      },
      {
        label: "样品名称",
        prop: samNameKey,
        overHidden: true,
        width: 250,
      },
      {
        label: "供应商批号",
        prop: "suppId",
        overHidden: true,
        width: 120,
      },
      {
        label: "供应商名称",
        prop: "suppName",
        overHidden: true,
        width: 150,
      },
      {
        label: "样品重量",
        prop: "weight",
        width: 100,
        type: "number",
        align: "right",
        precision: 2,
        formatter: fillZero
      },
      {
        label: "单位",
        prop: "weightUnit",
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: "计划送货日期",
        prop: "planSenddate",
        width: 140,
      },

    ]
  }
}

// 料入仓数据
export function whseYarnInFormOp(_this) {
  return {
    ...formOpCommon,
    column: [{
      label: "入仓编号",
      prop: "yinId",
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label: "入仓日期",
      prop: "yinDate",
      span: 5,
      placeholder: " ",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    }, {
      label: "样品通知单号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
      disabled: true,
    }, {
      label: "入仓状态",
      prop: "stockState",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: examState,
      disabled: true,
    }, {
      label: "检验状态",
      prop: "yinStatus",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDIC("whse_yinStatus"),
    },
    {
      label: "财务状态",
      prop: "finStatus",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDIC("whse_finStatus")
    },{
      label: "操作员",
      prop: "sysCreatedby",
      span: 5,
      placeholder: " ",
      disabled: true,
      type: "select",
      dicData: opreator
    }]
  }
}

// 明细数据
export function whseYarnInDtlCrudOp(_this) {
  let { matCodeKey,matNameKey } = dataPropEnum[_this.imWkType];
  return {
    ...mainCrudOpCommon,
    page: false,
    column: [{
      label: "纱线编号",
      prop: matCodeKey,
      width: 100
    }, {
      label: "纱线名称",
      prop: matNameKey,
      width: 200,
      overHidden: true
    }, {
      label: "本厂批号",
      prop: "batchNo",
      width: 100
    }, {
      label: "重量",
      prop: "weight",
      width: 100,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        return row.dtlBChildren.reduce((a,b) => a + +(b.weight || 0), 0).toFixed(2)
      },
    },{
      label: "重量单位",
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    },
   ]
  }
}

// 货位码数据
export function whseYarnInDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: dataPropEnum[_this.imWkType].matDtlbOidKey,
    column: [{
      label: "数量",
      prop: "weight",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter: fillZero
    },{
      label: "货位码",
      prop: "storageNo",
      width: 100,
      cell: true,
      type: "select",
      dicData: getDicNS("whseLocation?warehouseType=" + _this.imWkType, "locationCode", "locationCode")
    }]
  }
}
