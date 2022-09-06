<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-05 08:18:24
 * @Description: 
-->
<template>
  <div id="qualityWeight" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <view-container title="胚布台账">
      <el-row class="btnList">
        <el-button type="success" @click="saveAll" :disabled="form.clothState == 3">{{ this.$t("public.save") }}
        </el-button>
        <el-button type="primary" @click="dialogVisible = true" :disabled="!detail.noteId">{{ this.$t("public.update")
        }}</el-button>
        <el-button type="primary" @click="query(true)">{{
            this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print">打印</el-button>
        <el-button type="primary" @click="outExcel">导出</el-button>
        <el-tooltip class="item" effect="dark" content="同步勾选数据的储存位置,值为第一条勾选的数据" placement="right-start">
          <el-button type="primary" @click="syncLoc" :disabled="selectList.length < 2">同步储存位置</el-button>
        </el-tooltip>
        <span v-if="crud.length && weightSum > 0" style="float: right; margin-right: 10px">【 {{ crud[0].weaveJobCode }}
          】 总重量: {{ weightSum }} KG</span>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" 
          v-loading="loading" 
          :option="crudOp" 
          :data="crud" 
          :page.sync="page" 
          :summary-method="summaryMethod"
          @on-load="query"
          @row-dblclick="handleRowDBLClick" 
          @current-row-change="cellClick" 
          @selection-change="selectionChange">
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" width="70%" append-to-body :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-tabs type="border-card" v-model="tabs">
        <el-tab-pane label="修改" name="update">
          <template #label>
            <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="bottom">
              <span>修改</span>
            </el-tooltip>
          </template>
          <div class="btnList">
            <el-button type="success" @click="save" :disabled="detail.clothState == 3">{{ this.$t("public.save") }}
            </el-button>
            <el-button type="primary" @click="weighing">称重</el-button>
            <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
            <div style="float: right;margin-right: 17px;">
              电子秤读取： <el-switch v-model="useWeight" active-text="启用" inactive-text="停用"></el-switch>
            </div>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="dlgOp" v-model="detail"></avue-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="history">
          <template #label>
            <el-tooltip class="item" effect="dark" content="Lịch sử ghi chép" placement="bottom">
              <span>历史记录</span>
            </el-tooltip>
          </template>
          <div class="btnList">
            <el-tooltip class="item" effect="dark" content="Phục hồi dữ liệu" placement="bottom">
              <el-button type="primary" @click="recover">恢复</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
              <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
            </el-tooltip>
          </div>
          <div class="formBox">
            <avue-crud ref="dlgCrud" 
              v-loading="loading"
              :option="historyOp" 
              :data="history" 
              :page.sync="historyPage"
              @current-row-change="historyCellClick"
              @selection-change="selectionChange"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="打印預覽">
        <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import { get, add, update, del, getJob, updateNote, getNowWeight, recover, getHistory } from "./api";
import qs from "qs";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 0,
        outworkFlag: false,
      },
      dlgOp: dlgForm(this),
      crudOp: mainCrud(this),
      historyOp: dlgCrud(this),
      history: [],
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        currentPage: 1,
        total: 0,
      },
      historyPage: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        currentPage: 1,
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      prsocket: "",
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      pdfDlg: false,
      pdfUrl: "",
      ctrKey: false,
      checkLabel: "",
      sort: {},
      weightSum: 0,
      useWeight: false,
      tabs: "update",
      old_weight: "",
      hisId:''
    };
  },
  watch: {},
  methods: {
    query(type) {
      this.wLoading = true;
      if (type) {
        this.crud = [];
      }
      let r_clothCheckTime_r = "";
      if (this.form.clothCheckTime && this.form.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5B${this.form.clothCheckTime[0]} 07:30:00~${this.form.clothCheckTime[1]} 07:30:00%5D`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      let params = { 
        noteCode: "%" + (this.form.noteCode || ''),
        poNo: "%" + (this.form.poNo || ''),
        weaveJobCode: "%" + (this.form.weaveJobCode || ''),
        storeLoadCode: this.form.storeLoadCode,
        clothState: this.form.clothState,
        outworkFlag: this.form.outworkFlag,
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          // isPrinted: true,
          // 加上过滤厂
          filterFactory: true,
        }),
        r_clothCheckTime_r
      )
        .then((res) => {
          this.crud = res.data.records;
          if (this.crud.length) {
            getNowWeight(this.crud[0].weaveJobCode).then((res) => {
              this.$nextTick(() => {
                if (res.data) {
                  this.weightSum = res.data.clothWeight;
                } else {
                  this.weightSum = 0;
                }
              });
            });
          } else {
            this.$nextTick(() => {
              this.weightSum = 0;
            });
          }
          this.page.total = res.data.total;
        })
        .finally((_)=>{
          this.wLoading = false;
        } )
        .catch((e) => {
          this.wLoading = false;
        });
    },
    recover() {
      this.$tip.cofirm("是否确定恢复到选中的数据? Bạn có muốn phục hồi dữ liệu đã chọn").then(() => {
        this.loading = true;
        recover({
          hisId:this.hisId
        }).then((res) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              this.dialogVisible = false;
              this.loading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          } else {
            this.loading = false;
            this.wLoading = false;
            this.$tip.error(res.data.msg);
            console.error(res.data.msg);
          }
        });
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.old_weight = val.clothWeight;
      this.checkLabel = val.storeSiteCode;
      this.dialogVisible = true;
      getHistory({
        clothNoteFk: this.detail.noteId,
      }).then((res) => {
        this.history = res.data.sort((a, b) => {
          return a.clothCheckTime > b.clothCheckTime ? -1 : 1;
        });
      });
    },
    historyCellClick(val){
      this.hisId=val.hisId;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        let _weight = Number(e.data.split("weight=")[1].split(":")[0])
        if (_this.useWeight) {
          _this.detail.clothWeight = (_weight > 0) ? _weight : 0;
        } else {
          _this.detail.clothWeight = _this.old_weight
        }
        _this.detail.clothCheckTime = _this.$getNowTime("datetime");
      };
    },
    weighing() {
      if (this.czsocket.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      } else {
        this.czsocket.send("weight");
      }
    },
    saveAll() {
      this.wLoading = true;
      this.crud.forEach((item, i) => {
        if (item.clothWeight > 0 && item.clothState === 0) {
          item.clothCheckTime = this.$getNowTime("datetime");
          item.clothState = 1;
        }
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            this.query();
            this.$tip.success(this.$t("public.bccg"));
          }
        });
      });
    },
    save() {
      this.wLoading = true;
      if (this.detail.clothWeight > 0 && this.detail.clothState === 0) {
        this.detail.clothCheckTime = this.$getNowTime("datetime");
        this.detail.clothState = 1;
      }
      update(this.detail).then((res) => {
        this.query();
        this.$tip.success(this.$t("public.bccg"));
      });
    },
    syncLoc() {
      this.selectList.forEach((item) => {
        item.storeSiteCode = this.selectList[0].storeSiteCode;
      });
    },
    print() {
      let url = qs.stringify(this.form);
      let username = parent.userID || "ADMIN";
      if (this.crud.length) {
        this.pdfDlg = true;
        this.pdfUrl =
          process.env.API_HOST +
          "/api/proClothNote/Summarypreview?" +
          url +
          "&rows=" +
          this.page.pageSize +
          "&start=" +
          this.page.currentPage +
          "&isPrinted=true&userName=" + username;
        
      } else {
        this.$tip.error("请先選擇布飞信息!");
        return;
      }
    },
    outExcel() {
      this.$refs.crud.rowExcel();
    },
    cellClick(val) {
      if (this.ctrKey && this.checkLabel) {
        val.storeSiteCode = this.checkLabel;
      }
      this.detail = val;
      if (!this.detail.paperTube) {
        this.detail.paperTube = 0
      }
    },
    selectionChange(list) {
      this.selectList = list;
    },
    summaryMethod({ columns, data }) {
      const sums = [];
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if (index == 0) {
            sums[index] = "合計";
          }
          if (index == 2) {
            let num = 0;
            this.selectList.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "選中重量：" + num.toFixed(1);
          }
          if (index == 11) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.realWeight);
            });
            sums[index] = "毛重：" + num.toFixed(1);
          }
          if (index == 12) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "重量：" + num.toFixed(1);
          }
          if (index == 13) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.qcTakeOut);
            });
            sums[index] = "扣减：" + num.toFixed(1);
          }
        });
      }
      return sums;
    },
    clothLength() {
      if (
        this.detail.gramWeight &&
        this.detail.breadth &&
        this.detail.clothWeight
      ) {
        let gramWeight, breadth;
        this.$nextTick(() => {
          gramWeight =
            typeof this.detail.gramWeight === "number"
              ? Number(this.detail.gramWeight) / 1000
              : this.detail.gramWeight
                ? Number(this.detail.gramWeight.match(/\d+/g)[0]) / 1000
                : 0;
          breadth =
            typeof this.detail.breadth === "number"
              ? (Number(this.detail.breadth) * 2.54) / 100
              : this.detail.breadth
                ? (Number(this.detail.breadth.match(/\d+/g)[0]) * 2.54) / 100
                : 0;

          let weight = this.detail.clothWeight;
          if (!gramWeight || !breadth) {
            // 没有门幅/克重 码长无法计算为0
            this.detail.clothLengthValue = 0;
          } else {
            this.detail.clothLengthValue = Number(
              (weight / gramWeight / breadth).toFixed(1)
            );
          }
        });
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  created() { },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      let self = vm;
      self.setCz();
    });
  },
  mounted() {
    this.form.clothState = 0;
    let _this = this;
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey) {
        _this.ctrKey = true;
      }
    });
    document.addEventListener("keyup", function (e) {
      if (e.key == "Control") {
        _this.ctrKey = false;
      }
    });
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#qualityWeight {
  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }
}
</style>