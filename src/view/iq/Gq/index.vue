<template>
  <div id="iqGq" v-drap="{ x: 'content', y: 'content' }">
    <div class="navigation">
      <div class="one">一层</div>
      <div class="two">二层</div>
      <!-- <div class="three">设备</div> -->
      <div class="controll">
        <span>坐标轴：</span>
        <el-tooltip :content="'坐标轴: ' + controll.border" placement="top">
          <el-switch v-model="controll.border"> </el-switch>
        </el-tooltip>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        :style="{
          width: area.x * 70 + 30 + 'px',
          height: area.y * 70 + 30 + 'px',
        }"
        v-loading="loading"
      >
        <div class="wareHouse" v-for="item of data" :key="item.axisY">
          <div
            class="cabinet"
            v-for="(list, index) of item.list"
            :key="index"
            :class="{
              cabinet_check: list.highLight,
            }"
            :style="{
              marginLeft:
                (list.axisX > 1 ? (list.axisX - 1) * 70 + 10 : 10) + 'px',
              marginTop: (list.axisZ > 1 ? 10 : 35) + 'px',
              backgroundColor:
                list.state === '1'
                  ? list.check
                    ? 'red'
                    : list.axisZ > 1
                    ? '#409EFF'
                    : '#67C23A'
                  : list.state === '2'
                  ? '#ccc'
                  : '',
              display: list.state === '1' || list.state === '2' ? '' : 'none',
              color: '#fff',
            }"
          >
            <el-popover
              placement="top-start"
              :title="dlgTle"
              width="600"
              trigger="click"
              v-if="list.exist"
            >
              <avue-crud
                v-loading="loadingDlg"
                :data="crudData"
                :option="crudOp"
              ></avue-crud>
              <div slot="reference" @click="getDetail(list)">
                {{ list.exist ? "✔" : "" }}
              </div>
            </el-popover>
          </div>
        </div>
        <div class="area">
          <div
            class="xBox"
            v-show="controll.border"
            :style="{
              width: leftWidth,
            }"
          >
            <div
              class="xShaft"
              :style="{
                width: area.x * 70 + 55 + 'px',
              }"
            >
              <div v-for="(items, indexs) of area.x" :key="indexs">
                {{ items }}
              </div>
            </div>
          </div>
          <div class="yBox" v-show="controll.border">
            <div
              class="yShaft"
              :style="{
                height: area.y * 70 + 60 + 'px',
              }"
            >
              <div v-for="(items, indexs) of area.y" :key="indexs">
                {{ items }}
              </div>
            </div>
          </div>
          <div
            class="partition"
            v-for="partition of area.list"
            :key="partition.name"
            :style="{
              width: (partition.endX - partition.startX + 1) * 70 + 'px',
              height: (partition.endY - partition.startY + 1) * 70 + 'px',
              lineHeight:
                partition.endY - partition.startY + 1 === 1
                  ? '50px'
                  : (partition.endY - partition.startY + 1) * 70 + 'px',
              top:
                partition.startY > 1
                  ? (partition.startY - 1) * 70 + 16 + 'px'
                  : '16px',
              left:
                partition.startX > 1
                  ? (partition.startX - 1) * 70 + 15 + 'px'
                  : '15px',
              backgroundColor: partition.check ? 'red' : '',
            }"
          >
            <div
              :style="{
                minWidth:
                  partition.areaName === null
                    ? '0px'
                    : partition.areaName.length > 3
                    ? '75px'
                    : '',
              }"
            >
              {{ partition.areaName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dlgTle"
      :visible.sync="dialogVisible"
      width="60%"
      append-to-body
    >
      <div class="formBox" style="margin-top: 10px">
        <avue-crud
          v-loading="loadingDlg"
          :data="crudData"
          :option="crudOp"
        ></avue-crud>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getWarehouseArea,
  getBoxLocation,
  updateBoxLocation,
  getBoxDetail,
} from "@/api/iq/Gq/index";
export default {
  name: "",
  props: {
    checkData: Array,
    leftWidth: String,
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadingDlg: false,
      existData: [],
      dlgTle: "",
      controll: {
        border: false,
        full: false,
      },
      crudData: [],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        showSummary: true,
        sumColumnList: [
          {
            label: "共",
            name: "weight",
            type: "sum",
          },
        ],
        column: [
          {
            label: "批号",
            prop: "batchNo",
          },
          {
            label: this.$t("whseField.ph2"),
            prop: "countingNo",
            align: "right",
          },
          {
            label: "车笼id",
            prop: "boxCarId",
            hide: true,
          },
          // {
          //   label: "客人布票号",
          //   prop: "custTicket",
          // },
          // {
          //   label: "通过",
          //   prop: "isAdopt",

          //   type: "select",
          //   dicData: [
          //     {
          //       value: true,
          //       label: "通过",
          //     },
          //     {
          //       value: false,
          //       label: "不通过",
          //     },
          //   ],
          // },
          {
            label: this.$t("whseField.zl"),
            prop: "weight",
            align: "right",
          },
          {
            label: this.$t("whseField.dw"), //"单位",
            prop: "weightUnit",
            type: "select",
            dicData: getDIC("bas_matUnit"),
          },
        ],
      },
      area: {
        x: 50,
        y: 5,
        list: [],
      },
      data: [],
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      getWarehouseArea().then((res) => {
        res.data.forEach((item, index) => {
          if (item.isExtreme) {
            this.area.x = item.maxX;
            this.area.y = item.maxY;
          } else {
            this.area.list.push(item);
          }
        });
      });
      getBoxLocation().then((res) => {
        if (this.checkData != undefined) {
          res.data.forEach((item, index) => {});
        }
        this.data = this.arrGroup(res.data).sort((x, y) => {
          return x.axisY - y.axisY;
        });
        this.data.forEach((item) => {
          item.list.sort((x, y) => {
            if (x.axisX === y.axisX) {
              return x.axisZ - y.axisZ;
            }
            return x.axisX - y.axisX;
          });
        });
      });
      if (this.checkData != undefined) {
        setTimeout(() => {
          this.$nextTick(() => {
            let data = [];
            this.checkData.forEach((item, index) => {
              data.push(item.boxCarId);
            });
            data = new Set(data);

            data.forEach((item) => {
              let x = item.split("-")[0];
              let y = item.split("-")[1];
              for (let i = 0; i < this.data[y - 1].list.length; i++) {
                if (item === this.data[y - 1].list[i].boxCarId) {
                  this.data[y - 1].list[i].check = true;
                  // this.data[y - 1].list[i].highLight = false;
                  this.existData.push(this.data[y - 1].list[i].check);
                }
              }
            });
          });
          this.loading = false;
        }, 1500);
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    getDetail(val) {
      if (!val.exist) {
        return;
      }
      // this.dlgTle = val.boxCode;
      // this.dialogVisible = true;
      this.loadingDlg = true;
      getBoxDetail({
        boxId: val.boxId,
      }).then((res) => {
        this.crudData = res.data;
        this.loadingDlg = false;
      });
    },
    domSet() {
      // 监听scroll事件
      let dom = document.getElementsByClassName("content")[0];
      dom.addEventListener("scroll", this.isScroll, true);
    },
    isScroll() {
      let dom = document.getElementsByClassName("content")[0];
      let x = document.getElementsByClassName("xBox")[0];
      let y = document.getElementsByClassName("yBox")[0];
      x.scrollLeft = dom.scrollLeft;
      y.scrollTop = dom.scrollTop;
    },
    arrGroup(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.axisY]) {
          dest.push({
            axisY: ai.axisY,
            list: [ai],
          });
          map[ai.axisY] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.axisY == ai.axisY) {
              dj.list.push(ai);
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
    this.getData();
    this.domSet();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-dialog__header {
  text-align: center !important;
}

@keyframes twinkling {
  /* 透明度由0到1 */
  0% {
    opacity: 0; /* 透明度为0 */
    // border: 1px solid red;
  }

  25% {
    opacity: 0.25; /* 透明度为1 */
    // border: 1px solid #fff;
  }

  50% {
    opacity: 0.5; /* 透明度为1 */
    // border: 1px solid #fff;
  }

  75% {
    opacity: 0.75; /* 透明度为1 */
    // border: 1px solid #fff;
  }

  100% {
    opacity: 1; /* 透明度为1 */
    // border: 1px solid #fff;
  }
}

#iqGq {
  height: calc(100vh - 80px);
  width: 100%;
  // overflow: hidden;
  background: #021a3c;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  border: 1px solid #fff;
  // border-left: none;
  cursor: pointer;

  .navigation {
    // width: 100%;
    height: 20px;
    margin: 0 0 10px 10px;
    color: #fff;
    line-height: 20px;
    width: 100%;
    text-align: center;

    div {
      margin: 10px 0 10px 0;
    }

    .one {
      width: 50px;
      height: 20px;
      background-color: #67C23A;
      float: left;
    }

    .two {
      width: 50px;
      height: 20px;
      margin-left: 20px;
      background-color: #409EFF;
      float: left;
    }

    .three {
      width: 50px;
      height: 20px;
      margin-left: 20px;
      background-color: #ccc;
      color: black;
      float: left;
    }

    .controll {
      margin-top: 0;
      float: left;
      height: 20px;
      line-height: 20px;
      margin-left: 10%;

      >span {
        margin-left: 20px;
      }
    }
  }

  .content {
    height: 98%;
    width: 100%;
    overflow: scroll;
    background: #021a3c;
    border-top: 1px solid #fff;
  }

  .box {
    border: 1px solid #ccc;
    // width: 100%;
    border-bottom: none;
    border-right: none;
    position: relative;
    padding: 30px;
    background: #021a3c;
  }

  .area {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;

    .xBox {
      width: calc(100vw - 260px);
      height: 20px;
      overflow: hidden;
      position: fixed;
      border-top: 1px solid #fff;
      margin-top: -2px;
      background: #021a3c;
      z-index: 999;
    }

    .yBox {
      height: calc(100vh - 115px);
      width: 25px;
      overflow: hidden;
      position: fixed;
      background: #021a3c;
      z-index: 999;
      margin-left: -1px;
      margin-top: -1px;
    }

    .xShaft {
      width: 100%;
      height: 1px;
      margin-left: 35px;

      div {
        width: 68px;
        height: 20px;
        line-height: 22px;
        float: left;
        border-left: 2px solid #fff;
      }
    }

    .yShaft {
      width: 25px;
      height: 100%;
      padding-top: 35px;

      div {
        height: 68px;
        border-bottom: 2px solid #fff;
        line-height: 69px;
      }

      div:first-child {
        border-top: 2px solid #fff;
        margin-top: 5px;
      }
    }
  }

  .wareHouse {
    width: 100%;
    height: 50px;
    padding: 10px;
    float: left;
    position: relative;
    z-index: 88;
  }

  .cabinet {
    position: absolute;
    width: 40px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #fff;
    background: #000;
    color: #fff;
  }

  .cabinet_check {
    -webkit-animation: twinkling 1s infinite;
  }

  .cabinet:hover {
    opacity: 0.6;
  }

  .partition {
    height: 100%;
    position: absolute;
    border: 1px solid #fff;
    margin: 23px 20px;
    top: 0;
    left: 0;
    z-index: 2;
    font-size: 18px;

    div {
      text-align: center;
    }
  }
}
</style>