/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-07 16:36:42
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
const vatList = getDicT("proBleadyeRunJob", "vatNo", "runJobId");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
        // type: "select",
        // filterable: true,
        // dicData: vatList
      }
      // {
      //   label: "接收人",
      //   prop: "acceptStaff",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label: "接收日期",
      //   prop: "acceptDate",
      //   width: 130,
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   placeholder: " "
      // }
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
    labelWidth: 100,
    column: [
      {
        label: "缸号",
        prop: "runJobFk",
        span: 8,
        placeholder: " ",
        type: "select",
        filterable: true,
        formslot: true,
        dicData: vatList,
        rules: [
          {
            required: true,
            message: "請选择缸號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "接收人",
        prop: "acceptStaff",
        span: 8,
        placeholder: " ",
        // type: "select",
        disabled: true
        // dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid")
      },
      {
        label: "接收日期",
        prop: "acceptDate",
        width: 150,
        span: 8,
        type: "datetime",
        disabled: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "部门",
        prop: "dptworkProcessFk",
        span: 8,
        placeholder: " ",
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ]
      },
      {
        label: "说明",
        prop: "acceptDesc",
        span: 16,
        placeholder: " "
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
    height: "calc(100vh - 265px)",
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
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "請輸入缸號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        formslot: true,
        placeholder: "請選擇織造生產單號",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]

        // click: () => {
        //   _this.choiceTle = "选择织造通知单";
        //   _this.choiceV = true;
        // }
      },

      {
        label: "开單日期",
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇發單日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇發單日期",
            trigger: "blur"
          }
        ]
      },
      // {
      //   label: "交货日期",
      //   prop: "deliveDate",
      //   tip: "Ngày giao hàng",
      //   width: 130,
      //   span: 6,
      //   type: "date",
      //   align: "center",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   placeholder: "请選擇交货日期",
      //   sortable: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请選擇交货日期",
      //       trigger: "blur"
      //     }
      //   ]
      // },

      {
        label: "客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: "訂單編號",
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: " ",
        sortable: true,
        // sortable: true,
        overHidden: true
      },
      {
        label: "客人PO",
        prop: "custPoNo",
        tip: "PO khách hàng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
      },
      {
        label: "合同号",
        prop: "contractNo",
        tip: "Số hiệu hợp đồng",
        span: 6,
        hide: true,
        width: 80,
        sortable: true,
        placeholder: " "
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
    height: "calc(100vh - 229px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    index: true,
    labelWidth: 130,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      {
        label: "部门",
        prop: "dptName",
        span: 8,
        placeholder: " ",
        width: 100,
        overHidden: true
        // type: "select",
        // dicData: getDicT("proDptworkProcess", "dptName", "dptCode"),
        // rules: [
        //   {
        //     required: true,
        //     message: "請选择部门",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: "接收人",
        prop: "acceptStaff",
        width: 100,
        overHidden: true,
        span: 8,
        placeholder: " "
        // type: "select",
        // disabled: true,
        // dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid")
      },
      {
        label: "接收日期",
        prop: "acceptDate",
        width: 160,
        overHidden: true,
        sortable: true,
        span: 8,
        type: "datetime",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請輸入接收日期",
            trigger: "blur"
          }
        ]
      },

      {
        label: "说明",
        prop: "acceptDesc",
        overHidden: true,
        span: 16,
        placeholder: " "
      }
    ]
  };
}
