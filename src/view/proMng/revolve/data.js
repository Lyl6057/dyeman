/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-19 14:52:47
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

const unit = getDIC("sal_breadthUnit");
let matUnit = getDIC("bas_matUnit");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "染缸",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "织造生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        span: 6,
        placeholder: " "
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: "发单日期",
        prop: "workDate",
        span: 6,
        placeholder: " "
      },
      {
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "开单员",
        prop: "operator",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 8,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
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
        span: 8,
        placeholder: " "
      },
      {
        label: "客戶名稱",
        prop: "custId",
        span: 8,
        placeholder: " ",
        type: "tree",
        dicData: cust
      },
      {
        label: "订单狀態",
        prop: "poStatus",
        span: 8,
        placeholder: " "
      }
    ]
  };
}

let cust = getDicT("basCustomer", "custName", "custCode");

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
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 8,
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
        label: "开單日期",
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 130,
        span: 8,
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
      {
        label: "交货日期",
        prop: "deliveDate",
        tip: "Ngày giao hàng",
        width: 130,
        span: 8,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇交货日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇交货日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "織造生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        width: 180,
        span: 8,
        disabled: false,
        placeholder: "請選擇織造生產單號",
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = "选择织造通知单";
          _this.choiceV = true;
        }
      },
      {
        label: "客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 8,
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
        span: 8,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },
      {
        label: "色號",
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "交货地址",
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 16,
        disabled: false,
        placeholder: " "
      },

      {
        label: "顏色名稱",
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 8,
        placeholder: " "
      },
      {
        label: "布類描述",
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 16,
        placeholder: " "
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },
      {
        label: "批号",
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label: "布匹成分",
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 16,
        hide: true
      },
      {
        label: "织厂",
        tip: "Xưởng dệt",
        prop: "weaveFactoryName",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label: "合染缸號",
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 16,
        disabled: false,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },
      {
        label: "疋數",
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "合计",
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 100,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label: "訂單數量(公斤)",
        tip: "Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.poAmountLb = (_this.form.poAmountKg * 2.2046226).toFixed(2)
        //   })
        // }
      },
      // {
      //   label: "訂單數量(磅)",
      //   prop: "poAmountLb",
      //   width: 120,
      //   span: 8,
      //   type: "number",
      //   align: "right",
      //   placeholder: " ",
      //   hide: true,
      //   disabled: true,
      // },
      {
        label: "紗牌",
        prop: "yarnCard",
        tip: "Nhãn hiệu sợi",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label: "紗批",
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label: "紗缸",
        tip: "Lô sợi nhà máy",
        prop: "yarnG",
        span: 8,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label: "顏色種類數量",
        tip: "Số lượng màu",
        prop: "poColorCount",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "訂單總缸數",
        prop: "poVatCount",
        tip: "TC ? Bồn",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "当前第幾缸",
        prop: "vatIndex",
        tip: "Bồn thứ",
        width: 120,
        span: 8,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "筒徑(Inch)",
        prop: "tubeDiam",
        tip: "Khổ máy",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label: "针距",
        tip: "Gauge",
        prop: "needleDist",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "紗長",
        tip: "Độ dài sợi",
        prop: "yarnLength",
        span: 8,
        hide: true,
        placeholder: " ",
        width: 80,
        tyep: "number"
      },
      {
        label: "幅寬(Inch)",
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 8,
        type: "number",
        placeholder: " "
      },
      {
        label: "胚重g/m²",
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 8,
        type: "number",
        placeholder: " "
      },
      {
        label: "对色标准/缸号",
        tip: "Tiêu chuẩn so màu / số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        span: 8,
        placeholder: " "
      },
      {
        label: "对色光源",
        tip: "Nguồn sáng so màu",
        prop: "compLightSource",
        width: 120,
        hide: true,
        span: 8,
        placeholder: " ",
        type: "select",
        dicData: getDIC("sal_colorLights")
      },
      {
        label: "规格参考",
        tip: "Tiêu chuẩn chất lượng",
        prop: "specParam",
        width: 120,
        hide: true,
        span: 16,
        placeholder: " "
      },
      {
        label: "开单员",
        tip: "开单员",
        prop: "mateStockMan",
        width: 80,
        span: 8,
        hide: true,
        placeholder: " "
      },
      {
        label: "收货要求",
        tip: "Nhận hàng yêu cầu",
        prop: "acceptRequirement",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "审核",
        // tip:"Nhận hàng yêu cầu",
        prop: "auditor",
        width: 80,
        span: 8,
        hide: true,
        placeholder: " "
      },

      {
        label: "QC评语",
        prop: "qcComments",
        tip: "Nhận xét",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "列印時間",
        prop: "printDate",
        placeholder: " ",
        width: 90,
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 8,
        display: true
      },
      {
        label: "备注",
        prop: "remark",
        tip: "Ghi chú",
        span: 16,
        hide: true,
        width: 80,
        placeholder: " "
      }
    ],
    group: [
      {
        icon: "el-icon-info",
        label: "成品规格 Quy cách thành phẩm Y/C",
        prop: "basic1",
        column: [
          {
            label: "幅寬實用",
            prop: "breadthActual",
            tip: "Khổ rộng Thực dụng ",
            width: 90,
            hide: true,
            span: 8,
            type: "number",
            placeholder: " "
          },
          {
            label: "幅寬連邊",
            tip: "Khổ rộng Tiếp giáp",
            prop: "breadthBorder",
            width: 90,
            hide: true,
            span: 8,
            type: "number",
            placeholder: " "
          },
          {
            label: "洗前(克重)",
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 8,
            type: "number",
            placeholder: " "
          },

          {
            label: "成品/洗後(克重)",
            tip: "Trọng lượng Giặt sau",
            prop: "gramWeightAfter",
            width: 120,
            hide: true,
            span: 8,
            type: "number",
            placeholder: " "
          },

          {
            label: "縮水(直縮)",
            tip: "Co rút thẳng (L)",
            prop: "shrinkLenth",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },
          {
            label: "縮水(橫縮)",
            tip: "Co rút ngang(W)",
            prop: "shrinkWidth",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },

          {
            label: "縮水(扭度)",
            tip: "Độ méo (N)",
            prop: "shrinkNear",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },
          {
            label: "縮水(循環)",
            tip: "Tuần hoàn(R)",
            prop: "shrinkRotate",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },

          {
            label: "挂干",
            tip: "Treo khô ",
            prop: "hangDry",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },
          {
            label: "平干",
            tip: "Phơi phẳng ",
            prop: "flatDry",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },
          {
            label: "拋干",
            tip: " Vắt khô ",
            prop: "throwDry",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          }
        ]
      },

      {
        icon: "el-icon-info",
        label: "备布要求 Sự yêu cầu chuẩn bị vải",
        prop: "basic2",
        column: [
          {
            label: "分管",
            tip: "Phân ống",
            prop: "forClothSeparatePipe",
            span: 8,
            hide: true,
            width: 80,
            type: "number",
            placeholder: " "
          },

          {
            label: "锁布头",
            tip: "Khóa đầu vải",
            prop: "forClothLockJoin",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "翻布",
            tip: " Lật vải",
            prop: "forClothTurnOver",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "合缸标记",
            tip: " Ký hiệu số bồn nhuộm",
            prop: "forClothTogetherVat",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "顺毛",
            tip: "Chiều lông xuôi",
            prop: "forClothOrderHair",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "逆毛",
            tip: "Chiều lông ngược ",
            prop: "forClothAgainstHair",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-info",
        label: "包装要求 Sự yêu cầu đóng gói",
        prop: "basic3",
        column: [
          {
            label: "胶袋",
            tip: "Bọc nylon",
            prop: "packBag",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
          },

          {
            label: "纸筒(KG)",
            tip: "Thoi giấy",
            prop: "packPaperTube",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "标签",
            prop: "packLabel",
            tip: "Tem",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "毛重",
            prop: "packGw",
            tip: "Sợi nặng ",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "净重",
            prop: "packNw",
            tip: "TL tịnh",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: false
              },
              {
                label: "是",
                value: true
              }
            ]
          },
          {
            label: "其他",
            prop: "packOther",
            tip: "Khác ",
            span: 8,
            hide: true,
            width: 80,
            placeholder: " "
          }
        ]
      }
    ]
  };
}
export function bfOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 179px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "clothWeight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "布票号",
        prop: "clothNoteCode",
        overHidden: true,
        // width: 140,
        span: 8,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label: "重量",
        prop: "clothWeight",
        overHidden: true,
        width: 110,
        span: 8,
        placeholder: " ",
        type: "number",
        align: "right"
      }
    ]
  };
}
export function testOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "项目",
        prop: "testName",
        overHidden: true,
        width: 180,
        span: 8,
        disabled: false,
        cell: true
      },
      {
        label: "标准",
        prop: "testItemName",
        overHidden: false,
        width: 160,
        span: 8,
        disabled: false,
        placeholder: " ",
        cell: true
      },
      {
        label: "要求",
        prop: "testItemContent",
        overHidden: false,
        // width: 140,
        span: 8,
        placeholder: " ",
        cell: true
      }
    ]
  };
}
export function itemOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "项目名称",
        prop: "jobItemName",
        overHidden: false,
        width: 140,
        span: 8,
        disabled: false,
        // sortable: true,
        cell: true
      },
      {
        label: "备注说明",
        prop: "remark",
        overHidden: false,
        // width: 140,
        span: 8,
        placeholder: " ",
        align: "center",
        type: "switch",
        dicData: [
          {
            label: "否",
            value: "0"
          },
          {
            label: "是",
            value: "1"
          }
        ],
        cell: true
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
        display: false
      },
      {
        label: "訂單號",
        prop: "poNo",
        width: 150,
        span: 8,
        sortable: true
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 8,
        type: "select",
        dicData: cust
      },
      {
        label: "订单日期",
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
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
      }
    ]
  };
}

// {
//   icon: 'el-icon-info',
//   label: '生产项目',
//   prop: 'basic',
//   column: [
//     {
//       label: "洗水",
//       prop: "xishui",
//       width: 120,
//       hide: true,
//       span: 8,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "单染",
//       prop: "drm",
//       width: 120,
//       hide: true,
//       span: 8,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "双染",
//       prop: "sr",
//       width: 120,
//       hide: true,
//       span: 8,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "三染",
//       prop: "sanran",
//       width: 120,
//       hide: true,
//       span: 8,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "食毛",
//       prop: "shimao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "碱缩/丝光",
//       prop: "jssg",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "定胚",
//       prop: "dingpei",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "预缩",
//       prop: "yusuo",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "面抓毛",
//       prop: "mianzhuamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底抓毛",
//       prop: "dizhuamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面抓毛",
//       prop: "liangmianzhuamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面烧毛",
//       prop: "msm",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底烧毛",
//       prop: "dismao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面烧毛",
//       prop: "liangmiansmao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "普通剪毛",
//       prop: "ptzhuamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "绒布胚布两刀",
//       prop: "dizhudddamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "绒布成品三刀",
//       prop: "liangmianssszhuamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面磨毛",
//       prop: "msmss",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底磨毛",
//       prop: "dismqqao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面磨毛",
//       prop: "liangmiassnsmao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面吸毛",
//       prop: "mianxim",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底吸毛",
//       prop: "dizhudxxddamao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面吸毛",
//       prop: "lmximao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面刷毛",
//       prop: "msmsss",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底刷毛",
//       prop: "dismqssqao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面刷毛",
//       prop: "liangmiassssnsmao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "定成品",
//       prop: "lmximdcpao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "烘干",
//       prop: "msmsssss",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "浆边",
//       prop: "jiangbian",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "浆切边",
//       prop: "jiangqiebian",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "活性印花",
//       prop: "hxyh",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "胶浆印花",
//       prop: "dismqssssqao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "拔白",
//       prop: "babsi",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "手感",
//       prop: "lmxisgmdcpao",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "抗静电整理",
//       prop: "kdjzl",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "抗紫外线整理",
//       prop: "kzwxzl",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "抗菌防臭整理",
//       prop: "kjfczl",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "保湿整理",
//       prop: "bszl",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "吸湿速干整理",
//       prop: "xssgzl",
//       span: 8,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//   ]
// },
