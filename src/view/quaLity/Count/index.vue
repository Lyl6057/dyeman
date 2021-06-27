/*
 * @Author: Lyl 
 * @Date: 2019-11-04 10:13:35 
 * @Last Modified by: Lyl
 * @Last Modified time: 2020-05-27 16:03:22
 */

<template>
  <div id="Count">
    <el-row class="queryForm">
      <el-tabs type="border-card">
        <el-tab-pane label="检测统计">
          <el-row class="btnList">
            <el-button type="primary" @click="queryBtn">{{
              this.$t("public.query")
            }}</el-button>
          </el-row>
          <avue-form
            ref="form"
            v-model="form"
            :option="formOption"
            @submit="query"
          ></avue-form>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row class="queryForm">
      <el-tabs v-model="tabs" @tab-click="handleClick" type="border-card">
        <el-tab-pane :label="$t('energy.jybg')" name="CHECK_RECORDER">
          <!-- <avue-crud
              style="margin-top: 5px"
              :data="labData"
              :option="labOption"
              :table-loading="loading"
              @current-row-change="handleCurrentRowChange"
            ></avue-crud> -->
        </el-tab-pane>
        <el-tab-pane :label="$t('energy.psddh')" name="JUDGE_COLO_BIG_CARGO">
          <!-- <avue-crud
              :data="labData"
              :option="labOption"
              :table-loading="loading"
              @current-row-change="handleCurrentRowChange"
            ></avue-crud> -->
        </el-tab-pane>
        <el-tab-pane
          :label="$t('energy.psdbb')"
          name="JUDGE_COLO_ARRANGE_CLOTH"
        >
          <!-- <avue-crud
              :data="labData"
              :option="labOption"
              :table-loading="loading"
              @current-row-change="handleCurrentRowChange"
            ></avue-crud> -->
        </el-tab-pane>
        <el-tab-pane :label="$t('energy.dhsb')" name="BIG_CARGO">
          <!-- <avue-crud
              :data="labData"
              :option="labOption"
              :table-loading="loading"
              @current-row-change="handleCurrentRowChange"
            ></avue-crud> -->
        </el-tab-pane>
        <el-tab-pane :label="$t('energy.bbsb')" name="ARRANGE_CLOTH">
        </el-tab-pane>
      </el-tabs>
      <el-card>
        <avue-crud
          style="margin-top: 5px"
          :data="labData"
          :option="labOption"
          :table-loading="loading"
          @current-row-change="handleCurrentRowChange"
        ></avue-crud>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { cofirm, success, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
export default {
  data() {
    return {
      // TODO: 查询条件
      form: {},
      formOption: {
        menuBtn: false,
        submitBtn: false,
        emptyBtn: false,
        menuPostion: "center",
        column: [
          {
            label: this.$t("energy.ddh"),
            prop: "orderNumber",
            span: 8,
          },
          {
            label: this.$t("energy.kssj"),
            prop: "startTime",
            span: 8,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: this.$t("energy.jssj"),
            prop: "endTime",
            span: 8,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
        ],
      },
      // TODO: Tabs
      tabs: "CHECK_RECORDER",
      labData: [],
      labOption: {
        align: "center",
        page: false,
        menuAlign: "cnetr",
        menu: false,
        addBtn: false,
        columnBtn: false,
        refreshBtn: false,
        highlightCurrentRow: true,
        height: "calc(100vh - 230px)",
        border: true,
        column: [
          {
            label: this.$t("energy.jcxm"),
            prop: "projectName",
            span: 8,
            width: 180,
          },
          {
            label: this.$t("energy.ddh"),
            prop: "orderNumber",
            span: 8,
            width: 160,
          },
          {
            label: this.$t("energy.kssj"),
            prop: "startTime",
            span: 14,
            width: 180,
            type: "date",
          },
          {
            label: this.$t("energy.jssj"),
            prop: "endTime",
            span: 14,
            width: 180,
            type: "date",
          },
          {
            label: this.$t("energy.tg"),
            prop: "passed",
            span: 8,
          },
          {
            label: this.$t("energy.wtg"),
            prop: "notPass",
            span: 8,
          },
          {
            label: this.$t("energy.tgl"),
            prop: "passingRate",
            span: 8,
          },
        ],
      },
      loading: false,
      checkData: {},
    };
  },
  methods: {
    //查询
    query(form, done) {
      this.labData = [];
      let data = form;
      this.$http
        .get(
          "/api/projectPassRate?endTime=" +
            form.endTime +
            "&orderNumber=" +
            form.orderNumber +
            "&startTime=" +
            form.startTime +
            "&projectType=" +
            this.tabs +
            ""
        )
        .then((res) => {
          res.data.projectName = this.tabs;
          this.labData.push(res.data);
          this.$message.success(this.$t("energy.cxcg"));
        })
        .catch((err) => {
          if (RegExp(/500/).test(err)) {
            this.loading = false;
          } else {
            error(this.$t("energy.fwqcw"));
          }
        });
      done();
    },
    queryBtn() {
      this.$refs.form.submit();
    },
    //切换选项卡
    handleClick(tab, event, lodding) {
      this.loading = true;
      this.labData = [];
      this.checkData = {};
      this.$http
        .get("/api/projectPassRate?projectType=" + tab.name + "")
        .then((res) => {
          res.data.projectName = tab.name;
          this.labData.push(res.data);
          this.loading = false;
        })
        .catch((err) => {
          if (RegExp(/500/).test(err)) {
            this.loading = false;
          } else {
            error(this.$t("energy.fwqcw"));
          }
        });
    },
    //获取tabs第一条的数据
    getData() {
      this.loading = true;
      //检测报告
      this.$http
        .get("/api/projectPassRate?projectType=" + this.tabs + "")
        .then((res) => {
          res.data.projectName = this.tabs;
          this.labData.push(res.data);
          this.loading = false;
        })
        .catch((err) => {
          if (RegExp(/500/).test(err)) {
            this.loading = false;
          } else {
            error(this.$t("energy.fwqcw"));
          }
        });
    },
    handleCurrentRowChange(row) {
      this.checkData = row;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="stylus">
#Count {
  .avue-form__group {
    margin-top: 5px;
    margin-left: -10px;
  }
}
</style>