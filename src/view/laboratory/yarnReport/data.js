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
      },
      // {
      //   label: "报告类型",
      //   prop: "yarnType",
      //   span: 6,
      //   placeholder: " "
      // },

      {
        label: "供应商",
        prop: "supplyName",
        span: 6,
        type: "select",
        dicData: getDIC("bas_yarnBrand"),
        filterable: true,
        placeholder: " "
      },
      {
        label: "纱线品名",
        prop: "yarnName",
        width: 120,
        placeholder: " ",
        overHidden: true,
        span: 6
      }
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
      {
        label: "纱线类型",
        prop: "yarnType",
        width: 140,
        overHidden: true,
        type: "select",
        dicData: getDicT("qcCheckCate/default", "cateName", "cateCode"),
        span: 6,
        rules: [
          {
            required: true,
            message: "請选择纱线类型",
            trigger: "blur"
          }
        ]
      },

      {
        label: "来纱日期",
        prop: "yarnDate",
        width: 150,
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
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "纱线品名",
        prop: "yarnName",
        width: 120,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入纱线品名",
            trigger: "blur"
          }
        ]
      },
      {
        label: "供应商",
        prop: "supplyName",
        width: 150,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        dicData: getDIC("bas_yarnBrand"),
        rules: [
          {
            required: true,
            message: "請选择供应商",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.form.yarnBrand = val.value;
        }
      },

      // {
      //   label: "纱牌",
      //   prop: "yarnBrand",
      //   width: 130,
      //   overHidden: true,
      //   span: 6,
      //   type: "select",
      //   dicData: getDIC("bas_yarnBrand")
      // },

      {
        label: "纤维成分",
        prop: "fibreContent",
        width: 250,
        overHidden: true,
        span: 12,
        rules: [
          {
            required: true,
            message: "請输入纤维成分",
            trigger: "blur"
          }
        ]
      },
      {
        label: "客户纱批",
        prop: "supBatch",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "本厂纱批",
        prop: "factBatch",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "来纱等级",
        prop: "yarnLevel",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "纱线用途",
        prop: "yarnPose",
        width: 150,
        overHidden: true,
        span: 6
      },
      {
        label: "来纱数量",
        prop: "yarnQty",
        width: 120,
        overHidden: true,
        type: "number",
        span: 6
      },
      {
        label: "取样标准",
        prop: "takeStand",
        width: 120,
        overHidden: true,
        span: 6
      },
      {
        label: "取样数量",
        prop: "takeSample",
        type: "number",
        width: 120,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入取样数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "取样单位",
        prop: "takeUnit",
        width: 120,
        overHidden: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請输入取样单位",
            trigger: "blur"
          }
        ],
        type: "select",
        dicData: [
          {
            value: "KG",
            label: "公斤"
          },
          {
            value: "LBS",
            label: "磅"
          },
          {
            value: "SQ",
            label: "纱球"
          }
        ]
      },

      {
        label: "化验室结论",
        prop: "labVerdict",
        width: 250,
        type: "textarea",
        overHidden: true,
        span: 12
      },
      {
        label: "公司结论",
        prop: "topVerdict",
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
