<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-11 08:43:22
 * @Description: 
-->
<template>
  <div id="proWeaveJob">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '織造通知單'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="Bảo tồn"
          placement="top-start"
        >
          <el-button type="success" @click="save" title="save" v-if="canSave">{{
            $t("public.save")
          }}</el-button>
        </el-tooltip>

        <el-button
          type="primary"
          @click="checkOrder"
          title="checkOrder"
          v-if="canSave"
          >选择订单号</el-button
        >
        <el-tooltip
          class="item"
          effect="dark"
          content="Yarn detail"
          placement="top-start"
        >
          <el-button
            type="primary"
            @click="checkYarn"
            :disabled="!this.form.weaveJobId"
            v-if="canSave"
            >用紗明細</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="After washing"
          placement="top-start"
        >
          <el-button
            type="primary"
            @click="checkCalico"
            :disabled="!this.form.weaveJobId"
            v-if="canSave"
            >洗後規格</el-button
          >
        </el-tooltip>
        <!-- <el-button
          type="primary"
          @click="checkstrain"
          :disabled="!this.form.weaveJobId"
          >輸送張力</el-button
        > -->
        <el-tooltip
          class="item"
          effect="dark"
          content="in"
          placement="top-start"
        >
          <el-button
            type="primary"
            @click="print"
            :disabled="!this.form.weaveJobId || form.auditState === 0"
            v-if="canSave"
            >打印</el-button
          >
        </el-tooltip>
        <el-button
          type="primary"
          @click="auditHandle(form.auditState ? 0 : 1)"
          v-if="audit"
          >{{ form.auditState ? "取消审核" : "审核" }}</el-button
        >
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

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="gramWeightUnit">
            <div>g/m²</div>
          </template>
        </avue-form>
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
        <el-col :span="24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button
                @click="check"
                type="success"
                v-if="tabs == '選擇訂單' || tabs == '更改紗長'"
                >{{ $t("public.choose") }}</el-button
              >
              <el-tooltip
                class="item"
                effect="dark"
                content="Bảo tồn"
                placement="top-start"
              >
                <el-button
                  @click="saveOther"
                  type="success"
                  v-if="tabs != '選擇訂單'"
                  >{{ $t("public.save") }}</el-button
                >
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="thêm mới "
                placement="top-start"
              >
                <!--  :disabled="
                    !audit && form.auditState == 1 && tabs != '機號信息'
                  " -->
                <el-button
                  @click="add"
                  type="primary"
                  v-if="tabs != '選擇訂單'"
                  >{{ $t("public.add") }}</el-button
                >
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="xóa"
                placement="top-start"
              >
                <!--  :disabled="
                    Object.keys(chooseData).length == 0 ||
                    (!audit && form.auditState == 1 && tabs != '機號信息')
                  " -->
                <el-button
                  @click="del"
                  type="danger"
                  v-if="tabs != '選擇訂單'"
                  >{{ $t("public.del") }}</el-button
                >
              </el-tooltip>
              <el-button
                @click="query"
                type="primary"
                v-if="tabs == '選擇訂單'"
                >{{ $t("public.query") }}</el-button
              >
              <el-tooltip
                class="item"
                effect="dark"
                content="đóng"
                placement="top-start"
              >
                <el-button @click="visible = false" type="warning">{{
                  $t("public.close")
                }}</el-button>
              </el-tooltip>
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
      </el-row>
    </el-dialog>
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
  fetchEquipmentInfo
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import preview from "./preview";
import { getBf } from "../clothFly/api";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    copyC: Boolean,
    splitW: Boolean,
    audit: Boolean,
  },
  components: {
    preView: preview,
    choice: choice,
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
    getData() {
      if (this.isAdd) {
        this.wLoading = true;
        if (this.splitW) {
          this.form = JSON.parse(JSON.stringify(this.detail));
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
          this.form.weaveJobId = "";
          this.form.weaveState = 0;
          this.form.isWorkOut = 0;
          this.form.auditState = 0;
          this.form.creator = parent.userID;
          get({ weaveJobCode: "!^%" + this.form.weaveJobCode }).then((res) => {
            this.form.weaveJobCode =
              this.detail.weaveJobCode +
              String.fromCharCode(res.data.records.length + 64);
          });
        } else {
          baseCodeSupplyEx({ code: "proWeaveJob" }).then((res) => {
            if (this.copyC) {
              this.form = JSON.parse(JSON.stringify(this.detail));
              // this.form.weaveJobCode = this.detail.weaveJobCode + "A";
              this.form.auditState = 0;
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
    save() {
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
                  } else {
                    baseCodeSupply({ code: "proWeaveJob" }).then((res) => {});
                    this.$tip.success(this.$t("public.bccg"));
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
            data.createTime = this.$getNowTime("datetime")
            this.func.add(data).then(async (res) => {
              item.changedId = res.data.data;
              item.groupId = res.data.data;
              item.washedId = res.data.data;
              item.strainId = res.data.data;
              item.useId = res.data.data;
              this.tabs == "機號信息" && await this.addEquipmentSchedule(item)
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
      this.dlgLoading = true;
      // 判断是否存在分组
      if (this.form.groupId) {
        // 存在分组，直接保存
        // for (let i = 0; i < this.crud.length; i++) {
        //   if (!this.crud[i].yarnRatio) {
        //     this.$tip.error("用纱比例不能為空!");
        //     this.dlgLoading = false;
        //     return;
        //   }
        // }
        this.crud.forEach((item, i) => {
          item.proWeaveJobGroupFk = this.form.groupId;
          item.proWeaveJobFk = this.form.weaveJobId;
          if (!item.useYarnId) {
            addYarn(item).then((res) => {
              item.useYarnId = res.data.data;
            });
          } else {
            updateYarn(item).then((res) => {});
          }
          if (i == this.crud.length - 1) {
            this.$tip.success("保存成功!");
            this.dlgLoading = false;
          }
        });
      } else {
        // for (let i = 0; i < this.crud.length; i++) {
        //   if (!this.crud[i].yarnRatio) {
        //     this.$tip.error("用纱比例不能為空!");
        //     this.dlgLoading = false;
        //     return;
        //   }
        // }
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
              item.proWeaveJobGroupFk = res.data.data;
              item.proWeaveJobFk = this.form.weaveJobId;
              addYarn(item).then((res1) => {
                item.useYarnId = res1.data.data;
              });
              if (i == this.crud.length - 1) {
                this.$tip.success("保存成功!");
                this.dlgLoading = false;
              }
            });
          });
      }
    },
    async addEquipmentSchedule(row) {
      let equRes = await fetchEquipmentInfo({equipmentCode: row.mathineCode })
      if(!equRes.data.length) return
      const equInfo = equRes.data[0]
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
        equState: equInfo.equState
      }
      addProEquipmentSchedule(params).then(res =>{
      })
    },
    checkOrder() {
      this.choiceTle =  "选择订单资料"
      this.choiceV = true;
      // this.crudOp = dlgCrud(this);
      // this.visible = true;
    },
    checkYarn() {
      this.tabs = "用紗明细";
      this.crudOp = yarnCrud(this);
      this.visible = true;
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
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        this.form.weaveJobCode = this.code;
        this.form.salPoNo = this.chooseData.poNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        getPoDtla({ salPoFk: this.chooseData.salPooid }).then((res) => {
          if (res.data.rows.length) {
            let poDtla = res.data.rows[0];
            this.form.amount = poDtla.fabQty;
            this.form.colorName = poDtla.colorName;
            this.form.colorCode = poDtla.dyeColorNo;
            this.form.fabricDesc = poDtla.fabYcount;
            this.form.fallCloth = poDtla.fabBreadth;
            // 获取面料
            getBomFa({ salBomFabricoid: poDtla.salBomFabricFk }).then((bom) => {
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
          }
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
            unit: item.weightUnit,
            $cellEdit: true,
          });
        });
      }else if (this.choiceTle == "选择BOM资料") {
        this.form.custCode = val.custId;
        this.form.custFabricCode = val.guestFabId;
        this.form.seasonCode = val.season;
        this.form.fiberComp = val.guestComponents;
        this.form.fabricDesc = val.guestFabNames;
        this.form.bomId = val.$salNewbomFk
        // getBom({ bomId: val.bomId }).then((res) => {
        //   if (res.data.length) {
        //     getBomDtlb({ salNewbomFk: res.data[0].salNewbomoid }).then(
        //       (dtlb) => {
        //         if (dtlb.data.length) {
        //           getBomDtlbSpecs({
        //             salNewbomDtlbFk: val.salNewbomDtlbFk,
        //           }).then((dtlbSpecs) => {
        //             this.setSpecs(dtlbSpecs.data);
        //           });
        //         } else {
        //           getBomDtlaSpecs({
        //             salNewbomDtlaFk: val.salNewbomDtlaFk,
        //           }).then((dtlaSpecs) => {
        //             this.setSpecs(dtlaSpecs.data);
        //           });
        //         }
        //       }
        //     );
        //   }
        // })
      } else {
        this.form.custPoNo = val.custPoNo;
        this.form.salPoNo = val.poNo;
        this.form.productDate = val.poDate;
        this.form.custCode = val.custBrandId;
        this.form.colorName = val.custColorName;
        this.form.colorCode = val.custColorNo;
        this.form.custFabricCode = val.guestFabId;
        this.form.seasonCode = val.season;
        this.form.fiberComp = val.guestComponents;
        this.form.fabricDesc = val.fabName;
        this.form.otherRequire = val.finishingitem;
        getBom({ bomId: val.bomId }).then((res) => {
          if (res.data.length) {
            getBomDtlb({ salNewbomFk: res.data[0].salNewbomoid }).then(
              (dtlb) => {
                if (dtlb.data.length) {
                  getBomDtlbSpecs({
                    salNewbomDtlbFk: val.salNewbomDtlbFk,
                  }).then((dtlbSpecs) => {
                    this.setSpecs(dtlbSpecs.data);
                  });
                } else {
                  getBomDtlaSpecs({
                    salNewbomDtlaFk: val.salNewbomDtlaFk,
                  }).then((dtlaSpecs) => {
                    this.setSpecs(dtlaSpecs.data);
                  });
                }
              }
            );
          } else {
            this.wLoading = false;
          }
        });
      }
      this.wLoading = false;
      this.choiceV = false;
    },
    setSpecs(list) {
      if (!list.length) {
        this.wLoading = false;
      }
      let data = {};
      list.forEach((item, i) => {
        data[item.specsType] = item.specsSeq || 0;
        data[item.specsType + "+"] = item.tolerancePlus || 0;
        data[item.specsType + "-"] = item.toleranceMinus || 0;
        data[item.specsType + "unit"] = item.specsUnit;
        data[item.specsType + "ycunit"] = item.toleranceUnit;
      });
      this.form.gramWeightValue = data["weight-XQ"];
      this.form.gwMaxValue = data["weight-XQ+"];
      this.form.gwMinValue = data["weight-XQ-"];
      this.form.gramWeightUnit = data["weight-XQunit"];
      this.form.gmAcceptUnit = data["weight-XQycunit"];

      this.form.breadthValue = data["width-SJ"];
      this.form.breadthUpper = data["width-SJ+"];
      this.form.breadthLower = data["width-SJ+"];
      this.form.breadthUnit = data["width-SJunit"];
      this.form.breadthAcceptUnit = data["width-SJycunit"];
      if (data["shrink-H"] && data["shrink-H+"]) {
        this.form.horizonShrink = `${data["shrink-H"]}±${data["shrink-H+"]}`;
      }
      if (data["shrink-Z"] && data["shrink-Z+"]) {
        this.form.verticalShrink = `${data["shrink-Z"]}±${data["shrink-Z+"]}`;
      }
      setTimeout(() => {
        this.wLoading = false;
      }, 200);
    },
    close() {
      if (this.isAdd) {
        this.$emit("refresh");
      }
      this.$emit("close");
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
#proWeaveJob
  .formBox
    height calc(100vh - 70px) !important
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