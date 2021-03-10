<template >
  <div id="qlTop">
    <!-- 下拉选择检查类型 -->
    <div class="head-left">
      <!-- <div style="padding-bottom:10px">{{SelctData.cateDesc}}</div> -->
      <el-row>
        <!-- 检查类型 -->
        <el-col :span="6">
          <!-- <el-select v-model="value" :placeholder="$t('energy.qxz')" @change="fn_SelectID">
            <el-option
              v-for="(item,index) in SelctData"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateId"
            ></el-option>
          </el-select>-->
          <el-button type="primary" icon="el-icon-plus" @click="dialog = true"
            >生成检测报告</el-button
          >
        </el-col>
        <!-- 检查种类 -->
        <el-col :span="9">
          <span style="margin-bottom: 5px">检测报告：</span>
          <el-select
            v-model="report"
            @change="checkReport()"
            :placeholder="$t('energy.qxz')"
          >
            <el-option
              v-for="(item, index) in reportData"
              :key="item.recId"
              :label="item.recName"
              :value="item.recId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <span style="margin-bottom: 5px">检测种类：</span>
          <el-select
            v-model="kind"
            @change="checkind()"
            :placeholder="$t('energy.qxz')"
          >
            <el-option
              v-for="(item, index) in kindData"
              :key="item.kindOid"
              :label="item.kindName"
              :value="item.kindOid"
            ></el-option>
          </el-select>
        </el-col>
        <el-dialog
          :title="title"
          :visible.sync="dialog"
          :close-on-click-modal="false"
          width="90%"
        >
          <el-row style="margin: 15px 5px">
            <avue-form
              ref="form"
              v-model="reportObj"
              :option="reportOp"
              @submit="addReport"
            ></avue-form>
          </el-row>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
import { cofirm2, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import {
  Data_Width,
  label_Width,
  isDate,
  timeConversion,
} from "@/seal/gridOption";
import { reportOp } from "./data";
export default {
  components: {},
  data() {
    return {
      SelctData: [], //下拉选项卡
      value: "", //下拉选择的值
      varietyData: [],
      variety: "",
      dialog: false, //下拉选择笼罩蒙版的状态值
      kindialog: false,
      title: "", //蒙版标题
      cateId: "", //分类ID
      cateCode: "", //分类编号
      cateName: "", //分类名称
      cateDesc: "", //分类描述
      done: "",
      reportObj: {},
      reportOp: reportOp(this),
      reportOind: "",
      reKindOid: [],
      reItemOid: [],
      reStandOid: [],
      //TODO: ******
      allData: [],
      reportData: [],
      report: {},
      kindData: [],
      kind: {},
      tbData: [],
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //獲取檢測報告
    getReport() {
      this.$http
        .post("/api/labCheckRecorderList")
        .then((res) => {
          this.reportData = res.data;
          this.ForwardRankingDate(this.reportData, "createTime");
          this.report = this.reportData[0].recId;
          this.kindData = [];
          // this.kind = {};
          this.checkReport();
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    getPoNo() {
      this.$http.get("/api/salPoList").then((res) => {
        let resData = res.data.rows;
        this.ForwardRankingDate(resData, "sysCreated");
        let poData = [];
        resData.forEach((item, index) => {
          let data = {
            label: item.poNo,
            value: item.poNo,
            type: item.poType,
          };
          poData.push(data);
        });
        this.reportOp.column[3].dicData = poData;
      });
    },
    //選擇檢測報告,獲取對應報告種類List
    checkReport() {
      this.$http
        .post("/api/labCheckKind2List?recId=" + this.report)
        .then((res) => {
          this.kindData = res.data;
          this.kind = this.kindData[0].kindOid;
          this.checkind();
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    checkind() {
      this.$emit("checkVariety", this.kind);
    },
    //获取质量检查类型的全部列表数据将其赋给下拉选择框
    fn_PostTye() {
      this.$http
        .get("/api/qcCheckCate?cateId=846B01E0-A220-4C93-8745-353E62ACAC3C")
        .then((res) => {
          this.SelctData = res.data;
          this.value = this.SelctData.cateId;
          this.fn_SelectID(this.value);
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    //点击选择不同的类型执行获取种类数据
    fn_SelectID(value) {
      this.variety = "";
      this.kindList(value);
      this.done = value;
    },
    //==========================//
    //种类数据查询
    kindList(value) {
      //this.$http
      //   .get("/api/qcCheckKindList?cateId=" + value)
      //   .then(res => {
      //     // console.log(res.data);
      //     this.varietyData = res.data.rows;
      //     this.sortNum(this.varietyData, "sn");
      //     if (this.isOne) {
      //       this.variety = this.varietyData[0].kindOid;
      //       this.checkVariety(this.variety);
      //       this.isOne = false;
      //     }
      //   })
      //   .catch(err => {
      //     error(this.$t("energy.yc"));
      //   });
      //this.$http
      //   .get("/api/checkItemInfo?itemOid=" + value)
      //   .then(res => {
      //     this.KinData = res.data;
      //     console.log(this.KinData);
      //     this.sortNum(this.KinData, "sn");
      //   })
      //   .catch(err => {
      //     error(this.$t("energy.yc"));
      //   });
    },
    //TODO: 新增检测报告
    addReport(form, done) {
      form.checkCate = this.value; //TODO: 检测报告分类 = 检查类型分类ID
      form.createTime = timeConversion(new Date());
      this.$http
        .put("/api/labCheckRecorder", form)
        .then((res) => {
          if (res.data.code == 0) {
            this.reportOind = res.data.data; //TODO: 获取返回的recId
            //TODO: 新增种类
            this.addKind(this.value, done);
          }
        })
        .catch((err) => {
          error(this.$t("energy.xzsb"));
        });
    },
    //复制化验室检查种类
    addKind(value, done) {
      this.$http
        .get("/api/qcCheckKindList?cateId=" + value)
        .then((kindRes) => {
          let data;
          kindRes.data.rows.forEach((item, index) => {
            data = {
              kindCode: item.kindCode,
              kindDesc: item.kindDesc,
              kindName: item.kindName,
              kindOid: item.kindOid,
              recId: this.reportOind,
              // sn: item.sn
            };
            this.$http.put("/api/labCheckKind2", data).then((res) => {
              let idData = {
                kindOid: item.kindOid,
                reKindOid: res.data.data,
              };
              this.reKindOid.push(idData);
              // if (index === kindRes.data.rows.length - 1) {

              // }
            });
          });
        })
        .catch((err) => {
          error(this.$t("energy.yc"));
        });
      setTimeout(() => {
        this.addItem(done);
      }, 1000);
    },
    //複製检查项目
    addItem(done) {
      this.reKindOid.forEach((item, index) => {
        this.$http
          .get("/api/checkItemInfo?kindOid=" + item.kindOid)
          .then((res1) => {
            res1.data.forEach((items, indexs) => {
              let data = {
                kindOid: item.reKindOid,
                sn: items.sn,
                itemCod: items.itemCod,
                itemName: items.itemName,
                refStandard: items.refStandard,
                supportEquipment: items.supportEquipment,
                acceptRange: items.acceptRange,
              };
              this.$http.put("/api/labCheckItem", data).then((res) => {
                let data2 = {
                  itemOid: items.itemOid,
                  reItemOid: res.data.data,
                };
                this.reItemOid.push(data2);
              });
            });
          })
          .catch((err) => {
            error(this.$t("energy.fwqcw"));
          });
      });
      setTimeout(() => {
        this.addStandard(done);
      }, 1000);
    },
    //複製标准
    addStandard(done) {
      this.reItemOid.forEach((item1, index) => {
        this.$http
          .get("/api/qcItemStandard/v1.0/list?itemOid=" + item1.itemOid)
          .then((res1) => {
            res1.data.forEach((items, indexs) => {
              let data = {
                sn: items.sn,
                standCod: items.standCod,
                standDesc: items.standDesc,
                standName: items.standName,
                itemOid: item1.reItemOid,
              };
              this.$http
                .post("/api/labCheckStandard/v1.0/save", data)
                .then((res) => {
                  let data2 = {
                    standOid: items.standOid,
                    reStandOid: res.data.data,
                  };
                  this.reStandOid.push(data2);
                });
            });
          })
          .catch((err) => {
            console.log(err);
            error(this.$t("energy.fwqcw"));
          });
      });
      setTimeout(() => {
        this.addSize(done);
      }, 1000);
    },
    //複製規格/接受標準
    addSize(done) {
      this.reStandOid.forEach((item, index) => {
        this.$http
          .get("/api/qcScopeRange/v1.0/list?standOid=" + item.standOid)
          .then((res1) => {
            res1.data.forEach((items, indexs) => {
              let data = {
                sn: items.sn,
                rangeAccept: items.rangeAccept,
                scopeName: items.scopeName,
                standOid: item.reStandOid,
              };
              this.$http
                .post("/api/labCheckScopeRange/v1.0/save", data)
                .then((res) => {});
            });
          });
      });

      success(this.$t("energy.xzcg"));
      this.getReport();
      this.checkReport();
      done();
      this.dialog = false;
    },
    //封装的排序函数
    sortNum(arr, key) {
      return arr.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    //时间排序
    ForwardRankingDate(data, p) {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (Date.parse(data[j][p]) < Date.parse(data[j + 1][p])) {
            var temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }
      return data;
    },
  },
  created() {
    this.fn_PostTye();
    this.getReport();
    this.getPoNo();
  },
  mounted() {},
};
</script>

<style lang='stylus'>
#qlTop {
  .head-left {
    padding: 10px 5px;
    text-align: left;

    .el-input {
      width: 85%;
    }
  }

  .head-left button {
    height: 30px;
    padding: 0 12px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
</style>