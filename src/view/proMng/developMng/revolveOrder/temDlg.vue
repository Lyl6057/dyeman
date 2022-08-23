<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-22 09:28:52
 * @Description:
-->
<template>
  <div id="revolve">
    <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="染整工单">
        <div class="btnList">
          <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
        </div>
        <el-row>
          <el-col :span="10">
            <view-container title="收单日志">
              <avue-crud ref="jdCrud" id="jdCrud" style="margin: 5px" :option="jdOp" :data="jd" v-loading="sloading">
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="14">
            <view-container title="流程图">
              <div style=" overflow: scroll;">
                <flow-chart-pro ref="flowchartpro" v-model="fk"></flow-chart-pro>
              </div>
            </view-container>
          </el-col>
        </el-row>
      </view-container>
    </el-dialog>

    <view-container :title="(isAdd ? '新增' : '修改') + '染整生产运转单'" :element-loading-text="$t('public.loading')" v-loading="wLoading" class="not-number-icon">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="handleSave" v-if="!audit" :loading="wLoading" :disabled="
            form.auditState == 1 && (form.runState == 1 || form.runState == 3)
          ">{{ $t("public.save") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="primary" @click="print" :disabled="
            !form.runJobId || form.runState == 0
          ">打印</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Nhận đơn" placement="top-start">
          <el-button type="primary" @click="dialogVisible = true" :disabled="!fk">收单日志</el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{this.$t("public.close") }}</el-button>
        </el-tooltip>
      </div>

      <el-row class="formBox" style="width: 100%">
        <el-col :span="6">
          <view-container title="胚布细码 Chi tiết vải mộc">
            <avue-crud ref="bf" id="bf" :option="bfOp" :data="form.bf" v-loading="bfLoading"></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="18">
          <view-container title="运转单信息">
            <div style="height: calc(100vh - 145px); overflow: auto">
              <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 5px">
                <template slot-scope="scope" slot="weaveJobCode">
                  <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable default-first-option placeholder="请输入织单号" :remote-method="remoteMethod" :loading="vatLoading" @change="codeChange">
                    <el-option v-for="item in options" :key="item.weaveJobCode" :label="item.weaveJobCode" :value="item.weaveJobCode">
                    </el-option>
                  </el-select>
                </template>
              </avue-form>
              <el-row>
                <el-col :span="14">
                  <view-container title="测试标准 Yêu cầu kiểm tra">
                    <div class="btnList" style="font-size: 24px; color: #409eff; cursor: pointer">
                      <i class="el-icon-circle-plus-outline" @click="addOther(true)"></i>
                      <i class="el-icon-remove-outline" @click="del('test')"></i>
                    </div>
                    <avue-crud ref="test" id="test" :option="testOp" :data="form.test" v-loading="bfLoading" @current-row-change="cellTestClick"></avue-crud>
                  </view-container>
                </el-col>
                <el-col :span="10">
                  <view-container title="生产项目 Mục sản xuất">
                    <div class="btnList" style="font-size: 24px; color: #409eff; cursor: pointer">
                      <i class="el-icon-circle-plus-outline" @click="addOther(false)"></i>
                      <i class="el-icon-remove-outline" @click="del('item')"></i>
                    </div>
                    <avue-crud ref="item" id="item" :option="itemOp" :data="form.item" v-loading="bfLoading" @current-row-change="cellItemClick"></avue-crud>
                  </view-container>
                </el-col>
              </el-row>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfClose">
      <view-container title="打印預覽">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="splitDlg" width="60%" top="5vh" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" v-if="splitDlg">
      <view-container title="拆缸預覽" v-loading="vatLoading" style="height: 1calc (100vh - 80px)">
        <div class="btnList">
          <el-button type="success" @click="saveSplite">保存</el-button>
          <el-button type="warning" @click="splitDlg = false">关闭</el-button>
          <span style="margin-left: 10px; font-size: 15px">拆缸缸号:</span>
          <el-select v-model="splitVatNo" filterable remote reserve-keyword clearable default-first-option placeholder="请输入缸号" :remote-method="vatMethod" @change="vatChange">
            <el-option v-for="item in vatList" :key="item.runJobId" :label="item.vatNo" :value="item.vatNo" :disabled="item.vatNo == form.vatNo">
            </el-option>
          </el-select>
        </div>
        <el-transfer filterable v-model="checkData" filter-placeholder="关键字搜索" :data="finishedNotes" :props="{
          key: 'cardId',
          label: 'productNo',
        }" :titles="[splitVatNo || '拆缸缸号', form.vatNo]" style="margin-top: 10px"></el-transfer>
      </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData" @close="closeChoice" v-if="choiceV"></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { dlgCrud as dlgCrudR } from "../../dptReciveLog/data";
import flowChartPro from "@/components/flowChart2Pro/index.vue";
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  bfOp,
  testOp,
  itemOp,
  cpbOp,
} from "./data";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import {
  get,
  add,
  update,
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
  getGroup,
  getYarn,
  getWeave,
  getFinishList,
  updateFinished,
  fetchTestStandardData,
} from "../../revolve/api";

import { get as getRL, getLog } from "../../dptReciveLog/api";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    isSplit: Boolean,
    copyC: Boolean,
    audit: Boolean,
    splitType: String,
  },
  components: {
    choice: choice,
    flowChartPro,
  },
  data() {
    return {
      finishedNote: [],
      vatList: "",
      finishedNotes: [],
      checkData: [],
      checked: [],
      splitVatNo: "",
      splitDlg: false,
      wLoading: false,
      sloading: false,
      splitLoading: false,
      formOp: mainCrud(this),
      form: {
        forClothLockJoin: false,
        forClothTurnOver: false,
        forClothTogetherVat: false,
        forClothOrderHair: false,
        forClothAgainstHair: false,
        packGw: false,
        packNw: false,
        firstOrOther: "2",
        avgEachWeightKg: 58,
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
      jdOp: dlgCrudR(this),
      crudOp: dlgCrud(this),
      crud: [],
      jd: [],
      fk: "",
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
      cpbOp: cpbOp(this),
      bfOp: bfOp(this),
      bfLoading: false,
      testOp: testOp(this),
      itemOp: itemOp(this),
      choosetestData: {},
      chooseitemData: {},
      pdfDlg: false,
      pdfUrl: "",
      vatLoading: false,
      options: [],
      hasFinied: 0,
      dialogVisible: false,
    };
  },
  watch: {},
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getWeave({
        weaveJobCode: "!^%" + val,
        rows: 10,
        start: 1,
        isWorkOut: 0,
        // jobType: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.weaveJobCode = res.data.records[0].weaveJobCode;
            setTimeout(() => {
              this.codeChange();
            }, 200);
          }
        });
      });
    },
    vatMethod(val) {
      get({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      }).then((res) => {
        this.vatList = res.data.records;
      });
    },
    splitHandle() {
      if (!this.checkData.length) {
        this.getFinish();
      }
      this.splitDlg = true;
    },
    getFinish() {
      this.checkData = [];
      getFinishList({ vatNo: this.form.vatNo, cardType: 1 }).then((res) => {
        res.data.sort((a, b) => {
          return a.productNo > b.productNo ? 1 : -1;
        });
        this.finishedNotes = this.finishedNotes.concat(res.data);
        res.data.forEach((item) => {
          this.checkData.push(item.cardId);
        });
      });
    },
    saveSplite() {
      this.vatLoading = true;
      let data = [];
      this.finishedNotes.forEach((item) => {
        if (this.checkData.indexOf(item.cardId) != -1) {
          data.push(item);
        }
      });
      data.forEach((item, i) => {
        item.vatNo = this.form.vatNo;
        updateFinished(item).then((res) => {
          if (i == data.length - 1) {
            this.vatLoading = false;
            this.$tip.success("保存成功!");
            this.vatChange();
          }
        });
      });
    },
    vatChange() {
      this.checked = [];
      this.finishedNotes = [];
      this.splitLoading = true;
      getFinishList({
        vatNo: this.splitVatNo,
        cardType: 1,
        // delFlag: "",
      }).then((res) => {
        this.finishedNotes = res.data.sort((a, b) => {
          return a.productNo > b.productNo ? 1 : -1;
        });
        this.getFinish();
      });
    },
    async codeChange() {
      if (!this.form.weaveJobCode) {
        return;
      }
      this.wLoading = true;
      await getWeave({
        weaveJobCode: this.form.weaveJobCode,
        isWorkOut: 0,
        rows: 10,
        start: 1,
      }).then((res) => {
        if (res.data.records.length > 0) {
          let item = res.data.records[0];
          this.form.salPoNo = this.form.salPoNo || item.salPoNo;
          this.form.custPoNo = this.form.custPoNo|| item.custPoNo;
          this.form.contractNo = this.form.contractNo || item.contractNo;
          this.form.colorName = this.form.colorName || item.colorName;
          this.form.colorCode = this.form.colorCode ||  item.colorCode;
          this.form.custColorNo = this.form.custColorNo || item.custColorNo;
          this.form.colorCode = this.form.colorCode ||  item.colorCode;
          this.form.clothWeight =
            this.form.clothWeight && this.form.clothWeight != "undefined"
              ? this.form.clothWeight
              : isNaN(item.amount)
              ? 0
              : 100;
          this.form.poAmountKg =
            this.form.poAmountKg && this.form.poAmountKg != "undefined"
              ? this.form.poAmountKg
              : this.form.clothWeight;
          this.form.fabName = item.fabricDesc;
          this.form.breadthActual = item.breadth;
          this.form.gramWeightBefor = item.gramWeight;
          this.form.gramWeightAfter = isNaN(item.gramWeight)
            ? 0
            : item.gramWeight;
          this.form.shrinkLenth = item.verticalShrink;
          this.form.shrinkWidth = item.horizonShrink;
          this.form.fabElements = item.fiberComp;
          this.form.needleDist = item.guage;
          this.form.fabricCode = item.custFabricCode;
          this.form.yarnLength = item.yarnLength;
          this.form.breadth = item.breadth;
          this.form.gramWeight = item.gramWeight;
          this.form.yarnBatchNo = item.yarnBatchNo;
          this.form.custCode = item.custCode;
          this.form.auditState = 0;
          this.form.yarnCard = "";
          this.form.yarnNumber = "";
          this.form.yarnCylinder = "";
          this.form.bf = [];
          getGroup({
            proWeaveJobFk: item.weaveJobId,
          }).then((res) => {
            if (res.data.length > 0) {
              getYarn({ proWeaveJobGroupFk: res.data[0].groupId }).then(
                (yarn) => {
                  if (yarn.data.length > 1) {
                    let yIndex = 1;
                    yarn.data.forEach((item, i) => {
                      if (item.yarnBrand) {
                        this.form.yarnCard +=
                          yIndex + "." + item.yarnBrand + " ";
                      }
                      if (item.yarnBatch) {
                        this.form.yarnNumber +=
                          yIndex + "." + item.yarnBatch + " ";
                      }
                      if (item.factoryYarnBatch) {
                        this.form.yarnCylinder +=
                          yIndex + "." + item.factoryYarnBatch + " ";
                      }
                      yIndex++;
                    });
                  } else if (yarn.data.length == 1) {
                    this.form.yarnCard += yarn.data[0].yarnBrand;
                    this.form.yarnNumber += yarn.data[0].yarnBatch;
                    this.form.yarnCylinder += yarn.data[0].factoryYarnBatch;
                  }
                }
              );
            }
          });
          this.getTestStandard();
        }
      });
      setTimeout(() => {
        this.wLoading = false;
      }, 200);
    },
    // 获取测试标准
    getTestStandard() {
      fetchTestStandardData({ poNo: this.form.salPoNo }).then((res) => {
        this.form.test = (res.data || []).map((item, index) => {
          return {
            testItemCode: item.itemName,
            testName: item.itemContent,
            testItemName: item.testStandard,
            dataStyle: "string",
            sn: index + 1,
            $cellEdit: true,
          };
        });
      });
    },
    handleQuery() {
      get({
        rows: 10,
        start: 1,
        runJobId: this.detail.runJobId,
        jobType: 1
      }).then(async (res) => {
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
        let finishRes = await getFinishList({
          vatNo: this.form.vatNo,
          cardType: 1,
        });
        this.formOp.column[2].disabled = finishRes.data.length ? true : false;
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
    },
    getSublist() {
      this.wLoading = true;
      getBf({ proBleadyeRunJobFk: this.form.runJobId }).then((bf) => {
        this.form.bf = bf.data;
        this.form.bf.sort((a, b) => {
          return a.sn - b.sn;
        });
        this.form.bf.forEach((item, i) => {
          item.sn = i + 1;
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
              this.wLoading = false;
            }, 200);
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
        setTimeout(() => {
          baseCodeSupplyEx({ code: "developRunJob" }).then(async (res) => {
            for(let key in this.form) {
                this.form[key] = undefined;
            }
            if (this.copyC) {
              let runJobData = await get({ runJobId: this.detail.runJobId }).then( weave =>{ return weave.data.records });
              if(!runJobData.length) {
                this.$emit("refresh");
                this.$tip.error("该织单异常!");
                this.$emit("close");
                return;
              } 
              this.form = runJobData[0];
              if (this.isSplit) {
                get({ vatNo: "%" + this.form.vatNo + this.splitType, jobType: 1 }).then(
                  (vatList) => {
                    this.form.origVat = this.detail.vatNo;
                    this.form.vatNo =
                      this.form.vatNo +
                      this.splitType +
                      (vatList.data.records.length + 1);
                    this.form.divdVatFlag = 1; // 拆单标志
                  }
                );
              } else {
                this.form.divdVatFlag = 0; // 拆单标志
                this.form.vatNo = "TDF-" + res.data.data;
              }
              this.form.auditState = 0;
              this.form.clothWeight = 0;
              this.form.pidCount = 1;
              Object.keys(this.form).forEach((item) => {
                if (this.isEmpty(this.form[item])) {
                  delete this.form[item];
                }
              });
              if (
                !(this.form.mergVatNo instanceof Array) &&
                this.form.mergVatNo
              ) {
                this.form.mergVatNo = this.form.mergVatNo.split("/");
              }
              if (
                !(this.form.compLightSource instanceof Array) &&
                this.form.compLightSource
              ) {
                this.form.compLightSource =
                  this.form.compLightSource.split(",");
              }
              getItem({ proBleadyeRunJobFk: this.detail.runJobId }).then(
                (item) => {
                  this.form.item = item.data;
                  this.form.item.sort((a, b) => {
                    return a.sn - b.sn;
                  });
                  this.form.item.forEach((item, i) => {
                    item.sn = i + 1;
                    item.itemId = "";
                    item.$cellEdit = true;
                  });
                  if (this.form["item"].length) {
                    this.$refs["item"].setCurrentRow(this.form["item"][0]);
                  }
                  getTest({ proBleadyeRunJobFk: this.detail.runJobId }).then(
                    (test) => {
                      this.form.test = test.data;
                      this.form.test.sort((a, b) => {
                        return a.sn - b.sn;
                      });
                      this.form.test.forEach((item, i) => {
                        item.sn = i + 1;
                        item.jobTestId = "";
                        item.$cellEdit = true;
                      });
                      if (this.form["test"].length) {
                        this.$refs["test"].setCurrentRow(this.form["test"][0]);
                      }
                      setTimeout(() => {
                        this.wLoading = false;
                      }, 500);
                    }
                  );
                }
              );
            } else {
              this.form.vatNo = "TDF-" + res.data.data;
              this.form.workDate = this.$getNowTime();
              this.form.deliveDate = this.$getNowTime();
              this.form.weaveFactoryName = "S.POWER";
              this.form.address = "S.POWER WAREHOUSE";
              this.form.compLightSource = ["H", "G"];
              this.form.throwDry = "3Washing / 3tumble";
              this.form.poVatCount = 1;
              this.form.vatIndex = 1;
              this.form.poColorCount = 1;
              this.form.firstOrOther = "2";
              this.form.auditState = 0;
              this.wLoading = false;
            }
            this.form.bf = [];
            this.form.test = [];
            this.form.item = [];
            
            this.form.salType = "sample";
            this.form.wmUnit = "KG";
            this.form.serviceOperator = parent.userID;
            this.form.runState = "1";
            this.form.runJobId = "";
            this.form.jobType = 1;
          });
        }, 200);
      } else {
        this.handleQuery();
        this.querydptLog();
      }
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
    typeChange() {
      let data = this.form;
      if (!data.remark) data.remark = "";
      let addText = "";
      data.remark = data.remark.replace(/^大货,/, "");
      data.remark = data.remark.replace(/^办单,/, "");
      data.remark = data.remark.replace(/^缸差,/, "");
      data.remark = data.remark.replace(/^头缸,/, "");
      data.remark = data.remark.replace(/^翻单头缸,/, "");

      if (data.salType == "sample") {
        // 判断备注开头是否有办布字样
        const nReg = /^办单/;
        if (!nReg.test(data.remark)) addText += "办单,";
      } else {
        // 判断备注开头是否有大货字样
        const nReg = /^大货/;
        if (!nReg.test(data.remark)) addText += "大货,";
        if (data.firstOrOther == "1") {
          const nReg = /^头缸/;
          if (!nReg.test(data.remark)) addText += "头缸,";
        } else if (data.firstOrOther == "2") {
          const nReg = /^缸差/;
          if (!nReg.test(data.remark)) addText += "缸差,";
        } else {
          const nReg = /^翻单头缸/;
          if (!nReg.test(data.remark)) addText += "翻单头缸,";
        }
      }
      data.remark = addText + data.remark;
    },
    handleSave() {
      this.wLoading = true;
      this.$refs.form.validate(async (valid, done) => {
        if (valid) {
          try {
            Object.keys(this.form).forEach((item) => {
              if (this.isEmpty(this.form[item])) {
                delete this.form[item];
              }
            });
            let data = JSON.parse(JSON.stringify(this.form));
            if (data.clothWeight > data.dyeVatType) {
              this.$tip.warning("合计重量不能大于设定生产机种重量!");
              this.wLoading = false;
              done();
              return;
            }
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
            data.vatNo = data.vatNo.replace(/\s/g, "");
            if (data.runJobId) {
              // update
              data.modifiDate = this.$getNowTime("datetime");
              data.jobModifier = this.$store.state.userOid;
              update(data).then((res) => {
                if (res.data.code == 200) {
                  setTimeout(() => {
                    this.wLoading = false;
                    this.saveTest();
                    this.$emit("refresh");
                    done();
                  }, 200);
                } else {
                  this.wLoading = false;
                  done();
                  this.$tip.error(this.$tip.error(res.data.msg));
                }
              });
            } else {
              // add
              data.createTime = this.$getNowTime("datetime");
              data.jobCreator = this.$store.state.userOid;
              add(data).then((res) => {
                if (res.data.code == 200) {
                  !this.isSplit && baseCodeSupply({ code: "developRunJob" });
                  this.$emit("refresh");
                  this.form.runJobId = res.data.data;
                  this.detail.runJobId = res.data.data;
                  this.saveTest();
                } else {
                  this.$tip.error(res.data.msg);
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
            this.$emit("refresh");
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
        });
      } else {
        this.$emit("refresh");
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    cellItemClick(val) {
      this.chooseitemData = val;
    },
    cellTestClick(val) {
      this.choosetestData = val;
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.$tip.warning("请先选择数据!");
        // this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择织造通知单") {
        if (!val.length) {
          this.$tip.warning("请先选择织单!");
          return;
        }
        let data = "";
        let yIndex = 1;
        val.forEach((item, i) => {
          item.fabName = item.fabricDesc;
          item.breadthActual = item.breadth;
          item.gramWeightBefor = item.gramWeight;
          item.shrinkLenth = item.verticalShrink;
          item.shrinkWidth = item.horizonShrink;
          item.clothWeight = isNaN(item.amount) ? 0 : item.amount;
          item.fabElements = item.fiberComp;
          item.poAmountKg = item.clothWeight;
          item.needleDist = item.guage;
          item.salPoNo = item.salPoNo;
          this.form = item;
          this.form.custPoNo = item.custPoNo;
          this.form.fabricCode = item.custFabricCode;
          this.form.auditState = 0;
          this.form.yarnCard = "";
          this.form.yarnNumber = "";
          this.form.yarnCylinder = "";
          if (val.length > 1) {
            data += i + 1 + "." + item.weaveJobCode + " ";
          } else {
            data = item.weaveJobCode;
          }
          this.form.weaveJobCode = data;
          this.form.bf = [];
          getGroup({
            proWeaveJobFk: item.weaveJobId,
          }).then((res) => {
            if (res.data.length > 0) {
              getYarn({ proWeaveJobGroupFk: res.data[0].groupId }).then(
                (yarn) => {
                  if (yarn.data.length > 1) {
                    yarn.data.forEach((item, i) => {
                      if (item.yarnBrand) {
                        this.form.yarnCard +=
                          yIndex + "." + item.yarnBrand + " ";
                      }
                      if (item.yarnBatch) {
                        this.form.yarnNumber +=
                          yIndex + "." + item.yarnBatch + " ";
                      }
                      if (item.factoryYarnBatch) {
                        this.form.yarnCylinder +=
                          yIndex + "." + item.factoryYarnBatch + " ";
                      }
                      yIndex++;
                    });
                  } else if (yarn.data.length == 1) {
                    this.form.yarnCard += yarn.data[0].yarnBrand;
                    this.form.yarnNumber += yarn.data[0].yarnBatch;
                    this.form.yarnCylinder += yarn.data[0].factoryYarnBatch;
                  }
                }
              );
            }
          });
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
    pdfClose() {
      if (this.form.runState == "1") {
        this.$tip
          .cofirm(
            "是否更新打印状态(có cập nhật trạng thái in mới không)?",
            this,
            {}
          )
          .then(() => {
            update({
              printDate: this.$getNowTime("datetime"),
              modifiDate: this.$getNowTime("datetime"),
              runState: "3",
              runJobId: this.form.runJobId,
            }).then((res) => {
              if (res.data.code == 200) {
                this.$tip.success("保存成功!");
                this.$emit("refresh");
                this.pdfDlg = false;
              } else {
                this.pdfDlg = false;
                this.$tip.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.pdfDlg = false;
          });
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
        obj === "" ||
        obj === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    querydptLog() {
      this.sloading = true;
      getRL(
        Object.assign(
          {
            runJobFk: this.detail.runJobId
          },
          {
            rows: 10,
            page: 1,
            start: 1,
          }
        )
      ).then((res) => {
        if (res.data.records.length == 1) {
          const val = res.data.records[0];
          this.fk = val.runJobId || val.weaveJobId || val.aloYarntestoid;
          getLog({
            runJobId: this.fk,
          }).then((res) => {
            this.jd = res.data;
            this.sloading = false;
          });
        }
      });
    },
  },
  created() { 
  },
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
.el-transfer-panel__body, .el-transfer-panel__list.is-filterable {
  height: calc(100vh - 200px);
}

.el-transfer-panel .el-checkbox__inner {
  height: 16px;
  width: 16px;
}

.el-transfer-panel__filter .el-input__inner {
  font-size: 15px;
}

.el-transfer-panel__filter {
  margin: 5px;
}

.el-transfer-panel {
  width: 250px;
}

.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}

.el-input--mini .el-input__inner {
  height: 33px;
  line-height: 33px;
}

// .el-table__fixed-body-wrapper {
// top: 60px !important;
// }
#revolve {
  .el-radio-group {
    line-height: 20px;
  }

  .el-radio__label {
    font-size: 15px;
  }

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
