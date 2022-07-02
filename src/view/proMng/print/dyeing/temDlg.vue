<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 10:39:06
 * @Description: 
-->
<template>
  <div id="dyeing">
    <view-container :title="(isAdd ? '新增' : '修改') + '染整工单'" :element-loading-text="$t('public.loading')" v-loading="wLoading" class="not-number-icon">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="setMerge" :loading="wLoading">{{
            $t("public.save")
          }}</el-button>
        </el-tooltip>

        <!-- <el-button type="primary" @click="checkOrder">选择订单号</el-button> -->
        <el-tooltip class="item" effect="dark" content="Mục sản xuất" placement="top-start">
          <el-button type="primary" @click="checkProject" :disabled="!this.form.bleadyeJobId">生产项目</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" Yêu cầu kiểm tra" placement="top-start">
          <el-button type="primary" @click="checkTest" :disabled="!this.form.bleadyeJobId">測試要求</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Tham số máy dài" placement="top-start">
          <el-button type="primary" @click="checkCar" :disabled="!this.form.bleadyeJobId">长车加工项目</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Tham  số  bồn  nhuộm" placement="top-start">
          <el-button type="primary" @click="checkstrain" :disabled="!this.form.bleadyeJobId">染缸參數</el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Mục sản xuất" placement="top-start">
          <el-button type="primary" @click="checkTechItem" :disabled="!this.form.bleadyeJobId">生產工藝</el-button>
        </el-tooltip>
        <!-- <el-button type="primary" @click="setPreview">预览</el-button> -->
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="success" @click="print" :disabled="!form.bleadyeJobId">打印</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="success" @click="printOther(1)" :disabled="!form.bleadyeJobId" :loading="wLoading">打印工艺</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="success" @click="printOther(2)" :disabled="!form.bleadyeJobId" :loading="wLoading">打印染缸参数</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </el-tooltip>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="mergVatNo">
            <el-select v-model="form.mergVatNo" filterable remote clearable default-first-option placeholder="请输入缸号" multiple :remote-method="remoteMethod" :loading="vatLoading">
              <el-option v-for="item in vatOptions" :key="item.runJobId" :label="item.vatNo" :value="`${item.vatNo}:${item.runJobId}`" :disabled="item.vatNo == form.vatNo">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
    </view-container>
    <el-dialog :visible.sync="visible" fullscreen :close-on-press-escape="false" append-to-body id="viewDlg" :element-loading-text="$t('public.loading')" v-loading="dlgLoading" v-if="visible">
        <div v-resize :style="{ width:tabs == '生產工藝' ? '50%' : '100%'}">
          <view-container :title="tabs"  >
            <div class="btnList">
              <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
                <el-button @click="saveOther" type="success">{{
                  $t("public.save")
                }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="add" type="primary">{{
                  $t("public.add")
                }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="del" type="danger" :disabled="Object.keys(chooseData).length == 0">{{ $t("public.del") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="in" placement="top-start">
                <el-button @click="printGy" type="primary" :disabled="printList.length == 0">打印</el-button>
              </el-tooltip>
              <el-button @click="copyGy" type="primary" v-if="tabs == '生產工藝'">复制工艺</el-button>
              <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                <el-button @click="visible = false" type="warning">{{
                  $t("public.close")
                }}</el-button>
              </el-tooltip>

              <span style="margin-left: 10px" v-if="tabs == '生產工藝'">
                自动计算</span>

              <el-switch v-if="tabs == '生產工藝'" v-model="mathCtr" active-color="#13ce66" inactive-color="#ccc">
              </el-switch>
              <el-tag style="font-size: 17px; margin-left: 10px" v-if="tabs == '生產工藝'">
                重量:{{ detail.clothWeight }}</el-tag>
              <el-tag style="font-size: 17px" v-if="tabs == '生產工藝'">
                合缸重量:{{ vatWeight }}</el-tag>

              <!-- <span> </span> -->
            </div>
            <div class="crudBox">
              <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick" @selection-change="selectionChange">
                <template slot="bleachSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.bleachSet" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.bleachSet" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="bleachFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.bleachFact" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.bleachFact" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="dyeSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.dyeSet" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.dyeSet" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="dyeFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.dyeFact" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.dyeFact" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="soapSet" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.soapSet" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.soapSet" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
                <template slot="soapFact" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.soapFact" type="number"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox v-model="scope.row.soapFact" :true-label="1" :false-label="0"></el-checkbox>
                  </div>
                </template>
              </avue-crud>
            </div>
          </view-container>
        </div>
        <div v-if="tabs == '生產工藝'">
          <view-container title="工藝明細">
            <div class="btnList">
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="addDtl" type="primary" :disabled="Object.keys(chooseData).length == 0">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="delDtl" type="danger" :disabled="Object.keys(chooseDtlData).length == 0">{{ $t("public.del") }}</el-button>
              </el-tooltip>
              <el-button @click="up" type="primary" :disabled="Object.keys(chooseDtlData).length == 0">上移</el-button>
              <el-button @click="down" type="primary" :disabled="Object.keys(chooseDtlData).length == 0">下移</el-button>
            </div>
            <div class="formBox"></div>
            <div class="crudBox">
              <avue-crud ref="yarnCrud" :option="codeItemCrud" :data="chooseData.list" @on-load="query" @current-row-change="cellDtlClick">
                <template slot="mateName" slot-scope="scope">
                  <el-popover
                    placement="left"
                    :title="scope.row.cnnamelong || scope.row.mateName"
                    width="200"
                    trigger="hover">
                      <el-select slot="reference"  v-if="scope.row.bleadyeType != 'run'" v-model="scope.row.mateName"  remote filterable reserve-keyword clearable default-first-option placeholder="请输入材料信息" :loading="vatLoading" :remote-method="remoteMate" @focus="mateFocus(scope.row)" @change="mateChange">
                        <el-option v-for="item in mateOption" :key="item.bcCode" :label="item.factoryName" :value="item.factoryName">
                        </el-option>
                      </el-select>
                  </el-popover>
                  <el-input v-if="scope.row.bleadyeType == 'run'" v-model="scope.row.mateName"></el-input>
                </template>
                <template slot="formulaUnit" slot-scope="scope">
                  <!-- {{ scope.row.dataStyle }} -->
                  <div v-if="scope.row.measureType === 'g/L'">
                    <!-- string 类型 -->
                    <el-select v-model="scope.row.formulaUnit" placeholder=" " @change="unitCtr(scope)" :disabled="scope.row.bleadyeType != 'run'">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else style="text-align: center">
                    <el-select v-model="scope.row.formulaUnit" placeholder=" " @change="unitCtr(scope)" :disabled="scope.row.bleadyeType != 'run'">
                      <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </template>
                <template slot="bleadyeType" slot-scope="scope">
                  <!-- string 类型 -->
                  <el-select v-model="scope.row.bleadyeType" placeholder=" " @change="bleadyeTypeChange(scope)">
                    <el-option v-for="item in bleadyeType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <!-- <template slot="mateName" slot-scope="scope">
                  <input
                    v-model="scope.row.mateName"
                    class="scope-input"
                    @click="selectValue($event)"
                  ></input>
                </template> -->
                <template slot="mateBatchNo" slot-scope="scope">
                  <input v-model="scope.row.mateBatchNo" class="scope-input" @click="selectValue($event)"></input>
                </template>
                <template slot="formulaAmount" slot-scope="scope">
                  <input v-model="scope.row.formulaAmount" class="scope-input" type="number" @click="selectValue($event)" @change="changeAmount"></input>
                </template>
                <template slot="useAmount" slot-scope="scope">
                  <input v-model="scope.row.useAmount" class="scope-input" :max="10" type="number" @click="selectValue($event)"></input>
                </template>
                <template slot="runTemp" slot-scope="scope">
                  <input v-model="scope.row.runTemp" class="scope-input" type="number" @click="selectValue($event)"></input>
                </template>
                <template slot="runTime" slot-scope="scope">
                  <input v-model="scope.row.runTime" class="scope-input" type="number" @click="selectValue($event)"></input>
                </template>
                <template slot="dilutionRate" slot-scope="scope">
                  <input v-model="scope.row.dilutionRate" class="scope-input" type="number" @click="selectValue($event)"></input>
                </template>
                <template slot="deliveryQuantity" slot-scope="scope">
                  <input v-model="scope.row.deliveryQuantity" class="scope-input" type="number" @click="selectValue($event)"></input>
                </template>
              </avue-crud>
            </div>
          </view-container>
        </div>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData" @close="choiceV = false" v-if="choiceV"></choice>
    <select-process :choiceV="choiceP" @choiceData="choiceData" @close="choiceP = false" v-if="choiceP"></select-process>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="打印預覽">
        <!-- <div class="btnList">
            <el-button type="warning" @click="pdfDlg = false">{{
              this.$t("public.close")
            }}</el-button>
            <el-button type="primary" @click="print2">打印</el-button>
          </div> -->
        <!--startprint-->
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
        <!--endprint-->
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { getBasChemicalByPage, getBasPigmentByPage } from "../../techCode/api";
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
  getRevolveList,
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
  addDyes,
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
  getRunJob,
  getBleadyeJobMerge,
  updateBleadyeJobMerge,
  addBleadyeJobMerge,
  delBleadyeJobMerge,
} from "./api";
import { getTest as getTestList, getItem } from "../../revolve/api";
import SelectProcess from "./selectProcess.vue";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    revolve: Object,
    copyCtr: Boolean,
  },
  components: {
    choice: choice,
    SelectProcess,
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
      vatLoading: false,
      searchLoading: false,
      choiceP: false,
      vatOptions: [],
      mateOption: [],
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
      pdfDlg: false,
      pdfUrl: "",
      bleadyeType: [
        {
          label: "增加助剂",
          value: "add_chemicalmat",
        },
        {
          label: "增加颜料",
          value: "add_pigment",
        },
        {
          label: "运行",
          value: "run",
        },
      ],
      printList: [],
    };
  },
  watch: {},
  methods: {
    mateFocus(val) {
      this.$refs.yarnCrud.setCurrentRow(val);
      this.remoteMate( "%" + val.mateName, 'factoryName');
    },
    // handleMatNameChange(val) {
    //   this.chooseDtlData.basMateId = val.split("——")[0];
    //   // this.chooseData.mateName = val.split("-")[1];
    // },
    remoteMate(val,type) {
      if (this.chooseDtlData.bleadyeType == "run") {
        return;
      }
      this.vatLoading = true;
      let fetchF = null;
      if (this.chooseDtlData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF( {[type || 'fillTextSeach'] :  val,  start: 1, rows: 50} ).then((res) => {
        this.mateOption = res.data.records;
        this.vatLoading = false;
      });
    },
    mateChange(val){
      if(!val){
        this.chooseDtlData.mateCode = ''
        this.chooseDtlData.mateName = ''
        this.chooseDtlData.cnnamelong = ''
        return;
      }
      if (this.chooseDtlData.bleadyeType == "run") {
        return;
      }
      let fetchF = null;
      if (this.chooseDtlData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF({factoryName: "%" + val,  start: 1, rows: 50}).then((res) => {
        if(res.data.total == 1){
          this.$nextTick(() =>{
            this.$set(this.chooseDtlData, "mateCode", res.data.records[0].bcCode)
            this.$set(this.chooseDtlData, "mateName", res.data.records[0].factoryName)
            this.$set(this.chooseDtlData, "cnnamelong", res.data.records[0].cnnamelong)
          })
        }
      });
    },
    remoteMethod(val) {
      this.vatLoading = true;
      getRunJob({ vatNo: val }).then((res) => {
        this.vatOptions = res.data;
        this.vatLoading = false;
      });
    },
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
    getCopy() {
      getProject({
        proBleadyeJobFk: this.detail.bleadyeJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        this.form.project = res.data.records;
      });
      getTest({
        proBleadyeJobFk: this.detail.bleadyeJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        this.form.test = res.data.records;
      });
      getDye({
        proBleadyeJobFk: this.detail.bleadyeJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        this.form.dye = res.data.records;
      });
      getWash({
        proBleadyeJobFk: this.detail.bleadyeJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        this.form.wash = res.data.records;
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeJob/buildWorkOrder?id=" +
        this.form.bleadyeJobId;
    },
    printOther(val) {
      if (val == 1) {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder2?id=" +
          this.form.bleadyeJobId;
      } else {
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proBleadyeJob/buildWorkOrder3?id=" +
          this.form.bleadyeJobId;
      }
      this.pdfDlg = true;
    },
    selectValue(e) {
      e.currentTarget.select();
    },
    bleadyeTypeChange(val) {
      if (val.row.bleadyeType == "add_chemicalmat") {
        val.row.formulaUnit = "KG";
      } else if (val.row.bleadyeType == "add_pigment") {
        val.row.formulaUnit = "g";
      }
    },
    changeAmount() {
      let _this = this;
      if (_this.mathCtr) {
        if (!_this.chooseDtlData.measureType) {
          return;
        }
        _this.$nextTick(() => {
          if (
            _this.chooseDtlData.measureType.indexOf("g") == -1 &&
            _this.chooseDtlData.measureType.indexOf("G") == -1
          ) {
            if (_this.chooseDtlData.formulaUnit == "KG") {
              _this.chooseDtlData.useAmount = Number(
                (
                  Number(_this.vatWeight) *
                  Number(_this.chooseDtlData.formulaAmount) *
                  0.01
                ).toFixed(2)
              );
            } else {
              _this.chooseDtlData.useAmount = Number(
                (
                  Number(_this.vatWeight) *
                  Number(_this.chooseDtlData.formulaAmount) *
                  10
                ).toFixed(2)
              );
            }
          } else {
            if (_this.chooseDtlData.formulaUnit == "KG") {
              _this.chooseDtlData.useAmount = Number(
                Number(
                  _this.chooseDtlData.formulaAmount *
                    _this.chooseData.totalWater *
                    0.001
                ).toFixed(2)
              );
            } else {
              _this.chooseDtlData.useAmount = Number(
                Number(
                  _this.chooseDtlData.formulaAmount *
                    _this.chooseData.totalWater
                ).toFixed(2)
              );
            }
          }
          isNaN(_this.chooseDtlData.useAmount)
            ? (_this.chooseDtlData.useAmount = 0)
            : "";
        });
      }
    },
    getData() {
      this.wLoading = true;
      this.form = {};
      if (this.isAdd) {
        if (this.copyCtr) {
          this.form = JSON.parse(JSON.stringify(this.detail));
          this.form.bleadyeJobId = "";
          get({ rows: 10, start: 1, vatNo: "%" + this.form.vatNo + "-" }).then(
            (res) => {
              this.form.vatNo =
                this.form.vatNo + "-" + (res.data.records.length + 1);
            }
          );
          // if (this.form.vatNo.split("-").length <= 2) {
          //   this.form.vatNo = this.form.vatNo + "-1";
          // } else {
          //   this.form.vatNo =
          //     this.form.vatNo.split("-")[0] +
          //     "-" +
          //     this.form.vatNo.split("-")[1] +
          //     "-" +
          //     (Number(this.form.vatNo.split("-")[2]) + 1);
          // }
          this.getCopy();
        } else if (this.revolve.runJobId) {
          getRevolveList({ runJobId: this.revolve.runJobId }).then((res) => {
            let val = res.data[0];
            this.revolve.proBleadyeRunJobFk = val.runJobId;

            if (!(val.mergVatNo instanceof Array) && val.mergVatNo) {
              val.mergVatNo = val.mergVatNo.split("/");
            }
            // val.dyeJarCount = Number(val.dyeVatType);
            // if (!(val.compLightSource instanceof Array) && val.compLightSource) {
            //   val.compLightSource = val.compLightSource.split(",");
            // }
            Object.keys(val).forEach((item) => {
              if (this.isEmpty(val[item])) {
                delete val[item];
              }
            });
            this.form = val;
            this.form.poAmountLb = (this.form.poAmountKg * 2.2046226).toFixed(
              2
            );
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
          });
        } else {
          this.form.workDate = this.$getNowTime();
          this.form.deliveDate = this.$getNowTime();
          this.form.auditState = 0;
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        }
      } else {
        // get({
        //   rows: 10,
        //   start: 1,
        //   bleadyeJobId: this.detail.bleadyeJobId,
        // }).then((res) => {
        //   this.form = res.data.records[0];
        this.form = this.detail;

        Object.keys(this.form).forEach((item) => {
          if (this.isEmpty(this.form[item])) {
            delete this.form[item];
          }
        });
        if (!(this.form.mergVatNo instanceof Array) && this.form.mergVatNo) {
          this.form.mergVatNo = this.form.mergVatNo.split("/");
        }
        this.oldW = Number(this.form.clothWeight || 0);

        // // 获取工艺列表
        // getTechargue({

        // }).then(res =>{

        // })

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
    setMerge() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            Object.keys(this.form).forEach((item) => {
              if (this.isEmpty(this.form[item])) {
                this.form[item] = "";
              }
            });
            isNaN(this.form.clothWeight) ? (this.form.clothWeight = "") : "";
            isNaN(this.form.poAmountKg) ? (this.form.poAmountKg = "") : "";
            isNaN(this.form.poAmountLb) ? (this.form.poAmountLb = "") : "";
            // this.form.gramWeight = Number(this.form.gramWeight);
            // this.form.breadth = Number(this.form.breadth);
            this.form.workDate += " 00:00:00";
            this.form.deliveDate += " 00:00:00";

            let arr = JSON.parse(JSON.stringify(this.form.mergVatNo)); // 合染缸号
            if (arr.length) {
              getRevolveList({ vatNo: this.form.vatNo }).then((revolveRes) => {
                if (revolveRes.data.length) {
                  arr.unshift(
                    `${this.form.vatNo}:${revolveRes.data[0].runJobId}`
                  );
                  // console.log(arr.length);
                  getBleadyeJobMerge({
                    proBleadyeJobFk: this.form.bleadyeJobId,
                  }).then((res) => {
                    // 判断 new list length > old list length ?
                    if (arr.length < res.data.length) {
                      res.data.forEach((item, i) => {
                        if (i <= arr.length - 1) {
                          // 更新缸号

                          if (arr[i].indexOf(":") != -1) {
                            item.proBleadyeRunJobFk = arr[i].split(":")[1]; // 更新运转单号
                            item.vatNo = arr[i].split(":")[0];
                          } else {
                            item.vatNo = arr[i];
                          }
                          item.isBase = item.vatNo == this.form.vatNo ? 1 : 0;
                          updateBleadyeJobMerge(item).then((updateRes) => {
                            if (i == res.data.length - 1) {
                              this.saveWeight(done);
                            }
                          });
                        } else {
                          // 删除多余的数据
                          delBleadyeJobMerge(item.mergeVatId).then((delRes) => {
                            if (i == res.data.length - 1) {
                              this.saveWeight(done);
                            }
                          });
                        }
                      });
                    } else {
                      arr.forEach((item, i) => {
                        if (i <= res.data.length - 1) {
                          let data = res.data[i];
                          //  更新数据

                          if (item.indexOf(":") != -1) {
                            data.proBleadyeRunJobFk = item.split(":")[1]; // 更新运转单号
                            data.vatNo = item.split(":")[0];
                          } else {
                            data.vatNo = item;
                          }
                          data.isBase = data.vatNo == this.form.vatNo ? 1 : 0;
                          updateBleadyeJobMerge(data).then((updateRes) => {
                            if (i == arr.length - 1) {
                              this.saveWeight(done);
                            }
                          });
                        } else {
                          // 新增数据
                          let data = {};
                          data.proBleadyeRunJobFk = item.split(":")[1];
                          data.proBleadyeJobFk = this.form.bleadyeJobId;
                          data.vatNo = item.split(":")[0];
                          data.isBase = data.vatNo == this.form.vatNo ? 1 : 0;
                          addBleadyeJobMerge(data).then((delRes) => {
                            if (i == arr.length - 1) {
                              this.saveWeight(done);
                            }
                          });
                        }
                      });
                    }
                  });
                } else {
                }
              });
            } else {
              //  delete merge list
              getBleadyeJobMerge({
                proBleadyeJobFk: this.form.bleadyeJobId,
              }).then((res) => {
                res.data.forEach((item, i) => {
                  delBleadyeJobMerge(item.mergeVatId).then((delRes) => {});
                });
              });
              getRevolveList({ vatNo: this.form.vatNo }).then((revolveRes) => {
                if (revolveRes.data.length) {
                  this.form.clothWeight = revolveRes.data[0].clothWeight || 0;
                } else {
                  this.form.clothWeight = 0;
                }
                this.save(done);
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
    saveWeight(done) {
      getBleadyeJobMerge({
        proBleadyeJobFk: this.form.bleadyeJobId,
      }).then((newRes) => {
        if (newRes.data.length) {
          // 获取本缸重量
          getRevolveList({ vatNo: this.form.vatNo }).then((revolveRes) => {
            if (revolveRes.data.length) {
              this.form.clothWeight = revolveRes.data[0].clothWeight || 0;
            } else {
              this.form.clothWeight = 0;
            }
            newRes.data.forEach((revolveList, j) => {
              if (revolveList.vatNo != this.form.vatNo) {
                getRevolveList({
                  runJobId: revolveList.proBleadyeRunJobFk,
                }).then((revolveRes1) => {
                  if (revolveRes1.data.length) {
                    this.form.clothWeight +=
                      revolveRes1.data[0].clothWeight || 0;
                    if (j == newRes.data.length - 1) {
                      this.save(done);
                    }
                  }
                });
              } else {
                if (j == newRes.data.length - 1) {
                  this.save(done);
                }
              }
            });
          });
        } else {
          // 获取运转单的重量
          getRevolveList({ vatNo: this.form.vatNo }).then((revolveRes) => {
            if (revolveRes.data.length) {
              this.form.clothWeight = revolveRes.data[0].clothWeight || 0;
            }

            this.save(done);
          });
        }
      });
    },
    save(done) {
      this.$nextTick(() => {
        setTimeout(() => {
          let vat = "";
          if (this.form.mergVatNo) {
            this.form.mergVatNo.forEach((item, i) => {
              if (i == this.form.mergVatNo.length - 1) {
                vat += item.split(":")[0];
              } else {
                vat += item.split(":")[0] + "/";
              }
            });
          }
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
                  this.form.mergVatNo = vat;
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
                                    if (items.measureType.indexOf("%") != -1) {
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
                  if (this.form.mergVatNo) {
                    this.form.mergVatNo = this.form.mergVatNo.split("/");
                  }
                })
                .catch((err) => {
                  this.form.clothWeight = this.oldW;
                  this.form.mergVatNo = vat;
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
                  if (this.form.mergVatNo) {
                    this.form.mergVatNo = this.form.mergVatNo.split("/");
                  }
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
                if (this.form.mergVatNo) {
                  this.form.mergVatNo = this.form.mergVatNo.split("/");
                }
              });
            }
          } else {
            // add
            this.form.createTime = this.$getNowTime("datetime");
            let data = JSON.parse(JSON.stringify(this.form));
            data.project = "";
            data.test = "";
            data.wash = "";
            data.dye = "";
            add(data).then((res) => {
              if (res.data.code == 200) {
                this.oldW = this.form.clothWeight;
                this.form.bleadyeJobId = res.data.data;
                this.addOtherData();
                // getTestList({
                //   proBleadyeRunJobFk: val.runJobId,
                // }).then((res) => {
                //   console.log("test", res);
                // });
                if (this.revolve.runJobId) {
                  // 新增生产项目
                  getItem({
                    proBleadyeRunJobFk: this.revolve.runJobId,
                  }).then((pres) => {
                    pres.data.forEach((item) => {
                      item.proBleadyeJobFk = res.data.data;
                      addProject(item).then((pro) => {});
                    });
                  });
                  // 新增测试要求
                  getTestList({
                    proBleadyeRunJobFk: this.revolve.runJobId,
                  }).then((pres) => {
                    pres.data.forEach((item) => {
                      item.proBleadyeJobFk = res.data.data;
                      addTest(item).then((pro) => {});
                    });
                  });
                }
              } else {
                this.$tip.error(this.$t("public.bcsb"));
                this.wLoading = false;
              }
              done();
            });
          }
          this.remoteMethod("");
        }, 500);
      });

      // if (this.form.mergVatNo) {

      // }
    },
    addOtherData() {
      if (this.copyCtr) {
        // copy  生产项目
        this.form.project.forEach((item) => {
          item.proBleadyeJobFk = this.form.bleadyeJobId;
          addProject(item).then();
        });
        // 测试要求
        this.form.test.forEach((item) => {
          item.proBleadyeJobFk = this.form.bleadyeJobId;
          addTest(item).then();
        });
        // 染缸参数
        this.form.dye.forEach((item) => {
          item.proBleadyeJobFk = this.form.bleadyeJobId;
          addDyes(item).then();
        });
        // 长车
        this.form.wash.forEach((item, i) => {
          item.proBleadyeJobFk = this.form.bleadyeJobId;
          addWash(item).then((res) => {});
        });
        setTimeout(() => {
          this.wLoading = false;
        }, 1000);
      } else {
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
                addDyes({
                  vatParamCode: item.paramKey,
                  vatParamName: item.paramName,
                  dataStyle: item.paramValueType,
                  sn: dyeIndex++,
                  proBleadyeJobFk: this.form.bleadyeJobId,
                }).then((res) => {});
              }
              // else if (item.paramType === "test") {
              //   // 測試要求
              //   addTest({
              //     testItemCode: item.paramKey,
              //     testName: item.paramName,
              //     sn: testIndex++,
              //     proBleadyeJobFk: this.form.bleadyeJobId,
              //   }).then((res) => {});
              // }
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
      }
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
        this.func.add = addDyes;
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
          if (this.tabs == "生產項目") {
            this.crud.sort((a, b) => {
              return a.sn > b.sn ? 1 : -1;
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
          if (this.tabs === "生產工藝") {
            this.$nextTick(() => {
              this.$refs.crud.toggleSelection(this.crud);
            });
          }

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
              // if(item.bleadyeType != 'run'){
              //   let mateData = item.mateName.split("——");
              //   item.basMateId = mateData[0];
              //   item.mateName = mateData[1];
              // }
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
    copyGy() {
      this.choiceTle = "选择染整工单";
      this.choiceP = true;
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
      if (this.chooseData.list.length) {
        this.$refs.yarnCrud.setCurrentRow(this.chooseData.list[0]);
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
    selectionChange(val) {
      this.printList = val;
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
          // if(item.bleadyeType != 'run'){
          //    item.mateName = item.basMateId + "——" + item.mateName;
          // }
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
        this.choiceP = false;
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
            // item.mateName = item.mateName
            // if(item.bleadyeType != 'run'){
            //   item.mateName = item.basMateId + "——" + item.mateName;
            // }
            item.proBleadyeCodeItemFk = item.codeItemIt;
            item.formulaAmount = item.formulaAmount;
            item.formulaUnit = item.formulaUnit;
            if (item.formulaUnit == "g") {
              item.useAmount = Number(
                (
                  Number(this.form.clothWeight) *
                  Number(item.formulaAmount) *
                  1000 *
                  0.01
                ).toFixed(2)
              );
            } else {
              item.useAmount = Number(
                (
                  Number(this.form.clothWeight) *
                  Number(item.formulaAmount) *
                  0.01
                ).toFixed(2)
              );
            }

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
      } else if (this.choiceTle == "選擇工藝材料") {
        if (!val.length) {
          return;
        }
        this.dlgLoading = true;
        val.forEach((item, i) => {
          item.index = this.chooseData.list.length + 1;
          item.sn = this.chooseData.list.length + 1;
          item.$cellEdit = true;
          // if(item.bleadyeType != 'run'){
          //    item.mateName = item.basMateId + "——" + item.mateName;
          // }
          // item.mateCode = item.basMateId;
          // item.mateName = item.basMateId + '——' + item.mateName
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
          if (this.chooseDtlData.index) {
            this.chooseData.list.splice(this.chooseDtlData.index + i, 0, data);
          } else {
            this.chooseData.list.push(data);
          }
        });
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
          item.sn = i + 1;
        });
        this.$refs.yarnCrud.setCurrentRow(
          this.chooseData.list[this.chooseData.list.length - 1]
        );
        this.dlgLoading = false;
      } else if (this.choiceTle == "选择染整运转单") {
        // val.shrinkLenth = isNaN(val.verticalShrink) ? 0 : val.verticalShrink;
        // val.shrinkWidth = isNaN(val.horizonShrink) ? 0 : val.horizonShrink;
        // val.clothWeight = isNaN(val.amount) ? 0 : val.amount;
        if (!(val.mergVatNo instanceof Array) && val.mergVatNo) {
          val.mergVatNo = val.mergVatNo.split("/");
        }
        // val.dyeJarCount = Number(val.dyeVatType);
        // if (!(val.compLightSource instanceof Array) && val.compLightSource) {
        //   val.compLightSource = val.compLightSource.split(",");
        // }
        Object.keys(val).forEach((item) => {
          if (this.isEmpty(val[item])) {
            delete val[item];
          }
        });
        this.form = val;
        this.form.poAmountLb = (this.form.poAmountKg * 2.2046226).toFixed(2);
        // this.form.breadthUnit = this.form.breadth.replace(/[^a-z]+/gi, "");
        // this.form.breadth = Number(this.form.breadth.replace(/[^0-9]/gi, ""));

        // this.getOther();
      } else if (this.choiceTle == "選擇生产项目") {
        val.forEach((item, i) => {
          this.crud.push({
            jobItemName: item.stepName,
            $cellEdit: true,
            // sn: item.sn,
            sn:
              this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
          });
        });
      } else if (this.choiceTle == "選擇漂染基礎工藝") {
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
      } else {
        this.dlgLoading = true;
        getTechargue({ proBleadyeJobFk: val.bleadyeJobId }).then((res) => {
          let data = res.data.records;
          data = data.sort((a, b) => {
            return a.sn > b.sn ? 1 : -1;
          });
          data.forEach((item, i) => {
            item.$cellEdit = true;
            item.sn = this.crud.length + i + 1;
            item.index = item.sn;
            item.bleadyeName = item.proBleadyeTechCodeFk;
            item.totalWater = Number(
              Number(this.vatWeight) * Number(item.liquorRatio).toFixed(0)
            );
            item.haltWater = Number(
              Number(item.totalWater) -
                Number(item.wetClothWater) * 0.01 * this.vatWeight -
                Number(item.shotgunWater)
            ).toFixed(0);

            item.totalWater = item.totalWater.toFixed(0);
            getTechItem({
              proBleadyeJobTechargueFk: item.jobTechId,
              star: 1,
              rows: 999,
            }).then((tech) => {
              item.list = tech.data.records.sort((a, b) => {
                return a.sn > b.sn ? 1 : -1;
              });
              item.jobTechId = "";
              item.list.forEach((techItem, j) => {
                techItem.index = i + 1;
                techItem.techItemId = "";
                techItem.$cellEdit = true;
                if (this.mathCtr && techItem.measureType) {
                  if (
                    techItem.measureType.indexOf("g") == -1 &&
                    techItem.measureType.indexOf("G") == -1
                  ) {
                    if (techItem.formulaUnit == "KG") {
                      techItem.useAmount = Number(
                        (
                          Number(this.form.clothWeight) *
                          Number(techItem.formulaAmount) *
                          0.01
                        ).toFixed(2)
                      );
                    } else {
                      techItem.useAmount = Number(
                        (
                          Number(this.form.clothWeight) *
                          Number(techItem.formulaAmount) *
                          10
                        ).toFixed(2)
                      );
                    }
                  } else {
                    if (techItem.formulaUnit == "KG") {
                      techItem.useAmount = Number(
                        Number(
                          techItem.formulaAmount * item.totalWater * 0.001
                        ).toFixed(2)
                      );
                    } else {
                      techItem.useAmount = Number(
                        Number(
                          techItem.formulaAmount * item.totalWater
                        ).toFixed(2)
                      );
                    }
                  }
                }
                isNaN(techItem.useAmount) ? (techItem.useAmount = 0) : "";
                if (i == data.length - 1 && j == item.list.length - 1) {
                  this.$nextTick(() => {
                    // data.forEach((items, i) => {
                    //   this.crud.push(items);
                    // });
                    this.crud = this.crud.concat(data);

                    this.page.total = this.crud.length;
                    setTimeout(() => {
                      this.$refs.crud.setCurrentRow(this.crud[0]);
                      this.dlgLoading = false;
                    }, 200);
                  });
                }
              });
              if (!item.list.length && i == data.length - 1) {
                this.$nextTick(() => {
                  data.forEach((items, i) => {
                    this.crud.push(items);
                  });
                  this.$refs.crud.setCurrentRow(this.crud[0]);
                  this.dlgLoading = false;
                  this.page.total = this.crud.length;
                });
              }
            });
          });
          if (!data.length) {
            this.dlgLoading = false;
          }
          /* 
          // setTimeout(() => {
          //   // this.$nextTick(() => {
          //   // this.crud = this.crud.concat(data);
          //   // if (this.crud.length > 0) {
          //   // }
          //   // });
          // }, 500); */
        });
      }
      this.choiceV = false;
      this.choiceP = false;
    },
    printGy() {
      if (this.printList.length) {
        this.wLoading = true;
        this.$nextTick(() => {
          let uuidList = [];
          this.printList.forEach((item, i) => {
            uuidList.push(item.jobTechId);
            if (i == this.printList.length - 1) {
              this.pdfUrl =
                process.env.API_HOST +
                "/api/proBleadyeJob/buildWorkOrder4?jobTechId=" +
                uuidList;
              this.wLoading = false;
              this.pdfDlg = true;
            }
          });
        });
      } else {
        this.$tip.warning("请勾选要打印的工艺!");
      }
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
  mounted() {
    this.vatLoading = true;
    this.getData();
    this.remoteMethod("");
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.crudBox {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.el-tag--mini {
  height: 28px !important;
  // padding: 0 5px;
  line-height: 28px !important;
  font-size: 14px;
}
.scope-input {
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 5px !important;
  width: 100%;
}

.avue-crud__tip {
  display: none !important;
}

#dyeing {
  
  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-group__header {
    margin-bottom: 10px;
    height: 30px;
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