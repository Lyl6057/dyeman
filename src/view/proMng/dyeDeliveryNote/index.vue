<template>
  <div id="colorMng">
    <view-container
      title="出库送货单"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="primary" @click="update">{{
          this.$t("public.update")
        }}</el-button>
        <el-button type="danger" @click="del">{{
          this.$t("public.del")
        }}</el-button>

        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-dropdown style="margin-left: 10px" @command="outReport">
          <el-button type="primary" @click="outReport('deliveryOrder')">
            报表<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="deliveryOrder">出货单</el-dropdown-item>
            <el-dropdown-item command="deliveryOrderdeis"
              >出货单明细</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container title="出库送货单资料">
        <div class="crudBox" style="margin-top: 5px">
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
        </div>
      </view-container>
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
          @refresh="query"
          @close="dialogVisible = false"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import tem from "./tem";
import { get, del } from "./api";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      loading: false,
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      wLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      get(
        Object.assign({
          outCode: "!^%" + (this.form.outCode || ""),
          outDate: this.form.outDate,
          applicant: this.form.applicant,
          rows: this.page.pageSize,
          start: this.page.currentPage,
          delFlag: 0,
        })
      )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          this.crud.forEach((item, index) => {
            item.index = index + 1;
            if (index === this.crud.length - 1) {
              this.$refs.crud.setCurrentRow();
              this.detail = {};
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
            }
          });
          if (this.crud.length === 0) {
            this.wLoading = false;
          }
        })
        .catch((e) => {
          this.wLoading = false;
        });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    outReport(url) {
      if (this.detail.orderId) {
        const urlPath = process.env.API_HOST;
        window.open(
          urlPath + "/api/proOutFactOrder/" + url + "?id=" + this.detail.orderId
        );
      } else {
        this.$tip.warning("请点击导出的数据");
      }
    },
    outReportDetail() {},
    update() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.warning("请先选择要修改的数据!");
        return;
      }
      this.isAdd = false;
      this.dialogVisible = true;
    },
    del() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为 【 " +
            this.detail.outCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.orderId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.detail.index - 1, 1);
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
    handleRowDBLClick(row) {
      this.detail = row;
      this.isAdd = false;
      this.dialogVisible = true;
    },
    cellClick(row) {
      this.detail = row;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'></style>