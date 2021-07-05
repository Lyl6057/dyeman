<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-05 08:26:36
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
      :close-on-press-escape="false"
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
              <span style="margin-left: 10px" v-if="tabs == '生產工藝'">
                自动计算</span
              >

              <el-switch
                v-if="tabs == '生產工藝'"
                v-model="mathCtr"
                active-color="#13ce66"
                inactive-color="#ccc"
              >
              </el-switch>
              <el-tag
                style="font-size: 17px; margin-left: 10px"
                v-if="tabs == '生產工藝'"
              >
                重量:{{ detail.clothWeight }}</el-tag
              >
              <el-tag style="font-size: 17px" v-if="tabs == '生產工藝'">
                合缸重量:{{ vatWeight }}</el-tag
              >

              <!-- <span> </span> -->
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
              >
                <template slot="bleachSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.bleachSet"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.bleachSet"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="bleachFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.bleachFact"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.bleachFact"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="dyeSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.dyeSet"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.dyeSet"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="dyeFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.dyeFact"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.dyeFact"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="soapSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.soapSet"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.soapSet"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="soapFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.soapFact"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.soapFact"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
              </avue-crud>
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
              <el-button
                @click="up"
                type="primary"
                :disabled="Object.keys(chooseDtlData).length == 0"
                >上移</el-button
              >
              <el-button
                @click="down"
                type="primary"
                :disabled="Object.keys(chooseDtlData).length == 0"
                >下移</el-button
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
              >
                <template slot="formulaUnit" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.measureType === 'g/L'">
                    <!-- string 类型 -->
                    <el-select
                      v-model="scope.row.formulaUnit"
                      placeholder=" "
                      @change="unitCtr(scope)"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else style="text-align: center">
                    <el-select
                      v-model="scope.row.formulaUnit"
                      placeholder=" "
                      @change="unitCtr(scope)"
                    >
                      <el-option
                        v-for="item in option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </avue-crud>
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
  get,
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
  getTechargueList,
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
      form: {},
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
      code: "",
      codeItemCrud: codeItemCrud(this),
      group: [],
      chooseDtlData: {},
      dtlV: false,
      options: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
      oldW: null,
      vatWeight: 0,
      mathCtr: true,
      options: [
        {
          label: "KG",
          value: "KG",
        },
        {
          label: "g",
          value: "g",
        },
      ],
      option: [
        {
          label: "KG",
          value: "KG",
        },
        {
          label: "g",
          value: "g",
        },
        {
          label: "L",
          value: "L",
        },
      ],
    };
  },
  watch: {},
  methods: {
    unitCtr(val) {
      this.$nextTick(() => {
        if (val.label == "g" && val.row.formulaUnit === "KG") {
          // val.row.useAmount = Number(val.row.useAmount) * 0.001;
          val.row.useAmount = Number(
            Number(
              val.row.formulaAmount * this.detail.clothWeight * 0.01
            ).toFixed(2)
          );
        } else if (val.label == "KG" && val.row.formulaUnit === "g") {
          // val.row.useAmount = Number(val.row.useAmount) * 1000;
          val.row.useAmount = Number(
            Number(
              val.row.formulaAmount * this.detail.clothWeight * 0.01 * 1000
            ).toFixed(4)
          );
        }
      });
    },
    getData() {
      this.wLoading = true;
      this.form = {};
      if (this.isAdd) {
        setTimeout(() => {
          this.form.workDate = this.$getNowTime();
          this.form.deliveDate = this.$getNowTime();
          this.wLoading = false;
        }, 200);
      } else {
        // get({
        //   rows: 10,
        //   start: 1,
        //   bleadyeJobId: this.detail.bleadyeJobId,
        // }).then((res) => {
        //   this.form = res.data.records[0];
        this.form = this.detail;
        if (!(this.form.mergVatNo instanceof Array) && this.form.mergVatNo) {
          this.form.mergVatNo = this.form.mergVatNo.split("/");
        }
        this.oldW = JSON.parse(JSON.stringify(this.form.clothWeight));
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
        // });
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
                // this.form.poAmountLb = (
                //   Number(this.form.poAmountKg) * 2.2046226
                // ).toFixed(2);
              } else {
                this.form.poAmountLb = poDtla.data.rows[0].fabQty;
                // this.form.poAmountKg = (
                //   Number(this.form.poAmountLb) * 0.4535924
                // ).toFixed(2);
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
            isNaN(this.form.clothWeight) ? (this.form.clothWeight = "") : "";
            isNaN(this.form.poAmountKg) ? (this.form.poAmountKg = "") : "";
            isNaN(this.form.poAmountLb) ? (this.form.poAmountLb = "") : "";
            this.form.gramWeight = Number(this.form.gramWeight);
            this.form.breadth = Number(this.form.breadth);
            this.form.workDate += " 00:00:00";
            this.form.deliveDate += " 00:00:00";
            let vat = "";
            // if (typeof this.form.mergVatNo == "object") {
            this.form.mergVatNo.forEach((item, i) => {
              if (i == this.form.mergVatNo.length - 1) {
                vat += item;
              } else {
                vat += item + "/";
              }
            });
            // }

            this.form.mergVatNo = vat;
            if (this.form.bleadyeJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              if (this.oldW != this.form.clothWeight) {
                this.$tip
                  .cofirm(
                    "检测到重量改变会影响生产工艺参数，是否确定修改重量?",
                    this,
                    {}
                  )
                  .then(() => {
                    update(this.form).then((res) => {
                      if (res.data.code == 200) {
                        this.oldW = this.form.clothWeight;
                        getTechargue({
                          proBleadyeJobFk: this.form.bleadyeJobId,
                          rows: 999,
                          start: 1,
                        }).then((res) => {
                          if (res.data.records.length > 0) {
                            res.data.records.forEach((item, i) => {
                              item.totalWater = Number(
                                (
                                  Number(this.form.clothWeight) *
                                  Number(item.liquorRatio)
                                ).toFixed(2)
                              );
                              item.haltWater =
                                item.totalWater -
                                Number(item.shotgunWater) -
                                Number(item.wetClothWater);
                              updateTechargue(item).then((tech) => {
                                getTechItem({
                                  proBleadyeJobTechargueFk: item.jobTechId,
                                  star: 1,
                                  rows: 999,
                                }).then((resDtl) => {
                                  resDtl.data.records.forEach((items, j) => {
                                    if (items.measureType) {
                                      if (
                                        items.measureType.indexOf("%") != -1
                                      ) {
                                        items.useAmount = Number(
                                          (
                                            Number(items.formulaAmount) *
                                            Number(this.form.clothWeight) *
                                            0.01
                                          ).toFixed(2)
                                        );
                                      } else if (
                                        items.measureType.indexOf("g") != -1
                                      ) {
                                        items.useAmount =
                                          items.formulaUnit == "KG"
                                            ? Number(
                                                (
                                                  Number(items.formulaAmount) *
                                                  Number(item.totalWater) *
                                                  0.001
                                                ).toFixed(2)
                                              )
                                            : Number(
                                                (
                                                  Number(items.formulaAmount) *
                                                  Number(item.totalWater)
                                                ).toFixed(2)
                                              );
                                      }
                                      updateTechItem(items).then();
                                    } else {
                                      updateTechItem(items).then();
                                    }
                                  });
                                });
                              });
                              if (i == res.data.records.length - 1) {
                                setTimeout(() => {
                                  this.wLoading = false;
                                  this.$emit("refresh");
                                  this.$tip.success(this.$t("public.bccg"));
                                  done();
                                }, 500);
                              }
                            });
                          } else {
                            setTimeout(() => {
                              this.wLoading = false;
                              this.$emit("refresh");
                              this.$tip.success(this.$t("public.bccg"));
                              done();
                            }, 200);
                          }
                        });
                      } else {
                        this.wLoading = false;
                        done();
                        this.$tip.error(this.$t("public.bcsb"));
                      }
                    });
                  })
                  .catch((err) => {
                    this.form.clothWeight = this.oldW;
                    update(this.form).then((res) => {
                      if (res.data.code == 200) {
                        this.oldW = this.form.clothWeight;

                        setTimeout(() => {
                          this.wLoading = false;
                          this.$emit("refresh");
                          this.$tip.success(this.$t("public.bccg"));

                          done();
                        }, 200);
                      } else {
                        this.wLoading = false;
                        done();
                        this.$tip.error(this.$t("public.bcsb"));
                      }
                    });
                  });
              } else {
                update(this.form).then((res) => {
                  if (res.data.code == 200) {
                    this.oldW = this.form.clothWeight;
                    setTimeout(() => {
                      this.wLoading = false;
                      this.$emit("refresh");
                      this.$tip.success(this.$t("public.bccg"));
                      done();
                    }, 200);
                  } else {
                    this.wLoading = false;
                    done();
                    this.$tip.error(this.$t("public.bcsb"));
                  }
                });
              }
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.oldW = this.form.clothWeight;
                  this.form.bleadyeJobId = res.data.data;
                  this.addOtherData();
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                  this.wLoading = false;
                }
                done();
              });
            }
            if (this.form.mergVatNo) {
              this.form.mergVatNo = this.form.mergVatNo.split("/");
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
    addOtherData() {
      getTechargueList()
        .then((res) => {
          // 獲取全部基礎工藝
          let washIndex = 1,
            dyeIndex = 1,
            testIndex = 1;
          res.data.forEach((item, index) => {
            if (item.paramType === "wash") {
              // 長車
              addWash({
                itemId: item.paramKey,
                itemName: item.paramName,
                proBleadyeJobFk: this.form.bleadyeJobId,
                sn: washIndex++,
              }).then((res) => {});
            } else if (item.paramType === "dyevat") {
              // 染缸
              addDye({
                vatParamCode: item.paramKey,
                vatParamName: item.paramName,
                dataStyle: item.paramValueType,
                sn: dyeIndex++,
                proBleadyeJobFk: this.form.bleadyeJobId,
              }).then((res) => {});
            } else if (item.paramType === "test") {
              // 測試要求
              addTest({
                testItemCode: item.paramKey,
                testName: item.paramName,
                sn: testIndex++,
                proBleadyeJobFk: this.form.bleadyeJobId,
              }).then((res) => {});
            }
            if (index == res.data.length - 1) {
              this.$tip.success(this.$t("public.bccg"));
              this.wLoading = false;
              this.$emit("refresh");
            }
          });
          if (!res.data.length) {
            this.$tip.success(this.$t("public.bccg"));
            this.wLoading = false;
            this.$emit("refresh");
          }
        })
        .catch((e) => {
          this.wLoading = false;
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
        this.getVat();
      } else {
        this.func.get = getWash;
        this.func.del = delWash;
        this.func.add = addWash;
        this.func.update = updateWash;
      }
      this.dlgForm.proBleadyeJobFk = this.form.bleadyeJobId;
      this.dlgLoading = true;
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
          this.crud = res.data.records;
          if (this.tabs == "測試要求") {
            this.crud.sort((a, b) => {
              return (
                a.testItemCode.replace(/[^0-9]/gi, "") -
                b.testItemCode.replace(/[^0-9]/gi, "")
              );
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
          } else {
            this.dlgLoading = false;
          }
          this.crud.forEach((item, i) => {
            for (let key in item) {
              if (item[key] == null) {
                item[key] = undefined;
              }
            }
            item.$cellEdit = true;
            item.index = i + 1;
            if (this.tabs === "生產工藝") {
              item.bleadyeName = item.proBleadyeTechCodeFk;
            }
          });
          this.page.total = res.data.total;
        });
    },
    getVat() {
      // 获取合染缸号的重量
      this.vatWeight = this.form.clothWeight;
      this.form.mergVatNo.forEach((item, i) => {
        get({ rows: 10, start: 1, vatNo: item }).then((res) => {
          res.data.records.forEach((vat) => {
            this.vatWeight += Number(vat.clothWeight);
          });
        });
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
            item.jobTechId
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
      } else if (this.tabs === "长车加工项目") {
        this.choiceTle = "選擇漂染基礎工藝";
        this.choiceQ.paramType = "wash";
        this.choiceV = true;
        return;
      } else if (this.tabs === "測試要求") {
        this.choiceTle = "選擇漂染基礎工藝";
        this.choiceQ.paramType = "test";
        this.choiceV = true;
        return;
      } else {
        this.choiceTle = "選擇漂染基礎工藝";
        this.choiceQ.paramType = "dyevat";
        this.choiceV = true;
        return;
      }
      // if (this.tabs != "生產項目") {
      // this.crud.push({
      //   index: this.crud.length + 1,
      //   $cellEdit: true,
      //   signDate: this.$getNowTime("datetime"),
      //   changeBatchTime: this.$getNowTime("datetime"),
      //   sn:
      //     this.crud.length > 0
      //       ? Number(this.crud[this.crud.length - 1].sn) + 1
      //       : 1,
      // });
      // this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      // } else {
      //   this.choiceV = true;
      // }
    },
    addDtl() {
      this.choiceTle = "選擇工藝材料";
      // if (this.chooseData.jobTechId) {
      this.choiceQ.proBleadyeTechCodeFk = this.chooseData.$proBleadyeTechCodeFk;
      // } else {
      //   this.choiceQ = {};
      // }

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
                // if (this.chooseData.list.length > 0) {
                //   this.chooseData.list.forEach((item, i) => {
                //     delTechItem(item.techItemId).then((res) => {});
                //     if (i == this.chooseData.list.length - 1) {
                //       this.query();
                //       this.$tip.success(this.$t("public.sccg"));
                //     }
                //   });
                // } else {
                this.query();
                this.$tip.success(this.$t("public.sccg"));
                // }
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
      } else {
        this.dlgLoading = false;
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
        setTimeout(() => {
          this.dlgLoading = false;
        }, 200);
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
        let params = {
          index: this.crud.length + 1,
          $cellEdit: true,
          proBleadyeTechCodeFk: val.bleadyeCodeId,
          bleadyeName: val.bleadyeCodeId,
          liquorRatio: val.liquorRatio,
          signDate: this.$getNowTime("datetime"),
          changeBatchTime: this.$getNowTime("datetime"),
          wetClothWater: 0,
          shotgunWater: 0,
          sn:
            this.crud.length > 0
              ? Number(this.crud[this.crud.length - 1].sn) + 1
              : 1,
          list: [],
        };

        getCodeItem({
          proBleadyeTechCodeFk: val.bleadyeCode,
          rows: 999,
          start: 1,
        }).then((res) => {
          // this.crud[this.crud.length - 1].list = [];
          res.data.records.sort((a, b) => {
            return a.sn < b.sn ? -1 : 1;
          });
          res.data.records.forEach((item, i) => {
            item.index = i + 1;
            item.sn = i + 1;
            item.$cellEdit = true;
            item.mateCode = item.basMateId;
            item.proBleadyeCodeItemFk = item.codeItemIt;
            item.formulaAmount = item.formulaAmount;
            item.formulaUnit = item.formulaUnit;
            item.useAmount = Number(
              (
                Number(this.form.clothWeight) *
                Number(item.formulaAmount) *
                0.01
              ).toFixed(2)
            );
            isNaN(item.useAmount) ? (item.useAmount = 0) : "";
            if (
              item.measureType != null &&
              item.measureType.indexOf("g") != -1
            ) {
              item.useAmount = 0;
            }

            params.list.push(JSON.parse(JSON.stringify(item)));
          });
          this.crud.push(JSON.parse(JSON.stringify(params)));
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
          // this.$nextTick(() => {
          //   this.chooseData.list = res.data.records;
          // });
          // this.$set(this.chooseData, "list", res.data.records);

          // this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
          this.chooseData.totalWater = JSON.parse(
            JSON.stringify(
              Number(
                (
                  Number(this.form.clothWeight) *
                  Number(this.chooseData.liquorRatio)
                ).toFixed(0)
              )
            )
          );
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
          item.sn = this.chooseData.list.length + 1;
          item.$cellEdit = true;
          item.mateCode = item.basMateId;
          item.proBleadyeCodeItemFk = item.codeItemIt;
          item.formulaAmount = item.formulaAmount;
          item.formulaUnit = item.formulaUnit;
          item.useAmount = Number(
            (
              Number(this.form.clothWeight) *
              Number(item.formulaAmount) *
              0.01
            ).toFixed(2)
          );
          isNaN(item.useAmount) ? (item.useAmount = 0) : "";
          if (item.measureType != null && item.measureType.indexOf("g") != -1) {
            item.useAmount = 0;
          }
          let data = JSON.parse(JSON.stringify(item));
          this.chooseData.list.push(data);
        });
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
        // this.form.weaveJobCode =val.weaveJobCode;
        // this.form.fabName = val.fabName
        // this.form.salPoNo = val.salPoNo
        // this.form.custCode = val.custCode

        // this.form.yarnBatchNo =val.yarnBatchNo;
        // this.form.yarnNumber = val.yarnNumber
        // this.form.yarnCard = val.yarnCard
        // this.form.colorName = val.colorName

        //  this.form.colorCode =val.colorCode;
        // this.form.yarnNumber = val.yarnNumber
        // this.form.yarnCard = val.yarnCard
        // this.form.colorName = val.colorName

        this.form.breadthUnit = this.form.breadth.replace(/[^a-z]+/gi, "");
        this.form.breadth = Number(this.form.breadth.replace(/[^0-9]/gi, ""));

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
      if (this.choiceTle == "選擇漂染基礎工藝") {
        val.forEach((item, i) => {
          let data = {};
          if (this.tabs == "染缸參數") {
            data = {
              vatParamCode: item.paramKey,
              vatParamName: item.paramName,
              dataStyle: item.paramValueType,
              sn: this.crud.length + 1,
              $cellEdit: true,
              index:
                this.crud.length > 0
                  ? this.crud[this.crud.length - 1].index + 1
                  : 1,
            };
          } else if (this.tabs == "长车加工项目") {
            data = {
              itemName: item.paramName,
              // itemId: item.paramKey,
              dataStyle: item.paramValueType,
              sn: this.crud.length + 1,
              $cellEdit: true,
              index:
                this.crud.length > 0
                  ? this.crud[this.crud.length - 1].index + 1
                  : 1,
            };
          } else if (this.tabs == "測試要求") {
            data = {
              testItemCode: item.paramKey,
              testName: item.paramName,
              dataStyle: item.paramValueType,
              sn: this.crud.length + 1,
              $cellEdit: true,
              index:
                this.crud.length > 0
                  ? this.crud[this.crud.length - 1].index + 1
                  : 1,
            };
          }
          this.crud.push(data);
        });
      }
      this.choiceV = false;
    },
    up() {
      if (Object.keys(this.chooseDtlData).length > 0) {
        if (this.chooseDtlData.sn === 1) {
          return;
        }
        //在上一项插入该项
        this.chooseData.list.splice(
          this.chooseDtlData.sn - 2,
          0,
          this.chooseData.list[this.chooseDtlData.sn - 1]
        );
        //删除后一项
        this.chooseData.list.splice(this.chooseDtlData.sn, 1);
        this.chooseData.list.forEach((item, i) => {
          item.sn = i + 1;
        });
      } else {
        this.$tip.error("请选择要上移的数据!");
        return;
      }
    },
    down() {
      if (Object.keys(this.chooseDtlData).length > 0) {
        if (this.chooseDtlData.sn === this.chooseData.list.length) {
          return;
        }
        //在下一项插入该项
        this.chooseData.list.splice(
          this.chooseDtlData.sn + 1,
          0,
          this.chooseData.list[this.chooseDtlData.sn - 1]
        );
        //删除前一项
        this.chooseData.list.splice(this.chooseDtlData.sn - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.sn = i + 1;
        });
      } else {
        this.$tip.error("请选择要上移的数据!");
        return;
      }
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
.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}

// .el-table__fixed-body-wrapper {
// top: 37px !important;
// }
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