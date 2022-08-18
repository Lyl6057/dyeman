<!--
 * @Description: 胚布载具整理
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-16 10:26:37
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-18 09:07:50
-->
<template>
    <div class="grey-cloth-veh-container">
        <view-container title="载具整理">
            <div class="btnList">
                <el-button type="success" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
                <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
            </div>
            <div class="formBox">
                <avue-form ref="queryFormRef" :option="queryFormOp" v-model="queryForm"></avue-form>
            </div>
            <div class="crudBox">
                <avue-crud
                ref="mainCrudRef"
                :option="mainCrudOp"
                :data="crudDataList"
                :page.sync="page"
                v-loading="loading"
                @on-load="getDataList"
                ></avue-crud>
            </div>
        </view-container>

        <el-dialog :visible.sync="addFormVisible" append-to-body :close-on-click-modal="false" fullscreen >
            <add-form ref="addFormRef"  @dtl-close="handleDtlClose" />
        </el-dialog>


    </div>
</template>
<script>
import { queryFormOp, mainCrudOp } from "./data"
import { fetchNoteSeitDataByPage } from "./api"
import AddForm from "./addForm.vue"
export default {
    name: "greyClothVeh",
    components:{
        "add-form": AddForm
    },
    data(){
        return {
            loading: false,
            queryFormOp: queryFormOp(this),
            queryForm: {},
            mainCrudOp: mainCrudOp(this),
            crudDataList: [],
            page:{
                pageSize: 10,
                currentPage: 1,
                total: 0,
            },

            addFormVisible: false,
        }
    },
    methods: {
        // 新增
        async handleAdd(){
            this.addFormVisible = true;
            await this.$nextTick();
            this.$refs.addFormRef.init();
        },
        handleDtlClose(isRefresh){
            this.addFormVisible = false;
            isRefresh && this.handleQuery();
        },
        // 查询
        handleQuery(){
            this.page.currentPage = 1;
            this.getDataList();
        },
        // 获取数据
        getDataList(){
            this.loading = true;
            let { noteCode, weaveJobCode, organizeDate } = this.queryForm;
            let params = {
                rows: this.page.pageSize,
                start: this.page.currentPage,
                noteCode: noteCode,
                weaveJobCode: weaveJobCode ? "%" + weaveJobCode : '',
            };
            if(organizeDate && organizeDate.length == 2){
                params.organizeDate_begin = organizeDate[0];
                params.organizeDate_end = organizeDate[1];
            }
            fetchNoteSeitDataByPage(params).then(res => {
                this.page.total = res.data.total;
                this.crudDataList = res.data.records
            }).finally(() => {
                this.loading = false;
            })
        },
    }
}
</script>