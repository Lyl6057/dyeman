<!--
 * @Author: your name
 * @Date: 2021-03-10 13:20:44
 * @LastEditTime: 2022-01-05 18:59:50
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iot.vue\src\view\index.vue
-->
<template>
  <div class="home">
    <!-- <basicContainer> -->
    <el-row>
      <el-col :span="24">
        <avue-data-icons :option="option"></avue-data-icons>
      </el-col>
    </el-row>
    <!-- </basicContainer> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      option: {
        span: 6,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "今日注册",
            count: 12678,
            icon: "el-icon-tickets",
            href: "",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "今日登录",
            count: 22139,
            icon: "el-icon-success",
            href: "",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "今日订阅",
            count: 35623,
            icon: "el-icon-info",
            href: "",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "今日评论",
            count: 16826,
            icon: "el-icon-message",
            href: "",
            target: "_blank",
          },
        ],
      },
    };
  },
 
};
</script>

<style >
.yx-icf-bupi:before {
  content: "\e71c";
}

.yx-icf-cailiaogongcheng:before {
  content: "\e61c";
}

.yx-icf-xian:before {
  content: "\e746";
}

.yx-icf-xian1:before {
  content: "\e747";
}

.yx-icf-buliao:before {
  content: "\e74b";
}

.yx-icf-taishidiannao:before {
  content: "\e608";
}

.yx-icf-diannao:before {
  content: "\e768";
}
.home {
  height: 1000px;
}
</style>