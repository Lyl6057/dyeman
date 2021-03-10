import { getDIC, getDicT, postDicT, getXDicT } from '@/config/index'


export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: "retCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? false : true
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        display: _this.hide === "6" ? false : true,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "出倉编号",
        prop: "woOutno",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? true : false
      },
      {
        label: "出倉日期",
        prop: "woDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        display: _this.hide === "6" ? true : false
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "2" ? true : false,
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6"

      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        display: _this.hide === '6',
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === '6' ? false : true,
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
      },
    ],
  }
}
export function rsxkr2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出仓编号",
        prop: "retCode",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        disabled: !_this.isPlan,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        disabled: true,
        display: _this.hide === '6' ? false : true,
        dicData: getDIC('Whse_out_type'),
      },
      {
        label: "配料编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "2" ? true : false,
        disabled: true
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        display: false,
        span: 6,
        placeholder: " ",
        type: "select",
        hide: _this.hide === '6' ? false : true,
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '6',
        disabled: true
      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        display: _this.hide === '6',
        disabled: true
      },
    ],
  }


}
export function rsxkr1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 210px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "whseMaterialoid",
        prop: "whseMaterialoid",
        hide: true,
      },
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "创建日期",
        prop: "sysCreated",
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        align: "center",
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true,
      },
      {
        label: "出仓编号",
        prop: "retCode",
        cell: true,
        width: 180,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        hide: _this.hide === '6' ? true : false
      },
      {
        label: "出仓编号",
        prop: "woOutno",
        cell: true,
        width: 180,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        hide: _this.hide != '6' ? true : false,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },

      {
        label: "出倉类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC('Whse_out_type'),
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        hide: _this.hide === '6'
      },
      {
        label: "出倉日期",
        prop: "retDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
        width: 200,
        hide: _this.hide === '6'
      },
      {
        label: "出倉日期",
        prop: "woDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
        hide: _this.hide != '6',
        width: 200,
      },
      {
        label: "货运计划编号",
        prop: "spNo",
        span: 6,
        cell: true,
        width: 200,
        hide: _this.hide === "6" ? false : true,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "spNo";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = '货运计划编号';
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        },
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
        click: () => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: "配料编号",
        prop: "retBatch",
        cell: false,
        width: 180,
        hide: _this.hide === "1" || _this.hide === "2" ? false : true,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        },
        // type: "select",
        // dicData:
        //   getDicT('basCustomer', 'custCode', 'custCode')
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
        hide: _this.hide === '6' ? false : true
      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        hide: _this.hide != '6',
        width: 120,
      },
      {
        label: "备注",
        prop: "retRemarks",
        span: 6,
        cell: true,
        placeholder: " ",
        hide: _this.hide == '4' || _this.hide == '3' ? false : true,
        width: 500,
      },
    ],
  }

}
export function rsxkr2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 288px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    // showSummary: true,
    // sumColumnList: [
    //   {
    //     label: ' ',
    //     name: 'weight',
    //     type: 'sum',
    //   },
    // ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "whseMaterialDlaoid",
        prop: "whseMaterialDlaoid",
        hide: true,
      },
      // {
      //   label: "本厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      //   hide: true
      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: true
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

      // },
      // {
      //   label: "设备名称",
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: true
      // },
      // {
      //   label: "加工厂代号",
      //   prop: "refCode",
      //   cell: true,
      //   width: 120,
      //   hide: true
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

      // },
      // {
      //   label: "加工厂名称",
      //   prop: "refName",
      //   cell: true,
      //   width: 120,
      //   hide: true
      // },
      // {
      //   label: "入仓编号",
      //   prop: "yinId",
      //   hide: true,
      //   // hide: _this.hide != '4',
      //   width: 180,
      //   type: "select",
      //   dicData: getDicT("whseCalicoin/v1.0/list", "yinId", "whseCalicoinoid"),
      // },
      // {
      //   label: "生產單號",
      //   prop: "prodNo",
      //   cell: true,
      //   hide: true,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },

      {
        label: "胚布编号",
        prop: "calicoId",
        cell: _this.hide === '6' ? false : true,
        width: 140,
        hide: _this.hide === '6' ? true : false
      },
      {
        label: "胚布名称",
        prop: "clothName",
        cell: _this.hide === '6' ? false : true,
        width: 400,
        hide: _this.hide === '6' ? true : false
      },
      {
        label: "订单号",
        prop: "woOrderno",
        cell: false,
        width: 140,
        hide: _this.hide === '6' ? false : true
      },
      {
        label: "胚布编号",
        prop: "woMatno",
        cell: false,
        width: 140,
        hide: _this.hide === '6' ? false : true
      },
      {
        label: "胚布名称",
        prop: "woMatname",
        cell: false,
        width: 400,
        hide: _this.hide === '6' ? false : true
      },
      // {
      //   label: "批次/批号",
      //   prop: "batchNo",
      //   cell: true,
      //   width: 180,
      // },
      // {
      //   label: "重量",
      //   prop: "weight",
      //   cell: true,
      //   width: 100,
      //   align: "right",
      // },
      // {
      //   label: "单位",
      //   prop: "weightUnit",
      //   cell: true,
      //   width: 100,
      //   type: "select",
      //   dicData: getDIC("Whse_Transfer_unit"),
      // },

      {
        label: "纱线出仓",
        prop: "WhseRetyarninFk",
        hide: true,
        width: 100,

      },
    ],
  }

}
export function rcpb3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '1' || _this.hide === '2' ? 'calc(100vh - 330px)' : 'calc(100vh - 285px)',
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseCalicoinDtlbOid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },

    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "来胚入仓批号资料OID",
        prop: " whseCalicoinDtlbOid",
        hide: true,
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: true, width: 180,
        hide: _this.hide === '6' ? true : false
      },
      {
        label: "生产单号",
        prop: "prodNo",
        cell: true, width: 180,
        hide: _this.hide != '6' ? true : false,
        type: "select",
        dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),

      },
      {
        label: "疋号",
        prop: "countingNo",
        cell: true,
        width: 80,
        align: "right",
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "重量单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("Whse_Transfer_unit"),
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "客人布票号",
        prop: "custTicket",
        cell: true,
        width: 150,
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      }
    ]
  }

}

let rsxkr3CDic = getXDicT("whseCalicoinDtla/v1.0/list")
let Dtlb = getXDicT("whseCalicoinDtlb/v1.0/list")
// 退供应商、客人明细
export function rsxkr3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 287px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'retTotalpi',
        type: 'sum',
      },
      {
        label: ' ',
        name: 'retTotalweight',
        type: 'sum',
      },
      {
        label: ' ',
        name: 'traWeight',
        type: 'sum',
      },

    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "whseRetreatDtloid",
        prop: "whseRetreatDtloid",
        hide: true,
      },
      {
        label: "入仓编号",
        prop: "$whseCalicoinFk",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseCalicoin/v1.0/list", "yinId", "whseCalicoinoid"),
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "入仓编号2",
        prop: "whseCalicoinFk",
        cell: false,
        width: 500,
        type: "select",
        hide: false,
        props: {
          label: "whseCalicoinFk",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "胚布编码",
        prop: "calicoId",
        cell: false,
        width: 140,
        type: "select",
        props: {
          label: "calicoId",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === '5' ? true : false
      },
      // {
      //   label: "胚布名称",
      //   prop: "clothName",
      //   cell: true,
      //   width: 140,
      //   type: "select",
      //   dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      // },
      {
        label: "生产单号",
        prop: "prodNo",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),
        hide: _this.hide != '5' ? true : false
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: false,
        width: 180,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseCalicoinDtlaoid"
        },
        dicData: rsxkr3CDic,
      },
      {
        label: _this.hide === '5' ? '疋号' : "疋数",
        prop: "countingNo",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "countingNo",
          value: _this.hide === '5' ? "whseCalicoinDtlboid" : "whseCalicoinDtlaoid"
        },
        dicData: _this.hide === '5' ? Dtlb : rsxkr3CDic,
        // hide: _this.hide === '5' ? true : false
      },

      {
        label: "重量",
        prop: "weight",
        cell: false,
        width: 140,
        align: "right",
        type: "select",
        props: {
          label: "weight",
          value: _this.hide === '5' ? "whseCalicoinDtlboid" : "whseCalicoinDtlaoid"
        },
        dicData: _this.hide === '5' ? Dtlb : rsxkr3CDic,
      },
      {
        label: "退回总疋数",
        prop: "retTotalpi",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "退回重量",
        prop: "retTotalweight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "调仓重量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != '5' ? true : false
      },
      {
        label: "单位",
        prop: "retCompany",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC("Whse_Transfer_unit"),
      },

    ],
  }

}
// 本廠配料
export function planCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 210px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "whseMaterialPlanoid",
        prop: "whseMaterialPlanoid",
        hide: true,
      },
      {
        label: "计划编号",
        prop: "retBatch",
        width: 120,
        cell: true,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != '1' ? true : false
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },

      },
      {
        label: "设备名称",
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != '1' ? true : false
      },
      {
        label: "加工厂代号",
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != '2' ? true : false
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },

      },
      {
        label: "加工厂名称",
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != '2' ? true : false
      },
      {
        label: "生產單號",
        prop: "prOn",
        cell: true,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "胚布编号",
        prop: "calicoId",
        cell: true,
        width: 120,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "胚布名称",
        prop: "clothName",
        cell: true,
        width: 450,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },

      // {
      //   label: "批号",
      //   prop: "batchNo",
      //   cell: true,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: "布票号",
      //   prop: "custTicket",
      //   cell: true,
      //   width: 180,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC("Whse_Transfer_unit"),
      },

    ],
  }

}
// 外廠配料
export function PlanOutCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "VWhseRetyarninoutPlanoid",
        prop: "VWhseRetyarninoutPlanoid",
        hide: true,
      },
      // {
      //   label: "外厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },

      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

      // },
      // {
      //   label: "设备名称",
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'
      // },
      // {
      //   label: "加工厂代号",
      //   prop: "refCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'
      //   // click: (val) => {
      //   //   _this.iptChange(_this.chooseData);
      //   // },

      // },
      // {
      //   label: "加工厂名称",
      //   prop: "refName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '2'
      // },
      {
        label: "生產單號",
        prop: "prOn",
        cell: true,
        width: 140,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "纱线编号",
        prop: "yarnsId",
        cell: true,
        width: 120,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: true,
        width: 250,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },

      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 180,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "锭数",
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
    ],
  }

}

export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "计划编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
      },
      {
        label: "设备编号",
        prop: "equCode",
        span: 6,
        display: _this.hide === '1' ? true : false,
        placeholder: " ",
      },
      {
        label: "工厂代号",
        prop: "refCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === '2' ? true : false
      },
      // {
      //   label: "生产单号",
      //   prop: "prOn",
      //   span: 6,
      //   placeholder: " ",
      // },
      {
        label: "批号",
        prop: "batchNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "胚布编号",
        prop: "calicoId",
        span: 6,
        placeholder: " ",
      },
    ],
  }
}

export function sxForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "计划编号",
        prop: "retBatch",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "设备编号",
        prop: "equCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '1' ? true : false
      },
      {
        label: "设备名称",
        prop: "equName",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '1' ? true : false
      },
      {
        label: "工厂代号",
        prop: "refCode",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '2' ? true : false
      },
      {
        label: "工厂名称",
        prop: "refName",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '2' ? true : false
      },
      {
        label: "胚布编号",
        prop: "calicoId",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "生產單號",
        prop: "prodNo",
        span: 6,
        placeholder: " ",
        disabled: false,
        display: _this.hide === '6' ? true : false,
        type: "tree",
        dicData: getDicT("whseCalicoinDtla/v1.0/list", "prodNo", "whseCalicoinDtlaoid"),
      },

      {
        label: "批号",
        prop: "batchNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "布票号",
        prop: "custTicket",
        span: 6,
        placeholder: " ",
      },

    ],
  }
}

// 退客人纱
export function whseRetreatCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true,
      },
      {
        label: "计划编号",
        prop: "retBatch",
        cell: true,
        width: 120,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != '1'
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },

      },
      {
        label: "设备名称",
        prop: "equName",
        cell: true,
        width: 120,
        hide: _this.hide != '1'
      },
      {
        label: "加工厂代号",
        prop: "refCode",
        cell: true,
        width: 120,
        hide: _this.hide != '2'
        // click: (val) => {
        //   _this.iptChange(_this.chooseData);
        // },

      },
      {
        label: "加工厂名称",
        prop: "refName",
        cell: true,
        width: 120,
        hide: _this.hide != '2'
      },
      {
        label: "生產單號",
        prop: "prOn",
        cell: true,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "纱线编号",
        prop: "yarnsId",
        cell: true,
        width: 120,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: true,
        width: 250,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },

      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "锭数",
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
    ],
  }

}