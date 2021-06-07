<!--
 * @Author: Lyl
 * @Date: 2021-04-17 16:09:33
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-13 20:48:39
 * @Description: 
-->
<template>
  <div id="viewTags">
    <!-- <div class="tag-box"> -->
    <div
      class="tag-content"
      v-for="(t, i) in tagView"
      :key="i"
      :class="$route.path === t.fullPath ? 'is-open' : ''"
      @click="to(t)"
    >
      <i :class="t.icon"></i>
      <span>{{ t.title }}</span>

      <i
        class="el-icon-close"
        @click.stop="closeTag(i)"
        v-if="t.fullPath != '/'"
      ></i>
      <span v-else style="margin-left: 15px"> </span>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: "viewTags",
  components: {},
  data() {
    return {
      tagView: this.$store.getters.getTagView,
    };
  },
  computed: {
    getTagView() {
      return this.$store.getters.getTagView;
    },
  },
  watch: {
    getTagView(n, o) {
      this.tagView = n;
      // this.$store.commit('SET_KEEPALIVE_LIST', this.tagView)
      window.sessionStorage.setItem("tagView", JSON.stringify(this.tagView));
    },
  },
  methods: {
    to(val) {
      if (val.fullPath == this.$route.path) {
        return;
      }
      this.$router.push({ path: val.fullPath });
    },
    closeTag(i) {
      this.removeATagView(this.$store.state.user, i);
    },
    // 只移除一个 tagView
    removeATagView(state, payload) {
      // 记录被移除的路由
      if (payload == 0) {
        return;
      }
      const removedTagView = state.tagView[payload].fullPath;
      state.tagView.splice(payload, 1);
      // 如果移除后， tagView 为空
      // 如果移除的是最后一个 tagView 则路由跳转移除后的最后一个 tagView
      if (
        payload === state.tagView.length &&
        this.$route.path === removedTagView
      ) {
        this.$router.push(state.tagView[payload - 1].fullPath);
        return;
      }
      // 如果移除的是第一个 tagView 则路由跳转移除后的第一个 tagView
      if (payload === 0 && this.$route.path === removedTagView) {
        this.router.push(state.tagView[0].fullPath);
        return;
      }
      if (this.$route.path === removedTagView) {
        this.router.push(state.tagView[payload - 1].fullPath);
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#viewTags {
  width: 95%;
  margin: 0 auto;
  background-color: #fff;
  // height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  color: #757575;
  font-size: 15px;

  .is-open {
    background: rgba(25, 118, 210, 0.0618);
    color: rgb(25, 118, 210);
  }

  .tag-box {
    // height: 26px;
    // line-height: 26px;
  }

  i {
    font-size: 20px;
  }

  .tag-content {
    height: 24px;
    line-height: 24px;
    margin: 2px 2px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    i {
      margin: 0 8px;
    }
  }

  .tag-content:hover {
    background: #eee;
  }
}
</style>
