<template>
  <div id="points">
    <view-container title="纱线点数看板">
      <el-row>
        <el-col :span="24">
          <div class="day-Order">
            <avue-crud
              ref="crud"
              :data="data"
              :option="option"
              :cell-style="cellStyle"
              @current-row-change="check"
            >
              <template slot="menuLeft">
                <span id="time" style="float: left"></span>
                <!-- <span>今日订单</span> -->
              </template>
            </avue-crud>
          </div>
        </el-col>
      </el-row>
      <el-row class="main">
        <el-col :span="14">
          <div class="formTle">
            胚布信息
            <el-button
              style="padding: 5px 10px; margin-left: 10px"
              @click="chengzhong"
              >模拟称重
            </el-button>
          </div>
          <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
        </el-col>
        <el-col :span="10">
          <div class="btnList" v-show="form.yarnSn">
            <el-button style="background: green" @click="submit('通过')"
              >通过 【1】</el-button
            >
            <el-button style="background: red" @click="submit('不通过')"
              >不通过 【0】</el-button
            >
            <el-button style="background: rgb(235, 181, 99)" @click="over"
              >结束点数 【5】</el-button
            >
          </div>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { getyarnInfo, updataYarn } from "@/api/mto/Ek/index.js";
import { webSocket } from "@/config/index.js";
export default {
  name: "Ek",
  components: {},
  data() {
    return {
      nowTime: "",
      websocket: "",
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
      form: {
        warehouseSn: "",
      },
      formOp: {
        labelWidth: 110,
        submitBtn: false,
        emptyBtn: false,
        column: [
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
          {
            label: "实际重量",
            prop: "actualWeight",
            placeholder: " ",
            align: "right",
            readonly: true,
            span: 8,
          },
          {
            label: "重量单位",
            prop: "unit",
            placeholder: " ",
            readonly: true,
            align: "left",
            span: 8,
          },
          {
            label: "检验状态",
            prop: "inspectionStatus",
            placeholder: " ",
            align: "left",
            readonly: true,
            span: 8,
          },
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
          {
            label: "实际重量",
            prop: "actualWeight",
            placeholder: " ",
            align: "right",
            readonly: true,
            span: 8,
          },
          {
            label: "重量单位",
            prop: "unit",
            placeholder: " ",
            readonly: true,
            align: "left",
            span: 8,
          },
          {
            label: "检验状态",
            prop: "inspectionStatus",
            placeholder: " ",
            align: "left",
            readonly: true,
            span: 8,
          },
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
    };
  },
  watch: {},
  methods: {
    setWebSoket() {
      webSocket.setWebSoket(this);
      let _this = this;
      //接收到消息的回调方法
      _this.websocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        if (event.data === "null") {
          _this.$tip.warning("暂无该订单信息!");
          return;
        }
        if (data.yarnSn) {
          _this.setData(data);
        }
      };
    },
    //称重
    chengzhong() {
      if (this.form.yarnSn != "") {
        this.form.actualWeight = (
          this.form.weight +
          Math.random() * (0.5 + 0.5) -
          0.5
        ).toFixed(2);
        this.data[this.form.index - 1].actualWeight = this.form.actualWeight;
        if (this.form.actualWeight > this.form.weight) {
          this.data[this.form.index - 1].inspectionStatus = "通过";
          this.form.inspectionStatus = "通过";
        } else {
          this.data[this.form.index - 1].inspectionStatus = "不通过";
          this.form.inspectionStatus = "不通过";
        }
      }
    },
    setData(data) {
      for (let index = 0; index < this.data.length; index++) {
        if (
          data.yarnSn === this.data[index].yarnSn &&
          data.type === "getYarn"
        ) {
          this.$tip.error("单号重复!");
          return;
        }
        if (
          data.yarnSn === this.data[index].yarnSn &&
          data.type === "yarnConfirm"
        ) {
          this.data[index].confirmStatus = data.confirmStatus;
          this.$tip.success("操作成功!");
          return;
        }
      }
      data.index = this.data.length + 1;
      // data.weightUnit = 'kg'
      this.data.push(data);
      this.$refs.crud.setCurrentRow(data);
      this.$nextTick(() => {
        document.getElementsByClassName(
          "el-table__body-wrapper"
        )[0].scrollTop += 100;
      });
    },
    check(row) {
      this.form = this.data[row.index - 1];
    },
    over() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.data = [];
    },
    submit(val) {
      if (Object.keys(this.form).length > 0) {
        this.form.confirmStatus = val;
        this.data[this.form.index - 1].confirmStatus = val;
        updataYarn(this.form).then((res) => {
          if (res.status === 200) {
            this.$tip.success("操作成功!");
          }
        });
      } else {
        this.$tip.error("请选择操作的数据!");
      }
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
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 11) {
        if (row.inspectionStatus === "通过") {
          return {
            color: "green",
            fontWeight: "bold",
          };
        } else {
          return {
            color: "red",
            fontWeight: "bold",
          };
        }
      }
      if (columnIndex == 12) {
        if (row.confirmStatus === "通过") {
          return {
            color: "green",
            fontWeight: "bold",
          };
        } else {
          return {
            color: "red",
            fontWeight: "bold",
          };
        }
      }
    },
    seTimer() {
      // this.timer.tbSrcoll = setInterval(this.tbSrc, 1500);
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
  created() {
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
  mounted() {
    this.setWebSoket();
    // this.setData();
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
    clearInterval(this.timer.tbSrcoll);
    this.websocket.close();
  },
  destroyed() {
    this.websocket.close();
  },
};
</script>
<style lang='stylus'>
#points {
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  color: #fff;
  background-color: rgb(2, 26, 60);

  .formTle {
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    text-align: left;
    text-indent: 0.5em;
  }

  .main {
    border: 1px solid #DCDFE6;
    border-top: none;
    width: 99%;
    margin: 0 auto;
    padding: 10px 0;
  }

  .btnList {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    height: 250px;
    justify-content: space-around;

    .el-button {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
  }

  .el-input__prefix {
    display: none;
  }

  .avue-empty__desc {
    color: #fff;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 17px;
  }

  .el-input__inner {
    border: none;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    font-size: 18px;
    color: #fff;
    cursor: auto;
    background-color: rgb(2, 26, 60);
  }

  .avue-group .el-collapse, .avue-group .el-collapse-item__wrap {
    background-color: rgb(2, 26, 60);
  }

  .el-collapse-item__wrap, .el-collapse {
    border: none;
  }

  .el-form-item__label {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  .el-card.is-always-shadow, .el-tabs--border-card {
    border: none;
  }

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

  .el-table__body-wrapper::-webkit-scrollbar {
    display: none;
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
</style>