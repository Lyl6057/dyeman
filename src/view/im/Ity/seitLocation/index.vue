<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 08:10:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-04 11:08:59
-->
<template>
    <div class="seit-location-container">
        <view-container title="货位整理记录" :element-loading-text="loadLabel" v-loading="loading">
            <div class="btnList">
                <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
                <el-button type="warning" @click="handleUpdate" :disabled="hasEdit" >{{ this.$t("public.update") }}</el-button>
                <!-- <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button> -->
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
            </div>
            <div class="formBox">
                <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <div class="crudBox">
                <avue-crud
                    ref="crud"
                    :option="mainCrudOp"
                    :data="mainCrudDataList"
                    :page.sync="page"
                    v-loading="loading"
                    @on-load="getDataList"
                    @row-dblclick="handleRowDBLClick"
                    @row-click="handleRowClick"
                ></avue-crud>
            </div>

            <el-dialog :visible.sync="dtlDialogVisible" append-to-body fullscreen >
                <seit-loc-dtl ref="seitLocDtlRef" @close="handleCloseDtlDialog"></seit-loc-dtl>
            </el-dialog>

        </view-container>
    </div>
</template>
<script>
import { fetchSeitLocData } from "./api"
import { queryFormOp, mainCrudOp } from "./data";
import SeitLocDtl from "./seitLocDtl.vue"
export default {
    name: "seitLocation",
    components:{
        SeitLocDtl: SeitLocDtl,
    },
    data(){
        return {
            loadLabel: "加载中...",
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {},
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            mainCrudOp: mainCrudOp(this), 
            mainCrudDataList: [],
            // 当前点击对象
            curSelRow: {},

            dtlDialogVisible: false,
        }
    },
    computed: {
        hasEdit(){
            return false;
        }
    },
    methods:{
        async handleAdd(){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.seitLocDtlRef.initData()
        },
        handleUpdate(){},
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        getDataList(){
             let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
            };
            this.loading = true;
            fetchSeitLocData(params).then(res => {
                this.mainCrudDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        async handleRowDBLClick(row){
            this.dtlDialogVisible = true;
            await this.$nextTick();
            this.$refs.seitLocDtlRef.setSeitLocData(row);
        },
        handleRowClick(row){
            this.curSelRow = row;
        },
        // 关闭明细弹窗
        handleCloseDtlDialog(isRefresh){
            this.dtlDialogVisible = false;
            if(isRefresh){
                this.page.currentPage = 1;
                this.getDataList();
            }
        }
    }
}
</script>


