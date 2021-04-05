import { getDIC, getDicT } from '@/config/index'
let matUnit = getDIC("bas_matUnit") // 單位
// 入仓情况

export const inWhseCrud = {
  page: false,
  menu: false,
  addBtn: false,
  border: true,
  height: 500,
  refreshBtn: false,
  columnBtn: false,
  highlightCurrentRow: true,
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "left",
    },
    {
      label: "布笼Id",
      prop: "boxCarId",
      hide: true,
    },
    {
      label: "布笼详细Id",
      prop: "clothWaterId",
      hide: true,
    },
    {
      label: "布笼编号",
      prop: "clothNumber",
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
    },
    {
      label: _this.$t('energy.sl'),
      prop: "sum",
    },
    {
      label: "存储位置",
      prop: "boxId",
    },

  ],
}

// 纱线
export const sxForm = {
  labelWidth: 110,
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: "纱批/批号",
      prop: "batchNo",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: "箱数",
      prop: "cartonNum",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: "每箱锭数",
      prop: "everySpindle",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: "尾箱锭数",
      prop: "tailSpindle",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      span: 8,
      placeholder: ' ',
      type: "select", disabled: true,
      dicData: matUnit,
      readonly: true
    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "placeOrigin",
      span: 8,
      placeholder: ' ',
      readonly: true,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "入仓数量",
      prop: "whseNum",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: "#",
      prop: "seqQty",
      span: 8,
      placeholder: ' ',
      readonly: true
    },
    {
      label: "客户编号",
      prop: "custId",
      placeholder: ' ',
      readonly: true,
      span: 8,
    },
    {
      label: "送货单重量",
      prop: "cartonWei",
      span: 8,
      placeholder: ' ',
      labelWidth: 120,
      readonly: true
    },
    // {
    //   label: "纱线入库_FK",
    //   prop: "whseYarninFk",
    //   span: 6,
    // }
  ],
}

export const sxCrud = {
  page: false,
  menu: false,
  addBtn: false,
  border: true,
  height: 500,
  highlightCurrentRow: true,
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "left",
    },
    {
      label: "纱线入库明细OID",
      prop: "whseYarninDtloid",
      hide: true,
    },
    {
      label: "纱线系统编号",
      prop: "yarnsId",
      cell: true,
    },
    {
      label: "纱批/批号",
      prop: "batchNo",
      cell: true,
    },
    {
      label: "箱数",
      prop: "cartonNum",
      cell: true,
    },
    {
      label: "每箱锭数",
      prop: "everySpindle",
      cell: true,
    },
    {
      label: "尾箱锭数",
      prop: "tailSpindle",
      cell: true,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: matUnit

    },
    {
      label: "纱牌",
      prop: "yarnsCard",
      cell: true,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "placeOrigin",
      cell: true,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "入库数量",
      prop: "whseNum",
      cell: true,
    },
    // {
    //   label: "#",
    //   prop: "seqQty",
    //   cell: true,
    //   width: 50,
    // },
    {
      label: "客户编号",
      prop: "custId",
      cell: true,
    },
    {
      label: "送货单重量",
      prop: "cartonWei",
      cell: true,
    },
    {
      label: "纱线入库_FK",
      prop: "whseYarninFk",
      hide: true,
    }
  ],
}

// 胚布
export const pbForm = {
  labelWidth: 120,
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: "#",
      prop: "index",
      span: 8,
      align: "right",
      placeholder: " ",
      readonly: true,
    },

    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 16,
      align: "left",
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      span: 8,
      align: "left",
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.krbph"),
      prop: "custTicket",
      span: 8,
      align: "left",
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      align: "right",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: "实际重量",
      prop: "actualWeight",
      span: 8,
      align: "right",
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      span: 8,
      align: "left",
      placeholder: " ",
      type: "select",
      dicData: matUnit,
      readonly: true,
      disabled: true,
    },
    {
      label: "是否通过",
      prop: "isAdopt",
      align: "left",
      span: 8,
      placeholder: " ",
      type: "select",
      disabled: true,
      dicData: [
        {
          label: "通过",
          value: true,
        },
        {
          label: "不通过",
          value: false,
        },
      ],
    },
  ],

}

export const pbCrud = {
  page: false,
  menu: false,
  addBtn: false,
  border: true,
  height: 500,
  highlightCurrentRow: true,
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "left",
    },
    {
      label: "布笼编号",
      prop: "warehouseSn",
      align: "left",
      width: 200,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      align: "left",
      width: 200,
    },
    {
      label: _this.$t("whseField.ph2"),
      prop: "countingNo",
      align: "left",
      width: 200,
    },
    {
      label: _this.$t("whseField.krbph"),
      prop: "custTicket",
      align: "left",
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      align: "right",
    },
    {
      label: "实际重量",
      prop: "actualWeight",
      align: "right",
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      align: "left",
      type: "select",
      dicData: matUnit
    },
    {
      label: "是否通过",
      prop: "isAdopt",
      align: "left",
      type: "select",
      dicData: [
        {
          label: "通过",
          value: true,
        },
        {
          label: "不通过",
          value: false,
        },
      ],
    },
  ],
}

//成品布
export const cpbForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 110,
  column: [
    {
      label: _this.$t("whseField.gh"),
      prop: "batchNo",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.ps"),
      prop: "countingNo",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      span: 8,
      placeholder: " ",
      readonly: true, disabled: true,
      type: "select",
      dicData: matUnit
    },
    {
      label: _this.$t("whseField.bph"),
      prop: "fabticket",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    //     {
    //       label: _this.$t("whseField.hwm"),
    //       prop: "locationCode",
    //       span:8,
    // placeholder: " ",
    // readonly: true,
    //     },
    // {
    //   label: "成品布入库",
    //   prop: "whseFinishedclothinFk",
    //   span: 8,
    //   placeholder: " ",
    //   hide: true,
    // }
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
  height: "500",
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "left",
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
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: matUnit
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
      cell: true,
    }
  ]
}

// 生产辅料
export const scflForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 110,
  column: [

    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "poQty",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: "数量单位",
      prop: "unitQty",
      span: 8,
      placeholder: " ",
      readonly: true,
      type: "select",
      dicData: matUnit

    },
    {
      label: _this.$t('whseField.clzl'),
      prop: "materialType",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    // {
    //   label: "#",
    //   prop: "seqQty",
    //   span: 8,
    //   placeholder: " ",
    //   readonly: true,
    // },
    {
      label: "客户编号",
      prop: "custId",
      span: 8,
      placeholder: " ",
      readonly: true,
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
  height: "500",
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "left",
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
    },
    {
      label: "数量单位",
      prop: "unitQty",
      cell: true,
      type: "select",
      dicData: matUnit
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
      label: "#",
      prop: "seqQty",
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
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: "染化料名称",
      prop: "chemicalName",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: "#",
      prop: "seqQty",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      span: 8,
      placeholder: " ",
      readonly: true, disabled: true,
      type: "select",
      dicData: matUnit
    },
    {
      label: "客户编号",
      prop: "custId",
      span: 8,
      placeholder: " ",
      readonly: true,
    },
    // {
    //   label: "染化料入库",
    //   prop: "whseChemicalinFk",
    //   span:8,
    // }
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
  height: "500",
  column: [
    {
      label: "#",
      prop: "index",
      width: 60
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
    },
    {
      label: _this.$t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      type: "select",
      dicData: matUnit
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



