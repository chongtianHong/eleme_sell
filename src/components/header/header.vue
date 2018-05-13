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
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"> > </i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"> > </i>
    </div>
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
  background: #999;
  .content-wrapper{
    position: relative;
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
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0px 8px;
      height: 24px;
      line-height:24px;
      border-radius: 14px;
      background: rgba(0,0,0,0.2);
      text-align: center;
      .count{
        font-size: 10px;
        line-height:12px;
        margin-right: 2px;
      }
      .icon-keyboard_arrow_right{
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
    .bulletin-title{
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
      width: 22px;
      height: 12px;
      background: url(bulletin@2x.1.png) no-repeat;
      background-size: cover;
    }
    .bulletin-text{
      font-size: 10px;
      margin: 0 4px;
    }
    .icon-keyboard_arrow_right{
        position: absolute;
        right: 12px;
        top: 8px;
        font-size: 10px;
        line-height: 15px;
    }
  }
}
</style>
