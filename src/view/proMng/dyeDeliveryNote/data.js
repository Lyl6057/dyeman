import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let userList = getDicT("ucmlUser", "employeename", "ucmlUseroid");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "出货编号",
        prop: "outCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "申请人",
        prop: "applicant",
        span: 6,
        placeholder: " ",
        filterable: true,
        type: "select",
        dicData: userList
      },
      {
        label: "出货日期",
        prop: "outDate",
        width: 160,
        span: 6,
        type: "date",
        placeholder: " ",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
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
        label: "出货编号",
        prop: "outCode",
        width: 130,
        disabled: true,
        overHidden: true,
        span: 6
      },
      {
        label: "出货日期",
        prop: "outDate",
        width: 160,
        span: 6,
        type: "date",
        disabled: false,
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd",
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
        label: "申请人",
        prop: "applicant",
        width: 120,
        overHidden: true,
        filterable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "請輸入申请人",
            trigger: "blur"
          }
        ],
        type: "select",
        dicData: userList
      },
      {
        label: "仓管员",
        prop: "wareMana",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "审核人",
        prop: "reviewer",
        width: 120,
        overHidden: true,
        span: 6,
        type: "select",
        filterable: true,
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      },
      {
        label: "收货人",
        prop: "receiver",
        width: 120,
        filterable: true,
        overHidden: true,
        span: 6,
        type: "select",
        dicData: getDicT("ucmlUser", "employeename", "ucmlUseroid")
      }
    ]
  };
}

export function noteCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "poNo",
        type: "count"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },

      {
        label: "缸号",
        prop: "vatNo",
        width: 180,
        overHidden: true,
        cell: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "订单编号",
        prop: "poNo",
        width: 180,
        overHidden: true,
        cell: true,
        placeholder: " ",
        span: 6
      },

      {
        label: "产品编号",
        prop: "productNo",
        width: 180,
        overHidden: true,
        cell: true,
        placeholder: " ",
        span: 6
      }
    ]
  };
}
