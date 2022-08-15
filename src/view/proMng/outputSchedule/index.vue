<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-14 13:38:56
 * @Description: 
-->
<template>
  <div id="prowovenrealWeight" v-loading="loading" :element-loading-text="$t('public.loading')">
    <view-container title="生产进度统计">
      <!-- <div class="other-dtl-wrapper">
        <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
          <el-button type="primary" @click="meaveDomMove()">{{handleQueryexportExcel this.$t("public.query") }}</el-button>
        </el-tooltip>
      </div> -->
      <el-form class="form-wrapper" :model="form" inline size="medium">
        <el-form-item label="织造生产单号">
          <el-input v-model="form.weaveJobCode" clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="是否外发单">
          <el-select v-model="form.isWorkOut" placeholder="" clearable="true">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery"> {{ $t("public.query") }}</el-button>
          <el-button type="success" size="medium" @click="exportExcel()"> 报表</el-button>
        </el-form-item>
      </el-form>
      <!-- <div style="margin: 10px !important">
        <avue-form ref="form" :option="formOp" v-model="form" @submit="handleQuery"> </avue-form>
      </div> -->
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud ref="crud" :option="crudOp" :data="crudData" :page.sync="page" @on-load="handleQuery">
            </avue-crud>
          </el-col>
        </el-row>
      </div>
    </view-container>

  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { fetchProSchuduleData, getReport } from "./api";
export default {
  name: "prowovenrealWeight",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        isWorkOut: "",
        weaveJobCode: ""
      },
      crudOp: mainCrud(this),
      crudData: [],
      loading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },

    };
  },
  watch: {},
  methods: {
    handleQuery(form, done) {

      this.loading = true;
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        weaveJobCode: this.form.weaveJobCode,
        isWorkOut: this.form.isWorkOut
      }

      fetchProSchuduleData(params).then((res) => {
        this.anslysisData(res.data.records);
        this.page.total = res.data.total;
      }).finally(() => {
        done && done();
        this.loading = false;
      });
    },
    // 数据解析
    anslysisData(resData) {
      let tDataMap = {}
      resData.forEach((item, index) => {
        if (!tDataMap[item.weaveJobCode]) {
          tDataMap[item.weaveJobCode] = {
            id: item.weaveJobCode,
            weaveJobCode: item.weaveJobCode,
            isWorkOut: item.isWorkOut,
            grossWeight: 0,
            clothWeight: 0,
            weightedQty: 0,
            inStockQty: 0,
            outStockQty: 0,
            qcDeductQty: 0,
            amount: item.amount,
            diffQty: 0,
            children: []
          }
        }
        let tData = tDataMap[item.weaveJobCode];
        tData.children.push({
          isWorkOut: item.recordMonth,
          grossWeight: item.grossWeight,
          clothWeight: item.clothWeight,
          weightedQty: item.weightedQty,
          inStockQty: item.inStockQty,
          outStockQty: item.outStockQty,
          qcDeductQty: item.qcDeductQty,
          // amount: item.amount,
          id: item.weaveJobCode + index,
          // diffQty: item.amount - item.clothWeight
        })

        tData.grossWeight += item.grossWeight;
        tData.clothWeight += item.clothWeight;
        tData.weightedQty += item.weightedQty;
        tData.inStockQty += item.inStockQty;
        tData.outStockQty += item.outStockQty;
        tData.qcDeductQty += item.qcDeductQty;
        // tData.amount += item.amount;
        // tData.diffQty += (item.amount - item.clothWeight);

      });

      let resultData = Object.values(tDataMap);
      resultData.forEach(item => {
        item.children.sort((a, b) => b.isWorkOut - a.isWorkOut)
        item.diffQty = item.amount - item.clothWeight
      });

      this.crudData = resultData;
    },
    exportExcel() {
      try {
        this.loading = true;
        let url = process.env.API_HOST + //process.env.API_HOST
          "/api/proWeaveJob/statisticalReport?" +
          `weaveJobCode=${this.form.weaveJobCode}&` +
          `isWorkOut=${this.form.isWorkOut}`
        let oA = document.createElement("a");
        oA.href = url;
        oA.target = "_blank";
        oA.click();
        this.loading = false;
        this.$tip.success("导出报表文件成功!")
      } catch (error) {
        this.$tip.error("操作失败！")
      }

    }
  },
  created() { },
  mounted() {
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus' scoped>
>>>.avue-form__menu{
  display: block !important
}
>>>.avue-form__menu--center{
  margin-top: 0 !important
}
>>>.el-table__body-wrapper{
  border-bottom: 1px solid #eee !important
}
.el-popover {
  width: 230px !important;
}

#prowovenrealWeight {
  .gantBox {
    color: #5A565B;
    // background-color: rgb(191, 242, 254);
    margin-top: 7px;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    cursor: pointer;
  }

  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }

  .ganttLabel {
    position: absolute;
    left: 101%;
    top: 7px;
    width: 200px;
    height: 25px;
    line-height: 25px;
    text-align: left;
  }

  .finished {
    background-color: #96EBAE;
  }

  .unfinished {
    background-color: #8EE8EE;
  }

  .el-table .cell {
    line-height: 29px !important;
  }

  .graphical1 {
    height: 320px;
  }

  // .gantt-blocks {
  // height: 100% !important;
  // }
  .gantt-container {
    width: 100% !important;
    // height: 325px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #zzt {
  }

  .gantt-leftbar-item {
    color: #5A565B;
    font-size: 16px;
    line-height: 40px;
    height: 39px !important;
    border-bottom: 1px solid #eee;
  }

  .gantt-block-top-space {
    height: 0 !important;
  }
}

.form-wrapper{
  display flex;
  justify-content flex-start;
  padding 10px 0 0 15px
  margin-left 10px
}
</style>