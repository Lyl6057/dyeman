<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-25 07:59:41
 * @Description: 
-->
<template>
  <div
    id="dyeNoticeDlg"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container :title="(isAdd ? '新增' : '修改') + '染整通知单'">
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="checkOrder">选择订单号</el-button>

        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
    </view-container>
    <el-row>
      <el-col :span="bomTabs == 'fabric' ? 24 : 12">
        <el-tabs v-model="bomTabs" type="border-card">
          <el-tab-pane label="布料明细" name="fabric">
            <div class="btnList">
              <el-button type="primary" @click="addDtl">{{
                $t("public.add")
              }}</el-button>
              <el-button
                type="danger"
                @click="delDtl"
                :disabled="Object.keys(chooseDtlData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
              <el-button
                type="primary"
                @click="checkColor"
                :disabled="!chooseDtlData.dyeFabricId"
                >布料颜色</el-button
              >
              <el-button
                type="primary"
                @click="checkItem"
                :disabled="!chooseDtlData.dyeFabricId"
                >工艺项目</el-button
              >
            </div>
            <el-row class="crudBox">
              <avue-crud
                ref="dtlCrud"
                id="dtlCrud"
                :option="dtlOp"
                :data="dtl"
                :page.sync="dtlPage"
                v-loading="loading"
                @on-load="query"
                @current-row-change="cellDtlClick"
              ></avue-crud>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="测试方法要求" name="test">
            <div class="btnList">
              <el-button type="primary" @click="addDtl">{{
                $t("public.add")
              }}</el-button>
              <el-button
                type="danger"
                @click="delTest"
                :disabled="Object.keys(chooseTestData).length == 0"
                :loading="loading"
                >{{ $t("public.del") }}</el-button
              >
            </div>
            <el-row class="crudBox">
              <avue-crud
                ref="testCrud"
                id="testCrud"
                :option="testOp"
                :data="test"
                v-loading="loading"
                @on-load="query"
                @current-row-change="cellTestClick"
              ></avue-crud>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col v-show="bomTabs != 'fabric'" :span="bomTabs == 'fabric' ? 0 : 12">
        <view-container title="测试标准">
          <div class="btnList">
            <el-button
              type="primary"
              @click="addStand"
              :disabled="Object.keys(chooseTestData).length == 0"
              >{{ $t("public.add") }}</el-button
            >
            <el-button
              type="danger"
              @click="delStand"
              :disabled="Object.keys(chooseStandData).length == 0"
              :loading="sloading"
              >{{ $t("public.del") }}</el-button
            >
            <el-button
              type="primary"
              @click="checkTestItem"
              :disabled="!chooseStandData.testStandarId"
              >测试项目</el-button
            >
          </div>
          <el-row class="crudBox">
            <avue-crud
              ref="standCrud"
              id="standCrud"
              :option="standOp"
              :data="chooseTestData.list"
              :page.sync="dtlPage"
              v-loading="sloading"
              @on-load="query"
              @current-row-change="cellStandClick"
            ></avue-crud>
          </el-row>
        </view-container>
      </el-col>
    </el-row>

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
        <el-col :span="tabs == 'LD通知单组成' ? 13 : 24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button
                @click="check"
                type="success"
                v-if="tabs == '選擇訂單'"
                >{{ $t("public.choose") }}</el-button
              >
              <el-button
                @click="saveOther"
                type="success"
                v-if="tabs != '選擇訂單'"
                >{{ $t("public.save") }}</el-button
              >
              <el-button
                @click="add"
                type="primary"
                v-if="tabs != '選擇訂單'"
                >{{ $t("public.add") }}</el-button
              >
              <el-button
                @click="del"
                type="danger"
                v-if="tabs != '選擇訂單'"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
              <el-button
                @click="query"
                type="primary"
                v-if="tabs == '選擇訂單'"
                >{{ $t("public.query") }}</el-button
              >
              <el-button @click="visible = false" type="warning">{{
                $t("public.close")
              }}</el-button>
            </div>
            <div class="formBox">
              <avue-form
                v-if="tabs == '選擇訂單'"
                ref="dlgform"
                :option="dlgFormOp"
                v-model="dlgForm"
              ></avue-form>
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
        <el-col :span="11" v-if="tabs == 'LD通知单组成'">
          <view-container title="通知单颜色">
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
                ref="colorCrud"
                :option="colorCrud"
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
import choice from "@/components/choice";
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  colorCrud,
  itemCrud,
  fabricCrud,
  testCrud,
  standCrud,
  testItemCrud,
} from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getColor,
  addColor,
  delColor,
  updateColor,
  getDtl,
  addDtl,
  updateDtl,
  delDtl,
  getItem,
  addItem,
  delItem,
  updateItem,
  addTest,
  getTest,
  updateTest,
  delTest,
  getStandar,
  addStandar,
  delStandar,
  updateStandar,
  getTestItem,
  addTestItem,
  updateTestItem,
  delTestItem,
} from "./api";
import preview from "./preview";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    preView: preview,
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
      dtlPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      testPage: {
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
      choiceTle: this.$t("choicDlg.xzsx"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      code: "",
      colorCrud: colorCrud(this),
      group: [],
      chooseDtlData: {},
      chooseTestData: {},
      chooseStandData: {},
      dtlOp: fabricCrud(this),
      dtl: [],
      testOp: testCrud(this),
      test: [],
      standOp: standCrud(this),
      stand: [],
      bomTabs: "fabric",
      sloading: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.dyeDate = this.$getNowTime("date");
          this.form.sendingSampleQuantity = undefined;
          this.form.sampleQuantity = undefined;
          this.form.sampleSize = undefined;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        this.getDtlData();
      }
    },
    getDtlData() {
      getDtl({ proDyeFinishOrderFk: this.form.dyeOrderId }).then((res) => {
        this.dtl = res.data;
        this.dtl.forEach((item, i) => {
          item.index = i + 1;
          item.$cellEdit = true;
        });
        if (this.dtl.length) {
          this.$refs.dtlCrud.setCurrentRow(this.dtl[0]);
        }
        getTest({ proDyeFinishOrderFk: this.form.dyeOrderId }).then((res) => {
          this.test = res.data;
          this.test.forEach((item, i) => {
            item.index = i + 1;
            item.$cellEdit = true;
            item.list = [];
          });
          if (this.test.length) {
            this.$refs.testCrud.setCurrentRow(this.test[0]);
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      });
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          for (let i = 0; i < this.dtl.length; i++) {
            if (!this.dtl[i].clothType || !this.dtl[i].fabricCode) {
              done();
              this.$tip.error("布料明细中的布料类型/布料代码不能为空!");
              return;
            }
          }
          for (let i = 0; i < this.test.length; i++) {
            if (
              !this.test[i].testCnContent &&
              !this.test[i].testEnContent &&
              !this.test[i].testVetContent
            ) {
              done();
              this.$tip.error("测试方法中的测试内容至少一项不能为空!");
              return;
            }
            for (let j = 0; j < this.test[i].list.length; j++) {
              if (!this.test[i].list[j].testStandar) {
                done();
                this.$tip.error("测试标准不能为空!");
                return;
              }
            }
          }
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (this.form[key] == "undefined") {
                this.form[key] = "";
              }
            }
            this.form.dyeDate = this.form.dyeDate + " 00:00:00";
            this.form.finishDate = this.form.finishDate + " 00:00:00";
            this.form.issuedDate
              ? (this.form.issuedDate = this.form.issuedDate + " 00:00:00")
              : "";
            this.form.deliveDate
              ? (this.form.deliveDate = this.form.deliveDate + " 00:00:00")
              : "";
            if (this.form.dyeOrderId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  if (this.dtl.length) {
                    this.dtl.forEach((item, i) => {
                      if (item.dyeFabricId) {
                        updateDtl(item).then((res) => {});
                      } else {
                        item.proDyeFinishOrderFk = this.form.dyeOrderId;
                        addDtl(item).then((res) => {
                          item.dyeFabricId = res.data.data;
                        });
                      }
                      if (i == this.dtl.length - 1) {
                        // this.wLoading = false;
                        this.saveDtl();
                        this.$emit("refresh");
                        done();
                      }
                    });
                  } else {
                    setTimeout(() => {
                      // this.wLoading = false;
                      this.saveDtl();
                      this.$emit("refresh");
                      done();
                    }, 200);
                  }
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.dyeOrderId = res.data.data;
                  if (this.dtl.length) {
                    this.dtl.forEach((item, i) => {
                      if (item.dyeFabricId) {
                        updateDtl(item).then((res) => {});
                      } else {
                        item.proDyeFinishOrderFk = this.form.dyeOrderId;
                        addDtl(item).then((res) => {
                          item.dyeFabricId = res.data.data;
                        });
                      }

                      if (i == this.dtl.length - 1) {
                        setTimeout(() => {
                          // this.wLoading = false;
                          this.saveDtl();
                          this.$emit("refresh");
                          done();
                        }, 200);
                      }
                    });
                  } else {
                    setTimeout(() => {
                      // this.wLoading = false;
                      this.saveDtl();
                      this.$emit("refresh");
                      done();
                    }, 200);
                  }
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
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
    saveDtl() {
      if (this.test.length) {
        let addDtla = (item, i) => {
          return new Promise((resolve, reject) => {
            let data = JSON.parse(JSON.stringify(item));
            data.list = [];
            if (item.testId) {
              updateTest(data).then((res) => {
                resolve();
              });
            } else {
              data.proDyeFinishOrderFk = this.form.dyeOrderId;
              addTest(data).then((res) => {
                item.testId = res.data.data;
                resolve();
              });
            }
          });
        };
        let promiseArr = this.test.map((item, i) => {
          return addDtla(item, i);
        });
        Promise.all(promiseArr).then((res) => {
          for (let i = 0; i < this.test.length; i++) {
            if (this.test[i].list && this.test[i].list.length > 0) {
              this.test[i].list.forEach((item) => {
                if (item.testStandarId) {
                  updateStandar(item).then((res) => {});
                } else {
                  item.proDyeFinishOrderTestFk = this.test[i].testId;
                  addStandar(item).then((res) => {
                    item.testStandarId = res.data.data;
                  });
                }
              });
            }
            if (i === this.test.length - 1) {
              // this.getDetail();
              setTimeout(() => {
                this.wLoading = false;
                this.$tip.success(this.$t("public.bccg"));
              }, 200);
            }
          }
        });
      } else {
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    query() {
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (this.tabs == "布料颜色") {
        this.func.get = getColor;
        this.func.del = delColor;
        this.func.add = addColor;
        this.func.update = updateColor;
        this.dlgForm.proDyeFinishOrderFabricFk = this.chooseDtlData.dyeFabricId;
      } else if (this.tabs == "工艺项目") {
        this.func.get = getItem;
        this.func.del = delItem;
        this.func.add = addItem;
        this.func.update = updateItem;
        this.dlgForm.proDyeFinishOrderFabricFk = this.chooseDtlData.dyeFabricId;
      } else {
        this.func.get = getTestItem;
        this.func.del = delTestItem;
        this.func.add = addTestItem;
        this.func.update = updateTestItem;
        this.dlgForm.proDyeFinishOrderTestStandarFk = this.chooseStandData.testStandarId;
      }
      this.dlgLoading = true;
      // this.chooseData = {};
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
          if (this.tabs == "選擇訂單") {
            this.crud = res.data.rows;
          } else {
            this.crud = res.data.records;
          }
          this.crud.forEach((item, i) => {
            for (let key in item) {
              if (item[key] == null) {
                item[key] = undefined;
              }
            }
            item.$cellEdit = true;
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          setTimeout(() => {
            this.dlgLoading = false;
          }, 200);
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (
          this.tabs == "布料颜色" &&
          !this.crud[i].ldColorCode &&
          !this.crud[i].dyeingType
        ) {
          this.$tip.error("色号/工艺类型不能為空!");
          return;
        }
        if (
          this.tabs == "工艺项目" &&
          !this.crud[i].finishItem &&
          !this.crud[i].finishPlace
        ) {
          this.$tip.error("工艺项目名称/工艺位置不能為空!");
          return;
        }
        if (this.tabs == "测试项目" && !this.crud[i].testItemName) {
          this.$tip.error("测试项目不能為空!");
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
          if (item.colorId || item.finishId || item.testItemId) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proDyeFinishOrderFabricFk = this.chooseDtlData.dyeFabricId;
            data.proDyeFinishOrderTestStandarFk = this.chooseStandData.testStandarId;
            this.func.add(data).then((res) => {
              item.colorId = res.data.data;
              item.finishId = res.data.data;
              item.testItemId = res.data.data;
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
          // if (this.crud[i].list && this.crud[i].list.length > 0) {
          //   this.crud[i].list.forEach((item) => {
          //     item.proLdNoticeFabricFk = this.crud[i].compId;
          //     if (!item.noticeColorId) {
          //       addColor(item).then((res) => {
          //         item.noticeColorId = res.data.data;
          //       });
          //     } else {
          //       updateColor(item).then((res) => {});
          //     }
          //   });
          // }
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
    },
    checkItem() {
      this.tabs = "工艺项目";
      this.crudOp = itemCrud(this);
      this.visible = true;
      this.query();
    },
    checkColor() {
      this.tabs = "布料颜色";
      this.crudOp = colorCrud(this);
      this.visible = true;
      this.query();
    },
    checkOrder() {
      this.tabs = "選擇訂單";
      this.crudOp = dlgCrud(this);
      this.visible = true;
      this.query();
    },
    checkTestItem() {
      this.tabs = "测试项目";
      this.crudOp = testItemCrud(this);
      this.visible = true;
      this.query();
    },
    add() {
      // if (this.tabs != "用紗分組") {
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
    },
    addDtl() {
      if (this.visible) {
        this.crud.push({
          $cellEdit: true,
        });
        this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      } else {
        if (this.bomTabs == "fabric") {
          this.dtl.push({
            $cellEdit: true,
            index: this.dtl.length + 1,
          });
          this.$refs.dtlCrud.setCurrentRow(this.dtl[this.dtl.length - 1]);
          this.$nextTick(() => {
            this.$toTableLow(this, "dtlCrud");
          });
        } else {
          this.test.push({
            $cellEdit: true,
            index: this.test.length + 1,
          });
          this.$refs.testCrud.setCurrentRow(this.test[this.test.length - 1]);
          this.$nextTick(() => {
            this.$toTableLow(this, "testCrud");
          });
        }
      }
    },
    del() {
      if (
        !this.chooseData.colorId &&
        !this.chooseData.finishId &&
        !this.chooseData.testItemId
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
              this.tabs == "布料颜色"
                ? this.chooseData.colorId
                : this.tabs == "测试项目"
                ? this.chooseData.testItemId
                : this.chooseData.finishId
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.query();
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
    delDtl() {
      if (!this.chooseDtlData.dyeFabricId) {
        this.dtl.splice(this.chooseDtlData.index - 1, 1);
        // this.chooseDtlData = {};
        this.dtl.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.dtl.length > 0) {
          this.$refs.dtlCrud.setCurrentRow(this.dtl[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          delDtl(this.chooseDtlData.dyeFabricId)
            .then((res) => {
              if (res.data.code === 200) {
                // this.query();
                this.dtl.splice(this.chooseDtlData.index - 1, 1);
                // this.chooseDtlData = {};
                this.dtl.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.dtl.length > 0) {
                  this.$refs.dtlCrud.setCurrentRow(this.dtl[0]);
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
    delTest() {
      if (!this.chooseTestData.testId) {
        this.test.splice(this.chooseTestData.index - 1, 1);
        this.chooseTestData = {};
        this.test.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.test.length > 0) {
          this.$refs.testCrud.setCurrentRow(this.test[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.loading = true;
          delTest(this.chooseTestData.testId)
            .then((res) => {
              if (res.data.code === 200) {
                this.test.splice(this.chooseTestData.index - 1, 1);
                this.chooseTestData = {};
                this.test.forEach((item, i) => {
                  item.index = i + 1;
                });

                if (this.test.length > 0) {
                  this.$refs.testCrud.setCurrentRow(this.test[0]);
                }
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    addStand() {
      this.chooseTestData.list.push({
        index: this.chooseTestData.list.length + 1,
        $cellEdit: true,
      });
      this.$refs.standCrud.setCurrentRow(
        this.chooseTestData.list[this.chooseTestData.list.length - 1]
      );
      this.$nextTick(() => {
        this.$toTableLow(this, "standCrud");
      });
    },
    delStand() {
      if (!this.chooseStandData.testStandarId) {
        this.chooseTestData.list.splice(this.chooseStandData.index - 1, 1);
        this.chooseStandData = {};
        this.chooseTestData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseTestData.list.length > 0) {
          this.$refs.standCrud.setCurrentRow(this.chooseTestData.list[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.sloading = true;
          delStandar(this.chooseStandData.testStandarId)
            .then((res) => {
              if (res.data.code === 200) {
                this.chooseTestData.list.splice(
                  this.chooseStandData.index - 1,
                  1
                );
                this.chooseStandData = {};
                this.chooseTestData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseTestData.list.length > 0) {
                  this.$refs.standCrud.setCurrentRow(
                    this.chooseTestData.list[0]
                  );
                }
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
              this.sloading = false;
            })
            .catch((err) => {
              this.sloading = false;
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
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    cellTestClick(val) {
      this.chooseStandData = {};
      this.chooseTestData = val;
      if (!this.chooseTestData.list) {
        this.chooseTestData.list = [];
      }
      if (!this.chooseTestData.list.length && this.chooseTestData.testId) {
        this.getStand();
      }
      if (this.chooseTestData.list.length) {
        this.$refs.standCrud.setCurrentRow(this.chooseTestData.list[0]);
      }
      // if (this.chooseDtlData.testId && this.chooseDtlData.list.length == 0) {

      // }
    },
    cellStandClick(val) {
      this.chooseStandData = val;
    },
    getStand() {
      this.sloading = true;
      this.chooseTestData.list = [];
      getStandar({
        proDyeFinishOrderTestFk: this.chooseTestData.testId,
      }).then((res) => {
        let data = res.data;
        data.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
          this.chooseTestData.list.push(Object.assign(item));
        });
        // this.$nextTick(() => {
        if (this.chooseTestData.list.length > 0 && this.$refs.standCrud) {
          this.$refs.standCrud.setCurrentRow(this.chooseTestData.list[0]);
        }
        // });
        this.sloading = false;
      });
    },
    check() {
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        // this.form.orderNo = this.chooseData.poNo;
        this.form.po = this.chooseData.poNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        this.form.issuedDate = this.chooseData.poDate;
        this.form.contractNo = this.chooseData.custContNo;
        getPoDtla({ salPoFk: this.chooseData.salPooid }).then((res) => {
          if (res.data.rows.length) {
            let poDtla = res.data.rows[0];
            this.form.fabricCode = poDtla.fabId;
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    choiceData(val) {
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      val.forEach((item, i) => {
        this.chooseData.list.push({
          yarnCode: item.yarnsId,
          yarnName: item.yarnsName,
          yarnBatch: item.batchNo,
          yarnBrand: item.yarnsCard,
          unit: "KG",
          $cellEdit: true,
        });
      });
      // this.crud.forEach((item, i) => {
      //   item.index = i + 1;
      // });
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
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#dyeNoticeDlg {
  overflow: hidden;

  // .el-form-item__label {
  // font-size: 14px !important;
  // }

  // .avue-form .el-input--mini input {
  // height: 40px !important;
  // line-height: 40px;
  // }

  // .el-form-item--mini .el-form-item__label {
  // line-height: 20px;
  // }
  // .formBox {
  // height: 100vh !important;
  // }
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