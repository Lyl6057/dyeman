/* 
 * @生产工作指令单
 * Created by zwz 
 * on 2019-8-22 0:25:00.
 */
<template>
  <div>
    <el-row>
      <!-- 订单号查询 -->
      <el-col :span="24">
        <avue-form :option="formOption" v-model="form">
          <template slot="menuForm">
            <el-button type="primary" size="small" @click="handleSubmit"
              >查 询</el-button
            >
            <el-dialog title="订单信息表" :visible.sync="poNo" width="80%">
              <avue-crud
                :data="poNodata"
                :option="poNoOption"
                v-model="poNoObj"
                :page="poNopage"
              ></avue-crud>
            </el-dialog>
          </template>
        </avue-form>
      </el-col>
      <!-- 生产工作指令表 -->
      <el-col :span="24">
        <avue-crud
          :data="gridData"
          :option="gridOption"
          :page="page"
          @row-save="addData"
          @row-update="fn_update"
          @row-del="del"
        ></avue-crud>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { cofirm, success, error, warning, info } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { isDate } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  data() {
    return {
      poNo: false, //订单号查询表
      poNopage: {
        //订单表分页
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      poNoObj: {},
      //订单表表头
      poNoOption: {
        addBtn: false,
        menu: false,
        border: true,
        refreshBtn: false,
        columnBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "订单详情OID",
            prop: "poDtlaOID",
            width: 200,
            hide: true,
          },
          {
            label: "包装要求",
            prop: "packRequest",
          },
          {
            label: "客人代码",
            prop: "custId",
          },
          {
            label: "合同号",
            prop: "poNo",
          },
          {
            label: "客人合同编号",
            prop: "custContNo",
            hide: true,
          },
          {
            label: "颜色",
            prop: "colorName",
          },
          {
            label: "针数",
            prop: "pinNumber",
          },
          {
            label: "寸数",
            prop: "inchNumber",
          },
        ],
      },
      poNodata: [], //订单表数据

      form: {}, //订单号查询框
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        label: "查询条件",
        card: false,
        labelWidth: 110,
        gutter: 100,
        column: [
          {
            label: "订单号",
            prop: "poNo",
          },
          // {
          //   label: "制单人",
          //   prop: "createPerson"
          // },
          // {
          //   label: "跟单员",
          //   prop: "followPerson"
          // }
        ],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      gridData: [],
      data: [],
      gridOption: {
        align: "center",
        menuWidth: 150,
        border: true,
        menuAlign: "center",
        column: [
          {
            label: "订单号",
            prop: "poNo",
            width: 100,
          },
          {
            label: "指令ID",
            prop: "workOrderId",
            width: 270,
            hide: true,
          },
          {
            label: "生产排期ID",
            prop: "schId",
            width: 170,
            hide: true,
          },
          {
            label: "制单人",
            prop: "createPerson",
          },
          {
            label: "生产数量",
            prop: "proAmount",
          },
          {
            label: "跟单员",
            prop: "followPerson",
          },
          {
            label: "创建时间",
            prop: "createTime",
            type: "datetime",
            width: 200,
          },
        ],
      },
    };
  },
  mounted() {
    this.fn_PostList(); //进入页面默认查询生产工作指令单
  },
  methods: {
    //查询
    fn_PostList() {
      let data = isDate(this.gridOption, this.form);
      const url = "/api";
      this.$axios
        .post(url + "/proWorkOrderList")
        .then((res) => {
          this.gridData = res.data;
        })
        .catch(() => {
          error("系统错误");
        });
    },
    //新增
    addData(row, done) {
      let data = isDate(this.gridOption, row);
      const url = "/api";
      this.loading = true;
      this.$axios
        .put(
          url +
            "/proWorkOrder" +
            "?createPerson=" +
            data.createPerson +
            "&createTime=" +
            data.createTime +
            "&followPerson=" +
            data.followPerson +
            "&poNo=" +
            data.poNo +
            "&proAmount=" +
            data.proAmount +
            "&schId=" +
            data.schId
        )
        .then((res) => {
          if (res.data.code == 0) {
            success("新增成功");
            this.fn_PostList();
          }
        })
        .catch((err) => {
          error("格式错误！");
        });
      this.loading = false;
      done();
    },
    //更新数据
    fn_update(row, index, done, loading) {
      let data = isDate(this.gridOption, row);
      const url = "/api" + "/proWorkOrder";
      this.$axios
        .post(
          url +
            "?createPerson=" +
            data.createPerson +
            "&createTime=" +
            data.createTime +
            "&followPerson=" +
            data.followPerson +
            "&poNo=" +
            data.poNo +
            "&proAmount=" +
            data.proAmount +
            "&schId=" +
            data.schId +
            "&workOrderId=" +
            data.workOrderId
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.fn_PostList();
            success("修改成功");
          } else {
            warning("修改失败");
          }
        })
        .catch(() => {
          error("系统错误");
        });
      done();
    },
    //删除
    del(row, index) {
      const url = "/api";
      const data = row.workOrderId;
      cofirm("此操作将永久删除该文件,是否继续", "warning")
        .then((res) => {
          this.$axios
            .delete(url + "/proWorkOrder?workOrderId=" + data)
            .then((res) => {
              if (res.data.code == 0) {
                success("删除成功");
                this.fn_PostList();
              } else {
                warning("删除失败");
              }
            });
        })
        .catch((err) => {
          info("已取消删除");
        });
    },
    // 订单号查询
    handleSubmit() {
      this.poNo = true;
      const url = "/api";
      this.$axios
        .post(url + "/proWorkOrder/salPo?poNo=" + this.form.poNo)
        .then((res) => {
          this.poNodata = res.data;
        })
        .catch(() => {
          error("系统错误!");
        });
    },
  },
};
</script>

<style scoped>
</style>