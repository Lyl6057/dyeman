<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-27 10:44:21
 * @Description: 
-->
<template>
  <div id="proWeaveJob">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '外发织造通知单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <template v-if="isOutFactory">
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
              :disabled="!this.form.weaveJobId"
              v-if="canSave"
              >打印</el-button
            >
          </el-tooltip>
        </template>
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
          <template slot="operatProcess">
            <el-button type="primary" @click="operatProcessClick">上机工艺</el-button>
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
                <el-button
                  @click="del"
                  type="danger"
                  v-if="tabs != '選擇訂單'"
                  :disabled="Object.keys(chooseData).length == 0"
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
    <el-dialog id="colorMng_Dlg" :visible.sync="gytDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="上机工艺维护">
        <technology v-if="gytDlg" :weave="form" @refresh="technologyRefresh" @close="gytDlg = false"></technology>
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

    <!-- 织胚明细 -->
    <div class="other-dtl-wrapper" >
      <span style="color: #409eff; font-size: 15px; margin-left: 20px" @click.stop="handleOpenWeaEmbDtl" >織胚明細</span>
      <span style="color: #409eff; font-size: 15px; margin-left: 20px" @click.stop="handleOpenMachineInfo" >機臺</span>
    </div>
    <el-dialog :visible.sync="meaEmbVisible" fullscreen  append-to-body :close-on-click-modal="false" :close-on-press-escape="false" >
      <MeaveEmbyroDtl 
        :weaveJobId="form.weaveJobId"
        ref="meaveEmbyroDtlRef" 
        @close="meaEmbVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="machineInfoVisible" fullscreen  append-to-body :close-on-click-modal="false" :close-on-press-escape="false" >
      <MachineInfo 
        :weaveJobId="form.weaveJobId"
        ref="machineInfoRef" 
        @close="machineInfoVisible = false" />
    </el-dialog>
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
  getBom,
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
} from "./api";
import { baseCodeSupplyEx } from "@/api/index";
import preview from "./preview";
import { getBf } from "../clothFly/api";
import technology from "../proWeaveJob/technology"
import MeaveEmbyroDtl from "./meaveEmbyroDtl.vue"
import MachineInfo from "./machineInfo.vue"
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    copyC: Boolean,
  },
  components: {
    preView: preview,
    choice: choice,
    technology,
    MeaveEmbyroDtl,
    MachineInfo
  },
  data() {
    return {
      wLoading: false,
      gytDlg: false,
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
      choiceTle: "选择纱线库存",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        isOut: true
      },
      code: "",
      yarnCrud: yarnCrud(this),
      group: [],
      chooseDtlData: {},
      pdfDlg: false,
      pdfUrl: "",
      yarnlist: [],
      canSave: true,

      // 织胚明细 弹出窗状态
      meaEmbVisible: false,
      machineInfoVisible: false,
    };
  },
  watch: {},
  computed: {
    isOutFactory(){
      return !this.$store.getters.isOutFactory
    }
  },
  methods: {
    // 织胚明细DOM 移动
    meaveDomMove(){
      let meaveDtlBtnDom = document.querySelectorAll(".other-dtl-wrapper")[0];
      let formGroupWrapper = document.querySelectorAll("#proWeaveJob .avue-group__header")[0];
      formGroupWrapper.appendChild(meaveDtlBtnDom)
    },
    // 打开织胚明细界面
    async handleOpenWeaEmbDtl(){
      this.meaEmbVisible = true;
      await this.$nextTick();
      this.$refs.meaveEmbyroDtlRef.getDataList();
    },
    // 打开机台维护界面
    async handleOpenMachineInfo(){
      this.machineInfoVisible = true;
      await this.$nextTick();
      this.$refs.machineInfoRef.init();
    },
    getData() {
      if (this.isAdd) {
        baseCodeSupplyEx({ code: "proWeaveJob" }).then((res) => {
          if (this.copyC) {
            this.form = JSON.parse(JSON.stringify(this.detail));
            this.form.weaveJobCode = this.detail.weaveJobCode + "A";
          } else {
            this.form.weaveJobCode = res.data.data;
          }
          this.form.calicoFabricRequire = "开幅";
          this.form.calicoShap = "1";
          this.form.weaveState = 0;
          this.form.isWorkOut = 1;
          this.form.includeTaxe = false;
          this.form.creator = parent.userID;
          this.form.weaveJobId = "";
          this.form.startDate = this.$getNowTime("datetime");
          this.code = res.data.data;
        });
      } else {
        this.wLoading = true;
        this.form = this.detail;
        this.getAllYarn();
        // this.getMachineList();
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
    technologyRefresh(val){
      this.form.pinColumn = val.pinColumn 
      this.form.diskNum = val.diskNum 
      this.form.syringeNum = val.syringeNum 
      this.form.totalColumn = val.totalColumn 
      this.form.needlePlaceType = val.needlePlaceType 
      this.refresh = true
    },
    operatProcessClick(){
      if (!this.form.weaveJobId) {
        this.$tip.warning("请先保存主表信息！")
        return
      }
      this.gytDlg = true
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
            proWeaveJobGroupFk: data[0].useYarnId,
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
            // return;
            this.form.outFactoryName = this.form.$outFactoryId;
            if (this.form.weaveJobId) {
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
                  this.form.weaveJobId = res.data.data;
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
      } else if (!this.form.weaveJobId) {
        this.crud = [];
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
        // this.func.get = getGroup;
        // this.func.del = delGroup;
        // this.func.add = addGroup;
        // this.func.update = updateGroup;
        this.func.get = getYarn;
        this.func.del = delYarn;
        this.func.add = addYarn;
        this.func.update = updateYarn;
        this.dlgForm.proWeaveJobFk = this.form.weaveJobId;
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
      this.loading = true;
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

          this.loading = false;
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "變更紗長" && !this.crud[i].yarnLength) {
          this.$tip.error("紗長不能為空!");
          return;
        }
        // if (this.tabs == "用紗明细") {
        //   if (!this.crud[i].groupName || !this.crud[i].changeBatchTime) {
        //     this.$tip.error("批次分組名稱/更換時間不能為空!");
        //     return;
        //   }
        // }

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
            item.useYarnId ||
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
            this.func.add(data).then((res) => {
              item.changedId = res.data.data;
              item.useYarnId = res.data.data;
              item.washedId = res.data.data;
              item.strainId = res.data.data;
              item.useId = res.data.data;
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
          //     item.proWeaveJobGroupFk = this.crud[i].useYarnId;
          //     if (!item.useYarnId) {
          //       addYarn(item).then((res) => {
          //         item.useYarnId = res.data.data;
          //       });
          //     } else {
          //       updateYarn(item).then((res) => {});
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
      //     item.proWeaveJobFk = this.form.weaveJobId;
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
      // if (this.chooseData.list && this.chooseData.useYarnId) {
      //   this.$tip.warning("請先刪除用紗明細!");
      //   return;
      // }
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
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }

      // if (
      //   this.tabs == "用紗明细" &&
      //   this.chooseData.list.length == 0 &&
      //   this.chooseData.useYarnId
      // ) {
      //   this.getYarnList();
      // }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getYarnList() {
      getYarn({
        star: 1,
        rows: 999,
        proWeaveJobGroupFk: this.chooseData.useYarnId,
      }).then((res) => {
        let data = res.data.records;
        data.sort((a, b) => {
          return a.sn > b.sn ? 1 : -1;
        });
        data.forEach((item, i) => {
          item.$cellEdit = true;
          // item.sn = i + 1;
          this.chooseData.list.push(Object.assign(item, { index: i + 1 }));
        });
        this.chooseData.list = res.data.records;
        if (this.chooseData.list.length > 0) {
          this.$refs.yarnCrud.setCurrentRow(this.chooseData.list[0]);
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
        //   } else {
        //     this.wLoading = false;
        //   }
        // });
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
  created() {},
  mounted() {
    this.meaveDomMove();
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#proWeaveJob
  .avue-group__header
    height 15px
    line-height 15px
    margin-bottom 10px
  .formBox
    height 100vh !important
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