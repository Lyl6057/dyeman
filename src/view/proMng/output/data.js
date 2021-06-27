/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:03:31
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-27 15:40:50
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
let matUnit = getDIC("bas_matUnit");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    column: [
      {
        labelWidth: 120,
        label: "织造生产单号",
        prop: "weaveJobCode",
        span: 8,
        placeholder: " "
      },
      // {
      //   label: "客人",
      //   prop: "custId",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDicT("basCustomer", "custName", "custCode")
      // },
      {
        label: "起始日期",
        prop: "date",
        span: 16,
        type: "daterange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      }
      // {
      //   label: "日期起",
      //   prop: "start",
      //   span: 8,
      //   placeholder: " ",
      //   labelWidth: 90,
      //   type: "date",
      //   align: "center",

      //   change: () => {
      //     // _this.$nextTick(() => {
      //     //   _this.query();
      //     // });
      //   }
      // },
      // {
      //   label: "日期至",
      //   prop: "end",
      //   span: 8,
      //   labelWidth: 90,
      //   placeholder: " ",
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   change: () => {
      //     // _this.$nextTick(() => {
      //     //   _this.query();
      //     // });
      //   }
      // }
    ]
  };
}
let poData = getXDicT("salPo/list");
let poColor = getXDicT("salPoColor");
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 525px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    showSummary: true,
    sumColumnList: [
      {
        name: "sum",
        type: "sum",
        label: " "
      },
      {
        name: "weaveJobCode",
        type: "count",
        label: " "
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },
      {
        label: "织造生产单号",
        prop: "weaveJobCode",
        width: 150,
        overHidden: true,
        sortable: true,
        fixed: true
      }
      // {
      //   label: _this.$t("whseField.khbh"),
      //   prop: "custId",
      //   type: "select",
      //   dicData: poData,
      //   props: {
      //     label: "custId",
      //     value: "salPooid"
      //   },
      //   overHidden: true,
      //   width: 100,
      //   // sortable: true,
      //   fixed: false
      // },
      // {
      //   label: "合同编号",
      //   prop: "custContNo",
      //   width: 140,
      //   overHidden: true,
      //   type: "select",
      //   dicData: poData,
      //   props: {
      //     label: "custContNo",
      //     value: "salPooid"
      //   },
      //   fixed: true
      // },
      // {
      //   label: "订单号",
      //   prop: "poNo",
      //   width: 160,
      //   overHidden: true,
      //   span: 6,
      //   disabled: false,
      //   sortable: true,
      //   placeholder: " ",
      //   overHidden: true,
      //   fixed: false
      //   // cell: false,
      //   // type: "select",
      //   // dicData: poData,
      //   // props: {
      //   //   label: "custName",
      //   //   value: "salPooid"
      //   // },
      // },
      // {
      //   label: "类型",
      //   prop: "poType",
      //   width: 100,
      //   span: 6,
      //   disabled: false,
      //   type: "select",
      //   hide: false,
      //   dicData: poData,
      //   fixed: false,
      //   props: {
      //     label: "poType",
      //     value: "salPooid"
      //   },
      //   placeholder: " ",
      //   overHidden: true,
      //   cell: false
      // },
      // {
      //   label: "类型",
      //   prop: "poType1",
      //   width: 100,
      //   span: 6,
      //   disabled: false,
      //   type: "select",
      //   dicData: getDIC("sal_poType"),
      //   placeholder: " ",
      //   overHidden: true,
      //   cell: false,
      //   fixed: false
      // },
      // {
      //   label: "布料编号",
      //   prop: "fabId",
      //   width: 100,
      //   overHidden: true,
      //   type: "select",
      //   dicData: postDicT("salPoDtlaList", "fabId", "salPoDtlaoid"),
      //   cell: false,
      //   // sortable: true,
      //   fixed: false
      // },
      // {
      //   label: _this.$t("whseField.blmc"),
      //   prop: "fabName",
      //   width: 200,
      //   overHidden: true,
      //   type: "select",
      //   dicData: postDicT("salPoDtlaList", "fabName", "salPoDtlaoid"),
      //   fixed: false
      // },
      // {
      //   label: "颜色",
      //   prop: "colorName",
      //   width: 100,
      //   overHidden: true,
      //   type: "select",
      //   props: {
      //     label: "colorName",
      //     value: "salPoColoroid"
      //   },
      //   dicData: poColor
      //   // fixed: true
      // },
      // {
      //   label: "日期",
      //   prop: "date",
      //   disabled: false,
      //   overHidden: true,
      //   width: 120,
      //   overHidden: true,
      //   span: 6,
      //   placeholder: "请選擇日期",
      //   sortable: true,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   cell: true
      // },
      // {
      //   label: "客戶編號",
      //   prop: "custCode",
      //   overHidden: true,
      //   disabled: true,
      //   width: 200,
      //   span: 6,
      //   placeholder: "请選擇客戶編號",
      //   // type: "select",
      //   // dicData: cust,
      // },
      // {
      //   label: "产量",
      //   prop: "realWeight",
      //   disabled: false,
      //   width: 100,
      //   overHidden: true,
      //   placeholder: " ",
      //   span: 6,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入产量",
      //       trigger: "blur"
      //     }
      //   ],
      //   align: "right",
      //   cell: true
      // }
      // {
      //   label: "QC扣减数量",
      //   prop: "qcTakeOut",
      //   disabled: false,
      //   overHidden: true,
      //   width: 120,
      //   placeholder: " ",
      //   span: 6,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入QC扣减数量",
      //       trigger: "blur"
      //     }
      //   ],
      //   align: "right",
      //   cell: true
      // },
      // {
      //   label: "实际产出量",
      //   prop: "realOutPut",
      //   disabled: false,
      //   overHidden: true,
      //   width: 120,
      //   placeholder: " ",
      //   span: 6,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入实际产出量",
      //       trigger: "blur"
      //     }
      //   ],
      //   align: "right",
      //   cell: true
      // }
    ]
  };
}
export function mainCrud1(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: false,
    height: "calc(100vh - 550px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      // {
      //   label: _this.$t("whseField.khmc"),
      //   prop: "custName",
      //   type: "select",
      //   dicData: cust,
      //   // props: {
      //   //   label: "custName",
      //   //   value: "salPooid"
      //   // },
      //   width: 180,
      //   overHidden: true,
      //   sortable: true,
      // },
      // {
      //   label: _this.$t("whseField.khbh"),
      //   prop: "custId",
      //   type: "select",
      //   dicData: poData,
      //   props: {
      //     label: "custId",
      //     value: "salPooid"
      //   },
      //   overHidden: true,
      //   width: 120,
      //   sortable: true,
      // },
      // {
      //   label: "合同编号",
      //   prop: "custContNo",
      //   width: 140,
      //   overHidden: true,
      //   type: "select",
      //   dicData: poData,
      //   props: {
      //     label: "custContNo",
      //     value: "salPooid"
      //   },
      // },
      // {
      //   label: "订单号",
      //   prop: "poNo",
      //   width: 160,
      //   overHidden: true,
      //   span: 6,
      //   disabled: false,
      //   sortable: true,
      //   placeholder: " ",
      //   overHidden: true,
      //   // cell: false,
      //   // type: "select",
      //   // dicData: poData,
      //   // props: {
      //   //   label: "custName",
      //   //   value: "salPooid"
      //   // },
      // },
      // {
      //   label: "类型",
      //   prop: "poType",
      //   width: 100,
      //   span: 6,
      //   disabled: false,
      //   type: "select",
      //   hide: false,
      //   dicData: poData,
      //   props: {
      //     label: "poType",
      //     value: "salPooid"
      //   },
      //   placeholder: " ",
      //   overHidden: true,
      //   cell: false,
      // },
      // {
      //   label: "类型",
      //   prop: "poType1",
      //   width: 100,
      //   span: 6,
      //   disabled: false,
      //   type: "select",
      //   dicData: getDIC("sal_poType"),
      //   placeholder: " ",
      //   overHidden: true,
      //   cell: false,
      // },
      // {
      //   label: "布料编号",
      //   prop: "fabId",
      //   width: 120,
      //   overHidden: true,
      //   overHidden: true,
      //   type: "select",
      //   dicData: postDicT("salPoDtlaList", "fabId", "salPoDtlaoid"),
      //   cell: false,
      //   sortable: true,
      // },
      // {
      //   label: _this.$t("whseField.blmc"),
      //   prop: "fabName",
      //   width: 500,
      //   overHidden: true,
      //   type: "select",
      //   dicData: postDicT("salPoDtlaList", "fabName", "salPoDtlaoid"),
      // },
      {
        label: "颜色",
        prop: "colorName",
        width: 150,
        overHidden: true,
        type: "select",
        props: {
          label: "colorName",
          value: "salPoColoroid"
        },
        dicData: poColor
      },
      {
        label: "日期",
        prop: "gatherDate",
        disabled: false,
        overHidden: true,
        width: 120,
        overHidden: true,
        span: 6,
        placeholder: "请選擇日期",
        sortable: true,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        cell: true
      },
      // {
      //   label: "客戶編號",
      //   prop: "custCode",
      //   overHidden: true,
      //   disabled: true,
      //   width: 200,
      //   span: 6,
      //   placeholder: "请選擇客戶編號",
      //   // type: "select",
      //   // dicData: cust,
      // },
      {
        label: "产量",
        prop: "output",
        disabled: false,
        width: 120,
        overHidden: true,
        placeholder: " ",
        span: 6,
        type: "number",
        rules: [
          {
            required: true,
            message: "请输入产量",
            trigger: "blur"
          }
        ],
        align: "right",
        cell: true
      },
      {
        label: "QC扣减数量",
        prop: "qcTakeOut",
        disabled: false,
        overHidden: true,
        width: 140,
        type: "number",
        placeholder: " ",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入QC扣减数量",
            trigger: "blur"
          }
        ],
        align: "right",
        cell: true
      },
      {
        label: "实际产出量",
        prop: "realOutPut",
        disabled: false,
        overHidden: true,
        width: 140,
        type: "number",
        placeholder: " ",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入实际产出量",
            trigger: "blur"
          }
        ],
        align: "right",
        cell: true
      }
    ]
  };
}
// let data = getDicT("proWeaveJobGroup", "groupName", "groupId")
// console.log(data);

export function bfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 460px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: true,
    column: [
      {
        label: "匹號",
        prop: "eachNumber",
        width: 60,
        align: "right",
        span: 6
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
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true
      },
      {
        label: "用紗分組",
        disabled: false,
        prop: "proWeaveJobGroupFk",
        width: 120,
        type: "select",
        dicData: [],
        props: {
          value: "groupId",
          label: "groupName"
        },
        span: 6
      },
      {
        label: "客戶編號",
        prop: "customerName",
        width: 180,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false
      },
      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        width: 300,
        overHidden: true
      },
      {
        label: "顏色",
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100
      },

      {
        label: "纱批",
        prop: "spi",
        width: 90,
        hide: true,
        span: 6
      },

      {
        label: "纱牌",
        prop: "sp",
        width: 90,
        hide: true,
        span: 6
      },
      {
        label: "机号",
        prop: "loomNo",
        width: 100,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true
      },
      {
        label: "值机工号",
        prop: "workNo",
        width: 90,
        hide: false,
        span: 6,
        disabled: true,
        rules: [
          {
            required: true,
            message: "请输入值机工号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "验布员",
        prop: "clothChecker",
        width: 120,
        hide: false,
        cell: true
      },
      {
        label: "幅宽",
        prop: "breadth",
        width: 80,
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入幅宽",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 80,
        align: "center",
        span: 6
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
        rules: [
          {
            required: true,
            message: "请输入克重",
            trigger: "blur"
          }
        ]
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
        span: 6
      },
      {
        label: "打印时间",
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        width: 180
      }
    ]
  };
}

export function poForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: _this.$t("energy.ddh"),
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData: getDicT("basCustomer", "custName", "custCode")
      }
    ]
  };
}

export function poCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    selection: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("energy.ddh"),
        prop: "poNo",
        // type: "select",
        // dicData: postDicT("salPoList", "poNo", "salPooid"),
        width: 160
      },
      {
        label: _this.$t("whseField.khbh"),
        prop: "custId",
        // type: "select",
        // dicData: postDicT("salPoList", "poNo", "salPooid"),
        width: 160
      },
      {
        label: "合同编号",
        prop: "custContNo",
        width: 160
      },
      {
        label: "布料编号",
        prop: "fabId",
        width: 160,
        overHidden: true,
        type: "select",
        dicData: postDicT("salPoDtlaList", "fabId", "salPoFk")
      },
      {
        label: _this.$t("whseField.blmc"),
        prop: "fabName",
        width: 500,
        overHidden: true,
        type: "select",
        dicData: postDicT("salPoDtlaList", "fabName", "salPoFk")
      },
      {
        label: _this.$t("Shipping.ys"),
        prop: "colorName",
        width: 120,
        type: "select",
        dicData: postDicT("salPoDtlaList", "colorName", "salPoFk")
      }
      // {
      //   label: _this.$t("Shipping.sl"),
      //   prop: "fabQty",
      //   width: 120,
      //   align: "right"
      // },
      // {
      //   label: _this.$t("whseField.dw"),
      //   prop: "qtyUnit",
      //   type: "select",
      //   width: 120,
      //   dicData: matUnit
      // },
      // {
      //   label: "单价",
      //   prop: "unitPrice",
      //   width: 120,
      //   align: "right"
      // },
      // {
      //   label: "单价单位",
      //   prop: "priceUnit",
      //   type: "select",
      //   width: 120,
      //   dicData: matUnit
      // },
    ]
  };
}
