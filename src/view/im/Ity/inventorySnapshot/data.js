/*
 * @Description: 
 * @Version: 1.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:58:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-31 10:14:58
 */


import {
  getDIC
} from "@/config/index";

let kindId = getDIC("bas_censorshipVarieties");
let invTypeDict = getDIC("whse_inventoryType")
let matUnit = getDIC("bas_matUnit");
export function queryFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
        label: "物料种类",
        prop: "materialClass",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
        change: () => {
          //   _this.$nextTick(() => {
          //     if (!_this.loading) {
          //       _this.page.currentPage = 1;
          //       _this.getData();
          //     }
          //   });
        }
      },
      {
        label: "盘点类型",
        prop: "inventoryType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: invTypeDict,
        change: () => {
          //   _this.$nextTick(() => {
          //     if (!_this.loading) {
          //       _this.page.currentPage = 1;
          //       _this.getData();
          //     }
          //   });
        }
      },
    ]
  };
}

export function crudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    tree: true,
    rowKey: "index",
    index: true,
    sumColumnList: [{
      label: " ",
      name: "stock",
      type: "sum"
    }],
    page: true,
    column: [{
        label: "盘点编号",
        prop: "inventoryNo",
        width: 160
      },
      {
        label: "物料类别",
        //   prop: "materialClass",
        prop: "materialClassName",
        type: "select",
        width: 100
      },
      {
        label: "计划盘点日期",
        prop: "inventoryDate",
        width: 150
      },
      {
        label: "盘点类型",
        // prop: "inventoryType",
        prop: "inventoryTypeName",
        width: 100
      },
      {
        label: "盘点状态",
        // prop: "inventoryState",
        prop: "inventoryStateName",
        width: 100
      },
    ]
  };
}

export function editFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
        label: "盘点编号",
        prop: "inventoryNo",
        span: 12,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "物料种类",
        prop: "materialClass",
        span: 12,
        placeholder: " ",
        type: "select",
        disabled: true,
        dicData: kindId,
      },
      {
        label: "计划盘点日期",
        prop: "inventoryDate",
        span: 12,
        placeholder: "请选择",
        type: "date",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "盘点类型",
        prop: "inventoryType",
        span: 12,
        placeholder: " ",
        type: "select",
        dicData: invTypeDict,
        change: () => {
          //   _this.$nextTick(() => {
          //     if (!_this.loading) {
          //       _this.page.currentPage = 1;
          //       _this.getData();
          //     }
          //   });
        }
      },
    ],
  }
}


// 明细数据
// 查询框
export function dtlFormOp(_this,invType){
  console.log()
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column:[
      {
        label: "盘点编号",
        prop: "inventoryNo",
        span: 4,
        disabled: true,
        placeholder: " ",
      },
      {
        label: "盘点类型",
        prop: "inventoryTypeName",
        span: 4,
        disabled: true,
        placeholder: " ",
      },
      {
        label:  invType == "CPB" ? "缸号" : "材料编号",
        prop: "matCode",
        span: 4,
        placeholder: " ",
      },
      {
        label: "差异显示",
        prop: "isFilterSameQty",
        type: "switch",
        span: 4,
        change: _this.filterSameQty
      }
    ]
  }
}

// 公共配置
const commonOp = {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 160px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: false,
    rowKey: "index",
    index: true,
}
// 纱线
export function sxCrudOp(_this){
  return {
    ...commonOp,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "yarnsId",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "yarnsName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: false,
        width: 180,
        overHidden: true
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "stockQty",
        cell: false,
        width: 100,
        type: "number",
        align: "right",
        precision: "2"
      },
      {
        label: "实际数量",
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationId",
        cell: false,
        width: 120
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        width: 150,
        placeholder: " "
      }
    ]
  }
}

// 通用配置 （化工原料、燃料）
export function pubCrudOp(_this){
  return {
    ...commonOp,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialCode",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 120,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "stockQty",
        cell: false,
        width: 100,
        type: "number",
        align: "right",
        precision: "2"
      },
      {
        label: "实际数量",
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        width: 150,
        placeholder: " "
      }
    ]
  }
}


// 成品布
export function cpbCrudOp(_this){
  return {
    ...commonOp,
    column:[
      {
        label: "缸号",
        prop: "vatNo",
        width: 180,
        overHidden: true,
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        cell: false,
        overHidden: true,
        width: 120
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 150,
        overHidden: true
      },
      {
        label: "存储位置",
        prop: "locationCode",
        width: 120,
      },
      {
        label: "匹號",
        prop: "batchNo",
        width: 80,
        align: "right",
      },
      {
        label: "重量",
        prop: "stockQty",
        width: 100,
        align: "right",
        type: "number",
        precision: 2
      },
      {
        label: "实际重量",
        prop: "inventoryQty",
        cell: true,
        width: 120,
        type: "number",
        align: "right",
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitName",
        cell: false,
        width: 80,
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        width: 150,
        placeholder: " "
      }
    ]
  }
}

