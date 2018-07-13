<template>
  <div id="app">
    <!-- 替换div class=“header”里面的内容 -->
    <v-header :seller="seller"></v-header>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/header/header.vue';
import {urlParse} from './common/js/util.js';
const ERR_OK = 0;
export default {
  name: 'App',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse(); // 获取地址中的查询字符串
          console.log(queryParam);
          return queryParam.id;
        })()
        // id: 12345
      }
    };
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        /* this.seller =  response.data; 会覆盖掉id */
        /* 防止把id覆盖掉，使用es6的一个语法:扩展了对象的属性，在原来的基础上添加response.data的值，不会覆盖掉原来的id属性 */
        this.seller = Object.assign({}, this.seller, response.data);
        //console.log(this.seller);
      }
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
    height: 39px;
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
