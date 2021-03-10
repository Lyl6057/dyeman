<template>
  <div id="top">
    <el-container>
      <div class="page">
        <!-- <el-header>
          <top />
        </el-header> -->
        <!-- <div style="height: 50px; background: #000"></div> -->
        <el-main class="mainBox">
          <el-row>
            <el-col :span="left">
              <!-- 左侧导航栏 -->
              <sidebar />
            </el-col>
            <el-col :span="right">
              <router-view />
            </el-col>
          </el-row>
        </el-main>
        <el-header></el-header>
      </div>
    </el-container>
  </div>
</template>

<script>
import top from "./top/index";
import sidebar from "./sidebar/index.vue";
export default {
  name: "index",
  components: {
    top,
    sidebar,
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$store.state.isActive;
    },
    left() {
      return this.$store.state.left;
    },
    right() {
      return this.$store.state.right;
    },
  },
};
</script>

<style lang="stylus">
#top {
  html {
    overflow: hidden;
  }

  .page {
    // background: url('../../assets/bg.jpg');
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
  }

  .avue-group__item {
    margin: 0 5px;
    padding-bottom: 20px;
  }

  .avue-form__menu--center {
    margin-top: 10px;
  }

  .mainBox {
    min-height: 500px;
    // max-height: 800px;
  }

  .page .el-header {
    padding: 5px;
  }

  .page .el-main {
    padding: 0;
  }
}
</style>