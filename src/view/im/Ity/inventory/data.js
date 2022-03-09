/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-09 10:07:34
 * @Description:
 */

import { getDIC, getXDicT, getDicT, postDicT, getDbDicT } from "@/config/index";

let kindId = getDIC("bas_censorshipVarieties");
let matUnit = getDIC("bas_matUnit");
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "材料种类",
        prop: "type",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: kindId,
        change: () => {
          _this.$nextTick(() => {
            _this.page.currentPage = 1;
            _this.getData();
          });
        }
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId",
        placeholder: " ",
        span: 6
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        placeholder: " ",
        span: 6
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
        // display: _this.form ? true : _this.form.type == "CPB" ? true : false
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " "
        // display: _this.form ? true : _this.form.type == "CPB" ? true : false
      }
    ]
  };
}
export function formTemOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: _this.$t("whseField.clbh"),
        prop: "materialId",
        span: 6,
        placeholder: " ",
        disabled: _this.isAdd,
        click: () => {
          if (_this.isAdd) {
            return;
          }
          _this.choiceV = true;
          if (_this.form.materialId === "") {
            _this.crud = [];
            _this.form.materialName = "";
            _this.form.kindId = "";
            _this.form.unitId = "";
            _this.form.materialType = "";
          }
        }
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "materialName",
        span: 18,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: []
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "unitId",
        span: 6,
        type: "select",
        disabled: false,
        dicData: matUnit
      },
      {
        label: "材料种类",
        prop: "kindId",
        cell: true,
        span: 6,
        type: "select",
        dicData: kindId,
        disabled: true
      },
      {
        label: "材料类别",
        prop: "materialType",
        cell: true,
        span: 6,
        disabled: true,
        type: "select",
        dicData: []
      }
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
    sumColumnList: [
      {
        label: " ",
        name: "stock",
        type: "sum"
      }
    ],
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      // {
      //   label: "材料种类",
      //   prop: "kindId",
      //   width: 100,
      //   type: "select",
      //   dicData: kindId
      // },
      {
        label: _this.$t("whseField.clbh"),
        prop: "chemicalId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        overHidden: true,
        width: 180
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}
export function crudTemOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "openingQty",
        type: "sum"
      },
      {
        label: " ",
        name: "oldpooccupyqty",
        type: "sum"
      }
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: true,
        overHidden: true,
        width: 160
      },
      {
        label: "期初数量",
        prop: "openingQty",
        cell: true,
        width: 120,
        align: "right"
      },
      {
        label: "老单占用数",
        prop: "oldpooccupyqty",
        cell: true,
        width: 120,
        align: "right"
      }
    ]
  };
}
export function finishedCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menuTitle: "称重",
    rowKey: "id",
    tree: false,
    defaultExpandAll: false,
    expandLevel: 2,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "storeLoadCode",
        type: "count"
      },
      {
        label: " ",
        name: "weight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "存储位置",
        prop: "locationCode",
        cell: true,
        width: 120,
        placeholder: " "
      },
      {
        label: "匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "重量",
        prop: "weight",
        width: 100,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: "單位",
        prop: "weightUnit",
        width: 80,
        display: false,
        placeholder: " ",
        span: 6,
        type: "select",
        dicData: matUnit
      }
    ]
  };
}

export function sxOp(_this) {
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
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.clbh"),
        prop: "yarnsId",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "yarnsName",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        width: 180,
        overHidden: true
      },
      {
        label: "库存数量",
        prop: "weight",
        cell: false,
        width: 120,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        width: 120
      }
    ]
  };
}
