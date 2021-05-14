<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-14 11:29:51
 * @Description: 
-->
<template>
  <div id="dyeing">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '染整工单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
      class="not-number-icon"
    >
      <div class="btnList">
        <el-button type="success" @click="save" :loading="wLoading">{{
          $t("public.save")
        }}</el-button>
        <!-- <el-button type="primary" @click="checkOrder">选择订单号</el-button> -->
        <el-button
          type="primary"
          @click="checkProject"
          :disabled="!this.form.bleadyeJobId"
          >生产项目</el-button
        >
        <el-button
          type="primary"
          @click="checkTest"
          :disabled="!this.form.bleadyeJobId"
          >測試要求</el-button
        >
        <el-button
          type="primary"
          @click="checkCar"
          :disabled="!this.form.bleadyeJobId"
          >长车加工项目</el-button
        >
        <el-button
          type="primary"
          @click="checkstrain"
          :disabled="!this.form.bleadyeJobId"
          >染缸參數</el-button
        >
        <el-button
          type="primary"
          @click="checkTechItem"
          :disabled="!this.form.bleadyeJobId"
          >生產工藝</el-button
        >
        <!-- <el-button type="primary" @click="setPreview">预览</el-button> -->
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
    </view-container>
    <el-dialog
      :visible.sync="visible"
      fullscreen
      append-to-body
      id="viewDlg"
      :element-loading-text="$t('public.loading')"
      v-loading="dlgLoading"
      v-if="visible"
    >
      <el-row>
        <el-col :span="this.tabs == '生產工藝' ? 12 : 24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button @click="saveOther" type="success">{{
                $t("public.save")
              }}</el-button>
              <el-button @click="add" type="primary">{{
                $t("public.add")
              }}</el-button>
              <el-button
                @click="del"
                type="danger"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
              <el-button @click="visible = false" type="warning">{{
                $t("public.close")
              }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="crud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              ></avue-crud>
            </div> </view-container
        ></el-col>
        <el-col :span="12" v-if="tabs == '生產工藝'">
          <view-container title="工藝明細">
            <div class="btnList">
              <el-button
                @click="addDtl"
                type="primary"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.add") }}</el-button
              >
              <el-button
                @click="delDtl"
                type="danger"
                :disabled="Object.keys(chooseDtlData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
            </div>
            <div class="formBox"></div>
            <div class="crudBox">
              <avue-crud
                ref="yarnCrud"
                :option="codeItemCrud"
                :data="chooseData.list"
                @on-load="query"
                @current-row-change="cellDtlClick"
              ></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </el-dialog>
    <choice
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
import choice from "@/components/proMng/index";
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  yarnCrud,
  testCrud,
  dyeCrud,
  groupCrudOp,
  techargueCrud,
  codeItemCrud,
  carCrud,
} from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getBom,
  getYarn,
  getProject,
  addProject,
  delProject,
  updateProject,
  getTest,
  addTest,
  delTest,
  updateTest,
  getDye,
  addDye,
  delDye,
  updateDye,
  getTechargue,
  addTechargue,
  delTechargue,
  updateTechargue,
  getCodeItem,
  addCodeItem,
  updateCodeItem,
  delCodeItem,
  getTechItem,
  addTechItem,
  updateTechItem,
  delTechItem,
  getWash,
  addWash,
  updateWash,
  delWash,
  getPoDtlb,
} from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupplyEx } from "@/api/index";
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
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
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
      code: "",
      codeItemCrud: codeItemCrud(this),
      group: [],
      chooseDtlData: {},
      dtlV: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      this.form = {};
      if (this.isAdd) {
        // baseCodeSupplyEx({ code: "proWeaveJob" }).then((res) => {
        //   this.form.weaveJobCode = res.data.data;
        //   this.code = res.data.data;
        // });
        setTimeout(() => {
          this.form.workDate = this.$getNowTime();
          this.wLoading = false;
        }, 200);
      } else {
        this.form = this.detail;

        // if (this.form.realEnd === "" || this.form.realEnd === null) {
        //   this.form.nowDate = this.form.planEnd.split(" ")[0];
        // } else {
        //   this.form.nowDate = this.form.realEnd.split(" ")[0];
        // }
        // this.form.nowDate = this.getNowTime();
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      }
    },
    getOther(val) {
      // { poNo: val.salPoNo }
      this.wLoading = true;
      getPo().then((po) => {
        if (po.data.rows.length > 0) {
          getPoDtla({ salPoFk: po.data.rows[0].salPooid }).then((poDtla) => {
            if (poDtla.data.rows.length > 0) {
              if (poDtla.data.rows[0].qtyUnit == "KG") {
                this.form.poAmountKg = poDtla.data.rows[0].fabQty;
                this.form.poAmountLb = (
                  Number(this.form.poAmountKg) * 2.2046226
                ).toFixed(2);
              } else {
                this.form.poAmountLb = poDtla.data.rows[0].fabQty;
                this.form.poAmountKg = (
                  Number(this.form.poAmountLb) * 0.4535924
                ).toFixed(2);
              }
              getPoDtlb({ salPoDtlaFk: poDtla.data.rows[0].salPoDtlaoid }).then(
                (color) => {
                  this.form.poColorCount = color.data.length;
                }
              );
            }
          });
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
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
            this.form.workDate += " 00:00:00";
            // this.form.amount = Number(this.form.amount).toFixed(2);
            // return;
            if (this.form.bleadyeJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.bleadyeJobId = res.data.data;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
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
          this.$tip.error("请补充通知單信息!");
          return;
        }
      });
    },
    query() {
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.bleadyeJobId) {
        this.crud = [];
        return;
      } else if (this.tabs == "更改紗長") {
        this.func.get = getLong;
        this.func.del = delLong;
        this.func.add = addLong;
        this.func.update = updateLong;
      } else if (this.tabs == "生產項目") {
        this.func.get = getProject;
        this.func.del = delProject;
        this.func.add = addProject;
        this.func.update = updateProject;
      } else if (this.tabs == "測試要求") {
        this.func.get = getTest;
        this.func.del = delTest;
        this.func.add = addTest;
        this.func.update = updateTest;
      } else if (this.tabs == "染缸參數") {
        this.func.get = getDye;
        this.func.del = delDye;
        this.func.add = addDye;
        this.func.update = updateDye;
      } else if (this.tabs == "生產工藝") {
        this.func.get = getTechargue;
        this.func.del = delTechargue;
        this.func.add = addTechargue;
        this.func.update = updateTechargue;
      } else {
        this.func.get = getWash;
        this.func.del = delWash;
        this.func.add = addWash;
        this.func.update = updateWash;
      }
      this.dlgForm.proBleadyeJobFk = this.form.bleadyeJobId;
      this.loading = true;
      this.chooseData = {};

      for (let key in this.dlgForm) {
        if (this.dlgForm[key] === "") {
          delete this.dlgForm[key];
        }
      }
      this.func
        .get(
          Object.assign(this.dlgForm, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          // if (this.tabs == "選擇訂單") {
          //   this.crud = res.data.rows;
          // } else {
          this.crud = res.data.records;
          if (this.tabs == "測試要求") {
            this.crud.sort((a, b) => {
              return a.testItemCode < b.testItemCode ? -1 : 1;
            });
          }
          if (this.tabs == "染缸參數") {
            this.crud.sort((a, b) => {
              return a.vatParamCode < b.vatParamCode ? -1 : 1;
            });
          }
          if (this.tabs == "长车加工项目" || this.tabs === "生產工藝") {
            this.crud.sort((a, b) => {
              return a.sn < b.sn ? -1 : 1;
            });
          }
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          // }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.index = i + 1;
            if (this.tabs === "生產工藝") {
              // item.bleadyeCode = item.proBleadyeTechCodeFk;
              item.bleadyeName = item.proBleadyeTechCodeFk;
            }
          });
          this.page.total = res.data.total;

          this.loading = false;
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (
          this.tabs == "生產工藝" &&
          (!this.crud[i].proBleadyeTechCodeFk || !this.crud[i].bleadyeName)
        ) {
          this.$tip.error("工藝代碼/名稱不能為空!");
          return;
        }
        if (this.tabs == "生產項目") {
          if (!this.crud[i].jobItemName) {
            this.$tip.error("生產項目名稱不能為空!");
            return;
          }
        }
        if (this.tabs == "长车加工项目") {
          if (!this.crud[i].itemName) {
            this.$tip.error("长车加工项目不能為空!");
            return;
          }
        }

        if (this.tabs == "測試要求" && !this.crud[i].testItemCode) {
          this.$tip.error("測試項目編號不能為空!");
          return;
        }
        if (
          this.tabs == "染缸參數" &&
          !this.crud[i].vatParamCode &&
          !this.crud[i].vatParamName
        ) {
          this.$tip.error("染缸参数编号/项目名称不能為空!");
          return;
        }
      }
      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (
            item.jobTestId ||
            item.itemId ||
            item.vatParamId ||
            item.jobTechId ||
            item.itemId
          ) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proBleadyeJobFk = this.form.bleadyeJobId;
            this.func.add(data).then((res) => {
              item.jobTestId = res.data.data;
              item.itemId = res.data.data;
              item.itemId = res.data.data;
              item.vatParamId = res.data.data;
              item.jobTechId = res.data.data;
              resolve();
            });
          }
        });
      };
      let promiseArr = this.crud.map((item, i) => {
        return addDtla(item, i);
      });
      Promise.all(promiseArr).then((res) => {
        for (let i = 0; i < this.crud.length; i++) {
          if (this.crud[i].list && this.crud[i].list.length > 0) {
            this.crud[i].list.forEach((item) => {
              item.proBleadyeJobTechargueFk = this.crud[i].jobTechId;
              if (!item.techItemId) {
                addTechItem(item).then((res) => {
                  item.techItemId = res.data.data;
                });
              } else {
                updateTechItem(item).then((res) => {});
              }
            });
          }
          if (i === this.crud.length - 1) {
            // this.getDetail();
            setTimeout(() => {
              this.dlgLoading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        }
      });
      // this.crud.forEach((item, index) => {
      //   if (
      //     item.changedId ||
      //     item.useYarnId ||
      //     item.washedId ||
      //     item.strainId
      //   ) {
      //     // update
      //     this.func.update(item).then((res) => {});
      //   } else {
      //     //add
      //     item.proBleadyeJobFk = this.form.bleadyeJobId;
      //     this.func.add(item).then((res) => {
      //       item.changedId = res.data.data;
      //       item.useYarnId = res.data.data;
      //       item.washedId = res.data.data;
      //       item.strainId = res.data.data;
      //     });
      //   }
      //   if (index == this.crud.length - 1) {
      //     this.$tip.success(this.$t("public.bccg"));
      //     this.dlgLoading = false;
      //   }
      // });
    },
    saveDtl() {},
    checkOrder() {
      this.tabs = "選擇訂單";
      this.crudOp = dlgCrud(this);
      this.visible = true;
    },
    checkProject() {
      this.tabs = "生產項目";
      this.crudOp = groupCrudOp(this);
      this.visible = true;
    },
    checkTest() {
      this.tabs = "測試要求";
      this.crudOp = testCrud(this);
      this.visible = true;
    },
    checkCar() {
      this.tabs = "长车加工项目";
      this.crudOp = carCrud(this);
      this.visible = true;
    },
    checkstrain() {
      this.tabs = "染缸參數";
      this.crudOp = dyeCrud(this);
      this.visible = true;
    },
    checkTechItem() {
      this.tabs = "生產工藝";
      this.crudOp = techargueCrud(this);
      this.visible = true;
    },
    add() {
      if (this.tabs === "生產工藝") {
        this.choiceTle = "选择漂染工藝";
        this.choiceV = true;
        return;
      } else if (this.tabs === "生產項目") {
        this.choiceTle = "選擇生产项目";
        this.choiceV = true;
        return;
      }
      // if (this.tabs != "生產項目") {
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
        signDate: this.$getNowTime("datetime"),
        changeBatchTime: this.$getNowTime("datetime"),
        sn:
          this.crud.length > 0
            ? Number(this.crud[this.crud.length - 1].sn) + 1
            : 1,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      // } else {
      //   this.choiceV = true;
      // }
    },
    addDtl() {
      this.choiceTle = "選擇工藝材料";
      if (this.chooseData.jobTechId) {
        this.choiceQ.proBleadyeTechCodeFk = this.chooseData.$proBleadyeTechCodeFk;
      } else {
        this.choiceQ = {};
      }

      this.choiceV = true;
    },
    del() {
      if (
        !this.chooseData.jobTestId &&
        !this.chooseData.itemId &&
        !this.chooseData.vatParamId &&
        !this.chooseData.jobTechId
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.func
            .del(
              this.tabs === "生產項目" || this.tabs === "长车加工项目"
                ? this.chooseData.itemId
                : this.tabs === "測試要求"
                ? this.chooseData.jobTestId
                : this.tabs === "生產工藝"
                ? this.chooseData.jobTechId
                : this.chooseData.vatParamId
            )
            .then((res) => {
              if (res.data.code === 200) {
                if (this.chooseData.list.length > 0) {
                  this.chooseData.list.forEach((item, i) => {
                    delTechItem(item.techItemId).then((res) => {});
                    if (i == this.chooseData.list.length - 1) {
                      this.query();
                      this.$tip.success(this.$t("public.sccg"));
                    }
                  });
                } else {
                  this.query();
                  this.$tip.success(this.$t("public.sccg"));
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
    delDtl() {
      if (!this.chooseDtlData.techItemId) {
        this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
        // this.chooseDtlData = {};
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseData.list.length > 0) {
          this.$refs.yarnCrud.setCurrentRow(this.chooseData.list[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          delTechItem(this.chooseDtlData.techItemId)
            .then((res) => {
              if (res.data.code === 200) {
                // this.query();
                this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
                // this.chooseDtlData = {};
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseData.list.length > 0) {
                  this.$refs.yarnCrud.setCurrentRow(this.chooseData.list[0]);
                }
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
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      if (
        this.tabs == "生產工藝" &&
        this.chooseData.list.length == 0 &&
        this.chooseData.jobTechId
      ) {
        this.getTechItem();
      }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getTechItem() {
      this.dlgLoading = true;
      getTechItem({
        proBleadyeJobTechargueFk: this.chooseData.jobTechId,
        star: 1,
        rows: 999,
      }).then((res) => {
        let data = res.data.records;
        data.sort((a, b) => {
          return a.sn < b.sn ? -1 : 1;
        });
        data.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
          this.chooseData.list.push(Object.assign(item, { index: i + 1 }));
        });
        this.chooseData.list = res.data.records;

        if (this.chooseData.list.length > 0) {
          this.$refs.yarnCrud.setCurrentRow(this.chooseData.list[0]);
        }
        this.dlgLoading = false;
      });
    },
    check() {
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        this.form.weaveJobCode = this.code;
        this.form.salPoNo = this.chooseData.poNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        getPoDtla({ salPoFk: this.chooseData.salPooid }).then((res) => {
          let poDtla = res.data.rows[0];
          this.form.amount = poDtla.fabQty;
          this.form.colorName = poDtla.colorName;
          this.form.colorCode = poDtla.dyeColorNo;
          this.form.fabricDesc = poDtla.fabYcount;
          this.form.fallCloth = poDtla.fabBreadth;
          // 获取面料
          getBom({ salBomFabricoid: poDtla.salBomFabricFk }).then((bom) => {
            let bomData = bom.data;
            this.form.gramWeight = bomData.fabWeight;
            this.form.breadth = bomData.fabWeight;
            this.form.needleInch = bomData.inchNum;
            this.form.needleNumber = bomData.totalNeedle;
            this.form.yarnLength = bomData.yarnLong;
            this.form.horizonShrink = bomData.shrinkHorizontal;
            this.form.verticalShrink = bomData.shrinkVertical;
            // this.form.cylinderHeight = bomData.shrinkVertical;
          });
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      } else if (this.tabs === "更改紗長") {
        this.form.yarnLenghtChanged = this.chooseData.yarnLength;
        this.visible = false;
      }
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择漂染工藝") {
        this.dlgLoading = true;
        this.crud.push({
          index: this.crud.length + 1,
          $cellEdit: true,
          proBleadyeTechCodeFk: val.bleadyeCodeId,
          bleadyeName: val.bleadyeCodeId,
          liquorRatio: val.liquorRatio,
          signDate: this.$getNowTime("datetime"),
          changeBatchTime: this.$getNowTime("datetime"),
          sn:
            this.crud.length > 0
              ? Number(this.crud[this.crud.length - 1].sn) + 1
              : 1,
        });

        getCodeItem({
          proBleadyeTechCodeFk: val.bleadyeCode,
          rows: this.page.pageSize,
          start: this.page.currentPage,
        }).then((res) => {
          this.crud[this.crud.length - 1].list = [];
          res.data.records.forEach((item, i) => {
            item.index = i + 1;
            item.$cellEdit = true;
            item.mateCode = item.basMateId;
            item.proBleadyeCodeItemFk = item.codeItemIt;
            item.formulaAmount = item.formulaAmount;
            item.formulaUnit = item.formulaUnit;
            item.useAmount =
              Number(this.form.clothWeight) * Number(item.formulaAmount);
            isNaN(item.useAmount) ? (item.useAmount = 0) : "";
            if (
              item.measureType != null &&
              item.measureType.indexOf("g") != -1
            ) {
              item.useAmount = 0;
            }

            this.crud[this.crud.length - 1].list.push(item);
          });
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
          setTimeout(() => {
            this.dlgLoading = false;
          }, 200);
        });
      }
      if (this.choiceTle == "選擇工藝材料") {
        if (!val.length) {
          return;
        }
        val.forEach((item, i) => {
          item.index = this.chooseData.list.length + 1;
          item.$cellEdit = true;
          item.mateCode = item.basMateId;
          item.proBleadyeCodeItemFk = item.codeItemIt;
          item.formulaAmount = item.formulaAmount;
          item.formulaUnit = item.formulaUnit;
          item.useAmount =
            Number(this.form.clothWeight) * Number(item.formulaAmount);
          isNaN(item.useAmount) ? (item.useAmount = 0) : "";
          if (item.measureType != null && item.measureType.indexOf("g") != -1) {
            item.useAmount = 0;
          }
          let data = JSON.parse(JSON.stringify(item));
          this.chooseData.list.push(data);
        });
        // val.index = this.chooseData.list.length + 1;
        // val.$cellEdit = true;
        // val.mateCode = val.basMateId;
        // val.proBleadyeCodeItemFk = val.codeItemIt;
        // val.formulaAmount = val.formulaAmount;
        // val.formulaUnit = val.formulaUnit;
        // val.useAmount =
        //   Number(this.form.clothWeight) * Number(val.formulaAmount);
        // isNaN(val.useAmount) ? (val.useAmount = 0) : "";
        // if (val.measureType != null && val.measureType.indexOf("g") != -1) {
        //   val.useAmount = 0;
        // }
        // let data = JSON.parse(JSON.stringify(val));
        // this.chooseData.list.push(data);
        this.$refs.yarnCrud.setCurrentRow(
          this.chooseData.list[this.chooseData.list.length - 1]
        );
      }
      if (this.choiceTle == "选择织造通知单") {
        val.fabName = val.fabricDesc;
        val.gramWeightAfter = isNaN(val.gramWeight) ? 0 : val.gramWeight;
        val.shrinkLenth = isNaN(val.verticalShrink) ? 0 : val.verticalShrink;
        val.shrinkWidth = isNaN(val.horizonShrink) ? 0 : val.horizonShrink;
        val.clothWeight = isNaN(val.amount) ? 0 : val.amount;
        this.form = val;
        this.getOther();
      }
      if (this.choiceTle == "選擇生产项目") {
        val.forEach((item, i) => {
          this.crud.push({
            jobItemName: item.stepName,
            $cellEdit: true,
            index:
              this.crud.length > 0
                ? this.crud[this.crud.length - 1].index + 1
                : 1,
          });
        });
      }
      this.choiceV = false;
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
        obj === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-table__fixed-body-wrapper {
  top: 37px !important;
}

#dyeing {
  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-form__row {
    padding: 0 !important;
  }

  .formBox {
    height: 100vh !important;
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