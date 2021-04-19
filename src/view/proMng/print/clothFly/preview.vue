<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:48:57
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-17 09:26:43
 * @Description: 
-->
<template>
  <div
    id="clothFlyYl"
    :element-loading-text="$t('public.loading')"
    v-loading="loading"
  >
    <div class="box" v-for="(item, i) of detail" :key="i">
      <el-card v-if="show">
        <!-- <div class="tle">SUMTEX布票</div>
        <div class="tle">THÔNG TIN TEM VẢI</div>
        <div class="content">
          <el-row class="yl_label">
            <el-col :span="9">
              <div>订单号: <br />Mã số đơn hàng</div>
            </el-col>
            <el-col :span="15"
              ><div style="height: 30px; line-height: 30px">
                {{ detail.salPoNo }}
              </div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="6">
              <div>布类: <br />Loại vải</div>
            </el-col>
            <el-col :span="18"
              ><div style="height: 30px; line-height: 30px; text-align: left">
                {{ detail.fabricDesc }}
              </div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="8">
              <div>纱支: <br />Chi số sợi</div>
            </el-col>
            <el-col :span="8">
              <div>纱牌: <br />Nhãn hiệu sợi</div>
            </el-col>
            <el-col :span="8">
              <div>纱批: <br />Lô sợi</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="8">
              <div>{{ detail.yarnThickness }}</div>
            </el-col>
            <el-col :span="8">
              <div>{{ detail.yarnBrand + "   " }}<br /></div>
            </el-col>
            <el-col :span="8">
              <div>{{ detail.yarnBatch }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="12">
              <div>机号: Số máy: {{ detail.mathineCode }}</div>
            </el-col>
            <el-col :span="12">
              <div>门幅: Khổ vải: {{ detail.breadth }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="12">
              <div>
                匹号: Số cây: {{ $preFixInt(Number(detail.qsph) + i, 3) }}
              </div>
            </el-col>
            <el-col :span="12">
              <div>颜色: Màu: {{ detail.colorName }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="12">
              <div>重量:Trọng lượng:</div>
            </el-col>
            <el-col :span="12">
              <div>克重: TL gram: {{ detail.gramWeight }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="6">
              <div>
                值机工号: <br />
                Số thẻ thợ trực máy
              </div>
            </el-col>
            <el-col :span="6">
              <div style="height: 45px; line-height: 45px; text-align: center">
                {{ detail.zjgh }}
              </div>
            </el-col>
            <el-col
              :span="6"
              style="height: 45px; line-height: 45px; text-align: center"
            >
              <div>日期:Ngày :</div>
            </el-col>
            <el-col
              :span="6"
              style="height: 45px; line-height: 45px; text-align: center"
            >
              <div>{{ detail.nowDate }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_bh" style="font-size: 20px">
            |||||||||||||||||||||||||||||||
          </el-row>
          <el-row class="yl_bh">
            {{ detail.bph + $preFixInt(Number(detail.qsph) + i, 3) }}
          </el-row>
        </div> -->
        <embed :src="url + item.noteId" width="400" height="580" hidden="no" />
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    detail: Array,
  },
  components: {},
  data() {
    return {
      url: process.env.API_HOST + "/api/proClothNote/preview?id=",
      loading: false,
      show: false,
    };
  },
  watch: {
    detail(n, o) {
      this.show = false;
      this.loading = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = true;
          this.loading = false;
        }, 500);
      });
    },
  },
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyYl {
  height: calc(100vh - 430px);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 3px 0;

  .box {
    // width: 400px;
    // height: 374px;
    margin: 3px;
    // border: 1px solid #000;
    // border-right: none;
  }

  .tle {
    font-family: 'Times New Roman';
    font-size: 16px;
    text-align: center;
  }

  .content {
    margin: 10px 2px 0 2px;
    text-align: left;
  }

  .yl_label {
    font-family: 'Times New Roman';
    font-size: 12px;
    margin-left: 3px;
    margin-top: 8px;
  }

  .yl_bh {
    height: 29px;
    line-height: 29px;
    text-align: center;
  }

  .yl_bh:last-child {
    border-top: 1px solid #000;
  }
}
</style>