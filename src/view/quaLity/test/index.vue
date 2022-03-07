<!--
 * @Author: Lyl
 * @Date: 2022-02-21 09:35:20
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-21 09:56:01
 * @FilePath: \iot.vue\src\view\quaLity\test\index.vue
 * @Description: 
-->
<template>
  <div class="filename">
    <template>
      <el-table :data="tableData" style="width: 100%" @row-click="rowClick">
        <el-table-column label="" width="70">
          <template slot-scope="scope" v-if="scope.row.id == detail.id">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >新增</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      detail: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 2,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: 3,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          id: 4,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    rowClick(val) {
      this.detail = val;
    },
  },
};
</script>
<style lang="stylus" scoped></style>