<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:34:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-27 09:39:23
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退纱通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave"
          :disabled="hasEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="retReatFormOp" v-model="retReatFormData"></avue-form>
      </div>
      <view-container title="退纱通知单明细">
        <!-- <div class="btnList"></div> -->
        <avue-crud
          ref="dtlCrudRef"
          :option="dtlCrudOp"
          :data="dtlCrudDataList"
          :page.sync="page"
          v-loading="loading"
          @on-load="getDataList"
          @row-click="handleDtlCellClick"
          @selection-change="handleSelectionChange"
        ></avue-crud>
      </view-container>
    </view-container>
  </div>
</template>

<script>
import { retReatFormOp, retReatDtlCrudOp} from "./data";
import {
  addRetRectData,
  updateRetRectData,
  batchAddOrUpdateRetReatDtlData,
  fetchWhseYarninByRemeoNo,
  fetchRetReatDtlDataByOid,
  fetchValidOutWeight
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";

import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {},
  props: {
    moduleParams:{
      type: Object,
      default: () => ({})
    },
    imWkType:{
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      retReatFormOp: retReatFormOp(this),
      retReatFormData: {},
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: retReatDtlCrudOp(this),
      dtlCrudDataList: [],

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: null,
      //  是否刷新
      hasRefresh: false,

      // 当前点击明细索引
      dtlCurRowIdx: -1,

    };
  },
  computed: {
    hasEdit() {
      return this.retReatFormData.stockState == "1";
    }
  },
  methods: {
    // 初始化基础数据
    initBaseData() {
      this.dtlCurRowIdx = -1;
      this.dtlaCurRowIdx = -1;
      this.dtlaDelOids = [];
    },
    // 明细数据点击
    handleDtlCellClick(row) {
      if (this.dtlCurRowIdx > -1 && this.dtlaCurRowIdx > -1) {
        this.dtlCrudDataList[this.dtlCurRowIdx].retreatDtlaList[
          this.dtlaCurRowIdx
        ].$cellEdit = false;
      }
      this.dtlCurRowIdx = row.$index;
    },
    // 初始化数据
    initData(remeoNo) {
      this.retReatFormData = {
        retCode: "",
        retDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid,
        retMemo: remeoNo,
        stockState: "0",
        finStatus: "0",
        retType: "4"
      };
      this.dtlCrudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
      this.getDtlDataByRemeoNo(remeoNo);
    },
    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "whse_out" }).then(res => {
        Object.assign(this.retReatFormData, {
          retCode: res.data.data
          //   whseRetreatoid: v1()
        });
      });
    },
    // 通过通知单号获取明细数据
    getDtlDataByRemeoNo(remeoNo) {
      this.initBaseData();
      this.loading = true;
      fetchWhseYarninByRemeoNo(remeoNo,this)
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.whseDtlOid = v1();
            item.$cellEdit = true;
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 获取数据
    setRetReatData(withDatalData) {
      this.retReatFormData = withDatalData;
      // this.getWithDrawalDtlDataList(withDatalData.whseRetsuppaccessoriesoid);
      this.getWithDrawalDtlDataList(withDatalData[this.moduleParams.mainOidKey],this);
    },
    getWithDrawalDtlDataList(oid) {
      this.initBaseData();
      this.loading = true;
      fetchRetReatDtlDataByOid({ [this.moduleParams.mainOidFkKey]: oid },this)
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.$cellEdit = this.retReatFormData.stockState == "0";
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },

    // 保存
    async handleSave() {
      let vaildRes = await this.saveValid();
      if (!vaildRes) return;
      this.loading = true;
      let oid = this.retReatFormData[this.moduleParams.mainOidKey];
      if (oid) {
        await updateRetRectData(this.retReatFormData,this);
      } else {
        oid = await addRetRectData(this.retReatFormData,this).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_out" });
      }
      Object.assign(this.retReatFormData, { [this.moduleParams.mainOidKey]: oid });

      let dataList = this.dtlCrudDataList.map(item => {
        return {
          [this.moduleParams.dtlOidFk]: item.whseDtlOid,
          retQty: item.retQty,
          [this.moduleParams.mainOidFkKey]: oid,
          [this.moduleParams.inDtlOidFk]: item.dtlOid,
        };
      });
      let reqList = [
        batchAddOrUpdateRetReatDtlData(dataList,this)
      ];
      await Promise.all(reqList);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    async saveValid() {
      let dataList = [];
      this.dtlCrudDataList.forEach(item => {
        dataList.push({
          matCode: item.matCode,
          batchNo: item.batchNo,
          retQty: item.retQty || 0,
        });
      });
      let validRes = await fetchValidOutWeight(dataList,this).then(res => res.data);
      if (!validRes.data.status) {
        this.$tip.warning("保存无效~");
        validRes.data.resultList.forEach((item, index) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `批号为<strong>${item.batchNo}</strong>的材料编号<strong>${item.matCode}</strong>剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });
      }
      // 检验条件
      return validRes.data.status;
    },
    //
    handleCloseDtl() {
      this.$emit("close", this.hasRefresh);
    },
    getDataList() {}
  }
};
</script>


