import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: "仓库名称",
      prop: "warehouseName",
      span: 6,
      placeholder: " ",

    },
    {
      label: "仓库类型",
      prop: "warehouseType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("Whse_warehouse_type")
    },
    ],
  }
}
export function popupForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [{
      label: "仓库代号",
      prop: "warehouseId",
      span: 6,
      maxlength: 2,
      // placeholder: " ",
    },
    {
      label: "仓库名称",
      prop: "warehouseName",
      span: 6,

    },
    {
      label: "仓库类型",
      prop: "warehouseType",
      span: 6,
      type: "select",
      dicData: getDIC("Whse_warehouse_type")
    },
    {
      label: "仓库规格",
      prop: "warehouseLength",
      span: 6,
    },

    ],
  }


}
export function shelvesForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [{
      label: "仓库代号",
      prop: "warehouseId",
      span: 6,
      placeholder: " ",
      disabled: true
    },
    {
      label: "仓库名称",
      prop: "warehouseName",
      span: 6,
      placeholder: " ",
      disabled: true
    },
    {
      label: "区位码",
      prop: "areaCode",
      span: 6,
      placeholder: " ",
      disabled: true,
      // row: true
    },
    {
      label: "货架",
      prop: "shelves",
      span: 6,
      placeholder: " ",
      // type: "number",
      // align: "left",
      // minRows: 1,
      display: _this.shelvesType === "3" || _this.shelvesType === "2" ? false : true
    },
    {
      label: "层数",
      prop: "cs",
      span: 6,
      placeholder: " ",
      minRows: 1,
      type: "number",
      display: _this.shelvesType === "3" ? false : true
    },
    {
      label: "每层货位数",
      prop: "hws",
      span: 6,
      placeholder: " ",
      type: "number",
      minRows: 1,
    },
    {
      label: "货位卡板数",
      prop: "kbs",
      span: 6,
      placeholder: " ",
      type: "number",
      minRows: 1,

      display: _this.shelvesType === "0" ? true : false
    },

    ],
  }


}



export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "仓代号",
      prop: "warehouseId",
      width: 100,
      placeholder: " ",
    },
    {
      label: "仓库名称",
      prop: "warehouseName",
      width: 150,
      placeholder: " ",
    },
    {
      label: "仓库类型",
      prop: "warehouseType",
      width: 120,
      type: "select",
      dicData: getDIC("Whse_warehouse_type"),
      placeholder: " ",
    },
    {
      label: "仓库规格",
      prop: "warehouseLength",
      width: 120,
      placeholder: " ",
    },
    ]
  }

}
export function partitionCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "分区代号",
      prop: "partitionId",
      width: 120,
      placeholder: " ",
      cell: true
    },
    {
      label: "区位码",
      prop: "areaCode",
      width: 80,
      placeholder: " ",
      cell: true
    },
    {
      label: "货位模型",
      prop: "warehouseModel",
      width: 200,
      type: "select",
      placeholder: " ",
      dicData: getDIC("Whse_warehouse_model"),
      cell: true,
      change: () => {
        _this.model()
      }
    },
    ]
  }

}
export function locCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 260px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "货架",
      prop: "shelves",
      width: 100,
      placeholder: " ",
      cell: true
    },
    {
      label: "流水号",
      prop: "shelvesCode",
      width: 100,
      placeholder: " ",
    },
    {
      label: "货架层码",
      prop: "layerCode",
      width: 100,
      placeholder: " ",
      cell: true
    },
    {
      label: "货格码",
      prop: "latticeCode",
      width: 100,
      placeholder: " ",
      cell: true
    },
    {
      label: "卡板码",
      prop: "cardCode",
      width: 100,
      placeholder: " ",
      cell: true
    }, {
      label: "货位码",
      prop: "locationCode",
      width: 180,
      placeholder: " ",
      cell: false
    },
    ]
  }

}
