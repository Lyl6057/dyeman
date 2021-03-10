import { getDIC, getDicT, postDicT, getXDicT, getDbDicT } from '@/config'

let matUnit = getDIC("bas_matUnit")
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "出倉编号",
        prop: _this.hide === '1' ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? false : true
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   span: 6,
      //   placeholder: " ",
      //   type: "datetime",
      //   display: _this.hide === "6" ? false : true,
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      // },

      // {
      //   label: "出倉类型",
      //   prop: "retType",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: _this.hide === '1' ? getDIC("whse_stock_type") : getDIC('Whse_out_type'),
      //   // display: _this.hide === "1" ? true : false
      // },
      {
        label: _this.hide === '1' ? "领用人" : "操作员",
        prop: "sysCreatedby",
        display: _this.hide === '1' ? true : false,
        span: 6,
        placeholder: " ",
        // type: "select",
        // dicData:
        //   postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
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
        label: "出倉编号",
        prop: _this.hide === '1' ? "stockId" : "retCode",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "出倉日期",
        prop: _this.hide === '1' ? "stockDate" : "retDate",
        span: 6,
        placeholder: " ",
        // disabled: !_this.isPlan && !_this.isAdd,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "出仓方式",
        prop: "stockType",
        span: 6,
        type: "select",
        change: (val) => {
          _this.changeRet(val.value)

        },
        disabled: _this.hide === '1' && _this.isAdd ? false : true,
        display: _this.hide != '1' ? false : true,
        dicData: getDIC("whse_stock_type"),
      },

      {
        label: "申购单",
        prop: "appId",
        span: 6,
        click: () => {
          if (_this.form.stockType === '2') {
            return
          }
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "spNo";
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData;
          _this.mx = []
          if (_this.form.stockType === '1') {
            _this.choiceQ.purCategory = "3"
            _this.choiceTle = '申购单';
          } else {
            _this.choiceTle = '选择申请领用单';
          }
        },
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd
      },
      {
        label: "配料單號",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" ? true : false,
        disabled: !_this.isAdd
      },


      {
        label: '领用人',
        prop: "leader",
        span: 6,
        placeholder: " ",
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceQ = {};
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.form;
          _this.choiceTle = '领用人';
        },
        display: _this.hide === '6' || _this.hide === '1' ? true : false,
      },
      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        span: 6,
        display: _this.hide != "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
      },
      {
        label: "備註",
        prop: _this.hide === '4' ? "retRemarks" : "traRemarks",
        span: 12,
        placeholder: " ",
        display: _this.hide === '4' || _this.hide === '5',
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
        align: "center",
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true,
      },
      {
        label: "出仓编号",
        prop: _this.hide === '1' ? "stockId" : "retCode",
        cell: true,
        width: 180,
        hide: _this.hide === '6' ? true : false
      },
      {
        label: "出仓编号",
        prop: "woOutno",
        cell: true,
        width: 180,
        hide: _this.hide != '6' ? true : false,
      },
      {
        label: "出仓类型",
        prop: "retType",
        span: 6,
        type: "select",
        width: 90,
        dicData: getDIC('Whse_out_type'),
      },
      {
        label: "出倉方式",
        prop: "stockType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC('whse_stock_type'),
        hide: _this.hide != '1'
      },

      {
        label: "出倉日期",
        prop: _this.hide === '1' ? "stockDate" : "retDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
        width: 200,
        hide: _this.hide === '6'
      },
      // {
      //   label: "出倉日期",
      //   prop: "stockDate",
      //   cell: true,
      //   type: "datetime",
      //   format: "yyyy-MM-dd HH:mm:ss",
      //   valueFormat: "yyyy-MM-dd HH:mm:ss",
      //   align: "center",
      //   hide: _this.hide != '6',
      //   width: 200,
      // },

      {
        label: "调出仓",
        prop: "traOut",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
      },
      {
        label: "调入仓",
        prop: "traIn",
        cell: true,
        width: 120,
        hide: _this.hide === "5" ? false : true,
        type: "select",
        dicData: getDicT("whseWarehouse", "warehouseName", "whseWarehouseoid"),
      },
      {
        label: "领用人",
        prop: "leader",
        cell: true,
        width: 140,
        type: "select",
        dicData:
          postDicT('perPersonList', 'perName', 'perPersonoid'),
        hide: _this.hide === '1' ? false : true
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
        prop: _this.hide === '4' ? "retRemarks" : "traRemarks",
        span: 6,
        cell: true,
        placeholder: " ",
        hide: _this.hide == '4' || _this.hide == '5' ? false : true,
        width: 500,
      },
      {
        label: "操作员",
        prop: "sysCreatedby",
        cell: true,
        width: 140,
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
        // hide: _this.hide === '6' || _this.hide === '1' ? false : true
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
    height: _this.hide === "1" ? "calc(100vh - 330px)" : "calc(100vh - 247px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'qty',
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
        label: "加工廠代號",
        prop: "refCode",
        cell: false,
        width: 120,
      },
      {
        label: "加工廠名稱",
        prop: "refName",
        cell: false,
        width: 150,
      },
      {
        label: "輔料編號",
        prop: "matId",
        cell: false,
        width: 250,
      },
      {
        label: "輔料名稱",
        prop: "matName",
        cell: false,
        width: 280,
      },
      {
        label: "批次/批號",
        prop: "batchNo",
        cell: false,
        width: 120,
      },
      {
        label: "數量",
        prop: "qty",
        hide: false,
        width: 110,

      },
      {
        label: "单位",
        prop: "qtyUnit",
        hide: false,
        width: 110,
        type: "select",
        dicData: matUnit
      }
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
        dicData: matUnit
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

let rsxkr3CDic = getXDicT("whseAccessoriesDtl/v1.0/list")
let basWjxz = getDbDicT("basHardwarearticles", "basAdsuppliesarticles")
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
        prop: "$whseAccessoriesinFk",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDicT("whseAccessoriesin/v1.0/list", "yinId", "whseAccessoriesinoid"),
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "入仓编号",
        prop: "whseAccessoriesinFk",
        cell: false,
        width: 500,
        type: "select",
        hide: false,
        props: {
          label: "whseAccessoriesinFk",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "材料编号",
        prop: "materialNum",
        cell: false,
        width: 120,
        type: "select",
        props: {
          label: "materialNum",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,

      },
      {
        label: "材料名称",
        prop: "materialName",
        cell: false,
        width: 140,
        props: {
          label: "chinName",
          value: "hardwareId"
        },
        dicData: basWjxz
        // type: "select",
        // dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      },
      {
        label: "型號",
        prop: "model",
        cell: false,
        width: 250,
        props: {
          label: "model",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "規格",
        prop: "itemspec",
        cell: false,
        width: 280,
        props: {
          label: "itemspec",
          value: "hardwareId"
        },
        dicData: basWjxz,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: false,
        width: 150,
        type: "select",
        props: {
          label: "batchNo",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "入倉數量",
        prop: "poQty",
        cell: false,
        width: 100,
        align: "right",
        type: "select",
        props: {
          label: "poQty",
          value: "whseAccessoriesDtloid"
        },
        dicData: rsxkr3CDic,
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "退回數量",
        prop: "retQty",
        cell: true,
        width: 110,
        align: "right",
        hide: _this.hide === '5' ? true : false
      },
      {
        label: "调仓數量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != '5' ? true : false
      },
      {
        label: "单位",
        prop: _this.hide === '4' ? "retCompany" : "traCompany",
        cell: false,
        width: 100,
        type: "select",
        dicData: matUnit
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
        width: 180,
        cell: true,
      },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false,

      // },
      // {
      //   label: "设备名称",
      //   prop: "equName",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1' ? true : false
      // },
      {
        label: "加工厂代号",
        prop: "refCode",
        cell: true,
        width: 120,

      },
      {
        label: "加工厂名称",
        prop: "refName",
        cell: true,
        width: 120,
      },
      {
        label: "生產單號",
        prop: "prOn",
        cell: true,
        width: 180,
      },
      {
        label: "輔料編號",
        prop: "matId",
        cell: true,
        width: 180,
      },
      {
        label: "輔料名稱",
        prop: "matName",
        cell: true,
        width: 230,
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 160,
      },
      {
        label: "數量",
        prop: "qty",
        cell: true,
        width: 120,
        align: "right",
      },
      {
        label: "单位",
        prop: "qtyUnit",
        cell: true,
        width: 120,
        type: "select",
        dicData: matUnit
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
        label: "VWhseRetyarninoutPlanoid",
        prop: "VWhseRetyarninoutPlanoid",
        hide: true,
      },
      // {
      //   label: "外厂配料计划编号",
      //   prop: "retBatch",
      //   cell: true,
      //   width: 150,

      // },

      // {
      //   label: "設備编号",
      //   prop: "equCode",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide != '1'

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
      },
      {
        label: "纱线编号",
        prop: "yarnsId",
        cell: true,
        width: 120,

      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: true,
        width: 250,

      },

      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 180,
        align: "right",
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
      },
      {
        label: "锭数",
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
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
        placeholder: " ",
        display: _this.hide === '1' ? true : false
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
        label: "辅料编号",
        prop: "matId",
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
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true,
      },
      {
        label: "计划编号",
        prop: "retBatch",
        cell: true,
        width: 120,

      },

      {
        label: "設備编号",
        prop: "equCode",
        cell: true,
        width: 120,
        hide: _this.hide != '1'

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
      },
      {
        label: "纱线编号",
        prop: "yarnsId",
        cell: true,
        width: 120,

      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: true,
        width: 250,
      },

      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 180,
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
      },
      {
        label: "锭数",
        prop: "everySpindle",
        cell: true,
        align: "right",
        width: 100,
      },
    ],
  }

}