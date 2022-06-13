/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-10 08:43:06
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let cust = getDicT("basCustomer", "custName", "custCode");

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
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
        label: "开单日期",
        prop: "workDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "工厂色號",
        prop: "colorCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "开单员",
        prop: "serviceOperator",
        span: 6,
        placeholder: " "
      },
      {
        label: "审核状态",
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 1,
            label: "已审核"
          },
          {
            value: 0,
            label: "待审核"
          }
        ]
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
        placeholder: " "
      },
      {
        label: "客戶名稱",
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "tree",
        dicData: cust
      },
      {
        label: "订单狀態",
        prop: "poStatus",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    // columnBtn: false,
    page: true,
    labelWidth: 120,
    selection: true,
    columnBtn: true,
    selectable: (row, index) => {
      return row.auditState != 1 && row.serviceOperator == parent.userID;
    },
    showSummary: true,
    sumColumnList: [
      {
        label: "合计:",
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
        width: 180,
        sortable: true,
        overHidden: true,
        span: 6
      },
      {
        label: "工厂色號",
        tip: "Số màu",
        prop: "colorCode",
        width: 150,
        sortable: true,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "客色號",
        tip: "khách hàng số màu",
        prop: "custColorNo",
        width: 150,
        span: 6,
        sortable: true,
        overHidden: true,
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
          // _this.$nextTick(() => {
          //   _this.form.dyeVatType =
          //     Number(_this.form.poAmountKg) / 350 >= 4
          //       ? "4"
          //       : Math.ceil(Number(_this.form.poAmountKg) / 350) + "";
          // });
        }
        // change: () => {
        //   _this.$nextTick(() => {
        //     _this.form.poAmountLb = (_this.form.poAmountKg * 2.2046226).toFixed(2)
        //   })
        // }
      },
      {
        label: "投胚数量",
        tip: "Tổng cộng(KG)",
        prop: "clothWeight",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入投胚数量",
            trigger: "blur"
          }
        ],
        change: val => {
          if (val.value && _this.form.avgEachWeightKg) {
            _this.$nextTick(() => {
              _this.form.pidCount = Number(
                _this.form.clothWeight / _this.form.avgEachWeightKg
              ).toFixed(0);
              _this.form.pidCount =
                _this.form.pidCount == "0" ? 1 : _this.form.pidCount;
            });
          }
          if (
            _this.form.dyeVatType &&
            val.value > Number(_this.form.dyeVatType)
          ) {
            _this.$nextTick(() => {
              _this.form.clothWeight = Number(_this.form.dyeVatType);
              _this.$tip.error("合计重量不能大于设定生产机种重量!");
            });
          }
        }
      },
      {
        label: "疋重",
        // tip: "state",
        disabled: false,
        prop: "avgEachWeightKg",
        width: 120,
        labelWidth: 60,
        type: "switch",
        dicData: [
          {
            label: "30",
            value: 30
          },
          {
            label: "58",
            value: 58
          }
        ],
        hide: false,
        placeholder: " ",
        span: 4,
        change: val => {
          if (val.value && _this.form.clothWeight) {
            _this.$nextTick(() => {
              _this.form.pidCount = Number(
                _this.form.clothWeight / _this.form.avgEachWeightKg
              ).toFixed(0);
            });
          }
        }
      },
      {
        label: "单位",
        prop: "wmUnit",
        tip: "unit",
        labelWidth: 60,
        width: 80,
        span: 4,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "KG",
            value: "KG"
          },
          {
            label: "LBS",
            value: "LBS"
          },
          {
            label: "套/Bộ",
            value: "SET"
          }
        ]
      },
      {
        label: "疋數",
        prop: "pidCount",
        tip: "Cây",
        labelWidth: 70,
        width: 100,
        span: 4,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "染整数量",
        prop: "dyeClothWeight",
        tip: "Số lượng vải mộc",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        hide: true,
        rules: [
          {
            required: true,
            message: "请输入染整数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "拆缸重量",
        prop: "divdCw",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        type: "number",
        placeholder: " "
      },
      {
        label: "布类代码",
        prop: "fabricCode",
        tip: "Fabric Code",
        span: 6,
        width: 120,
        placeholder: " ",
        sortable: true,
        disabled: false,
        hide: true
      },
      {
        label: "批号",
        prop: "yarnBatchNo",
        tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        sortable: true,
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
        sortable: true,
        hide: true
      },
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
        label: "合染缸號",
        tip: "Số bồn nhuộm chung",
        prop: "mergVatNo",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        hide: true,
        type: "select",
        dicData: [],
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
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
        label: "布類描述",
        prop: "fabName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 12
        // rules: [{
        //   required: true,
        //   message: "请選擇布類描述",
        //   trigger: "blur"
        // }],
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
        label: "顏色種類數量",
        tip: "Số lượng màu",
        prop: "poColorCount",
        width: 120,
        span: 6,
        type: "number",
        hide: true,
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
        label: "生产用机种",
        prop: "dyeVatType",
        tip: "Mô hình",
        span: 6,
        hide: true,
        width: 80,
        placeholder: " ",
        type: "select",
        dicData: getDicT(
          "baseEquipmentCategoryList",
          "categoryName",
          "setCapacity",
          { parentId: "dev-12" }
        )
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
        label: "STLYLE款号",
        prop: "styleNo",
        tip: "#STLYLE 款号",
        span: 12,
        hide: true,
        width: 80,
        placeholder: " "
      },
      // {
      //   label: "ET序号",
      //   prop: "etSn",
      //   tip: "ET序号",
      //   span: 6,
      //   hide: true,
      //   width: 80,
      //   placeholder: " "
      // },
      {
        label: "代码",
        prop: "custStyleCode",
        tip: "MÃ CODE VẢI XUẤT HÀNG 代码",
        span: 5,
        hide: true,
        width: 60,
        placeholder: " "
      },
      {
        label: "头缸/缸差",
        // tip: "state",
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "radio",
        dicData: [
          {
            label: "头缸",
            value: "1"
          },
          {
            label: "缸差",
            value: "2"
          },
          {
            label: "翻单头缸",
            value: "3"
          }
        ],
        hide: false,
        placeholder: " ",
        span: 6,
        change: () => {
          _this.$nextTick(() => {
            _this.typeChange();
          });
        }
      },
      {
        label: "办单/大货",
        tip: "Hàng mẫu / Hàng đại trà",
        disabled: false,
        prop: "salType",
        width: 150,
        type: "switch",
        dicData: [
          {
            label: "办单(Hàng mẫu)",
            value: "sample"
          },
          {
            label: "大货(Hàng đại trà)",
            value: "big"
          }
        ],
        hide: false,
        placeholder: " ",
        overHidden: true,
        span: 7,
        change: () => {
          _this.$nextTick(() => {
            _this.typeChange();
          });
        }
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
          },
          {
            label: "已打印",
            value: "3"
          }
        ],
        hide: false,
        placeholder: " ",
        span: 6
      },
      {
        label: "开单员",
        tip: "开单员",
        prop: "serviceOperator",
        width: 80,
        span: 6,
        disabled: true,
        display: false,
        // hide: true,
        placeholder: " "
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
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "备注",
        prop: "remark",
        tip: "Ghi chú",
        type: "textarea",
        minRows: 2,
        span: 24,
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
            label: "洗前克重",
            tip: "Trọng lượng Giặt trước",
            prop: "gramWeightBefor",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " "
          },

          {
            label: "洗後克重",
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
export function bfOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 145px)",
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
      },
      // {
      //   label: " ",
      //   name: "$weight",
      //   type: "sum"
      // },
      {
        label: " ",
        name: "clothNoteCode",
        type: "count"
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
        span: 6,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label: "重量",
        prop: "clothWeight",
        overHidden: true,
        width: 70,
        span: 6,
        placeholder: " ",
        // type: "select",
        // dicData: getDicT("proClothNote", "clothWeight", "noteCode"),
        align: "right",
        hide: false
      }
      // {
      //   label: "剩余重量",
      //   prop: "weight",
      //   overHidden: true,
      //   width: 90,
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   props: {
      //     label: "weight",
      //     value: "custTicket"
      //   },
      //   dicData: whseData,
      //   align: "right",
      //   hide: false
      // },
      // {
      //   label: "剩余重量",
      //   prop: "$weigh1t",
      //   overHidden: true,
      //   width: 90,
      //   span: 6,
      //   placeholder: " ",
      //   align: "right",
      //   hide: true
      // },
      // {
      //   label: "运转重量",
      //   prop: "clothWeight",
      //   overHidden: true,
      //   precision: 1,
      //   width: 90,
      //   span: 6,
      //   placeholder: " ",
      //   type: "number",
      //   align: "right",
      //   cell: true,
      //   change: val => {
      //     _this.$nextTick(() => {
      //       if (_this.choosebfData.clothWeight > _this.choosebfData.$bfWeight) {
      //         _this.choosebfData.clothWeight = _this.choosebfData.$bfWeight;
      //       } else if (_this.choosebfData.clothWeight < 0) {
      //         _this.choosebfData.clothWeight = 0;
      //       }
      //       _this.choosebfData.weight =
      //         _this.choosebfData.$bfWeight - _this.choosebfData.clothWeight;
      //       _this.bfChange(_this.form.bf);
      //     });
      //   }
      // },
      // {
      //   label: "入仓ID",
      //   prop: "whseCalicoinDtlboid",
      //   overHidden: true,
      //   precision: 2,
      //   width: 90,
      //   span: 6,
      //   placeholder: " ",
      //   hide: false,
      //   props: {
      //     label: "whseCalicoinDtlboid",
      //     value: "custTicket"
      //   },
      //   type: "select",
      //   dicData: whseData
      // }
    ]
  };
}

export function cpbOp(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 189px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    selection: true,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "neiWeight",
        type: "sum"
      },
      {
        label: " ",
        name: "productNo",
        type: "count"
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
        label: "成品编号",
        prop: "productNo",
        overHidden: true,
        span: 6,
        disabled: false,
        sortable: true,
        cell: false
      },
      {
        label: "重量(KG)",
        prop: "netWeight",
        overHidden: true,
        width: 70,
        span: 6,
        placeholder: " ",
        // type: "select",
        // dicData: getDicT("proClothNote", "clothWeight", "noteCode"),
        align: "right",
        hide: false
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
    height: "calc(100vh - 5.466667rem)",
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
        span: 6,
        disabled: false,
        cell: true
      },
      {
        label: "标准",
        prop: "testItemName",
        overHidden: false,
        width: 160,
        span: 6,
        disabled: false,
        placeholder: " ",
        cell: true
      },
      {
        label: "要求",
        prop: "testItemContent",
        overHidden: false,
        // width: 140,
        span: 6,
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
    height: "calc(100vh - 5.466667rem)",
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
        // width: 140,
        span: 6,
        disabled: false,
        // sortable: true,
        cell: true
      },
      {
        label: "备注说明",
        prop: "remark",
        overHidden: false,
        // width: 140,
        span: 6,
        placeholder: " ",
        align: "center",
        // type: "switch",
        // dicData: [
        //   {
        //     label: "否",
        //     value: "0"
        //   },
        //   {
        //     label: "是",
        //     value: "1"
        //   }
        // ],
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
    height: "calc(100vh - 5.2rem)",
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
        span: 6,
        sortable: true
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
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
//       span: 6,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "单染",
//       prop: "drm",
//       width: 120,
//       hide: true,
//       span: 6,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "双染",
//       prop: "sr",
//       width: 120,
//       hide: true,
//       span: 6,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "三染",
//       prop: "sanran",
//       width: 120,
//       hide: true,
//       span: 6,
//       type: "number",
//       placeholder: " "
//     },
//     {
//       label: "食毛",
//       prop: "shimao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "碱缩/丝光",
//       prop: "jssg",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "定胚",
//       prop: "dingpei",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "预缩",
//       prop: "yusuo",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "面抓毛",
//       prop: "mianzhuamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底抓毛",
//       prop: "dizhuamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面抓毛",
//       prop: "liangmianzhuamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面烧毛",
//       prop: "msm",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底烧毛",
//       prop: "dismao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面烧毛",
//       prop: "liangmiansmao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "普通剪毛",
//       prop: "ptzhuamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "绒布胚布两刀",
//       prop: "dizhudddamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "绒布成品三刀",
//       prop: "liangmianssszhuamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面磨毛",
//       prop: "msmss",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底磨毛",
//       prop: "dismqqao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面磨毛",
//       prop: "liangmiassnsmao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面吸毛",
//       prop: "mianxim",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底吸毛",
//       prop: "dizhudxxddamao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面吸毛",
//       prop: "lmximao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "面刷毛",
//       prop: "msmsss",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "底刷毛",
//       prop: "dismqssqao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "两面刷毛",
//       prop: "liangmiassssnsmao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "定成品",
//       prop: "lmximdcpao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "烘干",
//       prop: "msmsssss",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "浆边",
//       prop: "jiangbian",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "浆切边",
//       prop: "jiangqiebian",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "活性印花",
//       prop: "hxyh",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "胶浆印花",
//       prop: "dismqssssqao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "拔白",
//       prop: "babsi",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "手感",
//       prop: "lmxisgmdcpao",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },

//     {
//       label: "抗静电整理",
//       prop: "kdjzl",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "抗紫外线整理",
//       prop: "kzwxzl",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "抗菌防臭整理",
//       prop: "kjfczl",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "保湿整理",
//       prop: "bszl",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//     {
//       label: "吸湿速干整理",
//       prop: "xssgzl",
//       span: 6,
//       hide: true,
//       width: 80,
//       placeholder: " ",
//     },
//   ]
// },
