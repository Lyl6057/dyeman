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
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      cell: true,
      type: "datetime",
      width: 200, format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
    {
      label: _this.$t("whseField.chdh"),
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
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
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
      label: _this.$t("whseField.cd"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.sxmc"),
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
      label: _this.$t("whseField.ds"),
      prop: "everySpindle",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 110,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("ProWorkflowInfo.sbbh"),
      prop: "equId",
      cell: true,
      width: 120,
    },
    {
      label: _this.$t("labour.sbmc"),
      prop: "equName",
      cell: true,
      width: 120,
    },
    {
      label: _this.$t("whseField.wfcdh"),
      prop: "refCode",
      cell: true,
      width: 150,
    },

    {
      label: _this.$t("whseField.wfcmc"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("energy.bz"),
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
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.rcrq"),
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
      label: _this.$t("whseField.pbmc"),
      prop: "clothName",
      cell: true,
      width: 450,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
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
      label: _this.$t("whseField.krbph"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.zldw"),
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("whseField.ph"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.zldw"),
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("whseField.ph"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.pbbh"),
      prop: "woMatno",
      width: 185,
    },
    {
      label: _this.$t("whseField.pbmc"),
      prop: "woMatname",
      width: 650,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "woWeights",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.pbbh"),
      prop: "calicoId",
      width: 185,
    },
    {
      label: _this.$t("whseField.pbmc"),
      prop: "clothName",
      width: 650,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: _this.$t("whseField.khmc"),
      prop: "custName",
      cell: true,
      width: 180,
    },
    // {
    //   label: _this.$t("whseField.pbmc"),
    //   prop: "clothName",
    //   cell: true,
    //   width: 450,
    // },
    {
      label: _this.$t("whseField.gh"),
      prop: "batchNo",
      cell: true,
      width: 280,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("whseField.krbph"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 110,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "woWeights",
      cell: true,
      width: 110,
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "woUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("whseField.bph"),
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
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: _this.$t('whseField.llbh'),
      prop: "registerNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.chdh"),
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
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
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
      label: _this.$t("whseField.cd"),
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
      label: _this.$t("whseField.ccbh"),
      prop: "retCode",
      width: 180,
    },
    {
      label: "出仓日期",
      prop: "retDate",
      width: 220,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "retQty",
      cell: true,
      width: 120,
      align: "center"
    },
    {
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 200,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "origin",
      cell: true,
      width: 100, type: "select",
      dicData: getDIC("Whse_Origin"),
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      cell: true,
      width: 200,
    },
    {
      label: _this.$t('whseField.llbh'),
      prop: "registerNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t('whseField.clzl'),
      prop: "materialType",
      cell: true,
      width: 150,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "poQty",
      cell: true,
      width: 120,
      align: 'right'
    },
    {
      label: _this.$t('whseField.dw'),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t('whseField.clbh'),
      prop: "materialId",
      width: 150,
    },
    {
      label: _this.$t('whseField.clmc'),
      prop: "materialName",
      width: 150,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "stockQty",
      cell: true,
      width: 120,
      align: "center"
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "stockUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    },
    {
      label: _this.$t("whseField.xh"),
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
      label: _this.$t("whseField.ccbh"),
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
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 200,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "origin",
      cell: true,
      width: 100, type: "select",
      dicData: getDIC("Whse_Origin"),
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "retCompany",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit,
    }
  ]
}

