<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-25 11:40:07
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-27 10:37:34
-->
<template>
<view-container title="幾臺信息" >
        <div class="weave-job-machine-container" v-loading="loading">
            <div class="btn-wrapper">
                <template v-if="isOutFactory">
                    <el-tooltip  effect="dark" content="Bảo tồn" placement="top-start" >
                        <el-button type="success" @click="handleSave" >{{ $t("public.save") }}</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="danger" @click="handleDel" >删除</el-button>
                </template>
                <el-tooltip effect="dark" content="đóng" placement="top-start" >
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </el-tooltip>
            </div>
            <avue-crud
                ref="machineInfoCrudRef"
                :option="machineInfoCrud"
                :data="machineInfoData"
                @row-click="handleRowClick"
            ></avue-crud>
        </div>
    </view-container>
</template>

<script>
    import { machineInfoCrud } from "./data"
    import { fetchMachineInfoData,bactchSaveOrUpdateMachineInfo, bactchDelDataByIds,fetchDict2MachineCode } from "./api"
    export default  {
        name: "machineInfo",
        props:{
            weaveJobId:{
                type: String,
                default: () => ""
            }
        },
        data(){
            return {
                loading: false,
                machineInfoData: [],
                machineInfoCrud: machineInfoCrud(this),
                curClickRow:{},
                delIdList: [],
                machineCodeDictEnum: {},
            }
        },
        computed:{
            isOutFactory(){
                return this.$store.getters.isOutFactory
            }
        },
        methods:{
            // 根据外发工厂id获取相对应的机台字典
            getDict2MachineCode(){
                let params = {
                    outFactoryId: this.$store.getters.outFactoryId
                }
                fetchDict2MachineCode(params).then(res => {
                    if(res.data.code == 200){
                        let dictData =  res.data.data.map(item => {
                            this.machineCodeDictEnum[item.label] = item.value;
                            return {
                                value: item.label,
                                label: item.label
                            }
                        });
                        this.machineInfoCrud.column[1].dicData = dictData;
                    }
                })
            },
            handleRowClick(row){
                this.curClickRow = row;
                console.log("cur row",row)
            },
            // 初始化
            init(isRefresh = false){
                this.delIdList = [];
                this.getDataList();
                // 非刷新情况
                if(!isRefresh){
                    this.getDict2MachineCode();
                }
            },
            // 获取数据
            getDataList(){
                this.loading = true;
                let parmas = {
                    proWeaveJobFk: this.weaveJobId
                }
                fetchMachineInfoData(parmas).then(res => {
                    this.machineInfoData = res.data.map(item => {
                        item.$cellEdit = this.isOutFactory;
                        return item
                    });
                }).finally(() => {
                    this.loading = false;
                })
            },
            handleSave(){
                this.loading = true;
                this.machineInfoData.forEach(item => {
                    item.baseEquipmentFk = this.machineCodeDictEnum[item.mathineCode]
                })

                let reqArr = [
                    bactchSaveOrUpdateMachineInfo(this.machineInfoData)
                ];
                if(this.delIdList.length){
                    reqArr.push(bactchDelDataByIds(this.delIdList))
                };
                
                Promise.all(reqArr).then(resList => {
                    let isSuc = resList.every(item => item.data.code == 200);
                    if(isSuc){
                        this.$tip.success("保存成功");
                        this.init(true);
                    }
                }).finally(_ => {
                    this.loading = false;
                })
                
            },
            // 行新增
            handleAdd(){
               this.machineInfoData.push({
                   index: 1,
                   $cellEdit: true,
                   userId: this.$store.state.userOid,
                   userName: parent.userID,
                   recordTime: this.$getNowTime("datetime"),
                   proWeaveJobFk: this.weaveJobId
               }) 
            },
            handleDel(){
                let { useId, $index } = this.curClickRow;
                useId && this.delIdList.push(useId)
                this.machineInfoData.splice($index,1);
            },
            handleClose(){
                this.$emit("close")
            },
        }
    }

</script>
<style lang="stylus">
.weave-job-machine-container{
    .btn-wrapper {
        padding 15px;
    }

}
</style>
