/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-10 16:57:39
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

const unit = getDIC("sal_breadthUnit")
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
    addBtn: true,
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
        label: "染缸機台號",
        prop: "dyeMathine",
        overHidden: true,
        width: 130,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "請輸入染缸機台號",
          trigger: "blur"
        }],
      },
      {
        label: "缸號",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "請輸入缸號",
          trigger: "blur"
        }],
      },
      {
        label: "發單日期",
        prop: "workDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇發單日期",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇發單日期",
          trigger: "blur"
        }],
      },
      {
        label: "交货日期",
        prop: "poDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇交货日期",
        sortable: true,
      },
      {
        label: "管數量",
        prop: "dyeJarCount",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "請輸入管數量",
          trigger: "blur"
        }],
        type: "number"
      },

      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true,
      },
      {
        label: "交貨地址",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false,
      },
      {
        label: "織造生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: "請選擇織造生產單號",
        rules: [{
          required: true,
          message: "请输入生產單號",
          trigger: "blur"
        }],
        click: () => {
          _this.choiceV = true
        }
      },
      {
        label: "客戶名稱",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.custCode = _this.form.custName
        //   })

        // }
      },

      {
        label: "顏色名稱",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: " ",
        // rules: [{
        //   required: true,
        //   message: "请選擇顏色名稱",
        //   trigger: "blur"
        // }],
      },
      {
        label: "色號",
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "訂單數量(磅)",
        prop: "poAmountLb",
        width: 120,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "訂單數量(公斤)",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "布類描述",
        prop: "fabName",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: " ",
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },


      {
        label: "布匹成分",
        prop: "fabElements",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 6,
      },


      {
        label: "紗線批號",
        prop: "yarnBatchNo",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false
      },
      {
        label: "紗牌紗批",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false
      },
      {
        label: "紗牌",
        prop: "yarnCard",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false
      },

      {
        label: "疋數",
        prop: "pidCount",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "重量",
        prop: "clothWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {

        label: "合染缸號",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 12,
        disabled: false,
        placeholder: " "
      },

      {
        label: "幅寬",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label: "幅寬實用",
        prop: "breadthActual",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "幅寬連邊",
        prop: "breadthBorder",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "幅寬單位",
        prop: "breadthUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: unit
      },
      {
        label: "筒徑",
        prop: "tubeDiam",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label: "筒徑單位",
        prop: "tubeDiamUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: unit
      },

      {
        label: "針距",
        prop: "needleDist",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "針距單位",
        prop: "needleDistUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: unit
      },
      {
        label: "紗長",
        prop: "yarnLength",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "紗長單位",
        prop: "yarnLengthUnit",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "select",
        dicData: unit
      },

      {
        label: "克重",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "洗前(克重)",
        prop: "gramWeightBefor",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },

      {
        label: "顏色種類數量",
        prop: "poColorCount",
        width: 120,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "訂單總缸數",
        prop: "poVatCount",
        width: 120,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "這是第幾缸",
        prop: "vatIndex",
        width: 120,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " "
      },
      {
        label: "成品/洗後(克重)",
        prop: "gramWeightAfter",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "對色缸號",
        prop: "compVatNo",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "對色光源",
        prop: "compLightSource",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 6
      },
      {
        label: "縮水(直縮)",
        prop: "shrinkLenth",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "縮水(橫縮)",
        prop: "shrinkWidth",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },


      {
        label: "縮水(扭度)",
        prop: "shrinkNear",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "縮水(循環)",
        prop: "shrinkRotate",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },

      {
        label: "縮水(掛幹)",
        prop: "hangDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "縮水(平幹)",
        prop: "flatDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "縮水(拋幹)",
        prop: "throwDry",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },

      {
        label: "稱料員",
        prop: "mateStockMan",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label: "規格參考",
        prop: "specParam",
        width: 120,
        hide: true,
        placeholder: " ",
        span: 12
      },
      {
        label: "值機員",
        prop: "operator",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label: "工廠負責人",
        prop: "chargeWeave",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },

      {
        label: "打印時間",
        prop: "printDate",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      },
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
        align: "center",
        cell: true
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
    height: "calc(100vh - 112px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false,
      // },
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
        width: 400,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: "批號",
        prop: "yarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "本厂批號",
        prop: "factoryYarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "紗牌",
        prop: "yarnBrand",
        width: 150,
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
        dicData: unit
      }
    ],
  }
}

export function groupCrudOp(_this) {
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
      },
      {
        label: "项目名称",
        prop: "jobItemName",
        width: 180,
        span: 6,
        cell: true,
        // overHidden: true
      },
      {
        label: "备注说明",
        prop: "remark",
        width: 350,
        span: 6,
        cell: true,
        // overHidden: true
      },
    ],
  }
}

export function testCrud(_this) {
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
        label: "测试项目编号",
        prop: "testItemCode",
        width: 140,
        span: 6,
        cell: true
      },
      {
        label: "测试标准",
        prop: "testItemName",
        width: 200,
        span: 6,
        cell: true,
      },
      {
        label: "测试要求",
        prop: "testItemContent",
        width: 300,
        span: 6,
        cell: true,
      },
    ],
  }
}

export function dyeCrud(_this) {
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
        label: "染缸参数编号",
        prop: "vatParamCode",
        width: 120,
        cell: true,
        span: 6,
      },
      {
        label: "项目名称",
        prop: "vatParamName",
        width: 120,
        cell: true,
        span: 6,
      },
      {
        label: "练漂设定值",
        prop: "bleachSet",
        width: 120,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number"
      },
      {
        label: "练漂实际值",
        prop: "bleachFact",
        width: 120,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number"
      },
      {
        label: "染色设定值",
        prop: "dyeSet",
        width: 120,
        cell: true,
        span: 6,
        placeholder: " ",
        type: "number",
      },
      {
        label: "染色实际值",
        prop: "dyeFact",
        width: 120,
        cell: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "皂洗设定值",
        prop: "soapSet",
        width: 120,
        cell: true,
        type: "number",
        placeholder: " ",
        span: 6,
      },
      {
        label: "皂洗实际值",
        prop: "soapFact",
        width: 120,
        type: "number",
        cell: true,
        placeholder: " ",
        span: 6,
      },
    ],
  }
}
let bleadyeCode = getXDicT("proBleadyeTechCode")
// bleadyeCode = bleadyeCode.sort((a, b) => {
//   return a.bleadyeCode > b.bleadyeCode ? 1 : -1
// })
export function techargueCrud(_this) {
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
        label: "工艺代碼",
        prop: "proBleadyeTechCodeFk",
        width: 120,
        cell: false,
        span: 6,
        props: {
          label: "bleadyeCode",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode,

      },
      {
        label: "工艺名稱",
        prop: "bleadyeName",
        width: 180,
        cell: true,
        span: 6,
        props: {
          label: "bleadyeName",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode,
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.proBleadyeTechCodeFk = _this.chooseData.bleadyeName
            // _this.chooseData.proBleadyeTechCodeFk = _this.chooseData.bleadyeName
            // console.log(_this.chooseData);
          })

        }
      },

      {
        label: "浴比",
        prop: "liquorRatio",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
      },
      {
        label: "布含水量",
        prop: "wetClothWater",
        width: 120,
        cell: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "总水量",
        prop: "totalWater",
        width: 120,
        cell: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "副缸外加水量",
        prop: "shotgunWater",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "停机水量",
        prop: "haltWater",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        placeholder: " "
      },

    ],
  }
}

export function codeItemCrud(_this) {
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
        label: "物料代碼",
        prop: "mateCode",
        width: 120,
        cell: true,
        span: 6,
      },
      {
        label: "物料名稱",
        prop: "mateName",
        width: 200,
        overHidden: true,
        cell: true,
        span: 6,
      },
      {
        label: "物料批次",
        prop: "mateBatchNo",
        width: 120,
        cell: true,
        span: 6,
      },
      {
        label: "數量",
        prop: "useAmount",
        width: 90,
        cell: true,
        type: "number",
        span: 6,
      },
      {
        label: "單位",
        prop: "measureType",
        width: 90,
        cell: true,
        span: 6,
      },
      {
        label: "工藝類型",
        prop: "bleadyeType",
        width: 90,
        cell: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "溫度",
        prop: "runTemp",
        width: 90,
        cell: true,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "時間(分鐘)",
        prop: "runTime",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "開稀比例",
        prop: "dilutionRate",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "輸送數量",
        prop: "deliveryQuantity",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
      },
    ],
  }
}

