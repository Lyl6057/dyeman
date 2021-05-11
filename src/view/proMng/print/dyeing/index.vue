<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-07 10:03:11
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container
      title="漂染工作單打印"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.weaveJobId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.weaveJobId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="primary" @click="print" :loading="wloading"
          >打印</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>

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
          @close="dialogVisible = false"
          @refresh="query"
        ></tem-dlg>
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
      this.$tip
        .cofirm(
          "是否確定打印生產單號為【 " +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          print({ weaveJobCode: this.detail.weaveJobCode }).then((res) => {
            if (res.data.msg === "打印成功") {
              this.wloading = true;
              setTimeout(() => {
                this.wloading = false;
                this.$tip.success(res.data.msg);
              }, 2000);
            } else {
              this.wloading = true;
              setTimeout(() => {
                this.wloading = false;
                this.$tip.error(res.data.msg);
              }, 500);
            }
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
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