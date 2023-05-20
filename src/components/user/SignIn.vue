<template>
   <div class="center">
        <h1>로그인</h1>
        <form @submit.prevent="signin()">
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
                <input type="submit" id="login" value="로그인" />
                <input type="button" @click="signup()" id="signupBtn" value="회원가입">
            </div>	
        </form>
    </div>
</template>

<script>
import axios from '@/util.js';
export default {
    name: "SignIn",
    data(){
        return{
            userId : "",
            userPwd : "",
        }
    },
    methods:{
        async signin(){
            await axios.post('/user/signin', {
                userId: this.userId,
                userPwd: this.userPwd
            }).then(({data}) => {
                if(data.message==='success'){
                    alert('로그인 성공')
                    this.$router.push({name: 'home'})
                }else alert('로그인 실패')
            })
            .catch((data) => {
                console.log(data) 
                console.log(" 전송됨?")});
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

<style>


</style>