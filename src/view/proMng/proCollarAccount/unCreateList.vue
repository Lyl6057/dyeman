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
               @on-load="getDataList">
                <template slot="deliveryInfo" slot-scope="{row}">
                    <div style="font-weight: blod">
                        <span style="color: green;">{{ row.planPcsNum || 0 }}</span>
                        <span style="display: inline-block; padding: 0px 5px">|</span>
                        <span style="color: red;">{{ row.realPcsNum || 0 }}</span>
                    </div>
                </template>
               </avue-crud>
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

            // this.crudData.forEach(item => {
            //     this.$refs.crudRef.toggleRowSelection(item, item.salPoNo === row.salPoNo)
            // })
            if(rows.length == 1){
                this.curSelKey = ""
            }
            // 只能选同一个订单号的数据
            if(this.curSelKey && row.salPoNo != this.curSelKey){
                this.$refs.crudRef.toggleRowSelection(row,false)
                return this.$tip.warning("只能选择相同订单号的数据")
            }

            this.curSelKey = row.salPoNo
            this.otherSelParams = {
                outFactoryId: row.outFactoryId,
                salPoNo: row.salPoNo,
            }
            this.selectRows = rows;
        },
        handleSelectAll(rows){
            // 当未选择数据时
            if(this.selectRows.length == 0){
                let tSalPoNo = this.crudData[0].salPoNo;
                let isDiff = this.crudData.some(item => item.salPoNo != tSalPoNo);
                if(isDiff){
                    this.$refs.crudRef.selectClear();
                    return this.$tip.warning("只能选择相同的订单号数据");
                }

                // 赋值
                let row = rows[0] || {}
                this.curSelKey = row.salPoNo
                this.otherSelParams = {
                    outFactoryId: row.outFactoryId,
                    salPoNo: row.salPoNo,
                }
                this.selectRows = rows;
            }else if(this.selectRows.length >= 1){
                this.$refs.crudRef.selectClear();
                this.selectRows = []
            }else{
                this.$refs.crudRef.selectClear();
                this.selectRows.forEach(item => {
                    this.$refs.crudRef.toggleRowSelection(item,true)
                })
            }
            // this.curSelKey = ""
            // this.selectRows = [];
            
        },
        // 生成织单
        handleCreateProWeaveJob(){
            if(this.selectRows.length == 0){
                return this.$tip.warning("请选择数据");
            }
            // this.$emit("select-create",this.selectRows);
            this.$emit("select-create",{
                weaveJobCodes: this.selectRows.map(item => item.weaveJobCode),
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
                weaveJobCode: this.queryParams.weaveJobCode,
                salPoNo: this.queryParams.salPoNo
                // dataSortRules: "exDate|desc,poNo,type,colorSeq",
            }
            this.loading = true;
            fetchUnCreateDataPage(params).then(res => {
                this.$refs.crudRef.selectClear();
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