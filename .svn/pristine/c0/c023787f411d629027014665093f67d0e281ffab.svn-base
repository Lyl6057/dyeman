/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Lyl
 * @LastEditTime: 2021-02-04 16:00:31
 * @Description:
 */
import { getDIC, getDicT, postDicT, getXDicT } from '@/config/index'

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "材料类别",
        prop: "pfType",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: "五金用品",
          },
          {
            value: 1,
            label: "行政用品",
          },
        ],
        change: (val) => {
          _this.$nextTick(() => {
            _this.form.basHardwareFk = "";
            _this.form.basAdsuppliesFk = ""
            _this.query();
          });
        },
      },
      {
        label: "一级分类",
        prop: "basHardwareFk",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [],
      },
      {
        label: "编号",
        prop: "hardwareId",
        span: 6,
        placeholder: " ",
      },
      {
        label: "中文名称",
        prop: "chinName",
        span: 6,
        placeholder: " ",
      },
    ],
  }
}

export const hardwareC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 207px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  selection: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "编号",
      prop: "hardwareId",
      width: 120
    },
    {
      label: "中文名称",
      prop: "chinName",
      width: 140
    },
    {
      label: "英文名称",
      prop: "engName",
      width: 140
    },
    // {
    //   label: "材料类别",
    //   prop: "materialType",
    //   width: 100,
    //   placeholder: " ",
    //   type: "select",
    // },
    {
      label: "一级分类",
      prop: "basHardwareFk",
      type: "select",
      dicData: getDicT("basHardware", "topcategoryName", "topcategoryId"),
      width: 140
    },
    {
      label: "二级分类",
      prop: "basHardwareDtlaFk",
      type: "select",
      dicData: getDicT("basHardwareDtla", "topcategoryName", "topcategoryId"),
      width: 140
    },

    {
      label: "品牌",
      prop: "brand",
      width: 160
    },
    {
      label: "规格",
      prop: "itemspec",
      width: 250
    },
    {
      label: "型号",
      prop: "model",
      width: 250
    },
    {
      label: "计量单位",
      prop: "msUnit",
      type: "select",
      dicData: getDIC("bas_matUnit"),
      width: 90
    },
  ]

}