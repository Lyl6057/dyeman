<template>
  <div id="portScan">
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane label="ip4端口扫描">
          <el-row>
            <el-col :span="10">
              <div class="btnList">
                <el-button type="primary" @click="scan">扫描</el-button>
              </div>
              <div class="box">
                <el-row>
                  <el-col :span="12">
                    <span>启动ip</span>
                    <div class="inputBox">
                      <input
                        v-model="ip1.v1"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip1.v2"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip1.v3"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip1.v4"
                        type="number"
                        :oninput="inpRule"
                      />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span>结束ip</span>
                    <div class="inputBox">
                      <input
                        v-model="ip2.v1"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip2.v2"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip2.v3"
                        type="number"
                        :oninput="inpRule"
                      />
                      <input
                        v-model="ip2.v4"
                        type="number"
                        :oninput="inpRule"
                      />
                    </div>
                  </el-col>
                  <el-col :span="24" style="margin-top: 20px">
                    <span>端口</span>
                    <div class="selectBox">
                      <el-select
                        v-model="port"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择端口号"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- <avue-form ref="form" v-model="form" :option="formOp"></avue-form> -->
            </el-col>
            <el-col :span="14" style="margin-top: 50px">
              <div class="ipBox">
                <span v-for="(item, index) of textarea" :key="index">{{
                  item
                }}</span>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="ip6端口扫描">
          <el-row>
            <el-col :span="10">
              <div class="btnList">
                <el-button type="primary" @click="scan">扫描</el-button>
              </div>
              <div class="box">
                <el-row>
                  <el-col :span="24">
                    <span>启动ip</span>
                    <div class="inputBox1">
                      <input v-model="ip1.v5" :oninput="inpRule" />
                    </div>
                  </el-col>
                  <el-col :span="24" style="margin-top: 23px">
                    <span>结束ip</span>
                    <div class="inputBox1">
                      <input v-model="ip2.v5" :oninput="inpRule" />
                    </div>
                  </el-col>
                  <el-col :span="24" style="margin-top: 20px">
                    <span>端口</span>
                    <div class="selectBox">
                      <el-select
                        v-model="port"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择端口号"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- <avue-form ref="form" v-model="form" :option="formOp"></avue-form> -->
            </el-col>
            <el-col :span="13" :offset="1">
              <!-- <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea"
              >
              </el-input> -->
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getPort } from "@/api/mto/Rt/index.js";
import { webSocket } from "@/config/index.js";
export default {
  name: "portScan",
  components: {},
  data() {
    return {
      textarea: [],
      inpRule: "if(value.length>32)value=value.slice(0,32);if(value<0)value=''",
      ip1: {
        v1: "",
        v2: "",
        v3: "",
        v4: "",
        v5: "",
        v6: "",
        v7: "",
        v8: "",
      },
      ip2: {
        v1: "",
        v2: "",
        v3: "",
        v4: "",
        v5: "",
        v6: "",
        v7: "",
        v8: "",
      },
      port: "",
      options: [
        {
          label: "80",
          value: 80,
        },
        {
          label: "81",
          value: 81,
        },
        {
          label: "8080",
          value: 8080,
        },
      ],
    };
  },
  watch: {},
  methods: {
    setWebSoket() {
      webSocket.setWebSoket(this);
      let _this = this;
      //接收到消息的回调方法
      _this.websocket.onmessage = function (event) {
        // let data = JSON.parse(event.data);
        this.textarea.push(event.data);
      };
    },
    scan() {
      let ip = "10.0.168.127,10.0.168.128";
      // let port = [443, 445];
      getPort({
        ip,
      }).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.setWebSoket();
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#portScan {
  height: 100%;
  width: 100%;
  padding-bottom: 50px;

  .ipBox {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    padding: 5px 10px;
    border: 1px solid #ccc;
    height: calc(100vh - 250px);
    overflow: hidden;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  }

  .el-tabs__content {
    padding-bottom: 50px;
  }

  .box {
    height: 36px;
    line-height: 36px;
    width: 100%;
    font-size: 16px;
    text-align: center;
    min-width: 450px;
  }

  .el-select .el-input--mini .el-input__inner {
    min-height: 38px !important;
    line-height: 38px !important;
  }

  .selectBox {
    width: 85%;
    text-align: left;
    float: right;
    min-width: 350px;

    input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }

  .inputBox {
    float: right;
    width: 69%;
    border: 1px solid #DCDFE6;
    text-align: center;
    border-radius: 4px;

    input {
      text-align: center;
      width: 20%;
      border: none;
      font-size: 15px;
      border-right: 1px solid #DCDFE6;
    }

    input:last-child {
      border: none;
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .inputBox1 {
    float: right;
    width: 85%;
    border: 1px solid #DCDFE6;
    text-align: center;
    border-radius: 4px;

    input {
      text-align: left;
      width: 95%;
      border: none;
      font-size: 15px;
      border-right: 1px solid #DCDFE6;
    }

    input:last-child {
      border: none;
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
  }
}
</style>