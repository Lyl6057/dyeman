<template>
  <div id="wkWarehouse">
    <view-container title="出入仓统计">
      <el-row class="btnList">
        <!-- <el-button type="warning" @click="cancel">取消</el-button> -->
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox" style="margin-top: 5px">
        <!--                 @current-row-change="cellClick"
                @row-dblclick="handleRowDBLClick" -->
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
        ></avue-crud>
      </el-row>
      <el-row>
        <el-col
          :span="12"
          id="leftChart"
          ref="leftChart"
          width="100%"
          height="500px"
        >
        </el-col>
        <el-col :span="12" id="rightChart" ref="rightChart"></el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { crud, form } from "./option";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: form(this),
      form: {},
      crudOp: crud(this),
      crud: [
        {
          id: "sx001",
          date: "2020-10-13 12:05:00",
          weight: 20,
          unit: "KG",
          type: "纱线入仓",
        },
        {
          id: "sx002",
          date: "2020-10-18 15:05:00",
          weight: 10,
          unit: "KG",
          type: "纱线出仓",
        },
      ],
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
    };
  },
  watch: {},
  methods: {
    query() {
      this.crud.forEach((item, i) => {
        item.index = i + 1;
      });
    },
    setEchart() {
      const leftDom = document.getElementById("leftChart"),
        rightDom = document.getElementById("rightChart");
      const leftC = this.$echarts.init(leftDom);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      };
      leftC.setOption(option);
    },
    cancel() {},
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {},
  mounted() {
    this.setEchart();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#wkDlg {
  .avue-crud__menu {
    height: 5px !important;
    min-height: 5px !important;
    font-size: 18px;
  }
}

#wkWarehouse {
  .avue-crud .el-input--mini input, .avue-form .el-input--mini input, .el-range-editor--mini .el-range-separator, .el-range-editor--mini.el-input__inner {
    height: 32px !important;
    line-height: 32px;
  }

  .el-tag, .el-range-editor--mini .el-range-input, .el-range-editor--mini .el-range-separator {
    font-size: 14px;
  }
}
</style>