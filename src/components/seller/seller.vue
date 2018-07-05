<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :score="seller.score" :size="36"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">{{seller.sellCount}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
import split from '../split/split';
export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.seller{
    position: absolute;
    top: 174px; // 留出header和tab的高度
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: hidden;
    .overview{
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
    }
}
</style>
