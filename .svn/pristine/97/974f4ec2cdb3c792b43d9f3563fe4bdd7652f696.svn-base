<template>
  <div id="iqIq">
    <view-container title="分类库存查询">
      <!-- <div class="formBox" style="margin-top: 10px">
        <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
      </div> -->

      <el-row>
        <el-col :span="12">
          <div class="crudBox" style="margin-top: 10px">
            <avue-crud
              v-loading="loading"
              ref="crud"
              :data="data"
              :option="crudOp"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
          </div>
        </el-col>
        <el-col :span="12">
          <div id="echart" style="width: 100%; height: 500px"></div>
        </el-col>
      </el-row>
      <el-dialog
        id="iqDlg"
        :visible.sync="dialogVisible"
        v-if="dialogVisible"
        append-to-body
        :fullscreen="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <iqTem
          ref="iqTem"
          @close="dialogVisible = false"
          :rcData="rcData"
          :ccData="ccData"
          :thData="thData"
          :xsData="xsData"
          :lldData="lldData"
          :xsOp="xsOp"
          :rcOp="rcOp"
          :ccOp="ccOp"
          :thOp="thOp"
          :lldOp="lldOp"
          :tle="tle"
          v-loading="loading"
        ></iqTem>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import iqTem from "./tem";
import {
  sx_rc,
  sx_cc,
  sx_th,
  pb_rc,
  pb_tgys,
  pb_tkr,
  pb_xsck,
  pb_lld,
  cpb_rc,
  cpb_cc,
  rhl_rc,
  rhl_cc,
  rhl_lld,
  qt_rc,
  qt_cc,
  qt_tgys,
} from "./data";
import {
  getStock,
  getSx1,
  getSx2,
  getSx3,
  getPb1,
  getPb2,
  getPb3,
  getPb4,
  getPb5,
  getCpb1,
  getCpb2,
  getRhl1,
  getRhl2,
  getRhl3,
  getQt1,
  getQt2,
  getQt3,
} from "@/api/iq/Iq/index";
export default {
  name: "",
  components: {
    iqTem,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 120,
        column: [
          {
            label: "纱线系统编号",
            prop: "yarnsId",
            span: 6,
          },
          {
            label: "纱批/批号",
            prop: "batchNo",
            span: 6,
          },
          {
            label: "纱牌",
            prop: "yarnsCard",
            span: 6,
          },
          {
            label: "客户编号",
            prop: "custId",
            span: 6,
          },
        ],
      },
      data: [
        {
          index: 1,
        },
      ],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "450",
        showSummary: true,
        sumColumnList: [
          {
            label: " ",
            name: "wareWeight",
            type: "sum",
          },
          {
            label: " ",
            name: "outWeight",
            type: "sum",
          },
          {
            label: " ",
            name: "surplusWeight",
            type: "sum",
          },
        ],
        column: [
          {
            label: "#",
            prop: "index",
            cell: true,
            width: 50,
            align: "right",
          },
          {
            label: "类型",
            prop: "type",
            width: 200,
          },

          {
            label: "入库重量",
            prop: "wareWeight",
            cell: true,
            width: 150,
            align: "right",
          },
          {
            label: "出库重量",
            prop: "outWeight",
            cell: true,
            width: 150,
            align: "right",
          },
          {
            label: "库存重量",
            prop: "surplusWeight",
            cell: true,
            width: 150,
            align: "right",
          },
        ],
      },
      tle: {},
      rcData: [],
      ccData: [],
      thData: [],
      xsData: [],
      lldData: [],
      xsOp: {},
      rcOp: sx_rc,
      ccOp: sx_cc,
      thOp: sx_th,
      lldOp: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      getStock().then((res) => {
        res.data.forEach((item, index) => {
          item.index = index + 1;
        });
        this.data = res.data;
        this.setEchart();
      });
    },
    setEchart() {
      var myChart = this.$echarts.init(document.getElementById("echart"));
      // let option = {
      //   backgroundColor: "#ccc",

      //   title: {
      //     text: "分类库存饼图",
      //     left: "center",
      //     top: 20,
      //     textStyle: {
      //       color: "#000",
      //       fontSize: 22,
      //     },
      //   },

      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c} ({d}%)",
      //   },

      //   visualMap: {
      //     show: false,
      //     min: 0,
      //     max: 9999999,
      //     inRange: {
      //       colorLightness: [0, 1],
      //     },
      //   },

      //   series: [
      //     {
      //       name: "类型",
      //       type: "pie",
      //       radius: "55%",
      //       center: ["50%", "50%"],
      //       data: [
      //         { value: this.data[0].surplusWeight, name: this.data[1].type },
      //         { value: this.data[1].surplusWeight, name: this.data[2].type },
      //         { value: this.data[2].surplusWeight, name: this.data[3].type },
      //         { value: this.data[3].surplusWeight, name: this.data[4].type },
      //         { value: this.data[4].surplusWeight, name: this.data[5].type },
      //       ].sort(function (a, b) {
      //         return a.value - b.value;
      //       }),
      //       roseType: "radius",
      //       label: {
      //         color: "#000",
      //         fontSize: 18,
      //       },
      //       labelLine: {
      //         lineStyle: {
      //           color: "#000",
      //         },
      //         smooth: 0.2,
      //         length: 20,
      //         length2: 30,
      //       },
      //       itemStyle: {
      //         color: "#c23531",
      //         shadowBlur: 200,
      //         shadowColor: "rgba(0, 0, 0, 0.5)",
      //       },

      //       animationType: "scale",
      //       animationEasing: "elasticOut",
      //       animationDelay: function (idx) {
      //         return Math.random() * 200;
      //       },
      //     },
      //   ],
      // };
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["入库重量", "出库重量", "库存重量"],
          left: "center",
          top: 15,
          textStyle: {
            color: "#000",
            fontSize: 18,
          },
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
            data: [
              this.data[0].type,
              this.data[1].type,
              this.data[2].type,
              this.data[3].type,
              "其他",
            ],
            axisLabel: {
              textStyle: {
                //更改坐标轴文字颜色
                fontSize: 16, //更改坐标轴文字大小
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                //更改坐标轴文字颜色
                fontSize: 14, //更改坐标轴文字大小
              },
            },
          },
        ],
        series: [
          {
            name: "入库重量",
            type: "bar",
            stack: "入库",
            data: [
              this.data[0].wareWeight,
              this.data[1].wareWeight,
              this.data[2].wareWeight,
              this.data[3].wareWeight,
              this.data[4].wareWeight,
            ],
            itemStyle: {
              color: "rgb(116, 159, 131)",
            },
          },
          {
            name: "出库重量",
            type: "bar",
            stack: "出库",
            itemStyle: {
              color: "rgb(202, 134, 34)",
            },
            data: [
              this.data[0].outWeight,
              this.data[1].outWeight,
              this.data[2].outWeight,
              this.data[3].outWeight,
              this.data[4].outWeight,
            ],
          },
          {
            name: "库存重量",
            type: "bar",
            stack: "库存",
            itemStyle: {
              color: "rgb(194, 53, 49)",
            },
            data: [
              this.data[0].surplusWeight,
              this.data[1].surplusWeight,
              this.data[2].surplusWeight,
              this.data[3].surplusWeight,
              this.data[4].surplusWeight,
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
    handleRowDBLClick(val) {
      this.loading = true;
      this.ccData = [];
      this.rcData = [];
      this.thData = [];
      this.xsData = [];
      this.lldData = [];
      if (val.type === "纱线") {
        this.rcOp = sx_rc;
        this.ccOp = sx_cc;
        this.thOp = sx_th;
        this.tle = {
          tab1: "入库",
          tab2: "出库",
          tab3: "退客人",
        };
        this.getSx();
      } else if (val.type === "胚布") {
        this.rcOp = pb_rc;
        this.ccOp = pb_tgys;
        this.thOp = pb_tkr;
        this.xsOp = pb_xsck;
        this.lldOp = pb_lld;
        this.tle = {
          tab1: "入库",
          tab2: "退供应商",
          tab3: "退客人",
          tab4: "销售出仓",
          tab5: "生产领料单",
        };
        this.getPb();
      } else if (val.type === "成品布") {
        this.rcOp = cpb_rc;
        this.ccOp = cpb_cc;
        this.tle = {
          tab1: "入库",
          tab2: "出库",
        };
        this.getCpb();
      } else if (val.type === "染化料") {
        this.rcOp = rhl_rc;
        this.ccOp = rhl_cc;
        this.thOp = rhl_lld;
        this.tle = {
          tab1: "入库",
          tab2: "出库",
          tab3: "领料/外发加工",
        };
        this.getRhl();
      } else {
        this.rcOp = qt_rc;
        this.ccOp = qt_cc;
        this.thOp = qt_tgys;
        this.tle = {
          tab1: "入库",
          tab2: "出库",
          tab3: "退供应商",
        };
        this.getQt();
      }
      this.dialogVisible = true;
    },
    getSx() {
      getSx3().then((res) => {
        // 入库
        this.rcData = res.data;
        let Index = 1;
        this.rcData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseYarninDtl;
          items.weight = 0;
          items.cartonNum = 0;
          items.whseNum = 0;

          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                // last.index = i + 1;
                last.id = Index++;
                items.weight += last.weight;
                items.cartonNum += last.cartonNum;
                items.whseNum += last.whseNum;
              });
        });
      });
      getSx2().then((res) => {
        // 出库
        this.ccData = res.data;
        let Index = 1;
        this.ccData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseRetyarninDtl;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.weight += last.weight;
              });
        });
      });
      getSx1().then((res) => {
        // 出库
        this.thData = res.data;
        let Index = 1;
        this.thData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseRetreatDtl;
          items.retWeight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.retWeight += last.retWeight;
              });
        });
        this.loading = false;
      });
    },
    getPb() {
      getPb1().then((res) => {
        // 入库
        this.rcData = res.data;
        let Index = 1;
        this.rcData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseCalicoinDtlaEx;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                if (last.whseCalicoinDtlb.length === 0) {
                  last.whseCalicoinDtlb = null;
                } else {
                  last.children = last.whseCalicoinDtlb;
                  last.weight = 0;
                  last.children.forEach((three, i) => {
                    three.id = Index++;
                    last.weight += three.weight;
                    items.weight += last.weight;
                  });
                }
              });
        });
      });
      getPb2().then((res) => {
        // 出库
        this.ccData = res.data;
        let Index = 1;
        this.ccData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseRetsuppcalicodtl;
          items.retTotalpi = 0;
          items.retTotalweight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.retTotalpi += last.retTotalpi;
                items.retTotalweight += last.retTotalweight;
              });
        });
      });
      getPb3().then((res) => {
        // 出库
        this.thData = res.data;
        let Index = 1;
        this.thData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseRetguestcalicodtl;
          items.retTotalpi = 0;
          items.retTotalweight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.retTotalpi += last.retTotalpi;
                items.retTotalweight += last.retTotalweight;
              });
        });
      });
      getPb4().then((res) => {
        // 销售出仓
        this.xsData = res.data;
        let Index = 1;
        this.xsData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseCalicoselloutDtlaEx;
          items.woWeights = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                last.children = last.whseCalicoselloutDtlb;
                last.woWeights = 0;
                last.children.length === 0
                  ? (last.children = null)
                  : last.children.forEach((three, i) => {
                      three.id = Index++;
                      last.woWeights += three.woWeights;
                    });
                items.woWeights += last.woWeights;
              });
        });
      });
      getPb5().then((res) => {
        // 销售出仓
        this.lldData = res.data;
        let Index = 1;

        this.lldData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseMaterialDlaEx;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                last.children = last.whseMaterialDlb;
                last.weight = 0;
                last.children.length === 0
                  ? (last.children = null)
                  : last.children.forEach((three, i) => {
                      three.id = Index++;
                      last.weight += three.weight;
                    });
                items.weight += last.weight;
              });
        });
        this.loading = false;
      });
    },
    getCpb() {
      getCpb1().then((res) => {
        // 成品布入仓
        this.rcData = res.data;
        let Index = 1;
        this.rcData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseFinishedclothinDtl;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.weight += last.weight;
              });
        });
      });

      getCpb2().then((res) => {
        // 出库
        this.ccData = res.data;
        let Index = 1;
        this.ccData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseFinclothselloutDtlaEx;
          items.woWeights = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                if (last.whseFinclothselloutDtlb.length === 0) {
                  last.whseFinclothselloutDtlb = null;
                } else {
                  last.children = last.whseFinclothselloutDtlb;
                  last.woWeights = 0;
                  last.children.forEach((three, i) => {
                    three.id = Index++;
                    last.woWeights += three.woWeights;
                  });
                  items.woWeights += last.woWeights;
                }
              });
        });
        this.loading = false;
      });
    },
    getRhl() {
      getRhl1().then((res) => {
        // 成品布入仓
        this.rcData = res.data;
        let Index = 1;
        this.rcData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseChemicalinDtlaEx;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                if (last.whseChemicalinDtlb.length === 0) {
                  last.whseChemicalinDtlb = null;
                } else {
                  last.children = last.whseChemicalinDtlb;
                  last.weight = 0;
                  last.children.forEach((three, i) => {
                    three.id = Index++;
                    last.weight += three.weight;
                  });
                  items.weight += last.weight;
                }
              });
        });
      });
      getRhl2().then((res) => {
        // 出库
        this.ccData = res.data;
        let Index = 1;
        this.ccData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseRetsuppchemicalDtl;
          items.retQty = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.retQty += last.retQty;
              });
        });
      });
      getRhl3().then((res) => {
        // 成品布入仓
        this.thData = res.data;
        let Index = 1;
        this.thData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseChemicalDlaEx;
          items.weight = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                if (last.whseChemicalDlb.length === 0) {
                  last.whseChemicalDlb = null;
                } else {
                  last.children = last.whseChemicalDlb;
                  last.weight = 0;
                  last.children.forEach((three, i) => {
                    three.id = Index++;
                    last.weight += three.weight;
                  });
                  items.weight += last.weight;
                }
              });
        });
        this.loading = false;
      });
    },
    getQt() {
      getQt1().then((res) => {
        // 成品布入仓
        this.rcData = res.data;
        let Index = 1;
        this.rcData.forEach((items, indexs) => {
          items.index = indexs + 1;
          items.id = Index++;
          items.children = items.whseAccessoriesDtlEx;
          items.poQty = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                if (last.whseAccessoriesDtla.length === 0) {
                  last.whseAccessoriesDtla = null;
                } else {
                  last.children = last.whseAccessoriesDtla;
                  last.poQty = 0;
                  last.children.forEach((three, i) => {
                    three.id = Index++;
                    last.poQty += three.poQty;
                  });
                  items.poQty += last.poQty;
                }
              });
        });
      });
      getQt2().then((res) => {
        // 出库
        this.ccData = res.data;
        let Index = 1;
        this.ccData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseAccessoriesoutDtl;
          items.stockQty = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.stockQty += last.stockQty;
              });
        });
      });
      getQt3().then((res) => {
        // 出库
        this.thData = res.data;
        let Index = 1;
        this.thData.forEach((items, indexs) => {
          items.id = Index++;
          items.index = indexs + 1;
          items.children = items.whseRetsuppaccessoriesDtl;
          items.retQty = 0;
          items.children.length === 0
            ? (items.children = null)
            : items.children.forEach((last, i) => {
                last.id = Index++;
                items.retQty += last.retQty;
              });
        });
        this.loading = false;
      });
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#iqDlg {
  .el-dialog__header {
    padding: 0 !important;
  }

  .el-table--mini, .el-table--small, .el-table__expand-icon {
    font-size: 18px;
  }

  .el-table [class*=el-table__row--level] .el-table__expand-icon {
    margin-right: 5px !important;
  }

  .el-table__row--level-0 {
    background: #F2F6FC !important;
  }
}

#iqIq {
  .el-table__row .el-table__row--level-0 {
    background: #F2F6FC !important;
  }
}
</style>