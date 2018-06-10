<template>
<div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add"></div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object
    }
  },
  created () {
    console.log(this.food);
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
    // padding: 6px;
    background-image: url("jian.png");
    background-size: cover;
    transition: all .2s linear;
  }
  .cart-count{
    display: inline-block;
  }
  .cart-add{
    background-image: url("jia.png");
    background-size: cover;
  }
}
</style>
