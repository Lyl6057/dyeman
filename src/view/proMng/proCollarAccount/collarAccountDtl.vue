<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-09 15:31:40
-->
<template>
  <div class="with-drawal-dlt-container">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :close-on-click-modal="false"  >
        <view-container title="收货台账信息维护" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ this.$t("public.save") }}</el-button>
            <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="collAccFormOp" v-model="collarAccountFormData"></avue-form>
        </div>
        <el-tabs v-model="tabName" type="border-card">
            <el-tab-pane name="dtl" label="收货明细">
            <div class="crudBox">
                <avue-crud
                ref="crud"
                :option="dtlCrudOp"
                :data="crudDataList"
                :page.sync="page"
                v-loading="loading"
                @on-load="getDataList"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
                ></avue-crud>
            </div>
            </el-tab-pane>
        </el-tabs>
        </view-container>
    </el-dialog>
  </div>
</template>

<script>
import { formOp, dtlCrudOp } from "./data";
import {
  addCollarAccountData,
  updateCollarAccountData,
  batchSaveOrUpdateData,
  batchDelDtlDataById,
  fetchCollarAccDtlDataByList,
  fetchCollarAccDtlBySalPoNo,
  fetchCollarAccDtlByWeaveJobCode
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";
import v1 from "uuid/v1";
export default {
  name: "collarAccountDtl",
  components: {

  },
  props: {
    collarAccountData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false,
      loadLabel: "加载中...",
      loading: false,
      collAccFormOp: formOp(this,false),
      collarAccountFormData: {},
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
      return this.collarAccountData.stockState == 2
    }
  },
  watch: {
    "collarAccountData.stockState": {
      handler(value){
        console.log("enter form option show or hide", typeof value, value)
        switch(value){
          case '1' : // 未检验
            this.collAccFormOp = formOp(this, false);
            break;
          case '2' : // 已检验
            this.collAccFormOp = formOp(this, true);
            break;
          default: ; break;
        }
        // this.$forceUpdate();
      }
    },
    collarAccountData: {
      handler(value) {
        if (value.proCollarAccountoid) {
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
    // 初始化数据
    initData() {
      this.collarAccountFormData = {
        proCollarAccountoid: "",
        deliveryNo: "",
        receiveDate: "",
        basProcessingUnitFk: "",
        salPoNo: ""
      };
      this.crudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
    },
    // 赋值表单数据
    setWithDrawalData() {
      this.collarAccountFormData = this.collarAccountData;
      this.getWithDrawalDtlDataList(this.collarAccountData.proCollarAccountoid);
    },
    // 获取数据
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      fetchCollarAccDtlDataByList({ proCollarAccountFk: oid })
        .then(res => {
          this.crudDataList = res.data.map((item,index) => {
            item.$cellEdit = this.hasNotEdit ? false : (index == 0);
            item.isAdd = false;
            return item;
          });
          this.$refs.crud.setCurrentRow(this.crudDataList[0])
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

    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "pro_collar_accont" }).then(res => {
        Object.assign(this.collarAccountFormData, {
          receiveNo: res.data.data,
          receiveDate: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid,
        });
      });
    },
    // 保存
    async handleSave() {
      let validRes = await this.saveValid().then(res => res);
      if (!validRes) return;
      this.loading = true;
      let oid = this.collarAccountFormData.proCollarAccountoid;
      if (oid) {
        await updateCollarAccountData(this.collarAccountFormData);
      } else {
        // 赋值初始审核状态值为1 
        this.collarAccountFormData.stockState = '1';
        oid = await addCollarAccountData(this.collarAccountFormData).then(
          res => res.data.data
        );
        this.isAdd = true;
        // 流水号递增
        baseCodeSupply({ code: "pro_collar_accont" });
      }
      Object.assign(this.collarAccountFormData, { proCollarAccountoid: oid });
      this.crudDataList.map(item => {
        return Object.assign(item, {
          proCollarAccountFk: oid
        });
      });
      await batchSaveOrUpdateData(this.crudDataList);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
      // 新增后刷新列表数据
      this.isAdd && this.$emit("save-success")
    },
    // 保存校验
    async saveValid() {
    
      let formDataValid =  await new Promise(resolve => this.$refs.form.validate((valid,done) =>   resolve(valid) || done()) )
      if(!formDataValid)  {
          this.$tip.warning("请完善数据");
          return false
      }
      
      let crudDataRef = this.crudDataList.every(item => {
          return item.pos && item.size && item.pcsNum
      });
      if(!crudDataRef){
          this.$tip.warning("请完善收货台账明细数据")
          return false
      }

      return true;
    },
    //
    handleCloseDtl() {
      this.visible = false;
      this.$emit("dtlClose",this.hasRefresh);
    },
    handleRowClick(row) {
        if(this.hasNotEdit) return false;
        let idx = this.crudDataList.findIndex(item => item.$cellEdit);
        this.crudDataList[idx].$cellEdit = false;
        row.$cellEdit = true;
    },
    // 数据抽取
    extractDataByWeave({weaveJobCodes,params}){
        this.visible = true;
        this.loading = true;
        // fetchCollarAccDtlBySalPoNo(salPoNo).then(res => {
        fetchCollarAccDtlByWeaveJobCode(weaveJobCodes).then(res => {
            this.$refs.form && this.$refs.form.clearValidate();
            this.crudDataList = res.data.map((item,index) => {
                item.proCollarAccountDtloid = v1();
                item.unit = "PCS"
                item.realPcsNum = item.pcsNum;
                item.$cellEdit = (index == 0);
                return item;
            });
            this.$refs.crud.setCurrentRow(this.crudDataList[0])
            Object.assign(this.collarAccountFormData,{
              basProcessingUnitFk: params.outFactoryId,
              salPoNo: params.salPoNo,
              stockState: 1,
            })
            // 借此触发表单的编辑状态
            this.collAccFormOp = formOp(this, false);
        }).finally(res => {
            this.loading = false;
        })
    },

    getDataList() {},
  }
};
</script>