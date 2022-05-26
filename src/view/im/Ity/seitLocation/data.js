/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:20:55
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-25 17:57:34
 */
import {
    getDIC,
    getDicNS
  } from "@/config/index";


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

// 货位码值
let locCodeDictEnum = {};
// 获取货位码字段数
export function getLocCodeDictData(code){
    if(!locCodeDictEnum[code]){
        locCodeDictEnum[code] = getDicNS(`whseLocation?warehouseType=${code}`, "locationCode", "locationCode",{},false, () => {
            if(locCodeDictEnum[code].length == 0){
                locCodeDictEnum[code].push({})
            }
        });
    }
    return locCodeDictEnum[code];
}


// 主页面查询表单皮配置
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "材料类型",
      prop: "materialType",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDIC("whse_seitLoc_matType")
    }, {
      label: "整理日期",
      prop: "seitLocationDate",
      span: 5,
      placeholder: " ",
      type: "daterange",
      valueFormat: "yyyy-MM-dd",
    },{
      label: "本厂批号",
      prop: "batchNo",
      span: 5,
      placeholder: " ",
    }, ]
  };
}


export function mainCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    column: [{
      label: "整理编号",
      prop: "seitlocationNo", 
      width: 120,
    }, {
      label: "材料类型",
      prop: "materialType",
      width: 100,
      type: "select",
      dicData: getDIC("whse_seitLoc_matType")
    }, {
      label: "整理日期",
      prop: "seitlocationDate",
      width: 100,
    }, {
      label: "本厂批号",
      overHidden: true,
      prop: "batchNo",
      width: 200,
    },{
      label: "整理状态",
      prop: "seitlocationState",
      width: 100,
      type: "select",
      dicData: getDIC("whse_seitLoc_state")
    }]
  }
}

export function seitLocFormDataOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "整理编号",
      prop: "seitlocationNo",
      span: 5,
      placeholder: " ",
      disabled: true
    }, {
      label: "整理日期",
      prop: "seitlocationDate",
      span: 5,
      placeholder: " ",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    }, {
      label: "材料类型",
      prop: "materialType",
      span: 5,
      placeholder: " ",
      type: "select",
      dicData: getDIC("whse_seitLoc_matType")
    },]
  };
}

export function seitLocDtlaCrudOp(_this) {
  return {
    ...mainCrudOpCommon,
    height: "calc(100vh - 205px)",
    rowKey: "whseSeitlocationDtlaOid",
    page: false,
    column: [{
      label: "材料编号",
      prop: "materialId",
      width: 100
    }, {
      label: "材料名称",
      prop: "materialName",
      width: 200,
      overHidden: true,
    }, {
      label: "本厂批号",
      prop: "batchNo",
      width: 120,
      overHidden: true
    }, {
      label: "纱牌",
      prop: "materialBrand",
      width: 100,
      overHidden: true,
      hide: _this.curMatTypeVal != "0"
    }, {
      label: "供应商批号",
      prop: "suppBatId",
      width: 120,
      overHidden: true,
      hide: _this.curMatTypeVal != "0"
    }, {
      label: "原货位码",
      prop: "sourceLocation",
      width: 120,
      type: "number",
      align: "right",
    }, {
      label: "库存重量",
      prop: "weight",
      width: 120,
      // cell: true,
      type: "number",
      align: "right",
      precision: 2,
      formatter: (row, value) => {
        return (+value || 0).toFixed(2)
      }
    }, {
      label: "单位",
      prop: "weightUnit",
      width: 120,
      type: "select",
      dicData: getDIC("bas_matUnit")
    }]
  }
}

export function seitLocDtlbCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        height: "calc(100vh - 205px)",
        rowKey: "whseSeitlocationDtlbOid",
        showSummary: true,
        page: false,
        column: [{
            label: "新货位码",
            prop: "destLocation",
            width: 130,
            cell: true,
            placeholder: " ",
            type: "select",
            dicData: getLocCodeDictData(_this.curMatTypeVal)
        }, {
            label: "重量",
            prop: "weight",
            width: 120,
            type: "number",
            align: "right",
            formatter(row,value){
                return (+value || 0).toFixed(2);
            },
            cell: true,
            placeholder: " "
        }],
        sumColumnList: [
            {
                name: "weight",
                type: "sum"
            }
        ],
    }
}
