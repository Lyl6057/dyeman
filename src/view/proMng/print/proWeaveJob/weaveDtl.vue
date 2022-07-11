<!--
 * @Description: 织单明细
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-11 08:22:07
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-11 15:30:38
-->
<template>
    <div id="weave-dlt-container" >
        <avue-crud 
            ref="weaveDtlRef" 
            :option="dtlCrudOp" 
            :data="crudData" 
        ></avue-crud>
    </div>
</template>
<script>
import { batchSaveOrUpdateWeaveDtlData, fetchWeaveDtlDataByFk } from "./api";
import { weaveDtlCrudOp } from "./data"
export default {
    name: "weaveDtl",
    props: {
        creator: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            crudData: [],
            dtlCrudOp: weaveDtlCrudOp(this),
            timer: null,
        }
    },
    methods: {
        // 重新计算织排总数
        reComputed(){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let total = this.crudData.reduce((a,b) => a +( b.weavePoQty || 0)  , 0);
                this.$emit("input", total);
            }, 200)
        },
        // 获取织单明细数据
        getWeaveDtlData(proWeaveJobId){
            let params = {
                proWeaveJobFk: proWeaveJobId
            };
            fetchWeaveDtlDataByFk(params).then(res => {
                this.crudData = res.data.map(item => {
                    item.$cellEdit = this.creator == parent.userID;
                    return item;
                });
            })
        },
        // 保存织单明细数据
        saveWeaveDltData(proWeaveJobId){
            let reulstData = this.crudData.map(item => {
                let { proWeaveJobGstpodetailoid, poNo, bomId, fabCode, fabName, fabConst, colorEngName, colorChnName, weavePoQty} = item;
                let targetItem = {
                    proWeaveJobGstpodetailoid, 
                    poNo, 
                    bomId,
                    fabCode, 
                    fabName, 
                    fabConst, 
                    colorEngName, 
                    colorChnName, 
                    weavePoQty,
                    proWeaveJobFk: proWeaveJobId
                };
                return targetItem;
            })
            batchSaveOrUpdateWeaveDtlData(reulstData)
        }
    }
}

</script>
<style lang="stylus">
    #weave-dlt-container{
        .el-input-number .el-input__inner{
            text-align right !important;
        }
    }
</style>