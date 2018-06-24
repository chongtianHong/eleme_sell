<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span>{{desc.all}}</span>
            <span>{{desc.positive}}</span>
            <span>{{desc.negative}}</span>
        </div>
        <div class="switch">
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
    background: #000;
    font-size: 12px;
}
</style>
