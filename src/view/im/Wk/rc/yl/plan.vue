<template>
  <div id="outPlan">
    <div class="btnList">
      <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
      <el-button type="success" @click="setOorder">生成入庫單</el-button>
      <el-button type="primary" @click="getData">查询</el-button>
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
        @row-click="rowClick"
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
        :rcType="'whse_in'"
        @close="ruleV = false"
      ></rule-dlg>
    </el-dialog>
  </div>
</template>
<script>
import { planCrud, planForm } from "./data";
import rule from "@/components/rule";
import tem from "./tem";
import { baseCodeSupply } from "@/api/index";
import {
  getMaterial,
  getPbOutPlan,
  addMaterial,
  addPbDetali,
  getPbPlan,
} from "@/api/im/Wk/cc/pb";
import { getviPurchNostock } from "@/api/im/Wk/rhl";
export default {
  name: "",
  components: {
    ruleDlg: rule,
    tem,
  },
  props: {},
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
      chooseData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      getviPurchNostock(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        if (this.crud.length === 0) {
          this.loading = false;
        }

        this.crud.forEach((item, index) => {
          item.index = index + 1;
          item.check = false;
          item.$cellEdit = true;
          if (index === this.crud.length - 1) {
            this.loading = false;
          }
        });
      });
    },
    setOorder() {
      if (this.selected.length === 0) {
        this.$tip.warning("请先选择送货单！");
        return;
      }
      this.$emit("add", this.selected);
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
              .getElementById("outPlan")
              .getElementsByClassName("el-checkbox__input").length;
            i++
          ) {
            document
              .getElementById("outPlan")
              .getElementsByClassName("el-checkbox__input")[i].style.display =
              "none";
          }
          this.selected.forEach((items, j) => {
            for (
              let i = 0;
              i <
              document
                .getElementById("outPlan")
                .getElementsByClassName("el-checkbox__input").length;
              i++
            ) {
              if (
                i === items.index ||
                i ===
                  items.index +
                    document
                      .getElementById("outPlan")
                      .getElementsByClassName("el-checkbox__input").length /
                      2
              ) {
                document
                  .getElementById("outPlan")
                  .getElementsByClassName("el-checkbox__input")[
                  i
                ].style.display = "block";
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
              .getElementById("outPlan")
              .getElementsByClassName("el-checkbox__input").length;
            i++
          ) {
            document
              .getElementById("outPlan")
              .getElementsByClassName("el-checkbox__input")[i].style.display =
              "block";
          }
        });
      }
    },
    cellClick() {
      this.loading = true;
      setTimeout(() => {
        // this.chooseData.check = !this.chooseData.check;
        this.crud.forEach((item, i) => {
          if (
            item.purNo === this.chooseData.purNo &&
            item.deliNo === this.chooseData.deliNo &&
            item.viPurchNostockViewoid != this.chooseData.viPurchNostockViewoid
          ) {
            this.$nextTick(() => {
              item.check = this.chooseData.check;
              this.$set(item, "checl", this.chooseData.check);
            });
          } else if (
            item.viPurchNostockViewoid != this.chooseData.viPurchNostockViewoid
          ) {
            this.$nextTick(() => {
              // if (this.chooseData.check) {
              // item.$cellEdit = false;
              // this.$set(item, "$cellEdit", false);
              // } else {
              // item.$cellEdit = true;
              // this.$set(
              //   item,
              //   "$cellEdit",
              //   this.chooseData.check ? false : true
              // );
              // }
              // this.$set(item, "check", false);
            });
          }
          if (i === this.crud.length - 1) {
            this.loading = false;
          }
        });
      }, 200);
    },
    rowClick(val) {
      this.chooseData = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    // updateList() {
    //   this.$emit("save2reset");
    // },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#outPlan {
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }

  .el-tag--mini {
    display: none;
  }
}
</style>