<template>
  <div id="rcDetail">
    <view-container :title="'採購' + datas + '入库'" v-loading="wloading">
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">查询</el-button> -->
        <!-- <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button> -->
        <el-button type="success" @click="saveAll">保存</el-button>
        <el-button
          type="primary"
          @click="createCk"
          v-if="
            form.whseYarninoid ||
            form.whseCalicoinoid ||
            form.whseChemicalinoid ||
            form.whseDyesalinoid
          "
          >生成送檢單</el-button
        >
        <el-button type="warning" @click="close">关闭</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col
          :span="
            datas === '胚布'
              ? 11
              : datas === '化工原料' || datas === '顏料'
              ? 14
              : 17
          "
        >
          <view-container :title="'採購' + datas + '入库明细'">
            <div class="btnList">
              <!-- <el-button type="primary" @click="planV = true">新增</el-button> -->
              <el-button
                type="danger"
                @click="del"
                :disabled="Object.keys(chooseData).length == 0"
                >删除</el-button
              >
            </div>
            <div class="crudBox">
              <avue-crud
                ref="mx"
                :option="mxOp"
                v-loading="loading"
                :data="mx"
                :page.sync="page"
                @current-row-change="cellClick"
                @on-load="getDetail"
              ></avue-crud>
            </div> </view-container
        ></el-col>
        <el-col :span="10" v-if="datas === '化工原料' || datas === '顏料'">
          <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane :label="'採購' + datas + '入庫批號資料'" name="ph">
              <div class="btnList">
                <el-button type="primary" @click="addPh">新增</el-button>
                <el-button type="danger" @click="delPh">删除</el-button>
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
            <el-tab-pane :label="'採購' + datas + '入库明細貨位'" name="loc">
              <loction
                ref="loc"
                :inData="chooseData"
                :api="everyThing"
                :form="form"
                :type="datas"
              ></loction>
            </el-tab-pane>
          </el-tabs>

          <!-- <view-container :title="datas + '分配记录'">
            <avue-crud
              ref="alloc"
              id="alloc"
              v-loading="ctLoading"
              :option="allocOp"
              :page.sync="allocPage"
              :data="chooseData.alloc"
            ></avue-crud> </view-container
        > -->
        </el-col>
        <el-col :span="7" v-if="datas === '紗線'">
          <view-container :title="'採購' + datas + '入库明細貨位'">
            <loction
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
              :type="datas"
            ></loction>
          </view-container>
        </el-col>
        <el-col :span="13" v-if="datas === '胚布'">
          <view-container :title="'採購' + datas + '入库批號資料'">
            <inwhse-ph
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
            ></inwhse-ph>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="planV"
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      fullscreen
      v-if="planV"
    >
      <view-container title="未入仓送货单资料">
        <plan
          ref="plan"
          v-if="planV"
          :data="datas"
          :upDate="true"
          :upDateQuery="form"
          @check="add"
          @close="planV = false"
          :everyThing="everyThing"
        ></plan>
      </view-container>
    </el-dialog>
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
import { rhl2C, rhl2F, rhl3C, rhl4C } from "./data";
import { getSubscribe } from "@/const/whse";
import { getUcmlUser } from "@/const/whse.js";
import plan from "./plan";
import loction from "@/components/location/index";
import inwhseph from "@/components/calico/inwhse_ph";
import insSheet from "@/components/insSheet/index";
import {
  getHardwarearticles,
  getAdsuppliesarticles,
  getProductivesupplies,
  baseCodeSupply,
} from "@/api/index";
export default {
  components: {
    plan: plan,
    loction: loction,
    insSheet: insSheet,
    inwhsePh: inwhseph,
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
      tabs: "ph",
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.mx = [];
      // this.chooseData = {};
      this.oldData = {};
      this.form = this.detail;

      let addList = JSON.parse(JSON.stringify(this.addList));
      if (this.isAdd) {
        // this.chooseData = {};
        this.form.purNo = addList[0].poNo;
        this.form.sysCreatedby = this.$store.state.userOid;
        addList.forEach((item, index) => {
          if (index === 0) {
            if (this.datas === "胚布") {
              item.loc = [];
              item.weight = item.netWei;
              item.weightUnit = item.weiUnit;
              item.countingNo = 1;
              item.loc.push(JSON.parse(JSON.stringify(item)));
            }
            if (this.datas === "化工原料" || this.datas === "顏料") {
              item.list = [];
              item.weight = item.deliQty;
              item.weightUnit = item.deliUnit;
              item.list.push(JSON.parse(JSON.stringify(item)));
            }
            this.mx.push(item);
          } else {
            for (let i = 0; i < this.mx.length; i++) {
              if (
                this.mx[i].calicoId === item.calicoId ||
                this.mx[i].yarnsId === item.yarnsId ||
                this.mx[i].chemicalId === item.chemicalId
              ) {
                item.index = this.mx[i].loc.length + 1;
                item.weight = item.netWei || item.deliQty;
                item.weightUnit = item.weiUnit || item.deliUnit;
                item.countingNo = this.mx[i].loc.length + 1;
                this.mx[i].loc.push(item);
                return;
              } else if (i === this.mx.length - 1) {
                item.loc = [];
                this.mx.push(item);
              }
            }
          }
        });
        // this.mx = this.addList;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          item.cartonNum = item.cartNum;
          item.cartonWei = item.netWei;
          item.weightUnit = item.weiUnit;
          item.clothName = item.calicoName;
          if (this.datas === "化工原料") {
            // 處理英文名稱 、色光、力份信息
            item.ennamelong = item.chemicalId;
            item.modeltype = item.chemicalId;
            item.vitality = item.chemicalId;
          }
          if (this.datas === "顏料") {
            // 處理英文名稱 、色光、力份信息
            item.ennamelong = item.chemicalId;
            item.bcColor = item.chemicalId;
            item.bcForce = item.chemicalId;
          }
          // item.weight = item.deliQty;
          // item.weightUnit = item.deliUnit;
          // item.poQty = item.deliQty;
          // item.unitQty = item.deliUnit;
          if (i === this.mx.length - 1) {
            // setTimeout(() => {
            //   this.getAlloc();
            // }, 200);
          }
        });
        setTimeout(() => {
          this.$refs.mx.setCurrentRow(this.mx[0] || {});
        }, 200);
        this.page.total = this.mx.length;
        return;
      }
      this.loading = true;
      this.mx = [];
      this.mxOp.showSummary = false;
      this.everyThing
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseYarninFk: this.detail.whseYarninoid,
          whseCalicoinFk: this.detail.whseCalicoinoid,
          whseChemicalinFk: this.detail.whseChemicalinoid, // 化工原料Oid
          whseAccessoriesinFk: this.detail.whseAccessoriesinoid, // 辅料/五金/行政Oid
          whseDyesalinFk: this.detail.whseDyesalinoid, // 顏料Oid
        })
        .then((res) => {
          // let dicData = [];
          // if (this.datas === "化工原料" || this.datas === "顏料") {
          //   getHardwarearticles().then((Res1) => {
          //     dicData = Res1.data;
          //     getAdsuppliesarticles().then((Res) => {
          //       dicData = dicData.concat(Res.data);
          //       getProductivesupplies().then((scfl) => {
          //         dicData = dicData.concat(scfl.data);
          //         let records = res.data;
          //         this.page.total = records.total;
          //         this.mxOp.column[4].dicData = dicData;
          //         this.mx = records.records;
          //         if (this.mx.length === 0) {
          //           this.loading = false;
          //         }
          //         this.mx.forEach((item, index) => {
          //           item.index = index + 1;
          //           item.chinName = item.materialNum;
          //           if (index === this.mx.length - 1) {
          //             this.mxOp.showSummary = true;
          //             setTimeout(() => {
          //               // this.$refs.mx.setCurrentRow(this.mx[0]);
          //               // this.getAlloc();
          //               this.loading = false;
          //             }, 200);
          //           }
          //         });
          //       });
          //     });
          //   });
          // } else {

          let records = res.data;
          this.page.total = records.total;
          // this.mxOp.column[4].dicData = dicData;
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
            item.yarnsName = item.yarnsId;
            if (this.datas === "化工原料") {
              // 處理英文名稱 、色光、力份信息
              let data = JSON.parse(JSON.stringify(item.chemicalId));
              item.ennamelong = item.chemicalId;
              item.modeltype = item.chemicalId;
              item.vitality = item.chemicalId;
            }
            if (this.datas === "顏料") {
              // 處理英文名稱 、色光、力份信息
              item.ennamelong = item.chemicalId;
              item.bcColor = item.chemicalId;
              item.bcForce = item.chemicalId;
            }
            // item.bcMatengname = item.chemicalId;
            // item.bcColor = item.chemicalId;
            // item.bcForce = item.chemicalId;
            if (index === this.mx.length - 1) {
              this.mxOp.showSummary = true;
              setTimeout(() => {
                // this.$refs.mx.setCurrentRow(this.mx[0]);
                // this.getAlloc();
                this.loading = false;
              }, 200);
            }
          });
          // }
          setTimeout(() => {
            this.$refs.mx.setCurrentRow(this.mx[0] || {});
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
        !this.chooseData.whseDyesainDtlaoid
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
          rows: 999,
          start: 1,
        })
        .then((res) => {
          let records = res.data;
          this.phPage.total = records.total;
          let data = [];
          data = records.records;
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
    getAlloc() {
      if (this.isAdd) {
        // 获取申购单
        // this.ctLoading = true;
        this.mx.forEach((item, i) => {
          getSubscribe({
            deliNo: this.form.deliNo,
            poNo: this.form.purNo,
            materialNum: item.materialNum,
            rows: this.phPage.pageSize,
            start: this.phPage.currentPage,
          }).then((res) => {
            let data = res.data;
            item.alloc = data.records;
            item.alloc.forEach((item, i) => {
              item.index = i + 1;
              // item.appId = item.allocMain;
              // item.applyNum = item.allocQty;
            });
            if (i === this.mx.length - 1) {
              this.$refs.mx.setCurrentRow(this.mx[0]);
            }
          });
        });
      } else {
        // 获取入仓分配
        this.mx.forEach((item, i) => {
          this.everyThing
            .getAlloc({
              whseChemicalinDtlaFk: item.whseChemicalinDtlaoid,
              whseAccessoriesDtlFk: item.whseAccessoriesDtloid,
              rows: this.phPage.pageSize,
              start: this.phPage.currentPage,
            })
            .then((res) => {
              let data = res.data;

              item.alloc = data.records;
              item.alloc.forEach((item, i) => {
                item.index = i + 1;
                item.appId = item.allocMain;
                item.applyNum = item.allocQty;
              });
              if (i === this.mx.length - 1) {
                this.$refs.mx.setCurrentRow(this.mx[0]);
              }
            });
        });
      }
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
          console.log(res);
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
        this.$tip.error("请先选择入库明细");
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
          this.chooseData.weightUnit ||
          this.chooseData.list.slice(-1).length > 0
            ? this.chooseData.list.slice(-1)[0].weightUnit
            : "",
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
    add(val) {
      this.mx = this.$unique(this.mx.concat(val), "batch");
      // this.mx = this.mx.concat(val);
      this.mx.forEach((item, i) => {
        item.index = 1 + i;
        item.cartonNum = item.cartNum;
        item.cartonWei = item.netWei;
        item.weightUnit = item.weiUnit;
        // item.weight = item.deliQty;
        // item.weightUnit = item.deliUnit;
        // item.poQty = item.deliQty;
        // item.unitQty = item.deliUnit;
        if (i === this.mx.length - 1) {
          this.planV = false;
          // setTimeout(() => {
          //   this.getAlloc();
          // }, 200);
        }
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (
        !this.chooseData.whseYarninDtloid &&
        !this.chooseData.whseCalicoinDtlaoid &&
        !this.chooseData.whseChemicalinDtlaoid &&
        !this.chooseData.whseAccessoriesDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1] || {});
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除" +
            (this.datas === "化工原料" || this.datas === "顏料"
              ? "化工原料"
              : this.datas === "紗線"
              ? "紗線"
              : this.datas === "胚布"
              ? "胚布"
              : "材料") +
            "编号为 【 " +
            (this.datas === "化工原料" || this.datas === "顏料"
              ? this.chooseData.chemicalId
              : this.datas === "紗線"
              ? this.chooseData.yarnsId
              : this.datas === "胚布"
              ? this.chooseData.calicoId
              : this.chooseData.materialNum) +
            " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delDetail(
              this.datas === "化工原料" || this.datas === "顏料"
                ? this.chooseData.whseChemicalinDtlaoid
                : this.datas === "紗線"
                ? this.chooseData.whseYarninDtloid
                : this.datas === "胚布"
                ? this.chooseData.whseCalicoinDtlaoid
                : this.chooseData.whseAccessoriesDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.modified = true;
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
        });
    },
    delPh() {
      if (
        Object.keys(this.choosePhData === undefined || this.choosePhData)
          .length === 0 ||
        this.chooseData.list.length === 0
      ) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.choosePhData.whseChemicalinDtlboid) {
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
          "是否确定删除批号为 【 " + this.choosePhData.batchNo + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delPh(this.choosePhData.whseChemicalinDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.chooseData.list.splice(this.choosePhData.index - 1, 1);
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                this.getPh();
                // this.choosePhData = {};
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
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
      if (this.datas === "化工原料" || this.datas === "顏料") {
        this.getPh();
        // this.getLoc();
      }
      if (!this.chooseData.loc) {
        this.chooseData.loc = [];
      }
      // this.allocPage.total = this.chooseData.alloc.length;
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
        this.$tip.error("入库资料中的采购/送货单号不能为空!");
        return;
      }
      if (this.form.yinId === "" || this.form.yinDate === null) {
        this.$tip.error("入库资料中的入仓编号/日期不能为空!");
        return;
      }
      if (this.datas === "紗線") {
        for (let i = 0; i < this.mx.length; i++) {
          if (
            !this.mx[i].batchNo ||
            !this.mx[i].weight ||
            !this.mx[i].whseNum
          ) {
            this.$tip.error("入库明细的批号/入倉箱數/入倉重量不能为空!");
            return;
          }
          if (this.mx[i].loc) {
            for (let j = 0; j < this.mx[i].loc.length; j++) {
              if (!this.mx[i].loc[j].cartonNum || !this.mx[i].loc[j].weight) {
                this.$tip.error("入库貨位的箱數/重量不能为空!");
                return;
              }
            }
          }
        }
      }

      if (this.datas === "胚布") {
        for (let i = 0; i < this.mx.length; i++) {
          this.mx[i].weightUnit = "";
          if (this.mx[i].loc) {
            for (let j = 0; j < this.mx[i].loc.length; j++) {
              if (!this.mx[i].loc[j].weight || !this.mx[i].loc[j].weightUnit) {
                this.$tip.error("入库貨位的重量/單位不能为空!");
                return;
              }
              if (!this.mx[i].loc[j].batchNo || !this.mx[i].loc[j].countingNo) {
                this.$tip.error("入库貨位的批號/疋號不能为空!");
                return;
              }
            }
          }
        }
      }
      if (this.datas === "化工原料" || this.datas === "顏料") {
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
              this.$tip.error("入库批号明细中的批号/重量/单位不能为空!");
              return;
            }
          }
        }
      }

      this.modified = true;
      this.wloading = true;
      if (this.form.yinDate != "" && this.form.yinDate != undefined) {
        this.form.yinDate += " 00:00:00";
      }
      if (
        this.form.whseYarninoid ||
        this.form.whseCalicoinoid ||
        this.form.whseChemicalinoid ||
        this.form.whseDyesalinoid
      ) {
        this.everyThing.update(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.wloading = false;
              this.$tip.success("保存成功!");
            }, 200);
          }
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              item.countingNo = item.loc ? item.loc.length : 0;
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.loc = [];
              if (
                item.whseYarninDtloid ||
                item.whseCalicoinDtlaoid ||
                item.whseChemicalinDtlaoid ||
                item.whseDyesainDtlaoid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseYarninFk = this.detail.whseYarninoid;
                data.whseCalicoinFk = this.detail.whseCalicoinoid;
                data.whseChemicalinFk = this.detail.whseChemicalinoid;
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseYarninDtloid = res.data.data;
                  item.whseCalicoinDtlaoid = res.data.data;
                  item.whseChemicalinDtlaoid = res.data.data;
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
              if (this.mx[i].list && this.mx[i].list.length > 0) {
                this.mx[i].list.forEach((item) => {
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (this.datas === "化工原料" || this.datas === "顏料") {
                    if (
                      !item.whseChemicalinDtlboid &&
                      !item.whseDyesainDtlboid
                    ) {
                      this.everyThing.addPh(item).then((res) => {
                        item.whseChemicalinDtlboid = res.data.data;
                        item.whseDyesainDtlboid = res.data.data;
                      });
                    } else {
                      this.everyThing.updatePh(item).then((res) => {});
                    }
                  }
                });
              }
              // if (this.mx[i].alloc && this.mx[i].alloc.length > 0) {
              //   this.mx[i].alloc.forEach((item) => {
              //     item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
              //     item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
              //     if (
              //       !item.whseAccessoriesinAllocoid &&
              //       !item.whseChemicalinAllocoid
              //     ) {
              //       item.allocMain = item.appId;
              //       item.allocQty = item.applyNum;
              //       this.everyThing.addAlloc(item).then((res) => {
              //         item.whseAccessoriesinAllocoid = res.data.data;
              //         item.whseChemicalinAllocoid = res.data.data;
              //       });
              //     }
              //   });
              // }
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  // item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (
                    !item.whseYarninDtlaoid &&
                    !item.whseCalicoinDtlboid &&
                    !item.whseChemicalinDtlcoid &&
                    !item.whseDyesainDtlcoid
                  ) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                      item.whseCalicoinDtlboid = res.data.data;
                      item.whseChemicalinDtlcoid = res.data.data;
                      item.whseDyesainDtlcoid = res.data.data;
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
                  this.$tip.success("保存成功!");
                }, 200);
              }
            }
          });
        });
      } else {
        this.everyThing.add(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.wloading = false;
              this.$tip.success("保存成功!");
            }, 200);
          }
          baseCodeSupply({ code: this.everyThing.code }).then((res) => {});
          this.form.whseChemicalinoid = res.data.data;
          this.form.whseDyesalinoid = res.data.data;
          this.form.whseYarninoid = res.data.data;
          this.form.whseCalicoinoid = res.data.data;
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              item.countingNo = item.loc ? item.loc.length : 0;
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              data.loc = [];
              if (
                item.whseYarninDtloid ||
                item.whseCalicoinDtlaoid ||
                item.whseChemicalinDtlaoid ||
                item.whseDyesainDtlaoid
              ) {
                this.everyThing.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseYarninFk = this.form.whseYarninoid;
                data.whseCalicoinFk = this.form.whseCalicoinoid;
                data.whseChemicalinFk = this.form.whseChemicalinoid;
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                this.everyThing.addDetail(data).then((res) => {
                  item.whseYarninDtloid = res.data.data;
                  item.whseCalicoinDtlaoid = res.data.data;
                  item.whseChemicalinDtlaoid = res.data.data;
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
              if (this.mx[i].list && this.mx[i].list.length > 0) {
                this.mx[i].list.forEach((item) => {
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  if (this.datas === "化工原料" || this.datas === "顏料") {
                    if (
                      !item.whseChemicalinDtlboid &&
                      !item.whseDyesainDtlboid
                    ) {
                      this.everyThing.addPh(item).then((res) => {
                        item.whseChemicalinDtlboid = res.data.data;
                        item.whseDyesainDtlboid = res.data.data;
                      });
                    } else {
                      this.everyThing.updatePh(item).then((res) => {});
                    }
                  }
                });
              }
              // if (this.mx[i].alloc && this.mx[i].alloc.length > 0) {
              //   this.mx[i].alloc.forEach((item) => {
              //     item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
              //     item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
              //     if (
              //       !item.whseAccessoriesinAllocoid &&
              //       !item.whseChemicalinAllocoid
              //     ) {
              //       item.allocMain = item.appId;
              //       item.allocQty = item.applyNum;
              //       this.everyThing.addAlloc(item).then((res) => {
              //         item.whseAccessoriesinAllocoid = res.data.data;
              //         item.whseChemicalinAllocoid = res.data.data;
              //       });
              //     }
              //   });
              // }
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  // item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;

                  if (
                    !item.whseYarninDtlaoid &&
                    !item.whseCalicoinDtlboid &&
                    !item.whseChemicalinDtlcoid &&
                    !item.whseDyesainDtlcoid
                  ) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                      item.whseCalicoinDtlboid = res.data.data;
                      item.whseChemicalinDtlcoid = res.data.data;
                      item.whseDyesainDtlcoid = res.data.data;
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
                  this.$tip.success("保存成功!");
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
    close() {
      this.$emit("close");
      if (this.modified) {
        this.$emit("getData");
      }
    },
  },
  created() {},
  mounted() {
    // getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
    // this.form.sysCreatedby = this.$store.state.userOid;
    // });
    // this.getDetail();
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