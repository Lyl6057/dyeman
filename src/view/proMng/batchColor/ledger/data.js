/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-18 08:38:26
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

let custList = getDicT("basCustomer", "custName", "custCode");

function fillZero(row, value) {
  return value && value.toFixed(2);
}

// 表格通用配置
const mainCrudOpCommon = {
  menu: false,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 285px)",
  refreshBtn: false,
  columnBtn: false,
  showOverflowTooltip: true,
  excelBtn: false,
  tree: true,
  rowKey: "index",
  index: true,
  page: true,
  stripe: true
};

// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100,
  
};

export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: "批色时间",
        prop: "appTime",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        overHidden: true,
      },
      // {
      //   label: "客户",
      //   prop: "custCode",
      //   overHidden: true,
      //   width: 140,
      //   span: 6,
      //   type: "select",
      //   dicData: custList,
      //   filterable: true,
      //   tip: "Khách hàng"
      // },
      // {
      //   label: "订单号",
      //   prop: "salPoNo",
      //   span: 6,
      //   width: 150,
      //   overHidden: true,
      // },
      {
        label: "批色工序",
        prop: "appMileage",
        span: 6,
        type: "select",
        dicData: [
          {
            label: "出缸批色",
            value: "BF"
          },
          {
            label: "定后批色",
            value: "AF"
          },
        ]
      },
      {
        label: "批色结论",
        prop: "appState",
        span: 6,
        type: "select",
        dicData: [
          {
            label: "通过",
            value: 1
          },
          {
            label: "染缸返工",
            value: 2
          },
          {
            label: "定型加色",
            value: 3
          }
        ],
      },
    ]
  };
}


export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    menuWidth: 120,
    labelWidth: 100,
    height: "calc(100vh - 240px)",
    page: true,
    column: [
      {
        label: "批色时间",
        prop: "appTime",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        fixed: true,
        display: false
      },
      {
        label: "缸号",
        prop: "vatNo",
        placeholder: " ",
        span: 6,
        width: 150,
        display: false,
        overHidden: true,
        fixed: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "缸号",
        prop: "runJobFk",
        placeholder: " ",
        span: 6,
        width: 130,
        hide: true,
        overHidden: true,
        formslot: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "客户",
        prop: "custCode",
        overHidden: true,
        disabled: true,
        width: 120,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: custList,
        tip: "Khách hàng"
      },
      {
        label: "订单号",
        prop: "salPoNo",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: false
      },
      {
        label: "头缸/缸差",
        disabled: true,
        prop: "firstOrOther",
        span: 6,
        width: 100,
        type: "switch",
        dicData: [
          {
            label: "头缸",
            value: "1"
          },
          {
            label: "缸差",
            value: "2"
          }
        ],
        hide: true,
        placeholder: " "
      },
     
      {
        label: "色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label: "颜色名称",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        hide: true,
        overHidden: true,
      },
      {
        label: "布类名称",
        prop: "fabName",
        placeholder: " ",
        width: 200,
        overHidden: true,
        disabled: true,
        span: 12,
        hide: true
      },
      {
        label: "疋数",
        prop: "pidCount",
        placeholder: " ",
        span: 6,
        disabled: true,
        align: "right",
        width: 60,
      },
      {
        label: "订单数",
        prop: "poAmountKg",
        placeholder: " ",
        span: 6,
        disabled: true,
        width: 120,
        overHidden: true,
        align: "right",
        hide: true
      },
      {
        label: "批色工序",
        prop: "appMileage",
        width: 100,
        placeholder: " ",
        span: 6,
        clearable: false,
        overHidden: true,
        type: "select",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        dicData: [
          {
            label: "出缸批色",
            value: "BF"
          },
          {
            label: "定后批色",
            value: "AF"
          },
        ]
      },
      {
        label: "批色结论",
        prop: "appState",
        clearable: false,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "A通过",
            value: 1
          },
          {
            label: "B染缸返工",
            value: 2
          },
          {
            label: "C定型加色",
            value: 3
          }
        ],
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "出缸时间",
        prop: "vatOutTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "收单时间",
        prop: "receiveTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "完成时间",
        prop: "finishTime",
        width: 160,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      
      {
        label: "批色人",
        prop: "appStaff",
        width: 100,
        placeholder: " ",
        span: 6,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
      },
      {
        label: "备注",
        prop: "remark",
        width: 180,
        placeholder: " ",
        span: 24,
        overHidden: true,
      },
    ]
  };
}

