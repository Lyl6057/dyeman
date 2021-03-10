<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-05 16:28:49
 * @Description: 
-->
<template>
  <div id="name">
    <div class="btnList">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="danger" @click="del">刪除</el-button>
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
      choiceTle: "選擇貨位",
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
      this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
      if (this.inData.loc.length === 0) {
        this.query();
      }
    },
  },
  methods: {
    query() {
      if (
        !this.inData.whseYarninDtloid &&
        !this.inData.whseChemicalinDtlaoid &&
        !this.inData.whseDyesainDtlaoid
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
      if (this.inData && Object.keys(this.inData).length != 0) {
        this.choiceV = true;
      } else {
        this.$tip.error("請先選擇明顯");
      }
    },
    del() {
      // return;
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (
        !this.chooseData.whseYarninDtlaoid &&
        !this.chooseData.whseChemicalinDtlcoid &&
        !this.chooseData.whseDyesainDtlcoid
      ) {
        this.inData.loc.splice(this.chooseData.index - 1, 1);
        this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除貨位碼为 【 " +
            this.chooseData.locationCode +
            " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          this.api
            .delLoc(
              this.type === "紗線"
                ? this.chooseData.whseYarninDtlaoid
                : this.type === "化工原料"
                ? this.chooseData.whseChemicalinDtlcoid
                : this.chooseData.whseDyesainDtlcoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.inData.loc.splice(this.chooseData.index - 1, 1);
                this.inData.loc.forEach((item, index) => {
                  item.index = index + 1;
                });
                this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
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
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  mounted() {},
};
</script>

<style lang='stylus' ></style>