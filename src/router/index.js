import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import FindPwd from '../views/FindPwd.vue'
import RegionSearch from '../views/RegionSearch.vue'
import MapTest from '../views/MapTest.vue'
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
