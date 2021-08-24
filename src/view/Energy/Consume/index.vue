<template>
  <div id="Consume">
    <el-row>
      <el-col :span="6" style="height: 100%">
        <view-container title="儀表信息">
          <div class="left">
            <!-- 选择仪表类型 -->
            <div class="select">
              <span>{{ $t("energy.yblx") }}：</span>
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
            <!-- 表类型 -->
            <div class="tbType">
              <!-- <div style="padding-bottom: 5px">
                {{ $t("energy.blx") }}{{ TbType }}
              </div> -->
              <el-tree
                :data="table"
                :props="tbProps"
                :default-expand-all="true"
                :expand-on-click-node="false"
                @node-click="fn_NodeClick"
              ></el-tree>
            </div>
          </div> </view-container
      ></el-col>
      <el-col
        :span="18"
        v-loading="loading"
        :element-loading-text="$t('public.loading')"
      >
        <view-container :title="$t('energy.nyxh')">
          <div class="right">
            <div class="btnList">
              <el-button type="success" @click="save">
                {{ $t("public.save") }}
              </el-button>
              <el-button type="primary" @click="fn_AddRead">
                {{ $t("energy.xz") }}
              </el-button>
              <el-button type="danger" @click="fn_handleDel(checkData)">
                {{ $t("public.del") }}
              </el-button>
              <el-button type="primary" @click="uploadXlsx">
                {{ $t("energy.dr") }}
              </el-button>
              <el-button type="primary" @click="query">
                {{ $t("energy.cx") }}
              </el-button>
            </div>
            <!-- 输入查询 -->
            <avue-form
              ref="queryForm"
              :option="CheckOp"
              v-model="Check"
              @submit="fn_checkRead"
            ></avue-form>
            <!-- 抄表数据  @row-del="fn_ReadDel" -->
            <avue-crud
              ref="crud"
              :data="ReadData"
              :option="ReadOp"
              @row-del="fn_handleDel"
              @current-row-change="rowCheck"
            >
              <template slot="menuLeft">
                <input
                  type="file"
                  id="oFile"
                  style="display: none"
                  @change="getExcelFileData"
                />
                <!--  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    @click="uploadXlsx"
                  >{{ $t("energy.dr") }}</el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    @click="fn_AddRead"
                  >{{ $t("energy.xz") }}</el-button>-->
              </template>
            </avue-crud>
            <el-dialog
              :title="$t('energy.xz')"
              :visible.sync="OpenAdd"
              width="70%"
            >
              <div>
                <avue-form
                  :option="AddReadOp"
                  v-model="Read"
                  @submit="fn_handleAdd"
                ></avue-form>
              </div>
            </el-dialog>
          </div>
        </view-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { analysisExcel } from "./option";
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import {
  Data_Width,
  label_Width,
  isDate,
  getDIC2,
  obj2hash,
} from "@/seal/gridOption";
export default {
  data() {
    return {
      Meter: "", //仪表类型
      MeterData: [], //仪表类型数组
      TbType: "", //表类型
      Data: [],
      table: [],
      tbProps: {
        children: "children",
        label: "emName",
      },
      Check: {}, //查询表单
      CheckOp: {
        emptyBtn: false,
        submitBtn: false,
        submitText: this.$t("energy.cx"),
        emptyText: this.$t("energy.qk"),
        labelWidth: 110,
        column: [
          // {
          //   label: this.$t("energy.wz"),
          //   prop: "enSite",
          //   span: 12,
          // },
          {
            label: this.$t("energy.name"),
            prop: "enName",
            span: 12,
            disabled: true,
          },
          {
            label: this.$t("energy.cbr"),
            prop: "erMan",
            span: 12,
            disabled: false,
          },
          {
            label: this.$t("energy.cbrq"),
            prop: "erDate",
            type: "date",
            span: 12,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          // {
          //   label: this.$t("energy.z"),
          //   prop: "endDate",
          //   type: "date",
          //   span: 12,
          //   format: "yyyy-MM-dd",
          //   valueFormat: "yyyy-MM-dd",
          // },
        ],
      },
      ReadData: [],
      //抄表配置
      ReadOp: {
        page: false,
        excelBtn: false,
        editBtn: false,
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        menuAlign: "center",
        // menuWidth: 100,
        height: "calc(100vh - 250px)",
        menu: false,
        highlightCurrentRow: true,
        border: true,
        column: [
          {
            label: "OID",
            prop: "eneRecordoid",
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.bh"),
            prop: "emId",
            width: 70,
            cell: false,
          },
          // {
          //   label: this.$t("energy.name"),
          //   prop: "emName",
          //   width: 100,
          //   cell: false,
          // },
          // {
          //   label: this.$t("energy.wz"),
          //   prop: "emSite",
          //   // width: 180,
          //   overHidden: true,
          //   cell: true,
          // },

          {
            label: this.$t("energy.cbr"),
            prop: "erMan",
            width: 80,
            cell: true,
          },

          {
            label: this.$t("energy.cbfs"),
            prop: "erType",
            type: "select",
            width: 90,
            dicData: getDIC2(this, "eWDFS_403"),
            cell: true,
          },
          {
            label: this.$t("energy.cbrq"),
            prop: "erDate",
            width: 100,
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            align: "center",
            cell: true,
          },
          {
            label: this.$t("energy.cbsj"),
            prop: "erTime",
            type: "time",
            width: 90,
            align: "center",
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            cell: true,
          },

          {
            label: this.$t("energy.dj"),
            prop: "erPrice",
            width: 80,
            align: "right",
            cell: true,
          },
          {
            label: this.$t("energy.sl"),
            prop: "erQty",
            width: 80,
            align: "right",
            cell: true,
          },
          {
            label: this.$t("energy.dw"),
            prop: "erUnit",
            type: "select",
            dicData: getDIC2(this, "eWDFS_402"),
            width: 70,
            cell: true,
          },
        ],
      },
      OpenAdd: false, //弹出新增蒙版状态
      Read: {}, //新增表单
      AddReadOp: {
        column: [
          {
            label: "OID",
            prop: "eneRecordoid",
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.bh"),
            prop: "emId",
            disabled: true,
            cell: true,
          },
          {
            label: this.$t("energy.name"),
            prop: "emName",
            disabled: true,
            cell: true,
          },
          {
            label: this.$t("energy.cbr"),
            prop: "erMan",
            disabled: false,
            cell: true,
          },
          {
            label: this.$t("energy.wz"),
            prop: "emSite",
            disabled: true,
            cell: true,
          },
          {
            label: this.$t("energy.cbfs"),
            prop: "erType",
            type: "select",
            disabled: true,
            dicData: getDIC2(this, "eWDFS_403"),
            cell: true,
          },
          {
            label: this.$t("energy.dw"),
            prop: "erUnit",
            type: "select",
            dicData: getDIC2(this, "eWDFS_402"),
            cell: true,
          },
          {
            label: this.$t("energy.cbrq"),
            prop: "erDate",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            cell: true,
          },
          {
            label: this.$t("energy.cbsj"),
            prop: "erTime",
            type: "time",
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            cell: true,
          },
          {
            label: this.$t("energy.dj"),
            prop: "erPrice",
            cell: true,
          },
          {
            label: this.$t("energy.sl"),
            prop: "erQty",
            cell: true,
          },
        ],
      },
      checkData: {},
      loading: false,
      oldData: {},
    };
  },
  methods: {
    //获取仪表类型
    fn_Meter() {
      this.$http
        .post("/api/codeValue?codeTableId=eWDFS_401")
        .then((res) => {
          this.MeterData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwq"));
        });
    },
    //选择仪表类型
    fn_seleType(Meter) {
      // this.$http
      //   .post("/api/codeValue?codeId=" + Meter + "&codeTableId=eWDFS_401")
      //   .then(res => {
      //     this.TbType = res.data[0].codename;
      //   })
      //   .catch(err => {
      //     error(this.$t("energy.fwq"));
      //   });
      let mItem = this.MeterData.find((mItem) => mItem.codeid === Meter) || {};
      this.TbType = mItem.codename;
      this.emType = Meter;
      //获取仪表类型下的总表树状图
      this.$http.get("/api/eneMeter?emType=" + Meter).then((res) => {
        let Data = res.data;
        // 将数组作为参数执行转树状图函数
        this.table = this.toTree(Data);
      });
    },
    //点击一个仪表类型,并查出抄表数据
    fn_NodeClick(data) {
      this.loading = true;
      this.Data = data;
      this.Check.enName = data.emName;
      this.$http
        .get("/api/eneRecord?emId=" + data.emId + "&emType=" + this.Meter)
        .then((res) => {
          this.ReadData = res.data;
          // this.ReadData.forEach((item) => {
          //   item.erQty = item.erQty.substr(0, item.erQty.length - 5);
          //   item.erDate = item.erDate.substr(0, item.erDate.length - 9);
          // });
          if (this.ReadData.length > 0) {
            this.$refs.crud.setCurrentRow(this.ReadData[0]);
          }

          this.loading = false;
        });
    },
    query() {
      this.$refs.queryForm.submit();
    },
    save() {},
    rowCheck(row) {
      this.oldData.$cellEdit = false;
      this.$set(row, "$cellEdit", true);
      this.oldData = row;
      this.checkData = row;
    },
    //输入位置和抄表日期进行筛选查询
    fn_checkRead(form, done, loading) {
      // let data = isDate(this.CheckOp, form);
      for (let key in form) {
        if (form[key] == "") {
          delete form[key];
        }
      }
      form.emId = this.Data.emId;
      if (form.erDate) {
        form.erDate = form.erDate + " 00:00:00";
      }

      this.$http
        .get("/api/eneRecord", {
          params: form,
        })
        .then((res) => {
          this.ReadData = res.data;
          0;
          if (this.ReadData.length > 0) {
            this.$refs.crud.setCurrentRow(this.ReadData[0]);
          }
        });
      done();
    },
    //打开抄表新增蒙版，并将选中的楼层等信息进行处理
    fn_AddRead() {
      if (!this.Data.emId) {
        warning(this.$t("energy.qxzlc"));
      } else {
        let data = {};
        let nowDate = this.$getNowTime("datetime");
        data.emId = this.Data.emId;
        data.emName = this.Data.emName;
        data.emSite = this.Data.emSite;
        data.erMan = this.Data.emMan;
        data.emType = this.Data.emType;
        data.erPrice = this.Data.emPrice;
        data.erUnit = this.Data.emUnit;
        data.erType = this.Data.emType;
        data.erDate = nowDate;
        data.erTime = nowDate.split(" ")[1];
        this.ReadData.push(data);
        this.$nextTick(() => {
          this.$refs.crud.setCurrentRow(
            this.ReadData[this.ReadData.length - 1]
          );
        });
      }
    },
    //删除抄表数据
    fn_ReadDel(row, index) {
      cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
        .then(() => {
          this.$http
            .delete("/api/eneRecord?eneRecordoid=" + row.emParentoid)
            .then((res) => {
              if (res.data.code == 0) {
                success(this.$t("energy.sccg"));
                this.fn_NodeClick(this.Data);
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
    //数组转树状图函数
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
    // 新增能源
    fn_handleAdd(row, done) {
      !row.erTime && (row.erTime = new Date().toLocaleTimeString().slice(2));
      let time = row.erTime.split(":");
      row.erHour = Number(time[0]);
      row.erMinute = Number(time[1]);
      row.emType = row.emType;
      let hash = obj2hash(row);
      this.$http
        .put("/api/eneRecord" + hash)
        .then((res) => {
          success(res.data.msg);
          this.OpenAdd = false;
          // this.ReadData.push(row);
          this.fn_NodeClick(this.Data);
          done && done();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 删除能源信息
    fn_handleDel(row) {
      if (Object.keys(row).length === 0) {
        warning("請先選擇要删除的数据");
        return;
      }
      this.$confirm(this.$t("energy.qrsc")).then((_) => {
        this.$http
          .delete("/api/eneRecord?eneRecordoid=" + row.eneRecordoid)
          .then((res) => {
            success(res.data.msg);
            this.fn_NodeClick(this.Data);
          })
          .catch((err) => {
            error(this.$t("energy.scsb"));
          });
      });
    },
    // 导入
    uploadXlsx() {
      if (!this.Data.emId) {
        warning(this.$t("energy.qxzlc"));
        return;
      }
      document.querySelector("#oFile").click();
    },
    getExcelFileData() {
      let file = document.querySelector("#oFile").files[0];
      if (!file) return;
      if (["xlsx", "xls"].indexOf(file.name.split(".").pop()) == -1) {
        error(this.$t("energy.qdr"));
        return;
      }
      console.log(file);
      // 解析
      analysisExcel(file, this.ReadOp)
        .then((data) => {
          this.addAllEneData(data);
        })
        .catch((err) => {
          console.log(err);
          error(this.$t("energy.tjsb"));
        });
    },
    addAllEneData(data) {
      let resMap;
      try {
        resMap = data.map((item) => {
          !item.erTime &&
            (item.erTime = new Date().toLocaleTimeString().slice(2));
          // 拆分日期
          let time = item.erTime.split(":");
          item.erHour = Number(time[0]);
          item.erMinute = Number(time[1]);

          item.erDate += ` 00:00:00`;
          item.emType = this.emType;
          return item;
        });
      } catch (exception) {
        return error("文件内容格式出错（时间或日期）");
      }

      this.$http({
        url: "/api/add/eneRecordList",
        method: "post",
        data: resMap,
        headers: {
          "Content-Type": "application/json",
        },
        transformRequest: [
          (data) => {
            return JSON.stringify(data);
          },
        ],
      })
        .then((res) => {
          success("导入成功");
          this.fn_NodeClick(this.Data);
        })
        .catch((err) => {
          error("文件内格式出错");
        });
    },
  },
  mounted() {
    this.fn_Meter(); //执行获取仪表类型函数
  },
};
</script>
<style lang="stylus">
#Consume {
  .avue-group + .el-col-24 {
    height: 5px !important;
  }

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
    text-align: left;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
  }

  .left {
    text-align: left;
    margin: 0 10px;
    font-size: 16px;
    height: calc(100vh - 118px);
    overflow: auto;
  }

  .select {
    margin-top: 10px;
  }

  .tbType {
    margin: 10px 0;
  }
}
</style>
