/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 14:15:16
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
        label: "織單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
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
        dicData: [
          {
            label: "未称重",
            value: 0
          },
          {
            label: "已称重装笼",
            value: 1
          },
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
          _this.crud = [];
          _this.page.currentPage = 1;
          _this.$nextTick(() => {
            _this.query();
          });
        }
      },
      {
        label: "是否外发",
        prop: "outworkFlag",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            label: "是",
            value: true
          },
          {
            label: "否",
            value: false
          },
          
        ],
      },
      {
        label: "验布时间",
        prop: "clothCheckTime",
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        span: 12,
        tip: "thời gian in",
        placeholder: " ",
        align: "center",
        width: 180,
        sortable: true
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
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    index: true,
    labelWidth: 100,
    selection: true,
    showSummary: true,
    menuTitle: "trọng lượng",
    excelBtn: true,
    rowKey: "noteId",
    sumColumnList: [
      {
        label: "毛重",
        name: "clothWeight",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      {
        label: "織單號(MS đơn sản xuất bp Dệt)",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "验布记录",
        prop: "perching",
        width: 250,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "訂單號(Số đơn hàng)",
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
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
      {
        label: "布类名称(Tên loại vải)",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 200,
        overHidden: true,
        hide: false
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
      {
        label: "值机工号(Số thẻ người đứng máy)",
        prop: "workNo",
        span: 8,
        placeholder: " ",
        width: 150,
        overHidden: true
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
        label: "匹號(Số cây vải)",
        prop: "eachNumber",
        width: 105,
        align: "right",
        sortable: true,
        span: 6,
        type: "number"
      },
      {
        label: "毛重(trọng lượng cả b)",
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " "
      },
      {
        label: _this.$t("whseField.zl") + "(trọng lượng)",
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label: "QC扣减数量(Số lượng QC cắt giảm)",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label: "米长",
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
      {
        label: "产值",
        prop: "measureWage",
        span: 8,
        placeholder: " ",
        align: "right",
        cell: false,
        overHidden: true,
        type: "number",
        width: 100
      },
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
        cell: false,
        width: 220,
        placeholder: " ",
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
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
        label: "打印时间(thời gian in)",
        prop: "printedTime",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "验布时间(thời gian in)",
        prop: "clothCheckTime",
        type: "date",
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

export function dlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "織單號",
        prop: "weaveJobCode",
        span: 8,
        placeholder: " ",
        disabled: true
      },
      {
        label: "布票編號",
        prop: "noteCode",
        span: 8,
        placeholder: " ",
        disabled: true
      },
      {
        label: "米长",
        prop: "clothLengthValue",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        disabled: true,
        // sortable: true,
        type: "number",
        width: 100
      },
      {
        label: "毛重",
        prop: "realWeight",
        width: 120,
        align: "right",
        span: 8,
        cell: false,
        disabled: true,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.clothLength();
          });
        },
        type: "number",
        // precision: 1
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "clothWeight",
        width: 120,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) + Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label: "纸筒重量",
        prop: "paperTube",
        width: 160,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) +  Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },
      {
        label: "QC扣减数量",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 8,
        cell: false,
        placeholder: " ",
        type: "number",
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.realWeight = Number(
              Number(_this.detail.clothWeight) + Number(_this.detail.qcTakeOut) +  Number(_this.detail.paperTube || 0)
            ).toFixed(1);
            if (isNaN(_this.detail.realWeight)) {
              _this.detail.realWeight = 0;
            }
          });
        }
      },

      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: false,
        overHidden: true,
        sortable: true,
        width: 120
      },
      {
        label: "存储位置",
        prop: "storeSiteCode",
        cell: false,
        width: 220,
        placeholder: " ",
        span: 8,
        type: "select",
        // props: {
        //   label: "locationCode",
        //   value: "locationCode"
        // },
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: "备注",
        prop: "remark",
        width: 250,
        span: 24,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      }
    ]
  };
}
