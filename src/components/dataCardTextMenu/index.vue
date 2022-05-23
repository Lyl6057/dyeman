<!--
 * @Author: Lyl
 * @Date: 2022-04-22 08:37:12
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-20 10:16:29
 * @FilePath: \iot.vue\src\components\dataCardTextMenu\index.vue
 * @Description: 
-->
<template>
  <div class="dataCardTextMenu">
    <el-row style="width: 100%">
      <el-col
        v-for="arr in dataArr"
        :key="arr.id"
        :span="arr.span"
        style="margin: 0 5px"
      >
        <el-card
          shadow="always"
          class="dataCard-text"
          v-for="list in arr.data"
          :key="list.id"
          :style="{ backgroundColor: list.bgColor }"
        >
          <el-badge  :value="list.badge" style="width: 88%">
            <div @click="list.click" :style="{ color: list.color }">
              <i :class="list.icon"></i>
              <span :style="{ color: list.color }"> {{ list.title }}</span>
            </div>
          </el-badge>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dataArr: Array,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(val) {
      console.log(val);
      val.click();
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-badge__content.is-fixed {
  top: 10px !important;
  // right: -5px !important;
}

.dataCardTextMenu {
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: row; /* or cloumn; */
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}

.el-row {
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: row; /* or cloumn; */
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 1200px;
}

.dataCard-text {
  width: 98%;
  height: 3.125rem;
  line-height: 3.125rem;
  padding-left: 0.2rem;
  margin: 0.8rem 0;
  text-align: left;
  white-space: nowrap;
  // text-indent: 0.5em;
}

.el-card {
  border-radius: 5px !important;
}

.dataCardTextMenu i {
  vertical-align: middle;
  font-size: 24px;
}

.dataCardTextMenu span {
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
}
</style>