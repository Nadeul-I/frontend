import jwtDecode from "jwt-decode";
import { signIn, logout, tokenCheck } from "@/api/auth";
import router from "@/router/index.js"
const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    userId: null,
  },
  getters: {
    getLoginState: function (state) {
      return state.isLogin;
    },
    getUserId: function (state) {
      return state.userId;
    },
  },
  mutations: {
    SET_USER_STATE: (state, userId) => {
      if (userId) {
        state.isLogin = true;
        state.userId = userId;
      } else {
        state.isLogin = false;
        state.userId = "";
      }
    },
  },
  actions: {
    //유저 로그인
    async userLogin({ state, commit }, userInfo) {
      await signIn(
        userInfo,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];

            console.log("login success token created!!!! >> ", accessToken, refreshToken);

            let userId = jwtDecode(accessToken).userId;
            
            commit("SET_USER_STATE", userId);

            console.log(userId);
            console.log(state.isLogin);
            console.log(accessToken)

            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);

            router.push('/');
          } else {
            commit("SET_USER_STATE", "");
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("refresh-token");
          }
        },
        (error) => {
          commit("SET_USER_STATE", "");
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem("refresh-token");
          console.log(error);
        }
      );
    },

    // 유저 로그아웃
    async userLogout({ commit }, userId) {
      await logout(
        userId,
        ({ data }) => {
          if (data === "fail") {
            console.log("유저정보 x");
          }
          commit("SET_USER_STATE", "");
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem("refresh-token");
        },
        (error) => {
          commit("SET_USER_STATE", "");
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem("refresh-token");
          console.log(error);
        }
      );
    },

    // 토큰 인증
    async userAuthCheck({ commit }) {
      await tokenCheck(
        true,
        ({data}) =>{
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
  
            let userId = jwtDecode(accessToken).userId;

            commit("SET_USER_STATE", userId);

            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          }
        },
        async(error) =>{
          console.log(error);
          await tokenCheck(
            false,
            ({data}) =>{
              if (data.message === "success") {
                let accessToken = data["access-token"];
                let refreshToken = data["refresh-token"];
      
                let userId = jwtDecode(accessToken).userId;

                commit("SET_USER_STATE", userId);

                sessionStorage.setItem("access-token", accessToken);
                sessionStorage.setItem("refresh-token", refreshToken);
              }
            },
            (error) =>{
              commit("SET_USER_STATE", "");
              sessionStorage.removeItem("access-token");
              sessionStorage.removeItem("refresh-token");
              console.log(error);
            }
          )
        }

      )
    },

  },
};

export default userStore;
