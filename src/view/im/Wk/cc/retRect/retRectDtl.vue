<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:34:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 09:56:41
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退纱通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleSave" :disabled="hasEdit" >{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="retReatFormOp" v-model="retReatFormData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="dtl" label="退纱通知单明细">
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
  </div>
</template>

<script>
import { retReatFormOp, retReatDtlCrudOp } from "./data";
import {
  addRetRectData,
  updateRetRectData,
  batchAddOrUpdateRetReatDtlData,
  fetchWhseYarninByRemeoNo,
  fetchRetReatDtlDataByOid
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";

import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {},
  props: {},
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      retReatFormOp: retReatFormOp(this),
      retReatFormData: {},
      tabName: "dtl",
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: retReatDtlCrudOp(this),
      crudDataList: [],

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: null,
      //  是否刷新
      hasRefresh: false
    };
  },
  computed:{
    hasEdit(){
      return this.retReatFormData.retState == "1"
    }
  },
  methods: {
    // 初始化数据
    initData(remeoNo) {
      this.retReatFormData = {
        retCode: "",
        retDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid,
        retMemo: remeoNo,
        retState: "0"
      };
      this.crudDataList = [];
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
      this.loading = true;
      fetchWhseYarninByRemeoNo(remeoNo)
        .then(res => {
          this.crudDataList = res.data.map(item => {
            item.whseRetreatDtloid = v1();
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
      this.getWithDrawalDtlDataList(withDatalData.whseRetreatoid);
    },
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      fetchRetReatDtlDataByOid({ whseRetreatFk: oid })
        .then(res => {
          this.crudDataList = res.data.map(item => {
            item.$cellEdit = this.retReatFormData.retState == "0";
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

    // 保存
    async handleSave() {
      if (!this.saveValid()) return;
      this.loading = true;
      let oid = this.retReatFormData.whseRetreatoid;
      if (oid) {
        await updateRetRectData(this.retReatFormData);
      } else {
        oid = await addRetRectData(this.retReatFormData).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_out" });
      }
      Object.assign(this.retReatFormData, { whseRetreatoid: oid });
     
      let dataList = this.crudDataList.map(item => {
        return {
          whseRetreatDtloid: item.whseRetreatDtloid,
          retWeight: item.retWeight,
          whseRetreatFk:oid,
          whseYarninDtlFk: item.whseYarninDtloid,
          retPcsNum: item.retPcsNum
        }
      })
      await batchAddOrUpdateRetReatDtlData(dataList);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    saveValid() {
      // 检验条件
      return true;
    },
    //
    handleCloseDtl() {
      this.$emit("close", this.hasRefresh);
    },
    getDataList() {},
    handleCellClick(row) {}
  }
};
</script>


