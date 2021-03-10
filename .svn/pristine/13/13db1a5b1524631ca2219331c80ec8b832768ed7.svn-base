<template>
  <div id="proInfo">
    <view-container title="产品信息">
      <avue-data-cardtext :option="option"></avue-data-cardtext>
      <el-dialog
        id="infoDlg"
        :visible.sync="dialogVisible"
        width="100%"
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false"
      >
        <router-view v-if="dialogVisible" class="dlgView"></router-view>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      option: {
        span: 6,
        data: [
          {
            click: () => {
              this.toView("/proSystem");
            },
            title: "物联网系统注册信息",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proEqClassify");
            },
            title: "设备分类",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proEquipment");
            },
            title: "设备管理",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proEmInfo");
            },
            title: "设备监控信息",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proRuleCode");
            },
            title: "规则引擎代码",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proOrderclassify");
            },
            title: "指令分类",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
          {
            click: () => {
              this.toView("/proOrderDefine");
            },
            title: "指令定义",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "产品信息概要，此处------------为占位符",
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    toView(val) {
      this.dialogVisible = true;
      this.$router.push({
        path: val,
      });
    },
    handleClose(done) {
      this.$router.push({
        path: "proInfo",
      });
      done();
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#infoDlg {
  .avue-crud__icon {
    font-size: 24px !important;
    // border-bottom: 1px solid #ccc;
    color: rgb(102, 177, 255);
  }

  .el-table__row i {
    font-size: 18px;
    // border-bottom: 1px solid #ccc;
    color: rgb(102, 177, 255);
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .dlgView {
    height: 100%;
    width: 100%;
  }

  .avue-empty__desc {
    color: #fff;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__body {
    padding: 0 6px 0 4px !important;
  }

  .el-dialog__header {
    padding: 2px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: black;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 15px;
    z-index: 2020;
  }
}
</style>