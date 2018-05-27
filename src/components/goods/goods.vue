<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
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
      goods: {}
    };
  },
  created () {
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
  }
  .foods-wrapper{
    flex: 1;
  }
}
</style>
