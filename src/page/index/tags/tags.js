/*
 * @Author: Lyl
 * @Date: 2021-05-12 21:50:17
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-23 15:42:01
 * @Description:
 */
import store from "../../store/index";
import router from "../../router";
// import _this from '../../main'

// 只移除一个 tagView
export function removeATagView(state, payload) {
  // 记录被移除的路由
  const removedTagView = state.tagView[payload].fullPath;
  state.tagView.splice(payload, 1);
  // 如果移除后， tagView 为空
  if (state.tagView.length === 0) {
    window.sessionStorage.setItem("tagView", "[]");
    router.push("/");
  } else {
    // 如果移除的是最后一个 tagView 则路由跳转移除后的最后一个 tagView
    if (
      payload === state.tagView.length &&
      _this.$route.path === removedTagView
    ) {
      router.push(state.tagView[payload - 1].fullPath);
      return;
    }
    // 如果移除的是第一个 tagView 则路由跳转移除后的第一个 tagView
    if (payload === 0 && _this.$route.path === removedTagView) {
      router.push(state.tagView[0].fullPath);
      return;
    }
    if (_this.$route.path === removedTagView) {
      router.push(state.tagView[payload - 1].fullPath);
    }
  }
}

// 移除某一侧 tagView
export function removeOneSide(state, payload) {
  switch (payload.side) {
    case "right":
      state.tagView = state.tagView.slice(0, payload.index + 1);
      if (state.tagView.length === 1) {
        router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length === payload.index + 1) {
        router.push(state.tagView[payload.index].fullPath);
      }
      break;
    case "left":
      state.tagView = state.tagView.slice(payload.index, state.tagView.length);
      if (state.tagView.length === 1) {
        router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length <= payload.index) {
        router.push(state.tagView[0].fullPath);
      }
      break;
    case "others":
      state.tagView = state.tagView.splice(payload.index, 1);
      router.push(state.tagView[0].fullPath);
      break;
    default:
      break;
  }
}
