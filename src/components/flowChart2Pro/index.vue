<template>
  <div class="flow-chart-pro-container">
    <div class="fixed-wrapper">
      <canvas id="fixedConvasRef"></canvas>
    </div>
    <div class="flow-canvas-wrapper">
      <canvas id="flowChartProRef"></canvas>
    </div>
  </div>
</template>

<script>
import { fetchFlowChartData2Pro } from "./api";
export default {
  name: "flowChartProRef",
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      // 主题颜色
      SUB_COLOR: "#1677d2",
      // 背景色
      BG_COLOR: "#EEE",
      // 前景色
      FORE_COLOR: "#FFF",
      // 缸信息
      bleRunJobData: {},
      // 数据列信息
      dataList: [],
      // 头部信息
      headerData: [],
      // 画布样式信息
      oCanvasStyle: {
        H: 0,
        W: 0,
      },
      // 标题栏位高度
      titleH: 30,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.getFlowChartData();
      },
      immediate: true,
    },
  },
  created() {
    // this.getFlowChartData();
  },
  methods: {
    // 获取流程数据
    getFlowChartData() {
      let params = {
        // runJobFk: "a08f1cc0-094d-42ba-8fda-552b789bef52"
        runJobFk: this.value,
      };
      fetchFlowChartData2Pro(params).then((res) => {
        let resData = res.data;
        this.bleRunJobData = resData.proBleadyeRunJob || {};
        this.dataList = resData.proDptReciveLogList.map((item) => {
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
      let ctx = oCanvas.getContext("2d");
      this.oCanvasStyle.W = oCanvas.width = this.getCanvasW(ctx)
      this.oCanvasStyle.H = oCanvas.height = this.getCanvasH(ctx);
      // 重置画布数据
      ctx.clearRect(0, 0, this.oCanvasStyle.W, this.oCanvasStyle.H + 50);
      ctx.fillStyle = this.BG_COLOR;
      ctx.fillRect(0, 0, this.oCanvasStyle.W, this.oCanvasStyle.H + 50);

      this.renderTitler(ctx);
      this.renderHeader(ctx);
      this.renderDottedLine(ctx);
      this.renderFirstColItem(ctx);
      this.renderProcItem(ctx);
      this.renderLine2Proc(ctx);
      // 截取首列
      this.clipFirstCol(ctx);
    },
    // 截取首列
    clipFirstCol(ctx){
      let clipW = 120, clipH = this.oCanvasStyle.H;
      let data = ctx.getImageData(0,0,clipW,clipH);
      let fixedCanvas = document.getElementById("fixedConvasRef");
      let fixedCtx = fixedCanvas.getContext("2d");
      fixedCanvas.width = clipW
      fixedCanvas.height = clipH;
      fixedCtx.putImageData(data, 0, 0, 0, 0, clipW,clipH);
    },
    // 计算canvas的长度值
    getCanvasW(ctx){
      let cansW = 150;
      ctx.font = "15px serif";
      this.headerData.forEach(item => {
        let textW = ctx.measureText(item.dptName).width;
        cansW += (textW + 40 + 20)
      });
      return cansW
    },
    getCanvasH(ctx){
      let cansH = this.dataList.length * 50 + 100;
      // 给予最小值
      if(cansH < 400){
        cansH = 400
      }
      return cansH;
    },
    // 绘制标题
    renderTitler(ctx) {
      let { vatNo, SUB_COLORName, clothWeight, wmUnit } = this.bleRunJobData;
      let userHourse = 0;
      if (this.dataList.length > 0) {
        let sDataTime = new Date(this.dataList[0].acceptDate).getTime();
        let eDateTime = new Date(
          this.dataList.slice(-1)[0].acceptDate
        ).getTime();
        // 获取耗时
        userHourse = ((eDateTime - sDataTime) / 1000 / 60 / 60).toFixed(2);
      }
      let text = `缸号：${vatNo || ""} 颜色：${SUB_COLORName || ""} 数量：${
        clothWeight || ""
      }${wmUnit || ""} 耗时：${userHourse || ""}小时`;
      let textW = ctx.measureText(text).width;
      ctx.fillStyle = this.SUB_COLOR;
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
      ctx.fillStyle = this.SUB_COLOR;
      ctx.font = "13px serif";
      ctx.fillText("时间", 30, 45 + this.titleH);
      ctx.fillText("工序", 65, 45 + this.titleH);
      ctx.fillText("部门", 90, 30 + this.titleH);

      ctx.strokeStyle = this.SUB_COLOR;
      ctx.moveTo(60, 20 + this.titleH);
      ctx.lineTo(60, 50 + this.titleH);
      ctx.moveTo(60, 20 + this.titleH);
      ctx.lineTo(120, 45 + this.titleH);
      ctx.stroke();
    },

    // 绘制表头项
    renderTableColItem(ctx) {
      let initX = 135,
        initY = 15 + this.titleH,
        itemH = 30;
      ctx.font = "15px serif";
      this.headerData.forEach((item) => {
        let textW = ctx.measureText(item.dptName).width;
        let itemW = textW + 40;
        ctx.beginPath();
        ctx.moveTo(initX, initY);
        ctx.lineTo(initX + itemW, initY);
        ctx.lineTo(initX + itemW, initY + itemH);
        ctx.lineTo(initX, initY + itemH);
        ctx.closePath();
        ctx.fillStyle = this.SUB_COLOR; //填充颜色
        ctx.fill(); //填充

        ctx.fillStyle = this.FORE_COLOR;
        // ctx.font = "15px serif";
        ctx.fillText(
          item.dptName,
          initX + 20,
          initY + itemH / 2 + 5
        );

        // 赋值中间项
        item.centerX = initX + itemW / 2;
        // 下一个方块的起始点
        initX += itemW + 20;
      });
    },

    // 绘制虚线
    renderDottedLine(ctx) {
      this.headerData.forEach((item, index) => {
        ctx.setLineDash([5, 10]);
        ctx.lineWidth = 2;
        ctx.storkeStyle = this.SUB_COLOR;
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
      ctx.font = "13px serif";
      this.dataList.forEach((item, index) => {
        item.date.split(" ").forEach((dItem) => {
          let textW = ctx.measureText(dItem).width;
          ctx.fillStyle = this.SUB_COLOR;
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
      this.dataList.forEach((item) => {
        let posX = posXEnum[item.dptworkProcessFk];
        // 存储X轴
        item.posX = posX - 5;
        ctx.fillStyle = this.SUB_COLOR;
        ctx.fillRect(item.posX, item.posY, 10, 20);
        // 添加描述
        let textX = posX + 10,
            textY = item.posY + 15;
       
        // 描述加文字背景
        let textW = ctx.measureText(item.acceptDesc).width;
        ctx.beginPath();
        ctx.moveTo(textX, textY + 2);
        ctx.lineTo(textX + textW, textY + 2);
        ctx.lineTo(textX + textW, textY - 12);
        ctx.lineTo(textX, textY - 12);
        ctx.closePath();
        ctx.fillStyle = this.BG_COLOR; //填充颜色
        ctx.fill(); //填充

        ctx.fillStyle = this.SUB_COLOR;
        ctx.fillText(item.acceptDesc, textX, textY);
      });
    },

    renderLine2Proc(ctx) {
      // 切换为实线
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      this.dataList.forEach((item, index, arr) => {
        let nextItem = arr[index + 1];
        if (!nextItem) return;
        let formX = item.posX + 5,
          formY = item.posY + 20,
          toX = nextItem.posX + (nextItem.posX > item.posX ? 10 : -5),
          // toX = nextItem.posX - 5  ,
          toY = nextItem.posY;
        ctx.beginPath();
        ctx.strokeStyle = this.SUB_COLOR;
        ctx.moveTo(formX, formY);
        // ctx.lineTo(toX, toY);
        ctx.stroke();
        let midX = formX + (toX - formX) - (toX > formX ? 10 : -10);
        let midY = formY + (toY - formY);
        this.drawArrow(ctx, formX, formY, midX, midY, 30, 8, 2, this.SUB_COLOR);
      });
    },
    // 绘制三角形箭头
    drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, SUB_COLOR) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      width = typeof width != "undefined" ? width : 1;
      SUB_COLOR = typeof SUB_COLOR != "SUB_COLOR" ? SUB_COLOR : "#000";

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
      ctx.strokeStyle = SUB_COLOR;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    },
  },
};
</script>
<style lang="stylus" scoped>
.flow-chart-pro-container{
  width 100%
  position relative
  .fixed-wrapper{
    position absolute
    top 0
    left 0
    // background skyblue 
    z-index 999
    width 120px
    height 100%
  }

  .flow-canvas-wrapper{
    width 100%
    overflow-x scroll

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background-color: #eee;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #1e88da;
    }
  }

  
}
</style>