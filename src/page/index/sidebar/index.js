// export default {
// import { proMng } from "./proMng";
// import { whseMng } from "./whseMng";
// import { energy } from "./energy";
// import { laboratory } from "./laboratory";
import { quality } from "./quality";
export const menuData = _this => {
  return {
    menu: [
      // ...proMng(_this)
      // ...energy(_this)
      // ...whseMng(_this)
      // ...laboratory(_this)
      ...quality(_this)
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
      // // //品质
    ]
  };
};
