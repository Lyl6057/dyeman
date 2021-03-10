import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

let colorMng = getXDicT("labTapcolor")
let cust = getDicT("basCustomer", "custName", "custCode")
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: "客户",
      prop: "custCode",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: cust
    },
    {
      label: "颜色编号",
      prop: "colorBh",
      span: 6,
      placeholder: " ",
    },
    {
      label: "颜色中文",
      prop: "colorChn",
      span: 6,
      placeholder: " ",
    },
    {
      label: "颜色英文",
      prop: "colorEngName",
      span: 6,
      placeholder: " ",
    },
    {
      label: "客色号",
      prop: "custColorBh",
      span: 6,
      placeholder: " ",
    },
    {
      label: "面料",
      prop: "fabricDesc",
      span: 12,
      placeholder: " ",
    },
    {
      label: "色号",
      prop: "colorNo",
      span: 6,
      placeholder: " ",
    },

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
        label: "打办编号",
        prop: "runNo",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "色号",
        prop: "labTapcolorFk",
        span: 6,
        placeholder: "请选择色号",
        disabled: false,
        click: () => {
          _this.dlgWidth = '100%'
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "colorNo";
          // _this.choiceQ.purType = '5'
          _this.choiceTarget = _this.form;
          _this.choiceTle = '选择色号资料';
          _this.$nextTick(() => {
            if (_this.form.labTapcolorFk === '') {

              _this.form.custCode = ''
              _this.form.colorChn = ''
              _this.form.colorSource = ''
              _this.form.custColorBh = ''
              _this.form.custColorBh = ''
              _this.form.fabCode = ''
              _this.form.fabricDesc = ''
              _this.form.runcolorQty = 0
              _this.form.batch = ''
              _this.form.runcolorType = ''
              _this.formOp.column[13].disabled = true

            }
          })
        },
        change: () => {
          _this.$nextTick(() => {
            if (_this.form.labTapcolorFk === '') {

              _this.form.custCode = ''
              _this.form.colorChn = ''
              _this.form.colorSource = ''
              _this.form.custColorBh = ''
              _this.form.custColorBh = ''
              _this.form.fabCode = ''
              _this.form.fabricDesc = ''
              _this.form.runcolorQty = 0
              _this.form.batch = ''
              _this.form.runcolorType = ''
              _this.formOp.column[13].disabled = true

            }
          })
        },
        disabled: !_this.isAdd,
        type: "select",
        props: {
          label: "colorNo",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      {
        label: "下办日期",
        prop: "rundwownDate",
        span: 6,
        type: "date",
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: "交办日期",
        prop: "handoverDate",
        placeholder: "请选择交办日期",
        span: 6,
        placeholder: " ",
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "客户",
        prop: "$custCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: cust
      },
      {
        label: "颜色",
        prop: "colorChn",
        span: 6,
        disabled: true,
        placeholder: " ",
        type: "select",
        props: {
          label: "colorChn",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      {
        label: "颜色来源",
        prop: "$colorSource",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        dicData: getDIC("sal_colorSource"),
      },
      {
        label: "客色号",
        prop: "custColorBh",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        props: {
          label: "custColorBh",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      {
        label: "面料编号",
        prop: "fabCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        type: "select",
        props: {
          label: "fabCode",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      {
        label: "面料中文",
        prop: "fabricDesc",
        span: 12,
        placeholder: " ",
        disabled: true,
        type: "select",
        props: {
          label: "fabricDesc",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      {
        label: "打办批次",
        prop: "batch",
        span: 6,
        disabled: true,
        row: true,
        placeholder: " ",
        type: "number",
      },
      {
        label: "色卡要求",
        prop: "colorRequest",
        span: 6,
        placeholder: "请选择色卡要求",
        type: "switch",
        dicData: getDIC("Sal_color_request"),
      },
      {
        label: "是否布办",
        prop: "isCloth",
        span: 6,
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
        label: "打色板个数",
        prop: "runcolorQty",
        span: 6,
        type: "number",
        placeholder: " ",
        disabled: true,
        minRows: 0,
        change: () => {
          _this.colorQty()
        }
      },
      {
        label: "打色办类型",
        prop: "runcolorType",
        span: 6,
        disabled: true,
        placeholder: " "
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
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,

    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "打办编号",
        prop: "runNo",
        width: 150,
      },
      {
        label: "色号",
        prop: "labTapcolorFk",
        width: 130,
        type: "select",
        props: {
          label: "colorNo",
          value: "labTapcoloroid"
        },
        dicData: colorMng
      },
      // {
      //   label: "客户编号",
      //   prop: "custCode",
      //   width: 100,
      //   // type: "select",
      //   // props: {
      //   //   label: "custCode",
      //   //   value: "labTapcoloroid"
      //   // },
      //   // dicData: colorMng
      // },
      {
        label: "客户",
        prop: "custCode",
        width: 220,
        type: "select",
        dicData: cust
      },
      {
        label: "颜色编号",
        prop: "colorBh",
        width: 140,
        type: "select",
        // props: {
        //   label: "colorBh",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "颜色来源",
        prop: "colorSource",
        width: 120,
        placeholder: " ",
        type: "select",
        dicData: getDIC("sal_colorSource"),
        // props: {
        //   label: "colorSource",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "颜色中文",
        prop: "colorChn",
        width: 120,
        type: "select",
        // props: {
        //   label: "colorChn",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "颜色英文",
        prop: "colorEngName",
        width: 150,
        // type: "select",
        // props: {
        //   label: "colorEngName",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "客色号",
        prop: "custColorBh",
        width: 130,
        type: "select",
        // props: {
        //   label: "custColorBh",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "面料编号",
        prop: "fabCode",
        width: 110,
        // type: "select",
        // props: {
        //   label: "fabCode",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng
      },
      {
        label: "面料",
        prop: "fabricDesc",
        width: 400,
        // type: "select",
        // props: {
        //   label: "fabricDesc",
        //   value: "labTapcoloroid"
        // },
        // dicData: colorMng

      },
      {
        label: "批次",
        prop: "batch",
        width: 80,
        align: "right"
      },
      {
        label: "交办日期",
        prop: "handoverDate",
        width: 120,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        align: "center"
      },
      {
        label: "色卡要求",
        prop: "colorRequest",
        width: 120,
        type: "select",
        dicData: getDIC("Sal_color_request"),
      },
      {
        label: "是否布办",
        prop: "isCloth",
        width: 100,
        type: 'select',
        dicData: [
          {
            value: true,
            label: '是'
          },
          {
            value: false,
            label: '否'
          }
        ]
      },
    ],
  }

}

export function popupCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 375px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "色办类型",
        prop: "typeNo",
        width: 100,
      },
      {
        label: "交办否",
        prop: "sendFlag",
        width: 100,
        cell: true,
        align: "center",
        type: "switch",
        dicData: [
          {
            value: false,
            label: ""
          },
          {
            value: true,
            label: ""
          }
        ]
      },
      {
        label: "交办日期",
        prop: "sendDate",
        width: 150,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        cell: true
      },
      {
        label: "是否OK",
        prop: "okFlag",
        width: 100,
        cell: true,
        align: "center",
        type: "switch",
        dicData: [
          {
            value: false,
            label: ""
          },
          {
            value: true,
            label: ""
          }
        ]
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        width: 160,
      },
    ],
  }

}

export function dtleCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 416px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'formulaValue',
        type: 'sum'
      },
    ],
    column: [
      {
        label: "行号",
        prop: "lineNo",
        width: 60,
        align: "center",
      },
      {
        label: "原料名称",
        prop: "bcCode",
        width: 180,
        type: "select",
        props: {
          label: "bcMatname",
          value: "bcCode"
        },
        dicData: []
      },
      {
        label: "染化料类型",
        prop: "chemicalClass",
        width: 105,
        type: "select",
        props: {
          label: "codename",
          value: "codeid"
        },
        dicData: [],
      },
      {
        label: "批号",
        prop: "batchNo",
        width: 140,
      },
      {
        label: "产地",
        prop: "prodPlace",
        type: "select",
        dicData: getDIC("Whse_Origin"),
        width: 100,
      },
      {
        label: "计算",
        prop: "calculateClass",
        width: 60,
        type: "select",
        dicData: getDIC("sal_calculate"),
      },
      {
        label: "配方量",
        prop: "formulaValue",
        width: 120,
        align: "right",
        cell: true,
        type: "number"

      },


    ],
  }

}

export function dtlexCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 416px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "序号",
        prop: "index",
        width: 60,
        align: "center",
        placeholder: " "
      },
      {
        label: "机速",
        prop: "speed",
        width: 100,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "温度",
        prop: "temperature",
        width: 80,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "吸水率",
        prop: "waterAbsorption",
        width: 100,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right",
      },
      {
        label: "浴比理论",
        prop: "waterRatio1",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " ",
      },
      {
        label: "浴比实际",
        prop: "waterRatio2",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "加料水量",
        prop: "feedwaterQual",
        width: 120,
        align: "right",
        cell: true,
        type: "number",
        placeholder: " "
      },
      {
        label: "备注",
        prop: "remarks",
        width: 220,
        cell: true,
        placeholder: " "
      },
    ],
  }

}

export function dtlfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 416px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "序号",
        prop: "index",
        width: 60,
        align: "center",
        placeholder: " "
      },
      {
        label: "布封",
        prop: "fabWidth",
        width: 100,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right",
      },
      {
        label: "机速",
        prop: "speed",
        width: 130,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right",
      },
      {
        label: "布封回后边计",
        prop: "fabWidth2",
        width: 130,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right",
      },
      {
        label: "温度",
        prop: "temperature",
        width: 80,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "斜度",
        prop: "inclination",
        width: 80,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "压力",
        prop: "press",
        width: 80,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },


      {
        label: "出机克重",
        prop: "fabricWeight",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " ",
      },
      {
        label: "循环",
        prop: "circulation",
        width: 100,
        cell: true,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "备注",
        prop: "remarks",
        width: 220,
        cell: true,
        placeholder: " "
      },
    ],
  }

}

export function dtlixCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 416px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "序号",
        prop: "index",
        width: 60,
        align: "center",
        placeholder: " "
      },
      {
        label: "机速",
        prop: "speed",
        width: 100,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "温度",
        prop: "temperature",
        width: 80,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "浴比理论",
        prop: "waterRatio1",
        width: 120,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " ",
      },
      {
        label: "备注",
        prop: "remarks",
        width: 220,
        cell: true,
        placeholder: " "
      },
    ],
  }

}