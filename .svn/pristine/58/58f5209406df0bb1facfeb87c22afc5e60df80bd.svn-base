<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + '入库'">
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">查询</el-button> -->
        <!-- <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button> -->
        <!-- <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >保存</el-button
        > -->
        <!-- <el-button type="warning" @click="getDetail">取消</el-button> -->
        <el-button type="success" @click="save">保存</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="hide != '6' && hide != '7' ? 12 : 24">
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
        <el-col :span="12" v-if="hide != '6' && hide != '7'">
          <view-container :title="datas.type.split('_')[0] + '入库批号资料'">
            <!-- <div style="margin-bottom: 0px" class="btnList">
              <el-button type="primary" @click="addPh">新增</el-button>
              <el-button type="danger" @click="delPh">删除</el-button>
              <el-button
                type="success"
                :disabled="changePhList.length === 0"
                @click="savePh"
                >保存</el-button
              >
            </div>
            <avue-crud
              ref="count"
              id="count"
              v-loading="loading"
              :option="countOp"
              :page.sync="phPage"
              :data="count"
              @on-load="getPh"
              @current-row-change="cellPhClick"
            ></avue-crud>  -->
            <inwhse-ph
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
            ></inwhse-ph> </view-container
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
import { rcpb2C, rcpb2F, rcpb3C } from "./data";
import choice from "@/components/choice";
import inwhseph from "@/components/calico/inwhse_ph";
import {
  addPb,
  updatePb,
  getPbDetali,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPbPh,
  addPbPhDetali,
  updatePbPhDetali,
  delPbPhDetali,
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
    inwhsePh: inwhseph,
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
      formOp: rcpb2F(this),
      mxOp: rcpb2C(this),
      countOp: rcpb3C(this),
      mx: [{ index: 1 }],
      count: [],
      ctLoading: false,
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      oldPhData: {},
      choosPheData: {},
      changePhList: [],
      canLeave: false,
      choiceV: false,
      choiceTle: "來紗登記",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      everyThing: {
        getLoc: getPbPh,
        delLoc: delPbPhDetali,
        addLoc: addPbPhDetali,
        updateLoc: updatePbPhDetali,
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
        !this.detail.whseCalicoinoid
      ) {
        this.mx = [];
        return;
      }
      this.loading = true;
      // this.oldData = {};
      this.changeList = [];
      this.mx = [];
      this.count = [];
      getPbDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseCalicoinFk: this.detail.whseCalicoinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        if (this.mx.length === 0) {
          this.loading = false;
        }
        // if (Object.keys(this.chooseData).length > 0) {
        //   // this.oldData = this.chooseData;
        //   this.$refs.mx.setCurrentRow(this.mx[this.chooseData.index - 1]);
        //   // this.oldData.$cellEdit = false;
        //   // this.$set(this.chooseData, "$cellEdit", true);
        // }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          item.weiUnit = item.weightUnit;
          item.custId = this.detail.custName;
          setTimeout(() => {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
            this.mxOp.showSummary = true;
            this.loading = false;
          }, 200);
        });
      });
    },
    getPh() {
      if (
        !this.chooseData.whseCalicoinDtlaoid ||
        this.hide === "6" ||
        this.hide === "7"
      ) {
        this.count = [];
        this.countOp.showSummary = false;
        return;
      }
      this.ctLoading = true;
      this.changePhList = [];
      getPbPh({
        whseCalicoinDtlaFk: this.chooseData.whseCalicoinDtlaoid,
        rows: this.phPage.pageSize,
        start: this.phPage.currentPage,
      }).then((res) => {
        let records = res.data;
        this.phPage.total = records.total;
        // this.count = [];

        this.count = records.records;
        if (this.count.length === 0) {
          this.ctLoading = false;
        }
        this.count.forEach((item, index) => {
          item.index = index + 1;

          let _this = this;
          _this.$nextTick(() => {
            document
              .getElementById("count")
              .getElementsByClassName("el-table__row")
              [index].addEventListener(
                "input",
                function () {
                  _this.iptPhChange(item);
                },
                false
              );
          });
          if (index === this.count.length - 1) {
            this.ctLoading = false;
          }
        });
        this.$nextTick(() => {
          this.$refs.count.setCurrentRow();
          this.countOp.showSummary = true;
        });
      });
    },
    add() {
      if (this.hide === "1") {
        if (this.form.registerNo === "" || this.form.registerNo === null) {
          this.$tip.error("请先选择胚布登记编号!");
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceField = "calicoId";
        this.choiceQ.registerNo = this.form.registerNo;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = "選擇來胚登記明細";
        // return;
      }
      // if (
      //   this.mx.length > 0 &&
      //   !this.mx[this.mx.length - 1].whseCalicoinDtlaoid
      // ) {
      //   return;
      // }
      // if (Object.keys(this.oldData).length > 0) {
      //   this.oldData.$cellEdit = false;
      // }
      // this.mx.push({
      //   index: this.mx.length + 1,
      //   $cellEdit: true,
      //   custId: this.detail.custName,
      //   whseCalicoinFk: this.detail.whseCalicoinoid,
      // });
      // this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1]);
      // this.iptChange(this.mx[this.mx.length - 1]);
      // this.oldData = this.mx[this.mx.length - 1];
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择入库明细");
        return;
      } else if (!this.chooseData.whseCalicoinDtlaoid) {
        this.$tip.error("请先保存入库明细资料");
        return;
      }
      // if (Object.keys(this.oldPhData).length > 0) {
      //   this.oldPhData.$cellEdit = false;
      // }
      if (
        this.count.length > 0 &&
        !this.count[this.count.length - 1].whseCalicoinDtlboid
      ) {
        return;
      }
      if (Object.keys(this.oldPhData).length > 0) {
        this.oldPhData.$cellEdit = false;
      }
      this.count.push({
        index: this.count.length + 1,
        $cellEdit: true,
        whseCalicoinDtlaFk: this.chooseData.whseCalicoinDtlaoid,
        batchNo: this.chooseData.batchNo,
      });

      this.$refs.count.setCurrentRow(this.count[this.count.length - 1]);
      this.iptPhChange(this.count[this.count.length - 1]);
      this.oldPhData = this.count[this.count.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementById("count")
          .getElementsByClassName("el-table__row")
          [_this.count.length - 1].addEventListener(
            "input",
            function () {
              _this.iptPhChange(_this.oldPhData);
            },
            false
          );
      });
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    iptPhChange(val) {
      if (this.changePhList.length === 0) {
        this.changePhList.push(val);
      } else {
        for (let i = 0; i < this.changePhList.length; i++) {
          if (val.index === this.changePhList[i].index) {
            this.changePhList[i] = val;
            return;
          }
          if (
            this.changePhList.length - 1 === i &&
            this.changePhList[i].index != val.index
          ) {
            this.changePhList.push(val);
          }
        }
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseCalicoinDtlaoid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.mx.setCurrentRow(this.mx[this.mx.length - 1] || {});
            return;
          }
        }
      }
      let tle = "";

      if (this.hide != "6") {
        tle =
          "是否确定删除胚布编码为 【 " +
          this.chooseData.calicoId +
          " 】 的数据?";
      } else {
        tle =
          "是否确定删除生產單號为 【 " + this.chooseData.prodNo + " 】 的数据?";
      }
      this.$tip
        .cofirm(tle, this, {})
        .then(() => {
          delPbDetali(this.chooseData.whseCalicoinDtlaoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.mx.splice(this.chooseData.index - 1, 1);
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
    delPh() {
      if (Object.keys(this.choosePhData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.choosePhData.whseCalicoinDtlboid) {
        this.count.splice(this.choosePhData.index - 1, 1);
        for (let i = 0; i < this.changePhList.length; i++) {
          if (this.changePhList[i].index === this.choosePhData.index) {
            this.changePhList.splice(i, 1);
            this.$refs.count.setCurrentRow(
              this.count[this.count.length - 1] || {}
            );
            return;
          }
        }
      }
      this.$tip
        .cofirm(
          "是否确定删除批号为 【 " + this.choosePhData.batchNo + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delPbPhDetali(this.choosePhData.whseCalicoinDtlboid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.count.splice(this.choosePhData.index - 1, 1);
                this.getPh();
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
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      // if (this.datas === "化工原料" || this.datas === "顏料") {
      //   this.getPh();
      //   // this.getLoc();
      // }
      if (!this.chooseData.loc) {
        this.chooseData.loc = [];
      }
    },
    cellPhClick(val) {
      this.oldPhData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldPhData = val;
      this.choosePhData = val;
    },
    save() {
      if (
        this.hide === "1" &&
        (this.form.yinId === "" || this.form.registerNo === "")
      ) {
        this.$tip.error("入仓编号/登记编号不能为空!");
        return;
      }
      for (let i = 0; i < this.mx.length; i++) {
        // if (!this.mx[i].batchNo) {
        //   this.$tip.error("批号不能为空!");
        //   return;
        // }
        // if (!this.mx[i].weight || !this.mx[i].weightUnit) {
        //   this.$tip.error("入倉重量/单位不能为空!");
        //   return;
        // }
        // if (!this.mx[i].countingNo) {
        //   this.$tip.error("入仓疋數不能为空!");
        //   return;
        // }
        for (let j = 0; j < this.mx[i].loc.length; j++) {
          if (!this.mx[i].loc[j].weight || !this.mx[i].loc[j].weightUnit) {
            this.$tip.error("入仓批號重量不能为空!");
            return;
          }
        }
      }
      this.saved = true;
      if (this.form.whseCalicoinoid) {
        updatePb(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success("保存成功!");
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              this.mx.forEach((item, i) => {
                if (item.whseCalicoinDtlaoid) {
                  // 更新
                  updatePbDetali(data).then((res) => {
                    resolve();
                  });
                } else {
                  // 新增
                  data.whseCalicoinFk = this.form.whseCalicoinoid;
                  addPbDetali(data).then((res) => {
                    item.whseCalicoinDtlaoid = res.data.data;
                    resolve();
                  });
                }
              });
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  if (!item.whseCalicoinDtlboid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success("保存成功!");
              }
            }
          });
        });
      } else {
        addPb(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          this.form.whseCalicoinoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success("保存成功!");
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              this.mx.forEach((item, i) => {
                if (item.whseCalicoinDtlaoid) {
                  // 更新
                  updatePbDetali(data).then((res) => {
                    resolve();
                  });
                } else {
                  // 新增
                  data.whseCalicoinFk = this.form.whseCalicoinoid;
                  addPbDetali(data).then((res) => {
                    item.whseCalicoinDtlaoid = res.data.data;
                    resolve();
                  });
                }
              });
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].loc && this.mx[i].loc.length > 0) {
                this.mx[i].loc.forEach((item) => {
                  item.whseCalicoinDtlaFk = this.mx[i].whseCalicoinDtlaoid;
                  if (!item.whseCalicoinDtlboid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseCalicoinDtlboid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success("保存成功!");
              }
            }
          });
        });
      }
    },
    savePh() {
      for (let i = 0; i < this.changePhList.length; i++) {
        if (!this.changePhList[i].batchNo || !this.changePhList[i].countingNo) {
          this.$tip.error("批号/疋号不能为空!");
          this.canLeave = true;
          return;
        }
      }
      this.changePhList.forEach((item, index) => {
        if (item.whseCalicoinDtlboid) {
          updatePbPhDetali(item).then((res) => {});
        } else {
          addPbPhDetali(item).then((res) => {});
        }
      });
      this.canLeave = false;
      this.getPh();
      this.$tip.success("保存成功!");
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
      if (this.choiceTle === "選擇來胚登記") {
        this.choiceTarget.custName = val.$custCode;
        // this.choiceTarget.custCode = val.custCode;
      }
      if (this.choiceTle === "選擇來胚登記明細") {
        val.forEach((item, i) => {
          item.weight = item.weights;
          item.weightUnit = item.weightUnit;
          item.countingNo = item.countingNum;
          item.weiUnit = item.weightUnit;
          item.loc = [];
          // for (let i = 0; i < Number(item.countingNo); i++) {
          //   let wei = item.weight / Number(item.countingNo);
          item.loc.push({
            index: 1,
            countingNo: 1,
            batchNo: item.batchNo,
            weight: item.weight,
            weightUnit: item.weightUnit,
          });
          // }
        });
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === "胚布訂單") {
        this.choiceTarget.prodNo = val.$poNo;
        this.choiceTarget.calicoId = val.fabId;
        this.choiceTarget.clothName = val.fabYcount;
      }
      if (this.choiceTle === "胚布編碼") {
        this.choiceTarget.clothName = val.$clothName;
      }
      if (this.choiceTle === "胚布貨物包") {
        if (this.hide === "6") {
          this.choiceTarget.weight = val.weight;
          this.choiceTarget.weightUnit = val.weightUnit;
        }
        this.choiceTarget.prodNo = val.prodNo;
        this.choiceTarget.fabticket = val.fabticket;
        this.choiceTarget.countingNo = val.countingNo;
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