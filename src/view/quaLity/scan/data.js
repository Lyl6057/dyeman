/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-01 08:37:07
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 160,
    column: [
      {
        label: "布票号",
        prop: "noteCode",
        span: 8,
        placeholder: "请扫描布票号条码",
        click: () => {
          _this.type = "bf";
        }
      },
      {
        label: "重量",
        prop: "eachNumbers",
        width: 80,
        // align: "left",
        // type: "number",
        span: 8,
        placeholder: "请打开称重应用"
      },
      {
        label: "验布员工号",
        prop: "clothCheckers",
        span: 8,
        placeholder: "请扫描员工条码",
        click: () => {
          _this.type = "yg";
        }
      },
      {
        label: "载具编号",
        prop: "storeLoadCodes",
        span: 8,
        placeholder: "请输入载具编号",
        click: () => {
          _this.type = "zj";
        }
      },
      {
        label: "QC扣减数量",
        prop: "qcTakeOuts",
        width: 80,
        // align: "left",
        // type: "number",
        span: 8,
        placeholder: "请输入QC扣减数量"
      },
      {
        label: "值机工号",
        prop: "workNos",
        span: 8,
        placeholder: "请扫描值机工号",
        click: () => {
          _this.type = "yg";
        }
      },
      {
        label: "存储位置",
        prop: "storeSiteCodes",
        span: 16,
        placeholder: "请输入存储位置",
        type: "select",
        props: {
          label: "locationCode",
          value: "locationCode"
        },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getXDicT("whseLocation", "locationCode", "locationCode"),
        click: () => {
          _this.type = "yg";
        }
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    menuWidth: 80,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 160px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
        label: "訂單號",
        prop: "poNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "布票編號",
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        overHidden: true
      },
      // {
      //   label: "客戶",
      //   prop: "customerName",
      //   width: 150,
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   display: false,
      //   overHidden: true
      // },
      // {
      //   label: "布类名称",
      //   prop: "fabricName",
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   width: 100,
      //   width: 200,
      //   overHidden: true
      // },
      // {
      //   label: "顏色",
      //   prop: "proColor",
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   width: 120,
      //   overHidden: true
      // },

      // {
      //   label: "纱批",
      //   prop: "spi",
      //   width: 90,
      //   hide: true,
      //   span: 6,
      // },

      // {
      //   label: "纱牌",
      //   prop: "sp",
      //   width: 90,
      //   hide: true,
      //   span: 6,
      // },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: true,

      // },
      {
        label: "机号",
        prop: "loomNo",
        width: 70,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true
      },
      // {
      //   label: "值机工号",
      //   prop: "workNo",
      //   width: 90,
      //   hide: false,
      //   span: 6,
      //   disabled: true,
      //   rules: [{
      //     required: true,
      //     message: "请输入值机工号",
      //     trigger: "blur"
      //   }],
      // },
      {
        label: "匹號",
        prop: "eachNumber",
        width: 60,
        align: "right",
        span: 6
      },

      // {
      //   label: "單位",
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label: "單位",
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },

      {
        label: "已打印",
        prop: "isPrinted",
        type: "select",
        disabled: true,
        dicData: [
          {
            value: true,
            label: "是"
          },
          {
            value: false,
            label: "否"
          }
        ],
        span: 6,
        width: 80
      },
      {
        label: "打印时间",
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        width: 180
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 100,
        align: "center",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "验布员工号",
        prop: "clothChecker",
        span: 6,
        placeholder: " ",
        // width: 200,
        cell: true
      }
    ]
  };
}
