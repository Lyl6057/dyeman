<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:46
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-07 10:57:00
-->
<template>
    <div class="all-inventory-container">
        <el-dialog :visible.sync="invSelDiaVisible" fullscreen append-to-body>
            <view-container title="库存选择" :element-loading-text="loadLabel" v-loading="loading">
                <div class="btnList">
                    <el-button type="success" @click="handleSelect">选择</el-button>
                    <!-- <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button> -->
                    <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </div>
                <div class="formBox">
                    <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
                </div>
                <div class="crudBox">
                    <avue-crud
                        ref="crud"
                        :option="invCrudOp"
                        :data="invDataList"
                        :page.sync="page"
                        v-loading="loading"
                        @on-load="getDataList"
                        @select='handleSelectRow'
                        @select-all='handleSelectRow'
                    ></avue-crud>
                </div>
            </view-container>
        </el-dialog>
    </div>
</template>

<script>
import { fetchInventoryDataByPage } from "./api"
import { queryFormOp, invCrudOp } from "./data"
export default {
    name: "inventorySelect",
    props:{
        // 材料类型
        matType: {
            type: String,
            default: () => "0"
        }
    },
    data(){
        return {
            invSelDiaVisible: false,
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
            invCrudOp: invCrudOp(this),
            invDataList: [],
            // 选择数据
            curSelRows:[],
            // 待过滤的值
            filterIds: [],
        }
    },
    watch:{
        invSelDiaVisible:{
            handler(value){
                this.initCrud();
                value && this.getDataList();
            },
            immediate: false,
        }
    },
    methods:{
        // 初始化
        initCrud(){
            this.queryFormOp = queryFormOp(this);
            this.invCrudOp = invCrudOp(this);
        },
        // 选择明细
        handleSelectRow(rows){
            this.curSelRows = rows;
        },
        // 查询
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 获取数据
        getDataList(){
            if(this.loading) return;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
            }
            // 查询参数添加%进行模糊查询
            let queryKey = queryFormOp(this).column.map(item => item.prop);
            queryKey.forEach(key => {
                let value = this.queryForm[key]
                if(value){
                    params[key] = '%' + value
                }
            })
            let data = {};
            if(this.filterIds.length > 0){
                data.filterParams = this.filterIds
            }
            this.loading = true;
            fetchInventoryDataByPage(params,data,this.matType).then(res => {
                this.invDataList = res.data.records;
                this.page.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            })
        },
        // 选择
        handleSelect(){
            this.$emit("data-select",this.curSelRows);
            this.handleClose();
        },
        // 关闭
        handleClose(){
            this.invSelDiaVisible = false;
            this.queryForm = {};
        }
    }
}
</script>