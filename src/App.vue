<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-22 11:25:14
 * @Description: 
-->
<template>
  <div id="app">
    <!-- <vue-particles
      color="#fff"
      :particleOpacity="0.3"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="2"
      linesColor="#dedede"
      :linesWidth="0.2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="100"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="repulse"
      :clickEffect="false"
      clickMode="repulse"
      class="lizi"
    >
    </vue-particles> -->
    <router-view> </router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
// import { getUcmlUser } from "@/const/whse.js";
export default {
  name: "App",
  data() {
    return {
      big: false,
    };
  },
  mounted() {
    // window.onresize = function () {
    //   if (window.screen.width > 1600) {
    //     this.big = true;
    //   }
    // };
    // parent.userID
    axios({
      url: "/api/ucmlUser",
      method: "get",
      params: { usrLogin: "admin" },
    }).then((Res) => {
      // 登錄用戶oid
      // this.$store.dispatch("setUsers", Res.data.ucmlUseroid);
      this.setUsers(Res.data.ucmlUseroid);
      // this.$store.getters.getUser  --- this.$store.state.userOid
    });
  },
  methods: {
    ...mapActions(["setUsers"]),
  },
};
</script>

<style lang="stylus">
.big {
  .el-table__fixed-header-wrapper {
    top: 37px !important;
  }
}

.mid {
  .el-table__fixed-header-wrapper {
    top: 35px !important;
  }
}

body, html, * {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.lizi {
  background-image: url('./assets/bg.jpg');
  /* background-size: cover; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.el-card__body {
  padding: 0 !important;
}
</style>
