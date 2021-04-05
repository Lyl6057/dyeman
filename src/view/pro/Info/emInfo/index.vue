<template>
  <div id="emInfo">
    <view-container title="设备监控信息">
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
        ><el-button type="info" @click="getData" :disabled="loading"
          >取消</el-button
        >
        <el-button type="primary" @click="getData" :disabled="loading">{{
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
          @on-load="getData"
          :page.sync="page"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {
  getEmInfo,
  updataEmInfo,
  addEmInfo,
  delEmInfo,
} from "@/api/pro/info/index";
export default {
  name: "emInfo",
  components: {},
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      chooseData: {},
      oldData: {}, // 记录上一次点击编辑
      changeList: [], // 记录修改的对象
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "报警时间",
            prop: "warningDate",
            span: 6,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "处理结果",
            prop: "doResult",
            span: 6,
          },
          {
            label: "处理方式",
            prop: "doWay",
            span: 6,
          },
          {
            label: "处理人员",
            prop: "whoDoIt",
            span: 6,
          },
          {
            label: "设备",
            span: 6,
            prop: "equipmentId",
            type: "select",
            dicData: [
              {
                value: "001",
                label: "交换机1",
              },
            ],
          },
        ],
      },
      data: [
        {
          warningDate: "2020-10-07 12:05:55",
          picturePath: "/statics/log/img",
          videoPath: "/statics/log/video",
          journalPath: "/statics/log",
          coverDate: "2020-10-07 14:15:18",
          equipmentId: "001",
          doResult: "完成",
          doWay: "人工",
          whoDoIt: "owt",
          index: 1,
        },
        {
          warningDate: "2020-10-07 12:05:55",
          picturePath: "/statics/log/img",
          videoPath: "/statics/log/video",
          journalPath: "/statics/log",
          coverDate: "2020-10-07 14:15:18",
          equipmentId: "001",
          doResult: "完成",
          doWay: "人工",
          whoDoIt: "owt",
          index: 1,
        },
        {
          warningDate: "2020-10-07 12:05:55",
          picturePath: "/statics/log/img",
          videoPath: "/statics/log/video",
          journalPath: "/statics/log",
          coverDate: "2020-10-07 14:15:18",
          equipmentId: "001",
          doResult: "完成",
          doWay: "人工",
          whoDoIt: "owt",
          index: 2,
        },
        {
          warningDate: "2020-10-07 12:05:55",
          picturePath: "/statics/log/img",
          videoPath: "/statics/log/video",
          journalPath: "/statics/log",
          coverDate: "2020-10-07 14:15:18",
          equipmentId: "001",
          doResult: "完成",
          doWay: "人工",
          whoDoIt: "owt",
          index: 3,
        },
        {
          warningDate: "2020-10-07 12:05:55",
          picturePath: "/statics/log/img",
          videoPath: "/statics/log/video",
          journalPath: "/statics/log",
          coverDate: "2020-10-07 14:15:18",
          equipmentId: "001",
          doResult: "完成",
          doWay: "人工",
          whoDoIt: "owt",
          index: 4,
        },
      ],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 225px)",
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
          },
          {
            label: "监控ID",
            prop: "monitoId",
            hide: true,
          },
          {
            label: "报警时间",
            prop: "warningDate",
            type: "datetime",
            align: "center",
            cell: true,
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            focus: (val) => {
              this.iptChange(this.chooseData);
            },
            change: (val) => {
              if (val.value === null) {
                this.iptChange(this.chooseData);
              }
            },
          },
          {
            label: "图片存储路径",
            prop: "picturePath",
            cell: true,
          },
          {
            label: "视频存储路径",
            prop: "videoPath",
            cell: true,
          },
          {
            label: "监控日志路径",
            prop: "journalPath",
            cell: true,
          },
          {
            label: "存储覆盖时间",
            prop: "coverDate",
            type: "datetime",
            align: "center",
            cell: true,
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            focus: (val) => {
              this.iptChange(this.chooseData);
            },
            change: (val) => {
              if (val.value === "") {
                this.iptChange(this.chooseData);
              }
            },
          },
          {
            label: "设备",
            prop: "equipmentId",
            type: "select",
            dicData: [
              {
                value: "001",
                label: "交换机1",
              },
              // {
              //   value: 1,
              //   label: "是",
              // },
            ],
            cell: true,
            click: (val) => {
              this.iptChange(this.chooseData);
            },
            change: (val) => {
              if (val.value === "") {
                this.iptChange(this.chooseData);
              }
            },
          },
          {
            label: "处理结果",
            prop: "doResult",
            cell: true,
          },
          {
            label: "处理方式",
            prop: "doWay",
            cell: true,
          },
          {
            label: "处理人员",
            prop: "whoDoIt",
            cell: true,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    getData() {
      this.data = [];
      this.oldData = [];
      this.chooseData = [];
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      getEmInfo(
        Object.assign(this.form, {
          page: this.page.currentPage,
          rows: this.page.pageSize,
          start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        })
      ).then((res) => {
        // setTimeout(() => {
        //   this.$refs.crud.setCurrentRow({});
        // }, 100);
        this.data = res.data.records;
        this.page.total = res.data.total;
        this.data.forEach((item, index) => {
          item.index = index + 1;
          let _this = this;
          _this.$nextTick(() => {
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
        });
        this.loading = false;
      });
    },
    add() {
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.data.push({
        index: this.data.length + 1,
        $cellEdit: true,
      });
      this.$refs.crud.setCurrentRow(this.data[this.data.length - 1]);
      this.iptChange(this.data[this.data.length - 1]);
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
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip.cofirm("是否确定删除", this, {}).then(() => {
        delEmInfo(this.chooseData.monitoId)
          .then((res) => {
            if (res.data.code === 200) {
              this.$tip.success(this.$t("public.sccg"));
              this.data.splice(this.chooseData.index - 1, 1);
              // this.getData();
            } else {
              this.$tip.warning(this.$t("public.scsb"));
            }
          })
          .catch((err) => {
            this.$tip.error(this.$t("public.scsb"));
          });
      });
    },
    sava() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (
          !this.changeList[i].equipmentId ||
          !this.changeList[i].warningDate
        ) {
          this.$tip.error("设备/报警时间不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.monitoId) {
          updataEmInfo(item).then((res) => {});
        } else {
          addEmInfo(item).then((res) => {});
        }
      });
      this.getData();
      this.$tip.success(this.$t("public.bccg"));
    },
    cancel() {
      this.getData();
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
  },
  created() {},
  mounted() {
    this.loading = true;
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#emInfo {
  .el-table {
    // min-height: 300px;
    // max-height: 80vh;
    // overflow: auto;
  }
}
</style>