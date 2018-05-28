<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text border-bottom">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,idx) in item.foods" :key="idx" class="food-item">
              <div class="icon">
                <img :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0;
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    };
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        //console.log(this.goods);
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.border-bottom{position: relative;border-top: none !important;}
.border-bottom:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.goods{
  display: flex;
  position: absolute;
  top: 174px;// header是134px，tab是40px，因此top=174px
  bottom: 46px;// 购物车列表的高度
  width: 100%;
  overflow: hidden;
  .menu-wrapper{
    width: 80px;
    // flex: 0 0 80px;
    background: #f3f5f7;
    .menu-item{
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      .icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: middle; // table布局中的垂直居中
        margin-right: 2px;
        background-repeat: no-repeat;
        background-size: cover !important;
      }
      .decrease{
        background: url("decrease_3@2x.png");
      }
      .discount{
        background: url("discount_3@2x.png");
      }
      .special{
        background: url("special_3@2x.png");
      }
      .invoice{
        background: url("invoice_3@2x.png");
      }
      .guarantee{
        background: url("guarantee_3@2x.png");
      }
      .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle; // table布局中的垂直居中
        font-size: 12px;
        font-weight: 200;
        line-height:14px;
        color: #495060;
      }
    }
  }
  .foods-wrapper{
    flex: 1;
  }
}
</style>
