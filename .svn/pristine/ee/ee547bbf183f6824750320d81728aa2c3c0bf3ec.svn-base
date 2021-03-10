<template>
  <div id="points">
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
              <span id="time" style="float: left">{{ nowTimeLabel }}</span>
            </template>
          </avue-crud>
        </div>
      </el-col>
    </el-row>
    <el-row class="main">
      <el-col :span="14">
        <div class="formTle">
          {{ type }}信息
          <el-button
            style="
              padding: 5px 20px;
              margin-left: 10px;
              font-size: 18px;
              font-weight: bold;
            "
            @click="chengzhong"
          >
            称重
          </el-button>
        </div>
        <avue-form v-model="forms" :option="formOp"> </avue-form>
      </el-col>
      <el-col :span="10">
        <div class="btnList" v-show="endRc">
          <el-button style="background: green" @click="submit(true)"
            >通过 【1】</el-button
          >
          <el-button style="background: red" @click="submit(false)"
            >不通过 【0】</el-button
          >
          <el-button style="background: rgb(235, 181, 99)" @click="over"
            >开始入库 【5】</el-button
          >
        </div>
        <div class="btnList" v-show="!endRc">
          <el-button style="background: rgb(235, 181, 99)" @click="next"
            >继续点数</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    type: String,
    nowTimeLabel: String,
    option: Object,
    data: Array,
    form: Object,
    formOp: Object,
    chengzhong: Function,
    cellStyle: Function,
    check: Function,
    submit: Function,
    over: Function,
    next: Function,
    endRc: Boolean,
  },
  components: {},
  data() {
    return {
      forms: {},
    };
  },
  watch: {
    form() {
      this.forms = this.form;
    },
  },
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#whCom {
}
</style>