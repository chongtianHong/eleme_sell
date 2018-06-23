<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
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
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol  :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect></ratingselect>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import Vue from 'vue';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
export default {
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data () {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    goBack () {
      this.showFlag = false;
    },
    addFirst (event) {
      if (!event._constructed) { // 去掉自带click事件的点击
        return;
      }
      Vue.set(this.food, 'count', 1);
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
    .content{
        position: relative;
        padding: 18px;
        .title{
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7,17,27);
        }
        .detail{
            margin-bottom: 18px;
            line-height: 10px;
            height: 10px;
            font-size: 0;
            .sell-count, .rating{
                font-size: 10px;
                color: rgb(147,153,159);
            }
            .sell-count{
                margin-right: 12px;
            }
        }
        .price{
            font-size: 0;
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 149);
            }
        }
        .cartcontrol-wrapper{
            position: absolute;
            right: 24px;
            bottom: 24px;
        }
        .buy{
            position: absolute;
            right: 22px;
            bottom: 22px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 10px;
            color: #fff;
            background: rgb(0,160,220);
            transition: all 0.2s linear;
            opacity: 1;
            &.fade-enter,&.fade-leave{
                opacity: 0;
            }
        }
    }
    .info{
        padding: 18px;
        .title{
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7,17,27);
        }
        .text{
            padding: 0 8px;
            font-size: 12px;
            line-height: 24px;
            color: #93999f;
        }
    }
}
</style>
