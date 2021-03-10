<template>
  <div id="test">
    <div id="cj">
      <tem></tem>
    </div>
  </div>
</template>
<script>
import tem from "./tem";
export default {
  name: "",
  components: {
    tem,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {
    var box = document.getElementById("test1");
    var box1 = document.getElementById("cj");
    var xArr = [],
      yArr = [];
    var xx = 0,
      yy = 0;
    window.onmousedown = function (e) {
      xArr[0] = e.clientX / 2; //获取鼠标点击屏幕时的坐标
      yArr[0] = e.clientY / 2;

      window.onmousemove = function (e) {
        //鼠标移动事件————当鼠标按下且移动时触发
        xArr[1] = e.clientX / 2; //获取鼠标移动时第一个点的坐标
        yArr[1] = e.clientY / 2;
        yy += xArr[1] - xArr[0]; //获得鼠标移动的距离
        xx += yArr[1] - yArr[0];
        // if (yy > 180) {
        //   yy = xArr[0];
        // }
        // if (xx > 180) {
        //   xx = YArr[0];
        // }
        // box.style.transform =
        //   "rotatex(" +
        //   xx +
        //   "deg) rotatey(" +
        //   yy +
        //   "deg) rotatez(0deg)scale3d(1,1,1)";
        box1.style.transform =
          "rotatex( " +
          65 +
          "deg) rotatey(" +
          0 +
          "deg)" +
          "rotatez(" +
          yy +
          "deg)scale3d(1,1,1)";
        xArr[0] = e.clientX / 2;
        yArr[0] = e.clientY / 2;
      };
      window.onmouseup = function () {
        //鼠标抬起事件————用于清除鼠标移动事件，
        window.onmousemove = null;
      };
    };
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

#test {
  width: 100%;
  height: calc(100vh);
  overflow: scroll;

  #cj {
    width: 2000px;
    height: 1500px;
    list-style: none;
    margin-top: -200px;
    margin-left: 150px;
    padding: 0px;
    background: linear-gradient(0deg, rgba(50, 90, 132, 0.5) 0%, rgba(23, 31, 44, 0.26) 100%);
    position: relative;
    transform-style: preserve-3d; /* 将子元素转为3D */
    perspective: 5500px;
    transition: all 0s linear;
    transform: rotateX(65deg) rotateY(0deg); /* 让ul整体向下转45度,向右转45度 */
  }

  ul {
    list-style: none;
  }
}
</style>