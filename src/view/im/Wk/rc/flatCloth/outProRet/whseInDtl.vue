<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-11 09:47:25
-->
<template>
  <div class="with-drawal-dlt-container">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :close-on-click-modal="false"  >
        <view-container title="扁机入仓信息维护" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ this.$t("public.save") }}</el-button>
            <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="dataFormOp" v-model="whseInFormData"></avue-form>
        </div>
        <el-tabs v-model="tabName" type="border-card">
            <el-tab-pane name="dtl" label="入仓明细">
            <div class="crudBox">
                <avue-crud
                ref="crudRef"
                :option="dtlCrudOp"
                :data="crudDataList"
                :page.sync="page"
                v-loading="loading"
                @on-load="getDataList"
                @row-click="handleRowClick"
                :summary-method="handleSummaryMethod"
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
  addWhseInFlatData,
  updateWhseInFlatData,
  batchSaveOrUpdateData,
  batchDelDtlDataById,
  fetchWhseInFlatDtlDataByList,
  fetchCollarAccDtlDataByList,
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";
import v1 from "uuid/v1";
export default {
  name: "collarAccountDtl",
  components: {

  },
  props: {
    whseInData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false,
      loadLabel: "加载中...",
      loading: false,
      dataFormOp: formOp(this),
      whseInFormData: {},
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
      return this.whseInData.stockState == 2
    }
  },
  watch: {
    "whseInData.stockState": {
      handler(value){
        switch(value){
          case '1' : // 未检验
            this.dataFormOp = formOp(this, false);
            break;
          case '2' : // 已检验
            this.dataFormOp = formOp(this, true);
            break;
          default:; break;
        }
        this.$forceUpdate();
      }
    },
    whseInData: {
      handler(value) {
        if (value.whseFlatClothInoid) {
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
    // 合計
    handleSummaryMethod({columns, data}){
      let sums = columns.map((column,index) => {
        if(index == 0) return "合計"
        if(!["inPcsNum","weight",].includes(column.property)){
          return "-"
        }
        let tValue = data.reduce((a,b) => a += (+b[column.property]),  0);
        return this.$num2ThousandthFormat(tValue, column.property == 'weight' ? 1 : 0 );
      })
      return sums;
    },
    // 初始化数据
    initData() {
      this.whseInFormData = {
        whseFlatClothInoid: "",
        whseInNo: "",
        whseInDate: "",
        stockState: 1,
        receiveNo: this.whseInData.receiveNo,
        registerFk: this.whseInData.registerFk,
        whseInType: "1"
      };
      this.crudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
    },
    // 赋值表单数据
    setWithDrawalData() {
      this.whseInFormData = this.whseInData;
      this.getWithDrawalDtlDataList(this.whseInData.whseFlatClothInoid);
    },
    // 获取数据
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      this.crudDataList = [{}];
      fetchWhseInFlatDtlDataByList({ whseFlatClothInFk: oid })
        .then(res => {
          this.crudDataList = res.data.map((item,index) => {
            item.$cellEdit = this.hasNotEdit ? false : (index == 0);
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },


    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "whse_in" }).then(res => {
        Object.assign(this.whseInFormData, {
          whseInNo: res.data.data,
          whseInDate: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid,
          //   whseFlatClothInoid: v1()
        });
      });
    },
    // 保存
    async handleSave() {
      let validRes = await this.saveValid().then(res => res);
      if (!validRes) return;
      this.loading = true;
      let oid = this.whseInFormData.whseFlatClothInoid;
      if (oid) {
        await updateWhseInFlatData(this.whseInFormData);
      } else {
        // 赋值初始审核状态值为1 
        this.whseInFormData.stockState = 1;
        oid = await addWhseInFlatData(this.whseInFormData).then(
          res => res.data.data
        );
        this.isAdd = true;
        // 流水号递增
        baseCodeSupply({ code: "whse_in" });
      }
      Object.assign(this.whseInFormData, { whseFlatClothInoid: oid });
      this.crudDataList.map(item => {
        return Object.assign(item, {
          whseFlatClothInFk: oid
        });
      });
      await batchSaveOrUpdateData(this.crudDataList);
      if (this.delOidList.length > 0) {
        await batchDelDtlDataById(this.delOidList);
      }
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
      this.isAdd && this.$emit("save-success")
    },
    // 保存校验
    async saveValid() {
    
      let formDataValid = await new Promise(resolve => this.$refs.form.validate((valid,done) =>  resolve(valid) || done()) )
      if(!formDataValid)  {
          this.$tip.warning("请完善数据");
          return false
      }
      
      // let crudDataRef = this.crudDataList.every(item => {
      //     return item.pos && item.size && item.pcsNum
      // });
      // if(!crudDataRef){
      //     this.$tip.warning("请完善收货台账明细数据")
      //     return false
      // }

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
    async extractDataByWeave(proCollarAccountOid){
        this.visible = true;
        this.loading = true;
        await this.$nextTick();
        this.crudDataList = [{}];
        let params = {
          proCollarAccountFk: proCollarAccountOid
        }
        fetchCollarAccDtlDataByList(params).then(res => {
            this.$refs.form && this.$refs.form.clearValidate();
            this.crudDataList = res.data.map((item,index) => {
                return {
                  pos: item.pos,
                  size: item.size,
                  packageNo: item.packageNo,
                  boxNo: item.boxNo,
                  numUnit: item.unit,
                  inPcsNum: item.realPcsNum,
                  weight: item.weight,
                  proCollarAccountDtlFk: item.proCollarAccountDtloid,
                  whseFlatClothInDtloid: v1(),
                  $cellEdit: index == 0
                };
            });
            this.$refs.crudRef.setCurrentRow(this.crudDataList[0]);
            this.$refs.crudRef.doLayout()
        }).finally(res => {
            this.loading = false;
        })
    },

    getDataList() {},
  }
};
</script>