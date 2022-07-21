<!--
 * @Description: 库存出入库明细
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-20 08:46:17
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-21 17:24:07
-->

<template>
  <div id="inventory-whse-dtl-container">
    <div class="computed-container">
        <div class="block">
            <span class="weight red">{{ whseDtlCountData.inWeight }}</span>
            <span class="text">入仓数量</span>
        </div>
        <span class="symbol">--</span>
        <div class="block">
            <span class="weight green" >{{ whseDtlCountData.outWeight }}</span>
            <span class="text">出仓数量</span>
        </div>
        <span class="symbol">=</span>
        <div class="block" >
            <span class="weight" >{{ whseDtlCountData.diffWeighr }}</span>
            <span class="text">差值</span>
        </div>
    </div>
    <avue-crud
      ref="crud"
      :option="whseDtlCrudOp"
      :data="crudDataList"
      :page.sync="page"
      v-loading="loading"
      @on-load="() => whseType && getWhseDtlDataList()"
      :cell-style="handleCellStyle"
      @selection-change="handleSeletChange"
    ></avue-crud>
  </div>
</template>
<script>
import { 
  fetchWhseDtlDataByYarns,
  fetchWhseDtlDataByChemical,
  fetchWhseDtlDataByDyestuff,
  fetchWhseDtlDataByAccess,
  fetchWhseDtlDataByHardware,
  fetchWhseDtlDataByEquip
  } from "./api";
import { whseDtlCrudOp,whseDtlCountFormOp } from "./data";
export default {
  name: "inventoryWhseDtl",
  data() {
    return {
      loading: false,
      whseDtlCountFormOp: whseDtlCountFormOp(this),
      whseDtlCountData:{
          inWeight: 0,
          outWeight: 0,
          diffWeighr: 0
      },
      whseDtlCrudOp: whseDtlCrudOp(this),
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      crudDataList: [],
      whseType: "",
      queryParams: {}
    };
  },
  methods: {
    handleSeletChange(rows){
        let inWeight = 0, outWeight = 0;
        rows.forEach(item => {
            if(item.whseStatus == 'in'){
                inWeight += item.weight
            }else{
                outWeight += item.weight
            }
        });
        Object.assign(this.whseDtlCountData,{
            inWeight: inWeight.toFixed(2),
            outWeight:outWeight.toFixed(2),
            diffWeighr: (inWeight - outWeight).toFixed(2)
        })
    },
    //   初始化
    initData(type, params) {
      this.whseType = type;
      this.queryParams = params;
      this.page.currentPage = 1;
      this.page.total = 0;
      this.crudDataList = [];
      this.getWhseDtlDataList();
    },
    //   获取数据
    getWhseDtlDataList() {
      if (this.loading) return;
      this.loading = true;
      let queryParams = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        ...this.queryParams,
      };
      let fetchWhseDtlDataFn = null;
      switch (this.whseType) {
        case "SX":
          fetchWhseDtlDataFn = fetchWhseDtlDataByYarns;
          break;
        case "RHL" :
          fetchWhseDtlDataFn = fetchWhseDtlDataByChemical;
          break;
        case "RLL" :
          fetchWhseDtlDataFn = fetchWhseDtlDataByDyestuff;
          break;
        case "FL" :
          fetchWhseDtlDataFn = fetchWhseDtlDataByAccess;
          break;
        case "WJ" :
          fetchWhseDtlDataFn = fetchWhseDtlDataByHardware;
          break;
        case "SB" :
          fetchWhseDtlDataFn = fetchWhseDtlDataByEquip;
          break;
        default:
          break;
      }
      fetchWhseDtlDataFn(queryParams)
        .then(res => {
          this.crudDataList = res.data.records;
          this.page.total = res.data.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 样式修改回调
    handleCellStyle({row,column}) {
        if(!['whseStatus','weight'].includes(column.property)) return {};
        return {
            color: row.whseStatus == 'in' ? 'red': "green"
        }
    }
  }
};
</script>

<style scoped lang='stylus'>
   #inventory-whse-dtl-container{
       .computed-container{
           margin-left 20px
           display: flex;
           justify-content center
           .block{
               margin: 0px 4px;
               display flex;
               flex-direction column;
               justify-content center;
               align-items center;
               .weight{
                   font-size 18px
                   &.red{
                       color red
                   }
                   &.green{
                       color green
                   }
               }
               .text{
                   color #666
                   font-size 13px
               }
           }
           .symbol{
               font-weight bolder
               font-size 20px
               padding 0 10px
           }
       }
   }
</style>

