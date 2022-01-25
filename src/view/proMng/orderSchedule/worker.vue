<template>
  <div id="orderPlanDlg">
    <view-container :title="tle">
      <div class="btnList">
        <el-button type="primary" @click="close"> 关 闭</el-button>
      </div>
      <el-row class="content">
        <div class="orderList">
          <el-card shadow="hover">
            <div class="borderBox">
              <div>订单编号: {{ order.poNo }}</div>
              <div>客户: {{ order.cust }}</div>
              <div>重量: {{ order.weight }} KG</div>
              <div>开始日期: {{ order.start }}</div>
              <div>结束日期: {{ order.end }}</div>
            </div>
          </el-card>
        </div>
        <div class="workerBox">
          <div
            class="workerList"
            v-for="list of order.orderDetail"
            :key="list.oid"
          >
            <div class="workerTle">
              <span>
                {{
                  list.color +
                  "   " +
                  list.weight +
                  "KG, " +
                  "已完成 " +
                  list.weight * list.jd +
                  "KG, " +
                  list.jd * 100 +
                  "%"
                }}</span
              >
            </div>
            <div class="workerMain" v-for="item of list.gx" :key="item.oid">
              <div class="workerLabel">
                <div>缸号：{{ item.code }}</div>
                <div>
                  生产时间：{{ item.long * 2 + "h , " + item.weight + "KG" }}
                </div>
                <div>运行：{{ item.long + "h," + item.jd * 100 + "%" }}</div>
              </div>
              <div class="workerBorder">
                <div
                  class="taskBox"
                  v-for="task of item.task"
                  :key="task.oid"
                  :style="{ width: 100 / item.task.length + '%' }"
                >
                  <div class="taskName">
                    {{ task.name }}
                    <span
                      :title="
                        '共需' +
                        task.long +
                        'h, 運行' +
                        task.long * task.jd +
                        'h'
                      "
                      class="loadingTle"
                      style=""
                    >
                      共需{{ task.long + "h, 運行" + task.long * task.jd }}h
                    </span>
                  </div>
                  <div class="taskS">
                    <div
                      class="taskJd"
                      :style="{
                        width: task.jd * 100 + '%',
                      }"
                    ></div>
                    <div class="taskTle">
                      {{ task.jd * 100 + "%" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { workerF } from "./data";
export default {
  name: "",
  components: {},
  props: {
    tle: String,
    order: Object,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    close() {
      // 关闭弹窗
      this.$emit("close");
    },
  },
  created() {},
  mounted() {
    console.log(this.order);
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#orderPlanDlg
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .el-button--mini, .el-button--mini.is-round
    padding 6px 10px
  .el-card
    border none
  .btnList
    margin 5px 0 5px 15px
  .content
    margin 8px 5px
    display flex
    flex-direction row
    min-width 1200px
    .orderList
      width 260px
      text-align left
      text-indent 0.3rem
      .borderBox
        border 1px solid #ccc
        border-radius 3px
        padding 0 10px
        div
          height 30px
          line-height 30px
          font-size 16px
          font-weight 600
    .workerBox
      width calc(100% - 270px)
      height calc(100vh - 157px)
      // border: 1px solid #ccc;
      margin-left 10px
      .workerList
        padding 10px
        border 1px solid #ccc
      .workerTle
        padding 0 0 0 5px
        font-size 18px
        font-weight 700
      .workerMain
        display flex
        flex-direction row
        margin 20px 20px 30px 20px
      .workerLabel
        width 200px
        font-size 16px
        font-weight 600
        line-height 22px
      .workerBorder
        width calc(100% - 220px)
        border 1px solid #000
        margin-left 10px
        display flex
        flex-direction row
        .taskBox:last-child
          border none
        .taskBox
          text-align center
          border-right 1px solid #000
          font-size 16px
          font-weight 600
          .taskName
            height 32px
            line-height 32px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .taskS
            border-top 1px solid #000
            height 31px
            line-height 31px
            position relative
            .taskJd
              margin 0
              height 31px
              line-height 31px
              background #00b050
              color #000
            .taskTle
              position absolute
              left 0
              top 0
              text-align center
              width 100%
  .loadingTle
    font-size 12px
</style>









