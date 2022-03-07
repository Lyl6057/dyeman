<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-03 08:56:05
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
import { webSocket } from "@/config/index.js";
import axios from "axios";
// import { getUcmlUser } from "@/const/whse.js";
export default {
  name: "App",
  data() {
    return {
      spowerClient: null,
    };
  },
  mounted() {
    // parent.userID
    webSocket.setClient(this);
    this.setSpowerClient(this.spowerClient);
    axios({
      url: "/api/ucmlUser",
      method: "get",
      params: { usrLogin: parent.userID }, // ||
    }).then((Res) => {
      // 登錄用戶oid
      // this.$store.dispatch("setUsers", Res.data.ucmlUseroid);
      this.setUsers(Res.data[0].ucmlUseroid);
      // this.$store.getters.getUser  --- this.$store.state.userOid
    });
    // 獲取多語言
    let lang = "1";
    document.cookie.split(";").forEach((item, index) => {
      if (item.includes("ucml_Language")) {
        lang = item.split("=")[1];
      }
      if (index === document.cookie.split(";").length - 1) {
        this.setLangs(lang);
      }
    });
    // window.sessionStorage.setItem("tagView", "[]");
  },
  methods: {
    ...mapActions(["setUsers", "setLangs", "setSpowerClient"]),
  },
};
</script>

<style lang="stylus">
.big
  .el-table__fixed-header-wrapper
    top 37px !important
.mid
  .el-table__fixed-header-wrapper
    top 35px !important
body, html, *
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif
.lizi
  background-image url('./assets/bg.jpg')
  /* background-size: cover; */
  position absolute
  top 0
  left 0
  width 100%
  height 100%
#app
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100%
  height 100%
.el-card__body
  padding 0 !important
</style>
