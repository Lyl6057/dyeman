<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + '入库'">
      <div class="btnList">
        <el-button type="success" @click="save">保存</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="24">
          <view-container :title="datas.type.split('_')[0] + '入库明细'">
            <div class="btnList">
              <el-button type="primary" @click="add">新增</el-button>
              <el-button type="danger" @click="del">删除</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="dlgcrud"
                :option="mxOp"
                v-loading="loading"
                :data="mx"
                :page.sync="page"
                @current-row-change="cellClick"
                @on-load="getDetail"
              ></avue-crud>
            </div> </view-container
        ></el-col>
      </el-row>
      <choice
        :choiceV="choiceV"
        :choiceTle="choiceTle"
        :choiceQ="choiceQ"
        :dlgWidth="dlgWidth"
        @choiceData="choiceData"
        @close="choiceV = false"
        v-if="choiceV"
      ></choice>
    </view-container>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F } from "./data";
import choice from "@/components/choice";
import {
  addCpb,
  updateCpb,
  getCpbDetali,
  addCpbDetali,
  updateCpbDetali,
  delCpbDetali,
} from "@/api/im/Wk/rc";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  props: {
    datas: Object,
    detail: Object,
    hide: String,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      phPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      count: [],
      ctLoading: false,
      form: {},
      oldData: {},
      chooseData: {},
      choiceV: false,
      choiceTle: "來紗登記",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      everyThing: {
        // getLoc: getPbPh,
        // delLoc: delPbPhDetali,
        // addLoc: addPbPhDetali,
        // updateLoc: updatePbPhDetali,
      },
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (this.isAdd) {
        this.form = this.detail;
        return;
      }
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseFinishedclothinoid
      ) {
        this.mx = [];
        return;
      }
      this.loading = true;
      // this.oldData = {};
      this.changeList = [];
      this.mx = [];
      this.count = [];
      getCpbDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseFinishedclothinFk: this.detail.whseFinishedclothinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        if (this.mx.length === 0) {
          this.loading = false;
        }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          // item.weiUnit = item.weightUnit;
          // item.custId = this.detail.custName;
          setTimeout(() => {
            this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
            this.mxOp.showSummary = true;
            this.loading = false;
          }, 200);
        });
      });
    },
    add() {
      if (this.hide === "1" || this.hide === "3") {
        this.choiceV = !this.choiceV;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = "選擇成品布貨物包";
      }
      if (this.hide === "2") {
        this.mx.push({
          index: this.mx.length + 1,
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      }
      if (this.hide === "5") {
        if (this.form.instructId === "" || this.form.instructId === null) {
          this.$tip.error("请先选择加工指令單號!");
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceQ.materialType = "2";
        this.dlgWidth = "100%";
        this.choiceTle = "選擇指令單明細";
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseFinishedclothinDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        if (this.mx.length > 0) {
          this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        }
        return;
      }

      let tle = "";

      if (this.hide != "1" && this.hide != "3") {
        tle =
          "是否确定删除胚布编码为 【 " +
          this.chooseData.calicoId +
          " 】 的数据?";
      } else {
        tle =
          "是否确定删除缸號为 【 " + this.chooseData.batchNo + " 】 的数据?";
      }
      this.$tip
        .cofirm(tle, this, {})
        .then(() => {
          delCpbDetali(this.chooseData.whseFinishedclothinDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                this.getDetail();
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
        });
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      // if (!this.chooseData.list) {
      //   this.chooseData.list = [];
      // }
      // if (!this.chooseData.loc) {
      //   this.chooseData.loc = [];
      // }
    },
    save() {
      if (this.hide === "1" && this.form.yinId === "") {
        this.$tip.error("入仓编号不能为空!");
        return;
      }
      if (this.hide === "2" && this.form.custName === "") {
        this.$tip.error("客戶名稱不能为空!");
        return;
      }
      for (let i = 0; i < this.mx.length; i++) {
        if (!this.mx[i].batchNo) {
          this.$tip.error("缸号不能为空!");
          return;
        }
        if (!this.mx[i].weight || !this.mx[i].weightUnit) {
          this.$tip.error("入倉重量/单位不能为空!");
          return;
        }
        if (!this.mx[i].countingNo) {
          this.$tip.error("入仓疋數不能为空!");
          return;
        }
        // if (this.mx[i].loc) {
        //   for (let j = 0; j < this.mx[i].loc.length; j++) {
        //     if (!this.mx[i].loc[j].weight || !this.mx[i].loc[j].weightUnit) {
        //       this.$tip.error("入仓批號重量不能为空!");
        //       return;
        //     }
        //     if (!this.mx[i].loc[j].batchNo) {
        //       this.$tip.error("入仓批號不能为空!");
        //       return;
        //     }
        //   }
        // }
        // if (this.hide === "6" && !this.mx[i].countingNo) {
        //   this.$tip.error("入仓疋数不能为空!");
        //   return;
        // }
      }
      this.saved = true;

      if (this.form.finStatus === "" || this.form.finStatus === "null") {
        this.form.finStatus = "";
      }
      if (this.form.whseFinishedclothinoid) {
        updateCpb(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success("保存成功!");
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              // this.mx.forEach((item, i) => {
              //   console.log(data);
              if (item.whseFinishedclothinDtloid) {
                // 更新
                updateCpbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseFinishedclothinFk = this.form.whseFinishedclothinoid;
                addCpbDetali(data).then((res) => {
                  item.whseFinishedclothinDtloid = res.data.data;
                  resolve();
                });
              }
              // });
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            // for (let i = 0; i < this.mx.length; i++) {
            // if (this.mx[i].loc && this.mx[i].loc.length > 0) {
            //   this.mx[i].loc.forEach((item) => {
            //     item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
            //     if (!item.whseCalicoinDtlboid) {
            //       this.everyThing.addLoc(item).then((res) => {
            //         item.whseCalicoinDtlboid = res.data.data;
            //       });
            //     } else {
            //       this.everyThing.updateLoc(item).then((res) => {});
            //     }
            //   });
            // }
            // if (i === this.mx.length - 1) {
            this.loading = false;
            this.$tip.success("保存成功!");
            // }
            // }
          });
        });
      } else {
        addCpb(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          this.form.whseFinishedclothinoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success("保存成功!");
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              if (item.whseFinishedclothinDtloid) {
                // 更新
                updateCpbDetali(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseFinishedclothinFk = this.form.whseFinishedclothinoid;
                addCpbDetali(data).then((res) => {
                  item.whseFinishedclothinDtloid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            // for (let i = 0; i < this.mx.length; i++) {
            //   if (this.mx[i].loc && this.mx[i].loc.length > 0) {
            //     this.mx[i].loc.forEach((item) => {
            //       item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
            //       if (!item.whseCalicoinDtlboid) {
            //         this.everyThing.addLoc(item).then((res) => {
            //           item.whseCalicoinDtlboid = res.data.data;
            //         });
            //       } else {
            //         this.everyThing.updateLoc(item).then((res) => {});
            //       }
            //     });
            //   }
            // if (i === this.mx.length - 1) {
            this.loading = false;
            this.$tip.success("保存成功!");
            // }
            // }
          });
        });
      }
    },
    close() {
      this.$emit("close", this.saved);
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget.yarnsName = val.yarnsId;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      // if (this.choiceTle === "胚布訂單") {
      //   this.choiceTarget.prodNo = val.$poNo;
      //   this.choiceTarget.calicoId = val.fabId;
      //   this.choiceTarget.clothName = val.fabYcount;
      // }
      // if (this.choiceTle === "胚布編碼") {
      //   this.choiceTarget.clothName = val.$clothName;
      // }
      if (this.choiceTle === "選擇貨位") {
        this.chooseData.locationCode = val[0].locationCode;
      }
      if (this.choiceTle === "選擇成品布貨物包") {
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
        // }
        // this.choiceTarget.prodNo = val.prodNo;
        // this.choiceTarget.fabticket = val.fabticket;
        // this.choiceTarget.countingNo = val.countingNo;
      }
      if (this.choiceTle === "選擇指令單明細") {
        val.forEach((item, i) => {
          item.calicoId = item.materialId;
          item.clothName = item.materialName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === "選擇訂單胚布資料") {
        val.forEach((item, i) => {
          item.prodNo = item.$salPoFk;
          item.calicoId = item.fabId;
          item.clothName = item.fabName;
          item.loc = [];
          item.loc.push({
            batchNo: "",
            countingNo: 1,
            index: 1,
            weight: item.fabQty,
            weightUnit: item.qtyUnit,
          });
        });
        this.mx = this.$unique(this.mx.concat(val), "prodNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === "選擇貨位") {
        this.chooseData.locationCode = val[0].locationCode;
      }
      if (this.choiceTle === "選擇外厂胚布配料計劃") {
        this.form.factoryId = val.refCode;
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    this.form.sysCreatedby = this.$store.state.userOid;
    this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
  // .el-input.is-disabled .el-input__inner {
  // color: #606266;
  // background-color: #fff;
  // }
}
</style>