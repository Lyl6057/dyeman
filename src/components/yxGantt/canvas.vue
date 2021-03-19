<template>
  <div id="canvas">
    <el-row>
      <el-col :span="10">
        <div class="gTable">
          <vxe-table
            :data="tableData"
            :border="tbOption.border"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            show-overflow
          >
            <vxe-table-column
              v-for="item in tbOption.column"
              :key="item.prop"
              :field="item.prop"
              :title="item.label"
              :width="item.width"
              :align="item.align"
              :edit-render="{
                name: 'input',
                immediate: true,
                attrs: { type: 'text' },
              }"
            ></vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="box" style="width: 800px; overflow: auto">
          <canvas id="myCanvas"></canvas>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import {
  getExtreme,
  getDataPoor,
  getYearAndMonthAndDay,
} from "@/seal/gridOption.js";
export default {
  data() {
    return {
      tableData: [
        {
          startDate: "2020-09-02 16:00:00",
          endDate: "2020-09-08 16:00:00",
          name: "王小虎",
        },
        {
          startDate: "2020-09-02 10:00:00",
          endDate: "2020-10-06 10:00:00",
          name: "王小虎",
        },
        {
          startDate: "2020-09-02 16:00:00",
          endDate: "2020-11-08 16:00:00",
          name: "王小虎",
        },
        {
          startDate: "2020-09-02 10:00:00",
          endDate: "2020-09-06 10:00:00",
          name: "王小虎",
        },
        {
          startDate: "2020-10-02 16:00:00",
          endDate: "2020-12-08 23:00:00",
          name: "王小虎",
        },
        {
          startDate: "2020-09-02 10:00:00",
          endDate: "2020-09-06 10:00:00",
          name: "王小虎",
        },
      ],
      tbOption: {
        border: true,
        column: [
          {
            prop: "name",
            label: "姓名",
            width: "120",
            align: "left",
          },
          {
            prop: "startDate",
            label: "开始时间",
            width: "180",
            align: "center",
          },
          {
            prop: "endDate",
            label: "结束时间",
            width: "180",
            align: "center",
          },
        ],
      },
      gtLength: 0,
      gtDayList: [],
      xData: {},
      lengthList: [],
    };
  },
  methods: {
    reset() {
      let canvas = document.getElementById("myCanvas");
      let ctx = canvas.getContext("2d");
      canvas.onmousemove = function (e) {
        // console.log(e);
      };
      canvas.width = this.gtLength * 48;
      canvas.height = (this.tableData.length + 1) * 48 - 2;
      canvas.style.border = "1px solid rgb(232, 234, 236)";
      var rectH = 10;
      var rectW = 20;
      ctx.lineWidth = 0.2;
      this.tableData.forEach((item, index) => {
        ctx.moveTo(0, (index + 1) * 48);
        ctx.lineTo(this.gtLength * 48, 48 * (index + 1));
      });

      // 渲染日期
      this.gtDayList.forEach((element, index) => {
        ctx.moveTo(47 * index, 0);
        ctx.lineTo(47 * index, 47);
        ctx.font = "14px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "#000";
        // 设置水平对齐方式
        ctx.textAlign = "center";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        ctx.fillText(element, 47 * index + 24, 27);
      });

      this.lengthList.forEach((item, index) => {
        ctx.fillStyle = " #409EFF";

        ctx.fillRect(item.lh1 * 48, (index + 1) * 48 + 10, item.lh2 * 48, 26);
      });
      ctx.stroke();
    },
  },
  mounted() {
    let data1 = getExtreme(this.tableData, "startDate", "endDate");
    this.xData = {
      minResult: data1.minResult,
      maxResult: data1.maxResult,
    };
    this.xData.minResult = this.xData.minResult.split(" ")[0] + " 00:00:00";
    // this.xData.maxResult = this.xData.maxResult.split(" ")[0] + " 00:00:00";
    this.gtLength = getDataPoor(data1.minResult, data1.maxResult, "day") + 1;
    this.gtDayList = getYearAndMonthAndDay(data1.minResult, data1.maxResult);
    this.tableData.forEach((item, index) => {
      // 计算空隙长度
      let lh1 =
        (new Date(item.startDate).valueOf() -
          new Date(this.xData.minResult).valueOf()) /
        (1000 * 3600 * 24);
      let lh2 =
        (new Date(item.endDate).valueOf() -
          new Date(item.startDate).valueOf()) /
        (1000 * 3600 * 24);
      this.lengthList.push({
        lh1,
        lh2,
      });
    });
    console.log(this.lengthList);
    this.reset();
  },
};
</script>

<style lang="stylus">
#canvas {
  // .box {
  // height: 500px;
  // width: 500px;
  // }
}
</style>