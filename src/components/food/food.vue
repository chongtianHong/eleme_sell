<template>
    <div class="food" v-show="showFlag">
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
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
}
</style>
