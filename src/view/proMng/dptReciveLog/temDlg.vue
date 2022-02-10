<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-07 18:32:31
 * @Description: 
-->
<template>
  <div id="techCodeTem">
    <view-container
      title="新增收单日志"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
      class="not-number-icon"
    >
      <div class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="Bảo tồn"
          placement="top-start"
        >
          <el-button type="success" @click="save" :loading="wLoading">{{
            $t("public.save")
          }}</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="đóng"
          placement="top-start"
        >
          <el-button type="warning" @click="close">{{
            $t("public.close")
          }}</el-button>
        </el-tooltip>
        <!-- <el-button type="primary" @click="checkOrder">选择订单号</el-button> -->
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="runJobFk">
            <el-select
              v-model="form.runJobFk"
              filterable
              remote
              reserve-keyword
              clearable
              default-first-option
              placeholder="请输入缸号"
              :remote-method="remoteMethod"
              :loading="vatLoading"
            >
              <el-option
                v-for="item in options"
                :key="item.runJobId"
                :label="item.vatNo"
                :value="item.runJobId"
              >
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
    </view-container>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud } from "./data";
import { add, getRunJobByPage } from "./api";
export default {
  name: "techCodeTem",
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
      formOp: dlgForm(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      dlgWidth: "60%",
      loading: false,
      vatLoading: false,
      options: [],
    };
  },
  watch: {},
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.runJobFk = res.data.records[0].runJobId;
          }
        });
      });
    },
    getData() {
      this.form = this.detail;
      // this.form.acceptStaff = this.$store.state.userOid;
      this.form.acceptStaff = parent.userID;
      this.form.acceptDate = this.$getNowTime("datetime");
      this.form.dptworkProcessFk = "sk";
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            // update
            this.form.vatNo = this.form.$runJobFk;
            add(this.form).then((res) => {
              if (res.data.code == 200) {
                this.wLoading = false;

                this.$tip.success(this.$t("public.bccg"));
                this.$emit("refresh");
                this.$emit("close");
              } else {
                this.$tip.error(this.$t("public.bcsb"));
              }
            });
            setTimeout(() => {
              this.wLoading = false;
              done();
            }, 200);
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充收单信息!");
          return;
        }
      });
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      // this.check();
      // this.visible = false;
    },

    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  mounted() {
    // document
    //   .getElementsByClassName("el-upload el-upload--text")[0]
    //   .getElementsByTagName("span")[0].innerHTML = "选择图片";
    this.getData();
    this.remoteMethod("");
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#imgDlg
  overflow auto !important
.image-remove
  position absolute
  color red
  font-size 24px
  width 30px
  height 30px
  text-align center
  top 5px
  left calc(100% - 50px)
  cursor pointer
#techCodeTem
  .watermark
    position absolute
    bottom 0
    left 0
    font-size 48px
    font-weight 700
    color #ccc
    height 200px
    width 100%
    line-height 200px
    text-align center
    z-index 1
  .img
    cursor pointer
    z-index 100
  .el-input-number__decrease, .el-input-number__increase
    display none
  .avue-form__row
    padding 0 !important
  .el-input-number__decrease, .el-input-number__increase
    display none
  .el-input-number .el-input__inner
    text-align right !important
  .el-input-number.is-controls-right .el-input__inner
    padding-left 5px !important
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