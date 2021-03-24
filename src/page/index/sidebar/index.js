// export default {
export const menuData = _this => {
  return {
    menu: [
      {
        menuName: _this.$t("menuData.ProductionName"),
        index: "0",
        icon: "el-icon-edit-outline",
        children: [
          {
            menuName: "基础设定",
            index: "/basics"
          },
          {
            menuName: _this.$t("menuData.ProductionName"),
            index: "/proMng"
          },
          {
            menuName: "报表",
            index: "/proReport"
          },
          // {
          //   menuName: _this.$t("menuData.Production[1].name"),
          //   index: "/ProWorkflowInfo"
          // },
          // // {
          // //   menuName: _this.$t('menuData.Production[0].name'),
          // //   index: "/ProSchedule"
          // // },
          // // {
          // //   menuName: "生产排期明细",
          // //   index: "/ProScheduleDetail"
          // // },
          // {
          //   menuName: _this.$t("menuData.Production[4].name"),
          //   index: "/proSalSchedule"
          // },
          // {
          //   menuName: "生產排單",
          //   index: "/proScheduling"
          // },
          // {
          //   menuName: _this.$t("menuData.Production[0].name"),
          //   index: "/EquipmentSchedule"
          // },
          // {
          //   menuName: _this.$t("menuData.Production[6].name"),
          //   index: "/EquipmentType"
          // },
          // {
          //   menuName: "打印",
          //   index: "/print"
          // }
        ]
      },
      // 产品管理
      // {
      //   menuName: '产品管理',
      //   index: "0",
      //   icon: "el-icon-s-order",
      //   name: "Product management",
      //   children: [
      //     {
      //       menuName: '产品信息',
      //       index: "/proInfo"
      //     },
      //     {
      //       menuName: '消息队列主题',
      //       index: "/proMq"
      //     },
      //     {
      //       menuName: "功能定义",
      //       index: "/proFd"
      //     },
      //     {
      //       menuName: "服务订阅",
      //       index: "/proSs"
      //     },

      //   ]
      // },
      // 规则引擎
      // {
      //   menuName: '规则引擎',
      //   index: "1",
      //   icon: "el-icon-s-order",
      //   name: "The rule engine",
      //   children: [
      //     {
      //       menuName: '上行规则',
      //       index: "/reUp"
      //     },
      //     {
      //       menuName: '下行规则',
      //       index: "/reDown"
      //     },
      //     {
      //       menuName: "预警规则",
      //       index: "/reWarn"
      //     },
      //     {
      //       menuName: "事件规则",
      //       index: "/reEvent"
      //     },
      //   ]
      // },
      // // 监控运维
      // {
      //   menuName: '监控运维',
      //   index: "2",
      //   icon: "el-icon-s-order",
      //   name: "Monitor the operational",
      //   children: [
      //     {
      //       menuName: '实时监控',
      //       index: "/mtoRt"
      //     },
      //     {
      //       menuName: '在线调试',
      //       index: "/mtoOd"
      //     },
      //     {
      //       menuName: "设备看板",
      //       index: "/mtoEk"
      //     },
      //     {
      //       menuName: "设备日志",
      //       index: "/mtoEl"
      //     },
      //     {
      //       menuName: "固件升级",
      //       index: "/mtoFu"
      //     },
      //     {
      //       menuName: "远程配置",
      //       index: "/mtoRc"
      //     },
      //   ]
      // },
      // // 现场视频
      // {
      //   menuName: '现场视频',
      //   index: "3",
      //   icon: "el-icon-s-order",
      //   name: "Live video",
      //   children: [
      //     {
      //       menuName: '视频墙',
      //       index: "/lvWall"
      //     },
      //     {
      //       menuName: '空间视频',
      //       index: "/lvSv"
      //     }
      //   ]
      // },
      // // 设备管理
      // {
      //   menuName: '设备管理',
      //   index: "4",
      //   icon: "el-icon-s-order",
      //   name: "Equipment management",
      //   children: [
      //     {
      //       menuName: '设备分类',
      //       index: "/emEc"
      //     },
      //     {
      //       menuName: '设备信息',
      //       index: "/emEi"
      //     },
      //     {
      //       menuName: "设备状态",
      //       index: "/emEs"
      //     },
      //     {
      //       menuName: "文件管理",
      //       index: "/emFm"
      //     },
      //     {
      //       menuName: "事件管理",
      //       index: "/emEm"
      //     },
      //     {
      //       menuName: "服务调用",
      //       index: "/emSc"
      //     },
      //   ]
      // },
      // // 通讯服务
      // {
      //   menuName: '通讯服务',
      //   index: "5",
      //   icon: "el-icon-s-order",
      //   name: "Communication services",
      //   children: [
      //     {
      //       menuName: '串口服务',
      //       index: "/csSps"
      //     },
      //     {
      //       menuName: 'socket',
      //       index: "/csSocket"
      //     },
      //     {
      //       menuName: "webSocket",
      //       index: "/csWs"
      //     },
      //     {
      //       menuName: "HTTP服务",
      //       index: "/csHttp"
      //     },

      //   ]
      // },
      // // 数据分析
      // {
      //   menuName: '数据分析',
      //   index: "6",
      //   icon: "el-icon-s-order",
      //   name: "The data analysis",
      //   children: [
      //     {
      //       menuName: '时间分析',
      //       index: "/daTa"
      //     },
      //     {
      //       menuName: '位置分析',
      //       index: "/daPoa"
      //     },
      //     {
      //       menuName: "工序分析",
      //       index: "/daPra"
      //     },
      //     {
      //       menuName: "订单分析",
      //       index: "/daOra"
      //     },
      //     {
      //       menuName: "质量分析",
      //       index: "/daQa"
      //     },
      //     {
      //       menuName: "产能分析",
      //       index: "/daCa"
      //     },
      //     {
      //       menuName: "操作人分析",
      //       index: "/daOpa"
      //     },
      //   ]
      // },
      // 库存管理
      {
        menuName: '库存管理',
        index: "7",
        icon: "el-icon-s-order",
        name: "im",
        children: [
          {
            menuName: '1.仓位管理',
            index: "/imWl"
          },
          {
            menuName: '2.出入库管理',
            index: "/imWk"
          },
          {
            menuName: '3.库存盘点',
            index: "/imSt"
          },

          // {
          //   menuName: "手动操作",
          //   index: "/imHo"
          // },
          // {
          //   menuName: "安全库存",
          //   index: "/imSft"
          // },
          // {
          //   menuName: "采购需求生成",
          //   index: "/imDg"
          // }
        ]
      },
      // 库存查询
      // {
      //   menuName: '二.库存查询',
      //   index: "8",
      //   icon: "el-icon-s-order",
      //   name: "Inventory query",
      //   children: [
      //     {
      //       menuName: '1.盘盈/盘亏',
      //       index: "/iqPal"
      //     },
      //     // {
      //     //   menuName: '分类库存查询',
      //     //   index: "/iqIq"
      //     // },
      //     {
      //       menuName: '2.货位查询',
      //       index: "/iqGq"
      //     },
      //     // {
      //     //   menuName: "订单库存查询",
      //     //   index: "/iqOq"
      //     // }
      //   ]
      // },
      // 库存查询
      // {
      //   menuName: '库存报表',
      //   index: "9",
      //   icon: "el-icon-s-order",
      //   name: "Inventory report",
      //   children: [
      //     {
      //       menuName: '库存汇总报表',
      //       index: "/summaryReport"
      //     },
      //     {
      //       menuName: '仓库盘点报表',
      //       index: "/inventoryReport"
      //     },
      //     {
      //       menuName: "库存进出报表",
      //       index: "/inoutReport"
      //     },
      //     {
      //       menuName: '仓库日报',
      //       index: "/warehouseDaily"
      //     },
      //     {
      //       menuName: "仓库月报",
      //       index: "/warehouseMReport"
      //     }
      //   ]
      // },
      //  化验室
      // {
      //   menuName: '化驗室',
      //   index: "10",
      //   icon: "el-icon-s-order",
      //   name: "Laboratory",
      //   children: [
      //     {
      //       menuName: '1.色号资料',
      //       index: "/colorMng"
      //     },
      //     {
      //       menuName: '2.色号打办记录',
      //       index: "/colorPlay"
      //     },
      //     // {
      //     //   menuName: '复办送板',
      //     //   index: "/Arrange"
      //     // },
      //     {
      //       menuName: "3." + _this.$t("menuData.Laboratory[3].name"),
      //       index: "/Arran"
      //     },
      //     // {
      //     //   menuName: "4." + _this.$t("menuData.Laboratory[2].name"),
      //     //   index: "/Big"
      //     // },

      //     {
      //       menuName: "4.成品检验报告",
      //       index: "/FabricOrder"
      //     },
      //     {
      //       menuName: "5.工序检验报告",
      //       index: "/FabricProcess"
      //     },
      //     {
      //       menuName: "6.胚布检验报告",
      //       index: "/dyeFabric"
      //     },
      //     {
      //       menuName: "7.染化料检验报告",
      //       index: "/dyeStuff"
      //     },
      //     {
      //       menuName: "8.纱线检验报告",
      //       index: "/dyeYarn"
      //     },
      //     {
      //       menuName: "9.检验报告附件",
      //       index: "/reportAccry"
      //     }
      //   ]
      // },
      // // //品质
      // {
      //   menuName: _this.$t("caidan.pzgl"),
      //   index: "6",
      //   icon: "el-icon-set-up",
      //   children: [
      //     {
      //       menuName: "1." + _this.$t("caidan.zlxmgl"),
      //       index: "/quaLity"
      //     },
      //     {
      //       menuName: "2." + _this.$t("caidan.hysjc"),
      //       index: "/Laboratory"
      //     },
      //     {
      //       menuName: "3." + _this.$t("caidan.psgl"),
      //       index: "/Color"
      //     },
      //     {
      //       menuName: "4." + _this.$t("caidan.jctj"),
      //       index: "/Count"
      //     },
      //     // {
      //     //   menuName: "测试页面",
      //     //   index: "/demo"
      //     // },
      //     // {
      //     //   menuName: "5.决策树",
      //     //   index: "/Policy"
      //     // },
      //     {
      //       menuName: "5.质量检验标准",
      //       index: "/Standard"
      //     },
      //     {
      //       menuName: "6.检测项目基础定义",
      //       index: "/testItem"
      //     }
      //   ]
      // },
    ]
  };

};
