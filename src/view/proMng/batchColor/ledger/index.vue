<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-20 07:44:30
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\index.vue
 * @Description: 
-->

<template>
  <div class="abnormalDaily">
    <view-container title="批色台账">
      <el-row class="btnList">
        <el-button type="success" @click="update"> {{ $t("public.update") }} </el-button>
        <el-button type="primary" @click="add"> {{ $t("public.add") }} </el-button>
        <el-button type="danger" :disabled="chooseData.upFlag" @click="del"> {{ $t("public.del") }} </el-button>
        <el-button type="primary" @click="handleQuery"> {{ $t("public.query") }} </el-button>
        <el-button type="primary" @click="handleOutreport"> 报表 </el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" element-loading-text="正在拼命加载中..." @on-load="handleQuery" @row-click="rowClick" @row-dblclick="handleRowDBLClick">
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="batchColorLedgerTem" @refresh="handleQuery" @close="temClose" v-if="dialogVisible"> </tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import {
  fetchProBatchColorLedgerViewByPage,
  removeProBatchColorLedger,
} from "./api.js";
import { mainForm, mainCrud } from "./data.js";
export default {
  components: {
    temDlg,
  },
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      curIdx: null,
      loading: false,
      dialogVisible: false,
      cardData: {},
      spowerClient: null,
      chooseData: {},
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      let self = vm;
      self.spowerClient = self.$store.state.spowerClient;
    });
  },
  mounted() {}, 
  methods: {
    handleQuery() {
      this.loading = true;
      let params = {
        appMileage: this.form.appMileage || "",
        appState: this.form.appState || "",
        appTime: this.form.appTime || "",
        vatNo: "!^%" + (this.form.vatNo || ""),
        dataSortRules: "appTime|desc,vatNo|desc",
        rows: this.page.pageSize,
        start: this.page.currentPage
      };
      fetchProBatchColorLedgerViewByPage(params)
        .then(async (res) => {
          let { records, total } = res.data;
          this.cardData = {};
          this.crud = records;
          this.page.total = total;
          this.chooseData = {};
          this.$refs.crud.setCurrentRow();
          await this.$nextTick();
          this.curIdx = null;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    async update() {
      if (!this.curIdx) {
        this.$tip.warning("请先选择要修改的数据!");
        return;
      }
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.batchColorLedgerTem.addAndcreateData(
        this.crud[this.curIdx - 1].recId
      );
    },
    async add() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.batchColorLedgerTem.addAndcreateData();
    },
    async del() {
      if (!this.curIdx) return this.$tip.warning("请先选择要删除的数据!");
      let idx = this.curIdx - 1;
      let cofResult = await this.$tip.cofirm(
          "是否确定删除缸号为【 " + this.crud[idx].vatNo + " 】的数据?"
        )
        .then(() => {
          return true;
        })
        .catch((e) => {
          return false;
        });
      if (!cofResult) return false;
      this.loading = true;
      removeProBatchColorLedger(this.crud[idx].recId)
        .then((res) => {
          this.handleQuery();
          this.$tip.success("删除成功");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleOutreport() {
      // document.domain
      let reportUrl = "http://" + '192.168.5.1'+ ":92/api/proAppColorRec/generatePdf?"
      for(let key in this.form){
        if(this.form[key]){
          reportUrl += "&" + key + '=' + this.form[key]
        }
      }
      window.open(encodeURI(reportUrl));
      this.$tip.success("导出成功!")
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
      this.chooseData = row;
    },
    handleRowDBLClick(row) {
      this.curIdx = row.$index + 1;
      this.update();
    },
    temClose(hasRefresh) {
      this.dialogVisible = false;
      hasRefresh && this.handleQuery();
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-card__header {
  padding: .5rem .625rem;
}

.cardData p span:first-child {
  font-weight: 600;
}

.box-card {
  text-align: left;
  padding-left: .625rem;
  width: 97%;
  height: calc(100vh - 12.5rem);
}
</style>