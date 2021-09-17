/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-14 16:06:09
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
        // tip: "开单日期(Ngày lập đơn)",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "唛头编号",
        // tip: "markNo",
        prop: "markNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "订单编号",
        // tip: "Khách hàng",
        prop: "poNo",
        span: 6,
        placeholder: " "
        // type: "select",
        // dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "客户",
        prop: "custCode",
        // tip: "织造通知单(Mã đơn dệt)",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
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
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
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
    height: "calc(100vh - 235px)",
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
            message: "请选择缸号(số lô nhuộm)",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceTle = "选择染整工单";
          _this.choiceV = true;
        }
      },
      {
        label: "唛头编号",
        prop: "markNo",
        overHidden: true,
        width: 150,
        span: 6,
        disabled: false,
        rules: [
          {
            required: true,
            message: "请输入唛头编号",
            trigger: "blur"
          }
        ],
        placeholder: " "
      },
      {
        label: "订单编号",
        // tip: "Khách hàng",
        prop: "poNo",
        span: 6,
        placeholder: " ",
        width: 140,
        overHidden: true
        // type: "select",
        // dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
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
        tip: "客户(Khách hàng)"
      },
      {
        label: "唛头数量",
        // tip: "开单数量(Số lượng lập đơn)",
        prop: "markCount",
        width: 120,
        placeholder: " ",
        type: "number",
        minRows: 0,
        align: "right",
        span: 6
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入唛头数量",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: "面料编号",
        prop: "fabricCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        placeholder: " "
      },
      {
        label: "总成份",
        tip: "总成份(Thành phần)",
        prop: "fabComponents",
        width: 250,
        overHidden: true,
        placeholder: " ",
        span: 12
      },

      {
        label: "布种",
        // tip: "布类(Loại vải)",
        prop: "fabFabrics",
        width: 250,
        placeholder: " ",
        overHidden: true,
        span: 6
      },
      {
        label: "颜色",
        // tip: "颜色(Màu)",
        prop: "colorName",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "工厂色号",
        // tip: "色号",
        prop: "factoryColor",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "客户色号",
        // tip: "色号",
        prop: "custColor",
        width: 140,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "连边门幅",
        prop: "sideFabWidth",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: "实用门幅",
        prop: "realFabWidth",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: "洗前克重",
        prop: "beforeGramWeight",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: "洗后克重",
        prop: "afterGramWeight",
        width: 120,
        hide: true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: "产地",
        prop: "originPlace",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: false,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label: "备注",
        prop: "remark",
        overHidden: true,
        width: 180,
        span: 18,
        disabled: false,
        placeholder: " "
      },

      {
        label: "打印日期",
        tip: "打印日期(Ngày in)",
        prop: "markDate",
        placeholder: " ",
        width: 160,
        overHidden: true,
        hide: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        display: false
      }
    ]
  };
}

export function cpForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "连边幅宽(inch)",
        tip: "连边幅宽(Khổ rộng Tiếp giáp)",
        prop: "proBreadthSide",
        width: 90,
        hide: true,
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        span: 12,
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
        width: 120,
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
        width: 120,
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
        placeholder: " ",
        cell: true
      },
      {
        label: "物料名称",
        prop: "materialName",
        width: 180,
        // overHidden: true,
        placeholder: " ",
        span: 6,
        cell: true
      },
      {
        label: "数量",
        prop: "useAmount",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
        maxRows: 9999,
        span: 6,
        cell: true
      },
      {
        label: "浴比",
        prop: "waterRatio",
        width: 120,
        type: "number",
        // overHidden: true,
        placeholder: " ",
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
        // overHidden: true,
        placeholder: " ",
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
        // overHidden: true,
        placeholder: " ",
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
        // overHidden: true,
        placeholder: " ",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true
      }
    ]
  };
}
