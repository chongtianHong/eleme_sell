<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.header{
  color:#fff;
  background: #000;
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar{
      display: inline-block;
      vertical-align: top;
      img{
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 16px;
      .title{
        margin: 2px 0 8px 0;
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          background: url('brand@2x.png') no-repeat;
          background-size: cover;
          // background-size: 30px 18px;
          vertical-align: top;
        }
        .name{
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height:18px;
        }
      }
      .description{
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 12px;
      }
      .support{
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-right: 4px;
          background-repeat: no-repeat;
          background-size: cover !important;
        }
        .decrease{
          background: url("decrease_1@2x.png");
          }
        .discount{
          background: url("discount_1@2x.png");
        }
        .special{
          background: url("special_1@2x.png");
        }
        .invoice{
          background: url("invoice_1@2x.png");
        }
        .guarantee{
          background: url("guarantee_1@2x.png");
        }
        .text{
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
