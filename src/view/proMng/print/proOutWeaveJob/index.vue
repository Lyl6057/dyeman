<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-27 21:33:21
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container
      title="外发织造通知单"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
          v-if="isOutFactory"
        >
          <el-button
            type="success"
            :disabled="!detail.weaveJobId"
            @click="handleRowDBLClick(detail)"
            >{{ this.$t("public.update") }}</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="thêm mới "
          placement="top-start"
          v-if="isOutFactory"
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
          v-if="isOutFactory"
        >
          <el-button
            type="danger"
            :disabled="!detail.weaveJobId"
            @click="del"
            >{{ this.$t("public.del") }}</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="in"
          placement="top-start"
          v-if="isOutFactory"
        >
          <el-button
            type="primary"
            @click="print"
            :loading="wloading"
            :disabled="!detail.weaveJobId"
            >打印</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="copy"
          placement="top-start"
          v-if="isOutFactory"
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
        <div style="float: right; margin-right: 5px">
          模糊查询 <el-switch v-model="hasFuzzy" active-text="开" inactive-text="关">
          </el-switch>
        </div>
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
        v-if="dialogVisible"
      >
        <tem-dlg
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          :copyC="copyC"
          @close="dialogVisible = false"
          @refresh="query"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
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
      hasFuzzy: true,
      copyC: false,
    };
  },
  watch: {},
  computed: {
    isOutFactory(){
      return !this.$store.getters.isOutFactory
    }
  },
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      let params = JSON.parse(JSON.stringify(this.form));
      if (this.hasFuzzy) {
        params.weaveJobCode =
          "!^%" + (params.weaveJobCode ? params.weaveJobCode : "");
        params.salPoNo = "%" + (params.salPoNo ? params.salPoNo : "");
        params.colorCode = "%" + (params.colorCode ? params.colorCode : "");
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isWorkOut: 1,
          // 加上过滤厂
          filterFactory: true
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.custName = item.custCode;
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
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.detail.weaveJobId;
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
      if (this.detail.creator != parent.userID) {
        this.$tip.warning("你无权限删除该条数据!");
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle7") +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.weaveJobId)
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
    rowStyle({ row, column, rowIndex }) {
      if (row.weaveState) {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      }
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