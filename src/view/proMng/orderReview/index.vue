<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-16 10:14:39
 * @Description:
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <el-tabs v-model="activeName" type="border-card" @tab-click="query">
      <el-tab-pane label="运转单" name="first">
        <el-row class="btnList">
          <el-button
            type="success"
            @click="pass"
            v-if="form.auditState === 0"
            :disabled="!selectList.length"
            >审核</el-button
          >
          <el-button
            type="success"
            @click="unpass"
            v-if="form.auditState === 1"
            :disabled="!selectList.length"
            >取消审核</el-button
          >
          <el-button
            type="primary"
            @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId"
            >查看</el-button
          >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            :row-style="rowStyle"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
            @sort-change="sortChange"
            @selection-change="selectionChange"
          ></avue-crud>
          <!--    @sort-change="sortChange" -->
        </el-row>
        <el-dialog
          id="colorMng_Dlg"
          :visible.sync="dialogVisible"
          fullscreen
          width="100%"
          append-to-body
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <revolve
            v-if="dialogVisible && activeName == 'first'"
            ref="tem"
            :detail="detail"
            :isAdd="false"
            :copyC="false"
            :audit="true"
            @close="dialogVisible = false"
            @refresh="query"
          ></revolve>
          <weave
            ref="tem"
            :detail="detail"
            :isAdd="false"
            :copyC="false"
            :audit="true"
            @close="dialogVisible = false"
            v-if="dialogVisible && activeName == 'two'"
            @refresh="query"
          ></weave>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="织单" name="two">
        <el-row class="btnList">
          <el-button
            type="success"
            @click="pass"
            v-if="wform.auditState === 0"
            :disabled="!wselectList.length"
            >审核</el-button
          >
          <el-button
            type="success"
            @click="unpass"
            v-if="wform.auditState === 1"
            :disabled="!wselectList.length"
            >取消审核</el-button
          >
          <el-button
            type="primary"
            @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId"
            >查看</el-button
          >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="wformOp" v-model="wform"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="wcrud"
            :option="wcrudOp"
            :data="wcrud"
            :page.sync="wpage"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
            @selection-change="selectionChange"
            @sort-change="sortChange"
          ></avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, mainWForm, mainWCrud } from "./data";
import {
  getDye,
  updateDye,
  addDye,
  getItem,
  addDyeProject,
  getTest,
  addDyeTest,
} from "../revolve/api";
import { get, update, getW, updateW } from "./api";
import revolve from "../revolve/temDlg.vue";
import weave from "../print/proWeaveJob/temDlg.vue";
import { addWash, addDyes, getTechargueList } from "../print/dyeing/api";
export default {
  name: "",
  components: {
    revolve,
    weave,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
        vatNo: "",
        weaveJobCode: "",
      },
      wformOp: mainWForm(this),
      wform: {},
      wcrudOp: mainWCrud(this),
      wcrud: [],
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wpage: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      wselectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      activeName: "first",
    };
  },
  watch: {},
  methods: {
    query() {
      let val = this.sort;
      this.wLoading = true;
      this.detail = {};
      if (this.activeName == "first") {
        if (val && val.prop == "modifiDate") {
          val.prop = "r_modifiDate_r";
        }
        for (let key in this.form) {
          if (
            !this.form[key] &&
            key != "auditState" &&
            key != "vatNo" &&
            key != "weaveJobCode" &&
            key != "salPoNo" &&
            key != "colorCode"
          ) {
            delete this.form[key];
          }
        }
        if (this.form.vatNo.indexOf("%") == -1) {
          this.form.vatNo = "%" + (this.form.vatNo ? this.form.vatNo : "");
        }
        if (this.form.weaveJobCode.indexOf("%") == -1) {
          this.form.weaveJobCode =
            "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
        }
        if (this.form.salPoNo && this.form.salPoNo.indexOf("%") == -1) {
          this.form.salPoNo =
            "%" + (this.form.salPoNo ? this.form.salPoNo : "");
        }
        if (this.form.colorCode && this.form.colorCode.indexOf("%") == -1) {
          this.form.colorCode =
            "%" + (this.form.colorCode ? this.form.colorCode : "");
        }
        if (val) {
          this.form[val.prop] =
            (val.order == "descending" ? "!^" : "^^") +
            (this.form[val.prop] ? this.form[val.prop] : "");
        }

        get(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            pages: this.page.currentPage,
            // isWorkOut: 0,
            // runState: 1,
          })
        ).then((res) => {
          this.crud = res.data.records;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          // this.crud.sort((a, b) => {
          //   return a.vatNo > b.vatNo ? -1 : 1;
          // });
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          if (this.form.vatNo.indexOf("%") != -1) {
            this.form.vatNo = this.form.vatNo.split("%").join("");
          }
          if (this.form.weaveJobCode.indexOf("%") != -1) {
            this.form.weaveJobCode = this.form.weaveJobCode.split("%").join("");
          }
          if (this.form.salPoNo.indexOf("%") != -1) {
            this.form.salPoNo = this.form.salPoNo.split("%").join("");
          }
          if (this.form.colorCode.indexOf("%") != -1) {
            this.form.colorCode = this.form.colorCode.split("%").join("");
          }
          if (val) {
            this.form[val.prop] = this.form[val.prop].replace(
              /[&|\\*^%$ #@!]/g,
              ""
            );
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      } else {
        if (val && val.prop == "upateTime") {
          val.prop = "r_upateTime_r";
        }
        for (let key in this.wform) {
          if (!this.wform[key] && key != "auditState") {
            delete this.wform[key];
          }
        }
        this.wform.weaveJobCode =
          "%" + (this.wform.weaveJobCode ? this.wform.weaveJobCode : "");
        this.wform.salPoNo =
          "%" + (this.wform.salPoNo ? this.wform.salPoNo : "");
        this.wform.colorCode =
          "%" + (this.wform.colorCode ? this.wform.colorCode : "");

        if (val) {
          this.wform[val.prop] =
            (val.order == "descending" ? "!^" : "^^") +
            (this.wform[val.prop] ? this.wform[val.prop] : "");
        }
        getW(
          Object.assign(this.wform, {
            rows: this.wpage.pageSize,
            start: this.wpage.currentPage,
            isWorkOut: 0,
            weaveState: 0,
          })
        ).then((res) => {
          this.wcrud = res.data.records;
          if (this.wcrud.length > 0) {
            this.$refs.wcrud.setCurrentRow(this.wcrud[0]);
          }
          // this.wcrud.sort((a, b) => {
          //   return a.weaveCode > b.weaveCode ? -1 : 1;
          // });
          this.wcrud.forEach((item, i) => {
            item.custName = item.custCode;
            item.index = i + 1;
          });
          this.wpage.total = res.data.total;
          if (this.wform.weaveJobCode.indexOf("%") != -1) {
            this.wform.weaveJobCode =
              this.wform.weaveJobCode.split("%")[1] || "";
          }
          if (this.wform.salPoNo.indexOf("%") != -1) {
            this.wform.salPoNo = this.wform.salPoNo.split("%").join("");
          }
          if (this.wform.colorCode.indexOf("%") != -1) {
            this.wform.colorCode = this.wform.colorCode.split("%").join("");
          }
          if (val) {
            this.wform[val.prop] = this.wform[val.prop].replace(
              /[&|\\*^%$ #@!]/g,
              ""
            );
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.dialogVisible = true;
    },
    pass() {
      this.$tip
        .cofirm("是否确定通过审核选中的数据?")
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 1;
              item.modifiDate = this.$getNowTime("datetime");
              // item.runState = "1"
              update(item).then((res) => {
                let data = JSON.parse(JSON.stringify(item));
                data.proBleadyeRunJobFk = data.runJobId;
                data.test = "";
                data.item = "";
                // data.mergVatNo = data.mergVatNo.join("/");
                // data.compLightSource = data.compLightSource.join(",");
                data.dyeJarCount = Number(data.dyeVatType || 0);
                Object.keys(data).forEach((item) => {
                  if (this.isEmpty(data[item])) {
                    delete data[item];
                  }
                });
                // data.clothWeight = data.dyeClothWeight;
                data.poAmountLb = (data.poAmountKg * 2.2046226).toFixed(2);
                getDye({
                  vatNo: data.vatNo,
                }).then((dye) => {
                  if (dye.data.length) {
                    data.bleadyeJobId = dye.data[0].bleadyeJobId;
                    // 存在数据,更新
                    updateDye(data).then((udye) => {
                      this.form.auditState = 1;
                    });
                  } else {
                    // 不存在数据，新增
                    addDye(data).then((adye) => {
                      this.addOtherData(adye.data.data);
                      // 新增生产项目
                      getItem({
                        proBleadyeRunJobFk: data.runJobId,
                      }).then((pres) => {
                        pres.data.forEach((item) => {
                          item.proBleadyeJobFk = adye.data.data;
                          addDyeProject(item).then((pro) => {});
                        });
                      });
                      // 新增测试要求
                      getTest({
                        proBleadyeRunJobFk: data.runJobId,
                      }).then((pres) => {
                        pres.data.forEach((item) => {
                          item.proBleadyeJobFk = adye.data.data;
                          addDyeTest(item).then((pro) => {});
                        });
                      });
                    });
                  }
                });
                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("审核成功!");
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 1;
              item.upateTime = this.$getNowTime("datetime");
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("审核成功!");
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    unpass() {
      this.$tip
        .cofirm("是否确定取消审核选中的数据?")
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 0;
              item.runState = "1"; // 恢复未打印状态
              update(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("取消审核成功!");
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 0;
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("取消审核成功!");
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
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
    addOtherData(dyeId) {
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
                proBleadyeJobFk: dyeId,
                sn: washIndex++,
              }).then((res) => {});
            } else if (item.paramType === "dyevat") {
              // 染缸
              addDyes({
                vatParamCode: item.paramKey,
                vatParamName: item.paramName,
                dataStyle: item.paramValueType,
                sn: dyeIndex++,
                proBleadyeJobFk: dyeId,
              }).then((res) => {});
            }
          });
        })
        .catch((e) => {
          this.wLoading = false;
        });
    },
    cellClick(val) {
      this.detail = val;
    },
    sortChange(val) {
      if (
        val.order &&
        (val.prop == "modifiDate" ||
          val.prop == "vatNo" ||
          val.prop == "upateTime" ||
          val.prop == "weaveJobCode")
      ) {
        this.sort = val;
        this.query();
      } else {
        this.sort = {};
      }
    },
    selectionChange(list) {
      if (this.activeName == "first") {
        this.selectList = list;
      } else {
        this.wselectList = list;
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.crud.doLayout();
    });
  },
  created() {
    this.form.auditState = 0;
    this.wform.auditState = 0;
  },
  mounted() {
    // this.$nextTick(() => {
    // setTimeout(() => {
    // this.detail = {};
    // }, 200);
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
  .avue-crud__menu
    height 35px !important
  .avue-dialog .el-drawer__body
    overflow auto
.avue-crud__dialog .el-transfer-panel__body
  height 80% !important
</style>
