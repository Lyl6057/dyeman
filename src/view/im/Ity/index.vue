<template>
  <div id="proIndex">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="rc" label="库存管理">
        <span slot="label"
          ><i style="font-size: 20px" class="el-icon-s-home"></i> 库存管理</span
        >
        <div class="main tabs1">
          <el-row>
            <el-col :span="24">
              <avue-data-cardtext :option="rc.option1"></avue-data-cardtext
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-dialog
        id="viewDlg"
        :visible.sync="dialogVisible"
        fullscreen
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
      tabs: "rc",
      kanban: false,
      rc: {
        option1: {
          span: 4,
          data: [
            // level_1
            {
              click: () => {
                this.toView("ityBasic");
              },
              title: "库存期初定义",
              icon: "el-icon-s-order",
              color: "#409EFF",
              // content: "",
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
      this.$router.push({
        path: val,
      });

      // this.$router.push({
      //   path: val,
      //   query: data,
      // });
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#kbDlg {
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff !important;
    font-size: 24px;
  }

  // .el-dialog__body {
  // padding: 0 !important;
  // }
  .el-input__inner, .avue-form__group, .el-form-item__label {
    border: none !important;
    background: #021a3c;
    color: #fff;
  }

  .el-card__body {
    padding: 0 0px 0 0 !important;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-right-color: #fff !important;
    border-left-color: #fff;
  }

  #points .el-tabs__item {
    border-right: 1px solid #606266;
  }

  .avue-form__group .el-input__suffix {
    display: none;
  }
}

#wkRuleDlg {
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label {
    font-size: 16px;
    height: 30px;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .el-dialog__header {
    padding: 0px;
  }

  .el-dialog__headerbtn {
    top: 5px;
    color: #000;
    font-size: 22px;
    z-index: 999;
  }

  .formBox {
    margin-bottom: 0px;
  }

  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu {
    min-height: 5px !important;
    height: 5px !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }
}

#wkDlg, #sxrcDlg, #kbDlg {
  // .el-table__fixed-body-wrapper {
  // top: 45px !important;
  // }

  // .el-input__inner {
  // border: none;
  // border-bottom: 1px solid #fff;
  // border-radius: 0;
  // font-size: 20px;
  // color: #fff;
  // cursor: auto;
  // background-color: rgb(2, 26, 60);
  // }

  // .el-form-item__label {
  // color: #fff;
  // font-size: 19px !important;
  // font-weight: bold;
  // }

  // .avue-group .el-collapse, .avue-group .el-collapse-item__wrap {
  // background-color: rgb(2, 26, 60);
  // }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
    // background-color: #fff;
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
    color: #000;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    // background-color: rgb(2, 26, 60);
    overflow: hidden;
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

#proIndex {
  height: 100%;
  width: 100%;

  .avue-data-cardText .item {
    padding: 10px 2px;
    margin: 10px 10px;
  }

  .avue-data-cardText .item-header a {
    margin-left: 2px;
  }

  .el-tabs--border-card {
    // background: rgb(0, 0, 0, 0);
    // border: none;
  }

  .main {
    min-width: 1000px;
    // width: 100%;
    height: calc(100vh - 80px);
    min-height: 500px;
    overflow: auto;
  }

  .item-header {
    color: #409EFF;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #pane-rc {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .el-icon-bell {
    display: none;
  }

  .item-footer {
    display: none;
  }

  .avue-data-cardText .item-content {
    margin-top: 10px;
    display: none;
  }
}

.avue-data-cardText .item-header a {
  font-size: 15px;
}

.countBox {
  width: 99% !important;
  margin: 2px auto;
  height: calc(100vh - 90px);
  min-height: 500px;
  overflow: auto;

  .el-card {
    margin-top: 5px;
  }

  .data-icons .item-info {
    font-size: 18px;
    line-height: 15px;

    span {
      font-size: 16px;
      font-weight: 700;
    }

    .count {
      font-size: 18px;
    }
  }

  .item-footer {
    display: block !important;
    text-align: left;
    color: #fff;

    p {
      font-size: 14px;
      color: #fff;
    }

    span {
      font-size: 16px;
      color: #fff;
    }
  }

  .item-header {
    color: #fff !important;
  }
}

.el-input.is-disabled .el-input__inner {
  color: #606266;
  // background-color: #fff;
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