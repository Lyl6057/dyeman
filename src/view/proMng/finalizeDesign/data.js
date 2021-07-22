/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-17 10:16:22
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
        label: "客户名称",
        tip: "Khách hàng",
        prop: "custCode",
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "织造通知单",
        prop: "weaveJobCode",
        tip: "织造通知单(Mã đơn dệt)",
        span: 6,
        placeholder: " "
      },

      {
        label: "开单日期",
        tip: "开单日期(Ngày lập đơn)",
        prop: "startJobDate",
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
    labelPosition: "top",
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
        label: "织造通知单",
        prop: "weaveJobCode",
        tip: "织造通知单(Mã đơn dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " ",
        click: () => {
          _this.choiceTle = "选择织造通知单";
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
        type: "select",
        dicData: cust,
        rules: [
          {
            required: true,
            message: "请输入客户",
            trigger: "blur"
          }
        ],
        tip: "客户(Khách hàng)"
      },
      {
        label: "开单日期",
        tip: "开单日期(Ngày lập đơn)",
        prop: "startJobDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇开单日期(Ngày lập đơn)",
            trigger: "blur"
          }
        ]
      },

      {
        label: "开单数量(kg)",
        tip: "开单数量(Số lượng lập đơn)",
        prop: "jobAmount",
        width: 120,
        placeholder: " ",
        type: "number",
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入开单数量",
            trigger: "blur"
          }
        ]
      },
      {
        label: "订单数(kg)",
        tip: "订单数(Số lượng đơn hàng)",
        prop: "salPpAmount",
        width: 100,
        placeholder: " ",
        align: "right",
        span: 6,
        rules: [
          {
            required: true,
            message: "请输入订单数",
            trigger: "blur"
          }
        ]
      },

      {
        label: "疋数",
        tip: "疋数(Cây)",
        prop: "pidCount",
        width: 80,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入疋数",
        //   trigger: "blur"
        // }],
      },
      {
        label: "交货日期",
        tip: "交货日期(Ngày giao hàng)",
        prop: "goodsDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true
        // rules: [{
        //   required: true,
        //   message: "请選擇交货日期",
        //   trigger: "blur"
        // }],
      },
      {
        label: "总缸数",
        tip: "总缸数(Tổng cộng Lô nhuộm)",
        prop: "vatCount",
        width: 90,
        placeholder: " ",
        align: "right",
        type: "number",
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
        span: 6
      },

      {
        label: "交货地址",
        tip: "交货地址(Địa chỉ giao hàng)",
        prop: "deliveryAddress",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 12
      },

      {
        label: "颜色",
        tip: "颜色(Màu)",
        prop: "colorName",
        width: 100,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "色号",
        tip: "色号(Số màu)",
        prop: "colorCode",
        width: 120,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "颜色数量",
        tip: "颜色数量(Tổng cộng Màu)",
        prop: "colorCount",
        width: 100,
        placeholder: " ",
        align: "right",
        type: "number",
        span: 6
        // rules: [{
        //   required: true,
        //   message: "请输入颜色数量",
        //   trigger: "blur"
        // }],
      },
      {
        label: "成品/干布",
        tip: "成品/干布(thành phẩm/vải khô)",
        prop: "finishJobOption",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: "成品",
            label: "成品"
          },
          {
            value: "干布",
            label: "干布"
          }
        ]
      },

      {
        label: "出缸幅宽(inch)",
        prop: "dyeAfterBreadth",
        width: 120,
        hide: true,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        tip: "出缸幅宽(Khổ rộng)"
      },
      {
        label: "出缸克重(g/m2)",
        prop: "dyeAfterWeight",
        width: 120,
        hide: true,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        tip: "出缸克重(Trọng lượng )"
      },
      {
        label: "布类",
        tip: "布类(Loại vải)",
        prop: "fabricName",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 12
      },
      {
        label: "干布幅宽(inch)",
        prop: "dryClothBreadth",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "干布幅宽(Khổ rộng)"
      },
      {
        label: "干布克重(g/m2)",
        prop: "dryClothWeight",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "干布克重(Trọng lượng )"
      },
      {
        label: "成分",
        tip: "成分(Thành phần)",
        prop: "fabricCompone",
        width: 250,
        hide: true,
        placeholder: " ",
        span: 12
      },

      {
        label: "干布交后整",
        prop: "dryClothItems",
        tip: "干布交后整(Sau khi vải khô giao hoàn chỉnh)",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: "抓毛",
            label: "抓毛"
          },
          {
            value: "磨毛",
            label: "磨毛"
          },
          {
            value: "剪毛",
            label: "剪毛"
          },
          {
            value: "刷毛",
            label: "刷毛"
          },
          {
            value: "烧毛",
            label: "烧毛"
          },
          {
            value: "特殊手感",
            label: "特殊手感"
          }
        ]
      },
      {
        label: "温度(°C)",
        prop: "setStyleTemp",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "温度(Nhiệt độ)"
      },
      {
        label: "轧车压力(Mpa)",
        prop: "plungeWaterPascal",
        width: 120,
        hide: true,
        span: 6,
        type: "number",
        placeholder: " ",
        tip: "轧车压力(Áp lực xe)"
      },
      {
        label: "是否预缩",
        tip: "是否预缩(Trước khi thu nhỏ)",
        prop: "mustPreshrunk",
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
        type: "switch",
        dicData: [
          [
            {
              label: "否",
              value: false
            },
            {
              label: "是",
              value: true
            }
          ]
        ]
      },
      {
        label: "织厂",
        prop: "weaveFactoryCode",
        tip: "织厂(Xưởng dệt)",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
      },
      {
        label: "开单员",
        tip: "开单员(Người lập đơn)",
        prop: "jobCreator",
        width: 100,
        placeholder: " ",
        span: 6
      },
      {
        label: "审批",
        tip: "审批(Xét duyệt)",
        prop: "auditor",
        width: 100,
        placeholder: " ",
        span: 6
      },
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
    group: [
      {
        icon: "el-icon-s-order",
        label: "织造通知单信息",
        prop: "group1",
        column: [
          {
            label: "筒径(inch)",
            tip: "筒径(Khổ máy)",
            prop: "tubeDiam",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
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
            type: "number",
            align: "right"
          },
          {
            label: "紗長",
            tip: "紗長(Độ dài sợi)",
            prop: "yarnLength",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },
          {
            label: "纱牌",
            tip: "纱牌(Nhãn hiệu sợi)",
            prop: "yarnCard",
            span: 6,
            width: 120,
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
            hide: true
          },
          {
            label: "本厂纱批",
            tip: "本厂纱批(Lot sợi nhà máy)",
            prop: "yarnCylinderNumber",
            span: 6,
            width: 120,
            placeholder: " ",
            hide: true
          },
          {
            label: "胚布幅宽(inch)",
            tip: "胚布幅宽(Khổ rộng vải mộc)",
            prop: "calicoBreadth",
            width: 90,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "胚布克重(g/m2)",
            tip: "胚布克重(Trọng lượng vải mộc)",
            prop: "calicoWeight",
            width: 120,
            hide: true,
            span: 6,
            align: "right",
            type: "number",
            placeholder: " "
          }
        ]
      },
      {
        icon: "el-icon-s-order",
        label: "成品规格要求",
        prop: "group2",
        column: [
          {
            label: "连边幅宽(inch)",
            tip: "连边幅宽(Khổ rộng Tiếp giáp)",
            prop: "proBreadthSide",
            width: 90,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "实用幅宽(inch)",
            tip: "实用幅宽(Thực dụng Tiếp giáp)",
            prop: "proBreadthActual",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "洗前克重(g/m2)",
            tip: "洗前克重(Trước giặt Trọng lượng)",
            prop: "proWeightBefore",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "洗后克重(g/m2)",
            tip: "洗后克重(Sau giặt Trọng lượng)",
            prop: "proWeightAfter",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "缩水-直缩(%)",
            tip: "缩水-直缩(Co rút ngang)",
            prop: "proShrinkVertical",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "缩水-横缩(%)",
            tip: "缩水-横缩(Co rút ngang)",
            prop: "proShrinkHorizontal",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "缩水-扭度(%)",
            tip: "缩水-扭度(Độ méo)",
            prop: "proShrinkTwist",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "缩水-循环(inch)",
            tip: "缩水-循环(Tuần hoàn)",
            prop: "proShrinkLoop",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            align: "right",
            placeholder: " "
          },
          {
            label: "缩水-挂干",
            tip: "缩水-挂干(Treo khô)",
            prop: "proShrinkHangDry",
            width: 120,
            hide: true,
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
            label: "缩水-平干",
            tip: "缩水-平干(Phơi phẳng)",
            prop: "proShrinkSafeDry",
            width: 120,
            hide: true,
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
            label: "缩水-抛干",
            tip: "缩水-抛干(Vắt khô)",
            prop: "proShrinkThrowDry",
            width: 120,
            hide: true,
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
            label: "洗抛次数",
            tip: "缩水-洗抛次数(Số lần giặt và vắt)",
            prop: "proShrinkWashDryCount",
            width: 120,
            hide: true,
            span: 6,
            type: "number",
            placeholder: " "
          }
        ]
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
// compCrud
export function gyCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: "编号",
      //   prop: "itemCode",
      //   width: 120,
      //   span: 6,
      //   cell: true
      // },
      {
        label: "项目",
        prop: "itemName",
        width: 400,
        span: 6,
        cell: true
      },
      // {
      //   label: "数据类型",
      //   prop: "dataStyle",
      //   width: 120,
      //   span: 6,
      //   cell: true,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: "string",
      //       label: "输入框"
      //     },
      //     {
      //       value: "boolean",
      //       label: "选择框"
      //     }
      //   ]
      // },
      {
        label: "设定",
        prop: "itemSet",
        width: 150,
        span: 6,
        cell: true,
        slot: true,
        type: "number",
        precision: 2
        // overHidden: true,
      },
      {
        label: "实际",
        prop: "itemActual",
        slot: true,
        width: 150,
        span: 6,
        type: "number",
        precision: 2,
        cell: true
        // overHidden: true,
      }
    ]
  };
}

export function pfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
        label: "物料编码",
        prop: "materialCode",
        width: 140,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: "物料名称",
        prop: "materialName",
        width: 180,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: "数量",
        prop: "useAmount",
        width: 120,
        type: "number",
        overHidden: true,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "浴比",
        prop: "waterRatio",
        width: 120,
        type: "number",
        overHidden: true,
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.waterAmount = Number(
              (_this.form.jobAmount * _this.chooseData.waterRatio).toFixed(2)
            );
          });
        }
      },

      {
        label: "水量",
        prop: "waterAmount",
        width: 120,
        type: "number",
        overHidden: true,
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "开稀比例",
        prop: "diluteRatio",
        width: 120,
        type: "number",
        overHidden: true,
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "输送数量",
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        overHidden: true,
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      }
    ]
  };
}
