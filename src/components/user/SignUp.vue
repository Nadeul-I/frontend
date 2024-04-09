<template>
  <div class="center">
    <h1>회원가입</h1>
    <form @submit.prevent="signup()">
      <div class="inputArea">
        <div class="input dupCheck">
          <input
            type="text"
            v-model="userId"
            name="userId"
            required
            :class="{
              discord: userId !== '' && !userIdChecker,
            }"
          />
          <label>아이디</label>
        </div>
        <div
          :class="
            userId === '' || (userId !== '' && userIdChecker)
              ? 'eraseDesc'
              : 'displayDesc'
          "
        >
          중복된 아이디 입니다.
        </div>
      </div>
      <div class="inputArea">
        <div class="input">
          <input
            type="password"
            v-model="userPwd"
            name="userPwd"
            v-bind:class="{ discord: !pwdCompare }"
            required
          />
          <span></span>
          <label>비밀번호</label>
        </div>
        <div :class="userPwd === userPwdCheck ? 'eraseDesc' : 'displayDesc'">
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div class="inputArea">
        <div class="input">
          <input
            type="password"
            v-model="userPwdCheck"
            id="userpwdCheck"
            v-bind:class="{ discord: !pwdCompare }"
            required
          />
          <span></span>
          <label>비밀번호 확인</label>
        </div>
        <div :class="userPwd === userPwdCheck ? 'eraseDesc' : 'displayDesc'">
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div class="inputArea">
        <div class="input">
          <input type="text" v-model="userName" name="userName" required />
          <span></span>
          <label>닉네임</label>
        </div>
        <div class="eraseDesc">.</div>
      </div>
      <div class="inputArea">
        <div class="input">
          <input type="text" v-model="userGender" name="userGender" required />
          <span></span>
          <label>성별</label>
        </div>
        <div class="eraseDesc">.</div>
      </div>
      <div class="inputArea">
        <div class="input">
          <input
            type="text"
            v-model="userEmail"
            name="userEmail"
            v-bind:class="{ discord: !emailValidation }"
            required
          />
          <span></span>
          <label>이메일</label>
        </div>
        <div :class="emailValidation ? 'eraseDesc' : 'displayDesc'">
          이메일 양식을 수정해주세요.
        </div>
      </div>

      <div>
        <input
          :class="isAbleToSignUp ? 'canSignUp' : 'cannotSignUp'"
          type="submit"
          id="signupBtn"
          value="회원가입"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { IdCheck, SignUp } from "@/api/user";
export default {
  data() {
    return {
      userId: "",
      userIdChecker: false,
      userPwd: "",
      userPwdCheck: "",
      userName: "",
      userGender: "",
      userEmail: "",
      pwdCompare: true,
      emailValidation: true,
      isAbleToSignUp: false,
    };
  },
  watch: {
    userId: async function () {
      console.log(this.userId);
      if (this.userId == "") {
        return;
      }
      let userId = {
        userId: this.userId,
      };
      await IdCheck(
        userId,
        ({ data }) => {
          if (data.message === "fail") {
            this.userIdChecker = false;
          } else {
            console.log("사용할 수 있는 아이디 입니다.");
            this.userIdChecker = true;
          }
          console.log("계속 요청 보내는 중");
        },
        () => console.log("실패")
      );
    },
    userPwdCheck: function () {
      if (this.userPwd != this.userPwdCheck) this.pwdCompare = false;
      else this.pwdCompare = true;
      this.signUpChecker();
    },
    userPwd: function () {
      if (this.userPwd != this.userPwdCheck) this.pwdCompare = false;
      else this.pwdCompare = true;
      this.signUpChecker();
    },
    userName: function () {
      this.signUpChecker();
    },
    userGender: function () {
      this.signUpChecker();
    },
    userEmail: function () {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (regex.test(this.userEmail) || this.userEmail == "")
        this.emailValidation = true;
      else this.emailValidation = false;
      this.signUpChecker();
    },
  },
  methods: {
    signUpChecker() {
      this.isAbleToSignUp =
        this.userId &&
        this.userIdChecker &&
        this.userPwd &&
        this.userPwdCheck &&
        this.userName &&
        this.userGender &&
        this.userEmail &&
        this.pwdCompare &&
        this.emailValidation;
    },
    signup() {
      if (this.isAbleToSignUp) {
        let userInfo = {
          userId: this.userId,
          userPwd: this.userPwd,
          userName: this.userName,
          userGender: this.userGender,
          userEmail: this.userEmail,
        };
        SignUp(
          userInfo,
          () => {
            alert("회원가입 성공");
            this.$router.replace("/user/signin");
          },
          () => {
            alert("에러 발생");
          }
        );
      } else {
        alert("회원 정보를 다시 입력해주세요.");
      }
    },
    async idDupCheck() {
      if (this.userId == "") {
        alert("아이디를 입력해주세요.");
        return;
      }
      let userId = {
        userId: this.userId,
      };
      IdCheck(
        userId,
        ({ data }) => {
          if (data.message === "fail") {
            alert("이미 존재하는 아이디입니다.");
          } else {
            alert("사용할 수 있는 아이디입니다.");
            this.dupCheckResult = true;
            this.checkedUserId = this.userId;
          }
        },
        () => console.log("실패")
      );
    },
    signin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.inputArea {
  margin-bottom: 15px;
}
.input {
  margin: 0;
}
.eraseDesc {
  visibility: hidden;
}
.displayDesc {
  visibility: visible;
  display: flex;
  font-size: 12px;
  color: red;
}
.incorrect {
  color: red;
}
.center {
  top: 55%;
}
.dupCheck {
  display: flex;
  align-items: flex-end;
}
.dupCheck button {
  width: 30%;
}
.discord,
.discord:focus {
  border-bottom: 1px solid red;
  transition: border-bottom 0.3s ease-in-out;
}
.canSignUp,
.cannotSignUp {
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.canSignUp {
  background-color: #2691d9;
}
.cannotSignUp {
  background-color: rgba(65, 65, 65, 0.1);
}
</style>
