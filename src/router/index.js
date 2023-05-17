import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import FindPwd from '../views/FindPwd.vue'
import RegionSearch from '../views/RegionSearch.vue'
import MapTest from '../views/MapTest.vue'
import BoardList from '../views/BoardList.vue'
import BoardView from '../views/BoardView.vue'
import BoardWrite from '../views/BoardWrite.vue'
import BoardModify from '../views/BoardModify.vue'
Vue.use(VueRouter)

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
    path: '/maptest',
    name: 'MapTest',
    component : MapTest,
  },
  {
    path: '/board',
    name: 'Board',
    component : BoardList,
  },
  {
    path: '/boardView/:boardNo',
    name: 'BoardView',
    component : BoardView,
  },
  {
    path: '/boardWrite',
    name: 'BoardWrite',
    component : BoardWrite,
  },
  {
    path: '/boardModify/:boardNo',
    name: 'BoardModify',
    component : BoardModify,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
