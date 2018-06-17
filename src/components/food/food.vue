<template>
    <transition name="move">
        <div class="food" v-show="showFlag">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image"/>
                    <div class="back">
                        <div class="icon-arrow_lift" @click="goBack"> &lt; </div>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
    },
    goBack () {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.food{
    position: fixed; // 相对于整个屏幕进行定位
    left: 0;
    top: 0;
    bottom: 48px; // 因为底部有一个购物车
    z-index: 30; // 小于底部的购物车，也要小于购物车详情页层
    width: 100%;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
    &.move-enter, &.move-leave-active{ // 开始的位置和最终离开的位置
        transform: translate3d(100%,0,0); // 相对自身宽度平移100%，则从右向左
    }
    .image-header{
        position: relative;
        width: 100%;
        height: 0;
        /*黑魔法*/
        padding-top: 100%;// 当给padding值设置百分值时，是相对于盒子宽度去计算的
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .back{
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift{
            display: block;
            padding: 10px; // 使得点击区域变大
            font-size: 20px;
            color: #fff;
        }
    }
}
</style>
