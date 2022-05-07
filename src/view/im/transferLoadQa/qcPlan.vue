<!--
 * @Author: Lyl
 * @Date: 2022-05-06 10:05:41
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-07 08:50:32
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\qcplan.vue
 * @Description: 
-->
<template>
  <div class="transferQcPlan">
    <el-row>
      <el-col :span="16">
        <div class="transferQcPlan-platform-cloth">
          <div class="cloth-inspection-platform">
          <div v-for="up in upPlatform" :key="up.no" class="platform-box">
            <div class="platform-content">
              <div class="content-no"><span>{{up.no}}</span></div>
              <div><span>{{up.storeLoad}}</span> </div>
              <div class="content-vatno"><span>{{up.vatNo}}</span> </div>
            </div>
          </div>
        </div>
        <div><span>验布平台</span></div>
        <div class="cloth-inspection-platform">
          <div v-for="up in downPlatform" :key="up.no" class="platform-box">
             <div class="platform-content">
              <div class="content-no"><span>{{up.no}}</span></div>
              <div><span>{{up.storeLoad}}</span></div>
              <div class="content-vatno"><span>{{up.vatNo}}</span></div>
            </div>
          </div>
        </div>
        </div>
        <el-row class="transferQcPlan-crud">
          <avue-crud 
            ref="inCheckList" 
            :option="inCheckListOp" 
            :data="inCheckList" 
            v-loading="loading"
            element-loading-text="正在拼命加载中..."
          ></avue-crud>
        </el-row>
      </el-col>
      <el-col :span="8">
        <avue-crud 
          style="margin-top: 5px"
          ref="waitCheckList" 
          :option="waitCheckListOp" 
          :data="waitCheckList" 
          v-loading="loading"
          element-loading-text="正在拼命加载中..."
        ></avue-crud>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inCheckListOp, waitCheckListOp } from "./data"
export default {
  components: {},
  props: {},
  data() {
    return {
      upPlatform: [{
          no: "①", locationCode: "YN-1-3-54-1", storeLoad: "A0001", vatNo: "DF-210000001"
        },{
          no: "②", locationCode: "YN-1-4-56-1", storeLoad: "A0002", vatNo: "DF-210000001"
        },{
          no: "③", locationCode: "YN-1-3-57-1", storeLoad: "A0003", vatNo: "DF-210000001"
        },{
          no: "④", locationCode: "YN-1-3-59-1", storeLoad: "A0004", vatNo: "DF-210000001"
        },{
          no: "⑤", locationCode: "YN-1-3-60-1", storeLoad: "A0005", vatNo: "DF-210000001"
        }],
      downPlatform: [{
          no: "⑥", locationCode: "YN-1-6-54-1", storeLoad: "A0006", vatNo: "DF-210000001"
        },{
          no: "⑦", locationCode: "YN-1-6-56-1", storeLoad: "A0007", vatNo: "DF-210000001"
        },{
          no: "⑧", locationCode: "YN-1-5-57-1", storeLoad: "A0008", vatNo: "DF-210000001"
        },{
          no: "⑨", locationCode: "YN-1-5-59-1", storeLoad: "A0009", vatNo: "DF-210000001"
        },{
          no: "⑩", locationCode: "YN-1-5-60-1", storeLoad: "A00010", vatNo: "DF-210000001"
        }],
        loading: false,
        inCheckList: [],
        inCheckListOp: inCheckListOp(this),
        waitCheckList: [],
        waitCheckListOp: waitCheckListOp(this),
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.transferQcPlan{
  overflow: auto;
  height: calc(100vh - 115px)
  .transferQcPlan-crud{
    // border:1px solid #ccc;
    // margin: .3rem;
  }
  .transferQcPlan-platform-cloth{
    border:1px solid #ccc;
    margin: .3rem;
    // min-width: 850px;
    overflow: auto;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
   
  .cloth-inspection-platform{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-items: center;
    
   
    .platform-box{
      width: 20%;
    }
    .platform-content{
      height: 5.125rem;
      margin: .625rem;
      text-align: center;
      text-indent:0.5rem;
      border: 1px solid #000;
      .content-no{
        text-align: left;
      }
      .content-vatno{
        margin-top: 5px;
      }
      span{
        font-size: 20px;
      }
      p{
        font-size: 18px;
      }
    }
  }
}
</style>