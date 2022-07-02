<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-02 10:39:37
 * @Description: 
-->
<template>
  <div id="techCodeTem">
    <view-container :title="(isAdd ? '新增' : '修改') + '漂染工艺'" :element-loading-text="$t('public.loading')" v-loading="wLoading" class="not-number-icon">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
          <el-button type="success" @click="save" :loading="wLoading">{{$t("public.save")}}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
          <el-button type="primary" @click="add">{{ $t("public.add")}}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
          <el-button type="danger" @click="del">{{$t("public.del") }}</el-button>
        </el-tooltip>
        <el-button @click="up" type="primary" :disabled="Object.keys(chooseData).length == 0">上移</el-button>
        <el-button @click="down" type="primary" :disabled="Object.keys(chooseData).length == 0">下移</el-button>
        <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
          <el-button type="warning" @click="close">{{ $t("public.close") }}</el-button>
        </el-tooltip>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud ref="crud" id="mainCrud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick">
          <template slot="mateName" slot-scope="scope">
            <el-select slot="reference" v-if="scope.row.bleadyeType != 'run' && scope.row.$cellEdit"  v-model="scope.row.mateName" remote filterable reserve-keyword clearable default-first-option placeholder="请输入材料信息" :loading="vatLoading" :remote-method="remoteMethod" @change="handleMatNameChange">
              <el-option v-for="item in options" :key="item.bcCode" :label="`${item.cnnamelong}—${item.factoryName}`" :value="`${item.factoryName}`">
              </el-option>
            </el-select>
            <el-input v-else-if="scope.row.bleadyeType == 'run' && scope.row.$cellEdit" v-model="scope.row.mateName"></el-input>
            <span v-else>{{scope.row.mateName}}</span>
          </template>
        </avue-crud>
      </div>
      <div style="
          width: 100%;
          height: 240px;
          border: 1px solid #eee;
          position: relative;
        " v-on:paste="handlePaste">
        <el-image :src="imgUrl" v-if="imgUrl" :preview-src-list="[imgUrl]">
        </el-image>
        <span class="image-remove" @click="removeImg" v-if="imgUrl">X</span>
        <div class="watermark" v-if="!imgUrl">单击此处后 Ctr + V 复制图片</div>
        <input id="input" ref="input" type="file" accept="image/*" capture="camera" style="display: none" @change="imgChange" />
      </div>
      <el-dialog id="colorMng_Dlg imgDlg" :visible.sync="imgVisi" append-to-body top="5vh">
        <img @click="imgVisi = false" :src="imgUrl" alt="" style="border: 1px solid #ccc" />
      </el-dialog>
    </view-container>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData" @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud } from "./data";
import {
  get,
  add,
  del,
  update,
  getDtl,
  addDtl,
  updateDtl,
  delDtl,
  upload,
  getImg,
  getBasChemicalByPage,
  getBasPigmentByPage,
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
      vatLoading: false,
      options: [],
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
      oldData: {},
      tabs: "選擇訂單",
      choiceV: false,
      choiceTle: "选择漂染工藝",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      chooseDtlData: {},
      imgUrl: "",
      imgVisi: false,
      searchLoading: false,
    };
  },
  watch: {},
  methods: {
    handleMatNameChange(val) {
      if(!val){
        this.chooseData.basMateId = ''
        this.chooseData.mateName = ''
        return;
      }
      if (this.chooseData.bleadyeType == "run") {
        return;
      }
      let fetchF = null;
      if (this.chooseData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF({ factoryName: "%" + val, start: 1, rows: 50}).then((res) => {
        if(res.data.total == 1){
          this.$nextTick(() =>{
            this.$set(this.chooseData, "basMateId", res.data.records[0].bcCode)
            this.$set(this.chooseData, "mateName", res.data.records[0].factoryName)
          })
        }
      });
    },
    remoteMethod(val) {
      if (this.chooseData.bleadyeType == "run") {
        return;
      }
      this.vatLoading = true;
      let fetchF = null;
      if (this.chooseData.bleadyeType == "add_chemicalmat") {
        fetchF = getBasChemicalByPage;
      } else {
        fetchF = getBasPigmentByPage;
      }
      fetchF({ fillTextSeach: val , start: 1, rows: 50}).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    getData() {
      this.wLoading = true;
      this.form = {};
      if (this.isAdd) {
        setTimeout(() => {
          this.form.workDate = this.$getNowTime();
          this.wLoading = false;
        }, 200);
      } else {
        get({
          bleadyeCodeId: this.detail.bleadyeCodeId,
          rows: 999,
          start: 1,
        }).then((res) => {
          this.form = res.data.records[0];
          if (this.form.bleadyeImageId) {
            this.imgUrl =
              process.env.API_HOST +
              "/api/proBleadyeTechCode/findFileById?id=" +
              this.form.bleadyeImageId;
          }
          this.query();
        });
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
                  });
                }
                setTimeout(() => {
                  done();
                }, 200);
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
      if (
        this.imgUrl &&
        this.imgUrl.indexOf("findFileById") == -1 &&
        this.form.bleadyeCodeId
      ) {
        // 開始上傳圖片！
        let file = this.dataURLtoFile(this.imgUrl, "file");
        let formData = new FormData();
        formData.append("oid", this.form.bleadyeCodeId);
        formData.append("file", file);
        upload(formData).then((res) => {
          // this.imgUrl = "";
          setTimeout(() => {
            this.wLoading = false;
            this.$emit("refresh");
          }, 200);
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
          for (let key in item) {
            if (item[key] == null) {
              item[key] = undefined;
            }
          }
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    saveOther() {
      if (this.crud.length == 0) {
        this.dlgLoading = false;
        this.query();
        this.$tip.success(this.$t("public.bccg"));
        return;
      }
      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          for (let key in item) {
            if (item[key] == undefined) {
              item[key] = null;
            }
          }
          let data = JSON.parse(JSON.stringify(item));
          // if (data.bleadyeType != "run") {
          //   data.mateName = data.mateName.split("——")[1];
          // }
          if (data.bleadyeType == "add_chemicalmat") {
            data.formulaUnit = "KG";
          } else if (data.bleadyeType == "add_pigment") {
            data.formulaUnit = "g";
          }
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
    imgChange(e) {
      let file = document.getElementById("input").files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      let _this = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        _this.imgUrl = reader.result;
      };
    },
    removeImg() {
      this.imgUrl = null;
      this.form.bleadyeImageId = "";
    },
    add() {
      // if (this.tabs != "生產項目") {
      let data = {
        index: this.crud.length + 1,
        // $cellEdit: true,
        bleadyeType: "add_chemicalmat",
        // sn: this.crud.length > 0 ? this.crud[this.crud.length - 1].sn + 1 : 1,
      };
      if (this.chooseData.index) {
        this.crud.splice(this.chooseData.$index + 1, 0, data);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.sn = i + 1;
        });
        this.$refs.crud.setCurrentRow(this.crud[this.chooseData.$index]);
      } else {
        this.crud.push(data);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.sn = i + 1;
        });
        this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        this.$nextTick(() => {
          this.$toTableLow(this, "mainCrud");
        });
      }

      // this.crud.push();

      // } else {
      //   this.choiceV = true;
      // }
    },
    del() {
      if (!this.chooseData.codeItemIt) {
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
          delDtl(this.chooseData.codeItemIt)
            .then((res) => {
              if (res.data.code === 200) {
                this.query();
                this.$tip.success(this.$t("public.sccg"));
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
      // this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (this.chooseData.basMateId) {
        this.remoteMethod(this.chooseData.basMateId);
      }
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
              Number(this.form.clothWeight) * Number(item.formulaAmount) * 0.01;
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
          Number(this.form.clothWeight) * Number(val.formulaAmount) * 0.01;
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
    up() {
      if (Object.keys(this.chooseData).length > 0) {
        if (this.chooseData.sn === 1) {
          return;
        }
        //在上一项插入该项
        this.crud.splice(
          this.chooseData.sn - 2,
          0,
          this.crud[this.chooseData.sn - 1]
        );
        //删除后一项
        this.crud.splice(this.chooseData.sn, 1);
        this.crud.forEach((item, i) => {
          item.sn = i + 1;
          item.index = i + 1;
        });
      } else {
        this.$tip.error("请选择要上移的数据!");
        return;
      }
    },
    down() {
      if (Object.keys(this.chooseData).length > 0) {
        if (this.chooseData.sn === this.crud.length) {
          return;
        }
        //在下一项插入该项
        this.crud.splice(
          this.chooseData.sn + 1,
          0,
          this.crud[this.chooseData.sn - 1]
        );
        //删除前一项
        this.crud.splice(this.chooseData.sn - 1, 1);
        this.crud.forEach((item, i) => {
          item.sn = i + 1;
          item.index = i + 1;
        });
      } else {
        this.$tip.error("请选择要上移的数据!");
        return;
      }
    },
    showImg() {
      if (this.imgUrl) {
        this.imgVisi = true;
      }
    },
    handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;

      if (!items || items.length === 0) {
        this.$message.error("当前浏览器不支持本地");
        return;
      }
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        this.$message.error("粘贴内容非图片");
        return;
      }
      // 此时file就是我们的剪切板中的图片对象
      // 如果需要预览，可以执行下面代码
      const reader = new FileReader();
      let _this = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        _this.imgUrl = reader.result;
      };
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
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#imgDlg {
  overflow: auto !important;
}

.image-remove {
  position: absolute;
  color: red;
  font-size: 24px;
  width: 30px;
  height: 30px;
  text-align: center;
  top: 5px;
  left: calc(100% - 50px);
  cursor: pointer;
}

#techCodeTem {
  .watermark {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 48px;
    font-weight: 700;
    color: #ccc;
    height: 200px;
    width: 100%;
    line-height: 200px;
    text-align: center;
    z-index: 1;
  }

  .img {
    cursor: pointer;
    z-index: 100;
  }

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
    text-align: right !important;
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