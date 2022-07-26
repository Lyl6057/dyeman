<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-25 14:36:57
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-26 08:25:42
-->
<template>
  <view-container title="生产进度资料" v-loading="loading"  element-loading-text="拼命加载中..." >
    <div class="btnList">
      <el-button type="primary" @click="handleEditProcess">维护进度</el-button>
      <el-button type="danger" @click="handleClearProcess">清除进度</el-button>
      <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @row-dblclick="handleRowDBLClick"
        @row-click="handleCellClick"
      ></avue-crud>
    </div>
    <dtl ref="dtlRef" :gstPoFData='curSelectRow' @refresh="handleQuery" />
  </view-container>
</template>
<script>
import { mainCrudOp, queryFormOp } from "./data"
import { fetchGstPoFData, fetchProcessData, fetchDelDtlDataByGstDtlf } from "./api"
import { getDIC} from "@/config";
import Dtl from "./dtl.vue"
export default {
  name: "proProcess",
  components: {
    "dtl": Dtl
  },
  data(){
    return {
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp: queryFormOp(this),
      queryForm:{},
      crudOp: mainCrudOp(this),
      crudDataList: [],
      curSelectRow: {},
    }
  },
  created(){
    this.getProcessData();
  },
  methods: {
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },
    getDataList(){
      console.log("enter get data")
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        custId: this.queryForm.custId,
        isEdit: this.queryForm.isEdit,
      }
      let likeProp = ["poNo","custOrderno","contractNo","poNo","poNo",]
      likeProp.forEach(prop => {
        if(this.queryForm[prop]){
          params[prop] = "%" + this.queryForm[prop]
        }
      });

      // 日期范围
      let shipDate = this.queryForm.shipDate;
      if(shipDate && shipDate.length == 2){
        params.shipDate_begin = shipDate[0]
        params.shipDate_end = shipDate[1]
      }

      this.loading = true;
      fetchGstPoFData(params).then(res => {
        this.crudDataList = res.data.records.map(item => {
          Object.assign(item,item.processData)
          return item;
        })
        this.page.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      })

    },
    // 获取进度节点数据
    async getProcessData(){
      let processData = await fetchProcessData().then(res => res.data)
      let columns = mainCrudOp(this).column;
      processData.forEach(item => {
        columns.push({
          label: item.codename,
          prop: item.codeid,
          formatter: (r,v) => v && v.slice(0,10),
          width: 100,
          align: "center"
        })
      });
      this.crudOp.column = columns;

    },
    // 维护进度
    handleEditProcess(){
      this.handleRowDBLClick();
    },
    // 清除进度 （删除操作）
    handleClearProcess(){
      let gstPoDltfOid = this.curSelectRow.gstPoverDtlfoid;
      if(!gstPoDltfOid) return this.$tip.warning("请选择数据")
      this.$tip.cofirm("是否确认对该生产通知单进行维护","提示").then(res => {
        fetchDelDtlDataByGstDtlf(gstPoDltfOid).then(res => {
          this.$tip.success("删除成功");
          this.handleQuery();
        })
      })
    },
    // 双击
    handleRowDBLClick(row) {
      this.$refs.dtlRef.visible = true;
    },
    // 选中
    handleCellClick(row) {
      this.curSelectRow = row;
    },
  }
}

</script>