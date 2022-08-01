/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-01 11:32:27
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT, getDicNS } from "@/config";
import { num2ThousandthFormat } from "@/utils/tools"

let matUnit = getDIC("bas_matUnit");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "織單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        // formslot: true,
        // slot: true,
        // type: "select",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label: "訂單號",
        prop: "poNo",
        span: 6,
        placeholder: " ",
        tip: "Số đơn hàng"
      },
      {
        label: "布票編號",
        prop: "noteCode",
        span: 6,
        placeholder: " ",
        tip: "Mã vải"
      },
      {
        label: "机號",
        prop: "loomNo",
        span: 6,
        placeholder: " ",
        tip: "Mã máy"
      },
      {
        label: "匹號",
        prop: "eachNumber",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        tip: "Số cây vải"
      },
      {
        label: "载具编号",
        tip: "Mã lồng thép",
        prop: "storeLoadCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120
      },
      {
        label: "胚布状态",
        tip: "clothState",
        prop: "clothState",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        align: "center",
        dicData: [
          // {
          //   label: "已称重装笼",
          //   value: 1
          // },
          {
            label: "已入仓",
            value: 2
          },
          {
            label: "已出仓",
            value: 3
          }
        ],
        change: () => {
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label: "验布时间",
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 6,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180
      }
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "trọng lượng",
    excelBtn: false,
    sumColumnList: [
      {
        label: "毛重",
        name: "realWeight",
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
        label: "織單號(MS đơn sản xuất bp Dệt)",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
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
        label: "布票號(Mã vải)",
        prop: "noteCode",
        width: 170,
        disabled: true,
        placeholder: " ",
        span: 6,
        sortable: true,
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
        label: "布类名称(Tên loại vải)",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        width: 200,
        overHidden: true,
        hide: true
      },
      {
        label: "顏色(Màu sắc)",
        prop: "proColor",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label: "纱批(Lô sợi)",
        prop: "spi",
        width: 90,
        hide: true,
        span: 6
      },

      {
        label: "纱牌(Nhãn hiệu sợi)",
        prop: "sp",
        width: 90,
        hide: true,
        span: 6
      },
      // {
      //   label: "机台編號",
      //   prop: "machineCode",
      //   width: 110,
      //   hide: false,
      //   span: 6,
      //   disabled: true,

      // },
      {
        label: "机号(Mã máy)",
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
        disabled: true,
        sortable: true
      },
      // {
      //   label: "值机工号(Số thẻ người đứng máy)",
      //   prop: "workNo",
      //   span: 8,
      //   placeholder: " ",
      //   width: 150,
      //   overHidden: true
      // },
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
        label: "匹號(Số cây vải)",
        prop: "eachNumber",
        width: 105,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        formatter(r,v){
          return num2ThousandthFormat(v,0)
        }
      },
      {
        label: "毛重(trọng lượng cả b)",
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        formatter(r,v){
          return num2ThousandthFormat(v,1)
        }
        // type: "number",
        // precision: 1
      },
      // {
      //   label: _this.$t("whseField.zl") + "(trọng lượng)",
      //   prop: "clothWeight",
      //   width: 120,
      //   align: "right",
      //   span: 6,
      //   cell: false,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1,
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.detail.realWeight = Number(
      //         Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
      //       ).toFixed(1);
      //       if (isNaN(_this.detail.realWeight)) {
      //         _this.detail.realWeight = 0;
      //       }
      //       // if (_this.detail.clothWeight) {
      //       //   _this.detail.clothCheckTime = _this.$getNowTime("datetime")
      //       //   _this.detail.clothState = 1
      //       // } else {
      //       //   _this.detail.clothCheckTime = ''
      //       //   _this.detail.clothState = 0
      //       // }
      //     });
      //   }
      // },
      // {
      //   label: "QC扣减数量(Số lượng QC cắt giảm)",
      //   prop: "qcTakeOut",
      //   width: 160,
      //   align: "right",
      //   span: 6,
      //   cell: false,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1,
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.detail.realWeight = Number(
      //         Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
      //       ).toFixed(1);
      //       if (isNaN(_this.detail.realWeight)) {
      //         _this.detail.realWeight = 0;
      //       }
      //     });
      //   }
      // },

      {
        label: "载具编号(Mã lồng thép)",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "存储位置(Vị trí lưu trữ)",
        prop: "storeSiteCode",
        cell: true,
        width: 220,
        placeholder: " ",
        type: "select",
        props: {
          label: "locationCode",
          value: "locationCode"
        },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS("whseLocation", "locationCode", "locationCode")
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
      {
        label: "胚布状态",
        tip: "clothState",
        prop: "clothState",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        align: "center",
        dicData: [
          {
            label: "已入仓",
            value: 2
          },
          {
            label: "已出仓",
            value: 3
          }
        ]
      },
      {
        label: "仓库员备注(ghi chú)",
        prop: "storeRemark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: true
      },
      {
        label: "验布员备注(ghi chú)",
        prop: "remark",
        width: 250,
        placeholder: " ",
        // overHidden: true,
        cell: false,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      }

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
      // {
      //   label: "验布时间(thời gian in)",
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // }
    ]
  };
}
