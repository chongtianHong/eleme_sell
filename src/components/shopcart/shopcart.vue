<template>
  <div class="shopcart">
    <div class="shopcart-container">
      <div class="content" @click="toggleList">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div :class="logo">
                      <!-- <span class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></span> -->
                      <span :class="cat"></span>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highPrice':totalPrice>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="payClass">
                {{payDesc}}
            </div>
          </div>
      </div>
      <!-- <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" transition="drop" class="ball">
            <div class="inner"></div>
        </div>
      </div> -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <!-- li下面分为左右两列 -->
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      fold: true
    };
  },
  computed: {
    totalPrice () {
      // 所有商品的总价
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    cat () {
      if (this.totalPrice > 0) {
        return 'highLight';
      } else {
        return 'icon-shopping_cart';
      }
    },
    logo () {
      if (this.totalPrice > 0) {
        return 'logo-blue';
      } else {
        return 'logo';
      }
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow () {
      if (!this.totalCount) {
        // 计算属性内不应该对属性值做变更
        // eslint-disable-next-line
        this.fold = true;
        return false;
      } else {
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              // eslint-disable-next-line
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        // 当购物车为0时，点击无效
        return;
      }
      this.fold = !this.fold;
    },
    empty () { // 购物车清空效果
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList () {
      this.fold = true;
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}元`);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.shopcart-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;
      font-size: 0;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px; // (116-96)/2
        margin: 0 12px; // (36-12)/2
        padding: 6px;
        width: 56px; // (88+24)/2
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
        }

        .logo-blue {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          overflow: hidden;
        }

        .icon-shopping_cart {
          display: inline-block;
          width: 100%;
          height: 100%;
          background-image: url('cart.png.png');
          background-size: cover;
        }

        .highLight {
          display: inline-block;
          color: #80858a;
          width: 83%;
          height: 85%;
          background-image: url('cat2.png');
          background-position: 4px 7px;
          background-size: cover;
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px; // (116-44-24)/2
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highPrice {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;

      &.drop-transition {
        transition: all 0.4s;

        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transition: all 0.5s;
    transform: translate3d(0, -100%, 0);

    &.fold-enter-active, &.fold-enter-to {
      transform: translate3d(0, 0, 0);
    }

    &.fold-leave-active, &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }

    .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .title{
        float: left;
        font-size: 14px;
        color: rbg(7,17,27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
      }
    }

    .list-content{
      padding: 0 18px;
      max-height: 197px;
      overflow: hidden; // 指定最大高度，超出隐藏
      background: #fff;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7,17,27,.2);
        .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .price{
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: 17px;
        }
      }
    }
  }
}
.list-mask{
  position: fixed; // 相对屏幕进行定位
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40; // 小于shopcart-container的z-index
  backdrop-filter: blur(10px);
  // 动画的最终状态
  transition: all 0.5s;
  opacity: 1;
  background: rgba(7,17,27,0.6);
  &.fade-enter, &.fade-leave{ // 动画一开始的状态
    opacity: 0;
    background: rgba(7,17,27,0);
  }
}
</style>
