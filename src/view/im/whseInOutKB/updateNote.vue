<!--
 * @Author: Lyl
 * @Date: 2022-04-08 14:41:23
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-08 16:34:00
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\updateNote.vue
 * @Description: 
-->

<template>
  <div class="whseInOut_updateNote">
    <view-container
      title="修改载具"
      :element-loading-text="$t('public.loading')"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">保存</el-button>
        <el-popover
          placement="top"
          width="160"
          v-model="visible"
          style="margin: 0 8px"
        >
          <p>请输入要新的载具编号</p>
          <el-input v-model="newLoad"></el-input>
          <div style="text-align: center; margin-top: 10px">
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="sumbit"
              >确定</el-button
            >
          </div>
          <el-button
            type="primary"
            slot="reference"
            :disabled="!selectList.length"
            >批量修改</el-button
          >
        </el-popover>

        <el-button type="warning" @click="$emit('close')">关闭</el-button>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          @selection-change="selectionChange"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>

<script>
import { finishedCrud } from "./data";
import { updateFinished } from "./api";
export default {
  components: {},
  props: {
    noteList: Array,
  },
  data() {
    return {
      crudOp: finishedCrud(this),
      crud: [],
      loading: false,
      visible: false,
      selectList: [],
      newLoad: "",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.crud = JSON.parse(JSON.stringify(this.noteList));
    this.crudOp.column[0].width = 50;
    this.crudOp.page = false;
    this.crudOp.selection = true;
    this.crudOp.height = "calc(100vh - 120px)";
    this.crud.forEach((item) => {
      item.$cellEdit = true;
    });
  },
  mounted() {},
  methods: {
    save() {
      this.loading = true;
      this.crud.forEach((item, i) => {
        updateFinished(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.$tip.success("保存成功!");
              this.loading = false;
            }, 200);
          }
        });
      });
    },
    selectionChange(val) {
      this.selectList = val;
    },
    sumbit() {
      if (!this.newLoad) return this.$tip.warning("请输入新的载具编号!");
      this.selectList.forEach((item) => {
        item.storeLoadCode = this.newLoad;
      });
      this.visible = false;
    },
  },
};
</script>
<style lang="stylus" scoped></style>