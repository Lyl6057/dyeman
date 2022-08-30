<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 09:06:25
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-30 14:31:01
-->
<template>
  <div class="with-drawal-dlt-container">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :close-on-click-modal="false"  >
        <view-container title="备布单维护" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-button type="primary" :disabled="hasNotEdit" @click="handleSave">{{ this.$t("public.save") }}</el-button>
            <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="dataFormOp" v-model="whseFormData">
              <template slot="prepClothWeight">
                <el-input disabled size="mini" v-model="prepClothWeight"></el-input>
              </template>
            </avue-form>
        </div>
        <el-tabs v-model="tabName" type="border-card">
          <el-tab-pane name="dtl" label="出仓明细">
            <div class="btnList">
              <el-button type="primary" :disabled="hasNotEdit" @click="handleAddDtl">{{ this.$t("public.add") }}</el-button>
              <el-button type="danger" :disabled="hasNotEdit" @click="handleDelDtl">{{ this.$t("public.del") }}</el-button>
              <el-button type="success" :disabled="hasNotEdit" @click="handleDtlAdd2Whse">从存仓中新增</el-button>
            </div>
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
                >
                  <template slot="noteCode" slot-scope="{row}">
                    <div>
                      <span v-if="hasNotEdit">{{ row.noteCode }}</span>
                      <el-select 
                        v-else
                        v-model="row.noteCode" 
                        size="mini"  
                        filterable
                        remote
                        reserve-keyword
                        :remote-method="handleRemoteMethod"
                        @change="v => handleNoteCodeChange(v, row.$index)" >
                        <el-option v-for="(item,index) in dictClothNote.slice(0,10)" :key="index" :value="item.noteCode" :label="item.noteCode"></el-option>
                      </el-select>
                    </div>
                  </template>
                
                </avue-crud>
            </div>
            </el-tab-pane>
        </el-tabs>
        </view-container>
    </el-dialog>

    <!-- 台账选择 -->
    <cloth-select :originDataList="dictClothNote" @select="handleClothSel" ref="clothSelectRef" />

  </div>
</template>

<script>
import { formOp, dtlCrudOp } from "./data";
import {
  addWhsePreclothSheet,
  updateWhsePreclothSheet,
  batchSaveOrUpdateData,
  batchDelDtlDataById,
  fetchWhseInFlatDtlDataByList,
  fetchClothNoteDataList,
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";
import ClothSelect from "./clothSelect.vue"
import v1 from "uuid/v1";
export default {
  name: "collarAccountDtl",
  components: {
    ClothSelect
  },
  props: {
    whseOutData: {
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
      whseFormData: {
        preDate: ""
      },
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

      // 台账数据集
      clothNoteDataList: [],
      // dictClothNote: [],
      curDtlRowIdx: -1,

      // 输入搜索定时器对象
      inpSeaTimer: null,
      curSeaNoteCode: ""
    };
  },
  computed:{
    hasNotEdit(){
      return this.whseOutData.preState == 2
    },
    prepClothWeight(){
      let resultWeight = this.crudDataList.reduce((a,b) => a + +b.realWeight, 0).toFixed(1);
      this.whseFormData.diffWeight = (+this.whseFormData.clothWeight - +resultWeight).toFixed(1);
      return resultWeight
    },
    dictClothNote(){
      let existsNote = this.crudDataList.reduce((a,b) => Object.assign(a, {[b.noteIdFk]: true}), {})
      return this.clothNoteDataList.filter(item =>{
        // 过滤已存在值
        if(existsNote[item.noteId]) return false;
        // 过滤输入值
        return item.noteCode.includes(this.curSeaNoteCode)
      })
    }
  },
  watch: {
    whseOutData: {
      handler(value) {
        if (value.whsePreclothSheetoid) {
          this.setWithDrawalData();
        } else {
          this.initData();
        }
        this.hasRefresh = false;
      },
      immediate: true,
      deep: true
    },
  
  },
  methods: {
    // 胚布台账选择回调
    handleClothSel(rows){
      this.crudDataList.push(...rows.map(item => {
        return {
          realWeight: item.realWeight,
          noteCode: item.noteCode,
          noteIdFk: item.noteId,
          whsePreclothSheetDtloid: v1(),
          $cellEdit: true
        }
      }))
    },
    // 布票号远程搜索
    handleRemoteMethod(query){
        clearTimeout(this.inpSeaTimer)
        this.inpSeaTimer = setTimeout(() => {
          this.curSeaNoteCode = query
        }, 200);

    },
    // 布票选择回调
    handleNoteCodeChange(value,index){
      this.curSeaNoteCode = ""
      let item = this.clothNoteDataList.find(item => item.noteCode == value);
      Object.assign(this.crudDataList[index], {
        realWeight: item.realWeight,
        noteIdFk: item.noteId,
      })
    },
    handleAddDtl(){
      this.crudDataList.push({
        realWeight: 0,
        noteCode: "",
        whsePreclothSheetDtloid: v1(),
        $cellEdit: true
      })
    },
    handleDelDtl(){
      if(this.curDtlRowIdx == -1){
        return this.$tip.warning("请选择数据");
      }
      this.crudDataList.splice(this.curDtlRowIdx,1);
      this.curDtlRowIdx = -1;
    },
    handleDtlAdd2Whse(){
      this.crudDataList.push({})
      this.crudDataList.pop();
      this.$refs.clothSelectRef.initData(this.whseOutData.weaveJobCode);
    },
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
      this.whseFormData = this.whseOutData;
      this.crudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
    },
    // 赋值表单数据
    setWithDrawalData() {
      this.whseFormData = this.whseOutData;
      this.getWithDrawalDtlDataList(this.whseOutData.whsePreclothSheetoid);
    },
    // 获取数据
    getWithDrawalDtlDataList(oid) {
      this.loading = true;
      this.crudDataList = [{}];
      fetchWhseInFlatDtlDataByList({ whsePreclothSheetFk: oid })
        .then(res => {
          this.crudDataList = res.data.map((item,index) => {
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
      baseCodeSupplyEx({ code: "prep_cloth_sheet" }).then(res => {
        Object.assign(this.whseFormData, {
          sheetNo: res.data.data,
          preDate: timeConversion(new Date()),
        });
      });
    },
    // 保存
    async handleSave() {
      let validRes = await this.saveValid().then(res => res);
      if (!validRes) return;
      this.loading = true;
      let oid = this.whseFormData.whsePreclothSheetoid;
      if (oid) {
        await updateWhsePreclothSheet(this.whseFormData);
      } else {
        // 赋值初始审核状态值为1 
        this.whseFormData.preState = 1;
        oid = await addWhsePreclothSheet(this.whseFormData).then(
          res => res.data.data
        );
        this.isAdd = true;
        // 流水号递增
        baseCodeSupply({ code: "prep_cloth_sheet" });
      }
      Object.assign(this.whseFormData, { whseFlatClothInoid: oid });
      this.crudDataList.map(item => {
        return Object.assign(item, {
          whsePreclothSheetFk: oid
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
        this.curDtlRowIdx = this.crudDataList.findIndex(item => item.whsePreclothSheetDtloid == row.whsePreclothSheetDtloid ) 
    },
    // 数据抽取
    async extractDataByWeave(row){
        this.visible = true;
        // 弃用 2022.08.29
        this.loading = true;
        await this.$nextTick();
        let params = {
          weaveJobCode: row.weaveJobCode
        }
        fetchClothNoteDataList(params).then(res => {
            this.$refs.form && this.$refs.form.clearValidate();
            this.clothNoteDataList = res.data.map((item, index) => {
              if(!item.noteCode) item.noteCode = ""           
              if(!item.loomNo) item.loomNo = ""           
              if(!item.eachNumber) item.eachNumber = ""           
              if(!item.storeLoadCode) item.storeLoadCode = ""           
              return item
            });
        }).finally(res => {
            this.loading = false;
        })
    },

    getDataList() {},
  }
};
</script>