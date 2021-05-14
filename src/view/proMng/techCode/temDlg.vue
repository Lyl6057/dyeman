<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-14 16:59:54
 * @Description: 
-->
<template>
  <div id="techCodeTem">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '漂染工艺'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
      class="not-number-icon"
    >
      <div class="btnList">
        <el-button type="success" @click="save" :loading="wLoading">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="add">{{
          $t("public.add")
        }}</el-button>
        <el-button type="danger" @click="del">{{ $t("public.del") }}</el-button>
        <el-button type="warning" @click="close">{{
          $t("public.close")
        }}</el-button>
        <!-- <el-button type="primary" @click="checkOrder">选择订单号</el-button> -->
      </div>

      <div class="formBox">
        <avue-form
          ref="form"
          :option="formOp"
          v-model="form"
          :upload-before="uploadBefore"
        >
        </avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
      <img :src="imgUrl" alt="" height="240px" />
    </view-container>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="100%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud } from "./data";
import {
  get,
  add,
  update,
  getDtl,
  addDtl,
  updateDtl,
  delDtl,
  upload,
  getImg,
} from "./api";
export default {
  name: "techCodeTem",
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
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      dlgWidth: "60%",
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      chooseData: {},
      tabs: "選擇訂單",
      choiceV: false,
      choiceTle: "选择漂染工藝",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      chooseDtlData: {},
      imgUrl: "",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      this.form = {};
      if (this.isAdd) {
        setTimeout(() => {
          this.form.workDate = this.$getNowTime();
          this.wLoading = false;
        }, 200);
      } else {
        this.form = this.detail;
        this.imgUrl =
          process.env.API_HOST +
          "/api/proBleadyeTechCode/findFileById?id=" +
          this.form.bleadyeImageId;
        this.query();
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      }
    },
    save() {
      this.wLoading = true;
      get({ bleadyeCode: this.form.bleadyeCode }).then((res) => {
        if (res.data.total > 0 && !this.form.bleadyeCodeId) {
          this.$tip.error("存在此編號,請重新填寫!");
          this.wLoading = false;
          return;
        } else {
          for (let i = 0; i < this.crud.length; i++) {
            if (!this.crud[i].mateName) {
              this.$tip.error("材料名称不能為空!");
              this.wLoading = false;
              return;
            }
          }
          this.$refs.form.validate((valid, done) => {
            if (valid) {
              try {
                Object.keys(this.form).forEach((item) => {
                  if (this.isEmpty(this.form[item])) {
                    delete this.form[item];
                  }
                });
                if (this.form.bleadyeCodeId) {
                  // update
                  update(this.form).then((res) => {
                    if (res.data.code == 200) {
                      // this.$tip.success(this.$t("public.bccg"));
                      this.saveOther();
                      this.upload();
                    } else {
                      this.$tip.error(this.$t("public.bcsb"));
                    }
                    setTimeout(() => {
                      this.wLoading = false;
                      this.$emit("refresh");
                      done();
                    }, 200);
                  });
                } else {
                  // add
                  add(this.form).then((res) => {
                    if (res.data.code == 200) {
                      this.form.bleadyeCodeId = res.data.data;
                      this.$tip.success(this.$t("public.bccg"));
                      this.saveOther();
                      this.upload();
                    } else {
                      this.$tip.error(this.$t("public.bcsb"));
                    }
                    setTimeout(() => {
                      this.wLoading = false;
                      this.$emit("refresh");
                      // this.saveOther();
                      done();
                    }, 200);
                  });
                }
              } catch (error) {
                console.log(error);
                this.wLoading = false;
                this.$tip.error(this.$t("public.bcsb"));
                done();
              }
            } else {
              this.wLoading = false;
              this.$tip.error("请补充漂染工艺信息!");
              return;
            }
          });
        }
      });
    },
    upload() {
      if (this.imgUrl && this.form.bleadyeCodeId) {
        // 開始上傳圖片！
        let file = this.dataURLtoFile(this.imgUrl, "file");
        let formData = new FormData();
        formData.append("oid", this.form.bleadyeCodeId);
        formData.append("file", file);
        upload(formData).then((res) => {
          // this.imgUrl = "";
        });
      }
    },
    query() {
      getDtl(
        Object.assign({
          proBleadyeTechCodeFk: this.form.bleadyeCode,
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.sort((a, b) => {
          return a.sn < b.sn ? -1 : 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        // }
        this.crud.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
        });
        this.page.total = res.data.total;

        this.loading = false;
      });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }

      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          if (item.codeItemIt) {
            updateDtl(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proBleadyeTechCodeFk = this.form.bleadyeCode;
            addDtl(data).then((res) => {
              item.codeItemIt = res.data.data;
              resolve();
            });
          }
        });
      };
      let promiseArr = this.crud.map((item, i) => {
        return addDtla(item, i);
      });
      Promise.all(promiseArr).then((res) => {
        setTimeout(() => {
          this.dlgLoading = false;
          this.query();
          this.$tip.success(this.$t("public.bccg"));
        }, 200);
      });
      // this.crud.forEach((item, index) => {
      //   if (
      //     item.changedId ||
      //     item.useYarnId ||
      //     item.washedId ||
      //     item.strainId
      //   ) {
      //     // update
      //     this.func.update(item).then((res) => {});
      //   } else {
      //     //add
      //     item.proBleadyeJobFk = this.form.bleadyeJobId;
      //     this.func.add(item).then((res) => {
      //       item.changedId = res.data.data;
      //       item.useYarnId = res.data.data;
      //       item.washedId = res.data.data;
      //       item.strainId = res.data.data;
      //     });
      //   }
      //   if (index == this.crud.length - 1) {
      //     this.$tip.success(this.$t("public.bccg"));
      //     this.dlgLoading = false;
      //   }
      // });
    },
    uploadBefore(file, done, loading) {
      if (file.name.indexOf("png") == -1 && file.name.indexOf("jpg") == -1) {
        this.$tip.error("图片格式错误!");
        loading();
        return;
      }
      var reader = new FileReader();
      let _this = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        _this.imgUrl = reader.result;
      };
      loading();
    },
    add() {
      // if (this.tabs != "生產項目") {
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
        sn: this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      // } else {
      //   this.choiceV = true;
      // }
    },
    del() {
      if (
        !this.chooseData.jobTestId &&
        !this.chooseData.itemId &&
        !this.chooseData.vatParamId &&
        !this.chooseData.jobTechId
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.func
            .del(
              this.tabs === "生產項目" || this.tabs === "长车加工项目"
                ? this.chooseData.itemId
                : this.tabs === "測試要求"
                ? this.chooseData.jobTestId
                : this.tabs === "生產工藝"
                ? this.chooseData.jobTechId
                : this.chooseData.vatParamId
            )
            .then((res) => {
              if (res.data.code === 200) {
                if (this.chooseData.list.length > 0) {
                  this.chooseData.list.forEach((item, i) => {
                    delTechItem(item.techItemId).then((res) => {});
                    if (i == this.chooseData.list.length - 1) {
                      this.query();
                      this.$tip.success(this.$t("public.sccg"));
                    }
                  });
                } else {
                  this.query();
                  this.$tip.success(this.$t("public.sccg"));
                }
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
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      if (
        this.tabs == "生產工藝" &&
        this.chooseData.list.length == 0 &&
        this.chooseData.jobTechId
      ) {
        this.getTechItem();
      }
    },
    choiceData(val) {
      if (Object.keys(val).length == 0) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle == "选择漂染工藝") {
        this.dlgLoading = true;
        this.crud.push({
          index: this.crud.length + 1,
          $cellEdit: true,
          proBleadyeTechCodeFk: val.bleadyeCodeId,
          bleadyeName: val.bleadyeCodeId,
          liquorRatio: val.liquorRatio,
          signDate: this.$getNowTime("datetime"),
          changeBatchTime: this.$getNowTime("datetime"),
          sn: this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
        });

        getCodeItem({
          proBleadyeTechCodeFk: val.bleadyeCodeId,
          rows: this.page.pageSize,
          start: this.page.currentPage,
        }).then((res) => {
          this.crud[this.crud.length - 1].list = [];
          res.data.records.forEach((item, i) => {
            item.index = i + 1;
            item.$cellEdit = true;
            item.mateCode = item.basMateId;
            item.proBleadyeCodeItemFk = item.codeItemIt;
            item.formulaAmount = item.useAmount;
            item.formulaUnit = item.measureType;
            item.useAmount =
              Number(this.form.clothWeight) * Number(item.formulaAmount);
            isNaN(item.useAmount) ? (item.useAmount = 0) : "";

            this.crud[this.crud.length - 1].list.push(item);
          });
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
          setTimeout(() => {
            this.dlgLoading = false;
          }, 200);
        });
      }
      if (this.choiceTle == "選擇工藝材料") {
        val.index = this.chooseData.list.length + 1;
        val.$cellEdit = true;
        val.mateCode = val.basMateId;
        val.proBleadyeCodeItemFk = val.codeItemIt;
        val.formulaAmount = val.useAmount;
        val.formulaUnit = val.measureType;
        val.useAmount =
          Number(this.form.clothWeight) * Number(val.formulaAmount);
        this.chooseData.list.push(val);
      }
      if (this.choiceTle == "选择织造通知单") {
        val.fabName = val.fabricDesc;
        val.gramWeightAfter = isNaN(val.gramWeight) ? 0 : val.gramWeight;
        val.shrinkLenth = isNaN(val.verticalShrink) ? 0 : val.verticalShrink;
        val.shrinkWidth = isNaN(val.horizonShrink) ? 0 : val.horizonShrink;
        val.clothWeight = isNaN(val.amount) ? 0 : val.amount;
        this.form = val;
        this.getOther();
      }
      if (this.choiceTle == "選擇生产项目") {
        val.forEach((item, i) => {
          this.crud.push({
            jobItemName: item.stepName,
            $cellEdit: true,
            index:
              this.crud.length > 0
                ? this.crud[this.crud.length - 1].index + 1
                : 1,
          });
        });
      }
      this.choiceV = false;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
  created() {},
  mounted() {
    document
      .getElementsByClassName("el-upload el-upload--text")[0]
      .getElementsByTagName("span")[0].innerHTML = "选择图片";
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#techCodeTem {
  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .avue-form__row {
    padding: 0 !important;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>