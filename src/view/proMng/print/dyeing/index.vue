<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-12-11 18:43:29
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <el-tabs type="border-card">
      <el-tab-pane
        label="漂染工作單打印"
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
              :disabled="!detail.bleadyeJobId"
              @click="handleRowDBLClick(detail)"
              >{{ this.$t("public.update") }}</el-button
            >
          </el-tooltip>
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="thêm mới "
            placement="top-start"
          >
            <el-button type="primary" @click="add({})">{{
              this.$t("public.add")
            }}</el-button>
          </el-tooltip> -->
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="xóa"
            placement="top-start"
          >
            <el-button
              type="danger"
              :disabled="!detail.bleadyeJobId"
              @click="del"
              >{{ this.$t("public.del") }}</el-button
            >
          </el-tooltip> -->
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="thêm mới "
            placement="top-start"
          > -->
          <el-button
            type="warning"
            :disabled="!detail.bleadyeJobId"
            @click="addCopy"
            >返工</el-button
          >
          <!-- </el-tooltip> -->
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
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content=" in"
            placement="top-start"
          >
            <el-button type="primary" @click="printOther(1)" :loading="wloading"
              >打印工艺</el-button
            >
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content=" in"
            placement="top-start"
          >
            <el-button type="primary" @click="printOther(2)" :loading="wloading"
              >打印染缸参数</el-button
            >
          </el-tooltip> -->
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
            :revolve="revolveData"
            :copyCtr="copyCtr"
            @close="dialogVisible = false"
            @refresh="refresh"
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
        </el-dialog></el-tab-pane
      >
      <el-tab-pane label="未生成漂染单的运转单">
        <div class="btnList">
          <el-tooltip
            class="item"
            effect="dark"
            content="tìm kiếm"
            placement="top-start"
          >
            <el-button type="success" @click="add(revolveChoose)">{{
              this.$t("public.sc")
            }}</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="tìm kiếm"
            placement="top-start"
          >
            <el-button type="primary" @click="revolveQuery">{{
              this.$t("public.query")
            }}</el-button>
          </el-tooltip>
        </div>
        <el-row class="formBox">
          <avue-form
            ref="revolveForm"
            :option="revolveFOp"
            v-model="revolveForm"
          ></avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="revolveCrud"
            id="revolveCrud"
            :option="revolveCOp"
            :data="revolves"
            v-loading="revolveLoading"
            @row-dblclick="revolveDBLClick"
            @current-row-change="revolveCellClick"
            :row-style="rowStyle"
          ></avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, revolveForm } from "./data";
import { mainCrud as revolveCrudOp } from "../../revolve/data";
import { get, add, update, del, print, getRevolve } from "./api";
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
      revolvePage: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      revolveLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      revolveFOp: revolveForm(this),
      revolveForm: {},
      revolveCOp: revolveCrudOp(this),
      revolveChoose: {},
      revolve: [],
      revolves: [],
      revolveData: {},
      copyCtr: false,
    };
  },
  watch: {},
  methods: {
    refresh() {
      this.query();
      this.revolveQuery();
    },
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      this.form.weaveJobCode =
        "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      this.form.salPoNo = "%" + (this.form.salPoNo ? this.form.salPoNo : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        // this.crud.sort((a, b) => {
        //   return a.workDate > b.workDate ? -1 : 1;
        // });
        this.crud.forEach((item, i) => {
          // item.custName = item.custCode;
          item.clothWeight = item.clothWeight ? item.clothWeight.toFixed(2) : 0;
          item.index = i + 1;
        });

        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        if (this.form.vatNo.indexOf("!^%") != -1) {
          this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
        }
        if (this.form.weaveJobCode.indexOf("%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1];
        }
        if (this.form.salPoNo.indexOf("%") != -1) {
          this.form.salPoNo = this.form.salPoNo.split("%")[1];
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    revolveQuery() {
      this.revolveLoading = true;
      getRevolve({
        rows: 99999,
        start: 1,
        runState: "1",
        // auditState: 0,
      }).then((res) => {
        this.revolves = res.data.records.filter((item) => {
          return item.auditState == 1;
        });
        this.revolves.sort((a, b) => {
          return a.workDate > b.workDate ? -1 : 1;
        });
        this.revolves.forEach((item, i) => {
          item.index = i + 1;
        });

        if (this.revolve.length > 0) {
          this.$refs.revolveCrud.setCurrentRow(this.revolve[0]);
        }
        this.revolvePage.total = res.data.total;
        this.$nextTick(() => {
          this.revolve = this.revolves.filter((item) => {
            return (
              item.vatNo.indexOf(this.revolveForm.vatNo) != -1 &&
              item.weaveJobCode.indexOf(this.revolveForm.weaveJobCode) != -1 &&
              item.serviceOperator.indexOf(this.revolveForm.serviceOperator) !=
                -1
            );
          });
        });
        this.revolveLoading = false;
      });
    },
    revolveDBLClick(val) {
      if (val.runState == "0") {
        this.$tip.warning("该运转单为草稿状态,无法进行操作!");
        return;
      }
      this.revolveChoose = val;
      this.add(this.revolveChoose);
    },
    revolveCellClick(val) {
      this.revolveChoose = val;
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeJob/buildWorkOrder?id=" +
        this.detail.bleadyeJobId;
    },
    printOther(val) {
      if (val == 1) {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder2?id=" +
          this.detail.bleadyeJobId;
      } else {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder3?id=" +
          this.detail.bleadyeJobId;
      }
      this.pdfDlg = true;
    },
    add(val) {
      if (val.runState == "0") {
        this.$tip.warning("该运转单为草稿状态,无法进行操作!");
        return;
      }
      this.copyCtr = false;
      this.revolveData = val;
      this.isAdd = true;
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
            this.detail.dyeMathine +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.bleadyeJobId)
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
    addCopy() {
      this.copyCtr = true;
      this.isAdd = true;
      this.dialogVisible = true;
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
    // this.query();
    this.revolveQuery();
    this.revolveCOp.page = false;
    this.revolveCOp.height = "calc(100vh - 200px)";
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyPrint {
  .el-tag {
    display: none !important;
  }
}
</style>