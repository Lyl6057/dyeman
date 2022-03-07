import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "报告编号",
        prop: "rptCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "报告标题",
        prop: "rptName",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: "报告类型",
      //   prop: "yarnType",
      //   span: 6,
      //   placeholder: " "
      // },

      // {
      //   label: "供应商",
      //   prop: "supplyName",
      //   span: 6,
      //   type: "select",
      //   dicData: getDIC("bas_yarnBrand"),
      //   filterable: true,
      //   placeholder: " "
      // },
      // {
      //   label: "纱线品名",
      //   prop: "yarnName",
      //   width: 120,
      //   placeholder: " ",
      //   overHidden: true,
      //   span: 6
      // }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "报告编号",
        prop: "rptCode",
        width: 130,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入报告编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "报告标题",
        prop: "rptName",
        width: 220,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入报告标题",
            trigger: "blur"
          }
        ]
      },
      // {
      //   label: "纱线类型",
      //   prop: "yarnType",
      //   width: 140,
      //   overHidden: true,
      //   type: "select",
      //   dicData: getDicT("qcCheckCate/default", "cateName", "cateCode"),
      //   span: 6,
      //   rules: [
      //     {
      //       required: true,
      //       message: "請选择纱线类型",
      //       trigger: "blur"
      //     }
      //   ]
      // },

      {
        label: "报告日期",
        prop: "rptDate",
        width: 160,
        span: 6,
        type: "datetime",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "請輸入报告日期",
            trigger: "blur"
          }
        ]
      },

      {
        label: "来纱等级",
        prop: "yarnLevel",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "验布数量",
        prop: "testQty",
        type: "number",
        width: 120,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入验布数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "码长",
        prop: "testYds",
        type: "number",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "制表人",
        prop: "listMan",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "QC结论",
        prop: "qcVerdict",
        width: 250,
        type: "textarea",
        overHidden: true,
        span: 12
      }
      // {
      //   label: "附件地址",
      //   prop: "rptContent",
      //   width: 250,
      //   overHidden: true,
      //   span: 6
      // }
    ]
  };
}
