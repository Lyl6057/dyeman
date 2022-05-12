<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-12 09:26:47
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container title="QA产能统计管理" element-loading-text="正在拼命加载中..." v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{this.$t("public.save")}}</el-button>
        <el-button type="warning" @click="handleClose">{{this.$t("public.close")}}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData"> </avue-form>
      </div>
    </view-container>
  </div>
</template>

<script>
import {
  fetchQaDayOutputByPage,
  addQaDayOutputData,
  updateQaDayOutputData,
} from "./api.js";
import { mainCrud, qcCheckStorePlanCrud } from "./data.js";
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcCheckPlanFormOp: mainCrud(this),
      qcCheckPlanFormData: {},
      qcCheckStorePlanCrudOp: qcCheckStorePlanCrud(this),
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      choiceV: false,
      choiceTle: "选择在库载具",
      outId: ""
    };
  },
  watch: {
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async initData(outId) {
      this.loading = true;
      fetchQaDayOutputByPage({
        outId,
      }).then(async (res) => {
          res.data.total && (this.qcCheckPlanFormData = res.data.records[0]);
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    addAndcreateData(outId) {
      if (outId) {
        return this.initData(outId);
      }
      // 初始化新增数据
      this.qcCheckPlanFormData = {
        productQty: null,
        hairQty: null,
        collarQty: null,
        receivedQty: null,
        outQty: null,
        exceptQty: null,
        dayId: null,
        outId: null
      };
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    handleSave() {
      this.$refs.qcCheckPlanForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.error("请补充查布计划表信息!");
            return;
          }
          this.loading = true;
          let outId = this.qcCheckPlanFormData.outId;
          if (outId) {
            updateQaDayOutputData(this.qcCheckPlanFormData).then();
          } else {
            outId = await addQaDayOutputData(this.qcCheckPlanFormData).then(
              (res) => { return res.data.data; }
            );
            this.qcCheckPlanFormData.outId = outId;
          }
          this.hasRefresh = true;
          await this.initData(outId);
          this.$tip.success("保存成功!");
          setTimeout(() => {
            this.loading = false;
            done();
          }, 200);
        } catch (err) {
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },
    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.qcChcekPlanTem {
}
</style>