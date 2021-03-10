<template>
  <div id="tem">
    <div id="box" v-for="item of data" :key="item.id">
      <ul
        id="test1"
        v-for="(list, index) of item.list"
        :key="index"
        :style="{
          transform: 'translateZ(' + (list.z > 1 ? list.z + 1 : 1) * 12 + 'px)',
          marginLeft: (list.x > 1 ? (list.x - 1) * 80 + 10 : 10) + 'px',
          marginTop: (list.y > 1 ? (list.y - 1) * 50 + 10 : 10) + 'px',
        }"
      >
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      data: [
        {
          id: 0,
          list: [
            {
              x: 1,
              y: 1,
              z: 1,
            },
            {
              x: 1,
              y: 1,
              z: 2,
            },
            {
              x: 2,
              y: 1,
              z: 1,
            },
            {
              x: 2,
              y: 1,
              z: 2,
            },
            {
              x: 3,
              y: 1,
              z: 1,
            },
            {
              x: 3,
              y: 1,
              z: 2,
            },

            {
              x: 4,
              y: 1,
              z: 1,
            },
            {
              x: 4,
              y: 1,
              z: 2,
            },
            {
              x: 5,
              y: 1,
              z: 1,
            },
            {
              x: 5,
              y: 1,
              z: 2,
            },
            {
              x: 6,
              y: 1,
              z: 1,
            },
            {
              x: 6,
              y: 1,
              z: 2,
            },
            {
              x: 7,
              y: 1,
              z: 1,
            },
            {
              x: 7,
              y: 1,
              z: 2,
            },
            {
              x: 8,
              y: 1,
              z: 1,
            },
            {
              x: 8,
              y: 1,
              z: 2,
            },
            {
              x: 9,
              y: 1,
              z: 1,
            },
            {
              x: 9,
              y: 1,
              z: 2,
            },
            {
              x: 10,
              y: 1,
              z: 1,
            },
            {
              x: 10,
              y: 1,
              z: 2,
            },
            {
              x: 11,
              y: 1,
              z: 1,
            },
            {
              x: 11,
              y: 1,
              z: 2,
            },
          ],
        },
        {
          id: 1,
          list: [
            {
              x: 1,
              y: 2,
              z: 1,
            },
            {
              x: 1,
              y: 2,
              z: 2,
            },
            {
              x: 2,
              y: 2,
              z: 1,
            },
            {
              x: 2,
              y: 2,
              z: 2,
            },
            {
              x: 3,
              y: 2,
              z: 1,
            },
            {
              x: 3,
              y: 2,
              z: 2,
            },

            {
              x: 4,
              y: 2,
              z: 1,
            },
            {
              x: 4,
              y: 2,
              z: 2,
            },
            {
              x: 5,
              y: 2,
              z: 1,
            },
            {
              x: 5,
              y: 2,
              z: 2,
            },
            {
              x: 6,
              y: 2,
              z: 1,
            },
            {
              x: 6,
              y: 2,
              z: 2,
            },
            {
              x: 7,
              y: 2,
              z: 1,
            },
            {
              x: 7,
              y: 2,
              z: 2,
            },
            {
              x: 8,
              y: 2,
              z: 1,
            },
            {
              x: 8,
              y: 2,
              z: 2,
            },
            {
              x: 9,
              y: 2,
              z: 1,
            },
            {
              x: 9,
              y: 2,
              z: 2,
            },
            {
              x: 10,
              y: 2,
              z: 1,
            },
            {
              x: 10,
              y: 2,
              z: 2,
            },
            {
              x: 11,
              y: 2,
              z: 1,
            },
            {
              x: 11,
              y: 2,
              z: 2,
            },
          ],
        },
        {
          id: 1,
          list: [
            {
              x: 1,
              y: 3,
              z: 1,
            },
            {
              x: 1,
              y: 3,
              z: 2,
            },
            {
              x: 2,
              y: 3,
              z: 1,
            },
            {
              x: 2,
              y: 3,
              z: 2,
            },
            {
              x: 3,
              y: 3,
              z: 1,
            },
            {
              x: 3,
              y: 3,
              z: 2,
            },

            {
              x: 4,
              y: 3,
              z: 1,
            },
            {
              x: 4,
              y: 3,
              z: 2,
            },
            {
              x: 5,
              y: 3,
              z: 1,
            },
            {
              x: 5,
              y: 3,
              z: 2,
            },
            {
              x: 6,
              y: 3,
              z: 1,
            },
            {
              x: 6,
              y: 3,
              z: 2,
            },
            {
              x: 7,
              y: 3,
              z: 1,
            },
            {
              x: 7,
              y: 3,
              z: 2,
            },
            {
              x: 8,
              y: 3,
              z: 1,
            },
            {
              x: 8,
              y: 3,
              z: 2,
            },
            {
              x: 9,
              y: 3,
              z: 1,
            },
            {
              x: 9,
              y: 3,
              z: 2,
            },
            {
              x: 10,
              y: 3,
              z: 1,
            },
            {
              x: 10,
              y: 3,
              z: 2,
            },
            {
              x: 11,
              y: 3,
              z: 1,
            },
            {
              x: 11,
              y: 3,
              z: 2,
            },
          ],
        },
      ],
    };
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#box {
  position: relative;

  ul {
    width: 25px;
    height: 25px;
    float: left;
    list-style: none;
    padding: 10px;
    // padding: 0;
    position: absolute;
    transform-style: preserve-3d; /* 将子元素转为3D */
    transition: all 0s linear;
    transform: rotateX(0deg) rotateY(0deg) translateZ(25px); /* 让ul整体向下转45度,向右转45度 */
  }

  li {
    width: 25px;
    height: 25px;
    /* border-radius: 50%; */
    text-align: center;
    line-height: 25px;
    position: absolute; /* 让所有的子元素都重叠在一起 */
    border: 1px solid #ccc;
    left: 0;
    right: 0;
  }

  li:nth-child(1) {
    transform: translateZ(12px); /* 正面 */
    background: green;
  }

  li:nth-child(2) {
    transform: rotateX(180deg) translateZ(12px); /* 背面 */
    background: green;
  }

  li:nth-child(3) {
    transform: rotateY(-90deg) translateZ(12px); /* 右面 */
    background: green;
  }

  li:nth-child(4) {
    transform: rotateY(90deg) translateZ(12px); /* 左面 */
    background: green;
  }

  li:nth-child(5) {
    transform: rotateX(90deg) translateZ(12px); /* 下面 */
    background: green;
  }

  li:nth-child(6) {
    transform: rotateX(-90deg) translateZ(12px); /* 上面 */
    background: green;
  }
}
</style>