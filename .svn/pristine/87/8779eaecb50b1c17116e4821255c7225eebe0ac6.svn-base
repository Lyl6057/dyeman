import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
// 纱线
let matUnit = getDIC("bas_matUnit") // 單位
export const sx_rc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'cartonNum',
      type: 'sum'
    },
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  rowKey: "id",
  column: [
    // {
    //   prop: "id",
    //   label: "id"
    // },
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "纱线入仓明细OID",
      prop: "whseYarninDtloid",
      hide: true,
      width: 225,
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: true,
      type: "datetime",
      width: 200, format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
    {
      label: "采购单号",
      prop: "purNo",
      cell: true,
      width: 180,
    },
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      cell: true,
      width: 150,
    },
    {
      label: "纱批/批号",
      prop: "batchNo",
      cell: true,
      width: 250,
    },
    {
      label: "箱数",
      prop: "cartonNum",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "每箱锭数",
      prop: "everySpindle",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "尾箱锭数",
      prop: "tailSpindle",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      cell: true,
    },
    {
      label: "产地",
      prop: "placeOrigin",
      cell: true, type: "select",
      dicData: getDIC("Whse_Origin"),
    },
    {
      label: "入仓数量",
      prop: "whseNum",
      cell: true,
      width: 100,
      align: 'right'
    },

    {
      label: "客户编号",
      prop: "custId",
      cell: true,
      width: 120
    },
    {
      label: "送货单重量",
      prop: "cartonWei",
      cell: true,
      width: 125,
      align: 'right'
    },
    {
      label: "纱线入仓_FK",
      prop: "whseYarninFk",
      hide: true,
      width: 175,
    }
  ]
}
export const sx_cc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'cartonNum',
      type: 'sum'
    },
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      cell: true,
      width: 150,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
      type: "datetime",
      width: 180, format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      cell: true,
      width: 150,
    },
    {
      label: "纱线名称",
      prop: "yarnsName",
      cell: true,
      width: 250,
    },
    {
      label: "纱批/批号",
      prop: "batchNo",
      cell: true,
      width: 200,
    },
    {
      label: "锭数",
      prop: "everySpindle",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 110,
      align: 'right'
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "设备编号",
      prop: "equId",
      cell: true,
      width: 120,
    },
    {
      label: "设备名称",
      prop: "equName",
      cell: true,
      width: 120,
    },
    {
      label: "加工厂代号",
      prop: "refCode",
      cell: true,
      width: 150,
    },

    {
      label: "加工厂名称",
      prop: "refName",
      cell: true,
      width: 150,
    },
  ]
}
export const sx_th = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'retWeight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "退客人纱明细OID",
      prop: "whseRetreatDtlOid",
      hide: true,
      width: 225,
    },
    {
      label: "出仓编号",
      prop: "retCode",
      cell: true,
      width: 150,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "出仓日期",
      prop: "reTDate",
      cell: true,
      width: 180,
    },
    {
      label: "备注",
      prop: "retRemarks",
      cell: true,
      width: 250,
    },
    {
      label: "退回重量",
      prop: "retWeight",
      cell: true,
      width: 150,
      align: "right"
    },
    {
      label: "单位",
      prop: "retCompany",
      cell: true,
      width: 120,
      type: "select",
      dicData: matUnit,
    },

  ]
}



// 胚布
export const pb_rc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  rowKey: "id",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: "胚布编码",
      prop: "calicoId",
      cell: true,
      width: 180,
    },
    {
      label: "胚布名称",
      prop: "clothName",
      cell: true,
      width: 450,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "是否通过",
      prop: "isAdopt",
      hide: true,
      width: 175,
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      hide: true,
      width: 175,
    }
  ]
}
export const pb_tgys = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'retTotalpi',
      type: 'sum'
    },
    {
      label: ' ',
      name: 'retTotalweight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      width: 225,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "退回总疋数",
      prop: "retTotalpi",
      cell: true,
      width: 200,
      align: "right"
    },
    {
      label: "退回总重量",
      prop: "retTotalweight",
      cell: true,
      width: 200,
      align: "right"
    },
    {
      label: "重量单位",
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 200,

    },
  ]
}
export const pb_tkr = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'retTotalpi',
      type: 'sum'
    },
    {
      label: ' ',
      name: 'retTotalweight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      width: 225,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "退回总疋数",
      prop: "retTotalpi",
      cell: true,
      width: 200,
      align: "right"
    },
    {
      label: "退回总重量",
      prop: "retTotalweight",
      cell: true,
      width: 200,
      align: "right"
    },
    {
      label: "重量单位",
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 200,

    },

  ]
}
export const pb_xsck = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  rowKey: "id",
  sumColumnList: [
    {
      label: ' ',
      name: 'woWeights',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    // {
    //   label: "#",
    //   prop: "id",
    //   hide: true
    // },
    {

      cell: true,
      width: 70,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "woOutno",
      width: 185,
    },
    {
      label: "出仓日期",
      prop: "woDate",
      width: 220,
    },
    {
      label: "订单号",
      prop: "woOrderno",
      width: 185,
    },
    {
      label: "胚布编号",
      prop: "woMatno",
      width: 185,
    },
    {
      label: "胚布名称",
      prop: "woMatname",
      width: 650,
    },
    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: "重量",
      prop: "woWeights",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "单位",
      prop: "woUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}
export const pb_lld = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      width: 185,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "配料单号",
      prop: "retBatch",
      width: 185,
    },
    {
      label: "胚布编号",
      prop: "calicoId",
      width: 185,
    },
    {
      label: "胚布名称",
      prop: "clothName",
      width: 650,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 100,
    },
    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}

// 成品布
export const cpb_rc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  rowKey: "id",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: "客户名称",
      prop: "custName",
      cell: true,
      width: 180,
    },
    // {
    //   label: "胚布名称",
    //   prop: "clothName",
    //   cell: true,
    //   width: 450,
    // },
    {
      label: "缸号",
      prop: "batchNo",
      cell: true,
      width: 280,
    },
    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      hide: true,
      width: 175,
    }
  ]
}
export const cpb_cc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'woWeights',
      type: 'sum'
    },
  ],
  rowKey: "id",
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },

    {
      label: "出仓编号",
      prop: "woOutno",
      width: 180,
    },
    {
      label: "出仓日期",
      prop: "woDate",
      width: 220,
    },
    {
      label: "订单号",
      prop: "woOrderno",
      cell: true,
      width: 180,
    },
    {
      label: "成品布编号",
      prop: "woMatno",
      cell: true,
      width: 180,
    },
    {
      label: "成品布名称",
      prop: "woMatname",
      cell: true,
      width: 400,
    },
    {
      label: "生成单号",
      prop: "prodNo",
      cell: true,
      width: 250,
    },

    {
      label: "疋号",
      prop: "countingNo",
      cell: true,
      width: 110,
    },
    {
      label: "重量",
      prop: "woWeights",
      cell: true,
      width: 110,
    },
    {
      label: "单位",
      prop: "woUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "布票号",
      prop: "ticketNo",
      cell: true,
      width: 220,
    },
  ]
}

// 染化料
export const rhl_rc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  rowKey: "id",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: "来料编号",
      prop: "registerNo",
      cell: true,
      width: 180,
    },
    {
      label: "采购单号",
      prop: "purNo",
      cell: true,
      width: 180,
    },
    {
      label: "染化料编码",
      prop: "chemicalId",
      cell: true,
      width: 180,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      cell: true,
      width: 150,
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
      align: 'right'
    },
    {
      label: "重量单位",
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: matUnit,
      width: 100,
    },
    {
      label: "客户编号",
      prop: "custId",
      hide: false,
      width: 155,
    },
    {
      label: "产地",
      prop: "origin",
      hide: false,
      width: 175, type: "select",
      dicData: getDIC("Whse_Origin"),
    }
  ]
}
export const rhl_cc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'woWeights',
      type: 'sum'
    },
  ],
  rowKey: "id",
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },

    {
      label: "出仓编号",
      prop: "retCode",
      width: 180,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "数量",
      prop: "retQty",
      cell: true,
      width: 120,
      align: "center"
    },
    {
      label: "单位",
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}
export const rhl_lld = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  rowKey: "id",
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      width: 185,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "配料单号",
      prop: "retBatch",
      width: 185,
    },
    {
      label: "染化料编号",
      prop: "chemicalId",
      width: 185,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      width: 250,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 200,
    },
    {
      label: "产地",
      prop: "origin",
      cell: true,
      width: 100, type: "select",
      dicData: getDIC("Whse_Origin"),
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "单位",
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}


// 五金/行政/生产辅料
export const qt_rc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'poQty',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 155px)",
  rowKey: "id",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "入仓编号",
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: "入仓日期",
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: "来料编号",
      prop: "registerNo",
      cell: true,
      width: 180,
    },
    {
      label: "采购单号",
      prop: "purNo",
      cell: true,
      width: 180,
    },
    {
      label: "材料编号",
      prop: "materialNum",
      cell: true,
      width: 180,
    },
    {
      label: "材料类型",
      prop: "materialType",
      cell: true,
      width: 150,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: "数量",
      prop: "poQty",
      cell: true,
      width: 120,
      align: 'right'
    },
    {
      label: "单位",
      prop: "unitQty",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "客户编号",
      prop: "custId",
      hide: false,
      width: 155,
    },
  ]
}
export const qt_cc = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'woWeights',
      type: 'sum'
    },
  ],
  rowKey: "id",
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },

    {
      label: "出仓编号",
      prop: "retCode",
      width: 180,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "出仓类型",
      prop: "retType",
      width: 120,
    },
    {
      label: "领用人",
      prop: "leader",
      width: 120,
    },
    {
      label: "材料编号",
      prop: "materialId",
      width: 150,
    },
    {
      label: "材料名称",
      prop: "materialName",
      width: 150,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: "数量",
      prop: "stockQty",
      cell: true,
      width: 120,
      align: "center"
    },
    {
      label: "单位",
      prop: "stockUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: "型号",
      prop: "model",
      cell: true,
      width: 120,
    },
    {
      label: "规格",
      prop: "ItemSpec",
      cell: true,
      width: 120,
    },
    {
      label: "大类名称",
      prop: "topCategoryName",
      cell: true,
      width: 120,
    },
    {
      label: "二级分类",
      prop: "secCategoryName",
      cell: true,
      width: 120,
    },
    {
      label: "三级分类",
      prop: "thirdCategoryName",
      cell: true,
      width: 120,
    }
  ]
}
export const qt_tgys = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: ' ',
      name: 'weight',
      type: 'sum'
    },
  ],
  rowKey: "id",
  height: "calc(100vh - 155px)",
  column: [
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 80,
      align: 'right'
    },
    {
      label: "出仓编号",
      prop: "retCode",
      width: 185,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: "配料单号",
      prop: "retBatch",
      width: 185,
    },
    {
      label: "染化料编号",
      prop: "chemicalId",
      width: 185,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      width: 250,
    },
    {
      label: "批号",
      prop: "batchNo",
      cell: true,
      width: 200,
    },
    {
      label: "产地",
      prop: "origin",
      cell: true,
      width: 100, type: "select",
      dicData: getDIC("Whse_Origin"),
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "单位",
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}

