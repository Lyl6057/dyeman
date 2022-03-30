<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-30 18:41:07
 * @Description:
-->
<template>
  <div
    id="modifyFinished"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <view-container title="拆缸管理">
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
        ></el-transfer>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import { get, getFinishList, updateFinished } from "./api";
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
    width 250px
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
