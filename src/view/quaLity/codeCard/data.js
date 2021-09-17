/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-11 15:36:57
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
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        // formslot: true,
        // slot: true,
        // type: "select",
        tip: "MS đơn sản xuất bp Dệt"
      },
      // {
      //   label: "訂單號",
      //   prop: "poNo",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Số đơn hàng"
      // },
      {
        label: "客戶",
        prop: "custCode",
        width: 150,
        placeholder: " ",
        span: 6,
        overHidden: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust
      },
      {
        label: "匹號",
        prop: "pidNo",
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
      }
      // {
      //   label: "胚布状态",
      //   tip: "Cloth state",
      //   prop: "clothState",
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "已称重装笼(Cân nặng)",
      //       value: 1
      //     },
      //     {
      //       label: "已入仓(Vào nhà kho)",
      //       value: 2
      //     }
      //   ],
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.query();
      //     });
      //   }
      // },
      // {
      //   label: "验布时间",
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   span: 6,
      //   tip: "thời gian in",
      //   placeholder: " ",
      //   align: "center",
      //   width: 180
      // }
    ]
  };
}
export function mainCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 240px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: false,
    menuTitle: "称重",
    // sumColumnList: [],
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },

      {
        label: "缸号",
        prop: "vatNo",
        width: 150,
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
        label: "訂單號(Số đơn hàng)",
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
      },
      {
        label: "客戶",
        prop: "custCode",
        width: 150,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label: "布类名称(Tên loại vải)",
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        width: 200,
        overHidden: true,
        hide: true
      },
      {
        label: "客布代码",
        // tip: "Số màu",
        prop: "guestFabId",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      // {
      //   label: "成份要求",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 16,
      //   placeholder: " ",
      //   hide: true
      // },
      {
        label: "款号",
        // tip: "Số màu",
        prop: "styleNo",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "顏色(Màu sắc)",
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
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label: "克重",
        // tip: "Tổng cộng(KG)",
        prop: "gramWeight",
        width: 100,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label: "幅宽",
        // tip: "Tổng cộng(KG)",
        prop: "breadth",
        width: 100,
        span: 8,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },

      {
        label: "匹號(Số cây vải)",
        prop: "pidNo",
        width: 85,
        align: "right",
        // sortable: true,
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
        minRows: 0,
        minRows: 0,
        placeholder: " "
      },
      {
        label: "浮重",
        prop: "grossWeight",
        width: 80,
        align: "right",
        span: 6,
        cell: true,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.detail.netWeight = Number(
              _this.detail.grossWeight -
                Number(_this.detail.paperTube || 0) -
                Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
        // type: "number",
        // precision: 1
      },
      {
        label: "纸管重量",
        prop: "paperTube",
        width: 100,
        align: "right",
        minRows: 0,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.netWeight = Number(
              _this.detail.grossWeight -
                Number(_this.detail.paperTube || 0) -
                Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },

      {
        label: "QC扣减数量(Số lượng QC cắt giảm)",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.netWeight = Number(
              _this.detail.grossWeight -
                Number(_this.detail.paperTube || 0) -
                Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },
      {
        label: "净重",
        prop: "netWeight",
        width: 80,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1,
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "载具编号(Mã lồng thép)",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        sortable: true,
        width: 160
      },
      {
        label: "存储位置(Vị trí lưu trữ)",
        prop: "storeSiteCode",
        cell: true,
        width: 220,
        placeholder: " ",
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
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
        label: "备注(ghi chú)",
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
        label: "验布员工号(Số thẻ người đứng máy)",
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label: "验布时间(thời gian in)",
        prop: "clothCheckTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200
      }
    ]
  };
}
