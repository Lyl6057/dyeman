<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-16 20:36:57
 * @Description:
-->
<template>
  <div id="revolve">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '染整生产运转单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
      class="not-number-icon"
    >
      <div class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="Bảo tồn"
          placement="top-start"
        >
          <el-button type="success" @click="save" :loading="wLoading">{{
            $t("public.save")
          }}</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content=" in"
          placement="top-start"
        >
          <el-button type="primary" @click="print" :disabled="!form.runJobId"
            >打印</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="đóng"
          placement="top-start"
        >
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </el-tooltip>
      </div>

      <el-row class="formBox" style="width: 100%">
        <el-col :span="6">
          <view-container title="胚布细码 Chi tiết vải mộc">
            <!-- <div
              class="btnList"
              style="font-size: 24px; color: #409eff; cursor: pointer"
            >
              <i class="el-icon-circle-plus-outline" @click="add"></i>
              <i class="el-icon-remove-outline" @click="del('bf')"></i>
            </div> -->
            <avue-crud
              ref="bf"
              id="bf"
              :option="bfOp"
              :data="form.bf"
              v-loading="bfLoading"
              @current-row-change="cellBfClick"
            ></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="18">
          <view-container title="运转单信息">
            <div style="height: calc(100vh - 145px); overflow: auto">
              <avue-form
                ref="form"
                :option="formOp"
                v-model="form"
                style="margin-top: 5px"
              ></avue-form>
              <el-row>
                <el-col :span="14">
                  <view-container title="测试标准 Yêu cầu kiểm tra">
                    <div
                      class="btnList"
                      style="font-size: 24px; color: #409eff; cursor: pointer"
                    >
                      <i
                        class="el-icon-circle-plus-outline"
                        @click="addOther(true)"
                      ></i>
                      <i
                        class="el-icon-remove-outline"
                        @click="del('test')"
                      ></i>
                      <!-- <el-button type="primary" @click="addOther(true)">{{
                        $t("public.add")
                      }}</el-button>
                      <el-button type="danger" @click="del('test')">{{
                        $t("public.del")
                      }}</el-button> -->
                    </div>
                    <avue-crud
                      ref="test"
                      id="test"
                      :option="testOp"
                      :data="form.test"
                      v-loading="bfLoading"
                      @current-row-change="cellTestClick"
                    ></avue-crud
                  ></view-container>
                </el-col>
                <el-col :span="10">
                  <view-container title="生产项目 Mục sản xuất">
                    <div
                      class="btnList"
                      style="font-size: 24px; color: #409eff; cursor: pointer"
                    >
                      <i
                        class="el-icon-circle-plus-outline"
                        @click="addOther(false)"
                      ></i>
                      <i
                        class="el-icon-remove-outline"
                        @click="del('item')"
                      ></i>
                      <!-- <el-button type="primary" @click="addOther(false)">{{
                        $t("public.add")
                      }}</el-button>
                      <el-button type="danger" @click="del('item')">{{
                        $t("public.del")
                      }}</el-button> -->
                    </div>
                    <avue-crud
                      ref="item"
                      id="item"
                      :option="itemOp"
                      :data="form.item"
                      v-loading="bfLoading"
                      @current-row-change="cellItemClick"
                    ></avue-crud
                  ></view-container>
                </el-col>
              </el-row>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="pdfDlg"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <view-container title="打印預覽">
        <embed
          id="pdf"
          style="width: 100vw; height: calc(100vh - 80px)"
          :src="pdfUrl"
        />
      </view-container>
    </el-dialog>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="100%"
      @choiceData="choiceData"
      @close="closeChoice"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { getXDicT } from "@/config";
import { mainCrud, dlgForm, dlgCrud, bfOp, testOp, itemOp } from "./data";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import {
  get,
  add,
  update,
  getPo,
  getPoDtla,
  getPoDtlb,
  getTest,
  addTest,
  deltest,
  updateTest,
  getItem,
  addItem,
  updateItem,
  delitem,
  getBf,
  delbf,
  updateBf,
  addBf,
  updateNote,
  updateInwhse,
  getGroup,
  getYarn,
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
      form: {
        forClothLockJoin: false,
        forClothTurnOver: false,
        forClothTogetherVat: false,
        forClothOrderHair: false,
        forClothAgainstHair: false,
        packGw: false,
        packNw: false,
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: "选择漂染工藝",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      bfOp: bfOp(this),
      bfLoading: false,
      testOp: testOp(this),
      itemOp: itemOp(this),
      choosetestData: {},
      chooseitemData: {},
      choosebfData: {},
      pdfDlg: false,
      pdfUrl: "",
    };
  },
  watch: {
    // "form.bf": {
    //   handler(n, o) {
    //   },
    // },
  },
  methods: {
    query() {
      get({
        rows: 10,
        start: 1,
        runJobId: this.detail.runJobId,
      }).then((res) => {
        this.form = res.data.records[0];
        Object.keys(this.form).forEach((item) => {
          if (this.isEmpty(this.form[item])) {
            delete this.form[item];
          }
        });
        if (!(this.form.mergVatNo instanceof Array) && this.form.mergVatNo) {
          this.form.mergVatNo = this.form.mergVatNo.split("/");
        }
        if (
          !(this.form.compLightSource instanceof Array) &&
          this.form.compLightSource
        ) {
          this.form.compLightSource = this.form.compLightSource.split(",");
        }
        this.getSublist();
      });
    },
    bfChange(n) {
      if (n) {
        this.form.pidCount = n.length;
        this.form.clothWeight = 0;
        n.forEach((item) => {
          this.form.clothWeight += Number(item.clothWeight);
        });
        this.form.clothWeight = Number(this.form.clothWeight.toFixed(2));
      }
    },
    closeChoice() {
      this.choiceV = false;
      // this.bfOp.column[2].hide = true;
      this.bfOp.column[6].hide = true;
    },
    getSublist() {
      this.wLoading = true;
      // this.bfOp.column[6].hide = false;
      getBf({ proBleadyeRunJobFk: this.form.runJobId }).then((bf) => {
        // let whseData = getXDicT("whseCalicoinDtlb/v1.0/list");
        // this.bfOp.column[3].dicData = whseData;
        // this.bfOp.column[6].dicData = whseData;
        this.form.bf = bf.data;
        this.form.bf.sort((a, b) => {
          return a.sn - b.sn;
        });
        this.form.bf.forEach((item, i) => {
          // item.weight = item.clothNoteCode;
          // item.whseCalicoinDtlboid = item.clothNoteCode;
          item.sn = i + 1;
          // item.$cellEdit = true;
          // item.bfWeight = item.clothNoteCode;
        });

        if (this.form["bf"].length) {
          this.$refs["bf"].setCurrentRow(this.form["bf"][0]);
        }

        getItem({ proBleadyeRunJobFk: this.form.runJobId }).then((item) => {
          this.form.item = item.data;
          this.form.item.sort((a, b) => {
            return a.sn - b.sn;
          });
          this.form.item.forEach((item, i) => {
            item.sn = i + 1;
            item.$cellEdit = true;
          });
          if (this.form["item"].length) {
            this.$refs["item"].setCurrentRow(this.form["item"][0]);
          }
          getTest({ proBleadyeRunJobFk: this.form.runJobId }).then((test) => {
            this.form.test = test.data;
            this.form.test.sort((a, b) => {
              return a.sn - b.sn;
            });
            this.form.test.forEach((item, i) => {
              item.sn = i + 1;
              item.$cellEdit = true;
            });
            if (this.form["test"].length) {
              this.$refs["test"].setCurrentRow(this.form["test"][0]);
            }
            setTimeout(() => {
              // this.bfOp.column[6].hide = true;
              this.wLoading = false;
            }, 500);
          });
        });
      });
    },
    getData() {
      this.wLoading = true;
      this.form = {};
      this.form.bf = [];
      this.form.test = [];
      this.form.item = [];
      if (this.isAdd) {
        let whseData = getXDicT("whseCalicoinDtlb/v1.0/list");
        this.bfOp.column[2].dicData = whseData;
        this.bfOp.column[6].dicData = whseData;
        this.form.bf = bf.data;
        setTimeout(() => {
          baseCodeSupplyEx({ code: "dye_batch" }).then((res) => {
            this.form.workDate = this.$getNowTime();
            this.form.deliveDate = this.$getNowTime();
            this.form.vatNo = "DF-" + res.data.data;
            this.form.weaveFactoryName = "S.POWER";
            this.form.address = "S.POWER WAREHOUSE";
            this.form.compLightSource = ["I", "G"];
            this.form.serviceOperator = parent.userID;
            this.form.throwDry = "3Washing / 3tumble";
            this.form.poVatCount = 1;
            this.form.vatIndex = 1;
            this.form.poColorCount = 1;
            this.wLoading = false;
          });
        }, 200);
      } else {
        this.query();
      }
    },
    getOther(val) {
      // { poNo: val.salPoNo }
      this.wLoading = true;

      setTimeout(() => {
        this.wLoading = false;
      }, 500);
      // getPo().then((po) => {
      //   if (po.data.rows.length > 0) {
      //     getPoDtla({ salPoFk: po.data.rows[0].salPooid }).then((poDtla) => {
      //       if (poDtla.data.rows.length > 0) {
      //         if (poDtla.data.rows[0].qtyUnit == "KG") {
      //           this.form.poAmountKg = poDtla.data.rows[0].fabQty;
      //           // this.form.poAmountLb = (
      //           //   Number(this.form.poAmountKg) * 2.2046226
      //           // ).toFixed(2);
      //         } else {
      //           this.form.poAmountLb = poDtla.data.rows[0].fabQty;
      //           // this.form.poAmountKg = (
      //           //   Number(this.form.poAmountLb) * 0.4535924
      //           // ).toFixed(2);
      //         }
      //         getPoDtlb({ salPoDtlaFk: poDtla.data.rows[0].salPoDtlaoid }).then(
      //           (color) => {
      //             this.form.poColorCount = color.data.length;
      //           }
      //         );
      //       }
      //     });
      // }
      // });
    },
    add() {
      if (!this.form.weaveJobCode || !this.form.poAmountKg) {
        this.$tip.warning("請先選擇織造通知單/填寫订单数量!");
        return;
      }
      // this.bfOp.column[2].hide = false;
      this.bfOp.column[6].hide = false;
      this.choiceTle = "选择胚布信息";
      // this.choiceQ.weaveJob = this.form.weaveJobCode;
      this.choiceQ.weaveJobCode = this.form.weaveJobCode;
      this.choiceQ.clothState = "2";
      // this.choiceQ.weight = this.form.poAmountKg;
      this.choiceV = true;
    },
    addOther(type) {
      if (type) {
        this.choiceTle = "選擇漂染基礎工藝";
        this.choiceQ.paramType = "test";
        this.choiceV = true;
      } else {
        this.choiceTle = "選擇生产项目";
        this.choiceV = true;
      }
    },
    del(type) {
      if (
        !this["choose" + type + "Data"][
          type === "bf" ? "recId" : type === "test" ? "jobTestId" : "itemId"
        ]
      ) {
        this.form[type].splice(this["choose" + type + "Data"].sn - 1, 1);
        this["choose" + type + "Data"] = {};
        this.form[type].forEach((item, i) => {
          item.sn = i + 1;
        });
        if (this.form[type].length > 0) {
          this.$refs[type].setCurrentRow(this.form[type][0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          let delfunc =
            type === "bf"
              ? (delfunc = delbf)
              : type === "test"
              ? (delfunc = deltest)
              : (delfunc = delitem);
          delfunc(
            type === "bf"
              ? this["choose" + type + "Data"].recId
              : type === "test"
              ? this["choose" + type + "Data"].jobTestId
              : this["choose" + type + "Data"].itemId
          )
            .then((res) => {
              if (type == "bf") {
                // 如果删除的是布飞信息，则需要在胚布记录表里恢复状态为2
                updateNote({
                  noteId: this["choose" + type + "Data"].clothNoteId,
                  clothState: 2,
                }).then((res) => {});
              }
              if (res.data.code === 200) {
                this.getSublist();
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
          console.log(err);
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    save() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            Object.keys(this.form).forEach((item) => {
              if (this.isEmpty(this.form[item])) {
                delete this.form[item];
              }
            });
            let data = JSON.parse(JSON.stringify(this.form));
            data.workDate = timeConversion(this.form.workDate);
            data.deliveDate = timeConversion(this.form.deliveDate);
            let vat = "";
            data.mergVatNo.forEach((item, i) => {
              if (i == data.mergVatNo.length - 1) {
                vat += item;
              } else {
                vat += item + "/";
              }
            });
            data.mergVatNo = vat;
            let light = "";
            data.compLightSource.forEach((item, i) => {
              if (i == data.compLightSource.length - 1) {
                light += item;
              } else {
                light += item + ",";
              }
            });
            data.compLightSource = light;
            data.bf = null;
            data.test = null;
            data.item = null;
            data.poAmountLb = Number((data.poAmountKg * 2.204623).toFixed(2));
            data.pidCount = this.form.bf.length || 0;
            if (data.runJobId) {
              // update
              data.upateTime = this.$getNowTime("datetime");
              update(data).then((res) => {
                if (res.data.code == 200) {
                  setTimeout(() => {
                    this.wLoading = false;
                    this.saveTest();
                    this.$emit("refresh");
                    // this.$tip.success(this.$t("public.bccg"));
                    done();
                  }, 200);
                } else {
                  this.wLoading = false;
                  done();
                  this.$tip.error(this.$t("public.bcsb"));
                }
              });
            } else {
              // add
              data.createTime = this.$getNowTime("datetime");
              add(data).then((res) => {
                if (res.data.code == 200) {
                  baseCodeSupply({ code: "dye_batch" }).then((r) => {});
                  // this.$tip.success(this.$t("public.bccg"));
                  // this.wLoading = false;
                  this.$emit("refresh");
                  this.form.runJobId = res.data.data;
                  this.detail.runJobId = res.data.data;
                  this.saveTest();
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                  this.wLoading = false;
                }
                done();
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充运转单信息!");
        }
      });
    },
    saveTest() {
      if (this.form.test.length) {
        this.form.test.forEach((item, i) => {
          if (item.jobTestId) {
            updateTest(item).then((res) => {});
          } else {
            item.proBleadyeRunJobFk = this.form.runJobId;
            addTest(item).then((res) => {
              item.jobTestId = res.data.data;
            });
          }
          if (i == this.form.test.length - 1) {
            this.saveItem();
          }
        });
      } else {
        this.saveItem();
      }
    },
    saveItem() {
      if (this.form.item.length) {
        this.form.item.forEach((item, i) => {
          if (item.itemId) {
            updateItem(item).then((res) => {});
          } else {
            item.proBleadyeRunJobFk = this.form.runJobId;
            addItem(item).then((res) => {
              item.itemId = res.data.data;
            });
          }
          if (i == this.form.item.length - 1) {
            this.saveBf();
          }
        });
      } else {
        this.saveBf();
      }
    },
    saveBf() {
      if (this.form.bf.length) {
        this.form.bf.forEach((item, i) => {
          if (!item.recId && item.clothWeight) {
            // 未保存过，以及运转重量 > 0
            item.proBleadyeRunJobFk = this.form.runJobId;
            // 新增布飞运转记录
            addBf(item).then((res) => {
              item.recId = res.data.data;
            });
            // 判断布票是否可以修改为出库状态： clothWeight(运转重量) >= weight (剩余重量，即库存)
            // if (item.clothWeight >= item.$weight) {
            //   updateNote({ noteId: item.clothNoteId, clothState: 3 }).then(
            //     (res) => {}
            //   );
            // }
            // 修改库存,
            updateInwhse({
              custTicket: item.clothNoteCode,
              weight: item.$weight - item.clothWeight,
              whseCalicoinDtlboid: item.$whseCalicoinDtlboid,
            });
          }
          console.log(item);
          if (item.recId) {
            // 修改布飞运转记录
            updateBf(item).then((res) => {});
            // 判断布票是否可以修改为出库状态： clothWeight(运转重量) >= weight (剩余重量，即库存)
            // if (item.clothWeight >= item.$weight) {
            //   updateNote({ noteId: item.clothNoteId, clothState: 3 }).then(
            //     (res) => {}
            //   );
            // }
            // 修改库存,
            updateInwhse({
              custTicket: item.clothNoteCode,
              weight: item.$weight,
              whseCalicoinDtlboid: item.$whseCalicoinDtlboid,
            });
          }
          if (i == this.form.bf.length - 1) {
            this.getSublist();
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
        });
      } else {
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
    },
    cellBfClick(val) {
      this.choosebfData = val;
    },
    cellItemClick(val) {
      this.chooseitemData = val;
    },
    cellTestClick(val) {
      this.choosetestData = val;
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择织造通知单") {
        val.fabName = val.fabricDesc;
        val.gramWeightAfter = isNaN(val.gramWeight) ? 0 : val.gramWeight;
        val.shrinkLenth = isNaN(val.verticalShrink) ? 0 : val.verticalShrink;
        val.shrinkWidth = isNaN(val.horizonShrink) ? 0 : val.horizonShrink;
        val.clothWeight = isNaN(val.amount) ? 0 : val.amount;
        val.fabElements = val.fiberComp;
        val.poAmountKg = val.clothWeight;
        val.fabElements = val.fiberComp;
        val.poAmountKg = val.clothWeight;
        val.tubeDiam = val.needleInch;
        val.needleDist = val.guage;
        val.salPoNo = val.custPoNo;
        this.form = val;
        // this.form.breadthUnit = this.form.breadth.replace(/[^a-z]+/gi, "");
        // this.form.breadth = Number(this.form.breadth.replace(/[^0-9]/gi, ""));
        this.form.bf = [];
        getGroup({
          proWeaveJobFk: val.weaveJobId,
        }).then((res) => {
          if (res.data.length > 0) {
            getYarn({ proWeaveJobGroupFk: res.data[0].groupId }).then(
              (yarn) => {
                this.form.yarnCard = "";
                this.form.yarnNumber = "";
                this.form.yarnCylinder = "";
                if (yarn.data.length > 1) {
                  yarn.data.forEach((item, i) => {
                    if (item.yarnBrand) {
                      this.form.yarnCard += i + 1 + "." + item.yarnBrand + " ";
                    }
                    if (item.yarnBatch) {
                      this.form.yarnNumber +=
                        i + 1 + "." + item.yarnBatch + " ";
                    }
                    if (item.factoryYarnBatch) {
                      this.form.yarnCylinder +=
                        i + 1 + "." + item.factoryYarnBatch + " ";
                    }
                  });
                } else if (yarn.data.length == 1) {
                  this.form.yarnCard = yarn.data[0].yarnBrand;
                  this.form.yarnNumber = yarn.data[0].yarnBatch;
                  this.form.yarnCylinder = yarn.data[0].factoryYarnBatch;
                }
              }
            );
          }
        });
        this.getOther(val);
      }
      if (this.choiceTle == "选择胚布信息") {
        val.forEach((item, i) => {
          this.form.bf.push({
            sn: this.form.bf.length + 1,
            clothNoteCode: item.noteCode,
            clothNoteId: item.noteId,
            clothWeight: item.clothWeight,
            weight: item.noteCode,
            whseCalicoinDtlboid: item.noteCode,
            bfWeight: item.noteCode,
            $cellEdit: true,
          });
        });
        this.form.bf = this.$unique(this.form.bf, "clothNoteId");
        this.$nextTick(() => {
          // this.bfOp.column[2].hide = true;
          this.bfOp.column[6].hide = true;
          this.form.bf.forEach((item) => {
            if (!item.recId) {
              item.clothWeight = item.$weight;
            }
          });
          this.bfChange(this.form.bf);
          if (this.form.clothWeight > this.form.poAmountKg) {
            let redundant = this.form.clothWeight - this.form.poAmountKg; // 需要裁减的重量
            for (let i = 0; i < this.form.bf.length; i++) {
              // if (!this.form.bf[i].recId) {
              if (this.form.bf[i].$bfWeight > redundant) {
                this.form.bf[i].clothWeight -= redundant;
                this.form.bf[i].weight =
                  this.form.bf[i].$bfWeight - this.form.bf[i].clothWeight;
                break;
              } else {
                redundant -= this.form.bf[i].$bfWeight;
                this.form.bf[i].clothWeight = 0;
              }
              // }
            }
          }
          this.bfChange(this.form.bf);
        });
      }
      if (this.choiceTle == "選擇漂染基礎工藝") {
        val.forEach((item, i) => {
          let data = {};
          data = {
            testItemCode: item.paramKey,
            testName: item.paramName,
            dataStyle: item.paramValueType,
            sn: this.form.test.length + 1,
            $cellEdit: true,
          };

          this.form.test.push(data);
        });
      }
      if (this.choiceTle == "選擇生产项目") {
        val.forEach((item, i) => {
          let data = {};
          data = {
            jobItemName: item.stepName,
            $cellEdit: true,
            sn: this.form.item.length + 1,
          };

          this.form.item.push(data);
        });
      }
      this.choiceV = false;
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
        this.form.runJobId;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  updated() {
    this.$nextTick(() => {
      this.$refs["bf"].doLayout();
    });
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}

// .el-table__fixed-body-wrapper {
// top: 60px !important;
// }
#revolve {
  .avue-group__header {
    margin-bottom: 10px;
    height: 30px;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-form__row {
    padding: 0 !important;
  }

  .formBox {
    // height: 100vh !important;
    // overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>
