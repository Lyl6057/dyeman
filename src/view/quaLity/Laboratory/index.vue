<template>
  <div name="labotatory">
    <view-container title="化验室检查">
      <div class="btnList">
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          @click="fn_openDialog"
          size="mini"
          >{{ $t("energy.xz") }}</el-button
        >
      </div>
      <div class="table-wrapper">
        <el-table
          :data="labRecorderData[recorderCurrentPage]"
          stripe
          style="width: 100%"
          height="400px"
        >
          <el-table-column
            v-for="(item, idx) in labTableOption.column"
            :key="idx"
            :prop="item.value"
            :label="item.label"
            v-if="!item.hide"
            width="180"
          ></el-table-column>
          <!-- Opt -->
          <el-table-column fixed="right" :label="$t('energy.cz')" width="150">
            <template slot-scope="scope">
              <el-button
                @click="fn_handleRecorderDetail(scope.row)"
                type="text"
                size="small"
                >{{ $t("energy.ck") }}</el-button
              >
              <el-button
                type="text"
                class="delBtn"
                @click="fn_handRecorderDel(scope.row)"
                size="small"
                >{{ $t("energy.schu") }}</el-button
              >
              <el-button
                @click="fn_handleRecorderEdit(scope.row)"
                type="text"
                size="small"
                >{{ $t("energy.bj") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="fn_handleRecorderSizeChange"
          @current-change="fn_handleRecorderCurrentChange"
          :page-sizes="[20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recorderTotal"
        ></el-pagination>
      </div>
      <!-- 弹出框 -->
      <div class="dialogBox">
        <!-- TODO 新增页面(检测) -->
        <el-dialog
          :visible.sync="recorderAddDialogVisible"
          width="30%"
          append-to-body
        >
          <div class="addRecorderForm">
            <el-form ref="form" :model="labFormData" label-width="80px">
              <el-form-item :label="$t('energy.jlmc')">
                <el-input v-model="labFormData.recName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('energy.ssbh')">
                <el-input v-model="labFormData.salPoNo"></el-input>
              </el-form-item>
              <el-form-item :label="$t('energy.ssgx')">
                <el-input v-model="labFormData.workNo"></el-input>
              </el-form-item>
              <el-form-item :label="$t('energy.sscl')">
                <el-input v-model="labFormData.mateCode"></el-input>
              </el-form-item>
              <el-form-item :label="$t('energy.bgfl')">
                <el-col :span="11">
                  <el-select
                    v-model="labFormData.checkCate"
                    :placeholder="$t('energy.qxz')"
                  >
                    <el-option
                      v-for="(item, idx) in cateOptions"
                      :key="idx"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">=></el-col>
                <el-col :span="11">
                  <el-select
                    v-model="kindCodes"
                    @change="textChange"
                    multiple
                    :placeholder="$t('energy.qxz')"
                  >
                    <el-option
                      v-for="(item, idx) in kindOptions"
                      :key="idx"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="recorderAddDialogVisible = false">{{
              $t("energy.qx")
            }}</el-button>
            <el-button type="primary" @click="fn_handRecorderAdd">{{
              $t("energy.qd")
            }}</el-button>
          </span>
        </el-dialog>
        <!-- TODO 查看检测详情 -->
        <el-dialog
          :visible.sync="checkItemDialogVisible"
          fullscreen
          append-to-body
        >
          <div class="kindItemTable-wrapper">
            <!-- 检测详情表 -->
            <el-table
              :data="checkItemData"
              stripe
              border
              style="width: 100%"
              :span-method="fn_objectSpanMethod"
            >
              <el-table-column
                v-for="(item, idx) in checkItemtableOption.column"
                :key="idx"
                :prop="item.prop"
                :label="item.label"
                :width="item.width || 120"
              >
                <template slot-scope="scope" v-if="!item.hide">
                  <div v-if="item.prop == 'testData'">
                    <el-input
                      type="textarea"
                      v-model="scope.row[item.prop]"
                    ></el-input>
                  </div>
                  <div v-else-if="difTemplateStrs.indexOf(item.prop) !== -1">
                    <el-input
                      type="text"
                      v-model="scope.row[item.prop]"
                    ></el-input>
                  </div>
                  <div v-else>
                    <span v-html="scope.row[item.prop]"></span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="checkItemDialogVisible = false">{{
              $t("energy.qx")
            }}</el-button>
            <el-button type="primary" @click="fn_handCheckItemSubmit">{{
              $t("energy.qd")
            }}</el-button>
          </span>
        </el-dialog>
      </div>
    </view-container>
  </div>
</template>
<script>
import { cofirm, success, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import {
  Data_Width,
  label_Width,
  isDate,
  timeConversion,
} from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  name: "labotatory",
  data() {
    return {
      // 分类选择
      cateOptions: [],
      // 检查分类
      kindCodes: [],
      // kindValues: [],
      kindOptions: [],
      // 检测新增弹出状态
      recorderAddDialogVisible: false,
      // 记录详情弹出状态
      checkItemDialogVisible: false,
      // 化验室检测报告结构
      labTableOption: {
        column: [
          {
            label: this.$t("energy.jlid"),
            value: "recId",
            hide: true,
          },
          {
            label: this.$t("energy.jlmc"),
            value: "recName",
          },
          {
            label: this.$t("energy.bh"),
            value: "checkCode",
            hide: true,
          },
          {
            label: this.$t("energy.cjsj"),
            value: "createTime",
          },
          {
            label: this.$t("energy.cjr"),
            value: "createMan",
          },
          {
            label: this.$t("energy.ssdd"),
            value: "salPoNo",
          },
          {
            label: this.$t("energy.ssgx"),
            value: "workNo",
          },
          {
            label: this.$t("energy.sscl"),
            value: "mateCode",
          },
          {
            label: this.$t("energy.jcjg"),
            value: "checkResult",
          },
          {
            label: this.$t("energy.jcbgfl"),
            value: "checkCate",
            hide: true,
          },
        ],
      },
      // 化验室检测报告数据
      labRecorderData: [],
      // 化验室表单初始化
      labInitFormData: {
        recId: "",
        recName: "",
        checkCode: "",
        createTime: "",
        createMan: "",
        salPoNo: "",
        workNo: "",
        mateCode: "",
        checkResult: "",
        checkCate: "",
      },
      // 化验室表单结果
      labFormData: {
        recId: "",
        recName: "",
        checkCode: "",
        createTime: "",
        createMan: "",
        salPoNo: "",
        workNo: "",
        mateCode: "",
        checkResult: "",
        checkCate: "",
      },
      // 化验室检查项目结果结构
      checkItemtableOption: {
        column: [
          {
            label: this.$t("energy.jcxid"),
            prop: "itemOid",
            hide: true,
          },
          {
            label: this.$t("energy.jczl"),
            // prop: "kindOid"
            prop: "name",
          },
          {
            label: this.$t("energy.jcxxh"),
            prop: "sn",
          },
          {
            label: this.$t("energy.jcxbh"),
            prop: "itemCod",
            hide: true,
          },
          {
            label: this.$t("energy.jcxmc"),
            prop: "itemName",
          },
          {
            label: this.$t("energy.ckbz"),
            prop: "refStandard",
          },
          {
            label: this.$t("energy.kjsfw"),
            prop: "acceptRange",
          },
          {
            label: this.$t("energy.sh"),
            prop: "testData",
            width: 200,
          },
          {
            label: this.$t("energy.csjg"),
            prop: "testResult",
          },
          {
            label: this.$t("energy.pp"),
            prop: "judgeVerdict",
          },
          {
            label: this.$t("energy.clyj"),
            prop: "handleSuggest",
          },
          {
            label: this.$t("energy.sxsb"),
            prop: "supportEquipment",
          },
          {
            label: this.$t("energy.bz"),
            prop: "itemDesc",
          },
        ],
      },
      // 显示为输入框字段
      difTemplateStrs: [
        // "testData", //说明
        "judgeVerdict", // 评判
        "handleSuggest", /// 出来意见
        "testResult", // 测试结果
        "itemDesc", // 备注
      ],
      // 化验室检测项目结果数据
      checkItemData: [],
      // 当前页
      recorderCurrentPage: 0,
      // 记录总数据
      recorderTotal: 0,
    };
  },
  watch: {
    // 联级操作
    "labFormData.checkCate": {
      handler(nVal, oVal) {
        if (!nVal) return;
        this.kindCodes = [];
        this.kindOptions = this.cateOptions.find(
          (item) => item.value === nVal
        ).children;
      },
    },
    // 编号
    // kindCodes: {
    //   handler(val) {
    //     this.kindValues = this.kindOptions.filter(item => {
    //       return item.value == val;
    //     });
    //     this.kindValues = this.kindValues.map(item => item.code);
    //   },
    //   deep: true
    // },
    // 初始化合并单元格参数
    checkItemData: {
      handler(nVal, oVal) {
        for (let key in this.spanMerge) {
          this.spanMerge[key].flag = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    kindValues() {
      return this.kindOptions
        .filter((item) => this.kindCodes.indexOf(item.value) != -1)
        .map((item) => item.code);
    },
  },
  methods: {
    textChange() {
      console.log("code", this.kindCodes);
      console.log("value", this.kindValues);
    },
    //检测查看
    fn_handleRecorderDetail(row) {
      this.checkItemDialogVisible = true;
      this.checkItemData = [];
      // 获取化验室项目结果数据
      let { recId } = row;
      // 先请求检查种类数据
      this.fn_getLabKind2Data(recId, (kindIds) => {
        // 获取最新检测结果数据
        kindIds.forEach((kindItem) => {
          this.fn_getLabItemData(kindItem.kindOid, (ItemList) => {
            ItemList = ItemList.map((item) => {
              for (let key in item) {
                item[key] = item[key] == "null" ? " " : item[key];
                if (key == "testData" && item[key]) {
                  item[key] = item[key].replace(/\<br\/\>/g, "\r\n");
                }
              }
              return Object.assign(item, { name: kindItem.kindDesc });
            });
            this.checkItemData.push(...ItemList);
            this.spanMerge = {};
            this.checkItemData.forEach((item) => {
              if (!this.spanMerge[item.kindOid]) {
                this.spanMerge[item.kindOid] = {
                  flag: false,
                  size: 0,
                };
              }
              this.spanMerge[item.kindOid].size++;
            });
          });
        });
      });
    },
    // 提交检测详情
    fn_handCheckItemSubmit() {
      this.checkItemDialogVisible = false;
      this.checkItemData.forEach((item, idx) => {
        item.testData = item.testData.replace(/[\r\n]/g, "<br/>");
        this.$http
          .post("/api/labCheckItem" + this.fn_transParam(item))
          .then((res) => {
            if (idx + 1 == this.checkItemData.length) {
              success(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(this.$t("energy.xgxmjg"), err);
          });
      });

      console.log(this.checkItemData);
    },
    // TODO 合并单元格
    fn_objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let oSpanM = this.spanMerge[row.kindOid];
        return !oSpanM.flag ? (oSpanM.flag = true && [oSpanM.size, 1]) : [0, 0];
      }
    },
    // 获取最新化验室检测种类、
    fn_getLabKind2Data(recId, callback) {
      this.$http
        .get("/api/labCheckKind2List?recId=" + recId)
        .then((kind2Res) => {
          callback(kind2Res.data.rows);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 获取最新化验室检测结果
    fn_getLabItemData(kindItem, callback) {
      this.$http
        .get("/api/labCheckItemList?kindOid=" + kindItem)
        .then((itemRes) => {
          let resList = itemRes.data.rows.sort((a, b) => a.sn - b.sn);
          callback(resList);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 分页操作
    // 改变显示数据量
    fn_handleRecorderSizeChange(size) {
      // 数组拍平
      let tempArr = this.labRecorderData.reduce((a, b) => a.concat(b), []);
      // 重组
      this.labRecorderData = [];
      tempArr.forEach((item, idx) => {
        let index = Math.floor(idx / size);
        if (!this.labRecorderData[index]) {
          this.labRecorderData[index] = [];
        }
        this.labRecorderData[index].push(item);
        this.recorderCurrentPage = 0;
      });
    },
    // 当前页
    fn_handleRecorderCurrentChange(page) {
      this.recorderCurrentPage = page - 1;
    },

    // 获取质量检查类型
    fn_getCateData() {
      // 请求数据
      this.$http
        .post("/api/qcCheckCateList")
        .then((res) => {
          let { data } = res;
          this.cateOptions = data.map((item) => {
            return {
              value: item.cateId,
              label: item.cateName,
            };
          });
          this.fn_getKindData();
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    // 获取检查种类
    fn_getKindData() {
      this.$http
        .post("/api/qcCheckKindList")
        .then((res) => {
          let kindData = res.data;
          let tempData = {};
          kindData.forEach((item) => {
            if (!tempData[item.cateId]) {
              tempData[item.cateId] = [];
            }
            tempData[item.cateId].push({
              value: item.kindCode,
              label: item.kindDesc,
              code: item.kindOid,
            });
          });
          // 赋值子项
          this.cateOptions = this.cateOptions.map((item) => {
            return Object.assign(item, { children: tempData[item.value] });
          });
          console.log(this.$t("energy.jcx"), this.cateOptions);
        })
        .catch((err) => {
          console.log(err);
          error(this.$t("energy.fwqcw"));
        });
    },
    // 获取检测报告数据
    fn_getRecorderData() {
      this.$http.post("/api/labCheckRecorderList").then((res) => {
        this.labRecorderData = [];
        res.data.forEach((item, idx) => {
          let index = Math.floor(idx / 20);
          if (!this.labRecorderData[index]) {
            this.labRecorderData[index] = [];
          }
          this.labRecorderData[index].push(item);
        });
        // this.labRecorderData = res.data;
        this.recorderTotal = res.data.length;
      });
    },
    // 格式化参数
    fn_transParam(param) {
      let resultStr = "";
      Object.entries(param).forEach((item) => {
        resultStr += `&${item[0]}=${item[1]}`;
      });
      return "?" + resultStr.slice(1);
    },
    fn_openDialog() {
      this.recorderAddDialogVisible = true;
      // 初始化表格
      this.labFormData = Object.assign({}, this.labInitFormData);
      this.kindCodes = [];
    },
    // 新增/修改 报告数据
    fn_handRecorderAdd() {
      // 初始化
      // this.labFormData = Object.assign(this.labFormData,this.labInitFormData);
      this.recorderAddDialogVisible = false;
      // 修改
      if (this.labFormData.recId) {
        this.$http
          .post("/api/labCheckRecorder" + this.fn_transParam(this.labFormData))
          .then((res) => {
            // 重新请求数据
            this.fn_getRecorderData();
            success(res.data.msg);
          });
        // 判断是否修改子项
        // TODO不存在则删除，多则添加
        // 通过对种类编码进行比较
        if (this.tKindVal === this.labFormData.checkCate) {
          // 删除
          this.fn_getLabKind2Data(this.labFormData.recId, (kindIds) => {
            kindIds.forEach((kindItem) => {
              this.fn_handCateItemDel(kindItem.kindOid);
            });
          });
          // 新增
          this.fn_handCateItemAdd(this.labFormData.recId, this.kindValues);
        } else {
          this.fn_getLabKind2Data(this.labFormData.recId, (kind2Data) => {
            let tKindData = []; // String[]
            this.kindCodes.forEach((kinds, idx) => {
              // kind2Data : Object[]
              let index = kind2Data.findIndex((item) => item.sn == kinds);
              if (index == -1) {
                // 新增
                tKindData.push(this.kindValues[idx]);
              } else {
                // 存在的
                kind2Data.splice(index, 1);
              }
            });
            // 新增操作 tKindData
            this.fn_handCateItemAdd(this.labFormData.recId, tKindData);
            // 删除操作 kind2Data
            kind2Data.forEach((kindItem) => {
              this.fn_handCateItemDel(kindItem.kindOid);
            });
            //
          });
        }
      } else {
        // 新增
        this.labFormData = Object.assign({}, this.labFormData, {
          createMan: this.$store.state.userOid,
          checkCode: this.recorderTotal + 1,
          createTime: timeConversion(new Date()),
        });
        this.$http
          .put("/api/labCheckRecorder" + this.fn_transParam(this.labFormData))
          .then((res) => {
            let recId = res.data.data;
            success(res.data.msg);
            // 重新请求数据
            this.fn_getRecorderData();
            // 添加子项
            this.fn_handCateItemAdd(recId, this.kindValues);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 编辑
    fn_handleRecorderEdit(row) {
      this.recorderAddDialogVisible = true;
      this.labFormData = Object.assign({}, row);
      // 定义变量存储类别
      this.tKindVal = row.checkCate;
      this.$http.get("/api/labCheckKind2List").then((kind2Res) => {
        let kind2List = kind2Res.data.rows;
        // TODO 可能需要修改
        this.kindCodes = [];
        kind2List.forEach((kindItem) => {
          if (kindItem.recId != row.recId) return;
          // this.kindValues.push(kindItem.kindDesc);
          this.kindCodes.push(kindItem.kindCode);
        });
      });
    },
    // 删除报告数据
    fn_handRecorderDel(row) {
      this.$confirm(this.$t("energy.qrsc")).then((_) => {
        this.$http
          .delete("/api/labCheckRecorder?recId=" + row.recId)
          .then((res) => {
            success(res.data.msg);
            // 刷新数据
            this.fn_getRecorderData();
            // 删除子明细
            this.fn_getLabKind2Data(row.recId, (kindIds) => {
              kindIds.forEach((kindItem) => {
                this.fn_handCateItemDel(kindItem.kindOid);
              });
            });
          })
          .catch((err) => {
            console.error(this.$t("energy.scsb"));
          });
      });
    },
    // 新增报告明细字段
    fn_handCateItemAdd(recId, kindData) {
      // 获取检查种类()
      this.$http
        .get("/api/qcCheckKindList?cateId=" + this.labFormData.checkCate)
        .then((kindRes) => {
          kindData.forEach((cateId) => {
            let tKind = kindRes.data.rows.find(
              (kindItem) => kindItem.kindOid === cateId
            );
            tKind.recId = recId;
            // 赋值化验室检查种类
            this.$http
              .put("/api/labCheckKind2" + this.fn_transParam(tKind))
              .then((kind2Res) => {
                let newkindOid = kind2Res.data.data;
                // 获取qc检查项目
                this.$http
                  .get("/api/qcCheckItemList?kindOid=" + cateId)
                  .then((itemRes) => {
                    let dataList = itemRes.data.rows;
                    console.log("643", dataList);
                    dataList.forEach((iItem) => {
                      delete iItem.itemOid;
                      iItem.kindOid = newkindOid;
                      this.$http
                        .put("/api/labCheckItem" + this.fn_transParam(iItem))
                        .then((item2Res) => {
                          console.log(
                            this.$t("energy.tjhy"),
                            item2Res.data.msg
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    });
                  });
              });
          });
        });
    },
    // 删除子明细
    fn_handCateItemDel(id) {
      this.$confirm(this.$t("energy.qrsc")).then((_) => {
        this.$http
          .delete("/api/labCheckKind2?kindOid=" + id)
          .then((res) => {
            this.fn_getLabItemData(id, (ItemList) => {
              ItemList.forEach((item) => {
                this.$http
                  .delete("/api/labCheckItem?itemOid=" + item.itemOid)
                  .then((res) => {
                    // ...
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });
            });
          })
          .catch((err) => {
            console.error(this.$t("energy.scsb"));
          });
      });
    },
  },
  created() {
    this.fn_getRecorderData();
    this.fn_getCateData();
  },
};
</script>
<style lang="stylus" scpoed>
.table-wrapper {
  margin-top: 15px;
  text-align: left;
}

.table-wrapper>.el-button {
  margin: 10px 0 10px 0;
}

// 删除按钮
.el-button.delBtn {
  color: red;
}
</style>





