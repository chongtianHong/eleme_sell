import Vue from 'vue';
// 引用路由插件
import Router from 'vue-router';
// 先是使用import把需要使用路由的组件引入, 需要注意的就是 from 后面需要带上'@/'
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

// 使用路由插件
Vue.use(Router);

// 需要注意的是，export default new Router 必须写在文件底部，而且后面还需要接一空行，否则无法通过 ESlint 语法验证
// 使用路由规则
export default new Router({
  mode: 'history', // 若不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
  ]
});
