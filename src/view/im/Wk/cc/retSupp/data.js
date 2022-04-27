/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 09:07:11
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-27 14:01:10
 */
import {
  getDIC,
  getDicT,
  getDicNS
} from "@/config/index";

let retType = getDIC("whse_retState");

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

  // 模块参数  辅料|五金|行政|染料|化工
export const moduleParamsEnum = {
  // 辅料
  3: {
    fieldLabel: "辅料",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsuppaccessories",
    dtlApiBaseKey: "whseRetsuppaccessoriesDtl",
    mainOidKey: "whseRetsuppaccessoriesoid",
    mainOidFkKey: "whseRetsuppaccessoriesFk",
    dtlOidFk: "whseRetsuppaccessoriesDtloid",
    inDtlOidFk: "whseAccessoriesDtlFk",
    stockKey: "viewAccessoriesStock"
  },
  // 五金
  1: {
    fieldLabel: "五金用品",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsupphardware",
    dtlApiBaseKey: "whseRetsupphardwareDtl",
    mainOidKey: "whseRetsupphardwareoid",
    mainOidFkKey: "whseRetsupphardwareFk",
    dtlOidFk: "whseRetsupphardwareDtloid",
    inDtlOidFk: "whseHardwareDtlFk",
    stockKey: "viewHardwareStock"
  },
  // 行政
  2:{
    fieldLabel: "行政用品",
    unitLabel: "数量",
    mainApiBaseKey: "whseRetsuppoffice",
    dtlApiBaseKey: "whseRetsuppofficeDtl",
    mainOidKey: "whseRetsuppofficeoid",
    mainOidFkKey: "whseRetsuppofficeFk",
    dtlOidFk: "whseRetsuppofficeDtloid",
    inDtlOidFk: "whseOfficeDtlFk",
    stockKey: "viewOfficeStock"
  },
  // 化工
  5:{
    fieldLabel: "原料",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsuppchemical",
    dtlApiBaseKey: "whseRetsuppchemicalDtl",
    mainOidKey: "whseRetsuppchemicaloid",
    mainOidFkKey: "whseRetsuppchemicalFk",
    dtlOidFk: "whseRetsuppchemicalDtloid",
    inDtlOidFk: "whseChemicalinDtlbFk",
    stockKey: "viewChemicalStock"
  },
  // 染料
  8:{
    fieldLabel: "染料",
    unitLabel: "重量",
    mainApiBaseKey: "whseRetsuppdyesal",
    dtlApiBaseKey: "whseRetsuppdyesalDtl",
    mainOidKey: "whseRetsuppdyesaloid",
    mainOidFkKey: "whseRetsuppdyesalFk",
    dtlOidFk: "whseRetsuppdyesalDtloid",
    inDtlOidFk: "whseDyesainDtlaFk",
    stockKey: "viewDyesalinStok"
  },
}


// 主表
export function crudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
        label: "出仓单编号",
        prop: "retCode",
        width: 140
      },
      {
        label: "出仓类型",
        prop: "retType",
        width: 160,
        type: "select",
        dicData: getDIC("whse_out_type")
      },
      {
        label: "出仓日期",
        prop: "retDate",
        width: 160,
      },
      {
        label: "退货通知单编号",
        prop: "retMemo",
        width: 160,
      },
      {
        label: "出仓状态",
        prop: "stockState",
        width: 160,
        type: "select",
        dicData:retType
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        width: 160,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
      },
    ]
  };
}

// 主页面查询表单皮配置
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "出仓日期",
        prop: "retDate",
        span: 5,
        placeholder: " ",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "退货通知单编号",
        prop: "retMemo",
        span: 5,
        placeholder: " ",
        labelWidth: 150
      },
      {
        label: "出仓状态",
        prop: "retState",
        span: 5,
        type: "select",
        dicData:retType,
        placeholder: " ",
      },
      {
        label: "出仓单编号",
        prop: "retCode",
        span: 5,
        placeholder: " ",
      }
    ]
  };
}


// 退货通知单表格配置
export function retReatCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    selection:true,
    index:false,
    column: [{
        label: "退货通知单编号",
        prop: "remeoNo",
        width: 150
      },
      {
        label: "供应商名称",
        prop: "suppName",
        width: 120
      },
      {
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}名称`,
        prop: "chinName",
        width: 200,
        overHidden: true
      },
      {
        label: "本厂批号",
        prop: "batchNo",
        width: 120
      },
      {
        label: `退货${moduleParamsEnum[_this.imWkType].unitLabel}` ,
        prop: "returnQty",
        width: 120
      },
      {
        label: "单位",
        prop: "unitName",
        width: 120
      },
      {
        label: "要求退货日期",
        prop: "returnDate",
        width: 120
      },
      {
        label: "备注",
        prop: "returnReason",
        width: 120
      },
    ]
  }
}

// 退供应商纱出仓表单数据
export function retReatFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "出仓单编号",
        prop: "retCode",
        span: 5,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "出仓日期",
        prop: "retDate",
        span: 5,
        placeholder: " ",
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "退货通知单编号",
        prop: "retMemo",
        span: 5,
        placeholder: " ",
        labelWidth: 150,
        disabled: true,
      },
      {
        label: "出仓状态",
        prop: "stockState",
        span: 5,
        type: "select",
        dicData:retType,
        placeholder: " ",
      },
      {
        label: "备注",
        prop: "retRemarks",
        span: 10,
      },
    ]
  };
}

// 明细数据
export function retReatDtlCrudOp(_this){
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    rowKey:"whseYarninDtloid",
    page:false,
    column: [{
        label: "入库单号",
        prop: "yinId",
        width: 140
      },{
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}编号`,
        prop: "matCode",
        width: 120
      },{
        label: `${moduleParamsEnum[_this.imWkType].fieldLabel}名称`,
        prop: "matName",
        width: 200,
        overHidden: true
      },{
        label: "本厂批号",
        prop: "batchNo",
        width: 120
      },{
        label: `入仓${moduleParamsEnum[_this.imWkType].unitLabel}`,
        prop: "inWeight",
        width: 120,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          return value && value.toFixed(2)
        }
      },{ 
        label: `退货${moduleParamsEnum[_this.imWkType].unitLabel}`,
        prop: "retQty",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        precision: 2,
        formatter: (row,value) => {
          return value && value.toFixed(2)
        }
      },{
        label: "单位",
        prop: "unitName",
        width: 120
      }
    ]
  }
}

export function retReatDtlaCrudOp(_this){
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    rowKey:"whseRetreatDtlaoid",
    page:false,
    column: [{
        label: "退纱重量",
        prop: "retWeight",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        formatter: (row,value) => {
          return value && value.toFixed(2)
        }
      },{
        label: "退纱件数",
        prop: "retPcs",
        type: "number",
        align: "right",
        width: 100,
        cell: true
      },{
        label: "包装规格",
        prop: "packSize",
        width: 120,
        type: "select",
        cell: false,
        dicData: getDIC("bas_yarnPackUnit")
      },{
        label: "货位码",
        prop: "locationCode",
        width: 120,
        overHidden: true,
        cell: false,
        type: "select",
        dicData: getDicNS("whseLocation?warehouseType=0", "locationCode", "locationCode")
      }
    ]
  }
}