/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-02-04 08:22:53
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

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
      //   label: "客户",
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
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
        label: "客户",
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
          _this.choiceTle = '选择色号信息';
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
        label: "备注",
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
    height: "calc(100vh - 152px)",
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
        label: "工序名称",
        prop: "workName",
        width: 110,
        disabled: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "订单号",
        prop: "poNo",
        width: 160,
        disabled: true, placeholder: " ",
        span: 6,
        sortable: true,
      },
      {
        label: "排单号",
        prop: "stepCode",
        width: 120,
        disabled: true, placeholder: " ",
        span: 6,
        sortable: true,
      },
      {
        label: "颜色",
        prop: "colorName",
        width: 90,
        disabled: true, placeholder: " ",
        span: 6
      },
      // {
      //   label: "计划开始",
      //   prop: "planStart",
      //   width: 160,
      // },
      // {
      //   label: "实际开始",
      //   prop: "realStart",
      //   width: 160,
      //   disabled: true, placeholder: " ",
      //   span: 6
      // },
      {
        label: "计划完成",
        prop: "planEnd",
        width: 160,
        display: false
      },

      {
        label: "实际完成",
        prop: "realEnd",
        width: 160,
        display: false,
        placeholder: " ",
        span: 6
      },
      // {
      //   label: "完成比例",
      //   prop: "finishProportion",
      //   width: 90,
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   display: false
      // },
      // {
      //   label: "完成状态",
      //   prop: "finishState",
      //   width: 90,
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "已完成"
      //     },
      //     {
      //       value: 0,
      //       label: "未完成"
      //     }
      //   ]
      // },
      // {
      //   label: "估算耗时",
      //   prop: "exampleUseTime",
      //   width: 90,
      //   align: "right"
      // },
      // {
      //   label: "实际耗时",
      //   prop: "realUseTime",
      //   width: 90,
      //   align: "right",
      //   disabled: true, placeholder: " ",
      //   span: 6
      // },
      // {
      //   label: "宽放时间",
      //   prop: "realBroad",
      //   width: 90,
      //   align: "right",
      //   disabled: true, placeholder: " ",
      //   span: 6
      // },
      // {
      //   label: "转场时间",
      //   prop: "transferTime",
      //   width: 90,
      //   align: "right",
      //   disabled: true, placeholder: " ",
      //   span: 6
      // },
      {
        label: "机号",
        prop: "equipmentCode",
        width: 150,
        hide: false,
        span: 6,
        rules: [{
          required: true,
          message: "请输入机号",
          trigger: "blur"
        }],
        sortable: true,
        disabled: true
      },
      {
        label: "布类",
        prop: "calicoType",
        width: 100,
        span: 6,
        type: "select",
        disabled: true,
        dicData: getDIC("bas_colorclType")
      },


      {
        label: "纱支",
        prop: "ycountDesc",
        width: 310,
        disabled: true, placeholder: " ",
        span: 12
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
        prop: "spi",
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
        prop: "sp",
        width: 90,
        hide: true,
        align: "right",
        span: 6,
        rules: [{
          required: true,
          message: "请输入纱牌",
          trigger: "blur"
        }],
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
        prop: "actualWidth",
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
        prop: "weight",
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
        label: "重量",
        prop: "workAmount",
        width: 90,
        span: 6,
        disabled: true,
        align: "right",
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
            _this.form.ps = Math.ceil(_this.form.workAmount / _this.form.pz)
          })

        }
      },
      {
        label: "单位",
        prop: "workUnit",
        width: 90,
        span: 6,
        disabled: true
      },
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