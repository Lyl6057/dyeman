<!--
 * @Author: Lyl
 * @Date: 2022-06-22 08:31:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-22 10:12:53
 * @FilePath: \iot.vue\src\view\quaLity\qcDetailReport\audit.vue
 * @Description: 
-->
<template>
  <div class="qcDetailReport-audit">
    <view-container
      title="请仔细检查以下内容"
      :element-loading-text="$t('public.loading')"
      v-loading="loading"
    >
      <div class="crudBox">
        <avue-crud
          id="verifySubmitC"
          ref="verifySubmitC"
          :option="verifyOp"
          :data="verifyC"
        ></avue-crud>
      </div>
      <div class="btnList" style="text-align: center">
        <el-button
          type="warning"
          @click="$emit('submitAudit', 1)"
          :disabled="!read"
          >不通过</el-button
        >
        <el-button
          type="success"
          @click="$emit('submitAudit', 9)"
          :disabled="!read"
          >通过</el-button
        >
      </div>
    </view-container>
  </div>
</template>

<script>
import { mainCrud } from '../codeCard/data';
import { get } from '../codeCard/api';
export default {
  components: {},
  props: {
    vatNo: String
  },
  data() {
    return {
      verifyC: [],
      verifyOp: mainCrud(this),
      read: false,
      loading: false,
    };
  },
  watch: {
  },
  computed: {},
  created() {
    this.verifyOp.page = false
    this.verifyOp.selection = false
    this.verifyOp.showSummary = false
    this.initData()
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
  mounted() {},
  methods: {
    initData(){
      this.loading = true;
      get({ vatNo: this.vatNo, row: 100, page:1, start: 1, productNo: "^^%", cardType: 1, delFlag: false, }).then( res =>{
        this.verifyC = res.data.records;
        this.loading = false;
      })
    }
  },
};
</script>
<style lang="stylus" scoped>
.qcDetailReport-audit{

}
</style>