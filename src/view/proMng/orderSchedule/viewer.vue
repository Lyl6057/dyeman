<template>
  <div id="proOrder">
    <view-container title="订单查询">
      <div class="main">
        <div class="box">
          <div class="header">
            <div class="dateBox" v-for="(date, i) of dateList" :key="i">
              <div class="dateTle">
                {{ date.ym }}
              </div>
              <div class="dayBox">
                <div
                  v-for="day of date.list"
                  :key="day.d"
                  :style="{ width: dayW + 'px' }"
                  class="day"
                >
                  <div class="dayTle">{{ day.d }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="contentBox"
            :style="{ width: dateLength.length * dayW + 25 + 'px' }"
          >
            <!-- border -->
            <div class="content">
              <!--   v-for="i of 24"
              :key="i" -->
              <div class="dayLine" v-for="(date, i) of dateList" :key="i">
                <div class="lineBox">
                  <div
                    v-for="day of date.list"
                    :key="day.d"
                    :style="{
                      width: dayW - 1 + 'px',
                      'border-right': lineCtr ? '1px dashed #ccc' : 'none',
                      height: order.length * 8 * ganttH * 1.5 + 'px',
                    }"
                    class="lineD"
                  ></div>
                </div>
              </div>

              <!-- 甘特图-->
            </div>
            <div
              v-drap="{ x: 'box', y: 'contentBox' }"
              class="ganttBox"
              :style="{
                width: dateLength.length * dayW + 'px',
                height: (order.length + 1) * ganttH * 1.5 + 'px',
              }"
            >
              <!--  -->
              <div
                class="gantt"
                v-for="(gt, gi) of gant"
                :key="gi"
                :style="{ 'margin-top': ganttH / 2 + 'px' }"
              >
                <div
                  class="lv1"
                  :style="{
                    width: (gt.lg * dayW) / 24 + 'px',

                    'margin-left': (gt.ml * dayW) / 24 + 'px',

                    'font-size':
                      ganttH / 2.2 > 20 ? '20px' : ganttH / 2.2 + 'px',

                    'box-shadow': gt.choose
                      ? '0 0 5px rgba(81, 203, 238, 1)'
                      : 'none',
                  }"
                  @click="choose(gt)"
                >
                  <!--   @dblclick="showDetali(gt)" -->
                  <div
                    class="iconList"
                    :style="{
                      height: ganttH + 'px',
                      'line-height': ganttH + 'px',
                    }"
                  >
                    <i
                      title="展开"
                      :class="gt.icon"
                      :style="{
                        'line-height': ganttH + 'px',
                        'font-size':
                          ganttH / 1.5 > 26 ? '26px' : ganttH / 1.5 + 'px',
                      }"
                      @click="showDetali(gt)"
                    ></i>
                    <el-popover
                      placement="left-start"
                      width="260"
                      trigger="click"
                    >
                      <div
                        class="proOrderDlg"
                        v-loading="loading"
                        :style="{
                          'font-size':
                            ganttH / 2.2 > 20 ? '20px' : ganttH / 2.2 + 'px',
                        }"
                      >
                        <div>名称: {{ dlgData.schName }}</div>
                        <el-divider></el-divider>
                        <div>客色号: {{ dlgData.colorCode }}</div>
                        <el-divider></el-divider>
                        <div>重量: {{ dlgData.weight + dlgData.proUnit }}</div>
                        <el-divider></el-divider>
                        <div>开始日期: {{ dlgData.schStart }}</div>
                        <el-divider></el-divider>
                        <div>结束日期: {{ dlgData.schEnd }}</div>
                        <el-divider></el-divider>
                        <div v-for="(dt, j) of gt.detail" :key="j">
                          {{
                            dt.stepCode + ":  " + dt.workAmount + dt.workUnit
                          }}
                          <el-divider
                            v-if="j != gt.detail.length - 1"
                          ></el-divider>
                        </div>
                      </div>
                      <div slot="reference">
                        <i
                          title="详细信息"
                          style="margin-left: 5px"
                          class="el-icon-s-order"
                          :style="{
                            'line-height': ganttH + 'px',
                            'font-size':
                              ganttH / 1.5 > 26 ? '26px' : ganttH / 1.5 + 'px',
                          }"
                          @click="showDlg(gt)"
                        ></i>
                      </div>
                    </el-popover>
                  </div>
                  <div
                    class="schedule"
                    :style="{
                      width:
                        (((gt.lg * gt.item.actualWeight) / gt.item.weight) *
                          dayW) /
                          24 +
                        'px',
                      height: ganttH + 'px',
                      'line-height': ganttH + 'px',
                    }"
                  >
                    <div
                      :title="
                        gt.item.schName +
                        ', 共' +
                        gt.item.weight +
                        gt.item.proUnit +
                        ', 完成' +
                        ((gt.item.actualWeight / gt.item.weight) * 100).toFixed(
                          2
                        ) +
                        '%'
                      "
                      style="min-width: 80px; text-align: center"
                      :style="{ width: (gt.lg * dayW) / 24 + 'px' }"
                    >
                      <!--  .schName +
                        ", 共" +
                        gt.item.weight +
                        gt.item.proUnit +
                        ", 完成" +
                          (gt.item.actualWeight / gt.item.weight * 100).toFixed(2) +
                        "%", -->
                      {{ gt.item.schName }}
                    </div>
                  </div>
                  <span
                    :title="gt.label"
                    class="gtLabel"
                    :style="{
                      'font-size':
                        ganttH / 2.2 > 20 ? '20px' : ganttH / 2.2 + 'px',
                      'line-height': ganttH + 'px',
                      left: (gt.lg * dayW) / 24 + 'px',
                    }"
                  >
                    {{ gt.label }}
                  </span>
                  <!--   @dblclick.stop="showWorker(gt)" -->
                  <el-collapse-transition>
                    <div
                      class="detailBox"
                      v-show="gt.show"
                      :style="{
                        width: (gt.lg * dayW) / 24 - 2 + 'px',
                        'margin-top': ganttH + 'px',
                        'box-shadow': gt.choose
                          ? '0 0 10px rgba(81, 203, 238, 1)'
                          : 'none',
                      }"
                    >
                      <!--    height: ganttH + 'px',                    'margin-left': (gt.ml * dayW) / 24 + 5 + 'px', -->
                      <div
                        class="detail"
                        v-for="(detail, j) of gt.detail"
                        :key="j"
                      >
                        <div
                          class="detailGantt"
                          :title="detail.finishProportion * 100 + '%'"
                          :style="{
                            width: detail.finishProportion * 100 + '%',
                            height: ganttH + 'px',
                            'line-height': ganttH + 'px',
                            'font-size':
                              ganttH / 2.2 > 20 ? '20px' : ganttH / 2.2 + 'px',
                          }"
                        >
                          <div>
                            <span class="lv2-icon">
                              <i
                                title="展开"
                                :class="detail.icon"
                                :style="{
                                  'line-height': ganttH + 'px',
                                  'font-size':
                                    ganttH / 1.5 > 26
                                      ? '26px'
                                      : ganttH / 1.5 + 'px',
                                }"
                                @click="showLv2Detali(detail)"
                              ></i>
                            </span>

                            <div class="lv2Label">
                              <span
                                :title="
                                  detail.workName +
                                  ', 共' +
                                  detail.workAmount +
                                  detail.workUnit +
                                  ', 完成' +
                                  detail.finishProportion * 100 +
                                  '% '
                                "
                                >{{
                                  detail.workName +
                                  ", 共" +
                                  detail.workAmount +
                                  detail.workUnit +
                                  ", 完成" +
                                  detail.finishProportion * 100 +
                                  "% "
                                }}</span
                              >
                            </div>
                          </div>
                          <div
                            :title="
                              detail.workName +
                              ' , ' +
                              detail.workAmount +
                              detail.workUnit +
                              '' +
                              '  完成:' +
                              detail.finishProportion * 100 +
                              '%'
                            "
                            class="detailLabel"
                            :style="{
                              left: (gt.lg * dayW) / 24 + 20 + 'px',
                              'line-height': ganttH + 'px',
                              'font-size':
                                ganttH / 2.2 > 20
                                  ? '20px'
                                  : ganttH / 2.2 + 'px',
                            }"
                          >
                            {{
                              detail.workName +
                              " , " +
                              detail.workAmount +
                              detail.workUnit +
                              "  完成:" +
                              detail.finishProportion * 100 +
                              "%"
                            }}
                          </div>
                        </div>
                        <el-collapse-transition>
                          <div class="lv3Box">
                            <div
                              class="lv2Box"
                              :style="{
                                height: Math.ceil(ganttH * 0.7) + 'px',
                                'line-height': Math.ceil(ganttH * 0.7) + 'px',
                              }"
                              style="background: #67c23a"
                            >
                              <div
                                class="lv3Type"
                                title="缸號"
                                :style="{
                                  height: Math.ceil(ganttH * 0.7) + 1 + 'px',
                                }"
                              >
                                {{ detail.stepCode }}
                              </div>
                              <div
                                class="lv2Task"
                                v-for="lv2Task of detail.taskList"
                                :key="lv2Task.workName"
                                :style="{
                                  width:
                                    'calc(100% /' +
                                    detail.taskList.length +
                                    ')',
                                }"
                              >
                                <div
                                  class="lv2TaskLabel"
                                  :title="
                                    lv2Task.workName +
                                    ', 共' +
                                    lv2Task.exampleUseTime.toFixed(2) +
                                    'h'
                                  "
                                >
                                  {{ lv2Task.workName }}
                                  <span style="font-size: 13px">{{
                                    "共" +
                                    lv2Task.exampleUseTime.toFixed(2) +
                                    "h"
                                  }}</span>
                                  <!-- <br />
                              {{ Math.floor(lv2Task.finishProportion * 100) + "%" }} -->
                                </div>
                                <!-- <div
                              style="background: #67c23a; height: 100%"
                              :style="{ width: lv2Task.finishProportion * 100 + '%' }"
                            ></div> -->
                              </div>
                            </div>
                            <div
                              class="lv2Box"
                              :style="{
                                height: Math.ceil(ganttH * 0.7) + 'px',
                                'line-height': Math.ceil(ganttH * 0.7) + 'px',
                              }"
                            >
                              <div class="lv3Type" title="综合">綜合</div>
                              <div
                                class="lv2Task"
                                v-for="lv2Task of detail.zhList"
                                :key="lv2Task.oid"
                                :style="{
                                  width:
                                    'calc(100% /' + detail.zhList.length + ')',
                                }"
                                :title="
                                  (lv2Task.finishProportion * 100).toFixed(2) +
                                  '%' +
                                  lv2Task.exampleUseTime.toFixed(2) +
                                  'h'
                                "
                              >
                                <div class="lv2TaskLabel">
                                  {{
                                    lv2Task.finishProportion * 100 +
                                    "% " +
                                    lv2Task.exampleUseTime.toFixed(2) +
                                    "h"
                                  }}
                                </div>
                                <div
                                  style="background: #67c23a; height: 100%"
                                  :style="{
                                    width: lv2Task.finishProportion * 100 + '%',
                                  }"
                                ></div>
                              </div>
                              <span
                                class="lv3Label"
                                :style="{
                                  'font-size':
                                    ganttH / 2.2 > 20
                                      ? '20px'
                                      : ganttH / 2.2 + 'px',
                                }"
                                >{{
                                  "綜合, 完成" +
                                  detail.finishProportion * 100 +
                                  "%"
                                }}</span
                              >
                            </div>
                            <div
                              class="lv3Jd"
                              :style="{
                                height: Math.ceil(ganttH * 0.7) + 'px',
                                'line-height': Math.ceil(ganttH * 0.7) + 'px',
                              }"
                              v-for="(
                                gx, gxIndex
                              ) of detail.proSalScheduleDetailEx"
                              :key="gx.detailId"
                            >
                              <div
                                class="lv3length"
                                :style="{
                                  height: Math.ceil(ganttH * 0.7) + 'px',
                                }"
                              >
                                <div class="lv3Type" :title="gx.stepCode">
                                  {{ gx.stepCode }}
                                </div>
                                <!-- 'border-left':
                                  task.finishProportion === 0 ? '1px solid #fff' : 'none', -->
                                <div
                                  class="gxBox"
                                  v-for="task of gx.taskList"
                                  :key="task.stepId"
                                  :style="{
                                    width:
                                      'calc(100% /' +
                                      detail.taskList.length +
                                      ')',
                                  }"
                                >
                                  <!--  'border-left':
                                    task.finishProportion > 0 ? '1px solid #fff' : 'none', -->
                                  <div
                                    class="taskBox"
                                    :style="{
                                      width:
                                        task.workName === '无'
                                          ? '0px'
                                          : task.finishProportion * 100 + '%',
                                      'line-height':
                                        Math.ceil(ganttH * 0.7) + 'px',
                                    }"
                                    :title="
                                      task.workName +
                                      (
                                        (task.exampleUseTime / 60) *
                                        task.finishProportion
                                      ).toFixed(2) +
                                      'h,' +
                                      task.finishProportion * 100 +
                                      '%'
                                    "
                                  >
                                    <span class="taskTle">
                                      <!-- {{ task.name }} <br /> -->
                                      {{
                                        task.workName === "无"
                                          ? ""
                                          : task.finishProportion * 100 + "%"
                                      }}
                                      <span
                                        v-if="task.workName != '无'"
                                        style="font-size: 13px"
                                        >{{
                                          (
                                            (task.exampleUseTime / 60) *
                                            task.finishProportion
                                          ).toFixed(2) + "h"
                                        }}</span
                                      >
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <span
                                class="lv3Label"
                                :style="{
                                  'line-height': ganttH + 'px',
                                  height: ganttH + 'px',
                                  top: (gxIndex + 2) * ganttH * 0.75 + 'px',
                                }"
                              >
                                {{
                                  "缸號: " +
                                  gx.stepCode +
                                  ", 完成" +
                                  gx.finishProportion * 100 +
                                  "%"
                                }}
                              </span>
                            </div>
                          </div>
                        </el-collapse-transition>
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-row class="otherBox">
          <el-dialog
            :visible.sync="workerDlg"
            fullscreen
            append-to-body
            id="proOrder"
          >
            <worker
              tle="订单工序查询"
              :order="orderData"
              @close="workerDlg = false"
            />
          </el-dialog>
        </el-row>
      </div>
    </view-container>
  </div>
</template>
<script>
import { getExtreme, getDataPoor, getYearAndMonthAndDay } from "@/config/util";
import worker from "./worker";
import { getschANDschetail } from "@/api/pro/plan";
export default {
  name: "",
  components: {
    worker,
  },
  data() {
    return {
      order: [],
      gant: [],
      dateList: [],
      dateLength: 0,
      dayW: 20 * 2,
      ganttH: 35,
      dlgData: {},
      lineCtr: true,
      loading: false,
      workerDlg: false,
      orderData: {},
      chooseData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      // 计算时间轴
      getschANDschetail().then((res) => {
        this.order = res.data;
        let timeList = [];
        timeList.push(getExtreme(this.order, "schStart", "schEnd"));
        let date = {
          minResult: timeList.sort((a, b) => {
            return b.minResult < a.minResult ? 1 : -1;
          })[0].minResult,
          maxResult: timeList.sort((a, b) => {
            return b.maxResult < a.maxResult ? -1 : 1;
          })[0].maxResult,
        };

        date.minResult = date.minResult.split(" ")[0] + " 00:00:00"; // 取整
        this.dateLength = getYearAndMonthAndDay(date.minResult, date.maxResult);
        this.dateList = this.arrGroup(this.dateLength, "ym");
        // 计算每个数据的gantt数据，marginLeft、length 、
        this.order.forEach((item, i) => {
          item.weight = 0;
          item.actualWeight = 0;
          item.finishProportion = 0;
          // item.proSalSchedule.forEach((item) => {
          //   item.show = false;
          //   item.icon = "el-icon-caret-right";
          let task = [];
          item.proSalScheduleDetailEx.forEach((px) => {
            // console.log(px.workAmount);
            // item.weight += px.workAmount;
            // item.proUnit = px.proUnit;
            task = task.concat(px.proSalScheduleDetail);
          });
          task = this.arrGroup(task, "workName");
          // taskList = this.$unique(taskList, "workName");
          let taskList = [];
          let zhList = [];
          let sunTime = 0,
            useTime = 0;
          task.forEach((tk) => {
            let time = 0,
              zhTime = 0;
            tk.list.forEach((tkf) => {
              time += tkf.exampleUseTime / 60;
              zhTime += (tkf.exampleUseTime * tkf.finishProportion) / 60;
              sunTime += tkf.exampleUseTime / 60;
              useTime += (tkf.exampleUseTime * tkf.finishProportion) / 60;
            });

            zhList.push({
              workName: tk.workName,
              sn:
                tk.workName.indexOf("备") != -1
                  ? 1
                  : tk.workName.indexOf("成品") != -1
                  ? tk.workName.indexOf("验") != -1
                    ? 4
                    : 3
                  : 2,
              exampleUseTime: zhTime,
              finishProportion: (zhTime / time).toFixed(2),
            });
            taskList.push({
              workName: tk.workName,
              sn:
                tk.workName.indexOf("备") != -1
                  ? 1
                  : tk.workName.indexOf("成品") != -1
                  ? tk.workName.indexOf("验") != -1
                    ? 4
                    : 3
                  : 2,
              exampleUseTime: time,
            });
          });
          // taskList = taskList.sort((a, b) => {
          //   return a.sn - b.sn;
          // });
          // zhList = zhList.sort((a, b) => {
          //   return a.sn - b.sn;
          // });
          item.finishProportion = useTime / sunTime;

          item.proSalScheduleDetailEx.forEach((px) => {
            let data = [];
            taskList.forEach((tl, j) => {
              let kctr = true;
              px.proSalScheduleDetail.forEach((pl, k) => {
                if (tl.workName === pl.workName) {
                  data.push(pl);
                  kctr = false;
                } else if (k === px.proSalScheduleDetail.length - 1 && kctr) {
                  data.push({
                    workName: "无",
                    exampleUseTime: 0,
                  });
                }
              });
              px.taskList = data;
            });
            px.zhList = zhList;
          });

          item.weight += item.proAmount;
          item.actualWeight += item.proAmount * item.finishProportion;
          item.finishProportion += item.finishProportion;
          item.proUnit = item.proUnit;
          item.taskList = taskList;

          // });
          // marginLeft = 开始时间 - minResult

          let ml =
            (new Date(item.schStart).valueOf() -
              new Date(date.minResult).valueOf()) /
            (1000 * 3600);
          let lg =
            (new Date(date.maxResult).valueOf() -
              15 * 1000 * 3600 * 24 -
              new Date(item.schStart).valueOf()) /
            (1000 * 3600);

          this.gant.push({
            item,
            ml,
            lg,
            h: 2,
            choose: false,
            detail: item.proSalScheduleDetailEx,
            show: false,
            icon: "el-icon-caret-right",
            label:
              "染整订单: " +
              item.schName +
              " , " +
              item.weight +
              item.proUnit +
              ",  " +
              "  完成 " +
              ((item.actualWeight / item.weight) * 100).toFixed(2) +
              "%",
          });
        });
        console.log(this.order);
      });
    },
    arrGroup(arr, val) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[val]]) {
          dest.push({
            [val]: ai[val],
            list: [ai],
          });
          map[ai[val]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[val] == ai[val]) {
              dj.list.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    showDetali(val) {
      // 订单详细
      val.show = !val.show;
      val.icon === "el-icon-caret-right"
        ? (val.icon = "el-icon-caret-bottom")
        : (val.icon = "el-icon-caret-right");
    },
    showLv2Detali(val) {
      // 订单lv2详细
      val.show = !val.show;
      val.icon === "el-icon-caret-right"
        ? (val.icon = "el-icon-caret-bottom")
        : (val.icon = "el-icon-caret-right");
    },
    showDlg(val) {
      this.loading = true;
      console.log(val);
      this.dlgData = val.item;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    showWorker(val) {
      this.orderData = val.item;
      this.workerDlg = true;
    },
    choose(val) {
      this.chooseData.choose = false;
      val.choose = true;
      this.chooseData = val;
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-divider--horizontal
  margin 2px 0 !important
#proOrder
  width 100%
  padding 0
  margin 0
  .main
    width calc(100vw - 15px)
    .box
      border 1px solid #000
      height calc(100vh - 128px)
      margin 5px
      overflow-y hidden
      overflow-x auto
      font-weight 500
      font-size 16px
      -webkit-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
      // height: 100%;
      .header
        width 100%
        // height: 25px;
        line-height 25px
        display flex
        flex-direction row
        text-align center
        font-size 16px
        font-weight 600
        .dateBox
          height 100%
        .dateTle
          border-right 1px solid #000
          border-bottom 1px solid #000
        .dayBox
          display flex
          flex-direction row
          .day
          .dayTle
            border-right 1px solid #000
            border-bottom 1px solid #000
      .contentBox
        width 100%
        height calc(100vh - 112px)
        overflow auto
        overflow-x hidden
        position relative
        .content
          display flex
          flex-direction row
          .lineBox
            display flex
            flex-direction row
          .lineD
            // border-right: 1px solid #000;
            min-height calc(100vh - 152px)
          .lineD:last-child
            border-right 1px solid #000 !important
          .dayLine
            // border-right: 1px solid #000;
      .ganttBox
        position absolute
        top 0
        left 0
        min-height calc(100vh - 152px)
        padding-bottom 0px
        // background: yellow;
        .gantt
          display flex
          flex-direction row
          .lv1
            background #c5ddeb
            // background: #c5ddeb;
            font-weight 700
            display flex
            flex-direction row
            position relative
            cursor pointer
            i
              position relative
              cursor pointer
              z-index 2
            .iconList
              // position: absolute;
              float left
              width 80px
              display flex
          .gtLabel
            position absolute
            margin-left 10px
            font-weight 700
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .schedule
            position absolute
            left 0
            top 0
            background #67c23a
            z-index 1
            text-align left
          .detailBox
            // position: absolute;
            // left: 0;
            // top: 0;
            z-index 1
            transition 0.2s
            text-align center
            border-left 1px dashed #000
            border-bottom 1px dashed #000
            padding-bottom 10px !important
            margin-left -79px
            background #fff
            .detail
              // width: 99%;
              // margin-left: 10px;
              background #c5ddeb
              margin-top 5px
              margin-left 10px
              position relative
              box-sizing border-box
              // display: flex;
              // flex-direction: row;
              .lv3Box
                transition 0.2s
                background #fff
                padding-top 5px !important
                // border-left: 1px dashed #000;
                // border-bottom: 1px dashed #000;
                position relative
                // margin-left: 10px;
                .lv3Jd
                  border-bottom 1px solid #fff
                .lv3Label
                  position absolute
                  width 300px
                  text-align left
                  left calc(100% + 50px)
                  top 0
                .lv3length
                  display flex
                  flex-direction row
                  // border: 1px solid #000;
                  border-left none
                .gxBox
                  height 100%
                  font-size 14px
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                  background #c5ddeb
                  position relative
                // .gxBox:first-child {
                // border-left: none;
                // }
                .taskTle
                  // font-size: 1px;
                  position absolute
                  top 0
                  left 0
                  width 100%
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                .taskBox
                  height 100%
                  background #67c23a
                  border-left 1px solid #fff
            .lv3Type
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              width 88px
              background #fff
              font-size 14px
              height 101%
            .detailGantt
              background #67c23a
              font-weight 700
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              .gx
                height 100%
                width 50px
                color #fff
                // background: #000;
              .lv2-icon
                position absolute
                left 0
              .lv2Label
                text-align left
                position absolute
                min-width 80px
                width 100%
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                span
                  margin-left 40%
            .lv2Box
              display flex
              flex-direction row
              font-size 14px
              // border-top: 1px solid #000;
              border-bottom 1px solid #fff
              background #c5ddeb
              position relative
              .lv2Task
                // margin-left: 1px;
                position relative
              // .lv2Task:first-child {
              // border-left: none;
              // }
              .lv2TaskLabel
                position absolute
                left 0
                top 0
                width 100%
                text-align center
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                border-left 1px solid #fff
            .detailLabel
              position absolute
              z-index 1
              // left: -10px;
              top 0
              min-width 200px
              width 100%
              text-align left
              font-weight 700
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
  // 弹窗
  .el-dialog__header
    display none
  .el-dialog__headerbtn
    font-size 22px
    top 5px
.proOrderDlg
  font-weight 500
.el-popover
  border 1px solid #000 !important
</style>