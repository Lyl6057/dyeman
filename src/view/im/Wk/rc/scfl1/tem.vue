<template>
  <div id="rcDetail">
    <!-- <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div> -->
    <el-row class="">
      <div class="btnList" style="margin-bottom: 2px">
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >{{ this.$t("public.save") }}</el-button
        >
        <!-- <el-button type="warning" @click="getDetail">取消</el-button>
      <el-button type="warning" @click="close">{{this.$t("public.close")}}</el-button> -->
      </div>
      <avue-crud
        ref="dlgcrud"
        :option="mxOp"
        v-loading="loading"
        :data="mx"
        :page.sync="page"
        @current-row-change="cellClick"
        @on-load="getDetail"
      ></avue-crud>
    </el-row>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="60%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F } from "./data";
import { getDIC, getDicT } from "@/config/index";
import choice from "@/components/choice";
import {
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
} from "@/api/im/Wk/rc";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
  },
  name: "",
  components: {
    choice: choice,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      detail: {},
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      canLeave: false,
      choiceV: false,
      choiceTle: "來胚布登記",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseAccessoriesinoid
      ) {
        this.mx = [];
        return;
      }
      this.loading = true;
      this.oldData = {};
      this.changeList = [];
      this.chooseData = {};
      this.mx = [];
      this.mxOp.showSummary = false;
      getScflDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseAccessoriesinFk: this.detail.whseAccessoriesinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        this.$refs.dlgcrud.setCurrentRow();
        if (this.mx.length === 0) {
          this.loading = false;
        }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          item.model = item.materialNum;
          item.itemspec = item.materialNum;
          if (index === this.mx.length - 1) {
            this.mxOp.showSummary = true;
            this.loading = false;
          }
        });
      });
    },
    add() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error("请先选择入库资料");
        return;
      } else if (!this.detail.whseAccessoriesinoid) {
        this.$tip.error("请先保存入库资料");
        return;
      }
      if (
        this.mx.length > 0 &&
        !this.mx[this.mx.length - 1].whseAccessoriesDtloid
      ) {
        return;
      }
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.mx.push({
        index: this.mx.length + 1,
        $cellEdit: true,
        custId: this.detail.custName,
        whseAccessoriesinFk: this.detail.whseAccessoriesinoid,
      });
      this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      this.iptChange(this.mx[this.mx.length - 1]);
      this.oldData = this.mx[this.mx.length - 1];
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseAccessoriesDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
            return;
          }
        }
      }
      this.$tip
        .cofirm("是否确定删除", this, {})
        .then(() => {
          delScflDetali(this.chooseData.whseAccessoriesDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].materialNum || !this.changeList[i].batchNo) {
          this.$tip.error("材料编号/批数不能为空!");
          this.canLeave = true;
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.whseAccessoriesDtloid) {
          updateScflDetali(item).then((res) => {});
        } else {
          addScflDetali(item).then((res) => {});
        }
      });
      this.changeList = [];
      this.getDetail();
      this.$tip.success(this.$t("public.bccg"));
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle === this.$t("choicDlg.xzscfl")) {
        this.choiceTarget.materialType = val.$basProductionaccFk;
      } else if (val.$basAdsuppliesFk) {
        this.choiceTarget.materialType = val.$basAdsuppliesFk;
      } else {
        this.choiceTarget.materialType = val.$basHardwareFk;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.choiceTarget.materialNum = val.hardwareId;

      // this.choiceTarget.model = val.hardwareId;
      // this.choiceTarget.itemspec = val.hardwareId;
      this.choiceTarget.unitQty = val.msUnit;
      this.oldData.$cellEdit = true;

      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[2].click();
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    // if (this.datas.type.split("_")[0] === "五金/行政采购") {
    //   let M1 = getDicT("basAdsuppliesarticles", "model", "hardwareId"),
    //     M2 = getDicT("basHardwarearticles", "model", "hardwareId"),
    //     I1 = getDicT("basAdsuppliesarticles", "itemspec", "hardwareId"),
    //     I2 = getDicT("basHardwarearticles", "itemspec", "hardwareId");
    //   setTimeout(() => {
    //     this.mxOp.column[5].dicData = M1.concat(M2);
    //     this.mxOp.column[4].dicData = I1.concat(I2);
    //   }, 1000);
    // }
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
}
</style>