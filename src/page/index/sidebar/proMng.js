/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-23 08:50:10
 * @Description:
 */


export function proMng(_this) {
  return [{
    menuName: "一.基础设定",
    index: "basic",
    icon: "el-icon-edit-outline",
    children: [
      {
        menuName: "1.生產工序",
        index: "/ProWorkflowInfo"
      },
      {
        menuName: "2.生产工作包",
        index: "/ProWorkPackage"
      },
      {
        menuName: "3.生产设备",
        index: "/EquipmentType"
      },


    ]
  },
  {
    menuName: "二." + _this.$t("menuData.ProductionName"),
    index: "proMng",
    icon: "el-icon-edit-outline",
    children: [
      {
        menuName: "1.生产排期",
        index: "/proSalSchedule"
      },
      {
        menuName: "2.生产排单",
        index: "/proScheduling"
      },
    ]
  },
  {
    menuName: "三.织单生产",
    index: "wovenPro",
    icon: "el-icon-edit-outline",
    children: [
      {
        menuName: "1.生产日产量",
        index: "/output"
      },
      // {
      //   menuName: "1.织造通知单",
      //   index: "/weaveRecord"
      // },
      // {
      //   menuName: "2.落布记录",
      //   index: "/cropping"
      // },
      // {
      //   menuName: "3.布飞打印记录",
      //   index: "/buffyPrints"
      // },
    ]
  },
  {
    menuName: "四.染单生产",
    index: "dyePro",
    icon: "el-icon-edit-outline",
    children: [
      // {
      //   menuName: "1.织造通知单",
      //   index: "织单生产"
      // },
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
    menuName: "五.報表",
    index: "report",
    icon: "el-icon-edit-outline",
    children: [
      {
        menuName: "1.织造工单",
        index: "/proWeaveJob"
      },
      {
        menuName: "2.染整工单",
        index: "/dyeing"
      },
      {
        menuName: "3.布飞打印",
        index: "/clothFly"
      },

    ]
  }]
}
