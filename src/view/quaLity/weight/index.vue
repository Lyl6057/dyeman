<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-05 08:09:55
 * @Description: 
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="称重记录">
      <el-row class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>

        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="weaveJobCode">
            <!-- {{ item }} -->
            <el-select
              v-model="form.weaveJobCode"
              filterable
              remote
              reserve-keyword
              allow-create
              placeholder=" "
              :remote-method="remoteMethod"
              :loading="eloading"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.weaveJobId"
                :label="item.weaveJobCode"
                :value="item.weaveJobCode"
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
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
          :summary-method="summaryMethod"
          @selection-change="selectionChange"
        >
          <template slot="menu">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template></avue-crud
        >
      </el-row>
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
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { webSocket } from "@/config/index.js";
import qs from "qs";
import { get, add, update, del, getJob, updateNote } from "./api";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 10,
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
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
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
    handleRowDBLClick(val) {
      this.detail = val;
      // this.print();
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        _this.detail.clothWeight = e.data;
      };
    },
    weighing() {
      if (this.czsocket.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      } else {
        this.czsocket.send("weight");
      }
      // setTimeout(() => {
      //   this.detail.clothWeight = this.weight;
      // }, 200);
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
    cellClick(val) {
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
    summaryMethod({ columns, data }) {
      const sums = [];
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if (index == 0) {
            sums[index] = "合計";
          }
          if (index == 2) {
            let num = 0;
            this.selectList.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "選中重量：" + num.toFixed(1);
          }
          if (index == 8) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.realWeight);
            });
            sums[index] = "毛重：" + num.toFixed(1);
          }
          if (index == 9) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "重量：" + num.toFixed(1);
          }
          if (index == 10) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.qcTakeOut);
            });
            sums[index] = "扣减：" + num.toFixed(1);
          }
        });
      }
      return sums;
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  created() {},
  mounted() {
    // this.query();
    this.setCz();
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