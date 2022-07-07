<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + this.$t('iaoMng.rc')">
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
        <!-- <el-button type="primary" @click="add">{{this.$t("public.add")}}</el-button>
        <el-button type="danger" @click="del">{{ this.$t("public.del") }}</el-button> -->
        <!-- <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >{{this.$t("public.save")}}</el-button
        > -->
        <!-- <el-button type="warning" @click="getDetail">取消</el-button> -->
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="hide != '7' ? 10 : 24">
          <view-container :title="datas.type.split('_')[0] + $t('iaoMng.rcmx')">
            <div class="btnList">
              <el-button type="primary" :disabled="hasEdit" @click="add">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" :disabled="hasEdit" @click="del">{{
                this.$t("public.del")
              }}</el-button>
              <span style="display:inline-block; padding: 0px 10px">|</span>
              <el-select v-model="curSelLocCode" clearable placeholder="选择货位码进行批量操作">
                <el-option v-for="(item, index) in locationCodeDict" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button type="primary" @click="handleBatchSelLocCode">批量选择货位码</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="dlgcrud"
                :option="mxOp"
                v-loading="loading"
                :data="mx"
                :page.sync="page"
                @current-row-change="cellClick"
                @on-load="getDetail"
              ></avue-crud>
            </div> </view-container
        ></el-col>
        <el-col :span="14" v-if="hide != '7'">
          <view-container
            :title="datas.type.split('_')[0] + $t('iaoMng.rcphzl')"
          >
            <!-- <div style="margin-bottom: 0px" class="btnList">
              <el-button type="primary" @click="addPh">{{this.$t("public.add")}}</el-button>
              <el-button type="danger" @click="delPh">{{ this.$t("public.del") }}</el-button>
              <el-button
                type="success"
                :disabled="changePhList.length === 0"
                @click="savePh"
                >{{this.$t("public.save")}}</el-button
              >
            </div>
            <avue-crud
              ref="count"
              id="count"
              v-loading="loading"
              :option="countOp"
              :page.sync="phPage"
              :data="count"
              @on-load="getPh"
              @current-row-change="cellPhClick"
            ></avue-crud>  -->
            <inwhse-ph
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
              :hasEdit="hasEdit"
            ></inwhse-ph> </view-container
        ></el-col>
      </el-row>
      <choice
        :choiceV="choiceV"
        :choiceTle="choiceTle"
        :choiceQ="choiceQ"
        :dlgWidth="dlgWidth"
        @choiceData="choiceData"
        @close="choiceV = false"
        v-if="choiceV"
      ></choice>
    </view-container>
  </div>
</template>
<script>
import { rcpb2C, rcpb2F, rcpb3C } from "./data";
import choice from "@/components/choice";
import inwhseph from "@/components/calico/inwhse_ph";
import { fetchStkinMemoDataByStkinOid,updateNoteClothStatus2 } from "./stkinMemo/api"
import {
  addPb,
  updatePb,
  getPbDetali,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPbPh,
  addPbPhDetali,
  updatePbPhDetali,
  delPbPhDetali,
} from "@/api/im/Wk/rc";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  props: {
    datas: Object,
    detail: Object,
    hide: String,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
    inwhsePh: inwhseph,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      phPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rcpb2F(this),
      mxOp: rcpb2C(this),
      countOp: rcpb3C(this),
      mx: [],
      count: [],
      ctLoading: false,
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      oldPhData: {},
      choosPheData: {},
      changePhList: [],
      canLeave: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      everyThing: {
        getLoc: getPbPh,
        delLoc: delPbPhDetali,
        addLoc: addPbPhDetali,
        updateLoc: updatePbPhDetali,
      },
      // 当前选择货位码
      curSelLocCode: ""
    };
  },
  computed:{
    hasEdit(){
      return Boolean(this.form.deliNo) 
    },
    locationCodeDict(){
      return (this.mxOp.column.find(item => item.prop == "locationCode")|| {}).dicData || []
    }
  },
  watch: {
    hasEdit:{
      handler(value){
        this.changeCrudCellStatus(value);  
      },
      immediate: true
    }
  },
  methods: {
    // 批量选择货位码
    handleBatchSelLocCode(){
      if(!this.curSelLocCode) return this.$tip.warning("请选择货位码");
      this.$tip.cofirm("是否确认进行所有货位码进行覆盖").then(() => {
           this.mx.forEach(item => {
             item.locationCode = this.curSelLocCode;
           })
      })
    },
    // 修改类型(是否可编辑状态)
    changeCrudCellStatus(value){
      let cIdx = this.mxOp.column.findIndex(item => item.prop == 'countingNo');
      let fIdx = this.mxOp.column.findIndex(item => item.prop == 'fabticket');
      [cIdx,fIdx].forEach(idx => {
        this.mxOp.column[idx].cell = !value
      });
    },
    // 通知单数据抽取
    dataExtract(){
      // 避免多次
      if(this.lock) return
      this.lock = true;
      let params = {
        stkinOid: this.form.stkinMemoOid
      }
      fetchStkinMemoDataByStkinOid(params).then(res => {
        this.dataAnalysic(res.data)
      }).finally(() => {
        this.lock = false;
      })
    },
    // 数据解析
    dataAnalysic(originDataList){
      let targetData = {};
      originDataList.sort((a,b) => a.eachNumber - b.eachNumber);
      let mIndex = 0;
      originDataList.forEach((item,index) => {
        let { storeLoadCode, weaveJobCode } = item;
        let key = storeLoadCode + weaveJobCode;
        // 不存在则进行初始化
        if(!targetData[key]){
          targetData[key] = {
            loc: [],
            countingNo: 0,
            prodNo: weaveJobCode,
            fabticket: storeLoadCode,
            index: mIndex++,
            locationCode: ""
          }
        }

        targetData[key].loc.push({
          batchNo: "",
          countingNo: item.eachNumber,
          weight: item.clothWeight,
          weightUnit: "KG",
          custTicket: item.noteCode,
          locationCode: ""
        })
        targetData[key].countingNo++;

      });

      // 赋值
      this.mx = Object.values(targetData);

      if(this.mx.length > 0){
        this.chooseData.loc = this.mx[0].loc
      }


    },
    getDetail() {
      if (this.isAdd) {
        this.form = this.detail;
        this.form.sysCreatedby = this.$store.state.userOid;
        this.form.stkinMemoOid && this.dataExtract();
        return;
      }
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseCalicoinoid
      ) {
        this.mx = [];
        return;
      }
      this.loading = true;
      // this.oldData = {};
      this.changeList = [];
      this.mx = [];
      this.count = [];
      getPbDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseCalicoinFk: this.detail.whseCalicoinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        if (this.mx.length === 0) {
          this.loading = false;
        }
        // if (Object.keys(this.chooseData).length > 0) {
        //   // this.oldData = this.chooseData;
        //   this.$refs.mx.setCurrentRow(this.mx[this.chooseData.index - 1]);
        //   // this.oldData.$cellEdit = false;
        //   // this.$set(this.chooseData, "$cellEdit", true);
        // }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          item.weiUnit = item.weightUnit;
          item.custId = this.detail.custName;
        });
        setTimeout(() => {
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
          }

          this.mxOp.showSummary = true;
          this.loading = false;
        }, 200);
      });
    },
    getPh() {
      if (
        !this.chooseData.whseCalicoinDtlaoid ||
        this.hide === "6" ||
        this.hide === "7"
      ) {
        this.count = [];
        this.countOp.showSummary = false;
        return;
      }
      this.ctLoading = true;
      this.changePhList = [];
      getPbPh({
        whseCalicoinDtlaFk: this.chooseData.whseCalicoinDtlaoid,
        rows: this.phPage.pageSize,
        start: this.phPage.currentPage,
      }).then((res) => {
        let records = res.data;
        this.phPage.total = records.total;
        // this.count = [];

        this.count = records.records;
        if (this.count.length === 0) {
          this.ctLoading = false;
        }
        this.count.forEach((item, index) => {
          item.index = index + 1;

          let _this = this;
          _this.$nextTick(() => {
            document
              .getElementById("count")
              .getElementsByClassName("el-table__row")
              [index].addEventListener(
                "input",
                function () {
                  _this.iptPhChange(item);
                },
                false
              );
          });
          if (index === this.count.length - 1) {
            this.ctLoading = false;
          }
        });
        this.$nextTick(() => {
          this.$refs.count.setCurrentRow();
          this.countOp.showSummary = true;
        });
      });
    },
    add() {
      if (this.hide === "1") {
        if (this.form.registerNo === "" || this.form.registerNo === null) {
          this.$tip.error(this.$t("whseMng.pbbhTle"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceField = "calicoId";
        this.choiceQ.registerNo = this.form.registerNo;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.xzlpdj");
        // return;
      }
      if (this.hide === "6" || this.hide === "7") {
        this.choiceV = !this.choiceV;
        // this.choiceField = "calicoId";
        // this.choiceQ.registerNo = this.form.registerNo;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.xzpbhwb");
        // return;
      }
      if (this.hide === "4") {
        this.choiceV = !this.choiceV;
        // this.choiceField = "calicoId";

        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.xzddpbzl");
        // return;
      }
      if (this.hide === "5") {
        if (this.form.instructId === "" || this.form.instructId === null) {
          this.$tip.error(this.$t("whseMng.jgzldTle"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceQ.materialType = "2";
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("iaoMng.xzzld");
      }
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("choicDlg.qxzrcmx"));
        return;
      } else if (!this.chooseData.whseCalicoinDtlaoid) {
        this.$tip.error(this.$t("choicDlg.qxbcrcmx"));
        return;
      }
      // if (Object.keys(this.oldPhData).length > 0) {
      //   this.oldPhData.$cellEdit = false;
      // }
      if (
        this.count.length > 0 &&
        !this.count[this.count.length - 1].whseCalicoinDtlboid
      ) {
        return;
      }
      if (Object.keys(this.oldPhData).length > 0) {
        this.oldPhData.$cellEdit = false;
      }
      this.count.push({
        index: this.count.length + 1,
        $cellEdit: true,
        whseCalicoinDtlaFk: this.chooseData.whseCalicoinDtlaoid,
        batchNo: this.chooseData.batchNo,
      });

      this.$refs.count.setCurrentRow(this.count[this.count.length - 1]);
      this.iptPhChange(this.count[this.count.length - 1]);
      this.oldPhData = this.count[this.count.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementById("count")
          .getElementsByClassName("el-table__row")
          [this.count.length - 1].addEventListener(
            "input",
            function () {
              _this.iptPhChange(_this.oldPhData);
            },
            false
          );
      });
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    iptPhChange(val) {
      if (this.changePhList.length === 0) {
        this.changePhList.push(val);
      } else {
        for (let i = 0; i < this.changePhList.length; i++) {
          if (val.index === this.changePhList[i].index) {
            this.changePhList[i] = val;
            return;
          }
          if (
            this.changePhList.length - 1 === i &&
            this.changePhList[i].index != val.index
          ) {
            this.changePhList.push(val);
          }
        }
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseCalicoinDtlaoid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        if (this.mx.length > 0) {
          this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        }
        return;
      }

      let tle = "";

      if (this.hide != "6") {
        tle =
          this.$t("iaoMng.delTle6") +
          this.chooseData.calicoId +
          this.$t("iaoMng.delTle2");
      } else {
        tle =
          this.$t("iaoMng.delTle7") +
          this.chooseData.prodNo +
          this.$t("iaoMng.delTle2");
      }
      this.$tip
        .cofirm(tle, this, {})
        .then(() => {
          delPbDetali(this.chooseData.whseCalicoinDtlaoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                this.getDetail();
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
    delPh() {
      if (Object.keys(this.choosePhData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.choosePhData.whseCalicoinDtlboid) {
        this.count.splice(this.choosePhData.index - 1, 1);
        for (let i = 0; i < this.changePhList.length; i++) {
          if (this.changePhList[i].index === this.choosePhData.index) {
            this.changePhList.splice(i, 1);
            this.$refs.count.setCurrentRow(
              this.count[this.count.length - 1] || {}
            );
            return;
          }
        }
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle8") +
            this.choosePhData.batchNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delPbPhDetali(this.choosePhData.whseCalicoinDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.count.splice(this.choosePhData.index - 1, 1);
                this.getPh();
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
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      // if (this.datas === this.$t("iaoMng.hgyl") || this.datas === this.$t("iaoMng.yl")) {
      //   this.getPh();
      //   // this.getLoc();
      // }
      if (!this.chooseData.loc) {
        this.chooseData.loc = [];
      }
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    save() {
      if (
        this.hide === "1" &&
        (this.form.yinId === "" || this.form.registerNo === "")
      ) {
        this.$tip.error(this.$t("iaoMng.saveTle1"));
        return;
      }
      if (this.hide === "5" && !this.form.factoryId) {
        this.$tip.error(this.$t("iaoMng.saveTle2"));
        return;
      }
      if (this.hide === "5" && !this.form.instructId) {
        this.$tip.error(this.$t("iaoMng.saveTle3"));
        return;
      }

      for (let i = 0; i < this.mx.length; i++) {
        // if (!this.mx[i].batchNo) {
        //   this.$tip.error($t('iaoMng.saveTle4'));
        //   return;
        // }
        // if (!this.mx[i].weight || !this.mx[i].weightUnit) {
        //   this.$tip.error("入倉重量/单位不能为空!");
        //   return;
        // }
        // if (!this.mx[i].countingNo) {
        //   this.$tip.error("入仓疋數不能为空!");
        //   return;
        // }
        if (this.mx[i].loc) {
          for (let j = 0; j < this.mx[i].loc.length; j++) {
            if (!this.mx[i].loc[j].weight || !this.mx[i].loc[j].weightUnit) {
              this.$tip.error(this.$t("iaoMng.saveTle6"));
              return;
            }
            // if (!this.mx[i].loc[j].batchNo) {
            //   this.$tip.error(this.$t("iaoMng.saveTle4"));
            //   return;
            // }
          }
        }
        if (this.hide === "6" && !this.mx[i].countingNo) {
          this.$tip.error(this.$t("iaoMng.saveTle10"));
          return;
        }
      }
      this.saved = true;

      if (this.form.finStatus === "" || this.form.finStatus === "null") {
        this.form.finStatus = "1";
      }
      if (this.form.whseCalicoinoid) {
        updatePb(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              // this.mx.forEach((item, i) => {
              //   console.log(data);
              if (item.whseCalicoinDtlaoid) {
                // 更新
                updatePbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseCalicoinFk = this.form.whseCalicoinoid;
                addPbDetali(data).then((res) => {
                  item.whseCalicoinDtlaoid = res.data.data;
                  resolve();
                });
              }
              // });
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  if (!item.whseCalicoinDtlboid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      } else {
        addPb(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          this.form.whseCalicoinoid = Res.data.data;
          
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];

              if (item.whseCalicoinDtlaoid) {
                // 更新
                updatePbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseCalicoinFk = this.form.whseCalicoinoid;
                addPbDetali(data).then((res) => {
                  item.whseCalicoinDtlaoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  if (!item.whseCalicoinDtlboid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }

            // 若是通知单 所有数据保存成功后，对对应的布票状态进行修改为2
            if(this.form.stkinMemoOid){
              updateNoteClothStatus2({stkInOid: this.form.stkinMemoOid})
            }

          });
        });
      }
    },
    savePh() {
      for (let i = 0; i < this.changePhList.length; i++) {
        if (!this.changePhList[i].batchNo || !this.changePhList[i].countingNo) {
          this.$tip.error("批号/疋号不能为空!");
          this.canLeave = true;
          return;
        }
      }
      this.changePhList.forEach((item, index) => {
        if (item.whseCalicoinDtlboid) {
          updatePbPhDetali(item).then((res) => {});
        } else {
          addPbPhDetali(item).then((res) => {});
        }
      });
      this.canLeave = false;
      this.getPh();
      this.$tip.success(this.$t("public.bccg"));
    },
    close() {
      this.$emit("close", this.saved);
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget.yarnsName = val.yarnsId;
      // this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      if (this.choiceTle === this.$t("choicDlg.lpdj")) {
        this.choiceTarget.custName = val.$custCode;
        // this.choiceTarget.custCode = val.custCode;
      }
      if (this.choiceTle === this.$t("choicDlg.xzlpdj")) {
        val.forEach((item, i) => {
          item.weight = item.weights;
          item.weightUnit = item.weightUnit;
          item.countingNo = item.countingNum;
          item.weiUnit = item.weightUnit;
          item.loc = [];
          // for (let i = 0; i < Number(item.countingNo); i++) {
          //   let wei = item.weight / Number(item.countingNo);
          item.loc.push({
            index: 1,
            countingNo: 1,
            batchNo: item.batchNo,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
          // }
        });
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.pbdd")) {
        this.choiceTarget.prodNo = val.$poNo;
        this.choiceTarget.calicoId = val.fabId;
        this.choiceTarget.clothName = val.fabYcount;
      }
      if (this.choiceTle === this.$t("choicDlg.pbbm")) {
        this.choiceTarget.clothName = val.$clothName;
      }
      if (this.choiceTle === this.$t("choicDlg.xzpbhwb")) {
        // if (this.hide === "6") {
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
        // }
        // this.choiceTarget.prodNo = val.prodNo;
        // this.choiceTarget.fabticket = val.fabticket;
        // this.choiceTarget.countingNo = val.countingNo;
      }
      if (this.choiceTle === this.$t("iaoMng.xzzld")) {
        val.forEach((item, i) => {
          item.calicoId = item.materialId;
          item.clothName = item.materialName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzddpbzl")) {
        val.forEach((item, i) => {
          item.prodNo = item.$salPoFk;
          item.calicoId = item.fabId;
          item.clothName = item.fabName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.fabQty,
            weightUnit: item.qtyUnit,
          });
        });
        this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzhw")) {
        this.chooseData.locationCode = val[0].locationCode;
      }
      if (this.choiceTle === this.$t("choicDlg.xzwfpbpl")) {
        this.form.factoryId = val.refCode;
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  created() {},
  updated() {
    this.$nextTick(() => {
      this.$refs["dlgcrud"].doLayout();
    });
  },
  mounted() {
    this.form = this.detail;
    this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
  // .el-input.is-disabled .el-input__inner {
  // color: #606266;
  // background-color: #fff;
  // }
}
</style>