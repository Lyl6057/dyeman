<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-04 10:53:20
 * @Description: 
-->
<template>
  <div id="name">
    <div class="btnList">
      <el-button type="primary" @click="add">{{
        this.$t("public.add")
      }}</el-button>
      <el-button type="danger" @click="del">{{
        this.$t("public.del")
      }}</el-button>
    </div>

    <div class="crudBox">
      <avue-crud
        ref="crud"
        :option="loc1C"
        :data="inData.loc"
        :page.sync="page"
        v-loading="loading"
        @current-row-change="cellClick"
      >
      </avue-crud>
    </div>
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
import { loc1C } from "./data";
export default {
  // 傳進來要新增刪除修改的值，不在此做保存操作，僅做顯示功能
  props: {
    inData: {},
    api: Object,
    form: Object,
    type: String,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      loc1C: loc1C(this),
      crud: [],
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
    };
  },
  watch: {
    inData() {
      if (this.inData.loc) {
        this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
        if (this.inData.loc.length === 0) {
          this.query();
        }
      }
    },
  },
  methods: {
    query() {
      if (
        !this.inData.whseYarninDtloid &&
        !this.inData.whseChemicalinDtlaoid &&
        !this.inData.whseDyesainDtlaoid &&
        !this.inData.whseAccessoriesDtloid
      ) {
        return; // 沒有通行證 不給請求數據
      }
      // 沒有貨位信息時重新請求數據
      this.loading = true;
      this.api
        .getLoc({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseYarninDtlFk: this.inData.whseYarninDtloid,
          whseChemicalinDtlaFk: this.inData.whseChemicalinDtlaoid,
          whseDyesainDtlaFk: this.inData.whseDyesainDtlaoid,
          whseAccessoriesDtlFk: this.inData.whseAccessoriesDtloid,
        })
        .then((res) => {
          let records = res.data;
          // this.page.total = records.total;
          this.inData.loc = records.records;
          if (this.inData.loc.length === 0) {
            this.loading = false;
          }
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
      if (this.inData && Object.keys(this.inData).length > 1) {
        // this.choiceV = true;

        this.inData.loc.push({
          index: this.inData.loc.length + 1,
        });
      } else {
        this.$tip.error(this.$t("choicDlg.qxzrcmx"));
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseYarninDtlaoid &&
        !this.chooseData.whseChemicalinDtlcoid &&
        !this.chooseData.whseDyesainDtlcoid &&
        !this.chooseData.whseAccessoriesDtlaoid
      ) {
        this.inData.loc.splice(this.chooseData.index - 1, 1);
        this.inData.loc.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.inData.loc.length) {
          this.$refs.crud.setCurrentRow(this.inData.loc[0]);
        } else {
          this.$refs.crud.setCurrentRow();
        }

        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle5") +
            this.chooseData.locationCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.api
            .delLoc(
              this.type === this.$t("iaoMng.sx")
                ? this.chooseData.whseYarninDtlaoid
                : this.type === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseChemicalinDtlcoid
                : this.type === this.$t("iaoMng.scfl")
                ? this.chooseData.whseAccessoriesDtlaoid
                : this.chooseData.whseDyesainDtlcoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.inData.loc.splice(this.chooseData.index - 1, 1);
                this.inData.loc.forEach((item, index) => {
                  item.index = index + 1;
                });
                this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
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
      if (val.length === 0 || Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      let index = this.inData.loc.length;
      this.inData.loc = this.$unique(
        this.inData.loc.concat(val),
        "locationCode"
      );
      this.inData.loc.forEach((e, index) => {
        e.index = index + 1;
      });
      this.$refs.crud.setCurrentRow(this.inData.loc[index]); // 選擇最後一條數據
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  mounted() {},
};
</script>

<style lang='stylus' ></style>