<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-18 15:00:36
 * @Description:
-->
<template>
  <div id="codeCard">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '成品码卡'"
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
          content=" in"
          placement="top-start"
        >
          <el-button type="primary" @click="print" :disabled="!form.cardId"
            >打印</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="đóng"
          placement="top-start"
        >
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </el-tooltip>
      </div>

      <el-row class="formBox">
        <div style="height: calc(100vh - 120px); overflow: auto">
          <avue-form
            ref="form"
            :option="formOp"
            v-model="form"
            style="margin-top: 5px"
          ></avue-form>
        </div>
      </el-row>
    </view-container>
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
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="100%"
      @choiceData="choiceData"
      @close="closeChoice"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud } from "./data";
import { get, add, update, getRevolve } from "./api";
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
      form: {
        forClothLockJoin: false,
        forClothTurnOver: false,
        forClothTogetherVat: false,
        forClothOrderHair: false,
        forClothAgainstHair: false,
        packGw: false,
        packNw: false,
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crud: [],
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
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  methods: {
    query() {
      get({
        rows: 10,
        start: 1,
        cardId: this.detail.cardId,
      }).then((res) => {
        this.form = res.data.records[0];
        this.wLoading = false;
      });
    },
    closeChoice() {
      this.choiceV = false;
    },
    getData() {
      this.wLoading = true;
      this.form = {};
      this.form.bf = [];
      this.form.test = [];
      this.form.item = [];
      if (this.isAdd) {
        setTimeout(() => {
          this.form.appDate = this.$getNowTime();
          this.form.appState = 1;
          this.wLoading = false;
        }, 200);
      } else {
        this.query();
      }
    },
    add() {
      if (!this.form.weaveJobCode || !this.form.poAmountKg) {
        this.$tip.warning("請先選擇織造通知單/填寫订单数量!");
        return;
      }
      // this.bfOp.column[2].hide = false;
      this.bfOp.column[6].hide = false;
      this.choiceTle = "选择胚布信息";
      // this.choiceQ.weaveJob = this.form.weaveJobCode;
      this.choiceQ.weaveJobCode = this.form.weaveJobCode;
      this.choiceQ.clothState = "2";
      // this.choiceQ.weight = this.form.poAmountKg;
      this.choiceV = true;
    },
    del(type) {
      if (
        !this["choose" + type + "Data"][
          type === "bf" ? "recId" : type === "test" ? "jobTestId" : "itemId"
        ]
      ) {
        this.form[type].splice(this["choose" + type + "Data"].sn - 1, 1);
        this["choose" + type + "Data"] = {};
        this.form[type].forEach((item, i) => {
          item.sn = i + 1;
        });
        if (this.form[type].length > 0) {
          this.$refs[type].setCurrentRow(this.form[type][0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          let delfunc =
            type === "bf"
              ? (delfunc = delbf)
              : type === "test"
              ? (delfunc = deltest)
              : (delfunc = delitem);
          delfunc(
            type === "bf"
              ? this["choose" + type + "Data"].recId
              : type === "test"
              ? this["choose" + type + "Data"].jobTestId
              : this["choose" + type + "Data"].itemId
          )
            .then((res) => {
              if (type == "bf") {
                // 如果删除的是布飞信息，则需要在胚布记录表里恢复状态为2
                updateNote({
                  noteId: this["choose" + type + "Data"].clothNoteId,
                  clothState: 2,
                }).then((res) => {});
              }
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          console.log(err);
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    save() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            let data = JSON.parse(JSON.stringify(this.form));
            Object.keys(data).forEach((item) => {
              if (this.isEmpty(data[item])) {
                delete data[item];
              }
            });
            if (data.appDate && data.appDate.indexOf(" ") < 0) {
              data.appDate += " 00:00:00";
            }
            data.custName = data.$custCodex;
            if (data.cardId) {
              // update
              data.upateTime = this.$getNowTime("datetime");
              update(data).then((res) => {
                if (res.data.code == 200) {
                  setTimeout(() => {
                    this.wLoading = false;
                    this.$emit("refresh");
                    this.$tip.success(this.$t("public.bccg"));
                    done();
                  }, 200);
                } else {
                  this.wLoading = false;
                  done();
                  this.$tip.error(this.$t("public.bcsb"));
                }
              });
            } else {
              // add
              data.createTime = this.$getNowTime("datetime");
              add(data).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                  this.wLoading = false;
                  this.$emit("refresh");
                  this.form.cardId = res.data.data;
                  this.detail.cardId = res.data.data;
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                  this.wLoading = false;
                }
                done();
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
          this.$tip.error("请补充批色码卡信息!");
        }
      });
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择染整工单") {
        this.form.vatNo = val.vatNo;
        this.form.custCode = val.custCode;
        this.form.colorName = val.colorName;
        this.form.colorNo = val.colorCode;
        this.form.custBatchNo = val.yarnBatchNo;
        this.form.fabricName = val.fabName;
        this.form.netWeight = val.clothWeight;
        this.form.poNo = val.salPoNo;
        this.form.weightUnit = "KG";
        getRevolve({
          vatNo: val.vatNo,
        }).then((res) => {
          this.form.styleNo = res.data[0].styleNo;
        });
      }
      this.choiceV = false;
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
        this.form.cardId;
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
.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}

// .el-table__fixed-body-wrapper {
// top: 60px !important;
// }
#codeCard {
  .avue-group__header {
    margin-bottom: 10px;
    height: 30px;
  }

  .avue-form__line {
    height: 1px;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-form__row {
    padding: 0 !important;
  }

  .formBox {
    // height: 100vh !important;
    // overflow: auto;
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
