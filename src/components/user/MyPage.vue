<template>
  <div class="center">
    <h1>마이페이지</h1>
    <form @submit.prevent="modifyComplete()">
      <div class="input dupCheck">
        <input type="text" v-model="userId" name="userId" disabled required />
        <label>아이디</label>
      </div>
      <label></label>
      <div class="input">
        <input
          type="text"
          v-model="userName"
          name="userName"
          disabled
          required
        />
        <span></span>
        <label>이름</label>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="userPwd"
          name="userPwd"
          v-bind:disabled="!modifyState"
          required
        />
        <span></span>
        <label>비밀번호</label>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="userGender"
          name="userGender"
          v-bind:disabled="!modifyState"
          required
        />
        <span></span>
        <label>성별</label>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="userEmail"
          name="userEmail"
          v-bind:disabled="!modifyState"
          required
        />
        <span></span>
        <label>이메일</label>
      </div>
      <div class="input" v-if="!modifyState">
        <input type="button" @click="modify()" id="modifyBtn" value="수정" />
        <input
          type="button"
          @click="withdraw()"
          id="withDrawBtn"
          value="탈퇴"
        />
        <input
          type="button"
          @click="home()"
          id="cancel"
          value="메인 페이지로"
        />
      </div>
      <div class="input" v-else>
        <input
          type="button"
          @click="modifyComplete()"
          id="modifyBtn"
          value="수정 완료"
        />
        <input type="button" @click="modify()" id="cancel" value="돌아가기" />
      </div>
    </form>
  </div>
</template>

<script>
import { myPage, userModify } from "@/api/user";
import { mapGetters } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      userId: "",
      userName: "",
      userPwd: "",
      userGender: "",
      userEmail: "",
      modifyState: false,
    };
  },
  computed: {
    ...mapGetters(userStore, ["getUserId"]),
  },
  created() {
    console.log(this.getUserId);
    myPage(
      this.getUserId,
      ({ data }) => {
        let userInfo = data.userInfo;
        (this.userId = userInfo.userId),
          (this.userName = userInfo.userName),
          (this.userPwd = userInfo.userPwd),
          (this.userGender = userInfo.userGender),
          (this.userEmail = userInfo.userEmail);
      },
      () => console.log("마이페이지 접근 실패")
    );
  },
  methods: {
    modify() {
      this.modifyState = !this.modifyState;
    },
    home() {
      this.$router.push("/");
    },
    withdraw() {
      this.$router.push("/user/withdraw");
    },
    modifyComplete() {
      let userInfo = {
        userId: this.userId,
        userGender: this.userGender,
        userPwd: this.userPwd,
        userEmail: this.userEmail,
      };
      userModify(
        userInfo,
        () => {
          alert("회원정보 수정 성공");
          this.modifyState = !this.modifyState;
        },
        () => console.log("수정 실패")
      );
    },
  },
};
</script>

<style scoped>
.input input:disabled ~ label {
  color: #adadad;
}
.input label {
  position: absolute;
  top: -5px;
  left: 5px;
  color: #2691d9;
  transform: translateY(-50%);
  font-size: 16px;
  transition: 0.5s;
}

input[type="button"]:first-child {
  border: 1px solid white;
  background: #2691d9;
  color: #d9f4fb;
}
/* input[type="button"]:first-child:hover {
  border-color: #2691d9;
  transition: 0.5s;
} */

input[type="button"]:nth-child(2) {
  border: 1px solid white;
  background: #d92626;
  color: #d9f4fb;
}
input[type="button"]:nth-child(2):hover {
  border-color: #d92626;
  transition: 0.5s;
}
</style>
