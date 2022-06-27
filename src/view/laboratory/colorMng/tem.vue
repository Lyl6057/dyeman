<template>
  <div id="colorMng_Tem">
    <view-container
      title="色号资料管理"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot="colorRgb">
             <el-input v-model="form.colorRgb" readonly>
               <el-color-picker slot="append" v-model="form.colorRgb"></el-color-picker>
             </el-input>
          </template>
        </avue-form>
      </div>
    </view-container>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      :dlgWidth="dlgWidth"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { popupForm } from "./data";
import {
  getDepth,
  getCodeSupply,
  addLabTapcolor,
  updateLabTapcolor,
} from "./api";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply } from "@/api/index";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: popupForm(this),
      form: {
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        getCodeSupply().then((res) => {
          this.codeSupplyNum = preFixInt(Number(res.data.maxSn) + 1, 5);
          this.form = {
            salColorfresh: "1",
            colorDate: this.$getNowTime("datetime"),
            colorState: false,
            doubleFlag: false,
            sn: 5869
          };
          this.wLoading = false;
        });
      } else {
        this.form = this.detail;
        setTimeout(() => {
          this.lights();
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.refresh = true;
          this.wLoading = true;
          if (this.form.labTapcoloroid) {
            // update
            this.form.sysLastUpd = this.$getNowTime("datetime")
            this.form.sysLastUpdBy = this.$store.state.userOid
            delete this.form['sn']
            for(let key in this.form){
              if(key.indexOf("$")!= -1){
                delete this.form[key]
              }
            }
            updateLabTapcolor(this.form)
              .then((res) => {
                this.wLoading = false;
                done();
                this.$tip.success(this.$t("public.bccg"));
              })
              .catch((err) => {
                this.wLoading = false;
                this.$tip.error("保存失败!" + err);
              });
          } else {
            this.form.sysCreated = this.$getNowTime("datetime")
            this.form.sysCreatedby = this.$store.state.userOid
            for(let key in this.form){
              if(key.indexOf("$")!= -1){
                delete this.form[key]
              }
            }
            addLabTapcolor(this.form)
              .then((res) => {
                baseCodeSupply({ code: "color_num" }).then((res) => {});
                this.form.labTapcoloroid = res.data.data;
                this.wLoading = false;
                done();
                this.$tip.success(this.$t("public.bccg"));
              })
              .catch((err) => {
                 done();
                this.wLoading = false;
                this.$tip.error("保存失败!" + err);
              });
          }
        } else {
          this.wLoading = false;
          this.$tip.warning("请补充色号信息!");
        }
      });
    },
    depth() {
      // 监听颜色深度变化
      this.$nextTick(() => {
        if (this.form.colorDepth === "") {
          this.form.colorNo = "";
          this.formOp.column[2].minRows = 0;
          this.form.dyeWeight = "";
          this.formOp.column[2].disabled = true;
          return;
        }
        this.formOp.column[2].disabled = false;
        switch (this.form.colorDepth) {
          case "TS":
            this.form.dyeWeight = 6;
            this.formOp.column[2].minRows = 6;
            this.formOp.column[2].maxRows = 100;
            break;
          case "ZS":
            this.form.dyeWeight = 2.5;
            this.formOp.column[2].minRows = 2.5;
            this.formOp.column[2].maxRows = 4;
            break;
          case "S":
            this.form.dyeWeight = 4;
            this.formOp.column[2].minRows = 4;
            this.formOp.column[2].maxRows = 6;
            break;
          case "Z":
            this.form.dyeWeight = 1.2;
            this.formOp.column[2].minRows = 1.2;
            this.formOp.column[2].maxRows = 2.5;
            break;
          case "Q":
            this.form.dyeWeight = 0;
            this.formOp.column[2].minRows = 0;
            this.formOp.column[2].maxRows = 1.2;
            break;
          default:
            this.form.dyeWeight = this.isAdd ? 0 : this.form.dyeWeight;
            this.formOp.column[2].minRows = 0;
            this.formOp.column[2].maxRows = 100;
            break;
        }
        if (  !this.form.colorDepth ) {
          return
        }
      
        getDepth({
          codeId: this.form.colorDepth,
          codeTableId: "bas_colorclTepth",
        }).then((res) => {
          this.form.colorNo =
            res.data[0].reserved1 +
            (this.isAdd
              ? this.codeSupplyNum
              : this.form.colorNo.replace(/[^0-9]/gi, ""));
        });
      });
    },
    lights(val) {
      this.$nextTick(() => {
        if (this.form.colorLights != "" && this.form.colorLights != null) {
          this.$set(this.formOp.column[18], "disabled", false);
          this.$set(this.formOp.column[19], "disabled", false);
          let data = JSON.parse(JSON.stringify(this.formOp.column[18].dicData));
          let data1 = data.filter(
            (item) => item.value != this.form.colorLights
          );
          let data2 = data.filter(
            (item) =>
              item.value != this.form.colorLights &&
              item.value != this.form.deputyLights
          );
          this.$set(this.formOp.column[18], "dicData", data1);
          this.$set(this.formOp.column[19], "dicData", data2);
        } else {
          this.$set(this.form, "deputyLights", "");
          this.$set(this.formOp.column[18], "disabled", true);
          this.$set(this.formOp.column[19], "disabled", true);
        }
      });
      // else {
      //   console.log(this.form.deputyLights);
      //   if (this.form.deputyLights != "") {
      //     this.$nextTick(() => {
      //       this.form.deputyLights.forEach((items, j) => {
      //         this.formOp.column[15].dicData.forEach((item, i) => {
      //           if (items === item.value && !item.disabled) {
      //             this.$set(item, "disabled", true);
      //           }
      //           if (items != item.value && !item.disabled) {
      //             this.$set(item, "disabled", false);
      //           }
      //         });
      //       });
      //     });
      //   }
      // }
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("choicDlg.xzkh")) {
        this.form.custCode = val.custCode;
        this.form.custName = val.custName;
      }
      if (this.choiceTle === this.$t("choicDlg.pbbm")) {
        this.form.fabCode = val.calicoId;
        this.form.fabricDesc = val.gustCalicoName;
      }
      if (this.choiceTle === this.$t("choicDlg.xzshxx")) {
        this.form.colorBh = val.colorNo;
        this.form.colorChn = val.colorName;
      }
      for (var key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus' scoped>
#colorMng_Tem {
  >>>.el-form-item--mini .el-color-picker--mini .el-color-picker__trigger, .el-form-item--mini .el-color-picker--mini{
    width: 70px;
    height: 29px;
  }
  >>>.el-input-group__append{
    padding: 0 10px;
    line-height: 5px;
  }
  .formBox{
    height: calc(100vh - 125px) !important
  }
    
}
</style>