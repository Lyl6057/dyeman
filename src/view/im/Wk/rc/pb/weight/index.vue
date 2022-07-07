<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 10:06:26
 * @Description: 
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <el-row class="btnList">
      <el-button type="success" @click="save">{{
        this.$t("public.save")
      }}</el-button>

      <el-button type="primary" @click="query">{{
        this.$t("public.query")
      }}</el-button>
      <el-button type="primary" @click="print">打印</el-button>
      <el-button type="primary" @click="outExcel">导出</el-button>
      <el-button type="warning" @click="close">{{
        this.$t("public.close")
      }}</el-button>
    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
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
        @sort-change="sortChange"
      >
      </avue-crud>
    </el-row>

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
import { webSocket } from "@/config/index.js";
import { get, add, update, del, getJob, updateNote } from "./api";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 0,
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        currentPage: 1,
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      prsocket: "",
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      pdfDlg: false,
      pdfUrl: "",
      ctrKey: false,
      checkLabel: "",
      sort: {},
    };
  },
  watch: {},
  methods: {
    query() {
      let { prop, order } = this.sort;
      this.wLoading = true;
      // for (let key in this.form) {
      //   if (!this.form[key]) {
      //     delete this.form[key];
      //   }
      // }
      order
        ? (this.form.sort = prop + (order == "descending" ? ",1" : ",0"))
        : delete this.form["sort"];
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
        })
      ).then((res) => {
        this.crud = res.data.records;
        // this.crud.sort((a, b) => {
        //   return a.printedTime < b.printedTime ? 1 : -1;
        // });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.eachNumber = Number(item.eachNumber);
          // item.$cellEdit = true;
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.checkLabel = val.storeSiteCode;
      // this.print();
    },
    save() {
      this.wLoading = true;
      let _this = this;
      this.crud.forEach((item, i) => {
        if (item.clothWeight > 0 && item.clothState === 0) {
          item.clothCheckTime = _this.$getNowTime("datetime");
          item.clothState = 1;
        }
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.query();

              this.$tip.success(this.$t("public.save"));
            }, 200);
          }
        });
      });
    },
    syncLoc() {
      this.selectList.forEach((item) => {
        item.storeSiteCode = this.selectList[0].storeSiteCode;
      });
    },
    print() {
      let url = qs.stringify(this.form);
      if (this.crud.length) {
        this.pdfDlg = true;
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proClothNote/Summarypreview?" +
          url +
          "&rows=" +
          this.page.pageSize +
          "&start=" +
          this.page.currentPage +
          "&isPrinted=true";
      } else {
        this.$tip.error("请先選擇布飞信息!");
        return;
      }
    },
    outExcel() {
      this.$refs.crud.rowExcel();
    },
    sortChange(val) {
      this.sort = val;
      this.query();
    },
    cellClick(val) {
      if (this.ctrKey && this.checkLabel) {
        val.storeSiteCode = this.checkLabel;
      }
      this.detail = val;
      this.oldData.$cellEdit = false;
      // val.$cellEdit = true;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
    },
    remoteMethod(val) {
      if (!val) {
        return;
      }
      getJob({
        weaveJobCode: val,
        rows: 10,
        start: 1,
      }).then((res) => {
        this.options = res.data.records;
      });
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    selectionChange(list) {
      this.selectList = list;
    },
  },
  updated() {
    // this.$nextTick(() => {
    //   this.$refs["crud"].doLayout();
    // });
  },
  created() {},
  mounted() {
    this.form.clothState = 2;
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight {
  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }
}
</style>