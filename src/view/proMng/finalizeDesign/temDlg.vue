<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-15 09:29:37
 * @Description: 
-->
<template>
  <div id="ldOrderDlg">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '定型指令单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <!-- <el-button type="primary" @click="checkOrder">选择织造通知号</el-button> -->
        <el-button
          type="primary"
          @click="checkProcess"
          :disabled="!this.form.finishJobId"
          >生产工艺</el-button
        >
        <el-button
          type="primary"
          @click="checkFormula"
          :disabled="!this.form.finishJobId"
          >后整配方</el-button
        >
        <el-button type="primary" @click="print" :disabled="!form.finishJobId"
          >打印</el-button
        >
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
        <el-col :span="tabs == '生产工艺' ? 12 : 24">
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
                id="otherCrud"
                ref="otherCrud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              >
                <template slot="itemSet" slot-scope="scope">
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input v-model="scope.row.itemSet"></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.itemSet"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>
                <template slot="itemActual" slot-scope="scope">
                  <div v-if="scope.row.dataStyle === 'string'">
                    <!-- string 类型 -->
                    <el-input
                      v-model="scope.row.itemActual"
                      type="number"
                    ></el-input>
                  </div>
                  <div v-else style="text-align: center">
                    <!-- boolean 类型 -->
                    <el-checkbox
                      v-model="scope.row.itemActual"
                      :true-label="1"
                      :false-label="0"
                    ></el-checkbox>
                  </div>
                </template>

                <!-- 物料名称 -->
                <template slot="materialName" slot-scope="{row}">
                  <el-popover
                    placement="left"
                    :title="row.cnnamelong || row.materialName"
                    width="200"
                    trigger="hover">
                      <el-select slot="reference"  v-model="row.materialName"  remote filterable reserve-keyword clearable default-first-option placeholder="请输入物料名称" :loading="vatLoading" :remote-method="remoteMate" @focus="mateFocus(row)" @change="(val) => handleMateChange(val,row)">
                        <el-option v-for="item in mateOption" :key="item.bcCode" :label="item.cnnamelong" :value="item.cnnamelong">
                        </el-option>
                      </el-select>
                  </el-popover>
                </template>

              </avue-crud>
            </div> </view-container
        ></el-col>
        <el-col :span="12" v-if="tabs == '生产工艺'">
          <view-container title="成品规格要求" style="">
            <div style="margin-top: 15px; height: calc(100vh - 100px)">
              <avue-form
                ref="cpform"
                :option="cpForm"
                v-model="form"
              ></avue-form>
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
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud, pfCrud, gyCrud, cpForm } from "./data";
import { getBasChemicalByPage } from "../techCode/api";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getProcess,
  addProcess,
  updateProcess,
  delProcess,
  getFormula,
  addFormula,
  delFormula,
  updateFormula,
  getTechargueList,
  getWeave,
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
      cpForm: cpForm(this),
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: "选择染整工单",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        sortF: "vatNo",
      },
      code: "",
      pfCrud: pfCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",

      // 2022.07.15 ++  Symbol_Yang
      vatLoading: false,
      mateOption:[],
    };
  },
  watch: {},
  methods: {
    // --- 对物料名称列进行自定义 Symbol_Yang 2022.07.15
    mateFocus(row) {
      this.$refs.otherCrud.setCurrentRow(row);
      this.remoteMate( "%" + row.mateName, 'factoryName');
    },

    remoteMate(val,type) {
      this.vatLoading = true;
      getBasChemicalByPage( {[type || 'fillTextSeach'] :  val,  start: 1, rows: 50} ).then((res) => {
        this.mateOption = res.data.records;
        this.vatLoading = false;
      });
    },
    handleMateChange(val,row){
      let item = this.mateOption.find(item => item.cnnamelong == val);
      if(item){
        row.materialCode = item.bcCode
      }
    },

    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.startJobDate = this.$getNowTime("date");
          this.form.proShrinkHangDry = false;
          this.form.proShrinkSafeDry = false;
          this.form.proShrinkThrowDry = false;
          this.form.mustPreshrunk = false;
          this.form.jobCreator = parent.userID;
          this.form.finishJobOption = "成品";
          this.form.dryClothItems = "抓毛";
          // this.form.sendingSampleQuantity = undefined;
          // this.form.sampleQuantity = undefined;
          // this.form.sampleSize = undefined;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        for (let key in this.form) {
          if (
            key === "proShrinkHangDry" ||
            key === "proShrinkSafeDry" ||
            key === "proShrinkThrowDry" ||
            key === "mustPreshrunk"
          ) {
            continue;
          }
          if (this.form[key] == "undefined" || !this.form[key]) {
            delete this.form[key];
          }
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (
                key === "proShrinkHangDry" ||
                key === "proShrinkSafeDry" ||
                key === "proShrinkThrowDry" ||
                key === "mustPreshrunk"
              ) {
                continue;
              }
              if (
                this.form[key] == "undefined" ||
                this.form[key] == undefined
              ) {
                delete this.form[key];
              }
            }
            if (
              this.form.startJobDate &&
              this.form.startJobDate.indexOf(" ") == -1
            ) {
              this.form.startJobDate = this.form.startJobDate + " 00:00:00";
            }
            if (this.form.goodsDate && this.form.goodsDate.indexOf(" ") == -1) {
              this.form.goodsDate = this.form.goodsDate + " 00:00:00";
            }

            this.form.printDate
              ? (this.form.printDate = this.form.printDate + " 00:00:00")
              : "";
            this.form.custName = this.form.$custCode;
            if (this.form.finishJobId) {
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
                  this.form.finishJobId = res.data.data;
                  this.$emit("refresh");
                  done();
                  this.wLoading = false;
                  // this.addPro();
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  done();
                  this.wLoading = false;
                  this.$tip.error(this.$t("public.bcsb"));
                }
                // setTimeout(() => {
                //   this.wLoading = false;

                // }, 200);
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
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proFinishJob/proFinishPdf?id=" +
        this.form.finishJobId;
    },
    addPro() {
      getTechargueList({ paramType: "afterfinish" }).then((res) => {
        res.data.forEach((item, i) => {
          addProcess({
            itemName: item.paramName,
            itemCode: item.paramKey,
            dataStyle: item.paramValueType,
            itemSet: item.paramDefault,
            proFinishJobFk: this.form.finishJobId,
          }).then((pro) => {
            if (i == res.data.length - 1) {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        });
      });
    },
    query() {
      this.crud = [];
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.finishJobId) {
        this.crud = [];
        return;
      } else if (this.tabs == "生产工艺") {
        this.func.get = getProcess;
        this.func.del = delProcess;
        this.func.add = addProcess;
        this.func.update = updateProcess;
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
      } else if (this.tabs == "后整配方") {
        this.func.get = getFormula;
        this.func.del = delFormula;
        this.func.add = addFormula;
        this.func.update = updateFormula;
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
      }
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
            page: this.page.currentPage,
          })
        )
        .then((res) => {
          this.crud = res.data;
          if (this.tabs == "生产工艺") {
            // this.crud = this.crud.sort((a, b) => {
            //   return Number(a.itemCode.replace(/[^0-9]/gi, "")) >
            //     Number(b.itemCode.replace(/[^0-9]/gi, ""))
            //     ? 1
            //     : -1;
            // });
            this.crud = this.crud.sort((a, b) => {
              return a.sn > b.sn ? 1 : -1;
            });
          }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.itemSet == null ? (item.itemSet = undefined) : "";
            item.itemActual == null ? (item.itemActual = undefined) : "";
            item.index = i + 1;
          });
          this.page.total = res.data.total;

          if (this.crud.length > 0) {
            this.$refs.otherCrud.setCurrentRow(this.crud[0]);
          }
          this.loading = false;
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "生产工艺" && !this.crud[i].itemName) {
          this.$tip.error("生产工艺项目不能為空!");
          return;
        }
        if (
          this.tabs == "后整配方" &&
          !this.crud[i].materialCode &&
          !this.crud[i].useAmount
        ) {
          this.$tip.error("后整配方中的物料编号/数量不能为空!");
          return;
        }
      }
      this.dlgLoading = true;
      if (this.tabs == "生产工艺") {
        this.save();
      }
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (item.jobItmeId || item.formulaId) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proFinishJobFk = this.form.finishJobId;
            this.func.add(data).then((res) => {
              item.jobItmeId = res.data.data;
              item.formulaId = res.data.data;
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
    checkOrder() {
      this.choiceTle = "选择织造通知单";
      this.choiceV = true;
    },
    checkProcess() {
      this.tabs = "生产工艺";
      this.crudOp = gyCrud(this);
      this.visible = true;
      this.query();
    },
    checkFormula() {
      this.tabs = "后整配方";
      this.crudOp = pfCrud(this);
      this.visible = true;
      this.query();
    },
    add() {
      if (this.tabs != "后整配方") {
        this.choiceTle = "選擇漂染基礎工藝";
        this.choiceQ.paramType = "afterfinish";
        this.choiceV = true;
      } else {
        this.crud.push({ index: this.crud.length + 1, $cellEdit: true });
      }
    },
    addDtl() {
      this.chooseData.list.push({
        $cellEdit: true,
      });
      this.$refs.pfCrud.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
    },
    del() {
      if (!this.chooseData.jobItmeId && !this.chooseData.formulaId) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.otherCrud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.func
            .del(
              this.tabs == "生产工艺"
                ? this.chooseData.jobItmeId
                : this.chooseData.formulaId
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
      if (!this.chooseDtlData.noticeColorId) {
        this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
        // this.chooseDtlData = {};
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseData.list.length > 0) {
          this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          delColor(this.chooseDtlData.noticeColorId)
            .then((res) => {
              if (res.data.code === 200) {
                // this.query();
                this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
                // this.chooseDtlData = {};
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseData.list.length > 0) {
                  this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
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
        this.tabs == "生产工艺" &&
        this.chooseData.list.length == 0 &&
        this.chooseData.compId
      ) {
        this.getYarnList();
      }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getYarnList() {
      getColor({
        star: 1,
        rows: 999,
        proLdNoticeFabricFk: this.chooseData.compId,
      }).then((res) => {
        let data = res.data.records;
        data.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
          this.chooseData.list.push(Object.assign(item));
        });
        this.chooseData.list = res.data.records;
        if (this.chooseData.list.length > 0) {
          this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
        }
      });
    },
    check() {
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        this.form.orderNo = this.chooseData.poNo;
        this.form.po = this.chooseData.custPoNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        this.form.issuedDate = this.chooseData.poDate;
        this.form.contractNo = this.chooseData.custContNo;
        getPoDtla({ salPoFk: this.chooseData.salPooid }).then((res) => {
          if (res.data.rows.length) {
            let poDtla = res.data.rows[0];
            this.form.fabricCode = poDtla.fabId;
            this.form.greigeFabricLocation = poDtla.fabName;
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择染整工单") {
        this.form.vatNo = val.vatNo;
        this.form.weaveJobCode = val.weaveJobCode;
        this.form.custCode = val.custCode;
        // t.formhis.startJobDate = val.xx;
        this.form.jobAmount = val.clothWeight;
        this.form.salPpAmount = val.poAmountKg;
        this.form.pidCount = val.pidCount;
        this.form.goodsDate = val.deliveDate;
        this.form.vatCount = val.poVatCount;
        this.form.vatIndex = val.vatIndex;
        this.form.deliveryAddress = val.address;
        this.form.colorCode = val.colorCode;
        this.form.colorName = val.colorName;
        this.form.colorCount = val.poColorCount;
        // this.form.dyeAfterBreadth = val.breadth;
        // this.form.dyeAfterWeight = val.gramWeight;
        this.form.fabricName = val.fabName;
        if (val.gramWeightAfter) {
          this.form.dryClothWeight = Number(
            val.gramWeightAfter.match(/\d+/g)[0]
          ); // val.gramWeightAfter;
        }

        this.form.fabricCompone = val.fabElements;

        this.form.proBreadthSide =
          typeof val.breadthBorder === "number"
            ? val.breadthBorder
            : val.breadthBorder
            ? Number(val.breadthBorder.match(/\d+/g)[0])
            : 0; //连边幅宽 breadth_border

        this.form.proBreadthActual =
          typeof val.breadthActual === "number"
            ? val.breadthActual
            : val.breadthActual
            ? Number(val.breadthActual.match(/\d+/g)[0])
            : 0;

        // val.breadthActual.indexOf("(") != -1
        //   ? Number(val.breadthActual.match(/\d+/g)[0])
        //   : val.breadthActual; //实用幅宽 breadthActual

        this.form.proWeightBefore =
          typeof val.gramWeightBefor === "number"
            ? val.gramWeightBefor
            : val.gramWeightBefor
            ? Number(val.gramWeightBefor.match(/\d+/g)[0])
            : 0;

        // val.gramWeightBefor.indexOf("(") != -1
        //   ? Number(val.gramWeightBefor.match(/\d+/g)[0])
        //   : val.gramWeightBefor; //洗前克重 gramWeightBefor

        this.form.proWeightAfter =
          typeof val.gramWeightAfter === "number"
            ? val.gramWeightAfter
            : val.gramWeightAfter
            ? Number(val.gramWeightAfter.match(/\d+/g)[0])
            : 0;

        // val.gramWeightAfter.indexOf("(") != -1
        //   ? Number(val.gramWeightAfter.match(/\d+/g)[0])
        //   : val.gramWeightAfter; //洗后克重 gramWeightAfter

        this.form.calicoBreadth = val.breadthActual;
        this.form.calicoWeight = val.gramWeightBefor;
        // this.form.proWeightAfter = val.gramWeightAfter;
        this.form.proShrinkSafeDry = val.flatDry;
        this.form.proShrinkTwist = val.shrinkNear;
        this.form.proShrinkLoop = val.shrinkRotate;
        this.form.proShrinkHangDry = val.hangDry;
        this.form.yarnCard = val.yarnCard;
        this.form.yarnNumber = val.yarnNumber;
        this.form.yarnCylinderNumber = val.yarnBatchNo;
        getWeave({ weaveJobCode: val.weaveJobCode }).then((res) => {
          if (res.data.length) {
            let data = res.data[0];
            this.form.tubeDiam = data.cylinderInch;
            this.form.needleDist = data.guage;
            this.form.yarnLength = data.yarnLength;
          }
        });
      } else if (this.choiceTle == "選擇漂染基礎工藝") {
        val.forEach((item, i) => {
          let data = {};
          data = {
            itemCode: item.paramKey,
            itemName: item.paramName,
            itemSet: item.paramDefault,
            dataStyle: item.paramValueType,
            sn: item.sn,
            index: this.crud.length + 1,
            $cellEdit: true,
          };
          this.crud.push(data);
        });
        this.crud = this.$unique(this.crud, "itemCode");
        this.crud.forEach((item, i) => {
          // item.sn = i + 1;
          item.index = i + 1;
        });
        this.$nextTick(() => {
          this.$toTableLow(this, "otherCrud");
        });
      } else {
        this.form.colorName = val.colorName;
        this.form.colorCode = val.colorCode;
        this.form.custCode = val.custCode;
        this.form.fabricName = val.fabricDesc;
        this.form.fabricCompone = val.fiberComp;
        this.form.weaveJobCode = val.weaveJobCode;
        this.form.tubeDiam = val.cylinderInch;
        this.form.needleDist = val.guage;
        this.form.yarnLength = val.yarnLength;
        this.form.yarnCard = val.yarnBrand;
        this.form.yarnNumber = val.yarnBatchNo;
        this.form.yarnCylinderNumber = val.yarnCylinder;
        this.form.breadth = Number(val.breadth.replace(/[^0-9]/gi, ""));
        this.form.gramWeight = val.gramWeight;
        this.form.proWeightAfter = val.gramWeight;
        this.form.proShrinkHorizontal = val.horizonShrink;
        this.form.proShrinkVertical = val.verticalShrink;
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
    calculateWater() {
      if (this.chooseData.formulaFactor && this.chooseData.useAmount) {
        this.chooseData.waterAmount =
          this.chooseData.formulaFactor * 1000 * this.chooseData.useAmount;
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
.el-tooltip__popper
  font-size 16px !important
#ldOrderDlg
  overflow hidden
  .el-form-item__label
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
  .avue-group__header
    margin-bottom 15px !important
    // margin-top: -5px;
    height 30px
  .formBox
    height calc(100vh - 75px) !important
    overflow auto
  .el-input-number__decrease, .el-input-number__increase
    display none
  .el-input-number .el-input__inner
    text-align left !important
  .el-input-number.is-controls-right .el-input__inner
    padding-left 5px !important
#colorMng_Dlg
  .is-fullscreen
    overflow hidden !important
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
</style>