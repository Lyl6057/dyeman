/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-17 10:17:25
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸号",
        tip: "缸号(số lô nhuộm)",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "客户",
        tip: "Khách hàng",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      // {
      //   label: "订单号",
      //   tip: "Số đơn hàng",
      //   prop: "orderNo",
      //   span: 6,
      //   placeholder: " "
      // },

      {
        label: "开单日期",
        tip: "开单日期(Ngày lập đơn)",
        prop: "workDate",
        span: 6,
        placeholder: " "
      }
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
        label: "客戶",
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

let cust = getDicT("basCustomer", "custName", "custCode");

const dyeOrder = getXDicT("proBleadyeJob");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 190px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // labelPosition: "top",
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
        label: "缸号",
        tip: "缸号(số lô nhuộm)",
        prop: "vatNo",
        overHidden: true,
        width: 140,
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = "选择染整工单";
          _this.choiceV = true;
        }
      },
      {
        label: "客户",
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        props: {
          label: "custCode",
          value: "vatNo"
        },
        type: "select",
        dicData: dyeOrder,
        tip: "客户(Khách hàng)",
        disabled: true
      },
      {
        label: "开单日期",
        tip: "开单日期(Ngày lập đơn)",
        prop: "workDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        disabled: true
      },
      {
        label: "交货日期",
        tip: "交货日期(Ngày giao hàng)",
        prop: "deliveDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        disabled: true
        // rules: [{
        //   required: true,
        //   message: "请選擇交货日期",
        //   trigger: "blur"
        // }],
      },

      {
        label: "开单数量(kg)",
        tip: "开单数量(Số lượng lập đơn)",
        prop: "clothWeight",
        width: 120,
        placeholder: " ",
        type: "number",
        align: "right",
        disabled: true,
        span: 6
      },
      {
        label: "订单数(kg)",
        tip: "订单数(Số lượng đơn hàng)",
        prop: "poAmountKg",
        width: 100,
        placeholder: " ",
        align: "right",
        disabled: true,
        span: 6
      },
      {
        label: "交货地址",
        tip: "交货地址(Địa chỉ giao hàng)",
        prop: "address",
        width: 250,
        placeholder: " ",
        overHidden: true,
        disabled: true,
        span: 12
      },
      {
        label: "疋数",
        tip: "疋数(Cây)",
        prop: "pidCount",
        width: 80,
        placeholder: " ",
        align: "right",
        type: "number",
        disabled: true,
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入疋数",
        //   trigger: "blur"
        // }],
      },

      {
        label: "总缸数",
        tip: "总缸数(Tổng cộng Lô nhuộm)",
        prop: "poVatCount",
        width: 90,
        placeholder: " ",
        align: "right",
        type: "number",
        disabled: true,
        span: 6
      },
      {
        label: "第几缸",
        tip: "第几缸(Bồn thứ Một vài Lô nhuộm)",
        prop: "vatIndex",
        width: 90,
        placeholder: " ",
        align: "right",
        type: "number",
        disabled: true,
        span: 6
      },
      {
        label: "颜色数量",
        tip: "颜色数量(Tổng cộng Màu)",
        prop: "poColorCount",
        width: 100,
        placeholder: " ",
        align: "right",
        type: "number",
        disabled: true,
        span: 6
      },
      {
        label: "颜色",
        tip: "颜色(Màu)",
        prop: "colorName",
        width: 100,
        overHidden: true,
        disabled: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "色号",
        tip: "色号(Số màu)",
        prop: "colorCode",
        width: 120,
        overHidden: true,
        disabled: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "布类",
        tip: "布类(Loại vải)",
        prop: "fabName",
        width: 250,
        placeholder: " ",
        overHidden: true,
        disabled: true,
        span: 12
      },

      {
        label: "开单员",
        tip: "开单员(Người lập đơn)",
        prop: "orderMan",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6
      },
      // {
      //   label: "审批",
      //   tip: "审批(Xét duyệt)",
      //   prop: "auditor",
      //   width: 100,
      //   placeholder: " ",
      //   span: 6
      // },
      {
        label: "列印日期",
        tip: "列印日期(Ngày in)",
        prop: "printDate",
        placeholder: " ",
        width: 160,
        overHidden: true,
        hide: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: true
      },
      {
        label: "成分",
        tip: "成分(Thành phần)",
        prop: "fabElements",
        width: 250,
        hide: true,
        placeholder: " ",
        disabled: true,
        span: 12
      },

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
    ]
    // group: [
    //   {
    //     icon: "el-icon-s-order",
    //     label: "磨毛机 Máy mài lông ",
    //     prop: "group3"
    //   },
    //   {
    //     icon: "el-icon-s-order",
    //     label: "刷毛机 Máy chải lông",
    //     prop: "group4"
    //   },
    //   {
    //     icon: "el-icon-s-order",
    //     label: "抓毛机 Máy cào lông",
    //     prop: "group5"
    //   },
    //   {
    //     icon: "el-icon-s-order",
    //     label: "烧毛机 Máy đốt lông",
    //     prop: "group6"
    //   },
    //   {
    //     icon: "el-icon-s-order",
    //     label: "干领机 Máy sấy cổ",
    //     prop: "group7"
    //   }
    // ]
  };
}

export function form1(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "织造通知单",
        prop: "weaveJobCode",
        tip: "织造通知单(Mã đơn dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: true,
        placeholder: " "
      },
      {
        label: "织厂",
        prop: "weaveFactoryCode",
        tip: "织厂(Xưởng dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: true,
        placeholder: " "
      },
      {
        label: "筒径(inch)",
        tip: "筒径(Khổ máy)",
        prop: "tubeDiam",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: true,
        type: "number",
        align: "right"
      },
      {
        label: "针距(G)",
        tip: "针距(Khoảng cách kim)",
        prop: "needleDist",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: true,
        type: "number",
        align: "right"
      },
      {
        label: "紗長",
        tip: "紗長(Độ dài sợi)",
        prop: "yarnLength",
        width: 80,
        placeholder: " ",
        disabled: true,
        span: 6,
        hide: true
      },
      {
        label: "纱牌",
        tip: "纱牌(Nhãn hiệu sợi)",
        prop: "yarnCard",
        span: 6,
        width: 120,
        disabled: true,
        placeholder: " ",
        hide: true
      },
      {
        label: "纱批",
        tip: "纱批(Lot sợi)",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label: "本厂纱批",
        tip: "本厂纱批(Lot sợi nhà máy)",
        prop: "factoryYarnBatch",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label: "胚布幅宽(inch)",
        tip: "胚布幅宽(Khổ rộng vải mộc)",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        disabled: true,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "胚布克重(g/m2)",
        tip: "胚布克重(Trọng lượng vải mộc)",
        prop: "gramWeight",
        width: 120,
        hide: true,
        span: 6,
        disabled: true,
        align: "right",
        type: "number",
        placeholder: " "
      }
    ]
  };
}

export function form2(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "胚布色布返修选项",
        prop: "finisthTechTarget",
        tip: "胚布色布返修选项()",
        span: 12,
        labelWidth: 180,
        type: "radio",

        dicData: [
          {
            value: 1,
            label: "Vải mộc 胚布"
          },
          {
            value: 2,
            label: "Màu vải 色布"
          },
          {
            value: 3,
            label: "Sửa lại 返修布"
          }
        ]
      },
      {
        label: "抓毛(Cào lông)",
        labelWidth: 160,
        prop: "isRaise",
        tip: "抓毛(Cào lông)",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "磨毛(Mài lông)",
        prop: "isSanding",
        labelWidth: 160,
        tip: "磨毛(Mài lông)",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "刷毛(Chải lông)",
        labelWidth: 160,
        prop: "isBrush",
        tip: "刷毛(Chải lông)",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "烧毛(Đốt lông)",
        labelWidth: 160,
        prop: "isBurn",
        tip: "烧毛(Đốt lông)",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "干领机(Máy sấy cổ)",
        prop: "isDry",
        tip: "干领机(Máy sấy cổ)",
        span: 6,
        labelWidth: 160,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      }
    ]
  };
}
export function form3(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "设定张力(KG)",
        tip: "Cài đặt lực căng",
        prop: "sandingStrainSet",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "实际张力(KG)",
        tip: "Lực căng thực tế",
        prop: "sandingStrainReal",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "入布张力(%)",
        tip: "Lực căng vào vải %",
        prop: "sandingInCloth",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "出布张力(%)",
        tip: "Lực căng ra vải %",
        prop: "sandingOutCloth",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "摆布张力(%)",
        tip: "Lực căng đong đưa vải %",
        prop: "sandingSwayCloth",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "风机转数",
        tip: "Số vòng máy quạt RPM",
        prop: "sandingFanSpeed",
        span: 6,
        align: "right",
        type: "number",
        row: true,
        placeholder: " "
      },
      {
        label: "压辊1进出状态",
        tip: "Trục ép mài lông 1 Vào/ra",
        prop: "sandingPress1State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊1数值(MM)",
        tip: "Trục ép mài lông 1 Trị số",
        prop: "sandingPress1Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "磨毛辊1方向",
        tip: "Trục ép mài lông 1 Vào/ra",
        prop: "sandingRoller1State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊1转数",
        tip: "Trục ép mài lông 1 Số vòng RPM",
        prop: "sandingRoller1Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "压辊2进出状态",
        tip: "Trục ép mài lông 2 Vào/ra",
        prop: "sandingPress2State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊2数值(MM)",
        tip: "Trục ép mài lông 2 Trị số",
        prop: "sandingPress2Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "磨毛辊2方向",
        tip: "Trục ép mài lông 2 Vào/ra",
        prop: "sandingRoller2State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊2转数",
        tip: "Trục ép mài lông 2 Số vòng RPM",
        prop: "sandingRoller2Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "压辊3进出状态",
        tip: "Trục ép mài lông 3 Vào/ra",
        prop: "sandingPress3State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊3数值(MM)",
        tip: "Trục ép mài lông 3 Trị số",
        prop: "sandingPress3Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "磨毛辊3方向",
        tip: "Trục ép mài lông 3 Vào/ra",
        prop: "sandingRoller3State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊3转数",
        tip: "Trục ép mài lông 3 Số vòng RPM",
        prop: "sandingRoller3Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "压辊4进出状态",
        tip: "Trục ép mài lông 4 Vào/ra",
        prop: "sandingPress4State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊4数值(MM)",
        tip: "Trục ép mài lông 4 Trị số",
        prop: "sandingPress4Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "磨毛辊4方向",
        tip: "Trục ép mài lông 4 Vào/ra",
        prop: "sandingRoller4State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊4转数",
        tip: "Trục ép mài lông 4 Số vòng RPM",
        prop: "sandingRoller4Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },

      {
        label: "压辊5进出状态",
        tip: "Trục ép mài lông 5 Vào/ra",
        prop: "sandingPress5State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊5数值(MM)",
        tip: "Trục ép mài lông 5 Trị số",
        prop: "sandingPress5Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "磨毛辊5方向",
        tip: "Trục ép mài lông 5 Vào/ra",
        prop: "sandingRoller5State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊5转数",
        tip: "Trục ép mài lông 5 Số vòng RPM",
        prop: "sandingRoller5Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "压辊6进出状态",
        tip: "Trục ép mài lông 6 Vào/ra",
        prop: "sandingPress6State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "出(ra)",
            value: false
          },
          {
            label: "进(Vào)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "压辊6数值(MM)",
        tip: "Trục ép mài lông 6 Trị số",
        prop: "sandingPress6Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },

      {
        label: "磨毛辊6方向",
        tip: "Trục ép mài lông 6 Vào/ra",
        prop: "sandingRoller6State",
        span: 6,
        type: "switch",
        dicData: [
          {
            label: "反(ngược)",
            value: false
          },
          {
            label: "正(Thuận)",
            value: true
          }
        ],
        placeholder: " "
      },
      {
        label: "磨毛辊6转数",
        tip: "Trục ép mài lông 6 Số vòng RPM",
        prop: "sandingRoller6Value",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      }
    ]
  };
}
export function form4(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "机速(M/min)",
        tip: "Tốc độ máy M/min ",
        prop: "brushSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "进布张力(KG)",
        tip: "Lực căng vào vải (KG)",
        prop: "brushInStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "后整张力(KG)",
        tip: "Lực căng sau hoàn chỉnh (KG)",
        prop: "brushFinishStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "出布张力(KG)",
        tip: "Lực căng ra vải (KG)",
        prop: "brushOutStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "落布张力(KG)",
        tip: "Lực căng xuống vải (KG)",
        prop: "brushDropStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "风机(RPM)",
        tip: "Quạt gió RPM",
        prop: "brushFan",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " ",
        row: true
      },
      {
        label: "下磨毛张力",
        tip: "Lực căng mài lông dưới(KG)",
        prop: "brushDownStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下行星转速(%)",
        tip: "Tốc độ  bộ máy dưới  quay %",
        prop: "brushDownSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下毛刷1",
        tip: "Chải lông dưới 1",
        prop: "brushDownBrush1",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下毛刷2",
        tip: "Chải lông dưới 2",
        prop: "brushDownBrush2",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上磨毛张力",
        tip: "Lực căng mài lông trên(KG)",
        prop: "brushUpStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上行星转速(%)",
        tip: "Tốc độ  bộ máy trên quay %",
        prop: "brushUpSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上毛刷1",
        tip: "Chải lông trên 1",
        prop: "brushUpBrush1",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上毛刷2",
        tip: "Chải lông trên 2",
        prop: "brushUpBrush2",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      }
    ]
  };
}

export function form5(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "机速(M/min)",
        tip: "Tốc độ máy M/min ",
        prop: "raiseSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "补偿辊中间(%)",
        tip: "Bù lực căng trục Chỉnh giữa %",
        prop: "raiseExtraMiddle",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "补偿辊出布(%)",
        tip: "Bù lực căng trục Ra vải %",
        prop: "raiseExtraOut",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "抽风机(RPM)",
        tip: "Máy hút gió RPM",
        prop: "raiseFanSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "单开下部",
        tip: "Mở bộ máy dưới",
        prop: "raiseDownOpen",
        span: 6,
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
        ],
        placeholder: " "
      },
      {
        label: "下部梳毛力(P)",
        tip: "Bộ máy dưới Lực chải lông P ",
        prop: "raiseDownCombp",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下部起毛力(CP)",
        tip: "Bộ máy dưới Đô xù lông CP ",
        prop: "raiseDownRaiseDownCombcp",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下部锡林转速%",
        tip: "Bộ máy dưới Tốc độ bộ máy quay RPM ",
        prop: "raiseDownCylinderSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下部张力(%)",
        tip: "Bộ máy dưới Lực căng %",
        prop: "raiseDownStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },

      {
        label: "单开上部",
        tip: "Mở bộ máy trên",
        prop: "raiseUpOpen",
        span: 6,
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
        ],
        placeholder: " "
      },
      {
        label: "上部梳毛力(P)",
        tip: "Bộ máy trên Lực chải lông P ",
        prop: "raiseUpCombp",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上部起毛力(CP)",
        tip: "Bộ máy trên Đô xù lông CP ",
        prop: "raiseUpCombcp",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "上部锡林转速%",
        tip: "Bộ máy trên Tốc độ bộ máy quay RPM ",
        prop: "raiseUpCylinderSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "下部张力(%)",
        tip: "Bộ máy trên Lực căng %",
        prop: "raiseUpStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      }
    ]
  };
}
export function form6(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "机速(M/min)",
        tip: "Tốc độ máy M/min ",
        prop: "burnSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "进布张力(KG)",
        tip: "Lực căng vào vải (KG)",
        prop: "burnInStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "蒸箱张力(KG)",
        tip: "Lực căng tủ hấp (KG)",
        prop: "burnSteamStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "出布张力(KG)",
        tip: "Lực căng ra vải (KG)",
        prop: "burnOutStrain",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "点火速度设定",
        tip: "Cài đặt tốc độ bật lửa",
        prop: "burnFireSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "烧火速度设定",
        tip: "Cài đặt tốc độ đốt lông",
        prop: "burnGrossSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "火口Cổng lửa 1",
        tip: "Chọn cổng lửa Cổng lửa 1",
        prop: "burnFire1",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ],
        placeholder: " "
      },
      {
        label: "火口Cổng lửa 2",
        tip: "Chọn cổng lửa Cổng lửa 2",
        prop: "burnFire2",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ],
        placeholder: " "
      },
      {
        label: "鼓风1开/关",
        tip: "Quạt thổi lửa 1 Mở/tắt",
        prop: "burnFan1Switch",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "关(tắt)"
          },
          {
            value: true,
            label: "开(Mở)"
          }
        ],
        placeholder: " "
      },
      {
        label: "鼓风1转数",
        tip: "Quạt thổi lửa 1 Số vòng rpm",
        prop: "burnFan1Speed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "火口Cổng lửa 3",
        tip: "Chọn cổng lửa Cổng lửa 3",
        prop: "burnFire3",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ],
        placeholder: " "
      },
      {
        label: "火口Cổng lửa 4",
        tip: "Chọn cổng lửa Cổng lửa 4",
        prop: "burnFire4",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ],
        placeholder: " "
      },

      {
        label: "鼓风2开/关",
        tip: "Quạt thổi lửa 2 Mở/tắt",
        prop: "burnFan2Switch",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "关(tắt)"
          },
          {
            value: true,
            label: "开(Mở)"
          }
        ],
        placeholder: " "
      },
      {
        label: "鼓风2转数",
        tip: "Quạt thổi lửa 2 Số vòng rpm",
        prop: "burnFan2Speed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "排风机开/关",
        tip: "Quạt thông gió Mở/tắt",
        prop: "burnBlowerSwitch",
        span: 6,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "关(tắt)"
          },
          {
            value: true,
            label: "开(Mở)"
          }
        ],
        placeholder: " "
      },
      {
        label: "排风机转数",
        tip: "Quạt thông gió Số vòng rpm",
        prop: "burnBlowerSpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      }
    ]
  };
}

export function form7(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "干领机速(RPM)",
        tip: "Tốc độ máy M/min",
        prop: "drySpeed",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "干领温度",
        tip: "Nhiêt độ C",
        prop: "dryTemp",
        span: 6,
        align: "right",
        type: "number",
        placeholder: " "
      },
      {
        label: "干领风机",
        tip: "Quạt gió RPM",
        prop: "dryFan",
        span: 6,
        align: "right",
        type: "number",
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
