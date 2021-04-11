/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-09 13:13:39
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let cust = getDicT("basCustomer", "custName", "custCode")

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "工序名称",
        prop: "workName",
        span: 6,
        placeholder: " ",
      },
      {
        label: "订单号",
        prop: "poNo",
        span: 6,
        placeholder: " ",
        type: "select",
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "排单号",
        prop: "stepCode",
        span: 6,
        placeholder: " ",

      },
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ],
  }
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
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
        label: "生產單號",
        prop: "weaveJobCode",
        width: 110,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "请输入生產單號",
          trigger: "blur"
        }],
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 140,
        span: 6,
        placeholder: "请選擇訂單編號",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇訂單編號",
          trigger: "blur"
        }],
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label: "客戶名稱",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: "请選擇客戶名稱",
        type: "select",
        dicData: cust,
      },
      {
        label: "織單數量",
        prop: "amount",
        width: 100,
        placeholder: "请输入織單數量",
        span: 6,
        rules: [{
          required: true,
          message: "请输入織單數量",
          trigger: "blur"
        }],
        align: "right",
      },
      {
        label: "開機日期",
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [{
          required: true,
          message: "请選擇開機日期",
          trigger: "blur"
        }],
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        width: 120,
        placeholder: " ",
        rules: [{
          required: true,
          message: "请輸入機號",
          trigger: "blur"
        }],

      },
      {
        label: "布類描述",
        prop: "fabricDesc",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [{
          required: true,
          message: "请選擇布類描述",
          trigger: "blur"
        }],
      },
      {
        label: "顏色名稱",
        prop: "colorName",
        placeholder: " ",
        width: 120,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [{
          required: true,
          message: "请選擇顏色名稱",
          trigger: "blur"
        }],
      },
      {
        label: "色號",
        prop: "colorCode",
        width: 120,
        span: 6,
      },
      {
        label: "紗支",
        prop: "yarnThickness",
        width: 90,
        hide: true,
        span: 12,
        type: "select",
        props: {
          value: "yarnName",
          label: "yarnName"
        },
        // multiple: true,
        dicData: [],
        rules: [{
          required: true,
          message: "请選擇紗支",
          trigger: "blur"
        }],
      },
      {
        label: "值机工号",
        prop: "zjgh",
        width: 90,
        hide: true,
        span: 6,
        rules: [{
          required: true,
          message: "请输入值机工号",
          trigger: "blur"
        }],
      },
      {
        label: "纱批",
        prop: "yarnBatch",
        width: 90,
        hide: true,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入纱批",
          trigger: "blur"
        }],
      },

      {
        label: "纱牌",
        prop: "yarnBrand",
        width: 90,
        hide: true,
        align: "right",
        span: 6,
      },
      // {
      //   label: "纱长",
      //   prop: "yarnLong",
      //   width: 90,
      //   align: "right", placeholder: " ",
      //   span: 6
      // },
      // {
      //   label: "针筒",
      //   prop: "workDrum",
      //   width: 90,
      //   align: "right", placeholder: " ",
      //   span: 6
      // }, {
      //   label: "针寸数",
      //   prop: "needleNum",
      //   width: 90,
      //   align: "right", placeholder: " ",
      //   span: 6
      // },
      {
        label: "幅宽",
        prop: "breadth",
        width: 90,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入幅宽",
          trigger: "blur"
        }]
      },
      {
        label: "克重",
        prop: "gramWeight",
        width: 90,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入克重",
          trigger: "blur"
        }]
      },
      {
        label: "平均匹重",
        prop: "pz",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [{
          required: true,
          message: "请输入平均匹重",
          trigger: "blur"
        }],
        change: () => {
          _this.$nextTick(() => {
            _this.form.ps = Math.ceil(_this.form.amount / _this.form.pz)
          })

        }
      },
      // {
      //   label: _this.$t('whseField.dw'),
      //   prop: "workUnit",
      //   width: 90,
      //   span: 6,
      //   disabled: true
      // },
      {
        label: "布票號",
        prop: "bph",
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: true
      },
      {
        label: "匹数",
        prop: "ps",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [{
          required: true,
          message: "请输入匹数",
          trigger: "blur"
        }],
      },
      {
        label: "起始疋号",
        prop: "qsph",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [{
          required: true,
          message: "请输入起始疋号",
          trigger: "blur"
        }],
      },
      // {
      //   label: "总针数",
      //   prop: "totalNeedle",
      //   width: 90,
      //   align: "right", placeholder: " ",
      //   span: 6
      // },

      {
        label: "日期",
        prop: "nowDate",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 6,
        hide: true
      }
    ],
  }

}