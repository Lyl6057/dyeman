/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-25 15:52:48
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "审核状态",
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: "待审核"
          },
          {
            value: 1,
            label: "已审核"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label: "缸號",
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
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "开单员",
        prop: "serviceOperator",
        span: 6,
        placeholder: " "
      }

      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    columnBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    page: true,
    labelWidth: 130,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label: "重量",
        name: "clothWeight",
        type: "sum",
        decimals: 1
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
        label: "織造生產單號",
        prop: "weaveJobCode",
        tip: "MS sản xuất bp dệt",
        overHidden: true,
        sortable: true,
        width: 180,
        span: 6,
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
      {
        label: "交货日期",
        prop: "deliveDate",
        tip: "Ngày giao hàng",
        width: 130,
        span: 6,
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
        label: "合计数量",
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 150,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "客戶",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        sortable: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: "訂單編號",
        tip: "SỐ P.O",
        prop: "salPoNo",
        width: 180,
        sortable: true,
        span: 6,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },
      {
        label: "客人PO",
        prop: "contractNo",
        tip: "Số hợp đồng",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "交货地址",
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
      },
      {
        label: "顏色名稱",
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        sortable: true,
        width: 180,
        overHidden: true,
        span: 6,
      },
      {
        label: "色號",
        sortable: true,
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },

      {
        label: "布類描述",
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 12,
        sortable: true,
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
      },
      {
        label: "织厂",
        tip: "Xưởng dệt",
        prop: "weaveFactoryName",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: [
          {
            label: "S.POWER",
            value: "S.POWER"
          },
          {
            label: "Rise Sun",
            value: "Rise Sun"
          }
        ]
      },
      {
        label: "批号",
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },

      {
        label: "布匹成份",
        prop: "fabElements",
        tip: "Thành phần",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        hide: true
      },

      {
        label: "疋數",
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label: "合染缸號",
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 12,
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
        label: "訂單數量(kg)",
        tip: "Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        change: () => {
          if (_this.form.poAmountKg) {
            return;
          }
          _this.$nextTick(() => {
            _this.form.dyeVatType =
              Number(_this.form.poAmountKg) / 350 >= 4
                ? "4"
                : Math.ceil(Number(_this.form.poAmountKg) / 350) + "";
          });
        }
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
      //   span: 6,
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
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label: "紗批",
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true
      },
      {
        label: "紗缸",
        tip: "Lô sợi nhà máy",
        prop: "yarnCylinder",
        span: 6,
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
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "訂單總缸數",
        prop: "poVatCount",
        tip: "TC ? Bồn",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "当前第幾缸",
        prop: "vatIndex",
        tip: "Bồn thứ",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "筒徑(Inch)",
        prop: "tubeDiam",
        tip: "Khổ máy",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label: "针距",
        tip: "Gauge",
        prop: "needleDist",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },
      {
        label: "紗長",
        tip: "Độ dài sợi",
        prop: "yarnLength",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80
        // tyep: "number"
      },
      {
        label: "幅寬(Inch)",
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label: "胚重g/m²",
        tip: "Trọng lượng",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        // type: "number",
        placeholder: " "
      },
      {
        label: "对色标准/缸号",
        tip: "Tiêu chuẩn so màu / số bồn nhuộm",
        prop: "compVatNo",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "规格参考",
        tip: "Tiêu chuẩn chất lượng",
        prop: "specParam",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "对色光源",
        tip: "Nguồn sáng so màu",
        prop: "compLightSource",
        width: 120,
        hide: true,
        span: 12,
        placeholder: " ",
        multiple: true,
        type: "select",
        dicData: getDIC("sal_colorLights")
      },

      {
        label: "生产用机种",
        prop: "dyeVatType",
        tip: "Mô hình",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "1T",
            value: "1"
          },
          {
            label: "2T",
            value: "2"
          },
          {
            label: "3T",
            value: "3"
          },
          {
            label: "4T",
            value: "4"
          }
        ]
      },
      {
        label: "开单员",
        tip: "开单员",
        prop: "serviceOperator",
        width: 100,
        span: 6,
        disabled: true,
        sortable: true,
        // hide: true,
        placeholder: " "
      },

      // {
      //   label: "审核",
      //   // tip:"Nhận hàng yêu cầu",
      //   prop: "auditor",
      //   width: 80,
      //   span: 6,
      //   hide: true,
      //   placeholder: " "
      // },
      {
        label: "收货要求",
        tip: "Nhận hàng yêu cầu",
        prop: "acceptRequirement",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "QC评语",
        prop: "qcComments",
        tip: "Nhận xét",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      // {
      //   label: "列印時間",
      //   prop: "printDate",
      //   placeholder: " ",
      //   width: 90,
      //   hide: true,
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   disabled: true,
      //   display: true
      // },

      {
        label: "ET序号",
        prop: "etSn",
        tip: "ET序号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },

      {
        label: "#STLYLE 款号",
        prop: "styleNo",
        tip: "#STLYLE 款号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "代码",
        prop: "custStyleCode",
        tip: "MÃ CODE VẢI XUẤT HÀNG 代码",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "运转单状态",
        tip: "state",
        disabled: false,
        prop: "runState",
        width: 120,
        type: "switch",
        dicData: [
          {
            label: "正常",
            value: "1"
          },
          {
            label: "草稿",
            value: "0"
          }
        ],
        hide: false,
        placeholder: " ",
        span: 6
      },
      {
        label: "备注",
        prop: "remark",
        tip: "Ghi chú",
        span: 24,
        hide: true,
        width: 80,
        placeholder: " "
      },
      {
        label: "创建时间",
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        overHidden: true,
        placeholder: "创建时间",
        sortable: true
      },
      {
        label: "修改时间",
        prop: "modifiDate",
        width: 130,
        span: 6,
        type: "date",
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        placeholder: "修改时间",
        sortable: true
      },
      {
        label: "打印日期",
        prop: "printDate",
        span: 6,
        placeholder: " ",
        width: 150,
        overHidden: true,
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label: "幅寬連邊",
            tip: "Khổ rộng Tiếp giáp",
            prop: "breadthBorder",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label: "洗前(克重)",
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label: "成品/洗後(克重)",
            tip: "Trọng lượng Giặt sau",
            prop: "gramWeightAfter",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label: "縮水(直縮)",
            tip: "Co rút thẳng (L)",
            prop: "shrinkLenth",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },
          {
            label: "縮水(橫縮)",
            tip: "Co rút ngang(W)",
            prop: "shrinkWidth",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
            // type: "number"
          },

          {
            label: "縮水(扭度)",
            tip: "Độ méo (N)",
            prop: "shrinkNear",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },
          {
            label: "縮水(循環)",
            tip: "Tuần hoàn(R)",
            prop: "shrinkRotate",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "number"
          },

          {
            label: "挂干",
            tip: "Treo khô ",
            prop: "hangDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: 0
              },
              {
                label: "是",
                value: 1
              }
            ]
          },
          {
            label: "平干",
            tip: "Phơi phẳng ",
            prop: "flatDry",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                label: "否",
                value: 0
              },
              {
                label: "是",
                value: 1
              }
            ]
          },
          {
            label: "拋干",
            tip: " Vắt khô ",
            prop: "throwDry",
            span: 6,
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
            span: 6,
            hide: true,
            width: 80,
            type: "number",
            placeholder: " "
          },

          {
            label: "锁布头",
            tip: "Khóa đầu vải",
            prop: "forClothLockJoin",
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
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
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },

          {
            label: "纸筒(KG)",
            tip: "Thoi giấy",
            prop: "packPaperTube",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "标签",
            prop: "packLabel",
            tip: "Tem",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "毛重",
            prop: "packGw",
            tip: "Sợi nặng ",
            span: 6,
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
            span: 6,
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
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          }
        ]
      }
    ]
  };
}

export function mainWForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "审核状态",
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: "待审核"
          },
          {
            value: 1,
            label: "已审核"
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label: "生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "客戶名稱",
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      {
        label: "開機日期",
        prop: "startDate",
        span: 6,
        placeholder: " ",
        tip: "Sắp xếp ngày dệt"
      },
      {
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " ",
        tip: "color number"
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        placeholder: " ",

        tip: "Mã số máy dệt"
      },
      {
        label: "制單人",
        prop: "creator",
        span: 6,
        placeholder: " ",
        tip: "Lập đơn"
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}

export function mainWCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    columnBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    selection: true,
    // labelPosition: 'top',
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
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: "请選擇訂單編號",
        sortable: true,
        overHidden: true
        // rules: [
        //   {
        //     required: true,
        //     message: "请選擇訂單編號",
        //     trigger: "blur"
        //   }
        // ]
        // click: () => {
        //   _this.visible = true
        // }
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
        rules: [
          {
            required: true,
            message: "请選擇出胚布日期",
            trigger: "blur"
          }
        ],
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
        rules: [
          {
            required: true,
            message: "请選擇成品期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "营销单号",
        prop: "marketOrder",
        tip: "Mã số dệt bộ phận Sales",
        span: 6,
        width: 200,
        overHidden: true
      },
      {
        label: "客戶名稱",
        prop: "custName",
        overHidden: true,
        width: 200,
        sortable: true,
        span: 6,
        placeholder: "请選擇客戶名稱",
        type: "select",
        dicData: cust,
        tip: "Khách hàng",
        change: () => {
          _this.$nextTick(() => {
            _this.form.custCode = _this.form.custName;
          });
        }
      },
      {
        label: "客戶編號",
        prop: "custCode",
        overHidden: true,
        disabled: false,
        tip: "Khách hàng",
        width: 120,
        span: 6,
        placeholder: "请選擇客戶名稱",
        rules: [
          {
            required: true,
            message: "请選擇客戶名稱",
            trigger: "blur"
          }
        ]
      },

      {
        label: "開機日期",
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        tip: "Sắp xếp ngày dệt",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇開機日期",
        sortable: true,
        span: 6,
        rules: [
          {
            required: true,
            message: "请選擇開機日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "織胚數量",
        prop: "amount",
        width: 100,
        placeholder: "请输入織胚數量",
        span: 6,
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入織胚數量",
        //     trigger: "blur"
        //   }
        // ],
        type: "number",
        align: "left",
        tip: "Số lượng vải mộc"
      },
      {
        label: "客户批号",
        prop: "custPoNo",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Ckhách hàng PO",
        hide: true
      },
      {
        label: "布类代码",
        prop: "custFabricCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Fabric Code",
        hide: true
      },
      {
        label: "季节",
        prop: "seasonCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Mùa hàng",
        hide: true
      },

      // {
      //   label: "纱牌",
      //   prop: "yarnBrand",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Nhà cung cấp sợi",
      //   hide: true
      // },
      // {
      //   label: "纱批",
      //   prop: "yarnBatchNo",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lót sợi",
      //   hide: true
      // },
      // {
      //   label: "纱缸",
      //   prop: "yarnCylinder",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lô sợi nhà máy",
      //   hide: true
      // },
      {
        label: "纱线数量",
        prop: "yarnAmount",
        width: 100,
        placeholder: "请输入纱线数量",
        span: 6,
        type: "number",
        align: "left",
        tip: " Số lượng sợi "
      },
      {
        label: "合同数量",
        prop: "contractAmount",
        width: 100,
        placeholder: "请输入合同数量",
        span: 6,
        type: "number",
        align: "left",
        tip: "Số lượng của hợp đồng"
      },

      {
        label: "布類描述",
        prop: "fabricDesc",
        overHidden: true,
        width: 250,
        span: 12,
        sortable: true,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ],
        tip: "Loại vải "
      },
      {
        label: "顏色名稱",
        prop: "colorName",
        tip: "Màu sắc",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: "请選擇顏色名稱",
        rules: [
          {
            required: true,
            message: "请選擇顏色名稱",
            trigger: "blur"
          }
        ],
      },
      {
        label: "色號",
        prop: "colorCode",
        placeholder: " ",
        width: 150,
        span: 6,
        overHidden: true,
        tip: "Số màu"
        // row: true
      },

      {
        label: "纤维成份比例",
        prop: "fiberComp",
        placeholder: " ",
        overHidden: true,
        width: 250,
        tip: "Tỷ lệ sơ sợi",
        span: 12,
        hide: true,
      },
      {
        label: "创建时间",
        prop: "createTime",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        overHidden: true,
        placeholder: "创建时间",
        sortable: true
      },
      {
        label: "修改时间",
        prop: "upateTime",
        width: 130,
        span: 6,
        type: "date",
        overHidden: true,
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: false,
        placeholder: "修改时间",
        sortable: true
      }
    ],
    group: [
      {
        icon: " ",
        label: " ",
        prop: "group1",
        column: [
          {
            label: "胚布要求",
            prop: "calicoFabricRequire",
            placeholder: " ",
            overHidden: true,
            width: 250,
            hide: true,
            type: "switch",
            tip: "Yêu cầu khác",
            dicData: [
              {
                value: "开幅",
                label: "开幅(Xẻ biên)"
              },
              {
                value: "圆筒",
                label: "圆筒(Không xẻ biên)"
              }
            ],
            span: 6
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
            label: "成品/洗後(克重)",
            prop: "gramWeight",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt"
          },
          {
            label: "門幅",
            prop: "breadth",
            tip: "Thực dụng",
            width: 90,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },
          {
            label: "橫縮",
            prop: "horizonShrink",
            tip: "Co rút ngang",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "直縮",
            prop: "verticalShrink",
            tip: "Co rút thẳng",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
          },
          {
            label: "機號",
            prop: "mathineCode",
            span: 12,
            width: 180,
            tip: "Mã số máy dệt",
            placeholder: " ",
            overHidden: true,
            readonly: true,
            click: () => {
              if (_this.form.weaveJobId) {
                _this.tabs = "機號信息";
                _this.crudOp = machineCrud(_this);
                _this.visible = true;
              } else {
                _this.$tip.warning("请先保存织单信息!");
              }
            }
            // rules: [
            //   {
            //     required: true,
            //     message: "请輸入機號",
            //     trigger: "blur"
            //   }
            // ]
          },
          {
            label: "筒径(inch)",
            tip: "Khổ máy ",
            prop: "cylinderInch",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },

          {
            label: "针距（G）",
            tip: "Số kim mỗi inch",
            prop: "guage",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },
          {
            label: "其他要求",
            prop: "otherRequire",
            tip: "Yêu cầu khác",
            placeholder: " ",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: "針寸數",
            prop: "needleInch",
            tip: "Tổng số kim",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
            // type: "number",
          },
          {
            label: "縂針數",
            tip: "縂針數",
            prop: "needleNumber",
            width: 80,
            placeholder: " ",
            type: "number",
            span: 6,
            hide: true
          },
          {
            label: "紗長",
            tip: "Độ dài sợi",
            prop: "yarnLength",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },
          // {
          //   label: "更改紗長",
          //   prop: "yarnLenghtChanged",
          //   tip: "Thay đổi độ dài sợi",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6,
          //   click: () => {
          //     if (!_this.form.weaveJobId) {
          //       _this.$tip.error("請先保存通知單信息!");
          //       return;
          //     }
          //     _this.crudOp = longCrud(_this);
          //     _this.visible = true;
          //     _this.tabs = "更改紗長";
          //   }
          // },
          // {
          //   label: "胚重(左)",
          //   prop: "calicoLeft",
          //   tip: "Trọng lượng vải mộc trái",
          //   width: 90,
          //   hide: true,
          //   span: 6,
          //   placeholder: " "
          // },
          {
            label: "胚重",
            prop: "calicoMiddle",
            tip: "Trọng lượng vải mộc giữa",
            width: 90,
            placeholder: " ",
            hide: true,
            span: 6
          },

          // {
          //   label: "胚重(右)",
          //   prop: "calicoRight",
          //   tip: "Trọng lượng vải mộc phải",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },
          {
            label: "成衣面",
            prop: "readyMadeFabric",
            tip: "Mặt thành vải",
            width: 120,
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: "落布封度",
            prop: "fallCloth",
            tip: "Độ lớn cuộn vải",
            span: 6,
            placeholder: " ",
            hide: true,
            width: 90
          },

          {
            label: "機速",
            prop: "mathineSpeed",
            tip: "Tốc độ máy",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "筒口高度",
            tip: "Độ hở mâm trên dưới",
            prop: "cylinderHeight",
            span: 6,
            hide: true,
            placeholder: " ",
            width: 80
          },

          {
            label: "織機食位",
            prop: "weaveEnter",
            tip: "Vị trí kim dệt",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },

          {
            label: "布架寬度",
            prop: "clothRackWidth",
            tip: "Khổ vải trên giá vải",
            placeholder: " ",
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: "上機工藝",
            tip: "công nghệ lên máy",
            prop: "operatProcess",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: "循環(自動間)",
            tip: "Tuần hoàn (vải sọc tự động)",
            prop: "loopSpace",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "布架資料",
            prop: "clothRackDesc",
            tip: "Thông số giá vải",
            hide: true,
            span: 6,
            placeholder: " "
          },
          {
            label: "輸送盤資料",
            tip: "Thông số đĩa dây Cu-roa",
            prop: "transPlate",
            hide: true,
            placeholder: " ",
            placeholder: " ",
            span: 12
          },
          {
            label: "轉速/重量/匹",
            tip: "Số đường dệt/trọng lượng/cây",
            prop: "rotaSpeed",
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
          },
          {
            label: "织单状态",
            tip: "state",
            disabled: false,
            prop: "weaveState",
            type: "switch",
            dicData: [
              {
                label: "正常",
                value: 0
              },
              {
                label: "草稿",
                value: 1
              }
            ],
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: "製單人",
            prop: "creator",
            span: 6,
            hide: false,
            width: 100,
            tip: "Lập đơn",
            disabled: true,
            rules: [
              {
                required: true,
                message: "请输入制单人",
                trigger: "blur"
              }
            ]
            // type: "select",
            // dicData:
            //   postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
          }
        ]
      }
    ]
  };
}
