<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo">
                      <!-- <span class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></span> -->
                      <span :class="cat"></span>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highPrice':totalPrice>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay">
                  ￥{{minPrice}}元起送
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.shopcart {
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
                        width: 100%;
                        height: 100%;
                        background-image: url('cat2.png');
                        background-size: cover;
                    }
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
                &.highPrice{
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
                background: #2b333b;
            }
        }
    }
}
</style>
