/*
 * @Author: Lyl
 * @Date: 2022-04-25 14:09:54
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 11:05:46
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\data.js
 * @Description:
 */
import { getDIC,getDicT } from '@/config/index';

export const outExit = [
  {
    label: "Q1",
    value: "Q1"
  },
  {
    label: "Q2",
    value: "Q2"
  },
  {
    label: "Q3",
    value: "Q3"
  },
  {
    label: "Q4",
    value: 'Q4'
  },
  {
    label: "Q5",
    value: "Q5"
  },
  {
    label: "Q6",
    value: "Q6"
  },
  {
    label: "Q7",
    value: 'Q7'
  },
  {
    label: 'Q8',
    value: 'Q8'
  },
  {
    label: 'Q9',
    value: 'Q9'
  },
  {
    label: "Q10",
    value: "Q10"
  },
  {
    label: "Y1",
    value: "Y1"
  },
  {
    label: "Y3",
    value: "Y3"
  },
  {
    label: "Y5",
    value: "Y5"
  },
  {
    label: "Y7",
    value: "Y7"
  },
  {
    label: "S4",
    value: "S4"
  },
  {
    label: "S10",
    value: "S10"
  }
];

export const sbExit = [
  {
    label: "S1",
    value: "S1"
  },
  // {
  //   label: "S2",
  //   value: "S2"
  // },
  {
    label: "S3",
    value: "S3"
  },
  // {
  //   label: "S4",
  //   value: 'S4'
  // },
  {
    label: "S5",
    value: "S5"
  },
  // {
  //   label: "S6",
  //   value: "S6"
  // },
  {
    label: "S7",
    value: 'S7'
  },
  // {
  //   label: 'S8',
  //   value: 'S8'
  // },
  // {
  //   label: 'S9',
  //   value: 'S9'
  // },
  // {
  //   label: "S10",
  //   value: "S10"
  // },
  // {
  //   label: "S11",
  //   value: "S11"
  // },
  // {
  //   label: "S12",
  //   value: "S12"
  // }
];

const inExit = [
  {
    label: "A出入库口(7001扫码)",
    value: "A"
  },
  {
    label: "B出入库口",
    value: "B"
  },
  {
    label: "C出入库口(7002扫码)",
    value: "C"
  },
  {
    label: "D出入库口(7003扫码)",
    value: "D"
  },
  {
    label: "D1空笼暂存口",
    value: "D1"
  },
  {
    label: "E出库口",
    value: "E"
  },
  {
    label: "F出入库口",
    value: "F"
  },
  {
    label: "G出入库口(7004扫码)",
    value: "G"
  }
];

const crudCommonConfig = {
  menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 180,
    border: true,
    stripe: true,
    index: false,
    highlightCurrentRow: true,
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 100,
    page: false,
}

export function inCheckListOp(_this) {
  return {
    ...crudCommonConfig,
    height: "calc(100vh - 360px)",
    column: [
      {
        label: "货位号",
        prop: "index",
        width: 100,
        align: "center",
        display: false,
        fixed: true
      },
      {
        label: "载具编号",
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 140,
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 180,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
      },
      {
        label: "疋数",
        prop: "piiCount",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
      {
        label: "到位时间",
        prop: "workDate",
        width: 120,
        span: 6,
        type: "time",
        align: "center",
        format: "HH:mm:ss",
        valueFormat: "HH:mm:ss"
      },
    ]
  };
}

export function waitCheckListOp(_this) {
  return {
    ...crudCommonConfig,
    index: true,
    height: "calc(100vh - 125px)",
    column: [
      {
        label: "载具编号",
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 140,
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 160,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
      },
      {
        label: "疋数",
        prop: "piiCount",
        width: 80,
        span: 6,
        align: "right",
        placeholder: " "
      },
    ]
  };
}

export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [
      // {
      //   label: "操作类型",
      //   prop: "type",
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   clearable: false,
      //   dicData: [
      //     {
      //       label: "验布移库(out)",
      //       value: 1
      //     },
      //     {
      //       label: "验布回库(in)",
      //       value: 2
      //     }
      //   ],
      //   change: val => {
      //     _this.typeChange(val.value);
      //   }
      // },
      {
        label: "载具编号",
        prop: "palletCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },

      {
        label: "货位码",
        prop: "storageId",
        span: 6,
        placeholder: " "
      }
      // {
      //   label: "验布口",
      //   prop: "exit",
      //   clearable: false,
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   dicData: inExit
      // }
    ]
  };
}

export function inWhseFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [
      {
        label: "载具编号",
        prop: "code",
        span: 6,
        placeholder: " "
      },
      {
        label: "库口编号",
        prop: "entrance",
        span: 6,
        placeholder: " ",
        type: 'select',
        dicData: getDicT("whseWayIoState","passwayName","passwayName",{},"sn")
      },
      {
        label: "层数",
        prop: "layer",
        span: 6,
        placeholder: " ",
        width: 125,
        type: "select",
        dicData: [
          {
            label: "一层",
            value: 1
          },
          {
            label: "二层",
            value: 2
          }
        ]
      }
    ]
  };
}

export function inWhseFormDlgOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [
      {
        label: "缸号",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
    
    ]
  };
}

export function crudOp(_this) {
  return {
    menu: true,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 200,
    border: true,
    stripe: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 238px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    expandLevel: 2,
    showSummary: false,
    sumColumnList: [],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },

      {
        label: "载具编号",
        prop: "palletCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 90,
        fixed: true
      },
      {
        label: "缸号",
        prop: "vatNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        fixed: true
      },
      {
        label: "疋数",
        prop: "piiCount",
        width: 60,
        span: 6,
        align: "right",
        placeholder: " "
      },
      {
        label: "疋号",
        prop: "pidNos",
        width: 220,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "存储位置",
        prop: "storageId",
        cell: false,
        width: 130,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "客人訂單號",
        prop: "custPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "本厂訂單號",
        prop: "salPoNo",
        width: 120,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true
      },
      {
        label: "客戶",
        prop: "custCode",
        width: 120,
        disabled: true,
        placeholder: " ",
        span: 6,
        display: false,
        overHidden: true
      },
      {
        label: "开單日期",
        tip: "Ngày lập đơn",
        prop: "workDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "交货日期",
        prop: "deliveDate",
        width: 120,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "布料编号",
        prop: "fabricCode",
        width: 100,
        overHidden: true,
        // sortable: true,
        span: 6
      },
      {
        label: "布料名称",
        prop: "fabName",
        width: 250,
        overHidden: true,
        span: 6
      },

      {
        label: "头缸/缸差",
        disabled: false,
        prop: "firstOrOther",
        width: 100,
        type: "switch",
        dicData: [
          {
            label: "头缸",
            value: "1"
          },
          {
            label: "缸差",
            value: "2"
          }
        ],
        hide: false,
        placeholder: " "
      },

      {
        label: "顏色",
        prop: "colorName",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "色号",
        prop: "colorCode",
        disabled: true,
        placeholder: " ",
        span: 6,
        width: 120,
        overHidden: true
      },
      {
        label: "克重",
        prop: "gramWeight",
        width: 120,
        span: 8,
        cell: false,
        align: "left",
        placeholder: " ",
        overHidden: true
      },
      {
        label: "幅宽",
        prop: "breadth",
        width: 120,
        cell: false,
        span: 8,
        align: "left",
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}

export function inWhseCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 200,
    border: true,
    stripe: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 208px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: true
      },

      {
        label: "载具编号",
        prop: "storeLoadCode",
        span: 8,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        fixed: true
      },
      {
        label: "缸号",
        prop: "prodNo",
        width: 140,
        span: 6,
        placeholder: " ",
        disabled: true,
        overHidden: true,
        fixed: true
      },
      {
        label: "疋号",
        prop: "countingNo",
        width: 100,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "成品编号",
        prop: "productNo",
        cell: false,
        width: 160,
        overHidden: true,
        placeholder: " "
      },
      {
        label:"重量",
        prop: "woWeights",
        cell: false,
        width: 100,
        align: "right"
      },
      {
        label:"单位",
        prop: "woUnit",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
      }
    ]
  };
}

export function inWhseCrudPBOp(_this) {
  return {
    menu: false,
    addBtn: false,
    cancelBtn: false,
    editBtn: false,
    delBtn: false,
    menuWidth: 200,
    border: true,
    stripe: true,
    index: false,
    highlightCurrentRow: true,
    height: "calc(100vh - 208px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 100,
    selection: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display:true ,
        fixed: true
      },
      {
        label:"织单号",
        prop: "weaveJobCode",
        cell: false,
        width: 170,
        align: "right"
      },
     
      {
        label: "重量",
        prop: "woWeights",
        width: 70,
        span: 6,
        placeholder: " ",
        disabled: true,
     
        fixed: true
      },
      {
        label: "单位",
        prop: "woUnit",
        width: 100,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "布票号",
        prop: "noteCode",
        cell: false,
        width: 250,
        placeholder: " "
      },
      {
        label: "疋号",
        prop: "countingNo",
        span: 8,
        placeholder: " ",
        cell: true,
   
        width: 120,
        fixed: true
      },
    
    ]
  };
}


export function taskForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
          {
            label: "验布出库",
            value: 3
          },
          {
            label: "验布入库",
            value: 4
          },
          {
            label: "松布出库",
            value: 5
          },
          {
            label: "松布入库",
            value: 6
          }
        ],
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },

      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 0
          }
        ]
      },
      {
        label: "完成状态",
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      }
    ]
  };
}

export function taskCrud(_this) {
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
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    column: [
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
          {
            label: "验布出库",
            value: 3
          },
          {
            label: "验布入库",
            value: 4
          },
          {
            label: "松布出库",
            value: 5
          },
          {
            label: "松布入库",
            value: 6
          }
        ],
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        width: 120,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },
      {
        label: "货位码",
        prop: "storageCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 0
          }
        ]
      },
      {
        label: "完成状态",
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      },
      {
        label: "完成的信息",
        prop: "finishInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "返回的信息",
        prop: "returnInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "请求返回结果",
        prop: "returnStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "创建时间",
        prop: "createTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "响应时间",
        prop: "updateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "完成时间",
        prop: "endTime",
        type: "datetime",
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

export function taskHistoryCrud(_this) {
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
    height: "calc(900vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    column: [
      {
        label: "创建时间",
        prop: "createTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "入口编号",
        prop: "entrance",
        clearable: false,
        width: 120,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        type: "select",
        dicData: outExit
      },
      {
        label: "指令类型",
        prop: "orderType",
        clearable: false,
        span: 5,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "正常入库",
            value: 1
          },
          {
            label: "正常出库",
            value: 2
          },
          {
            label: "验布出库",
            value: 3
          },
          {
            label: "验布入库",
            value: 4
          },
          {
            label: "松布出库",
            value: 5
          },
          {
            label: "松布入库",
            value: 6
          }
        ],
      },
      {
        label: "物料类别",
        prop: "type",
        clearable: false,
        span: 6,
        placeholder: " ",
        cell: true,
        overHidden: true,
        width: 120,
        type: "select",
        dicData: [
          {
            label: "胚布",
            value: 1
          },
          {
            label: "成品布",
            value: 2
          }
        ]
      },
      {
        label: "载具条码",
        prop: "barCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
     
      {
        label: "货位码",
        prop: "storageCode",
        span: 6,
        width: 120,
        placeholder: " ",
        cell: true,
        overHidden: true
      },
      {
        label: "是否空布笼",
        prop: "isEmpty",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 0
          }
        ]
      },
      {
        label: "完成状态",
        prop: "finishStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        sortable: true,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "已完成",
            value: 1
          },
          {
            label: "进行中",
            value: 0
          }
        ]
      },
      {
        label: "完成的信息",
        prop: "finishInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "返回的信息",
        prop: "returnInfo",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
      {
        label: "请求返回结果",
        prop: "returnStatus",
        span: 6,
        placeholder: " ",
        width: 125,
        overHidden: true
      },
     
      {
        label: "响应时间",
        prop: "updateTime",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        span: 6,
        align: "center",
        sortable: true,
        width: 200
      },
      {
        label: "完成时间",
        prop: "endTime",
        type: "datetime",
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
    page: true,
    labelWidth: 100,
    selection: true,
    showSummary: false,
    menuTitle: "称重",
  
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
    

   
      // {
      //   label: "备注(ghi chú)",
      //   prop: "remark",
      //   width: 250,
      //   placeholder: " ",
      //   // overHidden: true,
      //   cell: true,
      //   type: "select",
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      //   dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      // },





      // {
      //   label: "克重(Trọng lượng trước giặt)",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "realGramWeight",
      //   width: 130,
      //   span: 8,
      //   cell: true,
      //   // type: "number",
      //   align: "left",
      //   placeholder: " ",
      //   overHidden: true
      // },
      // {
      //   label: "幅宽(Khổ rộng vải mộc)",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "actualSideBreadth",
      //   width: 120,
      //   cell: true,
      //   span: 8,
      //   // type: "number",
      //   align: "left",
      //   placeholder: " ",
      //   overHidden: true
      // },

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

      // {
      //   label: "验布员工号(Số thẻ người đứng máy)",
      //   prop: "clothChecker",
      //   span: 8,
      //   placeholder: " ",
      //   width: 180,
      //   sortable: true,
      //   overHidden: true
      // },
      // {
      //   label: "验布时间(thời gian in)",
      //   prop: "clothCheckTime",
      //   type: "date",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   // sortable: true,
      //   width: 200
      // }
    ]
  };
}


export function DlgtaskCrud(_this) {
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
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    selection: false,
    showSummary: false,
    column: [
      {
        label: "任务ID",
        prop: "taskId",
        span: 6,
        align: "center",
        width: 70
      },
      {
        label: "前置任务",
        prop: "preTaskId",
        width: 70,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "WMS编号",
        prop: "wmsTaskId",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "托盘吗",
        prop: "barCode",
        width: 70,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "任务状态",
        prop: "taskStatus",
        width: 100,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "执行车辆",
        prop: "processingRgvNo",
        width: 70,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "任务类型",
        prop: "taskType",
        width: 70,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "小车进度",
        prop: "rgvProgress",
        width: 70,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "添加时间",
        prop: "createTime",
        width: 130,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      {
        label: "执行时间",
        prop: "executeTime",
        width: 130,
        span: 6,
        placeholder: " ",
        overHidden: true,
      },
      
  
      // {
      //   label: "指令类型",
      //   prop: "orderType",
      //   clearable: false,
      //   span: 5,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "正常入库",
      //       value: 1
      //     },
      //     {
      //       label: "正常出库",
      //       value: 2
      //     },
      //     {
      //       label: "验布出库",
      //       value: 3
      //     },
      //     {
      //       label: "验布入库",
      //       value: 4
      //     },
      //     {
      //       label: "松布出库",
      //       value: 5
      //     },
      //     {
      //       label: "松布入库",
      //       value: 6
      //     }
      //   ],
      // },
      // {
      //   label: "物料类别",
      //   prop: "type",
      //   clearable: false,
      //   span: 6,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true,
      //   width: 120,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "胚布",
      //       value: 1
      //     },
      //     {
      //       label: "成品布",
      //       value: 2
      //     }
      //   ]
      // },
      // {
      //   label: "载具条码",
      //   prop: "barCode",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true
      // },
     
      // {
      //   label: "货位码",
      //   prop: "storageCode",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   cell: true,
      //   overHidden: true
      // },
      // {
      //   label: "是否空布笼",
      //   prop: "isEmpty",
      //   span: 6,
      //   placeholder: " ",
      //   width: 125,
      //   sortable: true,
      //   overHidden: true,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "是",
      //       value: 1
      //     },
      //     {
      //       label: "否",
      //       value: 0
      //     }
      //   ]
      // },
      // {
      //   label: "完成状态",
      //   prop: "finishStatus",
      //   span: 6,
      //   placeholder: " ",
      //   width: 125,
      //   sortable: true,
      //   overHidden: true,
      //   type: "select",
      //   dicData: [
      //     {
      //       label: "已完成",
      //       value: 1
      //     },
      //     {
      //       label: "进行中",
      //       value: 0
      //     }
      //   ]
      // },
      // {
      //   label: "完成的信息",
      //   prop: "finishInfo",
      //   span: 6,
      //   placeholder: " ",
      //   width: 125,
      //   overHidden: true
      // },
      // {
      //   label: "返回的信息",
      //   prop: "returnInfo",
      //   span: 6,
      //   placeholder: " ",
      //   width: 125,
      //   overHidden: true
      // },
      // {
      //   label: "请求返回结果",
      //   prop: "returnStatus",
      //   span: 6,
      //   placeholder: " ",
      //   width: 125,
      //   overHidden: true
      // },
     
      // {
      //   label: "响应时间",
      //   prop: "updateTime",
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   span: 6,
      //   align: "center",
      //   sortable: true,
      //   width: 200
      // },
      // {
      //   label: "完成时间",
      //   prop: "endTime",
      //   type: "datetime",
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



