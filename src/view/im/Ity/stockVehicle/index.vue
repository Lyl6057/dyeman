<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-06 14:11:28
 * @Description: 
-->
<template>
  <div id="ityInventory">
    <view-container title="在库载具查询">
      <div class="btnList">
        <el-button type="primary" @click="getData">{{
          this.$t("public.query")
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
          :element-loading-text="loadLabel"
          v-loading="loading"
          @on-load="getData"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import { fetchStockVehicleByPage, fetchNoteStockVehicleByPage } from "./api";
import { formOp, crudOp } from "./data";
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSizes: [50, 100, 200, 500, 1000],
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      form: {
        type: 1
      },
      crudOp: crudOp(this),
      crud: [],
      chooseData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      this.crud = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let query = JSON.parse(JSON.stringify(this.form));
      query.palletCode = "!^%" + (query.palletCode || "");
      query.vatNo = "%" + (query.vatNo || "");
      query.weaveJobCode = "%" + (query.weaveJobCode || "");
      query.storageId = "%" + (query.storageId || "");
      (this.form.type == 1 ? fetchNoteStockVehicleByPage : fetchStockVehicleByPage)(
        Object.assign(query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        this.crud = res.data.records;
        this.crud.length === 0 && (this.loading = false);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (this.crud.length - 1 === i) {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        });
      });
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {},
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) {
        this.$refs["crud"].doLayout();
      }
    });
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'></style>