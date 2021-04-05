/* 
 * @规则引擎代码
 * Created by 作者未知 
 * on 2020-10-10 0:56:50.
 */
<template>
  <div id="ruleCode">
    <view-container title="规则引擎代码">
      <div class="btnList">
        <el-button type="primary" @click="add" :disabled="loading">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="success" @click="sava" :disabled="loading">{{
          this.$t("public.save")
        }}</el-button
        ><el-button type="danger" @click="del" :disabled="loading">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="info" @click="getData" :disabled="loading"
          >取消</el-button
        >
        <el-button type="primary" @click="getData" :disabled="loading">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="danger" @click="close" :disabled="loading">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          v-loading="loading"
          ref="crud"
          :data="data"
          :option="crudOp"
          @current-row-change="cellClick"
          @on-load="getData"
          :page.sync="page"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>

<script>
import {
  getRuleCode,
  updataRuleCode,
  addRuleCode,
  delRuleCode,
} from "@/api/pro/info/index";
export default {
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      chooseData: {},
      oldData: {}, // 记录上一次点击编辑
      changeList: [], // 记录修改的对象
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "规则名称",
            prop: "ruleName",
            span: 6,
          },
          {
            label: "规则编号",
            prop: "ruleKey",
            span: 6,
          },
        ],
      },
      data: [],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 180px)",
        column: [
          {
            label: "规则id",
            prop: "ruleId",
            hide: true,
          },
          {
            label: "规则名称",
            prop: "ruleName",
            cell: true,
          },
          {
            label: "规则编号",
            prop: "ruleKey",
            cell: true,
          },
          {
            label: "规则引擎说明",
            prop: "ruleRemark",
            cell: true,
          },
          {
            label: "规则代码内容",
            prop: "ruleContent",
            cell: true,
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.data = [];
      this.oldData = [];
      this.chooseData = [];
      this.changeList = [];
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      getRuleCode(
        Object.assign(this.form, {
          page: this.page.currentPage,
          rows: this.page.pageSize,
          start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        })
      ).then((res) => {
        this.data = res.data.records;
        this.page.total = res.data.total;
        this.data.forEach((item, index) => {
          item.index = index + 1;
          let _this = this;
          _this.$nextTick(() => {
            document
              .getElementsByClassName("el-table__row")
              [index].addEventListener(
                "input",
                function () {
                  _this.iptChange(item);
                },
                false
              );
          });
        });
        this.loading = false;
      });
    },
    add() {
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.data.push({
        index: this.data.length + 1,
        $cellEdit: true,
      });
      this.$refs.crud.setCurrentRow(this.data[this.data.length - 1]);
      this.iptChange(this.data[this.data.length - 1]);
      this.oldData = this.data[this.data.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [_this.data.length - 1].addEventListener(
            "input",
            function () {
              _this.iptChange(_this.oldData);
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
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip.cofirm("是否确定删除", this, {}).then(() => {
        delRuleCode(this.chooseData.ruleId)
          .then((res) => {
            if (res.data.code === 200) {
              this.$tip.success(this.$t("public.sccg"));
              this.data.splice(this.chooseData.index - 1, 1);
              // this.getData();
            } else {
              this.$tip.warning(this.$t("public.scsb"));
            }
          })
          .catch((err) => {
            this.$tip.error(this.$t("public.scsb"));
          });
      });
    },
    sava() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].ruleName || !this.changeList[i].ruleKey) {
          this.$tip.error("规则名称/编号不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.ruleId) {
          updataRuleCode(item).then((res) => {});
        } else {
          addRuleCode(item).then((res) => {});
        }
      });
      this.getData();
      this.$tip.success(this.$t("public.bccg"));
    },
    cancel() {
      this.getData();
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
  },
  created() {},
};
</script>

<style>
#ruleCode {
}
</style>