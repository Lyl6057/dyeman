<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-03 16:42:35
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\index.vue
 * @Description: 
-->

<template>
  <div class="qcCheckPlan">
    <view-container title="QA验布计划">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{this.$t("public.query")}}</el-button>
        <el-button type="primary" @click="add">{{this.$t("public.add")}}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" 
          :option="crudOp" 
          :data="crud" 
          :page.sync="page" 
          v-loading="loading"
          @on-load="query" 
          @cell-click="cellClick">
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="tem" :planId="planId" @refresh="query" @close="dialogVisible = false"></tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import { mainForm, mainCrud } from "./data.js";
export default {
  components: {
    temDlg,
  },
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      detail: {},
      wloading: false,
      loading: false,
      dialogVisible: false,
      planId: {},
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    query() {},
    add() {
      this.planId = null;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.detail = val;
    },
  },
};
</script>
<style lang="stylus" scoped>
.qcCheckPlan {
}
</style>