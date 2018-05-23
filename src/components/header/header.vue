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
      <div v-if="seller.supports" class="support-count" @click="toggleDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"> > </i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"> > </i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score" :size="48"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="toggleDetail">×</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    toggleDetail () {
      this.detailShow = !this.detailShow;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.clearfix{
  display: inline-block;
  &:after{
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
.header{
  position: relative;
  color:#fff;
  background: rgba(7,17,27,0.5);
  overflow: hidden;
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
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto; // 若设置为hidden，则当内容高度超出屏幕高度时不能滚动
    background: rgba(7,17,27,0.8);
    // filter: blur(10px);
    .detail-wrapper{ // 外层容器
      min-height: 100%;
      width: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px; // 固定套路
        .name{
          font-size: 16px;
          font-weight 700;
          line-height: 16px;
          text-align: center;
        }
        .star-wrapper{
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
      }
    }
    .detail-close{ // 固定套路
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      text-align: center;
    }
  }
}
</style>
