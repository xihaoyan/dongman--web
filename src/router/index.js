import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import Home from '@/pages/client/index.vue';
import MyStar from '@/pages/client/mystar.vue';
import Detail from '@/pages/client/detail.vue';
import History from '@/pages/client/history.vue';

import Manage from '@/pages/server/manage.vue';
import Editlist from '@/pages/server/editlist.vue';


import Demo from '@/pages/server/demo.vue';  // 这是要给公司演示的demo文件，请忽略


Vue.use(Router)

 const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: Detail
    },
    {
      path: '/mystar',
      name: 'MyStar',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: MyStar
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: History
    },
    {
      path: '/editlist',
      name: 'editlist',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: Editlist
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/manage',
      name: 'Manage',
      meta: {
        auth: true   // 用于判断当前路由是否需要登陆
      },
      component: Manage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
export default router;


// 登陆验证
const Token = "XH-TOKEN";
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('Token') && to.meta.auth) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
});
