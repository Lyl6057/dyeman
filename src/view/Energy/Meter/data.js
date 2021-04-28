/*
 * @Author: Lyl
 * @Date: 2021-04-08 20:27:03
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-26 15:25:49
 * @Description:
 */
import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
export function formOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    card: false,
    menuBtn: false,
    labelWidth: 110,
    column: [
      {
        label: _this.$t("energy.yblx"),
        prop: "yblx",
        span: 6,
        type: "select",
        dicData: getDicT("eneMeterType", "typeName", "typeCode"),
        change: () => {
          _this.$nextTick(() => {
            _this.resetTree()
          })

        }
      },
    ],

  }
}


export function ybOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    card: false,
    menuBtn: false,
    labelWidth: 110,
    column: [
      {
        label: "管编号",
        prop: "emId",
        span: 8,
        rules: [
          {
            required: true,
            message: "請輸入編號",
            trigger: "blur",
          },
        ],
      },
      {
        label: "表编号",
        prop: "chartId",
        span: 8,
        rules: [
          {
            required: true,
            message: "請輸入編號",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.sfyx"),
        prop: "emIsvalid",
        span: 8,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          },
        ],
        // rules: [
        //   {
        //     required: true,
        //     message: _this.$t("energy.qxzsfyx"),
        //     trigger: "blur",
        //   },
        // ],
      },
      {
        label: _this.$t("energy.name"),
        prop: "emName",
        span: 8,
        rules: [
          {
            required: true,
            message: "請輸入名稱",
            trigger: "blur",
          },
        ],
      },
      {
        label: "仪表厂家",
        prop: "factory",
        span: 8,
      },

      {
        label: "计量区域",
        prop: "measure",
        span: 8,
      },

      {
        label: _this.$t("energy.cbr"),
        prop: "emMan",
        span: 8,
        display: false,
      },

      {
        label: _this.$t("energy.dw"),
        prop: "emUnit",
        span: 8,
        type: "select",
        dicData: getDIC("eWDFS_402"),
        rules: [
          {
            required: true,
            message: _this.$t("energy.qxzdw"),
            trigger: "blur",
          },
        ],
      },

      // {
      //   label: _this.$t("energy.dj"),
      //   prop: "emPrice",
      //   span: 8,
      //   rules: [
      //     {
      //       required: true,
      //       message: _this.$t("energy.qsrdj"),
      //       trigger: "blur",
      //     },
      //   ],
      // },
      {
        label: _this.$t("energy.bl"),
        prop: "emMulti",
        span: 8,
        rules: [
          {
            required: true,
            message: _this.$t("energy.qsrbl"),
            trigger: "blur",
          },
        ],
      },


      {
        label: "归属区域",
        prop: "eneMeterTypeAreaFk",
        span: 8,
        type: "select",
        dicData: getDicT("eneArea", "areaName", "eneAreaoid"), // 获取区域信息,
        rules: [
          {
            required: true,
            message: "請選擇归属区域",
            trigger: "blur",
          },
        ],
      },

      {
        label: "仪表型号",
        prop: "models",
        span: 8,
      },
      {
        label: "序列号",
        prop: "snNo",
        span: 16,
      },
      {
        label: "设备编号",
        prop: "equCode",
        span: 8,
        // type: "tree",
        // dicData: []
      },

      {
        label: _this.$t("energy.wz"),
        prop: "emSite",
        span: 16,
      },

      {
        label: _this.$t("energy.bz"),
        prop: "emRemark",
        span: 24,
      },

      {
        label: "溫度範圍-低",
        prop: "tempRangeLow",
        span: 6,
      },

      {
        label: "溫度範圍-高",
        prop: "tempRangeHigh",
        span: 6,
      },

      {
        label: "壓力範圍-低",
        prop: "pressureRangeLow",
        span: 6,
      },

      {
        label: "壓力範圍-高",
        prop: "pressureRangeHigh",
        span: 6,
      },

    ],

  }
}
export function timeOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 231px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      // {
      //   label: "抄錶人",
      //   prop: "eneMeterStaffFk",
      //   cell: true,
      //   width: 100,
      //   props: {
      //     label: "staffName",
      //     value: "eneStaffoid"
      //   },
      //   type: "tree",
      //   dicData: []
      // },
      {
        label: "儀表编号",
        prop: "emId",
        width: 100,
        props: {
          label: "emId",
          value: "eneMeteroid"
        },
        type: "select",
        dicData: [],
        cell: false
      },
      {
        label: _this.$t("energy.name"),
        prop: "eneMeterFk",
        width: 150,
        props: {
          label: "emName",
          value: "eneMeteroid"
        },
        type: "tree",
        dicData: [],
        cell: true,
        change: (val) => {
          // console.log(val);
          // _this.$set(_this.chooseArea, 'emId', val.value)
          // _this.$nextTick(() => {
          //   _this.chooseArea.emId = val.value

          // })
        }
      },
      {
        label: "開始有效日期",
        prop: "startDate",
        width: 130,
        type: "date",
        cell: true,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "抄錶有效開始時間",
        prop: "startTime",
        width: 150,
        type: "time",
        cell: true,
        align: "center",
        format: "HH:mm:ss",
        valueFormat: "HH:mm:ss",
      },
      {
        label: "抄錶有效結束時間",
        prop: "endTime",
        width: 150,
        type: "time",
        cell: true,
        align: "center",
        format: "HH:mm:ss",
        valueFormat: "HH:mm:ss",
      },

    ],
  }

}

export function typeOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 265px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "编号",
        prop: "typeCode",
        width: 120,
        align: "center",
        cell: true,
        span: 6
      },
      {
        label: "名称",
        prop: "typeName",
        width: 200,
        cell: true,
        span: 6
      },
      // {
      //   label: "归属区域",
      //   prop: "areaName",
      //   width: 160,
      //   cell: true,
      //   // type: "select",
      //   // dicData: getDicT("eneMeterTypeArea", "areaName", "eneMeterTypeFk")
      // },

    ],
  }

}
export function AreaOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 231px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50
      },
      {
        label: "归属区域",
        prop: "eneAreaFk",
        width: 160,
        cell: true,
        type: "select",
        // type: "select",
        dicData: getDicT("eneArea", "areaName", "eneAreaoid") // 获取区域信息
      },

    ],
  }

}

export function staffOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 265px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "抄表人代号",
        prop: "staffId",
        width: 110,
        cell: true
      },
      {
        label: "抄表人名称",
        prop: "staffName",
        width: 150,
        cell: true
      },
      {
        label: "系统账号",
        prop: "equAccount",
        width: 130,
        cell: true,
      },
      {
        label: "系统密码",
        prop: "equPassword",
        width: 130,
        cell: true,
      },
    ],
  }
}

export function staff2Op(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 336px)",
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 130,
    page: false,
    column: [
      {
        label: "抄表人代号",
        prop: "staffId",
        cell: true,
        span: 6
      },
      {
        label: "抄表人名称",
        prop: "staffName",
        cell: true,
        span: 6
      }
    ],
  }
}
