/*
 * @Author: PMP
 * @Date: 2022-07-13 12:55:12
 * @LastEditors: 
 * @LastEditTime: 
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "MS đơn sản xuất bp Dệt"

      },
      {
        label: "合并后成品编号",
        prop: "productNo",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label: "疋号",
        prop: "pidNo",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label: "所在部门",
        prop: "handDtp",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      {
        label: "合并人",
        prop: "mergeStaff",
        width: 80,
        align: "right",
        span: 6,
        placeholder: " ",
        disabled: false,
        tip: "Số cây vải"
      },
      // {
      //   label: "合并日期",
      //   prop: "mergeDate",
      //   width: 80,
      //   align: "right",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: false,
      //   tip: "Số cây vải",
      //   type: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss"
      // },

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
    tree: true,
    showOverflowTooltip: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
    column: [
      {
        label: "合并日期",
        prop: "mergeDate",
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        // sortable: true,
        width: 200
      },
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
        label: "合并后成品编号(Mã Thành phẩm)",
        prop: "productNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "疋号(Số cuộn vải)",
        prop: "pidNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后毛重(公斤)",
        prop: "margeGwKg",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后毛重(磅)",
        prop: "margeGwLbs",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后净重(公斤)",
        prop: "margeNwKg",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后净重(磅)",
        prop: "margeNwLbs",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "码长",
        prop: "yardLength",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "所在部门(Bộ phận)",
        prop: "handDtp",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并原因(Lý do)",
        prop: "margeRemark",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并人 (Người thao tác)",
        prop: "mergeStaff",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },


    ]
  };
}

export function recordCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: true,
    tree: true,
    showOverflowTooltip: true,
    highlightCurrentRow: true,
    height: "calc(30vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    // sumColumnList: [],
    column: [
      // {
      //   label: "合并日期",
      //   prop: "mergeDate",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   // sortable: true,
      //   width: 200
      // },
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
        label: "合并后成品编号(Mã Thành phẩm)",
        prop: "productNo",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "码长",
        prop: "yardLength",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        align: "right",
        sortable: true

      },
      {
        label: "合并后毛重(公斤)",
        prop: "margeGwKg",
        align: "right",
        width: 100,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后毛重(磅)",
        prop: "margeGwLbs",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后净重(公斤)",
        prop: "margeNwKg",
        align: "right",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "合并后净重(磅)",
        prop: "margeNwLbs",
        align: "right",
        width: 150,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },
      {
        label: "疋号(Số cuộn vải)",
        prop: "pidNo",
        align: "right",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        sortable: true
      },

      // {
      //   label: "所在部门(Bộ phận)",
      //   prop: "handDtp",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },
      // {
      //   label: "合并原因(Lý do)",
      //   prop: "margeRemark",
      //   width: 180,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },
      // {
      //   label: "合并人 (Người thao tác)",
      //   prop: "mergeStaff",
      //   width: 150,
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true,
      //   overHidden: true,
      //   sortable: true
      // },


    ]
  };
}

export function detailCrud(_this) {
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
    height: "calc(50vh - 140px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    showSummary: false,
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
        // change: () => {}
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
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
      },

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
        label: "成品号码",
        prop: "productNo",
        span: 6,
        placeholder: " ",
        tip: "Mã thành phẩm",
        remote: true,
        rules: [
          {
            required: false,
            message: "",
            trigger: "blur"
          }
        ],
        formslot: true
      },

      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " ",
        tip: "Số lô nhộm",
        remote: true,
        rules: [
          {
            required: false,
            message: "",
            trigger: "blur"
          }
        ],
        formslot: true
      },

      // {
      //   label: "所在部门",
      //   prop: "handDtp",
      //   tipPlacement: "right",
      //   span: 8,
      //   tip: "Bộ phận cắt",
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn"),
      //   rules: [
      //     {
      //       required: true,
      //       message: "請选择部门",
      //       trigger: "blur"
      //     }
      //   ],
      // },
      // {
      //   label: "合并人",
      //   prop: "mergeStaff",
      //   span: 8,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入选合并人",
      //       trigger: "blur"
      //     }
      //   ],
      // },
      // {
      //   label: "合并原因",
      //   prop: "margeRemark",
      //   span: 16,
      //   rules: [
      //     {
      //       required: false,
      //       message: "请输入合并原因",
      //       trigger: "blur"
      //     }
      //   ],
      // },

    ]
  };
}

export function dlgCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(90vh - 120px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: false,
    tree: true,
    rowKey: "index",
    index: true,
    page: true,
    labelWidth: 120,
    showSummary: false,
    menu: true,
    menuWidth: 100,
    selection: false,
    sumColumnList: [
      {
        label: "共",
        name: "vatNo",
        type: "count",
        decimals: 1
      },
      {
        label: " ",
        name: "yardLength",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "netWeightLbs",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeight",
        type: "sum",
        decimals: 1
      },
      {
        label: " ",
        name: "grossWeightLbs",
        type: "sum",
        decimals: 1
      }
    ],
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },

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
        label: "布类名称(Tên loại vải)",
        prop: "fabName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 100,
        overHidden: true,
        hide: true
      },
      // {
      //   label: "客布代码",
      //   // tip: "Số màu",
      //   prop: "guestFabId",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
      // {
      //   label: "成份要求",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "guestComponents",
      //   width: 100,
      //   span: 16,
      //   placeholder: " ",
      //   hide: true
      // },
      // {
      //   label: "款号",
      //   // tip: "Số màu",
      //   prop: "styleNo",
      //   width: 150,
      //   span: 8,
      //   overHidden: true,
      //   placeholder: " "
      // },
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
        // change: () => {}
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
        precision: 1,
        change: () => {
          _this.$nextTick(() => {
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
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
            _this.detail.grossWeight = Number(
              _this.detail.netWeight +
              Number(_this.detail.paperTube || 0) +
              Number(_this.detail.qcTakeOut || 0)
            ).toFixed(2);
          });
        }
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
        // overHidden: true,
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

