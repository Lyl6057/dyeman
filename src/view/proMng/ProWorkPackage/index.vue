/* * @产能公式 * Created by Lyl * on 2019-11-9 17:50:43. */
<template>
  <div id="ProWorkflowPackage">
    <el-row>
      <el-col class="queryForm">
        <el-tabs type="border-card" v-loading="loading">
          <el-tab-pane label="生产工作包">
            <div class="btnList">
              <el-button
                type="success"
                size="mini"
                @click="edit"
                :disabled="!chooseData.packageId"
                >{{ this.$t("public.update") }}</el-button
              >
              <el-button type="primary" size="mini" @click="addBtn">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" size="mini" @click="del">{{
                this.$t("public.del")
              }}</el-button>
              <el-button type="primary" size="mini" @click="handleList">{{
                this.$t("public.query")
              }}</el-button>
              <!-- <el-button type="warning" size="mini" @click="close">{{
                this.$t("public.close")
              }}</el-button> -->
            </div>
            <div :span="24">
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div>

            <el-row class="content">
              <el-col :span="6" class="empty-tab">
                <el-tabs v-model="tab" type="border-card">
                  <el-tab-pane label="染整流程" name="dye"></el-tab-pane>
                  <el-tab-pane label="织造流程" name="weave"></el-tab-pane>
                  <el-tab-pane label="印花流程" name="printing"></el-tab-pane>
                </el-tabs>
                <el-card>
                  <el-tree
                    ref="proTree"
                    style="margin-top: 2px; margin-left: 10px"
                    :data="gridData"
                    :props="defaultProps"
                    accordion
                    node-key="packageId"
                    :default-expanded-keys="defaultShowNodes"
                    @node-click="handleNodeClick"
                    @node-expand="handleNodeExpand"
                    @node-collapse="handleNodeCollapse"
                  >
                  </el-tree>
                </el-card>
              </el-col>
              <el-col :span="18">
                <view-container title="生产工序明细" style="margin-left: 5px">
                  <el-card>
                    <el-checkbox-group v-model="check">
                      <el-checkbox
                        v-for="item of stepList"
                        :key="item.stepId"
                        :label="item.stepName"
                        :name="item.stepName"
                      ></el-checkbox>
                    </el-checkbox-group>

                    <!--  <avue-form
                      style="margin-top: 10px"
                      :option="crudOp"
                      v-model="detail"
                    ></avue-form>-->
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
      <view-container :title="addTle">
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
var eqType = [];

import {
  get,
  add,
  del,
  update,
  getStep,
  addPackageStep,
  delStepPackage,
} from "./api";
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
      gridOption: {
        menuAlign: "center",
        menuWidth: 100, //最小值
        labelWidth: 110,
        dialogHeight: 150,
        delBtn: false,
        addBtn: false,
        menu: false,
        border: true,
        editBtn: true,
        height: "calc(100vh - 210px)",
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        cellBtn: false,
        selection: false,
        highlightCurrentRow: true,
        column: [
          {
            prop: "index",
            label: "#",
            width: 60,
            align: "center",
          },
          {
            // 关键词
            label: this.$t("ProWorkflowInfo.gjc"),
            prop: "keyCode",
            // type: "select",
            // dicData: getDicT("basProductionDtlcList","procedureName","procedureId"),
            width: 100,
            // change: row => {
            //   this.rowDate.keyName = row.value;
            //   console.log(row);
            // },
            disabled: true,
          },
          // {
          //   // 关键词
          //   label: this.$t("ProWorkflowInfo.gjcmc"),
          //   prop: "keyName",
          //   cell: true
          // },
          {
            // 工序名称
            label: this.$t("ProWorkflowInfo.gxmc"),
            prop: "keyName",
            type: "select",
            cell: true,
            dicData: getDicT(
              "basProductionDtlcList",
              "procedureName",
              "procedureId"
            ),
            width: 160,
          },
          {
            // 设备型号
            label: this.$t("ProWorkflowInfo.sbxh"),
            prop: "equModel",
            type: "select",
            dicData: postDicT(
              "baseEquipmentCategoryList",
              "categoryCode",
              "categoryId"
            ),
            cell: true,
            width: 200,
          },
          {
            // 公式
            label: this.$t("ProWorkflowInfo.gs"),
            prop: "formula",
            cell: true,
            width: 300,
          },

          {
            // 关键词描述
            label: this.$t("ProWorkflowInfo.gjcms"),
            prop: "keyDesc",
            cell: true,
            width: 220,
          },
        ],
      },
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 165px)",
        refreshBtn: false,
        columnBtn: false,
        page: false,
        tree: true,
        children: "nodes",
        rowKey: "stepCode",
        labelWidth: 120,
        column: [
          // {
          //   prop: "index",
          //   label: "#",
          //   width: 60,
          //   align: "center",
          // },
          {
            label: "工序编号",
            prop: "stepCode",
            width: 120,
            cell: true,
            placeholder: " ",
            span: 8,
            readonly: true,
          },
          {
            label: "工序名称",
            prop: "stepName",
            span: 8,
            cell: true,
            placeholder: " ",
            readonly: true,
          },
          {
            label: "序号",
            prop: "stepSn",
            span: 8,
            cell: true,
            placeholder: " ",
            readonly: true,
          },

          // {
          //   label: "工序层次",
          //   prop: "stepLevel",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },
          // {
          //   label: "工序输入",
          //   prop: "stepIn",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },
          // {
          //   label: "工序输出",
          //   prop: "stepOut",
          //   span: 8,
          //   width: 180,
          //   cell: true,
          //   placeholder: " ",
          // },

          {
            label: "产能计算公式",
            prop: "stepCapacity",
            span: 16,
            width: 180,
            cell: true,
            placeholder: " ",
            readonly: true,
          },
          {
            label: "工序布局",
            prop: "stepLayout",
            span: 8,
            width: 180,
            cell: true,
            placeholder: " ",
            readonly: true,
          },

          {
            label: "时间计算公式",
            prop: "standardFormula",
            span: 16,
            width: 180,
            cell: true,
            placeholder: " ",
            readonly: true,
          },
          {
            label: "是否瓶颈工序",
            prop: "stepConstraint",
            width: 120,
            span: 8,
            type: "switch",
            cell: true,
            placeholder: " ",
            readonly: true,
            disabled: true,
            dicData: [
              {
                label: "否",
                value: false,
              },
              {
                label: "是",
                value: true,
              },
            ],
          },
          {
            label: "描述信息",
            prop: "stepDescribe",
            span: 16,
            width: 250,
            cell: true,
            readonly: true,
            placeholder: " ",
          },
          {
            label: "是否里程碑",
            prop: "stepHsMilestone",
            width: 120,
            span: 8,
            type: "switch",
            cell: true,
            placeholder: " ",
            readonly: true,
            disabled: true,
            dicData: [
              {
                label: "否",
                value: false,
              },
              {
                label: "是",
                value: true,
              },
            ],
          },
        ],
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        card: false,
        menuBtn: false,
        labelWidth: 110,
        column: [
          {
            label: "工作包編號",
            prop: "packageCode",
            span: 6,
          },
          {
            label: "工作包名稱",
            prop: "packageName",
            span: 6,
          },
        ],
      },
      dlgFormOp: {},
      dlgOption: {
        submitBtn: false,
        emptyBtn: false,
        card: false,
        menuBtn: false,
        labelWidth: 110,
        column: [
          {
            label: "工作包編號",
            prop: "packageCode",
            span: 8,
            disabled: true,
            rules: [
              {
                required: true,
                message: "请输入工作包編號",
                trigger: "blur",
              },
            ],
          },
          {
            label: "工作包名稱",
            prop: "packageName",
            disabled: true,
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入工作包名稱",
                trigger: "blur",
              },
            ],
          },
          {
            label: "生產工序",
            prop: "stepId",
            span: 24,
            type: "tree",
            multiple: true,
            dicData: [],
            props: {
              label: "stepName",
              value: "stepId",
            },
            rules: [
              {
                required: true,
                message: "请選擇生產工序",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      dlgOp: {
        submitBtn: false,
        emptyBtn: false,
        card: false,
        menuBtn: false,
        labelWidth: 110,
        column: [
          {
            label: "工作包編號",
            prop: "packageCode",
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入工作包編號",
                trigger: "blur",
              },
            ],
          },
          {
            label: "工作包名稱",
            prop: "packageName",
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入工作包名稱",
                trigger: "blur",
              },
            ],
          },
          {
            label: "工作包類型",
            prop: "packageType",
            span: 8,
            type: "select",
            dicData: [
              {
                label: "染整",
                value: "dye",
              },
              {
                label: "织造",
                value: "weave",
              },
              {
                label: "印花",
                value: "printing",
              },
            ],
          },
          {
            label: "工作包描述",
            prop: "packageDesc",
            span: 24,
          },
        ],
      },
      testData: [],
      rowCode: [], //勾选选中的ID
      rowDate: {},
      checkData: {},
      oldData: {},
      loading: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      detail: {},
      defaultShowNodes: [], // 这里存放要默认展开的节点 id
      dialogVisible: false,
      dlgForm: {},
      chooseData: {},
      addTle: "新增工作包",
      tab: "dye",
      stepList: [],
      check: [],
    };
  },
  watch: {
    tab() {
      this.handleList();
    },
    check(n, o) {
      console.log(n, o);
    },
  },
  methods: {
    //查询
    handleList() {
      this.loading = true;
      this.detail = {};
      this.chooseData = {};
      this.gridData = [];
      this.check = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      for (var key in this.detail) {
        delete this.detail[key];
      }

      get(Object.assign(this.form), {
        packageType: this.tab,
      })
        .then((res) => {
          res.data.forEach((item) => {
            if (item.packageType == this.tab) {
              item.label = `[${item.packageCode}]  ${item.packageName}`;
              item.baseWorkPackageStepInfoList.forEach((items, indexs) => {
                // console.log(items.baseWorkStep.stepName);
                // this.check.push(items.baseWorkStep.stepName);
                items.packageCode = item.packageCode;
                items.packageName = item.packageName;
                items.packageIds = item.packageId;
                items.label = items.baseWorkStep.stepName;
              });
              this.gridData.push(item);
            }
          });
          this.getStepList();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          error("服务器错误" + err);
        });
    },
    save() {
      this.$refs.dlgForm.validate((valid, done) => {
        if (valid) {
          this.loading = true;
          let data = JSON.parse(JSON.stringify(this.dlgForm));
          if (data.stepId) {
            data.stepId.forEach((item, i) => {
              addPackageStep({
                packageId: data.packageId || data.packageIds,
                stepId: item,
              }).then((res) => {});
              if (i === data.stepId.length - 1) {
                this.$tip.success(this.$t("public.bccg"));
              }
            });
          } else {
            if (data.packageId) {
              data.baseWorkPackageStepInfoList = "";
              data.label = "";
              update(data)
                .then((res) => {
                  if (res.data.code === 200) {
                    this.$tip.success(this.$t("public.bccg"));
                  }
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            } else {
              add(data)
                .then((res) => {
                  if (res.data.code === 200) {
                    this.$tip.success(this.$t("public.bccg"));
                  }
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            }
          }
          setTimeout(() => {
            this.dialogVisible = false;
            this.handleList();
            // this.loading = false;
          }, 200);
        } else {
          return false;
        }
        done();
      });
    },
    addBtn() {
      // if (this.chooseData.packageId || this.chooseData.packageFk) {
      //   this.dlgForm = this.chooseData;
      //   this.dlgFormOp = this.dlgOption;
      //   this.addTle = "新增工序";
      //   this.dialogVisible = true;
      // } else {
      for (var key in this.dlgForm) {
        delete this.dlgForm[key];
      }
      this.dlgFormOp = this.dlgOp;
      this.addTle = "新增工作包";
      this.dlgForm.packageType = this.tab;
      this.dialogVisible = true;
      // }
    },
    edit() {
      this.dlgFormOp = this.dlgOp;
      this.dlgForm = this.chooseData;
      this.dialogVisible = true;
    },
    //删除
    del() {
      if (
        this.chooseData.baseWorkPackageStepInfoList &&
        this.chooseData.baseWorkPackageStepInfoList.length > 0
      ) {
        this.$tip.error("请先删除子节点!");
        return;
      }
      if (this.chooseData.refId) {
        cofirm(
          "是否确定删除工序名称为【 " + this.chooseData.label + " 】的数据?",
          "提示",
          {}
        )
          .then(() => {
            this.loading = true;
            delStepPackage(this.chooseData.refId)
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.handleList();
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
      } else if (this.chooseData.packageId) {
        cofirm(
          "是否确定删除工作包名称为【 " +
            this.chooseData.packageName +
            " 】的数据?",
          "提示",
          {}
        )
          .then(() => {
            this.loading = true;
            del(this.chooseData.packageId)
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.handleList();
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
    //双击编辑
    rowClick(row, column, cell, event) {
      this.$refs.crud.rowCell(row, row.$index);
    },
    handleNodeClick(val) {
      this.check = [];
      for (var key in this.detail) {
        delete this.detail[key];
      }
      this.chooseData = val;
      this.detail = val.baseWorkStep;
      val.baseWorkPackageStepInfoList.forEach((item, i) => {
        this.check.push(item.baseWorkStep.stepName);
      });
    },
    // 树节点展开
    handleNodeExpand(data) {
      // 保存当前展开的节点
      let flag = false;
      this.defaultShowNodes.some((item) => {
        if (item === data.packageId) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true;
          return true;
        }
      });
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.packageId);
      }
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.packageId) {
          // 删除关闭节点
          this.defaultShowNodes.length = i;
        }
      });
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    getStepList() {
      // console.log(this.gridData);
      getStep().then((res) => {
        this.stepList = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].stepName === "生产过程") {
            res.data[i].nodes.forEach((item, i) => {
              let type = "";
              switch (this.tab) {
                case "dye":
                  type = "染整中心";
                  break;
                case "weave":
                  type = "织造中心";
                  break;
                default:
                  type = "印花中心";
                  break;
              }
              if (item.stepName == type) {
                item.nodes.forEach((node, j) => {
                  node.checked = false;
                  this.stepList.push(node);
                });
              }
            });
            this.loading = false;
          }
        }
        this.dlgOption.column[2].dicData = this.stepList;
      });
    },
    test() {
      console.log(this.check);
    },
  },
  mounted() {},
  created() {
    this.handleList();
    // this.getStepList();
  },
};
</script>

<style lang="stylus">
#ProWorkflowPackage {
  .el-table__row--level-1 {
    text-indent: 1em;
  }

  .el-checkbox-group {
    padding: 10px 0 10px 25px !important;
    text-align: left;
  }

  .el-checkbox {
    margin-top: 10px;
    width: 200px;
    margin-right: 0;
  }

  .empty-tab {
    .el-tabs--border-card {
      border-bottom: 0 !important;
    }
  }

  .el-table__row--level-2 {
    text-indent: 1.5em;
  }

  .content {
    .el-tree {
      height: calc(100vh - 200px) !important;
      overflow: auto;
    }

    .el-card {
      height: calc(100vh - 170px) !important;
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
