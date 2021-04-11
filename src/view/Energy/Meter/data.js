/*
 * @Author: Lyl
 * @Date: 2021-04-08 20:27:03
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-12 00:48:51
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
        label: _this.$t("energy.bh"),
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
        rules: [
          {
            required: true,
            message: _this.$t("energy.qxzsfyx"),
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
      {
        label: _this.$t("energy.cbr"),
        prop: "emMan",
        span: 8,
        display: false,
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
        label: "归属区域",
        prop: "eneMeterTypeAreaFk",
        span: 8,
        type: "select",
        dicData: getDicT("eneMeterTypeArea", "areaName", "eneMeterTypeAreaoid"),
        rules: [
          {
            required: true,
            message: "請選擇归属区域",
            trigger: "blur",
          },
        ],
      },
      {
        label: _this.$t("energy.wz"),
        prop: "emSite",
        span: 16,
      },
      {
        label: "设备编号",
        prop: "equCode",
        span: 8,
        type: "tree",
        dicData: []
      },
      {
        label: _this.$t("energy.bz"),
        prop: "emRemark",
        span: 16,
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
    height: "calc(100vh - 462px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      {
        label: "抄錶人",
        prop: "eneMeterStaffFk",
        cell: true,
        width: 120,
        props: {
          label: "staffName",
          value: "eneStaffoid"
        },
        type: "tree",
        dicData: []
      },
      {
        label: "開始有效日期",
        prop: "startDate",
        width: 150,
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
        // type: "datetime",
        cell: true,
        align: "center",
        // format: "HH:mm:ss",
        // valueFormat: "HH:mm:ss",
      },
      {
        label: "抄錶有效結束時間",
        prop: "endTime",
        width: 150,
        // type: "datetime",
        cell: true,
        align: "center",
        // format: "HH:mm:ss",
        // valueFormat: "HH:mm:ss",
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
    height: "calc(100vh - 336px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      {
        label: "编号",
        prop: "typeCode",
        width: 120,
        align: "center",
        cell: true
      },
      {
        label: "名称",
        prop: "typeName",
        width: 200,
        cell: true
      },
      {
        label: "归属区域",
        prop: "areaName",
        width: 160,
        cell: true,
        // type: "select",
        // dicData: getDicT("eneMeterTypeArea", "areaName", "eneMeterTypeFk")
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
    height: "calc(100vh - 336px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    column: [
      {
        label: "抄表人代号",
        prop: "staffId",
        width: 120,
        cell: true
      },
      {
        label: "抄表人名称",
        prop: "staffName",
        width: 200,
        cell: true
      },
      {
        label: "系统账号",
        prop: "equAccount",
        width: 160,
        cell: true,
      },
      {
        label: "系统密码",
        prop: "equPassword",
        width: 160,
        cell: true,
      },
    ],
  }
}