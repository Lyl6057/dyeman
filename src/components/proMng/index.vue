<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      :width="dlgWidth"
      :top="marginTop"
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
              id="proChoice"
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
  getBaseStep,
  baseStepC,
  baseStepF,
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
  resolveC,
  resolveF,
  getResolve,
  ylInC,
  ylInF,
  getYlIn,
  scflInC,
  scflInF,
  getScflIn,
  wjInC,
  wjInF,
  getWjIn,
  xzInC,
  xzInF,
  getXzIn,
  hgylInF,
  hgylInC,
  getHgylIn,
  rlInC,
  rlInF,
  getRlIn,
  cpbInC,
  cpbInF,
  getCpbIn,
  ylStockC,
  ylStockF,
  getYlStock,
  hgylStockC,
  hgylStockF,
  getHgylStock,
  sxStockC,
  sxStockF,
  getSxStock,
  salPoC,
  salPoF,
  getSalPo,
  getBaseStepPackage,
  baseStepPackageF,
  baseStepPackageC,
  finishedNoteC,
  finishedNoteF,
  getFinishedNote,
} from "./data";

export default {
  name: "",
  components: {},
  props: {
    choiceV: Boolean,
    choiceTle: String,
    dlgWidth: String,
    choiceQ: Object,
    marginTop: {
      type: String,
      default: "10vh",
    },
  },
  data() {
    return {
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 50, 100, 500],
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
      for (let key in this.choiceQ) {
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
                  // this.crud = t.nodes;
                  t.nodes.forEach((rz) => {
                    this.crud.push(rz);
                    if (rz.nodes.length) {
                      rz.nodes.forEach((rs) => {
                        this.crud.push(rs);
                      });
                    }
                  });
                  this.backups = JSON.parse(JSON.stringify(this.crud));
                }
              });
            }
          });

          this.loading = false;
        });
      }
      //  else if (this.choiceTle == "选择胚布信息") {
      //   this.backups = [];
      //   this.getData(this.choiceQ).then((Res) => {
      //     this.crud = Res.data;
      //     if (this.crud.length === 0) {
      //       this.loading = false;
      //     }

      //     this.crud.forEach((item, index) => {
      //       item.index = index + 1;
      //       this.backups.push(item);
      //       if (index === this.crud.length - 1) {
      //         setTimeout(() => {
      //           this.filterList();
      //           this.loading = false;
      //         }, 200);
      //       }
      //     });
      //   });
      // }
      else if (this.choiceTle == "選擇漂染基礎工藝") {
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
        let queryData = JSON.parse(JSON.stringify(this.form));
        queryData.vatNo = "!^%" + (queryData.vatNo || "");
        queryData.poNo = "!^%" + (queryData.poNo || "");
        queryData.weaveJobCode = "!^%" + (queryData.weaveJobCode || "");
        queryData[this.choiceQ.sortF] =
          "!^%" + (queryData[this.choiceQ.sortF] || "");
        this.getData(
          Object.assign(queryData, this.choiceQ, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        ).then((Res) => {
          let records = Res.data;
          this.page.total = records.total;
          this.crud = records.records || records.rows;
          if (this.crud.length === 0) {
            this.loading = false;
          }
          if (this.choiceTle == "选择漂染工藝") {
            this.crud = this.crud.sort((a, b) => {
              return a.bleadyeCode > b.bleadyeCode ? 1 : -1;
            });
          }
          if (this.choiceTle == "选择生产工序") {
            this.crud = this.crud.sort((a, b) => {
              return a.stepSn > b.stepSn ? 1 : -1;
            });
          }
          this.crud.forEach((item, index) => {
            if (
              this.choiceTle == "选择生产辅料入仓信息" ||
              this.choiceTle == "选择五金入仓信息" ||
              this.choiceTle == "选择能源入仓信息"
            ) {
              item.materialName = item.materialNum;
            }
            if (this.choiceTle == "选择颜料入仓信息") {
              item.chemicalName = item.chemicalId;
            }
            item.index = index + 1;
            item.clothWeight = item.clothWeight
              ? Number(item.clothWeight.toFixed(2))
              : 0;
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
    filterList() {
      this.crud = JSON.parse(JSON.stringify(this.backups));
      this.$nextTick(() => {
        for (let key in this.form) {
          if (this.form[key]) {
            this.crud = this.crud.filter(
              (a) => (a[key] + "").indexOf(this.form[key]) != -1
            );
          }
        }
      });
    },
  },
  created() {
    switch (this.choiceTle) {
      case "选择成品布":
        this.choiceC = finishedNoteC(this);
        this.choiceF = finishedNoteF(this);
        this.getData = getFinishedNote;
        break;
      case "选择颜料库存":
        this.choiceC = ylStockC(this);
        this.choiceF = ylStockF(this);
        this.getData = getYlStock;
        break;
      case "选择化工原料库存":
        this.choiceC = hgylStockC(this);
        this.choiceF = hgylStockF(this);
        this.getData = getHgylStock;
        break;
      case "选择纱线库存":
        this.choiceC = sxStockC(this);
        this.choiceF = sxStockF(this);
        this.getData = getSxStock;
        break;
      case "选择生产工作包":
        this.choiceC = baseStepPackageC(this);
        this.choiceF = baseStepPackageF(this);
        this.getData = getBaseStepPackage;
        break;
      case "选择订单资料":
        this.choiceC = salPoC(this);
        this.choiceF = salPoF(this);
        this.getData = getSalPo;
        break;
      case "选择成品布入仓信息":
        this.choiceC = cpbInC(this);
        this.choiceF = cpbInF(this);
        this.getData = getCpbIn;
        break;
      case "选择能源入仓信息":
        this.choiceC = rlInC(this);
        this.choiceF = rlInF(this);
        this.getData = getRlIn;
        break;
      case "选择化工原料入仓信息":
        this.choiceC = hgylInC(this);
        this.choiceF = hgylInF(this);
        this.getData = getHgylIn;
        break;
      case "选择行政入仓信息":
        this.choiceC = xzInC(this);
        this.choiceF = xzInF(this);
        this.getData = getXzIn;
        break;
      case "选择五金入仓信息":
        this.choiceC = wjInC(this);
        this.choiceF = wjInF(this);
        this.getData = getWjIn;
        break;
      case "选择生产辅料入仓信息":
        this.choiceC = scflInC(this);
        this.choiceF = scflInF(this);
        this.getData = getScflIn;
        break;
      case "选择颜料入仓信息":
        this.choiceC = ylInC(this);
        this.choiceF = ylInF(this);
        this.getData = getYlIn;
        break;
      case "选择胚布信息":
        this.choiceC = clothNoteC(this);
        this.choiceF = clothNoteF(this);
        this.getData = getClothNote;
        // this.form.clothState = 2;
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
      case "选择染整运转单":
        this.choiceC = resolveC(this);
        this.choiceF = resolveF(this);
        this.getData = getResolve;
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
      case "选择生产工序":
        this.choiceC = baseStepC(this);
        this.choiceF = baseStepF(this);
        this.getData = getBaseStep;
        break;
      default:
        break;
    }
    this.query();
  },
  mounted() {},
  updated() {
    // this.$nextTick(() => {
    //   this.$refs["crud"].doLayout();
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#choiceDlg
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label
    font-size 16px
    height 30px
  .el-dialog__body
    padding 0 !important
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .el-dialog__header
    padding 0px
  .el-dialog__headerbtn
    top 5px
    color #000
    font-size 22px
    z-index 999
  .formBox
    margin-bottom 0px
  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu
    min-height 0 !important
    height 0 !important
  .el-tabs__item
    font-size 18px
    line-height 30px
    height 30px
  .el-tag--mini
    display none
  .el-dialog.is-fullscreen
    overflow hidden !important
</style>