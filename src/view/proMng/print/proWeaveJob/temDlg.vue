<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-31 08:52:37
 * @Description: 
-->
<template>
  <div id="proWeaveJob">
    <view-container :title="(isAdd ? '新增' : '修改') + '織造通知單'" :element-loading-text="$t('public.loading')"
      v-loading="wLoading">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="save" title="save" v-if="canSave">{{
              $t("public.save")
          }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Yarn detail" placement="top-start">
          <el-button type="primary" @click="checkYarn" :disabled="!this.form.weaveJobId" v-if="canSave">用紗明細</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="After washing" placement="top-start">
          <el-button type="primary" @click="checkCalico" :disabled="!this.form.weaveJobId" v-if="canSave">洗後規格
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="in" placement="top-start">
          <el-button type="primary" @click="print" :disabled="!this.form.weaveJobId || form.auditState === 0"
            v-if="canSave">打印</el-button>
        </el-tooltip>
        <el-button type="primary" @click="auditHandle(form.auditState ? 0 : 1)" v-if="audit">{{ form.auditState ? "取消审核"
            : "审核"
        }}</el-button>
        <el-button type="danger" @click="handleEditColorDef">适用染色色系定义</el-button>
        <el-button type="primary" :disabled="!this.form.weaveJobId" @click="choiceTle = '选择织造通知单', choiceV = true, choiceQ.sortF = 'weaveJobCode'">复制工艺</el-button>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close"> {{ this.$t("public.close") }}</el-button>
        </el-tooltip>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="gramWeightUnit">
            <div>g/m²</div>
          </template>
          <template slot="operatProcess">
            <el-button type="primary" @click="operatProcessClick">上机工艺</el-button>
          </template>

        </avue-form>
        <weave-dtl ref="weaveDtlRef" v-model="form.contractAmount" :creator="form.creator" />
      </div>
    </view-container>

    <el-dialog :visible.sync="visible" fullscreen append-to-body id="viewDlg"
      :element-loading-text="$t('public.loading')" v-loading="dlgLoading" v-if="visible">
      <el-row>
        <el-col :span="24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button @click="check" type="success" v-if="tabs == '更改紗長'">{{ $t("public.choose") }}
              </el-button>
              <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
                <el-button @click="saveOther" type="success">{{ $t("public.save") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button @click="add" type="primary">{{ $t("public.add") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
                <el-button @click="del" type="danger">{{ $t("public.del") }}</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                <el-button @click="visible = false" type="warning">{{
                    $t("public.close")
                }}</el-button>
              </el-tooltip>
            </div>
            <div class="formBox">
              <avue-form v-if="tabs == '選擇訂單'" ref="dlgform" :option="dlgFormOp" v-model="dlgForm"></avue-form>
            </div>
            <div class="crudBox">
              <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
                @row-dblclick="handleRowDBLClick" @current-row-change="cellClick"></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="打印預覽">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 5rem)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="gytDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="上机工艺维护">
        <technology ref="technology" v-if="gytDlg" :weave="form" @refresh="technologyRefresh" @close="gytDlg = false"></technology>
      </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
      @close="choiceV = false" v-if="choiceV"></choice>


    <div class="other-dtl-wrapper">
      <span style="color: #409eff; font-size: .9375rem; margin-left: 1.25rem" @click.stop="handleOpenWeaEmbDtl">織胚明細</span>
    </div>
    <el-dialog :visible.sync="meaEmbVisible" fullscreen append-to-body :close-on-click-modal="false"
      :close-on-press-escape="false">
      <MeaveEmbyroDtl :weaveJobId="form.weaveJobId" ref="meaveEmbyroDtlRef" @close="meaEmbVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="yarnTestVisible" append-to-body :close-on-click-modal="false"
      :close-on-press-escape="false">
      <YarnTest ref="yarnTestRef" />
    </el-dialog>
    <ColorDefine ref="colorDefineRef" :weaveJobId="form.weaveJobId" />
    <use-yarns ref="useYarns" :weaveJobInfo="form"></use-yarns>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import technology from "./technology"
import WeaveDtl from "./weaveDtl.vue"
import YarnTest from "./yarnTest.vue"
import ColorDefine from "../components/ColorDefine"
import useYarns from "./useYarns"
import {
  mainCrud,
  dlgForm,
  dlgCrud,
  yarnCrud,
  calicoCrud,
  strainCrud,
  groupCrudOp,
} from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getBomFa,
  getLong,
  addLong,
  updateLong,
  delLong,
  getYarn,
  addYarn,
  updateYarn,
  delYarn,
  getGroup,
  addGroup,
  updateGroup,
  delGroup,
  addCalico,
  getCalico,
  updateCalico,
  delCalico,
  addStrain,
  getStrain,
  updateStrain,
  delStrain,
  getMachine,
  addMachine,
  delMachine,
  updateMachine,
  getBom,
  getBomDtlb,
  getBomDtlbSpecs,
  getBomDtlaSpecs,
  getNoteSum,
  get,
  addProEquipmentSchedule,
  fetchEquipmentInfo,
  saveFlatknitByUnCreate
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import preview from "./preview";
import { getBf } from "../clothFly/api";
import v1 from "uuid/v1"
import MeaveEmbyroDtl from "./meaveEmbyroDtl.vue"
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    copyC: Boolean,
    splitW: Boolean,
    audit: Boolean,
    isExtract: Boolean,
    extractRows: Array,
  },
  components: {
    preView: preview,
    choice: choice,
    technology,
    "weave-dtl": WeaveDtl,
    MeaveEmbyroDtl,
    YarnTest,
    ColorDefine,
    useYarns
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this, false),
      form: {
        auditState: 0,
      },
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
      choiceTle: "选择纱线库存",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        fuzzy: "yarnsId,yarnsName,batchNo,locationCode",
        sortF: "yarnsId",
      },
      code: "",
      yarnCrud: yarnCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",
      yarnlist: [],
      canSave: true,
      gytDlg: false,
      refresh: false,

      // 织胚明细 弹出窗状态
      meaEmbVisible: false,
      xiaLanDtls: [],

      // 试纱
      yarnTestVisible: false,
      // 色系定义
      colorNameMap: {},

    };
  },
  watch: {
    crud(n, o) {
      if (this.tabs == "機號信息") {
        this.getMachineList();
      }
    },
  },
  methods: {
    // 色系定义
    handleEditColorDef() {
      this.$refs.colorDefineRef.visible = true;

    },
    // 织胚明细DOM 移动
    meaveDomMove() {
      let meaveDtlBtnDom = document.querySelectorAll(".other-dtl-wrapper")[0];
      let formGroupWrapper = document.querySelectorAll("#proWeaveJob .avue-group__header")[0];
      formGroupWrapper.appendChild(meaveDtlBtnDom)
    },
    // 打开织胚明细界面
    async handleOpenWeaEmbDtl() {
      if (!this.isExtract && !this.form.weaveJobId) return this.$tip.warning("请先保存通知单");
      this.meaEmbVisible = true;
      await this.$nextTick();
      if (this.isExtract) {
        this.$refs.meaveEmbyroDtlRef.extractDtl(this.xiaLanDtls);
      } else {
        this.$refs.meaveEmbyroDtlRef.getDataList();
      }
    },
    getData() {
      if (this.isAdd) {
        this.wLoading = true;
        if (this.splitW) {
          this.form = JSON.parse(JSON.stringify(this.detail));
          delete this.form.levelNo;
          delete this.form.pinColumn;
          delete this.form.totalColumn;
          delete this.form.diskNum;
          delete this.form.syringeNum;
          delete this.form.needlePlaceType;
          getNoteSum({ weaveJobCode: this.detail.weaveJobCode }).then((res) => {
            if (res.data) {
              // realWeight 毛重 clothWeight 净重
              if (this.detail.amount > res.data.clothWeight) {
                this.form.amount = Number(
                  (this.detail.amount - res.data.clothWeight).toFixed(0)
                );
              } else {
                this.form.amount = 0;
                this.canSave = false;
                this.$tip.warning("该织单号织胚数量已完成,不可进行拆单操作!");
              }
            } else {
              this.form.amount = Number((this.detail.amount / 2).toFixed(0));
            }
          });
          let tWeaveJobId = this.form.weaveJobId;
          this.form.weaveJobId = "";
          this.form.weaveState = 0;
          this.form.isWorkOut = 0;
          this.form.auditState = 0;
          this.form.creator = parent.userID || "ADMIN";
          get({ weaveJobCode: "!^%" + this.form.weaveJobCode }).then((res) => {
            this.form.weaveJobCode =
              this.detail.weaveJobCode +
              String.fromCharCode(res.data.records.length + 64);
          }).then(res => {
            this.getWeaveDtlData(tWeaveJobId);
            let params = {
                    proWeaveJobFk: tWeaveJobId
                }
            this.$refs.colorDefineRef.getWeaveDcsByWeaveJobId(params)
          });
        } else {
          baseCodeSupplyEx({ code: "proWeaveJob" }).then((res) => {
            if (this.copyC) {
              this.form = JSON.parse(JSON.stringify(this.detail));
              // this.form.weaveJobCode = this.detail.weaveJobCode + "A";
              this.form.auditState = 0;
              delete this.form.levelNo;
              delete this.form.pinColumn;
              delete this.form.totalColumn;
              delete this.form.diskNum;
              delete this.form.syringeNum;
              delete this.form.needlePlaceType;
            } else {
              this.form.calicoFabricRequire = "开幅";
              this.form.calicoShap = "1";
              this.form.breadthUnit = "INCH";
              this.form.gramWeightUnit = "G/M2";
              this.form.breadthAcceptUnit = " %";
              this.form.gmAcceptUnit = " %";
              this.code = res.data.data;
            }
            this.form.weaveJobId = "";
            this.form.weaveJobCode = "WG-" + res.data.data;
            this.form.weaveState = 0;
            this.form.isWorkOut = 0;
            this.form.auditState = 0;
            this.form.creator = parent.userID;
            this.form.jobType = 2;
          }).then(res => {
            if (this.isExtract) {
              this.analysisExtractData();
            }
          });
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        this.getAllYarn();
        this.getMachineList();
        this.getWeaveDtlData(this.form.weaveJobId);
        // if (this.form.realEnd === "" || this.form.realEnd === null) {
        //   this.form.nowDate = this.form.planEnd.split(" ")[0];
        // } else {
        //   this.form.nowDate = this.form.realEnd.split(" ")[0];
        // }
        // this.form.nowDate = this.getNowTime();
        setTimeout(() => {
          if (this.form.weaveState == "1") {
            if (parent.userID === this.form.creator) {
              this.canSave = true;
            } else {
              this.canSave = false;
            }
          }
          if (this.form.creator != parent.userID) {
            this.formOp.column[this.formOp.column.length - 1].disabled = true;
          }
          this.wLoading = false;
        }, 500);
      }
    },
    // 获取织单明细数据
    getWeaveDtlData(weaveJobId) {
      this.$refs.weaveDtlRef.getWeaveDtlData(weaveJobId)
    },
    // 解析抽取到的数据
    analysisExtractData() {

      let poNoMap = {};
      let contractAmount = 0;
      let xiaLanDtls = [];
      let colorNameEnum = {};

      let dtlCrudData = this.extractRows.map(item => {
        poNoMap[item.poNo] = true;
        if (item.type == 3) {
          xiaLanDtls.push({
            poNo: item.poNo,
            bomId: item.bomId,
            groupNo: item.colorCode
          })
        }
        let weavePoQty = item.poQtyKg - item.weavePoQty
        contractAmount += weavePoQty;
        colorNameEnum[item.colorDept] = true
        return Object.assign({}, item, {
          weavePoQty: weavePoQty,
          $cellEdit: true,
          proWeaveJobGstpodetailoid: v1(),
        });
      });

      // 颜色列表值存储
      this.colorNameMap = colorNameEnum;
      this.$refs.colorDefineRef.setSelColData(this.colorNameMap)

      let poNos = Object.keys(poNoMap).join(",");
      let itemData = this.extractRows[0];
      this.formOp = mainCrud(this, false, true);
      Object.assign(this.form, {
        salPoNo: poNos,
        marketOrder: poNos,
        custCode: itemData.custId,
        custFabricCode: itemData.fabCode,
        contractAmount: contractAmount,
        fiberComp: itemData.fabConst,
        fabricDesc: itemData.fabName,
        gramWeightValue: itemData.fabWeight11,
        gwMaxValue: itemData.fabWeight13,
        gwMinValue: itemData.fabWeight14,
        breadthValue: itemData.fabWidth21, // 实际幅宽
        sideBreadth: itemData.fabWidth11, // 門幅（边至边）
        breadthUpper: itemData.fabWidth13,
        breadthLower: itemData.fabWidth14,
        horizonShrink: itemData.shrinkHorizontal,
        verticalShrink: itemData.shrinkVertical,
        creator: parent.userID || "ADMIN"
      })
      this.$refs.weaveDtlRef.crudData = dtlCrudData;
      this.xiaLanDtls = xiaLanDtls;

    },
    technologyRefresh(val) {
      this.form.pinColumn = val.pinColumn
      this.form.diskNum = val.diskNum
      this.form.syringeNum = val.syringeNum
      this.form.totalColumn = val.totalColumn
      this.form.needlePlaceType = val.needlePlaceType
      this.refresh = true
    },
    operatProcessClick() {
      if (!this.form.weaveJobId) {
        this.$tip.warning("请先保存主表信息！")
        return
      }
      this.gytDlg = true
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.form.weaveJobId;
    },
    auditHandle(val) {
      this.$tip
        .cofirm(val ? "是否确定通过审核?" : "是否确定取消审核?")
        .then(() => {
          this.wLoading = true;
          this.form.auditState = val;
          update(this.form).then((res) => {
            setTimeout(() => {
              this.$emit("refresh");
              this.$tip.success(this.$t("public.bccg"));
              this.wLoading = false;
            }, 200);
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    async getAllYarn() {
      getGroup({
        star: 1,
        rows: 999,
        proWeaveJobFk: this.form.weaveJobId,
      }).then((group) => {
        let data = group.data.records.sort((a, b) => {
          return a.changeBatchTime > b.workchangeBatchTimeDate ? -1 : 1;
        });
        if (data.length) {
          getYarn({
            star: 1,
            rows: 999,
            proWeaveJobGroupFk: data[0].groupId,
          }).then((yarn) => {
            this.yarnlist = this.yarnlist.concat(yarn.data.records);
          });
        }
      });
    },
    getMachineList() {
      getMachine({
        proWeaveJobFk: this.form.weaveJobId,
        star: 1,
        rows: 9,
      }).then((res) => {
        this.form.mathineCode = "";
        res.data.records.sort((a, b) => {
          return a.recordTime > b.recordTime ? -1 : 1;
        });
        res.data.records.forEach((item) => {
          this.form.mathineCode += item.mathineCode + " / ";
        });
      });
    },
    // 保存前检验
    beforeVaildSave() {
      // let weaveDtlDataLen = this.$refs.weaveDtlRef.crudData.length;
      // if (weaveDtlDataLen == 0 && this.isAdd) {
      //   this.$tip.warning("明细数据不能为空")
      //   return false;
      // }

      let dcsDataLen = this.$refs.colorDefineRef.curSelRows.length;
      if (dcsDataLen == 0 && this.isAdd) {
        this.$tip.warning("适用染色色系定义不能为空")
        return false;
      }

      return true;
    },
    // 保存
    async save() {
      // 保存前检验
      let validRes = await this.beforeVaildSave();
      if (!validRes) return;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            // this.form.amount = Number(this.form.amount).toFixed(2);
            for (let key in this.form) {
              if (this.form[key] == "undefined") {
                this.form[key] = "";
              }
            }
            this.form.weaveJobCode = this.form.weaveJobCode.replace(/\s/g, "");
            // if(this.form.gramWeightValue){
            this.form.gramWeight = this.form.gramWeightValue;
            if (
              this.form.gramWeight &&
              (this.form.gwMaxValue || this.form.gwMinValue)
            ) {
              if (this.form.gwMaxValue == this.form.gwMinValue) {
                this.form.gramWeight =
                  this.form.gramWeight +
                  "(" +
                  (this.form.gwMaxValue ? "±" + this.form.gwMaxValue : "±0") +
                  (this.form.gmAcceptUnit || "") +
                  ")";
              } else {
                this.form.gramWeight =
                  this.form.gramWeight +
                  "(" +
                  (this.form.gwMaxValue ? "+" + this.form.gwMaxValue : "+0") +
                  (this.form.gwMinValue ? "-" + this.form.gwMinValue : "-0") +
                  (this.form.gmAcceptUnit || "") +
                  ")";
              }
            }
            this.form.breadth = this.form.breadthValue;
            if (
              this.form.breadth &&
              (this.form.breadthUpper || this.form.breadthLower)
            ) {
              if (this.form.breadthUpper == this.form.breadthLower) {
                this.form.breadth =
                  this.form.breadth +
                  "(" +
                  (this.form.breadthUpper
                    ? "±" + this.form.breadthUpper
                    : "±0") +
                  (this.form.breadthAcceptUnit || "") +
                  ")";
              } else {
                this.form.breadth =
                  this.form.breadth +
                  "(" +
                  (this.form.breadthUpper
                    ? "+" + this.form.breadthUpper
                    : "+0") +
                  (this.form.breadthLower
                    ? "-" + this.form.breadthLower
                    : "-0") +
                  (this.form.breadthAcceptUnit || "") +
                  ")";
              }
            }
            if (this.form.weaveJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                  this.saveWeavaDtlData();
                } else {
                  this.$tip.error(this.$t("public.bcsb") + res.data.msg);
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
                  this.form.weaveJobId = res.data.data;
                  if (this.splitW) {
                    this.detail.amount = this.detail.amount - this.form.amount;
                    update(this.detail).then((res) => {
                      this.$tip.success(this.$t("public.bccg"));
                    });
                    getYarn({
                      rows: 20,
                      start: 1,
                      proWeaveJobFk: this.detail.weaveJobId,
                    }).then((yarn) => {
                      if (yarn.data.records.length) {
                        addGroup({ proWeaveJobFk: this.form.weaveJobId }).then(
                          (group) => {
                            yarn.data.records.forEach((item) => {
                              item.proWeaveJobFk = this.form.weaveJobId;
                              item.proWeaveJobGroupFk = group.data.data;
                              addYarn(item).then();
                            });
                          }
                        );
                      }
                      this.$tip.success(this.$t("public.bccg"));
                    });
                    this.saveWeavaDtlData();
                  } else {
                    baseCodeSupply({ code: "proWeaveJob" }).then((res) => { });
                    this.saveWeavaDtlData();
                    this.$tip.success(this.$t("public.bccg"));
                    this.refresh = true;
                  }
                } else {
                  this.$tip.error(this.$t("public.bcsb" + res.data.msg));
                }
                setTimeout(() => {
                  this.wLoading = false;
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
    // 保存织单明细
    saveWeavaDtlData() {
      if (this.$refs.weaveDtlRef.crudData.length > 0) {
        this.$refs.weaveDtlRef.saveWeaveDltData(this.form.weaveJobId, this.splitW);
      }

      // 保存色系定义数据
      this.$refs.colorDefineRef.setSelColData(this.colorNameMap);
      if (this.$refs.colorDefineRef.curSelRows.length > 0 && this.isAdd) {
        this.$refs.colorDefineRef.handleSave(this.form.weaveJobId, this.splitW);
      }
      
      if (this.isExtract) {
        saveFlatknitByUnCreate({
          weaveJobId: this.form.weaveJobId,
          data: this.xiaLanDtls
        })
      }
    },
    query() {
      this.loading = true;
      this.crud = [];
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.weaveJobId) {
        this.crud = [];
        this.loading = false;
        return;
      } else if (this.tabs == "機號信息") {
        this.func.get = getMachine;
        this.func.del = delMachine;
        this.func.add = addMachine;
        this.func.update = updateMachine;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == "更改紗長") {
        this.func.get = getLong;
        this.func.del = delLong;
        this.func.add = addLong;
        this.func.update = updateLong;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == "用紗明细") {
        this.func.get = getGroup;
        this.func.del = delYarn;
        this.func.add = addGroup;
        this.func.update = updateGroup;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
        this.getYarnList();

        return;
        // this.func.get = getYarn;
        // this.func.del = delYarn;
        // this.func.add = addYarn;
        // this.func.update = updateYarn;
      } else if (this.tabs == "洗後規格") {
        this.func.get = getCalico;
        this.func.del = delCalico;
        this.func.add = addCalico;
        this.func.update = updateCalico;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      } else if (this.tabs == "輸送張力") {
        this.func.get = getStrain;
        this.func.del = delStrain;
        this.func.add = addStrain;
        this.func.update = updateStrain;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
      }

      this.chooseData = {};
      this.chooseDtlData = {};
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
            if (this.tabs == "用紗明细") {
              this.crud.sort((a, b) => {
                return a.sn - b.sn;
              });
            }
            if (this.tabs == "機號信息") {
              this.crud.sort((a, b) => {
                return a.recordTime > b.recordTime ? -1 : 1;
              });
            }
            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[0]);
            }
          }
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      if (this.tabs == "用紗明细") {
        this.saveYarn();
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "變更紗長" && !this.crud[i].yarnLength) {
          this.$tip.error("紗長不能為空!");
          return;
        }
        if (this.tabs == "洗後規格" && !this.crud[i].weight) {
          this.$tip.error("重量不能為空!");
          return;
        }
        if (this.tabs == "輸送張力" && !this.crud[i].lineTension) {
          this.$tip.error("輸送張力不能為空!");
          return;
        }
        if (this.tabs == "機號信息" && !this.crud[i].mathineCode) {
          this.$tip.error("机号不能為空!");
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
            item.changedId ||
            item.groupId ||
            item.washedId ||
            item.strainId ||
            item.useId
          ) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proWeaveJobFk = this.form.weaveJobId;
            data.createTime = this.$getNowTime("datetime");
            this.func.add(data).then(async (res) => {
              item.changedId = res.data.data;
              item.groupId = res.data.data;
              item.washedId = res.data.data;
              item.strainId = res.data.data;
              item.useId = res.data.data;
              this.tabs == "機號信息" &&
                (await this.addEquipmentSchedule(item));
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
    saveYarn() {
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "用紗明细" && !this.crud[i].amount) {
          this.$tip.error("数量不能為空!");
          return;
        }
      }
      this.dlgLoading = true;
      let yarnLength = '';
      // 判断是否存在分组
      if (this.form.groupId) {
        this.crud.forEach((item, i) => {
          item.proWeaveJobGroupFk = this.form.groupId;
          item.proWeaveJobFk = this.form.weaveJobId;
          yarnLength +=  this.crud.length > 1 ? `${i + 1}.${item.yarnLengthChanged || item.yarnLength} ` : item.yarnLength
          if (!item.useYarnId) {
            addYarn(item).then((res) => {
              item.useYarnId = res.data.data;
            });
          } else {
            updateYarn(item).then((res) => { });
          }
          if (i == this.crud.length - 1) {
            this.form.yarnLength = yarnLength;
            this.save();
            this.$tip.success("保存成功!");
            this.dlgLoading = false;
          }
        });
      } else {
        this.func
          .add({
            proWeaveJobFk: this.form.weaveJobId,
            sn: 1,
            groupName: "01",
            changeBatchTime: this.$getNowTime("datetime"),
          })
          .then((res) => {
            this.form.groupId = res.data.data;
            this.crud.forEach((item, i) => {
              yarnLength +=  this.crud.length > 1 ? `${i + 1}.${item.yarnLengthChanged || item.yarnLength} ` : item.yarnLength
              item.proWeaveJobGroupFk = res.data.data;
              item.proWeaveJobFk = this.form.weaveJobId;
              addYarn(item).then((res1) => {
                item.useYarnId = res1.data.data;
              });
              if (i == this.crud.length - 1) {
                this.form.yarnLength = yarnLength;
                this.save()
                this.$tip.success("保存成功!");
                this.dlgLoading = false;
              }
            });
          });
      }
    },
    async addEquipmentSchedule(row) {
      let equRes = await fetchEquipmentInfo({ equipmentCode: row.mathineCode });
      if (!equRes.data.length) return;
      const equInfo = equRes.data[0];
      let params = {
        equId: equInfo.equId,
        equModel: equInfo.equModel,
        planStart: row.recordTime,
        proSpeed: equInfo.equSpeed,
        proNeedleCount: equInfo.needleCount,
        proWayCount: equInfo.wayCount,
        proDiaBarrel: equInfo.equDiaBarrel,
        proNeedleSpace: equInfo.equNeedleSpace,
        equipmentName: equInfo.equipmentName,
        equipmentCode: equInfo.equipmentCode,
        productOrderNo: this.form.weaveJobCode,
        proTemperature: equInfo.equProTemperature,
        unit: equInfo.unit,
        measureMethod: equInfo.measureMethod,
        maxOutput: equInfo.maxOutput,
        equState: equInfo.equState,
      };
      addProEquipmentSchedule(params).then((res) => { });
    },
    async checkYarn() {
      this.$refs.useYarns.visible = true;
      await this.$nextTick();
      this.$refs.useYarns.initData();
    },
    checkCalico() {
      this.tabs = "洗後規格";
      this.crudOp = calicoCrud(this);
      this.visible = true;
    },
    checkstrain() {
      this.tabs = "輸送張力";
      this.crudOp = strainCrud(this);
      this.visible = true;
    },
    add() {
      if (this.tabs == "用紗明细") {
        this.choiceQ.sortF = 'yarnsId'
        this.choiceTle = '选择纱线库存';
        this.choiceV = true;
        return;
      }
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
        signDate: this.$getNowTime("datetime"),
        changeBatchTime: this.$getNowTime("datetime"),
        sn: this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
        userName: parent.userID,
        userId: this.$store.state.userOid,
        recordTime: this.$getNowTime("datetime"),
        groupId: this.dlgForm.groupId,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      // } else {
      //   this.choiceV = true;
      // }
    },
    addDtl() {
      this.choiceV = true;
    },
    del() {
      if (
        !this.chooseData.changedId &&
        !this.chooseData.useYarnId &&
        !this.chooseData.washedId &&
        !this.chooseData.strainId &&
        !this.chooseData.useId
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
      if (this.chooseData.list && this.chooseData.groupId) {
        this.$tip.warning("請先刪除用紗明細!");
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.func
            .del(
              this.tabs === "更改紗長"
                ? this.chooseData.changedId
                : this.tabs === "用紗明细"
                  ? this.chooseData.useYarnId
                  : this.tabs === "洗後規格"
                    ? this.chooseData.washedId
                    : this.tabs === "機號信息"
                      ? this.chooseData.useId
                      : this.chooseData.strainId
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
      if (Object.keys(this.chooseDtlData).length == 0) {
        this.$tip.warning("請選擇要刪除的數據!");
        return;
      }
      if (!this.chooseDtlData.useYarnId) {
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
      getBf({ proWeaveJobGroupFk: this.chooseDtlData.proWeaveJobGroupFk }).then(
        (bf) => {
          if (bf.data.length) {
            this.$tip.warning("請用紗明細存在布票信息,無法刪除!");
            return;
          }
          this.$tip
            .cofirm("是否确定删除選中的數據?", this, {})
            .then(() => {
              delYarn(this.chooseDtlData.useYarnId)
                .then((res) => {
                  if (res.data.code === 200) {
                    // this.query();
                    this.chooseData.list.splice(
                      this.chooseDtlData.index - 1,
                      1
                    );
                    // this.chooseDtlData = {};
                    this.chooseData.list.forEach((item, i) => {
                      item.index = i + 1;
                    });
                    if (this.chooseData.list.length > 0) {
                      this.$refs.yarnCrud.setCurrentRow(
                        this.chooseData.list[0]
                      );
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
        }
      );
    },
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
      this.chooseDtlData = {};
      // if (
      //   this.tabs == "用紗明细" &&
      //   this.chooseData.list.length == 0 &&
      //   this.chooseData.groupId
      // ) {
      //   this.getYarnList();
      // }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getYarnList() {
      getGroup(
        Object.assign({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          proWeaveJobFk: this.form.weaveJobId,
        })
      ).then((group) => {
        if (group.data.records.length) {
          this.form.groupId = group.data.records[0].groupId; // 存在分组的依据
          getYarn({
            star: 1,
            rows: 999,
            proWeaveJobGroupFk: group.data.records[0].groupId,
          }).then((res) => {
            this.crud = res.data.records;
            this.crud.forEach((item, i) => {
              item.$cellEdit = true;
              item.index = i + 1;
            });
            this.crud.sort((a, b) => {
              return a.sn - b.sn;
            });
            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[0]);
            }
            this.loading = false;
            this.page.total = res.data.total;
          });
        } else {
          this.loading = false;
          this.crud = [];
        }
      });
    },
    check() {
      if (this.tabs === "更改紗長") {
        this.form.yarnLenghtChanged = this.chooseData.yarnLength;
        this.visible = false;
      } else if (this.tabs === "用紗明细") {
        // 不存在本厂批号则不进行操作
        if (!this.chooseData.factoryYarnBatch) return;
        this.yarnTestVisible = true;
        this.$nextTick(() => {
          this.$refs.yarnTestRef.getYarnTestData(this.chooseData.factoryYarnBatch);
        })
      }
    },
    async choiceData(val) {
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      this.wLoading = true;
      if (this.tabs == "用紗明细") {
        val.forEach((item) => {
          this.crud.push({
            sn: this.crud.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            amount: 0,
            realAmount: 0,
            lossRate: 0,
            yarnRatio: 0,
            unit: item.weightUnit,
            $cellEdit: true,
          });
        });
      }else {
        const list = [
          "calicoFabricRequire",
          "calicoShap",
          "guage",
          "cylinderInch",
          "needleInch",
          "needleNumber",
          "calicoMiddle",
          "readyMadeFabric",
          "fallCloth",
          "mathineSpeed",
          "cylinderHeight",
          "weaveEnter",
          "clothRackWidth",
          "rotaSpeed",
          "loopSpace",
          "clothRackDesc",
          "transPlate",
          // "yarnLength"
        ]
        list.forEach((item) => {
          this.form[item] = val[item];
        })
        if(val.pinColumn) {
            await this.operatProcessClick();
            this.$refs.technology.loading = true;
            setTimeout(() => {
              this.$refs.technology.handleCheck(val, true);
            }, 500);
        }       
      }
      this.wLoading = false;
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
  created() { },
  mounted() {
    this.meaveDomMove();
    this.getData();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#proWeaveJob {
  .formBox {
    height: calc(100vh - 7.5rem) !important;
    overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: .3125rem !important;
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
    top: .1875rem;
    font-size: 1.125rem;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 1.5rem;
  }

  .el-tag--mini {
    height: 1.5rem;
    padding: 0 .3125rem;
    line-height: 1.5rem;
    font-size: .875rem;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -0.3125rem;
    height: 1.125rem;
    width: 1.125rem;
    line-height: 1.125rem;
  }

  .avue-form .el-input--mini input {
    height: 2.1875rem !important;
    line-height: 2.1875rem;
  }
}
</style>