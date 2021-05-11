<!--
 * @Author: Lyl
 * @Date: 2021-03-25 01:27:50
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-31 16:36:47
 * @Description: 
-->

<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="choiceV"
    >
      <view-container :title="$t('choicDlg.xzcl')" v-loading="loading">
        <div class="btnList">
          <el-button type="primary" @click="choice">{{
            this.$t("public.choose")
          }}</el-button>
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form ref="form" :option="choiceF" v-model="form"></avue-form>
        </div>
        <div class="crudBox">
          <avue-crud
            ref="crud"
            :option="choiceC"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          >
          </avue-crud>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>

<script>
import { getSx, getPb, getScfl, getHgyl, getYl, getWj, getXz } from "./api";
import { formOp, sxOp, pbOp, flOp, hgylOp, ylOp, wjOp, xzOp } from "./data";
export default {
  name: "",
  components: {},
  props: {
    choiceV: Boolean,
    choiceQ: Object,
  },
  watch: {
    "form.kindId": {
      handler(newVal, oldVal) {
        switch (newVal) {
          case "CPB":
            this.$tip.error(this.$t("choicDlg.zwsj"));
            return;
          case "RL":
            this.$tip.error(this.$t("choicDlg.zwsj"));
            return;
          case "SX":
            this.choiceC = sxOp(this);
            this.func.get = getSx;
            this.choiceF.column[1].prop = "yarnsId";
            this.choiceF.column[2].prop = "yarnsName";
            break;
          case "PB":
            this.choiceC = pbOp(this);
            this.func.get = getPb;
            this.choiceF.column[1].prop = "calicoId";
            this.choiceF.column[2].prop = "calicoName";
            break;
          case "FL":
            this.choiceC = flOp(this);
            this.func.get = getScfl;
            this.choiceF.column[1].prop = "hardwareId";
            this.choiceF.column[2].prop =
              this.lang === "1"
                ? "cnnamelong"
                : this.lang === "2"
                ? "ennamelong"
                : "vinamelong";
            break;
          case "RHL":
            this.choiceF.column[1].prop = "bcCode";
            this.choiceF.column[2].prop =
              this.lang === "1"
                ? "cnnamelong"
                : this.lang === "2"
                ? "ennamelong"
                : "vinamelong";
            this.choiceC = hgylOp(this);
            this.func.get = getHgyl;
            break;
          case "RLL":
            this.choiceF.column[1].prop = "bcCode";
            this.choiceF.column[2].prop =
              this.lang === "1"
                ? "cnnamelong"
                : this.lang === "2"
                ? "ennamelong"
                : "vinamelong";
            this.choiceC = ylOp(this);
            this.func.get = getYl;
            break;
          case "WJ":
            this.choiceF.column[1].prop = "hardwareId";
            this.choiceF.column[2].prop = "chinName";
            this.choiceC = wjOp(this);
            this.func.get = getWj;
            break;
          case "XZ":
            this.choiceF.column[1].prop = "hardwareId";
            this.choiceF.column[2].prop = "chinName";
            this.choiceC = xzOp(this);
            this.func.get = getXz;
            break;
          default:
            break;
        }
        this.query();
      },
    },
  },
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      choiceC: sxOp(this),
      crud: [],
      choiceF: formOp(this),
      form: {},
      getData: Function,
      tab: "tab1",
      chooseData: [],
      func: {
        get: getSx,
      },
      lang: this.$store.state.lang,
    };
  },
  methods: {
    query() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      for (var key in this.choiceQ) {
        if (this.choiceQ[key] === "") {
          delete this.choiceQ[key];
        }
      }
      this.func
        .get(
          Object.assign(this.form, this.choiceQ, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length == 0) {
            this.loading = false;
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
      this.chooseData.kindId = this.form.kindId;
      this.$emit("choiceData", this.chooseData);
    },
    close() {
      this.$emit("close");
    },
    cellClick(val) {
      this.chooseData = val;
    },
    handleRowDBLClick(val) {},
  },
  created() {},
  mounted() {
    this.form.kindId = "SX";
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

  .el-dialog.is-fullscreen {
    overflow: hidden !important;
  }
}
</style>