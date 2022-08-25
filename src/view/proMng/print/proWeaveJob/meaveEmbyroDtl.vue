<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-20 11:17:59
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-24 09:57:55
-->
<template>
    <view-container title="织胚明细" >
        <div class="meave-embyro-dtl-container" v-loading="loading">
            <div class="btn-wrapper">
                <template v-if="isOutFactory">
                  <el-tooltip  effect="dark" content="Bảo tồn" placement="top-start" >
                    <el-button type="success" @click="handleSave" >{{ $t("public.save") }}</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="handleAddPosition">添加部位</el-button>
                    <el-button type="danger" @click="handleRemovePosition" >删除部位</el-button>
                    <el-button type="primary" @click="handleAddSize">添加尺寸</el-button>
                    <el-button type="danger" @click="handleRemoveSize">删除尺寸</el-button>
                    
                </template>
                <el-button type="primary" @click="choiceV = true">复制织单</el-button>
                <el-tooltip class="item" effect="dark" content="đóng" placement="top-start" >
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </el-tooltip>
            </div>
            <avue-crud
                ref="meaveEmbyroRef"
                :option="crudOp"
                :data="meaEmbDtlData"
                :span-method="handleSpanMethod"
                :row-style="handleRowStyle"
                @row-click="handleRowClick"
            ></avue-crud>
        </div>
        <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="handleCheckOrder" @close="choiceV = false" v-if="choiceV"></choice>
    </view-container>
</template>
<script>
    import choice from "@/components/proMng/index";
    import { fetchWeaveJobFlatknitData, batchSaveOrUpdateFlatknit  } from "../proOutWeaveJob/api"
    import { meaveEmbyroDtlCrud } from "../proOutWeaveJob/data"
    import { fetchXiaLanDtlData  } from "./api"
    export default {
        name: "meaveEmbyroDtl",
        components: {
          choice
        },
        props: {
            weaveJobId:{
                type: String,
                default: () => ""
            }
        },
        data(){
            return {
                loading: false,
                meaEmbDtlData: [],
                crudOp: meaveEmbyroDtlCrud(this),
                curCliceRowIdx: 0,
                choiceV: false,
                choiceTle: "选择织造通知单",
                choiceQ: {
                  sortF: "weaveJobCode",
                },
            }
        },
        computed:{
            isOutFactory(){
                return  !this.$store.getters.isOutFactory
            }
        },
        methods:{
            // 数据抽取
            extractDtl(data){
                this.loading = true;
                fetchXiaLanDtlData(data).then(res => {
                    let resData = res.data.map(item => {
                        item.rowName = item.cpName
                        return item;
                    })
                    this.dataTransform(resData)
                }).finally(res => {
                    this.loading = false;
                })
            },
            // 数据保存
            handleSave(){
                if(!this.weaveJobId){
                    return this.$tip.warning("请先保存主通知单数据")
                }
                if(this.meaEmbDtlData.length == 0){
                    return this.$tip.warning("无法提交空数据;")
                }
                let result = [];
                this.meaEmbDtlData.forEach((item,index) => {
                    this.crudOp.column.forEach((propItem, oIndex) => {
                        if(oIndex == 0) return;
                        if((index % 3 == 0) && oIndex != 1 ) return
                        let value = item[propItem.prop]
                        // if(!value) return;
                        result.push({
                            proWeaveJobFk: this.weaveJobId,
                            colId: oIndex,
                            rowId: index,
                            rowName: item.key,
                            cpValue: value
                        })
                    })
                });
                this.loading = true;
                batchSaveOrUpdateFlatknit(result).then(res => {
                    this.getDataList();
                }).finally(_ => {
                    this.$tip.success("保存成功!")
                    this.loading = false;
                })
                
            },
            // 添加部位
            handleAddPosition(){
                this.meaEmbDtlData.push(...[
                    {key: "部位名称", prop_1: '', $cellEdit: true},
                    {key: "部位尺寸", prop_1: '', $cellEdit: true},
                    {key: "织胚数(条)", prop_1: '', $cellEdit: true},
                ])
            },
            // 删除部位
            handleRemovePosition(){
                // 选一个删除 区间范围的值
                let x = this.curCliceRowIdx;
                this.meaEmbDtlData.splice(x - (x % 3), 3);
            },
            // 添加尺寸
            handleAddSize(){
                let crudColLen = this.crudOp.column.length;
                this.crudOp.column.push({
                    prop: `prop_${crudColLen}`,
                    label: crudColLen.toString(),
                    cell: true,
                    placeholder: " ",
                    width: 150
                })
            },
            // 删除尺寸
            handleRemoveSize(){
                let crudColLen = this.crudOp.column.length;
                if(crudColLen == 1){
                    return this.$tip.warning("已无多余尺寸;")
                }
                this.crudOp.column.splice(crudColLen - 1,1)
            },
            // 选择织单
            handleCheckOrder(val) {
              if (!val || !val.weaveJobId) return;
              this.loading = true;
              let params = {
                    proWeaveJobFk: val.weaveJobId
                }
              console.log("weaveJobId",val.weaveJobId)
              fetchWeaveJobFlatknitData(params).then(res => {
                  this.dataTransform(res.data);
              }).finally(() => {
                  this.choiceV = false;
                  this.loading = false;
              })
            },
            // 数据加载
            getDataList(){
                this.loading = true;
                let params = {
                    proWeaveJobFk: this.weaveJobId
                }
                console.log("weaveJobId",this.weaveJobId)
                fetchWeaveJobFlatknitData(params).then(res => {
                    this.dataTransform(res.data);
                }).finally(() => {
                    this.loading = false;
                })
            },
            // 数据格式解析
            dataTransform(originData){
                let propEnum = {};
                originData.forEach(item => {
                    if(!propEnum[item.rowId]){
                        propEnum[item.rowId] = {};
                    }
                    let itemData = propEnum[item.rowId];
                    if(item.colId == 1){
                        itemData.key = item.rowName;
                    }
                    itemData[`prop_${item.colId}`] = item.cpValue;
                });
                console.log("propEnum",propEnum)
                let targetDataList = Object.values(propEnum);
                if(targetDataList.length != 0){
                    // let props = Object.keys(targetDataList[1]).sort()
                    let dataSize = targetDataList.length / 3;
                    let maxPropLen = 0;
                    let propData = [];
                    new Array(dataSize).fill(1).forEach((_,i) => {
                        let index = i * 3 + 1;
                        let tItems = Object.keys(targetDataList[index]);
                        let tLen = tItems.length;
                        if(tLen > maxPropLen){
                            maxPropLen = tLen;
                            propData = tItems;
                        }

                    })
                    
                    let option = propData.map(prop => {
                        return {
                            width: 150,
                            prop: prop,
                            label: prop,
                            cell: prop != 'key',
                            placeholder: " ",
                        }
                    });
                    this.crudOp.column = option;
                }

                targetDataList.forEach(item => {
                    item.$cellEdit = this.isOutFactory;
                })
                this.meaEmbDtlData = targetDataList;
            },
            // 合并单元格
            handleSpanMethod({rowIndex,columnIndex}){
                if(rowIndex % 3 == 0){
                    if(columnIndex == 0){
                        return [1,1]
                    }else if(columnIndex == 1){
                        return [1, this.crudOp.column.length - 1]
                    }else{
                        return [0, 0]
                    }
                }
            },
            // 行点击
            handleRowClick(row){
                this.curCliceRowIdx = row.$index;
            },
            // 行样式
            handleRowStyle({rowIndex}){
                /**
                 *  curRow: 0   [0,1,2]  0 / 3 floor 0
                 *          1   [3,4,5]  3 / 3 floor 1
                 *          2   [6,7,8]
                 *          3   [9,10,11]
                 * 
                */
                return Math.floor(rowIndex / 3) == Math.floor(this.curCliceRowIdx / 3)  ? {
                    backgroundColor:"skyblue"
                }: {}
            },
            // 关闭
            handleClose(){
                this.$emit("close")
            }
        }
    }
</script>
<style lang="stylus">
.meave-embyro-dtl-container{
    .btn-wrapper {
        padding 15px;
    }
    tr:hover>td { 
        background-color: transparent !important;
    }	
}
</style>