<template>
  <div id="policy">
    <basicContainer>
      <div class="head-top">
        用户未登录或登录超时，请重新登录！
        <el-button type="text" @click.stop="fn_target">重试</el-button>
      </div>
    </basicContainer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Policy",
  data() {
    return {
      inpu: false, //打开条件输入的状态
      condition: "", //输入框的内容,
      uruleUrl: ""
    };
  },
  methods: {
    fn_target() {
      // let urlType = "";
      // window.location.href.split("Screen")[0].includes("test")
      //   ? (urlType = "test")
      //   : "demo";
      //   console.log();

      // axios.defaults.withCredentials = true; // 让ajax携带cookie
      // axios({
      //   type: "get",
      //   url: this.uruleUrl + "/seeionId",
      //   data: { seeionId: "1112233", data: "hello third" }
      // }).then(res => {
      //   console.log(res);
      // });
      // this.$axios
      //   .get(this.uruleUrl + "/seeionId", { withCredentials: true })
      //   .then(res => {
      //     console.log(res);
      //     if (res.data == 0) {
      //       return;
      //     } else {
      window.open(
        "http://testurule.ewdfs.gsitcloud.com/urule/frame",
        "mainFrame"
      );
      //     }
      //   });
    }
  },
  mounted() {},
  created() {
    window.open(
      "http://testurule.ewdfs.gsitcloud.com/urule/frame",
      "mainFrame"
    );
    // document.cookie.split(";").forEach((item, index) => {
    //   if (item.includes("urule")) {
    //     this.uruleUrl = item.split("=")[1];
    //   } else {
    //     this.uruleUrl = "http://testurule.ewdfs.gsitcloud.com";
    //   }
    // });
    this.fn_target();
  }
};
</script>
<style lang="stylus">
#policy {
  .head-top {
    height: 500px;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding: 5px;
    letter-spacing: 1.5px;
  }
}
</style>