<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-07 09:41:59
 * @Description: 
-->
<template>
  <div
    id="clothFlyPrint"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="称重">
      <el-row class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>

        <!-- <el-button type="success" @click="print">打印</el-button> -->
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
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        >
          <template slot="menu">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template></avue-crud
        >
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
          @close="dialogVisible = false"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { webSocket } from "@/config/index.js";
import { get, add, update, del } from "./api";
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
      czsocket: "",
      weight: 0,
      czsocket: {},
      changeList: [],
      wLoading: false,
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
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;

        this.crud.sort((a, b) => {
          return a.printedTime < b.printedTime ? 1 : -1;
        });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.$cellEdit = true;
        });
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
      // this.print();
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      console.log(_this.czsocket);
      _this.czsocket.onmessage = function (e) {
        _this.weight = 500; //e.data;
      };
    },
    weighing() {
      if (this.czsocket.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      }
      setTimeout(() => {
        this.detail.clothWeight = this.weight;
      }, 200);
    },
    save() {
      this.wLoading = true;
      this.crud.forEach((item, i) => {
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.save"));
            }, 200);
          }
        });
      });
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
    this.query();
    this.setCz();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>