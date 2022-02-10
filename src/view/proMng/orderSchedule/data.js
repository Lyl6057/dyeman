/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-09 11:03:57
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

const cust = getDicT("basCustomer", "custName", "custCode");
import i18n from "@/lang/index";
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "排期名称",
        prop: "schName",
        span: 6,
        placeholder: " "
      },
      {
        label: "排期编号",
        prop: "schCode",
        span: 6,
        placeholder: " "
      },

      {
        label: "色号",
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "颜色名称",
        prop: "colorName",
        span: 6,
        placeholder: " "
      },
      {
        label: "开始日期",
        // tip: "Ngày bắt đầu nhận đơn",
        prop: "schStart",
        span: 6,
        placeholder: " ",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "完成时间",
        // tip: "Ngày bắt đầu nhận đơn",
        prop: "schEnd",
        span: 6,
        placeholder: " ",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
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
    height: "calc(100vh - 286px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // labelPosition: "top",
    labelWidth: 100,
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
        label: "排期名称",
        // tip: "客户名称(Khách hàng)",
        prop: "schName",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入排期名称",
            trigger: "blur"
          }
        ],
        fixed: true
      },
      {
        label: "排期编号",
        prop: "schCode",
        overHidden: true,
        width: 160,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入排期编号",
            trigger: "blur"
          }
        ],
        fixed: true
      },
      {
        label: "排期类型",
        prop: "salSchType",
        overHidden: true,
        width: 120,
        disabled: !_this.isAdd,
        clearable: false,
        span: 6,
        sortable: true,
        type: "select", //98:织造排期 99：染单排期 100：印花排期
        dicData: [
          {
            value: 98,
            label: "织造排期"
          },
          {
            value: 99,
            label: "染单排期"
          },
          {
            value: 100,
            label: "印花排期"
          }
        ],
        rules: [
          {
            required: true,
            message: "请选择排期类型",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.$nextTick(() => {
            _this.typeChange(val.value);
          });
        }
      },
      {
        label: "生产单号",
        prop: "noticeId",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        disabled: false,
        formslot: true,
        sortable: true,
        type: "select", //98:织造排期 99：染单排期 100：印花排期
        dicData: [],
        rules: [
          {
            required: true,
            message: "请选择生产单号",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.$nextTick(() => {
            _this.getNoteiceData(val.value);
          });
        }
      },
      {
        label: "生产单号",
        prop: "noticeType",
        overHidden: true,
        width: 140,
        span: 6,
        hide: false,
        disabled: false,
        display: false,
        sortable: true
      },
      {
        label: "开始日期",
        prop: "schStart",
        width: 155,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇开始日期",
            trigger: "blur"
          }
        ]
      },

      {
        label: "结束日期",
        prop: "schEnd",
        width: 155,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇结束日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "数量",
        prop: "proAmount",
        width: 100,
        sortable: true,
        placeholder: " ",
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "单位",
        prop: "proUnit",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("Sal_weightUnit")
      },
      {
        label: "色号",
        prop: "colorCode",
        overHidden: true,
        sortable: true,
        width: 120,
        placeholder: " ",
        span: 6
      },
      {
        label: "颜色名称",
        prop: "colorName",
        overHidden: true,
        sortable: true,
        width: 160,
        placeholder: " ",
        span: 6
      },
      {
        label: "排期状态",
        prop: "schState",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        sortable: true,
        type: "select", //1:开始执行 2：执行中 3：暂停 4：取消 99：完成
        dicData: [
          {
            value: 1,
            label: "开始执行"
          },
          {
            value: 2,
            label: "执行中"
          },
          {
            value: 3,
            label: "暂停"
          },
          {
            value: 4,
            label: "取消"
          },
          {
            value: 99,
            label: "完成"
          }
        ],
        rules: [
          {
            required: true,
            message: "请选择排期状态",
            trigger: "blur"
          }
        ]
      },
      {
        label: "工作包",
        prop: "workPackageId",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: !_this.isAdd,
        sortable: true,
        props: {
          label: "packageName",
          value: "packageId"
        },
        type: "select", //1:开始执行 2：执行中 3：暂停 4：取消 99：完成
        dicData: []
      },
      {
        label: "创建人",
        prop: "creator",
        width: 100,
        span: 6,
        placeholder: " ",
        display: false,
        disabled: true
      },

      {
        label: "創建日期",
        prop: "createTime",
        placeholder: " ",
        width: 160,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      }

      // {
      //   label: "修改日期",
      //   prop: "upateTime",
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   placeholder: " ",
      //   hide: true,
      //   display: false
      // }
    ]
  };
}

export function detailCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 376px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    // labelPosition: "top",
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "schSn",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },

      {
        label: "工序名称",
        prop: "workName",
        overHidden: true,
        cell: true,
        width: 120,
        span: 6,
        disabled: false,
        sortable: true,
        fixed: true,
        rules: [
          {
            required: true,
            message: "请输入工序名称",
            trigger: "blur"
          }
        ]
      },
      {
        label: "工序编号",
        prop: "stepCode",
        cell: true,
        fixed: true,
        // overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入工序编号",
            trigger: "blur"
          }
        ]
      },
      // {
      //   label: "颜色名称",
      //   prop: "colorName",
      //   overHidden: true,
      //   cell: true,
      //   sortable: true,
      //   width: 160,
      //   placeholder: " ",
      //   span: 6
      // },
      {
        label: "计划开始",
        prop: "planStart",
        cell: true,
        width: 155,
        span: 6,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        overHidden: true,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇计划开始日期",
            trigger: "blur"
          }
        ]
      },

      {
        label: "计划完成",
        prop: "planEnd",
        cell: true,
        width: 155,
        span: 6,
        type: "datetime",
        align: "center",
        overHidden: true,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇计划完成日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "实际开始",
        prop: "realStart",
        cell: true,
        overHidden: true,
        width: 155,
        span: 6,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇实际开始日期",
            trigger: "blur"
          }
        ]
      },

      {
        label: "实际完成",
        prop: "realEnd",
        cell: true,
        width: 155,
        span: 6,
        overHidden: true,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇实际完成日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "数量",
        prop: "workAmount",
        width: 100,
        overHidden: true,
        sortable: true,
        placeholder: " ",
        cell: true,
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "单位",
        prop: "workUnit",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " ",
        cell: true,
        type: "select",
        dicData: getDIC("Sal_weightUnit")
      },
      {
        label: "完成比例",
        prop: "finishProportion",
        overHidden: true,
        sortable: true,
        width: 120,
        type: "number",
        cell: true,
        align: "right",
        placeholder: " ",
        span: 6
      },
      {
        label: "完成状态",
        prop: "finishState",
        overHidden: true,
        sortable: true,
        width: 120,
        cell: true,
        type: "select",
        dicData: [],
        placeholder: " ",
        span: 6
      },
      {
        label: "前置工序",
        prop: "frontWork",
        overHidden: true,
        sortable: true,
        cell: true,
        width: 120,
        type: "select",
        dicData: [],
        placeholder: " ",
        span: 6
      },
      {
        label: "估算耗时",
        prop: "exampleUseTime",
        overHidden: true,
        sortable: true,
        cell: true,
        width: 160,
        type: "number",
        align: "right",
        placeholder: " ",
        span: 6
      },
      {
        label: "实际耗时",
        prop: "realUseTime",
        overHidden: true,
        sortable: true,
        width: 160,
        type: "number",
        align: "right",
        cell: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "宽放时间",
        prop: "broadTime",
        overHidden: true,
        sortable: true,
        width: 160,
        type: "number",
        align: "right",
        placeholder: " ",
        cell: true,
        span: 6
      },
      {
        label: "实际宽放时间",
        prop: "realBroad",
        overHidden: true,
        sortable: true,
        width: 160,
        type: "number",
        align: "right",
        cell: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "转场时间",
        prop: "transferTime",
        overHidden: true,
        sortable: true,
        width: 160,
        cell: true,
        type: "number",
        align: "right",
        placeholder: " ",
        span: 6
      },
      {
        label: "实际转场时间",
        prop: "realTransfer",
        overHidden: true,
        sortable: true,
        width: 160,
        type: "number",
        align: "right",
        placeholder: " ",
        cell: true,
        span: 6
      },

      {
        label: "是否里程碑",
        prop: "isMilestone",
        width: 120,
        span: 6,
        placeholder: " ",
        cell: true,
        align: "center",
        disabled: false,
        type: "switch",
        dicData: [
          {
            label: "否",
            value: 0
          },
          {
            label: "是",
            value: 1
          }
        ]
      },
      {
        label: "是否瓶颈工序",
        prop: "isKey",
        width: 120,
        align: "center",
        span: 6,
        placeholder: " ",
        disabled: false,
        type: "switch",
        cell: true,
        dicData: [
          {
            label: "否",
            value: 0
          },
          {
            label: "是",
            value: 1
          }
        ]
      },
      {
        label: "是否锁定",
        prop: "isLock",
        width: 100,
        cell: true,
        span: 6,
        align: "center",
        placeholder: " ",
        disabled: false,
        type: "switch",
        dicData: [
          {
            label: "否",
            value: 0
          },
          {
            label: "是",
            value: 1
          }
        ]
      },
      {
        label: "創建日期",
        prop: "createTime",
        placeholder: " ",
        width: 160,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      }

      // {
      //   label: "修改日期",
      //   prop: "upateTime",
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   placeholder: " ",
      //   hide: true,
      //   display: false
      // }
    ]
  };
}

export const workerF = {
  submitBtn: false,
  emptyBtn: false,

  menuBtn: false,
  menu: false,
  column: [
    {
      labelWidth: 90,
      label: "订单编号",
      prop: "poNo",
      span: 4,
      placeholder: " "
    },
    {
      labelWidth: 60,
      label: i18n.t("whseField.khmc"),
      prop: "cust",
      span: 4,
      placeholder: " "
    },
    {
      labelWidth: 60,
      label: i18n.t("whseField.zl"),
      prop: "weight",
      span: 4,
      placeholder: " "
    },
    {
      label: "日期起",
      labelWidth: 70,
      prop: "startDate",
      span: 4,
      placeholder: " "
    },
    {
      label: "日期至",
      labelWidth: 70,
      prop: "endDate",
      span: 4,
      placeholder: " "
    },
    {
      label: "日期至",
      labelWidth: 70,
      prop: "endDate1",
      span: 4,
      placeholder: " "
    },
    {
      label: "日期至",
      labelWidth: 70,
      prop: "endDat2",
      span: 4,
      placeholder: " "
    }
  ]
};
