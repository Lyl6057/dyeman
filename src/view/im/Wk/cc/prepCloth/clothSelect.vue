<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-29 15:00:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-30 10:00:38
-->
<template>
    <el-dialog :visible="visible" append-to-body fullscreen>
        <view-container title="胚布选择"  v-loading="loading">
            <div class="btnList">
                <el-button type="success"  @click="handleSelCb">选择</el-button>
                <el-button type="primary" @click="hadnleQuery">{{ this.$t("public.query") }}</el-button>
                <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
            </div>
            <div class="formBox">
                <avue-form ref="form" :option="querFormOp" v-model="queryParams"></avue-form>
            </div>
            <div class="crud-box">
                <avue-crud
                    ref="crudRef"
                    :option="crudOp"
                    :data="crudDataList"
                    :page.sync="page"
                    @on-load="getDataList"
                    @select="handleSelect"
                    />
            </div>
        </view-container>
    </el-dialog>
</template>
<script>
    import {clothNoteSelQueryFormOp,clothNoteSelCrudOp } from './data';
    import { fetchClothNoteDataList } from "./api"
    export default {
        name: "clothNoteSelect",
        props: {
           isRemote:{
               type: Boolean,
               default: () => false,
           },
           originDataList: {
               type: Array,
               deafult: () => []
           }
        },
        data(){
            return {
                visible:false,
                loading: false,
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                crudOp: clothNoteSelCrudOp(this),
                crudDataList: [],
                querFormOp: clothNoteSelQueryFormOp(this),
                queryParams: {},
                weaveJobCode: "",
                curSelRows: []
            }
        },
        methods: {
            // 初始化
            async initData(weaveJobCode){
                this.weaveJobCode = weaveJobCode;
                this.queryParams = {
                    storeLoadCode: "",
                    noteCode: "",
                    loomNo: "",
                    eachNumber: "",
                };
                this.visible = true;
                await this.$nextTick();
                this.$refs.crudRef.selectClear();
                this.page.currentPage = 1;
                this.getDataList();
            },
            hadnleQuery(){
                this.page.currentPage = 1;
                this.getDataList();
            },
            getDataList(){
              if(this.isRemote){
                  this.remoteGetDataList();
              }else{
                  this.localGetDataList();
              }
            },
            localGetDataList(){
                let {pageSize,currentPage} = this.page;
                let skip = (currentPage - 1) * pageSize;
                let { storeLoadCode, noteCode, loomNo, eachNumber } = this.queryParams;
                let filterData = this.originDataList.filter(item => {
                    return (item.noteCode.includes(noteCode)) &&
                            item.loomNo.includes(loomNo) &&
                            item.eachNumber.includes(eachNumber) && 
                            item.storeLoadCode.includes(storeLoadCode)
                })
                this.page.total = filterData.length;
                this.crudDataList = filterData.slice(skip, skip + pageSize)
                
            },
            remoteGetDataList(){
                this.loading = true;
                let params = {
                    rows: this.page.pageSize,
                    start: this.page.currentPage,
                    weaveJobCode: this.weaveJobCode
                }
                Object.entries(this.queryParams).forEach(item => {
                    if(this.queryParams[item[0]]){
                        params[item[0]] = "%" + item[1]
                    }
                })
                fetchClothNoteDataList(params).then(res => {
                    this.crudDataList = res.data.records;
                    this.page.total = res.data.total;
                }).finally(() => {
                    this.loading = false;
                })
            },
            // 选中
            handleSelCb(){
                this.$emit("select", this.curSelRows );
                this.visible = false;
            },
            handleQuery(){},
            handleSelect(rows){
                this.curSelRows = rows;
            },
            handleCloseDtl(){
                this.visible = false;
            }
        }   
    }
</script>