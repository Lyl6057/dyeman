<template>
  <div id="deliOutPlan">
    <div class="btnList">
      <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
      <el-button type="success" @click="setOorder" v-if="!upDate">{{
        $t("iaoMng.scrkd")
      }}</el-button>
      <el-button type="success" @click="check" v-if="upDate">{{
        this.$t("public.choose")
      }}</el-button>
      <el-button type="primary" @click="getData">{{
        this.$t("public.query")
      }}</el-button>
      <el-button type="warning" @click="close">{{
        this.$t("public.close")
      }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <el-row class="crudBox">
      <avue-crud
        ref="crud"
        id="crud"
        :option="crudOp"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
        @selection-change="selectionChange"
        @on-load="getData"
      >
      </avue-crud>
    </el-row>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="ruleV"
      append-to-body
      :close-on-click-modal="false"
      v-if="ruleV"
    >
      <rule-dlg
        ref="rule"
        :rcType="everyThing.code"
        @close="ruleV = false"
      ></rule-dlg>
    </el-dialog>
  </div>
</template>
<script>
import { planCrud, planForm } from "./data";
import rule from "@/components/rule";
import { baseCodeSupply } from "@/api/index";
export default {
  name: "",
  components: {
    ruleDlg: rule,
  },
  props: {
    everyThing: Object,
    data: String,
    upDate: Boolean,
    upDateQuery: Object,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      form: {},
      formOp: planForm(this),
      crudOp: planCrud(this),
      crud: [],
      planV: false,
      ruleV: false,
      sxV: false,
      selected: [],
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      // this.crudOp.height = "calc(100vh - 208px)";
      // this.crudOp.selection = false;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      if (this.upDate) {
        this.upDateQuery.yarnsId = this.form.yarnsId;
        this.form = this.upDateQuery;
        this.form.poNo = this.upDateQuery.purNo;
      }
      this.everyThing
        .getPlan(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length === 0) {
            this.loading = false;
          }
          this.crud.forEach((item, index) => {
            item.index = index + 1;
            item.calicoName = item.clothName;
            item.batchNo = item.batchNumber || item.batchNo;
            item.chemicalId = item.bcCode;
            item.chemicalName = item.cnnamelong;
            item.check = false;
            // item.$cellEdit = true;
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                // this.crudOp.selection = true;
                this.loading = false;
              }, 200);
            }
          });
        });
    },
    setOorder() {
      if (this.selected.length === 0) {
        this.$tip.warning(this.$t("iaoMng.qxzshd"));
        return;
      }
      this.$emit("add", this.selected);
    },
    check() {
      this.$emit("check", this.selected);
    },
    selectionChange(val) {
      if (val.length === 1) {
        this.selected.push(val[0]);
        this.crud.forEach((item, i) => {
          if (
            item.purNo === val[0].purNo &&
            item.deliNo === val[0].deliNo &&
            item.index != val[0].index
          ) {
            this.selected.push(item);
            this.$refs.crud.toggleSelection([item]);
          }
          for (
            let i = 0;
            i <
            document
              .getElementById("deliOutPlan")
              .getElementsByClassName("el-checkbox__input").length;
            i++
          ) {
            document
              .getElementById("deliOutPlan")
              .getElementsByClassName("el-checkbox__input")[i].style.display =
              "none";
          }
          this.selected.forEach((items, j) => {
            for (
              let i = 0;
              i <
              document
                .getElementById("deliOutPlan")
                .getElementsByClassName("el-checkbox__input").length;
              i++
            ) {
              if (
                i === items.index ||
                i ===
                  items.index +
                    document
                      .getElementById("deliOutPlan")
                      .getElementsByClassName("el-checkbox__input").length /
                      2
              ) {
                document
                  .getElementById("deliOutPlan")
                  .getElementsByClassName("el-checkbox__input")[
                  i
                ].style.display = "inline-block";
              }
            }
          });
        });
      } else if (this.selected.length != val.length) {
        this.$refs.crud.toggleSelection();
        this.selected = [];
        this.$nextTick(() => {
          for (
            let i = 0;
            i <
            document
              .getElementById("deliOutPlan")
              .getElementsByClassName("el-checkbox__input").length;
            i++
          ) {
            document
              .getElementById("deliOutPlan")
              .getElementsByClassName("el-checkbox__input")[i].style.display =
              "inline-block";
          }
        });
      }
    },
    close() {
      if (this.upDate) {
        this.$emit("close");
      } else {
        document.getElementsByClassName("el-dialog__headerbtn")[0].click();
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#deliOutPlan {
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }

  .el-tag--mini {
    display: none;
  }

  .el-table__fixed-header-wrapper tr th:first-child .el-checkbox .el-checkbox__inner { // 不可多選
    background-color: #edf2fc !important;
    border-color: #DCDFE6 !important;
    cursor: not-allowed !important;
  }
}
</style>