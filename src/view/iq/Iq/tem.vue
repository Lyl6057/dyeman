<template>
  <div id="iqTem">
    <div class="btnList">
      <el-button type="primary" @click="close"> 关 闭 </el-button>
    </div>
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="tle.tab1" name="rc" v-if="tle.tab1">
        <avue-crud ref="rc" :option="rcOp" :data="rcData"></avue-crud>
      </el-tab-pane>
      <el-tab-pane :label="tle.tab2" name="cc" v-if="tle.tab2">
        <avue-crud ref="cc" :option="ccOp" :data="ccData"></avue-crud>
      </el-tab-pane>
      <el-tab-pane :label="tle.tab3" name="th" v-if="tle.tab3">
        <avue-crud ref="rthc" :option="thOp" :data="thData"></avue-crud
      ></el-tab-pane>
      <el-tab-pane :label="tle.tab4" name="xs" v-if="tle.tab4">
        <avue-crud ref="xs" :option="xsOp" :data="xsData"></avue-crud
      ></el-tab-pane>
      <el-tab-pane :label="tle.tab5" name="lld" v-if="tle.tab5">
        <avue-crud ref="lld" :option="lldOp" :data="lldData"></avue-crud
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    rcData: Array,
    ccData: Array,
    thData: Array,
    xsData: Array,
    lldData: Array,
    lldOp: Object,
    rcOp: Object,
    ccOp: Object,
    thOp: Object,
    xsOp: Object,
    tle: Object,
  },
  components: {},
  data() {
    return {
      tabs: "rc",
    };
  },
  watch: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#iqTem {
  padding: 5px;

  .el-dialog__header {
    padding: 1px !important;
  }
}
</style>