/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-19 10:07:50
 * @Description:
 */

import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "订单号",
        prop: "order",
        span: 6,
        placeholder: " ",
      },
      {
        label: "客户",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "布料编号",
        prop: "fabricCode",
        span: 6,
        placeholder: " ",
      },
      {
        label: "开始日期",
        prop: "startDate",
        span: 6,
        placeholder: " ",
      },
    ],
  }
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
        placeholder: " ",
      },
      {
        label: "客戶名稱",
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "tree",
        dicData: cust,
      },
      {
        label: "订单狀態",
        prop: "poStatus",
        span: 6,
        placeholder: " ",
      },
    ],
  }
}

let cust = getDicT("basCustomer", "custName", "custCode")

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
    labelPosition: 'top',
    labelWidth: 150,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "客户编号(Số khách hàng)",
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "请输入客户编号",
          trigger: "blur"
        }],
        tip: "客户编号(Số khách hàng)"
      },
      {
        label: "客户名称(Tên khách hàng)",
        prop: "custName",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [{
          required: true,
          message: "请输入客户名称",
          trigger: "blur"
        }],
      },
      {
        label: "开始日期(Ngày bắt đầu)",
        prop: "startDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [{
          required: true,
          message: "请選擇出胚布日期",
          trigger: "blur"
        }],
      },
      {
        label: "接单日期(Ngày đặt hàng)",
        prop: "issuedDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        // sortable: true,
        rules: [{
          required: true,
          message: "请選擇接单日期",
          trigger: "blur"
        }],
      },
      {
        label: "合同号(Số hợp đồng)",
        prop: "contractNo",
        width: 180,
        span: 6,
        placeholder: " ",
        sortable: true,
        overHidden: true,
      },
      {
        label: "客户单号(Số duy nhất khách hàng)",
        prop: "po",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "交货日期(Ngày giao hàng)",
        prop: "custDeliveDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        // sortable: true,
      },
      {
        label: "L/D完成日期(Ngày hoàn thành L/D)",
        prop: "ldFinishDate",
        width: 180,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
      },

      {
        label: "送办数量(Gửi số)",
        prop: "sendingSampleQuantity",
        width: 100,
        placeholder: " ",
        span: 6,
        rules: [{
          required: true,
          message: "请输入送办数量",
          trigger: "blur"
        }],
        type: "number",
        align: "left",
        precision: 2
      },
      {
        label: "布料编号(Vải số)",
        prop: "fabricCode",
        width: 140,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "胚布面料(Phôi vải)",
        prop: "greigeFabricLocation",
        width: 300,
        span: 12,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "办数量(Số lượng)",
        prop: "sampleQuantity",
        width: 100,
        placeholder: " ",
        span: 6,
        rules: [{
          required: true,
          message: "请输入办数量",
          trigger: "blur"
        }],
        type: "number",
        align: "left",
      },
      {
        label: "送办大小(Gửi kích thước)",
        prop: "sampleSize",
        width: 100,
        placeholder: " ",
        span: 6,
        type: "number",
        align: "left",
      },

      {
        label: "检验标准(Tiêu chuẩn kiểm tra)",
        prop: "checkStandar",
        overHidden: true,
        width: 200,
        span: 12,
        hide: true,
        placeholder: " ",
      },
      {
        label: "洗水(Rửa nước)",
        prop: "washingFastmess",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " ",
      },
      {
        label: "水牢度(Độ bền của nước)",
        prop: "waterFastness",
        overHidden: true,
        width: 120,
        span: 6,
        hide: true,
        placeholder: " ",
      },
      {
        label: "Dry rubbing fastness",
        prop: "dryRubbingFastness",
        overHidden: true,
        width: 180,
        span: 6,
        hide: true,
        placeholder: " ",
      },
      {
        label: "Wet rubbing Fastness",
        prop: "wetRubbingFastness",
        overHidden: true,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Color change fastness",
        prop: "colorChangeFastness",
        overHidden: true,
        hide: true,
        width: 180,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Perspiration  Fastnesss",
        prop: "perspirationFastnesss",
        overHidden: true,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Dark color",
        prop: "darkColor",
        overHidden: true,
        disabled: false,
        width: 120,
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Light color",
        prop: "lightColor",
        overHidden: true,
        disabled: false,
        hide: true,
        width: 120,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Durable water repellent DWR test",
        prop: "durableWaterRepellentDwrTest",
        overHidden: true,
        hide: true,
        width: 250,
        span: 6,
        placeholder: " ",
      },
      {
        label: "pH value",
        prop: "phValue",
        overHidden: true,
        hide: true,
        disabled: false,
        width: 120,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Capitalization method:",
        prop: "capitalizationMethod",
        overHidden: true,
        disabled: false,
        width: 180,
        hide: true,
        span: 6,
        placeholder: " ",
      },
      {
        label: "Eliminate capitalization:",
        prop: "eliminateCapitalization",
        overHidden: true,
        disabled: false,
        hide: true,
        width: 180,
        span: 6,
        placeholder: " ",
      },
      {
        label: "接单人(Đĩa đơn)",
        prop: "issuedBy",
        width: 100,
        span: 6,

        placeholder: " ",
      },
      {
        label: "跟单人(Với một người duy nhất)",
        prop: "consider",
        width: 100,
        span: 6,
        placeholder: " ",
      },
      {
        label: "批准人(Người phê duyệt)",
        prop: "approvedBy",
        width: 100,
        span: 6,
        placeholder: " ",
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
  }

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
        display: false,
      },
      {
        label: "訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true,
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust,
      },
      {
        label: "订单日期",
        prop: "poDate",
        width: 130,
        type: "date",
        align: 'center',
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
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
      },
    ],
  }
}


export function longCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
      },
      {
        label: "纱长",
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true
      },
      {
        label: "時間",
        prop: "signDate",
        type: "datetime",
        width: 200,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
        cell: true
      },
    ],
  }
}

export function yarnCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 112px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false,
      // },
      {
        label: "紗線編號",
        prop: "yarnCode",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "紗線名稱",
        prop: "yarnName",
        width: 400,
        overHidden: true,
        span: 6,
        cell: true
      },
      {
        label: "批號",
        prop: "yarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "本厂批號",
        prop: "factoryYarnBatch",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "紗牌",
        prop: "yarnBrand",
        width: 150,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "數量",
        prop: "amount",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },
      {
        label: "單位",
        prop: "unit",
        width: 100,
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_matUnit")
      }
    ],
  }
}

export function groupCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center",
      },
      {
        label: "批次分組名稱",
        prop: "groupName",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "更換批次時間",
        prop: "changeBatchTime",
        width: 180,
        span: 6,
        cell: true,
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
    ],
  }
}

export function calicoCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
      },
      {
        label: "重量",
        prop: "weight",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },

      {
        label: "门幅",
        prop: "breadth",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（WPI)",
        prop: "wpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（CPI）",
        prop: "cpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
    ],
  }
}

export function strainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
      },
      {
        label: "輸送張力",
        prop: "lineTension",
        width: 120,
        cell: true,
        align: "right",
        span: 6,
      },

    ],
  }
}

