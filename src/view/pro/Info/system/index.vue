<template>
  <div id="system">
    <view-container title="系统注册信息">
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
        <el-button type="info" @click="cancel" :disabled="loading"
          >取消</el-button
        >
        <el-button type="primary" @click="query" :disabled="loading">{{
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
  getSystem,
  updataSystem,
  addSystem,
  delSystem,
} from "@/api/pro/info/index";
export default {
  name: "system",
  components: {},
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
            label: "系统名称",
            prop: "systemName",
            tip: "系统名称",
            span: 6,
          },
          {
            label: "系统编号",
            prop: "systemCode",
            tip: "系统编号",
            span: 6,
          },
          {
            label: "联系人",
            prop: "contacts",
            tip: "联系人",
            span: 6,
          },
          {
            label: "开发公司",
            prop: "developCompany",
            tip: "开发公司",
            span: 6,
          },
        ],
      },
      data: [
        {
          systemName: "视频监控系统",
          systemCode: 1,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company1",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test1",
          mqName: "test1",
          mqCode: "test1",
          index: 1,
        },
        {
          systemName: "考勤系统",
          systemCode: 2,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company2",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test2",
          mqName: "test2",
          mqCode: "test2",
          index: 2,
        },
        {
          systemName: "门禁系统",
          systemCode: 3,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company3",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test3",
          mqName: "test3",
          mqCode: "test3",
          index: 3,
        },
        {
          systemName: "染缸中控系统",
          systemCode: 4,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company4",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test4",
          mqName: "test4",
          mqCode: "test4",
          index: 4,
        },
        {
          systemName: "自动注料系统",
          systemCode: 5,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company5",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test5",
          mqName: "test5",
          mqCode: "test5",
          index: 5,
        },
        {
          systemName: "仓管系统",
          systemCode: 6,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company6",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test6",
          mqName: "test6",
          mqCode: "test6",
          index: 6,
        },
        {
          systemName: "物流系统",
          systemCode: 7,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company7",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test7",
          mqName: "test7",
          mqCode: "test7",
          index: 7,
        },
        {
          systemName: "自动打包系统",
          systemCode: 8,
          token: "MTYwMjEyMjk3Mw==",
          supportCompany: "company8",
          contacts: "欧先生",
          linkWay: "132222222",
          developCompany: "test8",
          mqName: "test8",
          mqCode: "test8",
          index: 8,
        },
      ],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 180px)",
        column: [
          {
            label: "#",
            prop: "index",
            tip: "#",
            width: 50,
          },
          {
            label: "系统ID",
            prop: "iotId",
            tip: "系统名称",
            display: true,
            hide: true,
          },
          {
            label: "系统名称",
            prop: "systemName",
            tip: "系统名称",
            cell: true,
          },
          {
            label: "系统编号",
            prop: "systemCode",
            tip: "系统编号",
            cell: true,
          },
          {
            label: "通行令牌",
            prop: "token",
            tip: "通行令牌",
            // cell: true,
          },
          {
            label: "技术支持公司",
            prop: "supportCompany",
            tip: "技术支持公司",
            cell: true,
          },
          {
            label: "联系人",
            prop: "contact",
            tip: "联系人",
            cell: true,
          },
          {
            label: "联系方式",
            prop: "linkWay",
            tip: "联系方式",
            cell: true,
          },
          {
            label: "开发公司",
            prop: "developCompany",
            tip: "开发公司",
            cell: true,
          },
          {
            label: "消息队列名称",
            prop: "mqName",
            tip: "消息队列名称",
            cell: true,
          },
          {
            label: "消息队列关键词",
            prop: "mqCode",
            tip: "消息队列关键词",
            cell: true,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    getData() {
      this.data = [];
      this.oldData = [];
      this.chooseData = {};
      this.changeList = [];
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      getSystem(
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
        delSystem(this.chooseData.iotId)
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
        if (!this.changeList[i].systemName || !this.changeList[i].systemCode) {
          this.$tip.error("设备/报警时间不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.iotId) {
          updataSystem(item).then((res) => {});
        } else {
          addSystem(item).then((res) => {});
        }
      });
      this.getData();
      this.$tip.success(this.$t("public.bccg"));
    },
    cancel() {
      this.getData();
    },
    query() {},
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
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#system {
  .el-table {
    // min-height: 300px;
    // max-height: 80vh;
    // overflow: auto;
  }
}
</style>