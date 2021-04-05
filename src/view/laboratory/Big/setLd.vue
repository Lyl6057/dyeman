<template >
  <div id="ArrangeSetLd">
    <el-tabs
      v-model="tabsName"
      style="margin: 0 5px"
      v-loading="loading"
      :element-loading-text="$t('public.loading')"
      element-loading-spinner="el-icon-loading"
    >
      <el-tab-pane label="大货复板" name="rhlpf">
        <el-row>
          <headers ref="header" />
        </el-row>
        <el-row class="btnList">
          <div style="float: left; margin-right: 20px">
            <!-- <el-button type="primary" @click="add" v-if="!isEditor" icon="el-icon-plus">新增版本</el-button> -->
            <el-button
              type="primary"
              @click="save"
              v-if="isEditor"
              :disabled="!canSave"
              >{{ this.$t("public.save") }}</el-button
            >
            <el-button type="primary" @click="update" v-else>编辑</el-button>
            <el-button type="primary" @click="cancel" v-if="isEditor"
              >取消</el-button
            >
          </div>
          <div>
            <label for="order">订单批号：</label>
            <el-input
              id="order"
              style="width: 180px; margin-right: 20px"
              placeholder="请输入订单批号"
              :readonly="!isEditor"
              v-model="pihao.clothLotCode"
              @input="iptChange(pihao, 'pihao')"
            ></el-input>
            <label for="shaxian">纱线批号：</label>
            <el-input
              id="shaxian"
              :readonly="!isEditor"
              style="width: 180px"
              placeholder="请输入纱线批号"
              v-model="pihao.yarnLotCode"
              @input="iptChange(pihao, 'pihao')"
            ></el-input>
          </div>

          <!-- <el-row style="float:right" type="flex" justify="end">
              <el-col :span="6">   <label> 确认版本</label></el-col>
              <el-col :span="18">
                 <el-input
                    v-model="checkVerData.customerConfirmver"
                    placeholder="确认版本"
                    readonly="true"
                  ></el-input>
              </el-col>
              </el-row>
            </el-col>
            </el-row>-->
        </el-row>
        <div class="box">
          <div
            id="gdBox"
            :style="{ width: versionData.length * 122 + 420 + 'px' }"
          >
            <el-container>
              <el-header>
                <div class="indexBox">
                  <div class="indexTle">序号</div>
                </div>
                <div class="boderTop">
                  <div class="versionTle">
                    <div style="width: 98px; border-right: 1px solid #ccc">
                      代号
                    </div>
                    <div style="width: 128px">物料批号/名称</div>
                    <div class="versionType">
                      <div>内部版本</div>
                      <div>打样版本</div>
                    </div>
                  </div>
                </div>
                <div>
                  <el-row style="height: 50px">
                    <div
                      v-for="(items, index) of versionData"
                      :class="!items.light ? 'lightHeight version' : 'version'"
                      :key="index"
                      @mouseenter="mouseEnter(items)"
                      @mouseleave="mouseLeave(items)"
                    >
                      <el-select
                        v-model="items.verNo"
                        style="display: none"
                        clearable
                        placeholder="内部版本"
                        @input="iptChange(items, 'verChange')"
                        @change="ckVerNo(items.verNo)"
                        @clear="clearVerNo"
                      >
                        <el-option
                          v-for="item in verNoList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <div>
                        <span v-if="items.verNo != ''">{{ items.verNo }}</span>
                        <span v-else>/</span>
                      </div>
                      <!-- <div class="handleDl" v-if="!items.display" @click="del(items,'pfl')">
                        <i class="el-icon-close"></i>
                        </div>-->
                    </div>
                  </el-row>
                  <el-row style="height: 51px">
                    <div
                      v-for="(item, index) of versionData"
                      :class="!item.light ? 'lightHeight version1' : 'version1'"
                      :key="index"
                      @mouseenter="mouseEnter(item)"
                      @mouseleave="mouseLeave(item)"
                    >
                      {{ item.verSn }}
                    </div>
                  </el-row>
                </div>
              </el-header>
              <el-main ref="gdBox">
                <div ref="bTle" class="bTle" style>
                  <div
                    v-for="(item, index) of data"
                    :key="item.index"
                    @mouseenter="mouseEnter(item)"
                    @mouseleave="mouseLeave(item)"
                    :class="item.techId ? 'techDiv' : ''"
                  >
                    <div class="bIndex" :class="item.techId ? 'techDiv' : ''">
                      {{ index + 1 }}
                    </div>
                    <div
                      class="wlIndex"
                      :class="item.techId ? 'techDiv2' : ''"
                      v-if="item.techId"
                    >
                      工艺{{ item.techIndex }}
                      <div
                        class="handleDl1"
                        v-if="!item.display"
                        @click="del(item, 'tech')"
                      >
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                    <div
                      class="wlIndex"
                      v-else
                      style="background: #fff; border-right: none"
                    >
                      {{ item.bcCode }}
                    </div>
                    <div
                      class="wlIndex"
                      v-if="!item.techId"
                      style="background: #fff; width: 128px"
                    >
                      <!-- <el-input
                          style="width:90%"
                          v-model="item.materBatchNumber"
                          placeholder="物料批号"
                          v-if="isEditor&&!item.techId"
                          @input="iptChange(item,'materBatchNumber')"
                        ></el-input>-->

                      <el-select
                        v-model="item.materBatchNumber"
                        style="width: 95%"
                        clearable
                        placeholder="物料批号"
                        v-if="isEditor && !item.techId"
                        @input="iptChange(item, 'materBatchNumber')"
                      >
                        <el-option
                          v-for="item in whseChemicalinData"
                          :key="item.whseChemicalinDtlboid"
                          :label="item.batchNo"
                          :value="item.batchNo"
                        ></el-option>
                      </el-select>
                      <el-popover
                        v-if="item.materBatchNumber && !isEditor"
                        placement="top-start"
                        style="margin-left: 2px"
                        width="200"
                        trigger="click"
                        :title="item.materBatchNumber"
                      >
                        <span slot="reference">{{
                          item.materBatchNumber
                        }}</span>
                      </el-popover>

                      <span v-if="!item.materBatchNumber && !isEditor">/</span>
                    </div>
                    <div class="bName" :class="item.techId ? 'techDiv' : ''">
                      <el-input
                        style="width: 90%"
                        v-model="item.chemicalName"
                        placeholder="染化料"
                        v-if="isEditor && !item.techId"
                        @input="iptChange(item, 'bcCode')"
                        maxlength="5"
                      ></el-input>
                      <el-popover
                        v-else
                        placement="top-start"
                        width="200"
                        trigger="click"
                        :title="item.chemicalName"
                      >
                        <span slot="reference">{{ item.chemicalName }}</span>
                      </el-popover>

                      <!-- <span v-else>{{item.chemicalName}}</span> -->
                      <div
                        class="handleDl1"
                        v-if="!item.display && !item.techId"
                        @click="del(item, 'rhl')"
                      >
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="addColor">
                      <el-button
                        type="primary"
                        @click="colorAdd"
                        v-if="!isEditor"
                        icon="el-icon-plus"
                      >染化料</el-button>
                      <el-button
                        type="primary"
                        @click="techAdd"
                        v-if="!isEditor"
                        icon="el-icon-plus"
                      >工艺配方</el-button>
                    </div>-->
                </div>
                <div style="margin-left: 400px">
                  <div
                    class="LdData"
                    v-for="item of versionData"
                    :key="item.index"
                    @mouseenter="mouseEnter(item)"
                    @mouseleave="mouseLeave(item)"
                  >
                    <div class="dataBox">
                      <div
                        v-for="(items, index) of item.children"
                        :class="!item.light ? 'lightHeight tbValue' : 'tbValue'"
                        :key="index"
                      >
                        <div v-if="!items.isTech">
                          <el-input
                            style="width: 90%"
                            v-model="items.formulaAmount"
                            placeholder="配方量"
                            v-if="isEditor && item.verId != '' && items.light"
                            @input="iptChange(items, 'formulaAmount')"
                          ></el-input>

                          <div class="uninput" v-else>
                            <span
                              v-if="
                                items.formulaAmount != null &&
                                items.formulaAmount != ''
                              "
                              >{{ items.formulaAmount }}</span
                            >
                            <span v-else>/</span>
                          </div>
                        </div>
                        <div v-else class="techDiv">
                          <div v-if="isEditor">
                            <span
                              style="float: left; margin-left: 5px"
                              v-if="items.placeholder"
                              >{{ items.placeholder }}:</span
                            >

                            <el-input
                              style="width: 60%"
                              v-model="items.value"
                              :placeholder="items.placeholder"
                              :disabled="items.disabled"
                              @input="iptChange(items, 'tech')"
                            ></el-input>
                          </div>

                          <div class="uninput" v-else>
                            <span
                              style="width: 60px; float: left"
                              v-if="items.placeholder"
                              >{{ items.placeholder }}：</span
                            >
                            <span
                              style="float: left; font-weight: bold"
                              v-if="items.value != null && items.value != ''"
                              >{{ items.value }}</span
                            >
                            <span v-else>/</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-container>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title
      :visible.sync="addDlg"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
      class="adddlg"
    >
      <el-row>
        <el-tabs v-model="addActive">
          <el-tab-pane
            label="新增版本"
            name="first"
            v-if="addActive === 'first'"
          >
            <avue-form
              :option="formOption"
              v-model="form"
              @submit="verAdd"
            ></avue-form>
          </el-tab-pane>
          <el-tab-pane
            label="新增染化料"
            name="second"
            v-if="addActive === 'second'"
          >
            <avue-form
              :option="colorOp"
              v-model="colorForm"
              @submit="colorSave"
            >
              <template slot-scope="scope" slot="chemicalClass">
                <div>
                  <el-select
                    v-model="colorForm.chemicalClass"
                    remote
                    filterable
                    placeholder="请选择"
                    :remote-method="remoteMethod"
                    :loading="remoteLoading"
                  >
                    <el-option
                      v-for="item in chemicalClassData"
                      :key="item.bcCode"
                      :label="item.bcMatname"
                      :value="item.bcMatname"
                      style="width: 800px"
                    >
                      <el-row>
                        <el-col style="width: 20%">
                          <span>名称 : {{ item.bcMatname }}</span>
                        </el-col>
                        <el-col style="width: 20%">
                          <span style="color: #8492a6; font-size: 13px"
                            >编码 : {{ item.bcCode }}</span
                          >
                        </el-col>
                        <el-col style="width: 20%">
                          <span style="color: #8492a6; font-size: 13px"
                            >一级分类 : {{ item.basChemicalsecond.sname }}</span
                          >
                        </el-col>
                        <el-col style="width: 20%">
                          <span style="color: #8492a6; font-size: 13px"
                            >二级分类 : {{ item.basChemicalthree.tname }}</span
                          >
                        </el-col>
                        <el-col style="width: 20%">
                          <span style="color: #8492a6; font-size: 13px"
                            >三级分类 : {{ item.basChemicalfour.fname }}</span
                          >
                        </el-col>
                      </el-row>
                    </el-option>
                  </el-select>
                </div>
              </template>
            </avue-form>
          </el-tab-pane>
          <el-tab-pane
            label="新增工艺配方"
            name="three"
            v-if="addActive === 'three'"
          >
            <avue-form
              :option="techOption"
              v-model="techForm"
              @submit="techSave"
            ></avue-form>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import headers from "./ldHeader";
import { techOption, colorOp, formOp } from "./ldOption";
import { cofirm2, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
export default {
  components: { headers },
  data() {
    return {
      tabsName: "rhlpf",
      addActive: "first",
      addDlg: false,
      checkTypeDlg: false,
      loading: false,
      data: [],
      versionData: [],
      isEditor: false,
      canSave: false,
      LdVer: [],
      verNoList: [],
      delVerList: [],
      formOption: formOp(),
      form: {},
      colorOp: colorOp(),
      colorForm: {},
      verChangeData: [],
      formulaAmountData: [],
      rhlChangeData: [],
      checkForm: {},
      techForm: {},
      techOption: techOption(),
      checkCrud: {},
      checkCrudData: [],
      chemicalClass: "",
      chemicalClassData: [],
      chemicalClassDatas: [],
      remoteLoading: false,
      linkData: this.$route.query.data,
      orderData: [],
      colorId: "",
      techData: [],
      techChangeData: [],
      pihao: {
        schId: "",
        isChange: false,
        clothLotCode: "",
        yarnLotCode: "",
      },
      verData: {},
      batchChange: [],
      whseChemicalinData: [],
    };
  },
  computed: {},
  methods: {
    getData() {
      this.loading = true;
      this.verNoList = [];
      this.delVerList = [];
      this.verChangeData = [];
      this.formulaAmountData = [];
      this.techChangeData = [];
      this.batchChange = [];
      this.$http.get("/api/whseChemicalinDtlb/v1.0/list").then((res) => {
        this.whseChemicalinData = res.data;
      });
      // 获取任务对应的LD通知单数据
      this.$http
        .get("/api/labBigcargoSchedule?schId=" + this.linkData.schId)
        .then((res) => {
          this.pihao.schId = res.data.schId;
          this.pihao.clothLotCode = res.data.clothLotCode;
          this.pihao.yarnLotCode = res.data.yarnLotCode;
          //获取订单胚布资料
          this.$http
            .get("/api/salPoDtla?salPoDtlaoid=" + res.data.salPoDtlaFk)
            .then((res) => {
              this.orderData = res.data;
              //获取通知单色号信息
              this.$http
                .get("/api/salColor?salColorid=" + this.orderData.dyeColorNo)
                .then((res) => {
                  this.colorId = res.data.salColoroid;
                  this.verData = res.data;
                  this.$refs.header.LdData = res.data;

                  //获取染化料类型
                  this.$http
                    .get("/api/basChemicalmat/v1.0/getQbEntityList")
                    .then((res) => {
                      this.chemicalClassData = res.data;
                      this.chemicalClassDatas = res.data;
                    });
                  //获取色号信息
                  this.$http.post("/api/salColorList").then((res) => {
                    this.colorList = res.data;
                    this.colorOp.column[3].dicData = res.data;
                    this.formOption.column[3].dicData = res.data;
                    this.techOption.column[0].dicData = res.data;
                  });
                  //染色配方版本
                  this.$http
                    .get("/api/labDyecolorVer?salColoroid=" + this.colorId)
                    .then((res) => {
                      this.versionData = res.data;
                    });
                  //颜料数据
                  this.$http
                    .get("/api/labDyeColorItem?salColoroid=" + this.colorId)
                    .then((res) => {
                      this.data = res.data;
                      // 获取办布的物料批次信息
                      this.$http
                        .get(
                          "/api/labDyeMaterItemBatch/v1.0/getPcjl?labSchId=" +
                            this.linkData.schId
                        )
                        .then((BatchRes) => {
                          this.data.forEach((item) => {
                            this.$set(item, "display", true);
                            BatchRes.data.forEach((items) => {
                              if (item.itemId == items.itemId) {
                                this.$set(
                                  item,
                                  "itemBatchId",
                                  items.itemBatchId
                                );
                                this.$set(
                                  item,
                                  "materBatchNumber",
                                  items.materBatchNumber
                                );
                              }
                            });
                          });
                        });
                      this.$http
                        .get(
                          "/api/labColorTechParam/v1.0/getColorListByPage?salColoroid=" +
                            this.colorId
                        )
                        .then((res) => {
                          this.techData = res.data;
                          this.sortNum(res.data, "rowNo");
                          res.data.forEach((item, index) => {
                            this.$set(item, "bcCode", "");
                            this.$set(item, "display", true);
                            this.$set(item, "techIndex", index + 1);
                            this.data.push(item);
                          });
                          this.sortNum(this.data, "rowNo");
                        });
                      setTimeout(() => {
                        this.reData();
                      }, 200);
                    });
                });
            });
        });
    },
    reData() {
      // 数据拼接
      this.$http.get("/api/labVerValue").then((res) => {
        this.LdVer = res.data;
        this.LdVer.forEach((item) => {
          this.data.forEach((items) => {
            if (item.itemId == items.itemId) {
              this.$set(item, "rowNo", items.rowNo);
            }
          });
        });

        this.sortNum(this.LdVer, "rowNo");
        this.versionData.forEach((item, index) => {
          if (item.verId != "") {
            if (item.verNo == this.verData.customerConfirmver) {
              this.$set(item, "light", true);
            }
            this.$set(item, "children", []);
            this.$set(item, "display", true);
            this.LdVer.forEach((items) => {
              if (item.verId == items.verId) {
                if (item.verNo == this.verData.customerConfirmver) {
                  this.$set(items, "light", true);
                }
                item.children.push(items);
              }
            });
          }
        });
        this.sortNum(this.versionData, "verSn");
        for (let index = this.versionData.length; index < 4; index++) {
          let num = 1;
          if (this.versionData.length > 0) {
            num =
              Number(this.versionData[this.versionData.length - 1].verSn) + 1;
          }
          this.versionData.push({
            verId: "",
            salColoroid: "",
            verSn: "/",
            verNo: "/",
            isLock: false,
            verType: "",
            display: true,
            children: [],
          });
          this.data.forEach((item) => {
            if (item.itemId) {
              this.versionData[index].children.push(item);
            }
          });

          // this.sortNum(this.versionData[index].children, "rowNo");
        }

        let dataNo = this.versionData.length / 26;
        if (dataNo < 1) {
          for (var i = 65; i < 91; i++) {
            let verList = {
              label: String.fromCharCode(i),
              value: String.fromCharCode(i),
            };
            this.verNoList.push(verList);
          }
        } else if (dataNo >= 1) {
          for (var i = 65; i < 91; i++) {
            let verList = {
              label: String.fromCharCode(i),
              value: String.fromCharCode(i),
            };
            this.verNoList.push(verList);
          }
          for (let index = 0; index < Math.floor(dataNo); index++) {
            for (var i = 65; i < 91; i++) {
              let verList = {
                label:
                  String.fromCharCode(65 + Math.floor(index)) +
                  String.fromCharCode(i),
                value:
                  String.fromCharCode(65 + Math.ceil(index)) +
                  String.fromCharCode(i),
              };
              this.verNoList.push(verList);
            }
          }
        }
        this.versionData.forEach((item, index) => {
          this.verNoList.forEach((items, indexs) => {
            if (items.value === item.verNo) {
              this.delVerList.push(items);
              this.verNoList.splice(indexs, 1);
            }
          });
        });
        let placeholderName = ["温度", "时间", "浴比", "布重"];
        this.sortNum1(this.versionData, "verSn");
        this.techData.forEach((items, index) => {
          let techNo = items.rowNo;
          let techName = [
            items.temperature,
            items.timeLeng,
            items.bathRatio,
            items.clothWeight,
          ];
          this.versionData.forEach((item, indexs) => {
            this.sortNum1(item.children, "rowNo");
            let data = {
              value: techName[indexs] || "",
              placeholder: placeholderName[indexs] || "",
              isTech: true,
              rowNo: techNo,
              techIndex: index,
              id: items.techId,
              disabled: indexs < 4 ? false : true,
            };
            item.children.push(data);
            this.sortNum1(item.children, "rowNo");
          });
        });
        // //数据小于 4 时添加空数据
        // if (this.versionData.length < 4) {
        //   let num = 4 - this.versionData.length;

        //   for (let index = 0; index < num; index++) {
        //     this.versionData.push({
        //       verNo: "/",
        //       verSn:
        //         Number(this.versionData[this.versionData.length - 1].verSn) +
        //         1,
        //       children: this.versionData[this.versionData.length - 1].children
        //     });
        //   }
        // }
        this.sortNum1(this.versionData, "verSn");
        this.sortNum(this.verNoList, "value");
        this.sortNum(this.delVerList, "value");
        this.formOption.column[0].dicData = this.verNoList;
        this.loading = false;
      });
    },
    remoteMethod(val) {
      // 查询
      this.remoteLoading = true;
      this.chemicalClassData = JSON.parse(
        JSON.stringify(this.chemicalClassDatas)
      );
      let data = [];
      this.chemicalClassData.forEach((item, index) => {
        if (
          item.bcMatname.indexOf(val) != -1 ||
          item.bcCode.indexOf(val) != -1 ||
          item.basChemicalsecond.sname.indexOf(val) != -1 ||
          item.basChemicalthree.tname.indexOf(val) != -1 ||
          item.basChemicalfour.fname.indexOf(val) != -1
        ) {
          data.push(item);
        }
      });
      this.chemicalClassData = data;
      this.remoteLoading = false;
    },
    add() {
      this.addDlg = true;
      this.addActive = "first";
      if (this.versionData[this.versionData.length - 1].verSn == "/") {
        let num = 1;
        this.versionData.forEach((item) => {
          if (item.verSn != "/") {
            num += 1;
          }
        });
        this.form.verSn = num;
      } else {
        this.versionData.length == 0
          ? (this.form.verSn = 1)
          : (this.form.verSn =
              Number(this.versionData[this.versionData.length - 1].verSn) + 1);
      }
      if (this.verNoList.length == 0 && this.versionData.length < 26) {
        let data = {
          label: String.fromCharCode(
            this.delVerList[this.delVerList.length - 1].value.charCodeAt() + 1
          ),
          value: String.fromCharCode(
            this.delVerList[this.delVerList.length - 1].value.charCodeAt() + 1
          ),
        };
        this.verNoList.push(data);
      } else if (this.verNoList.length == 0 && this.versionData.length < 52) {
        let data = {
          label: "AA",
          value: "AA",
        };
        this.verNoList.push(data);
      }
      this.form.salColoroid = this.colorId;
    },
    verAdd(row, done) {
      if (row.isLock == "") {
        row.isLock = "false";
      }
      this.$http
        .post(
          "/api/labDyecolorVer?verSn=" +
            row.verSn +
            "&verNo=" +
            row.verNo +
            "&verType=" +
            row.verType +
            "&isLock=" +
            row.isLock +
            "&salColoroid=" +
            row.salColoroid
        )
        .then((res) => {
          if (res.data.code == 200) {
            // 新增染色配方版本成功， => 新增Ld打样版本
            this.addLdVer(res.data.data, done);
          }
        })
        .catch((err) => {
          // console.log(err);
          error("服务器错误！");
          done();
        });
    },
    addLdVer(verId, done) {
      this.data.forEach((item) => {
        if (!item.techId) {
          this.$http
            .post("/api/labVerValue?itemId=" + item.itemId + "&verId=" + verId)
            .then((res) => {});
        }
      });
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.form = {};
      this.delVerList = [];
      this.verNoList = [];
      this.getData();
      success(this.$t("energy.xzcg"));
      done();
      this.addDlg = false;
    },
    colorAdd() {
      this.addActive = "second";
      this.addDlg = true;
      this.colorForm.rowNo = this.data.length + 1;
      this.colorForm.salColoroid = this.colorId;
    },
    colorSave(row, done) {
      this.$http
        .post(
          "/api/labDyeColorItem?bcCode=" +
            row.bcCode +
            "&calculateClass=" +
            row.calculateClass +
            "&chemicalClass=" +
            row.chemicalClass +
            "&rowNo=" +
            row.rowNo +
            "&salColoroid=" +
            row.salColoroid +
            "&chemicalName=" +
            row.chemicalName
        )
        .then((colRes) => {
          this.versionData.forEach((item) => {
            this.$http
              .post(
                "/api/labVerValue?itemId=" +
                  colRes.data.data +
                  "&verId=" +
                  item.verId
              )
              .then((verRes) => {});
          });
          setTimeout(() => {
            success(this.$t("energy.xzcg"));
            this.getData();
            this.addDlg = false;
            done();
          }, 200);
        });
    },
    techAdd() {
      this.addActive = "three";
      this.techForm.rowNo = this.data.length + 1;
      this.techForm.salColoroid = this.colorId;
      this.addDlg = true;
    },
    techSave(row, done) {
      this.$http
        .post(
          "/api/labColorTechParam/v1.0/save?bathRatio=" +
            row.bathRatio +
            "&clothWeight=" +
            row.clothWeight +
            "&rowNo=" +
            row.rowNo +
            "&salColoroid=" +
            row.salColoroid +
            "&speed=" +
            row.speed +
            "&temperature=" +
            row.temperature +
            "&timeLeng=" +
            row.timeLeng
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.getData();
            success("新增成功！");
            this.addDlg = false;
          } else {
            error(this.$t("energy.xzsb") + res.data);
            this.loading = false;
          }
          done();
        })
        .catch((err) => {
          // console.log(err);
          error("服务器错误！");
          done();
        });
    },
    update() {
      this.isEditor = !this.isEditor;
      this.canSave = false;
    },
    save() {
      this.loading = true;
      let YesorNo = true;
      this.formulaAmountData.forEach((item) => {
        this.$http
          .put(
            "/api/labVerValue?formulaAmount=" +
              item.formulaAmount +
              "&itemId=" +
              item.itemId +
              "&verId=" +
              item.verId +
              "&verdataId=" +
              item.verdataId
          )
          .then((res) => {})
          .catch(() => {
            error("请输入正确格式");
            this.loading = false;
            YesorNo = false;
          });
      });
      this.verChangeData.forEach((item) => {
        this.$http
          .put(
            "/api/labDyecolorVer?verId=" + item.verId + "&verNo=" + item.verNo
          )
          .then((res) => {})
          .catch(() => {
            error("请输入正确格式");
            this.loading = false;
            YesorNo = false;
          });
      });
      this.rhlChangeData.forEach((item) => {
        this.$http
          .put(
            "/api/labDyeColorItem?itemId=" +
              item.itemId +
              "&chemicalName=" +
              item.chemicalName
          )
          .then((res) => {
            // console.log(res);
          })
          .catch(() => {
            error("请输入正确格式");
            this.loading = false;
            YesorNo = false;
          });
      });
      this.techChangeData.forEach((item, index) => {
        let data = {
          temperature: this.versionData[0].children[item - 1].value,
          timeLeng: this.versionData[1].children[item - 1].value,
          bathRatio: this.versionData[2].children[item - 1].value,
          clothWeight: this.versionData[3].children[item - 1].value,
          techId: this.versionData[0].children[item - 1].id,
        };
        this.$http
          .put(
            "/api/labColorTechParam/v1.0/updateById?techId=" +
              data.techId +
              "&timeLeng=" +
              data.timeLeng +
              "&bathRatio=" +
              data.bathRatio +
              "&clothWeight=" +
              data.clothWeight +
              "&temperature=" +
              data.temperature
          )
          .then((res) => {})
          .catch(() => {
            error("请输入正确格式");
            this.loading = false;
            YesorNo = false;
          });
      });
      if (this.pihao.isChange == true) {
        // 更新批号信息
        this.$http
          .post(
            "/api/labBigcargoSchedule?schId=" +
              this.pihao.schId +
              "&clothLotCode=" +
              this.pihao.clothLotCode +
              "&yarnLotCode=" +
              this.pihao.yarnLotCode
          )
          .then((res) => {});
      }
      this.batchChange.forEach((item) => {
        let api = "";
        if (item.itemBatchId) {
          api =
            "/api/labDyeMaterItemBatch/v1.0/savel?itemBatchId=" +
            item.itemBatchId +
            "&itemId=" +
            item.itemId +
            "&labSchId=" +
            this.linkData.schId +
            "&materBatchNumber=" +
            item.materBatchNumber;
        } else {
          api =
            "/api/labDyeMaterItemBatch/v1.0/savel?itemId=" +
            item.itemId +
            "&labSchId=" +
            this.linkData.schId +
            "&materBatchNumber=" +
            item.materBatchNumber;
        }
        this.$http.post(api).then((res) => {});
      });
      setTimeout(() => {
        if (YesorNo == true) {
          this.isEditor = !this.isEditor;
          this.delVerList = [];
          this.verNoList = [];
          this.rhlChangeData = [];
          this.getData();
          success(this.$t("energy.xgcg"));
        }
      }, 500);
    },
    del(val, label) {
      cofirm2(this.$t("energy.sfjx"), this, {})
        .then(() => {
          this.loading = true;
          if (label == "pfl") {
            this.$http
              .delete("/api/labDyecolorVer?verId=" + val.verId)
              .then((res) => {
                if (res.data.code == 200) {
                  this.delVerValue(val);
                } else {
                  error(this.$t("energy.scsb") + res.data);
                }
              })
              .catch((err) => {
                // console.log(err);
                error(this.$t("energy.scsbs"));
              });
          } else if (label == "rhl") {
            this.$http
              .delete("/api/labDyeColorItem?itemId=" + val.itemId)
              .then((res) => {
                if (res.data.code == 200) {
                  this.delLdVer(val);
                } else {
                  error(this.$t("energy.scsb") + res.data);
                }
              })
              .catch((err) => {
                // console.log(err);
                error(this.$t("energy.scsbs"));
              });
          } else if (label == "tech") {
            this.$http
              .delete("/api/labColorTechParam/v1.0/removeById?id=" + val.techId)
              .then((res) => {
                if (res.data.code == 200) {
                  this.getData();
                  success(this.$t("public.sccg"));
                } else {
                  error(this.$t("energy.scsb") + res.data);
                  this.loading = false;
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("energy.yqxsc"),
          });
        });
    },
    delVerValue(val) {
      let data = [];
      this.$http.get("/api/labVerValue?verId=" + val.verId).then((res) => {
        data = res.data;
        data.forEach((item) => {
          this.$http
            .delete("/api/labVerValue?verdataId=" + item.verdataId)
            .then((res) => {})
            .catch((err) => {
              // console.log(err);
            });
        });

        this.getData();
        success(this.$t("energy.sccg"));
      });
    },
    delLdVer(val) {
      this.$http.get("/api/labVerValue?itemId=" + val.itemId).then((res) => {
        res.data.forEach((item) => {
          this.$http
            .delete("/api/labVerValue?verdataId=" + item.verdataId)
            .then((res) => {});
        });
      });
      this.getData();
      success(this.$t("energy.sccg"));
    },
    cancel() {
      if (this.canSave == true) {
        this.getData();
      }
      this.isEditor = false;
      this.pihao.isChange = false;
    },
    scrollChange() {
      let dom1 = this.$refs.gdBox.$el;
      let dom2 = this.$refs.bTle;
      dom2.scrollTop = dom1.scrollTop;
    },
    iptChange(val, label) {
      this.canSave = true;
      if (label == "verChange") {
        if (this.verChangeData.length == 0) {
          this.verChangeData.push(val);
        } else {
          for (let index = 0; index < this.verChangeData.length; index++) {
            if (this.verChangeData[index].verId === val.verId) {
              break;
            }
            if (
              index == this.verChangeData.length - 1 &&
              this.verChangeData[index].verId != val.verId
            ) {
              this.verChangeData.push(val);
            }
          }
        }
      }
      if (label == "formulaAmount") {
        if (this.formulaAmountData.length == 0) {
          this.formulaAmountData.push(val);
        } else {
          for (let index = 0; index < this.formulaAmountData.length; index++) {
            if (this.formulaAmountData[index].verdataId === val.verdataId) {
              break;
            }
            if (
              index == this.formulaAmountData.length - 1 &&
              this.formulaAmountData[index].verdataId != val.verdataId
            ) {
              this.formulaAmountData.push(val);
            }
          }
        }
      }
      if (label == "bcCode") {
        if (this.rhlChangeData.length == 0) {
          this.rhlChangeData.push(val);
        } else {
          for (let index = 0; index < this.rhlChangeData.length; index++) {
            if (this.rhlChangeData[index].itemId === val.itemId) {
              break;
            }
            if (
              index == this.rhlChangeData.length - 1 &&
              this.rhlChangeData[index].itemId != val.itemId
            ) {
              this.rhlChangeData.push(val);
            }
          }
        }
      }
      if (label == "tech") {
        if (this.techChangeData.length == 0) {
          this.techChangeData.push(val.rowNo);
        } else {
          for (let index = 0; index < this.techChangeData.length; index++) {
            if (this.techChangeData[index] === val.rowNo) {
              break;
            }
            if (
              index == this.techChangeData.length - 1 &&
              this.techChangeData[index] != val.rowNo
            ) {
              this.techChangeData.push(val.rowNo);
            }
          }
        }
      }
      if (label == "pihao") {
        this.pihao.isChange = true;
      }
      if (label == "materBatchNumber") {
        if (this.batchChange.length == 0) {
          this.batchChange.push(val);
        } else {
          for (let index = 0; index < this.batchChange.length; index++) {
            if (this.batchChange[index].itemId === val.itemId) {
              break;
            }
            if (
              index == this.batchChange.length - 1 &&
              this.batchChange[index].itemId != val.itemId
            ) {
              this.batchChange.push(val);
            }
          }
        }
      }
    },
    ckVerNo(val) {
      if (val == "") {
        return;
      }
      for (let index = 0; index < this.verNoList.length; index++) {
        if (this.verNoList[index].value === val) {
          this.delVerList.push(this.verNoList[index]);
          this.verNoList.splice(index, 1);
        }
      }
      this.sortNum(this.verNoList, "value");
      this.sortNum(this.delVerList, "value");
    },
    clearVerNo(val) {
      for (let index = 0; index < this.delVerList.length; index++) {
        for (let indexs = 0; indexs < this.versionData.length; indexs++) {
          if (this.delVerList[index].value === this.versionData[indexs].verNo) {
            break;
          }
          if (
            indexs === this.versionData.length - 1 &&
            this.delVerList[index].value != this.versionData[indexs].verNo
          ) {
            this.verNoList.push(this.delVerList[index]);
            this.delVerList.splice(index, 1);
            break;
          }
        }
      }
      this.sortNum(this.verNoList, "value");
      this.sortNum(this.delVerList, "value");
    },
    mouseEnter(val) {
      if (val.verNo == "/") {
        return;
      }
      if (this.isEditor == false) {
        val.display = !val.display;
      }
    },
    mouseLeave(val) {
      if (val.verNo == "/") {
        return;
      }
      if (this.isEditor == false) {
        val.display = !val.display;
      }
    },
    //排序
    sortNum(arr, key) {
      return arr.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    //排序
    sortNum1(arr, key) {
      return arr.sort(function (a, b) {
        var x = Number(a[key]);
        var y = Number(b[key]);
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.loading = true;
    this.getData();
    let dom = this.$refs.gdBox.$el;
    dom.addEventListener("scroll", this.scrollChange, { touchmove: true });
  },
};
</script>


<style lang='stylus'>
#ArrangeSetLd {
  padding-bottom: 80px;

  .el-tab-pane {
    overflow: hidden !important;
  }

  .el-loading-mask {
    width: 99.5%;
  }

  .el-dialog__headerbtn {
    z-index: 99 !important;
  }

  .el-dialog__header {
    padding: 0 !important;
    height: 0 !important;
  }

  .lightHeight {
    background: #F5F7FA;
  }

  .handleDl {
    position: relative;
    width: 10%;
    height: 50px;
    top: -50px;
    float: right;
    margin-right: 10px;
    z-index: 2;
    // background: rgba(0, 0, 0, 0.6);
    // background: #409EFF;
    font-size: 20px;
    color: #409EFF;
    cursor: pointer;
    opacity: 0.8;
  }

  .handleDl1 {
    position: relative;
    width: 10%;
    height: 50px;
    line-height: 50px;
    float: right;
    margin-right: 10px;
    z-index: 2;
    // background: rgba(0, 0, 0, 0.6);
    // background: #409EFF;
    font-size: 20px;
    color: #409EFF;
    cursor: pointer;
    opacity: 0.8;
  }

  .techDiv {
    background: #E4E7ED !important;
    height: 52px;
  }

  .techDiv2 {
    width: 349px !important;
    font-weight: bold;
  }

  .addColor {
    text-align: left;
    position: sticky;
    bottom: 0;
    padding-left: 10px;
    background: #fff;
    height: 35px;
    line-height: 33px;
    border-top: 1px solid #ccc;
  }

  .box {
    overflow: auto;
    margin: 10px;
    background: #fff;
    border: 1px solid #ccc;
    letter-spacing: 2px;
  }

  .version {
    height: 51px;
    width: 121px;
    line-height: 50px;
    z-index: 99;
    float: left;
    border-left: 1px solid #ccc;
    font-size: 0.875rem;
    border-right: 1px solid #ccc;
    margin-left: -1px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .version1 {
    height: 51px;
    width: 121px;
    line-height: 50px;
    z-index: 99;
    float: left;
    border-left: 1px solid #ccc;
    font-size: 0.875rem;
    border-right: 1px solid #ccc;
    margin-left: -1px;
    border-bottom: 2px solid #26a7e0;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .boderTop {
    height: 103px;
    width: 348px;
    line-height: 50px;
    float: left;
    padding-right: 2px;

    .versionTle {
      position: absolute;
      background: #fff;
      z-index: 99;
      border-left: 1px solid #ccc;
      border-right: 2px solid #26a7e0;
      height: 103px;
      width: 350px;
      line-height: 102px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 2px solid #26a7e0;

      .versionType {
        border-left: 1px solid #ccc;
        width: 120px;

        div {
          width: 100%;
          line-height: 51px;
          float: none;
          border-top: 1px solid #ccc;
        }

        div:first-child {
          border: none;
        }
      }

      div {
        width: 50%;
        text-align: center;
        float: left;
        border: none;
      }
    }
  }

  .indexBox {
    height: 101px;
    width: 50px;
    line-height: 50px;
    float: left;

    .indexTle {
      position: absolute;
      z-index: 99;
      background: #fff;
      border-left: 1px solid #ccc;
      height: 103px;
      width: 50px;
      line-height: 103px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 2px solid #26a7e0;
      text-align: center;
    }
  }

  .bTle {
    position: absolute;
    z-index: 99;
    border-right: 1px solid #ccc;
    width: 401px;
    height: calc(100vh - 442px);
    overflow: hidden;
    float: left;
    scrollbar-width: none;
    border-right: 2px solid #26a7e0;
  }

  .Tle::-webkit-scrollbar { // 去除滚动条，但还能滚动
    display: none;
  }

  .bName {
    font-size: 16px;
    font-weight: bold;
    height: 51px;
    line-height: 50px;
    text-align: center;
    margin-left: 275px;
    border-bottom: 1px solid #ccc;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bName:last-child {
  }

  .bIndex {
    border-left: 1px solid #ccc;
    font-size: 16px;
    font-weight: bold;
    height: 51px;
    width: 49px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    float: left;
    background: #fff;
    text-align: center;
  }

  .LdData {
    height: 50px;
    width: 122px;
    line-height: 50px;
    float: left;

    .dataBox .tbValue:last-child {
      border-bottom: 1px solid #ccc;
    }

    .uninput {
      height: 51px;
      font-size: 15px;
      width: 99%;
      text-align: center;
    }
  }

  .el-input {
    margin-bottom: -1px !important;
  }

  .btnList {
    text-align: left;
    padding: 0px 10px;
  }

  .tbValue {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    font-size: 0.875rem;
    border-right: 1px solid #ccc;
    margin-left: -1px;
    overflow: hidden;
    height: 51px;
    text-align: center;
  }

  .tbValue:first-child {
    border-top: none;
  }

  .el-header {
    padding: 0px !important;
    height: 100px !important;
  }

  .el-main {
    padding: 0px !important;
    overflow: auto;
    border-bottom: 1px solid #ccc;
    margin-top: 5px;
  }

  .el-container {
    height: calc(100vh - 335px);
    border: 1px solid #ccc;
    border-bottom: none;
    margin: 0 -1px;
  }

  .el-input--mini .el-input__inner {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }

  .el-dialog__body {
    padding: 0 5px !important;
  }

  .avue-group__item {
    padding: 0 !important ant;
  }

  .el-form-item__label {
    font-size: 16px;
  }

  .el-input--mini input {
    width: 100% !important;
  }

  .el-dialog__headerbtn {
    z-index: 999;
  }

  .el-tabs__header {
    padding: 0px !important;
  }

  .el-dialog__body {
    .el-tabs__content {
      padding-top: 15px;
    }
  }

  .wlIndex {
    float: left;
    width: 98px;
    font-size: 16px;
    height: 51px;
    line-height: 50px;
    text-align: center;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.adddlg {
  .el-dialog__header {
    padding: 0px;
  }

  .el-input__inner {
    width: 100% !important;
  }
}

.el-select-dropdown__item {
  padding: 0 10px !important;

  .el-col {
    word-break: keep-all !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}
</style>