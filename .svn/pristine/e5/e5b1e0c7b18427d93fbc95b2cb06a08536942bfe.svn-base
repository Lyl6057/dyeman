<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-02-03 08:27:43
 * @Description: 
-->
<template>
  <div id="clothFly">
    <view-container title="打印布飞">
      <el-row class="btnList">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="dialogVisible"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-if="dialogVisible"
      >
        <tem-dlg
          ref="tem"
          :detail="detail"
          @close="dialogVisible = false"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { getScheduleAndWork } from "./api";
import tem from "./temDlg";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      getScheduleAndWork({
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }).then((res) => {
        this.crud = this.$unique(res.data.records, "poNo");
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      this.detail.pz = 25;
      this.detail.qsph = 1;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.print();
    },
    cellClick(val) {
      this.detail = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>