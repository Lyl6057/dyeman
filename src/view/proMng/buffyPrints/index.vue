<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-23 09:34:13
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container title="打印布飞記錄">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <!-- <el-button type="success" @click="print">打印</el-button> -->
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
import { webSocket } from "@/config/index.js";
import { get, add, update, del } from "./api";
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
      czsocket: "",
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      this.form.poNo = "!^%" + (this.form.poNo ? this.form.poNo : "");
      this.form.noteCode = "%" + (this.form.noteCode ? this.form.noteCode : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
           // 加上过滤厂
          filterFactory: true
        })
      ).then((res) => {
        this.crud = res.data.records;

        // this.crud.sort((a, b) => {
        //   return a.printedTime < b.printedTime ? 1 : -1;
        // });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.form.poNo.indexOf("!^%") != -1) {
          this.form.poNo = this.form.poNo.split("!^%")[1] || "";
        }
        if (this.form.noteCode.indexOf("%") != -1) {
          this.form.noteCode = this.form.noteCode.split("%")[1] || "";
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      if (Object.keys(this.detail).length === 0) {
        return;
      }
      this.$tip
        .cofirm(
          "是否确定打印布票编号为 【 " +
            this.detail.noteCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.czsocket.send(this.detail.noteId);
          setTimeout(() => {
            // this.printCtr = true;
            this.$tip.success("已发送打印请求!");
            this.wLoading = false;
          }, 500);
        });
      // this.detail.pz = 25;
      // this.detail.qsph = 1;
      // this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.detail = val;
      // this.print();
    },
    setCz() {
      webSocket.setPrint(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        console.log(e);
      };
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
    // this.setCz();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>