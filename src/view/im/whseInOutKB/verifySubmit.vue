<!--
 * @Author: Lyl
 * @Date: 2022-04-13 10:13:47
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-13 13:40:26
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\verifySubmit.vue
 * @Description: 
-->
<!--
 * @Author: Lyl
 * @Date: 2022-04-08 14:41:23
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-13 10:12:20
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\inWhse.vue
 * @Description: 
-->

<template>
  <div id="whseInOut_verifySubmit">
    <view-container
      title="请仔细检查以下内容"
      :element-loading-text="$t('public.loading')"
      v-loading="loading"
    >
      <div class="crudBox">
        <avue-crud
          ref="verifySubmitC"
          id="verifySubmitC"
          :option="verifyOp"
          :data="verifyC"
        ></avue-crud>
      </div>
      <div class="btnList" style="text-align: center">
        <el-button type="warning" @click="$emit('cancel')">取消</el-button>
        <el-button
          type="success"
          @click="$emit('success', verifyC)"
          :disabled="!read"
          >生成入库记录</el-button
        >
      </div>
    </view-container>
  </div>
</template>

<script>
export default {
  props: {
    crudOp: Object,
    crud: Array,
    newLoad: String,
  },
  data() {
    return {
      loading: false,
      read: false,
      verifyOp: {},
      verifyC: [],
    };
  },
  watch: {},
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) this.$refs["verifySubmitC"].doLayout();
    });
  },
  computed: {},
  created() {
    this.loading = true;
    this.verifyOp = JSON.parse(JSON.stringify(this.crudOp));
    this.verifyOp.height = "calc(100vh - 250px)";
    this.verifyOp.selection = false;
    this.verifyC = JSON.parse(JSON.stringify(this.crud));
    this.verifyC.forEach((item) => {
      item.storeLoadCode = this.newLoad;
    });
  },
  mounted() {
    setTimeout(() => {
      const dom = document
        .getElementById("verifySubmitC")
        .getElementsByClassName("el-table__body-wrapper")[0];
      if (dom.scrollHeight == dom.clientHeight) {
        this.read = true;
      } else {
        dom.addEventListener("scroll", () => {
          const clientHeight = dom.clientHeight;
          const scrollTop = dom.scrollTop;
          const scrollHeight = dom.scrollHeight;
          if (clientHeight + scrollTop + 2 >= scrollHeight) {
            this.read = true;
          }
        });
      }
      this.loading = false;
    }, 500);
  },
  methods: {},
};
</script>
<style lang="stylus" scoped></style>