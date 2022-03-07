<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:48:57
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-05 08:43:55
 * @Description: 
-->
<template>
  <div id="clothFlyYl">
    <div class="box" v-for="(item, i) of Number(detail.ps) || 0" :key="item">
      <el-card>
        <div class="tle">SUMTEX布票</div>
        <div class="tle">THÔNG TIN TEM VẢI</div>
        <div class="content">
          <el-row class="yl_label">
            <el-col :span="9">
              <div>订单号: <br />Mã số đơn hàng</div>
            </el-col>
            <el-col :span="15"
              ><div style="height: 30px; line-height: 30px">
                {{ detail.poNo }}
              </div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="6">
              <div>布类: <br />Loại vải</div>
            </el-col>
            <el-col :span="18"
              ><div style="height: 30px; line-height: 30px; text-align: left">
                {{ detail.$calicoType }}
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
              <div>{{ detail.ycountDesc }}</div>
            </el-col>
            <el-col :span="8">
              <div>{{ detail.sp }}</div>
            </el-col>
            <el-col :span="8">
              <div>{{ detail.spi }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="12">
              <div>机号: Số máy: {{ detail.equipmentCode }}</div>
            </el-col>
            <el-col :span="12">
              <div>门幅: Khổ vải: {{ detail.actualWidth }}</div>
            </el-col>
          </el-row>
          <el-row class="yl_label">
            <el-col :span="12">
              <div>匹号: Số cây: {{ Number(detail.qsph) + i }}</div>
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
              <div>克重: TL gram: {{ detail.weight }}</div>
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
            {{ detail.bph + (Number(detail.qsph) + i) }}
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    detail: Object,
  },
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
#clothFlyYl {
  height: calc(100vh - 425px);
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
    // width: 280px;
    // height: 408px;
    // margin: 3px;
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
    text-align: center;
  }

  .yl_bh:last-child {
    border-top: 1px solid #000;
  }
}
</style>