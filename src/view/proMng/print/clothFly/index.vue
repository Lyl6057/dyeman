<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-23 09:31:41
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container title="布飞打印">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
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
          :row-style="rowStyle"
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
import { get } from "./api";
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
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      this.form.weaveJobCode =
        "!^%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          auditState: 1,
          // 加上过滤厂
          filterFactory: true
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.form.weaveJobCode.indexOf("!^%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("!^%")[1] || "";
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      if (this.detail.weaveState) {
        this.$tip.warning("该织单为草稿状态,无法进行打印操作!");
        return;
      }
      if (Object.keys(this.detail).length === 0) {
        return;
      }
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
    rowStyle({ row, column, rowIndex }) {
      if (row.weaveState) {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
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