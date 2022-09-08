/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:15
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-08 09:02:27
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
        change: val => {
          _this.$nextTick(() => {
            _this.type = val.value;
            _this.formOp = formOp(_this);
            if (!_this.loading) {
              _this.loading = true;
              _this.crud = [];
              _this.page.currentPage = 1;
              _this.getData();
            }
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
        label: _this.$t("whseField.clmc"),
        prop: "chemicalName",
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
        label: "供应商批号",
        prop: "batId",
        cell: false,
        placeholder: " ",
        span: 6
      },
      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: false,
        placeholder: " ",
        span: 6,
        display: _this.type == "SX" ? true : false
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        display: _this.type == "CPB" ? true : false
      },
      {
        label: "织单号",
        prop: "proName",
        span: 6,
        placeholder: " ",
        display: _this.type == "PB" ? true : false
      },
      {
        label: "布飞编号",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
        display: _this.type == "PB" ? true : false
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " ",
        display: _this.type == "SX" ? false : true
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
    height: "calc(100vh - 287px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    index: true,
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
        label: _this.$t("whseField.clbh"),
        prop: "chemicalIds",
        width: 140
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalNames",
        type: "select",
        overHidden: true,
        width: 400
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
      },
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
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    menuTitle: "称重",
    index: true,
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
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 80,
      //   align: "left",
      //   display: false,
      //   overHidden: true
      // },
      {
        label: "客戶名称",
        prop: "custCode",
        width: 140,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },

      {
        label: "布类名称",
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: false
      },
      {
        label: "颜色编号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: false
      },
      {
        label: "颜色名称",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        overHidden: true,
        hide: false
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
        label: "单位",
        prop: "weightUnit",
        width: 80,
        display: false,
        placeholder: " ",
        span: 6,
        type: "select",
        dicData: matUnit
      },
    ]
  };
}

export function sxOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 317px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: true,
    index: true,
    tree: false,
    rowKey: "batchNo",
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
        label: _this.$t("whseField.clbh"),
        prop: "chemicalIds",
        width: 120,
        fixed: true
      },
      {
        label: _this.$t("whseField.clmc"),
        prop: "chemicalNames",
        type: "select",
        overHidden: true,
        width: 400
      },
      {
        label: "库存数量",
        prop: "weight",
        cell: false,
        width: 100,
        type: "number",
        align: "right",
        precision: "2"
      },
      {
        label: _this.$t("whseField.dw"),
        prop: "weightUnit",
        cell: false,
        width: 80,
        type: "select",
        dicData: matUnit
      },
      // {
      //   label: _this.$t("whseField.hwm"),
      //   prop: "locationCode",
      //   cell: false,
      //   width: 120
      // },
      // {
      //   label: _this.$t("whseField.jyzt"),
      //   prop: "yinStatus",
      //   span: 6,
      //   placeholder: " ",
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("whse_yinStatus"),
      //   disabled: true
      // }
    ]
  };
}

export function noteCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 267px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: true,
    index: true,
    sumColumnList: [
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "客戶名称",
        prop: "customerName",
        width: 140,
        disabled: true,
        placeholder: " ",
        span: 6,
        // display: false,
        overHidden: true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },

      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: false
      },

      {
        label: "织单号",
        prop: "proName",
        width: 130,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },

      
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label: "单位",
        prop: "weightUnit",
        width: 80,
        display: false,
        placeholder: " ",
        span: 6,
        type: "select",
        dicData: matUnit
      },

      
      
    ]
  };
}

// 明细统计配置
export function whseDtlCountFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [
      {
        label: "入仓数量",
        prop: "inWeight",
        type: "number",
        span: 12
      },
      {
        label: "出仓数量",
        prop: "outWeight",
        type: "number",
        span: 12
      }
    ]
  };
}

// 出入仓明细数据表格配置
export function whseDtlCrudOp(_this) {
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
    height: "calc(100vh - 220px)",
    page: true,
    selection: true,
    column: [
      {
        label: "类型",
        prop: "whseStatus",
        align: "center",
        width: 70,
        formatter: (row, value) => {
          return value == "in" ? "入仓" : "出仓";
        }
      },
      {
        label: "日期",
        prop: "whseDate",
        width: 100
      },
      {
        label: "编号",
        prop: "whseCode",
        width: 140
      },
      {
        label: "数量",
        prop: "weight",
        width: 120,
        align: "right",
        formatter: (row, value) => {
          return (value || 0).toFixed(2);
        }
      },
      {
        label: "方式",
        prop: "whseType",
        width: 100,
        overHidden: true
      }
    ]
  };
}

//五金用品出入信息
export function wjDetailcrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    refreshBtn: false,
    columnBtn: false,
    // showOverflowTooltip: true,
    excelBtn: false,
    height: "calc(100vh - 325px)",
    showSummary: false,
    page: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        overHidden: true,
        align: 'center'
      },
      {
        label: "出入时间",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        width: 160,
        type: "select",
        //   dicData: getDIC("whse_yinStatus"),
      },
      {
        label: "类型",
        prop: "yinType",
        slot: true,
        align: 'center'
      },
      {
        label: "数量",
        prop: "poqty",
        slot: true,
        align: 'center'
      },
      {
        label: "单位",
        prop: "codeName",
        width: 100
      },
    ]
  };
}


export function materialsItyCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    excelBtn: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "stock",
        type: "sum"
      },
      {
        label: " ",
        name: "noteCode",
        type: "count"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
      },
      {
        label: " ",
        name: "batchNo",
        type: "count"
      }
    ],
    page: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        overHidden: true
      },
      
      {
        label: "布飞编号",
        prop: "noteCode",
        width: 180,
        disabled: true,
        placeholder: " ",
        hide: _this.type == 'PB' ? false : true,
        span: 6,
        overHidden: true
      },
      {
        label: "码卡编号",
        prop: "productNo",
        width: 170,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: _this.type == 'CPB' ? false : true,
      },
      {
        label: "疋号",
        prop: "eachNumber",
        width: 105,
        align: "right",
        span: 6,
        type: "number",
        hide: _this.type == 'PB' ? false : true,
        precision: 0
      },
      {
        label: "匹号",
        prop: "pidNo",
        width: 80,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0,
        hide: _this.type == 'CPB' ? false : true,
      },
      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: false,
        placeholder: " ",
        overHidden: true,
        span: 6,
        hide: _this.type == "SX" ? false : true
      },
      {
        label: "供应商批号",
        prop: "batId",
        cell: false,
        placeholder: " ",
        width: 140,
        overHidden: true,
        hide: _this.type == "SX" || _this.type == "RLL" ||  _this.type == "RHL" ? false : true,
      },
      {
        label: _this.$t("whseField.ph"),
        prop: "batchNo",
        cell: false,
        overHidden: true,
        width: 140,
        hide: _this.type != 'PB' && _this.type != 'CPB' ? false : true,
      },
      {
        label: "库存数量",
        prop: "clothWeight",
        cell: false,
        width: 120,
        align: "right",
        hide: _this.type == 'PB' ? false : true,
      },
      {
        label: "库存数量",
        prop: "weight",
        cell: false,
        width: 120,
        align: "right",
        hide: _this.type == 'SX' ? false : true,
      },
      {
        label: "库存数量",
        prop: "stock",
        cell: false,
        width: 120,
        align: "right",
        hide: _this.type == 'WJ' || _this.type == 'RLL' || _this.type == 'SB' ||   _this.type == 'RHL' || _this.type == 'FL' || _this.type == 'XZ' ? false : true,
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
        label: "载具编号",
        prop: "storeLoadCode",
        hide: _this.type == 'PB' || _this.type == 'CPB' ? false : true,
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 140
      },
       {
        label: _this.$t("whseField.hwm"),
        prop: "storageNo",
        cell: false,
        width: 120,
        hide: _this.type == 'WJ' || _this.type == 'RLL' || _this.type == 'SB' || _this.type == 'RHL' || _this.type == 'FL' || _this.type == 'XZ' ? false : true,
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "locationCode",
        cell: false,
        width: 120,
        hide: _this.type == 'SX' || _this.type == 'CPB' ? false : true,
      },
      {
        label: _this.$t("whseField.hwm"),
        prop: "storeSiteCode",
        cell: false,
        width: 120,
        hide: _this.type == 'PB' ? false : true,
      },
      {
        label: "入库日期",
        prop: "yinData",
        width: 160,
        hide: _this.type == 'SX' ? false : true,
        overHidden: true
      },
      {
        label: "在库时长",
        prop: "storageDays",
        width: 100,
        hide: _this.type == 'SX' ? false : true,
      },
      {
        label: _this.$t("whseField.jyzt"),
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        width: 100,
        type: "select",
        dicData: getDIC("whse_yinStatus"),
        disabled: true,
        hide: _this.type != 'SB' && _this.type != 'PB' && _this.type != 'CPB' ? false : true,
      }
    ]
  };
}

