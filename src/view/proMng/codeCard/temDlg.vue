<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-26 15:03:02
 * @Description:
-->
<template>
  <div id="codeCard">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '批色码卡'"
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
        <div style="overflow: auto">
          <avue-form
            ref="form"
            :option="formOp"
            v-model="form"
            style="margin-top: 5px"
          ></avue-form>
        </div>
      </el-row>
      <view-container
        title="后整配方"
        :element-loading-text="$t('public.loading')"
        v-loading="wLoading"
        v-if="type == 2"
        class="not-number-icon"
      >
        <div class="btnList">
          <!-- <el-button @click="saveOther" type="success">{{
            $t("public.save")
          }}</el-button> -->
          <el-button @click="add" type="primary">{{
            $t("public.add")
          }}</el-button>
          <el-button
            @click="del"
            type="danger"
            :disabled="Object.keys(chooseData).length == 0"
            >{{ $t("public.del") }}</el-button
          >
        </div>
        <div class="crudBox">
          <avue-crud
            id="otherCrud"
            ref="otherCrud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @current-row-change="cellClick"
          >
          </avue-crud>
        </div>
      </view-container>
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
import { getXDicT } from "@/config";
import { mainCrud, pfCrud } from "./data";
import { timeConversion } from "@/config/util";
import { get, add, update, getWeave } from "./api";
import {
  getFormula,
  addFormula,
  delFormula,
  updateFormula,
} from "../finalizeDesign/api";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    type: String,
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
      crudOp: pfCrud(this),
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
        if (this.type == "2") {
          getFormula({
            rows: this.page.pageSize,
            start: this.page.currentPage,
            proAppColorCardFk: this.form.cardId,
          }).then((res) => {
            this.crud = res.data;
            this.crud.forEach((item, i) => {
              item.index = i + 1;
              item.$cellEdit = true;
            });
            this.page.total = res.data.total;
            this.wLoading = false;
          });
        } else {
          this.wLoading = false;
        }
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
          this.form.appState = this.type;
          this.wLoading = false;
        }, 200);
      } else {
        this.query();
      }
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      // for (let i = 0; i < this.crud.length; i++) {
      //   if (!this.crud[i].materialCode || !this.crud[i].useAmount) {
      //     this.$tip.error("后整配方中的物料编号/数量不能为空!");
      //     return;
      //   }
      // }
      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (item.jobItmeId || item.formulaId) {
            updateFormula(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            // data.proFinishJobFk = this.form.finishJobId;
            data.proAppColorCardFk = this.form.cardId;
            addFormula(data).then((res) => {
              item.jobItmeId = res.data.data;
              item.formulaId = res.data.data;
              resolve();
            });
          }
        });
      };
      let promiseArr = this.crud.map((item, i) => {
        return addDtla(item, i);
      });
      Promise.all(promiseArr).then((res) => {
        for (let i = 0; i < this.crud.length; i++) {
          if (i === this.crud.length - 1) {
            // this.getDetail();
            setTimeout(() => {
              this.dlgLoading = false;
              // this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        }
      });
    },
    add() {
      // this.choiceTle = "選擇漂染基礎工藝";
      // this.choiceQ.paramType = "afterfinish";
      // this.choiceV = true;
      this.crud.push({ index: this.crud.length + 1, $cellEdit: true });
    },
    del() {
      if (!this.chooseData.jobItmeId && !this.chooseData.formulaId) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.otherCrud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          delFormula(this.chooseData.formulaId)
            .then((res) => {
              if (res.data.code === 200) {
                this.query();
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
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    save() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            let data = JSON.parse(JSON.stringify(this.form));
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
            if (this.type == "2") {
              this.saveOther();
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
    },
    cellClick(val) {
      this.chooseData = val;
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择染整工单") {
        this.form.vatNo = val.vatNo;
        this.form.custName = val.custName;
        this.form.colorName = val.colorName;
        this.form.colorNo = val.colorCode;
        this.form.custCode = val.custCode;
        this.form.fabricName = val.fabName;
        this.form.sumWeight = val.clothWeight;
        this.form.pidCount = val.pidCount;
        getWeave({
          weaveJobCode: val.weaveJobCode,
        }).then((res) => {
          this.form.custBatchNo = res.data[0].custPoNo;
        });
      } else if (this.choiceTle == "選擇漂染基礎工藝") {
        val.forEach((item, i) => {
          let data = {};
          data = {
            materialCode: item.paramKey,
            materialName: item.paramName,
            useAmount: item.paramDefault,
            // sn: this.crud.length + 1,
            index: this.crud.length + 1,
            $cellEdit: true,
          };
          this.crud.push(data);
        });
        this.crud = this.$unique(this.crud, "materialName");
        this.crud.forEach((item, i) => {
          item.sn = i + 1;
          item.index = i + 1;
        });
        this.$nextTick(() => {
          this.$toTableLow(this, "otherCrud");
        });
      }
      this.choiceV = false;
    },
    print() {
      if (this.type == "1") {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proAppColorCard/pdfanddbh?id=" +
          this.detail.cardId;
      } else {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proAppColorCard/pdfandcgb?id=" +
          this.detail.cardId;
      }
      this.pdfDlg = true;
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
