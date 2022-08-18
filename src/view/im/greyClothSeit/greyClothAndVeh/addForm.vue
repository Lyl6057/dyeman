<template>
    <div class="grey-cloth-seit-add-container">
        <view-container title="载具整理" v-loading="loading">
            <div class="btn-wwrapper">
                <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
                <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
            </div>
            <div class="form-wrapper">
                <avue-form ref="dtlFormRef" :option="addFormOp" v-model="formData"></avue-form>
            </div>
            <div class="crud-wrapper">
                <avue-crud
                    ref="mainCrudRef"
                    :option="dtlCrudOp"
                    :data="pageCrudDataList"
                    :page="page"
                    @on-load="getDataList"
                >
                    <template slot-scope="{row}" slot="operate">
                        <el-button type="danger" size="mini" @click="handleDelRow(row.noteId)" >删除</el-button>
                        <el-button type="primary" size="mini" @click="handleSync(row)" >一键同步</el-button>
                    </template>
                </avue-crud>
            </div>

        </view-container>
    </div>
</template>
<script>
import { addFormOp, dtlCrudOp } from "./data"
import { fetchNoteDataByCode, batchUpdateNoteStoreLoadCode } from "./api"
export default {
    name: "greyClothSeitAddForm",
    data(){
        return {
            loading: false,
            formData: {
                organizeDate: "",
            },
            addFormOp: addFormOp(this),
            dtlCrudOp: dtlCrudOp(this),
            crudDataList: [],
            page: {
                total: 0,
                pageSize: 50,
                pageSizes: [50,100,200,300],
                currentPage: 1
            }
        }
    },
    computed:{
        pageCrudDataList(){
            if(this.crudDataList.length < 100){
                return this.crudDataList.length
            }
            let { currentPage, pageSize } = this.page;
            let start = (currentPage - 1) * pageSize;
            let end = currentPage * pageSize - 1
            return this.crudDataList.filter(item => item.index >= start && item.index <= end )
        }
    },
    methods: {
        // 一键同步
        handleSync(row){
            let vehicleNoNew = row.vehicleNoNew;
            if(!vehicleNoNew) return this.$tip.warning("请填写数据");
            this.crudDataList.forEach(item => {
                item.vehicleNoNew = vehicleNoNew;
            })
        },
        // 初始化
        init(){
            this.formData = {
               organizeDate: new Date(), 
               code: "",
            };
            this.crudDataList = [];
        },
        // 删除指定项目
        handleDelRow(noteId){
            let index = this.crudDataList.findIndex(item => item.noteId == noteId);
            if(index != -1){
                this.crudDataList.splice(index, 1);
            }
        },
        // 类型选择
        handleTypeChange(){

        },
        // 保存
        handleSave(){
            let organizeDate = this.formData.organizeDate;
            if(!organizeDate) return this.$tip.warning("请选择整理日期");

            // 检查是否有未填写载具编号数据的
            let validNull =  this.crudDataList.every(item => item.vehicleNoNew);
            if(!validNull) return this.$tip.warning("请完善新载具编号~");

            this.loading = true;
            let resultData = this.crudDataList.map(item => {
                item.organizeDate = organizeDate;
                return item;
            })
            batchUpdateNoteStoreLoadCode(resultData).then(res => {

                this.$tip.success("修改成功");
                this.handleClose(true);

            }).finally(() => {
                this.loading = false;
            })
            
        },
        // 查询
        handleQuery(){
            let { origin, code } = this.formData;
            if(!origin) return this.$tip.warning("请选择类型");
            if(!code) return this.$tip.warning("请输入单号");
            
            let params = {
                type: origin,
                code: code,
            }
            this.loading = true;
            fetchNoteDataByCode(params).then(res => {
                this.crudDataList = res.data.map((item, index) => {
                    item.$cellEdit = true;
                    item.index = index;
                    return item;
                })
                this.page.total = this.crudDataList.length;
                this.dtlCrudOp.page = this.page.total > 100
            }).finally(() => {
                this.loading = false;
            })
        },
        // 获取数据
        getDataList({currentPage, pageSize}){
            Object.assign(this.page,{
                currentPage, pageSize
            })
        },
        // 关闭
        handleClose(isRefresh = false){
            this.$emit("dtl-close", isRefresh)
        }
    }
}
</script>
<style lang="stylus">
    .grey-cloth-seit-add-container{
        .btn-wwrapper{
            padding: 10px;
        }
    }
</style>