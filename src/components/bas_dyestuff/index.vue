<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="showDlg"
      top="0vh"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeBefore"
      v-if="showDlg"
    >
      <!-- <view-container :title="dlgTle"> -->
      <!-- @tab-click="handleClick" -->
      <el-tabs type="border-card" v-model="tab">
        <el-tab-pane name="tab1" :label="dlgTle">
          <div class="btnList">
            <el-button type="primary" @click="choice">选择</el-button>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="warning" @click="close">{{
              this.$t("public.close")
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
              v-loading="loading"
              @on-load="query"
              @row-dblclick="handleRowDBLClick"
              @current-row-change="cellClick"
              @selection-change="selectionChange"
            >
            </avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- </view-container> -->
    </el-dialog>
  </div>
</template>
<script>
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import {
  getBasChemicalmat,
  getBasPigment,
  getBasHardwar,
  getBasAdsupp,
} from "./api";
import { mainForm, hardwareC } from "./data";
export default {
  name: "",
  components: {},
  props: {
    showDlg: Boolean,
    dlgTle: String,
  },
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      crud: [],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 207px)",
        refreshBtn: false,
        columnBtn: false,
        selection: true,
        page: true,
        column: [
          {
            prop: "index",
            label: "#",
            width: 50,
            align: "center",
          },
          {
            label: "编号",
            prop: "bcCode",
          },
          {
            label: "原料名称",
            prop: "bcMatname",
          },
          {
            label: "一级分类",
            prop: "bcClass",
            type: "select",
            dicData: getDIC("bas_chemicalClass"),
          },
          {
            label: "原料英文名称",
            prop: "bcMatengname",
          },

          {
            label: "色光",
            prop: "bcColor",
          },
          {
            label: "力份",
            prop: "bcForce",
          },
        ],
      },
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 130,
        menuBtn: false,
        menu: false,
        column: [
          {
            label: "配方类别",
            prop: "pfType",
            span: 6,
            placeholder: " ",
            type: "select",
            dicData: [
              {
                value: 0,
                label: "化工原料",
              },
              {
                value: 1,
                label: "颜料",
              },
            ],
            change: (val) => {
              this.$nextTick(() => {
                this.form.bcClass = "";
                this.query();
              });
            },
          },
          {
            label: "一级分类",
            prop: "bcClass",
            span: 6,
            placeholder: " ",
            type: "select",
            dicData: getDIC("bas_chemicalClass"),
          },
          {
            label: "编号",
            prop: "bcCode",
            span: 6,
            placeholder: " ",
          },
          {
            label: "原料名称",
            prop: "bcMatname",
            span: 6,
            placeholder: " ",
          },
        ],
      },
      pick: {},
      tab: "tab1",
      chooseData: [],
      getData: Function,
    };
  },
  watch: {},
  methods: {
    // 查询
    query() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.form.basAdsuppliesFk = this.form.basHardwareFk;
      if (this.dlgTle == "选择五金/行政用品") {
        if (this.form.pfType == 0) {
          this.getData = getBasHardwar;
          let data = getDicT(
            "basHardware",
            "topcategoryName",
            "basHardwareoid"
          );
          let data2 = getDicT(
            "basHardwareDtla",
            "seccategoryName",
            "basHardwareDtlaoid"
          );
          this.crudOp.column[4].prop = "basHardwareFk";
          this.crudOp.column[5].prop = "basHardwareDtlaFk";
          this.crudOp.column[4].dicData = data;
          this.crudOp.column[5].dicData = data2;
          this.formOp.column[1].dicData = data;
        } else {
          this.getData = getBasAdsupp;
          let data = getDicT(
            "basAdsupplies",
            "topcategoryName",
            "basAdsuppliesoid"
          );
          let data2 = getDicT(
            "basAdsuppliesDtla",
            "seccategoryName",
            "basAdsuppliesDtlaoid"
          );
          this.crudOp.column[4].prop = "basAdsuppliesFk";
          this.crudOp.column[5].prop = "basAdsuppliesDtlaFk";
          this.crudOp.column[4].dicData = data;
          this.crudOp.column[5].dicData = data2;
          this.formOp.column[1].dicData = data;
        }
      } else {
        if (this.form.pfType == 0) {
          this.getData = getBasChemicalmat;
          let data = getDIC("bas_chemicalClass");
          this.crudOp.column[3].dicData = data;
          this.formOp.column[1].dicData = data;
        } else {
          this.getData = getBasPigment;
          let data = getDIC("bas_PigmentClass");
          this.crudOp.column[3].dicData = data;
          this.formOp.column[1].dicData = data;
        }
      }

      this.getData(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        if (this.crud === undefined || this.crud.length === 0) {
          this.loading = false;
          return;
        }
        this.crud.forEach((item, index) => {
          item.index = index + 1;
          if (index === this.crud.length - 1) {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        });
      });
    },
    // 选择
    choice() {
      this.$emit(
        "choiceData",
        this.chooseData.length > 0 ? this.chooseData : this.pick
      );
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
    handleRowDBLClick(val) {
      // this.pick = val;
      // this.choice();
    },
    cellClick(val) {
      this.pick = val;
    },
    selectionChange(val) {
      this.chooseData = val;
    },
  },
  created() {},
  mounted() {
    this.form.pfType = 0;
    if (this.dlgTle == "选择五金/行政用品") {
      this.crudOp = hardwareC;
      this.formOp = mainForm(this);
    }
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#choiceDlg {
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label {
    font-size: 16px;
    height: 30px;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .el-dialog__header {
    padding: 0px;
  }

  .el-dialog__headerbtn {
    top: 5px;
    color: #000;
    font-size: 22px;
    z-index: 999;
  }

  .formBox {
    margin-bottom: 0px;
  }

  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu {
    min-height: 0 !important;
    height: 0 !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }

  .el-tag--mini {
    display: none;
  }
}
</style>