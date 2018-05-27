<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span><span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
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
      }
    }
  }
  .foods-wrapper{
    flex: 1;
  }
}
</style>
