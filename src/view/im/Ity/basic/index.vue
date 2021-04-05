<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-02 09:57:07
 * @Description: 
-->
<template>
  <div id="ityBasic">
    <view-container
      title="库存期初定义"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button
          type="success"
          :disabled="Object.keys(chooseData).length === 0"
          @click="handleRowDBLClick(chooseData)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length === 0"
          >{{ this.$t("public.del") }}</el-button
        >
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
    <el-dialog
      id="ityDlg"
      :visible.sync="dialogVisible"
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <tem-dlg
        ref="tem-dlg"
        :detail="detail"
        :isAdd="isAdd"
        @close="temClose"
      ></tem-dlg>
    </el-dialog>
  </div>
</template>
<script>
import { add, get, update, del, updateStock } from "./api";
import { getDIC, getDicT } from "@/config/index";
import temDlg from "./temDlg";
import { formOp, crudOp, formTemOp } from "./data";
export default {
  name: "",
  components: {
    temDlg: temDlg,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSize: 10,
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
      yarnType: getDIC("bas_yarnsType"),
      calicoType: getDIC("bas_calicoType"),
      yarnData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
      calicoData: getDicT("basCalico", "calicoName", "calicoId"),
      chemicalData: getDicT("BasChemicalmatNew", "cnnamelong", "bcCode"), // 化工原料
      productiveData: getDicT(
        "basProductivesupplies",
        "chinName",
        "hardwareId"
      ), // 生产辅料
      basHardwareData: getDicT("basHardwarearticles", "chinName", "hardwareId"),
      basAdsuppliesarticlesData: getDicT(
        "basAdsuppliesarticles",
        "chinName",
        "hardwareId"
      ),
      allData: [],
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
      get(
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
          item.materialName = item.materialId;
          item.oldpooccupyqty = item.oldpooccupyqty.toFixed(2);
          item.openingQty = item.openingQty.toFixed(2);
          if (this.crud.length - 1 === i) {
            setTimeout(() => {
              this.$nextTick(() => {
                this.crudOp.column[2].dicData = this.yarnType.concat(
                  this.calicoType
                );
                this.allData = this.yarnData
                  .concat(this.calicoData)
                  .concat(this.chemicalData)
                  .concat(this.productiveData)
                  .concat(this.basHardwareData)
                  .concat(this.basAdsuppliesarticlesData);
                this.crudOp.column[4].dicData = this.allData;
              });
              this.loading = false;
            }, 200);
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
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#ityDlg {
  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    // background-color: rgb(2, 26, 60);
    overflow: hidden !important;
  }
}
</style>