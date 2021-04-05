<template>
  <div id="warehousing">
    <view-container title="纱线入库看板">
      <el-row class="main">
        <el-col :span="15">
          <div class="day-Order">
            <avue-crud :data="data" :option="option" :cell-style="cellStyle">
              <template slot="menuLeft">
                <span id="time" style="float: left"></span>
                <!-- <span>今日订单</span> -->
              </template>
            </avue-crud>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="infoBox">
            <el-steps :active="1" finish-status="success" simple>
              <el-step title="已入库 2"></el-step>
              <el-step title="正入库 1"></el-step>
              <el-step title="待入库 3"></el-step>
            </el-steps>
            <el-row class="now-ing">
              <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
                <div style="height: 52px; line-height: 58px">
                  正在入库【{{ state.ing.po }}】
                </div>
                <div style="height: 52px; line-height: 58px">
                  等待入库【{{ state.wait.po }}】
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13">
                <div
                  :style="{ opacity: state.ing.label ? 1 : 0 }"
                  class="timeLabel"
                >
                  预计
                  <span style="font-size: 34px">{{ countDown }}</span>
                  后完成入库
                </div>
                <div
                  :style="{ opacity: state.wait.label ? 1 : 0 }"
                  class="timeLabel"
                >
                  预计
                  <span style="font-size: 34px">{{ countDown }}</span>
                  后开始入库
                </div>
              </el-col>
            </el-row>
            <div class="workerTle">值岗工人</div>
            <el-row class="worker">
              <el-col :span="4" v-for="item of worker" :key="item.id">
                <p>
                  <i class="el-icon-s-custom"></i>
                </p>
                {{ item.name }}
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { webSocket } from "@/config/index.js";
export default {
  name: "Ek",
  components: {},
  data() {
    return {
      nowTime: "",
      timer: "",
      websocket: "",
      countDown: "",
      state: {
        in: {
          date: 60 * 60,
          po: "PO123455",
          label: false,
        },
        ing: {
          date: 60 * 60,
          po: "PO123456",
          label: true,
        },
        wait: {
          date: 1 * 10,
          po: "PO123457",
          label: false,
        },
      },
      worker: [
        {
          id: "0001",
          name: "小江",
        },
        {
          id: "0002",
          name: "小欧",
        },
        {
          id: "0003",
          name: "张三",
        },
        {
          id: "0004",
          name: "李四",
        },
        {
          id: "0005",
          name: "小五",
        },
        {
          id: "0006",
          name: "六子",
        },
      ],
      data: [],
      option: {
        page: false,
        menu: false,
        addBtn: false,
        border: true,
        height: 400,
        highlightCurrentRow: true,
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "left",
          },
          {
            label: this.$t("whseField.pbbh"), //"胚布编号",
            prop: "warehouseSn",
            align: "left",
          },
          {
            label: "入库日期",
            prop: "warehouseDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            align: "center",
            width: 200,
          },
          {
            label: "批号",
            prop: "batchNo",
            align: "left",
          },
          {
            label: this.$t("whseField.ph2"),
            prop: "countingNo",
            align: "left",
          },

          {
            label: "送货单重量",
            prop: "weight",
            align: "right",
          },
          {
            label: "实际重量",
            prop: "actualWeight",
            align: "right",
            change: (row) => {},
          },
          {
            label: "重量单位",
            prop: "weightUnit",
            align: "left",
          },

          {
            label: this.$t("whseField.jyzt"),
            prop: "inspectionStatus",
            align: "left",
          },
          {
            label: "确认状态",
            prop: "confirmStatus",
            align: "left",
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    setWebSoket() {
      webSocket.setWebSoket(this);
      let _this = this;
      //接收到消息的回调方法
      _this.websocket.onmessage = function (event) {
        let resD = JSON.parse(event.data);
        if (resD === "null") {
          // _this.$tip.warning("暂无该订单信息!");
          return;
        } else if (resD.type === "confirm" && resD.confirmStatus === "不通过") {
          for (let index = 0; index < _this.data.length; index++) {
            if (_this.data[index].warehouseSn === resD.warehouseSn) {
              _this.data.splice(index, 1);
              return;
            }
          }
        } else if (resD.type === "confirm" && resD.confirmStatus === "通过") {
          for (let index = 0; index < _this.data.length; index++) {
            if (_this.data[index].warehouseSn === resD.warehouseSn) {
              return;
            }
          }
          _this.data.push(resD);
        }

        // _this.setData(JSON.parse(event.data))
      };
      //连接关闭的回调方法
      _this.websocket.onclose = function () {
        _this.websocket.close();
        // _this.$tip.warning("连接关闭!");
      };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        if (row.state === "已入库") {
          return {
            color: "green",
            fontWeight: "bold",
          };
        } else if (row.state === "正在入库") {
          return {
            color: "red",
            fontWeight: "bold",
          };
        } else {
          return { fontWeight: "bold" };
        }
      }
    }, // 入库倒计时
    CountDown() {
      if (this.state.ing.date >= 0) {
        let minutes = Math.floor(this.state.ing.date / 60);
        let seconds = Math.floor(this.state.ing.date % 60);
        this.countDown = minutes + ":" + seconds;
        // if (this.state.ing.date == 5 * 60) alert("还剩5分钟");
        --this.state.ing.date;
      } else {
        clearInterval(this.timer);
        alert(
          this.state.ing.po +
            "入库成功，请准备," +
            this.state.wait.po +
            "即将入库"
        );
        this.state.ing.label = false;
        this.state.wait.label = true;
        this.timer = setInterval(this.outCountDown, 1000);
      }
    },
    // 出库倒计时
    outCountDown() {
      if (this.state.wait.date >= 0) {
        let minutes = Math.floor(this.state.wait.date / 60);
        let seconds = Math.floor(this.state.wait.date % 60);
        this.countDown = minutes + ":" + seconds;
        this.downLabel = "后开始入库";
        // if (this.state.ing.date == 5 * 60) alert("还剩5分钟");
        --this.state.wait.date;
      } else {
        clearInterval(this.timer);
        alert(this.state.wait.po + "开始入库");
      }
    },
    time() {
      var vWeek, vWeek_s, vDay;
      vWeek = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      var date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      vWeek_s = date.getDay();
      document.getElementById("time").innerHTML =
        year +
        "年" +
        month +
        "月" +
        day +
        "日" +
        "\t" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "\t" +
        vWeek[vWeek_s];
    },
  },
  created() {},
  mounted() {
    this.setWebSoket();
    // this.state.in.date = 60 * 60; //一个小时，按秒计算，自己调整!
    this.timer = setInterval(this.CountDown, 1000);
    this.nowTime = setInterval(this.time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.nowTime);
    clearInterval(this.timer);
    this.websocket.close();
  },
  destroyed() {
    this.websocket.close();
  },
};
</script>
<style  lang='stylus'>
#warehousing {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgb(2, 26, 60);
  border: 2px solid #fff;

  .el-collapse-item__wrap, .el-collapse, .el-card.is-always-shadow, .el-tabs--border-card {
    border: none;
  }

  .el-tabs--border-card, .el-tabs--border-card>.el-tabs__header, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active, .el-table, .el-table th, .el-table tr {
    background-color: rgb(2, 26, 60) !important;
  }

  .el-button--medium.is-circle {
    padding: 5px;
  }

  .avue-crud .el-table th, .avue-crud .el-table tr, .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #fff;
  }

  .el-tabs__item {
    font-size: 24px;
    font-weight: bold;
  }

  .el-table__body tr.current-row>td, .el-table__body tr.hover-row>td {
    background-color: rgb(245, 108, 108) !important;
  }

  .infoBox {
    width: 98%;
    margin: 1% auto;
  }

  .main {
    background-color: rgb(2, 26, 60);

    .day-Order {
      padding: 0;
      width: 100%;
      // margin: 0 auto;
      height: 80%;
      min-width: 300px;
      min-height: 500px;
      // background: rgb(2, 26, 60);
    }

    .now-ing {
      margin-top: 1em;
      width: 100%;
      // height: 45px;
      // line-height: 45px;
      // text-indent: 5px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;

      span {
        margin: 0 0.5em;
      }

      .timeLabel {
        height: 50px;
        line-height: 50px;
      }
    }

    .workerTle {
      font-size: 20px;
      font-weight: bold;
      margin-top: 2rem;
      color: #fff;
      text-align: left;
    }

    .worker {
      color: #fff;
      height: 200px;
      width: 100%;

      i {
        font-size: 58px;
      }
    }

    .avue-crud__left {
      width: 80%;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }

    .el-steps--simple {
      padding: 10px 5px !important;
    }

    .el-step.is-simple:not(:last-of-type) .el-step__title {
      width: 60% !important;
    }

    .el-step.is-simple .el-step__arrow {
      flex-grow: 0.5 !important;
    }

    .el-step.is-simple .el-step__title {
      font-size: 18px !important;
      font-weight: bold;
    }

    .el-step__title.is-wait, .el-step__head.is-wait {
      color: #000 !important;
      border-color: #000 !important;
    }

    .el-step__title.is-process, .el-step__head.is-process {
      color: red !important;
      border-color: red !important;
    }

    .avue-crud .el-table--medium td {
      padding: 12px 0 !important;
    }

    .el-table {
      font-size: 18px !important;
    }
  }
}
</style>