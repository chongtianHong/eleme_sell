<template>
<div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0"></div>
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
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
  .cart-count{
    display: inline-block;
    width: 24px;
    padding-top: 6px;
    line-height: 8px;
    text-align: center;
    font-size: 15px;
    color:rgb(147,153,159);
  }
  .cart-add{
    background-image: url("jia.png");
    background-size: cover;
  }
}
</style>
