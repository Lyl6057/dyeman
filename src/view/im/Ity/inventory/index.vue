<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-04 18:07:08
 * @Description: 
-->
<template>
  <div id="ityInventory">
    <view-container
      title="库存查询"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
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
          v-loading="loading"
          @on-load="getData"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import { getRhl, getRll } from "./api";
import { getDIC, getDicT, getXDicT } from "@/config/index";
import { formOp, crudOp, formTemOp } from "./data";
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      form: {},
      crudOp: crudOp(this),
      crud: [],
      detail: {},
      chooseData: {},
      isAdd: false,
      allData: [],
      getFun: null,
      chemicalData: getXDicT("BasChemicalmatNew"), // 化工原料
      pigmentData: getXDicT("basPigment"), // 颜料
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      switch (this.form.type) {
        case "RHL":
          this.getFun = getRhl;
          break;
        case "RLL":
          this.getFun = getRll;
          break;
        default:
          this.crud = [];
          this.loading = false;
          return;
          break;
      }
      this.getFun(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        let data = res.data;
        this.page.total = data.total;
        this.crud = data.records;
        this.crud.length === 0 ? (this.loading = false) : "";
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          // item.materialName = item.materialId;
          // item.oldpooccupyqty = item.oldpooccupyqty.toFixed(2);
          // item.openingQty = item.openingQty.toFixed(2);
          if (this.crud.length - 1 === i) {
            this.loading = false;
          }
        });
      });
    },
    add() {
      this.isAdd = false;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.isAdd = true;
      this.detail = this.chooseData;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.chooseData = val;
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseMaterialopeningoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
      } else {
        this.$tip
          .cofirm(
            "是否确定删除材料編號为 【 " +
              this.chooseData.materialId +
              this.$t("iaoMng.delTle2"),
            this,
            {}
          )
          .then(() => {
            this.chooseData.openingQty = 0;
            this.chooseData.oldpooccupyqty = 0;
            update(this.chooseData).then((res) => {
              if (res.data.code === 200) {
                updateStock({
                  materialId: this.form.materialId,
                  unitId: this.form.unitId,
                }).then((Rres) => {
                  del(this.chooseData.whseMaterialopeningoid)
                    .then((delRes) => {
                      if (delRes.data.code === 200) {
                        this.$tip.success(this.$t("public.sccg"));
                        this.getData();
                      } else {
                        this.$tip.error(this.$t("public.scsb"));
                      }
                    })
                    .catch((err) => {
                      this.$tip.error(this.$t("public.scsb"));
                    });
                });
              }
            });
          })
          .catch((err) => {
            this.$tip.warning(this.$t("public.qxcz"));
          });
      }
    },
    temClose(val) {
      if (val) {
        this.getData();
      }
      this.dialogVisible = false;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {
    this.form.type = "RHL";
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#ityInventory {
  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    // background-color: rgb(2, 26, 60);
    overflow: hidden !important;
  }
}
</style>