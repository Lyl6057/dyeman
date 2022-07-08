<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-06 13:59:04
 * @Description: 
-->
<template>
  <div id="prowovenrealWeight" v-loading="loading" :element-loading-text="$t('public.loading')">
    <view-container title="生产进度统计">
      <div style="margin: 10px !important">
        <avue-form ref="form" :option="formOp" v-model="form" @submit="query"> </avue-form>
      </div>
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" @on-load="query"> </avue-crud>
          </el-col>
        </el-row>
      </div>
    </view-container>
    <el-tabs v-model="tab" type="border-card">
      <el-tab-pane label="产量统计" name="zzt" class="graphical1">
        <div id="echartMain" style="width: 100%; height: 310px"> </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get } from "./api";
export default {
  name: "prowovenrealWeight",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        isWorkOut:""
      },
      crudOp: mainCrud(this),
      crud: [],
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
      oldData: {},
      tab: "zzt",
      startTime: "2021-04-23 00:00:00", //时间轴开始时间
      endTime: "2021-05-26 00:00:00", //时间结束时间
      datas: [],
      resData: [],
    };
  },
  watch: {},
  methods: {
    query(form, done) {
      let dones = done || new Function();
      this.loading = true;
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
         isWorkOut:this.form.isWorkOut
      }
      let data = JSON.parse(JSON.stringify(params));
      if (this.form["isWorkOut"] != "") {
        Object.assign(data,{
          isWorkOut:this.form.isWorkOut
        })
      };
      get(data).then((res) => {
        this.resData = res.data.records;
        this.resData.forEach((item, index) => {
          item.index = index + 1;
        });
        this.page.total = res.data.total;
        this.crud = this.resData.slice(0, this.page.pageSize);
        this.setEchats();
        setTimeout(() => {
          dones()
          this.loading = false;
        }, 200);
      });
    },
    setEchats() {
      let xData = [],
        weight = [],
        realWeight = [],
        qc = [];
      this.crud.forEach((item) => {
        xData.push(item.weaveJobCode);
        weight.push(item.clothWeight);
        realWeight.push(item.realWeight);
        qc.push(item.qcTakeOut);
      });
      var chartDom = document.getElementById("echartMain");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        grid: {
          //直角坐标系内绘图网格
          show: true, //是否显示直角坐标系网格。[ default: false ]
          left: "10%", //grid 组件离容器左侧的距离。
          right: "10px",
          // borderColor: "#c45455", //网格的边框颜色
          bottom: "15%", //
          top: "10%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["净重", "QC扣减数量", "毛重"],
          textStyle: {
            fontSize: 16,
          },
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 10; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              },
              // fontSize: 16,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "净重",
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              // formatter: "{value} ml",
              fontSize: 16,
            },
          },
        ],
        series: [
          {
            name: "净重",
            type: "bar",
            data: weight,
            stack: "净重",
          },
          {
            name: "毛重",
            type: "bar",
            data: realWeight,
          },
          {
            name: "QC扣减数量",
            type: "bar",
            stack: "净重",
            emphasis: {
              focus: "series",
            },
            data: qc,
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 10,
            xAxisIndex: [0],
            bottom: 0,
            showDetail: false,
            showDataShadow: false,
            borderColor: "transparent",
            textStyle: {
              fontSize: 0,
            },
            endValue: 9, //从0开始的相当于5个
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            handleSize: "0%",
            handleStyle: {
              color: "#d3dee5",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  created() { },
  mounted() {
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus' scoped>
>>>.avue-form__menu{
  display: block !important
}
>>>.avue-form__menu--center{
  margin-top: 0 !important
}
>>>.el-table__body-wrapper{
  border-bottom: 1px solid #eee !important
}
.el-popover {
  width: 230px !important;
}

#prowovenrealWeight {
  .gantBox {
    color: #5A565B;
    // background-color: rgb(191, 242, 254);
    margin-top: 7px;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    cursor: pointer;
  }

  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }

  .ganttLabel {
    position: absolute;
    left: 101%;
    top: 7px;
    width: 200px;
    height: 25px;
    line-height: 25px;
    text-align: left;
  }

  .finished {
    background-color: #96EBAE;
  }

  .unfinished {
    background-color: #8EE8EE;
  }

  .el-table .cell {
    line-height: 29px !important;
  }

  .graphical1 {
    height: 320px;
  }

  // .gantt-blocks {
  // height: 100% !important;
  // }
  .gantt-container {
    width: 100% !important;
    // height: 325px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #zzt {
  }

  .gantt-leftbar-item {
    color: #5A565B;
    font-size: 16px;
    line-height: 40px;
    height: 39px !important;
    border-bottom: 1px solid #eee;
  }

  .gantt-block-top-space {
    height: 0 !important;
  }
}
</style>