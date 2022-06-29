<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-28 17:52:53
-->
<template>
  <div id="stkin-memo-dtl-container">
    <view-container
      title="胚布入仓通知单明细"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="handleSave" :disabled="hasNotEdit">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="handleClose">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form
          ref="form"
          :option="stkinMemoFormOp"
          v-model="stkinMemoData"
        ></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="whseInDtlRef"
          :option="stkinMemoDtlCrudOp"
          :data="stlkinMemoDtlDataList"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {
  stkinMemoFormOp,
  stkinMemoDtlCrudOp,
} from "./data";
import {
  batchSaveOrUpDate,
  fetchStkinMemoDataByStkinOid,
  fetchStkinMemoDataByStoreLoadCode,
  addStkinMemoData,
  updateStkinMemoData
} from "./api";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1";
export default {
  name: "whseInDtl",
  props: {

  },
  data() {
    return {
      loading: false,
      loadLabel: "正在数据请求...",
      stkinMemoFormOp: stkinMemoFormOp(this),
      stkinMemoData: {},
      stkinMemoDtlCrudOp: stkinMemoDtlCrudOp(this),
      stlkinMemoDtlDataList: [],
      hasRefresh: false,

    };
  },
  watch: {

  },
  computed: {
    hasNotEdit() {
      return  false  //this.stkinMemoData.stockState == "1";
    },
    
  },
  methods: {
    
    // 初始化数据
    initData() {
      
    },
    // 获取纱线入仓明细数据
    getStkinMemoData(stkinMemoData) {
      this.loading = true;
      this.stlkinMemoData = stkinMemoData;
      fetchStkinMemoDataByStkinOid({stkinOid: stkinMemoData.proClothStkinMemooid}).then(res => {
        this.dataAnalysic(res.data)
      }).finally(() => {
        this.loading = false;
      })
    },
    // 保存数据
    async handleSave() {
      this.loading = true;
      // 保存主数据
      let oid = this.stkinMemoData.whseYarninoid;
      if (oid) {
        await updateStkinMemoData(this.stkinMemoData);
      } else {
        oid = await addStkinMemoData(this.stkinMemoData).then(
          (res) => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "stkin_memo_notice" });
      }
      Object.assign(this.stkinMemoData, { whseYarninoid: oid });
      // 保存明细数据
      await this.saveDtlData(oid);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("保存成功");
    },
    // 保存明细数据
    saveDtlData(oid){
      let targetDataList = [];
      this.stlkinMemoDtlDataList.forEach(item => {
        item.children.forEach(item => {
          targetDataList.push({
            proClothStkinMemoDtloid: item.proClothStkinMemoDtloid ||  v1(),
            proClothStkinMemoFk: oid, 
            noteIdFk: item.noteId
          })
        })
      })
      return batchSaveOrUpDate(targetDataList);
    },
    // 关闭
    handleClose() {
      this.$emit("close", this.hasRefresh);
    },
    // 新增数据初始化
    addAndCreateData(storeLoadCode) {
      this.initData();
      this.createWhseYarnInData();
      this.extractData(storeLoadCode);
    },
    // 生成主表数据
    createWhseYarnInData() {
      this.stkinMemoData = {
        memoNo: "",
        memoDate: timeConversion(new Date()),
      };
      baseCodeSupplyEx({ code: "stkin_memo_notice" }).then((res) => {
        this.stkinMemoData.memoNo = res.data.data;
      });
    },
    // 数据解析
    dataAnalysic(originDataList){
      let targetData = {};
      originDataList.sort((a,b) => a.eachNumber - b.eachNumber);
      originDataList.forEach((item,index) => {
        let { storeLoadCode, weaveJobCode } = item;
        let key = storeLoadCode + weaveJobCode;
        // 不存在则进行初始化
        if(!targetData[key]){
          targetData[key] = {
            children: [],
            eachNumber: 0,
            clothWeight: 0,
            weaveJobCode: weaveJobCode,
            storeLoadCode: storeLoadCode,
            id: index + 1,
          }
        }

        targetData[key].children.push(Object.assign(item, {
          weaveJobCode: "",
          storeLoadCode: "",
          id: `${targetData[key].id}+${index}` 
        }))
        targetData[key].eachNumber++;
        targetData[key].clothWeight += +item.clothWeight

      });

      // 赋值
      this.stlkinMemoDtlDataList = Object.values(targetData);

    },
    // 数据抽取
    extractData(storeLoadCode) {
      this.loading = true;
      let params = {
        storeLoadCode: storeLoadCode,
      };
      fetchStkinMemoDataByStoreLoadCode(params)
        .then((res) => {
          this.dataAnalysic(res.data)
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="stylus">
#whse-yarn-in-dtl-containe
  .avue-crud__menu
    min-height 5px !important
    height 5px !important
</style>
