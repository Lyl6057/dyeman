/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-30 14:47:16
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸号",
        tip: "lô nhuộm",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "创建日期",
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
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
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // labelPosition: "top",
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "缸号",
        tip: "số lô nhuộm",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ]
        // type: "select",
        // dicData: getDicT("proBleadyeJob", "vatNo", "vatNo", {}, "vatNo")
      },
      {
        label: "回修原因",
        prop: "reworkRemark",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },
      {
        label: "签字",
        prop: "signPerson",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false
      },
      {
        label: "处理方法",
        prop: "workWay",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },
      {
        label: "创建日期",
        prop: "createTime",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        display: false,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      }
    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "salPooid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: "订单日期",
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "订单类别",
        prop: "poType",
        width: 110,
        type: "select",
        dicData: getDIC("sal_poType")
      },

      {
        label: "订单狀態",
        prop: "poStatus",
        width: 110,
        type: "select",
        dicData: getDIC("Status")
      }
    ]
  };
}
// compCrud
export function gyCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: "编号",
      //   prop: "itemCode",
      //   width: 120,
      //   span: 6,
      //   cell: true
      // },
      {
        label: "项目",
        prop: "itemName",
        width: 400,
        span: 6,
        cell: true
      },
      // {
      //   label: "数据类型",
      //   prop: "dataStyle",
      //   width: 120,
      //   span: 6,
      //   cell: true,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: "string",
      //       label: "输入框"
      //     },
      //     {
      //       value: "boolean",
      //       label: "选择框"
      //     }
      //   ]
      // },
      {
        label: "设定",
        prop: "itemSet",
        width: 120,
        span: 6,
        cell: true,
        slot: true,
        type: "number",
        precision: 2
        // overHidden: true,
      },
      {
        label: "实际",
        prop: "itemActual",
        slot: true,
        width: 120,
        span: 6,
        type: "number",
        precision: 2,
        cell: true
        // overHidden: true,
      }
    ]
  };
}

export function pfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "物料编码",
        prop: "materialCode",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " ",
        cell: true
      },
      {
        label: "物料名称",
        prop: "materialName",
        width: 180,
        // overHidden: true,
        placeholder: " ",
        span: 6,
        cell: true
      },
      {
        label: "数量",
        prop: "useAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "浴比",
        prop: "waterRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.waterAmount = Number(
              (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
            );
          });
        }
      },

      {
        label: "水量",
        prop: "waterAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "开稀比例",
        prop: "diluteRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "输送数量",
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      }
    ]
  };
}
