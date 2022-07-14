<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-14 10:40:45
 * @Description: 
-->
<template>
  <div id="prowovenrealWeight" v-loading="loading" :element-loading-text="$t('public.loading')">
    <view-container title="生产进度统计">
      <div style="margin: 10px !important">
        <avue-form ref="form" :option="formOp" v-model="form" @submit="handleQuery"> </avue-form>
      </div>
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud ref="crud" :option="crudOp" :data="crudData" :page.sync="page" @on-load="handleQuery"> </avue-crud>
          </el-col>
        </el-row>
      </div>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { fetchProSchuduleData } from "./api";
export default {
  name: "prowovenrealWeight",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        isWorkOut:"",
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
        weaveJobCode:this.form.weaveJobCode,
        isWorkOut:this.form.isWorkOut
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
    anslysisData(resData){
      let tDataMap = {}
      resData.forEach((item,index) => {
        if(!tDataMap[item.weaveJobCode]){
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
            amount: 0,
            diffQty: 0,
            children:[]
          }
        }

        tDataMap[item.weaveJobCode].children.push({
            isWorkOut: item.recordMonth,
            grossWeight: item.grossWeight,
            clothWeight: item.clothWeight,
            weightedQty: item.weightedQty,
            inStockQty: item.inStockQty,
            outStockQty: item.outStockQty,
            qcDeductQty: item.qcDeductQty,
            amount: item.amount,
            id: item.weaveJobCode + index,
            diffQty: item.amount - item.clothWeight
        })

      });

      let resultData = Object.values(tDataMap);
      resultData.forEach(item => {
        item.children.sort((a,b) => b.isWorkOut - a.isWorkOut) 
        item.children.forEach(cItem => {
          item.grossWeight += cItem.grossWeight;
          item.clothWeight += cItem.clothWeight;
          item.weightedQty += cItem.weightedQty;
          item.inStockQty += cItem.inStockQty;
          item.outStockQty += cItem.outStockQty;
          item.qcDeductQty += cItem.qcDeductQty;
          item.amount += cItem.amount;
          item.diffQty += cItem.diffQty;
        })
        
      });

      this.crudData = resultData;
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
</style>