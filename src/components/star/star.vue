<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  props: { // 从外层接收两个参数，size和score。
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    itemClasses () {
      let result = [];
      let score = Math.floor(this.score * 2) / 2; // Math.floor下舍入，取小于等于 x，且与 x 最接近的整数。
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score); // 全星个数
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF); // 半星
      }
      while (result.length < LENGTH) { // 不满足长度的push进去off星
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.star{
    font-size: 0;
    .star-item{ // 表示每个span的基础class
        display: inline-block;
        background-repeat: no-repeat
    }
    &.star-48{ //与star同级
        .star-item{
            width: 20px;
            height: 20px;
            margin-right: 22px;
        }
        &:last-child{
            margin-right: 0;
        }
        .on{
            background: url('star48_on@2x.png');
            background-size: cover;
        }
        .half{
            background: url('star48_half@2x.png');
            background-size: cover;
        }
        .off{
            background: url('star48_off@2x.png');
            background-size: cover;
        }
    }
    &.star-36{
        .star-item{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }
        &:last-child{
            margin-right: 0;
        }
        .on{
            background: url('star36_on@2x.png');
            background-size: cover;
        }
        .half{
            background: url('star36_half@2x.png');
            background-size: cover;
        }
        .off{
            background: url('star36_off@2x.png');
            background-size: cover;
        }
    }
    &.star-24{
        .star-item{
            width: 10px;
            height: 10px;
            margin-right: 3px;
        }
        &:last-child{
            margin-right: 0;
        }
        .on{
            background: url('star24_on@2x.png');
            background-size: cover;
        }
        .half{
            background: url('star24_half@2x.png');
            background-size: cover;
        }
        .off{
            background: url('star24_off@2x.png');
            background-size: cover;
        }
    }
}
</style>
