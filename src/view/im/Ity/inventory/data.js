/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-24 11:07:40
 * @Description:
 */

import { getDIC, getXDicT, getDicT, postDicT, getDbDicT } from "@/config/index";

let kindId = getDIC("bas_censorshipVarieties");
let matUnit = getDIC("bas_matUnit");
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
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
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
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
        width: 300
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
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
