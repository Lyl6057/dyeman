<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-10 15:13:33
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退纱通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="withDrawalFormOp" v-model="withDrawalFormData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="dtl" label="退纱通知单明细">
          <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleAddByYarnStock">从库存表中新增</el-button>
            <el-button type="danger" :disabled="hasNotEdit" @click="handleDtlDelete">删除</el-button>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="crud"
              :option="dtlCrudOp"
              :data="crudDataList"
              :page.sync="page"
              v-loading="loading"
              @selection-change="handleSelectionChange"
            ></avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
    </view-container>

    <inv-select 
      ref="invSelectRef" 
      @data-select="handleInvSelect"
      :matType="matType"
      :unifiedFormat='true'
    ></inv-select>
  </div>
</template>

<script>
import { withDrawalFormOp, dtlCrudOp, dataTyptEnum } from "./data";
import {
  addWithDrawal,
  updateWithDrawal,
  batchAddOrUpdateDtl,
  batchDelDtlDataById,
  fetchWithDrwarlDtlDataList
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { fetchValidOutWeight } from "@/components/InventorySelect/api"
import { timeConversion } from "@/config/util";
import InventorySelect from "@/components/InventorySelect"
import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components:{
    "inv-select": InventorySelect
  },
  props: {
    withDatalData: {
      type: Object,
      default: () => ({})
    },
    matType:{
      type: String|Number,
      default: "3"
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

      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  是否刷新
      hasRefresh: false,
    };
  },
  computed:{
    hasNotEdit(){
      return this.withDatalData.isInStock 
    }
  },
  watch: {
    withDatalData: {
      handler(value) {
        let { oidKey } = dataTyptEnum[this.matType]
        if (value[oidKey]) {
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
  methods: {
    // 从库存中进行新增
    handleAddByYarnStock(){
      this.$refs.invSelectRef.invSelDiaVisible = true;
    },
    // 初始化数据
    initData() {
      let { oidKey } = dataTyptEnum[this.matType]
      this.withDrawalFormData = {
        [oidKey]: "",
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
      let { oidKey } = dataTyptEnum[this.matType];
      this.withDrawalFormData = this.withDatalData;
      this.getWithDrawalDtlDataList(this.withDatalData[oidKey]);
    },
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      let { dtlFkKey } = dataTyptEnum[this.matType];
      fetchWithDrwarlDtlDataList({ [dtlFkKey]: oid })
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
      let { dtlOidKey } = dataTyptEnum[this.matType];
      this.selectList.forEach(item => {
        if (!item.isAdd) {
          this.delOidList.push(item[dtlOidKey]);
        }
        let tarIdx = this.crudDataList.findIndex(
          cItem =>
            cItem[dtlOidKey] == item[dtlOidKey]
        );
        this.crudDataList.splice(tarIdx, 1);
      });
    },
    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    // 库存选择回调
    handleInvSelect(rows){
      let { materialIdKey, materialNameKey,dtlOidKey } = dataTyptEnum[this.matType];
      this.crudDataList = rows.map(item => {
        item.$cellEdit = true;
        item[materialIdKey] = item.materialId;
        item[materialNameKey] = item.materialName;
        item[dtlOidKey] = v1()
        return item;
      });
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
      let validRes = await this.saveValid();
      if (!validRes) return;
      this.loading = true;
      let { oidKey,dtlFkKey,dtlOidKey,materialIdKey } = dataTyptEnum[this.matType];
      let oid = this.withDrawalFormData[oidKey];
      if (oid) {
        await updateWithDrawal(this.withDrawalFormData);
      } else {
        oid = await addWithDrawal(this.withDrawalFormData).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "pro_with_drawal" });
      }
      Object.assign(this.withDrawalFormData, { [oidKey]: oid });
      let dataList = this.crudDataList.map(item => {
        return {
          [dtlFkKey]: oid,
          [dtlOidKey]: item[dtlOidKey],
          [materialIdKey]: item[materialIdKey],
          batchNo: item.batchNo,
          weight: item.weight
        }
      });
      await batchAddOrUpdateDtl(dataList);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    async saveValid() {
      let { typeOf, extFactId } = this.withDrawalFormData;
      if (typeOf == "" || typeOf == null || typeOf == undefined) {
        this.$tip.warning("退料类型不能为空");
        return false;
      }

      if (typeOf == 1 && extFactId == "") {
        this.$tip.warning("请输入外发厂名称");
        return false;
      }

      if (this.crudDataList.length == 0) {
        this.$tip.warning("退料通知明细数据不能为空");
        return false;
      }

      if (this.crudDataList.length == 0) {
        this.$tip.warning("退料通知明细数据不能为空");
        return false;
      }

      let validWeight = this.crudDataList.every(item => {
        return item.weight > 0 
      });

      if(!validWeight){
        this.$tip.warning("明细中存在退料数量格式不符，请检查");
        return false;
      }

      let { materialIdKey } = dataTyptEnum[this.matType];
      let dataList = this.crudDataList.map(aItem => {
          let validData = {
                matCode: aItem[materialIdKey],
                batchNo: aItem.batchNo,
                retQty: aItem.weight,
              }
          return validData;
      });
      let validRes = await fetchValidOutWeight(dataList, this.matType).then(res => res.data);
      if (!validRes.data.status) {
        validRes.data.resultList.forEach((item, index) => {
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `材料编号【<strong>${item.matCode}</strong>】剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });
      }
      return validRes.data.status;
    },
    //
    handleCloseDtl() {
      this.$emit("dtlClose",this.hasRefresh);
    },
  }
};
</script>