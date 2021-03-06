/*
 * @Author: Lyl
 * @Date: 2021-10-06 10:29:51
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-15 14:40:12
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 490px)",
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
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      // {
      //   label: "使用类型",
      //   // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
      //   prop: "useType",
      //   width: 100,
      //   placeholder: " ",
      //   disabled: true,
      //   span: 6,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "出库"
      //     },
      //     {
      //       value: 2,
      //       label: "入库"
      //     },
      //     {
      //       value: 3,
      //       label: "周转"
      //     }
      //   ]
      // },
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
      },
      {
        label: "业务编号",
        // tip: "成份(Thành phần)", //1 出库 2入库 3 周转
        prop: "businessId",
        width: 180,
        placeholder: " ",
        disabled: true,
        span: 6,
        type: "select",
        dicData: getDicT("proBleadyeJob", "vatNo", "bleadyeJobId")
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
        width: 140,
        span: 6,
        type: "select",
        dicData: getDicT("proBleadyeJob", "vatNo", "bleadyeJobId")
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
            value: "1",
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

let baseAreaZone = getDicT("baseAreaZone", "zoneName", "zoneCode");
export function taskCrud(_this) {
  return {
    menu: true,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 80,
    border: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 490px)",
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
      // {
      //   label: "任务类型",
      //   prop: "taskType",
      //   overHidden: true,
      //   width: 120,
      //   span: 6,
      //   type: "select",
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "出库"
      //     },
      //     {
      //       value: 2,
      //       label: "入库"
      //     },
      //     {
      //       value: 3,
      //       label: "周转"
      //     }
      //   ]
      // },
      {
        label: "发送时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "sendTime",
        // width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      {
        label: "响应时间",
        // tip: "开单日期(Ngày lập đơn)",
        prop: "receiveTime",
        // width: 180,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "yyyy-MM-dd hh:mm:ss",
        placeholder: " ",
        // sortable: true,
        overHidden: true,
        disabled: true
      },
      {
        label: "任务状态",
        prop: "taskState",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: [
          {
            value: 1,
            label: "初始状态"
          },
          {
            value: 2,
            label: "运输开始"
          },
          {
            value: 3,
            label: "运输中"
          },
          {
            value: 99,
            label: "已完成"
          }
        ]
      },
      {
        label: "载具",
        prop: "carrierCode",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        overHidden: true,
        dicData: getDicT(
          "whsCarriageStorage",
          "storageCode",
          "carriageStorageId"
        )
      },
      {
        label: "起点",
        prop: "taskStart",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: baseAreaZone
      },
      {
        label: "终点",
        prop: "taskEnd",
        overHidden: true,
        // width: 140,
        span: 6,
        type: "select",
        dicData: baseAreaZone
      }
    ]
  };
}
