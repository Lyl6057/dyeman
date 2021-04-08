/*
 * @Author: Lyl
 * @Date: 2021-04-08 20:27:03
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-08 23:12:00
 * @Description:
 */
import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    card: false,
    menuBtn: false,
    labelWidth: 110,
    column: [
      {
        label: _this.$t("energy.yblx"),
        prop: "yblx",
        span: 6,
        type: "select",
        dicData: getDIC("eWDFS_401"),
        change: () => {
          _this.$nextTick(() => {
            _this.resetTree()
          })

        }
      },
    ],

  }
}


export function ybOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    card: false,
    menuBtn: false,
    labelWidth: 110,
    column: [
      {
        label: _this.$t("energy.bh"),
        prop: "emId",
        span: 8,
        rules: [
          {
            required: true,
            message: "請輸入編號",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.name"),
        prop: "emName",
        span: 8,
        rules: [
          {
            required: true,
            message: "請輸入名稱",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.sfyx"),
        prop: "emIsvalid",
        span: 8,
        type: "select",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          },
        ],
        rules: [
          {
            required: true,
            message: _this.$t("energy.qxzsfyx"),
            trigger: "blur",
          },
        ],
      },

      {
        label: _this.$t("energy.dw"),
        prop: "emUnit",
        span: 8,
        type: "select",
        dicData: getDIC("eWDFS_402"),
        rules: [
          {
            required: true,
            message: _this.$t("energy.qxzdw"),
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.cbr"),
        prop: "emMan",
        span: 8,
        display: false,
      },
      {
        label: _this.$t("energy.dj"),
        prop: "emPrice",
        span: 8,
        rules: [
          {
            required: true,
            message: _this.$t("energy.qsrdj"),
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.bl"),
        prop: "emMulti",
        span: 8,
        rules: [
          {
            required: true,
            message: _this.$t("energy.qsrbl"),
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.wz"),
        prop: "emSite",
        span: 8,
      },
      {
        label: _this.$t("energy.bz"),
        prop: "emRemark",
        span: 16,
      },
    ],

  }
}
console.log(getDicT("baseEquipmentList"))
export function eqOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 336px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("energy.sbmc"),
        prop: "equName",
        type: "tree",
        dicData: [],
        cell: true,
        width: 250
      },
      {
        label: _this.$t("energy.sbdm"),
        prop: "equId",
        display: false,
        width: 120,

      },

    ],
  }

}