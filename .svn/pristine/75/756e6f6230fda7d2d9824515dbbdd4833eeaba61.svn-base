<template>
  <div id="ekIndex">
    <view-container title="设备看板">
      <avue-data-cardtext :option="option"></avue-data-cardtext>
      <el-dialog
        id="elDlg"
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
          // {
          //   click: () => {
          //     this.toView("/gc_points");
          //   },
          //   title: "点数看板",
          //   icon: "el-icon-s-claim",
          //   color: "#606266",
          //   content: "点数看板概要，此处------------为占位符",
          // },
          // {
          //   click: () => {
          //     this.toView("/gc_warehousing");
          //   },
          //   title: "入库看板",
          //   color: "#606266",
          //   icon: "el-icon-s-home",
          //   content: "入库信息概要，此处------------为占位符",
          //   href: "#",
          //   date: "点击进入",
          // },
          {
            click: () => {
              this.toView("/gc_outbound");
            },
            title: "松布看板",
            icon: "el-icon-truck",
            color: "#606266",
            content: "入库信息概要，此处------------为占位符",
          },
          {
            title: "其他看板",
            icon: "el-icon-time",
            color: "green",
            content: "入库信息概要，此处------------为占位符",
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
        path: "mtoEk",
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
#elDlg {
  // .el-table__fixed-body-wrapper {
  // top: 45px !important;
  // }
  .el-input__inner {
    border: none;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    font-size: 20px;
    color: #fff;
    cursor: auto;
    background-color: rgb(2, 26, 60);
  }

  .el-form-item__label {
    color: #fff;
    font-size: 19px !important;
    font-weight: bold;
  }

  .avue-group .el-collapse, .avue-group .el-collapse-item__wrap {
    background-color: rgb(2, 26, 60);
  }

  .dlgView {
    height: 100%;
    width: 100%;
  }

  .avue-crud__menu {
    height: 32px !important;
    min-height: 32px !important;
    font-size: 18px;
    margin-bottom: 0 !important;
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
    padding: 0 4px 0 0 !important;
  }

  .el-dialog__header {
    padding: 2px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 15px;
    z-index: 2020;
  }
}

#ekIndex {
}

.yx-icf-bupi:before {
  content: '\e71c';
}

.yx-icf-cailiaogongcheng:before {
  content: '\e61c';
}

.yx-icf-xian:before {
  content: '\e746';
}

.yx-icf-xian1:before {
  content: '\e747';
}

.yx-icf-buliao:before {
  content: '\e74b';
}

.yx-icf-taishidiannao:before {
  content: '\e608';
}

.yx-icf-diannao:before {
  content: '\e768';
}
</style>