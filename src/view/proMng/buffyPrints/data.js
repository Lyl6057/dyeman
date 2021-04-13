/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-13 09:27:09
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
        label: "客戶",
        prop: "customerName",
        span: 6,
        placeholder: " ",
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
export function popupForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "色号",
        prop: "colorNo",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "颜色深度",
        prop: "colorDepth",
        span: 6,
        placeholder: "请选择颜色深度",
        type: "select",
        disabled: !_this.isAdd,
        dicData: getDIC("bas_colorclTepth"),
        change: () => {
          if (_this.isAdd) {
            _this.depth()
          }

        }
      },
      {
        label: "染料份量(％)",
        prop: "dyeWeight",
        span: 6,
        placeholder: " ",
        align: "right",
        type: "number",
        minRows: _this.minRows,
        maxRows: _this.maxRows,
        disabled: true,
        // change: () => {
        //   // if (_this.form.colorDepth == '') {
        //   //   _this.form.dyeWeight = 0
        //   //   _this.$tip.warning("请先选择颜色深度!")
        //   // }
        // }
      },
      {
        label: "颜色鲜度",
        prop: "salColorfresh",
        span: 6,
        type: "select",
        dicData: getDIC("sal_colorFresh"),
      },
      {
        label: _this.$t('whseField.khmc'),
        prop: "custCode",
        span: 6,
        placeholder: "请选择客户",
        disabled: !_this.isAdd,
        click: () => {

          _this.dlgWidth = '60%'
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custCode";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = '选择客戶';
        },
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "日期",
        prop: "colorDate",
        span: 6,
        placeholder: " ",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center",
      },
      {
        label: "颜色英文",
        prop: "colorEngName",
        span: 6,
      },
      {
        label: "状态",
        prop: "colorState",
        span: 6,
        placeholder: "请选择状态",
        type: "select",
        dicData: [
          {
            value: false,
            label: "未确定"
          },
          {
            value: true,
            label: "确定"
          }

        ]
      },
      {
        label: "颜色编号",
        prop: "colorBh",
        span: 6,
        placeholder: "请选择颜色编号",
        disabled: !_this.isAdd,
        click: () => {
          _this.dlgWidth = '60%'
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "colorBh";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = _this.$t("choicDlg.xzshxx");
        },
      },
      {
        label: "颜色中文",
        prop: "colorChn",
        span: 6,

      },
      {
        label: "颜色来源",
        prop: "colorSource",
        span: 6,
        placeholder: "请选择颜色来源",
        type: "select",
        dicData: getDIC("sal_colorSource"),
      },
      {
        label: "客色号",
        prop: "custColorBh",
        span: 6,
        disabled: !_this.isAdd,
      },
      {
        label: "面料",
        prop: "fabCode",
        span: 6,
        placeholder: "请选择面料",
        disabled: !_this.isAdd,
        click: () => {
          _this.dlgWidth = '100%'
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "fabCode";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = '胚布編碼';
        },

      },
      {
        label: "面料中文描述",
        prop: "fabricDesc",
        span: 12,
      },
      {
        label: "面料来源",
        prop: "fabSource",
        span: 6,
        placeholder: "请选择面料来源",
        type: "select",
        dicData: getDIC("LAP_FABSOURCE"),
      },
      {
        label: "第一光源",
        prop: "colorLights",
        span: 6,
        placeholder: "请选择第一光源",
        type: "select",
        dicData: getDIC("sal_colorLights"),
        disabled: !_this.isAdd,
        change: () => {
          _this.lights()
        }
      },
      {
        label: "面料英文描述",
        prop: "fabricDescEng",
        span: 12,
      },
      {
        label: "染色类别",
        prop: "lapDyetype",
        span: 6,
        placeholder: "请选择染色类别",
        type: "select",
        dicData: getDIC("LAP_DYETYPE"),
      },

      {
        label: "第二光源",
        prop: "deputyLights",
        span: 12,
        placeholder: " ",
        multiple: true,
        tags: false,
        type: "select",
        disabled: true,
        dicData: getDIC("sal_colorLights"),
        // change: () => {
        //   _this.lights("2")
        // }
      },
      {
        label: "对色标准",
        prop: "colorStandard",
        span: 6,
        placeholder: "请选择对色标准",
        type: "select",
        dicData: getDIC("sal_colorStandard"),
      },
      {
        label: "是否双染",
        prop: "doubleFlag",
        span: 6,
        placeholder: " ",
        type: "switch",
        dicData: [
          {
            label: "否",
            value: false
          },
          {
            label: "是",
            value: true
          },
        ]

      },
      {
        label: "档案编号",
        prop: "recN0",
        span: 6,
        disabled: !_this.isAdd,
      },
      {
        label: _this.$t("energy.bz"),
        prop: "remarks",
        span: 18,
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
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "布票編號",
        prop: "noteCode",
        width: 180,
        disabled: true, placeholder: " ",
        span: 6,
        sortable: true,
      },
      {
        label: "客戶",
        prop: "customerName",
        width: 180,
        disabled: true, placeholder: " ",
        span: 6,
        display: false
      },
      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true, placeholder: " ",
        span: 6,
        width: 100,
        width: 300,
        overHidden: true
      },
      {
        label: "顏色",
        prop: "proColor",
        disabled: true, placeholder: " ",
        span: 6,
        width: 100,
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
        width: 100,
        hide: false,
        span: 6,
        rules: [{
          required: true,
          message: "请输入机号",
          trigger: "blur"
        }],
        disabled: true
      },
      {
        label: "值机工号",
        prop: "workNo",
        width: 90,
        hide: false,
        span: 6,
        disabled: true,
        rules: [{
          required: true,
          message: "请输入值机工号",
          trigger: "blur"
        }],
      },
      {
        label: "幅宽",
        prop: "breadth",
        width: 80,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入幅宽",
          trigger: "blur"
        }]
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 80,
        align: "center",
        span: 6,

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
        label: "克重",
        prop: "gramWeight",
        width: 80,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入克重",
          trigger: "blur"
        }]
      },
      {
        label: "匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6,
      },
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