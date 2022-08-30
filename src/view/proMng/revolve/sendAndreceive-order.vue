<!--
 * @Author: Lyl
 * @Date: 2022-08-22 10:24:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-30 14:32:12
 * @FilePath: \iot.vue\src\view\proMng\revolve\sendAndreceive-order.vue
 * @Description:  收发单
-->
<template>
  <div class="sendAndReceive">
    <el-dialog append-to-body  :visible.sync="dialogVisible" :element-loading-text="$t('public.loading')"
      v-loading="wLoading" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="染单发单信息">
        <div class="btnList">
          <el-tooltip effect="dark" content="Bảo tồn" placement="top-start">
            <el-button type="success" @click="handleSave" :loading="wLoading">{{ $t("public.save") }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="đóng" placement="top-start">
            <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
          </el-tooltip>
        </div>
        <div class="formBox">
          <avue-form ref="dispathReceiveForm" :option="dispathReceiveCrudOp" v-model="dispathReceiveFormData"> 
            <template slot-scope="scope" slot="runJobFk">
              <el-select v-model="dispathReceiveFormData.runJobFk" filterable remote reserve-keyword clearable default-first-option
                placeholder="请输入单号" :remote-method="handleRemoteMethod" @change="handleRemoteChange" :loading="remoteLoading">
                <el-option v-for="item in options" :key="item[remote.key]" :label="item[remote.label]" :value="item[remote.value]"></el-option>
              </el-select>
            </template>
            <template slot-scope="scope" slot="stepId">
              <el-select v-model="dispathReceiveFormData.stepId" filterable remote reserve-keyword clearable default-first-option
                placeholder="请输入工序" :remote-method="remoteMethodCX" :loading="remoteLoading" @change="getCX">
                <el-option v-for="item in dataSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </template>
          </avue-form>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>

<script>
import { dispathReceiveForm } from "./data";
import { getLoginOrg, getDptWorkProcess, getBaseWorkStep, add as createProDptReciveLogData } from "../dptReciveLog/api"
export default {
  components: {
  },
  props: {
    typechangeable: {
      type: Boolean,
      default: true
    },
    //  1：收单, 2：发单
    dispathReceive: '',
    // 缸号信息
    runJobInfo: {},
    remote: {
      type: Object,
      default: () => {
        return {
          key: "runJobId",
          label: "vatNo",
          value: "runJobId",
          fetchApi: {}
        }
      }
    }
  },
  data () {
    return {
      wLoading: true,
      remoteLoading: false,
      dialogVisible: false,
      crudLoading: true,
      dispathReceiveFormData: {},
      dispathReceiveCrudOp: dispathReceiveForm(this),
      dispathReceiveCrudData: [],
      options: [],
      userDp: '',
      dataSelect: []
    };
  },
  watch: {
  },
  computed: {},
  created () {
    getBaseWorkStep().then((res) => {
        let data = res.data;
        data.map((e, i) => {
          this.dataSelect.push({
            value: e.stepId,
            label: e.stepName,
          })
        })
    })
  },
  mounted () { },
  methods: {
    async initData () {
      this.crudLoading = true;
      this.dispathReceiveCrudData = [];
      let nowDate = this.$getNowTime("datetime");
      let { vatNo, runJobId, clothWeight } = this.runJobInfo;
      this.handleRemoteMethod(vatNo);
      await this.fetchUserDp();
      this.dispathReceiveFormData = {
        dispathReceive: Number(this.dispathReceive), // 类型
        vatNo,
        runJobFk: runJobId,
        planOutput: clothWeight,
        realOutput: clothWeight,
        priorityId: "1",
        acceptDesc: '',
        acceptDate:  this.dispathReceive == 1 ? nowDate : '',
        acceptStaff:  this.dispathReceive == 1 ? parent.userID : '',
        dptworkProcessFk:  this.dispathReceive == 1 ? this.userDp : '',
        sendDate: this.dispathReceive == 2 ? nowDate : '',
        sendStaff: this.dispathReceive == 2 ? parent.userID : '',
        sendProcessFk: this.dispathReceive == 2 ? this.userDp : '' ,
      };
      this.remoteMethodCX();
      this.crudLoading = false;
      this.wLoading = false;
    },
    fetchUserDp(){
      let reg  = RegExp(/[AaRrWw]/g);
      if(reg.test(this.runJobInfo.vatNo)){
        // QC
        this.userDp = 'qc'
      }else{
        // SK
        this.userDp = 'sk'
      }
      
      // getLoginOrg({ account: "MIA" }).then(async (res) => {
      //   if (res.data) {
      //     await getDptWorkProcess().then((dpt) => {
      //       for (let i = 0; i < dpt.data.length; i++) {
      //         if (dpt.data[i].orgNo.indexOf(res.data.orgno) != -1) {
      //           this.userDp = dpt.data[i].dptCode;
      //           break;
      //         }
      //       }
      //     });
      //   }
      // });

    },
    getCX(val) {
      this.dispathReceiveFormData.stepId = val;
    },
    async remoteMethodCX(val) {
      await this.$nextTick();
      getBaseWorkStep({
        stepName: "%" + (val || ''),
        orgCodes: "%" +  (this.dispathReceive == 1 ? this.dispathReceiveFormData.dptworkProcessFk : this.dispathReceiveFormData.sendProcessFk)
      }).then((res) => {
        this.dataSelect = [];
        res.data.map((e, i) => {
          this.dataSelect.push({
            label: e.stepName,
            value: e.stepId
          })
        });
      })
    },
    handleRemoteMethod(val){
      this.remoteLoading = true;
      let params = {
        [this.remote.label]: "!^%" +  (val || '')
      }
      this.remote.fetchApi(params).then( res => {
        this.options = res.data.records;
        this.remoteLoading = false;
      })
    },

    handleRemoteChange(val){
      if(!val) return;
      let params = {
        [this.remote.value]: "!^%" +  (val || '')
      }
      this.remote.fetchApi(params).then( res => {
        if (res.data.total) {
          this.dispathReceiveFormData.vatNo = res.data.records[0].vatNo;
          this.dispathReceiveFormData.runJobFk = res.data.records[0].runJobId;
        }
      })
    },    
    handleSave () {
      this.$refs.dispathReceiveForm.validate(async (valid, done) => {
        if (!valid) {
          done();
          this.$tip.warning("请补充发单信息!");
          return;
        }
        this.wLoading = true;
        Object.keys(this.dispathReceiveFormData).forEach(item => {
          if (this.dispathReceiveFormData[item] == "undefined") {
            delete this.dispathReceiveFormData[item];
          }
        });
        try {
          createProDptReciveLogData(
            Object.assign(this.dispathReceiveFormData, { })
          ).then(res => {
            this.$tip.success(this.$t("public.bccg"));
            this.dialogVisible = false;
          }).finally((_) =>{
            this.wLoading = false;
            done();
          })
        } catch (error) {
          this.wLoading = false;
          this.$tip.error(this.$t("public.bcsb") + error);
          done();
        }
      });
    }, 
    handleClose () {
      this.dialogVisible = false;
    },
  }
};
</script>
<style lang="stylus" scoped>
>>>.el-tag--mini {
  display: none;
}

>>>.el-table__expand-icon{
  font-size: 20px;
}
.sendAndReceive {
}
</style>
