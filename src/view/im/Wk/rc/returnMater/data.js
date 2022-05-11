/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:41
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-11 16:12:08
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
    materIdLabel: "化工原料编号",
    materNameLabel: "化工原料名称",
    materIdKey: "chemicalId",  
    materNameKey: "chemicalName",
    materOidKey: "whseChemicalinoid",
    materFkKey: "whseChemicalinFk",
    materDtlaOidKey: "whseChemicalinDtlaoid",
    materDtlaFKKey: "whseChemicalinDtlaFk",
    materDtlbOidKey: "whseChemicalinDtlboid",
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
        label: "入仓类型",
        prop: "yinType",
        width: 100,
        type: "select",
        dicData: getDIC("whse_yinType")
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        width: 100,
      },
      {
        label: "退料通知单编号",
        prop: "registerNo",
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
      label: "退料通知单编号",
      prop: "registerNo",
      labelWidth: 160,
      span: 5,
      placeholder: " ",
    }]

  }
}

export function retMatNoticCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 185px)",
    selection: true,
    column: [{
        label: "退料通知单号",
        prop: "withdrawalNo",
        width: 120,
      },
      {
        label: "外发厂",
        prop: "extFactId",
        width: 120,
      },
      {
        label: "退料日期",
        prop: "happenDate",
        width: 100,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: dataPropEnum[3].materIdLabel,
        prop: "materialId",
        width: 120,
      },
      {
        label: dataPropEnum[3].materNameLabel,
        prop: "materialName",
        overHidden: true,
        width: 250,
      },
      {
        label: "本厂批号",
        prop: "batchNo",
        width: 100,
      },
      {
        label: "回仓重量",
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
        type: "select",
        dicData: getDIC("bas_matUnit"),
        width: 100,
      },
    ]
  }
}

// 料入仓数据
export function whseMaterInFormOp(_this) {
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
      label: "退料通知单编号",
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
export function whseMaterInDtlCrudOp(_this, type = '3') {
  let {materIdLabel,materNameLabel,materIdKey,materNameKey} = dataPropEnum[type];
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseMaterInDtloid",
    column: [{
      label: materIdLabel,
      prop: materIdKey,
      width: 120
    }, {
      label: materNameLabel,
      prop: materNameKey,
      width: 200,
      overHidden: true
    }, {
      label: "本厂批号",
      prop: "batchNo",
      width: 100
    }, {
      label: "退料重量",
      prop: "retWeight",
      width: 100,
      align: "right",
      type: "number",
      formatter: fillZero
    }, {
      label: "入仓重量",
      prop: "weight",
      width: 100,
      align: "right",
      type: "number",
      formatter: (row,value) => {
        return row.dtlBChildren.reduce((a,b) => a + +(b.weight || 0), 0).toFixed(2)
      },
      // cell: true,
    }, {
      label: "单位",
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    }]
  }
}

// 货位码数据
export function whseMaterInDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    page: false,
    rowKey: "whseMaterInDtlaoid",
    column: [{
      label: "货位码",
      prop: "storageNo",
      width: 100,
      cell: true,
      type: "select",
      dicData: getDicNS("whseLocation?warehouseType=" + _this.imWkType, "locationCode", "locationCode")
    },{
      label: "重量",
      prop: "weight",
      width: 100,
      cell: true,
      type: "number",
      align: "right",
      formatter: fillZero
    }]
  }
}
