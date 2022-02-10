<template>
  <div id="yxGantt">
    <el-row class="btnList">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-col :span="8">
            <el-button type="primary" @click="upDateGt">更新视图</el-button>
            <el-button type="primary" @click="add">{{
              this.$t("public.add")
            }}</el-button>
            <el-button type="primary" @click="save">{{
              this.$t("public.save")
            }}</el-button>
            <el-button type="primary" @click="del">{{
              this.$t("public.del")
            }}</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" @click="close">{{
              this.$t("public.close")
            }}</el-button>
          </el-col>
          <el-col :span="8">
            <span>计划</span>
            <span
              class="colorIcon"
              :style="{ backgroundColor: form.plan, color: form.plan }"
              @click="colorChange('plan')"
              >计划</span
            >

            <span>实际</span>
            <span
              class="colorIcon"
              :style="{ backgroundColor: form.real, color: form.real }"
              @click="colorChange('real')"
              >实际</span
            >

            <span>最晚</span>
            <span
              class="colorIcon"
              :style="{ backgroundColor: form.last, color: form.last }"
              @click="colorChange('last')"
              >最晚</span
            >
            网格
            <el-switch
              v-model="form.border"
              @click="upDateGt"
              style="margin-right: 5px"
            ></el-switch
            >放大
            <el-switch v-model="form.resize"></el-switch>
          </el-col>
          <el-col :span="8"></el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- v-loading="loading" :element-loading-text="$t('public.loading')" -->
    <el-row>
      <div
        :style="{ width: size.width[0] * 10 + '%', float: 'left' }"
        class="gTable"
      >
        <avue-crud
          ref="crud"
          :data="tableData"
          :option="tbOption"
          @sort-change="sortChangeEvent"
          @current-row-change="currentChangeEvent"
        ></avue-crud>
        <!--   :page="page" -->
        <!-- item.type!='date'?{name: 'input', immediate: true, attrs: {type: 'text'}}:'' -->
      </div>
      <div
        :style="{
          height: tbOption.height + 'px',
          float: 'left',
          width: size.width[1] * 10 + '%',
        }"
        class="bigBox"
      >
        <div
          class="content"
          style="
            border-left: 1px solid #e8eaec;
            border-bottom: 1px solid #e8eaec;
            border-right: 1px solid #e8eaec;
          "
        >
          <!-- 表头 一天 24hous ， 长度为 24 * 2  = 48px -->
          <div class="gtTle" :style="{ width: size.width[1] * 10 + '%' }">
            <div
              :style="{
                width: (planLength + 1) * form.size + 2 + 'px',
                height: '48px',
              }"
            >
              <div
                class="gtDate"
                v-for="(item, index) of gtDayList"
                :key="index"
                :style="{ width: item.data.length * form.size + 'px' }"
              >
                <div
                  :style="{ width: item.data.length * form.size + 'px' }"
                  class="year"
                >
                  {{ item.id }}
                </div>
                <div
                  class="day"
                  v-for="(day, index) of item.data"
                  :key="index"
                  :style="{ width: form.size + 'px' }"
                >
                  {{ day }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="ganttBox"
            :style="{
              height: (tableData.length + 1) * (form.size - 1) + 1 + 'px',
              float: 'left',
            }"
          >
            <div
              class="gtDetil"
              v-for="(item, index) in planList"
              :key="index"
              :style="{ width: planLength * form.size + 'px' }"
            >
              <div
                class="ganttDiv"
                :style="{
                  width: item.planWidth * form.size + 'px',
                  'margin-left': item.planMagrin * form.size + 'px',
                  backgroundColor: form.plan === '#ccc' ? '#fff' : form.plan,
                  zIndex: form.plan === '#ccc' ? '1' : '9',
                }"
                v-drag="{ item, index, tableData, form }"
              >
                <div
                  class="expect"
                  :style="{
                    width: item.realWidth * form.size + 'px',
                    'margin-left': item.realMagrin * form.size + 'px',
                    backgroundColor: form.real,
                    display: form.real === '#ccc' ? 'none' : '',
                  }"
                ></div>
                <div
                  class="last"
                  :style="{
                    width: item.lastWidth * form.size + 'px',
                    left: item.lastMagrin * form.size + 'px',
                    backgroundColor: form.last,
                    display: form.last === '#ccc' ? 'none' : '',
                  }"
                ></div>
              </div>
              <div
                class="detali"
                :style="{
                  left:
                    item.planMagrin * form.size +
                    item.planWidth * form.size +
                    'px',
                }"
              >
                <span>{{ item.project }}</span>
              </div>
            </div>
            <div
              class="grid"
              v-if="form.border"
              :style="{
                height: tbOption.height - 15 + 'px',
                width: size.width[1] * 10 + '%',
              }"
            >
              <div
                :style="{
                  width: (planLength + 1) * form.size + 'px',
                  height: '100%',
                }"
                class="gridBox"
              >
                <div
                  v-for="item of gtDayList"
                  :key="item.id"
                  :style="{ width: item.data.length * form.size + 'px' }"
                  class="test"
                >
                  <div
                    class="gridDiv"
                    v-for="(day, index) of item.data"
                    :key="index"
                    :style="{ width: form.size + 'px' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import {
  getExtreme,
  getDataPoor,
  getYearAndMonthAndDay,
  timeConversion,
  debounce,
} from "@/seal/gridOption.js";
export default {
  props: {
    tableData: Array,
    tbOption: Object,
    size: Object,
  },
  data() {
    return {
      planLength: 0,
      gtDayList: [],
      xData: {},
      planList: [],
      realList: [],
      oldClickDom: "", // 记录点击的dom
      loading: false,
      checkData: {},
      page: {
        // 分页信息
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      form: {
        border: true,
        project: "",
        plan: "#409EFF",
        real: "#00e500",
        last: "red",
        resize: false,
        size: 48,
      },
    };
  },
  watch: {
    "form.border": {
      handler(newVal, oldVal) {
        let boxSrcoll = document.getElementsByClassName("bigBox")[0];
        boxSrcoll.scrollLeft -= 1;
        boxSrcoll.scrollLeft += 1;
      },
    },
    "form.resize": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.form.size = 96;
        } else {
          this.form.size = 48;
        }
      },
    },
  },
  methods: {
    // 计算长度
    mathLength() {
      if (this.tableData.length == 0) {
        return;
      }
      this.loading = true;
      this.planLength = 0;
      this.gtDayList = [];
      this.xData = {};
      this.planList = [];

      // 监听鼠标滚动事件
      document
        .getElementsByClassName("bigBox")[0]
        .addEventListener("scroll", this.handleScrollS, true);
      document
        .getElementsByClassName("bigBox")[0]
        .addEventListener("mousewheel", this.handleScroll, true) ||
        document
          .getElementsByClassName("bigBox")[0]
          .addEventListener("DOMMouseScroll", this.handleScroll, false);
      document
        .getElementsByClassName("avue-crud")[0]
        .addEventListener("mousewheel", this.handleScrollY, true) ||
        document
          .getElementsByClassName("avue-crud")[0]
          .addEventListener("DOMMouseScroll", this.handleScrollY, false);
      this.$nextTick(() => {
        let data1 = getExtreme(this.tableData, "planStart", "planEnd"); // 计算 gantt 范围  最小日期 + 可调整日数 ==> 最大日期 + 可调整日数
        let data2 = getExtreme(this.tableData, "realStart", "realEnd"); // 计算 gantt 范围  最小日期 + 可调整日数 ==> 最大日期 + 可调整日数
        data1.maxResult > data2.maxResult
          ? ""
          : (data1.maxResult = data2.maxResult);
        data1.minResult > data2.minResult
          ? (data1.minResult = data2.minResult)
          : "";
        this.xData = {
          // 记录 gantt范围
          minResult: data1.minResult,
          maxResult: data1.maxResult,
        };
        this.xData.minResult = this.xData.minResult.split(" ")[0] + " 00:00:00"; // 取整
        this.planLength =
          getDataPoor(data1.minResult, data1.maxResult, "day") + 1; // 计算间隔天数
        this.gtDayList = getYearAndMonthAndDay(
          // 获取极值内的 日期
          data1.minResult,
          data1.maxResult
        );
        this.gtDayList = this.removal(this.gtDayList);
        this.gtDayList.forEach((item, index) => {});
        this.tableData.forEach((item, index) => {
          item.index = index;
          item.$cellEdit = true;
          // 计算空隙长度 planMagrin = marginLeft  planWidth = width
          let planMagrin = 0,
            planWidth = 0;
          if (item.planStart != null) {
            planMagrin =
              (new Date(item.planStart).valueOf() -
                new Date(this.xData.minResult).valueOf()) /
              (1000 * 3600 * 24);
            planWidth =
              (new Date(item.planEnd).valueOf() -
                new Date(item.planStart).valueOf()) /
              (1000 * 3600 * 24);
          }
          let realMagrin = 0,
            realWidth = 0;
          if (item.realStart != null) {
            realMagrin =
              (new Date(item.realStart).valueOf() -
                new Date(item.planStart).valueOf()) /
              (1000 * 3600 * 24);
            realWidth =
              (new Date(item.realEnd).valueOf() -
                new Date(item.realStart).valueOf()) /
              (1000 * 3600 * 24);
          }
          let lastMagrin = 0,
            lastWidth = 0;
          if (item.lastStart != null) {
            //  最晚
            lastMagrin =
              (new Date(item.lastStart).valueOf() -
                new Date(item.planStart).valueOf()) /
              (1000 * 3600 * 24);
            lastWidth =
              (new Date(item.lastEnd).valueOf() -
                new Date(item.lastStart).valueOf()) /
              (1000 * 3600 * 24);
          }
          this.planList.push({
            planMagrin,
            planWidth,
            realMagrin,
            realWidth,
            lastMagrin,
            lastWidth,
            // {{item.workName}}{{item.finishProportion}}% - 转场时间：{{item.transferTime}} - 宽放时间：{{item.broadTime}}
            project:
              item.workName +
              "-" +
              item.finishProportion +
              "% - 转场时间：" +
              item.transferTime +
              " - 宽放时间：" +
              item.broadTime,
            start: item.planStart,
            end: item.planEnd,
          });
        });
        setTimeout(() => {
          document.getElementsByClassName("gtDetil")[0].style.marginTop =
            "46px";

          this.setGtEvent(); // 绑定事件
        }, 500);
      });
    },
    //  选中行
    currentChangeEvent(row) {
      if (row === null || Object.keys(row).length === 0) {
        return;
      }
      if (row.isAdd) {
        if (this.oldClickDom) {
          this.oldClickDom.style.background = "rgb(255,255,255,0)";
        }
        return;
      }
      this.checkData = row;
      let checkDom = document.getElementsByClassName("gtDetil")[row.index];
      let divDom = document.getElementsByClassName("ganttDiv")[row.index];
      let ganttDom = document.getElementsByClassName("bigBox")[0];
      ganttDom.scrollLeft = divDom.style.marginLeft.split("px")[0] - 20;
      // 还原上一次选中行的样式
      if (this.oldClickDom.style) {
        this.oldClickDom.style.background = "rgb(255,255,255,0)";
      }
      this.oldClickDom = checkDom; // 记录选中的dom
    },
    upDateGt() {
      this.mathLength();
    },
    // X滚动鼠标
    handleScroll(e) {
      let boxSrcoll = document.getElementsByClassName("bigBox")[0];
      let gtTle = document.getElementsByClassName("gtTle")[0];
      let grid = document.getElementsByClassName("grid")[0];
      if (grid != undefined) {
        grid.scrollLeft = boxSrcoll.scrollLeft;
      }
      if (e.deltaY > 0) {
        boxSrcoll.scrollLeft += 40;
      } else {
        boxSrcoll.scrollLeft -= 40;
      }
    },
    // 手动滚动
    handleScrollS() {
      let boxSrcoll = document.getElementsByClassName("bigBox")[0];
      let gtTle = document.getElementsByClassName("gtTle")[0];
      let grid = document.getElementsByClassName("grid")[0];
      if (grid != undefined) {
        grid.scrollLeft = boxSrcoll.scrollLeft;
      }
      gtTle.scrollLeft = boxSrcoll.scrollLeft;
    },
    // Y滚动鼠标
    handleScrollY(e) {
      let bigBox = document.getElementsByClassName("bigBox")[0];
      let avue = document.getElementsByClassName("el-table__body-wrapper")[0];
      // bigBox.scrollTop += e.deltaY;
      bigBox.scrollTop = avue.scrollTop;
    },
    // 排序
    sortChangeEvent({ prop, order }) {
      this.tableData.sort((a, b) => {
        if (prop.toLowerCase().indexOf("date")) {
          var c = new Date(a[prop].replace(/-/g, "-")).getTime();
          var d = new Date(b[prop].replace(/-/g, "-")).getTime();
        }
        if (order === "descending") {
          return d - c; // 降序
        } else {
          return c - d; // 升序
        }
      });
      this.mathLength();
    },
    // 给表格每行 绑定一个鼠标点击事件
    setGtEvent() {
      this.tableData.forEach((item, index) => {
        let checkDom = document.getElementsByClassName("gtDetil")[index];
        let tbDom = document.getElementsByClassName("el-table__row")[index];
        tbDom.onmousedown = function () {
          checkDom.style.background = "#dcdfe6";
        };
      });
      this.$refs.crud.setCurrentRow({});
      this.loading = false;
    },
    // 保存
    save() {
      this.$emit("save");
    },
    add() {
      this.$emit("add");
    },
    del() {
      this.$emit("del", this.checkData);
    },
    // 取消
    cancel() {
      this.$emit("cancel");
    },
    close() {
      this.$emit("close");
    },
    removal(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.split("/")[0]]) {
          // 依赖分组字段可自行更改！
          dest.push({
            id: ai.split("/")[0], // 依赖分组字段可自行更改！
            data: [ai.split("/")[1] + "/" + ai.split("/")[2]],
          });
          map[ai.split("/")[0]] = ai; // 依赖分组字段可自行更改！
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.id == ai.split("/")[0]) {
              // 依赖分组字段可自行更改！
              dj.data.push(ai.split("/")[1] + "/" + ai.split("/")[2]);
              break;
            }
          }
        }
      }
      return dest;
    },
    colorChange(type) {
      if (type === "plan") {
        this.form.plan = this.form.plan === "#ccc" ? "#409EFF" : "#ccc";
      } else if (type === "real") {
        this.form.real = this.form.real === "#ccc" ? "#00e500" : "#ccc";
      } else {
        this.form.last = this.form.last === "#ccc" ? "red" : "#ccc";
      }
    },
  },
  mounted() {
    // this.mathLength();
  },
  destroyed() {
    // document
    //   .getElementsByClassName("bigBox")[0]
    //   .removeEventListener("scroll", this.handleScrollS, false);
    // document
    //   .getElementsByClassName("bigBox")[0]
    //   .removeEventListener("mousewheel", this.handleScroll, false) ||
    //   document
    //     .getElementsByClassName("bigBox")[0]
    //     .removeEventListener("DOMMouseScroll", this.handleScroll, false);
    document
      .getElementsByClassName("avue-crud")[0]
      .removeEventListener("mousewheel", this.handleScroll, false) ||
      document
        .getElementsByClassName("avue-crud")[0]
        .removeEventListener("DOMMouseScroll", this.handleScroll, false);
  },
};
</script>

<style lang="stylus">
#yxGantt
  padding 0
  margin 0 0.5em
  .avue-crud, .avue-form
    border none
    width 99% !important
    margin 0 auto
  .el-input__inner
    border none
  .el-input__prefix
    display none
  .el-input--prefix .el-input__inner
    padding-left 5px
  .el-input--suffix .el-input__inner
    padding-right 5px
  .el-table .cell
    padding-left 10px
    padding-right 10px
  .bigBox
    // border-left: 1px solid rgb(232, 234, 236);
    // border-right: 1px solid rgb(232, 234, 236);
    overflow auto
    overflow-y hidden
    border-bottom 1px solid #e8eaec
    .content
      border-left 1px solid #e8eaec
      border-right 1px solid #e8eaec
      width 99.5%
  .bigBox::-webkit-scrollbar
    // display: none;
  .ganttBox
    border 1px solid rgb(232, 234, 236)
    // border-right: none;
    // border-left: none;
    // border-bottom: none;
    overflow hidden
    background-color #fff
    width 100%
    .grid
      width 100%
      position absolute
      top 0
      overflow auto
      z-index 1
      // float: left;
      .test
        float left
        height 100%
      .gridDiv
        // width: 48px;
        height 100%
        border-right 1px solid rgb(232, 234, 236)
        float left
    .grid::-webkit-scrollbar
      display none
  // 表头
  .gtTle
    height 47px
    // background: #000;
    border 1px solid rgb(232, 234, 236)
    // border-top: none;
    margin-left -1px
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    position absolute
    background-color #F7F7F7
    overflow-x auto
    overflow-y hidden
    z-index 99
  .gtTle::-webkit-scrollbar
    display none
  .gtDate:first-child
    margin-left 1px
  .gtDate
    // width: 48px;
    height 47px
    // line-height: 47px;
    float left
    .day
      // width: 48px;
      line-height 28px
      float left
      border-right 1px solid rgb(232, 234, 236)
    .year
      height 20px
      line-height 20px
      border-bottom 1px solid rgb(232, 234, 236)
      border-right 1px solid rgb(232, 234, 236)
  .gtDate:last-child
    // border-right: none;
  .gtDetil
    height 47px
    border-top 1px rgb(232, 234, 236) solid
    position relative
  .ganttDiv
    // background-color: #409EFF;
    margin-top 11px
    height 24px
    float left
    // overflow: hidden;
    cursor pointer
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    font-size 16px
    color #fff
    position relative
    z-index 9
    .end
      float right
      margin-right 0.5em
    .project
      text-align center
    .expect
      height 12px
      background #00e500
      margin-top 6px
      z-index 9
    .last
      height 5px
      background red
      margin-top 10px
      position absolute
      top 0px
  .detali
    // text-align: right;
    font-size 14px
    float left
    // width: 300px;
    margin-left 15px
    height 24px
    line-height 20px
    text-indent 1em
    margin-top 0px
    z-index 99
    position absolute
    left 5px
  .ganttDiv:hover
    opacity 0.8
  .gtDetil:last-child
    height 45px
    border-right 1px rgb(232, 234, 236) solid
  .el-table tr
    height 47px
  .colorIcon
    height 30px
    width 30px
    // background: #409EFF;
    // color: #409EFF;
    margin-right 10px
    cursor pointer
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
</style>
