import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export const reportOp = _this => {
  return {
    labelWidth: 120,
    submitBtn: false,
    emptyBtn: false,
    column: [
      {
        label: _this.$t("proReport.jlmc"),
        span: 6,
        prop: "recName"
        // rules: [{
        //   required: true,
        //   message: _this.$t("proReport.qsrmc"),
        //   trigger: 'blur'
        // }],
        //   display: false
      },

      {
        label: _this.$t("proReport.bh"),
        span: 6,
        prop: "checkCode"
        //   display: false
      },

      {
        label: _this.$t("proReport.ssdd"),
        span: 6,
        prop: "salPoNo",
        // type: "select",
        type: "tree",
        // lazy: true,
        // typeslot: true,
        dicData: []
      },
      {
        label: _this.$t("proReport.cjr"),
        span: 6,
        prop: "createMan",
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid"),
        // rules: [{
        //   required: true,
        //   message: _this.$t("proReport.qsrcjr"),
        //   trigger: 'blur'
        // }],
        disabled: true
      },
      {
        label: "检查报告分类",
        span: 8,
        prop: "checkCate",
        display: false
      },
      {
        label: _this.$t("proReport.cjsj"),
        span: 8,
        prop: "createTime",
        display: false
      }
    ]
  };
};
