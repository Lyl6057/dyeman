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
                :disabled="Object.keys(detail).length === 0"
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
              <!-- <el-button type="warning" size="mini" @click="close">{{
                this.$t("public.close")
              }}</el-button> -->
            </div>
            <div :span="24">
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div>
            <el-row class="content crudBox">
              <el-col :span="5">
                <view-container title="儀表位置">
                  <el-card>
                    <el-tree
                      ref="proTree"
                      style="margin-top: 2px; margin-left: 10px"
                      :data="gridData"
                      :props="defaultProps"
                      accordion
                      node-key="eneMeterEquoid"
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
                        :disabled="Object.keys(detail).length == 0"
                        type="primary"
                        size="mini"
                        @click="addEq"
                        >{{ this.$t("public.add") }}</el-button
                      >
                      <el-button
                        type="danger"
                        size="mini"
                        :disabled="Object.keys(chooseDataEq).length == 0"
                        @click="del"
                        >{{ this.$t("public.del") }}</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="handleList"
                        >{{ this.$t("public.query") }}</el-button
                      >
                    </div>
                    <avue-crud
                      ref="crud"
                      :option="eqOp"
                      :data="eqData"
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
  </div>
</template>

<script>
import {
  get,
  add,
  del,
  update,
  getStep,
  addPackageStep,
  delStepPackage,
} from "./api";
import { formOp, ybOp, eqOp } from "./data";
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
      eqOp: eqOp(this),
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
      this.detail = {};
      this.chooseData = {};
      if (this.form.yblx) {
        // 获取仪表类型下的总表树状图
        this.$http
          .post("/api/eneMeterList?emType=" + this.form.yblx)
          .then((res) => {
            this.gridData = this.toTree(res.data);
            setTimeout(() => {
              this.loading = false;
            }, 200);
          });
      } else {
        this.gridData = [];
        this.loading = false;
      }
    },
    getEq() {
      this.$http
        .get("/api/eneMeter?eneMeterEquoid=" + this.detail.eneMeterEquoid)
        .then((res) => {
          if (res.data.length != 0) {
            this.eqData = res.data[0].eneQueVos;
            this.$nextTick(() => {
              this.eqData.forEach((item, i) => {
                if (item.equName === null) {
                  item.equName = "";
                }
                item.$cellEdit = true;
                item.index = i + 1;
              });
              if (this.eqData.length > 0) {
                this.$refs.crud.setCurrentRow(this.eqData[0]);
              }
            });
          }
          this.loading = false;
        });
    },
    addEq() {},
    save() {
      this.$refs.dlgForm.validate((valid, done) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.dlgForm));
          data.emPrice = Number(data.emPrice);
          if (data.eneMeterEquoid) {
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
            data.emParentoid = this.detail.eneMeterEquoid;
            add(data).then((res) => {
              this.detail.eneMeterEquoid = res.data.data;
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
      this.$refs.ybForm.validate((valid, done) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.detail));
          data.emPrice = Number(data.emPrice);
          data.children = "";
          update(data).then((res) => {
            this.$tip.success(this.$t("public.bccg"));
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
      // if (this.chooseData.emParentoid && this.chooseData.eneMeterEquoid) {
      if (this.form.yblx) {
        this.dialogVisible = true;
      } else {
        this.$tip.error("請選擇儀表類型!");
      }

      // }
    },
    //删除
    del() {
      if (this.detail.children && this.detail.children.length > 0) {
        this.$tip.error("请先删除子节点!");
        return;
      }
      if (this.detail.eneMeterEquoid) {
        cofirm(
          "是否确定删除儀表名称为【 " + this.detail.emName + " 】的数据?",
          "提示",
          {}
        )
          .then(() => {
            this.loading = true;
            del(this.chooseData.eneMeterEquoid)
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
    handleNodeClick(val) {
      this.loading = true;
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
        if (item === data.eneMeterEquoid) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true;
          return true;
        }
      });
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.eneMeterEquoid);
      }
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.eneMeterEquoid) {
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
        oData[item.eneMeterEquoid] = item;
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
      this.eqOp.column[1].dicData = this.$unique(data, "value");
    });
  },
};
</script>

<style lang="stylus">
#ProWorkflowPackage {
  .el-table__row--level-1 {
    text-indent: 1em;
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
