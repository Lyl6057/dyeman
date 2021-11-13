<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-04 16:44:32
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
        <el-button
          type="success"
          @click="saveAll"
          :disabled="form.clothState == 3"
          >{{ this.$t("public.save") }}</el-button
        >
        <el-button
          type="primary"
          @click="dialogVisible = true"
          :disabled="!detail.noteId"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="query(true)">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <el-button type="primary" @click="outExcel">导出</el-button>

        <el-tooltip
          class="item"
          effect="dark"
          content="同步勾选数据的储存位置,值为第一条勾选的数据"
          placement="right-start"
        >
          <el-button
            type="primary"
            @click="syncLoc"
            :disabled="selectList.length < 2"
            >同步储存位置</el-button
          >
        </el-tooltip>

        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
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
          :summary-method="summaryMethod"
          @selection-change="selectionChange"
          @sort-change="sortChange"
        >
          <!-- <template slot="menu" v-if="form.clothState != 3">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template> -->
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <view-container title="修改">
        <div class="btnList">
          <el-button
            type="success"
            @click="save"
            :disabled="form.clothState == 3"
            >{{ this.$t("public.save") }}</el-button
          >
          <el-button type="primary" @click="weighing">称重</el-button>
          <el-button type="warning" @click="dialogVisible = false">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form ref="form" :option="dlgOp" v-model="detail"></avue-form>
        </div>
      </view-container>
    </el-dialog>
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
import { mainForm, mainCrud, dlgForm } from "./data";
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
      dlgOp: dlgForm(this),
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
    query(type) {
      this.wLoading = true;
      if (type) {
        this.crud = [];
      }
      let { prop, order } = this.sort;
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
        // this.crud = _.concat(res.data.records, this.crud);
        this.crud = res.data.records;
        // this.crud.sort((a, b) => {
        //   return a.printedTime < b.printedTime ? 1 : -1;
        // });
        // if (this.crud.length > 0) {
        //   this.$refs.crud.setCurrentRow(this.crud[0]);
        // }
        // this.crud.forEach((item, i) => {
        //   item.index = i + 1;
        //   item.eachNumber = Number(item.eachNumber);
        // });
        this.page.total = res.data.total;
        // setTimeout(() => {
        this.wLoading = false;
        // }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.checkLabel = val.storeSiteCode;
      this.dialogVisible = true;
      // this.print();
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        if (e.data.indexOf(":") != -1) {
          _this.detail.clothWeight = Number(e.data.split(":")[0]);
        } else {
          _this.detail.clothWeight = e.data;
        }

        _this.detail.clothCheckTime = _this.$getNowTime("datetime");
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
    saveAll() {
      this.wLoading = true;
      this.crud.forEach((item, i) => {
        if (item.clothWeight > 0 && item.clothState === 0) {
          item.clothCheckTime = this.$getNowTime("datetime");
          item.clothState = 1;
        }
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            this.query();
            this.$tip.success(this.$t("public.bccg"));
          }
        });
      });
    },
    save() {
      this.wLoading = true;
      // this.crud.forEach((item, i) => {
      if (this.detail.clothWeight > 0 && this.detail.clothState === 0) {
        this.detail.clothCheckTime = this.$getNowTime("datetime");
        this.detail.clothState = 1;
      }
      update(this.detail).then((res) => {
        this.query();
        this.$tip.success(this.$t("public.bccg"));
      });
      // });
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
      // this.page.currentPage = 1;
      // this.crud = [];
      // this.$nextTick(() => {
      this.query();
      // });
    },
    cellClick(val) {
      if (this.ctrKey && this.checkLabel) {
        val.storeSiteCode = this.checkLabel;
      }
      this.detail = val;
      // this.oldData.$cellEdit = false;
      // // val.$cellEdit = true;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
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
          if (index == 10) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.realWeight);
            });
            sums[index] = "毛重：" + num.toFixed(1);
          }
          if (index == 11) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "重量：" + num.toFixed(1);
          }
          if (index == 12) {
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
    clothLength() {
      if (
        this.detail.gramWeight &&
        this.detail.breadth &&
        this.detail.realWeight
      ) {
        let gramWeight, breadth;

        this.$nextTick(() => {
          // if (this.form.gramWeightUnit == "Kg") {
          // 默认是 g
          // gramWeight = Number(this.form.realGramWeight);
          // } else {
          gramWeight =
            this.detail.gramWeight.indexOf("(") != -1
              ? Number(this.detail.gramWeight.split("(")[0]) / 1000
              : Number(this.detail.gramWeight) / 1000;
          // }

          // if (this.form.widthUnit == "INCH") {
          //   // 默认是 inch
          //   breadth = Number(this.form.clothWidth);
          // } else {
          breadth =
            this.detail.breadth.indexOf("(") != -1
              ? (Number(this.detail.breadth.split("(")[0]) * 2.54) / 100
              : (Number(this.detail.breadth) * 2.54) / 100;
          // }

          let weight = this.detail.realWeight;
          // if (this.form.weightUnit == "LBS") {
          //   weight = weight * 2.20462262;
          // }
          // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m

          this.detail.clothLengthValue = Number(
            (weight / gramWeight / breadth).toFixed(1)
          );
        });
      }
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
    this.form.clothState = 0;
    let _this = this;

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey) {
        _this.ctrKey = true;
      }
    });
    document.addEventListener("keyup", function (e) {
      if (e.key == "Control") {
        _this.ctrKey = false;
      }
    });
    _this.setCz();

    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     let _this = this;
    //     let dom = document.getElementsByClassName("el-table__body-wrapper")[0];
    //     // console.log(dom);
    //     dom.addEventListener("scroll", function () {
    //       if (dom.scrollHeight <= dom.clientHeight + dom.scrollTop) {
    //         _this.page.currentPage++;
    //         _this.query();
    //       }
    //     });
    //   }, 200);
    // });
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