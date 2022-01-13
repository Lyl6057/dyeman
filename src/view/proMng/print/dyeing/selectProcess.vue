<!--
 * @Author: Lyl
 * @Date: 2022-01-12 09:33:04
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-12 15:20:18
 * @FilePath: \iot.vue\src\view\proMng\print\dyeing\selectProcess.vue
 * @Description: 
-->
<template>
  <div class="selectProcess">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      top="10vh"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeBefore"
      v-if="choiceV"
    >
      <el-tabs type="border-card" v-model="tab">
        <el-tab-pane name="tab1" label="选择染整工单">
          <div class="btnList">
            <el-button type="primary" @click="choice">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button type="primary" @click="query">{{
              $t("public.query")
            }}</el-button>
            <el-button type="warning" @click="close">{{
              $t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="choiceF" v-model="form"></avue-form>
          </div>
          <div class="crudBox">
            <avue-crud
              id="proChoice"
              ref="crud"
              :option="choiceC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="query"
              @current-row-change="cellClick"
              @selection-change="selectionChange"
            >
            </avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card" v-model="process">
        <el-tab-pane name="main" label="生产工艺">
          <avue-crud
            id="processCrud"
            ref="processCrud"
            :option="proccessOp"
            :data="proccessData"
            v-loading="loading"
          >
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { get, getTechargue } from "./api";
import { mainCrud, mainEasyForm, techargueCrud } from "./data.js";
export default {
  components: {},
  props: {
    choiceV: Boolean,
  },
  data() {
    return {
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 50, 100, 500],
      },
      loading: false,
      choiceC: mainCrud(this),
      crud: [],
      choiceF: mainEasyForm(this),
      form: {},
      pick: {},
      tab: "tab1",
      chooseData: [],
      process: "main",
      proccessOp: techargueCrud(this),
      proccessData: [],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.choiceC.height = "calc(100vh - 500px)";
    this.proccessOp.height = "calc(100vh - 500px)";
    this.proccessOp.page = false;
    this.proccessOp.selection = false;
  },
  mounted() {},
  methods: {
    query() {
      this.loading = true;
      this.crud = [];

      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      this.form.salPoNo = "%" + (this.form.salPoNo ? this.form.salPoNo : "");
      this.form.weaveJobCode =
        "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      get(
        Object.assign(this.form, this.choiceQ, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.crud.length - 1) {
            setTimeout(() => {
              if (this.crud.length > 0) {
                this.$refs.crud.setCurrentRow(this.crud[0]);
              }
              this.loading = false;
            }, 200);
          }
        });
        if (!this.crud.length) this.loading = false;
        if (this.form.vatNo.indexOf("!^%") != -1) {
          this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
        }
        if (this.form.salPoNo.indexOf("%") != -1) {
          this.form.salPoNo = this.form.salPoNo.split("%")[1] || "";
        }
        if (this.form.weaveJobCode.indexOf("%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1] || "";
        }
      });
    },
    choice() {
      this.$emit(
        "choiceData",
        this.chooseData.length > 0 ? this.chooseData : this.pick
      );
    },
    cellClick(val) {
      this.pick = val;
      getTechargue({
        proBleadyeJobFk: val.bleadyeJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        let data = res.data.records.sort((a, b) => {
          return a.sn > b.sn ? 1 : -1;
        });

        data.forEach((item, i) => {
          item.index = i + 1;
          item.bleadyeName = item.proBleadyeTechCodeFk;
        });
        this.proccessData = data;
      });
    },
    selectionChange(val) {
      this.chooseData = val;
    },
    closeBefore(done) {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    close() {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
  },
};
</script>
<style lang="stylus" scoped>
#choiceDlg
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label
    font-size 16px
    height 30px
  .el-dialog__body
    padding 0 !important
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .el-dialog__header
    padding 0px
  .el-dialog__headerbtn
    top 5px
    color #000
    font-size 22px
    z-index 999
  .formBox
    margin-bottom 0px
  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu
    min-height 0 !important
    height 0 !important
  .el-tabs__item
    font-size 18px
    line-height 30px
    height 30px
  .el-tag--mini
    display none
  .el-dialog.is-fullscreen
    overflow hidden !important
</style>