<template>
  <div id="rcDetail">
    <view-container
      :title="datas + this.$t('iaoMng.rc')"
      :element-loading-text="$t('public.loading')"
      v-loading="screenLoading"
    >
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
        <!-- <el-button type="primary" @click="add">{{this.$t("public.add")}}</el-button>
        <el-button type="danger" @click="del">{{ this.$t("public.del") }}</el-button> -->
        <el-button
          type="success"
          @click="saveAll"
          :disabled="form.stockState == '1'"
          >{{ this.$t("public.save") }}</el-button
        >
        <!-- <el-button type="warning" @click="getDetail">取消</el-button> -->
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="14">
          <view-container :title="datas + $t('iaoMng.rcmx')">
            <div style="margin-bottom: 2px" class="btnList">
              <el-button
                type="danger"
                @click="del"
                :disabled="form.stockState == '1'"
                >{{ this.$t("public.del") }}</el-button
              >
              <!-- <el-button
                type="success"
                :disabled="changeList.length === 0"
                @click="save"
                >{{this.$t("public.save")}}</el-button
              > -->
            </div>
            <avue-crud
              ref="mx"
              :option="mxOp"
              v-loading="loading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            ></avue-crud> </view-container
        ></el-col>
        <el-col :span="10">
          <view-container :title="datas + $t('iaoMng.rcphzl')">
            <div style="margin-bottom: 2px" class="btnList">
              <el-button
                type="primary"
                @click="addPh"
                :disabled="form.stockState == '1'"
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button
                type="danger"
                @click="delPh"
                :disabled="form.stockState == '1'"
                >{{ this.$t("public.del") }}</el-button
              >
            </div>
            <avue-crud
              ref="count"
              id="count"
              v-loading="ctLoading"
              :option="countOp"
              :page.sync="phPage"
              :data="chooseData.list"
              @current-row-change="cellPhClick"
            ></avue-crud>
          </view-container>
          <view-container
            :title="datas + $t('iaoMng.fpjl')"
            v-if="datas == this.$t('iaoMng.sx')"
          >
            <avue-crud
              ref="alloc"
              id="alloc"
              v-loading="fpLoading"
              :option="allocOp"
              :page.sync="allocPage"
              :data="chooseData.alloc"
            ></avue-crud> </view-container
        ></el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { rhl2C, rhl2F, rhl3C, rhl4C } from "./data";
import { getSubscribe } from "@/const/whse";
import {
  getHardwarearticles,
  getAdsuppliesarticles,
  getProductivesupplies,
  baseCodeSupply,
  baseCodeSupplyEx,
} from "@/api/index";
import { createOutOrder } from "./api.js";
export default {
  props: {
    datas: String,
    detail: Object,
    hide: String,
    isAdd: Boolean,
    addList: Array,
    everyThing: Object,
  },
  name: "",
  data() {
    return {
      loading: false,
      screenLoading: false,
      fpLoading: false,
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      phPage: {
        pageSize: 50,
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
      oldPhData: {},
      choosPheData: {},
      modified: false,
      allocOp: rhl4C(this),
      allocPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      alloc: [],
      code: "",
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.form = this.detail;
      if (this.isAdd) {
        this.screenLoading = true;
        this.mx = JSON.parse(JSON.stringify(this.addList));
        this.form.andOut = this.mx.some((item) => {
          // 是否生成出库单
          return item.andOut;
        });
        // this.form.stockState = 0;
        if (!this.mx.length) {
          this.screenLoading = false;
        }
        baseCodeSupplyEx({ code: this.everyThing.batCode }).then((res) => {
          this.code = res.data.data;
          this.mx.forEach((item, i) => {
            item.index = 1 + i;
            item.chemicalId = item.materialNum;
            item.chemicalName = item.chinName;
            item.yarnsId = item.materialNum;
            item.yarnsName = item.chinName;
            item.materialName = item.chinName;
            item.checkStatus = "1"
            if (this.datas != this.$t("iaoMng.sx")) {
              item.batId = item.batNo;
              item.batchNo = this.code;
              item.batchNos = item.batchNo.slice(2);
            } else {
              item.batchNos = item.batchNo;
              item.yarnsCard = item.model;
            }
            item.weight = item.deliQty;
            item.weightUnit = item.deliUnit;
            item.poQty = item.deliQty;
            item.unitQty = item.deliUnit;
            item.list = [
              {
                index: 1,
                batchNo: item.batchNo,
                batchNos: item.batchNos,
                weight: item.weight,
                weightUnit: item.weightUnit,
              },
            ];
            this.code =
              this.code.substring(0, 3) +
              this.$preFixInt(Number(this.code.substring(5)) + 1, 5);
            if (i === this.mx.length - 1) {
              // setTimeout(() => {
              this.getAlloc();
              // }, 200);
            }
          });
          this.page.total = this.mx.length;
          return;
        });
      } else {
        this.loading = true;
        this.mx = [];
        this.mxOp.showSummary = false;
        this.everyThing
          .getDetail({
            rows: this.page.pageSize,
            start: this.page.currentPage,
            whseChemicalinFk: this.detail.whseChemicalinoid, // 化工原料Oid
            whseAccessoriesInFk: this.detail.whseAccessoriesinoid, // 辅料/五金/行政Oid
            whseYarninFk: this.detail.whseYarninoid, // 纱线Oid
            whseDyesalinFk: this.detail.whseDyesalinoid, // 顏料Oid
            whseEnergyInFk: this.detail.energyInId, // 能源Oid
            whseHardwareInFk: this.detail.whseAccessoriesinoid,
            whseOfficeInFk: this.detail.whseAccessoriesinoid,
            whseEquipmentInFk: this.detail.whseEquipmentInoid,
            // batchNo: "%^!",
          })
          .then((res) => {
            let dicData = [];
            if (
              this.datas === this.$t("iaoMng.hgyl") ||
              this.datas === this.$t("iaoMng.yl")
            ) {
              getHardwarearticles().then((Res1) => {
                dicData = Res1.data;
                getAdsuppliesarticles().then((Res) => {
                  dicData = dicData.concat(Res.data);
                  getProductivesupplies().then((scfl) => {
                    dicData = dicData.concat(scfl.data);
                    let records = res.data;
                    this.page.total = records.total;
                    this.mxOp.column[4].dicData = dicData;
                    this.mx = records.records;
                    if (this.mx.length === 0) {
                      this.loading = false;
                    }
                    this.mx.forEach((item, index) => {
                      item.index = index + 1;
                      item.chinName = item.materialNum;
                      item.batchNos = item.batchNo.slice(2);
                      if (index === this.mx.length - 1) {
                        this.mxOp.showSummary = true;
                        setTimeout(() => {
                          if (this.mx.length) {
                            this.$refs.mx.setCurrentRow(this.mx[0]);
                          }

                          this.getAlloc();
                          this.loading = false;
                        }, 200);
                      }
                    });
                  });
                });
              });
            } else {
              let records = res.data;
              this.page.total = records.total;
              // this.mxOp.column[4].dicData = dicData;
              this.mx = records.records;
              if (this.mx.length === 0) {
                this.loading = false;
              }
              this.mx = this.mx.sort((a, b) => {
                return a.batchNo > b.batchNo ? 1 : -1;
              });
              this.mx.forEach((item, index) => {
                item.index = index + 1;
                item.chinName = item.materialNum;
                // item.yarnsName = item.yarnsId;
                if (!item.materialName) item.materialName = item.materialNum;
                if (this.datas == this.$t("iaoMng.sx")) {
                  item.batchNos = item.batchNo;
                } else {
                  item.batchNos = item.batchNo.slice(2);
                }
                if (index === this.mx.length - 1) {
                  this.mxOp.showSummary = true;
                  setTimeout(() => {
                    if (this.mx.length) {
                      this.$refs.mx.setCurrentRow(this.mx[0]);
                    }
                    this.getAlloc();
                    this.loading = false;
                  }, 200);
                }
              });
            }
          });
      }
    },
    getPh() {
      if (this.isAdd) {
        if (this.chooseData.list) {
          if (this.chooseData.list.length != 0) {
            this.phPage.total = this.chooseData.list.length;
            this.$refs.count.setCurrentRow(this.chooseData.list[0]);
          } else {
            this.phPage.total = 0;
          }
        }
        return;
      }
      if (
        !this.chooseData.whseChemicalinDtlaoid &&
        !this.chooseData.whseDyesainDtlaoid &&
        !this.chooseData.whseYarninDtloid &&
        !this.chooseData.energyDtloid &&
        !this.chooseData.whseAccessoriesDtloid &&
        !this.chooseData.whseEquipmentDtloid
      ) {
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
      this.everyThing
        .getPh({
          whseChemicalinDtlaFk: this.chooseData.whseChemicalinDtlaoid,
          whseDyesainDtlaFk: this.chooseData.whseDyesainDtlaoid,
          whseYarninDtlFk: this.chooseData.whseYarninDtloid,
          energyDtloid: this.chooseData.energyDtloid,
          whseAccessoriesDtlFk: this.chooseData.whseAccessoriesDtloid,
          whseAccessoriesDtloid: this.chooseData.whseAccessoriesDtloid,
          whseOfficeDtlFk: this.chooseData.whseAccessoriesDtloid,
          whseEquipmentDtlFk: this.chooseData.whseEquipmentDtloid,
          rows: this.phPage.pageSize,
          start: this.phPage.currentPage,
        })
        .then((res) => {
          // let records = res.data;

          let data = res.data;
          this.phPage.total = res.data.length;
          // data = records.records;
          if (data.length === 0) {
            this.ctLoading = false;
          }
          data.forEach((item, index) => {
            item.index = index + 1;
            item.weightUnit = item.weightUnit || this.chooseData.weightUnit;
            item.batchNo = item.batchNo || this.chooseData.batchNo;
            if (this.datas == this.$t("iaoMng.sx")) {
              item.batchNos = item.batchNo;
            } else {
              item.batchNos = item.batchNo.slice(2);
            }
            if (index === data.length - 1) {
              setTimeout(() => {
                this.chooseData.list = data;
                this.countOp.showSummary = true;
                this.ctLoading = false;
              }, 200);
            }
          });
        });
    },
    getAlloc() {
      if (this.datas != this.$t("iaoMng.sx")) {
        this.$refs.mx.setCurrentRow(this.mx[0]);
        setTimeout(() => {
          this.screenLoading = false;
          this.fpLoading = false;
        }, 200);

        return;
      }
      if (this.isAdd) {
        // 获取申购单
        // this.ctLoading = true;
        this.mx.forEach((item, i) => {
          getSubscribe({
            deliNo: this.form.deliNo,
            poNo: this.form.purNo,
            materialNum: item.materialNum,
            // applyNum: item.poQty,
            rows: this.phPage.pageSize,
            start: this.phPage.currentPage,
          }).then((res) => {
            let data = res.data.records;
            // item.alloc = data.records;
            item.alloc = [];
            let weight = item.poQty;
            data.forEach((items, i) => {
              if (items.applyNum <= weight) {
                weight -= items.applyNum;
                item.alloc.push(items);
              }
            });
            if (i === this.mx.length - 1) {
              this.screenLoading = false;
              this.fpLoading = false;
              this.$refs.mx.setCurrentRow(this.mx[0]);
            }
          });
        });
      } else {
        // if (this.datas == this.$t("choicDlg.rl")) {
        //   this.fpLoading = false;
        //   return;
        // }
        // 获取入仓分配
        this.fpLoading = true;
        this.mx.forEach((item, i) => {
          this.everyThing
            .getAlloc({
              whseChemicalinDtlaFk: item.whseChemicalinDtlaoid,
              whseAccessoriesDtlFk: item.whseAccessoriesDtloid,
              whseYarninDtlaFk: item.whseYarninDtloid,
              whseDyesainDtlaFk: item.whseDyesainDtlaoid,
              WhseEnerginDtlaFK: item.energyDtloid,
              rows: this.phPage.pageSize,
              start: this.phPage.currentPage,
            })
            .then((res) => {
              let data = res.data;
              this.$nextTick(() => {
                item.alloc = data;
                item.alloc.forEach((items, i) => {
                  items.index = i + 1;
                  items.appId = items.allocMain;
                  items.applyNum = items.allocQty;
                  if (i == item.alloc.length - 1) {
                    setTimeout(() => {
                      this.screenLoading = false;
                      this.fpLoading = false;
                    }, 200);
                  }
                });
              });

              // if (i === this.mx.length - 1) {
              //   this.$refs.mx.setCurrentRow(this.mx[0]);
              // }
            });
        });
      }
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
        batchNos: this.chooseData.batchNos,
        whseChemicalinDtlaFk: this.chooseData.whseChemicalinDtlaoid,
        weightUnit: this.chooseData.weightUnit,
      });
      this.phPage.total++;
      this.$refs.count.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
      this.ctLoading = false;
    },
    del() {
      // return;
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseChemicalinDtlaoid &&
        !this.chooseData.whseAccessoriesDtloid &&
        !this.chooseData.whseYarninDtloid &&
        !this.chooseData.whseDyesainDtlaoid &&
        !this.chooseData.energyDtloid &&
        !this.chooseData.whseEquipmentDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1] || {});
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle11") +
            this.$t("iaoMng.delTle12") +
            (this.datas === this.$t("iaoMng.hgyl") ||
            this.datas === this.$t("iaoMng.yl")
              ? this.chooseData.chemicalId
              : this.datas === this.$t("iaoMng.sx")
              ? this.chooseData.yarnsId
              : this.chooseData.materialNum) +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delDetail(
              this.datas === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseChemicalinDtlaoid
                : this.datas === this.$t("iaoMng.yl")
                ? this.chooseData.whseDyesainDtlaoid
                : this.datas === this.$t("iaoMng.sx")
                ? this.chooseData.whseYarninDtloid
                : this.datas === this.$t("choicDlg.rl")
                ? this.chooseData.energyDtloid
                : this.datas === this.$t("iaoMng.sb")
                ? this.chooseData.whseEquipmentDtloid
                : this.chooseData.whseAccessoriesDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
                this.chooseData = {};
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
        Object.keys(this.choosePhData === undefined || this.choosePhData)
          .length === 0 ||
        this.chooseData.list.length === 0
      ) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.choosePhData.whseChemicalinDtlboid &&
        !this.choosePhData.whseDyesainDtlboid &&
        !this.choosePhData.whseYarninDtlaoid &&
        !this.choosePhData.whseEnergyDtlaId &&
        !this.choosePhData.whseAccessoriesDtlaoid &&
        !this.choosePhData.whseEquipmentDtlaoid
      ) {
        this.chooseData.list.splice(this.choosePhData.index - 1, 1);
        this.phPage.total--;
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.count.setCurrentRow(this.chooseData.list[0] || {});
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle8") +
            this.choosePhData.batchNos +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delPh(
              this.datas === this.$t("iaoMng.yl")
                ? this.choosePhData.whseDyesainDtlboid
                : this.datas === this.$t("iaoMng.sx")
                ? this.choosePhData.whseYarninDtlaoid
                : this.datas === this.$t("choicDlg.rl")
                ? this.choosePhData.whseEnergyDtlaId
                : this.datas === this.$t("iaoMng.hgyl")
                ? this.choosePhData.whseChemicalinDtlboid
                : this.datas === this.$t("iaoMng.sb")
                ? this.choosePhData.whseEquipmentDtlaoid
                : this.choosePhData.whseAccessoriesDtlaoid
            )
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
      }
      this.getPh();
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    async saveAll() {
      if (this.form.purNo === "" || this.form.deliNo === "") {
        this.$tip.error(this.$t("whseMng.saveTle7"));
        return;
      }
      if (this.form.yinId === "" || this.form.yinDate === null) {
        this.$tip.error(this.$t("whseMng.saveTle8"));
        return;
      }
      if (
        this.datas === this.$t("iaoMng.hgyl") ||
        this.datas === this.$t("iaoMng.yl") ||
        this.datas === this.$t("iaoMng.sx") ||
        this.datas === this.$t("choicDlg.rl")
      ) {
        for (let i = 0; i < this.mx.length; i++) {
          if (
            this.datas === this.$t("iaoMng.sx") &&
            (!this.mx[i].yarnsCard || !this.mx[i].batId || !this.mx[i].batchNos)
          ) {
            this.$tip.error("纱牌/供应商批号/本厂纱批号不能为空!");
            return;
          }
          if (!this.mx[i].list) {
            break;
          }
          for (let j = 0; j < this.mx[i].list.length; j++) {
            if (!this.mx[i].list[j].weight || !this.mx[i].list[j].weightUnit) {
              this.$tip.error(this.$t("iaoMng.saveTle17"));
              return;
            } else if (
              !this.mx[i].list[j].locationCode &&
              !this.mx[i].list[j].storageNo
            ) {
              this.$tip.error("货位码不能为空!");
              return;
            }
          }
        }
      }
      this.screenLoading = true;
      this.modified = true;
      if (this.form.yinDate != "" && this.form.yinDate != undefined) {
        this.form.yinDate += " 00:00:00";
      }
      if (
        this.form.whseChemicalinoid ||
        this.form.whseAccessoriesinoid ||
        this.form.whseYarninoid ||
        this.form.whseDyesalinoid ||
        this.form.energyInId ||
        this.form.whseEquipmentInoid
      ) {
        this.everyThing.update(this.form).then((res) => {
          if (this.mx.length === 0) {
            this.$tip.success(this.$t("public.bccg"));
          }
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                item.whseChemicalinDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseYarninDtloid ||
                item.whseDyesainDtlaoid ||
                item.energyDtloid ||
                item.whseEquipmentDtloid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseChemicalinFk = this.detail.whseChemicalinoid;
                data.whseAccessoriesInFk = this.detail.whseAccessoriesinoid;
                data.whseYarninFk = this.detail.whseYarninoid;
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                data.whseEnergyInFk = this.detail.energyInId;
                data.whseHardwareInFk = this.detail.whseAccessoriesinoid;
                data.whseOfficeInFk = this.detail.whseAccessoriesinoid;
                data.whseEquipmentInFk = this.detail.whseEquipmentInoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseYarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
                  item.energyDtloid = res.data.data;
                  item.whseEquipmentDtloid = res.data.data;
                  if (this.datas != this.$t("iaoMng.sx")) {
                    baseCodeSupply({ code: this.everyThing.batCode }).then(
                      (res) => {}
                    );
                  }
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
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  item.energyDtloid = this.mx[i].energyDtloid;
                  item.whseAccessoriesDtloid = this.mx[i].whseAccessoriesDtloid;
                  item.whseOfficeDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseEquipmentDtlFk = this.mx[i].whseEquipmentDtloid;
                  if (
                    !item.whseChemicalinDtlboid &&
                    !item.whseDyesainDtlboid &&
                    !item.whseYarninDtlaoid &&
                    !item.whseEnergyDtlaId &&
                    !item.whseAccessoriesDtlaoid &&
                    !item.whseEquipmentDtlaoid
                  ) {
                    this.everyThing.addPh(item).then((res) => {
                      item.whseChemicalinDtlboid = res.data.data;
                      item.whseDyesainDtlboid = res.data.data;
                      item.whseYarninDtlaoid = res.data.data;
                      item.whseEnergyDtlaId = res.data.data;
                      item.whseAccessoriesDtlaoid = res.data.data;
                      item.whseEquipmentDtlaoid = res.data.data;
                    });
                  } else {
                    this.everyThing.updatePh(item).then((res) => {});
                  }
                  // }
                });
              }
              if (this.mx[i].alloc) {
                this.mx[i].alloc.forEach((item) => {
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseYarninDtlaFk = this.mx[i].whseYarninDtloid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.energyDtloid = this.mx[i].energyDtloid;
                  if (
                    !item.whseAccessoriesinAllocoid &&
                    !item.whseChemicalinAllocoid &&
                    !item.whseYarninAllocoid &&
                    !item.whseDyesainAllocoid
                  ) {
                    item.allocMain = item.appId;
                    item.allocQty = item.applyNum;
                    this.everyThing.addAlloc(item).then((res) => {
                      item.whseAccessoriesinAllocoid = res.data.data;
                      item.whseChemicalinAllocoid = res.data.data;
                      item.whseYarninAllocoid = res.data.data;
                      item.whseDyesainAllocoid = res.data.data;
                    });
                  }
                });
              }
              if (i === this.mx.length - 1) {
                // this.getDetail();
                this.$tip.success(this.$t("public.bccg"));
                setTimeout(() => {
                  this.screenLoading = false;
                }, 200);
              }
            }
          });
        });
      } else {
        this.form.stockState = this.form.andOut ? "1" : "0";
        this.everyThing.add(this.form).then((res) => {
          if (this.mx.length === 0) {
            this.$tip.success(this.$t("public.bccg"));
          }
          baseCodeSupply({ code: this.everyThing.code }).then((res) => {});
          this.form.whseChemicalinoid = res.data.data;
          this.form.energyInId = res.data.data;
          this.form.whseAccessoriesinoid = res.data.data;
          this.form.whseYarninoid = res.data.data;
          this.form.whseDyesalinoid = res.data.data;
          this.form.whseEquipmentInoid = res.data.data;
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                item.whseChemicalinDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseYarninDtloid ||
                item.whseDyesainDtlaoid ||
                item.energyDtloid ||
                item.whseEquipmentDtloid
              ) {
                resolve();
                // 修改
              } else {
                // 新增
                data.whseChemicalinFk = this.form.whseChemicalinoid;
                data.whseAccessoriesInFk = this.form.whseAccessoriesinoid;
                data.whseYarninFk = this.form.whseYarninoid;
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                data.whseEnergyInFk = this.form.energyInId;
                data.whseHardwareInFk = this.form.whseAccessoriesinoid;
                data.whseOfficeInFk = this.form.whseAccessoriesinoid;
                data.whseEquipmentInFk = this.form.whseEquipmentInoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.energyDtloid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseYarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
                  item.whseEquipmentDtloid = res.data.data;
                  if (this.datas != this.$t("iaoMng.sx")) {
                    baseCodeSupply({ code: this.everyThing.batCode }).then(
                      (res) => {}
                    );
                  }
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr)
            .then((res) => {
              let reqArrs = [];
              for (let i = 0; i < this.mx.length; i++) {
                if (this.mx[i].list) {
                  this.mx[i].list.forEach((item, j) => {
                    item.whseChemicalinDtlaFk =
                      this.mx[i].whseChemicalinDtlaoid;
                    item.energyDtloid = this.mx[i].energyDtloid;
                    item.energyDtlFk = this.mx[i].energyDtloid;
                    item.whseAccessoriesDtlFk =
                      this.mx[i].whseAccessoriesDtloid;
                    item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                    item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                    item.whseAccessoriesDtloid =
                      this.mx[i].whseAccessoriesDtloid;
                    item.whseOfficeDtlFk = this.mx[i].whseAccessoriesDtloid;
                    item.whseEquipmentDtlFk = this.mx[i].whseEquipmentDtloid;
                    if (
                      !item.whseChemicalinDtlboid &&
                      !item.whseDyesainDtlboid &&
                      !item.whseYarninDtlaoid &&
                      !item.whseEnergyDtlaId &&
                      !item.whseAccessoriesDtlaoid &&
                      !item.whseEquipmentDtlaoid
                    ) {
                      let addSyncFn = this.everyThing
                        .addPh(item)
                        .then((res) => {
                          item.whseChemicalinDtlboid = res.data.data;
                          item.whseDyesainDtlboid = res.data.data;
                          item.whseYarninDtlaoid = res.data.data;
                          item.whseEnergyDtlaId = res.data.data;
                          item.whseAccessoriesDtlaoid = res.data.data;
                          item.whseEquipmentDtlaoid = res.data.data;
                        });
                      reqArrs.push(addSyncFn);
                    } else {
                      let updateSyncFn = this.everyThing
                        .updatePh(item)
                        .then((res) => {});
                      reqArrs.push(updateSyncFn);
                    }
                    // if (
                    //   i === this.mx.length - 1 &&
                    //   j == this.mx[i].list.length - 1
                    // ) {
                    //   this.saveBefore();
                    // }
                  });
                }
                if (this.mx[i].alloc) {
                  this.mx[i].alloc.forEach((item) => {
                    item.whseChemicalinDtlaFk =
                      this.mx[i].whseChemicalinDtlaoid;
                    item.energyDtloid = this.mx[i].energyDtloid;
                    item.energyDtlFk = this.mx[i].energyDtloid;
                    item.whseAccessoriesDtlFk =
                      this.mx[i].whseAccessoriesDtloid;
                    item.whseYarninDtlaFk = this.mx[i].whseYarninDtloid;
                    item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                    if (
                      !item.whseAccessoriesinAllocoid &&
                      !item.whseChemicalinAllocoid &&
                      !item.whseYarninAllocoid &&
                      !item.whseDyesainAllocoid
                    ) {
                      item.allocMain = item.appId;
                      item.allocQty = item.applyNum;
                      let addAllocSyncFn = this.everyThing
                        .addAlloc(item)
                        .then((res) => {
                          item.whseAccessoriesinAllocoid = res.data.data;
                          item.whseChemicalinAllocoid = res.data.data;
                          item.whseYarninAllocoid = res.data.data;
                          item.whseDyesainAllocoid = res.data.data;
                        });
                      reqArrs.push(addAllocSyncFn);
                    }
                  });
                }
              }
              return Promise.all(reqArrs);
            })
            .then((res) => {
              if (this.datas === this.$t("iaoMng.sx") && this.form.andOut) {
                createOutOrder(this.form.whseYarninoid).then((res) => {});
              }
            })
            .finally(() => {
              this.$tip.success(this.$t("public.bccg"));
              this.screenLoading = false;
            });
        });
      }
    },
    saveBefore() {
      if (this.datas === this.$t("iaoMng.sx") && this.form.andOut) {
        createOutOrder(this.form.whseYarninoid).then((res) => {});
      }
      setTimeout(() => {
        this.$tip.success(this.$t("public.bccg"));
        this.screenLoading = false;
      }, 200);
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
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail, .el-table {
  overflow: visible !important;
}
</style>