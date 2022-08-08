<template>
    <div class="un-create-list-container" v-loading="loading">
        <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
                <el-button type="success"   @click="handleCreateProWeaveJob">生成台账</el-button>
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
    </div>
</template>
<script>
import { unCreateFormOp,unCreateCrudOp } from "./data"
import { fetchUnCreateDataPage } from "./api"
export default {
    name: "unCreateList",
    data(){
        return {
            loading: false,
            formOp:unCreateFormOp(this),
            crudOp: unCreateCrudOp(this),
            queryParams: {
                weaveJobCode: ""
            },
            crudData: [],
            page: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            // 当前选择key 客户编号+布料编号
            curSelKey: "",
            // 其他配置参数
            otherSelParams: {},
            // 选中的值
            selectRows: [],

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

            this.crudData.forEach(item => {
                this.$refs.crudRef.toggleRowSelection(item, item.salPoNo === row.salPoNo)
            })
            this.curSelKey = row.salPoNo
            this.otherSelParams.outFactoryId = row.outFactoryId
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
            // this.$emit("select-create",this.selectRows);
            this.$emit("select-create",{
                salPoNo: this.curSelKey,
                params: this.otherSelParams,
            });
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
                weaveJobCode: this.queryParams.weaveJobCode
                // dataSortRules: "exDate|desc,poNo,type,colorSeq",
            }
            this.loading = true;
            fetchUnCreateDataPage(params).then(res => {
                this.crudData = res.data.records;
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
    .el-table__fixed-body-wrapper{
        top: 38px !important
    }
}    
</style>