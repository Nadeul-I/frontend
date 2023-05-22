import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueCarousel from 'vue-carousel';

Vue.use(VueRouter)
Vue.use(VueCarousel)

const onlyAuthUser = async (to, from, next) => {
  const isLogin = store.getters["userStore/getLoginState"];
  // if
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

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
