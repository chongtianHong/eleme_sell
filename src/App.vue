<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      I am content!
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default {
  name: 'App',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item{
      text-align: center;
      flex: 1;
    }
  }
}
</style>
