<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-29 10:05:29
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-30 17:32:47
-->

<template>
    <div class="inventory-dtl-container">
        <view-container
            title="盘点清单明细"
            :element-loading-text="loadLabel"
            v-loading="loading"
            >
            <div class="btnList">
                <el-button type='primary' :disabled="isEdit" @click="handleAllInput">一键录入</el-button>
                <el-button type='primary' :disabled="isEdit" @click="handleInvConfirm">盘盈盘亏确认</el-button>
                <el-button type='primary' @click='getDataList'>{{ $t("public.query") }}</el-button>
                <el-button type='success' :disabled="isEdit || crudDataList.length == 0" @click='handleBatchSave'>{{ $t("public.save") }}</el-button>
                <el-button type='warning' @click='handleClose'>{{ $t("public.close") }}</el-button>
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
                @row-click="cellClick"
                :cell-style="handleCellStyle"
                ></avue-crud>
            </div>
        </view-container>
    </div>
</template>

<script>
import { dtlFormOp,sxCrudOp,pubCrudOp ,cpbCrudOp} from "./data";
import { fetchInvDtlDataByPage,validIsEditQty,fetchAllUpdateInvQty,fetchBatchUpdateInvQty,inventoryConfirm } from "./api";
export default {
    name: "inventoryDtl",
    data(){
        return {
            loadLabel: "拼命加载中",
            loading: false,
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            crudOp: sxCrudOp(this),
            crudDataList:[],
            queryFormOp: dtlFormOp(this),
            queryForm: {},
            // 盘点数据
            inventoryData: {
                materialClass: "",
                whseInventoryoid: "",
                inventoryNo: ""
            },
            // 主数据更新
            dataHasUpdate: false,
        }
    },
    computed:{
        isEdit(){
            return this.inventoryData.inventoryState == '4'
        }
    },
    methods:{
        // 盘盈盘亏确认
        handleInvConfirm(){
            if(this.inventoryData.inventoryState != 2) return this.$tip.warning("盘点状态有误，请确认");
            this.loading = true;
            let params = {
                whseInventoryoid: this.inventoryData.whseInventoryoid,
                materialClass: this.inventoryData.materialClass
            }
            inventoryConfirm(params).then(res => {
                if(res.data.code != 200) return this.$tip.wraning(res.data.msg);
                this.inventoryData.inventoryState = "4";
                this.dataHasUpdate = true;
            }).finally(() => {
                this.loading = false;
            })
        },
        // 单元格样式
        handleCellStyle({row,column,rowIndex,columnIndex}){
            if(column.property === 'stockQty'){
                return {
                    backgroundColor: "#ccc",
                    fontWeight: "bolder"
                }
            }else if(column.property === 'inventoryQty'){
                return {
                    backgroundColor: row.inventoryQty != row.stockQty  ? "red" : "green",
                    color: "white"
                }
            }
        },
        // 批量保存
        handleBatchSave(){
            let dataList = this.crudDataList.map(item => {
                return {
                    whseInventoryDtloid: item.id,
                    inventoryQty: item.inventoryQty,
                    remarks: item.remarks
                }
            });
            this.loading = true;
            console.log("data list",dataList);

            fetchBatchUpdateInvQty(dataList).then(res => {
                if(res.data.code != 200) this.$tip.warning(res.data.msg);
                this.$tip.success(res.data.msg);
                this.getDataList();
            }).finally(_ => {
                this.loading = false;
            })
        },
        // 关闭
        handleClose(){
            this.$emit("closeDialog",false);
        },
        // 一键修改
        async handleAllInput(){
            // 检查是否有修改的值
            this.loading = true;
            let isUpdate = await validIsEditQty(this.inventoryData).then(res => res.data.data);
            if(isUpdate){
                this.loading = false;
                this.$tip.cofirm("存在手动修改数据，是否确认进行覆盖").then(this.validAfterAllInput)
            }else{
                this.validAfterAllInput();
            }
        },
        // 检验后修改
        validAfterAllInput(){
            this.loading = true;
            fetchAllUpdateInvQty(this.inventoryData).then(res => {
                if(res.data.code != 200) return this.$tip.error(res.data.msg);
                this.page.currentPage  = 1;
                this.$tip.success(res.data.msg);
                this.getDataList();
            })
        },
        // 初始化
        optionInit(invData){
            switch(invData.materialClass){
                case "SX":
                    this.crudOp = sxCrudOp(this);
                    break;
                case "CPB":
                    this.crudOp = cpbCrudOp(this);
                    break;
                default:
                    this.crudOp = pubCrudOp(this);
            }
            this.page.currentPage = 1;
            this.inventoryData = invData;
            this.queryForm.inventoryNo = invData.inventoryNo;
            this.queryForm.inventoryTypeName = invData.inventoryTypeName;
            this.queryForm.matCode = "";
            this.getDataList();
            
        },
        // 获取数据
        getDataList(){
            let {materialClass, whseInventoryoid} = this.inventoryData;
            console.log("inventoryData",this.inventoryData)
            // 若无类似和流水号参数，则无法查询
            if(!(materialClass && whseInventoryoid)) return;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                materialClass, whseInventoryoid,
                matCode: this.queryForm.matCode
            };
            this.loading = true;
            fetchInvDtlDataByPage(params).then(res => {
                if(res.data.code != 200) return this.$tip.warning(res.data.msg);
                let {records, total} = res.data.data;
                this.crudDataList = (records || []).map(item => {
                    item.$cellEdit = this.inventoryData.inventoryState != 4 ;
                    return item;
                });
                this.page.total = total;
            }).finally(() => {
                this.loading = false;
            })
        },
        cellClick(row){

        },

    }
}
</script>
<style scoped>
</style>