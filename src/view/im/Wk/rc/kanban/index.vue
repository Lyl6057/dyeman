<template>
  <div
    id="points"
    v-loading.fullscreen.lock="!refresh"
    :element-loading-text="$t('public.loading')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card>
      <el-tabs type="border-card" v-model="tabs">
        <el-tab-pane label="胚布点数看板" name="胚布">
          <el-row>
            <pointsTem
              ref="pbTem"
              type="胚布"
              :nowTimeLabel="nowTimeLabel"
              :option="pbOption"
              :data="pbData"
              :form="pbForm"
              :formOp="pbFormOp"
              :chengzhong="chengzhong"
              :cellStyle="cellStyle"
              :check="check"
              :submit="submit"
              :over="over"
              :endRc="endRc"
              :next="next"
              v-if="refresh"
            >
            </pointsTem>
            <!-- <el-col :span="6">
              <el-tabs type="border-card" class="inWhse">
                <el-tab-pane label="入仓看板"
                  ><avue-crud
                    ref="inWhseCrud"
                    :data="inWhse"
                    :option="inWhseOp"
                  >
                  </avue-crud>
                </el-tab-pane>
              </el-tabs>
            </el-col> -->
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="纱线点数看板" name="纱线">
          <pointsTem
            ref="sxTem"
            type="胚布"
            :nowTimeLabel="nowTimeLabel"
            :option="sxOption"
            :data="sxData"
            :form="sxForm"
            :formOp="sxFormOp"
            :chengzhong="chengzhong"
            :cellStyle="cellStyle"
            :check="check"
            :submit="submit"
            :over="over"
            :endRc="endRc"
            :next="next"
          >
          </pointsTem>
        </el-tab-pane>
        <el-tab-pane label="成品布点数看板" name="成品布">
          <pointsTem
            ref="cpbTem"
            type="成品布"
            :nowTimeLabel="nowTimeLabel"
            :option="cpbCrudOp"
            :data="cpbData"
            :form="cpbForm"
            :formOp="cpbFormOp"
            :chengzhong="chengzhong"
            :cellStyle="cellStyle"
            :check="check"
            :submit="submit"
            :over="over"
            :endRc="endRc"
            :next="next"
          >
          </pointsTem>
        </el-tab-pane>
        <el-tab-pane label="染化料点数看板" name="染化料">
          <pointsTem
            ref="rhlTem"
            type="染化料"
            :nowTimeLabel="nowTimeLabel"
            :option="rhlCrudOp"
            :data="rhlData"
            :form="rhlForm"
            :formOp="rhlFormOp"
            :chengzhong="chengzhong"
            :cellStyle="cellStyle"
            :check="check"
            :submit="submit"
            :over="over"
            :endRc="endRc"
            :next="next"
          >
          </pointsTem>
        </el-tab-pane>
        <el-tab-pane label="生产辅料/五金点数看板" name="生产辅料/五金">
          <pointsTem
            ref="scflTem"
            type="生产辅料/五金"
            :nowTimeLabel="nowTimeLabel"
            :option="scflCrudOp"
            :data="scflData"
            :form="scflForm"
            :formOp="scflFormOp"
            :chengzhong="chengzhong"
            :cellStyle="cellStyle"
            :check="check"
            :submit="submit"
            :over="over"
            :endRc="endRc"
            :next="next"
          >
          </pointsTem>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="12" v-if="refresh">
          <p
            style="
              font-size: 20px;
              font-weight: 700;
              text-indent: 0.5em;
              color: #fff;
            "
          >
            布笼信息
          </p>
          <avue-form v-model="forms" :option="formOp"></avue-form
        ></el-col>
      </el-row>
    </el-card>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>
<script>
import { updataPb, sendData, updataCloth } from "@/api/mto/Ek/index.js";
import { updateBoxLocation } from "@/api/iq/Gq/index.js";
import {
  pbCrud,
  pbForm,
  sxCrud,
  sxForm,
  rhlForm,
  rhlCrud,
  cpbForm,
  cpbCrud,
  scflForm,
  scflCrud,
  inWhseCrud,
} from "./data";
import { webSocket } from "@/config/index.js";
import pointsTem from "./template";
export default {
  name: "Ek",
  components: {
    pointsTem: pointsTem,
  },
  data() {
    return {
      tabs: "胚布",
      refresh: true,
      nowTime: "",
      nowTimeLabel: "",
      websocket: "",
      czsocket: {},
      czData: 0,
      endRc: true,
      timer: {
        bpSrcoll: "",
        tbSrcoll: "",
        tbSrcCtr: 1,
      },
      pbForm: {},
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
      sxForm: {},
      pbFormOp: pbForm,
      sxFormOp: sxForm,
      pbData: [],
      sxData: [],
      sxOption: sxCrud,
      pbOption: pbCrud,
      rhlData: [],
      rhlCrudOp: rhlCrud,
      rhlForm: {},
      rhlFormOp: rhlForm,
      cpbCrudOp: cpbCrud,
      cpbData: [],
      cpbForm: {},
      cpbFormOp: cpbForm,
      scflCrudOp: scflCrud,
      scflData: [],
      scflFormOp: scflForm,
      scflForm: {},
      inWhseOp: inWhseCrud,
      inWhse: [],
      drawer: false,
    };
  },
  watch: {},
  methods: {
    setWebSoket() {
      webSocket.setWebSoket(this);
      let _this = this;
      //接收到消息的回调方法
      _this.websocket.onmessage = function (event) {
        if (event.data === "ok") {
          _this.endRc = false;
          _this.$tip.success("点数完成,开始入库!");
          return;
        }

        let data = JSON.parse(event.data);
        if (data === null) {
          _this.$tip.warning("暂无该胚布信息!");
          return;
        }
        // 布笼
        if (data.clothNumber) {
          _this.forms = data.whsClothDetaInformation;
          _this.forms.weight === "" ? (_this.forms.weight = 0) : "";
          _this.forms.sum === "" ? (_this.forms.sum = 0) : "";
          _this.forms.warehouseSn = data.clothNumber;
          _this.forms.boxCarId = data.boxCarId;
          _this.pbData = [];
          _this.endRc = true;
          for (var key in _this.$refs.pbTem.forms) {
            _this.$refs.pbTem.forms[key] = "";
          }
        }
        // 操作
        if (data.type === "getOperation") {
          _this.$nextTick(() => {
            _this.tabs = data.value;
          });
          return;
        }
        // 添加胚布记录
        if (data.whseCalicoinDtlboid || data.length > 0) {
          _this.setData(data);
        }
      };
      this.setCz();
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        _this.czData = e.data;
      };
    },
    //称重
    chengzhong() {
      this.czsocket.send("cz");
      if (this.tabs === "胚布") {
        // return;
        let data = this.$refs.pbTem.forms;
        if (data.whseCalicoinDtlboid) {
          data.actualWeight = this.czData;
          this.$set(
            this.pbData[data.index - 1],
            "actualWeight",
            data.actualWeight
          );
        }
      } else {
        let data = this.$refs.sxTem.forms;
        if (data.yarnSn != "") {
          data.actualWeight = (
            data.weight +
            Math.random() * (0.5 + 0.5) -
            0.5
          ).toFixed(2);
          this.sxData[data.index - 1].actualWeight = data.actualWeight;
          if (data.actualWeight > data.weight) {
            this.sxData[data.index - 1].inspectionStatus = true;
            data.inspectionStatus = true;
          } else {
            this.sxData[data.index - 1].inspectionStatus = false;
            data.inspectionStatus = false;
          }
        }
      }
    },
    setData(data) {
      if (
        (data.length > 0 ? data[0].whseCalicoinDtlaFk : true) ||
        data.whseCalicoinDtlaFk
      ) {
        // 胚布
        if (data.length > 0) {
          // 追加数据、去重
          this.pbData = this.$unique(
            this.pbData.concat(data),
            "whseCalicoinDtlboid"
          );
          this.$refs.pbTem.$refs.crud.setCurrentRow(data[0]);
        } else {
          for (let i = 0; i < this.pbData.length; i++) {
            if (
              data.whseCalicoinDtlboid === this.pbData[i].whseCalicoinDtlboid
            ) {
              this.pbData[i].isAdopt = data.isAdopt;
              this.$refs.pbTem.$refs.crud.setCurrentRow(this.pbData[i]);
              break;
            }
          }
        }

        this.pbData.forEach((i, index) => {
          i.index = index + 1;
          i.warehouseSn = this.forms.warehouseSn;
          i.boxCarId = this.forms.boxCarId;
        });

        this.$nextTick(() => {
          document.getElementsByClassName(
            "el-table__body-wrapper"
          )[0].scrollTop += 100;
          this.$tip.success("操作成功!");
          console.log("pb", this.pbData);
        });
      }
      if (data.countingNo) {
        // 通过/不通过
        for (let index = 0; index < this.pbData.length; index++) {
          if (
            data.countingNo === this.pbData[index].countingNo &&
            data.batchNo === this.pbData[index].batchNo
          ) {
            this.pbData[index].isAdopt = data.isAdopt;
            this.$refs.pbTem.$refs.crud.setCurrentRow(this.pbData[index]);
            this.$tip.success("操作成功!");
            return;
          }
        }
        data.index = this.pbData.length + 1;
        data.boxCarId = this.forms.boxCarId;
        data.warehouseSn = this.forms.warehouseSn;
        this.pbData.push(data);
        this.$refs.pbTem.$refs.crud.setCurrentRow(data);
        this.$nextTick(() => {
          document.getElementsByClassName(
            "el-table__body-wrapper"
          )[0].scrollTop += 100;
        });
      } else {
        data.index = this.sxData.length + 1;
        for (let index = 0; index < this.sxData.length; index++) {
          if (
            data.yarnSn === this.sxData[index].yarnSn &&
            data.type === "getYarn"
          ) {
            this.$tip.error("单号重复!");
            return;
          }
          if (
            data.yarnSn === this.sxData[index].yarnSn &&
            data.type === "yarnConfirm"
          ) {
            this.sxData[index].confirmStatus = data.confirmStatus;
            this.$tip.success("操作成功!");
            return;
          }
        }
        // this.tabs = '纱线'
        this.sxData.push(data);
        this.$refs.sxTem.$refs.crud.setCurrentRow(data);
        this.$nextTick(() => {
          document.getElementsByClassName(
            "el-table__body-wrapper"
          )[1].scrollTop += 100;
        });
      }
    },
    check(row) {
      if (this.tabs === "胚布") {
        this.pbForm = this.pbData[row.index - 1];
      } else {
        this.sxForm = this.sxData[row.index - 1];
      }
    },
    over() {
      let sum = this.forms.sum;
      let weight = this.forms.weight;
      let data = {};
      this.pbData.forEach((item) => {
        // item.boxCarId = this.forms.boxCarId;
        sum++;
        weight =
          Number(weight) + Number(item.weight === undefined ? 0 : item.weight);
      });
      data = Object.assign(this.forms, {
        weight: weight,
        sum: sum,
        boxId: "f016db95-0706-4f4e-bbfd-384bbdeeab0f",
      });
      this.endRc = false;
      sendData(this.pbData).then((res) => {
        // if (res.status === 200) {

        //   this.$tip.success("操作成功!");
        // }
        updataCloth(data).then((res) => {});
        updateBoxLocation({
          boxId: "f016db95-0706-4f4e-bbfd-384bbdeeab0f",
          exist: 1,
        }).then((res) => {});
      });
    },
    next() {
      this.refresh = false;
      this.endRc = true;
      this.pbData = [];
      this.sxData = [];
      for (var key in this.pbForm) {
        delete this.pbForm[key];
      }
      for (var key in this.forms) {
        delete this.forms[key];
      }
      setTimeout(() => {
        this.refresh = true;
      }, 500);
    },
    submit(val) {
      if (Object.keys(this.$refs.pbTem.forms).length > 0) {
        this.$refs.pbTem.forms.isAdopt = val;
        updataPb(this.$refs.pbTem.forms).then((res) => {
          if (res.status === 200) {
            // this.pbData[this.$refs.pbTem.forms.index - 1].isAdopt = val;
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
      if (columnIndex == 8 && this.tabs === "胚布") {
        if (row.isAdopt) {
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
      if (columnIndex == 6 && this.tabs === "胚布") {
        if (row.weight < row.actualWeight) {
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
      if (columnIndex == 10 && this.tabs === "胚布") {
        if (row.isAdopt === "通过") {
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
      if (columnIndex == 12 && this.tabs === "纱线") {
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
      if (columnIndex == 13 && this.tabs === "纱线") {
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
    handleClose(done) {
      done();
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
      this.nowTimeLabel =
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
        this.submit(true);
      } else if (e.key === "0") {
        this.submit(false);
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
    this.czsocket.onclose();
  },
  destroyed() {},
};
</script>
<style lang='stylus'>
#points {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgb(2, 26, 60);

  .inWhse {
    .avue-crud__menu {
      display: none;
    }

    .el-tabs__item {
      height: 32px !important;
      line-height: 32px;
      font-size: 18px;
    }
  }

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
    border: none;
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
    height: 200px;
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

  .el-row, .avue-group .el-collapse, .avue-group .el-collapse-item__wrap {
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
    border: 1px solid #fff;
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