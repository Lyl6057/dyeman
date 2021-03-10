export const reportOp = (_this) => {
  return {
    labelWidth: 130,
    emptyText: _this.$t("energy.qk"),
    submitText: _this.$t("energy.sc"),
    column: [{
        label: "记录名称",
        span: 8,
        prop: "recName",
        rules: [{
          required: true,
          message: '请选择订单号',
          trigger: 'blur'
        }],
        //   display: false
      },
      {
        label: "创建人",
        span: 8,
        prop: "createMan",
        rules: [{
          required: true,
          message: '请选择订单号',
          trigger: 'blur'
        }],
        //   display: false
      },
      {
        label: "编号",
        span: 8,
        prop: "checkCode",
        //   display: false
      },

      {
        label: "所属订单",
        span: 8,
        prop: "salPoNo",
        // type: "select",
        type: 'tree',
        lazy: true,
        typeslot: true,
        dicData: [],
        // rules: [{
        //   required: true,
        //   message: '请选择订单号',
        //   trigger: 'blur'
        // }],
        // value: 0
        //   display: false
      },
      {
        label: "检查报告分类",
        span: 8,
        prop: "checkCate",
        display: false
      },
      {
        label: "创建时间",
        span: 8,
        prop: "createTime",
        display: false
      }
    ]

  }
}
