/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-29 11:14:51
 * @Description:
 */
var baseUrl = "http://192.168.5.1:91";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");
const vatList = getDicT("proBleadyeRunJob", "vatNo", "runJobId");

export function mainForm() {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 8,
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

export function weaveForm() {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "织单号",
        prop: "weaveJobCode",
        span: 8,
        placeholder: " "
      }
    ]
  };
}

export function yarnForm() {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "试纱通知单",
        prop: "yarntestNote",
        span: 8,
        placeholder: " "
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
    labelWidth: 100,
    column: [
      {
        label: "收/发单",
        prop: "dispathReceive",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        clearable: false,
        tip: "nhận đơn / gửi đơn",
        rules: [
          {
            required: true,
            message: "請选择收/发单",
            trigger: "blur"
          }
        ],
        dicData: [
          {
            value: 1,
            label: "收单(nhận đơn)"
          },
          {
            value: 2,
            label: "发单(gửi đơn)"
          }
        ],
        change: val => {
          if (val.value == 1) {
            _this.form.dptworkProcessFk = _this.userId || "";
            _this.form.acceptStaff = parent.userID;
            _this.form.sendProcessFk = "";
            _this.form.sendStaff = "";
            _this.form.sendProcessFk = _this.lastLog.sendProcessFk;
          } else {
            _this.form.dptworkProcessFk = "";
            _this.form.acceptStaff = "";
            _this.form.sendProcessFk = _this.userId || "";
            _this.form.sendStaff = parent.userID;
          }
        }
      },
      {
        label: "缸号",
        prop: "runJobFk",
        span: 6,
        tip: "Số lô nhuộm",
        placeholder: " ",
        type: "select",
        tipPlacement: "right",
        display: _this.tabs == "rd" ? true : false,
        filterable: true,
        formslot: true,
        dicData: vatList,
        rules: [
          {
            required: true,
            message: "請选择缸號",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.getLogWeight(val.value);
        }
      },

      {
        label: "织单号",
        display: _this.tabs == "zd" ? true : false,
        prop: "weaveJobId",
        type: "select",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: "试纱单号",
        display: _this.tabs == "ssd" ? true : false,
        prop: "aloYarntestoid",
        type: "select",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: "计划产量",
        prop: "planOutput",
        span: 6,
        type: "number",
        tip: "sản lượng kế hoạch",
        tipPlacement: "right",
        placeholder: " "
      },
      {
        label: "实际产量",
        prop: "realOutput",
        type: "number",
        span: 6,
        tipPlacement: "right",
        tip: "sản lượng thực tế",
        placeholder: " "
      },

      {
        label: "发单部门",
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",

        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        cascader: ["stepId"]
      },
      // {
      //   label: "发单人",
      //   prop: "sendStaff",
      //   span: 6,
      //   placeholder: " ",
      //   tipPlacement: "right",
      //   tip: "người gửi đơn",
      //   disabled: false,
      //   type: "select",
      //   dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
      //   filterable: true
      // },
      {
        label: "收单部门",
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",

        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        cascader: ["stepId"]
      },
      // {
      //   label: "收单人",
      //   prop: "acceptStaff",
      //   tipPlacement: "right",
      //   span: 6,
      //   tip: "người nhận đơn",
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
      //   disabled: false,
      //   filterable: true
      // },
      {
        label: "工序",
        prop: "stepId",
        tip: "quá trình",
        span: 6,
        placeholder: " ",
        type: "select",
        tipPlacement: "right",
        props: {
          label: "stepName",
          value: "stepId"
        },
        cascaderIndex: 0,
        dicUrl: `${baseUrl}/api/baseWorkStep/List?orgCodes=%25{{dptworkProcessFk}}`
        // dicData: postDicT(
        //   "baseWorkStepList",
        //   "stepName",
        //   "stepId",
        //   _this.form ? _this.form.dptworkProcessFk || "" : ""
        // )
      },
      {
        label: "说明",
        prop: "acceptDesc",
        tipPlacement: "right",
        span: 24,
        tip: "remark",
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
    height: "calc(100vh - 275px)",
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
        display: false,
        fixed: true,
      },
      {
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        fixed: true,
        span: 6,
        disabled: false,
        sortable: true,
      },
      {
        label: "生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        formslot: true,
        placeholder: "請選擇織造生產單號",
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
      },
      {
        label: "客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        sortable: true,
        width: 140,
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
        width: 140,
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
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    index: true,
    labelWidth: 130,
    column: [
      {
        label: "收/发单",
        prop: "dispathReceive",
        span: 8,
        placeholder: " ",
        width: 80,
        type: "select",
        clearable: false,
        dicData: [
          {
            value: 1,
            label: "收单"
          },
          {
            value: 2,
            label: "发单"
          }
        ]
      },
      {
        label: "工序",
        prop: "stepId",
        overHidden: true,
        span: 16,
        width: 120,
        placeholder: " ",
        type: "select",
        props: {
          label: "stepName",
          value: "stepId"
        },
        dicUrl: `${baseUrl}/api/baseWorkStep/List`
      },
      {
        label: "发单部门",
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",
        overHidden: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        width: 120
      },
      {
        label: "发单人",
        prop: "sendStaff",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        tip: "người gửi đơn",
        disabled: false,
        type: "select",
        overHidden: true,
        width: 100,
        dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
        filterable: true
      },
      {
        label: "收单部门",
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        width: 120,
        overHidden: true,
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        cascader: ["stepId"]
      },
      {
        label: "收单人",
        prop: "acceptStaff",
        tipPlacement: "right",
        span: 6,
        tip: "người nhận đơn",
        placeholder: " ",
        width: 100,
        type: "select",
        overHidden: true,
        dicData: getDicT("ucmlUser", "employeename", "usrLogin"),
        disabled: false,
        filterable: true
      },
      {
        label: "操作日期",
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

export function weavecrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true,
      },
      {
        label: "生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        fixed: true,
        width: 140,
        span: 6,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 140,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true
      },
      {
        label: "齐胚期",
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",

        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        tip: "Kỳ hạn vải mộc"
      },
      {
        label: "成品交期",
        prop: "productDate",
        width: 120,

        span: 6,
        type: "date",
        tip: "Kỳ hạn thành phẩm",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇成品期",
        sortable: true,
      },
      {
        label: "营销单号",
        prop: "marketOrder",
        tip: "Mã số dệt bộ phận Sales",
        span: 6,
        width: 140,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "客人訂單編號",
        prop: "custPoNo",
        span: 6,

        width: 120,
        placeholder: " ",
        tip: "Ckhách hàng PO",
        hide: true
      },

      {
        label: "客戶名稱",
        prop: "custCode",
        overHidden: true,
        width: 140,

        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        tip: "Khách hàng",
        filterable: true,
      },
      
      {
        label: "顏色名稱",
        prop: "colorName",

        tip: "Màu sắc",
        width: 140,
        span: 6,
        placeholder: "请選擇顏色名稱",
        overHidden: true
      },
      {
        label: "色號",
        prop: "colorCode",
        placeholder: " ",
        width: 140,
        span: 6,
        overHidden: true,
        tip: "Số màu"
      }
    ]
  };
}

export function yarnTestCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
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
        display: false,
        fixed: true,
      },
      {
        label: "试纱通知单",
        prop: "yarntestNote",
        overHidden: true,
        fixed: true,
        width: 140,
        span: 6,
        sortable: true,
      },
      {
        label: "发单日期",
        prop: "issuDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
      },
      {
        label: "本厂批号",
        prop: "batchNo",
        width: 140,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true
      },
      {
        label: "纱线类型",
        prop: "yarnType",
        span: 6,
        width: 140,
        overHidden: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("whse_yarntype")
      },
      {
        label: "纱支",
        prop: "custPoNo",
        span: 6,
        width: 120,
        placeholder: " ",
        hide: true
      },
    ]
  };
}
