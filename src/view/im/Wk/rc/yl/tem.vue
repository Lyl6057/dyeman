<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + this.$t('iaoMng.rc')">
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
        <!-- <el-button type="primary" @click="add">{{this.$t("public.add")}}</el-button>
        <el-button type="danger" @click="del">{{ this.$t("public.del") }}</el-button> -->
        <el-button type="success" @click="saveAll" :loading="loading">{{
          this.$t("public.save")
        }}</el-button>
        <!-- <el-button type="warning" @click="getDetail">取消</el-button> -->
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
              <el-button
                type="primary"
                @click="add"
                v-if="hide != '8' && hide != '2'"
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button type="danger" @click="del">{{
                this.$t("public.del")
              }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="dlgcrud"
                :option="mxOp"
                v-loading="loading"
                :data="mx"
                :page.sync="page"
                @current-row-change="cellClick"
                @on-load="getDetail"
              ></avue-crud></div></view-container
        ></el-col>
        <el-col :span="12">
          <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane
              :label="datas.type.split('_')[0] + $t('iaoMng.rcphzl')"
              name="ph"
            >
              <div class="btnList">
                <el-button type="primary" @click="addPh">{{
                  this.$t("public.add")
                }}</el-button>
                <el-button type="danger" @click="delPh">{{
                  this.$t("public.del")
                }}</el-button>
              </div>
              <div class="crudBox">
                <avue-crud
                  ref="count"
                  id="count"
                  v-loading="ctLoading"
                  :option="countOp"
                  :data="chooseData.list"
                  @current-row-change="cellPhClick"
                ></avue-crud>
              </div>
            </el-tab-pane>
            <el-tab-pane
              :label="datas.type.split('_')[0] + $t('iaoMng.rcmxhw')"
              name="loc"
            >
              <loction
                ref="loc"
                :inData="chooseData"
                :api="everyThing"
                :form="form"
                :type="this.$t('iaoMng.yl')"
              ></loction>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <choice
        :choiceV="choiceV"
        :choiceTle="choiceTle"
        :choiceQ="choiceQ"
        :dlgWidth="dlgWidth"
        @choiceData="choiceData"
        @close="choiceV = false"
        v-if="choiceV"
      ></choice>
    </view-container>
  </div>
</template>
<script>
import { rhl2C, rhl2F, rhl3C } from "./data";
import choice from "@/components/choice";
import {
  getYlDtla,
  addYlDtla,
  updateYlDtla,
  delYlDtla,
  getYlDtlb,
  addYlDtlb,
  updateYlDtlb,
  delYlDtlb,
  addYl,
  updateYl,
  getYlLoc,
  addYlLoc,
  updateYlLoc,
  delYlLoc,
} from "@/api/im/Wk/rc";
import { baseCodeSupply } from "@/api/index";
import loction from "@/components/location/index";
export default {
  props: {
    datas: Object,
    detail: Object,
    hide: String,
    isAdd: Boolean,
    addList: Array,
  },
  name: "",
  components: {
    choice: choice,
    loction: loction,
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
      formOp: rhl2F(this),
      mxOp: rhl2C(this),
      countOp: rhl3C(this),
      mx: [],
      other: [],
      count: [],
      ctLoading: false,
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      oldPhData: {},
      choosPheData: {},
      changePhList: [],
      canLeave: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      modified: false,
      dlgWidth: "60%",
      tabs: "ph",
      everyThing: {
        getLoc: getYlLoc,
        delLoc: delYlLoc,
        addLoc: addYlLoc,
        updateLoc: updateYlLoc,
      },
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (this.isAdd) {
        this.addList.forEach((item, i) => {
          item.index = 1 + i;
          item.chemicalId = item.materialNum;
          item.chemicalName = item.chinName;
          item.batchNo = item.batNo;
          item.weight = item.deliQty;
          item.weightUnit = item.deliUnit;
        });
        this.mx = this.addList;
        return;
      }
      this.loading = true;
      this.changeList = [];
      this.changePhList = [];
      this.mx = [];
      this.mxOp.showSummary = false;
      getYlDtla({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseDyesalinFk: this.detail.whseDyesalinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        if (this.mx.length === 0) {
          this.loading = false;
        }

        // this.$refs.count.setCurrentRow();
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          item.bcMatengname = item.chemicalId;
          item.bcColor = item.chemicalId;
          item.bcForce = item.chemicalId;
          // item.custId = this.detail.custName;
          if (index === this.mx.length - 1) {
            this.mxOp.showSummary = true;
            setTimeout(() => {
              this.$refs.dlgcrud.setCurrentRow(this.mx[0] || {});
              this.loading = false;
            }, 200);
          }
        });
      });
    },
    getPh() {
      if (this.isAdd) {
        if (this.chooseData.list) {
          if (this.chooseData.list.length != 0) {
            this.$refs.count.setCurrentRow(this.chooseData.list[0]);
          }
        }
        return;
      }
      if (!this.chooseData.whseDyesainDtlaoid) {
        this.chooseData.list = [];
        return;
      }
      if (this.chooseData.list) {
        if (this.chooseData.list.length != 0) {
          this.$refs.count.setCurrentRow(this.chooseData.list[0]);
          return;
        }
      }
      this.ctLoading = true;
      this.countOp.showSummary = false;
      this.changePhList = [];
      getYlDtlb({
        whseDyesainDtlaFk: this.chooseData.whseDyesainDtlaoid,
        // rows: this.phPage.pageSize,
        // start: this.phPage.currentPage,
      }).then((res) => {
        let data = res.data;
        if (data.length === 0) {
          this.ctLoading = false;
        }
        data.forEach((item, index) => {
          item.index = index + 1;
          if (index === data.length - 1) {
            this.chooseData.list = data;
            this.countOp.showSummary = true;
            this.ctLoading = false;
          }
        });
      });
    },
    add() {
      // if (
      //   this.mx.length > 0 &&
      //   !this.mx[this.mx.length - 1].whseChemicalinDtlaoid
      // ) {
      //   return;
      // }
      // if (this.form.purNo === "" || this.form.deliNo === "") {
      //   this.$tip.warning("请先选择采购单号/送货单号!");
      //   return;
      // }
      // if (this.hide === "8") {
      //   this.choiceV = !this.choiceV;
      //   this.choiceField = "chemicalId";
      //   // this.oldData = this.chooseData;
      //   this.choiceTarget = this.oldData;
      //   this.choiceQ.purNo = this.form.purNo;
      //   this.choiceTle = this.$t("choicDlg.shdmx");
      //   // this.choiceQ.pu
      //   return;
      // }
      // if (Object.keys(this.oldData).length > 0) {
      //   this.oldData.$cellEdit = false;
      // }
      if (this.hide === "1") {
        if (this.form.registerNo === "" || this.form.registerNo === null) {
          this.$tip.error(this.$t("iaoMng.addTle"));
          return;
        }
        this.choiceV = !this.choiceV;
        // this.choiceField = "chemicalId";
        this.dlgWidth = "100%";
        this.choiceTarget = {};
        this.choiceTle = this.$t("choicDlg.xzlyldj1");
      } else if (this.hide === "5") {
        if (this.form.instructId === "" || this.form.instructId === null) {
          this.$tip.error(this.$t("whseMng.jgzldTle"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceQ.materialType = "3";
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("iaoMng.xzzld");
      }

      // this.mx.push({
      //   index: this.mx.length + 1,
      //   $cellEdit: true,
      //   custId: this.detail.custName,
      //   whseChemicalinFk: this.detail.whseChemicalinoid,
      // });
      // this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      // this.iptChange(this.mx[this.mx.length - 1]);
      // this.oldData = this.mx[this.mx.length - 1];
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("choicDlg.qxzrcmx"));
        return;
      }
      this.ctLoading = true;
      if (Object.keys(this.oldPhData).length > 0) {
        this.oldPhData.$cellEdit = false;
      }
      this.chooseData.list.push({
        index: this.chooseData.list.length + 1,
        $cellEdit: true,
        batchNo: this.chooseData.batchNo,
        whseChemicalinDtlaFk: this.chooseData.whseChemicalinDtlaoid,
        weightUnit: this.chooseData.weightUnit,
      });
      this.$refs.count.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
      this.$nextTick(() => {
        this.$toTableLow(this, "count");
      });
      this.ctLoading = false;
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    iptPhChange(val) {
      if (this.changePhList.length === 0) {
        this.changePhList.push(val);
      } else {
        for (let i = 0; i < this.changePhList.length; i++) {
          if (val.index === this.changePhList[i].index) {
            this.changePhList[i] = val;
            return;
          }
          if (
            this.changePhList.length - 1 === i &&
            this.changePhList[i].index != val.index
          ) {
            this.changePhList.push(val);
          }
        }
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseDyesainDtlaoid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1] || {});
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle13") +
            this.chooseData.chemicalId +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delYlDtla(this.chooseData.whseDyesainDtlaoid)
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
      if (
        Object.keys(this.choosePhData).length === 0 ||
        this.chooseData.list.length === 0
      ) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.choosePhData.whseDyesainDtlboid) {
        this.chooseData.list.splice(this.choosePhData.index - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.count.setCurrentRow(this.chooseData.list[0] || {});
        return;
        // for (let i = 0; i < this.changePhList.length; i++) {
        //   if (this.changePhList[i].index === this.choosePhData.index) {
        //     this.changePhList.splice(i, 1);

        //   }
        // }
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle8") +
            this.choosePhData.batchNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delYlDtlb(this.choosePhData.whseDyesainDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.chooseData.list.splice(this.choosePhData.index - 1, 1);
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                this.getPh();
                // this.choosePhData = {};
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
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
        this.getPh();
      } else {
        this.$refs.count.setCurrentRow(this.chooseData.list[0]);
      }
      if (!this.chooseData.loc) {
        this.chooseData.loc = [];
      }
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    saveAll() {
      // if (this.form.purNo === "" || this.form.deliNo === "") {
      //   this.$tip.warning("入库资料中的采购/送货单号不能为空!");
      //   return;
      // }
      if (this.form.yinId === "" || this.form.yinDate === null) {
        this.$tip.error(this.$t("whseMng.saveTle8"));
        return;
      }
      if (this.hide === "5" && !this.form.factoryId) {
        this.$tip.error(this.$t("iaoMng.saveTle2"));
        return;
      }
      if (this.hide === "5" && !this.form.instructId) {
        this.$tip.error(this.$t("iaoMng.saveTle3"));
        return;
      }
      for (let i = 0; i < this.mx.length; i++) {
        if (!this.mx[i].list) {
          break;
        }
        for (let j = 0; j < this.mx[i].list.length; j++) {
          if (
            !this.mx[i].list[j].batchNo ||
            !this.mx[i].list[j].weight ||
            !this.mx[i].list[j].weightUnit
          ) {
            this.$tip.error(this.$t("iaoMng.saveTle17"));
            return;
          }
        }
      }
      this.loading = true;
      this.modified = true;
      if (this.form.whseDyesalinoid) {
        updateYl(this.form).then((res) => {
          if (this.mx.length === 0) {
            this.$tip.success(this.$t("public.bccg"));
            this.loading = false;
          }
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.loc = [];
              if (item.whseDyesainDtlaoid) {
                updateYlDtla(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                addYlDtla(data).then((res) => {
                  item.whseDyesainDtlaoid = res.data.data;
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
              if (this.mx[i].list) {
                this.mx[i].list.forEach((item) => {
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (!item.whseDyesainDtlboid) {
                    addYlDtlb(item).then((res) => {
                      item.whseDyesainDtlboid = res.data.data;
                    });
                  } else {
                    updateYlDtlb(item).then((res) => {});
                  }
                });
              }
              if (this.mx[i].loc) {
                this.mx[i].loc.forEach((item) => {
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (!item.whseDyesainDtlcoid) {
                    addYlLoc(item).then((res) => {
                      item.whseDyesainDtlcoid = res.data.data;
                    });
                  } else {
                    updateYlLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                // this.getDetail();
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      } else {
        addYl(this.form).then((res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
          this.form.whseDyesalinoid = res.data.data;
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.loc = [];
              if (item.whseDyesainDtlaoid) {
                updateYlDtla(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                addYlDtla(data).then((res) => {
                  item.whseDyesainDtlaoid = res.data.data;
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
              if (this.mx[i].list) {
                this.mx[i].list.forEach((item) => {
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (!item.whseDyesainDtlboid) {
                    addYlDtlb(item).then((res) => {
                      item.whseDyesainDtlboid = res.data.data;
                    });
                  } else {
                    updateYlDtlb(item).then((res) => {});
                  }
                });
              }
              if (this.mx[i].loc) {
                this.mx[i].loc.forEach((item) => {
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (!item.whseDyesainDtlcoid) {
                    addYlLoc(item).then((res) => {
                      item.whseDyesainDtlcoid = res.data.data;
                    });
                  } else {
                    updateYlLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                // this.getDetail();
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      if (this.choiceTle === this.$t("iaoMng.xzzld")) {
        val.forEach((item, i) => {
          item.chemicalId = item.materialId;
          item.chemicalName = item.materialName;
          item.list = [];
          item.list.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlyl1")) {
        this.choiceTarget.custName = val.$custNo;
        this.choiceTarget.custCode = val.custNo;
      } else if (this.choiceTle === this.$t("choicDlg.xzlyldj1")) {
        val.forEach((item, i) => {
          item.weight = item.incomQty;
          item.weightUnit = item.chemicalQty;
          item.chemicalId = item.$basPigmentnewFk;
          item.chemicalName = item.$cnnamelong;
          item.loc = [];
          item.list = [
            {
              batchNo: item.batchNo,
              index: 1,
              weight: item.weight,
              weightUnit: item.weightUnit,
            },
          ];
        });
        this.mx = this.$unique(this.mx.concat(val), "chemicalId");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.shdmx")) {
        val.forEach((item, i) => {
          item.chemicalId = item.$materialNum;
          item.chemicalName = item.$chinName;
          item.bcMatengname = item.$materialNum;
          item.bcColor = item.$materialNum;
          item.bcForce = item.$materialNum;
          item.weight = item.deliQty;
          item.weightUnit = item.deliUnit;
          item.list = [];
          this.iptChange(item);
        });
        this.mx = this.mx.concat(val);
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      } else if (this.choiceTle === this.$t("iaoMng.hgyl")) {
        val.forEach((item, i) => {
          item.chemicalId = item.bcCode;
          item.chemicalName = item.bcMatname;
          item.bcMatengname = item.bcMatengname;
          item.bcColor = item.bcColor;
          item.bcForce = item.bcForce;
          this.iptChange(item);
        });
        this.mx = this.mx.concat(val);
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      } else {
        if (
          this.choiceTle == this.$t("choicDlg.rhlsgcgd") ||
          this.choiceTle == this.$t("choicDlg.xzylcgd")
        ) {
          this.choiceTarget.purNo = val.poNo;
        }
        // if (this.choiceTle == this.$t("choicDlg.xzwfylpl")) {
        //   this.mx = this.mx.concat(val);
        //   this.mx.forEach((item, i) => {
        //     item.index = i + 1;
        //   });
        // }

        this.choiceTarget.chemicalId = val.bcCode;
        this.choiceTarget.chemicalName = val.bcMatname;
        this.choiceTarget.bcMatengname = val.bcMatengname;
        this.choiceTarget.bcColor = val.bcColor;
        this.choiceTarget.bcForce = val.bcForce;
      }
      if (this.choiceTle == this.$t("choicDlg.xzwfylpl")) {
        this.form.factoryId = val.refCode;
      }

      // for (var key in val) {
      //   delete val[key];
      // }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    close() {
      this.$emit("close");
      if (this.modified) {
        this.$emit("getData");
      }
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    this.getDetail();
    this.form.sysCreatedby = this.$store.state.userOid;
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
  // .el-input.is-disabled .el-input__inner {
  // color: #606266;
  // background-color: #fff;
  // }
}
</style>