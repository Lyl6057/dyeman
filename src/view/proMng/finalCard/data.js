/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:58:01
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-01 16:55:56
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getXDicT("basCustomer");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸號",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "成品编号",
        prop: "productNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "订单编号",
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        }
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        type: "select",
        dicData: getDicT("proBleadyeJob", "vatNo", "vatNo", {}, "vatNo"),
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        overHidden: true,
        width: 140,
        span: 8,
        disabled: false,
        sortable: true,
        placeholder: "請选择缸號",
        rules: [
          {
            required: true,
            message: "請选择缸號",
            trigger: "blur"
          }
        ],
        change: val => {
          if (val.value) {
            _this.$nextTick(() => {
              _this.query();
            });
          }
        }
      },
      {
        label: "成品编号",
        prop: "productNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 8
      },
      {
        label: "订单编号",
        prop: "poNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 8
      },
      {
        label: "客戶名称",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 8,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        }
      },

      {
        label: "布类名称",
        // tip: "Tổng cộng(KG)",
        prop: "fabName",
        width: 100,
        span: 16,
        placeholder: " "
      },
      {
        label: "款号",
        // tip: "Số màu",
        prop: "styleNo",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "顏色名稱",
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 8,
        placeholder: " "
      },
      {
        label: "产地",
        prop: "originPlace",
        // tip: "Mã vải",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false
      },
      {
        label: "克重",
        // tip: "Tổng cộng(KG)",
        prop: "gramWeight",
        width: 100,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "幅宽",
        // tip: "Tổng cộng(KG)",
        prop: "breadth",
        width: 100,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " "
      },

      {
        label: "码长",
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "left",
        minRows: 0,
        placeholder: " "
      },

      {
        label: "浮重",
        // tip: "Tổng cộng(KG)",
        prop: "grossWeight",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "纸筒重量",
        // tip: "Tổng cộng(KG)",
        prop: "paperTube",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "净重",
        // tip: "Tổng cộng(KG)",
        prop: "netWeight",
        width: 100,
        span: 8,
        type: "number",
        minRows: 0,
        align: "left",
        placeholder: " "
      },

      {
        label: "重量单位",
        // tip: "Tổng cộng(KG)",
        prop: "weightUnit",
        width: 100,
        span: 8,
        type: "select",
        dicData: matUnit,
        placeholder: " "
      },

      {
        label: "布封",
        // tip: "Tổng cộng(KG)",
        prop: "clothWidth",
        width: 100,
        span: 8,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "布封单位",
        // tip: "Tổng cộng(KG)",
        prop: "widthUnit",
        width: 100,
        span: 8,
        type: "select",
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " "
      },
      {
        label: "疋号",
        prop: "pidNo",
        width: 100,
        span: 8,
        type: "number",
        align: "left",
        minRows: 1,
        placeholder: " "
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 100,
        span: 8,
        placeholder: " "
      },
      {
        label: "货位码",
        prop: "storeSiteCode",
        width: 100,
        span: 8,
        placeholder: " ",
        type: "select",
        props: {
          label: "locationCode",
          value: "locationCode"
        },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getXDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: "打印模板",
        // tip: "Tổng cộng(KG)",
        prop: "printTem",
        width: 100,
        span: 16,
        type: "select",
        dicData: getDicT("basePrintTemplate/list", "tempName", "tempId"),
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請选择打印模板",
            trigger: "blur"
          }
        ]
      }
    ]
  };
}

export function temForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "模板编号",
        prop: "tempCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "模板名称",
        prop: "tempName",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function temCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "模板编号",
        prop: "tempCode",
        span: 8,
        width: 120,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請输入模板编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "模板名称",
        prop: "tempName",
        span: 8,
        width: 250,
        placeholder: " ",
        overHidden: true,
        rules: [
          {
            required: true,
            message: "請输入模板名称",
            trigger: "blur"
          }
        ]
      },
      {
        label: "模板内容",
        prop: "tempContent",
        span: 8,
        width: 250,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "模板说明",
        prop: "tempDescr",
        span: 8,
        width: 250,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "模板路径",
        prop: "tempPath",
        span: 8,
        width: 350,
        overHidden: true,
        display: false,
        placeholder: " "
      },
      {
        label: "选择excel模板",
        prop: "excelName",
        width: 350,
        span: 8,
        placeholder: " ",
        formslot: true,
        // slot: true,
        hide: true

        // type: "select",
        // disabled: _this.isAdd ? false : true,
        // display: _this.isAdd ? true : false,
        // click: () => {
        //   _this.$refs.input.click();
        // }
      }
    ]
  };
}
