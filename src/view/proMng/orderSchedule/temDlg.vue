<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-09 10:40:18
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
              @change="getNoteiceData"
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
        style="width: 99%; margin: 2px auto"
      >
        <div class="btnList">
          <el-button type="primary" @click="add" :disabled="!form.salSchId">{{
            $t("public.add")
          }}</el-button>
          <el-button type="danger" @click="del" :disabled="!form.salSchId">{{
            this.$t("public.del")
          }}</el-button>
          <el-button
            type="primary"
            @click="resetDetailList"
            :disabled="!crud.length"
            >计算时间</el-button
          >
        </div>
        <el-row class="crudBox">
          <avue-crud
            ref="crud"
            id="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
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
import { timeConversion } from "@/config/util.js";
import {
  add,
  update,
  getWeaveByPage,
  getRunByPage,
  addDetail,
  updateDetail,
  getDetail,
  delDetail,
  getPackage,
} from "./api";
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
      workPackageList: [],
      calculateData: {
        speed: 50, // 暂时给个默认值
      },
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      getPackage().then((res) => {
        this.workPackageList = res.data;
        if (this.isAdd) {
          this.form.schState = 1; // 初始状态 => 开始执行
          this.form.salSchType = 98; // 默认为织造排期
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        } else {
          this.wLoading = true;
          this.form = this.detail;
          this.form.noticeId = this.form.noticeType;
          this.getCalculateData(this.form.noticeId);
          this.getDetailList();
        }
      });
    },
    getCalculateData(val) {
      if (!val) return;
      if (this.form.salSchType == 98) {
        getWeaveByPage({
          rows: 1,
          start: 1,
          weaveJobCode: val,
        }).then((res) => {
          if (res.data.records.length) {
            let data = res.data.records[0];
            this.calculateData.gramWeight =
              parseInt(data.gramWeight || 0) / 1000;
            this.calculateData.breadth = parseInt(data.breadth || 0) * 0.0254;
            this.calculateData.weight = data.clothWeight;
          }
        });
      } else {
        getRunByPage({
          rows: 1,
          start: 1,
          vatNo: val,
        }).then((res) => {
          if (res.data.records.length) {
            let data = res.data.records[0];
            this.calculateData.gramWeight =
              parseInt(data.gramWeight || 0) / 1000;
            this.calculateData.breadth = parseInt(data.breadth || 0) * 0.0254;
            this.calculateData.weight = data.clothWeight;
          }
        });
      }
    },
    calculatingTime(arr) {
      arr.sort((a, b) => {
        return a.schSn > b.schSn ? 1 : -1;
      });
      arr.forEach((item, i) => {
        if (i == 0) {
          item.planStart = this.form.schStart;
          let data = new Date(item.planStart);
          item.planEnd = timeConversion(
            data.valueOf() + item.exampleUseTime * 1000 * 60
          );
        } else {
          item.planStart = arr[i - 1].planEnd;
          let data = new Date(item.planStart);
          item.planEnd = timeConversion(
            data.valueOf() + item.exampleUseTime * 1000 * 60
          );
        }
      });
      return arr;
    },
    getDetailList() {
      getDetail({
        salSchId: this.form.salSchId,
      }).then((res) => {
        this.crud = res.data.sort((a, b) => {
          return a.schSn > b.schSn ? 1 : -1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.wLoading = false;
      });
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
            if (this.form.schStart.indexOf(" ") == -1) {
              this.form.schStart = this.form.schStart + " 00:00:00";
            }
            if (this.form.schEnd.indexOf(" ") == -1) {
              this.form.schEnd = this.form.schEnd + " 00:00:00";
            }

            // this.form.noticeType = this.form.$noticeId;
            if (this.form.salSchId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.saveDetail();
                  // this.$tip.success(this.$t("public.bccg"));
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
                  this.form.salSchId = res.data.data;
                  this.saveDetail();
                  this.$emit("refresh");
                  // this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(res.data.msg);
                  this.wLoading = false;
                }
                done();
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
    resetDetailList() {
      if (!this.crud.length) return;
      this.crud = this.calculatingTime(this.crud);
    },
    saveDetail() {
      if (this.crud.length) {
        // this.crud = this.calculatingTime(this.crud);
        this.$nextTick(() => {
          this.crud.forEach((item, i) => {
            if (item.detailId) {
              updateDetail(item).then((res) => {});
            } else {
              item.salSchId = this.form.salSchId;
              addDetail(item).then((res) => {});
            }
            if (i == this.crud.length - 1) {
              setTimeout(() => {
                this.$tip.success(this.$t("public.bccg"));
                this.getDetailList();
              }, 200);
            }
          });
        });
      } else {
        this.$tip.success(this.$t("public.bccg"));
        this.getDetailList();
      }
    },
    add() {
      if (this.form.salSchType == 98) {
        this.choiceQ.pareantId = "2A88BB439A7E4B4EBB899E0D2E10742F";
      } else if (this.form.salSchType == 99) {
        this.choiceQ.pareantId = "0D315AE933AE43C1B6963B6E84989827";
        // this.choiceQ.pareantId = "0D315AE933AE43C1B6963B6E84989827";
      }
      this.choiceV = true;
      // this.crud.push({
      //   $cellEdit: true,
      //   schSn: this.crud.length + 1,
      // });
    },
    del() {
      this.$tip
        .cofirm(
          "是否删除工序为【 " +
            this.chooseData.workName +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delDetail(this.chooseData.detailId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.getData();
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
    choiceData(val) {
      this.choiceV = false;
      this.wLoading = true;
      try {
        val.forEach((item, i) => {
          item.workName = item.stepName;
          item.schSn = this.crud.length + i + 1;
          item.workCode = item.stepCode;
          item.colorName = this.form.colorName;
          item.workAmount = this.form.proAmount;

          // item.$cellEdit = true;
          if (item.standardFormula) {
            item.standardFormula = item.standardFormula.replace(
              /gramWeight/,
              this.calculateData.gramWeight
            );
            item.standardFormula = item.standardFormula.replace(
              /breadth/,
              this.calculateData.breadth
            );
            item.standardFormula = item.standardFormula.replace(
              /speed/,
              this.calculateData.speed
            );
            item.standardFormula = item.standardFormula.replace(
              /weight/,
              item.proAmount || this.calculateData.weight
            );
            item.exampleUseTime = eval(item.standardFormula).toFixed(1);
          } else {
            item.exampleUseTime = 120;
          }
          if (item.broadFormula) {
            item.broadTime = (item.exampleUseTime * item.broadFormula).toFixed(
              1
            );
          }
          this.crud.splice(this.chooseData.$index + 1 || i, 0, item);
        });
        this.crud.forEach((item, i) => {
          item.schSn = i + 1;
        });
        this.crud = this.calculatingTime(this.$unique(this.crud, "stepCode"));
        this.wLoading = false;
        this.choiceV = false;
      } catch (error) {
        this.$tip.error(error);
        this.wLoading = false;
      }
    },
    getNoteiceData() {
      this.$nextTick(() => {
        let val = this.form.noticeId;
        console.log(val, this.form.salSchType);
        if (!val) return;
        if (this.form.salSchType == 98) {
          getWeaveByPage({
            rows: 1,
            start: 1,
            weaveJobId: val,
          }).then((res) => {
            if (res.data.records.length) {
              let data = res.data.records[0];
              this.form.schStart = data.startDate;
              this.form.schEnd = data.calicoDate;
              this.form.proAmount = data.amount;
              this.form.proUnit = "KG";
              this.form.colorCode = data.colorCode;
              this.form.colorName = data.colorName;
              this.form.noticeType = data.weaveJobCode;
              console.log(res.data.records[0]);
            }
          });
        } else if (this.form.salSchType == 99) {
          getRunByPage({
            rows: 1,
            start: 1,
            runJobId: val,
          }).then((res) => {
            if (res.data.records.length) {
              let data = res.data.records[0];
              this.form.schStart = data.workDate;
              this.form.schEnd = data.deliveDate;
              this.form.proAmount = data.clothWeight;
              this.form.proUnit = data.wmUnit;
              this.form.colorCode = data.colorCode;
              this.form.colorName = data.colorName;
              this.form.noticeType = data.vatNo;
              console.log(res.data.records[0]);
            }
          });
        }
      });
    },
    typeChange() {
      // this.form.workPackageId = "";
      // this.form.noticeId = "";
      this.options = [];
      this.remoteMethod("");

      this.formOp.column[13].dicData = this.workPackageList.filter((item) => {
        return this.form.salSchType == 98
          ? item.packageType == "weave"
          : item.packageType == "dye";
      });
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
    cellClick(val) {
      val.$cellEdit = true;
      this.chooseData = val;
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
    // height calc(100vh - 610px) !important
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