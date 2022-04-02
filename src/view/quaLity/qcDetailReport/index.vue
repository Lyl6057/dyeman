<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-02 15:32:14
 * @Description:
-->
<template>
  <div
    id="qcDeatilReport"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <view-container title="成品码卡报表">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="outReport" :disabled="!form.vatNo">{{
          this.$t("public.report")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="vatNo">
            <el-select
              v-model="form.vatNo"
              filterable
              remote
              reserve-keyword
              clearable
              default-first-option
              placeholder="请输入缸号"
              :loading="serachLoading"
              :remote-method="remoteMethod"
              @change="query"
            >
              <el-option
                v-for="item in options"
                :key="item.vatNo"
                :label="item.vatNo"
                :value="item.vatNo"
              >
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @cell-click="cellClick"
        >
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import {
  get,
  add,
  update,
  getRunJobByPage,
  getFinishedNote,
  getDismantleVatno,
  updateRunJob,
} from "./api";
export default {
  name: "qcDeatilReport",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        wmUnit: "KG",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wloading: false,
      loading: false,
      serachLoading: false,
      options: [],
    };
  },
  watch: {},
  methods: {
    query() {
      this.wloading = true;
      let data = JSON.parse(JSON.stringify(this.form));
      get(
        Object.assign(data, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          // clothState: this.form.clothState,
          cardType: 1,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total;
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.crud.setCurrentRow(this.crud[0] || {});
          });
          this.wloading = false;
        }, 200);
      });
    },
    remoteMethod(val) {
      this.serachLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.serachLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.form.vatNo = res.data.records[0].vatNo;
          }
        });
      });
    },
    outReport() {
      this.wloading = true;
      // 查询缸号信息
      getRunJobByPage({
        vatNo: this.form.vatNo,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        if (res.data.records.length) {
          let vatData = res.data.records[0]; // 当前缸号信息
          let checkData = {
            vatNo: vatData.vatNo,
            fabricName: vatData.fabName,
            colorName: vatData.colorName,
            yarnBrand: vatData.yarnCard,
            factBatch: vatData.yarnCylinder,
            yarnBatch: vatData.yarnNumber,
            calicoPidCount: vatData.pidCount,
            calicoAmount: vatData.clothWeight,
          };
          // 查询缸号下的成品布
          getFinishedNote({
            vatNo: this.form.vatNo,
            cardType: 1, // 1为有效成品数据
            delFlag: false,
          }).then((note) => {
            checkData.fabricPidCount = note.data.length; // 成品总疋数
            checkData.weightKg = 0; // 成品总重量KG
            checkData.weightLbs = 0; // LBS
            checkData.fabricLength = 0;
            checkData.storeCodes = "";
            note.data.forEach((item, i) => {
              checkData.weightKg += item.netWeight || 0;
              checkData.weightLbs += item.netWeightLbs || 0;
              checkData.fabricLength += item.yardLength || 0;
              checkData.storeCodes +=
                checkData.storeCodes.indexOf(item.storeLoadCode) == -1
                  ? item.storeLoadCode
                    ? item.storeLoadCode + ","
                    : ""
                  : "";
            });
            checkData.weightKg = Number(checkData.weightKg.toFixed(2));
            checkData.weightLbs = Number(checkData.weightLbs.toFixed(2));
            checkData.storeCodes = checkData.storeCodes.replace(/,$/, "");
            // 计算损耗 = (成品重量 / 入缸胚布重量 - 1) *  100
            checkData.lossRate = Number(
              (checkData.weightKg / checkData.calicoAmount - 1) * 100
            ).toFixed(2);
            get({ vatNo: this.form.vatNo }).then((vatNo) => {
              if (vatNo.data.records.length) {
                // 存在记录,修改
                update(
                  Object.assign(checkData, {
                    checkoutId: vatNo.data.records[0].checkoutId,
                    remark: this.form.remark,
                    wmUnit: this.form.wmUnit,
                  })
                ).then((res) => {
                  this.updateDivdWeight();
                  let name = encodeURI(
                    "http:" +
                      process.env.API_HOST.split(":")[1] +
                      ":92/api/proFinalProductCard/warehousingdetails?vatNo=" +
                      this.form.vatNo +
                      "&units=" +
                      this.form.wmUnit
                  );
                  window.open(name);
                  this.wloading = false;
                });
              } else {
                add(
                  Object.assign(checkData, {
                    remark: this.form.remark,
                    checkoutDate: this.$getNowTime("datetime"),
                    wmUnit: this.form.wmUnit,
                  })
                ).then((res) => {
                  this.updateDivdWeight();
                  let name = encodeURI(
                    "http:" +
                      process.env.API_HOST.split(":")[1] +
                      ":92/api/proFinalProductCard/warehousingdetails?vatNo=" +
                      this.form.vatNo +
                      "&units=" +
                      this.form.wmUnit
                  );
                  window.open(name);
                  this.wloading = false;
                });
              }
            });
          });
        } else {
          this.$tip.warning("无此缸号信息！");
        }
      });
    },
    updateDivdWeight() {
      let sIndex = this.form.vatNo.search("[AWR]");
      let sVatNo =
        sIndex > 0 ? this.form.vatNo.substring(0, sIndex) : this.form.vatNo; // 筛选原缸号
      getDismantleVatno(sVatNo).then((res) => {
        getRunJobByPage({
          vatNo: sVatNo,
          rows: 10,
          start: 1,
          page: 1,
        }).then((vatList) => {
          vatList.data.records[0].divdCw = res.data[sVatNo]; // 获取拆缸重量
          updateRunJob(vatList.data.records[0]).then((res) => {}); // 更新原缸拆缸重量
        });
      });
    },
    cellClick(val) {
      this.remoteMethod(val.vatNo);
      this.form.vatNo = val.vatNo;
    },
  },
  updated() {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
