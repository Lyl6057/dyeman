/*
 * @Description: 
 * @Version: 1.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:58:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-28 09:09:20
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
