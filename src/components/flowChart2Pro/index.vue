<template>
  <div>
    <canvas id="flowChartProRef"></canvas>
  </div>
</template>

<script>
import { fetchFlowChartData2Pro } from "./api";
export default {
  name: "flowChartProRef",
  props:{
    value: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      COLOR: "#1677d2",
      // 缸信息
      bleRunJobData: {},
      // 数据列信息
      dataList: [],
      // 头部信息
      headerData: [],
      // 画布样式信息
      oCanvasStyle: {
        H: 0,
        W: 0
      },
      // 标题栏位高度
      titleH: 30
    };
  },
  watch:{
    value: {
      handler(value){
        this.getFlowChartData();  
      },
      immediate: true
    }
  },
  created() {
    // this.getFlowChartData();
  },
  methods: {
    // 获取流程数据
    getFlowChartData() {
      let params = {
        // runJobFk: "a08f1cc0-094d-42ba-8fda-552b789bef52"
        runJobFk: this.value
      };
      fetchFlowChartData2Pro(params).then(res => {
        let resData = res.data;
        this.bleRunJobData = resData.proBleadyeRunJob || {};
        this.dataList = resData.proDptReciveLogList.map(item => {
          item.date = item.acceptDate.substr(5, 11);
          return item;
        });
        this.headerData = resData.proDptworkProcessList;
        this.init();
      });
    },
    // 初始化
    init() {
      let oCanvas = document.getElementById("flowChartProRef");
      this.oCanvasStyle.W = oCanvas.width = this.headerData.length * 100 + 100;
      this.oCanvasStyle.H = oCanvas.height = this.dataList.length * 50 + 100;
      let ctx = oCanvas.getContext("2d");
      // 重置画布数据
      ctx.clearRect(0, 0, this.oCanvasStyle.W, this.oCanvasStyle.H + 50);
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, this.oCanvasStyle.W, this.oCanvasStyle.H + 50);

      this.renderTitler(ctx);
      this.renderHeader(ctx);
      this.renderDottedLine(ctx);
      this.renderFirstColItem(ctx);
      this.renderProcItem(ctx);
      this.renderLine2Proc(ctx);
    },
    // 绘制标题
    renderTitler(ctx) {
      let { vatNo, colorName, clothWeight, wmUnit } = this.bleRunJobData;
      let userHourse = 0;
      if (this.dataList.length > 0) {
        let sDataTime = new Date(this.dataList[0].acceptDate).getTime();
        let eDateTime = new Date(
          this.dataList.slice(-1)[0].acceptDate
        ).getTime();
        // 获取耗时
        userHourse = ((eDateTime - sDataTime) / 1000 / 60 / 60).toFixed(2);
      }
      let text = `缸号：${vatNo || ''} 颜色：${colorName || ''} 数量：${clothWeight || '' }${wmUnit || ''} 耗时：${userHourse || ''}小时`;
      let textW = ctx.measureText(text).width;
      ctx.fillStyle = this.COLOR;
      ctx.font = "15px serif";
      let startDrawX = (this.oCanvasStyle.W - textW) / 2.5;
      ctx.fillText(text, startDrawX, 30);
    },
    // 绘制 表头
    renderHeader(ctx) {
      this.renderColType(ctx);
      this.renderTableColItem(ctx);
    },

    // 绘制栏位类型
    renderColType(ctx) {
      ctx.fillStyle = this.COLOR;
      ctx.font = "13px serif";
      ctx.fillText("时间轴", 10, 50 + this.titleH);
      ctx.fillText("工序", 65, 50 + this.titleH);
      ctx.fillText("部门", 70, 20 + this.titleH);

      ctx.beginPath();
      ctx.strokeStyle = this.COLOR;
      ctx.moveTo(50, 18 + this.titleH);
      ctx.lineTo(60, 60 + this.titleH);
      ctx.moveTo(50, 18 + this.titleH);
      ctx.lineTo(90, 30 + this.titleH);
      ctx.stroke();
    },

    // 绘制表头项
    renderTableColItem(ctx) {
      let initX = 120,
        initY = 15 + this.titleH,
        itemH = 30;
      this.headerData.forEach(item => {
        let textW = ctx.measureText(item.dptName).width;
        let itemW = textW * 2.3;
        ctx.beginPath();
        ctx.moveTo(initX, initY);
        ctx.lineTo(initX + itemW, initY);
        ctx.lineTo(initX + itemW, initY + itemH);
        ctx.lineTo(initX, initY + itemH);
        ctx.closePath();
        ctx.fillStyle = this.COLOR; //填充颜色
        ctx.fill(); //填充

        ctx.fillStyle = "#fff";
        ctx.font = "15px serif";
        ctx.fillText(
          item.dptName,
          initX + textW / 2 + 5,
          initY + itemH / 2 + 5
        );

        // 赋值中间项
        item.centerX = initX + itemW / 2;
        initX += itemW + 20;
      });
    },

    // 绘制虚线
    renderDottedLine(ctx) {
      this.headerData.forEach((item, index) => {
        ctx.setLineDash([5, 10]);
        ctx.lineWidth = 2;
        ctx.storkeStyle = this.COLOR;
        ctx.beginPath();
        ctx.moveTo(item.centerX, 40 + this.titleH);
        ctx.lineTo(item.centerX, this.oCanvasStyle.H);
        ctx.stroke();
      });
    },

    // 绘制首行数据
    renderFirstColItem(ctx) {
      let initY = 80 + this.titleH,
        colX = 60;
      this.dataList.forEach((item, index) => {
        item.date.split(" ").forEach(dItem => {
          let textW = ctx.measureText(dItem).width;
          ctx.fillStyle = this.COLOR;
          ctx.font = "13px serif";
          ctx.fillText(dItem, colX - textW / 2, initY);
          initY += 15;
        });
        // 记录当前行的Y轴坐标
        item.posY = initY - 35;
        initY += 20;
      });
    },

    // 绘制工序块
    renderProcItem(ctx) {
      let posXEnum = this.headerData.reduce(
        (target, item) =>
          Object.assign(target, { [item.dptCode]: item.centerX }),
        {}
      );
      this.dataList.forEach(item => {
        let posX = posXEnum[item.dptworkProcessFk];
        // 存储X轴
        item.posX = posX - 5;
        ctx.fillStyle = this.COLOR;
        ctx.fillRect(item.posX, item.posY, 10, 20);
        ctx.fillText(item.acceptDesc, posX + 10, item.posY + 15);
      });
    },

    renderLine2Proc(ctx) {
      // 切换为实线
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      this.dataList.forEach((item, index, arr) => {
        let nextItem = arr[index + 1];
        if (!nextItem) return;
        let formX = item.posX + 5,
            formY = item.posY + 20,
            toX = nextItem.posX + 5,
            toY = nextItem.posY;
        ctx.beginPath();
        ctx.strokeStyle = this.COLOR;
        ctx.moveTo(formX, formY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        let midX = formX + ((toX - formX) / 2);
        let midY = formY + ((toY - formY) / 2);
        this.drawArrow(ctx,formX, formY, midX, midY, 30, 8, 2, this.COLOR )
       
      });
    },
    // 绘制三角形箭头
    drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      width = typeof width != "undefined" ? width : 1;
      color = typeof color != "color" ? color : "#000";

      // 计算各角度和对应的P2,P3坐标
      var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

      ctx.save();
      ctx.beginPath();

      var arrowX = fromX - topX,
        arrowY = fromY - topY;

      ctx.moveTo(arrowX, arrowY);
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.restore();
    }
  }
};
</script>