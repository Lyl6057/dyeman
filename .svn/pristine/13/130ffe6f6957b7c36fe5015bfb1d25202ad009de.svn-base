import { getDIC, getDicT, postDicT } from '@/config/index'


export function rsxkr1F(_this) {
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
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "配料单号",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" || _this.hide === "1" ? true : false,
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
      },
      {
        label: "出倉日期",
        prop: "retDate",
        span: 6,
        placeholder: " ",
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
        dicData: getDIC('Whse_out_type'),
      },

      {
        label: "生產單號",
        prop: "prOn",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "配料单号",
        prop: "batchNumber",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      {
        label: "纱线编号",
        prop: "yarnsId",
        cell: true,
        span: 6,
        placeholder: " ",
        disabled: true

      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        span: 6,
        placeholder: " ",
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "whseRetyarninoid",
        prop: "whseRetyarninoid",
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
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        align: "center",
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
        width: 160,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "出仓类型",
        prop: "retType",
        cell: false,
        width: 90,
        type: "select",
        dicData: getDIC('Whse_out_type'),
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
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
        width: 190,
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
        label: "配料单号",
        prop: "batchNumber",
        cell: true,
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
        width: 100,
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
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
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'weight',
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
        label: "Whse_retYarnin_dtlOID",
        prop: "whseRetYarninDtloid",
        hide: true,
      },
      {
        label: "設備编号",
        prop: "equId",
        cell: true,
        width: 120,
        hide: _this.hide != '1',
      },
      {
        label: "设备名称",
        prop: "equName",
        cell: true,
        width: 150,
        hide: _this.hide != '1',
      },
      {
        label: "加工厂代号",
        prop: "refCode",
        cell: true,
        hide: _this.hide != '2',
        width: 120,
      },
      {
        label: "加工厂名稱",
        prop: "refName",
        hide: _this.hide != '2',
        cell: true,
        width: 120,
      },
      {
        label: "入仓编号",
        prop: "yinId",
        hide: true,
        // hide: _this.hide != '4',
        width: 180,
        // type: "select",
        // dicData: getDicT("whseYarnin/v1.0/list", "batchNo", "yinId"),
      },
      {
        label: "纱线系统编号",
        prop: "yarnsId",
        cell: true,
        width: 120,
      },
      {
        label: "纱线名称",
        prop: "yarnsName",
        cell: true,
        width: 450,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
      },

      {
        label: "批次/批号",
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
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
      },

      {
        label: "纱线出仓",
        prop: "WhseRetyarninFk",
        hide: true,
        width: 100,

      },
    ],
  }

}
// 退客人明细
export function rsxkr3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [
      {
        label: ' ',
        name: 'retWeight',
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
        label: "纱线系统编号",
        prop: "yarnsId",
        cell: true,
        width: 140,
        type: "select",
        dicData: getDicT("whseYarninDtl/v1.0/list", "yarnsId", "whseYarninDtloid"),
      },
      {
        label: "批次/批号",
        prop: "batchNo",
        cell: true,
        width: 180,
        type: "select",
        dicData: getDicT("whseYarninDtl/v1.0/list", "batchNo", "whseYarninDtloid"),
      },
      {
        label: "退回重量",
        prop: "retWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide == '4' || _this.hide == '3' ? false : true
      },
      {
        label: "单位",
        prop: "retCompany",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        hide: _this.hide == '4' || _this.hide == '3' ? false : true
      },
      {
        label: "调仓重量",
        prop: "traWeight",
        cell: true,
        width: 140,
        align: "right",
        hide: _this.hide != '5'
      },
      {
        label: "单位",
        prop: "traCompany",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        hide: _this.hide != '5'
      },

      {
        label: "退客人纱",
        prop: "whseRetreatFk",
        hide: true,
        width: 100,

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
    height: "calc(100vh - 209px)",
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
        width: 150,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },

      {
        label: "設備编号",
        prop: "equId",
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
// 外廠配料
export function PlanOutCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
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
      {
        label: "外厂配料计划编号",
        prop: "retBatch",
        cell: true,
        width: 150,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },

      {
        label: "設備编号",
        prop: "equId",
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
        labelWidth: 150
      },
      {
        label: "设备编号",
        prop: "equId",
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
      {
        label: "生产单号",
        prop: "prOn",
        span: 6,
        placeholder: " ",
      },
      {
        label: "纱线批号",
        prop: "batchNo",
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
        label: "纱线系统编号",
        prop: "yarnsId",
        span: 6,
        placeholder: " ",
        display: false
      },
      {
        label: "纱线名稱",
        prop: "yarnsName",
        span: 6,
        placeholder: " ",
        display: false
      },
      {
        label: "批号",
        prop: "batchNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "重量",
        prop: "weight",
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
    height: "calc(100vh - 205px)",
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
        width: 150,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },

      {
        label: "設備编号",
        prop: "equId",
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