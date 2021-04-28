<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-26 09:21:58
 * @Description: 
-->
<template>
  <div
    id="prowovenOutput"
    v-loading="loading"
    :element-loading-text="$t('public.loading')"
  >
    <view-container title="生产日产量">
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.del") }}</el-button
        >
        <el-button type="primary" @click="query">{{
          $t("public.query")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="crud"
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
      <el-tab-pane label="柱状图" name="zzt">
        <div id="zzt"></div>
      </el-tab-pane>
      <el-tab-pane label="趋势图" name="qst">
        <div id="qst" style="height: 325px; width: 87.5vw"></div>
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
      crud1: [],
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
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.crudOp.column[4].hide = false;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      this.form.gatherDate
        ? (this.form.gatherDate = this.form.gatherDate + " 00:00:00")
        : "";
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          let resData = res.data;
          this.crud = resData.records;
          this.crud.sort((a, b) => {
            return Date.parse(a.gatherDate) - Date.parse(b.gatherDate);
          });
          this.page.total = resData.total;
          this.crud.forEach((item, i) => {
            item.custId = item.salPoFk;
            item.custContNo = item.salPoFk;
            item.poType = item.salPoFk;
            item.fabId = item.salPoDtlaFk;
            item.fabName = item.salPoDtlaFk;
            item.colorName = item.salPoColorFk;
            item.$cellEdit = true;
            item.index = i + 1;
          });
          setTimeout(() => {
            this.$nextTick(() => {
              this.crud.forEach((item, i) => {
                // item.custName = item.$custId;
                this.$set(item, "custName", item.$custId);
                this.$set(item, "poType1", item.$poType);
                this.crudOp.column[4].hide = true;
              });

              this.setEchats();
              this.loading = false;
            });
          }, 200);
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    setEchats() {
      let data = this.$unique(this.crud, "gatherDate");
      let dataList = [];
      let test = [];
      data.forEach((item, i) => {
        dataList.push(item.gatherDate.split(" ")[0]);
        test.push(item.gatherDate);
      });
      let list = this.$unique(this.crud, "colorName");
      let relist = [],
        series = [],
        lineData = [];

      list.forEach((item, i) => {
        // this.crud.forEach((items,j) =>{
        //   if (item.$colorName == items.$colorName) { // 颜色相同
        //     relist
        //   }
        // })
        relist.push(item.$colorName);
        series.push({
          name: item.$colorName,
          type: "bar",
          barGap: 0,
          date: item.gatherDate,
          // label: labelOption,
          emphasis: {
            focus: "series",
          },
        });
        lineData.push({
          name: item.$colorName,
          type: "line",
          stack: item.$colorName + "实际产量",
        });
      });
      series.forEach((item, i) => {
        item.data = [];
        this.crud.forEach((items, j) => {
          if (item.name === items.$colorName) {
            item.data[test.indexOf(items.gatherDate)] = items.realOutPut;
          }
        });
      });
      lineData.forEach((item, i) => {
        item.data = [];
        this.crud.forEach((items, j) => {
          if (item.name === items.$colorName) {
            item.data[test.indexOf(items.gatherDate)] = items.realOutPut;
          }
        });
      });
      console.log(lineData);
      var chartDom = document.getElementById("zzt");
      var myChart = this.$echarts.init(chartDom, "dark");
      var option;
      var chartDom1 = document.getElementById("qst");
      var myChart1 = this.$echarts.init(chartDom1, "dark");
      var option1;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "13%", //距上边距
          left: "5%", //距离左边距
          right: "5%", //距离右边距
          bottom: "10%", //距离下边距
        },
        legend: {
          data: relist, // 类别
          textStyle: {
            fontSize: 18,
            margin: 0,
            padding: 0,
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["line", "bar", "stack", "tiled"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: dataList, // X轴日期
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 16,
              },
            },
          },
        ],
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16,
            },
          },
        },

        series: series,
      };

      option1 = {
        // title: {
        //   text: "折线图堆叠",
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: relist,
          textStyle: {
            fontSize: 18,
            margin: 0,
            padding: 0,
          },
        },
        grid: {
          top: "13%", //距上边距
          left: "2%", //距离左边距
          right: "5%", //距离右边距
          bottom: "2%", //距离下边距
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dataList,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 16,
            },
          },
        },
        series: lineData,
      };
      option && myChart.setOption(option);
      option1 && myChart1.setOption(option1);
    },
    cellClick(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.chooseData = val;
    },
    check(val) {
      // if (Object.keys(val).length > 0) {
      //   getPoDtla({ salPoFk: val.salPooid }).then((res) => {
      //     console.log(res);
      //     val.salPoDtlaoid = res.data.rows[0].salPoDtlaoid;
      //     getPoColor({ salPoDtlaFk: val.salPoDtlaoid }).then((color) => {
      //       console.log(color);
      //     });
      //   });
      //   // this.chooseData.
      // }
      // this.dialogVisible = false;
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
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#prowovenOutput {
  .el-table .cell {
    line-height: 29px !important;
  }

  .graphical {
    height: 350px;
  }

  #zzt {
    width: 100% !important;
    height: 325px;
  }
}
</style>