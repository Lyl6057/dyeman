<template>
  <div id="socket">
    <div style="display: none" ref="onopen">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>提示</span>
        </div>
        <!-- <div>websocket通信已经连接成功,并发送内容</div> -->
        <!-- <div>{{data}}</div> -->
        <div>正在启动程序...</div>
      </el-card>
    </div>
    <div ref="onerror" style="display: none">
      <!-- <div>websocket通信连接失败,请下载Debug并手动运行Launch OpenAPP.exe,运行后请刷新页面</div>
      <div style="cursor:pointer;color:blue" @click="download">点击下载</div>-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">提示</div>
        <div class="text item">
          未安装插件，请点击下载插件并手动运行Launch Start.exe。
        </div>
        <div class="text item">运行后请刷新页面。</div>
        <div>
          <el-button type="primary" size="small" @click="download"
            >下载插件</el-button
          >
        </div>
      </el-card>
    </div>

    <!-- <el-button @click="fn_getquery">默认按钮</el-button> -->
  </div>
</template>
<script>
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
export default {
  data() {
    return {
      textarea: "打开MainWindow",
      websock: null,
      data: "",
      url: {}, //url参数变量名
    };
  },
  destroyed() {
    //页面销毁时关闭ws连接
    if (this.websock) {
      this.websock.close(); // 关闭websocket
    }
  },
  mounted() {
    this.btnClick();
    this.fn_getquery();
  },
  methods: {
    //初始化weosocket
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      const wsuri = "ws://127.0.0.1:40001"; // websocket地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen; //连接websocketURL地址
      this.websock.onmessage = this.websocketonmessage; //接受后端返回参数
      this.websock.onerror = this.websocketonerror; //连接失败
      //   this.websock.onclose = this.websocketclose;
    },
    //连接成功
    websocketonopen() {
      console.log("WebSocket连接成功");
      this.$refs.onopen.style.display = "";
      //   console.log(this.$refs.onopen.style.display);
    },
    //接收后端返回的数据
    websocketonmessage(e) {
      // let dataJson = JSON.parse(e.data);
      this.data = e.data;
      console.log(e.data);
      // 在这里使用后端返回的数据，对数据进行处理渲染
    },
    //连接建立失败重连
    websocketonerror(e) {
      console.log(`连接失败的信息：`, e);
      this.$refs.onerror.style.display = "";
      //   this.initWebSocket(); // 连接失败后尝试重新连接
    },
    //关闭连接
    // websocketclose(e) {
    //   console.log("断开连接", e);
    // },

    // 点击按钮
    btnClick() {
      // 因为需求是每次点击都是发起不同ws连接，拿到的数据也不一致，所以连接前要先断开上次的连接
      if (this.websock) {
        this.websock.close(); // 关闭websocket连接
      }
      this.initWebSocket(); // 初始化weosocket，发起连接
      // 这里使用定时器是为了等待连接后才发送数据，避免错误
      setTimeout(() => {
        //添加状态判断，当为OPEN时，前端发送消息给后端
        if (this.websock.readyState === 1) {
          // 把后台需要的参数数据传过去
          this.websock.send(parent.UserID);
          // alert(this.url);
          //发给后端的数据需要字符串化
          //   this.websock.send(JSON.stringify(obj));
        }
      }, 500);
    },

    //下载Debug插件
    download() {
      window.open("../../vuePackage/proMng/setup.exe");
    },
    fn_getquery() {
      let url = window.location.search;
      this.url = url.substr(1);
    },
  },
};
</script>

<style lang="stylus">
#socket {
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
    padding-bottom: 10px;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 520px;
    margin: 50px auto;
    padding-bottom: 50px;
    text-align: center;
  }

  .box-card div {
    margin-top: 10px;
    text-align: center;
  }

  .el-card__header {
    padding: 0px 20px;
    text-align: center;
  }
}
</style>
