<template>
  <div>
    <vue-particles
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
      clickMode="push"
      class="texiao"
    >
    </vue-particles>

    <el-container id="login">
      <el-header> </el-header>
      <el-main>
        <div class="login">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="loginForm"
          >
            <el-form-item prop="username">
              <div class="title">IOT CC</div>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入账号"
                clearable
                @keyup.enter.native="submitForm('loginForm')"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="loginForm.password"
                show-password
                @keyup.enter.native="submitForm('loginForm')"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-button
              class="text"
              style="
                color: white;
                font-weight: bold;
                font-size: 16px;
                height: 32px;
              "
              size="medium"
              type="primary"
              @click="submitForm('loginForm')"
              >LOGIN</el-button
            >
          </el-form>
        </div>
      </el-main>
      <el-footer>
        <div class="login-footer">
          <el-row>
            <el-col :span="6" class="footer-title">
              <a href="#">关于我们</a>
            </el-col>
            <el-col :span="6" class="footer-title">
              <a href="#">联系我们</a>
            </el-col>
            <el-col :span="6" class="footer-title">
              <a href="#">更新日志</a>
            </el-col>
            <el-col :span="6">
              <a href="#">反馈建议</a>
            </el-col>
            <el-col :span="24">
              <a href="#">© 新益新(惠州)贸易有限公司</a>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
// import { cofirm, success, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [{ required: true, message: "账号不能为空" }],
        password: [{ required: true, message: "密码不能为空" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.loginForm.username == "admin" &&
            this.loginForm.password == "admin"
          ) {
            this.$tip.success("恭喜你,登录成功!");
            this.$router.push({ path: "/home" });
          } else {
            this.$tip.error("账号或密码错误，请重新登录！");
          }
        } else {
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang="stylus">
// .particles-js-canvas-el {
// min-height: 150%;
// min-width: 150%;
// z-index: 15;
// }
.text {
  z-index: auto;
  position: relative;
  margin: 5px 0;
}

.texiao {
  /* background-size: cover; */
  width: 100vw;
  height: 100vh;
}

#login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -250px;
  width: 500px;
  height: 500px;

  .loginForm {
    margin-top: 2em;
  }

  .el-form, .avue-group__item {
    background: transparent !important;
  }

  .el-form-item__content {
    height: 5em;
  }

  .el-button--primary, .el-button--default {
    color: #fff !important;
  }
}

.login {
  font-family: '10';
  color: rgb(63, 161, 255);
  // float: right;
  width: 100%;
  min-width: 200px;
  height: 500px;
  text-align: center;
}

.login .el-input__inner {
  height: 35px;
  line-height: 35px;
  text-indent: 0.5em;
  font-size: 14px;
  margin: 5px 0;
  border-radius: 2px !important;
}

.login .el-button--medium {
  color: rgb(63, 161, 255);
  width: 100%;
  height: 35px;
}

.login .el-input {
  font-size: 16px;
}

.login .el-input__icon {
  line-height: 35px;
}

.title {
  font-size: 68px;
  margin-left: 10px;
  letter-spacing: 15px;
}

.login-footer {
  color: #fff !important;
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
}

.login-footer .footer-title {
  border-right: 1px #fff solid;
}

.login-footer .el-col-24 {
  margin-top: 10px;
}

.login-footer a {
  text-decoration: none;
  color: #fff !important;
}

.login-footer a:hover {
  border-bottom: 1px solid black;
}

#login .el-main {
  overflow: hidden;
}
</style>