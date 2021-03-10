<template >
  <div id="qlyHead">
    <!-- 下拉选择检查类型 -->
    <div class="head-left">
      <el-row>
        <!-- 检查类型 -->
        <el-col :span="12">
          <el-select
            v-model="value"
            :placeholder="$t('energy.qxz')"
            @change="fn_SelectID"
          >
            <el-option
              v-for="item in SelctData"
              :key="item.cateId"
              :label="item.cateName"
              :value="item.cateId"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" @click="fn_dialog(0)">{{
            $t("energy.xz")
          }}</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="fn_dialog(1)">{{
            $t("energy.bj")
          }}</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="fn_dialog(2)"
            >{{ $t("energy.schu") }}</el-button
          >
        </el-col>
        <el-dialog :visible.sync="dialog" width="60%" append-to-body>
          <view-container :title="title">
            <el-row class="btnList">
              <el-button type="primary" id="sunbtn" @click="fn_addType">{{
                $t("energy.bc")
              }}</el-button>
              <el-button type="primary" id="monbtn" @click="fn_monType">{{
                $t("energy.xg")
              }}</el-button>
              <el-button
                type="warning"
                style="display: inline"
                @click="dialog = false"
                >{{ $t("energy.qx") }}</el-button
              >
            </el-row>
            <el-row class="formBox">
              <el-col :span="12">
                <div>
                  {{ $t("energy.flmc") + ":" }}
                  <el-input
                    v-model="cateName"
                    :placeholder="$t('energy.qsrflmc')"
                    style="width: 76%"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  {{ $t("energy.flbh") + ":" }}
                  <el-input
                    v-model="cateCode"
                    :placeholder="$t('energy.qsrflbh')"
                    style="width: 80%"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="width: 90%; margin: 10px 0 0 0">
                  {{ $t("energy.flms") }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-input
                    type="textarea"
                    v-model="cateDesc"
                    :placeholder="$t('energy.qsrflms')"
                    style="width: 90%; margin: 0 0 10px 70px"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </view-container>
        </el-dialog>
        <!-- 检查种类 -->
        <el-col :span="12">
          <el-select
            v-model="variety"
            @change="checkVariety"
            :placeholder="$t('energy.qxz')"
          >
            <el-option
              v-for="item in varietyData"
              :key="item.kindOid"
              :label="item.kindName"
              :value="item.kindOid"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="fn_kindialog(0)"
            >{{ $t("energy.xz") }}</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="fn_kindialog(1)"
            >{{ $t("energy.bj") }}</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="fn_kindialog(2)"
            >{{ $t("energy.schu") }}</el-button
          >
        </el-col>
      </el-row>
      <el-dialog :visible.sync="kindialog" width="60%" append-to-body>
        <view-container :title="title">
          <el-row class="btnList">
            <el-button
              type="primary"
              style="display: none"
              id="kinsun"
              @click="fn_kindAdd"
              >{{ $t("energy.bc") }}</el-button
            >
            <el-button
              type="primary"
              style="display: none"
              id="kinmon"
              @click="fn_kindup"
              >{{ $t("energy.xg") }}</el-button
            >
            <el-button type="warning" @click="kindialog = false">{{
              $t("energy.qx")
            }}</el-button>
          </el-row>
          <el-row class="btnList">
            <el-col :span="12">
              <div>
                {{ $t("energy.zlmc") + ":" }}
                <el-input
                  v-model="kindName"
                  :placeholder="$t('energy.qsrzlmc')"
                  style="width: 76%"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                {{ $t("ProWorkflowInfo.xh") + ":" }}
                <el-input
                  v-model="kindSn"
                  :placeholder="$t('energy.qsrxh')"
                  style="width: 80%"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </view-container>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { cofirm2, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption";

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
      kindialog: false, //下拉检查种类笼罩蒙版的状态值
      kindName: "", //检查种类名称
      kindSn: "", //检查种类序号
      kindoid: "", //检查种类分类ID,
      isOne: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //获取质量检查类型的全部列表数据将其赋给下拉选择框
    fn_PostTye() {
      this.$http
        .post("/api/qcCheckCateList")
        .then((res) => {
          this.SelctData = res.data;
          this.value = this.SelctData[0].cateId;
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
    //执行下拉选择类型的增删改查函数
    fn_dialog(done) {
      this.dialog = true;
      if (done === 0) {
        this.title = this.$t("energy.xz");
        document.getElementById("sunbtn").style.display = "";
        document.getElementById("monbtn").style.display = "none";
        this.cateName = "";
        this.cateCode = "";
        this.cateDesc = "";
      } else if (done === 1) {
        this.title = this.$t("energy.bj");
        document.getElementById("sunbtn").style.display = "none";
        document.getElementById("monbtn").style.display = "";
        this.SelctData.forEach((item) => {
          if (this.done == item.cateId) {
            this.cateName = item.cateName;
            this.cateCode = item.cateCode;
            this.cateDesc = item.cateDesc;
          }
        });
      } else if (done === 2) {
        //点击删除按钮删除检查类型---删除选中的该条数据
        this.dialog = false;
        cofirm2(this.$t("energy.sfjx"), this, {})
          .then(() => {
            this.$http
              .delete("/api/qcCheckCate?cateId=" + this.value)
              .then((res) => {
                if (res.data.code == 200) {
                  this.value = "";
                  this.fn_PostTye();
                  success(this.$t("energy.sccg"));
                  this.varietyData = "";
                } else {
                  error(this.$t("energy.scsb"));
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("energy.yqxsc"),
            });
          });
      }
    },
    //检查类型新增
    fn_addType() {
      this.$http
        .put(
          "/api/qcCheckCate?cateDesc=" +
            this.cateDesc +
            "&cateId=" +
            this.cateId +
            "&cateName=" +
            this.cateName +
            "&cateCode=" +
            this.cateCode
        )
        .then((res) => {
          if (res.data.code == 200) {
            success(this.$t("energy.xzcg"));
            this.dialog = false;
            this.fn_PostTye();
          } else {
            error(this.$t("energy.xzsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //检查类型修改--修改当前选中的检查类型
    fn_monType() {
      this.$http
        .post(
          "/api/qcCheckCate?cateDesc=" +
            this.cateDesc +
            "&cateId=" +
            this.value +
            "&cateName=" +
            this.cateName +
            "&cateCode=" +
            this.cateCode
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.fn_PostTye();
            success(this.$t("energy.xgcg"));
            this.dialog = false;
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //==========================//
    //种类数据查询
    kindList(value) {
      this.$http
        .get("/api/qcCheckKindList?cateId=" + value)
        .then((res) => {
          this.varietyData = res.data.rows;
          this.sortNum(this.varietyData, "sn");
          if (this.isOne) {
            this.variety = this.varietyData[0].kindOid;
            this.checkVariety(this.variety);
            this.isOne = false;
          }
        })
        .catch((err) => {
          error(this.$t("energy.yc"));
        });
      // this.$http
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
    //种类新增,修改,删除数据之前的数据处理
    fn_kindialog(done) {
      if (this.done) {
        if (done == 0) {
          this.kindialog = true;
          this.title = this.$t("energy.xz");
          document.getElementById("kinsun").style.display = "";
          document.getElementById("kinmon").style.display = "none";
        } else if (done == 1) {
          if (this.variety) {
            for (let index = 0; index < this.varietyData.length; index++) {
              if (this.varietyData[index].kindOid == this.variety) {
                this.kindName = this.varietyData[index].kindName;
                this.kindSn = this.varietyData[index].sn;
              }
            }
            this.kindialog = true;
            this.title = this.$t("energy.bj");
            document.getElementById("kinsun").style.display = "none";
            document.getElementById("kinmon").style.display = "";
          } else {
            this.kindialog = false;
            warning(this.$t("energy.qxzygzl"));
          }
        } else if (done == 2) {
          this.kindialog = false;
          cofirm2(this.$t("energy.sfjx"), this, {})
            .then(() => {
              this.$http
                .delete("/api/qcCheckKind?kindOid=" + this.variety)
                .then((res) => {
                  if (res.data.code == 200) {
                    success(this.$t("energy.sccg"));
                    this.kindialog = false;
                    this.varietyData = "";
                    this.variety = "";
                    this.kindList(this.value);
                    this.checkVariety(this.variety);
                  } else {
                    warning(this.$t("energy.scsb"));
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: this.$t("energy.yqxsc"),
              });
            });
        }
      } else {
        warning(this.$t("energy.qxzygjcx"));
      }
    },
    //检查种类新增
    fn_kindAdd() {
      this.$http
        .put(
          "/api/qcCheckKind?cateId=" +
            this.done +
            "&kindName=" +
            this.kindName +
            "+&sn=" +
            this.kindSn
        )
        .then((res) => {
          if (res.data.code == 200) {
            success(this.$t("energy.xzcg"));
            this.kindList(this.value);
            this.kindialog = false;
          } else {
            error(this.$t("energy.xzsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //检查种类修改
    fn_kindup() {
      this.$http
        .post(
          "/api/qcCheckKind?cateId=" +
            this.done +
            "&kindName=" +
            this.kindName +
            "&kindOid=" +
            this.variety +
            "&sn=" +
            this.kindSn
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.kindList(this.value);
            this.kindialog = false;
            setTimeout(() => {
              success(this.$t("energy.xgcg"));
              this.checkVariety(this.variety);
            }, 500);
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    checkVariety(value) {
      this.$emit("checkVariety", value);
    },
    //封装的排序函数
    sortNum(arr, key) {
      return arr.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
  },
  created() {
    this.fn_PostTye();
  },
  mounted() {},
};
</script>

<style lang='stylus'>
#qlyHead {
  .head-left {
    margin: 0;
    padding: 10px 10px 0;
    text-align: left;
  }

  .head-left button {
    height: 30px;
    padding: 0 12px;
  }
}
</style>