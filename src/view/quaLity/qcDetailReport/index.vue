<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-22 13:50:59
 * @Description:
-->
<template>
  <div
    id="qcDeatilReport"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="成品码卡报表">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="query">{{
          this.$t("public.report")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="vatNo">
            <el-select
              v-model="form.vatNo"
              filterable
              remote
              reserve-keyword
              clearable
              default-first-option
              placeholder="请输入缸号"
              :remote-method="remoteMethod"
              :loading="vatLoading"
              @change="getLogWeight"
            >
              <el-option
                v-for="item in options"
                :key="item.vatNo"
                :label="item.vatNo"
                :value="item.vatNo"
              >
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
        >
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import { get, add, update, getRunJobByPage } from "./api";
export default {
  name: "qcDeatilReport",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wloading: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wloading = true;
      // let { prop, order } = this.sort;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      let data = JSON.parse(JSON.stringify(this.form));
      get(
        Object.assign(data, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          // clothState: this.form.clothState,
          cardType: 1,
        })
      ).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.crud.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1;
        });
        this.crud.forEach((item, i) => {
          // item.$cellEdit = true;
          item.index = i + 1;
        });
        // this.form.vatNo = this.form.vatNo.replace(/[!^%]/g, "");
        // this.form.clothChecker = this.form.clothChecker.replace(/[!^%]/g, "");
        // this.form.storeLoadCode = this.form.storeLoadCode.replace(/[!^%]/g, "");
        this.page.total = res.data.total;
        // console.log(this.form);
        // if (this.form.productNo.indexOf("!^%") != -1) {
        //   this.form.productNo = this.form.productNo.split("!^%")[0] || "";
        // }
        setTimeout(() => {
          this.$refs.crud.setCurrentRow(this.crud[0] || {});
          this.wloading = false;
        }, 200);
      });
    },
    remoteMethod(val) {
      this.wloading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.wloading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.runJobFk = res.data.records[0].runJobId;
            this.form.clothWeight = res.data.records[0].clothWeight;
          }
        });
      });
    },
  },
  updated() {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
