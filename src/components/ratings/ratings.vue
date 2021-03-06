<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @contentToggle="contentToggle" @select="selectRating" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key=index class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :score="rating.score" :size="24"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span v-show="rating.rateType===0" class="icon-like">☺</span>
                <span v-for="(item,idx) in rating.recommend" :key="idx" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import moment from 'moment';
import BScroll from 'better-scroll';
const ALL = 2;
const ERR_OK = 0;
export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return moment(date).format('YYYY-MM-DD hh:mm:ss');
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        //console.log(this.ratings);
        this.$nextTick(() => { // dom更新之后进行better-scroll初始化
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      });
    },
    selectRating (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    contentToggle (onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow (type, text) {
      if (this.onlyContent && !text) { // 如果选中只显示内容，且当前评论没内容时(先过滤掉没评论的，不需要进行选择类型判断)
        return false;
      }
      if (this.selectType === ALL) { // 如果选中显示所有评论
        return true;
      } else {
        return type === this.selectType; // 当前选中类型和评论类型一致
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
  .ratings{
    position: absolute;
    top: 174px; // 留出header和tab的高度
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: hidden;
    .ratings-content{
      .overview{
        display: flex;
        padding: 18px 0;
        .overview-left{
          flex: 0 0 137px; // 先不考虑iphone5的兼容性
          padding: 6px 0;
          width: 137px;
          border-right: 1px solid rgba(7,17,27,0.1);
          text-align: center;
          @media only screen and (max-width:320px){
            flex: 0 0 120px;
            width: 120px;
          }
          .score{
            margin-bottom: 6px;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255,153,0);
          }
          .title{
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 12px;
            color: rgb(7,17,27);
          }
          .rank{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
        .overview-right{
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width:320px){
            padding: 6px 0 6px 6px;
          }
          .score-wrapper{
            margin-bottom: 8px;
            font-size: 0;
            .title{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color: rgb(7,17,27);
            }
            .star{
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color: rgb(255,153,0);
            }
          }
          .delivery-wrapper{
            font-size: 0;
            .title{
              font-size: 12px;
              line-height: 18px;
              color: rgb(7,17,27);
            }
            .delivery{
              font-size: 12px;
              color: rgb(147,153,159);
              margin-left: 12px;
            }
          }
        }
      }
      .rating-wrapper{
        padding: 0 18px;
        .rating-item{
          display: flex;
          padding: 18px 0;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .avatar{
            // flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img{
              border-radius: 50%;
            }
          }
          .content{
            flex: 1;
            position: relative;
            .name{
              margin-bottom: 4px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(7,17,27);
            }
            .star-wrapper{
              margin-bottom: 6px;
              font-size: 0;
              .star{
                display: inline-block;
                vertical-align: top;
                margin-right: 6px;
              }
              .delivery{
                display: inline-block;
                vertical-align: top;
                line-height: 12px;
                font-size: 10px;
                font-weight: 200;
                color: rgb(147,153,159);
              }
            }
            .text{
              margin-bottom: 8px;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7,17,27);
            }
            .recommend{
              line-height: 16px;
              font-size: 0;
              .icon-like, .item{
                display: inline-block;
                margin-bottom: 4px;
              }
              .icon-like{
                font-size: 18px;
                background: pink;
                border-radius: 50%;
                line-height: 18px;
              }
              .item{
                font-size: 9px;
                padding: 0 6px;
                border: 1px solid rgba(7,17,27,0.1);
                border-radius: 1px;
                color: rgb(147,153,159);
                background: #fff;
              }
            }
            .time{
              position: absolute;
              top: 0;
              right: 0;
              line-height: 10px;
              font-size: 10px;
              color: rgb(147,153,159);
            }
          }
        }
      }
    }
  }
</style>
