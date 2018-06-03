<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo">
                      <span class="icon-shopping_cart"></span>
                  </div>
              </div>
              <div class="price"></div>
              <div class="desc"></div>
          </div>
          <div class="contentright"></div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" rel="stylesheet/styles">
.icon-shopping_cart{
  display: inline-block;
  color:#80858a;
  width: 100%;
  height: 100%;
  background-image : url("cart.png.png");
  background-size: cover;
}
.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000;
}
</style>
