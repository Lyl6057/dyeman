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
        <el-button type="success" @click="saveAll">{{
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
        <el-col :span="14">
          <view-container :title="datas + $t('iaoMng.rcmx')">
            <div style="margin-bottom: 2px" class="btnList">
              <el-button type="danger" @click="del">{{
                this.$t("public.del")
              }}</el-button>
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
              <el-button type="primary" @click="addPh">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="delPh">{{
                this.$t("public.del")
              }}</el-button>
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
          <view-container :title="datas + $t('iaoMng.fpjl')">
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
      if (this.isAdd) {
        this.loading = true;
        this.mx = this.addList;
        if (!this.mx.length) {
          this.loading = false;
        }
        baseCodeSupplyEx({ code: this.everyThing.batCode }).then((res) => {
          this.code = res.data.data;
          this.mx.forEach((item, i) => {
            item.index = 1 + i;
            item.chemicalId = item.materialNum;
            item.chemicalName = item.chinName;
            item.yarnsId = item.materialNum;
            item.yarnsName = item.chinName;
            if (this.datas != this.$t("iaoMng.sx")) {
              item.batchNo = this.code;
              item.batchNos = item.batchNo.slice(2);
            } else {
              item.batchNos = item.batchNo;
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
              setTimeout(() => {
                this.loading = false;
                this.getAlloc();
              }, 200);
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
            whseAccessoriesinFk: this.detail.whseAccessoriesinoid, // 辅料/五金/行政Oid
            whseYarninFk: this.detail.whseYarninoid, // 纱线Oid
            whseDyesalinFk: this.detail.whseDyesalinoid, // 顏料Oid
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
              this.mxOp.column[4].dicData = dicData;
              this.mx = records.records;
              if (this.mx.length === 0) {
                this.loading = false;
              }

              this.mx.forEach((item, index) => {
                item.index = index + 1;
                item.chinName = item.materialNum;
                item.yarnsName = item.yarnsId;
                if (this.datas == this.$t("iaoMng.sx")) {
                  item.batchNos = item.batchNo;
                } else {
                  item.batchNos = item.batchNo.slice(2);
                }

                // item.$cellEdit = true;
                // item.bcMatengname = item.chemicalId;
                // item.bcColor = item.chemicalId;
                // item.bcForce = item.chemicalId;
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
        !this.chooseData.whseYarninDtloid
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
              this.$refs.mx.setCurrentRow(this.mx[0]);
            }
          });
        });
      } else {
        // 获取入仓分配
        this.fpLoading = true;
        this.mx.forEach((item, i) => {
          this.everyThing
            .getAlloc({
              whseChemicalinDtlaFk: item.whseChemicalinDtlaoid,
              whseAccessoriesDtlFk: item.whseAccessoriesDtloid,
              whseYarninDtlaFk: item.whseYarninDtloid,
              whseDyesainDtlaFk: item.whseDyesainDtlaoid,
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
        !this.chooseData.whseDyesainDtlaoid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1] || {});
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle11") +
            (this.datas === this.$t("iaoMng.hgyl")
              ? this.$t("iaoMng.hgyl")
              : this.datas === this.$t("iaoMng.yl")
              ? this.$t("iaoMng.yl")
              : this.datas === this.$t("iaoMng.sx")
              ? this.$t("iaoMng.sx")
              : this.$t("whseField.clbh")) +
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
                : this.chooseData.whseAccessoriesDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.modified = true;
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
        !this.choosePhData.whseYarninDtlaoid
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
                : this.choosePhData.whseChemicalinDtlboid
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
      // if (
      //   this.datas === this.$t("iaoMng.hgyl") ||
      //   this.datas === this.$t("iaoMng.yl")
      // ) {
      this.getPh();
      // }
      // this.allocPage.total = this.chooseData.alloc.length
      //   ? this.chooseData.alloc.length
      //   : 0;
      // this.getAlloc();
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    saveAll() {
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
        this.datas === this.$t("iaoMng.sx")
      ) {
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].list) {
            break;
          }
          for (let j = 0; j < this.mx[i].list.length; j++) {
            if (!this.mx[i].list[j].weight || !this.mx[i].list[j].weightUnit) {
              this.$tip.error(this.$t("iaoMng.saveTle17"));
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
        this.form.whseDyesalinoid
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
                item.whseDyesainDtlaoid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseChemicalinFk = this.detail.whseChemicalinoid;
                data.whseAccessoriesinFk = this.detail.whseAccessoriesinoid;
                data.whseYarninFk = this.detail.whseYarninoid;
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseYarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
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
                  // if (
                  //   this.datas === this.$t("iaoMng.hgyl") ||
                  //   this.datas === this.$t("iaoMng.yl")
                  // ) {
                  if (
                    !item.whseChemicalinDtlboid &&
                    !item.whseDyesainDtlboid &&
                    !item.whseYarninDtlaoid
                  ) {
                    this.everyThing.addPh(item).then((res) => {
                      item.whseChemicalinDtlboid = res.data.data;
                      item.whseDyesainDtlboid = res.data.data;
                      item.whseYarninDtlaoid = res.data.data;
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
              }
            }
          });
        });
      } else {
        this.everyThing.add(this.form).then((res) => {
          if (this.mx.length === 0) {
            this.$tip.success(this.$t("public.bccg"));
          }
          baseCodeSupply({ code: this.everyThing.code }).then((res) => {});
          this.form.whseChemicalinoid = res.data.data;
          this.form.whseAccessoriesinoid = res.data.data;
          this.form.whseYarninoid = res.data.data;
          this.form.whseDyesalinoid = res.data.data;
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
                item.whseDyesainDtlaoid
              ) {
                resolve();
                // 修改
              } else {
                // 新增
                data.whseChemicalinFk = this.form.whseChemicalinoid;
                data.whseAccessoriesinFk = this.form.whseAccessoriesinoid;
                data.whseYarninFk = this.form.whseYarninoid;
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseYarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
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
                  // if (
                  //   this.datas === this.$t("iaoMng.hgyl") ||
                  //   this.datas === this.$t("iaoMng.yl")
                  // ) {
                  if (
                    !item.whseChemicalinDtlboid &&
                    !item.whseDyesainDtlboid &&
                    !item.whseYarninDtlaoid
                  ) {
                    this.everyThing.addPh(item).then((res) => {
                      item.whseChemicalinDtlboid = res.data.data;
                      item.whseDyesainDtlboid = res.data.data;
                      item.whseYarninDtlaoid = res.data.data;
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
              }
            }
          });
        });
      }
      setTimeout(() => {
        this.screenLoading = false;
      }, 500);
    },
    close() {
      this.$emit("close");
      // if (this.modified) {
      this.$emit("getData");
      // }
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail, .el-table
  overflow visible !important
</style>