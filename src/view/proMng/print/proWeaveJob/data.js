/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-13 07:57:18
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

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
        placeholder: " ",
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        span: 6,
        placeholder: " ",
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "客戶名稱",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,

      },
      {
        label: "開機日期",
        prop: "startDate",
        span: 6,
        placeholder: " ",


      },
      {
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        placeholder: " ",

      },
      {
        label: "制單人",
        prop: "creator",
        span: 6,
        placeholder: " ",
      },
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ],
  }
}

export function dlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "訂單編號",
        prop: "poNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "客戶名稱",
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "tree",
        dicData: cust,
      },
      {
        label: "订单狀態",
        prop: "poStatus",
        span: 6,
        placeholder: " ",
      },
    ],
  }
}

let cust = getDicT("basCustomer", "custName", "custCode")

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
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
        label: "生產單號",
        prop: "weaveJobCode",
        width: 110,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "请输入生產單號",
          trigger: "blur"
        }],
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 140,
        span: 6,
        placeholder: "请選擇訂單編號",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇訂單編號",
          trigger: "blur"
        }],
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label: "胚布期",
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇出胚布日期",
          trigger: "blur"
        }],
      },
      {
        label: "成品期",
        prop: "productDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇成品期",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇成品期",
          trigger: "blur"
        }],
      },
      {
        label: "客戶名稱",
        prop: "custName",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: "请選擇客戶名稱",
        type: "select",
        dicData: cust,
        change: () => {
          _this.$nextTick(() => {
            _this.form.custCode = _this.form.custName
          })

        }
      },
      {
        label: "客戶編號",
        prop: "custCode",
        overHidden: true,
        disabled: false,
        width: 120,
        span: 6,
        placeholder: "请選擇客戶名稱",
        rules: [{
          required: true,
          message: "请選擇客戶名稱",
          trigger: "blur"
        }],
        change: () => {
          if (_this.isAdd) {
            _this.form.weaveJobCode = _this.form.custCode + '-' + _this.code
          }

        }
      },


      {
        label: "織單數量",
        prop: "amount",
        width: 100,
        placeholder: "请输入織單數量",
        span: 6,
        rules: [{
          required: true,
          message: "请输入織單數量",
          trigger: "blur"
        }],
        align: "right",
      },
      {
        label: "開機日期",
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [{
          required: true,
          message: "请選擇開機日期",
          trigger: "blur"
        }],
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        width: 120,
        placeholder: " ",
        rules: [{
          required: true,
          message: "请輸入機號",
          trigger: "blur"
        }],

      },
      {
        label: "製單人",
        prop: "creator",
        span: 6,
        hide: false,
        width: 100,
        disabled: false,
        rules: [{
          required: true,
          message: "请输入制单人",
          trigger: "blur"
        }],
        // type: "select",
        // dicData:
        //   postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
      },
      {
        label: "布類描述",
        prop: "fabricDesc",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [{
          required: true,
          message: "请選擇布類描述",
          trigger: "blur"
        }],
      },
      {
        label: "顏色名稱",
        prop: "colorName",
        placeholder: " ",
        width: 120,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [{
          required: true,
          message: "请選擇顏色名稱",
          trigger: "blur"
        }],
      },
      {
        label: "色號",
        prop: "colorCode",
        width: 120,
        span: 6,
      },

      {
        label: "成品/洗後(克重)",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "門幅",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "抽針/圓筒",
        prop: "calicoShap",
        width: 90,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label: "針寸數",
        prop: "needleInch",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " ",
      },
      {
        label: "縂針數",
        prop: "needleNumber",
        width: 80,
        placeholder: " ",
        span: 6,
        hide: true
      },
      {
        label: "紗長",
        prop: "yarnLength",
        width: 80,
        placeholder: " ",
        span: 6,
        hide: true
      },
      {
        label: "更改紗長",
        prop: "yarnLenghtChanged",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6,
        click: () => {
          if (!_this.form.weaveJobId) {
            _this.$tip.error("請先保存通知單信息!")
            return
          }
          _this.crudOp = longCrud(_this)
          _this.visible = true
          _this.tabs = "更改紗長"
        }
      },

      {
        label: "成衣面",
        prop: "readyMadeFabric",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "橫縮",
        prop: "horizonShrink",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "直縮",
        prop: "verticalShrink",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },


      {
        label: "胚重(左)",
        prop: "calicoLeft",
        width: 90,
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "胚重(中)",
        prop: "calicoMiddle",
        width: 90,
        placeholder: " ",
        hide: true,
        span: 6
      },
      {
        label: "其他要求",
        prop: "otherRequire",
        placeholder: " ",
        hide: true,
        span: 12,
        placeholder: " "
      },

      {
        label: "胚重(右)",
        prop: "calicoRight",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "落布封度",
        prop: "fallCloth",
        span: 6,
        placeholder: " ",
        hide: true,
        width: 90,
      },
      {
        label: "上機工藝",
        prop: "operatProcess",
        hide: true,
        span: 12,
        placeholder: " "
      },

      {
        label: "筒口高度",
        prop: "cylinderHeight",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
      },
      {
        label: "織機食位",
        prop: "weaveEnter",
        width: 80,
        placeholder: " ",
        span: 6,
        hide: true,
      },
      {
        label: "輸送盤資料",
        prop: "transPlate",
        hide: true,
        placeholder: " ",
        placeholder: " ",
        span: 12
      },
      {
        label: "布架寬度",
        prop: "clothRackWidth",
        placeholder: " ",
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "布架資料",
        prop: "clothRackDesc",
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "循環(自動間)",
        prop: "loopSpace",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "轉速/重量/匹",
        prop: "rotaSpeed",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "機數",
        prop: "mathineSpeed",
        width: 90,
        hide: true,
        placeholder: " ",
        span: 6
      },

      // {
      //   label: "開單複核",
      //   prop: "reviewer",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 90,
      // },

      // {
      //   label: "矯機人簽名",
      //   prop: "machineCalibration",
      //   width: 80,
      //   span: 6,
      //   placeholder: " ",
      //   hide: true,
      // },
      // {
      //   label: "最終評語",
      //   prop: "evaluateComment",
      //   hide: true,
      //   placeholder: " ",
      //   span: 12
      // },
      // {
      //   label: "機修復核人",
      //   prop: "machineMaintenance",
      //   placeholder: " ",
      //   hide: true,
      //   span: 6
      // },
      // {
      //   label: "質檢複核",
      //   prop: "qcReviewer",
      //   hide: true,
      //   placeholder: " ",
      //   span: 6
      // },
      // {
      //   label: "運轉複核",
      //   prop: "transfer",
      //   width: 90,
      //   hide: true,
      //   placeholder: " ",
      //   span: 6
      // },

      // {
      //   label: "評語簽名",
      //   prop: "appraiser",
      //   span: 6,
      //   hide: true,
      //   placeholder: " ",
      //   width: 80,
      // },
      {
        label: "創建日期",
        prop: "createTime",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      },

      {
        label: "修改日期",
        prop: "upateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        placeholder: " ",
        hide: true,
        display: false
      }
    ],
  }

}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "salPooid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
      },
      {
        label: "訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true,
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust,
      },
      {
        label: "订单日期",
        prop: "poDate",
        width: 130,
        type: "date",
        align: 'center',
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "订单类别",
        prop: "poType",
        width: 110,
        type: "select",
        dicData: getDIC("sal_poType")
      },

      {
        label: "订单狀態",
        prop: "poStatus",
        width: 110,
        type: "select",
        dicData: getDIC("Status")
      },
    ],
  }
}


export function longCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
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
      },
      {
        label: "纱长",
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true
      },
      {
        label: "時間",
        prop: "signDate",
        type: "datetime",
        width: 200,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center"
      },
    ],
  }
}

export function yarnCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
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
      },
      {
        label: "紗線編號",
        prop: "yarnCode",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "紗線名稱",
        prop: "yarnName",
        width: 500,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: "批號",
        prop: "yarnBatch",
        width: 140,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "數量",
        prop: "amount",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },
      {
        label: "單位",
        prop: "unit",
        width: 100,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_matUnit")
      }
    ],
  }
}

export function calicoCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
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
      },
      {
        label: "重量",
        prop: "weight",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },

      {
        label: "门幅",
        prop: "breadth",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（WPI)",
        prop: "wpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（CPI）",
        prop: "cpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
    ],
  }
}

export function strainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
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
      },
      {
        label: "輸送張力",
        prop: "lineTension",
        width: 120,
        cell: true,
        align: "right",
        span: 6,
      },

    ],
  }
}

