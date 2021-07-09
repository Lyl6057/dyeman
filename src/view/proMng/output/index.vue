<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-08 16:54:21
 * @Description: 
-->
<template>
  <div
    id="prowovenOutput"
    v-loading="loading"
    :element-loading-text="$t('public.loading')"
  >
    <view-container title="生产日产量">
      <!-- <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.del") }}</el-button
        >
      </div> -->
      <div class="btnList" style="margin-top: 10px !important">
        <el-row>
          <el-col :span="20">
            <avue-form ref="form" :option="formOp" v-model="form"></avue-form
          ></el-col>
          <el-col :span="4">
            <el-button type="primary" @click="query" style="margin-top: 4px">{{
              $t("public.query")
            }}</el-button></el-col
          >
        </el-row>
      </div>
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="cruds"
              @current-row-change="cellClick"
              :page.sync="page"
              @on-load="query"
            ></avue-crud>
          </el-col>
          <!-- <el-col :span="10">
            <avue-crud
              ref="crud"
              :option="crudOp1"
              :data="crud"
              :page.sync="page"
              @on-load="query"
            ></avue-crud>
          </el-col> -->
        </el-row>
      </div>
    </view-container>
    <el-tabs v-model="tab" type="border-card" class="graphical">
      <el-tab-pane label="日产量柱状图" name="zzt">
        <div id="zzt" v-if="echatsV"></div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <po-no @close="dialogVisible = false" @check="check"> </po-no>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud, mainCrud1 } from "./data";
import { get, add, del, update, getPoDtla, getPoColor } from "./api";
import { getYearAndMonthAndDay, getDay } from "@/config/util";
import poNo from "./poNo";
export default {
  name: "prowovenOutput",
  components: {
    poNo: poNo,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      crudOp1: mainCrud1(this),
      cruds: [],
      loading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
      oldData: {},
      dialogVisible: false,
      tab: "zzt",
      echatsV: true,
    };
  },
  watch: {},
  methods: {
    query() {
      if (!this.form.date.length) {
        this.$tip.warning("请选择起始日期!");
        return;
      }
      this.loading = true;
      let date = [];
      let edate = [];
      this.cruds = [];
      this.crud = [];
      this.crudOp = mainCrud(this);
      getYearAndMonthAndDay(this.form.date[0], this.form.date[1]).forEach(
        (item, i) => {
          edate.push(item.ym.split("-")[1] + "/" + item.d);
          date.push(item.ym + "-" + item.d);
        }
      );
      let getArr = (item, i) => {
        return new Promise((resolve, reject) => {
          get({ date: item, weaveJobCode: this.form.weaveJobCode })
            .then((res) => {
              // this.crud = this.crud.concat(res.data);
              res.data.forEach((items) => {
                items.date = item;
              });
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      };
      let promiseArr = date.map((item, i) => {
        return getArr(item, i);
      });
      let tleList = [];
      Promise.all(promiseArr).then((res) => {
        res.forEach((item) => {
          let data = [];
          item.forEach((list) => {
            if (list.realWeight) {
              data.push(list);
            }
          });
          this.crud = this.crud.concat(data);
        });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (tleList.indexOf(item.weaveJobCode) == -1) {
            tleList.push(item.weaveJobCode);
          }
        });
        tleList = tleList.sort((a, b) => {
          return a.substring(a.length - 6) - b.substring(b.length - 6);
        });
        this.$nextTick(() => {
          this.setEchat(tleList, edate, date);
        });
      });
    },
    setEchat(tleList, edate, date) {
      var xAxisData = [];
      var customData = [];
      let legendData = edate;
      var dataList = [];
      var encodeY = [];
      edate.forEach((item, i) => {
        this.crudOp.column.push({
          prop: item,
          label: item,
          width: 80,
          align: "right",
        });
        this.crudOp.sumColumnList.push({
          name: item,
          type: "sum",
          label: " ",
        });
        if (i == edate.length - 1) {
          this.crudOp.column.push({
            prop: "sum",
            label: "合计",
            width: 90,
            align: "right",
            type: "number",
            precision: 1,
            fixed: true,
          });
        }
        encodeY.push(1 + i);
      });
      legendData.unshift("trend");
      tleList.forEach((item, i) => {
        this.cruds.push({
          index: i + 1,
          weaveJobCode: item,
        });
        dataList.push([]);
        customData.push([]);
        xAxisData.push(item);
        customData[i].unshift(i);
      });
      for (var i = 0; i < tleList.length; i++) {
        for (var j = 0; j < date.length; j++) {
          for (let k = 0; k < this.crud.length; k++) {
            if (
              this.crud[k].weaveJobCode == tleList[i] &&
              this.crud[k].date == date[j] &&
              this.crud[k].realWeight != null
            ) {
              dataList[i].push(this.crud[k].realWeight);
              customData[i].push(this.crud[k].realWeight);
              this.cruds[i][edate[j + 1]] = this.crud[k].realWeight;
              break;
            } else if (k == this.crud.length - 1) {
              dataList[i].push(0);
              customData[i].push(0);
              this.cruds[i][edate[j + 1]] = 0;
            }
          }
        }
      }
      this.cruds.forEach((item, i) => {
        item.sum = 0;
        for (let key in item) {
          if (key != "weaveJobCode" && key != "sum" && key != "index") {
            item.sum = Number((item.sum + Number(item[key])).toFixed(1));
          }
        }
      });
      let data = [];
      date.forEach((item, j) => {
        data.push([]);
        dataList.forEach((item, i) => {
          data[j].push(item[j]);
        });
      });
      dataList = data;
      function renderItem(params, api) {
        var xValue = api.value(0);
        var currentSeriesIndices = api.currentSeriesIndices();
        var barLayout = api.barLayout({
          barGap: "30%",
          barCategoryGap: "20%",
          count: currentSeriesIndices.length - 1,
        });
        var points = [];
        for (var i = 0; i < currentSeriesIndices.length; i++) {
          var seriesIndex = currentSeriesIndices[i];
          if (seriesIndex !== params.seriesIndex) {
            var point = api.coord([xValue, api.value(seriesIndex)]);
            point[0] += barLayout[i - 1].offsetCenter;
            point[1] -= 20;
            points.push(point);
          }
        }
        var style = api.style({
          stroke: api.visual("color"),
          fill: null,
        });
        return {
          type: "polyline",
          shape: {
            points: points,
          },
          style: style,
        };
      }
      let option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params, ticket, callback) {
            var htmlStr = "";
            for (var i = 0; i < params.length; i++) {
              var param = params[i];
              var xName = param.name; //x轴的名称
              var seriesName = param.seriesName; //图例名称
              var value = param.value; //y轴值
              var color = param.color; //图例颜色
              if (i === 0) {
                htmlStr += xName + "<br/>"; //x轴的名称
              }
              htmlStr += "<div style='text-align:left;'>";
              //为了保证和原来的效果一样，这里自己实现了一个点的效果
              if (value != 0 && seriesName != "trend") {
                htmlStr +=
                  '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                  color +
                  ';"></span>';
                htmlStr += seriesName + "：" + value;
              }

              htmlStr += "</div>";
            }
            return htmlStr;
          },
        },
        grid: {
          top: "13%", //距上边距
          left: "5%", //距离左边距
          right: "1%", //距离右边距
          bottom: "18%", //距离下边距
        },
        legend: {
          data: legendData,
          type: "scroll",
        },
        dataZoom: [
          {
            type: "slider",
            start: 0,
            end: 50,
          },
          {
            type: "inside",
            start: 50,
            end: 70,
          },
        ],
        xAxis: {
          data: xAxisData,
        },
        yAxis: {},
        series: [
          {
            type: "custom",
            name: "trend",
            renderItem: renderItem,
            itemStyle: {
              borderWidth: 2,
            },
            encode: {
              x: 0,
              y: encodeY,
            },
            data: customData,
            z: 100,
          },
        ].concat(
          this.$echarts.util.map(dataList, function (data, index) {
            return {
              type: "bar",
              animation: false,
              name: legendData[index + 1],
              itemStyle: {
                opacity: 0.8,
              },
              data: data,
            };
          })
        ),
      };
      var chartDom = document.getElementById("zzt");
      var myChart = this.$echarts.init(chartDom);
      option && myChart.setOption(option, true);
      this.loading = false;
    },
    cellClick(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.crud.length; i++) {
        if (!this.crud[i].gatherDate || !this.crud[i].output) {
          this.$tip.error("日期和产量不能为空!");
          return;
        }
      }
      this.loading = true;
      try {
        this.crud.forEach((item, i) => {
          item.gatherDate = item.gatherDate + " 00:00:00";
          update(item).then((res) => {});

          if (i == this.crud.length - 1) {
            this.$tip.success("保存成功!");
            this.query();
            // this.loading = false;
          }
        });
      } catch (error) {
        this.$tip.error("保存失败!" + e);
        this.loading = false;
      }
    },
    del() {},
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.form.date[0] = getDay(-7);
      this.form.date[1] = this.$getNowTime("date");
      this.query();
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#prowovenOutput {
  .el-table .cell {
    line-height: 29px !important;
  }

  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }

  .el-table__body-wrapper {
    z-index: 2;
  }

  .graphical {
    height: 385px;
  }

  .el-range-editor--mini.el-input__inner {
    height: 35px;
  }

  .el-range-editor--mini .el-range-input {
    font-size: 16px;
  }

  .el-range-editor--mini .el-range-separator {
    line-height: 28px;
  }

  #zzt {
    width: 100% !important;
    height: 365px;
  }
}
</style>