import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import FindPwd from '../views/FindPwd.vue'
import RegionSearch from '../views/RegionSearch.vue'
import MapTest from '../views/MapTest.vue'
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
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/findpwd',
    name: 'FindPwd',
    component : FindPwd,
  },
  {
    path: '/region',
    name: 'Region',
    component: RegionSearch,
  },
  {
    path: '/region/:sidoCode/:gugunCode/:category/:keyword',
    name: 'hotRegion',
    component: RegionSearch,
  },
  {
    path: '/maptest',
    name: 'MapTest',
    component : MapTest,
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
