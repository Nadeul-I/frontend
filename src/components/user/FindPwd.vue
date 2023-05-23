<template>
  <div class="center">
        <h1>비밀번호 찾기</h1>
        <form @submit.prevent="findpwd()">
            <div class="input">
                <input type="text" name="userId" v-model="userId" required/>
                <span></span>
                <label>아이디</label>
            </div>
            <div class="input">
                <input type="text" name="userEmail" v-model="userEmail" required/>
                <span></span>
                <label>이메일</label>
            </div>
            <div class="input">
                <input type="submit" v-if="!pwdfound" id="login" value="비밀번호 찾기" />
                <div class="input" v-if="pwdfound" >
                    <input type="text" :value="userPwd=='' ? '일치하는 정보가 없습니다.' : userPwd" disabled/>
                    <span></span>
                    <label>비밀번호 찾기 결과</label>
                </div>
                <input type="button" @click="signin()" id="signupBtn" value="돌아가기">
            </div>	
        </form>
    </div>
</template>

<script>
import { FindPwd } from '@/api/user.js'
export default {
    name: 'FindPwd',
    data(){
        return{
            userId : this.userId,
            userEmail : this.userEmail,
            pwdfound : false,
            userPwd: "",
        }
    },
    methods:{
        signin(){
            this.$router.push('signin')
        },
        findpwd(){
            let userInfo = {
                userId : this.userId,
                userEmail : this.userEmail,
            }
            FindPwd(userInfo,
            ({data}) => {
                if(data.message==='success'){
                    this.pwdfound = true;
                    this.userPwd = data.userInfo;
                }else if(data.message === 'fail'){
                    this.pwdfound = true;
                }else{
                    alert('오류 발생')
                }
            })
        }
    }
}
</script>

<style scoped>
.input label{
    transform: translateY(-70%);
}
</style>