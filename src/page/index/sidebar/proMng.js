/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-11 11:01:07
 * @Description:
 */

export function proMng(_this) {
  return [
    {
      menuName: "一.基础设定",
      index: "basic",
      icon: "el-icon-s-tools",
      children: [
        {
          menuName: "1.生產工序",
          index: "ProWorkflowInfo"
        },
        {
          menuName: "2.生产工作包",
          index: "ProWorkPackage"
        },
        {
          menuName: "3.生产设备",
          index: "EquipmentType"
        }
      ]
    },
    {
      menuName: "二." + _this.$t("menuData.ProductionName"),
      index: "proMng",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.生产排期",
          index: "proSalSchedule"
        },
        {
          menuName: "2.生产排单",
          index: "proScheduling"
        },
        {
          menuName: "3.LD通知单",
          index: "ldOrder"
        },
        {
          menuName: "4.染整通知单",
          index: "dyeNotice"
        },
        {
          menuName: "5.定型指令单",
          index: "finalizeDesign"
        },
        {
          menuName: "6.后整指令单",
          index: "afterArrange"
        }
      ]
    },
    {
      menuName: "三.織造生產",
      index: "wovenPro",
      icon: "el-icon-toilet-paper",
      children: [
        {
          menuName: "1.生产日产量",
          index: "output"
        },
        {
          menuName: "2.生产进度",
          index: "outputSchedule"
        },
        {
          menuName: "3.织造工单",
          index: "proWeaveJob"
        },
        {
          menuName: "4.布飞打印记录",
          index: "buffyPrints"
        }
        // {
        //   menuName: "3.落布记录",
        //   index: "/cropping"
        // },
        // {
        //   menuName: "1.织造通知单",
        //   index: "/weaveRecord"
        // },
      ]
    },
    {
      menuName: "四.染整生產",
      index: "dyePro",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.漂染工艺",
          index: "techCode"
        },
        {
          menuName: "2.染整生产运转单",
          index: "revolve"
        },
        {
          menuName: "3.染整工单",
          index: "dyeing"
        }
        // {
        //   menuName: "2.落布记录",
        //   index: "染单生产"
        // },
        // {
        //   menuName: "3.布飞打印",
        //   index: "/proSalSchedule"
        // },
      ]
    },
    {
      menuName: "五.批色管理",
      index: "colorMng",
      icon: "el-icon-edit-outline",
      children: [
        {
          menuName: "1.批色码卡",
          index: "codeCard"
        }
        // {
        //   menuName: "1.出缸码卡",
        //   index: `codeCard/${2}`
        // },
        // {
        //   menuName: "2.定后码卡",
        //   index: `outcodeCard/${1}`
        // },
        // {
        //   menuName: "2.成品码卡",
        //   index: "finalCard"
        // }
        // {
        //   menuName: "3.染整工单",
        //   index: "/dyeing"
        // }
        // {
        //   menuName: "2.落布记录",
        //   index: "染单生产"
        // },
        // {
        //   menuName: "3.布飞打印",
        //   index: "/proSalSchedule"
        // },
      ]
    },
    {
      menuName: "六.報表",
      index: "proReport",
      icon: "el-icon-document-copy",
      children: [
        {
          menuName: "1.织造工单",
          index: "proWeaveJob"
        },
        // {
        //   menuName: "2.染整工单",
        //   index: "/dyeing"
        // },
        {
          menuName: "2.布飞打印",
          index: "clothFly"
        }
        // {
        //   menuName: "3.纱缸查询",
        //   index: "yarnBatch"
        // }
      ]
    }
  ];
}
