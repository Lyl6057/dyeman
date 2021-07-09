<template>
  <div id="rcDetail">
    <view-container :title="datas + '出倉資料'" v-loading="wloading">
      <div class="btnList">
        <el-button type="success" @click="saveAll">{{
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
        <el-col
          :span="
            datas === this.$t('iaoMng.pb')
              ? 12
              : datas === this.$t('iaoMng.hgyl') ||
                datas === this.$t('iaoMng.yl')
              ? 15
              : datas === this.$t('iaoMng.sx')
              ? 24
              : 12
          "
        >
          <view-container :title="datas + this.$t('iaoMng.ccmx')">
            <div class="btnList">
              <el-button type="primary" @click="add">{{
                this.$t("public.add")
              }}</el-button>
              <el-button
                type="danger"
                @click="del"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ this.$t("public.del") }}</el-button
              >
            </div>
            <div class="crudBox">
              <avue-crud
                id="mx"
                ref="mx"
                :option="mxOp"
                v-loading="loading"
                :data="mx"
                :page.sync="page"
                @current-row-change="cellClick"
                @on-load="getDetail"
              >
                <template slot="yarnsId" slot-scope="scope">
                  <el-select
                    v-model="scope.row.yarnsId"
                    placeholder="请选择"
                    filterable
                    allow-create
                    clearable
                    default-first-option
                    class="customize-select"
                  >
                    <el-option
                      v-for="item in everyThing.sx2C.column[1].dicData"
                      :key="item.value"
                      :label="item.value + '-' + item.label"
                      :value="item.value"
                    >
                      <span style="float: left">
                        {{ item.value + " - " + item.label }}</span
                      >
                    </el-option>
                  </el-select>
                </template>
                <template slot="clothName" slot-scope="scope">
                  <el-select
                    v-model="scope.row.clothName"
                    placeholder="请选择"
                    filterable
                    allow-create
                    default-first-option
                    clearable
                    class="customize-select"
                  >
                    <!-- @change="selectChange(scope.row)" -->
                    <el-option
                      v-for="item in everyThing.sx2C.column[1].dicData"
                      :key="item.value"
                      :label="item.label + '-' + item.value"
                      :value="item.value"
                    >
                      <span style="float: left">
                        {{ item.label + " - " + item.value }}</span
                      >
                    </el-option>
                  </el-select>
                </template>
                <template slot="chemicalId" slot-scope="scope">
                  <el-select
                    v-model="scope.row.chemicalId"
                    placeholder="请选择"
                    filterable
                    allow-create
                    default-first-option
                    clearable
                    class="customize-select"
                  >
                    <!-- @change="selectChange(scope.row)" -->
                    <el-option
                      v-for="item in everyThing.sx2C.column[1].dicData"
                      :key="item.bcCode"
                      :label="
                        item.bcCode +
                        '-' +
                        ($store.state.lang == '1'
                          ? item.cnnamelong
                          : item.ennamelong)
                      "
                      :value="item.bcCode"
                    >
                      <span style="float: left">
                        {{
                          item.bcCode +
                          " - " +
                          ($store.state.lang == "1"
                            ? item.cnnamelong
                            : item.ennamelong)
                        }}</span
                      >
                    </el-option>
                  </el-select>
                </template>
                <template slot="materialNum" slot-scope="scope">
                  <el-select
                    v-model="scope.row.materialNum"
                    placeholder="请选择"
                    filterable
                    allow-create
                    default-first-option
                    clearable
                    class="customize-select"
                  >
                    <!-- @change="selectChange(scope.row)" -->
                    <el-option
                      v-for="item in datas == $t('choicDlg.wj')
                        ? wj
                        : datas == $t('choicDlg.xz')
                        ? xz
                        : datas == $t('choicDlg.scfl')
                        ? scfl
                        : rl"
                      :key="item.value"
                      :label="item.value + '-' + item.label"
                      :value="item.value"
                    >
                      <span
                        style="float: left"
                        @click="selectChange(item, scope.row)"
                      >
                        {{
                          item.value +
                          " - " +
                          item.label +
                          " - 規格(" +
                          item.itemspec +
                          ") 型號(" +
                          item.model +
                          ")"
                        }}</span
                      >
                    </el-option>
                  </el-select>
                </template>
              </avue-crud>
            </div>
          </view-container></el-col
        >
        <el-col
          :span="9"
          v-if="
            datas === this.$t('iaoMng.hgyl') ||
            datas === this.$t('iaoMng.yl') ||
            datas === this.$t('choicDlg.wj') ||
            datas === this.$t('choicDlg.xz') ||
            datas === this.$t('choicDlg.scfl') ||
            datas === this.$t('choicDlg.rl')
          "
        >
          <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane
              :label="datas + this.$t('iaoMng.ccmxhw')"
              name="loc"
              v-if="
                datas != this.$t('choicDlg.wj') &&
                datas != this.$t('choicDlg.xz') &&
                datas != this.$t('choicDlg.scfl') &&
                datas != this.$t('choicDlg.rl')
              "
            >
              <loction
                ref="loc"
                :inData="chooseData"
                :api="everyThing"
                :form="form"
                :type="datas"
              ></loction>
            </el-tab-pane>
            <el-tab-pane :label="datas + this.$t('iaoMng.ccphzl')" name="ph">
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
          </el-tabs>
        </el-col>
        <!-- <el-col :span="9" v-if="datas === this.$t('iaoMng.sx')">
          <view-container :title="datas + this.$t('iaoMng.rcmxhw')">
            <loction
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
              :type="datas"
            ></loction>
          </view-container>
        </el-col> -->
        <el-col
          :span="12"
          v-if="datas === this.$t('iaoMng.pb') || datas === '成品布'"
        >
          <view-container :title="datas + this.$t('iaoMng.ccphzl')">
            <outwhse-ph
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
              :loc="false"
              :type="datas"
            ></outwhse-ph>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <ins-sheet
      :tle="datas"
      :sheetV="sheetV"
      :inForm="form"
      :inCrud="mx"
      @close="sheetV = false"
      v-if="sheetV"
    ></ins-sheet>
  </div>
</template>
<script>
import { rhl2C, rhl2F, rhl3C, rhl4C, wjxz3C } from "./data";
import { getDicTs, getDicT, getXDicT, postDicT } from "@/config";
import { getSubscribe } from "@/const/whse";
import loction from "@/components/location/index";
import outwhseph from "@/components/calico/outwhse_ph";
import insSheet from "@/components/insSheet/index";
import {
  getHardwarearticles,
  getAdsuppliesarticles,
  getProductivesupplies,
  baseCodeSupply,
  baseCodeSupplyEx,
} from "@/api/index";
export default {
  components: {
    loction: loction,
    insSheet: insSheet,
    outwhsePh: outwhseph,
  },
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
      mxOp: this.everyThing.sx2C,
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
      sysCreatedby: "",
      planV: false,
      wloading: false,
      sheetV: false,
      tabs: "loc",
      wj: getDicTs(
        "basHardwarearticles",
        this.$store.state.lang == "1" ? "chinName" : "engName",
        "hardwareId",
        "itemspec",
        "model",
        "msUnit"
      ),
      xz: getDicTs(
        "basAdsuppliesarticles",
        this.$store.state.lang == "1" ? "chinName" : "engName",
        "hardwareId",
        "itemspec",
        "model",
        "msUnit"
      ),
      scfl: getDicTs(
        "basProductivesupplies",
        this.$store.state.lang == "1" ? "chinName" : "engName",
        "hardwareId",
        "itemspec",
        "model",
        "msUnit"
      ),
      rl: getDicTs(
        "basFuel",
        this.$store.state.lang == "1" ? "chinName" : "engName",
        "hardwareId",
        "itemspec",
        "model",
        "msUnit"
      ),
      code: "",
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.mx = [];
      this.oldData = {};
      this.chooseData = {};
      this.form = this.detail;
      if (this.isAdd) {
        this.form.sysCreatedby = this.$store.state.userOid;
        return;
      }
      this.loading = true;
      this.mx = [];
      // this.mxOp.showSummary = false;
      this.everyThing
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseRetyarninFk: this.detail.whseRetyarninoid,
          whseMaterialFk: this.detail.whseMaterialoid,
          whseChemicalinFk: this.detail.whseChemicalinoid, // 化工原料Oid
          whseAccessoriesinFk: this.detail.whseAccessoriesinoid, // 辅料/五金/行政Oid
          whseDyesalinFk: this.detail.whseDyesalinoid, // 顏料Oid
          whseFinclothselloutFk: this.detail.whseFinclothselloutoid,
          whseEnergyInFk: this.detail.energyInId,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          if (this.mx.length === 0) {
            this.loading = false;
          }
          this.mx.sort((a, b) => {
            return a.countingNo - b.countingNo;
          });
          this.mx.forEach((item, index) => {
            item.index = index + 1;
            item.chinName = item.materialNum;
            if (this.datas == "成品布") {
              item.clothName = item.woMatname;
            }
            // item.yarnsName = item.yarnsId;
            // if (this.datas === this.$t("iaoMng.hgyl")) {
            //   // 處理英文名稱 、色光、力份信息
            //   let data = JSON.parse(JSON.stringify(item.chemicalId));
            //   item.ennamelong = item.chemicalId;
            //   item.modeltype = item.chemicalId;
            //   item.vitality = item.chemicalId;
            // }
            // if (this.datas === this.$t("iaoMng.yl")) {
            //   // 處理英文名稱 、色光、力份信息
            //   item.ennamelong = item.chemicalId;
            //   item.bcColor = item.chemicalId;
            //   item.bcForce = item.chemicalId;
            // }
            // item.bcMatengname = item.chemicalId;
            // item.bcColor = item.chemicalId;
            // item.bcForce = item.chemicalId;
            if (index === this.mx.length - 1) {
              // this.mxOp.showSummary = true;
              setTimeout(() => {
                // this.$refs.mx.setCurrentRow(this.mx[0]);
                this.loading = false;
              }, 200);
            }
          });
          // }
          setTimeout(() => {
            if (this.mx.length) {
              this.$refs.mx.setCurrentRow(this.mx[0]);
            }
          }, 200);
        });
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
        !this.chooseData.whseAccessoriesDtloid &&
        !this.chooseData.energyDtloid
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
          whseAccessoriesDtlFk: this.chooseData.whseAccessoriesDtloid,
          energyDtloid: this.chooseData.energyDtloid,
          rows: 999,
          start: 1,
        })
        .then((res) => {
          let records = res.data;
          this.phPage.total = records.total;
          let data = res.data;
          // data = records.records;
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
    getLoc() {
      if (this.isAdd) {
        if (this.chooseData.loc) {
          if (this.chooseData.loc.length != 0) {
            this.$refs.loc.setCurrentRow(this.chooseData.loc[0]);
          } else {
          }
        }
        return;
      }
      if (
        !this.chooseData.whseChemicalinDtlaoid &&
        !this.chooseData.whseDyesainDtlaoid
      ) {
        this.chooseData.loc = [];
        return;
      }
      if (this.chooseData.loc) {
        if (this.chooseData.loc.length != 0) {
          this.$refs.loc.setCurrentRow(this.chooseData.loc[0]);
          return;
        }
      }
      this.ctLoading = true;
      this.everyThing
        .getLoc({
          whseChemicalinDtlaFk: this.chooseData.whseChemicalinDtlaoid,
          whseDyesainDtlaFk: this.chooseData.whseDyesainDtlaoid,
          rows: 99,
          start: 1,
        })
        .then((res) => {
          let records = res.data;
          let data = [];
          data = records.records;
          if (data.length === 0) {
            this.ctLoading = false;
          }
          data.forEach((item, index) => {
            item.index = index + 1;
            if (index === data.length - 1) {
              this.chooseData.loc = data;
              this.ctLoading = false;
            }
          });
        });
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
        origin:
          this.chooseData.list.slice(-1).length > 0
            ? this.chooseData.list.slice(-1)[0].origin
            : "",
        weightUnit:
          this.chooseData.list.slice(-1).length > 0
            ? this.chooseData.list.slice(-1)[0].weightUnit || "KG"
            : "KG",
      });
      this.phPage.total++;
      this.$refs.count.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
      this.$nextTick(() => {
        this.$toTableLow(this, "count");
      });
      this.ctLoading = false;
    },
    add() {
      this.mx.push({
        index: this.mx.length + 1,
        weightUnit: "KG",
        $cellEdit: true,
        countingNo: this.mx.length + 1,
        // materialType: "1",
        batchNo: this.code,
      });
      this.code =
        this.code.substring(0, 3) + (Number(this.code.substring(3)) + 1);
      this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1]);
      this.$nextTick(() => {
        this.$toTableLow(this, "mx");
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseFinclothselloutDtlaoid &&
        !this.chooseData.whseRetyarninDtloid &&
        !this.chooseData.whseMaterialDlaoid &&
        !this.chooseData.whseChemicalinDtlaoid &&
        !this.chooseData.whseAccessoriesDtloid &&
        !this.chooseData.whseDyesainDtlaoid &&
        !this.chooseData.energyDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        if (this.mx.length > 0) {
          this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1]);
        } else {
          this.chooseData = {};
        }

        return;
      }
      this.$tip
        .cofirm("是否確定刪除選中的數據?", {})
        .then(() => {
          this.everyThing
            .delDetail(
              this.datas === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseChemicalinDtlaoid
                : this.datas === this.$t("iaoMng.yl")
                ? this.chooseData.whseDyesainDtlaoid
                : this.datas === this.$t("iaoMng.sx")
                ? this.chooseData.whseRetyarninDtloid
                : this.datas === this.$t("iaoMng.pb")
                ? this.chooseData.whseMaterialDlaoid
                : this.datas === "成品布"
                ? this.chooseData.whseFinclothselloutDtlaoid
                : this.datas === this.$t("choicDlg.rl")
                ? this.chooseData.energyDtloid
                : this.chooseData.whseAccessoriesDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.modified = true;
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
        !this.choosePhData.whseAccessoriesDtlaoid &&
        !this.choosePhData.whseEnergyDtlaId
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
        .cofirm("是否確定刪除選中的數據?", {})
        .then(() => {
          this.everyThing
            .delPh(
              this.datas === this.$t("iaoMng.yl")
                ? this.choosePhData.whseDyesainDtlboid
                : this.datas === this.$t("iaoMng.hgyl")
                ? this.choosePhData.whseChemicalinDtlboid
                : this.datas === this.$t("choicDlg.rl")
                ? this.choosePhData.whseEnergyDtlaId
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
      if (
        this.datas === this.$t("iaoMng.hgyl") ||
        this.datas === this.$t("iaoMng.yl") ||
        this.datas === this.$t("choicDlg.wj") ||
        this.datas === this.$t("choicDlg.xz") ||
        this.datas === this.$t("choicDlg.scfl") ||
        this.datas === this.$t("choicDlg.rl")
      ) {
        this.getPh();
        // this.getLoc();
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
      if (this.form.yinId === "" || this.form.yinDate === null) {
        this.$tip.error(this.$t("whseMng.saveTle8"));
        return;
      }
      if (this.datas === this.$t("iaoMng.sx")) {
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].yarnsId || !this.mx[i].weight) {
            this.$tip.error("紗線名稱/出倉重量不能為空!");
            return;
          }
          this.mx[i].yarnsName = this.mx[i].$yarnsName;
        }
      }
      if (this.datas === this.$t("iaoMng.pb")) {
        for (let i = 0; i < this.mx.length; i++) {
          this.mx[i].calicoId = this.mx[i].$clothName;
          this.mx[i].weightUnit = "";
          if (this.mx[i].loc) {
            for (let j = 0; j < this.mx[i].loc.length; j++) {
              if (!this.mx[i].loc[j].weight || !this.mx[i].loc[j].weightUnit) {
                this.$tip.error(this.$t("iaoMng.saveTle6"));
                return;
              }
              if (!this.mx[i].loc[j].custTicket) {
                this.$tip.error("布票號不能為空!");
                return;
              }
            }
          }
        }
      }
      if (this.datas === "成品布") {
        for (let i = 0; i < this.mx.length; i++) {
          this.mx[i].woMatno = this.mx[i].$clothName;
          this.mx[i].woMatname = this.mx[i].clothName;
          if (this.mx[i].loc) {
            for (let j = 0; j < this.mx[i].loc.length; j++) {
              if (!this.mx[i].loc[j].woWeights || !this.mx[i].loc[j].woUnit) {
                this.$tip.error(this.$t("iaoMng.saveTle6"));
                return;
              }
              if (!this.mx[i].loc[j].ticketNo) {
                this.$tip.error("布票號不能為空!");
                return;
              }
            }
          }
        }
      }
      if (
        this.datas === this.$t("iaoMng.hgyl") ||
        this.datas === this.$t("iaoMng.yl")
      ) {
        for (let i = 0; i < this.mx.length; i++) {
          this.mx[i].chemicalName = this.mx[i].$chemicalId;
          if (!this.mx[i].loc) {
            return;
          }
          for (let j = 0; j < this.mx[i].loc.length; j++) {
            if (!this.mx[i].loc[j].weight) {
              this.$tip.error("出仓货位数量不能为空!");
              return;
            }
          }
        }
      }
      if (
        this.datas === this.$t("choicDlg.wj") ||
        this.datas === this.$t("choicDlg.xz") ||
        this.datas === this.$t("choicDlg.scfl") ||
        this.datas === this.$t("choicDlg.rl")
      ) {
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].materialNum) {
            this.$tip.error("材料名稱不能为空!");
            return;
          }
          if (!this.mx[i].list) {
            continue;
          }
          for (let j = 0; j < this.mx[i].list.length; j++) {
            if (
              !this.mx[i].list[j].weight &&
              !this.mx[i].list[j].locationCode
            ) {
              this.$tip.error("出仓数量/貨位碼不能为空!");
              return;
            }
          }
        }
      }
      this.modified = true;
      this.wloading = true;
      this.form.finStatus = "0";
      if (this.form.retDate != "" && this.form.retDate != undefined) {
        this.form.retDate += " 00:00:00";
      }
      if (this.form.woDate != "" && this.form.woDate != undefined) {
        this.form.woDate += " 00:00:00";
      }
      if (
        this.form.whseFinclothselloutoid ||
        this.form.whseAccessoriesinoid ||
        this.form.whseRetyarninoid ||
        this.form.whseMaterialoid ||
        this.form.whseChemicalinoid ||
        this.form.whseDyesalinoid ||
        this.form.energyInId
      ) {
        this.form.sysLastUpdBy = this.$store.state.userOid;
        this.everyThing.update(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.wloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              // if (
              //   item.loc &&
              //   this.datas != "成品布" &&
              //   this.datas != this.$t("choicDlg.wj") &&
              //   this.datas != this.$t("choicDlg.xz") &&
              //   this.datas != this.$t("choicDlg.scfl") &&
              //   this.datas != this.$t("choicDlg.rl")
              // ) {
              //   item.countingNo = item.loc ? item.loc.length : 0;
              //   item.weight = 0;
              //   item.loc.forEach((loc) => {
              //     item.weight = Number(item.weight) + Number(loc.weight);
              //   });
              // }
              // if (
              //   item.list &&
              //   (this.datas == this.$t("choicDlg.wj") ||
              //     this.datas === this.$t("choicDlg.xz") ||
              //     this.datas === this.$t("choicDlg.scfl") ||
              //     this.datas === this.$t("choicDlg.rl"))
              // ) {
              //   item.poQty = 0;
              //   item.list.forEach((loc) => {
              //     item.poQty = Number(item.poQty) + Number(loc.weight);
              //   });
              // }
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.loc = [];
              if (
                item.whseFinclothselloutDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseRetyarninDtloid ||
                item.whseMaterialDlaoid ||
                item.whseChemicalinDtlaoid ||
                item.whseDyesainDtlaoid ||
                item.energyDtloid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseEnergyInFk = this.detail.energyInId;
                data.whseAccessoriesinFk = this.detail.whseAccessoriesinoid;
                data.whseFinclothselloutFk = this.detail.whseFinclothselloutoid;
                data.whseRetyarninFk = this.detail.whseRetyarninoid;
                data.whseMaterialFk = this.detail.whseMaterialoid;
                data.whseChemicalinFk = this.detail.whseChemicalinoid;
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                baseCodeSupply({ code: this.everyThing.batchCode }).then(
                  (res) => {}
                );
                this.everyThing.addDetail(data).then((res) => {
                  item.energyDtloid = res.data.data;
                  item.whseFinclothselloutDtlaoid = res.data.data;
                  item.whseMaterialDlaoid = res.data.data;
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;

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
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.energyDtloid = this.mx[i].energyDtloid;
                  if (
                    this.datas === this.$t("iaoMng.hgyl") ||
                    this.datas === this.$t("iaoMng.yl") ||
                    this.datas === this.$t("choicDlg.wj") ||
                    this.datas === this.$t("choicDlg.xz") ||
                    this.datas === this.$t("choicDlg.scfl") ||
                    this.datas === this.$t("choicDlg.rl")
                  ) {
                    if (
                      !item.whseChemicalinDtlboid &&
                      !item.whseDyesainDtlboid &&
                      !item.whseAccessoriesDtlaoid &&
                      !item.whseEnergyDtlaId
                    ) {
                      this.everyThing.addPh(item).then((res) => {
                        item.whseChemicalinDtlboid = res.data.data;
                        item.whseDyesainDtlboid = res.data.data;
                        item.whseAccessoriesDtlaoid = res.data.data;
                        item.whseEnergyDtlaId = res.data.data;
                      });
                    } else {
                      this.everyThing.updatePh(item).then((res) => {});
                    }
                  }
                });
              }
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  item.whseMaterialDlaFk = this.mx[i].whseMaterialDlaoid;
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.whseFinclothselloutDtlaFk =
                    this.mx[i].whseFinclothselloutDtlaoid;
                  if (
                    !item.whseYarninDtlaoid &&
                    !item.whseMaterialDlboid &&
                    !item.whseChemicalinDtlcoid &&
                    !item.whseDyesainDtlcoid &&
                    !item.whseFinclothselloutDtlboid
                  ) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                      item.whseMaterialDlboid = res.data.data;
                      item.whseChemicalinDtlcoid = res.data.data;
                      item.whseDyesainDtlcoid = res.data.data;
                      item.whseFinclothselloutDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                // this.getDetail();
                setTimeout(() => {
                  this.wloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      } else {
        this.form.sysCreated = this.$getNowTime("datetime");
        this.form.sysCreatedby = this.$store.state.userOid;
        this.everyThing.add(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.wloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          // baseCodeSupply({ code: this.everyThing.code }).then((res) => {});
          this.form.whseChemicalinoid = res.data.data;
          this.form.whseDyesalinoid = res.data.data;
          this.form.whseRetyarninoid = res.data.data;
          this.form.whseMaterialoid = res.data.data;
          this.form.whseFinclothselloutoid = res.data.data;
          this.form.whseAccessoriesinoid = res.data.data;
          this.form.energyInId = res.data.data;
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              // if (
              //   item.loc &&
              //   this.datas != "成品布" &&
              //   this.datas != this.$t("choicDlg.wj") &&
              //   this.datas != this.$t("choicDlg.xz") &&
              //   this.datas != this.$t("choicDlg.scfl") &&
              //   this.datas != this.$t("choicDlg.rl")
              // ) {
              //   item.countingNo = item.loc ? item.loc.length : 0;
              //   item.weight = 0;
              //   item.loc.forEach((loc) => {
              //     item.weight = Number(item.weight) + Number(loc.weight);
              //   });
              // }
              // if (
              //   item.list &&
              //   (this.datas == this.$t("choicDlg.wj") ||
              //     this.datas === this.$t("choicDlg.xz") ||
              //     this.datas === this.$t("choicDlg.scfl") ||
              //     this.datas === this.$t("choicDlg.rl"))
              // ) {
              //   item.poQty = 0;
              //   item.list.forEach((loc) => {
              //     item.poQty = Number(item.poQty) + Number(loc.weight);
              //   });
              // }
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.loc = [];
              if (
                item.whseFinclothselloutDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseRetyarninDtloid ||
                item.whseMaterialDlaoid ||
                item.whseChemicalinDtlaoid ||
                item.whseDyesainDtlaoid ||
                item.energyDtloid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseEnergyInFk = this.form.energyInId;
                data.whseAccessoriesinFk = this.form.whseAccessoriesinoid;
                data.whseFinclothselloutFk = this.form.whseFinclothselloutoid;
                data.whseYarninFk = this.form.whseYarninoid;
                data.whseMaterialFk = this.form.whseMaterialoid;
                data.whseChemicalinFk = this.form.whseChemicalinoid;
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                data.whseRetyarninFk = this.form.whseRetyarninoid;
                baseCodeSupply({ code: this.everyThing.batchCode }).then(
                  (res) => {}
                );
                this.everyThing.addDetail(data).then((res) => {
                  item.energyDtloid = res.data.data;
                  item.whseRetyarninDtloid = res.data.data;
                  item.whseMaterialDlaoid = res.data.data;
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
                  item.whseFinclothselloutDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
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
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.energyDtloid = this.mx[i].energyDtloid;
                  if (
                    this.datas === this.$t("iaoMng.hgyl") ||
                    this.datas === this.$t("iaoMng.yl") ||
                    this.datas === this.$t("choicDlg.wj") ||
                    this.datas === this.$t("choicDlg.xz") ||
                    this.datas === this.$t("choicDlg.scfl") ||
                    this.datas === this.$t("choicDlg.rl")
                  ) {
                    if (
                      !item.whseChemicalinDtlboid &&
                      !item.whseDyesainDtlboid &&
                      !item.whseAccessoriesDtlaoid &&
                      !item.whseEnergyDtlaId
                    ) {
                      this.everyThing.addPh(item).then((res) => {
                        item.whseChemicalinDtlboid = res.data.data;
                        item.whseDyesainDtlboid = res.data.data;
                        item.whseAccessoriesDtlaoid = res.data.data;
                        item.whseEnergyDtlaId = res.data.data;
                      });
                    } else {
                      this.everyThing.updatePh(item).then((res) => {});
                    }
                  }
                });
              }
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  item.whseMaterialDlaFk = this.mx[i].whseMaterialDlaoid;
                  item.whseFinclothselloutDtlaFk =
                    this.mx[i].whseFinclothselloutDtlaoid;
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (
                    !item.whseYarninDtlaoid &&
                    !item.whseMaterialDlboid &&
                    !item.whseChemicalinDtlcoid &&
                    !item.whseDyesainDtlcoid &&
                    !item.whseFinclothselloutDtlboid
                  ) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                      item.whseMaterialDlboid = res.data.data;
                      item.whseChemicalinDtlcoid = res.data.data;
                      item.whseDyesainDtlcoid = res.data.data;
                      item.whseFinclothselloutDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                // this.getDetail();
                setTimeout(() => {
                  this.wloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      }
    },
    createCk() {
      // 生成送檢單
      this.sheetV = true;
    },
    selectChange(val, row) {
      row.unitQty = val.msUnit;
      if (row.batchNo == null) {
        row.batchNo = "";
      }
      if (row.batchNo.indexOf(val.value.split("-")[0]) == -1) {
        row.batchNo = val.value.split("-")[0] + row.batchNo;
      }
    },
    close() {
      this.$emit("close");
      if (this.modified) {
        this.$emit("getData");
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["mx"].doLayout();
    });
  },
  created() {},
  mounted() {
    this.datas === this.$t("choicDlg.wj") ||
    this.datas === this.$t("choicDlg.xz") ||
    this.datas === this.$t("choicDlg.scfl") ||
    this.datas === this.$t("choicDlg.rl")
      ? ((this.tabs = "ph"), (this.countOp = wjxz3C(this)))
      : (this.tabs = "loc");
    this.wj = this.wj.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.xz = this.xz.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.scfl = this.scfl.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.rl = this.rl.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    baseCodeSupplyEx({ code: this.everyThing.batchCode }).then((res) => {
      this.code = res.data.data;
    });
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
  .el-table {
    overflow: visible !important;
  }

  .customize-select .el-input__inner {
    border: none;
  }
}
</style>