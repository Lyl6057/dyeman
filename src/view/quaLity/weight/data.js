/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-07 09:52:04
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let matUnit = getDIC("bas_matUnit")
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "訂單號",
        prop: "poNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "布票編號",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "机号",
        prop: "loomNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6,
      },
      // {
      //   label: "機台編號",
      //   prop: "machineCode",
      //   span: 6,
      //   placeholder: " ",

      // },
    ],
  }
}
export function mainCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    menuWidth: 80,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        disabled: true, placeholder: " ",
        span: 6,
        sortable: true,
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
      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true, placeholder: " ",
        span: 6,
        width: 100,
        width: 200,
        overHidden: true
      },
      {
        label: "顏色",
        prop: "proColor",
        disabled: true, placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },

      {
        label: "纱批",
        prop: "spi",
        width: 90,
        hide: true,
        span: 6,
      },

      {
        label: "纱牌",
        prop: "sp",
        width: 90,
        hide: true,
        span: 6,
      },
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
        rules: [{
          required: true,
          message: "请输入机号",
          trigger: "blur"
        }],
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
        span: 6,
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
      },
      {
        label: "打印时间",
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd hh:MM:ss",
        valueFormat: "yyyy-MM-dd hh:MM:ss",
        span: 6,
        align: "center",
        width: 180
      }
    ],
  }

}