<template>
  <div class="center">
    <h1>나들이</h1>
    <form @submit.prevent="onClickLogin()">
      <div class="input">
        <input type="text" name="userId" v-model="userId" required />
        <span></span>
        <label>아이디</label>
      </div>
      <div class="input">
        <input type="password" name="userPwd" v-model="userPwd" required />
        <span></span>
        <label>비밀번호</label>
      </div>
      <div class="button">
        <input
          :class="isAbleToLogin ? 'canLogin' : 'cannotLogin'"
          type="button"
          @click="onClickLogin()"
          value="로그인"
        />
        <!-- <input
          type="button"
          @click="signup()"
          id="signupBtn"
          value="회원가입"
        /> -->
      </div>
      <div>
        <ul class="findArea">
          <li class="find" @click="signup()">회원 가입</li>
          <li>ㅣ</li>
          <li class="find" @click="findpwd()">비밀번호 찾기</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "SignIn",
  data() {
    return {
      userId: "",
      userPwd: "",
      isAbleToLogin: false,
    };
  },
  methods: {
    ...mapActions(userStore, ["userLogin"]),
    async onClickLogin() {
      if (this.userId === "" || this.userPwd === "") return;
      await this.userLogin({ userId: this.userId, userPwd: this.userPwd });
    },

    signup() {
      this.$router.push("/user/signup");
    },
    findpwd() {
      this.$router.push("/user/findpwd");
    },
  },
  watch: {
    userId: function () {
      if (this.userId !== "" && this.userPwd !== "") {
        this.isAbleToLogin = true;
      } else this.isAbleToLogin = false;
    },
    userPwd: function () {
      if (this.userId !== "" && this.userPwd !== "") {
        this.isAbleToLogin = true;
      } else this.isAbleToLogin = false;
    },
  },
};
</script>

<style scoped>
.findArea {
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 30%;
}
.findArea:nth-child(n) {
  width: 250px;
}
.findArea > li {
  color: #a6a6a6;
  font-size: 14px;
}
.canLogin,
.cannotLogin {
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.canLogin {
  background-color: #2691d9;
}
.cannotLogin {
  background-color: rgba(65, 65, 65, 0.1);
}
.button {
  margin-bottom: 15px;
}
</style>
