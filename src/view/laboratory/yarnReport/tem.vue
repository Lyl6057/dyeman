<template>
  <div id="colorMng_Tem">
    <view-container
      title="报告资料管理"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="primary" @click="upload" :disabled="!form.rptId"
          >上传附件</el-button
        >
        <el-button type="primary" @click="download" v-if="form.rptContent"
          >下载附件</el-button
        >
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
    </view-container>
    <form action id="myform">
      <input
        type="file"
        name="myFile"
        id="myFile"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style="display: none"
        @change="fileChange"
      />
    </form>

    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      :dlgWidth="dlgWidth"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { mainCrud } from "./data";
import {
  getCodeSupply,
  addYarnTestReport,
  updateYarnTestReport,
  getYarnTestReport,
  uploadXlxs,
  downloadXlxs,
} from "./api";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
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
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        //  baseCodeSupplyEx({ code: "dye_batch" }).then((res) => {
        this.form = {
          yarnQty: 0,
          takeSample: 0,
          yarnDate: this.$getNowTime("datetime"),
        };
        this.wLoading = false;
        // });
      } else {
        getYarnTestReport({
          rows: 1,
          start: 1,
          rptId: this.detail.rptId,
        }).then((res) => {
          if (res.data.records.length) {
            this.form = res.data.records[0];
          } else {
            this.form = this.detail;
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.wLoading = true;
          try {
            if (this.form.rptId) {
              // update
              updateYarnTestReport(this.form)
                .then((res) => {
                  this.refresh = true;
                  this.$tip.success(this.$t("public.bccg"));
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            } else {
              // update
              addYarnTestReport(this.form)
                .then((res) => {
                  this.form.rptId = res.data.data;
                  this.refresh = true;
                  this.$tip.success(this.$t("public.bccg"));
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            }
            setTimeout(() => {
              done();
              this.wLoading = false;
            }, 200);
          } catch (error) {
            this.wLoading = false;
          }
        } else {
          this.wLoading = false;
          done();
          this.$tip.error("请补充报告信息!");
        }
      });
    },
    upload() {
      document.getElementById("myFile").click();
    },
    fileChange(e) {
      this.wLoading = true;
      let file = document.getElementById("myFile").files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("oid", this.form.rptId);
      uploadXlxs(formData)
        .then((res) => {
          this.form.rptContent = res.data;
          setTimeout(() => {
            this.wLoading = false;
            this.$tip.success("上传成功!");
          }, 200);
        })
        .catch((e) => {
          this.wLoading = false;
          this.$tip.error("上传失败!" + e);
        });
    },
    download() {
      let name = encodeURI(
        "http://" +
          document.domain +
          ":91/api/labYarnTestReport/findFileById?id=" +
          this.form.rptContent
      );
      window.open(name);
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("choicDlg.xzkh")) {
        this.form.custCode = val.custCode;
        this.form.custName = val.custName;
      }
      if (this.choiceTle === this.$t("choicDlg.pbbm")) {
        this.form.fabCode = val.calicoId;
        this.form.fabricDesc = val.gustCalicoName;
      }
      if (this.choiceTle === this.$t("choicDlg.xzshxx")) {
        this.form.colorBh = val.colorNo;
        this.form.colorChn = val.colorName;
      }
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
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
  .formBox
    height calc(100vh - 125px) !important
#colorMng_Dlg
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