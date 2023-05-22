import { logout } from "@/api/user";

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
      if(userId){
        state.isLogin = true;
        state.userId = userId;
      }
      else{
        state.isLogin = false;
        state.userId = "";
      }
    },
  },
  actions: {
    

    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default userStore;
