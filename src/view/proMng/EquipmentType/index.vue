<template>
  <div class="type" id="Type">
    <el-tabs type="border-card">
      <el-tab-pane
        label="生产设备"
        v-loading="loading"
        element-loading-text="正在拼命加载中...."
      >
        <el-row>
          <el-col :span="4">
            <div class="height">
              <el-tree
                :data="MachineData"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="table">
              <avue-crud
                ref="crudRef"
                :data="DeviceData"
                :option="Device"
                :page.sync="page"
                @on-load="fn_Info"
                @select="fn_select"
                @row-save="fn_DeviceSave"
                @row-update="fn_DeviceUpdate"
                @row-del="fn_DeviceDel"
                @row-click="fn_clickUP"
              >
                <template slot="menuLeft">
                  <el-button
                    type="success"
                    size="mini"
                    @click="fn_update"
                    :disabled="DeviceData.length == 0"
                    >{{ this.$t("public.save") }}</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="add"
                    :disabled="
                      (chooseData.children && chooseData.children.length > 0) ||
                      Object.keys(chooseData).length == 0
                    "
                    >{{ this.$t("public.add") }}</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    @click="fn_DeviceDel"
                    :disabled="rowCode.length == 0"
                    >{{ this.$t("public.del") }}</el-button
                  >
                </template>
              </avue-crud>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { add, update } from "./api";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let UNIT = getDIC("bas_matUnit"); // 單位
import { cofirm, success, error, warning, info } from "@/seal/seal"; //引入封装的消息提示和弹框组件
//分类ID默认值
var DIC = {
  VAILE: [
    {
      label: "dev-1",
      value: "dev-1",
    },
    {
      label: "dev-2",
      value: "dev-2",
    },
    {
      label: "dev-3",
      value: "dev-3",
    },
    {
      label: "dev-4",
      value: "dev-4",
    },
    {
      label: "dev-5",
      value: "dev-5",
    },
    {
      label: "dev-6",
      value: "dev-6",
    },
    {
      label: "dev-7",
      value: "dev-7",
    },
    {
      label: "dev-8",
      value: "dev-8",
    },
    {
      label: "dev-9",
      value: "dev-9",
    },
    {
      label: "dev-10",
      value: "dev-10",
    },
    {
      label: "dev-11",
      value: "dev-11",
    },
    {
      label: "dev-12",
      value: "dev-12",
    },
    {
      label: "dev-13",
      value: "dev-13",
    },
    {
      label: "dev-14",
      value: "dev-14",
    },
    {
      label: "dev-15",
      value: "dev-15",
    },
    {
      label: "dev-16",
      value: "dev-16",
    },
    {
      label: "dev-17",
      value: "dev-17",
    },
    {
      label: "dev-18",
      value: "dev-18",
    },
  ],
};
//区域ID默认值
var DBC = {
  VAILE: [
    {
      label: "layer1",
      value: "layer1",
    },
    {
      label: "layer2",
      value: "layer2",
    },
    {
      label: "layer3",
      value: "layer3",
    },
    {
      label: "layer4",
      value: "layer4",
    },
    {
      label: "layer5",
      value: "layer5",
    },
    {
      label: "layer6",
      value: "layer6",
    },
    {
      label: "layer7",
      value: "layer7",
    },
    {
      label: "layer8",
      value: "layer8",
    },
  ],
};

export default {
  data() {
    return {
      MachineData: [], //设备类型数据
      defaultProps: {
        //配置设备类型节点
        children: "children",
        label: "categoryDesc",
      },
      DeviceData: [], //设备信息数据
      Device: {
        page: true,
        // align: "center",
        menuAlign: "center",
        menuWidth: 80, //最小值
        labelWidth: 110,
        dialogHeight: 200,
        addBtn: false,
        menu: false,
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        height: "calc(100vh - 150px)",
        selection: true,
        highlightCurrentRow: true,
        dialogHeight: "80%",
        rowKey: "equId",
        border: true,
        column: [
          {
            label: this.$t("ProWorkflowInfo.flid"),
            prop: "categoryId",
            type: "select",
            dicData: DIC.VAILE,
            cell: false,
            // addDisplay: false
          },
          {
            label: this.$t("ProWorkflowInfo.sbxh"),
            prop: "categoryCode",
            cell: false,
            type: "select",
            hide: true,
            addDisplay: false,
            dicData: [],
          },
          {
            label: this.$t("ProWorkflowInfo.qyid"),
            prop: "areaId",
            type: "select",
            dicData: DBC.VAILE,
            cell: true,
            width: 100,
          },
          {
            label: this.$t("ProWorkflowInfo.szmc"),
            prop: "equipmentName",
            cell: true,
            width: 120,
          },
          {
            label: this.$t("ProWorkflowInfo.sbbh"),
            prop: "equipmentCode",
            cell: true,
            width: 160,
          },
          {
            label: this.$t("ProWorkflowInfo.hzb"),
            prop: "localX",
            cell: true,
            width: 100,
            align: "right",
          },
          {
            label: this.$t("ProWorkflowInfo.zzb"),
            prop: "localY",
            cell: true,
            width: 100,
            align: "right",
          },
          {
            label: this.$t("ProWorkflowInfo.js"),
            prop: "equSpeed",
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.zt"),
            prop: "equState",
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.cl"),
            prop: "maxOutput",
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.dw"),
            prop: "unit",
            type: "select",
            dicData: UNIT,
            cell: true,
            width: 80,
          },
          {
            label: this.$t("ProWorkflowInfo.jlfsL"),
            prop: "measureMethod",
            cell: true,
            width: 100,
          },
        ],
      },
      eqModel: "",
      eqType: [],
      rowCode: "", //勾选选中ID
      oldData: {},
      upData: {}, //选中数据编辑
      chooseData: {},
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
    };
  },
  methods: {
    //获取所有的设备类型信息数据
    fn_MachineType() {
      this.$http
        .get("/api/equipmentCategoryAndChildrenList")
        .then((res) => {
          this.MachineData = res.data;
          this.MachineData.forEach((item, index) => {
            if (item.children.length > 0) {
              item.children.forEach((items, indexs) => {
                this.eqType.push({
                  label: items.categoryName,
                  value: items.categoryCode,
                  type: item.categoryId,
                });
              });
            } else {
              this.eqType.push({
                label: item.categoryName,
                value: item.categoryCode,
                type: item.categoryId,
              });
            }
          });
          this.Device.column[1].dicData = this.eqType;
        })
        .catch((err) => {
          error("系统错误！");
        });
    },
    // 点击设备类型，然后根据分类ID获取设备信息
    handleNodeClick(data) {
      //点击获取设备信息将该条数据存储,方便下方删除数据时作为参数执行获取设备信息函数
      this.chooseData = data;
      sessionStorage.setItem("data", JSON.stringify(data));
      this.fn_Info(); //获取设备信息函数
    },
    // 新增设备信息表
    fn_DeviceSave(row, done) {
      const url = "/api";
      this.$http
        .put(
          url +
            "/baseEquipment?areaId=" +
            row.areaId +
            "&categoryId=" +
            row.categoryId +
            "&equSpeed=" +
            row.equSpeed +
            "&equState=" +
            row.equState +
            "&equipmentCode=" +
            row.equipmentCode +
            "&equipmentName=" +
            row.equipmentName +
            "&localX=" +
            row.localX +
            "&localY=" +
            row.localY +
            "&maxOutput=" +
            row.maxOutput +
            "&measureMethod=" +
            row.measureMethod +
            "&unit=" +
            row.unit +
            "&equModel=" +
            this.eqModel
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(res.data.msg);
            // 获取新增所使用的分类ID来进行查询
            let data = row;
            this.fn_DeviceInfo(this.DeviceData[0]);
          }
        });
      this.loading = false;
      done();
    },
    //勾选选中回调
    fn_select(selection, row) {
      // this.rowCode = row.equId;
      this.rowCode = selection;
    },
    //点击当前行获取当前行数据
    fn_clickUP(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.upData = val;
    },
    add() {
      this.DeviceData.push({
        equModel: this.chooseData.categoryCode,
        equipmentName: this.chooseData.categoryName,
        categoryId: this.chooseData.categoryId,
      });
      this.$nextTick(() => {
        this.$refs.crudRef.setCurrentRow(
          this.DeviceData[this.DeviceData.length - 1]
        );
        this.fn_clickUP(this.DeviceData[this.DeviceData.length - 1]);
      });
    },
    //点击编辑按钮打开弹框
    fn_update() {
      for (let i = 0; i < this.DeviceData.length; i++) {
        if (
          !this.DeviceData[i].equipmentName ||
          !this.DeviceData[i].equipmentCode
        ) {
          this.$tip.error("設備編號和名稱不能為空!");
          return;
        }
      }
      this.loading = true;
      this.DeviceData.forEach((item, i) => {
        if (item.equId) {
          // update
          update(item).then((res) => {});
        } else {
          //add
          add(item).then((res) => {
            item.equId = res.data.data;
          });
        }
        if (this.DeviceData.length - 1 == i) {
          setTimeout(() => {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
          }, 200);
        }
      });
      if (this.DeviceData.length == 0) {
        this.loading = false;
      }
    },
    //删除设备信息表
    fn_DeviceDel() {
      const Data = [];
      if (!this.rowCode || this.rowCode.length === 0) {
        return;
      }
      this.rowCode.forEach((item) => {
        Data.push(item.equId);
      });
      //设置请求格式为json格式
      const requParams = {
        headers: {
          "Content-Type": "application/json",
        },
        transformRequest(data) {
          return JSON.stringify(data);
        },
      };
      cofirm("此操作将永久删除選中數據,是否继续", "warning")
        .then((res) => {
          this.$http({
            ...requParams,
            method: "delete",
            url: "/api/baseEquipment/batchesDel",
            data: Data,
          }).then((res) => {
            if (res.data.code == 200) {
              success(this.$t("public.sccg"));
              // 获取存储在本地的数据作为参数执行获取设备信息的函数
              let data = JSON.parse(sessionStorage.getItem("data"));
              this.fn_DeviceInfo(data);
            } else {
              warning(this.$t("public.scsb"));
            }
          });
        })
        .catch((err) => {
          info("已取消删除");
        })
        .catch((err) => {
          warning(this.$t("public.scsb"));
        });
    },
    // 修改设备信息表
    fn_DeviceUpdate(row, index, done, loading) {
      const url = "/api";
      this.$http
        .post(
          url +
            "/baseEquipment?areaId=" +
            row.areaId +
            "&equId=" +
            row.equId +
            "&categoryId=" +
            row.categoryId +
            "&equSpeed=" +
            row.equSpeed +
            "&equState=" +
            row.equState +
            "&equipmentCode=" +
            row.equipmentCode +
            "&equipmentName=" +
            row.equipmentName +
            "&localX=" +
            row.localX +
            "&localY=" +
            row.localY +
            "&maxOutput=" +
            row.maxOutput +
            "&measureMethod=" +
            row.measureMethod +
            "&unit=" +
            row.unit
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(res.data.msg);
            // 获取新增所使用的分类ID来进行查询
            this.fn_DeviceInfo(row);
          }
        })
        .catch((err) => {
          error("格式错误修改失败");
        });
      done();
      loading();
    },
    //根据分类ID获取设备信息表
    fn_DeviceInfo(data) {
      if (data.categoryCode) {
        this.eqModel = data.categoryCode;
      } else {
        this.eqModel = data.equModel;
        this.$set(data, "categoryCode", data.equModel);
      }
      // if (this.eqModel == "dev_13") {
      //   this.Device.addBtn = false;
      // } else {
      //   this.Device.addBtn = true;
      // }
      this.$http
        .post("/api/baseEquipmentList?equModel=" + data.categoryCode)
        .then((res) => {
          this.DeviceData = res.data;
        });
    },
    //进入页面默认获取所有的设备信息
    fn_Info() {
      this.loading = true;
      this.$http({
        url: "/api/baseEquipmentList",
        methods: "get",
        params: {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          equModel: this.chooseData.categoryCode,
          page: this.page.currentPage,
        },
      }).then((res) => {
        this.DeviceData = res.data.rows;
        this.page.total = res.data.total;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
  },
  mounted() {
    this.fn_MachineType();
    // this.fn_Info(); //进入页面默认获取所有的设备信息
  },
};
</script>
<style lang="stylus">
#Type {
  .el-tree {
  }

  .avue-crud__menu {
    min-height: 35px !important;
  }
}

.type .Title {
  width: 100%;
  height: 45px;
  background-color: #fff;
  text-align: left;
  line-height: 45px;
  padding-left: 15px;
}

.type .avue-crud__tip {
  margin-top: -20px;
  display: none;
}

.type .avue-crud__menu {
  margin-top: 5px;
}

.height {
  height: calc(100vh - 88px) !important;
  margin-top: 5px;
  background-color: #fff;
  overflow: auto;
  border: 1px solid rgb(232, 234, 236);
  margin-left: 5px;
}

.table {
  margin-top: 5px;
  margin-left: 5px;
}
</style>