<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'goods'
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.goods{
  display: flex;
  position: absolute;
  top: 174px;// header是134px，tab是40px，因此top=174px
  bottom: 46px;// 购物车列表的高度
  width: 100%;
  overflow: hidden;
  .menu-wrapper{
  }
  .foods-wrapper{
    flex: 1;
  }
}
</style>
