<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '资料'"
      v-loading="outloading"
      element-loading-text="正在加載..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <div class="btnList">
        <el-button type="success" @click="savePlan">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="hide === '4' || hide === '3' || hide === '5' ? 24 : 12">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <div class="btnList" style="margin-bottom: 2px">
              <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
              <el-button type="primary" @click="add" v-if="canSave">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="del" v-if="canSave">{{
                this.$t("public.del")
              }}</el-button>

              <!-- <el-button type="warning" @click="getDetail">取消</el-button>
       -->
            </div>
            <avue-crud
              ref="dlgcrud"
              :option="mxOp"
              v-loading="loading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            ></avue-crud> </view-container
        ></el-col>
        <el-col :span="12" v-if="hide != '4' && hide != '3' && hide != '5'">
          <view-container :title="datas.type.split('_')[0] + '批号资料'">
            <div class="btnList" style="margin-bottom: 2px">
              <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
              <el-button type="primary" @click="addPh" v-if="canSave">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="delPh" v-if="canSave">{{
                this.$t("public.del")
              }}</el-button>
              <!-- <el-button type="success" @click="savePh" v-if="!isPlan"
                >{{this.$t("public.save")}}</el-button
              > -->
              <!-- <el-button type="warning" @click="getDetail">取消</el-button>
        <el-button type="warning" @click="close">{{this.$t("public.close")}}</el-button> -->
            </div>
            <avue-crud
              ref="dlgPhcrud"
              :option="rcOp"
              v-loading="rcloading"
              :data="chooseData.list"
              :page.sync="page"
              @current-row-change="cellPhClick"
            ></avue-crud>
          </view-container>
        </el-col>
      </el-row>

      <el-dialog
        id="sxPlanDlg"
        :visible.sync="sxV"
        append-to-body
        fullscreen
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="sxclose"
        v-if="sxV"
      >
        <view-container :title="dlgTle">
          <div class="btnList">
            <el-button type="success" @click="check">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button type="primary" @click="getPbData">{{
              this.$t("public.query")
            }}</el-button>
            <el-button type="warning" @click="sxclose">{{
              this.$t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form
              ref="sxform"
              :option="sxformOp"
              v-model="sxform"
            ></avue-form>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="sxcrud"
              id="sxcrud"
              :option="outcrudOp"
              :data="sxcrud"
              :page.sync="sxpage"
              v-loading="loading"
              @on-load="getPbData"
              @selection-change="sxselectionChange"
            ></avue-crud>
          </div>
        </view-container>
      </el-dialog>
    </view-container>
    <choice
      ref="choice"
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
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C, rcpb3C } from "./data";
import choice from "@/components/choice";
import {
  getPb,
  getPbDetali,
  getCpbDetaliList,
  getCpbDetali,
} from "@/api/im/Wk/rc";
import {
  getFinclothsellout,
  addFinclothsellout,
  updateFinclothsellout,
  delFinclothsellout,
  getFinclothselloutDtla,
  addFinclothselloutDtla,
  updateFinclothselloutDtla,
  delFinclothselloutDtla,
  getFinclothselloutDtlb,
  addFinclothselloutDtlb,
  updateFinclothselloutDtlb,
  delFinclothselloutDtlb,
} from "@/api/im/Wk/cc/cpb";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
    detail: Object,
    PlanForm: Object,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      rcPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      canLeave: false,
      ruleV: false,
      sxV: false,
      sxformOp: sxForm(this),
      sxform: {},
      outform: {},
      outformOp: rsxkr2F(this),
      outcrudOp: rsxkr2C(this),
      outcrud: [],
      sxcrud: [],
      sxpage: {},
      rcOp: rcpb3C(this),
      rcData: [],
      sxloading: false,
      rcloading: false,
      sxcheckList: [],
      planData: {},
      func: {},
      dlgTle: "選擇紗線配料",
      choosePh: {},
      isPh: false,
      canSave: true,
      outloading: false,
      choiceV: false,
      choiceTle: "选择订单胚布资料",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseFinclothselloutoid
      ) {
        this.mx = [];
        this.loading = false;
        return;
      }
      this.func.getDetail = getFinclothselloutDtla;
      this.func.delDetail = delFinclothselloutDtla;
      this.func.addDetail = addFinclothselloutDtla;
      this.func.getPhDetail = getFinclothselloutDtlb;
      this.func.delPhDetail = delFinclothselloutDtlb;
      this.func.addPhDetail = addFinclothselloutDtlb;
      this.chooseData = {};
      // this.mxOp = rsxkr3C(this);
      this.func
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseFinclothselloutFk: this.detail.whseFinclothselloutoid,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          if (this.mx.length === 0) {
            this.loading = false;
          }
          this.mx.forEach((item, index) => {
            item.index = index + 1;
            item.colorName = item.salPoDtlaFk;
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                this.loading = false;
              }, 200);
            }
          });
        });
    },
    getPhDetail(val) {
      console.log(val);
      if (val === null || !val.whseFinclothselloutDtlaoid) {
        this.rcData = [];
        return;
      }
      this.rcloading = true;
      this.rcOp.showSummary = false;
      this.func
        .getPhDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseFinclothselloutDtlaFk: val.whseFinclothselloutDtlaoid,
        })
        .then((res) => {
          let records = res.data;
          this.rcPage.total = records.total;
          this.rcData = records.records;
          if (this.rcData.length === 0) {
            this.rcloading = false;
          }
          this.rcData = this.rcData.sort((a, b) => {
            return b.countingNo - a.countingNo;
          });
          this.rcData.forEach((item, index) => {
            item.index = index + 1;
            if (this.hide === "6") {
              item.weight = item.woWeights;
              item.weightUnit = item.woUnit;
              item.custTicket = item.ticketNo;
              item.batchNo = item.prodNo;
            }

            if (index === this.rcData.length - 1) {
              this.$nextTick(() => {
                this.chooseData.list = this.rcData;
                // this.$set(this.chooseData, "list", this.rcData);
              });
              this.rcOp.showSummary = true;
              this.choosePh = {};
              this.rcloading = false;
            }
          });
        });
    },
    add() {
      if (!this.form.spNo) {
        this.$tip.error("請先選擇貨運計劃!");
        return;
      }
      this.choiceV = !this.choiceV;
      this.dlgWidth = "100%";
      // this.choiceQ.poNo = this.form.poNo;
      this.choiceTle = this.$t("choicDlg.xzddpbzl");
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择明细资料!");
        return;
      }
      // if (this.hide === "6") {
      //   //   this.choiceV = !this.choiceV;
      //   //   this.choiceField = "woOrderno";
      //   //   this.choiceQ.calicoId = this.chooseData.woMatno;
      //   //   this.oldData = this.chooseData;
      //   //   this.choiceTarget = this.oldData;
      //   //   this.choiceTle = this.$t("choicDlg.xzpbph");
      // }
      // } else {
      this.outcrudOp = rcpb3C(this);
      this.outcrudOp.selection = true;
      this.outcrudOp.showSummary = false;
      this.outcrudOp.height = "calc(100vh - 205px)";
      this.isPh = true;
      this.sxV = true;
      // }
    },
    del() {
      if (
        this.chooseData == null ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseFinclothselloutDtlaoid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为【 " + this.chooseData.woMatno + " 】的数据?",
          this,
          {}
        )
        .then(() => {
          this.func
            .delDetail(this.chooseData.whseFinclothselloutDtlaoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
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
    delPh() {
      if (this.choosePh == null || Object.keys(this.choosePh).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.choosePh.whseFinclothselloutDtlboid) {
        this.chooseData.list.splice(this.choosePh.index - 1, 1);
        this.$refs.dlgPhcrud.setCurrentRow();
        return;
      }
      let tip =
        "是否确定删除缸号为 【 " + this.choosePh.batchNo + " 】的数据？";
      this.$tip
        .cofirm(tip, this, {})
        .then(() => {
          this.func
            .delPhDetail(this.choosePh.whseFinclothselloutDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.rcData.splice(this.choosePh.index - 1, 1);
                this.getPhDetail(this.chooseData);
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
    cellClick(val) {
      if (val === null) {
        return;
      }
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      this.getPhDetail(val);
    },
    cellPhClick(val) {
      this.choosePh = val;
    },
    close() {
      this.$emit("close");
    },
    getPbData() {
      this.sxloading = true;
      this.sxcrud = [];
      if (this.isPh) {
        if (this.hide === "6") {
          this.chooseData.calicoId = this.chooseData.woMatno;
        }
        this.dlgTle = "成品布批号资料";
        getCpbDetaliList().then((res) => {
          this.sxform.calicoId = this.chooseData.calicoId;
          for (var key in this.sxform) {
            if (this.sxform[key] === "") {
              delete this.sxform[key];
            }
          }
          if (res.data.length === 0) {
            this.sxloading = false;
            return;
          }

          let getInfo = (item, i) => {
            return new Promise((resolve, reject) => {
              getCpbDetali(
                Object.assign(this.sxform, {
                  rows: this.sxpage.pageSize,
                  start: this.sxpage.currentPage,
                  whseFinishedclothinFk: item.whseFinishedclothinoid,
                })
              ).then((Res) => {
                resolve(Res.data.records, i);
              });
            });
          };
          let promiseArr = res.data.map((item, i) => {
            return getInfo(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            res.forEach((item, i) => {
              this.sxcrud = this.sxcrud.concat(item);
              if (i === res.length - 1) {
                if (this.sxcrud.length === 0) {
                  this.sxloading = false;
                }

                this.sxcrud.forEach((items, index) => {
                  items.index = index + 1;
                  items.prodNo = items.whseCalicoinDtlaFk;
                  if (index === this.sxcrud.length - 1) {
                    this.sxpage.total = this.sxcrud.length;
                    this.sxloading = false;
                  }
                });
              }
            });
          });
        });
      } else {
        this.sxform.calicoId = "";
        let type = "";
        if (this.hide === "1") {
          this.func.getPlan = getPbPlan;
        } else if (this.hide === "2") {
          this.func.getPlan = getPbOutPlan;
        }
        this.dlgTle = "胚布明细";
        this.func
          .getPlan(
            Object.assign(this.form, {
              rows: this.page.pageSize,
              start: this.page.currentPage,
              // whseMaterialPlanoid: this.detail.whseMaterialPlanoid,
              retBatch: this.detail.retBatch,
            })
          )
          .then((Res) => {
            if (Res.data.records.length === 1) {
              this.planData = Res.data.records[0];
              this.sxform = this.planData;
              for (var key in this.sxform) {
                if (this.sxform[key] === "") {
                  delete this.sxform[key];
                }
              }
              getEmbryogenesisDtl(
                Object.assign(this.sxform, {
                  rows: this.sxpage.pageSize,
                  start: this.sxpage.currentPage,
                  // calicoId: this.planData.calicoId,
                })
              ).then((res) => {
                let records = res.data;
                this.sxpage.total = records.total;
                this.sxcrud = records.records;
                this.sxcrud = this.unique(this.sxcrud, "calicoId");
                if (this.sxcrud.length === 0) {
                  this.sxloading = false;
                }
                this.sxcrud.forEach((item, index) => {
                  item.index = index + 1;
                  // item.calicoName = item.calicoId;
                  // item.retBatch = this.planData.retBatch;
                  // item.equCode = this.planData.equCode;
                  // item.equName = this.planData.equName;
                  // item.yinId = item.whseCalicoinFk;
                  if (index === this.sxcrud.length - 1) {
                    this.sxloading = false;
                  }
                });
              });
            }
          });

        // });
      }
    },
    sxselectionChange(val) {
      // 选中纱线
      this.sxcheckList = val;
      this.changeList = this.sxcheckList;
    },
    check() {
      // 选择胚布
      if (this.isPh) {
        for (let i = 0; i < this.sxcheckList.length; i++) {
          for (let j = 0; j < this.chooseData.list.length; j++) {
            if (
              this.sxcheckList[i].custTicket ===
              this.chooseData.list[j].custTicket
            ) {
              this.sxcheckList[i].whseMaterialDlboid = this.chooseData.list[
                j
              ].whseMaterialDlboid;
              break;
            }
          }
        }
        // if (this.isPlan) {
        // this.chooseData.list = this.unique(
        //   this.chooseData.list.concat(this.sxcheckList),
        //   "custTicket"
        // );
        this.chooseData.list = this.chooseData.list.concat(this.sxcheckList);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
          item.prodNo = item.batchNo;
          item.prodNo = item.$prodNo;
          item.woWeights = item.weight;
          item.woUnit = item.weightUnit;
          item.ticketNo = item.custTicket;
        });
        // }
        // else {
        //   this.rcData = this.unique(
        //     this.rcData.concat(this.sxcheckList),
        //     "custTicket"
        //   );
        //   this.rcData.forEach((item, i) => {
        //     item.index = i + 1;
        //   });
        // }
      } else {
        for (let i = 0; i < this.sxcheckList.length; i++) {
          for (let j = 0; j < this.mx.length; j++) {
            if (this.sxcheckList[i].calicoId === this.mx[j].calicoId) {
              this.sxcheckList[i].whseMaterialDlaoid = this.mx[
                j
              ].whseMaterialDlaoid;
              break;
            }
          }
        }
        if (this.hide != "3" && this.hide != "4" && this.hide != "5") {
          this.mx = this.unique(this.mx.concat(this.sxcheckList), "calicoId");
          this.mx.forEach((item, index) => {
            item.index = index + 1;
          });
        } else {
          this.sxcheckList.forEach((item, i) => {
            item.whseMaterialFk = this.detail.whseMaterialoid;
            item.index = this.mx.length + 1;
          });

          this.mx = this.unique(
            this.mx.concat(this.sxcheckList),
            "whseCalicoinDtlaoid"
          );
        }
      }
      this.sxcheckList = [];
      this.sxclose();
    },
    save() {
      if (this.mx.length === 0) {
        return;
      }
      this.loading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          if (!item.whseFinclothselloutDtlaoid) {
            item.whseFinclothselloutFk = this.detail.whseFinclothselloutoid;
            item.salPoDtlaFk = item.salPoDtlaoid;
            let data = JSON.parse(JSON.stringify(item));
            data.list = [];
            this.func.addDetail(data).then((res) => {
              item.whseFinclothselloutDtlaFk = res.data.data;
              resolve();
            });
          } else {
            item.whseFinclothselloutDtlaFk = item.whseFinclothselloutDtlaoid;
            resolve();
          }
        });
      };

      let promiseArr = this.mx.map((item, i) => {
        return addDtla(item, i);
      });

      Promise.all(promiseArr).then((res) => {
        for (let i = 0; i < this.mx.length; i++) {
          if (this.mx[i].list) {
            this.mx[i].list.forEach((item) => {
              if (!item.whseFinclothselloutDtlboid && this.hide === "6") {
                item.whseFinclothselloutDtlaFk = this.mx[
                  i
                ].whseFinclothselloutDtlaFk;
                item.prodNo = item.batchNo;
                this.func.addPhDetail(item).then((res) => {
                  item.whseFinclothselloutDtlboid = res.data.data;
                });
              }
            });
          }
          if (i === this.mx.length - 1) {
            this.changeList = [];
            // this.getDetail();
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
        }
      });

      // this.mx.forEach((item, index) => {
      //   if (!item.whseMaterialDlaoid && !item.whseCalicoselloutDtlaoid) {
      //     item.whseMaterialFk = this.detail.whseMaterialoid;
      //     item.whseCalicoselloutFk = this.detail.whseCalicoselloutoid;
      //   }
      //   if (index === this.mx.length - 1) {
      //     this.getDetail();
      //     this.$tip.success(this.$t("public.bccg"));
      //   }
      // });
      // this.changeList = [];
    },
    savePh() {
      return;
      if (this.rcData.length === 0) {
        return;
      }
      this.rcloading = true;
      this.rcData.forEach((item, index) => {
        if (!item.whseMaterialDlboid) {
          item.whseMaterialDlaFk = this.chooseData.whseMaterialDlaoid;
          this.func.addPhDetail(item).then((res) => {});
        }
        if (index === this.rcData.length - 1) {
          this.changeList = [];
          this.getPhDetail(this.chooseData);
          this.$tip.success(this.$t("public.bccg"));
        }
      });
    },
    // 生成领料计划
    savePlan() {
      if (this.form.retDate === "" || this.form.woDate === "") {
        this.$tip.error("请输入出仓编号/日期");
        return;
      }
      // console.log(this.mx);
      // return;
      this.outloading = true;
      try {
        if (!this.form.whseFinclothselloutoid) {
          addFinclothsellout(this.form).then((res) => {
            this.form.whseFinclothselloutoid = res.data.data;
            let addPb = (item, i) => {
              return new Promise((resolve, reject) => {
                if (!item.whseFinclothselloutDtlaoid) {
                  addFinclothselloutDtla({
                    whseFinclothselloutFk: this.form.whseFinclothselloutoid,
                    woMatno: item.woMatno,
                    woMatname: item.woMatname,
                    woOrderno: item.woOrderno,
                    salPoDtlaFk: item.salPoDtlaoid,
                  }).then((Res) => {
                    item.whseFinclothselloutDtlaoid = Res.data.data;
                    resolve();
                  });
                } else {
                  resolve();
                }
              });
            };

            let promiseArr = this.mx.map((item, i) => {
              return addPb(item, i);
            });
            Promise.all(promiseArr).then((res) => {
              this.mx.forEach((item, i) => {
                if (item.list != undefined && item.list.length > 0) {
                  item.list.forEach((mx, j) => {
                    if (!mx.whseFinclothselloutDtlboid) {
                      mx.prodNo = mx.batchNo;
                      addFinclothselloutDtlb(
                        Object.assign(mx, {
                          whseFinclothselloutDtlaFk:
                            item.whseFinclothselloutDtlaoid,
                        })
                      ).then((phRes) => {
                        mx.whseFinclothselloutDtlboid = phRes.data.data;
                      });
                    }
                  });
                }

                if (i === this.mx.length - 1) {
                  // this.getDetail();
                  this.canSave = false;
                  this.outloading = false;
                  this.$emit("updateList");
                  this.$tip.success(this.$t("public.bccg"));
                }
              });
              if (this.mx.length === 0) {
                this.canSave = false;
                this.outloading = false;
                this.$emit("updateList");
                this.$tip.success(this.$t("public.bccg"));
              }
            });
          });
        } else {
          let addPb = (item, i) => {
            return new Promise((resolve, reject) => {
              if (!item.whseFinclothselloutDtlaoid) {
                addFinclothselloutDtla({
                  whseFinclothselloutFk: this.form.whseFinclothselloutoid,
                  woMatno: item.woMatno,
                  woMatname: item.woMatname,
                  woOrderno: item.woOrderno,
                  salPoDtlaFk: item.salPoDtlaoid,
                }).then((Res) => {
                  item.whseFinclothselloutDtlaoid = Res.data.data;
                  resolve();
                });
              } else {
                resolve();
              }
            });
          };

          let promiseArr = this.mx.map((item, i) => {
            return addPb(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            this.mx.forEach((item, i) => {
              if (item.list != undefined && item.list.length > 0) {
                item.list.forEach((mx, j) => {
                  if (!mx.whseFinclothselloutDtlboid) {
                    mx.prodNo = mx.batchNo;
                    addFinclothselloutDtlb(
                      Object.assign(mx, {
                        whseFinclothselloutDtlaFk:
                          item.whseFinclothselloutDtlaoid,
                      })
                    ).then((phRes) => {
                      mx.whseFinclothselloutDtlboid = phRes.data.data;
                    });
                  }
                });
              }

              if (i === this.mx.length - 1) {
                // this.getDetail();
                this.canSave = false;
                this.outloading = false;
                this.$emit("updateList");
                this.$tip.success(this.$t("public.bccg"));
              }
            });
            if (this.mx.length === 0) {
              this.canSave = false;
              this.outloading = false;
              this.$emit("updateList");
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        }
      } catch (error) {
        this.outloading = false;
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      // if (this.choiceTle === "选择订单胚布资料") {
      //   let data = {
      //     woMatno: val.fabId,
      //     woMatname: val.fabName,
      //     woOrderno: val.$salPoFk,
      //     salPoDtlaoid: val.salPoDtlaoid,
      //     colorName: val.colorName,
      //     index: this.mx.length + 1,
      //   };

      //   this.mx.push(data);
      //   // this.changeList.push(data);
      // }
      if (this.choiceTle === this.$t("choicDlg.xzddpbzl")) {
        val.forEach((item, i) => {
          item.woMatno = item.fabId;
          item.woMatname = item.fabName;
          item.woOrderno = item.$salPoFk;
        });
        this.mx = this.$unique(this.mx.concat(val), "woOrderno");
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = this.mx.length;
      }
      if (this.choiceTle === this.$t("choicDlg.xzhyjh")) {
        this.form.spNo = val.spNo;
      }
      this.oldData.$cellEdit = true;
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    sxclose() {
      // this.outcrudOp.column[3].hide = true;
      // this.outcrudOp.column[4].hide = true;
      // this.outcrudOp.column[5].hide = true;
      this.outcrudOp.selection = false;
      this.outcrudOp.showSummary = true;
      this.outcrudOp.height = "calc(100vh - 275px)";
      this.sxcheckList = [];
      this.sxV = false;
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
  },
  created() {},
  mounted() {
    this.rcOp.height = "calc(100vh - 275px)";
    if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
      this.mxOp = rsxkr3C(this);
    }
    // if (this.hide === "6") {
    //   this.detail.retCode = this.detail.woOutno;
    //   this.detail.retDate = this.detail.woDate;
    // }

    this.form = this.detail;
    this.form.sysCreatedby = this.$store.state.userOid;
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#sxPlanDlg {
  .el-dialog__header {
    padding: 0;
  }

  .el-card {
    border: none;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header {
    padding: 0px;
    background-color: rgb(2, 26, 60);
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
    min-height: 5px !important;
    height: 5px !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }

  .el-table__header-wrapper, .el-form-item__label, .el-input--mini {
    // font-size: 16px !important;
    // font-weight: 600 !important;
    // color: #000;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
  }

  // .avue-form__group {
  // background-color: #fff;
  // }

  // .el-table--mini td, .el-table--mini th {
  // padding: 2px 0 !important;
  // }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .avue-crud__tip {
    display: none;
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
}

#rcDetail {
}
</style>