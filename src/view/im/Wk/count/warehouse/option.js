export function form(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "出入仓",
        prop: "warehouse",
        span: 6,
        placeholder: "出入仓",
        type: "select",
        multiple: true,
        dicData: [
          {
            label: "入仓",
            value: 0
          },
          {
            label: "出仓",
            value: 1
          }
        ]
      },
      {
        label: "类型",
        prop: "type",
        span: 9,
        placeholder: "出入仓类型",
        type: "checkbox",
        multiple: true,
        dicData: [
          {
            label: "纱线",
            value: 0
          },
          {
            label: "胚布",
            value: 1
          },
          {
            label: "染化料",
            value: 2
          },
          {
            label: "生产辅料",
            value: 3
          },
          {
            label: "五金/行政",
            value: 4
          }
        ]
      },
      {
        label: "统计类型",
        prop: "countType",
        span: 6,
        placeholder: "统计类型",
        type: "select",
        dicData: [
          {
            label: "订单",
            value: 0
          },
          {
            label: "时间",
            value: 1
          }
        ]
      },
      {
        label: "订单号",
        prop: "poNo",
        span: 6,
        placeholder: "订单号",
        type: "select",
        dicData: [

        ]
      },
      {
        label: "时间段",
        span: 9,
        prop: "date",
        // display: _this.form.countType === 1,
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      }
    ],
  }
}

export function crud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 500px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "类型",
        prop: "type",
        width: 120,
      },
      {
        label: "编号",
        prop: "id",
        width: 140,
      },
      {
        label: "日期",
        prop: "date",
        width: 180,
        type: "datetime",
        align: "center"
      },
      {
        label: _this.$t("whseField.zl"),
        prop: "weight",
        width: 120,
        align: "right"
      },
      {
        label: _this.$t('whseField.dw'),
        prop: "unit",
        width: 120,
      },

    ],
  }

}