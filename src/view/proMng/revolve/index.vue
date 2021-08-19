<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-17 13:52:53
 * @Description:
-->
<template>
  <div id="clothFlyPrint">
    <view-container
      title="染整生产运转单"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        >
          <el-button
            type="success"
            :disabled="!detail.runJobId"
            @click="handleRowDBLClick(detail)"
            >{{ this.$t("public.update") }}</el-button
          >
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="thêm mới "
          placement="top-start"
        >
          <el-button type="primary" @click="add">{{
            this.$t("public.add")
          }}</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="xóa"
          placement="top-start"
        >
          <el-button type="danger" :disabled="!detail.runJobId" @click="del">{{
            this.$t("public.del")
          }}</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content=" in"
          placement="top-start"
        >
          <el-button type="primary" @click="print" :loading="wloading"
            >打印</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="copy"
          placement="top-start"
        >
          <el-button type="primary" @click="copyEvent" :loading="wloading"
            >复制</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="tìm kiếm"
          placement="top-start"
        >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-tooltip>
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
          id="crud"
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
      >
        <tem-dlg
          v-if="dialogVisible"
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          :copyC="copyC"
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
          <!-- <div class="btnList">
            <el-button type="warning" @click="pdfDlg = false">{{
              this.$t("public.close")
            }}</el-button>
            <el-button type="primary" @click="print2">打印</el-button>
          </div> -->
          <!--startprint-->
          <embed
            id="pdf"
            style="width: 100vw; height: calc(100vh - 80px)"
            :src="pdfUrl"
          />
          <!--endprint-->
        </view-container>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print } from "./api";
import tem from "./temDlg";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
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
      copyC: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.sort((a, b) => {
          return a.workDate > b.workDate ? -1 : 1;
        });
        this.crud.forEach((item, i) => {
          // item.custName = item.custCode;
          // item.amount = item.amount.toFixed(2);
          item.index = i + 1;
        });

        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
        this.detail.runJobId;
    },
    copyEvent() {
      this.isAdd = true;
      this.copyC = true;
      this.dialogVisible = true;
    },
    add() {
      this.isAdd = true;
      this.copyC = false;
      this.dialogVisible = true;
    },
    del() {
      if (parent.userID != this.detail.serviceOperator) {
        this.$tip.warning("当前用户没有权限删除该记录!");
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle7") +
            this.detail.vatNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.runJobId)
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
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.detail = val;
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
