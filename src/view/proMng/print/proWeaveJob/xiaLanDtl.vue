
<template>
    <div class="xiaLan-dlt-container" v-loading="loading">
        <avue-crud
            ref="meaveEmbyroRef"
            :option="crudOp"
            :data="meaEmbDtlData"
            :span-method="handleSpanMethod"
            :row-style="handleRowStyle"
            @row-click="handleRowClick"
        ></avue-crud>
    </div>
</template>
<script>
    import { fetchXiaLanDtlData  } from "./api"
    import { xiaLanDtlCrudOp } from "./data"
    export default {
        name: "meaveEmbyroDtl",
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
                crudOp: xiaLanDtlCrudOp(this),
                curCliceRowIdx: 0,
            }
        },
        computed:{
            isOutFactory(){
                return  !this.$store.getters.isOutFactory
            }
        },
        methods:{
            // 数据加载
            getDataList(row){
                this.loading = true;
                let data = [{
                    poNo: row.poNo,
                    bomId: row.bomId,
                    groupNo: row.colorCode
                }]
                fetchXiaLanDtlData(data).then(res => {
                    this.dataTransform(res.data);
                }).finally(() => {
                    this.loading = false;
                })
            },
            // 数据格式解析
            dataTransform(originData){
                let propEnum = {
                    1: {
                        prop_1: "",
                        key: "cpName",
                        prop_2: ""
                    },
                    2: {
                         key: "cpName"
                    },
                    3: {
                         key: "cpName"
                    },
                };
                originData.forEach(item => {
                    if(!propEnum[item.rowId]){
                        propEnum[item.rowId] = {};
                    }
                    let itemData = propEnum[item.rowId];
                    if(item.colId == 1){
                        itemData.key = item.cpName;
                    }
                    itemData[`prop_${item.colId}`] = item.cpValue;
                });
                let targetDataList = Object.values(propEnum); 
                if(targetDataList.length != 0){
                    let props = Object.keys(targetDataList[1]).sort()
                    let option = props.map(prop => {
                        return {
                            width: 150,
                            prop: prop,
                            label: prop,
                            cell: prop != 'key',
                            placeholder: " ",
                            readonly: true,
                        }
                    });
                    this.crudOp.column = option;
                }

                targetDataList.forEach(item => {
                    item.$cellEdit = true;
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
        }
    }
</script>
<style lang="stylus">
.xiaLan-dlt-container{
    padding: 10px;

    tr:hover>td { 
        background-color: transparent !important;
    }	
}
</style>