<template>
  <div class="view-container">
    <el-card>
      <el-tabs type="border-card">
        <el-tab-pane :label="title">
          <slot />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "BasicContainer",
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "请定义你的标题",
    },
  },
};
</script>

<style lang="stylus">
.view-container {
  // padding: 0 10px;
  border-radius: 10px;
  box-sizing: border-box;

  .el-card {
    width: 100%;
  }

  &:first-child {
    padding-top: 0;
  }

  &--block {
    height: 100%;

    .el-card {
      height: 100%;
    }
  }
}
</style>
