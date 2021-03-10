<template>
  <div id="outbound">
    <view-container title="成品布松布看板">
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
            <el-row class="now-ing">
              <el-col :span="8">
                <div>待出库</div>
                <div
                  v-for="item of state.wait"
                  :key="item.gh"
                  style="margin-top: 10px"
                >
                  <span style="height: 25px">【{{ item.gh }}】</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="color: red">松布中</div>
                <div
                  v-for="item of state.going"
                  :key="item.gh"
                  style="margin-top: 10px; text-align: left"
                >
                  <span style="height: 25px">【{{ item.gh }}】</span>
                  <div class="che" v-for="items of item.jd" :key="items.bh">
                    <div class="cheInfo">
                      <div>{{ items.bh }}</div>
                      <div
                        class="eqNum"
                        :style="{
                          background: items.eq != '' ? 'green' : 'red',
                        }"
                      >
                        {{ items.eqName.split("#")[1] || "" }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="color: #67c23a">备布完成</div>
                <div
                  v-for="item of state.success"
                  :key="item.gh"
                  style="margin-top: 10px"
                >
                  <span style="height: 25px">【{{ item.gh }}】</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="eqBox">
        <div class="workerTle">
          <span>对应设备</span>
          <div class="eqStateDes">
            <span>运行中</span>
            <div style="background: green"></div>
            <span>待机</span>
            <div style="background: red"></div>
          </div>
        </div>
        <el-row class="worker">
          <el-col
            :span="4"
            v-for="item of equipment"
            :key="item.id"
            @click.native="toWorker(item)"
          >
            <el-row>
              <el-col :span="8">
                <p style="text-align: center">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yx-icf-buliao" />
                  </svg>
                </p>
                <p>{{ item.name }}</p>
                <div
                  :style="{ background: item.state ? 'green' : 'red' }"
                  class="eqState"
                >
                  <span v-show="item.state">{{ item.po }}</span>
                </div>
              </el-col>
              <el-col :span="16">
                <el-col :span="2">
                  <span>车:</span>
                </el-col>
                <el-col :span="22" class="eqInfo" v-if="item.che != null">{{
                  item.che.bh
                }}</el-col>
                <!-- <p>车 </p> -->
                <div>
                  <el-row>
                    <el-col :span="7">
                      <span>布胚:</span>
                    </el-col>
                    <el-col :span="17" v-if="item.che != null" class="bp">
                      <div
                        style="margin: 2px 0"
                        v-for="bp of item.che.bp"
                        :key="bp"
                      >
                        {{ bp }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <div class="workerTle">操作员</div>
            <el-row class="worker">
              <p>
                <i class="el-icon-s-custom"></i>
              </p>
              <div
                style="font-size: 20px; font-weight: bold; line-height: 15px"
              >
                {{ item.woker }}
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </view-container>
    <el-dialog
      :visible.sync="dialogVisible"
      width="100%"
      height="100%"
      append-to-body
      class="dlgView"
      :close-on-click-modal="false"
    >
      <worker :equipment="workerDetil"></worker>
    </el-dialog>
  </div>
</template>
<script>
import jsonData from "./data.json";
import worker from "./worker";
export default {
  name: "Ek",
  components: {
    worker,
  },
  data() {
    return {
      dialogVisible: false,
      nowTime: "",
      timer: {
        bpSrcoll: "",
        tbSrcoll: "",
        tbSrcCtr: 1,
      },
      countDown: "",
      state: {
        success: [],
        going: [],
        wait: [],
      },
      che: [],
      worker: [],
      workerDetil: {},
      equipment: [],
      data: [
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123451",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "0",
          state: "已完成",
          index: 1,
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123452",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "0",
          state: "已完成",
          index: 2,
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123453",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "1",
          state: "松布中",
          index: 3,
          che: [
            {
              id: "C20091501",
              name: "C20091501",
            },
            {
              id: "C20091502",
              name: "C20091502",
            },
          ],
        },

        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123454",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "2",
          state: "松布中",
          index: 4,
          che: [
            {
              id: "C20091503",
              name: "C20091503",
            },
            {
              id: "C20091504",
              name: "C20091504",
            },
          ],
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123455",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "1",
          state: "待出库",
          index: 5,
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123456",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "4",
          state: "待出库",
          index: 6,
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123457",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "4",
          state: "待出库",
          index: 6,
        },
        {
          ddbh: "PO20090001",
          gys: "供应商1",
          rcdh: "PO123458",
          date: "2020-09-14 10:00:00",
          dateStart: "2020-09-14 10:30:00",
          dateEnd: "2020-09-14 10:35:00",
          type: "4",
          state: "待出库",
          index: 6,
        },
      ],
      option: {
        page: false,
        menu: false,
        addBtn: false,
        border: true,
        height: 350,
        highlightCurrentRow: true,
        column: [
          {
            label: "#",
            prop: "index",
            align: "center",
            width: 50,
          },
          {
            label: "订单编号",
            prop: "ddbh",
            align: "left",
          },
          {
            label: "缸号/批号",
            prop: "gh",
            align: "left",
          },
          //   {
          //     label: "供应商",
          //     prop: "gys",
          //     align: "left",
          //   },
          //   {
          //     label: "出库日期",
          //     prop: "date",
          //     type: "date",
          //     format: "yyyy-MM-dd HH:mm:ss",
          //     valueFormat: "yyyy-MM-dd HH:mm:ss",
          //     align: "center",
          //     width: 200,
          //   },
          {
            label: "预计开始出库",
            prop: "startDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            align: "center",
            width: 200,
          },
          {
            label: "预计完成备布",
            prop: "endDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            align: "center",
            width: 200,
          },
          {
            label: "出库类型",
            prop: "type",
            width: 100,
            align: "left",
            type: "select",
            dicData: [
              {
                label: "纱线",
                value: 0,
              },
              {
                label: "胚布",
                value: 1,
              },
              {
                label: "成品布",
                value: 2,
              },
              {
                label: "生产辅料",
                value: 3,
              },
              {
                label: "染化料",
                value: 4,
              },
              {
                label: "五金",
                value: 4,
              },
            ],
          },
          {
            label: "状态",
            prop: "state",
            width: 100,
            align: "left",
          },
          // {
          //   label: "出库箱数",
          //   prop: "box",
          //   width: 100,
          //   align: "right",
          // },
          // {
          //   label: "出库数量",
          //   prop: "num",
          //   width: 100,
          //   align: "right",
          // },
        ],
      },
    };
  },
  watch: {},
  methods: {
    setData() {
      this.equipment = jsonData.eq;
      this.data = jsonData.poData;
      this.data.forEach((item, index) => {
        if (item.state === "已完成") {
          this.state.success.push(item);
        } else if (item.state === "松布中") {
          this.state.going.push(item);
        } else {
          this.state.wait.push(item);
        }
      });
    },
    bpSrc() {
      let bpDom = document.getElementsByClassName("bp");
      this.equipment.forEach((item, index) => {
        if (Object.keys(item.che).length > 0 && item.che.bp.length > 6) {
          item.che.bp.push(item.che.bp[0]); // 将数组的第一个元素添加到数组的
          item.che.bp.shift();
          bpDom[index].scrollTop += 20;
        }
      });
    },
    tbSrc() {
      let bpDom = document.getElementsByClassName("el-table__body-wrapper")[0];
      if (this.timer.tbSrcCtr > 0) {
        bpDom.scrollTop += 20;
      } else {
        bpDom.scrollTop -= 20;
      }
      if (bpDom.scrollTop >= bpDom.scrollHeight - bpDom.clientHeight) {
        this.timer.tbSrcCtr = 0;
      }
      if (bpDom.scrollTop <= 0) {
        this.timer.tbSrcCtr = 1;
      }
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.state === "已完成") {
        return {
          backgroundColor: "#67C23A",
          fontWeight: "bold",
        };
      } else if (row.state === "松布中") {
        return {
          color: "red",
          fontWeight: "bold",
        };
      } else {
        return { fontWeight: "bold" };
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        if (row.state === "已完成") {
          return {
            color: "#67C23A",
            fontWeight: "bold",
          };
        } else if (row.state === "松布中") {
          return {
            color: "red",
            fontWeight: "bold",
          };
        } else {
          return { fontWeight: "bold" };
        }
      }
    }, // 出库倒计时
    toWorker(val) {
      this.workerDetil = val;
      this.dialogVisible = true;
    },
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
            "出库成功，请准备," +
            this.state.wait.po +
            "即将出库"
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
        this.downLabel = "后开始出库";
        // if (this.state.ing.date == 5 * 60) alert("还剩5分钟");
        --this.state.wait.date;
      } else {
        clearInterval(this.timer);
        alert(this.state.wait.po + "开始出库");
      }
    },
    seTimer() {
      this.timer.bpSrcoll = setInterval(this.bpSrc, 1000);
      this.timer.tbSrcoll = setInterval(this.tbSrc, 1500);
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
    this.setData();
    this.$nextTick(() => {
      this.seTimer();
    });

    // this.state.in.date = 60 * 60; //一个小时，按秒计算，自己调整!
    // this.timer = setInterval(this.CountDown, 1000);
    this.nowTime = setInterval(this.time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.nowTime);
    clearInterval(this.timer);
    clearInterval(this.timer.bpSrcoll);
    clearInterval(this.timer.tbSrcoll);
  },
};
</script>
<style lang='stylus'>
.dlgView {
  height: 100%;
  width: 100%;
  margin: 0;

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__body {
    padding: 0 4px 0 0 !important;
  }

  .el-dialog__header {
    padding: 2px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 15px;
    z-index: 2020;
  }
}

#outbound {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgb(2, 26, 60);
  border: 2px solid #fff;

  .el-tabs--border-card, .el-tabs--border-card>.el-tabs__header, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active, .el-table, .el-table th, .el-table tr {
    background-color: rgb(2, 26, 60) !important;
  }

  .avue-crud .el-table th, .avue-crud .el-table tr, .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #fff;
  }

  .el-button--medium.is-circle {
    padding: 5px;
  }

  .el-tabs__item {
    font-size: 24px;
    font-weight: bold;
  }

  .el-table__body tr.current-row>td, .el-table__body tr:hover>td {
    background-color: rgb(245, 108, 108) !important;
  }

  .el-collapse-item__wrap, .el-collapse, .el-card.is-always-shadow, .el-tabs--border-card {
    border: none;
  }

  .icon {
    width: 58px;
    height: 58px;
    margin: 0 auto;
    text-align: center;
    fill: #fff;
    overflow: hidden;
  }

  p {
    margin-block-start: 0.8em;
    margin-block-end: 0.8em;
  }

  .infoBox {
    width: 98%;
    margin: 1% auto;
  }

  .eqNum {
    margin-left: 5px;
    padding: 0 5px;
    border-radius: 50%;
    // float: left;
    width: 15px;
    height: 25px;
    line-height: 22px;
    text-align: center;
    margin-top: 16px;
  }

  .eqBox {
    .workerTle {
      width: 100%;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      text-align: left;
      display: flex;
      flex-direction: row;
      height: 30px;
    }

    .worker {
      color: #fff;
      height: 100px;
      width: 100%;
      letter-spacing: 1px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;

      i {
        font-size: 58px;
      }

      .el-col-4 {
        border: 1px solid #DCDFE6;
        border-right: none;

        // margin: 0 auto;
        &>div {
          margin: 0.5rem;
        }
      }

      .el-col-4:last-child {
        border-right: 1px solid #DCDFE6;
      }

      .eqState {
        width: 100%;
        height: 25px;
        line-height: 25px;
        margin: 5px auto;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }

      .eqInfo {
        margin-bottom: 5px;
        height: 20px;
      }

      .bp {
        height: 130px;
        overflow: auto;
        // width: 100%;
      }

      .bp::-webkit-scrollbar {
        display: none;
      }
    }

    .eqStateDes {
      width: 80%;
      margin-left: 2em;
      height: 26px;
      display: flex;
      flex-direction: row;
      text-align: right;

      div {
        height: 20px;
        line-height: 26px;
        width: 80px;
        font-size: 16px;
        margin: 5px 10px;
      }

      span {
        height: 32px;
        line-height: 32px;
        width: 50px;
        font-size: 16px;
      }
    }
  }

  .el-table__body-wrapper::-webkit-scrollbar {
    display: none;
  }

  .main {
    background-color: rgb(2, 26, 60);

    .day-Order {
      padding: 0;
      width: 100%;
      // margin: 0 auto;
      margin-bottom: 5px;
    }

    .now-ing {
      margin-top: 0.5em;
      width: 100%;
      // height: 45px;
      // line-height: 45px;
      // text-indent: 5px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;

      .timeLabel {
        height: 50px;
        line-height: 50px;
      }

      .che {
        width: 20%;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        height: 34px;
        margin-left: 10%;
      }

      .cheInfo {
        width: 200px;
        margin: 0px 0 0 110%;
        height: 58px;
        line-height: 58px;
        display: flex;
      }
    }

    .avue-crud__left {
      width: 80%;
      text-align: center;
      font-size: 20px;
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
      padding: 7px 0 !important;
    }

    .el-table {
      font-size: 18px !important;
    }
  }

  .avue-crud {
    width: 100%;
    margin: 0;
  }
}
</style>