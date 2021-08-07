/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:58:01
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-07 14:58:01
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

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
let matUnit = getDIC("bas_matUnit");
let cust = getXDicT("basCustomer");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
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
        overHidden: true,
        width: 140,
        span: 6,
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
        click: () => {
          _this.choiceV = true;
        }
      },
      {
        label: "成品编号",
        prop: "productNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 6
      },
      {
        label: "订单编号",
        prop: "poNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 6
      },
      {
        label: "客戶名称",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
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
        label: "款号",
        // tip: "Số màu",
        prop: "styleNo",
        width: 150,
        span: 6,
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
        span: 6,
        placeholder: " "
      },
      {
        label: "产地",
        prop: "originPlace",
        // tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false
      },
      {
        label: "码长",
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "疋号",
        prop: "pidNo",
        tip: "Cây",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "净重",
        // tip: "Tổng cộng(KG)",
        prop: "netWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "浮重",
        // tip: "Tổng cộng(KG)",
        prop: "grossWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "重量单位",
        // tip: "Tổng cộng(KG)",
        prop: "weightUnit",
        width: 100,
        span: 6,
        type: "select",
        dicData: matUnit,
        placeholder: " "
      },
      {
        label: "布封",
        // tip: "Tổng cộng(KG)",
        prop: "clothWidth",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "布封单位",
        // tip: "Tổng cộng(KG)",
        prop: "widthUnit",
        width: 100,
        span: 6,
        type: "select",
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " "
      }
    ]
  };
}
