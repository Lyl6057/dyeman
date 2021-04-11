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
              <el-button type="primary" @click="print"> 列印 </el-button>
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
                  <el-card>
                    <avue-form
                      ref="ybForm"
                      style="margin-top: 10px"
                      :option="crudOp"
                      v-model="detail"
                    ></avue-form>

                    <div class="btnList" style="margin-top: 0px">
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
                    </div>
                    <avue-crud
                      ref="crud"
                      :option="eqOp"
                      :data="eqData"
                      @current-row-change="cellClick"
                    ></avue-crud>
                  </el-card>
                </view-container>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
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
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="otherV"
    >
      <view-container
        :title="otherTle"
        v-loading="otherL"
        :element-loading-text="$t('public.loading')"
      >
        <div class="btnList">
          <el-button type="success" @click="saveOther">{{
            $t("public.save")
          }}</el-button>
          <el-button type="primary" @click="addOther">{{
            $t("public.add")
          }}</el-button>
          <el-button
            type="danger"
            :disabled="!chooseOther.eneMeterTypeoid && !chooseOther.eneStaffoid"
            @click="delOther"
            >{{ $t("public.del") }}</el-button
          >
        </div>
        <div class="formBox"></div>
        <div class="crudBox">
          <avue-crud
            ref="other"
            :data="otherC"
            :option="otherCop"
            @current-row-change="cellOtherClick"
          ></avue-crud>
        </div>
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
} from "./api";
import { formOp, ybOp, timeOp, typeOp, staffOp } from "./data";
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
    };
  },
  methods: {
    //查询
    handleList() {
      this.loading = true;
      this.detail = {};
      this.chooseData = {};
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      for (var key in this.detail) {
        delete this.detail[key];
      }
      get(this.form)
        .then((res) => {
          this.gridData = res.data;
          this.gridData.forEach((item, index) => {
            item.label = `[${item.packageCode}]  ${item.packageName}`;
            item.baseWorkPackageStepInfoList.forEach((items, indexs) => {
              items.packageCode = item.packageCode;
              items.packageName = item.packageName;
              items.packageIds = item.packageId;
              items.label = items.baseWorkStep.stepName;
            });
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          error("服务器错误" + err);
        });
    },
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
      this.qrcode(e, n);
    },
    getEq() {
      this.eqData = [];
      getMStaff({ eneMeterFk: this.detail.eneMeteroid }).then((res) => {
        this.eqData = res.data;
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
          data.emPrice = Number(data.emPrice);
          if (data.eneMeteroid) {
            update(data).then((res) => {
              this.$tip.success(this.$t("public.bccg"));
            });
            setTimeout(() => {
              this.resetTree();
              this.dialogVisible = false;
            }, 200);
          } else {
            data.emType = this.form.yblx;
            data.emMan = "admin"; // parent.useId
            data.emParentoid = this.detail.eneMeteroid;
            add(data).then((res) => {
              this.detail.eneMeteroid = res.data.data;
              this.$tip.success(this.$t("public.bccg"));
            });
            setTimeout(() => {
              this.resetTree();
              this.dialogVisible = false;
            }, 200);
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
        this.dialogVisible = true;
      } else {
        this.$tip.error("請選擇儀表類型!");
      }
      // }
    },
    setType() {
      this.otherTle = "儀表類型維護";
      this.func = {
        get: getType,
        add: addType,
        update: updateType,
        del: delType,
      };
      this.otherCop = typeOp(this);
      this.getOther();
      this.otherV = true;
    },
    setStaff() {
      this.otherTle = "抄錶人維護";
      this.func = {
        get: getStaff,
        add: addStaff,
        update: updateStaff,
        del: delStaff,
      };
      this.otherCop = staffOp(this);
      this.getOther();
      this.otherV = true;
    },
    getOther() {
      this.otherL = true;
      this.func.get().then((res) => {
        this.otherC = res.data;
        this.otherC.forEach((item) => {
          item.$cellEdit = true;
          this.areaList.forEach((area, i) => {
            if (area.value == item.eneMeterTypeoid) {
              item.areaName = area.label;
            }
          });
          // item.areaName = data.
        });
        if (this.otherC.length > 0) {
          this.$refs.other.setCurrentRow(this.otherC[0]);
        }
        setTimeout(() => {
          this.otherL = false;
        }, 200);
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
      this.areaList = [];
      getArea().then((i) => {
        i.data.forEach((items) => {
          this.areaList.push({
            value: items.eneMeterTypeFk,
            label: items.areaName,
          });
        });
      });
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
      }
      this.otherL = true;
      this.otherC.forEach((item, index) => {
        if (item.eneMeterTypeoid || item.eneStaffoid) {
          // update
          this.func.update(item).then((res) => {
            if (this.otherTle === "儀表類型維護" && item.areaName) {
              // 判斷是否存在 區域數據
              getArea({ eneMeterTypeFk: item.eneMeterTypeoid }).then((res) => {
                if (res.data.length > 0) {
                  // 存在區域數據,更新數據
                  res.data[0].areaName = item.areaName;
                  updateArea(res.data[0]).then((area) => {});
                } else {
                  // 不存在,新增數據
                  addArea({
                    areaName: item.areaName,
                    eneMeterTypeFk: item.eneMeterTypeoid,
                  }).then((area) => {});
                }
              });
            }
          });
        } else {
          //add
          this.func.add(item).then((res) => {
            item.eneMeterTypeoid = res.data.data;
            if (this.otherTle === "儀表類型維護" && item.areaName) {
              addArea({
                areaName: item.areaName,
                eneMeterTypeFk: item.eneMeterTypeoid,
              }).then((area) => {});
            }
          });
        }
        if (index == this.otherC.length - 1) {
          setTimeout(() => {
            // this.getOther();
            this.$tip.success(this.$t("public.bccg"));
            this.getArea();
            this.otherL = false;
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
      } else {
        error("請選擇要刪除的數據!");
      }
    },
    cellOtherClick(val) {
      this.chooseOther = val;
    },
    qrcode(e, n) {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: "https://pre.zhiyedang.cn/a?=" + e + "&" + n, // 生成二维码的链接
      });
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
      if (!this.chooseDataEq.eneMeterEquoid) {
        this.eqData = [];
        return;
      }
      cofirm(
        "是否确定删除儀表設備为【 " + this.chooseDataEq.$equId + " 】的数据?",
        "提示",
        {}
      )
        .then(() => {
          this.loading = true;
          delEq(this.chooseDataEq.eneMeterEquoid)
            .then((res) => {
              if (res.data.code == 200) {
                success(res.data.msg);
                this.getEq();
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
      this.getEq();
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
    this.$http.post("/api/baseEquipmentList").then((res) => {
      let data = [];
      res.data.forEach((item, index) => {
        data.push({
          label: item.equipmentName,
          value: item.equipmentCode,
        });
      });
      this.crudOp.column[11].dicData = this.$unique(data, "value");
    });
    this.getMan();
  },
};
</script>

<style lang="stylus">
#ProWorkflowPackage {
  .el-table__row--level-1 {
    text-indent: 1em;
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
