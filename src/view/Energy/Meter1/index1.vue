<template>
  <div class="Meter">
    <el-row class="conter">
      <el-col :span="24">
        <view-container :title="$t('energy.ybzlwh')">
          <!-- 新增删除仪表 -->
          <div class="btnList">
            <el-button type="primary" size="mini" @click="append(0)">
              {{ $t("energy.xztcyb") }}
            </el-button>
            <el-button type="primary" size="mini" @click="append(1)">
              {{ $t("energy.xzzcyb") }}
            </el-button>

            <el-button type="primary" size="mini" @click="fn_MeterDel">
              {{ $t("energy.scyq") }}
            </el-button>
            <el-button type="primary" size="mini" @click="editorBtn('yb')">
              {{ $t("energy.xgyb") }}
            </el-button>
          </div>
          <!-- 选择仪表类型 -->
          <el-row style="margin-top: 5px">
            <el-col :span="4" style="padding-top: 5px; text-align: right">
              <span>{{ $t("energy.yblx") }}：</span>
            </el-col>
            <el-col :span="12" style="text-align: left; text-indent: 1em">
              <div class="select">
                <el-select
                  v-model="Meter"
                  :placeholder="$t('energy.qxz')"
                  @change="fn_seleType(Meter)"
                >
                  <el-option
                    v-for="item in MeterData"
                    :key="item.codevalueoid"
                    :label="item.codename"
                    :value="item.codeid"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-dialog
            :title="$t('energy.ts')"
            :visible.sync="OpenAdd"
            width="50%"
            :close-on-click-modal="false"
          >
            <div>
              <avue-form
                :option="AddMeterOp"
                v-model="AddMeter"
                @submit="fn_AdSub"
              ></avue-form>
            </div>
          </el-dialog>
          <el-dialog
            :title="crudTle.label"
            :visible.sync="edDlg"
            :before-close="cancel"
            width="50%"
            :close-on-click-modal="false"
          >
            <div class="btnList">
              <el-button type="primary" size="mini" @click="addBtn">
                {{ $t("energy.xz") }}
              </el-button>
              <el-button type="primary" size="mini" @click="typeSave">
                {{ $t("energy.bc") }}
              </el-button>
              <el-button type="primary" size="mini" @click="delBtn">
                {{ $t("energy.schu") }}
              </el-button>
              <el-button type="primary" size="mini" @click="cancel">
                {{ $t("energy.qx") }}
              </el-button>
            </div>
            <avue-crud
              ref="typeCrud"
              :option="MeterTypeOp"
              v-model="MeterType"
              :data="crudData"
              @current-row-change="handleCurrentRowChange"
              :table-loading="typeLoading"
              @row-update="addUpdate"
            ></avue-crud>
            <!-- <avue-form :option="edMeterOp" v-model="edMeter" @submit="editorBtn"></avue-form> -->
          </el-dialog>
          <!-- 表类型 -->
          <div class="tbType">
            <el-row style="margin-bottom: 5px">
              <el-col :span="4" style="text-align: right">
                <span>{{ $t("energy.blx") }}</span>
              </el-col>
              <el-col :span="18" style="text-align: left; text-indent: 2em">
                {{ TbType }}
              </el-col>
            </el-row>
            <el-tree
              :data="table"
              :props="tbProps"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="NodeClick"
            ></el-tree>
          </div>
        </view-container>
      </el-col>
      <el-col :span="14">
        <view-container :title="$t('energy.ybzlwh')">
          <div class="right">
            <div class="btnList">
              <el-button type="primary" @click="addClick">
                {{ $t("energy.xz") }}
              </el-button>
              <el-button type="primary" @click="save">
                {{ $t("energy.bc") }}
              </el-button>
              <el-button type="primary" @click="fn_delMachine(checkData)">
                {{ $t("energy.schu") }}
              </el-button>
              <el-button type="primary" size="mini" @click="editorBtn('dw')">{{
                $t("energy.whdw")
              }}</el-button>
            </div>
            <div style="margin-top: 5px">{{ $t("energy.yqxx") }}</div>

            <div>
              <avue-form
                ref="form"
                v-model="Newsform"
                :option="NewsOp"
                @submit="fn_saveMach"
              ></avue-form>
            </div>
            <div class="tbType">{{ $t("energy.ybdysb") }}</div>
            <div>
              <avue-crud
                ref="crud"
                :data="MachineData"
                :option="MachineOp"
                v-model="Machine"
                @row-save="fn_subAdd"
                @row-del="fn_delMachine"
                @current-row-change="rowCheck"
              ></avue-crud>
            </div>
          </div>
        </view-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { cofirm, success, error, warning } from "@/seal/seal"; // 引入封装的消息提示和弹框组件
var Whether = {
  VAILE: [
    {
      label: "是",
      value: "1",
    },
    {
      label: "否",
      value: "0",
    },
  ],
};

var Mach = [];
export default {
  data() {
    return {
      Meter: "", // 仪表类型
      MeterData: [], // 仪表类型数组
      TbType: "", // 表类型
      Data: "",
      upform: {},
      tbProps: {
        label: "emName",
        children: "children",
      },
      table: [],
      OpenAdd: false, // 打开新增仪表蒙版
      OID: "", // 父仪表OID
      AddMeter: {},
      AddMeterOp: {
        column: [
          {
            label: this.$t("energy.bh"),
            prop: "emId",
          },
          {
            label: this.$t("energy.name"),
            prop: "emName",
          },
        ],
      },
      edMeterOp: {
        column: [
          {
            label: this.$t("energy.bh"),
            prop: "codeid",
          },
          {
            label: this.$t("energy.name"),
            prop: "codename",
          },
        ],
      },
      edMeter: {},
      MeterTypeOp: {
        border: true,
        page: false,
        align: "center",
        menuAlign: "center",
        editBtn: false,
        cellBtn: false,
        menu: false,
        cellBtn: true,
        addRowBtn: true,
        highlightCurrentRow: true,
        column: [
          {
            label: this.$t("energy.bh"),
            prop: "codeid",
            width: 120,
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入編號",
                trigger: "blur",
              },
            ],
          },
          {
            label: this.$t("energy.name"),
            prop: "codename",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入名稱",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      MeterType: {},
      crudData: [],
      typeCheckData: {},
      edDlg: false,
      typeLoading: false,
      Newsform: {}, // 仪表信息
      NewsOp: {
        submitBtn: false,
        emptyBtn: false,
        submitText: this.$t("energy.bc"),
        emptyText: this.$t("energy.qk"),
        menuPostion: "center",
        column: [
          {
            label: this.$t("energy.bh"),
            prop: "emId",
            span: 12,
            disabled: true,
          },
          {
            label: this.$t("energy.sfyx"),
            prop: "emIsvalid",
            span: 12,
            type: "select",
            dicData: Whether.VAILE,
            rules: [
              {
                required: true,
                message: this.$t("energy.qxzsfyx"),
                trigger: "blur",
              },
            ],
          },
          {
            label: this.$t("energy.name"),
            prop: "emName",
            span: 24,
            disabled: true,
          },
          {
            label: this.$t("energy.dw"),
            prop: "emUnit",
            span: 12,
            type: "select",
            dicData: this.Unit,
            rules: [
              {
                required: true,
                message: this.$t("energy.qxzdw"),
                trigger: "blur",
              },
            ],
          },
          {
            label: this.$t("energy.cbr"),
            prop: "emMan",
            span: 12,
            display: false,
          },
          {
            label: this.$t("energy.dj"),
            prop: "emPrice",
            span: 12,
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrdj"),
                trigger: "blur",
              },
            ],
          },
          {
            label: this.$t("energy.bl"),
            prop: "emMulti",
            span: 12,
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrbl"),
                trigger: "blur",
              },
            ],
          },
          {
            label: this.$t("energy.wz"),
            prop: "emSite",
            span: 24,
          },
          {
            label: this.$t("energy.bz"),
            prop: "emRemark",
            span: 24,
          },
        ],
      },
      Machine: {},
      MachineData: [], // 设备信息
      MachineOp: {
        height: 200,
        highlightCurrentRow: true,
        page: false,
        align: "center",
        menuAlign: "center",
        editBtn: false,
        cellBtn: false,
        menu: false,
        column: [
          {
            label: "OID",
            prop: "vwEquEquipmentoid",
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.sbdm"),
            prop: "equId",
            display: false,
          },
          {
            label: this.$t("energy.sbmc"),
            prop: "equName",
            type: "select",
            dicData: Mach,
          },
        ],
      },
      checkData: {},
      Unit: [],
      delData: [],
      crudTle: {
        label: this.$t("energy.xgyb"),
        type: "yb",
      },
    };
  },
  methods: {
    // 获取仪表类型
    fn_Meter() {
      this.$http
        .get("/api/getcodeValue?codeTableId=eWDFS_401")
        .then((res) => {
          this.typeLoading = true;
          this.MeterData = res.data;
          this.MeterData.map((item, index) => {
            item.$cellEdit = true;
          });
          setTimeout(() => {
            this.typeLoading = false;
          }, 500);
        })
        .catch((err) => {
          error(this.$t("energy.fwq"));
          this.typeLoading = false;
        });
      this.$http
        .get("/api/getcodeValue?codeTableId=eWDFS_402")
        .then((res) => {
          this.typeLoading = true;
          this.Unit = res.data;
          this.Unit.map((item) => {
            item.value = item.codeid;
            item.label = item.codename;
            item.$cellEdit = true;
          });
          this.NewsOp.column[3].dicData = this.Unit;
          setTimeout(() => {
            this.typeLoading = false;
          }, 500);
        })
        .catch((err) => {
          error(this.$t("energy.fwq"));
        });
    },
    // 选择仪表类型
    getBlx() {
      if (this.form.yblx) {
        // 获取仪表类型下的总表树状图
        this.$http.post("/api/eneMeterList?emType=" + Meter).then((res) => {
          this.formOp.column[1].dicData = this.toTree(Data);
        });
      } else {
        this.formOp.column[1].dicData = [];
        this.$tip.error("請先選擇儀表類型!");
      }
    },
    // 点击一个仪表类型
    NodeClick(data) {
      this.Data = data;
      this.checkData = {};
      this.Newsform = data;
      this.Newsform.emIsvalid == true
        ? (this.Newsform.emIsvalid = "是")
        : (this.Newsform.emIsvalid = "否");
      this.fn_getManch(); // 执行获取仪表对应设备函数
    },
    // 获取仪表对应设备
    fn_getManch() {
      this.$http
        .get("/api/eneMeter?eneMeterEquoid=" + this.Data.eneMeterEquoid)
        .then((res) => {
          let Data = [];
          Data = res.data;
          Data.forEach((item, index) => {
            this.MachineData = item.eneQueVos;
          });
        });
    },
    // 打开新增仪表类型
    append(index) {
      // 如果选择了仪表类型
      if (this.Meter) {
        if (this.table.length == 0 || this.table.length != 0) {
          this.AddMeter = {
            emId: "",
            emName: "",
          };
          this.OpenAdd = true;
          if (index == 0) {
            this.OID = this.Data.emParentoid;
          } else if (index == 1) {
            this.OID = this.Data.eneMeterEquoid;
          }
        }
      } else {
        warning(this.$t("energy.qxzygyb"));
      }
    },
    editorBtn(val) {
      if (val === "yb") {
        this.crudData = this.MeterData;
        this.crudTle.label = this.$t("energy.xgyb");
        this.crudTle.type = "yb";
      } else {
        this.crudData = this.Unit;
        this.crudTle.label = this.$t("energy.whdw");
        this.crudTle.type = "dw";
      }
      this.edDlg = true;
      if (this.$refs.typeCrud != undefined) {
        this.$nextTick(() => {
          this.$refs.typeCrud.setCurrentRow({});
        });
      }
    },
    cancel() {
      this.fn_Meter();
      this.edDlg = false;
      this.delData = [];
    },
    handleCurrentRowChange(val) {
      this.typeCheckData = val;
    },
    addUpdate(form, index, done, loading) {
      console.log(form);
    },
    addBtn() {
      this.crudData.push({
        $cellEdit: true,
        codeid: "",
        codeName: "",
      });
    },
    delBtn() {
      if (Object.keys(this.typeCheckData).length === 0) {
        warning(this.$t("energy.qxz"));
      } else {
        this.crudData.splice(this.typeCheckData.$index, 1);
        if (this.typeCheckData.codevalueoid) {
          this.delData.push(this.typeCheckData);
        }
        this.$nextTick(() => {
          this.$refs.typeCrud.setCurrentRow({});
        });
      }
    },
    // 保存 儀表類型信息
    typeSave() {
      let type = "";
      this.crudTle.type === "yb" ? (type = "eWDFS_401") : (type = "eWDFS_402");
      for (let index = 0; index < this.crudData.length; index++) {
        if (
          this.crudData[index].codeid === "" ||
          this.crudData[index].codename === ""
        ) {
          error(this.$t("energy.nonull"));
          return;
        }
      }
      this.crudData.forEach((item, index) => {
        if (item.codevalueoid) {
          this.$http
            .put(
              "/api/updateCodeValue?codeTableId=" +
                type +
                "&codeName=" +
                item.codename +
                "&codeID=" +
                item.codeid +
                "&codeValueOID=" +
                item.codevalueoid +
                ""
            )
            .then((res) => {})
            .catch((err) => {
              error(this.$t("energy.fwq"));
            });
        } else {
          this.$http
            .post(
              "/api/addCodeValue?codeTableId=" +
                type +
                "&codeName=" +
                item.codename +
                "&codeID=" +
                item.codeid +
                "&codeValueOID=" +
                item.codevalueoid +
                ""
            )
            .then((res) => {})
            .catch((err) => {
              error(this.$t("energy.fwq"));
            });
        }

        if (index === this.crudData.length - 1) {
          this.fn_Meter();
          success(this.$t("energy.bccg"));
        }
      });
      this.delData.forEach((item) => {
        this.$http
          .delete(
            "/api/deleteCodeValue?codeTableId=" +
              type +
              "&codeName=" +
              item.codename +
              "&codeValueOID=" +
              item.codevalueoid +
              ""
          )
          .then((res) => {});
      });
    },
    // 提交新增仪表
    fn_AdSub(form, done) {
      if (!form.emId || !form.emName) {
        warning("新增内容不能为空");
      } else {
        this.OID ? (this.OID = this.OID) : (this.OID = "");
        this.$http
          .put(
            "/api/eneMeter?emId=" +
              form.emId +
              "&emIsvalid=true&emName=" +
              form.emName +
              "&emParentoid=" +
              this.OID +
              "&emType=" +
              this.Meter
          )
          .then((res) => {
            if (res.data.code == 0) {
              success(this.$t("energy.sccgong"));
              this.OpenAdd = false;
              this.fn_seleType(this.Meter);
            }
          })
          .catch((err) => {
            warning(this.$t("energy.yc"));
          });
      }

      done();
    },
    // 删除仪表
    fn_MeterDel() {
      if (!this.Data) {
        warning(this.$t("energy.qxzygyb"));
      } else {
        cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
          .then((res) => {
            this.$http
              .delete(
                "/api/eneMeter?eneMeterEquoid=" + this.Data.eneMeterEquoid
              )
              .then((res) => {
                if (res.data.code == 0) {
                  success(this.$t("energy.sccg"));
                  this.fn_seleType(this.Meter);
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
          })
          .catch((err) => {
            error(this.$t("energy.cw"));
          });
      }
    },
    // 保存仪器信息
    fn_saveMach(form, done, loading) {
      if (this.Newsform.emIsvalid == "是") {
        form.emIsvalid = "1";
      } else if (this.Newsform.emIsvalid == "否") {
        form.emIsvalid = "0";
      }
      this.$http
        .post(
          "/api/eneMeter?emId=" +
            form.emId +
            "&emIsvalid=" +
            form.emIsvalid +
            "&emMan=" +
            form.emMan +
            "&emMulti=" +
            form.emMulti +
            "&emName=" +
            form.emName +
            "&emParentoid=" +
            this.Data.emParentoid +
            "&emPrice=" +
            form.emPrice +
            "&emRemark=" +
            form.emRemark +
            "&emSite=" +
            form.emSite +
            "&emType=" +
            this.Meter +
            "&emUnit=" +
            form.emUnit +
            "&eneMeterEquoid=" +
            this.Data.eneMeterEquoid
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(this.$t("energy.bccg"));
            this.fn_seleType(this.Meter);
          }
        })
        .catch((err) => {
          warning(this.$t("energy.fwqyc"));
        });
      done();
    },
    // 新增仪表对应设备前获取所有的设备型号,将其作为新增设备范围
    fn_AddMach() {
      this.$http.get("/api/getEneEquList").then((res) => {
        res.data.forEach((item, index) => {
          let obj = {
            label: item.equName,
            value: item.equId,
          };
          Mach.push(obj);
        });
      });
    },
    addClick() {
      this.$refs.crud.rowAdd();
    },
    // 新增仪器对应设备
    fn_subAdd(row, done, loading) {
      if (!row.equName) {
        warning("请选择一个设备");
      } else {
        this.$http
          .put(
            "/api/eneMeterEqu?eneMeterFk=" +
              this.Data.eneMeterEquoid +
              "&equId=" +
              row.equName
          )
          .then((res) => {
            if (res.data.code == 0) {
              success(this.$t("energy.xzcg"));
              this.NodeClick(this.Data);
              done();
            } else {
              error(this.$t("energy.xzsb"));
            }
          })
          .catch((err) => {
            error(this.$t("energy.gsbycz"));
            this.NodeClick(this.Data);
          });
      }
      loading();
    },
    // 删除仪表对应设备
    fn_delMachine(row) {
      if (Object.keys(row).length === 0) {
        warning("請先選擇要删除的数据");
        return;
      }
      const data = row.vwEquEquipmentoid;
      cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
        .then(() => {
          this.$http
            .delete("/api/eneMeterEqu?eneMeterEquoid=" + data)
            .then((res) => {
              if (res.data.code == 0) {
                success(this.$t("energy.sccg"));
                this.fn_getManch();
              } else {
                warning(this.$t("energy.scsb"));
              }
            })
            .catch((err) => {
              error(this.$t("energy.scsb"));
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("energy.yqxsc"),
          });
        });
    },
    save() {
      this.$refs.form.submit();
    },
    rowCheck(row) {
      this.checkData = row;
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
  mounted() {
    this.fn_Meter(); // 执行获取仪表类型函数
    this.fn_AddMach(); // 执行新增仪表对应设备前获取所有的设备型号
  },
};
</script>

<style lang="stylus">
.Meter {
  margin: 0 0 0 0px;
  height: 100vh;

  .el-main {
    padding: 0 !important;
  }

  .head {
    margin: 5px 0;
    text-align: left;
  }

  .Title {
    width: 100%;
    height: 30px;
    text-align: left !important;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
  }

  .left {
    text-align: left;
    margin-left: 30px;
    font-size: 15px;
  }

  .select {
    margin: 3px 0 5px 0;
    width: 95%;
  }

  .tbType {
    margin: 10px 0;
  }

  .right {
    text-align: left;
    font-size: 15px;
    margin: -2px 0 0 0;
    line-height: 15px;
  }

  .el-form-item__content {
    height: 30px !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 5px !important;
  }

  .el-input__inner {
    font-size: 14px !important;
  }

  .avue-group + .el-col-24 {
    height: 5px !important;
  }
}
</style>
