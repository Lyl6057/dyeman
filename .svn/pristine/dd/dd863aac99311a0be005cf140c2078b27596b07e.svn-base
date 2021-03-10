<template>
  <div id="RtIndex">
    <view-container title="实时监控">
      <avue-data-cardtext :option="option"></avue-data-cardtext>
      <el-dialog
        id="rtDlg"
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
              this.toView("/portScan");
            },
            title: "端口扫描",
            icon: "el-icon-s-claim",
            color: "#606266",
            content: "点数看板概要，此处------------为占位符",
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
      this.$router.go(-1);
      done();
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rtDlg {
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
    padding: 0 4px 0 0 !important;
  }

  .el-dialog__header {
    padding: 2px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 15px;
    z-index: 2020;
  }
}

#RtIndex {
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