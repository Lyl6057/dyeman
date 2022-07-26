/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-25 14:36:10
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
        },
        {
          menuName: "7.生产单审核",
          index: "orderReview"
        },
        {
          menuName: "8.收单管理",
          index: "dptReciveLog"
        },
        {
          menuName: "9.生产看板",
          index: "proRpt"
        },
        {
          menuName: "10.出库送货单",
          index: "dyeDeliveryNote"
        },
        {
          menuName: "11.生产进度表",
          index: "proProcess"
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
          menuName: "4.外发织造工单",
          index: "proOutWeaveJob"
        },
        {
          menuName: "5.布飞打印",
          index: "clothFly"
        },
        {
          menuName: "6.布飞打印记录",
          index: "buffyPrints"
        },
        {
          menuName: "7.外发加工送货单",
          index: "proWeaveOutworkShip"
        },
        {
          menuName: "8.退纱通知单",
          index: "returnYarnsNotice"
        },
        {
          menuName: "9.织单用纱汇总",
          index: "proWeaveJobSummary"
        },
        {
          menuName: "10.收货台账",
          index: "collarNote"
        }
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
        },
        {
          menuName: "4.行车监控",
          index: "proDriving"
        },
        {
          menuName: "5.化工原料退仓通知单",
          index: "withDrawal2Chiemical"
        },
        {
          menuName: "6.染料退仓通知单",
          index: "withDrawal2Dyesa" 
        },
        {
          menuName: "7.生产辅料退仓通知单",
          index: "withDrawal2Access" 
        },
        {
          menuName: "8.运转单备布统计",
          index: "proBleadyeRunJob"
        }
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
        },
        // {
        //   menuName: "2.LD打样",
        //   index: `ldDrawDesign`
        // },
        {
          menuName: "2.批色送办",
          index: "colorSend"
        },
        {
          menuName: "3.批色回修单",
          index: "colorRepair"
        }
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
    // {
    //   menuName: "六.染单管理",
    //   index: "bleadyeMng",
    //   icon: "el-icon-edit-outline",
    //   children: [
        
    //   ]
    // },
    // {
    //   menuName: "六.報表",
    //   index: "proReport",
    //   icon: "el-icon-document-copy",
    //   children: [
    //     {
    //       menuName: "1.织造工单",
    //       index: "proWeaveJob"
    //     },
    //     // {
    //     //   menuName: "2.染整工单",
    //     //   index: "/dyeing"
    //     // },
    //     {
    //       menuName: "2.布飞打印",
    //       index: "clothFly"
    //     }
    //     // {
    //     //   menuName: "3.纱缸查询",
    //     //   index: "yarnBatch"
    //     // }
    //   ]
    // }
    // {
    //   menuName: "测试",
    //   index: "test",
    //   children: [
    //     {
    //       menuName: "gantt",
    //       index: "gantt"
    //     }
    //   ]
    // }
  ];
}
