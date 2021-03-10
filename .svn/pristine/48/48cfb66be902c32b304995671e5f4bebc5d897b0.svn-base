<template>
  <div id="ldHeader">
    <el-row>
      <avue-form :option="LdOp" v-model="LdData"></avue-form>
    </el-row>
  </div>
</template>

<script>
import { headOp } from "./ldOption";
export default {
  data() {
    return {
      LdData: {},
      LdOp: headOp(),
      linkData: this.$route.query.data,
      orderData: [],
    };
  },
  methods: {
    getData() {
      // //获取任务对应的LD通知单数据
      this.$http
        .get(
          "/api/salArrangecloth?salArrangeclothoid=" +
            this.linkData.salArrangeclothoid
        )
        .then((res) => {
          //获取客户信息
          this.$http
            .get("/api/basCustomer?custCode=" + res.data.custId)
            .then((res) => {
              this.LdData.custName = res.data[0].custName;
            });
          // 获取LD通知单后获取订单资料;
          this.$http
            .get("/api/salPo?salPooid=" + res.data.salPoFk)
            .then((res) => {
              this.orderData = res.data;
              console.log("orderData", this.orderData);
              this.LdData.colorLights = res.data.colorLights;
              this.LdData.recStandard = res.data.recStandard;
              this.LdData.testRequest = res.data.testRequest;
            });

          //获取订单胚布资料
          this.$http
            .get(
              "/api/salArrangeclothDtla?salArrangeclothDtlaoid=" +
                this.linkData.salArrangeclothDtlaoid
            )
            .then((res) => {
              this.$http
                .get("/api/salPoDtla?salPoDtlaoid=" + res.data.salPoDtlaFk)
                .then((res) => {
                  this.LdData.colorName = res.data.colorName;
                  this.LdData.dyeColorNo = res.data.dyeColorNo;
                  this.LdData.fabComponents = res.data.fabComponents;
                  this.LdData.fabYcount = res.data.fabYcount;
                });
            });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="stylus">
#ldHeader {
  .el-tabs__header {
    margin: 0 0 5px !important;
  }

  .el-dialog__header {
    padding: 0 !important;
    height: 0 !important;
  }

  .el-textarea__inner {
    letter-spacing: 1px;
    font-size: 14px;
    font-family: '微软雅黑';
    padding: 4px 15px;
  }

  .avue-crud .el-input--mini input, .avue-form .el-input--mini input, .el-form-item__label {
    height: 32px !important;
    min-height: 32px !important;
    line-height: 32px !important;
  }

  .el-input--mini .el-input__inner {
    letter-spacing: 1.5px;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  }

  .avue-group__item {
    margin-bottom: 0px !important;
  }

  .avue-form__group .el-col {
    margin-right: 0px !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
  }

  .avue-group__item {
    padding: 0 !important;
  }
}
</style>