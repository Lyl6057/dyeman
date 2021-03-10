<template>
  <div id="warehousing">
    <el-card>
      <el-tabs type="border-card" v-model="tabs">
        <el-tab-pane label="胚布入库" name="胚布">
          <whtemplate
            :time="time1"
            :option="pbOption"
            :data="pbData"
            @cellStyle="cellStyle"
          ></whtemplate>
        </el-tab-pane>
        <el-tab-pane label="纱线入库" name="纱线">
          <whtemplate
            :time="time1"
            :option="sxOption"
            :data="sxData"
            @cellStyle="cellStyle"
          ></whtemplate>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="12">
          <p style="font-size: 20px; font-weight: 700; text-indent: 1em">
            布笼信息
          </p>
          <avue-form v-model="forms" :option="formOp"></avue-form
        ></el-col>
        <el-col :span="12">
          <div class="btnList">
            <el-button style="background: green" @click="submit('通过')"
              >提交 【1】</el-button
            >
            <el-button style="background: red" @click="submit('不通过')"
              >取消 【0】</el-button
            >
            <!-- <el-button
              style="background: rgb(235, 181, 99)"
              @click="submit('结束')"
              >结束点数 【5】</el-button
            > -->
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { webSocket } from "@/config/index.js";
import whtemplate from "./template";
export default {
  name: "Ek",
  components: {
    whtemplate,
  },
  data() {
    return {
      tabs: "胚布",
      nowTime: "",
      time1: "",
      timer: "",
      websocket: "",
      pbData: [],
      pbOption: {
        page: false,
        menu: false,
        addBtn: false,
        border: true,
        height: 500,
        highlightCurrentRow: true,
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "left",
          },
          {
            label: "批号",
            prop: "batchNo",
            align: "left",
            width: 200,
          },
          {
            label: "疋号",
            prop: "countingNo",
            align: "left",
            width: 200,
          },
          {
            label: "客人布票号",
            prop: "custTicket",
            align: "left",
          },
          {
            label: "重量",
            prop: "weight",
            align: "right",
          },
          {
            label: "实际重量",
            prop: "actualWeight",
            align: "right",
          },
          {
            label: "重量单位",
            prop: "weightUnit",
            align: "left",
            type: "select",
            dicData: getDIC("bas_matUnit"),
          },
          {
            label: "确认状态",
            prop: "confirmStatus",
            align: "left",
          },
        ],
      },
      sxOption: {
        page: false,
        menu: false,
        addBtn: false,
        border: true,
        height: 500,
        highlightCurrentRow: true,
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "left",
          },
          {
            label: "纱线编号",
            placeholder: " ",
            prop: "yarnSn",
            align: "left",
            readonly: true,
            span: 8,
          },
          {
            label: "纱线名称",
            placeholder: " ",
            prop: "yarnName",
            align: "left",
            readonly: true,
            span: 8,
          },
          {
            label: "入库日期",
            placeholder: " ",
            prop: "yarnDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            align: "center",
            width: 200,
            readonly: true,
            span: 16,
          },
          {
            label: "纱批",
            placeholder: " ",
            prop: "batchNo",
            align: "left",
            readonly: true,
            span: 8,
          },
          {
            label: "纱牌",
            placeholder: " ",
            prop: "yarnSign",
            align: "left",
            readonly: true,
            span: 8,
            width: 120,
          },

          {
            label: "箱数",
            placeholder: " ",
            prop: "sum",
            align: "right",
            readonly: true,
            span: 8,
          },
          {
            label: "锭数",
            placeholder: " ",
            prop: "ingotSum",
            align: "right",
            readonly: true,
            span: 8,
          },
          {
            label: "重量",
            placeholder: " ",
            prop: "weight",
            align: "right",
            readonly: true,
            span: 8,
          },
          // {
          //   label: "实际重量",
          //   prop: "actualWeight",
          //   placeholder: ' ',
          //   align: "right",
          //   readonly: true,
          //   span: 8
          // },
          {
            label: "重量单位",
            prop: "unit",
            placeholder: " ",
            readonly: true,
            align: "left",
            span: 8,
            type: "select",
            dicData: getDIC("bas_matUnit"),
          },
          // {
          //   label: "检验状态",
          //   prop: "inspectionStatus",
          //   placeholder: ' ',
          //   align: "left",
          //   readonly: true,
          //   span: 8
          // },
          {
            label: "确认状态",
            placeholder: " ",
            prop: "confirmStatus",
            align: "left",
            readonly: true,
            span: 8,
          },
        ],
      },
      sxData: [],
      forms: {},
      formOp: {
        labelWidth: 110,
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "布笼编号",
            placeholder: " ",
            prop: "warehouseSn",
            align: "left",
            readonly: true,
            span: 8,
          },
          {
            label: "存在数量",
            placeholder: " ",
            prop: "sum",
            align: "right",
            span: 8,
            readonly: true,
          },
          {
            label: "存在重量",
            placeholder: " ",
            prop: "weight",
            align: "right",
            readonly: true,
            span: 8,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    submit(val) {
      alert(val);
    },
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
          for (let index = 0; index < _this.pbData.length; index++) {
            if (_this.pbData[index].warehouseSn === resD.warehouseSn) {
              _this.pbData.splice(index, 1);
              // _this.tabs = '胚布'
              return;
            }
          }
        } else if (resD.type === "confirm" && resD.confirmStatus === "通过") {
          for (let index = 0; index < _this.pbData.length; index++) {
            if (_this.pbData[index].warehouseSn === resD.warehouseSn) {
              resD.confirmStatus = "待入库";
              _this.tabs = "胚布";
              return;
            }
          }
          _this.pbData.push(resD);
        } else if (
          resD.type === "yarnConfirm" &&
          resD.confirmStatus === "不通过"
        ) {
          for (let index = 0; index < _this.sxData.length; index++) {
            if (_this.sxData[index].yarnSn === resD.yarnSn) {
              _this.sxData.splice(index, 1);
              // _this.tabs = '纱线'
              return;
            }
          }
        } else if (
          resD.type === "yarnConfirm" &&
          resD.confirmStatus === "通过"
        ) {
          for (let index = 0; index < _this.sxData.length; index++) {
            if (_this.sxData[index].yarnSn === resD.yarnSn) {
              resD.confirmStatus = "待入库";
              _this.tabs = "纱线";
              return;
            }
          }
          _this.sxData.push(resD);
        }
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
      this.time1 =
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
    this.nowTime = setInterval(this.time, 1000);
    document.onkeydown = (e) => {
      if (e.key === "1") {
        this.submit("通过");
      } else if (e.key === "0") {
        this.submit("不通过");
      } else if (e.key === "5") {
        this.over();
      }
    };
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

  .el-button {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin: 2em 5em 0 0;
  }

  .el-row, .el-tabs--border-card, .el-tabs--border-card>.el-tabs__header, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active, .el-table, .el-table th, .el-table tr {
    background-color: rgb(2, 26, 60) !important;
    color: #fff;
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