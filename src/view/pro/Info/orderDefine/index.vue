/* 
 * @规则引擎代码
 * Created by 作者未知 
 * on 2020-10-10 0:56:50.
 */
<template>
  <div id="orderDefine">
    <view-container title="指令定义">
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
  getOrderDefine,
  updataOrderDefine,
  addOrderDefine,
  delOrderDefine,
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
            label: "指令名称",
            prop: "instrucName",
            span: 6,
          },
          {
            label: "指令编号",
            prop: "instrucCode",
            span: 6,
          },
          {
            label: "是否可用",
            prop: "isAvailable",
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
            label: "指令ID",
            prop: "instrucId",
            hide: true,
          },
          {
            label: "指令名称",
            prop: "instrucName",
            cell: true,
          },
          {
            label: "指令编号",
            prop: "instrucCode",
            cell: true,
          },
          {
            label: "功能描述",
            prop: "functionDes",
            cell: true,
          },
          {
            label: "是否可用",
            prop: "isAvailable",
            cell: true,
            type: "select",
            dicData: [
              {
                value: true,
                label: "否",
              },
              {
                value: false,
                label: "是",
              },
            ],
          },
          {
            label: "指令分类ID",
            prop: "classifyId",
            cell: true,
          },
          {
            label: "输入规则ID",
            prop: "inRuleId",
            cell: true,
          },
          {
            label: "输出规则ID",
            prop: "outRuleId",
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
      getOrderDefine(
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
        delOrderDefine(this.chooseData.instrucId)
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
        if (
          !this.changeList[i].instrucName ||
          !this.changeList[i].instrucCode
        ) {
          this.$tip.error("指令名称/编号不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.instrucId) {
          updataOrderDefine(item).then((res) => {});
        } else {
          addOrderDefine(item).then((res) => {});
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
  mounted() {},
};
</script>

<style>
</style>