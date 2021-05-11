/*
 * @Author: Lyl
 * @Date: 2021-05-03 13:03:03
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-10 16:23:48
 * @Description:
 */

import axios from 'axios';
import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let cust = getDicT("basCustomer", "custName", "custCode")
let supp = getDicT("basSupplier", "suppName", "suppId",)
let purAttr = getDIC("sal_purAttr")
let calicoType = getDIC("bas_calicoType")
let chemicalClass = getDIC("bas_chemicalClass")
let yarnsFlag = getDIC("pur_yarnsFlag")
let yarnsPaytype = getDIC("pur_yarnsPaytype")
let yarnsCollected = getDIC("pur_yarnsCollected")
let basHardware = getDicT("basHardware", "topcategoryName", "basHardwareoid")
let basAdsupplies = getDicT("basAdsupplies", "topcategoryName", "basAdsuppliesoid")
let matUnit = getDIC("bas_matUnit")
let basChemical = getXDicT("BasChemicalmatNew")
let basPigment = getXDicT("basPigment")
let basProductivesupplies = getXDicT("basProductivesuppliesnew")

export function getWeaveJob(params) {
  return axios({
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}
export function weaveJobF(_this) {
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

export function weaveJobC(_this) {
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
        overHidden: true,
        width: 180,
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
        width: 180,
        span: 6,
        placeholder: "请選擇訂單編號",
        sortable: true,
        overHidden: true,
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
            _this.$nextTick(() => {
              _this.form.weaveJobCode = _this.form.custCode + '-' + _this.code
            })
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
        type: "number",
        align: "left",
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
        width: 180,
        overHidden: true,
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
        width: 150,
        span: 6,
        overHidden: true
      },

      {
        label: "成品/洗後(克重)",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "門幅",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " "
      },
      {
        label: "抽針/圓筒",
        prop: "calicoShap",
        width: 90,
        span: 6,
        hide: true,
        placeholder: " ",
        type: "switch",
        dicData: [
          {
            value: "1",
            label: "抽針"
          },
          {
            value: "2",
            label: "圆筒"
          }
        ]
      },

      {
        label: "針寸數",
        prop: "needleInch",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " ",
        // type: "number",
      },
      {
        label: "縂針數",
        prop: "needleNumber",
        width: 80,
        placeholder: " ",
        type: "number",
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

export function getTechCode(params) {
  return axios({
    url: '/api/proBleadyeTechCode/page',
    method: 'get',
    params: params
  })
}
export function techCodeF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "工艺代码编号",
        prop: "bleadyeCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "工艺分类",
        prop: "techPart",
        span: 6,
        placeholder: " ",
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
    ],
  }
}

export function techCodeC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
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
        label: "工艺编号",
        prop: "bleadyeCode",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        sortable: true,
      },
      {
        label: "工艺名称",
        prop: "bleadyeName",
        width: 300,
        span: 6,
        overHidden: true,
      },
      {
        label: "工艺分类",
        prop: "techPart",
        overHidden: true,
        width: 140,
        span: 6,
      },
      {
        label: "建议水比",
        prop: "liquorRatio",
        width: 120,
        span: 6,
      },
      {
        label: "工艺流程图片",
        prop: "bleadyeImageId",
        span: 6,
        width: 250,
      },
      {
        label: "備註",
        prop: "remark",
        span: 6,
        // width: 250,

      },


    ],
  }
}

export function getTechItem(params) {
  return axios({
    url: '/api/proBleadyeCodeItem/page',
    method: 'get',
    params: params
  })
}
export function TechItemF(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "物料編號",
        prop: "basMateId",
        span: 6,
        placeholder: " ",
      },
      {
        label: "工艺类型",
        prop: "bleadyeType",
        span: 6,
        placeholder: " ",
      },
    ],
  }
}

export function TechItemC(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
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
        label: "工艺类型",
        prop: "bleadyeType",
        overHidden: true,
        width: 120,
        span: 6,
      },
      {
        label: "物料代碼",
        prop: "basMateId",
        overHidden: true,
        width: 120,
        span: 6,
      },
      {
        label: "物料名称",
        prop: "mateName",
        width: 300,
        span: 6,
        overHidden: true,
      },
      {
        label: "用量",
        prop: "useAmount",
        width: 140,
        span: 6,
      },
      {
        label: "單位",
        prop: "measureType",
        width: 120,
        span: 6,
      },
      {
        label: "运行温度",
        prop: "runTemp",
        span: 6,
        width: 120,
      },
      {
        label: "运行时间(分钟)",
        prop: "runTime",
        span: 6,
        width: 140,

      },


    ],
  }
}