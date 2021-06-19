<!--
 * @Author: Lyl
 * @Date: 2021-06-08 15:47:12
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-08 16:18:55
 * @Description: 
-->
<template>
  <div id="error">
    <div class="header"></div>
    <div class="main">404</div>
    <div class="footer">
      <div class="page">not found</div>
      <p>臣妾做不到...</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#error {
  background-image: url('../../assets/bg.jpg');
  color: #fff;
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 200px;
    line-height: 200px;
    font-size: 36px;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Work Sans', sans-serif;
    font-weight: bold;
  }

  .main {
    text-align: center;
    font-size: 188px;
    font-weight: bold;
  }

  .footer {
    margin-top: 50px;

    .page {
      text-align: center;
      font-size: 64px;
    }
  }
}
</style>