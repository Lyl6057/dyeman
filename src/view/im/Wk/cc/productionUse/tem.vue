<template>
  <div id="rcDetail">
    <view-container :title="type + '生产领用资料'" v-loading="outloading" element-loading-text="正在拼命加载..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">
      <div class="btnList">
        <el-button type="success" @click="save" :disabled="detail.stockState == '1'">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="16">
          <view-container :title="type + '生产领用明细'">
            <div class="btnList" style="margin-bottom: 2px">
              <el-button type="primary" @click="add" v-if="canSave" :disabled="detail.stockState == '1'">{{ this.$t("public.add") }}</el-button>
              <el-button type="danger" @click="del" v-if="canSave" :disabled="detail.stockState == '1'">{{ this.$t("public.del") }}</el-button>
            </div>
            <avue-crud ref="dlgcrud" :option="mxOp" v-loading="loading" :data="mx" :page.sync="page" @current-row-change="cellClick" @on-load="getDetail"></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="8">
          <view-container :title="type + '生产领用批号资料'">
            <div class="btnList" style="margin-bottom: 2px">
              <el-button type="primary" @click="addPh" v-if="canSave" :disabled="detail.stockState == '1'">{{ this.$t("public.add") }}</el-button>
              <el-button type="danger" @click="delPh" v-if="canSave" :disabled="detail.stockState == '1'">{{ this.$t("public.del") }}</el-button>
            </div>
            <avue-crud ref="dlgPhcrud" :option="rcOp" v-loading="rcloading" :data="chooseData.list" @current-row-change="cellPhClick"></avue-crud>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <choice ref="choice" :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData" @close="choiceV = false" v-if="choiceV"></choice>
    <pro-choice ref="proChoice" :choiceV="proChoiceV" :choiceTle="attributeObj.choiceTle" :choiceQ="proChoiceQ" dlgWidth="100%" @choiceData="proChoiceData" @close="proChoiceV = false" v-if="proChoiceV"></pro-choice>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, rcpb3C } from "./data";
import choice from "@/components/choice";
import { baseCodeSupply, updatePurApp } from "@/api/index";
import proChoice from "@/components/proMng/index";
import {
  getLydmx,
  getSglydmx,
  updateSglyd,
  getHgylStock,
  fetchSxValidOutWeight,
  fetchScflValidOutWeight,
} from "./api";
export default {
  props: {
    type: String,
    attributeObj: Object,
    hide: String,
    detail: Object,
    isPlan: Boolean,
    PlanForm: Object,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
    proChoice: proChoice,
  },
  data() {
    return {
      loading: false,
      tloading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 50, 100, 200, 500],
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
      choiceQ: {
        applyCategory: this.attributeObj.applyCategory,
        applyState: 3,
        collectSucceed: 0,
      },
      saved: false,
      sysCreatedby: "",
      proChoiceV: false,
      proChoiceTle: "选择纱线库存",
      proChoiceQ: {},
      purApp: {},
      oldphData: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      if (this.isAdd) {
        this.form = this.detail;
        this.form.sysCreatedby = this.$store.state.userOid;
        this.form.leader = this.$store.state.userOid;
        this.loading = false;
        return;
      }
      this.form.sysLastUpdBy = this.$store.state.userOid;
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail[this.attributeObj.uuid[0]]
      ) {
        this.mx = [];
        this.loading = false;
        return;
      }

      this.loading = true;
      this.form = this.detail;
      if (Object.keys(this.detail).length === 0) {
        this.mx = [];
        this.loading = false;
        return;
      }
      this.attributeObj
        .getDtla({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseChemicalOutFk: this.detail.whseChemicalOutId,
          whseRetyarninFk: this.detail.whseRetyarninoid,
          whseDyesalOutFk: this.detail.dyesalOutId,
          whseHardwareOutFk: this.detail.whseHardwareOutId,
          whseOfficeOutFk: this.detail.whseOfficeOutId,
          accessoriesOutFk: this.detail.accessoriesOutId,
          whseEquipmentOutFk: this.detail.whseEquipmentOutoid,
          whseEnergyOutFk: this.detail.energyOutId,
          // batchNo: "!^",
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records.sort((a, b) => {
            return a.batchNo > b.batchNo ? 1 : -1;
          });
          console.log(this.mx);
          this.mx.forEach((item, index) => {
            item.$cellEdit = true;
            item.index = index + 1;
            item.weight = Number(item.weight || item.stockQty || 0);
            item.weightUnit = item.weightUnit || item.stockUnit;
            // item.applyNum = Number(item.applyNum).toFixed(2);
            // item.weight = item.weight.toFixed(2);
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                if (this.mx.length > 0) {
                  this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                }
                this.loading = false;
              }, 200);
            }
          });
          if (!this.mx.length) this.loading = false;
        });
    },
    getPhDetail(val) {
      if (this.chooseData.list.length) {
        this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
        return;
      }
      if (val === null || !val[this.attributeObj.uuid[1]]) {
        this.chooseData.list = [];
        return;
      }
      this.rcloading = true;
      this.rcOp.showSummary = false;
      this.attributeObj
        .getDtlb({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          retyarninDtlFk: val.whseRetyarninDtloid,
          whseChemicalOutdtlFk: val.whseChemicalOutdtlId,
          dyesalOutDtlFk: val.energyOutDtlId,
          whseHardwareOutDtlFk: val.whseHardwareOutDtlId,
          whseOfficeOutDtlFk: val.officeOutDtlId,
          whseAccessoriesOutDtlFk: val.whseAccessoriesoutDtloid,
          whseEquipmentOutDtlFk: val.whseEquipmentOutDtloid,
          whseEnergyOutDtlFk: val.energyOutDtlId,
        })
        .then((res) => {
          let records = res.data;
          this.rcPage.total = records.total;
          this.chooseData.list = records;
          if (this.chooseData.list.length === 0) {
            this.rcloading = false;
            return;
          }
          this.chooseData.list = this.chooseData.list.sort((a, b) => {
            return b.batchNo - a.batchNo;
          });
          if (this.chooseData.list.length) {
            this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
          }
          this.chooseData.list.forEach((item, index) => {
            item.weightUnit = this.chooseData.weightUnit;
            item.weight = Number(item.weight).toFixed(2);
            item.index = index + 1;
            if (index === this.chooseData.list.length - 1) {
              this.rcOp.showSummary = true;
              this.choosePh = {};
              this.rcloading = false;
            }
          });
        });
    },
    add() {
      if (this.form.stockType === "1") {
        if (!this.form.appId) {
          this.$tip.warning("请先选择申购单!");
          return;
        }
        if (!this.isAdd) {
          this.$http
            .get("/api/purSingle?appId=" + this.form.appId)
            .then((res) => {
              this.choiceV = !this.choiceV;
              this.choiceQ.purSingleFk = res.data[0].purSingleoid;
              this.choiceTle = this.$t("choicDlg.xzsgdzl");
            });
        } else {
          this.choiceV = !this.choiceV;
          this.choiceQ.purSingleFk = this.form.purSingleoid;
          this.choiceTle = this.$t("choicDlg.xzsgdzl");
        }
      } else if (this.form.stockType === "2") {
        this.proChoiceQ.yarnsId = "";
        this.proChoiceV = true;
      } else {
        if (!this.form.appId) {
          this.$tip.warning("请先选择申请领用单!");
          return;
        }
        if (!this.isAdd) {
          this.$http
            .get("/api/purApplication?applyCode=" + this.form.appId)
            .then((res) => {
              this.choiceV = !this.choiceV;
              this.choiceQ.purApplicationFk = res.data[0].purApplicationoid;
              this.choiceTle = this.$t("choicDlg.xzsqlydmx");
            });
        } else {
          this.choiceV = !this.choiceV;
          this.choiceQ.purApplicationFk = this.form.purApplicationoid;
          this.choiceTle = this.$t("choicDlg.xzsqlydmx");
        }
      }
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择明细资料!");
        return;
      }
      this.proChoiceQ.yarnsId = this.chooseData.yarnsId;
      this.proChoiceQ.materialId = this.chooseData.materialId;
      this.proChoiceQ.batchNo = this.chooseData.batchNo;
      this.proChoiceTle = this.attributeObj.choiceTle;
      this.proChoiceV = true;
    },
    del() {
      if (
        this.chooseData == null ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData[this.attributeObj.uuid[1]]) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        return;
      }
      let data =
        this.chooseData.yarnsId ||
        this.chooseData.accessoriesId ||
        this.chooseData.materialId;
      this.$tip
        .cofirm("是否确定删除编号为【 " + data + " 】的数据?", this, {})
        .then(() => {
          this.attributeObj
            .delDtla(this.chooseData[this.attributeObj.uuid[1]])
            .then((res) => {
              if (res.data.code === 200) {
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                if (this.mx.length) {
                  this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                } else {
                  this.$refs.dlgcrud.setCurrentRow();
                }
                this.mx.forEach((item, i) => {
                  item.index = i + 1;
                });
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
    delPh() {
      if (this.choosePh == null || Object.keys(this.choosePh).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.choosePh[this.attributeObj.uuid[2]]) {
        this.chooseData.list.splice(this.choosePh.index - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0] || {});
        return;
      }
      let tip = "";
      tip = "是否确定删除选中的数据？";
      this.$tip
        .cofirm(tip, this, {})
        .then(() => {
          this.outloading = true;
          this.attributeObj
            .delDtlb(this.choosePh[this.attributeObj.uuid[2]])
            .then((res) => {
              if (res.data.code === 200) {
                this.chooseData.weight -= this.choosePh.weight;
                let data = JSON.parse(JSON.stringify(this.chooseData));
                data.stockQty = data.weight;
                data.list = "";
                this.attributeObj.updateDtla(data).then((res) => {
                  this.chooseData.list.splice(this.choosePh.index - 1, 1);
                  this.chooseData.list.forEach((item, i) => {
                    item.index = i + 1;
                  });
                  this.choosePh = {};
                  if (this.chooseData.list.length) {
                    this.$refs.dlgPhcrud.setCurrentRow();
                  }
                  this.$tip.success(this.$t("public.sccg"));
                });
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .finally(() => {
              this.outloading = false;
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.outloading = false;
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      if (this.hide === "4" || this.hide === "3" || this.hide === "5") {
        this.oldData.$cellEdit = false;
        this.$set(val, "$cellEdit", true);
        this.oldData = val;
        this.chooseData = val;
        return;
      }
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
      this.oldphData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldphData = val;
      this.choosePh = val;
    },
    close() {
      this.$emit("close", this.saved);
    },
    async save() {
      if (this.form.retCode == "" || this.form.retDate == null) {
        this.$tip.error("出仓编号/日期不能为空!");
        return;
      }
      if (this.form.stockType == "1" && this.form.appId == "") {
        this.$tip.error("申购单不能为空!");
        return;
      } else if (this.form.stockType == "3" && this.form.appId == "") {
        this.$tip.error("领料申请单号不能为空!");
        return;
      }
      for (let i = 0; i < this.mx.length; i++) {
        if (!this.mx[i].weight || this.mx[i].weight == "NaN") {
          this.$tip.error("数量不能为空!");
          return;
        }
        if (!this.mx[i].list) {
          continue;
        }
        this.mx[i].weight = 0;
        for (let j = 0; j < this.mx[i].list.length; j++) {
          if (!this.mx[i].list[j].weight || this.mx[i].list[j].weight == 0) {
            this.$tip.error("数量不能为空!");
            return;
          }
          this.mx[i].weight += Number(this.mx[i].list[j].weight) || 0;
        }
        if (this.type === this.$t("iaoMng.sx")) {
          this.mx[i].debitQty =
            this.mx[i].weight > this.mx[i].applyNum
              ? Number((this.mx[i].weight - this.mx[i].applyNum).toFixed(2))
              : 0;
        } else if (this.mx[i].weight > this.mx[i].applyNum) {
          this.$tip.error("出仓数量不能超过领用数量!");
          return;
        }
      }
      let vaildRes = await this.saveValid();
      if (!vaildRes) return;
      this.outloading = true;
      this.modified = true;
      if (this.form.yinDate != "" && this.form.yinDate != undefined) {
        this.form.yinDate += " 00:00:00";
      }
      this.saved = true;
      if (this.form[this.attributeObj.uuid[0]]) {
        this.attributeObj.update(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.outloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.stockQty = data.weight;
              if (item[this.attributeObj.uuid[1]]) {
                this.attributeObj.updateDtla(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseRetyarninFk = this.detail.whseRetyarninoid;
                data.whseChemicalOutFk = this.detail.whseChemicalOutId;
                data.whseDyesalOutFk = this.detail.dyesalOutId;
                data.whseHardwareOutFk = this.detail.whseHardwareOutId;
                data.whseOfficeOutFk = this.detail.whseOfficeOutId;
                data.accessoriesOutFk = this.detail.accessoriesOutId;
                data.whseEquipmentOutFk = this.detail.whseEquipmentOutoid;
                data.whseEnergyOutFk = this.detail.energyOutId;
                this.attributeObj.addDtla(data).then((res) => {
                  item[this.attributeObj.uuid[1]] = res.data.data;
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
                  item.whseAccessoriesOutDtlFk =
                    this.mx[i].whseAccessoriesoutDtloid;
                  item.retyarninDtlFk = this.mx[i].whseRetyarninDtloid;
                  item.whseChemicalOutdtlFk = this.mx[i].whseChemicalOutdtlId;
                  item.dyesalOutDtlFk = this.mx[i].energyOutDtlId;
                  item.whseHardwareOutDtlFk = this.mx[i].whseHardwareOutDtlId;
                  item.whseOfficeOutDtlFk = this.mx[i].officeOutDtlId;
                  item.whseEquipmentOutDtlFk =
                    this.mx[i].whseEquipmentOutDtloid;
                  item.whseEnergyOutDtlFk = this.mx[i].energyOutDtlId;
                  if (!item[this.attributeObj.uuid[2]]) {
                    this.attributeObj.addDtlb(item).then((res) => {
                      item[this.attributeObj.uuid[2]] = res.data.data;
                    });
                  } else {
                    this.attributeObj.updateDtlb(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.outloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      } else {
        this.attributeObj.add(this.form).then((res) => {
          if (this.form.stockType == 3) {
            updatePurApp(
              Object.assign(this.purApp, {
                collectSucceed: 1,
              })
            ).then((res) => {});
          } else if (this.form.stockType == 1) {
            updateSglyd(
              Object.assign(this.purApp, {
                collectSucceed: 1,
              })
            ).then(res);
          }

          if (this.mx.length === 0) {
            setTimeout(() => {
              this.outloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          this.form[this.attributeObj.uuid[0]] = res.data.data;
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.stockQty = data.weight;
              if (item[this.attributeObj.uuid[1]]) {
                resolve();
                // 修改
              } else {
                // 新增
                data.whseRetyarninFk = this.form.whseRetyarninoid;
                data.whseChemicalOutFk = this.form.whseChemicalOutId;
                data.whseDyesalOutFk = this.form.dyesalOutId;
                data.whseHardwareOutFk = this.form.whseHardwareOutId;
                data.whseOfficeOutFk = this.form.whseOfficeOutId;
                data.accessoriesOutFk = this.form.accessoriesOutId;
                data.whseEquipmentOutFk = this.form.whseEquipmentOutoid;
                data.whseEnergyOutFk = this.form.energyOutId;
                this.attributeObj.addDtla(data).then((res) => {
                  item[this.attributeObj.uuid[1]] = res.data.data;
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
                  item.whseAccessoriesOutDtlFk =
                    this.mx[i].whseAccessoriesoutDtloid;
                  item.retyarninDtlFk = this.mx[i].whseRetyarninDtloid;
                  item.whseChemicalOutdtlFk = this.mx[i].whseChemicalOutdtlId;
                  item.dyesalOutDtlFk = this.mx[i].energyOutDtlId;
                  item.whseHardwareOutDtlFk = this.mx[i].whseHardwareOutDtlId;
                  item.whseOfficeOutDtlFk = this.mx[i].officeOutDtlId;
                  item.whseEquipmentOutDtlFk =
                    this.mx[i].whseEquipmentOutDtloid;
                  item.whseEnergyOutDtlFk = this.mx[i].energyOutDtlId;
                  if (!item[this.attributeObj.uuid[2]]) {
                    this.attributeObj.addDtlb(item).then((res) => {
                      item[this.attributeObj.uuid[2]] = res.data.data;
                    });
                  } else {
                    this.attributeObj.updateDtlb(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.outloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      }
    },
    // 保存校验
    async saveValid() {
      let dataList = [];
      this.mx.forEach((item) => {
        if (item.list) {
          item.list.forEach((list) => {
            dataList.push({
              yarnsId: item.yarnsId,
              yarnsName: item.yarnsName,
              yarnsCard: item.yarnBrand || "",
              matCode: item.chemicalId || item.materialId || item.accessoriesId,
              batchNo: item.batchNo,
              batId: item.suppBatchNo || "",
              retQty: list.weight,
              weight: list.weight,
              weightUnit: item.weightUnit,
              locationCode: list.locationCode,
              locationName: list.locationCode,
            });
          });
        }
      });
      let validRes = await this.attributeObj
        .validOutWeight(dataList)
        .then((res) => res.data);
      if (!validRes.data.status) {
        validRes.data.resultList.forEach((item, index) => {
          let notifyData = {
            title: "提示",
            dangerouslyUseHTMLString: true,
            message: `材料编号<strong>${
              item.matCode || item.yarnsId
            }</strong>的<strong>${
              item.storageNo || item.locationCode || item.locationName
            }</strong>货运位剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(
              2
            )}</span>;`,
            type: "warning",
            position: "top-left",
          };
          setTimeout(() => this.$notify(notifyData), 100 * index);
        });
      }
      // 检验条件
      return validRes.data.status;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // this.oldData.$cellEdit = false;
      if (this.choiceTle === this.$t("choicDlg.xzsgd")) {
        this.form.appId = val.appId;
        this.form.purSingleoid = val.purSingleoid;
        this.purApp = val;
        getSglydmx({
          applyState: 3,
          collectSucceed: 0,
          purCategory: 4,
          purSingleFk: this.form.purSingleoid,
        }).then((res) => {
          let val = res.data;
          val.forEach((item, i) => {
            // item.$cellEdit = true;
            item.yarnsId = item.materialNum;
            item.yarnsName = item.chinName;
            item.yarnBrand = item.yarnsCard;
            item.weightUnit = item.company;
            item.weight = 0;
          });
          this.mx = this.mx.concat(val);
          this.page.total = this.mx.length;
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
          }
          this.mx.forEach((e, index) => {
            e.index = index + 1;
            if (index == this.mx.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsgdzl")) {
        this.loading = true;
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materialNum;
          item.materialName = item.chinName;
          item.yarnsId = item.materialNum;
          item.yarnsName = item.chinName;
          item.yarnBrand = item.yarnsCard;
          item.company = item.company;
          item.stockUnit = item.company;
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.unique(this.mx, "materialId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlyd")) {
        this.loading = true;
        this.form.appId = val.applyCode;
        this.form.purApplicationoid = val.purApplicationoid;
        this.purApp = val;
        let stockList = [];
        // getHgylStock().then((res) => {
        //   stockList = res.data;
        getLydmx({
          purApplicationFk: this.form.purApplicationoid,
        }).then((res) => {
          if (res.data.length) {
            let resData = res.data;
            resData.forEach((item, i) => {
              item.$cellEdit = true;
              item.materialId = item.materielCode;
              item.materialName = item.materielName;
              item.yarnsId = item.materielCode;
              item.yarnsName = item.materielName;
              item.company = item.company;
              item.stockUnit = item.company;
              item.weightUnit = item.company;
              item.bcColorprison = item.materielCode;
              item.vitality = item.materielCode;
              item.bcClass = item.materielCode;
              item.dangerlevel = item.materielCode;
              item.bcForce = item.materielCode;
              item.weight = 0; // item.applyNum;
              item.suppBatchNo = item.batId;
              item.weaveJobCode = item.weaveNo;
              item.yarnBrand = item.yarnsCard;
              item.list = [];
            });
            this.mx = this.mx.concat(resData);
            this.page.total = this.mx.length;
            if (this.mx.length) {
              this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
            }
            this.mx.forEach((e, index) => {
              e.index = index + 1;
              if (index == this.mx.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          } else {
            this.loading = false;
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlydmx")) {
        this.loading = true;
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materielCode;
          item.materialName = item.materielName;
          item.yarnsId = item.materielCode;
          item.yarnsName = item.materielName;
          item.company = item.company;
          item.stockUnit = item.company;
          item.weightUnit = item.company;
          item.bcColorprison = item.materielCode;
          item.vitality = item.materielCode;
          item.bcClass = item.materielCode;
          item.dangerlevel = item.materielCode;
          item.bcForce = item.materielCode;
          item.weight = 0;
          item.suppBatchNo = item.batId;
          item.weaveJobCode = item.weaveNo;
          item.yarnBrand = item.yarnsCard;
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.unique(this.mx, "yarnsId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        });
      } else {
        this.chooseData.list = this.chooseData.list.concat(val);
        this.chooseData.list.forEach((e, index) => {
          e.index = index + 1;
          e.prodNo = e.$prodNo;
          e.woWeights = e.weight;
          e.woUnit = e.weightUnit;
          e.ticketNo = e.custTicket;
        });
      }
      // this.oldData.$cellEdit = true;
      // for (var key in val) {
      //   delete val[key];
      // }
      // for (var key in this.choiceQ) {
      //   delete this.choiceQ[key];
      // }
      this.choiceV = false;
    },
    proChoiceData(val) {
      if (Object.keys(val).length === 0 || val.length === 0 || val === null) {
        this.proChoiceV = false;
        return;
      }
      this.outloading = true;
      if (this.proChoiceTle === "选择化工原料入仓信息") {
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          // this.mxOp.column[5].hide = false;
          this.mxOp.column[6].hide = false;
          this.mxOp.column[9].hide = false;
        }
        val.forEach((item) => {
          item.$cellEdit = true;
          item.materialId = item.chemicalId;
          item.materialName = item.$chemicalName;
          item.company = item.weightUnit;
          item.stockUnit = item.weightUnit;
          item.bcColorprison = item.chemicalId;
          item.vitality = item.chemicalId;
          item.bcClass = item.chemicalId;
          item.dangerlevel = item.chemicalId;
          item.bcForce = item.chemicalId;
          item.applyNum = item.weight;
          item.model = item.chemicalId;
          item.weight = item.weight;
          item.whseChemicalinFk = item.whseChemicalinDtlaoid;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "batchNo");
        this.page.total = this.mx.length;
        this.$nextTick(() => {
          this.mx.forEach((e, index) => {
            e.index = index + 1;
            if (index == this.mx.length - 1) {
              setTimeout(() => {
                this.$nextTick(() => {
                  this.$set(this.mxOp.column[3], "hide", true);
                  // this.$set(this.mxOp.column[5], "hide", true);
                  this.$set(this.mxOp.column[6], "hide", true);
                  this.$set(this.mxOp.column[9], "hide", true);
                  this.loading = false;
                });
              }, 500);
            }
          });
        });
      } else if (this.proChoiceTle === "选择化工原料库存") {
        let sum = 0;
        this.chooseData.list.forEach((item, i) => {
          sum += item.weight;
        });
        val.forEach((item, i) => {
          item.weight = item.stock;
          item.locationCode = item.locationCode || item.storageNo;
          item.$cellEdit = true;
        });
        for (let i = 0; i < val.length; i++) {
          if (sum + val[i].stock <= this.chooseData.applyNum) {
            this.chooseData.list.push(val[i]);
            sum += val[i].stock;
          } else if (this.chooseData.applyNum - sum > 0) {
            val[i].weight = this.chooseData.applyNum - sum;
            sum += val[i].weight;
            this.chooseData.list.push(val[i]);
            break;
          }
        }
        this.chooseData.weight = sum;
        // this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
      } else if (this.proChoiceTle === "选择颜料库存") {
        let sum = 0;
        this.chooseData.list.forEach((item, i) => {
          sum += item.weight;
        });
        val.forEach((item, i) => {
          item.weight = item.stock;
          item.locationCode = item.locationCode || item.storageNo;
          item.$cellEdit = true;
        });
        for (let i = 0; i < val.length; i++) {
          if (sum + val[i].stock <= this.chooseData.applyNum) {
            this.chooseData.list.push(val[i]);
            sum += val[i].stock;
          } else if (this.chooseData.applyNum - sum > 0) {
            val[i].weight = this.chooseData.applyNum - sum;
            sum += val[i].weight;
            this.chooseData.list.push(val[i]);
            break;
          }
        }
        this.chooseData.weight = sum;
        // this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
      } else if (this.proChoiceTle === "选择纱线库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.whseYarninDtlaFk = item.whseYarninDtlaoid;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.whseYarninDtlaFk = item.whseYarninDtlaoid;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          // console.log(sum);
          this.chooseData.weight = Number(sum);
          // this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      } else if (this.proChoiceTle === "选择生产辅料库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.locationCode = item.locationCode || item.storageNo;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          this.chooseData.weight = Number(sum);
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      } else if (this.proChoiceTle === "选择五金用品库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.locationCode = item.locationCode || item.storageNo;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          this.chooseData.weight = Number(sum);
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      } else if (this.proChoiceTle === "选择行政用品库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.locationCode = item.locationCode || item.storageNo;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          this.chooseData.weight = Number(sum);
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      } else if (this.proChoiceTle === "选择设备库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            item.locationCode = item.locationCode || item.storageNo;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          this.chooseData.weight = Number(sum);
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      }
      setTimeout(() => {
        this.outloading = false;
      }, 200);
      this.proChoiceV = false;
    },
    changeRet(val) {
      this.mx = [];
      if (val === "1") {
        // this.mxOp.column[4].hide = true;
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "申领数量";
        this.formOp.column[4].label = "申购单";
        if (!this.isAdd) {
          return;
        }
        // this.formOp.column[7].disabled = false;
      } else if (val === "2") {
        // 其他
        // this.mxOp.column[4].hide = false;
        // this.mxOp.column[4].label = this.$t("whseField.ph");
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "入仓数量";
        this.formOp.column[4].disabled = true;
      } else {
        // this.mxOp.column[4].hide = true;
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "申领数量";
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[4].disabled = false;
        this.formOp.column[4].label = "领料申请单号";
      }
      this.form.appId = "";
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
  },
  updated() {
    this.$nextTick(() => {
      if (this.mx.length) {
        this.$refs["dlgcrud"].doLayout();
      }
      if (this.chooseData.list) {
        this.$refs["dlgPhcrud"].doLayout();
      }
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-table {
  overflow: visible !important;
}

.el-card__body {
  padding: 20px 20px 50px 20px;
}

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
</style>