import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueCarousel from 'vue-carousel';

Vue.use(VueRouter)
Vue.use(VueCarousel)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/AppUser'),
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import('@/components/user/SignIn')
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('@/components/user/SignUp')
      },
      {
        path: 'findpwd',
        name: 'FindPwd',
        component: () => import('@/components/user/FindPwd')
      }
    ]
  },
  {
    path: '/region',
    name: 'Region',
    component: () => import('@/views/AppRegion'),
    children: [
      {
        path: 'search',
        name: 'RegionSearch',
        component: () => import('@/components/region/RegionSearch')
      },
      {
        path: 'hotplace',
        name: 'HotPlace',
        component: () => import('@/components/region/HotPlace')
      },
      // { // 추후 삭제
      //   path: 'mapTest',
      //   name: 'MapTest',
      //   component: () => import('@/components/region/MapTest')
      // }
    ]
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('@/views/AppBoard'),
    redirect: '/board/list',
    children: [
      {
        path: 'list',
        name: 'BoardList',
        component: () => import('@/components/board/BoardList')
      },
      {
        path: 'write',
        name: 'BoardWrite',
        //beforeEnter : onlyAuthorUser => 토큰 처리 가능해지면 사용.
        component: () => import('@/components/board/BoardWrite')
      },
      {
        path: 'view/:boardNo',
        name: 'BoardView',
        component: () => import('@/components/board/BoardView')
      },
      {
        path: 'modify',
        name: 'BoardModify',
        component: () => import('@/components/board/BoardModify')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
