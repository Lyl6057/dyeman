<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-15 13:38:44
 * @Description: 
-->
<template>
  <div id="name">
    <div class="btnList">
      <el-button type="primary"  :disabled="hasEdit" @click="add">{{
        this.$t("public.add")
      }}</el-button>
      <el-button type="danger"  :disabled="hasEdit" @click="del">{{
        this.$t("public.del")
      }}</el-button>
      <el-button type="primary"  :disabled="hasEdit" @click="batchAdd">{{
        $t("choicDlg.plsc")
      }}</el-button>

      <template v-if="loc">
          <span style="display:inline-block; padding: 0px 10px">|</span>
          <el-select v-model="curSelLocCode" clearable placeholder="选择货位码进行批量操作">
            <el-option v-for="(item, index) in locationCodeDict" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="handleBatchSelLocCode">批量选择货位码</el-button>
      </template>
     
    </div>

    <div class="crudBox">
      <avue-crud
        ref="crud"
        id="inwhse_ph"
        :option="loc1C"
        :data="inData.loc"
        :page.sync="page"
        v-loading="loading"
        @current-row-change="cellClick"
      >
      </avue-crud>
    </div>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="batchV"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      v-if="batchV"
    >
      <view-container :title="$t('choicDlg.plscph')">
        <div class="btnList">
          <el-button type="success" @click="batch">{{
            $t("public.sc")
          }}</el-button>
          <el-button type="primary" @click="choiceV = true">{{
            $t("choicDlg.xzhw")
          }}</el-button>
          <el-button type="warning" @click="batchV = false">{{
            $t("public.close")
          }}</el-button>         
        </div>
        <div class="formBox">
          <avue-form
            ref="creatForm"
            :option="formOp"
            v-model="creatForm"
          ></avue-form>
        </div>
      </view-container>
    </el-dialog>
    <choice
      ref="choice"
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
import { loc1C, creatForm } from "./data";
export default {
  // 傳進來要新增刪除修改的值，不在此做保存操作，僅做顯示功能
  props: {
    inData: {},
    api: Object,
    form: Object,
    loc: {
      type: Boolean,
      default: true,
    },
    hasEdit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      loc1C: loc1C(this),
      crud: [],
      formOp: creatForm(this),
      creatForm: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzhw"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      oldData: {},
      chooseData: {},
      oldPhData: {},
      batchV: false,

      // 当前选择货位码
      curSelLocCode: ""
    };
  },
  computed:{
    locationCodeDict(){
      return (this.loc1C.column.find(item => item.prop == "locationCode")|| {}).dicData || []
    }
  },
  watch: {
    inData() {
      this.creatForm.batchNo = this.inData.batchNo;
      if (this.inData.loc) {
        this.$refs.crud.setCurrentRow(this.inData.loc[0]);
        if (this.inData.loc.length === 0) {
          this.query();
        }
      }
    },
    hasEdit:{
      handler(value){
        this.changeCrudCellStatus(value);  
      },
      immediate: false,
    }
  },
  methods: {
    // 批量选择货位码
    handleBatchSelLocCode(){
      if(!this.curSelLocCode) return this.$tip.warning("请选择货位码");
      this.$tip.cofirm("是否确认进行所有货位码进行覆盖").then(() => {
           this.inData.loc.forEach(item => {
             item.locationCode = this.curSelLocCode;
           })
      })
    },
    // 修改类型(是否可编辑状态)
    changeCrudCellStatus(value){

      this.loc1C.column.forEach(item => {
        item.prop != "locationCode" &&  (item.cell = !value)
      })
      
    },
    query() {
      if (!this.inData.whseCalicoinDtlaoid) {
        return; // 沒有通行證 不給請求數據
      }
      // 沒有貨位信息時重新請求數據
      this.loading = true;
      this.loc1C.showSummary = false;
      this.chooseData = {};
      this.api
        .getLoc({
          rows: 999,
          start: 1,
          whseCalicoinDtlaFk: this.inData.whseCalicoinDtlaoid,
        })
        .then((res) => {
          let records = res.data;
          // this.page.total = records.total;
          this.inData.loc = records.records;
          if (this.inData.loc.length === 0) {
            this.loading = false;
          }
          this.inData.loc.sort((a, b) => {
            return a.countingNo - b.countingNo;
          });
          this.inData.loc.forEach((item, index) => {
            item.index = index + 1;
          });
          setTimeout(() => {
            this.loc1C.showSummary = true;

            this.loading = false;
          }, 200);
        });
    },
    add() {
      if (this.inData && Object.keys(this.inData).length != 0) {
        this.inData.loc.push({
          index: this.inData.loc.length + 1,
          batchNo: this.inData.batchNo,
          countingNo:
            this.inData.loc.length > 0
              ? this.inData.loc.slice(-1)[0].countingNo + 1
              : 1,
          weightUnit: this.inData.weiUnit
            ? this.inData.weiUnit
            : this.inData.loc.length != 0
            ? this.inData.loc.slice(-1)[0].weightUnit
            : "KG",

          locationCode: "",
        });
        this.$refs.crud.setCurrentRow(
          this.inData.loc[this.inData.loc.length - 1]
        );
        this.$nextTick(() => {
          this.$toTableLow(this, "inwhse_ph");
        });
      } else {
        this.$tip.error(this.$t("public.qxxzmx"));
      }
    },
    batchAdd() {
      if (this.inData && Object.keys(this.inData).length != 0) {
        this.batchV = true;
      } else {
        this.$tip.error(this.$t("public.qxxzmx"));
      }
    },
    del() {
      // return;
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseCalicoinDtlboid) {
        this.inData.loc.splice(this.chooseData.index - 1, 1);
        this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
        this.inData.loc.forEach((item, i) => {
          item.index = i + 1;
        });
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle4") +
            this.chooseData.countingNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.api
            .delLoc(this.chooseData.whseCalicoinDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.inData.loc.splice(this.chooseData.index - 1, 1);
                this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
                this.inData.loc.forEach((item, i) => {
                  item.index = i + 1;
                });
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
      // 切換可編輯狀態
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    choiceData(val) {
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      this.creatForm.locationCode = val[0].locationCode;
      // this.chooseData.locationCode = val[0].locationCode;
      this.$set(this.chooseData, "locationCode", val[0].locationCode);
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    batch() {
      // 批量生成
      this.$refs.creatForm.validate((valid) => {
        // 验证
        if (valid) {
          // this.$emit("batch", this.creatForm);
          this.loading = true;
          let index = this.inData.loc.length;
          for (let i = 0; i < this.creatForm.num; i++) {
            this.inData.loc.push({
              index: index + i + 1,
              batchNo: this.creatForm.batchNo,
              countingNo: index + i + 1,
              weight: this.creatForm.weight,
              weightUnit: this.creatForm.weightUnit,
              locationCode: this.creatForm.locationCode,
            });
          }
          setTimeout(() => {
            this.loading = false;
            this.batchV = false;
          }, 200);
        }
      });
    },
  },
  mounted() {
    this.creatForm.weightUnit = "KG";
  },
};
</script>

<style lang='stylus' ></style>