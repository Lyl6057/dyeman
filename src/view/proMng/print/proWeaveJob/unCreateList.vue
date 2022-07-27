<template>
    <div class="un-create-list-container" v-loading="loading">
        <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
                <el-button type="success"   @click="handleCreateProWeaveJob">生成织单</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
                <el-button type="primary" @click="handleQuery">{{  this.$t("public.query") }}</el-button>
            </el-tooltip>
        </el-row>
        <el-row class="form-wrapper">
            <avue-form ref="form" :option="formOp" v-model="queryParams"></avue-form>
        </el-row>
        <el-row class="formBox">
             <avue-crud 
                ref="crudRef" 
                :option="crudOp" 
                :data="crudData" 
                :page.sync="page" 
                v-loading="loading" 
                @row-dblclick="handleRowDblClick"
               @select="handleSelect"
                @select-all="handleSelectAll"
               @on-load="getDataList"></avue-crud>
        </el-row>
        <el-dialog :visible.sync="xiaLanDtlVisible" title="下栏明细数据" append-to-body >
            <xia-lan-dtl ref="xiaLanDtlRef"></xia-lan-dtl>
        </el-dialog>
    </div>
</template>
<script>
import { unCreateFormOp,unCreateCrudOp } from "./data"
import { fetchUnCreateWeavaJob } from "./api"
import XiaLanDtl from "./xiaLanDtl.vue"
export default {
    name: "unCreateList",
    components:{
        XiaLanDtl
    },
    data(){
        return {
            loading: false,
            formOp:unCreateFormOp(this),
            crudOp: unCreateCrudOp(this),
            queryParams: {
                type: ""
            },
            crudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            // 当前选择key 客户编号+布料编号
            curSelKey: "",
            // 选中的值
            selectRows: [],

            // 下栏明细数据
            xiaLanDtlVisible: false,
        }
    },
    methods:{
        // 行双击
        async handleRowDblClick(row){
            if(row.type != 3) return;
            this.xiaLanDtlVisible = true;
            await this.$nextTick();
            this.$refs.xiaLanDtlRef.getDataList(row);
        },
        // 选中改变
        handleSelect(rows,row){
            if(!this.curSelKey){
                // this.curSelKey = row.custId + row.fabCode
                this.curSelKey = row.bomId
            }else if(rows.length == 0){
                this.curSelKey = ""
            }else{
                // if(this.curSelKey != row.custId + row.fabCode){
                if(this.curSelKey != row.bomId){
                    return this.$refs.crudRef.toggleRowSelection(row, false);
                }
            }
            this.selectRows = rows;
        },
        handleSelectAll(){
            this.curSelKey = ""
            this.selectRows = [];
            this.$refs.crudRef.selectClear();
        },
        // 生成织单
        handleCreateProWeaveJob(){
            if(this.selectRows.length == 0){
                return this.$tip.warning("请选择数据");
            }
            this.$emit("select-create",this.selectRows);
        },
        // 查询
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 查询数据
        getDataList(){
            let params =  {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                dataSortRules: "exDate|desc,poNo,type,colorSeq",
            }
            let props = ["custId","type"]
            props.forEach(key => {
                let value = this.queryParams[key];
                if(value){
                    params[key] = value;
                }
            })
            if(this.queryParams.poNo){
                params.poNo = "%" + this.queryParams.poNo
            }
            let exDateValue = this.queryParams.exDate;
            if(exDateValue && exDateValue.length == 2){
                params.exDate_begin = exDateValue[0];
                params.exDate_end = exDateValue[1];
            }
            this.loading = true;
            fetchUnCreateWeavaJob(params).then(res => {
                this.crudData = res.data.records.map(item => {
                    let {
                            shrinkHorizontal3,shrinkHorizontal4,shrinkHorizontal5,
                            shrinkVertical3,shrinkVertical4,shrinkVertical5
                        } = item;
                    item.shrinkHorizontal = `-${Math.abs(shrinkHorizontal3) || 0}${shrinkHorizontal5}/${shrinkHorizontal4 || 0}${shrinkHorizontal5}`;
                    item.shrinkVertical = `-${Math.abs(shrinkVertical3) || 0}${shrinkVertical5}/${shrinkVertical4 || 0}${shrinkVertical5}`;
                    return item;
                });
                this.page.total = res.data.total;
            }).finally(_ => {
                this.loading = false;
            })
        }
    }
}

</script>
<style lang="stylus">
.un-create-list-container{
    .avue-crud__tip{
        display: none !important
    }
}    
</style>