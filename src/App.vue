<template>
  <div id="app">
    <!-- 替换div class=“header”里面的内容 -->
    <v-header></v-header>
    <!-- div class=“tab”里面的内容 -->
    <div class="tab">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 'to' 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 '<a>' 标签 -->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!-- 替换div class=“content”里面的内容 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/header/header.vue';
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$http.get('/api/seller').then((response) => {

    });
  },
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
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item{
      text-align: center;
      flex: 1;
    }
  }
  a {
    font-size: 14px;
    color: rgb(77, 85, 93);
    display: block;
  }
  a.router-link-active{
    color: rgb(240, 20, 20);
  }
}
</style>
