/* 
 * @设备分类
 * Created by Lyl 
 * on 2020-10-8 16:14:24.
 */
<template>
  <div id="eqClassify">
    <view-container title="设备分类">
      <div class="btnList">
        <el-button type="primary" @click="add" :disabled="loading">{{
          this.$t("public.add")
        }}</el-button
        ><el-button type="primary" @click="update" :disabled="loading">{{
          this.$t("public.update")
        }}</el-button
        ><el-button type="danger" @click="del" :disabled="loading">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="success" @click="sava" :disabled="loading">{{
          this.$t("public.save")
        }}</el-button
        ><el-button type="info" @click="cancel" :disabled="loading"
          >取消</el-button
        >
        <el-button type="primary" @click="query" :disabled="loading">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="danger" @click="close" :disabled="loading">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          v-loading="loading"
          ref="crud"
          :data="data"
          :option="crudOp"
          @current-row-change="cellClick"
          :page.sync="page"
        >
        </avue-crud>
      </div>
    </view-container>
  </div>
</template>

<script>
const iconList = [
  {
    label: "基本图标",
    label: "基本图标",
    list: [
      {
        label: "user",
        value: "el-icon-user-solid",
      },
      {
        label: "phone",
        value: "el-icon-phone",
      },
      {
        label: "more",
        value: "el-icon-more",
      },
      {
        label: "star",
        value: "el-icon-star-on",
      },
      {
        label: "camera",
        value: "el-icon-camera-solid",
      },
      {
        label: "video",
        value: "el-icon-video-camera",
      },
      {
        label: "message",
        value: "el-icon-message-solid",
      },
      {
        label: "platform",
        value: "el-icon-s-platform",
      },
      {
        label: "flag",
        value: "el-icon-s-flag",
      },
      {
        label: "opportunity",
        value: "el-icon-s-opportunity",
      },

      {
        label: "view",
        value: "el-icon-view",
      },
      {
        label: "office",
        value: "el-icon-office-building",
      },
      {
        label: "shopping",
        value: "el-icon-shopping-cart-full",
      },
      {
        label: "mic",
        value: "el-icon-mic",
      },
    ],
  },
];

export default {
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        total: 4,
      },
      oldData: {}, // 记录上一次点击编辑
      changeList: [], // 记录修改的对象
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,

        column: [
          {
            label: "层级",
            prop: "gradeLevel",
            span: 6,
          },
          {
            label: "叶子节点",
            prop: "isLeaf",
            span: 6,
          },
          {
            label: "设备类型",
            prop: "typeName",
            span: 6,
          },
          {
            label: "类型编号",
            prop: "typeNumber",
            span: 6,
          },
        ],
      },
      data: [
        {
          classifyId: "001",
          parentId: "",
          gradeLevel: 1,
          sn: 1,
          isLeaf: "001",
          typeName: "网络设备",
          typeNumber: 1,
          typeDescribe: "网络设备",
          typeIcon: "el-icon-s-data",
          children: [
            {
              classifyId: "001001",
              parentId: "001",
              gradeLevel: 2,
              sn: 1,
              isLeaf: "001001",
              typeName: "交换机",
              typeNumber: 4,
              typeDescribe: "交换机",
              typeIcon: "el-icon-s-flag",
            },
            {
              classifyId: "001002",
              parentId: "001",
              gradeLevel: 2,
              sn: 2,
              isLeaf: "001002",
              typeName: "打印机",
              typeNumber: 5,
              typeDescribe: "打印机",
              typeIcon: "el-icon-printer",
            },
            {
              classifyId: "001003",
              parentId: "001",
              gradeLevel: 2,
              sn: 3,
              isLeaf: "001003",
              typeName: "视频监控",
              typeNumber: 6,
              typeDescribe: "视频监控",
              typeIcon: "el-icon-video-camera",
            },
          ],
        },

        {
          classifyId: "002",
          parentId: "",
          gradeLevel: 2,
          sn: 2,
          isLeaf: "002",
          typeName: "电脑设备",
          typeNumber: 2,
          typeDescribe: "电脑设备",
          typeIcon: "el-icon-s-platform",
          children: [
            {
              classifyId: "002001",
              parentId: "002",
              gradeLevel: 2,
              sn: 1,
              isLeaf: "002001",
              typeName: "计算机",
              typeNumber: 6,
              typeDescribe: "计算机",
              typeIcon: "el-icon-s-platform",
            },
            // {
            //   classifyId: "002001",
            //   parentId: "002",
            //   gradeLevel: 2,
            //   sn: 6,
            //   isLeaf: "002001",
            //   typeName: "分类6",
            //   typeNumber: 6,
            //   typeDescribe: "test006",
            //   typeIcon: "el-icon-info",
            // },
          ],
        },
      ],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        rowKey: "classifyId",
        defaultExpandAll: false,
        height: "calc(100vh - 180px)",
        column: [
          {
            label: "分类ID",
            prop: "classifyId",
            hide: true,
          },
          {
            label: "父亲ID",
            prop: "parentId",
            hide: true,
          },
          {
            label: "层级",
            prop: "gradeLevel",
          },
          {
            label: "#",
            prop: "sn",
            align: "center",
            cell: true,
          },
          {
            label: "叶子节点",
            prop: "isLeaf",
            hide: true,
          },
          {
            label: "设备类型",
            prop: "typeName",
            cell: true,
          },
          {
            label: "类型编号",
            prop: "typeNumber",
            cell: true,
          },
          {
            label: "类型描述",
            prop: "typeDescribe",
            cell: true,
          },
          {
            label: "分类图标",
            prop: "typeIcon",
            // slot: true,
            type: "icon",
            cell: true,
            iconList: iconList,
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.data.forEach((item, index) => {
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [index].addEventListener(
            "input",
            function () {
              _this.iptChange(item);
            },
            false
          );
      });
      this.loading = false;
    },
    add() {
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.data.push({
        index: this.data.length + 1,
        $cellEdit: true,
      });
      this.oldData = this.data[this.data.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [_this.data.length - 1].addEventListener(
            "input",
            function () {
              _this.iptChange(_this.oldData);
            },
            false
          );
      });
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    update() {},
    del() {},
    sava() {
      this.oldData.$cellEdit = false;
    },
    cancel() {},
    query() {},
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    del(row, index) {
      const data = row.classifyId;
      cofirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        .then(() => {
          this.$axios
            .delete("/api/iotEquipmentType?classifyId=" + data)
            .then((res) => {
              if (res.data.code == 0) {
                success(this.$t("public.sccg"));
                this.handleList();
              } else {
                warning(this.$t("public.scsb"));
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
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.getData();
    }, 500);
  },
};
</script>

<style lang="stylus">
.el-table__row--level-0 {
  font-weight: bold !important;
  font-size: 16px !important;
}

.el-table__row--level-1 .cell {
  margin-left: 1rem !important;
}

#eqClassify {
}
</style>