<!--
 * @Author: Lyl
 * @Date: 2021-06-08 17:50:06
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-09 14:42:48
 * @Description: 
-->
<template>
  <div id="com-normal">
    <view-container
      :title="title + '管理'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button
          type="success"
          @click="handleRowDBLClick(chooseData)"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          $t("public.add")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.del") }}</el-button
        >
        <el-button type="primary" @click="query">{{
          $t("public.query")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          @on-load="query"
          @current-row-change="cellClick"
          @row-dblclick="handleRowDBLClick"
          :page.sync="page"
        ></avue-crud>
      </div>
    </view-container>
    <el-dialog
      :visible.sync="visibleDlg"
      id="colorMng_Dlg"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :element-loading-text="$t('public.loading')"
      v-loading="dLoading"
    >
      <view-container :title="title + '维护'">
        <div class="btnList">
          <el-button type="success" @click="save(dlgForm)">{{
            $t("public.save")
          }}</el-button>
          <el-button type="warning" @click="visibleDlg = false">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox" style="height: calc(100vh - 120px)">
          <avue-form
            ref="dlgForm"
            :option="crudOp"
            v-model="dlgForm"
          ></avue-form>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    title: String,
    formOp: Object,
    crudOp: Object,
    api: Object,
    addParams: Object,
    sortObj: String,
    apiParams: Object,
  },
  data() {
    return {
      wLoading: false,
      form: {},
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
      oldData: {},
      visibleDlg: false,
      dlgForm: {},
      dLoading: false,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      this.api
        .get(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          let resData = res.data;
          this.crud = resData.records;
          this.page.total = resData.total;
          if (this.apiParams.sort) {
            this.crud.sort((a, b) => {
              return a[this.apiParams.sort] > b[this.apiParams.sort] ? 1 : -1;
            });
          }
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        })
        .catch((e) => {
          console.log(e);
          this.wLoading = false;
        });
    },
    save(val) {
      if (val[this.apiParams.save]) {
        this.api
          .update(val)
          .then((res) => {
            if (res.data.code == 200) {
              this.query();
              this.dLoading = false;
              this.$tip.success("保存成功!");
            }
          })
          .catch((e) => {
            this.$tip.error(e);
          });
      } else {
        this.api
          .add(val)
          .then((res) => {
            if (res.data.code == 200) {
              this.dlgForm.carriageStorageId = res.data.data;
              this.query();
              this.dLoading = false;
              this.$tip.success("保存成功!");
            }
          })
          .catch((e) => {
            this.$tip.error(e);
          });
      }
    },
    cellClick(val) {
      this.chooseData = JSON.parse(JSON.stringify(val));
    },
    handleRowDBLClick(val) {
      this.visibleDlg = true;
      this.chooseData = val;
      this.dlgForm = JSON.parse(JSON.stringify(val));
    },
    add() {
      this.visibleDlg = true;
      for (let key in this.dlgForm) {
        delete this.dlgForm[key];
      }
      this.dlgForm = this.addParams;
    },
    del() {
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle11") +
            this.chooseData[this.apiParams.delTle] +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.api
            .del(this.chooseData[this.apiParams.save])
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
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
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#com-normal {
}
</style>