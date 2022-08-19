/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:34
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-19 16:20:48
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
const baseUrl = 'http://192.168.5.1:91/api'
let ucmlOrg = getDicT("ucmlOrganize", "orgname", "orgname", {}, "orgno")

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
  page: true
};
// 表单通用配置
const formOpCommon = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 100
};

export function mainForm(_this) {
  return {
    ...formOpCommon,
    column: [
      {
        label: "剪办部门",
        prop: "cutDept",
        span: 6,
        type: "select",
        filterable: true,
        remote: true,
        // props:{
        //   label: 'orgname',
        //   value: 'orgname'
        // },
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
       // dicUrl:baseUrl + '/ucmlOrganize?orgname=%25' + '{{key}}'
      },
      {
        label: "剪办日期",
        prop: "cutDate",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "成品编号",
        prop: "productNo",
        span: 6,
        width: 150,
        overHidden: true,
      },
    ]
  };
}

export function crateDataForm(_this) {
  return {
    ...formOpCommon,
    labelWidth: 140,
    column: [
      {
        label: "成品编号",
        prop: "proCardFk",
        span: 6,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        formslot: true
      },
      {
        label: "剪办日期",
        prop: "cutDate",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        placeholder: ' ',
      },
      {
        label: "剪办部门",
        prop: "cutDept",
        tipPlacement: "right",
        span: 6,
        tip: "Bộ phận cắt",
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
      //  cascader: ["stepId"]
      },

      // {
      //   label: "剪办部门",
      //   prop: "cutDept",
      //   width: 150,
      //   span: 6,
      //   placeholder: " ",
      //   overHidden: true,
      //   type: "select",
      //   filterable: true,
      //   remote: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "",
      //       trigger: "blur"
      //     }
      //   ],
      //   props:{
      //     label: 'orgname',
      //     value: 'orgname'
      //   },
      //   dicUrl:baseUrl + '/ucmlOrganize?orgname=%25' + '{{key}}'
      // },
      {
        label: "责任部门",
        prop: "respDept",
        width: 150,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "select",
        filterable: true,
        remote: true,
        props:{
          label: 'orgname',
          value: 'orgname'
        },
        dicUrl:baseUrl + '/ucmlOrganize?orgname=%25' + '{{key}}'
      },
      {
        label: "原净重(KG)",
        prop: "netWeight",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        precision: 1,
        disabled: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        change: ({ value }) =>{
          _this.qcShearingBoardData.netWeightLbs = value * 2.2046
          _this.calculateYardLength()
        }
      },
      {
        label: "原净重(LBS)",
        prop: "netWeightLbs",
        span: 6,
        width: 120,
        disabled: true,
        type: "number",
        align: "right",
        precision: 1,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        
      },
      {
        label: "剪办数量(KG)",
        prop: "cutSamWeight",
        span: 6,
        width: 120,
        minRows: 0,
        type: "number",
        placeholder: " ",
        disabled: false,
        align: "right",
        precision: 1,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        change: ({ value }) =>{      
          _this.$nextTick(() =>{
            if (!_this.qcShearingBoardData.netWeight) {
              return
            }
            if (value > _this.qcShearingBoardData.netWeight - _this.qcShearingBoardData.cutDefeWeight) {
              _this.qcShearingBoardData.cutSamWeight = _this.qcShearingBoardData.netWeight - _this.qcShearingBoardData.cutDefeWeight
              return
            }
            _this.qcShearingBoardData.cutSamWeightLbs = value * 2.2046
          })
          _this.calculateYardLength()
        }
      },
      {
        label: "剪办数量(LBS)",
        prop: "cutSamWeightLbs",
        span: 6,
        width: 120,
        type: "number",
        align: "right",
        placeholder: " ",
        disabled: true,
        minRows: 0,
        precision: 1,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        // change: ({ value }) =>{
        //   if (value != Number((_this.qcShearingBoardData.cutSamWeight * 2.2046).toFixed(1))) {
        //     _this.qcShearingBoardData.cutSamWeight = value / 2.2046
        //   }
        // }
      },
      {
        label: "剪疵数量(KG)",
        prop: "cutDefeWeight",
        span: 6,
        width: 120,
        disabled: true,
        type: "number",
        align: "right",
        placeholder: " ",
        minRows: 0,
        precision: 1,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        change: ({ value }) =>{
          _this.$nextTick(() =>{
            if (!_this.qcShearingBoardData.netWeight) {
              return
            }
            if (value > _this.qcShearingBoardData.netWeight - _this.qcShearingBoardData.cutSamWeight) {
              _this.qcShearingBoardData.cutDefeWeight = _this.qcShearingBoardData.netWeight - _this.qcShearingBoardData.cutSamWeight
              return
            }
            _this.qcShearingBoardData.cutDefeWeightLbs = value * 2.2046
          })
          _this.calculateYardLength()
        }
      },
      {
        label: "剪疵数量(LBS)",
        prop: "cutDefeWeightLbs",
        span: 6,
        width: 120,
        placeholder: " ",
        type: "number",
        minRows: 0,
        align: "right",
        precision: 1,
        disabled: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        // change: ({ value }) =>{
        //   if (value !=  Number((_this.qcShearingBoardData.cutDefeWeight * 2.2046)).toFixed(1))  {
        //     _this.qcShearingBoardData.cutDefeWeight = value / 2.2046
        //   }
        // }
      },
      {
        label: "码数(剪前)",
        prop: "befcutYds",
        span: 6,
        width: 120,
        type: "number",
        placeholder: " ",
        align: "right",
        disabled: true,
        precision: 1,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "码数(剪后)",
        prop: "cutYds",
        span: 6,
        width: 120,
        minRows: 0,
        placeholder: " ",
        precision: 1,
        type: "number",
        align: "right",
        change: ({ value}) =>{
          _this.$nextTick(() =>{
            if (value > _this.qcShearingBoardData.befcutYds) {
              _this.qcShearingBoardData.cutYds = _this.qcShearingBoardData.befcutYds
            }
          })
        }
      },
      {
        label: "备注",
        prop: "cutRemarks",
        width: 180,
        placeholder: " ",
        dataType: "Srting",
        span: 24,
        overHidden: true,
        type: "select",
        multiple: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        dicData: getDIC("bas_sampleType") //getDicT("basDefectdata/list ", "chnName", "defectNo", {}, 'defectNo')
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    ...mainCrudOpCommon,
    menuWidth: 120,
    labelWidth: 120,
    height: "calc(100vh - 240px)",
    column: [
      {
        label: "成品编号",
        prop: "productNo",
        placeholder: " ",
        span: 6,
        width: 150,
        fixed: true,
        overHidden: true,
        rules: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ]
      },
      {
        label: "剪办日期",
        prop: "cutDate",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        fixed: true
      },
      {
        label: "剪办部门",
        prop: "cutDept",
        width: 100,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "select",
        dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      },
      
      {
        label: "原数量(净重)",
        children: [
          {
            label: "KG",
            prop: "netWeight",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
          {
            label: "LBS",
            prop: "netWeightLbs",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          }
        ]
      },
      {
        label: "剪办数量",
        children: [
          {
            label: "KG",
            prop: "cutSamWeight",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
          {
            label: "LBS",
            prop: "cutSamWeightLbs",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
        ]
      },
      {
        label: "剪疵数量",
        children: [
          {
            label: "KG",
            prop: "cutDefeWeight",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
          {
            label: "LBS",
            prop: "cutDefeWeightLbs",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
        ]
      },
      {
        label: "码数",
        children: [
          {
            label: "剪前",
            prop: "befcutYds",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
          {
            label: "剪后",
            prop: "cutYds",
            span: 6,
            width: 100,
            type: "number",
            align: "right",
            formatter: fillZero,
            rules: [
              {
                required: true,
                message: "",
                trigger: "blur"
              }
            ]
          },
        ]
      },
      {
        label: "责任部门",
        prop: "respDept",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "已更新",
        prop: "upFlag",
        width: 80,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: 'select',
        dicData: [
          {
            label: '是',
            value: true
          },
          {
            label: '否',
            value: false
          }
        ]
      },
      {
        label: "打印日期",
        prop: "printTime",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        align: "center",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "备注",
        prop: "cutRemarks",
        width: 180,
        placeholder: " ",
        span: 12,
        overHidden: true,
        type: "select",
        dicData: []
      },
    ]
  };
}

