<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-27 09:10:20
 * @Description: 
-->
<template>
  <div id="ldOrderDlg">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '唛头信息'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="print" :disabled="!form.markId"
          >打印</el-button
        >
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
    </view-container>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="100%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
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
        <embed
          id="pdf"
          style="width: 100vw; height: calc(100vh - 80px)"
          :src="pdfUrl"
        />
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud, pfCrud, gyCrud, cpForm } from "./data";
import { add, update } from "./api";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      cpForm: cpForm(this),
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: "选择染整工单",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      code: "",
      pfCrud: pfCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.originPlace = "06";
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        for (let key in this.form) {
          if (this.form[key] == "undefined" || !this.form[key]) {
            delete this.form[key];
          }
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (
                this.form[key] == "undefined" ||
                this.form[key] == undefined ||
                this.form[key] == ""
              ) {
                delete this.form[key];
              }
            }
            this.form.custName = this.form.$custCode;
            if (this.form.markId) {
              // update
              // this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              // this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.markId = res.data.data;

                  this.$emit("refresh");
                  done();
                  this.wLoading = false;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  done();
                  this.wLoading = false;
                  this.$tip.error(this.$t("public.bcsb"));
                }
                // setTimeout(() => {
                //   this.wLoading = false;

                // }, 200);
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充唛头信息!");
          return;
        }
      });
    },
    print() {
      this.$emit("print");
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择染整工单") {
        this.form.vatNo = val.vatNo;
        this.form.custCode = val.custCode;
        this.form.fabFabrics = val.fabName;
        this.form.fabComponents = val.fabElements;
        this.form.poNo = val.salPoNo;
        this.form.custColor = val.colorCode;
        this.form.factoryColor = val.colorCode;
        this.form.colorName = val.colorName;
        this.form.sideFabWidth = val.breadthBorder
          ? Number(val.breadthBorder.match(/\d+/g)[0])
          : "";
        this.form.realFabWidth = val.breadthActual
          ? Number(val.breadthActual.match(/\d+/g)[0])
          : "";
        this.form.beforeGramWeight = val.gramWeightBefor
          ? Number(val.gramWeightBefor.match(/\d+/g)[0])
          : "";
        this.form.afterGramWeight = val.gramWeightAfter
          ? Number(val.gramWeightAfter.match(/\d+/g)[0])
          : "";
      } else {
        this.form.colorName = val.colorName;
        this.form.colorCode = val.colorCode;
        this.form.custCode = val.custCode;
        this.form.fabricName = val.fabricDesc;
        this.form.fabricCompone = val.fiberComp;
        this.form.weaveJobCode = val.weaveJobCode;
        this.form.tubeDiam = val.cylinderInch;
        this.form.needleDist = val.guage;
        this.form.yarnLength = val.yarnLength;
        this.form.yarnCard = val.yarnBrand;
        this.form.yarnNumber = val.yarnBatchNo;
        this.form.yarnCylinderNumber = val.yarnCylinder;
        this.form.breadth = Number(val.breadth.replace(/[^0-9]/gi, ""));
        this.form.gramWeight = val.gramWeight;
        this.form.proWeightAfter = val.gramWeight;
        this.form.proShrinkHorizontal = val.horizonShrink;
        this.form.proShrinkVertical = val.verticalShrink;
      }

      this.choiceV = false;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-tooltip__popper {
  font-size: 16px !important;
}

#ldOrderDlg {
  overflow: hidden;

  .avue-group__header {
    margin-bottom: 15px !important;
    // margin-top: -5px;
    height: 30px;
  }

  .formBox {
    height: calc(100vh - 75px) !important;
    overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>