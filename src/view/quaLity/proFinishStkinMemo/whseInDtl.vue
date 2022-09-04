<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-02 10:02:48
-->
<template>
  <div id="stkin-memo-dtl-container">
    <view-container
      title="成品布入仓通知单明细"
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
  fetchStkinMemoDataByVatNos,
  addStkinMemoData,
  updateStkinMemoData,
  fetchValidVatNo
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
      stkinMemoData: {
        memoNo: "",
        memoDate: "",
        yinDate: "",
      },
      stkinMemoDtlCrudOp: stkinMemoDtlCrudOp(this),
      stlkinMemoDtlDataList: [],
      hasRefresh: false,

    };
  },
  watch: {

  },
  computed: {
    hasNotEdit() {
      return  Boolean(this.stkinMemoData.yinDate);
    },
    
  },
  methods: {
    
    // 初始化数据
    initData() {
    },
    // 获取纱线入仓明细数据
    getStkinMemoData(stkinMemoData) {
      this.loading = true;
      this.stkinMemoData = stkinMemoData
      // this.stlkinMemoData = stkinMemoData;
      // console.log(this.stlkinMemoData)
      fetchStkinMemoDataByStkinOid({stkinOid: stkinMemoData.proFinishStkinMemooid}).then(res => {
        this.dataAnalysic(res.data)
      }).finally(() => {
        this.loading = false;
      })
    },
    // 保存数据
    async handleSave() {
      this.loading = true;
      // 保存主数据
      let oid = this.stkinMemoData.proFinishStkinMemooid;
      if (oid) {
        await updateStkinMemoData(this.stkinMemoData);
      } else {
        // 校验当前缸号数据是否存在过了
        let validRes = await this.validVatNoData();
        if(!validRes) {
          this.loading = false;
          return;
        }
        Object.assign(this.stkinMemoData,{
          sysCreated: timeConversion(new Date()),
          sysCreatedby: this.$store.state.userOid
        })
        oid = await addStkinMemoData(this.stkinMemoData).then(
          (res) => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "f_stkin_memo_notice" });
         // 保存明细数据
        await this.saveDtlData(oid);
      }
      Object.assign(this.stkinMemoData, { proFinishStkinMemooid: oid });
     
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("保存成功");
    },
    // 检验数据是否存在了
    async validVatNoData(){
      let validEnum = {}
      let validData = this.stlkinMemoDtlDataList.map(item => {
        validEnum[item.children[0].proCardFk.toLocaleUpperCase()] = item.vatNo
        return item.children[0].proCardFk;
      });

      let resData = await fetchValidVatNo(validData).then(res => res.data.data);
      if(resData.length > 0){
        let vatNos = resData.map(fk => `【${validEnum[fk]}】`).join(",");
        this.$notify({
          title: '警告',
          message: `${vatNos}缸号数据已存在，请检查`,
          type: 'warning'
        });
        return false;
      }

      return true;

    },
    // 保存明细数据
    saveDtlData(oid){
      let targetDataList = [];
      this.stlkinMemoDtlDataList.forEach(item => {
        item.children.forEach(item => {
          targetDataList.push({
            proFinishStkinMemoDtloid: item.proFinishStkinMemoDtloid,
            proFinishStkinMemoFk: oid, 
            proCardFk: item.proCardFk
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
    addAndCreateData(vatNos) {
      this.initData();
      this.createWhseYarnInData();
      this.extractData(vatNos);
    },
    // 生成主表数据
    createWhseYarnInData() {
      this.stkinMemoData = {
        proFinishStkinMemooid: "",
        memoNo: "",
        memoDate: timeConversion(new Date()),
        yinDate: ""
      };
      baseCodeSupplyEx({ code: "f_stkin_memo_notice" }).then((res) => {
        this.stkinMemoData.memoNo = res.data.data;
      });
    },
    // 数据解析
    dataAnalysic(originDataList){
      let targetData = {};
      originDataList.sort((a,b) => a.pidNo - b.pidNo);
      originDataList.forEach((item,index) => {
        let {  vatNo } = item;
        let key =  vatNo;
        // 不存在则进行初始化
        if(!targetData[key]){
          targetData[key] = {
            children: [],
            pidNo: 0,
            netWeight: 0,
            vatNo: vatNo,
           
            id: index + 1,
          }
        }

        targetData[key].children.push(Object.assign(item, {
          vatNo: "",
          storeLoadCode: item.storeLoadCode,
          id: `${targetData[key].id}+${index}`,
          proFinishStkinMemoDtloid: item.proFinishStkinMemoDtloid || v1(),
        }))
        targetData[key].pidNo++;
        targetData[key].netWeight += +item.netWeight

      });

      // 赋值
      this.stlkinMemoDtlDataList = Object.values(targetData);

    },
    // 数据抽取
    extractData(vatNos) {
      this.loading = true;
      let params = {
        vatNos: vatNos,
      };
      fetchStkinMemoDataByVatNos(params)
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
