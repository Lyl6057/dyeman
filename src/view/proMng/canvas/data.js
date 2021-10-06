/*
 * @Author: Lyl
 * @Date: 2021-10-06 10:29:51
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 19:04:27
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 500px)",
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
        label: "载具编号",
        // tip: "缸号(số lô nhuộm)",
        prop: "whsCarriageStorageFk",
        overHidden: true,
        width: 140,
        span: 6,
        type: "select",
        dicData: getDicT(
          "whsCarriageStorage",
          "storageCode",
          "carriageStorageId"
        )
      },

      {
        label: "使用时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "useTime",
        width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd mm:hh:ss",
        valueFormat: "yyyy-MM-dd mm:hh:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      {
        label: "使用类型",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "useType",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: [
          {
            value: 1,
            label: "出库"
          },
          {
            value: 2,
            label: "入库"
          },
          {
            value: 3,
            label: "周转"
          }
        ]
      },
      {
        label: "业务类型",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "businessType",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: [
          {
            value: "1",
            label: "送货单"
          },
          {
            value: "2",
            label: "入库单"
          },
          {
            value: "3",
            label: "发货单"
          },
          {
            value: "4",
            label: "织单"
          },
          {
            value: "5",
            label: "染单"
          }
        ]
      }
    ]
  };
}

export function billCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 464px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
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
        label: "物品编号",
        // tip: "缸号(số lô nhuộm)",
        prop: "itemObjectId",
        overHidden: true,
        width: 120,
        span: 6
        // type: "select",
        // dicData: getDicT(
        //   "whsCarriageStorage",
        //   "storageCode",
        //   "carriageStorageId"
        // )
      },
      {
        label: "物品类型",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "itemSourceType",
        width: 100,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: [
          {
            value: 1,
            label: "染整"
          }
          // {
          //   value: 2,
          //   label: "入库"
          // },
          // {
          //   value: 3,
          //   label: "周转"
          // }
        ]
      }
    ]
  };
}
