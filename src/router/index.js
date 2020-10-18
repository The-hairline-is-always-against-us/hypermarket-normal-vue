/*
 * @Description: 路由配置
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:58:48
 */
import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router'

Vue.use(Router)
/**
 *
 * hidden: true                   动态加载菜单栏，不用理会
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    权限控制（示例 ：roles ：['user', 'normal']）
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
//游客界面
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../components/Error.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/Goods.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/goods/details',
    name: 'Details',
    component: () => import('../views/Details.vue')
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collect.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/Store',
    name: 'Store',
    component: () => import('../views/Store.vue')
  },
  {
    path: '/MyStore',
    name: 'MyStore',
    component: () => import('../views/MyStore.vue')
  },
  {
    path: '/AddGoods',
    name: 'AddGoods',
    component: () => import('../views/AddGoods.vue')
  },
  {
    path: '/ApplyStore',
    name: 'ApplyStore',
    component: () => import('../views/ApplyStore.vue')
  },
  {
    path: '/Storedetails',
    name: 'Storedetails',
    component: () => import('../views/Storedetails.vue')
  }
]

//异步挂载的路由
//动态需要根据权限加载的路由表
//登录后访问的
export const asyncRouterMap = [
  //避免过长而不易维护

  /**
   * 公共路由（测试使用）
   */


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

//实例化vue的时候只挂载constantRouter
const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  //history会去掉url的#，但是需要全路径访问，并且刷新会访问后端，所以默认的是hash模式
  //mode: 'history'
});

const router = createRouter();

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
