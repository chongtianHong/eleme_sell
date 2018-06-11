<template>
<div class="cartcontrol">
    <transition name="fade">
        <div class="cart-decrease" @click="decCart" v-show="food.count>0"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart"></div>
</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) { // 去掉自带click事件的点击
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decCart (event) {
      if (!event._constructed) { // 去掉自带click事件的点击
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.cartcontrol .fade-enter-active, .fade-leave-active {
  transition: all 0.2s linear
}

.cartcontrol .fade-enter, .fade-leave-to {
  opacity: 0;
  transform :translate3d(24px, 0, 0);
  transform: rotate(180deg);
}
.cartcontrol{
  font-size: 0;
  .cart-decrease,.cart-add{
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #00a0dc ;
    border-radius: 50%;
  }
  .cart-decrease{
    background-image: url("jian.png");
    background-size: cover;
    transition: all .2s linear;
  }
  .cart-decrease .move-transition{
    opacity: 1;
    transform: rotateZ(0);
  }
  .cart-decrease .move-enter  {
    opacity: 0;
    transform: rotateZ(180deg);
  }
  .cart-add{
    background-image: url("jia.png");
    background-size: cover;
  }
  .cart-count{
    display: inline-block;
    width: 24px;
    line-height: 8px;
    text-align: center;
    font-size: 15px;
    color:rgb(147,153,159);
  }
}
</style>
