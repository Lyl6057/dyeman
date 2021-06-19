<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      :width="dlgWidth"
      top="10vh"
      :fullscreen="dlgWidth === '100%'"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeBefore"
      v-if="choiceV"
    >
      <!-- <view-container :title="choiceTle"> -->
      <el-tabs type="border-card" v-model="tab">
        <el-tab-pane name="tab1" :label="choiceTle">
          <div class="btnList">
            <el-button type="primary" @click="choice">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button
              type="primary"
              @click="query"
              v-if="choiceTle != $t('choicDlg.shdmx')"
              >{{ $t("public.query") }}</el-button
            >
            <el-button type="warning" @click="close">{{
              $t("public.close")
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
              @selection-change="selectionChange"
            >
            </avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- </view-container> -->
    </el-dialog>
  </div>
</template>
<script>
import {
  weaveJobC,
  weaveJobF,
  getWeaveJob,
  techCodeC,
  techCodeF,
  getTechCode,
  getTechItem,
  TechItemF,
  TechItemC,
  getWorkStep,
  WorkStepF,
  WorkStepC,
  getTechargue,
  techargueF,
  techargueC,
  getClothNote,
  clothNoteF,
  clothNoteC,
  getDye,
  dyeC,
  dyeF,
} from "./data";
export default {
  name: "",
  components: {},
  props: {
    choiceV: Boolean,
    choiceTle: String,
    dlgWidth: String,
    choiceQ: Object,
  },
  data() {
    return {
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      choiceC: {},
      crud: [],
      choiceF: {},
      form: {},
      pick: {},
      getData: Function,
      tab: "tab1",
      chooseData: [],
      backups: [],
    };
  },
  watch: {},
  methods: {
    // 查询
    query() {
      this.loading = true;
      this.crud = [];
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
      if (this.choiceTle == "選擇生产项目") {
        this.getData().then((res) => {
          res.data.forEach((item) => {
            if (item.stepName === "生产过程") {
              item.nodes.forEach((t) => {
                if (t.stepName === "染整中心") {
                  this.crud = t.nodes;
                  this.backups = t.nodes;
                }
              });
            }
          });

          this.loading = false;
        });
      } else if (this.choiceTle == "選擇漂染基礎工藝") {
        this.getData(Object.assign(this.form, this.choiceQ, {})).then((Res) => {
          this.crud = Res.data;
          this.crud = this.crud.sort((a, b) => {
            return a.sn > b.sn ? 1 : -1;
          });
          if (this.crud.length === 0) {
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
      } else {
        this.getData(
          Object.assign(this.form, this.choiceQ, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        ).then((Res) => {
          let records = Res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length === 0) {
            this.loading = false;
          }
          if (this.choiceTle == "选择漂染工藝") {
            this.crud = this.crud.sort((a, b) => {
              return a.bleadyeCode > b.bleadyeCode ? 1 : -1;
            });
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
      }
    },
    // 选择
    choice() {
      this.$emit(
        "choiceData",
        this.chooseData.length > 0 ? this.chooseData : this.pick
      );
    },
    closeBefore(done) {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    close() {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    handleRowDBLClick(val) {
      // this.pick = val;
      // this.choice();
    },
    cellClick(val) {
      this.pick = val;
    },
    selectionChange(val) {
      this.chooseData = val;
    },
  },
  created() {
    switch (this.choiceTle) {
      case "选择胚布信息":
        this.choiceC = clothNoteC(this);
        this.choiceF = clothNoteF(this);
        this.getData = getClothNote;
        this.form.clothState = 2;
        break;
      case "選擇漂染基礎工藝":
        this.choiceC = techargueC(this);
        this.choiceF = techargueF(this);
        this.getData = getTechargue;
        break;
      case "选择织造通知单":
        this.choiceC = weaveJobC(this);
        this.choiceF = weaveJobF(this);
        this.getData = getWeaveJob;
        break;
      case "选择染整工单":
        this.choiceC = dyeC(this);
        this.choiceF = dyeF(this);
        this.getData = getDye;
        break;
      case "选择漂染工藝":
        this.choiceC = techCodeC(this);
        this.choiceF = techCodeF(this);
        this.getData = getTechCode;
        break;
      case "選擇工藝材料":
        this.choiceC = TechItemC(this);
        this.choiceF = TechItemF(this);
        this.getData = getTechItem;
        break;
      case "選擇生产项目":
        this.choiceC = WorkStepC(this);
        this.choiceF = WorkStepF(this);
        this.getData = getWorkStep;
        break;

      default:
        break;
    }
    this.query();
  },
  mounted() {},
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