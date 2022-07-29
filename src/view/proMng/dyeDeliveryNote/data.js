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
        label: "货柜编号",
        prop: "containNo",
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

export function mainDlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
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
        label: "货柜编号",
        prop: "containNo",
        width: 130,
        disabled: false,
        overHidden: true,
        span: 6
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


export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 300px)",
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
        label: "货柜编号",
        prop: "containNo",
        width: 130,
        disabled: false,
        overHidden: true,
        span: 6
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
        name: "vatNo",
        type: "count"
      },
      {
        label: " ",
        name: "pidNo",
        type: "sum"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum"
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
        width: 140,
        overHidden: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "订单编号",
        prop: "poNo",
        width: 140,
        overHidden: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "总匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "总净重(KG)",
        prop: "netWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: "总毛重(KG)",
        prop: "grossWeight",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: "总码长",
        prop: "yardLength",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      }
    ]
  };
}

export function finishedCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 284px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "productNo",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum"
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum"
      }
    ],
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      {
        label: "匹號",
        prop: "pidNo",
        width: 60,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "净重(KG)",
        prop: "netWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: "净重(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: "毛重(KG)",
        prop: "grossWeight",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: "码长",
        prop: "yardLength",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      }
    ]
  };
}
