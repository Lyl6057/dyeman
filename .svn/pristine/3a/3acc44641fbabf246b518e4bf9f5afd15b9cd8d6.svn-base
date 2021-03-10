export const headOp = _this => {
  return {
    emptyBtn: false,
    submitBtn: false,
    labelWidth: 108,
    formHeight: 100,
    column: [{
        label: "客户",
        prop: "custName",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "确认版本",
        prop: "customerConfirmver",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "颜色",
        prop: "colorName",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "色号",
        prop: "dyeColorNo",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "前工艺代码",
        prop: "beforTechcode",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "后工艺代码",
        prop: "afterTechcode",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "潘通色号",
        prop: "pantoneColor",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "电脑色号",
        prop: "rgbColor",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "皂洗工艺代码",
        prop: "soapTechcode",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "其他工艺代码",
        prop: "otherTechcode",
        span: 6,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "纤维比例",
        prop: "fabYcount",
        span: 12,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "布料成分",
        prop: "fabComponents",
        span: 12,
        readonly: true,
        placeholder: "暂无数据"
      },

      {
        label: "对光色源",
        prop: "colorLights",
        span: 12,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "质量标准",
        prop: "recStandard",
        span: 12,
        readonly: true,
        placeholder: "暂无数据"
      },
      {
        label: "测试要求",
        prop: "testRequest",
        span: 12,
        readonly: true,
        placeholder: "暂无数据"
      },
      // {
      //   label: "订单批号",
      //   prop: "ddph",
      //   span: 6,
      //   readonly: true,
      //   placeholder: "暂无数据"
      // },
      // {
      //   label: "纱线批次",
      //   prop: "sxpc",
      //   span: 6,
      //   readonly: true,
      //   placeholder: "暂无数据"
      // },

    ]
  }
}

export const techOption = _this => {
  return {
    emptyBtn: true,
    submitBtn: true,
    labelWidth: 120,
    column: [{
        label: "颜色ID",
        prop: "salColoroid",
        type: "select",
        dicData: [],
        span: 8,
        props: {
          label: "salColorid",
          value: "salColoroid"
        },
        disabled: true,
        display: false
      },
      {
        label: "行号",
        prop: "rowNo",
        span: 8,
        disabled: true
      },
      {
        label: "温度",
        prop: "temperature",
        span: 8
      },
      {
        label: "时间",
        prop: "timeLeng",
        span: 8
      },
      {
        label: "机速",
        prop: "speed",
        span: 8
        // display: false
      },

      {
        label: "浴比",
        prop: "bathRatio",
        span: 8
      },
      {
        label: "布重",
        prop: "clothWeight",
        span: 8
      },

    ]
  }
}

export const colorOp = _this => {
  return {
    emptyBtn: true,
    submitBtn: true,
    labelWidth: 120,
    column: [{
        label: "染化料类型",
        prop: "chemicalClass",
        formslot: true,
        labelslot: true,
        errorslot: true,
        span: 16,
        rules: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }],
      },

      {
        label: "染化料代号",
        prop: "bcCode",
        span: 8,
        maxlength: 5,
        rules: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
      },
      {
        label: "染化料名称",
        prop: "chemicalName",
        span: 8,
        maxlength: 5,
        rules: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
      },
      {
        label: "行号",
        prop: "rowNo",
        span: 8,
        disabled: true
      },
      {
        label: "颜色编码",
        prop: "salColoroid",
        type: "select",
        span: 8,
        props: {
          label: "salColorid",
          value: "salColoroid"
        },
        dicData: [],
        display: false,
        rules: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }],
        disabled: true
        // display: false
      },

      {
        label: "计算分类",
        prop: "calculateClass",
        span: 8
      }
    ]
  }
}

export const formOp = _this => {
  return {
    emptyBtn: true,
    submitBtn: true,
    labelWidth: 110,
    column: [{
        label: "版本号",
        prop: "verNo",
        span: 6,
        type: "select",
        dicData: [],
        rules: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }],
      },
      {
        label: "版本序号",
        prop: "verSn",
        span: 6,
        disabled: true
      },
      {
        label: "版本类型",
        prop: "verType",
        span: 6
      },
      {
        label: "颜色编码",
        prop: "salColoroid",
        type: "select",
        span: 6,
        props: {
          label: "salColorid",
          value: "salColoroid"
        },
        dicData: [],
        display: false,
        rules: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }],
        disabled: true
        // display: false
      },
      {
        label: "锁定",
        prop: "isLock",
        span: 6,
        type: "switch",
        dicData: [{
            value: "false",
            label: ""
          },
          {
            value: "true",
            label: ""
          }
        ]
      }
    ]
  }
}
