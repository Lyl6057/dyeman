<!--
 * @Author: Lyl
 * @Date: 2021-06-02 15:42:19
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-16 10:23:45
 * @Description: 
-->
<template>
  <div id="menu">
    <template v-for="item in menuData">
      <el-card
        class="card"
        :key="item.index"
        v-if="item.children && !item.hide"
      >
        <el-submenu :index="item.index">
          <template>
            <i slot="title" :class="item.icon"></i>
            <span v-if="isActive"> {{ item.menuName }}</span>
            <span v-else slot="title"> {{ item.menuName }}</span>
          </template>
          <menuTree :menuData="item.children" :level="level + 1"></menuTree>
        </el-submenu>
      </el-card>
      <el-card
        v-if="!item.children && !item.hide"
        :key="item.index"
        class="oneMenu"
      >
        <el-menu-item
          :index="item.index"
          :style="{ textIndent: level * 30 + 'px' }"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
      </el-card>
    </template>
  </div>
</template>
<script>
export default {
  name: "MenuTree",
  props: ["menuData", "level"],
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    isActive() {
      return this.$store.state.isActive;
    },
  },
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#menu {
  .oneMenu {
    .el-menu-item {
      padding-left: 0 !important;
      // text-indent: 0em !important;
      height: 39px;
      line-height: 39px;

      span {
        margin-left: -3px;
      }
    }

    .el-menu-item [class^=el-icon-] {
      font-size: 24px !important;
    }
  }

  .el-menu-item .el-tooltip {
    padding: 0 5px !important;
  }

  // height:100vh;
  .eldemo:not(.el-menu--collapse) {
    height: 100vh;
    // height:500px;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0);
  }

  .el-card__body {
    padding: 0 !important;
  }

  .el-menu {
    border-right: none;
  }

  .el-card {
    // margin-top: 1px;
    // margin-left: 1px;
    border-radius: 0 !important;
  }

  .sidebar {
    margin-left: 5px;
  }

  .el-submenu [class^=el-icon-] {
    font-size: 24px;
  }

  .el-submenu__title, .el-icon-arrow-down {
    font-size: 15px;
    // font-weight: 600;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* margin-right: 15px; */
    text-align: left;
    padding-left: 0 !important;
  }

  .el-menu-item {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 15px;
    padding-left: 30px !important;
  }

  .el-menu-item.is-active {
    background-color: rgba(236, 236, 236, 1);
    color: #555;
  }

  /* .sidebar .el-card__body {
    border-bottom: 1px solid rgba(64, 160, 255, 0.5);
  } */
  .sidebar .el-submenu .el-menu-item {
    text-align: left;
    // text-indent: 0.5em;
  }

  .sidebar .card {
    margin-left: 5px;
  }

  .sidebar .el-menu-item.is-active {
    background: rgba(64, 160, 255, 0.1);
  }

  .emps-title {
    height: 40px;
    background-color: white;
    margin: 0 5px;
    max-width: 205px;
    min-width: 50px;
    border-bottom: none;
    line-height: 40px;
  }

  .card .title {
    margin-right: 50px;
  }

  .card .el-submenu__icon-arrow {
    right: 10px;
  }

  .card .el-submenu .el-menu-item {
    min-width: 100%;
  }

  .el-submenu [class^='el-icon-'] {
    line-height: 39px;
    float: left;
    // margin-left: 15%;
  }

  .el-menu-item {
    text-align: left;
    // text-indent: 0.5em;
    margin-top: 1px;
  }
}
</style>
