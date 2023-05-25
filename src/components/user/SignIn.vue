<template>
   <div class="center">
        <h1>로그인</h1>
        <form @submit.prevent="onClickLogin()">
            <div class="input">
                <input type="text" name="userId" v-model="userId" required/>
                <span></span>
                <label>아이디</label>
            </div>
            <div class="input">
                <input type="password" name="userPwd" v-model="userPwd" required/>
                <span></span>
                <label>비밀번호</label>
            </div>
            <div class="find" id="find" @click="findpwd()">비밀번호를 잊으셨나요?</div>
            <div class="input">
                <input type="button" @click="onClickLogin()" value="로그인" />
                <input type="button" @click="signup()" id="signupBtn" value="회원가입">
            </div>	
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
    name: "SignIn",
    data(){
        return{
            userId : "",
            userPwd : "",
        }
    },
    methods:{
        ...mapActions(userStore, ["userLogin"]),
        async onClickLogin(){
            await this.userLogin({userId : this.userId, userPwd : this.userPwd});
            
        },

        signup(){
            this.$router.push('/user/signup')
        },
        findpwd(){
            this.$router.push('/user/findpwd')
        }
    }
}
</script>

<style scoped>
input[type="button"]:first-child {
  border: 1px solid white;
  background: #2691d9;
  color: #d9f4fb;
}
input[type="button"]:first-child:hover {
  border-color: #2691d9;
  transition: 0.5s;
}

</style>