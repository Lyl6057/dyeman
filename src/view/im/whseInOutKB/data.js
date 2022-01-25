/*
 * @Author: Lyl
 * @Date: 2022-01-12 15:46:05
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-25 15:49:28
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\data.js
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
const inExit = [
  {
    label: "A出入库口(7001扫码)",
    value: "A"
  },
  {
    label: "B出入库口",
    value: "B"
  },
  {
    label: "C出入库口(7002扫码)",
    value: "C"
  },
  {
    label: "D出入库口(7003扫码)",
    value: "D"
  },
  {
    label: "D1空笼暂存口",
    value: "D1"
  },
  {
    label: "F出入库口",
    value: "F"
  },
  {
    label: "G出入库口(7004扫码)",
    value: "G"
  }
];
const outExit = [
  {
    label: "A出入库口(7001扫码)",
    value: "A"
  },
  {
    label: "B出入库口",
    value: "B"
  },
  {
    label: "C出入库口(7002扫码)",
    value: "C"
  },
  {
    label: "D出入库口(7003扫码)",
    value: "D"
  },
  {
    label: "D1空笼暂存口",
    value: "D1"
  },
  {
    label: "E出库口",
    value: "E"
  },
  {
    label: "F出入库口",
    value: "F"
  },
  {
    label: "G出入库口(7004扫码)",
    value: "G"
  }
];

export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "操作类型",
        prop: "type",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        clearable: false,
        dicData: [
          {
            label: "入库",
            value: 1
          },
          {
            label: "出库",
            value: 2
          }
        ],
        change: val => {
          if (val.value == 1) {
            _this.formOp.column[2].dicData = inExit;
            _this.form.exit = inExit[0].value;
            // _this.formOp.column[5].display = false;
            _this.crud = [];
          } else {
            _this.formOp.column[2].dicData = outExit;
            // _this.form.exit = outExit[0].value;
            _this.form.exit = "C";
            // _this.formOp.column[5].display = true;
            _this.crud = [];
          }
        }
      },
      {
        label: "物料类别",
        prop: "goodsType",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          // {
          //   label: "胚布",
          //   value: 1
          // },
          {
            label: "成品布",
            value: 2
          }
        ],
        change: val => {
          _this.changeGoodsType(val.value);
        }
      },
      {
        label: "出/入库口",
        prop: "exit",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: []
      },
      {
        label: "载具状态",
        prop: "storageState",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "switch",
        dicData: [
          {
            label: "空",
            value: 1
          },
          {
            label: "占用",
            value: 0
          }
        ]
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: "货位码",
        prop: "storeSiteCode",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: "織單號",
        prop: "proName",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "缸号",
        prop: "vatNo",
        display: false,
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: "入仓员工号",
        prop: "clothChecker",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      }
    ]
  };
}

export function finishedCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: true,
    menuTitle: "称重",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "storeLoadCode",
        type: "count"
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum",
        decimals: 1
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
        label: "载具编号",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "成品编号",
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "存储位置",
        prop: "storeSiteCode",
        cell: true,
        width: 120,
        placeholder: " "
        // type: "select",
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        // dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: "匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "码长",
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        // precision: 1,
        minRows: 0,
        placeholder: " "
      },
      {
        label: "净重(KG)",
        prop: "netWeight",
        width: 100,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      // {
      //   label: "浮重(KG)",
      //   prop: "grossWeight",
      //   width: 100,
      //   align: "right",
      //   span: 6,
      //   cell: false,
      //   type: "number",
      //   minRows: 0,
      //   precision: 1,
      //   placeholder: " "
      //   // change: () => {}
      //   // type: "number",
      //   // precision: 1
      // },
      // {
      //   label: "浮重(LBS)",
      //   tip: "trọng lượng bì(LBS)",
      //   prop: "grossWeightLbs",
      //   width: 100,
      //   span: 8,
      //   minRows: 0,
      //   type: "number",
      //   precision: 1,
      //   align: "right",
      //   placeholder: " ",
      //   disabled: true
      // },

      // {
      //   label: "净重(LBS)",
      //   tip: "trọng lượng tịnh(LBS)",
      //   prop: "netWeightLbs",
      //   width: 100,
      //   span: 8,
      //   minRows: 0,
      //   type: "number",
      //   precision: 1,
      //   align: "left",
      //   placeholder: " "
      // },
      // {
      //   label: "纸管重量",
      //   prop: "paperTube",
      //   width: 100,
      //   align: "right",
      //   minRows: 0,
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1
      // },

      // {
      //   label: "QC扣减数量",
      //   prop: "qcTakeOut",
      //   width: 140,
      //   align: "right",
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   minRows: 0,
      //   precision: 1
      // },
      {
        label: "訂單號",
        prop: "poNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
      },
      {
        label: "客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label: "布类名称",
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },
      // {
      //   label: "客布代码",
      //   // tip: "Số màu",
      //   prop: "guestFabId",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      // {
      //   label: "成份要求",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 16,
      //   placeholder: " ",
      //   hide: true
      // },
      // {
      //   label: "款号",
      //   // tip: "Số màu",
      //   prop: "styleNo",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      {
        label: "顏色",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },
      {
        label: "产地",
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },

      {
        label: "备注",
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      },
      {
        label: "克重",
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 120,
        span: 8,
        cell: true,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label: "幅宽",
        // tip: "Tổng cộng(KG)",
        prop: "actualSideBreadth",
        width: 120,
        cell: true,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },

      // {
      //   label: "單位",
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label: "單位",
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },

      // {
      //   label: "已打印",
      //   prop: "isPrinted",
      //   type: "select",
      //   disabled: true,
      //   dicData: [
      //     {
      //       value: true,
      //       label: "是"
      //     },
      //     {
      //       value: false,
      //       label: "否"
      //     }
      //   ],
      //   span: 6,
      // },

      // {
      //   label: "打印时间(thời gian in)",
      //   prop: "printedTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // },

      {
        label: "验布员工号",
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true
      },
      {
        label: "验布时间",
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 160
      }
    ]
  };
}

export function clothCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "storeLoadCode",
        type: "count"
      },
      {
        label: " ",
        name: "clothWeight",
        type: "sum",
        decimals: 1
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
        label: "载具编号",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "货位码",
        prop: "storeSiteCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "織單號",
        prop: "proName",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      // {
      //   label: "验布记录",
      //   prop: "perching",
      //   width: 250,
      //   placeholder: " ",
      //   overHidden: true,

      // },
      // {
      //   label: "訂單號(Số đơn hàng)",
      //   prop: "poNo",
      //   width: 150,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true
      // },
      {
        label: "布票號",
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        sortable: true,
        span: 6,
        // sortable: true,
        overHidden: true
      },
      // {
      //   label: "客戶",
      //   prop: "customerName",
      //   width: 150,
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   display: false,
      //   overHidden: true
      // },
      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: true
      },
      // {
      //   label: "顏色(Màu sắc)",
      //   prop: "proColor",
      //   disabled: true, placeholder: " ",
      //   span: 6,
      //   width: 120,
      //   overHidden: true,
      //   hide: true
      // },

      // {
      //   label: "纱批(Lô sợi)",
      //   prop: "spi",
      //   width: 90,
      //   hide: true,
      //   span: 6,
      // },

      // {
      //   label: "纱牌(Nhãn hiệu sợi)",
      //   prop: "sp",
      //   width: 90,
      //   hide: true,
      //   span: 6,
      // },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: true,

      // },
      {
        label: "机号",
        prop: "loomNo",
        width: 95,
        hide: false,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入机号",
            trigger: "blur"
          }
        ],
        disabled: true
        // sortable: true,
      },
      {
        label: "值机工号",
        prop: "workNo",
        span: 8,
        placeholder: " ",
        width: 120,
        overHidden: true
      },
      {
        label: "验布员工号",
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 130,
        sortable: true,
        overHidden: true
      },
      // {
      //   label: "值机工号",
      //   prop: "workNo",
      //   width: 90,
      //   hide: false,
      //   span: 6,
      //   disabled: true,
      //   rules: [{
      //     required: true,
      //     message: "请输入值机工号",
      //     trigger: "blur"
      //   }],
      // },
      {
        label: "匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        // sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "毛重(KG)",
        prop: "realWeight",
        width: 100,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
        // type: "number",
        // precision: 1
      },
      {
        label: _this.$t("whseField.zl") + "(KG)",
        prop: "clothWeight",
        width: 100,
        align: "center",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label: "QC扣减数量",
        prop: "qcTakeOut",
        width: 130,
        align: "center",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label: "米长",
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        // sortable: true,
        type: "number",
        width: 100
      },
      // {
      //   label: "存储位置",
      //   prop: "storeSiteCode",
      //   cell: true,
      //   width: 120,
      //   placeholder: " ",
      //   overHidden: true,
      //   type: "select",
      //   props: {
      //     label: "locationCode",
      //     value: "locationCode"
      //   }
      // },
      // {
      //   label: "單位",
      //   prop: "weightUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },
      // {
      //   label: "長度",
      //   prop: "clothLength",
      //   width: 80,
      //   display: false
      // },

      // {
      //   label: "單位",
      //   prop: "lenUnit",
      //   width: 80,
      //   display: false,
      //   placeholder: " ",
      //   span: 6,
      //   type: "select",
      //   dicData: matUnit
      // },

      // {
      //   label: "已打印",
      //   prop: "isPrinted",
      //   type: "select",
      //   disabled: true,
      //   dicData: [
      //     {
      //       value: true,
      //       label: "是"
      //     },
      //     {
      //       value: false,
      //       label: "否"
      //     }
      //   ],
      //   span: 6,
      // },
      {
        label: "备注",
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      },
      // {
      //   label: "打印时间(thời gian in)",
      //   prop: "printedTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // },
      {
        label: "验布时间",
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 160
      }
    ]
  };
}

export function taskForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "入库",
            value: 1
          },
          {
            label: "出库",
            value: 2
          }
        ]
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },

      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 0
          }
        ]
      },
      {
        label: "完成状态",
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      }
    ]
  };
}

export function taskCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: false,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "入库",
            value: 1
          },
          {
            label: "出库",
            value: 2
          }
        ]
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        width: 120,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },
      {
        label: "货位码",
        prop: "storageCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 0
          }
        ]
      },
      {
        label: "完成状态",
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      },
      {
        label: "完成的信息",
        prop: "finishInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "返回的信息",
        prop: "returnInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "请求返回结果",
        prop: "returnStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "创建时间",
        prop: "createTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "响应时间",
        prop: "updateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "完成时间",
        prop: "endTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      }
    ]
  };
}
