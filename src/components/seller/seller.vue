<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :score="seller.score" :size="36"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted () {
    this._initScroll();
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.seller{
    position: absolute;
    top: 174px; // 留出header和tab的高度
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: hidden;
    .overview{
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .desc{
        padding-bottom: 18px;
        font-size: 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .star{
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77,85,93);
        }
      }
      .remark{
        display: flex;
        padding-top: 18px;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border: none; // 最后一个item没有border-right
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .content{
            line-height: 24px;
            font-size: 10px;
            color: rgb(7,17,27);
            .stress{
              font-size: 24px;
            }
          }
        }
      }
    }
    .bulletin{
      padding: 18px 18px 0 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .content-wrapper{
        padding: 0 12px 16px 12px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .content{
          line-height:24px;
          font-size: 12px;
          color: rgb(240,20,20);
        }
      }
      .supports{
        .support-item{
          padding: 16px 12px;
          font-size: 0; // 消除行内元素之间的空白间隔
          border-bottom: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border: none;
          }
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            background-repeat: no-repeat;
            background-size: cover !important;
          }
          .decrease{
            background: url("decrease_4@2x.png");
          }
          .discount{
            background: url("discount_4@2x.png");
          }
          .special{
            background: url("special_4@2x.png");
          }
          .invoice{
            background: url("invoice_4@2x.png");
          }
          .guarantee{
            background: url("guarantee_4@2x.png");
          }
          .text{
            font-size: 12px;
            line-height: 16px;
            color: rgb(7,17,27);
          }
        }
      }
    }
    .pics{
      padding: 18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap; // 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
}
</style>
