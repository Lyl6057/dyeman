import { getDIC, getDicT } from '@/config/index'
// 纱线
export const sxForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  column: [
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      span: 6,
    },
    {
      label: "纱批/批号",
      prop: "batchNo",
      span: 6,
    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      span: 6,
    },
    {
      label: "客户编号",
      prop: "custId",
      span: 6,
    }
  ]
}

export const sxCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'cartonNum',
      type: 'sum'
    },
    {
      label: '共',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 255px)",
  column: [
    {
      label: "#",
      prop: "seqQty",
      cell: true,
      width: 50,
      align: 'right'
    },
    {
      label: "纱线入库明细OID",
      prop: "whseYarninDtloid",
      hide: true,
      width: 225,
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
      width: 80,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: getDIC("Whse_Transfer_unit")

    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      cell: true,
      width: 80,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "placeOrigin",
      cell: true,
      width: 80,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "入库数量",
      prop: "whseNum",
      cell: true,
      width: 100,
      align: 'right'
    },

    {
      label: "客户编号",
      prop: "custId",
      cell: true,
      width: 100,
    },
    {
      label: "送货单重量",
      prop: "cartonWei",
      cell: true,
      width: 125,
      align: 'right'
    },
    {
      label: "纱线入库_FK",
      prop: "whseYarninFk",
      hide: true,
      width: 175,
    }
  ]
}

// 胚布
export const pbForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 110,
  column: [
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 6
    },
    {
      label: _this.$t("whseField.krbph"),
      prop: "custTicket",
      span: 6,
    },
    // {
    //   label: _this.$t("whseField.scdh"),
    //   prop: "prodNo",
    //   span: 6,
    // },
    // {
    //   label: _this.$t("whseField.hwm"),
    //   prop: "locationCode",
    //   span: 6,
    // },
  ]

}

export const pbCrud = {
  menu: false,
  addBtn: false,
  border: true,
  selection: true,
  reserveSelection: true,
  highlightCurrentRow: true,
  selectionWidth: 60,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'weight',
      type: 'sum'
    },
  ],
  height: "calc(100vh - 255px)",
  column: [
    {
      label: "#",
      prop: "seqQty",
      // cell: true,
      width: 50,
      align: 'right'
    },
    {
      label: "来胚入库批号资料OID",
      prop: "whseCalicoinDtlboid",
      hide: true,
    },
    {
      label: "来胚入库明细_FK",
      prop: "whseCalicoinDtlaFk",
      hide: true,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: false,
      width: 200,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      cell: false,
      align: "right",
      width: 200,
    },

    {
      label: _this.$t("whseField.krbph"),
      prop: "custTicket",
      cell: false,
      width: 200,
    },

    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: false,
      width: 105,
      align: "right"
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: false,
      width: 100,
      type: "select",
      dicData: getDIC("Whse_Transfer_unit")
    },
    {
      label: "储存位置",
      prop: "boxCarId",
      cell: false,
      width: 100,
      // type: "select",
      // props: {
      //   value: "boxCarId",
      //   label: "boxId"
      // },

      // dicData: [

      // ]
    },
  ]
}

//成品布
export const cpbForm = {
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: _this.$t("whseField.gh"),
      prop: "batchNo",
      span: 6,
    },
    {
      label: _this.$t("whseField.bph"),
      prop: "fabticket",
      span: 6,
    },
  ]

}
export const cpbCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'countingNo',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 255px)",
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: 'right'
    },
    {
      label: "Whse_FinishedclothIn_dtlOID",
      prop: "whseFinishedclothinDtloid",
      hide: true,
    },
    {
      label: _this.$t("whseField.gh"),
      prop: "batchNo",
      cell: true,
    },
    {
      label: _this.$t("whseField.ps"),
      prop: "countingNo",
      cell: true,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: getDIC("Whse_Transfer_unit")
    },
    {
      label: _this.$t("whseField.bph"),
      prop: "fabticket",
      cell: true,
    },
    {
      label: _this.$t("whseField.hwm"),
      prop: "locationCode",
      cell: true,
    },
    {
      label: "成品布入库",
      prop: "whseFinishedclothinFk",
      hide: true,
    }
  ]
}

// 生产辅料
export const scflForm = {
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      span: 6,
    },
    {
      label: _this.$t('whseField.clzl'),
      prop: "materialType",
      span: 6,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 6,
    },
    {
      label: "客户编号",
      prop: "custId",
      span: 6,
    },
  ]
}
export const scflCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'poQty',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 255px)",
  column: [
    {
      label: "#",
      prop: "seqQty",
      cell: true,
      width: 50,
      align: 'right'
    },
    {
      label: "五金/行政/生产辅料入库明细OID",
      prop: "whseAccessoriesDtloid",
      hide: true,
    },
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      cell: true,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "poQty",
      cell: true,
      align: 'right'
    },
    {
      label: "数量单位",
      prop: "unitQty",
      cell: true,
    },
    {
      label: _this.$t('whseField.clzl'),
      prop: "materialType",
      cell: true,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
    },

    {
      label: "客户编号",
      prop: "custId",
      cell: true,
    },
    {
      label: "五金/行政/生产辅料入库_FK",
      prop: "whseAccessoriesinFk",
      hide: true,
    }
  ]
}

// 染化料
export const rhlForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 120,
  column: [
    {
      label: "染化料编码",
      prop: "chemicalId",
      span: 6,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      span: 6,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 6,
    },
    {
      label: "客户编号",
      prop: "custId",
      span: 6,
    },
  ]
}
export const rhlCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'weight',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 235px)",
  column: [
    {
      label: "#",
      prop: "seqQty",
      cell: true,
      width: 50,
      align: 'right'
    },
    {
      label: "Whse_ChemicalIn_dtlaOID",
      prop: "whseChemicalinDtlaoid",
      hide: true,
    },
    {
      label: "染化料编码",
      prop: "chemicalId",
      cell: true,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      cell: true,
    },

    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      align: 'right'
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: getDIC("Whse_Transfer_unit")
    },
    {
      label: "客户编号",
      prop: "custId",
      cell: true,
    },
    {
      label: "染化料入库",
      prop: "whseChemicalinFk",
      hide: true,
    }
  ]


}



