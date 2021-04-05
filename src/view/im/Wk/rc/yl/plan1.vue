<template>
  <div id="outPlan">
    <div class="btnList">
      <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
      <el-button type="success" @click="setOorder">{{
        $t("iaoMng.scrkd")
      }}</el-button>
      <el-button type="primary" @click="getData">{{
        this.$t("public.query")
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
      test: [],
      test: null,
      chooseData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      getviPurchNostock(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud[0].purNo = this.crud[1].purNo;
        this.crud[0].deliNo = this.crud[1].deliNo;
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
      this.$emit("add", this.selected);
    },
    selectionChange(val) {
      if (val.length === 1) {
        val[0].check = true;
        this.crud.forEach((item, i) => {
          if (
            item.purNo === val[0].purNo &&
            item.deliNo === val[0].deliNo &&
            item.index != val[0].index
          ) {
            // this.selected.push(item);
            console.log(item);
            item.check = true;
            this.$refs.crud.toggleSelection([item]);
            // this.$nextTick(() => {
            //   this.crudOp.selectable = (row, index) => {
            //     return index === i;
            //   };
            // });
          }
          // else {
          //   val[0].checked = false;
          // }
        });
      } else {
      }
      if (!val[0].check) {
        this.$refs.crud.toggleSelection();
      }

      // // this.$refs.crud.toggleSelection(val);
    },
    cellClick() {
      this.loading = true;
      setTimeout(() => {
        console.log(this.chooseData.check);
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