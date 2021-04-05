<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + $t('iaoMng.rc')"
      v-loading="loading"
      :element-loading-text="$t('public.loading')"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->

        <!-- <el-button type="warning" @click="getDetail">取消</el-button> -->
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="17">
          <view-container :title="datas.type.split('_')[0] + $t('iaoMng.rcmx')">
            <div class="btnList">
              <el-button type="primary" @click="add">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="del">{{
                this.$t("public.del")
              }}</el-button>
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
              >
                <!-- <template slot="yarnsIdType" slot-scope="{ item, value, label }">
                <span>{{ item.value }}</span>
              </template> -->
              </avue-crud>
            </div>
          </view-container></el-col
        >
        <el-col :span="7">
          <view-container
            :title="datas.type.split('_')[0] + $t('iaoMng.rcmxhw')"
          >
            <loction
              ref="loc"
              :inData="chooseData"
              :api="everyThing"
              :form="form"
              :type="$t('iaoMng.sx')"
            ></loction>
          </view-container>
        </el-col>
        <!-- <el-col :span="Number(everyThing.dlgPp.split(':')[1])">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <avue-crud
              ref="crud"
              v-loading="loading"
              :option="everyThing.dlgC2"
              :data="other"
            ></avue-crud> </view-container
        ></el-col> -->
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
import { getUcmlUser } from "@/const/whse.js";
import {
  addSx,
  updateSx,
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
} from "@/api/im/Wk/rc";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import choice from "@/components/choice";
import loction from "@/components/location/index";
export default {
  props: {
    datas: Object,
    detail: Object,
    everyThing: Object,
    hide: String,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
    loction: loction,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      ruleV: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      sysCreatedby: "",
      saved: false,
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (this.isAdd) {
        this.loading = true;
        this.form = this.detail;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        if (
          Object.keys(this.detail).length === 0 ||
          !this.detail.whseYarninoid
        ) {
          this.mx = [];
          return;
        }
        this.loading = true;
        // this.oldData = {};
        this.changeList = [];
        this.mx = [];
        this.mxOp.showSummary = false;
        // this.chooseData = {};
        getSxDetali({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseYarninFk: this.detail.whseYarninoid,
        }).then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;

          // if (Object.keys(this.oldData).length > 1) {
          //   this.$refs.dlgcrud.setCurrentRow(this.mx[this.oldData.index - 1]);
          // } else {

          // }

          if (this.mx.length === 0) {
            this.loading = false;
          }
          this.mx.forEach((item, index) => {
            item.yarnsName = item.yarnsId;
            item.index = index + 1;
            item.poNo = item.yarnsId;
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
                this.mxOp.showSummary = true;
                this.loading = false;
              }, 200);
            }
          });
        });
      }
    },
    add() {
      if (this.hide === "1") {
        if (this.form.registerNo === "" || this.form.registerNo === null) {
          this.$tip.error(this.$t("iaoMng.qxzdjbh"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceField = "yarnsId";
        this.choiceQ.registerNo = this.form.registerNo;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.lsdjmx");
      } else if (this.hide === "2") {
        if (!this.form.purNo) {
          this.$tip.error(this.$t("iaoMng.xzcgdh"));
          return;
        }
        if (!this.form.deliNo) {
          this.$tip.error(this.$t("iaoMng.xzshdh"));
          return;
        }
        this.choiceV = !this.choiceV;
        this.choiceField = "yarnsId";
        // this.choiceQ.yarnsId = this.form.registerNo;
        this.choiceTarget = {};
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("iaoMng.xzcgdd");
      } else if (this.hide === "4") {
        this.choiceV = !this.choiceV;
        this.dlgWidth = "100%";
        this.choiceTarget = {};
        this.choiceField = "poNo";
        this.choiceTle = this.$t("iaoMng.xztstzd");
      } else if (this.hide === "5") {
        if (this.form.instructId === "" || this.form.instructId === null) {
          this.$tip.error(this.$t("iaoMng.xzjgzdl"));
          return;
        }
        // 外發廠退倉
        this.choiceV = !this.choiceV;
        this.dlgWidth = "100%";
        this.choiceTarget = {};
        this.choiceQ.typeExplain = "纱线"; //this.$t("iaoMng.sx");
        this.choiceTle = this.$t("iaoMng.xzzld");
      }
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
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseYarninDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
        return;
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle3") +
            this.chooseData.yarnsId +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delSxDetali(this.chooseData.whseYarninDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.mx.forEach((item, i) => {
                  item.index = i + 1;
                });
                this.oldData = {};
                this.chooseData = {};
                // this.getDetail();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.loc) {
        this.chooseData.loc = [];
      }
    },
    save() {
      if (
        this.hide === "1" &&
        (this.form.yinId === "" || this.form.registerNo === "")
      ) {
        this.$tip.error(this.$t("iaoMng.saveTle1"));
        return;
      }
      if (this.hide === "5" && !this.form.factoryId) {
        this.$tip.error(this.$t("iaoMng.saveTle2"));
        return;
      }
      if (this.hide === "5" && !this.form.instructId) {
        this.$tip.error(this.$t("iaoMng.saveTle3"));
        return;
      }

      for (let i = 0; i < this.mx.length; i++) {
        if (!this.mx[i].batchNo) {
          this.$tip.error(this.$t("iaoMng.saveTle4"));
          return;
        }
        if (this.hide === "1" && !this.mx[i].cartonNum) {
          this.$tip.error(this.$t("iaoMng.saveTle5"));
          return;
        }
        if (!this.mx[i].weight || !this.mx[i].weightUnit) {
          this.$tip.error(this.$t("iaoMng.saveTle6"));
          return;
        }
        if (this.hide === "1" && !this.mx[i].whseNum) {
          this.$tip.error(this.$t("iaoMng.saveTle7"));
          return;
        }
      }
      // this.form.sysCreatedby = this.sysCreatedby;
      this.saved = true;
      if (this.form.whseYarninoid) {
        updateSx(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              this.mx.forEach((item, i) => {
                if (item.whseYarninDtloid) {
                  // 更新
                  updateSxDetali(data).then((res) => {
                    resolve();
                  });
                } else {
                  // 新增
                  data.whseYarninFk = this.form.whseYarninoid;
                  addSxDetali(data).then((res) => {
                    item.whseYarninDtloid = res.data.data;
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
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  if (!item.whseYarninDtlaoid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      } else {
        addSx(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          this.form.whseYarninoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              this.mx.forEach((item, i) => {
                if (item.whseYarninDtloid) {
                  // 更新
                  updateSxDetali(data).then((res) => {
                    resolve();
                  });
                } else {
                  // 新增
                  data.whseYarninFk = this.form.whseYarninoid;
                  addSxDetali(data).then((res) => {
                    item.whseYarninDtloid = res.data.data;
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
                  item.whseYarninDtlFk = this.mx[i].whseYarninDtloid;
                  if (!item.whseYarninDtlaoid) {
                    this.everyThing.addLoc(item).then((res) => {
                      item.whseYarninDtlaoid = res.data.data;
                    });
                  } else {
                    this.everyThing.updateLoc(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                this.loading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
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
      if (this.choiceTle === this.$t("iaoMng.xzlsdj")) {
        this.choiceTarget.custName = val.$custCode;
        this.choiceTarget.custCode = val.custCode;
      }
      if (this.choiceTle === this.$t("iaoMng.tstzd")) {
        this.choiceTarget.yarnsId = val.yarnsId;
      }
      if (this.choiceTle === this.$t("choicDlg.sxwc")) {
        this.form.factoryId = val.refCode;
        this.form.factoryName = val.refName;
      }
      if (this.choiceTle === this.$t("iaoMng.xzzld")) {
        val.forEach((item, i) => {
          item.yarnsId = item.materialId;
          item.yarnsName = item.materialName;
          item.cartonWei = item.weight;
        });
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });

        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      }
      if (this.choiceTle === this.$t("choicDlg.lsdjmx")) {
        val.forEach((item, i) => {
          item.cartonWei = item.weight;
          item.cartonNum = item.carQty;
          item.whseNum = item.carQty;
        });
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      }
      if (this.choiceTle === this.$t("iaoMng.xztstzd")) {
        val.forEach((item, i) => {
          item.custId = this.detail.custName;
          item.whseYarninFk = this.detail.whseYarninoid;
          item.functions = null;
        });
        // this.mx = this.mx.concat(val);
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        // this.mx = this.$unique(this.mx, "batchNo");
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
        this.page.total = this.mx.length;
      }
      this.page.total = this.mx.length;
      this.choiceTarget.yarnsName = val.yarnsId;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;

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
    // getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
    //   this.sysCreatedby = Res.data.ucmlUseroid;
    // });
    this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
}
</style>