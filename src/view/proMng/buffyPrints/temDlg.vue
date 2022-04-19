<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-02 09:08:53
 * @Description: 
-->
<template>
  <div id="colorMng_Tem">
    <view-container
      title="布飞打印配置"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="print" :disabled="printCtr"
          >打印</el-button
        >
        <el-button type="primary" @click="setPreview">预览</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container title="打印预览(仅供参考)">
        <pre-view ref="preview" :detail="previewData"></pre-view>
      </view-container>
    </view-container>
  </div>
</template>
<script>
import { mainCrud } from "./data";
import { printBf } from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupplyEx } from "@/api/index";
import preview from "./preview";
export default {
  name: "",
  props: {
    detail: Object,
  },
  components: {
    preView: preview,
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      this.form = this.detail;
      this.form.printedTime = this.$getNowTime();
    },
    setPreview() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.previewData = JSON.parse(JSON.stringify(this.form));
          done();
        } else {
          this.$tip.error("请补充打印信息!");
          return;
        }
      });
    },
    print() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.$tip
            .cofirm(
              "是否确定打印布票號为 【 " +
                this.detail.noteCode +
                this.$t("iaoMng.delTle2"),
              this,
              {}
            )
            .then(() => {
              this.wLoading = true;
              printBf(this.form.noteId)
                .then((res) => {
                  setTimeout(() => {
                    this.$tip.success("打印成功");
                    this.wLoading = false;
                  });
                })
                .catch((err) => {
                  this.$tip.warning("打印失败");
                  this.wLoading = false;
                });
            })
            .catch((err) => {
              this.$tip.warning(this.$t("public.qxcz"));
            });
          done();
        } else {
          this.$tip.error("请补充打印信息!");
          return;
        }
      });
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
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
#colorMng_Tem
  // .formBox {
  // height: calc(100vh - 125px) !important;
  // }
#colorMng_Dlg
  .is-fullscreen
    overflow hidden !important
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
</style>