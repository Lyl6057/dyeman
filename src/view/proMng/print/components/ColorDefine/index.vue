<template>
    <el-dialog :visible.sync="visible" append-to-body :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" >
        <view-container title="适用染色色系"  >
            <div class="weave-color-define-container" v-loading="loading">
                <div class="btn-wrapper">
                    <el-tooltip  effect="dark" content="Bảo tồn" placement="top-start" >
                        <el-button type="success" @click="handleSave" >{{ $t("public.save") }}</el-button>
                    </el-tooltip>
                    <el-button type="primary" @click="handleAllSel">全选</el-button>
                    <el-button type="danger" @click="handleRevSel" >反选</el-button>
                    <el-tooltip class="item" effect="dark" content="đóng" placement="top-start" >
                        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                    </el-tooltip>
                </div>
                <avue-crud
                    ref="colDefRef"
                    :option="crudOp"
                    :data="dataList"
                    @select="handleSelect"
                    @select-all="handleSelect"
                ></avue-crud>
            </div>
        </view-container>
    </el-dialog>
</template>

<script>
import { fetchDict2Color, fetchWeaveDcsByWeaveJobId, batchSaveWeaveDcsData  } from "./api"
import { colDefCrudOp } from "./data"
import v1 from "uuid/v1"
export default {
    name: "weave",
    props: {
        weaveJobId: {
            type: String,
            default: () => ""
        }
    },
    data(){
        return {
            visible: false,
            loading: false,
            crudOp: colDefCrudOp(this),
            dataList: [],

            curSelRows: [],
            // 是否全选
            isAllSel: false,
        }
    },
    mounted(){
        // this.getInitCodeList();
    },
    watch: {
        weaveJobId: {
            handler(value){
                this.getInitCodeList();
            },
            immediate: true
        },
        visible: {
            handler(value){
                value && this.setSel2Table();
            },
            immediate: true
        }
    },
    methods: {
        // 获取色系数据资料
        getInitCodeList(){
            this.loading = true
            fetchDict2Color().then(res => {
                this.dataList = res.data.map(item => {
                    return {
                        codeName: item.codename,
                        codeId: item.codeid,
                        isSelect: false,
                        proWeaveJobDcsoid: v1(),
                    }
                });
                let params = {
                    proWeaveJobFk: this.weaveJobId
                }
                return  this.weaveJobId && fetchWeaveDcsByWeaveJobId(params);
            }).then(async res => {
                let dcsEnum = (res.data || []).reduce((a,b) => Object.assign(a, {[b.dcsNo]: b.proWeaveJobDcsoid}), {});
                this.dataList.forEach(item => {
                    if(dcsEnum[item.codeId]){
                        item.isSelect = true;
                        item.proWeaveJobDcsoid = dcsEnum[item.codeId];
                    }
                });
                this.curSelRows = this.dataList.filter(item => item.isSelect)
                this.visible &&  this.setSel2Table();
            }).finally(() => {
                this.loading = false;
            })
           
        },
        // 赋值选中项
        async setSel2Table(){
            await this.$nextTick();
            this.dataList.filter(item => item.isSelect).forEach(item => {
                this.$refs.colDefRef.toggleRowSelection(item, true)
            })
        },
        // 赋值抽取到的数据集合
        setSelColData(colNameMap){
            console.log("colNameMap",colNameMap)
            this.dataList.forEach(item => {
                if(colNameMap[item.codeName]){
                    item.isSelect = true;
                }
            });
            this.curSelRows = this.dataList.filter(item => item.isSelect)
        },
        // 全选
        handleAllSel(){
            this.isAllSel = true
            this.dataList.forEach(item => {
                item.isSelect = true;
                this.$refs.colDefRef.toggleRowSelection(item, true)
            })
            this.curSelRows = this.dataList;
        },
        // 反选
        handleRevSel(){
            this.dataList.forEach(item => {
                this.$refs.colDefRef.toggleRowSelection(item, !item.isSelect)
                item.isSelect = !item.isSelect
            })
            this.curSelRows = this.dataList.filter(item => item.isSelect);
        },
        // 保存
        handleSave(weaveJobId){
            if(!this.weaveJobId){
                this.$tip.success("已保存")
                return this.handleClose();
            }
            if(this.curSelRows.length == 0){
                return this.$tip.warning("请选择数据")
            }
            let dcsDataList = this.curSelRows.map(item => {
                return {
                    proWeaveJobDcsoid: item.proWeaveJobDcsoid,
                    proWeaveJobFk: this.weaveJobId || weaveJobId,
                    dcsNo: item.codeId,
                }
            });
            this.loading = true;
            batchSaveWeaveDcsData(dcsDataList).then(res => {
                this.$tip.success("保存成功")
            }).finally(() => {
                this.loading = false;
            })
        },
        // 关闭
        handleClose(){
            this.visible = false;
        },

        handleSelect(rows, row){
            rows.forEach(item => {
                item.isSelect = true;
            })
            if(rows.length == 0){
                this.dataList.forEach(item => {
                    item.isSelect = false;
                })
            }
            this.curSelRows = rows;
        }

    }
}
</script>
<style lang="stylus">
    .weave-color-define-container{
        padding 10px 20px 20px
    }
</style>