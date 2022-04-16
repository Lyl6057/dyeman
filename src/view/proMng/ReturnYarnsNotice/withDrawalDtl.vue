<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-16 08:55:57
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退纱通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="withDrawalFormOp" v-model="withDrawalFormData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="dtl" label="退纱通知单明细">
          <div class="btnList">
            <el-button type="primary" @click="handleAddByRetYarn">从织单领纱记录新增</el-button>
            <el-button type="primary" @click="handleAddByYarnStock">从库存表中新增</el-button>
            <el-button type="danger" @click="handleDtlDelete">删除</el-button>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="crud"
              :option="dtlCrudOp"
              :data="crudDataList"
              :page.sync="page"
              v-loading="loading"
              @on-load="getDataList"
              @row-click="handleCellClick"
              @selection-change="handleSelectionChange"
            ></avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
    </view-container>

    <el-dialog :visible.sync="retYarnDialogVisible" fullscreen append-to-body>
      <component
        :is="targetData"
        @selected="handleRetYarnSelected"
        @close="retYarnDialogVisible = false"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import { withDrawalFormOp, dtlCrudOp } from "./data";
import {
  addWithDrawal,
  updateWithDrawal,
  batchAddOrUpdateDtl,
  batchDelDtlDataById,
  fetchWithDrwarlDtlDataList
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";
import RetYarn from "./retYarnData.vue";
import YarnStock from "./yarnStock.vue";
import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {
    "ret-yarn": RetYarn,
    "yarn-stock": YarnStock
  },
  props: {
    withDatalData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      withDrawalFormOp: withDrawalFormOp(this),
      withDrawalFormData: {},
      tabName: "dtl",
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: dtlCrudOp(this),
      crudDataList: [],

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: RetYarn,
      //  是否刷新
      hasRefresh: false,
    };
  },
  watch: {
    withDatalData: {
      handler(value) {
        console.log("value", value);
        if (value.proYarnsWithdrawaloid) {
          this.setWithDrawalData();
        } else {
          this.initData();
        }
        this.hasRefresh = false;
      },
      immediate: true,
      deep: true
    }
  },
  created: {},
  methods: {
    // 初始化数据
    initData() {
      this.withDrawalFormData = {
        proYarnsWithdrawaloid: "",
        withdrawalNo: "",
        happenDate: "",
        typeOf: "",
        extFactId: ""
      };
      this.crudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
    },
    // 获取数据
    setWithDrawalData() {
      this.withDrawalFormData = this.withDatalData;
      this.getWithDrawalDtlDataList(this.withDatalData.proYarnsWithdrawaloid);
    },
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      fetchWithDrwarlDtlDataList({ proYarnsWithdrawalFk: oid })
        .then(res => {
          this.crudDataList = res.data.map(item => {
            item.$cellEdit = true;
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //   删除明细
    handleDtlDelete() {
      if (this.selectList.length == 0) return this.$tip.warning("请选择删除项");
      this.selectList.forEach(item => {
        if (!item.isAdd) {
          this.delOidList.push(item.proYarnsWithdrawalDtloid);
        }
        let tarIdx = this.crudDataList.findIndex(
          cItem =>
            cItem.proYarnsWithdrawalDtloid == item.proYarnsWithdrawalDtloid
        );
        this.crudDataList.splice(tarIdx, 1);
      });
    },
    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    // 织单号新增
    handleAddByRetYarn() {
      this.targetData = RetYarn;
      this.retYarnDialogVisible = true;
    },
    // 纱线库存新增
    handleAddByYarnStock() {
      this.targetData = YarnStock;
      this.retYarnDialogVisible = true;
    },
    // 织单号选择回调
    handleRetYarnSelected(rows) {
      let diffEnum = this.crudDataList.reduce((a, b) => {
        a[b.yarnsId + b.yarnsCard + b.suppBatNo + b.batchNo] = true;
        return a;
      }, {});
      let selectList = [];
      rows.forEach(item => {
        let key = item.yarnsId + item.yarnsCard + item.suppBatNo + item.batchNo;
        if (diffEnum[key]) return;
        selectList.push({
          proYarnsWithdrawalDtloid: v1(),
          //   proYarnsWithdrawalFk: this.withDrawalData.proYarnsWithdrawaloid,
          ...item,
          $cellEdit: true,
          isAdd: true // 新增字段
        });
      });
      this.crudDataList.push(...selectList);
    },

    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "pro_with_drawal" }).then(res => {
        Object.assign(this.withDrawalFormData, {
          withdrawalNo: res.data.data,
          happenDate: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid,
          //   proYarnsWithdrawaloid: v1()
        });
      });
    },
    // 保存
    async handleSave() {
      if (!this.saveValid()) return;
      this.loading = true;
      let oid = this.withDrawalFormData.proYarnsWithdrawaloid;
      if (oid) {
        await updateWithDrawal(this.withDrawalFormData);
      } else {
        oid = await addWithDrawal(this.withDrawalFormData).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "pro_with_drawal" });
      }
      Object.assign(this.withDrawalFormData, { proYarnsWithdrawaloid: oid });
      this.crudDataList.map(item => {
        return Object.assign(item, {
          proYarnsWithdrawalFk: oid
        });
      });
      await batchAddOrUpdateDtl(this.crudDataList);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    saveValid() {
      let { typeOf, extFactId } = this.withDrawalFormData;
      if (typeOf == "" || typeOf == null || typeOf == undefined) {
        this.$tip.warning("退纱类型不能为空");
        return false;
      }

      if (typeOf == 1 && extFactId == "") {
        this.$tip.warning("请输入外发厂名称");
        return false;
      }

      if (this.crudDataList.length == 0) {
        this.$tip.warning("退纱通知明细数据不能为空");
        return false;
      }

      let isNull2Value = this.crudDataList.every(item => {
        return item.weight1 && item.cartonNumber && item.packSize;
      });

      if (!isNull2Value) {
        this.$tip.warning("请完善明细数据（退纱数量、件数、包装规格不能为空）");
        return false;
      }

      return true;
    },
    //
    handleCloseDtl() {
      this.$emit("dtlClose",this.hasRefresh);
    },
    getDataList() {},
    handleCellClick(row) {}
  }
};
</script>