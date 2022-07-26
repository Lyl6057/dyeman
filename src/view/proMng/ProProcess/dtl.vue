<!--
 * @Description: 生产进度维护
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-25 15:22:49
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-25 17:10:10
-->
<template>
    <div class="pro-process-dtl-container">
        <el-dialog :visible.sync="visible" append-to-body :close-on-click-modal="false" fullscreen :close-on-press-escape="false" >
            <view-container title="生产进度维护" v-loading="loading"  element-loading-text="拼命加载中..." >
                <div class="btnList">
                    <el-button type="primary" @click="handleSave">{{ this.$t("public.save") }}</el-button>
                    <el-tooltip class="item"  effect="dark" content="đóng"  placement="top-start" >
                        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                    </el-tooltip>
                </div>
                <div class="formBox">
                    <avue-form ref="form" :option="dataFormOp" :value="gstPoFData"></avue-form>
                </div>
                <div class="crudBox">
                    <avue-crud
                        ref="crud"
                        :option="dltCrudOp"
                        :data="dltCrudData"
                    >
                        <template slot="processSetcode" slot-scope="{row}">
                            <span style="font-weight: blod; color: green">{{ processEnum[row.processSetcode]  }}</span>
                        </template>
                    </avue-crud>
                </div>

            </view-container>
        </el-dialog>
    </div>
</template>
<script>
import { dataFormOp, dtlCrudOp } from "./data"
import { fetchProcessDataByF, batchSaveDtlData, fetchProcessData } from "./api"
import { getDIC} from "@/config";
import v1 from "uuid/v1"
export default {
    name: "proProcessDtl",
    props: {
        gstPoFData: {
            type: Object,
            default: () => ({}),
        }
    },
    data(){
        return {
            loading: false,
            visible: false,
            dataFormOp: dataFormOp(this),
            dltCrudOp: dtlCrudOp(this),
            dltCrudData: [],
            isRefresh: false,
            processEnum: {},
        }
    },
    watch:{
        visible: {
            handler(value){
                if(value){
                    this.isRefresh = false;
                    this.getDtlDataList();
                }
            }
        },
        immediate: true
    },
    created(){
        this.getProcessData();
    },
    methods:{
        // 获取工序字典
        async getProcessData(){
            let processData = await fetchProcessData().then(res => res.data)

            this.processEnum = processData.reduce((a,b) => {
                a[b.codeid] = b.codename
                return a
            }, {})
            
            this.processList = processData;

        },
        // 获取明细数据
        getDtlDataList(){
            this.loading = true;
            let params = {
                gstPoverDtlfFk:this.gstPoFData.gstPoverDtlfoid
            };
            fetchProcessDataByF(params).then(async res => {
                if(res.data && res.data.length > 0){
                    this.dltCrudData = res.data.map(item => {
                        item.$cellEdit = true;
                        return item;
                    })
                }else{
                    this.dltCrudData =  this.processList.map(item => {
                        return {
                            gstPoprocessoid: v1(),
                            gstPoverDtlfFk: this.gstPoFData.gstPoverDtlfoid,
                            processSetcode: item.codeid,
                            processDateValue: "",
                            processRemarks: "",
                            $cellEdit: true
                        }
                    })
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        // 保存数据
        handleSave(){
            if(this.loading) return false;
            this.isRefresh = true;
            this.loading = true;
            batchSaveDtlData(this.dltCrudData).then(res => {
                this.$tip.success("保存成功")
            }).finally(() => {
                this.loading = false;
            })
        },
        // 关闭
        handleClose() {
           this.visible = false;
           this.$emit("refresh",this.isRefresh)
        },
    }
}

</script>