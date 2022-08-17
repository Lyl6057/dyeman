<template>
  <div id="top">
    <!-- <div class="dym-top">dyeMan</div> -->
    <div class="top-menu">
      <el-row>
        <el-col :span="6" class="menuLogo">
          <span
            :class="{ menuTle: !isActive, menuTle2: isActive }"
            @click="openMenu"
            >IOT CC</span
          >
          <el-button
            type="text"
            v-show="!isPhone"
            :class="{ menuBtn: !isActive, menuBtn2: isActive }"
            @click="IsActive"
          >
            <i class="el-icon-d-arrow-right" v-show="isActive" title="展开"></i>
            <i class="el-icon-d-arrow-left" v-show="!isActive" title="收起"></i>
          </el-button>
        </el-col>
        <el-col :span="18" :offset="0">
          <div class="menu-right">
            <i class="el-icon-s-home" title="主页" @click="toPage"></i>
            <i class="el-icon-view" title="主题" @click="theme"></i>
            <i class="el-icon-error" title="退出" @click="logout"></i>
            <el-dropdown @command="langHandleCommand">
              <span class="el-dropdown-link">
                语言
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1" class="logout"
                  >中文</el-dropdown-item
                >
                <el-dropdown-item command="2" class="logout"
                  >English</el-dropdown-item
                >
                <el-dropdown-item command="3" class="logout"
                  >Thổ nhĩ kỳ</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" class="logout"
                  >退出登录</el-dropdown-item
                >
                <el-dropdown-item command="hello" class="logout"
                  >hello</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="主题" :visible.sync="themeOpen" append-to-body>
        <theme ref="themes" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="themeOpen = false">取 消</el-button>
          <el-button type="primary" @click="checkTheme">确 定</el-button>
        </div>
      </el-dialog>

      <el-drawer
        title="菜单"
        class="drawerMenu"
        :visible.sync="drawer"
        :before-close="handleClose"
        direction="ltr"
      >
        <sidebar class="sbr" style="margin: 0 10px; border: none" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import theme from "../../theme/index";
import sidebar from "../sidebar/index.vue";
export default {
  name: "Top",
  components: {
    theme,
    sidebar,
  },
  data() {
    return {
      language: "zh",
      isActive: this.$store.state.isActive,
      isPhone: this.$store.state.phone,
      themeOpen: false,
      drawer: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    IsActive() {
      this.isActive = !this.isActive;
      this.$store.dispatch("isActive", this.isActive);
    },
    toPage() {
      this.$router.push({ path: "/home" });
    },
    logout() {
      this.$router.push({ path: "/" });
    },
    hello() {
      alert("hello");
    },
    theme() {
      this.themeOpen = true;
    },
    checkTheme() {
      let bgCss = document.getElementsByClassName("top-menu")[0].style;
      let moreCss = document.getElementsByClassName("el-dropdown-link")[0]
        .style;
      switch (this.$refs.themes.radio) {
        case "1":
          bgCss.backgroundColor = "rgba(0, 0, 0, 0.5)";
          bgCss.color = "white";
          moreCss.color = "white";
          break;
        case "2":
          bgCss.backgroundColor = "rgb(63, 161, 255,0.8)";
          bgCss.color = "white";
          moreCss.color = "white";
          break;
        case "3":
          bgCss.backgroundColor = "rgb(255, 255, 255,0.8)";
          bgCss.color = "black";
          moreCss.color = "black";
          break;
        default:
          break;
      }
      this.themeOpen = false;
    },
    handleCommand(command) {
      this[command]();
    },
    openMenu() {
      let isMenu = this.$store.state.phone;
      if (isMenu == true) {
        this.drawer = true;
      }
    },
    handleClose(done) {
      done();
    },
    langHandleCommand(lang) {
      document.cookie = "ucml_Language" + "=" + escape(lang);
      // sessionStorage.setItem("lang", lang);
      this.$i18n.locale = lang;
      // location.reload();
    },
  },
};
</script>

<style lang="stylus">
.dym-top {
  width: 100%;
  padding: 0;
  text-align: left;
  text-indent: 4em;
  font-size: 50px;
  color: #000;
  height: 100px;
  line-height: 140px;
  // font-family: '3';
  font-weight: bold;
  background-size: 100%;
}

.top-menu {
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 18px;
  width: 100%;
}

.el-card__body {
  padding: 0;
}

.el-menu {
  background: none;
  border: none;
}

.menuBtn {
  font-size: 24px;
  text-align: center;
  padding: 0;
  line-height: 40px;
  margin-right: 20%;
  color: white;
}

.menuBtn2 {
  font-size: 24px;
  text-align: center;
  padding: 0;
  line-height: 40px;
  margin-right: 30%;
  color: white;
}

.menuTle {
  font-family: '4';
  text-align: center;
  margin-right: 10%;
}

.menuTle2 {
  font-family: '8';
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-right: 5%;
}

.menu-right .el-icon-s-home, .el-icon-error, .el-icon-view {
  font-size: 26px;
  line-height: 40px;
  margin-left: 20px;
  cursor: pointer;
}

.menu-right {
  float: right;
}

.top-menu .dialog-footer {
  text-align: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 14px;
}

.el-icon-arrow-down {
  font-size: 14px;
}

.top-menu .el-dropdown-link {
  color: white;
  margin-left: 25px;
}

.drawerMenu {
  width: 160%;
  height: 100%;
  overflow-y: scroll;
}

.sbr.sidebar {
  height: 736px;
  overflow-y: scroll;
}

.sbr.sidebar::-webkit-scrollbar {
  width: 0 !important;
}

.sbr.sidebar::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
