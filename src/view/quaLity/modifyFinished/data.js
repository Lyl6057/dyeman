/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-31 14:25:10
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "拆缸缸号",
        prop: "vatNo1",
        span: 8,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt",
        formslot: true
      },
      {
        label: "目标缸号",
        prop: "vatNo2",
        span: 8,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt",
        formslot: true
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
    index: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    menuTitle: "称重",
    // sumColumnList: [],
    column: [
      // {
      //   label: "编号",
      //   prop: "checkoutCode",
      //   span: 6,
      //   align: "center",
      //   // sortable: true,
      //   width: 120,
      //   overHidden: true
      // },

      {
        label: "缸号",
        prop: "vatNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true,
        fixed: true
      },
      {
        label: "布类名称",
        prop: "fabricName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 180,
        overHidden: true
      },
      {
        label: "顏色",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        overHidden: true
      },
      {
        label: "纱牌",
        prop: "yarnBrand",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "供应商纱批",
        prop: "yarnBatch",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "本厂纱批",
        prop: "factBatch",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "落胚疋数",
        prop: "calicoPidCount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label: "落胚重量",
        prop: "calicoAmount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label: "成品疋数",
        prop: "fabricPidCount",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label: "成品重量(KG)",
        prop: "weightKg",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        overHidden: true
      },
      {
        label: "成品重量(LBS)",
        prop: "weightLbs",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 130,
        type: "number",
        overHidden: true
      },
      {
        label: "成品损耗(%)",
        prop: "lossRate",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        type: "number",
        overHidden: true
      },
      {
        label: "总长度",
        prop: "fabricLength",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        type: "number",
        overHidden: true
      },
      {
        label: "载具编号",
        prop: "storeCodes",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 140,
        overHidden: true
      },
      {
        label: "备注",
        prop: "remark",
        width: 250,
        placeholder: " ",
        overHidden: true,
        cell: true
      },
      {
        label: "日期",
        prop: "checkoutDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200,
        overHidden: true
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
        label: "缸號",
        prop: "vatNo",
        span: 8,
        placeholder: " ",
        disabled: true,
        tip: "MS đơn sản xuất bp Dệt"
        // formslot: true,
        // slot: true,
        // type: "select",
      },
      {
        label: "匹號",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 8,
        placeholder: " ",
        disabled: true,
        type: "number",
        tip: "Số cây vải"
      },
      {
        label: "重量单位",
        tip: "đơn vị trọng lượng",
        prop: "weightUnit",
        width: 100,
        span: 8,
        type: "select",
        // dicData: matUnit,
        dicData: [
          {
            label: "公斤",
            value: "KG"
          },
          {
            label: "磅",
            value: "LBS"
          }
        ],
        placeholder: " "
      },

      {
        label: "浮重(KG)",
        tip: "Trọng lượng bì(KG)",
        prop: "grossWeight",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " ",
        disabled: true
      },
      {
        label: "净重(KG)",
        tip: "trọng lượng tịnh(KG)",
        prop: "netWeight",
        width: 100,
        span: 8,
        precision: 1,
        type: "number",
        minRows: 0,
        align: "left",
        placeholder: " ",
        disabled: false
      },
      {
        label: "纸筒重量",
        tip: "Trọng lượng thoi giấy",
        prop: "paperTube",

        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label: "浮重(LBS)",
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " ",
        disabled: true
      },
      {
        label: "净重(LBS)",
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 100,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },

      {
        label: "QC扣减数",
        tip: "trọng lượng QC cắt giảm",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 8,
        cell: true,
        placeholder: " ",
        minRows: 0,
        type: "number",
        precision: 1
      },
      // {
      //   label: "克重",
      //   tip: "Trọng lượng trước giặt",
      //   prop: "realGramWeight",
      //   width: 100,
      //   span: 8,
      //   type: "number",
      //   align: "left",
      //   minRows: 0,
      //   placeholder: " "
      // },
      // {
      //   label: "幅宽",
      //   tip: "Khổ rộng vải mộc",
      //   prop: "clothWidth",
      //   width: 100,
      //   span: 8,
      //   type: "number",
      //   align: "left",
      //   minRows: 0,
      //   placeholder: " "
      // },
      {
        label: "码长",
        tip: "Chiều dài sợi",
        prop: "yardLength",
        width: 100,
        span: 8,
        type: "number",
        align: "left",
        minRows: 0,
        placeholder: " "
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
        props: {
          label: "itemName",
          value: "itemName"
        },
        dicData: [] //getDIC("QC_CLOTH_VISITING_REMOVE")
      }
    ]
  };
}

export function dlgCrud(_this) {
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
    column: [
      {
        label: "缸号(Số lô nhuộm)",
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "浮重(Trọng lượng bì KG)",
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " "

        // type: "number",
        // precision: 1
      },
      {
        label: "浮重(trọng lượng bì LBS)",
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " ",
        disabled: true
      },
      {
        label: "净重(trọng lượng tịnh KG)",
        prop: "netWeight",
        width: 150,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: "净重(trọng lượng tịnh LBS)",
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      // {
      //   label: "纸管重量(Trọng lượng thoi giấy)",
      //   prop: "paperTube",
      //   width: 180,
      //   align: "right",
      //   minRows: 0,
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   precision: 1
      // },

      // {
      //   label: "QC扣减数量(Số lượng QC cắt giảm)",
      //   prop: "qcTakeOut",
      //   width: 160,
      //   align: "right",
      //   span: 6,
      //   cell: true,
      //   placeholder: " ",
      //   type: "number",
      //   minRows: 0,
      //   precision: 1
      // },
      // {
      //   label: "载具编号(Mã lồng thép)",
      //   prop: "storeLoadCode",
      //   span: 8,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   sortable: true,
      //   width: 160
      // },
      // {
      //   label: "存储位置(Vị trí lưu trữ)",
      //   prop: "storeSiteCode",
      //   cell: true,
      //   width: 220,
      //   placeholder: " ",
      //   type: "select",
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      //   dicData: getDicT("whseLocation", "locationCode", "locationCode")
      // },

      {
        label: "克重(Trọng lượng trước giặt)",
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 130,
        span: 8,
        cell: true,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label: "幅宽(Khổ rộng vải mộc)",
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
      {
        label: "码长(Chiều dài sợi)",
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
        label: "验布员工号(Số thẻ người đứng máy)",
        prop: "clothChecker",
        span: 8,
        placeholder: " ",
        width: 180,
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
        width: 200
      }
    ]
  };
}

export function secondForm(_this) {
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
        tip: "Khách hàng",
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
      },
      {
        label: "验布员工号",
        prop: "clothChecker",
        span: 6,
        placeholder: " ",
        width: 180,
        overHidden: true
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
        width: 180
      },
      {
        label: "成品布状态",
        tip: "Cloth state",
        prop: "clothState",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "已称重装笼(Cân nặng)",
            value: 1
          },
          {
            label: "已入仓(Vào nhà kho)",
            value: 2
          },
          {
            label: "已出仓(hết hàng)",
            value: 3
          }
        ]
      }
    ]
  };
}
export function secondCrud(_this) {
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
    height: "calc(100vh - 330px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: false,
    menuTitle: "称重",
    // sumColumnList: [],
    column: [
      {
        label: "缸号(Số lô nhuộm)",
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
        label: "訂單號(PO khách hàng)",
        prop: "poNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        hide: true
      },
      {
        label: "客戶(Khách hàng)",
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
        overHidden: true,
        hide: true
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
        label: "产地(xưởng sản xuất)",
        prop: "originPlace",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true,
        hide: true
      },

      {
        label: "匹號(Số cây vải)",
        prop: "pidNo",
        width: 100,
        align: "right",
        sortable: true,
        span: 6,
        type: "number",
        precision: 0
      },
      {
        label: "码长(Chiều dài sợi)",
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
        label: "浮重(Trọng lượng bì KG)",
        prop: "grossWeight",
        width: 120,
        align: "right",
        span: 6,
        cell: false,
        type: "number",
        minRows: 0,
        precision: 1,
        placeholder: " "
      },
      {
        label: "浮重(trọng lượng bì LBS)",
        tip: "trọng lượng bì(LBS)",
        prop: "grossWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " ",
        disabled: true
      },
      {
        label: "净重(trọng lượng tịnh KG)",
        prop: "netWeight",
        width: 150,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        minRows: 0,
        precision: 1
      },
      {
        label: "净重(trọng lượng tịnh LBS)",
        tip: "trọng lượng tịnh(LBS)",
        prop: "netWeightLbs",
        width: 120,
        span: 8,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "right",
        placeholder: " "
      },
      {
        label: "纸管重量(Trọng lượng thoi giấy)",
        prop: "paperTube",
        width: 180,
        align: "right",
        minRows: 0,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
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
        precision: 1
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
      {
        label: "备注(ghi chú)",
        prop: "remark",
        width: 250,
        placeholder: " ",
        overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      },
      {
        label: "克重(Trọng lượng trước giặt)",
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 130,
        span: 8,
        cell: true,
        // type: "number",
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label: "幅宽(Khổ rộng vải mộc)",
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
