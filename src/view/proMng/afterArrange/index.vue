<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-19 13:37:08
 * @Description: 
-->
<template>
  <div id="finalizeDesign">
    <view-container
      title="后整理指令单"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.finishJobId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.finishJobId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button
          type="primary"
          @click="print"
          :loading="wloading"
          :disabled="!detail.finishJobId"
          >打印</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
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
          :isAdd="isAdd"
          :dialogVisible="dialogVisible"
          @close="dialogVisible = false"
          @refresh="query"
        ></tem-dlg>
      </el-dialog>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="pdfDlg"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <view-container title="打印預覽">
          <embed
            id="pdf"
            style="width: 100vw; height: calc(100vh - 80px)"
            :src="pdfUrl"
          />
        </view-container>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print } from "./api";
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
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  watch: {},
  methods: {
    query() {
      this.wloading = true;
      this.detail = {};
      this.crud = [];
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let queryData = JSON.parse(JSON.stringify(this.form));
      queryData.vatNo = "%" + (queryData.vatNo || "");
      get(
        Object.assign(queryData, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          dataSortRules: "workDate|desc,vatNo"
        })
      )
        .then((res) => {
          res.data.records.forEach((item, i) => {
            this.crud.push(
              Object.assign(item.pbfj, item.pbj, { index: i + 1 })
            );
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.page.total = res.data.total;
          this.wloading = false;
        })
        .catch((e) => {
          this.$tip.error(e);
          this.wloading = false;
          console.log(e);
        });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeFinishJob/bleadyeFinishPdf?id=" +
        this.detail.finishJobId;
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
      if (this.$refs.tem) {
        this.$nextTick(() => {
          this.$refs.tem.form = {};
          for (let key in this.$refs.tem.form) {
            delete this.$refs.tem.form[key];
          }
        });
      }
    },
    del() {
      this.$tip
        .cofirm(
          "是否删除缸号为【 " + this.detail.vatNo + this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.finishJobId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    handleRowDBLClick(val) {
      this.dialogVisible = true;
      this.isAdd = false;
      this.detail = val;
      // this.print();
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
    // this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'></style>