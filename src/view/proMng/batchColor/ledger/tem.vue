<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-17 17:02:05
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\tem.vue
 * @Description: 
-->
<template>
  <div class="batchColorLedgerTem">
    <view-container title="批色台账维护" element-loading-text="正在拼命加载中..." v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="batchColorLedgerForm" :option="batchColorFormOp" v-model="ledgerData">
          <template slot-scope="scope" slot="runJobFk">
            <el-select v-model="ledgerData.runJobFk" filterable remote reserve-keyword clearable
              default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" :loading="vatLoading"
              @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo"
                :value="item.runJobId">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
    </view-container>
  </div>
</template>

<script>
import {
  fetchProBatchColorLedgerByPage,
  addProBatchColorLedger,
  updateProBatchColorLedger,
  getRunJobByPage
} from "./api.js";
import { mainCrud } from "./data.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      batchColorFormOp: mainCrud(this),
      ledgerData: {},
      dtlCurIdx: null,
      hasRefresh: false,
      options: [],
      spowerClient: null,
      printCount: 5,
      printType:'1',
    };
  },
  watch: {
  },
  computed: {},
  created() {
    let _this = this;
    _this.spowerClient = _this.$store.state.spowerClient;
    // _this.spowerClient.onmessage = function (e) {
    //   if(e.data.indexOf("scan") != -1){
    //     // 扫描事件
    //     _this.remoteMethod(e.data.split("=")[1])
    //   }
    // };
  },
  mounted() {
  },
  methods: {
    remoteMethod(val) {
      if(!val) return;
      this.vatLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((res) => {
        this.options = res.data.records;
        // if (this.options.length == 1) {
        //   let data = this.options[0];
        //   this.ledgerData.runJobFk = data.runJobId;
        //   this.handleVatnoChange(this.ledgerData.runJobFk)
        // }
        this.vatLoading = false;
      });
    },

    handleVatnoChange(runJobId) {
      if(!runJobId) return;
      getRunJobByPage({
        runJobId,
        vatNo: "!^%",
        rows: 10,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length == 1) {
          let data = vatRes.data.records[0];
          this.ledgerData.custCode = data.custCode;
          this.ledgerData.colorCode = data.colorCode;
          this.ledgerData.colorName = data.colorName;
          this.ledgerData.salPoNo = data.salPoNo;
          this.ledgerData.firstOrOther = data.firstOrOther;
          this.ledgerData.fabName = data.fabName;
          this.ledgerData.poAmountKg = data.poAmountKg;
          this.ledgerData.pidCount = data.pidCount;
          this.ledgerData.vatNo = data.vatNo;
          // this.ledgerData.runJobFk = data.runJobId;
        } else {
          this.ledgerData.runJobFk = "";
          this.ledgerData.vatNo = "";
        }
      });
    },

    async addAndcreateData(recId) {
      this.loading = true;
      if (recId) {
        this.initData(recId);
        return;
      }
      // 初始化新增数据
      let nowDate = this.$getNowTime("datetime");
      this.ledgerData = {
        appMileage: "BF",
        appStaff: parent.userID,
        appState: 1,
        finishTime: nowDate,
        receiveTime: nowDate,
        vatOutTime: nowDate,
        recId: "",
        remark: "",
        runJobFk: "",
        vatNo: "",
      };
      await this.$nextTick();
      this.loading = false;
    },

    async initData(recId) {
      this.loading = true;
      fetchProBatchColorLedgerByPage({ recId }).then(async (res) => {
        res.data.total && (this.ledgerData = res.data.records[0]);
        this.remoteMethod(this.ledgerData.vatNo);
        this.handleVatnoChange(this.ledgerData.runJobFk);
        !res.data.total && this.handleClose();
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
    
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },

    handleSave() {
      this.$refs.batchColorLedgerForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.warning("请补充批色台账信息!");
            return;
          }
          this.loading = true;
          this.ledgerData.appTime =  this.$getNowTime("date") + " 00:00:00";
          this.hasRefresh = true;
          let recId = this.ledgerData.recId;
          if (recId) {
            await updateProBatchColorLedger(this.ledgerData).then();
            await this.initData(recId);
          } else {
            recId = await addProBatchColorLedger(this.ledgerData).then((res) => { return res.data.data });
            this.ledgerData.recId = recId;
            await this.initData(recId);
          }
          done();
          this.$tip.success("保存成功!");
        } catch (err) {
          done();
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },

    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    }
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-card__header {
  padding: 2px 10px;  
}
</style>