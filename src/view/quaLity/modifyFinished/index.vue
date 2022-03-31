<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-31 14:30:42
 * @Description:
-->
<template>
  <div
    id="modifyFinished"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane label="拆缸管理" name="first">
        <el-row class="btnList">
          <el-button type="success" @click="save">{{
            this.$t("public.save")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form">
            <template slot-scope="scope" slot="vatNo1">
              <el-select
                v-model="form.vatNo1"
                filterable
                remote
                reserve-keyword
                clearable
                default-first-option
                placeholder="请输入缸号"
                :remote-method="vatMethod"
                @change="vatChange"
              >
                <el-option
                  v-for="item in vatList"
                  :key="item.vatNo"
                  :label="item.vatNo"
                  :value="item.vatNo"
                  :disabled="item.vatNo == form.vatNo2"
                >
                </el-option>
              </el-select>
            </template>
            <template slot-scope="scope" slot="vatNo2">
              <el-select
                v-model="form.vatNo2"
                filterable
                remote
                reserve-keyword
                clearable
                default-first-option
                placeholder="请输入缸号"
                :remote-method="vatMethod"
                @change="vatChange"
              >
                <el-option
                  v-for="item in vatList"
                  :key="item.vatNo"
                  :label="item.vatNo"
                  :value="item.vatNo"
                  :disabled="item.vatNo == form.vatNo1"
                >
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </el-row>
        <el-row class="crudBox">
          <el-transfer
            filterable
            v-model="checkData"
            filter-placeholder="关键字搜索"
            :data="finishedNotes"
            :props="{
              key: 'cardId',
              label: 'productNo',
            }"
            :titles="[form.vatNo1 || '拆缸缸号', form.vatNo2 || '目标缸号']"
            style="margin: 10px"
          >
            <span slot-scope="{ option }"
              >{{ option.vatNo }} - {{ option.pidNo }} -
              {{ option.netWeight + "KG" }}</span
            ></el-transfer
          >
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="删除数据" name="second">
        <el-row class="btnList">
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
          <el-button
            type="danger"
            @click="del"
            :disabled="!selectList.length"
            >{{ this.$t("public.del") }}</el-button
          >
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="secondFOp" v-model="secondF">
          </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="secondcrud"
            :option="secondCOp"
            :data="secondC"
            :page.sync="secondPage"
            @on-load="query"
            @selection-change="selectionChange"
          >
          </avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, secondForm, secondCrud } from "./data";
import { get, getFinishList, updateFinished, getFinish, del } from "./api";
export default {
  name: "qcDeatilReport",
  components: {},
  data() {
    return {
      checkData: [],
      finishedNotes: [],
      vatList: [],
      formOp: mainForm(this),
      form: {},
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
      tabs: "first",
      selectList: [],
      secondFOp: secondForm(this),
      secondF: {},
      secondCOp: secondCrud(this),
      secondC: [],
      secondPage: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
    };
  },
  watch: {},
  methods: {
    vatChange() {
      this.wloading = true;
      if (!this.form.vatNo1) {
        this.vat2Change();
        return;
      }
      getFinishList({
        vatNo: this.form.vatNo1,
        cardType: 1,
        // delFlag: "",
      }).then((res) => {
        this.finishedNotes = res.data.sort((a, b) => {
          return a.productNo > b.productNo ? 1 : -1;
        });
        this.vat2Change();
      });
    },
    vat2Change() {
      this.$nextTick(() => {
        if (!this.form.vatNo2) {
          this.wloading = false;
          return;
        }
        getFinishList({
          vatNo: this.form.vatNo2,
          cardType: 1,
          // delFlag: "",
        }).then((res) => {
          this.finishedNotes = this.finishedNotes.concat(
            res.data.sort((a, b) => {
              return a.productNo > b.productNo ? 1 : -1;
            })
          );
          res.data.forEach((item, i) => {
            this.checkData.push(item.cardId);
          });
          this.wloading = false;
        });
      });
    },
    vatMethod(val) {
      get({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      }).then((res) => {
        this.vatList = res.data.records;
      });
    },
    save() {
      this.wloading = true;
      this.finishedNotes.forEach((item, i) => {
        // 属于右侧缸号
        item.vatNo =
          this.checkData.indexOf(item.cardId) != -1
            ? this.form.vatNo2
            : this.form.vatNo1;
        updateFinished(item).then((res) => {
          if (i == this.finishedNotes.length - 1) {
            this.vatChange();
            this.wloading = false;
            this.$tip.success("保存成功！");
          }
        });
      });
    },
    query() {
      this.wLoading = true;
      for (let key in this.secondF) {
        if (!this.secondF[key]) {
          delete this.secondF[key];
        }
      }
      let data = JSON.parse(JSON.stringify(this.secondF));
      let r_clothCheckTime_r = "";
      if (data.clothCheckTime && data.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${data.clothCheckTime[0]} 07:30:00~${data.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      data.vatNo = "%" + (data.vatNo ? data.vatNo : "");
      data.storeLoadCode = "%" + (data.storeLoadCode ? data.storeLoadCode : "");
      data.clothChecker = "%" + (data.clothChecker ? data.clothChecker : "");
      data.clothCheckTime = null;
      getFinish(
        Object.assign(data, {
          rows: this.secondPage.pageSize,
          start: this.secondPage.currentPage,
          isPrinted: true,
          // clothState: this.form.clothState,
          cardType: 1,
          delFlag: false,
        }),
        r_clothCheckTime_r
      ).then((res) => {
        this.secondC = res.data.records;
        if (this.secondC.length > 0) {
          this.$refs.secondcrud.setCurrentRow(this.secondC[0]);
        }
        this.secondC.forEach((item, i) => {
          item.index = i + 1;
        });
        this.secondPage.total = res.data.total;
        this.wLoading = false;
      });
    },
    del() {
      this.$tip.cofirm("是否确定删除选中的数据?").then(() => {
        this.wLoading = true;
        this.selectList.forEach((item, i) => {
          del(item.cardId).then((res) => {
            if (i == this.selectList.length - 1) {
              this.$tip.success("删除成功！");
              this.query();
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
            }
          });
        });
      });
    },
    selectionChange(val) {
      this.selectList = val;
    },
  },
  updated() {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#modifyFinished
  .el-checkbox
    margin-right 0px
  .el-transfer-panel__list.is-filterable
    height calc(100vh - 300px) !important
    text-align left !important
    text-indent 1em !important
  .el-transfer-panel__body
    height calc(100vh - 270px) !important
  .el-transfer-panel
    width 450px
  .el-transfer-panel .el-checkbox__inner
    height 18px
    width 18px
  .el-transfer-panel__item.el-checkbox .el-checkbox__label
    padding-left 34px
    line-height 35px
  .el-transfer-panel__item
    padding-left 0
    text-indent 0.5em
  .el-transfer-panel .el-checkbox__inner::after
    height 8px
    width 4px
    left 6px
  .el-transfer-panel__filter .el-input__inner
    font-size 15px
  .el-transfer-panel__filter
    margin 5px
  .el-tag--mini
    height 28px !important
    // padding: 0 5px;
    line-height 28px !important
    font-size 14px
  .el-input--mini .el-input__inner
    height 33px
    line-height 33px
</style>
