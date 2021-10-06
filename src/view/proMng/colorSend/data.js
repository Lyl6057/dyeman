/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 15:40:56
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
        label: "客户",
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: "批色员",
        prop: "appColorQc",
        span: 6,
        placeholder: " "
      },
      {
        label: "送办日期",
        prop: "sendDate",
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
    labelWidth: 120,
    selection: true,
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
        ],
        click: () => {
          // _this.choiceTle = "选择染整工单";
          // _this.choiceV = true;
        }
      },
      {
        label: "客户",
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        type: "select",
        dicData: cust,
        tip: "Khách hàng"
      },
      {
        label: "送办日期",
        prop: "sendDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "颜色",
        tip: "Màu",
        prop: "colorName",
        width: 140,
        overHidden: true,
        span: 6
      },
      {
        label: "布种",
        tip: "mô tả vải",
        prop: "fabFabrics",
        width: 250,
        overHidden: true,
        span: 6
      },

      {
        label: "送办次数",
        prop: "sendCount",
        width: 90,
        overHidden: true,
        type: "number",
        span: 6
      },
      {
        label: "批色员",
        prop: "appColorQc",
        width: 140,
        overHidden: true,
        span: 6
      },
      {
        label: "是否头缸",
        prop: "isFristVat",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "客户回复日期",
        prop: "custReplyDate",
        width: 150,
        type: "date",
        span: 6,
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "客户评语",
        prop: "custComments",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false
      },

      {
        label: "备注",
        tip: "ghi chú",
        prop: "remark",
        overHidden: true,
        width: 180,
        span: 24,
        disabled: false
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
