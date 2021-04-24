<!--
 * @Author: Lyl
 * @Date: 2021-04-23 09:58:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-23 14:03:06
 * @Description: 
-->
<template>
  <div
    id="prowovenOutput"
    v-loading="loading"
    :element-loading-text="$t('public.loading')"
  >
    <view-container title="订单资料">
      <div class="btnList">
        <el-button type="success" @click="check">{{
          $t("public.choose")
        }}</el-button>
        <el-button type="primary" @click="query">{{
          $t("public.query")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          $t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          @on-load="query"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import { poForm, poCrud } from "./data";
import { getPo } from "./api";
export default {
  name: "prowovenOutput",
  components: {},
  data() {
    return {
      formOp: poForm(this),
      form: {},
      crudOp: poCrud(this),
      crud: [],
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
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
      getPo(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          let resData = res.data;
          this.crud = resData.rows;
          this.page.total = resData.total;
          this.crud.forEach((item, i) => {
            item.fabId = item.salPooid;
            item.fabName = item.salPooid;
            item.colorName = item.salPooid;
            item.index = i + 1;
          });
          setTimeout(() => {
            this.loading = false;
          }, 200);
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    check() {
      this.$emit("check", this.chooseData);
    },
    close() {
      this.$emit("close");
    },
    cellClick(val) {
      this.chooseData = val;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#prowovenOutput {
}
</style>