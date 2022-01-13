<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-10 19:25:32
 * @Description: 
-->
<template>
  <div id="ldOrderDlg">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '生产排期信息'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="noticeId">
            <el-select
              v-model="form.noticeId"
              filterable
              remote
              placeholder="请输入生产单号"
              :remote-method="remoteMethod"
              :loading="searchLoading"
              @change="getNoteiceData(form.$noticeId)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
      <view-container
        title="生产排期明细"
        :element-loading-text="$t('public.loading')"
        v-loading="wLoading"
        style="width: 99%; margin: 0 auto"
      >
        <div class="btnList">
          <el-button type="primary" @click="add">{{
            $t("public.add")
          }}</el-button>
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
        </div>
        <el-row class="crudBox">
          <avue-crud
            ref="crud"
            id="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          ></avue-crud>
        </el-row>
      </view-container>
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
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, detailCrud } from "./data";
import { add, update, getWeaveByPage, getRunByPage } from "./api";

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
      crudOp: detailCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      options: [],
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      chooseData: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: "选择生产工序",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      code: "",
      group: [],
      chooseDtlData: {},
      searchLoading: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.schState = 1; // 初始状态 => 开始执行
          this.form.salSchType = 98; // 默认为织造排期
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        this.form.noticeId = this.form.noticeType;
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (this.form[key] == "undefined") {
                this.form[key] = "";
              }
            }
            this.form.schStart = this.form.schStart + " 00:00:00";
            this.form.schEnd = this.form.schEnd + " 00:00:00";
            this.form.noticeType = this.form.$noticeId;
            if (this.form.salSchId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(res.data.msg);
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              this.form.created = this.$store.state.userOid;
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.schId = res.data.data;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(res.data.msg);
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(error);
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充生产排期信息!");
          return;
        }
      });
    },
    add() {
      if (this.form.salSchType == 98) {
        this.choiceQ.pareantId = "2A88BB439A7E4B4EBB899E0D2E10742F";
      } else if (this.form.salSchType == 99) {
        this.choiceQ.pareantId = "0D315AE933AE43C1B6963B6E84989827";
        // this.choiceQ.pareantId = "0D315AE933AE43C1B6963B6E84989827";
      }
      console.log(this.choiceQ);
      this.choiceV = true;
      // this.crud.push({
      //   $cellEdit: true,
      //   schSn: this.crud.length + 1,
      // });
    },
    del() {},
    choiceData(val) {
      val.map((item, i) => {
        item.workName = item.stepName;
        item.schSn = this.crud.length + i + 1;
        item.workCode = item.stepCode;
        item.colorName = this.form.colorName;
        item.$cellEdit = true;
      });
      this.crud = this.crud.concat(val);
      this.choiceV = false;
    },
    getNoteiceData() {
      this.$nextTick(() => {
        let val = this.form.$noticeId;
        if (!val) return;
        if (this.form.salSchType == 98) {
          getWeaveByPage({
            rows: 1,
            start: 1,
            weaveJobCode: val,
          }).then((res) => {
            if (res.data.records.length) {
              let data = res.data.records[0];
              this.form.schStart = data.startDate;
              this.form.endStart = data.calicoDate;
              this.form.proAmount = data.amount;
              this.form.proUnit = "KG";
              this.form.colorCode = data.colorCode;
              this.form.colorName = data.colorName;
            }
          });
        } else if (this.form.salSchType == 99) {
          getRunByPage({
            rows: 1,
            start: 1,
            vatNo: val,
          }).then((res) => {
            if (res.data.records.length) {
              let data = res.data.records[0];
              this.form.schStart = data.workDate;
              this.form.endStart = data.deliveDate;
              this.form.proAmount = data.clothWeight;
              this.form.proUnit = data.wmUnit;
              this.form.colorCode = data.colorCode;
              this.form.colorName = data.colorName;
            }
          });
        }
      });
    },
    typeChange() {
      this.options = [];
      this.remoteMethod("");
    },
    remoteMethod(val) {
      this.searchLoading = true;
      if (this.form.salSchType == 98) {
        getWeaveByPage({
          rows: 20,
          start: 1,
          weaveJobCode: "!^%" + val,
        }).then((res) => {
          this.options = [];
          res.data.records.forEach((item) => {
            this.options.push({
              value: item.weaveJobId,
              label: item.weaveJobCode,
            });
          });
        });
      } else if (this.form.salSchType == 99) {
        getRunByPage({
          rows: 20,
          start: 1,
          vatNo: "!^%" + val,
        }).then((res) => {
          this.options = [];
          res.data.records.forEach((item) => {
            this.options.push({
              value: item.runJobId,
              label: item.vatNo,
            });
          });
        });
      }
      setTimeout(() => {
        this.searchLoading = false;
      }, 200);
    },
    query() {},
    handleRowDBLClick(val) {},
    cellClick(val) {},
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
#ldOrderDlg
  overflow hidden
  // .el-form-item__label {
  // font-size: 14px !important;
  // }

  // .avue-form .el-input--mini input {
  // height: 40px !important;
  // line-height: 40px;
  // }

  // .el-form-item--mini .el-form-item__label {
  // line-height: 20px;
  // }
  .formBox
    height 9.2rem !important
  .el-input-number__decrease, .el-input-number__increase
    display none
  .el-input-number .el-input__inner
    text-align left !important
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