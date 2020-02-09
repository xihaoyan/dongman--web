import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/client/index.vue';
import MyStar from '@/pages/client/mystar.vue';
import Detail from '@/pages/client/detail.vue';
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';

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
