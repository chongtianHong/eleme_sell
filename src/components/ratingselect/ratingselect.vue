<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle">√</span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: 'ratingselect',
  props: {
    ratings: { // 评价数组
      type: Array,
      default () { // 数组和对象都必须返回一个函数
        return [];
      }
    },
    selectType: { // 选择类型（全部、推荐、吐槽）
      type: Number,
      default: ALL
    },
    onlyContent: { // 控制只看有内容的评价
      type: Boolean,
      default: false
    },
    desc: { // 描述
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) { // 去掉自带click事件的点击
        return;
      }
      this.selectType = type;
      this.$emit('select', type); // 第一个是父组件写的自定义事件，第二个则是从子组件传进的参数。
    },
    toggleContent (event) {
      if (!event._constructed) { // 去掉自带click事件的点击
        return;
      }
      this.onlyContent = !this.onlyContent;
      this.$emit('contentToggle', this.onlyContent);
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.icon-check_circle{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: rgb(147,153,159);;
    font-size: 12px;
}
.ratingselect{
    .rating-type{
        padding:18px 0;
        margin: 0 18px; // 因为下面有一条线，如果设置padding会占满整个屏幕
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 0;
        .block{
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            color: rgb(77,85,93);
            font-size: 12px;
            line-height: 16px;
            &.active{
                color: #fff;
            }
            .count{
                font-size: 8px;
                margin-left: 2px;
            }
            &.positive{
                background: rgba(0,160,220,0.2);
                &.active{
                    background: rgb(0,160,220);
                }
            }
            &.negative{
                background: rgba(77,85,93,0.2);
                &.active{
                    background: rgb(77,85,93);
                }
            }
        }
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: rgb(147,153,159);
        &.on{
            .icon-check_circle{
                background: #00c850;
            }
        }
        .icon-check_circle{
            margin-right: 4px;
        }
        .text{
            font-size: 14px;
        }
    }
}
</style>
