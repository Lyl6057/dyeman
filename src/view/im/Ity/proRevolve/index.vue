<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-20 09:24:56
 * @Description: 
-->
<template>
  <div
    id="clothFlyScan"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="生产备布">
      <div class="btnList">
        <el-button
          type="primary"
          :disabled="!form.vatNo || !history.length || !queryCtr"
          @click="submit"
          >开始出仓</el-button
        >
      </div>
      <el-row class="formBox" style="margin-top: 5px">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="14">
          <view-container title="胚布信息">
            <el-card
              class="box-card"
              style="height: calc(100vh - 280px); overflow: auto"
            >
              <!-- <div slot="header" class="clearfix">
              <span>布票信息</span>
            </div> -->
              <el-row class="text item">
                <el-col :span="10">生产单号: {{ crud.weaveJobCode }}</el-col>
                <el-col :span="14">布票号: {{ crud.noteCode }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">客户编号: {{ crud.customerName }}</el-col>
                <el-col :span="14">订单号: {{ crud.poNo }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="24">布类名称: {{ crud.fabricName }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">机号: {{ crud.loomNo }}</el-col>
                <el-col :span="14">顏色: {{ crud.proColor }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">匹號: {{ crud.eachNumber }}</el-col>
                <el-col :span="14">打印时间: {{ crud.printedTime }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">重量: {{ crud.clothWeight }}</el-col>
                <el-col :span="14">重量单位: {{ crud.weightUnit }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">QC扣减数量: {{ crud.qcTakeOut }}</el-col>
                <el-col :span="14">毛重: {{ crud.realWeight }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">验布员工号: {{ crud.clothChecker }}</el-col>
                <el-col :span="14">值机工号: {{ crud.workNo }}</el-col>
              </el-row>

              <el-row class="text item">
                <el-col :span="10">载具编号: {{ crud.storeLoadCode }}</el-col>
                <el-col :span="14">存储位置: {{ crud.storeSiteCode }}</el-col>
              </el-row>
            </el-card>
          </view-container>
        </el-col>
        <el-col :span="10">
          <view-container title="已选胚布">
            <el-card
              class="border-card"
              style="height: calc(100vh - 365px); overflow: auto"
              id="history"
            >
              <div
                class="text item"
                v-for="item in history"
                :key="item.noteId"
                style="border-bottom: 1px solid #eee"
              >
                <div class="history">
                  <span>布票号: {{ item.noteCode }}</span>
                  <span> 重量: {{ item.clothWeight }}</span>
                  <span> 位置: {{ item.storeSiteCode }}</span>
                  <span
                    style="
                      float: right;
                      margin: 0 10px 0 0;
                      font-size: 18px;
                      color: red;
                    "
                    @click="cancelNote(item)"
                    >X</span
                  >
                  <!-- <span>验布员工号: {{ item.clothChecker }}</span> -->
                </div>

                <!-- <el-divider style="margin: 0"></el-divider> -->
              </div>
            </el-card>
            <div style="text-align: left; padding: 10px; font-size: 22px">
              <span>疋数: {{ history.length }}, </span
              ><span>合计重量: {{ weight }}</span>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :element-loading-text="$t('public.loading')"
      v-loading="dLoading"
      v-if="dialogVisible"
    >
      <view-container title="胚布裁剪">
        <div class="btnList">
          <el-button type="success" @click="save2">保存</el-button>
          <!-- <el-button type="primary">裁剪</el-button> -->
          <el-button type="warning" @click="dialogVisible = false"
            >关闭</el-button
          >
        </div>
        <div class="formBox">
          <avue-form ref="dlgForm" :option="dlgFormOp" v-model="dlgForm">
            <template slot="noteCode" slot-scope="scope">
              <el-select
                v-model="scope.row.noteCode"
                placeholder="请选择"
                filterable
                allow-create
                default-first-option
                clearable
                class="customize-select"
                @change="selectChange(scope.row)"
              >
                <el-option
                  v-for="item in history"
                  :key="item.noteCode"
                  :label="item.noteCode"
                  :value="item.noteCode"
                >
                  <span style="float: left"> {{ item.noteCode }}</span>
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </div>
        <view-container title="裁剪后出仓胚布">
          <div class="crudBox">
            <avue-crud
              ref="dlgCrud"
              :option="dlgCrudOp"
              :data="dlgCrud"
              v-loading="loading"
            ></avue-crud>
          </div>
        </view-container>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import {
  get,
  add,
  update,
  del,
  getWeave,
  getNote,
  getNoteByPage,
  addNote,
  updateInwhse,
  getInwhse,
  updateNote,
  addCalico,
  addOutWhse,
  addOutWhseDla,
  addOutWhseDlb,
  getJobCalico,
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
export default {
  name: "",
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      dlgCrudOp: dlgCrud(this),
      dlgCrud: [],
      crud: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      history: [],
      Load: [],
      loading: false,
      dialogVisible: false,
      detail: {},
      weight: 0,
      czsocket: {},
      changeList: [],
      wLoading: false,
      dLoading: false,
      dlgChooseData: {},
    };
  },
  watch: {
    history(n, o) {
      this.weight = 0;
      n.forEach((item, i) => {
        item.index = i + 1;
        this.weight = Number(
          (this.weight + Number(item.clothWeight)).toFixed(2)
        );
      });
    },
  },
  methods: {
    query() {
      if (!this.form.vatNo) {
        this.$tip.warning("缸号不能为空!");
        return;
      }
      this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      get({ vatNo: this.form.vatNo }).then((res) => {
        if (res.data.length) {
          this.form = res.data[0];
          this.history = [];
          this.crud = {};
          this.weight = 0;
          this.$tip.success("查询成功!");
          document.getElementsByTagName("input")[3].focus();
          this.type = "pb";
          getWeave({
            weaveJobCode: this.form.weaveJobCode,
          }).then((weave) => {
            if (weave.data.length > 0) {
              this.form.weaveJobId = weave.data[0].weaveJobId;
            }
          });
          getJobCalico({
            proBleadyeRunJobFk: res.data[0].runJobId,
          }).then((calico) => {
            if (calico.data.length > 0) {
              this.queryCtr = false;
              this.history = calico.data;
              this.history.forEach((item) => {
                item.noteCode = item.clothNoteCode;
              });
            } else {
              this.queryCtr = true;
            }
          });
          this.wLoading = false;
        } else {
          this.$tip.warning("暂无此缸号!");
          setTimeout(() => {
            this.wLoading = false;
            this.form.vatNo = "";
          }, 500);
        }
      });
    },
    submit() {
      // 开始出仓
      // 1.判断是否重量超过出仓重量
      if (this.weight > this.form.clothWeight) {
        // 是否剪布
        this.$tip
          .cofirm("是否要剪布?", this, {})
          .then(() => {
            this.dialogVisible = true;
            this.dlgFormOp.column[0].dicData = this.history;
            this.dlgForm.noteCode = this.history.length;
          })
          .catch(() => {
            this.$tip.cofirm("是否确定开始出仓?", this, {}).then(() => {
              this.save();
            });
          });

        // 减布操作
      } else if (this.weight == this.form.clothWeight) {
        // 刚好相等 1.布票状态为出仓 2.修改入仓记录重量  3.生成运转单胚布信息 4.生成出仓记录
        this.$tip.cofirm("是否确定开始出仓?", this, {}).then(() => {
          this.save();
        });
      } else {
        // 少胚布
        this.$tip
          .cofirm(
            "选择的胚布合计重量小于运转单出仓重量，是否确定开始出仓?",
            this,
            {}
          )
          .then(() => {
            this.save();
          });
      }
    },
    noteChange(val) {
      this.dlgCrud = [];
      getNoteByPage({
        noteCode: "%" + this.history[val - 1].noteCode,
      }).then((res) => {
        let splitNo = String.fromCharCode(res.data.total + 64);
        if (val != "") {
          val = Number(val);
          this.loading = true;
          let data = JSON.parse(JSON.stringify(this.history[val - 1]));
          this.dlgChooseData = this.history[val - 1];
          this.dlgForm.noteCode = val;
          data.clothWeight = Number(
            data.clothWeight - (this.weight - this.form.clothWeight)
          ).toFixed(2); // 剩余
          this.dlgForm.outWeight = Number(
            this.history[val - 1].clothWeight - data.clothWeight
          ).toFixed(2);
          data.realWeight = data.clothWeight;
          data.qcTakeOut = 0;
          data.noteCode += `-${splitNo}`;
          data.clothState = 3;
          this.dlgCrud.push(data);
          this.loading = false;
        }
      });
    },
    save2() {
      if (!this.history.length) {
        this.$tip.warning("请扫描布票!");
        return;
      }
      this.dLoading = true;
      let whseId = "";
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        addOutWhse({
          retType: "1",
          retDate: this.$getNowTime("datetime"),
          retCode: res.data.data,
          retUsername: parent.userID,
          stockState: 0,
          sysCreated: this.$getNowTime("datetime"),
          sysCreatedby: this.$store.state.userOid,
        }).then((res) => {
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          baseCodeSupplyEx({ code: "pb_out_whse" }).then((outPh) => {
            baseCodeSupply({ code: "pb_out_whse" }).then((res) => {});
            whseId = res.data.data;
            addOutWhseDla({
              calicoId: this.form.weaveJobCode,
              vatNo: this.form.vatNo,
              whseMaterialFk: whseId,
            }).then((dla) => {
              this.history.forEach((item, i) => {
                if (i == this.dlgForm.noteCode - 1) {
                  // 裁剪的胚布
                  addOutWhseDlb({
                    batchNo: outPh.data.data,
                    countingNo: item.eachNumber || i + 1,
                    custTicket: this.dlgCrud[0].noteCode,
                    weight: this.dlgCrud[0].clothWeight, // 裁剪后胚布
                    weightUnit: item.weightUnit,
                    whseMaterialDlaFk: dla.data.data,
                  }).then();
                } else {
                  addOutWhseDlb({
                    batchNo: outPh.data.data,
                    countingNo: item.eachNumber || i + 1,
                    custTicket: item.noteCode,
                    weight: item.clothWeight,
                    weightUnit: item.weightUnit,
                    whseMaterialDlaFk: dla.data.data,
                  }).then();
                }
              });
            });
          });
        });
        this.history.forEach((item, i) => {
          if (i == this.dlgForm.noteCode - 1) {
            // 新增裁剪出仓的胚布
            // if (item.noteCode.indexOf("-") != -1) {
            //   this.dlgCrud[0].noteCode =
            //     "-" + item.noteCode.split("-")[1] + "-A";
            // } else if (item.noteCode.indexOf("k") != -1) {
            //   this.dlgCrud[0].noteCode =
            //     "k" + item.noteCode.split("k")[1] + "-A";
            // } else {
            //   this.dlgCrud[0].noteCode =
            //     "K" + item.noteCode.split("K")[1] + "-A";
            // }
            addNote(
              Object.assign(this.dlgCrud[0], {
                sourceNoteId: item.noteId,
              })
            ).then((res) => {
              addCalico({
                clothNoteCode: item.noteCode + "-A",
                clothNoteId: res.data.data,
                clothWeight: this.dlgCrud[0].clothWeight,
                proBleadyeRunJobFk: this.form.runJobId,
                sn: i + 1,
              }).then();
            });
            updateNote({
              noteId: item.noteId,
              realWeight: item.realWeight - this.dlgForm.outWeight,
              clothWeight: this.dlgForm.outWeight,
            }).then((res) => {}); //1.修改原布票重量
            // getInwhse({ custTicket: item.noteCode }).then((res) => {
            //   if (res.data.length > 0) {
            //     // 有入仓记录,重量全部出完
            //     updateInwhse({
            //       whseCalicoinDtlboid: res.data[0].whseCalicoinDtlboid,
            //       weight: this.dlgForm.outWeight, // 剩余重量
            //     }).then();
            //   }
            // });

            if (i == this.history.length - 1) {
              setTimeout(() => {
                this.$tip.success("出库成功!");
                this.query();
                this.dialogVisible = false;
                this.dLoading = false;
              }, 1000);
            }
          } else {
            updateNote({ noteId: item.noteId, clothState: 3 }).then(
              (res) => {}
            ); //1.布票状态为出仓
            // getInwhse({ custTicket: item.noteCode }).then((res) => {
            //   if (res.data.length > 0) {
            //     // 有入仓记录,重量全部出完
            //     updateInwhse({
            //       whseCalicoinDtlboid: res.data[0].whseCalicoinDtlboid,
            //       weight: 0,
            //     }).then();
            //   }
            // });
            addCalico({
              clothNoteCode: item.noteCode,
              clothNoteId: item.noteId,
              clothWeight: item.clothWeight,
              proBleadyeRunJobFk: this.form.runJobId,
              sn: i + 1,
            }).then();
            if (i == this.history.length - 1) {
              setTimeout(() => {
                this.$tip.success("出库成功!");
                this.dialogVisible = false;
                this.query();
                this.dLoading = false;
              }, 1000);
            }
          }
        });
      });
    },
    save() {
      if (!this.history.length) {
        this.$tip.warning("请扫描布票!");
        return;
      }
      this.wLoading = true;
      let whseId = "";
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        addOutWhse({
          retType: "1",
          retDate: this.$getNowTime("datetime"),
          retCode: res.data.data,
          retUsername: parent.userID,
          stockState: 0,
          sysCreated: this.$getNowTime("datetime"),
          sysCreatedby: this.$store.state.userOid,
        }).then((res) => {
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          baseCodeSupplyEx({ code: "pb_out_whse" }).then((outPh) => {
            baseCodeSupply({ code: "pb_out_whse" }).then((res) => {});
            whseId = res.data.data;
            addOutWhseDla({
              calicoId: this.form.weaveJobCode,
              vatNo: this.form.vatNo,
              whseMaterialFk: whseId,
            }).then((dla) => {
              this.history.forEach((item, i) => {
                addOutWhseDlb({
                  batchNo: outPh.data.data,
                  countingNo: item.eachNumber || i + 1,
                  custTicket: item.noteCode,
                  weight: item.clothWeight,
                  weightUnit: item.weightUnit,
                  whseMaterialDlaFk: dla.data.data,
                }).then();
              });
            });
          });
        });
        this.history.forEach((item, i) => {
          updateNote({ noteId: item.noteId, clothState: 3 }).then((res) => {}); //1.布票状态为出仓
          // getInwhse({ custTicket: item.noteCode }).then((res) => { // 入仓记录不改变重量
          //   if (res.data.length > 0) {
          //     // 有入仓记录,重量全部出完
          //     updateInwhse({
          //       whseCalicoinDtlboid: res.data[0].whseCalicoinDtlboid,
          //       weight: 0,
          //     }).then();
          //   }
          // });
          addCalico({
            clothNoteCode: item.noteCode,
            clothNoteId: item.noteId,
            clothWeight: item.clothWeight,
            proBleadyeRunJobFk: this.form.runJobId,
            sn: i + 1,
          }).then();
          if (i == this.history.length - 1) {
            setTimeout(() => {
              this.$tip.success("出库成功!");
              this.query();
              this.wLoading = false;
            }, 1000);
          }
        });
      });
    },
    getLoad() {
      this.crud = [];
      if (!this.form.clothNoteCode) {
        this.wLoading = false;
        return;
      }
      getNote({ noteCode: this.form.clothNoteCode, clothState: 2 }).then(
        (res) => {
          this.wLoading = true;
          if (res.data.length) {
            if (res.data[0].proName != this.form.weaveJobCode) {
              setTimeout(() => {
                this.form.clothNoteCode = "";
              }, 500);
              this.$tip.warning("该胚布不属于此生产单号!");
            } else {
              if (this.weight >= this.form.clothWeight) {
                this.$tip.error("合计重量不能大于出仓重量!");
                this.wLoading = false;
                this.form.clothNoteCode = "";
                return;
              }
              if (
                !this.history.some(
                  (item) => item.noteCode == res.data[0].noteCode
                )
              ) {
                this.crud = res.data[0];
                this.crud.weaveJobCode = this.form.weaveJobCode;
                this.history.unshift(this.crud);
                setTimeout(() => {
                  this.form.clothNoteCode = "";
                }, 500);
              } else {
                setTimeout(() => {
                  this.form.clothNoteCode = "";
                }, 500);
                this.$tip.warning("已存在该胚布信息!");
              }

              // this.history = this.$unique(this.history);
            }
          } else {
            this.$tip.warning("暂无数据!");
            setTimeout(() => {
              this.form.clothNoteCode = "";
            }, 500);
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        }
      );
    },
    cancelNote(val) {
      this.history.splice(val.index - 1, 1);
    },
    cellClick(val) {
      this.detail = val;
    },
  },
  created() {},
  mounted() {
    let self = this;
    document.onkeydown = function (e) {
      let ev = document.all ? window.event : e;
      if (ev.keyCode === 13 && self.type === "gh") {
        self.query();
      } else if (ev.keyCode === 13 && self.type === "pb") {
        self.getLoad();
      }
    };
  },
};
</script>
<style lang='stylus'>
.el-tooltip__popper
  font-size 18px !important
#clothFlyScan
  .history
    // display: flex;
    // flex-direction: row;
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    font-size 18px
    text-align left
    text-indent 5px
    span
      margin 5px
  .el-divider--horizontal
    margin 0
  .el-form-item__label, .el-input__inner
    font-size 22px !important
    line-height 50px !important
  .el-tabs__item, .el-button
    font-size 18px !important
  .avue-form .el-input--mini input
    height 58px
    line-height 58px
  .el-card__header
    padding 8px 20px !important
  .btnBox
    .el-button
      margin 0 20px
      // width: 20%;
  .crudBox
    height 100vh
  .text
    font-size 22px
    text-align left
    text-indent 1em
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .item
    // margin-bottom: 18px;
    height 48px
    line-height 48px
  .clearfix:before, .clearfix:after
    display table
    content ''
  .clearfix:after
    clear both
</style>