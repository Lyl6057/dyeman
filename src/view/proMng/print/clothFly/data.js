/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-19 15:47:48
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
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
        label: "生產單號",
        prop: "weaveJobCode",
        width: 180,
        span: 6,
        disabled: true,
        sortable: true,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        disabled: true,
        overHidden: true,
        width: 180,
        span: 6,
        placeholder: "请選擇訂單編號",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇訂單編號",
            trigger: "blur"
          }
        ]
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label: "客戶編號",
        prop: "custCode",
        overHidden: true,
        disabled: true,
        width: 150,
        overHidden: true,
        span: 6,
        placeholder: "请選擇客戶編號"
        // type: "select",
        // dicData: cust,
      },
      {
        label: "織單數量",
        prop: "amount",
        disabled: true,
        width: 100,
        placeholder: "请输入織單數量",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入織單數量",
            trigger: "blur"
          }
        ],
        align: "right"
      },
      {
        label: "開機日期",
        prop: "startDate",
        disabled: true,
        width: 120,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请選擇開機日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "機號",
        prop: "mathineCode",
        disabled: false,
        span: 6,
        width: 120,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请輸入機號",
            trigger: "blur"
          }
        ],
        change: () => {
          let data = _this.yarnList
            .filter(item => {
              return item.groupId == _this.form.proWeaveJobGroupFk;
            })
            .map(item => {
              return item;
            });
          if (data.length == 0) {
            return;
          }
          _this.$nextTick(() => {
            if (Number(data[0].sn) === 1) {
              _this.form.bph = _this.form.mathineCode;
            } else {
              _this.form.bph =
                "-" +
                _this.$preFixInt(Number(data[0].sn), 2) +
                _this.form.mathineCode;
            }
          });
        }
      },
      {
        label: "布類描述",
        prop: "fabricDesc",
        placeholder: " ",
        overHidden: true,
        disabled: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ]
      },
      {
        label: "顏色名稱",
        prop: "colorName",
        placeholder: " ",
        disabled: true,
        width: 180,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [
          {
            required: true,
            message: "请選擇顏色名稱",
            trigger: "blur"
          }
        ],
        overHidden: true
      },
      {
        label: "色號",
        disabled: true,
        prop: "colorCode",
        width: 150,
        span: 6
      },
      {
        label: "幅宽",
        prop: "breadth",
        width: 90,
        disabled: true,
        align: "right",
        span: 6,
        hide: true,
        rules: [
          {
            required: true,
            message: "请输入幅宽",
            trigger: "blur"
          }
        ]
      },
      {
        label: "克重",
        prop: "gramWeight",
        width: 90,
        align: "right",
        disabled: true,
        hide: true,
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
        label: "纱批",
        prop: "yarnBatch",
        width: 90,
        hide: true,
        align: "right",
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入纱批",
        //   trigger: "blur"
        // }],
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
        span: 6,
        hide: true,
        change: val => {
          _this.getYarn(val.value);
        }
      },
      {
        label: "紗支",
        prop: "yarnThickness",
        disabled: true,
        width: 90,
        hide: true,
        span: 12,
        overHidden: true
        // type: "textarea",
        // props: {
        //   value: "yarnName",
        //   label: "yarnName"
        // },
        // multiple: true,
        // dicData: [],
        // rules: [{
        //   required: true,
        //   message: "请選擇紗支",
        //   trigger: "blur"
        // }],
      },

      {
        label: "纱牌",
        prop: "yarnBrand",
        width: 90,
        hide: true,
        align: "right",
        span: 6
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
        label: "值机工号",
        prop: "zjgh",
        width: 90,
        hide: true,
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入值机工号",
        //   trigger: "blur"
        // }],
      },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: false,
      //   rules: [{
      //     required: true,
      //     message: "请输入机台編號",
      //     trigger: "blur"
      //   }],
      // },
      {
        label: "平均匹重",
        prop: "pz",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入平均匹重",
            trigger: "blur"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.form.ps = Math.ceil(_this.form.amount / _this.form.pz);
          });
        }
      },
      // {
      //   label: _this.$t('whseField.dw'),
      //   prop: "workUnit",
      //   width: 90,
      //   span: 6,
      //   disabled: true
      // },
      {
        label: "布票號",
        prop: "bph",
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: false
      },
      {
        label: "匹数",
        prop: "ps",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入匹数",
            trigger: "blur"
          }
        ]
      },
      {
        label: "起始疋号",
        prop: "qsph",
        width: 90,
        align: "right",
        // type: "number",
        hide: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入起始疋号",
            trigger: "blur"
          }
        ]
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
      },
      {
        label: "验布员",
        prop: "clothChecker",
        span: 6,
        hide: true
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
    height: "calc(100vh - 493px)",
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
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true,
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
        width: 150,
        overHidden: true
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
        width: 120,
        hide: false,
        span: 6,
        cell: true,
        disabled: false,
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
        ],
        type: "number"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 80,
        align: "center",
        span: 6,
        type: "number"
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
        format: "yyyy-MM-dd hh:MM:ss",
        valueFormat: "yyyy-MM-dd hh:MM:ss",
        span: 6,
        align: "center",
        width: 180
      }
    ]
  };
}
