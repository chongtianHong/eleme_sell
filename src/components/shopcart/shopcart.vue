<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo">
                      <span class="icon-shopping_cart"></span>
                  </div>
              </div>
              <div class="price">￥0</div>
              <div class="desc"></div>
          </div>
          <div class="content-right"></div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="stylus" rel="stylesheet/styles">
.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
        display: flex;
        background: #141d27;
        .content-left{
            flex: 1;
            font-size: 0;
            .logo-wrapper{
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b343c;
                    .icon-shopping_cart{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        background-image : url("cart.png.png");
                        background-size: cover;
                    }
                }
            }
            .price{
                display: inline-block;
                vertical-align: top;
                margin-top: 12px
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.1);
                font-size: 16px;
                font-weight: 700;
            }
            .desc{
                display: inline-block;
            }
        }
        .content-right{
            width: 105px;
        }
    }
}

</style>
