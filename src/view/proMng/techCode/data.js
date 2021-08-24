/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-24 10:43:42
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

const unit = getDIC("sal_breadthUnit");
let matUnit = getDIC("bas_matUnit");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "工艺编号",
        prop: "bleadyeCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "工艺名称",
        prop: "bleadyeName",
        span: 6,
        placeholder: " "
      },
      {
        label: "工艺分类",
        prop: "techPart",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: getDIC("pro_techCode"),
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      }
    ]
  };
}

export function dlgForm(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "工艺类型",
        prop: "bleadyeType",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: [
          {
            label: "增加助剂",
            value: "add_chemicalmat"
          },
          {
            label: "增加颜料",
            value: "add_pigment"
          },
          {
            label: "运行",
            value: "run"
          }
        ]
      },
      {
        label: "物料代碼",
        prop: "basMateId",
        overHidden: true,
        width: 120,
        span: 6
      },
      {
        label: "物料名称",
        prop: "mateName",
        width: 300,
        span: 6,
        overHidden: true
      },
      {
        label: "用量",
        prop: "useAmount",
        width: 140,
        span: 6
      },
      {
        label: "度量單位",
        prop: "measureType",
        width: 120,
        span: 6
      },
      {
        label: "运行温度",
        prop: "runTemp",
        span: 6,
        width: 120
      },
      {
        label: "运行时间(分钟)",
        prop: "runTime",
        span: 6,
        width: 140
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 236px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "工艺编号",
        prop: "bleadyeCode",
        overHidden: true,
        width: 130,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入工艺编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "工艺名称",
        prop: "bleadyeName",
        overHidden: true,
        width: 350,
        span: 12,
        disabled: false,
        rules: [
          {
            required: true,
            message: "請輸入工艺名称",
            trigger: "blur"
          }
        ]
      },
      {
        label: "建议水比",
        prop: "liquorRatio",
        overHidden: true,
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "工艺分类",
        prop: "techPart",
        overHidden: true,
        width: 120,
        span: 6,
        type: "select",
        dicData: getDIC("pro_techCode")
      },
      {
        label: "工艺图片",
        prop: "bleadyeImageId",
        width: 100,
        span: 6,
        placeholder: " ",
        hide: false,
        display: false,
        align: "center",
        // slot: true,
        overHidden: true
      },
      {
        label: "工艺备注",
        prop: "remark",
        overHidden: true,
        // width: 250,
        span: 12
      },

      {
        label: "选择工艺图片",
        prop: "btn",
        width: 180,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: true,
        click: () => {
          _this.$refs.input.click();
        }
      }
    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 455px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "工艺类型",
        prop: "bleadyeType",
        // overHidden: true,
        width: 120,
        span: 6,
        cell: true,
        type: "select",
        dicData: [
          {
            label: "增加助剂",
            value: "add_chemicalmat"
          },
          {
            label: "增加颜料",
            value: "add_pigment"
          },
          {
            label: "运行",
            value: "run"
          }
        ]
      },
      {
        label: "材料代碼",
        prop: "basMateId",
        // overHidden: true,
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "材料名称",
        prop: "mateName",
        width: 300,
        span: 6,
        // overHidden: true,
        cell: true
      },
      {
        label: "配方用量",
        prop: "formulaAmount",
        width: 120,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        align: "right"
      },

      {
        label: "材料度量",
        prop: "measureType",
        width: 120,
        span: 6,
        // overHidden: true,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "%",
            value: "%"
          },
          {
            label: "X%",
            value: "X%"
          },
          {
            label: "g/L",
            value: "g/L"
          }
        ]
      },
      {
        label: "單位",
        prop: "formulaUnit",
        width: 100,
        span: 6,
        cell: true,
        type: "select",
        dicData: [
          {
            value: "KG",
            label: "KG"
          },
          {
            value: "g",
            label: "g"
          },
          {
            value: "L",
            label: "L"
          }
        ],
        placeholder: " "
      },
      {
        label: "运行温度(℃)",
        prop: "runTemp",
        span: 6,
        width: 120,
        cell: true,
        placeholder: " ",
        type: "number"
      },

      {
        label: "运行时间(分钟)",
        prop: "runTime",
        span: 6,
        width: 140,
        cell: true,
        placeholder: " ",
        type: "number"
      }
    ]
  };
}
