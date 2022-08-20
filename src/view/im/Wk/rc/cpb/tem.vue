<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + this.$t('iaoMng.rc')">
      <div class="btnList">
        <el-button type="success" @click="save">{{
            this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
            this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="12">
          <view-container :title="datas.type.split('_')[0] + $t('iaoMng.rcmx')">
            <div class="btnList">
              <el-button type="primary" @click="add">{{
                  this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="del">{{
                  this.$t("public.del")
              }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud ref="dlgcrud" :option="mxOp" v-loading="loading" :data="mx" :page.sync="page"
                @current-row-change="cellClick" @on-load="getDetail"><template slot="batchNo" slot-scope="scope">
                  <el-select v-model="scope.row.batchNo" placeholder="请选择" filterable default-first-option clearable
                    class="customize-select" @change="selectChange(scope.row)">
                    <!--  -->
                    <el-option v-for="item in resolveData" :key="item.runJobId" :label="item.label" :value="item.value">
                      <span style="float: left">
                        <!-- -->
                        {{ item.value }}
                      </span>
                    </el-option>
                  </el-select>
                </template></avue-crud>
            </div>
          </view-container>
        </el-col>
        <el-col :span="12">
          <view-container :title="datas.type.split('_')[0] + '货物包'">
            <div class="btnList">
              <el-button type="primary" @click="addPh">{{
                  this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="delPh">{{
                  this.$t("public.del")
              }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud ref="crud" :option="crudOp" v-loading="loading" :data="chooseData.list"
                @current-row-change="cellPhClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
      <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" :dlgWidth="dlgWidth" @choiceData="choiceData"
        @close="choiceV = false" v-if="choiceV"></choice>
      <pro-choice :choiceV="choiceP" :choiceTle="choicePTle" :choiceQ="choiceQ" marginTop="3vh" dlgWidth="80%"
        @choiceData="choiceDataP" @close="choiceP = false" v-if="choiceP"></pro-choice>
    </view-container>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, rsxkr3C } from "./data";
import proChoice from "@/components/proMng/index";
import choice from "@/components/choice";
import {
  addCpb,
  updateCpb,
  getCpbDetali,
  addCpbDetali,
  updateCpbDetali,
  delCpbDetali,
  getCpbDtlb,
  addCpbDtlb,
  updateCpbDtlb,
  delCpbDtlb,
} from "@/api/im/Wk/rc";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { getDicTs, getDicT, getXDicT, postDicT } from "@/config";
import { getProRunJob } from "./api.js";
export default {
  props: {
    datas: Object,
    detail: Object,
    hide: String,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
    proChoice: proChoice
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      phPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      crudOp: rsxkr3C(this),
      count: [],
      ctLoading: false,
      form: {},
      oldData: {},
      chooseData: {},
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choicePTle: "选择成品布信息",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      choiceP: false,
      dlgWidth: "60%",
      resolveData: getDicTs("proBleadyeRunJob", "vatNo", "vatNo", "etSn"),
      // resolveData: [],
      everyThing: {
        // getLoc: getPbPh,
        // delLoc: delPbPhDetali,
        // addLoc: addPbPhDetali,
        // updateLoc: updatePbPhDetali,
      },
      oldPhData: {},
      choosePhData: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (this.isAdd) {
        this.form = this.detail;
        return;
      }
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseFinishedclothinoid
      ) {
        this.mx = [];
        return;
      }
      this.loading = true;
      this.mxOp.showSummary = false;
      // this.oldData = {};
      this.changeList = [];
      this.mx = [];
      this.count = [];
      getCpbDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseFinishedclothinFk: this.detail.whseFinishedclothinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        this.mx.sort((a, b) => {
          return a.batchNo - b.batchNo ? 1 : -1;
        });
        if (this.mx.length === 0) {
          this.loading = false;
        }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          // item.weiUnit = item.weightUnit;
          // item.custId = this.detail.custName;
        });
        setTimeout(() => {
          if (this.mx.length) {
            this.$nextTick(() => {
              this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
            });
          }
          this.mxOp.showSummary = true;
          this.loading = false;
        }, 200);
      });
    },
    add() {
      if (this.hide === "1" || this.hide === "3") {
        // this.choiceV = !this.choiceV;
        // this.choiceTarget = {};
        // this.dlgWidth = "100%";
        // this.choiceTle = this.$t("choicDlg.xzcpbhwb");
        if (this.mx.length) {
          this.mx.push({
            index: this.mx.length + 1,
            weightUnit: this.mx[this.mx.length - 1].weightUnit,
            $cellEdit: true,
            countingNo: this.mx[this.mx.length - 1].countingNo + 1,
            price: this.mx[this.mx.length - 1].price,
            locationCode: this.mx[this.mx.length - 1].locationCode,
            batchNo: this.mx[this.mx.length - 1].batchNo,
            etSn: this.mx[this.mx.length - 1].etSn,
          });
        } else {
          this.mx.push({
            index: 1,
            weightUnit: "KG",
            $cellEdit: true,
            countingNo: 1,
          });
        }
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      }
      if (this.hide === "2") {
        this.mx.push({
          index: this.mx.length + 1,
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      }
      if (this.hide === "5") {
        if (this.form.instructId === "" || this.form.instructId === null) {
          this.$tip.error(this.$t("whseMng.jgzldTle"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceQ.materialType = "2";
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("iaoMng.xzzld");
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseFinishedclothinDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        if (this.mx.length > 0) {
          this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        }
        return;
      }

      let tle = "";

      if (this.hide != "1" && this.hide != "3") {
        tle =
          this.$t("iaoMng.delTle6") +
          this.chooseData.calicoId +
          this.$t("iaoMng.delTle2");
      } else {
        tle = `是否确认删除载具编号为【${this.chooseData.storeLoadCode}】的数据?`;
      }
      this.$tip
        .cofirm(tle, this, {})
        .then(() => {
          delCpbDetali(this.chooseData.whseFinishedclothinDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
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
    choiceDataP(array) {
      array.map((e, i) => {
        if (this.chooseData.list.findIndex(item => item.productNo === e.productNo) == -1) {
          this.chooseData.list.push({
            productNo: e.productNo,
            weight: (e.weightUnit == "KG") ? e.netWeight : e.netWeightLbs,
            weightUnit: e.weightUnit
          });
        } else {
          this.$tip.warning(`成品编号【${e.productNo}】已经有了, Bạn đã thêm mã này rồi!`)
        }
      })
      this.$refs.crud.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
      this.choiceP = false;
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要新增的入仓明细");
        return;
      }
      this.choiceP = true;
    },
    delPh() {
      // if (Object.keys(this.choosePhData).length === 0) {
      //   this.$tip.error(this.$t("public.delTle"));
      //   return;
      // }
      // console.log(this.choosePhData);
      if (!this.choosePhData.indtlId) {
        this.chooseData.list.splice(this.choosePhData.index - 1, 1);
        this.choosePhData = {};
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseData.list.length > 0) {
          this.$refs.crud.setCurrentRow(this.chooseData.list[0]);
        }
        return;
      }
      this.$tip
        .cofirm(
          `是否确认删除成品编号为【${this.choosePhData.productNo}】的数据?`,
          this,
          {}
        )
        .then(() => {
          delCpbDtlb(this.choosePhData.indtlId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.chooseData.list.splice(this.choosePhData.index - 1, 1);
                this.choosePhData = {};
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseData.list.length > 0) {
                  this.$refs.crud.setCurrentRow(this.chooseData.list[0]);
                }
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
      // if (val.etList) {
      //   this.mxOp.column[7].dicData = val.etList;
      // } else {
      //   this.getEt(val);
      // }
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      } else {
        this.$refs.crud.setCurrentRow(this.chooseData.list[0]);
      }
      if (
        !this.chooseData.list.length &&
        this.chooseData.whseFinishedclothinDtloid
      ) {
        this.getPh();
      }
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    getPh() {
      this.loading = true;
      this.crudOp.showSummary = false;
      getCpbDtlb({
        productDtlFk: this.chooseData.whseFinishedclothinDtloid,
      }).then((res) => {
        // this.chooseData.list = [];
        let data = res.data.sort((a, b) => {
          return a.productNo > b.productNo ? 1 : -1;
        });
        data.forEach((item, i) => {
          item.index = i + 1;
          if (i == data.length - 1) {
            this.crudOp.showSummary = true;
            this.chooseData.list = data;
            this.loading = false;
          }
        });
        if (!data.length) {
          this.crudOp.showSummary = true;
          this.chooseData.list = [];
          this.loading = false;
        }
      });
    },
    save() {
      if (this.hide === "1" && this.form.yinId === "") {
        this.$tip.error(this.$t("whseField.rcbhTle"));
        return;
      }
      if (this.hide === "2" && this.form.custName === "") {
        this.$tip.error(this.$t("iaoMng.saveTle11"));
        return;
      }
      if (this.hide === "1" && this.mx.length == 0) {
        this.$tip.error('请选择要新增的入仓明细！');
        return;
      }
      for (let index = 0; index < this.mx.length; index++) {
        const e = this.mx[index];
        if (e.storeLoadCode === undefined || e.sumWeight === undefined || e.weightUnit === undefined) {
          this.$tip.warning("请检查数据载具编号，重量，单位不能为空! Vui lòng kiểm tra lại dữ liệu");
          this.$refs.dlgcrud.setCurrentRow(this.mx[index]);
          return;
        }
      }

      for (let i = 0; i < this.mx.length; i++) {
        // if (!this.mx[i].batchNo) {
        //   this.$tip.error(this.$t("iaoMng.saveTle12"));
        //   return;
        // }
        // if (!this.mx[i].weight || !this.mx[i].weightUnit) {
        //   this.$tip.error(this.$t("iaoMng.saveTle6"));
        //   return;
        // }
        // if (!this.mx[i].countingNo) {
        //   this.$tip.error(this.$t("iaoMng.saveTle10"));
        //   return;
        // }
        if (this.mx[i].list) {
          for (let j = 0; j < this.mx[i].list.length; j++) {
            if (!this.mx[i].list[j].weight || !this.mx[i].list[j].weightUnit) {
              this.$refs.dlgcrud.setCurrentRow(this.mx[i]);
              this.$refs.crud.setCurrentRow(this.mx[j]);
              this.$tip.error("成品布重量不能为空!");
              return;
            } else if (!this.mx[i].list[j].productNo) {
              this.$refs.dlgcrud.setCurrentRow(this.mx[i]);
              this.$refs.crud.setCurrentRow(this.mx[j]);
              this.$tip.error("成品编号不能为空!");
              return;
            }
          }
        }
        // if (this.hide === "6" && !this.mx[i].countingNo) {
        //   this.$tip.error("入仓疋数不能为空!");
        //   return;
        // }
      }
      this.saved = true;

      this.form.yinDate = `${this.form.yinDate} 00:00:00`;
      if (this.form.finStatus === "" || this.form.finStatus === "null") {
        this.form.finStatus = "";
      }

      if (this.form.whseFinishedclothinoid) {
        updateCpb(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = "";
              data.list = "";
              data.countingNo = item.list.length || 0;
              // this.mx.forEach((item, i) => {
              //   console.log(data);
              if (item.whseFinishedclothinDtloid) {
                // 更新

                updateCpbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseFinishedclothinFk = this.form.whseFinishedclothinoid;
                addCpbDetali(data).then((res) => {
                  item.whseFinishedclothinDtloid = res.data.data;
                  resolve();
                });
              }
              // });
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].list && this.mx[i].list.length > 0) {
                this.mx[i].list.forEach((item) => {
                  item.productDtlFk = this.mx[i].whseFinishedclothinDtloid;
                  if (!item.indtlId) {
                    addCpbDtlb(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    updateCpbDtlb(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      } else {
        addCpb(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          this.form.whseFinishedclothinoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = "";
              data.list = "";
              data.countingNo = item.list.length || 0;
              if (item.whseFinishedclothinDtloid) {
                // 更新
                updateCpbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseFinishedclothinFk = this.form.whseFinishedclothinoid;
                addCpbDetali(data).then((res) => {
                  item.whseFinishedclothinDtloid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].list && this.mx[i].list.length > 0) {
                this.mx[i].list.forEach((item) => {
                  item.productDtlFk = this.mx[i].whseFinishedclothinDtloid;
                  if (!item.indtlId) {
                    addCpbDtlb(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    updateCpbDtlb(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      }
    },
    close() {
      this.$emit("close", this.saved);
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget.yarnsName = val.yarnsId;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      if (this.choiceTle === this.$t("choicDlg.xzhw")) {
        this.chooseData.locationCode = val[0].locationCode;
      }
      if (this.choiceTle === this.$t("choicDlg.xzcpbhwb")) {
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("iaoMng.xzzld")) {
        val.forEach((item, i) => {
          item.calicoId = item.materialId;
          item.clothName = item.materialName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
        });
        this.mx = this.mx.concat(val);
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzddpbzl")) {
        val.forEach((item, i) => {
          item.prodNo = item.$salPoFk;
          item.calicoId = item.fabId;
          item.clothName = item.fabName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.fabQty,
            weightUnit: item.qtyUnit,
          });
        });
        this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzhw")) {
        this.chooseData.locationCode = val[0].locationCode;
      }
      if (this.choiceTle === this.$t("choicDlg.xzwfpbpl")) {
        this.form.factoryId = val.refCode;
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    selectChange(val) {
      if (val.batchNo) {
        getProRunJob({
          vatNo: val.batchNo,
        }).then((res) => {
          // this.$nextTick(() => {
          if (res.data.length > 0) {
            // val.etSn = res.data[0].etSn;
            this.$set(val, "etSn", res.data[0].etSn);
          } else {
            val.etSn = "";
          }
          // });
        });
      }

      // this.$nextTick(() => {
      //   let data = JSON.parse(JSON.stringify(item));
      //   let dicData = [];
      //   this.mxOp.column[7].dicData = [];
      //   if (data.itemspec) {
      //     let list = data.itemspec.replace(/\s*/g, "").split("+");
      //     list.forEach((item) => {
      //       if (item) {
      //         dicData.push({
      //           label: item,
      //           value: item,
      //         });
      //       }
      //     });
      //     row.etSn = data.itemspec.replace(/\s*/g, "").split("+")[0];
      //     row.batchNo = item.value;
      //   } else {
      //     row.etSn = "";
      //   }
      //   this.mxOp.column[7].dicData = dicData;
      //   row.etList = dicData;
      //   // this.$refs.dlgcrud.setCurrentRow(row);
      // });
    },
    getEt() {
      // this.$nextTick(() => {
      //   if (this.chooseData.batchNo) {
      //     getProRunJob({
      //       vatNo: this.chooseData.batchNo,
      //     }).then((res) => {
      //       if (res.data.length) {
      //         let data = res.data[0];
      //         if (!data.etSn) {
      //           data.etSn = "";
      //         }
      //         let list = data.etSn.replace(/\s*/g, "").split("+");
      //         let etlist = [];
      //         list.forEach((item) => {
      //           if (item) {
      //             etlist.push({
      //               label: item,
      //               value: item,
      //             });
      //           }
      //         });
      //         this.chooseData.etSn = data.etSn
      //           .replace(/\s*/g, "")
      //           .split("+")[0];
      //         console.log(etlist);
      //         this.mxOp.column[7].dicData = etlist;
      //       } else {
      //         this.mxOp.column[7].dicData = [];
      //       }
      //     });
      //   } else {
      //     // this.mxOp.column[7].dicData = [];
      //   }
      // });
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    this.form.sysCreatedby = this.$store.state.userOid;
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail
  // .el-input.is-disabled .el-input__inner {
  // color: #606266;
  // background-color: #fff;
  // }
</style>