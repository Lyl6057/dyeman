<template>
  <div id="proPlan">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="tab1" label="生产进度">
        <span slot="label"
          ><i style="font-size: 20px" class="el-icon-s-home"></i> 生产进度</span
        >
        <div class="main">
          <el-row>
            <el-col :span="4">
              <avue-data-cardtext :option="tab1.option1"></avue-data-cardtext
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-dialog
        id="proPlanDlg"
        :visible.sync="dialogVisible"
        fullscreen
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <router-view v-if="dialogVisible" class="dlgView"></router-view>
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      tabs: "tab1",
      tab1: {
        option1: {
          span: 24,
          data: [
            // level_1
            {
              title: "订单",
              icon: "yx-icf-xian1",
              color: "#606266",
              content: "",
            },

            // level_2
            {
              click: () => {
                this.toView("proOrder", "订单进度");
              },
              title: "订单进度",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              content: "订单进度",
            },
          ],
        },
      },
    };
  },
  watch: {},
  methods: {
    toView(val, type) {
      this.dialogVisible = true;
      let data = {
        type: type,
      };
      localStorage.setItem("proPlan", JSON.stringify(data));
      this.$router.push({
        name: val,
        params: data,
      });

      // this.$router.push({
      //   path: val,
      //   query: data,
      // });
    },
    handleClose(done) {
      this.$router.push({
        path: "proPlan",
      });
      localStorage.removeItem("proPlan");
      done();
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#proPlanDlg {
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px;
  }

  .el-card__body {
    padding: 0 !important;
  }

  // .el-table__fixed-body-wrapper {
  // top: 45px !important;
  // }
  .avue-crud__menu {
    height: 32px !important;
    min-height: 32px !important;
    font-size: 18px;
    margin-bottom: 0 !important;
  }

  .avue-empty__desc {
    color: #000;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    overflow: hidden !important;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header {
    padding: 0px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 5px;
    z-index: 2020;
  }
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