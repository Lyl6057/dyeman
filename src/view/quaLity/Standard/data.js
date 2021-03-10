export const level1Op = (_this) => {
  return {
    labelWidth: 130,
    emptyText: _this.$t("energy.qk"),
    submitText: _this.$t("energy.sc"),
    column: [{
        label: "标准Id",
        prop: "standardId",
        span: 8,
        display: false
      },
      // {
      //   label:"标准名称",
      //   prop:"standardName",
      //   span:8
      // }, 
      // {
      //   label:"标准编码",
      //   prop:"standarCode",
      //   span:8,
      //   display:false
      // }, 
      // {
      //   label:"标准类型",
      //   prop:"standardType",
      //   span:8
      // },
      // {
      //   label:"标准说明",
      //   prop:"standarDesc",
      //   span:8
      // },
      {
        label: "序号",
        prop: "sn",
        span: 8,
        display: false,

      },
      {
        label: "標準名称",
        prop: "itemName",
        span: 8,
        rules: [{
          required: true,
          message: "请输入標準名称",
          trigger: "blur"
        }],
      },
      {
        label: "检验方法",
        prop: "examineMethod",
        span: 8,
        rules: [{
          required: true,
          message: "请输入检验方法",
          trigger: "blur"
        }],
      },
      {
        label: "项目编号",
        prop: "itemCode",
        span: 8,
        display: false
      },
      {
        label: "层次",
        prop: "itemLevel",
        span: 8,
        display: false
      },
      {
        label: "适用范围",
        prop: "fitScop",
        span: 8
      },
      {
        label: "合格范围",
        prop: "passRange",
        span: 8
      },
      {
        label: "是否关键项目",
        prop: "isKeyItem",
        span: 8,
        type: "switch",
        dicData: [{
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "检测项目",
        prop: "checkItemCode",
        span: 8,
        type: "select",
        dicData: [],
        props: {
          label: "checkItemName",
          value: "checkItemCode"
        }
      },
    ]
  }
}
