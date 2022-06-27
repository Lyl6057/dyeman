<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-23 16:53:08
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\index.vue
 * @Description: 
-->

<template>
  <div class="abnormalDaily">
    <view-container title="QA剪办记录">
      <el-row class="btnList">
        <el-button type="success" @click="update"> {{this.$t("public.update")}} </el-button>
        <el-button type="primary" @click="add"> {{this.$t("public.add")}} </el-button>
        <el-button type="danger" @click="del"> {{this.$t("public.del")}} </el-button>
        <el-button type="primary" @click="handlePrint"> 打印 </el-button>
        <el-button type="primary" @click="query"> {{this.$t("public.query")}} </el-button>
        <div style="float: right">
          码卡信息 <el-switch v-model="hasCardData" active-text="显示" inactive-text="隐藏">
          </el-switch>
        </div>

      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="hasCardData ? 20 : 24">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" element-loading-text="正在拼命加载中..." @on-load="query" @row-click="rowClick" @row-dblclick="handleRowDBLClick">
          </avue-crud>
        </el-col>
        <el-col :span="4" v-if="hasCardData">
          <el-card class="box-card" style="text-align: left;padding-left: 10px;width:97%;height: calc(100vh - 200px)">
            <div slot="header" class="clearfix">
              <span>码卡信息</span>
            </div>
            <p>
              <span style="font-weight: 600;">客户: </span> {{cardData.custName}}
            </p>
            <p style="">
              <span style="font-weight: 600; ">布类: </span>{{cardData.fabName}}
            </p>
            <p>
              <span style="font-weight: 600;">颜色: </span>{{cardData.colorName}}
            </p>
            <p>
              <span style="font-weight: 600;">缸号: </span>{{cardData.vatNo}}
            </p>
            <p>
              <span style="font-weight: 600;">疋号: </span>{{cardData.pidNo}}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="qcCheckPlanTem" @refresh="query" @close="temClose"> </tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import {
  fetchProFinalProductCardCutByPage,
  removeProFinalProductCardCut,
  getFinishedNoteByPage,
  updateFinishedNoteData,
  updateProFinalProductCardCut,
} from "./api.js";
import { mainForm, mainCrud } from "./data.js";
import { webSocket } from "@/config/index.js";
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
      wloading: false,
      loading: false,
      dialogVisible: false,
      cutId: {},
      cardData: {},
      hasCardData: true,
      prsocket: null,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.prsocket = null;
    let _this = this;
    webSocket.setPrint(this);
    _this.prsocket.onmessage = function (e) {};
  },
  mounted() {},
  methods: {
    query() {
      this.loading = true;
      let params = {
        cutDept: "%" + (this.form.cutDept || ""),
        cutDate: this.form.cutDate,
        dataSortRules: "cutDate|desc,cutDept",
      };
      fetchProFinalProductCardCutByPage(params)
        .then(async (res) => {
          let { records, total } = res.data;
          this.cardData = {};
          this.crud = records;
          this.crud.forEach((item, i) => {
            item.netWeightLbs = item.netWeight * 2.2046;
            item.cutSamWeightLbs = item.cutSamWeight * 2.2046;
            item.cutDefeWeightLbs = item.cutDefeWeight * 2.2046;
          });
          this.page.total = total;
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
      this.$refs.qcCheckPlanTem.addAndcreateData(
        this.crud[this.curIdx - 1].cutId
      );
    },
    async add() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData();
    },
    async del() {
      if (!this.curIdx) {
        return this.$tip.warning("请先选择要删除的数据!");
      }
      let idx = this.curIdx - 1;
      let cofResult = await this.$tip
        .cofirm(
          "是否确定删除成品编号为【 " + this.crud[idx].productNo + " 】的数据?"
        )
        .then(() => {
          return true;
        })
        .catch((e) => {
          return false;
        });
      if (!cofResult) return false;
      this.loading = true;
      removeProFinalProductCardCut(this.crud[idx].cutId)
        .then((res) => {
          this.query();
          this.$tip.success("删除成功");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePrint() {
      if (this.prsocket.readyState == 3 || this.prsocket.readyState == 0) {
        this.$tip.error("打印服务离线，请启动服务后刷新页面!");
        return;
      }
      this.loading = true;
      let printData = this.crud[this.curIdx - 1];
      let params = {
        cardId: printData.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      };
      getFinishedNoteByPage(params)
        .then(async (res) => {
          if (res.data.total) {
            //存在码卡信息，更新
            let data = res.data.records[0];
            if (!printData.printTime) {
              // 打印过不再改变数量
              data.netWeight =
                data.netWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.grossWeight =
                data.grossWeight -
                printData.cutSamWeight -
                printData.cutDefeWeight;
              data.netWeightLbs = Number((data.netWeight * 2.2046).toFixed(1));
              data.grossWeightLbs = Number(
                (data.grossWeight * 2.2046).toFixed(1)
              );
              await updateFinishedNoteData(data);
            }
            printData.printTime = this.$getNowTime("datetime");
            updateProFinalProductCardCut(printData);
            this.prsocket.send("finishCard:" + data.cardId);
            this.$tip.success("已发送打印动作!");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setPrintApp() {
      webSocket.setClient(this);
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
      this.getCardData(row);
    },
    getCardData(row) {
      //  this.loading = true
      getFinishedNoteByPage({
        cardId: row.proCardFk,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      })
        .then((res) => {
          this.cardData = res.data.records[0];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleRowDBLClick(row) {
      this.curIdx = row.$index + 1;
      this.update();
    },
    temClose(hasRefresh) {
      this.dialogVisible = false;
      hasRefresh && this.query();
    },
    handleReport(command) {
      let dayId =
        new Date().getFullYear() +
        "" +
        (command < 10 ? "0" + command : command);
      let name = encodeURI(
        "http:" +
          process.env.API_HOST.split(":")[1] +
          ":92/api/qaDayOutput/qareport?dayId=" +
          dayId
      );
      window.open(name);
      this.wloading = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-card__header {
  padding: 8px 10px;
}
</style>