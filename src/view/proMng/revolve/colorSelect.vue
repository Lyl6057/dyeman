<!--
 * @Description: 颜色选择
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-07-28 08:22:42
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-28 09:09:04
-->
<template>
    <el-dialog :visible.sync="visible" append-to-body fullscreen >
        <view-container title="颜色选择">
            <div class="btn-wrapper">
                <el-button type="success" @click="handleSelect" >选择</el-button>
                <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
                    <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
                </el-tooltip>
            </div>
            <avue-crud 
                ref="colSelCrudRef" 
                :option="colSelCrudOp" 
                :data="dataList"
                @row-click="handleRowClick"
                @row-dblclick="handleDblClick"
            ></avue-crud>
        </view-container>
    </el-dialog>
</template>
<script>
import { colSelCrudOp } from "./data"
export default {
    name: "colorSelect",
    props: {
      dataList: {
          type: Array,
          default: () => []
      }  
    },
    data(){
        return {
            visible: false,
            colSelCrudOp: colSelCrudOp(this),
            curSelRow: {},
        }
    },
    methods:{
        // 选择
        handleSelect(){
            if(!this.curSelRow.weaveJobCode) return this.$tip.warning("请选择数据")
            this.$emit("select",this.curSelRow);
            this.visible = false;
        },
        // 单击
        handleRowClick(row){
            this.curSelRow = row;
        },
        // 双击
        handleDblClick(row){
            this.curSelRow = row;
            this.handleSelect();
        },
        handleClose(){
            this.visible = false;
        }
    }
}


</script>
<style lang="stylus">
.btn-wrapper{
    padding: 10px
}
</style>