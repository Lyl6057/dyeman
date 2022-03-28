<template>
  <div id="preview">
    <view-container style="height: 100%" :title="type + '盘点预览'">
      <el-row>
        <el-col :span="10">
          <div class="btnList">
            <el-dropdown
              type="primary"
              @click="random"
              :disabled="loading"
              v-show="btn"
              split-button
              >随机选择 {{ length }}
              <!-- <el-button
               
                ></el-button
              > -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="random(1 / 5)"
                  >1/5</el-dropdown-item
                >
                <el-dropdown-item @click.native="random(1 / 4)"
                  >1/4</el-dropdown-item
                >
                <el-dropdown-item @click.native="random(1 / 3)"
                  >1/3</el-dropdown-item
                >
                <el-dropdown-item @click.native="random(1 / 2)"
                  >1/2</el-dropdown-item
                >
                <el-dropdown-item @click.native="random(1 / 1)"
                  >1/1</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="pandian"
              :disabled="loading"
              v-show="btn"
              >开始盘点</el-button
            >
            <!-- <el-button
              type="primary"
              @click="pandianed"
              v-if="finishList.length > 0"
              >已盘点</el-button
            > -->
            <el-button
              type="primary"
              @click="nextPd"
              v-if="
                finishList.length > 0 && queue[this.pdIndex + 1] != undefined
              "
              >继续盘点</el-button
            >
            <el-button
              type="primary"
              @click="over"
              v-if="
                finishList.length > 0 && queue[this.pdIndex + 1] === undefined
              "
              >生成盈亏记录</el-button
            >
            <el-button type="danger" @click="preClose" :disabled="loading">{{
              this.$t("public.close")
            }}</el-button>
          </div>
          <div class="crudBox">
            <avue-crud
              v-loading="loading"
              ref="pandian"
              :data="data"
              :option="crudOp"
              @current-row-change="cellClick"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
          </div>
          <div class="logBox" v-if="log != ''">
            <el-tabs type="border-card" v-model="logOrPd">
              <el-tab-pane name="logs" label="日志">
                <el-input
                  v-html="log"
                  type="textarea"
                  :rows="13"
                  v-model="log"
                  readonly
                >
                </el-input>
              </el-tab-pane>
              <el-tab-pane name="pd" label="已盘点">
                <avue-crud
                  ref="pandianed"
                  v-loading="loading"
                  :data="finishList"
                  :option="ydpOp"
                >
                </avue-crud>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="queueBox">
            <div
              :style="{
                width: queue.length * 102 + 'px',
              }"
              class="queueContent"
            >
              <div
                class="queueList"
                v-for="(list, index) of queue"
                :key="list.boxId"
                @click="queueClick(list.boxCarId)"
                :style="{
                  backgroundColor:
                    list.state === 1 ? 'red' : list.state === 2 ? 'green' : '',
                }"
              >
                {{ list.boxCarId }}
                <span
                  v-if="list.state != 2"
                  class="delqueue"
                  @click.stop="delQueue(index)"
                  >X</span
                >
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <boxLoc
            ref="boxLoc"
            :leftWidth="'calc(100vw - 835px)'"
            :checkData="crudData"
          ></boxLoc>
        </el-col>
      </el-row>
      <el-dialog
        width="50%"
        title="盘点明细"
        :visible.sync="innerVisible"
        append-to-body
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeBefore"
        class="pdDlg"
      >
        <div class="btnList">
          <el-button type="primary" @click="finish" :disabled="loading"
            >完成</el-button
          >
        </div>
        <avue-crud
          v-loading="loading"
          ref="chengzhong"
          :data="chengzhong"
          :option="crudOp"
          @current-row-change="cellClick"
        >
          <template slot-scope="scope" slot="menu">
            <el-button type="primary" @click="getWeight">称重</el-button>
          </template>
        </avue-crud>
      </el-dialog>
      <!-- <el-dialog
        width="100%"
        title="已盘点明细"
        :visible.sync="pdDlg"
        append-to-body
        :modal="false"
        :close-on-click-modal="false"
        class="ypdDlg"
        @close="pdClose"
      >
       
      </el-dialog> -->
    </view-container>
  </div>
</template>
<script>
import { getDIC, getDicT } from "@/config/index";
import boxLoc from "../../iq/Gq/index";
import { sendData } from "@/api/im/St/index";
import { webSocket } from "@/config/index.js";
export default {
  name: "",
  props: {
    type: String,
    crudData: Array,
    locInfo: Array,
  },
  components: {
    boxLoc,
  },
  data() {
    return {
      loading: false,
      pdDlg: false,
      logOrPd: "logs",
      innerVisible: false,
      data: [],
      chengzhong: [],
      finishList: [],
      length: 1,
      btn: true,
      log: "",
      queue: [],
      oldData: {},
      czsocket: "",
      pdIndex: 0,
      crudOp: {
        menu: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        cancelBtn: false,
        menuWidth: 90,
        border: true,
        // selection: true,
        reserveSelection: true,
        highlightCurrentRow: true,
        height: 400,
        rowKey: "whseCalicoinDtlboid",
        column: [
          {
            label: "#",
            prop: "index",
            // cell: true,
            width: 50,
            align: "right",
          },
          {
            label: "来胚入库批号资料OID",
            prop: "whseCalicoinDtlboid",
            hide: true,
          },
          {
            label: "来胚入库明细_FK",
            prop: "whseCalicoinDtlaFk",
            hide: true,
          },
          {
            label: "批号",
            prop: "batchNo",
            cell: false,
            width: 180,
          },
          {
            label: this.$t("whseField.ph2"),
            prop: "countingNo",
            cell: false,
            width: 150,
            align: "right",
          },

          {
            label: "客人布票号",
            prop: "custTicket",
            cell: false,
            width: 150,
            hide: true,
          },

          {
            label: _this.$t("whseField.zl"),
            prop: "weight",
            cell: false,
            width: 100,
            align: "right",
          },
          {
            label: "盘点重量",
            prop: "caliWeight",
            cell: true,
            width: 130,
            align: "right",
            hide: true,
          },
          {
            label: "重量单位",
            prop: "weightUnit",
            cell: false,
            hide: false,
            width: 110,
            type: "select",
            dicData: getDIC("bas_matUnit"),
          },
          {
            label: "通过",
            prop: "pass",
            cell: true,
            type: "select",
            hide: true,
            dicData: [
              {
                value: false,
                label: "否",
              },
              {
                value: true,
                label: "是",
              },
            ],
            width: 120,
          },
          {
            label: "储存位置",
            prop: "boxCarId",
            cell: false,
            width: 120,
            // props: {
            //   value: "boxCarId",
            //   label: "boxId",
            // },
            // type: "select",
            // dicData: [],
          },
          // {
          //   label: "称重",
          //   prop: "cz",
          //   slot: true,
          //   hide: false,
          //   width: 110,
          // },
        ],
      },
      ydpOp: {
        menu: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        cancelBtn: false,
        menuWidth: 90,
        border: true,
        // selection: true,
        reserveSelection: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 650px)",
        rowKey: "whseCalicoinDtlboid",
        column: [
          {
            label: "#",
            prop: "index",
            // cell: true,
            width: 50,
            align: "right",
          },
          {
            label: "来胚入库批号资料OID",
            prop: "whseCalicoinDtlboid",
            hide: true,
          },
          {
            label: "来胚入库明细_FK",
            prop: "whseCalicoinDtlaFk",
            hide: true,
          },
          {
            label: "批号",
            prop: "batchNo",
            cell: false,
            width: 150,
          },
          {
            label: this.$t("whseField.ph2"),
            prop: "countingNo",
            cell: false,
            width: 100,
            align: "right",
          },

          {
            label: "客人布票号",
            prop: "custTicket",
            cell: false,
            width: 150,
            hide: true,
          },

          {
            label: _this.$t("whseField.zl"),
            prop: "weight",
            cell: false,
            width: 100,
            align: "right",
          },
          {
            label: "盘点重量",
            prop: "caliWeight",
            cell: true,
            width: 130,
            align: "right",
          },
          {
            label: "重量单位",
            prop: "weightUnit",
            cell: true,
            hide: false,
            type: "select",
            dicData: getDIC("bas_matUnit"),
            width: 110,
          },
          {
            label: "通过",
            prop: "pass",
            cell: true,
            type: "select",
            hide: false,
            dicData: [
              {
                value: false,
                label: "否",
              },
              {
                value: true,
                label: "是",
              },
            ],
            width: 100,
          },
          {
            label: "储存位置",
            prop: "boxCarId",
            width: 120,
            // cell: false,
            // width: 120,
            // props: {
            //   value: "boxCarId",
            //   label: "boxId",
            // },
            // type: "select",
            // dicData: [],
          },
          // {
          //   label: "称重",
          //   prop: "cz",
          //   slot: true,
          //   hide: false,
          //   width: 110,
          // },
        ],
      },
      oldArea: {},
      oldCheck: {},
    };
  },
  watch: {},
  methods: {
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      //接收到消息的回调方法
      _this.czsocket.onmessage = function (event) {
        _this.$nextTick(() => {
          setTimeout(() => {
            _this.oldData.caliWeight = event.data;
            _this.oldData.$cellEdit = false;
            // _this.$refs.chengzhong.setCurrentRow(_this.oldData);
            _this.oldData.$cellEdit = true;
            _this.loading = false;
          }, 200);
        });
      };
    },
    setData() {
      this.data = this.arrGroup(this.crudData);
    },
    random(length) {
      if (typeof length === "number") {
        this.length = Math.ceil(length * this.data.length);
        length = this.length;
      } else {
        length = this.length;
      }
      this.queue = [];
      //原始数组
      var original = new Array();
      //给原始数组original赋值
      for (var i = 0; i < this.data.length; i++) {
        original[i] = i;
      }
      //排序
      original.sort(function () {
        return 0.5 - Math.random();
      });
      //输出
      for (var i = 0; i < length; i++) {
        this.data[original[i]].check = false;
        this.queue.push(this.data[original[i]]);
      }
    },
    pandian() {
      // 开始盘点
      if (this.queue.length === 0) {
        this.$tip.warning("请选择盘点货物!");
        return;
      }
      this.$tip
        .cofirm("是否开始盘点流程?", this)
        .then(() => {
          this.log +=
            "开始盘点,等待 【" + this.queue[0].boxCarId + "】 出库 ···<br/>";
          this.btn = false;
          this.queue[0].state = 1;
          this.queueClick("52-5-1");
          this.moniCc(this.queue[0]);
          this.pdIndex = 0;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleRowDBLClick(val) {
      if (this.queue.length === 0) {
        this.queue.push(val);
        return;
      }
      for (let i = 0; i < this.queue.length; i++) {
        if (val.boxCarId === this.queue[i].boxCarId) {
          return;
        }
        if (
          i === this.queue.length - 1 &&
          val.boxCarId != this.queue[i].boxCarId
        ) {
          this.queue.push(val);
          return;
        }
      }
    },
    moniCc(val) {
      // 模拟出库
      setTimeout(() => {
        for (let i = 0; i < this.$refs.boxLoc.area.list.length; i++) {
          if (
            this.$refs.boxLoc.area.list[i].areaName ===
            "验布" + (this.pdIndex + 1)
          ) {
            this.oldArea = this.$refs.boxLoc.area.list[i];
            this.$set(this.$refs.boxLoc.area.list[i], "check", true);
            break;
          }
        }
        this.log +=
          "【" + val.boxCarId + "】 出库至【验布1】成功，等待盘点 ···<br/>";
        this.chengzhong = val.children;
        this.crudOp.column[0].hide = true;
        this.crudOp.column[7].hide = false;
        // this.crudOp.column[8].hide = false;
        this.crudOp.column[9].hide = false;
        this.crudOp.menu = true;
        this.innerVisible = true;
      }, 2000);
    },
    getWeight() {
      //称重
      this.loading = true;
      this.czsocket.send("msg");
    },
    finish() {
      // 完成
      for (let i = 0; i < this.chengzhong.length; i++) {
        if (
          this.chengzhong[i].pass === "" ||
          this.chengzhong[i].pass === undefined
        ) {
          this.$tip.warning("请选择是否通过！");
          return;
        }
      }
      for (let i = 0; i < this.queue.length; i++) {
        if (this.queue[this.pdIndex].state === 1) {
          this.queue[this.pdIndex].state = 2;
          break;
        }
      }

      this.finishList = this.finishList.concat(this.chengzhong);
      this.finishList.forEach((item, index) => {
        item.index = index + 1;
      });
      this.oldData.$cellEdit = false;
      this.innerVisible = false;
      this.oldArea.check = false;
      this.log +=
        "【" +
        this.queue[this.pdIndex].boxCarId +
        "】 盘点成功，请重新入库 ···<br/>";
    },
    nextPd() {
      if (this.queue[this.pdIndex + 1] === undefined) {
        this.$tip.error("无!");
        return;
      }
      this.log +=
        "开始盘点,等待 【" +
        this.queue[++this.pdIndex].boxCarId +
        "】 出库 ···<br/>";
      this.queue[this.pdIndex].state = 1;
      this.queueClick("52-5-1");
      this.moniCc(this.queue[this.pdIndex]);
    },
    pandianed() {
      // 已盘点
      this.finishList.forEach((item, index) => {
        item.index = index + 1;
      });
      // this.loading = true;
      // this.oldData.$cellEdit = false;
      // this.pdDlg = true;
      // this.crudOp.column[0].prop = "index";
      // this.crudOp.column[7].hide = false;
      // this.crudOp.column[9].hide = false;
      // this.loading = false;
    },
    over() {
      sendData(this.finishList).then((res) => {
        if (res.data === "ok") {
          this.$tip.success("操作成功！");
        }
      });
    },
    delQueue(index) {
      this.queue.splice(index, 1);
    },
    preClose() {
      document.getElementsByClassName("el-dialog__headerbtn")[1].click();
    },
    closeBefore() {
      this.crudOp.column[0].hide = false;
      this.crudOp.column[7].hide = true;

      this.crudOp.column[9].hide = true;
      this.crudOp.menu = false;
    },
    pdClose() {
      this.crudOp.column[0].prop = "#";
      this.crudOp.column[7].hide = true;
      this.crudOp.column[9].hide = true;
    },
    queueClick(val) {
      this.$set(this.oldCheck, "highLight", false);
      let x = val.split("-")[0];
      let y = val.split("-")[1];
      let data = this.$refs.boxLoc.data;
      for (let i = 0; i < data[y - 1].list.length; i++) {
        if (val === this.$refs.boxLoc.data[y - 1].list[i].boxCarId) {
          this.$set(this.$refs.boxLoc.data[y - 1].list[i], "highLight", true);
          this.oldCheck = this.$refs.boxLoc.data[y - 1].list[i];
          break;
        }
      }

      let dom = document.getElementsByClassName("content")[0];
      dom.scrollLeft = (val.split("-")[0] - 9) * 70;
      dom.scrollTop = (val.split("-")[1] - 6) * 70;
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      if (!this.innerVisible) {
        this.queueClick(val.boxCarId);
      }
    },
    arrGroup(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.boxCarId]) {
          dest.push({
            boxCarId: ai.boxCarId,
            boxCarId: ai.boxCarId,
            whseCalicoinDtlboid: ai.boxCarId,
            children: [ai],
            countingNo: ai.countingNo,
            batchNo: ai.batchNo,
            // seqQty: dest.length + 1,
            weight: ai.weight,
            $cellEdit: false,
          });
          map[ai.boxCarId] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.boxCarId == ai.boxCarId) {
              dj.children.push(ai);
              dj.weight += ai.weight;
              dj.countingNo += "," + ai.countingNo;
              break;
            }
          }
        }
      }
      return dest;
    },
  },
  created() {},
  mounted() {
    this.crudOp.column[10].dicData = this.locInfo;
    this.ydpOp.column[10].dicData = this.locInfo;
    this.setData();
    this.setCz();
  },
  beforeDestroy() {
    this.czsocket.close();
  },
};
</script>
<style lang='stylus'>
.el-dropdown-menu--mini .el-dropdown-menu__item
  font-size 16px !important
  padding 4px 6px
.ypdDlg
  width 30%
  margin-left 70%
  .el-dialog
    margin-top 0 !important
    float right
.pdDlg
  .el-table th>.cell
    font-size 17px
  th.is-leaf
    line-height 25px
  .el-dialog__header
    padding 10px 20px 0
    text-align center
#preview
  background #021a3c
  -moz-user-select none
  -ms-user-select none
  -webkit-user-select none
  user-select none
  height 100%
  width 100%
  .logBox
    width 99%
    margin 0 auto
    .el-input--mini
      padding-left 5px
      // background-color: #fff;
      // border: 1px solid #fff;
      height calc(100vh - 645px) !important
      font-size 16px !important
      letter-spacing 1px
  .queueBox
    width 100%
    // height: 105px;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    border 1px solid #fff
    overflow auto
    .queueContent
    .queueList
      float left
      width 100px
      height 50px
      line-height 50px
      text-align center
      border 1px solid #fff
      font-size 18px
      position relative
      >span
        position absolute
        top -15px
        right 5px
        font-size 16px
        color red
        font-weight bold
        cursor pointer
  .el-table__row--level-0
    background-color rgb(223, 223, 223)
  .el-table__indent
    height 0
    display none !important
  .el-input__inner
    font-size 16px
  .el-form-item__label
    color #fff
    font-size 16px
    font-weight bold
  .el-tabs--border-card, .el-tabs--border-card>.el-tabs__header, .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active
    background-color rgb(2, 26, 60) !important
    color #fff
  .el-row
    background-color rgb(2, 26, 60)
    height calc(100vh - 95px)
  .el-textarea__inner
    height calc(100vh - 600px) !important
  .el-table__body tr.current-row>td, .el-table__body tr:hover>td
    background-color rgb(245, 108, 108) !important
  // .el-table__fixed-body-wrapper {
  // top: 40px !important;
  // }

  // .is-leaf:first-child {
  // border-bottom: none !important;
  // }
  .el-tag--mini
    display none
  .area, .cabinet
    text-align center
  .cabinet:hover
    opacity 0.6 !important
</style>