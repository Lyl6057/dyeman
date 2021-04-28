/* * @产能公式 * Created by Lyl * on 2019-11-9 17:50:43. */
<template>
  <div id="ProWorkflowPackage">
    <el-row>
      <el-col class="queryForm">
        <el-tabs
          type="border-card"
          v-loading="loading"
          :element-loading-text="$t('public.loading')"
        >
          <el-tab-pane :label="$t('energy.ybzlwh')">
            <div class="btnList">
              <el-button
                type="success"
                size="mini"
                @click="saveAll"
                :disabled="!detail.eneMeteroid"
                >{{ this.$t("public.save") }}</el-button
              >
              <el-button type="primary" size="mini" @click="addBtn">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" size="mini" @click="del">{{
                this.$t("public.del")
              }}</el-button>
              <el-button type="primary" size="mini" @click="resetTree">{{
                this.$t("public.query")
              }}</el-button>
              <el-button type="primary" @click="setType">{{
                $t("energy.xgyb")
              }}</el-button>
              <el-button type="primary" @click="setStaff">
                抄表人维护
              </el-button>
              <el-button type="primary" @click="print" :disabled="!detail.emId">
                列印
              </el-button>
              <!-- <el-button type="warning" size="mini" @click="close">{{
                this.$t("public.close")
              }}</el-button> -->
            </div>
            <div :span="24">
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div>
            <el-row class="content crudBox">
              <el-col :span="5">
                <view-container title="儀表">
                  <el-card>
                    <el-tree
                      ref="proTree"
                      style="margin-top: 2px; margin-left: 10px"
                      :data="gridData"
                      :props="defaultProps"
                      accordion
                      node-key="eneMeteroid"
                      :default-expanded-keys="defaultShowNodes"
                      @node-click="handleNodeClick"
                      @node-expand="handleNodeExpand"
                      @node-collapse="handleNodeCollapse"
                    >
                    </el-tree>
                  </el-card>
                </view-container>
              </el-col>
              <el-col :span="19">
                <view-container title="儀表詳細信息" style="margin-left: -1px">
                  <el-card style="height: calc(100vh - 190px)">
                    <avue-form
                      ref="ybForm"
                      style="margin-top: 10px"
                      :option="crudOp"
                      v-model="detail"
                    ></avue-form>

                    <!-- <div class="btnList" style="margin-top: 0px">
                      <el-button
                        :disabled="!detail.eneMeteroid"
                        type="primary"
                        size="mini"
                        @click="addEq"
                        >{{ this.$t("public.add") }}</el-button
                      >
                      <el-button
                        type="danger"
                        size="mini"
                        :disabled="Object.keys(chooseDataEq).length == 0"
                        @click="delEq"
                        >{{ this.$t("public.del") }}</el-button
                      >
                    </div> -->
                    <!-- <avue-crud
                      ref="crud"
                      v-loading="eqLoading"
                      :element-loading-text="$t('public.loading')"
                      :option="eqOp"
                      :data="eqData"
                      @current-row-change="cellClick"
                    ></avue-crud> -->
                  </el-card>
                </view-container>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="qrcode" ref="qrCodeUrl" id="qrCodeUrl"></div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <view-container title="新增儀表">
        <div class="btnList">
          <el-button type="success" @click="save">{{
            $t("public.save")
          }}</el-button>
          <el-button type="warning" @click="dialogVisible = false">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="dlgForm"
            :option="dlgFormOp"
            v-model="dlgForm"
          ></avue-form>
        </div>
      </view-container>
    </el-dialog>
    <el-dialog
      :visible.sync="otherV"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="otherV"
      id="viewDlg"
    >
      <view-container
        :title="otherTle"
        v-loading="otherL"
        :element-loading-text="$t('public.loading')"
      >
        <div class="btnList">
          <el-button type="success" @click="saveOther">
            {{ $t("public.save") }}</el-button
          >
          <el-button type="primary" @click="getOther">
            {{ $t("public.query") }}</el-button
          >
          <el-button type="warning" @click="otherV = false">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="queryForm"
            :option="queryFormOp"
            v-model="queryForm"
          ></avue-form>
        </div>
        <el-row>
          <el-col :span="10" v-if="otherV">
            <view-container :title="childrenTle">
              <div class="btnList">
                <!-- <el-button type="success" @click="saveOther">{{
                  $t("public.save")
                }}</el-button> -->
                <el-button type="primary" @click="addOther">{{
                  $t("public.add")
                }}</el-button>
                <el-button type="danger" @click="delOther">{{
                  $t("public.del")
                }}</el-button>
              </div>
              <div class="formBox"></div>
              <div class="crudBox">
                <avue-crud
                  id="other"
                  ref="other"
                  @on-load="getOther"
                  :data="otherC"
                  :page.sync="page"
                  :option="otherCop"
                  @current-row-change="cellOtherClick"
                ></avue-crud>
              </div>
            </view-container>
          </el-col>
          <el-col :span="14">
            <view-container
              :title="
                otherTle == '儀表類型維護'
                  ? '儀表區域維護'
                  : '抄錶人可抄儀表設定'
              "
              v-loading="otherL"
              :element-loading-text="$t('public.loading')"
            >
              <div class="btnList">
                <!-- <el-button type="success" @click="saveArea">{{
                  $t("public.save")
                }}</el-button> -->
                <el-button
                  type="primary"
                  :disabled="
                    !chooseOther.eneMeterTypeoid && !chooseOther.eneStaffoid
                  "
                  @click="addArea"
                  >{{ $t("public.add") }}</el-button
                >
                <el-button type="danger" @click="delArea">{{
                  $t("public.del")
                }}</el-button>
              </div>
              <div class="formBox"></div>
              <div class="crudBox">
                <avue-crud
                  id="Area"
                  ref="Area"
                  :data="areaData"
                  :option="areaOp"
                  @current-row-change="cellAreaClick"
                ></avue-crud>
              </div> </view-container
          ></el-col>
        </el-row>
      </view-container>
    </el-dialog>
  </div>
</template>

<script>
import {
  get,
  add,
  del,
  update,
  addEq,
  updateEq,
  delEq,
  getType,
  addType,
  delType,
  updateType,
  getArea,
  addArea,
  updateArea,
  delArea,
  getStaff,
  addStaff,
  updateStaff,
  delStaff,
  getMStaff,
  addMStaff,
  updateMStaff,
  delMStaff,
  getTypePage,
  getStaffPage,
} from "./api";
import {
  formOp,
  ybOp,
  timeOp,
  typeOp,
  staffOp,
  AreaOp,
  staff2Op,
} from "./data";
import QRCode from "qrcodejs2";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      isAdd: false, //判断是新增还是编辑
      gridData: [],
      data: [],
      crudOp: ybOp(this),
      form: {},
      formOption: formOp(this),
      dlgFormOp: ybOp(this),
      dlgForm: {},
      eqOp: timeOp(this),
      eqData: [],
      testData: [],
      rowCode: [], //勾选选中的ID
      rowDate: {},
      checkData: {},
      oldData: {},
      loading: false,
      defaultProps: {
        children: "children",
        label: "emName",
      },
      detail: {},
      defaultShowNodes: [], // 这里存放要默认展开的节点 id
      dialogVisible: false,
      chooseData: {},
      chooseDataEq: {},
      otherV: false,
      otherC: [],
      otherCop: typeOp(this),
      otherTle: "儀表類型維護",
      func: {},
      otherL: false,
      areaList: getDicT("eneMeterTypeArea", "areaName", "eneMeterTypeFk"),
      chooseOther: {},
      areaOp: AreaOp(this),
      areaData: [],
      chooseArea: {},
      eqLoading: false,
      queryFormOp: {},
      queryForm: {},
      emTypeList: [],
    };
  },
  methods: {
    resetTree() {
      this.loading = true;
      for (var key in this.detail) {
        this.detail[key] = "";
      }
      this.chooseData = {};
      this.chooseDataEq = {};
      this.eqData = [];
      if (this.form.yblx) {
        // 获取仪表类型下的总表树状图
        this.$http.get("/api/eneMeter?emType=" + this.form.yblx).then((res) => {
          this.gridData = this.toTree(res.data);
          getType({ typeCode: this.form.yblx }).then((res) => {
            getArea({
              eneMeterTypeFk: res.data[0].eneMeterTypeoid,
            }).then((ares) => {
              if (ares.data.length > 0) {
                let data = [];
                ares.data.forEach((item) => {
                  data.push({
                    label: item.areaName,
                    value: item.eneMeterTypeAreaoid,
                  });
                });
                this.crudOp.column[9].dicData = data;
                this.dlgFormOp.column[9].dicData = data;
              } else {
                this.dlgFormOp.column[9].dicData = [];
                this.crudOp.column[9].dicData = [];
                // this.$nextTick(() => {
                //   this.dlgFormOp.column[9].dicData = [];
                //   this.crudOp.column[9].dicData = [];
                // });
              }
            });
          });
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
      } else {
        this.gridData = [];
        this.loading = false;
      }
    },
    print() {
      this.loading = true;
      document.getElementById("qrCodeUrl").innerHTML = "";
      this.qrcode();
    },
    getEq() {
      this.eqData = [];
      this.eqLoading = true;
      getMStaff({ eneMeterFk: this.detail.eneMeteroid }).then((res) => {
        this.eqData = res.data;
        this.eqData.forEach((item) => {
          item.$cellEdit = true;
        });
        setTimeout(() => {
          this.eqLoading = false;
        }, 200);
        if (this.eqData.length > 0) {
          this.$refs.crud.setCurrentRow(this.eqData[0]);
        }
        this.loading = false;
      });
    },
    getMan() {
      getStaff().then((res) => {
        this.eqOp.column[0].dicData = res.data;
      });
    },
    addEq() {
      this.eqData.push({
        index: this.eqData.length + 1,
        startDate: this.$getNowTime("datetime"),
        // startTime: this.$getNowTime("datetime"),
        // endTime: this.$getNowTime("datetime"),
        $cellEdit: true,
      });
      this.$refs.crud.setCurrentRow(this.eqData[0]);
    },
    save() {
      this.$refs.dlgForm.validate((valid, done) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.dlgForm));
          data.emPrice = 1;
          if (data.eneMeteroid) {
            update(data)
              .then((res) => {
                this.$tip.success(this.$t("public.bccg"));
                setTimeout(() => {
                  this.resetTree();
                  this.dlgForm = {};
                  this.dialogVisible = false;
                }, 200);
              })
              .catch((err) => {
                this.$tip.error("编号已存在");
              });
          } else {
            data.emType = this.form.yblx;
            // data.emMan = "admin"; // parent.useId
            data.emParentoid = this.detail.eneMeteroid;
            for (let key in data) {
              if (data[key] === "") {
                delete data[key];
              }
            }
            add(data)
              .then((res) => {
                this.detail.eneMeteroid = res.data.data;
                this.$tip.success(this.$t("public.bccg"));
                setTimeout(() => {
                  this.resetTree();
                  this.dialogVisible = false;
                }, 200);
              })
              .catch((err) => {
                this.$tip.error("编号已存在");
              });
          }
        } else {
          return false;
        }
        done();
      });
    },
    saveAll() {
      for (let i = 0; i < this.eqData.length; i++) {
        if (!this.eqData[i].eneMeterStaffFk || !this.eqData[i].startDate) {
          this.$tip.error("抄錶人/有效日期不能為空!");
          return;
        }
      }
      this.$refs.ybForm.validate((valid, done) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.detail));
          data.emPrice = Number(data.emPrice);
          data.children = "";
          update(data).then((res) => {
            this.$tip.success(this.$t("public.bccg"));
          });
          this.eqData.forEach((item) => {
            if (item.eneMeterStaffoid) {
              updateMStaff(item).then((res) => {});
            } else {
              item.eneMeterFk = this.detail.eneMeteroid;
              addMStaff(item).then((res) => {
                item.eneMeterStaffoid = res.data.data;
              });
            }
          });
          setTimeout(() => {
            this.resetTree();
            this.dialogVisible = false;
          }, 200);
        } else {
          return false;
        }
        done();
      });
    },
    addBtn() {
      // if (this.chooseData.emParentoid && this.chooseData.eneMeteroid) {
      if (this.form.yblx) {
        this.dlgForm.emMulti = 1;
        this.dlgForm.emIsvalid = false;
        this.dialogVisible = true;
      } else {
        this.$tip.error("請選擇儀表類型!");
      }
      // }
    },
    setType() {
      this.otherTle = "儀表類型維護";
      this.childrenTle = "儀表類型";
      this.func = {
        get: getTypePage,
        add: addType,
        update: updateType,
        del: delType,
        getDtl: getArea,
        addDtl: addArea,
        updateDtl: updateArea,
        delDtl: delArea,
      };
      this.otherCop = typeOp(this);
      this.queryFormOp = typeOp(this);
      this.areaOp = AreaOp(this); // 字表
      this.getOther();
      this.otherV = true;
    },
    setStaff() {
      this.otherTle = "抄錶人維護";
      this.childrenTle = "抄錶人";
      this.func = {
        get: getStaffPage,
        add: addStaff,
        update: updateStaff,
        del: delStaff,
        getDtl: getMStaff,
        addDtl: addMStaff,
        updateDtl: updateMStaff,
        delDtl: delMStaff,
      };
      this.otherCop = staffOp(this);
      this.queryFormOp = staff2Op(this);
      this.areaOp = timeOp(this); // 字表
      get().then((res) => {
        this.areaOp.column[1].dicData = res.data;
        this.areaOp.column[0].dicData = res.data;
        console.log(res.data);
        this.getOther();
        this.otherV = true;
      });
    },
    getOther() {
      // this.otherL = true;
      this.areaData = [];
      for (let key in this.queryForm) {
        if (this.queryForm[key] == "") {
          delete this.queryForm[key];
        }
      }
      this.func
        .get(
          Object.assign(this.queryForm, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          this.otherC = res.data.records;
          this.page.total = res.data.total;
          this.otherC.forEach((item) => {
            item.$cellEdit = true;
          });
          if (this.otherTle === "儀表類型維護") {
            this.otherC.sort((a, b) => {
              return a.typeCode - b.typeCode;
            });
          }
          if (this.otherTle === "抄錶人維護") {
            this.otherC.sort((a, b) => {
              return a.staffId - b.staffId;
            });
          }
          if (this.otherC.length > 0) {
            this.$refs.other.setCurrentRow(this.otherC[0]);
          }
          // setTimeout(() => {
          // this.otherL = false;
          // }, 200);
        });
    },
    getArea() {
      getType().then((i) => {
        let data = [];
        i.data.forEach((items) => {
          data.push({
            value: items.typeCode,
            label: items.typeName,
          });
        });
        this.formOption.column[0].dicData = data;
      });
      this.resetTree();
    },
    saveOther() {
      for (let i = 0; i < this.otherC.length; i++) {
        if (
          this.otherTle === "儀表類型維護" &&
          (!this.otherC[i].typeCode || !this.otherC[i].typeName)
        ) {
          this.$tip.error("編號/名稱不能為空!");
          return;
        }
        if (
          this.otherTle === "抄錶人維護" &&
          (!this.otherC[i].staffId ||
            !this.otherC[i].staffName ||
            !this.otherC[i].equAccount ||
            !this.otherC[i].equPassword)
        ) {
          this.$tip.error("请补充抄表人信息!");
          return;
        }
        if (this.otherTle === "抄錶人維護") {
          for (let j = 0; j < this.otherC.length; j++) {
            if (
              this.otherC[i].equAccount == this.otherC[j].equAccount &&
              this.otherC[i].$index != this.otherC[j].$index
            ) {
              this.$tip.error("已存在此账号,请重新设置!");
              return;
            }
          }
        }
      }
      for (let i = 0; i < this.areaData.length; i++) {
        if (this.otherTle === "儀表類型維護" && !this.areaData[i].areaName) {
          this.$tip.error("归属区域不能為空!");
          return;
        }
        if (
          this.otherTle === "抄錶人維護" &&
          (!this.areaData[i].eneMeterFk ||
            !this.areaData[i].startDate ||
            !this.areaData[i].startTime ||
            !this.areaData[i].endTime)
        ) {
          this.$tip.error("请补充抄表人可抄錶設定信息!");
          return;
        }
      }
      this.otherL = true;
      this.otherC.forEach((item, index) => {
        if (item.eneMeterTypeoid || item.eneStaffoid) {
          this.func.update(item).then((res) => {});
        } else {
          //add
          this.func.add(item).then((res) => {
            item.eneMeterTypeoid = res.data.data;
            item.eneStaffoid = res.data.data;
          });
        }
        if (index == this.otherC.length - 1) {
          setTimeout(() => {
            // this.getOther();
            this.saveArea();
            // this.$tip.success(this.$t("public.bccg"));

            // this.otherL = false;
          }, 200);
        }
      });
      if (this.otherC.length == 0) {
        this.otherL = false;
      }
    },
    addOther() {
      this.otherC.push({
        typeCode: "",
        typeName: "",
        $cellEdit: true,
      });
      this.areaData = [];
      this.$refs.other.setCurrentRow(this.otherC[this.otherC.length - 1]);
      this.$nextTick(() => {
        this.$toTableLow(this, "other");
      });
    },
    delOther() {
      if (this.chooseOther.eneMeterTypeoid || this.chooseOther.eneStaffoid) {
        cofirm("是否确定删除選中的数据?", "提示", {})
          .then(() => {
            this.func
              .del(
                this.otherTle === "儀表類型維護"
                  ? this.chooseOther.eneMeterTypeoid
                  : this.chooseOther.eneStaffoid
              )
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.getOther();
                } else {
                  error(this.$t("public.scsb"));
                }
              })
              .catch((err) => {
                error("服务器错误");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (Object.keys(this.chooseOther).length > 0) {
        this.otherC.splice(this.chooseOther.$index, 1);
        if (this.otherC.length > 0) {
          this.$refs.other.setCurrentRow(this.otherC[0]);
        }
      }
    },
    saveArea() {
      this.areaData.forEach((item, index) => {
        if (item.eneMeterTypeAreaoid || item.eneMeterStaffoid) {
          // update
          this.func.updateDtl(item).then((res) => {});
        } else {
          //add
          item.eneMeterTypeFk = this.chooseOther.eneMeterTypeoid;
          item.eneMeterStaffFk = this.chooseOther.eneStaffoid;
          this.func.addDtl(item).then((res) => {
            item.eneMeterTypeAreaoid = res.data.data;
            item.eneMeterStaffoid = res.data.data;
          });
        }
        if (index == this.areaData.length - 1) {
          setTimeout(() => {
            this.getOther();
            this.$tip.success(this.$t("public.bccg"));
            this.getArea();
            this.getMan();
            this.otherL = false;
          }, 200);
        }
      });
      if (this.areaData.length == 0) {
        this.otherL = false;
      }
    },
    addArea() {
      this.areaData.push({
        $cellEdit: true,
        startDate: this.$getNowTime("datetime"),
        startTime: "",
        endTime: "",
      });
      this.$refs.Area.setCurrentRow(this.areaData[this.areaData.length - 1]);
      this.$nextTick(() => {
        this.$toTableLow(this, "Area");
      });
    },
    delArea() {
      if (
        this.chooseArea.eneMeterTypeAreaoid ||
        this.chooseArea.eneMeterStaffoid
      ) {
        cofirm("是否确定删除選中的数据?", "提示", {})
          .then(() => {
            this.func
              .delDtl(
                this.otherTle == "儀表類型維護"
                  ? this.chooseArea.eneMeterTypeAreaoid
                  : this.chooseArea.eneMeterStaffoid
              )
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.cellOtherClick(this.chooseOther);
                } else {
                  error(this.$t("public.scsb"));
                }
              })
              .catch((err) => {
                error("服务器错误");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (Object.keys(this.chooseArea).length > 0) {
        this.areaData.splice(this.chooseArea.$index, 1);
        if (this.areaData.length > 0) {
          this.$refs.Area.setCurrentRow(this.areaData[0]);
        }
      }
    },
    cellOtherClick(val) {
      this.chooseOther = val;
      if (val.eneMeterTypeoid || val.eneStaffoid) {
        this.func
          .getDtl({
            eneMeterTypeFk: val.eneMeterTypeoid,
            eneMeterStaffFk: val.eneStaffoid,
          })
          .then((res) => {
            this.areaData = res.data;
            this.areaData.forEach((item) => {
              item.$cellEdit = true;
              item.emId = item.eneMeterFk;
            });
            if (this.areaData.length > 0) {
              this.$refs.Area.setCurrentRow(this.areaData[0]);
            }
          });
      }
    },
    cellAreaClick(val) {
      this.chooseArea = val;
    },
    qrcode(e, n) {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.detail.emId, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      setTimeout(() => {
        let win = window.open("", "列印");
        let newstr = document.getElementById("qrCodeUrl").innerHTML;
        // console.log(newstr);
        win.document.write("<html><head><title></title>");
        win.document.write("</head><body >");
        win.document.write(`<style> img{
          position: absolute; left: 50%; top: 50%; margin: -50px 0 0 -50px
        } </style>`);
        win.document.write(newstr);
        win.document.write("</body></html>");
        win.print();
        document.getElementById("qrCodeUrl").innerHTML = "";
        this.loading = false;
      }, 500);
    },
    //删除
    del() {
      if (this.detail.children && this.detail.children.length > 0) {
        this.$tip.error("请先删除子节点!");
        return;
      }
      if (this.detail.eneMeteroid) {
        cofirm(
          "是否确定删除儀表名称为【 " + this.detail.emName + " 】的数据?",
          "提示",
          {}
        )
          .then(() => {
            this.loading = true;
            del(this.chooseData.eneMeteroid)
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.resetTree();
                } else {
                  error(this.$t("public.scsb"));
                }
              })
              .catch((err) => {
                error("服务器错误");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        error("請選擇要刪除的數據!");
      }
    },
    delEq() {
      if (!this.chooseDataEq.eneMeterStaffoid) {
        this.eqData.splice(this.chooseDataEq.$index, 1);
        // this.getEq();
        return;
      }
      cofirm("是否确定删除选中的数据?", "提示", {})
        .then(() => {
          this.loading = true;
          delMStaff(this.chooseDataEq.eneMeterStaffoid)
            .then((res) => {
              if (res.data.code == 200) {
                success(res.data.msg);
                // this.getEq();
              } else {
                error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              error("服务器错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cellClick(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.chooseDataEq = val;
    },
    handleNodeClick(val) {
      // this.loading = true;
      for (var key in this.detail) {
        delete this.detail[key];
      }
      this.chooseData = val;
      this.detail = val;
      // this.getEq();
    },
    // 树节点展开
    handleNodeExpand(data) {
      // 保存当前展开的节点
      let flag = false;
      this.defaultShowNodes.some((item) => {
        if (item === data.eneMeteroid) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true;
          return true;
        }
      });
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.eneMeteroid);
      }
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.eneMeteroid) {
          // 删除关闭节点
          this.defaultShowNodes.length = i;
        }
      });
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    // 数组转树状图函数
    toTree(arr) {
      let oData = {};
      let result = [];
      arr.forEach((item) => {
        oData[item.eneMeteroid] = item;
      });
      arr.forEach((item) => {
        let parent = oData[item.emParentoid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
  },
  mounted() {},
  created() {
    // this.handleList();
    // this.$http.post("/api/baseEquipmentList").then((res) => {
    //   let data = [];
    //   res.data.forEach((item, index) => {
    //     data.push({
    //       label: item.equipmentName,
    //       value: item.equipmentCode,
    //     });
    //   });
    //   this.crudOp.column[11].dicData = this.$unique(data, "value");
    //   this.dlgFormOp.column[11].dicData = this.$unique(data, "value");
    // });
    this.getMan();
  },
};
</script>

<style lang="stylus">
#viewDlg {
  .el-date-editor input {
    text-align: center !important;
  }
}

#ProWorkflowPackage {
  .el-table__row--level-1 {
    text-indent: 1em;
  }

  .qrcode {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px 0 0 -50px;
  }

  .el-date-editor input {
    text-align: center !important;
  }

  .el-table__row--level-2 {
    text-indent: 1.5em;
  }

  .content {
    .el-tree {
      height: calc(100vh - 192px) !important;
      overflow: auto;
    }
  }

  .right-menu {
    font-size: 14px;
    position: fixed;
    background: #fff;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    z-index: 999;
    display: none;
  }

  .right-menu a {
    width: 150px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    color: #1a1a1a;
  }

  .right-menu a:hover {
    background: #eee;
    color: #fff;
  }

  .right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }

  a {
    text-decoration: none;
  }

  .right-menu a {
    padding: 2px;
  }

  .right-menu a:hover {
    background: #99A9BF;
  }
}
</style>
