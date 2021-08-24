import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("whseMng.ckmc"), //_this.$t("whseMng.ckmc"),
        prop: "warehouseName",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseMng.cklx"),
        prop: "warehouseType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("Whse_warehouse_type")
      }
    ]
  };
}
export function popupForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: _this.$t("whseMng.ckdh"), //_this.$t("whseMng.ckdh"),
        prop: "warehouseId",
        span: 6,
        maxlength: 2
        // placeholder: " ",
      },
      {
        label: _this.$t("whseMng.ckmc"), //_this.$t("whseMng.ckmc"),
        prop: "warehouseName",
        span: 6
      },
      {
        label: _this.$t("whseMng.cklx"), //_this.$t("whseMng.cklx"),
        prop: "warehouseType",
        span: 6,
        type: "select",
        dicData: getDIC("Whse_warehouse_type")
      },
      {
        label: _this.$t("whseMng.ckgg"), // _this.$t("whseMng.ckgg"),
        prop: "warehouseLength",
        span: 6
      }
    ]
  };
}
export function shelvesForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 165,
    column: [
      {
        label: _this.$t("whseMng.ckdh"),
        prop: "warehouseId",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseMng.ckmc"),
        prop: "warehouseName",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: _this.$t("whseMng.qwm"),
        prop: "areaCode",
        span: 6,
        placeholder: " ",
        disabled: true
        // row: true
      },
      {
        label: _this.$t("whseMng.hj"),
        prop: "shelves",
        span: 6,
        placeholder: " ",
        // type: "number",
        // align: "left",
        // minRows: 1,
        display:
          _this.shelvesType === "3" || _this.shelvesType === "2" ? false : true
      },
      {
        label: _this.$t("whseMng.cs"),
        prop: "cs",
        span: 6,
        placeholder: " ",
        minRows: 1,
        type: "number",
        display: _this.shelvesType === "3" ? false : true
      },
      {
        label: _this.$t("whseMng.mchws"),
        prop: "hws",
        span: 6,
        placeholder: " ",
        type: "number",
        minRows: 1
      },
      {
        label: _this.$t("whseMng.hwkbs"),
        prop: "kbs",
        span: 6,
        placeholder: " ",
        type: "number",
        minRows: 1,

        display: _this.shelvesType === "0" ? true : false
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseMng.ckdh"),
        prop: "warehouseId",
        width: 100,
        placeholder: " "
      },
      {
        label: _this.$t("whseMng.ckmc"),
        prop: "warehouseName",
        width: 150,
        placeholder: " "
      },
      {
        label: _this.$t("whseMng.cklx"),
        prop: "warehouseType",
        width: 120,
        type: "select",
        dicData: getDIC("Whse_warehouse_type"),
        placeholder: " "
      },
      {
        label: _this.$t("whseMng.ckgg"),
        prop: "warehouseLength",
        width: 120,
        placeholder: " "
      }
    ]
  };
}
export function partitionCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 273px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseMng.fqdh"),
        prop: "partitionId",
        width: 120,
        placeholder: " ",
        cell: true
      },
      {
        label: _this.$t("whseMng.qwm"),
        prop: "areaCode",
        width: 120,
        placeholder: " ",
        cell: true
      },
      {
        label: _this.$t("whseMng.hwmx"),
        prop: "warehouseModel",
        width: 200,
        type: "select",
        placeholder: " ",
        dicData: getDIC("Whse_warehouse_model"),
        cell: true,
        change: () => {
          _this.model();
        }
      }
    ]
  };
}
export function locCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 253px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseMng.hj"),
        prop: "shelves",
        width: 100,
        placeholder: " ",
        cell: true
      },
      // {
      //   label: _this.$t("public.lsh"),
      //   prop: "shelvesCode",
      //   width: 120,
      //   placeholder: " ",
      // },
      {
        label: _this.$t("whseMng.hjcm"),
        prop: "layerCode",
        width: 140,
        placeholder: " ",
        cell: true
      },
      {
        label: _this.$t("whseMng.hgm"),
        prop: "latticeCode",
        width: 150,
        placeholder: " ",
        cell: true
      },
      // {
      //   label: _this.$t("whseMng.kbm"),
      //   prop: "cardCode",
      //   width: 150,
      //   placeholder: " ",
      //   cell: true
      // },
      {
        label: _this.$t("whseMng.hwm"),
        prop: "locationCode",
        width: 180,
        placeholder: " ",
        cell: false
      }
    ]
  };
}
