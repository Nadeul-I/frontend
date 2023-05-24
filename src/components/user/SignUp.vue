<template>
  <div class="center">
        <h1>회원가입</h1>
        <form @submit.prevent="signup()">
            <div class="input dupCheck">
                <input type="text" v-model="userId" name="userId" required/>
                <label>아이디</label>
                <input type="button" id="dupCheckId" name="dupCheckId" value="아이디 중복 확인" v-on:click="idDupCheck()"/>
            </div>
            <label></label>
            <div class="input">
                <input type="password" v-model="userPwd" name="userPwd" v-bind:class="{'discord': !pwdCompare}" required/>
                <span></span>
                <label>비밀번호</label>
            </div>
            <div class="input">
                <input type="password" v-model="userPwdCheck" id="userpwdCheck" v-bind:class="{'discord': !pwdCompare}" required/>
                <span></span>
                <label>비밀번호 확인</label>
            </div>
            <div class="input">
                <input type="text" v-model="userName" name="userName" required/>
                <span></span>
                <label>이름</label>
            </div>
            <div class="input">
                <input type="text" v-model="userGender" name="userGender" required/>
                <span></span>
                <label>성별</label>
            </div>
            <div class="input">
                <input type="text" v-model="userEmail" name="userEmail" v-bind:class="{'discord': !emailValidation}" required/>
                <span></span>
                <label>이메일</label>
            </div>
            <div class="input">
                <input type="submit" id="signupBtn" value="회원가입"/>
                <input type="button" @click="signin()" id="cancel" value="돌아가기"/>
            </div>
        </form>

    </div>
</template>

<script>
import { IdCheck, SignUp } from '@/api/user'
export default {
    data(){
        return{
            dupCheckResult: false,
            checkedUserId: "",
            userId: "",
            userPwd: "",
            userPwdCheck: "",
            userName: "",
            userGender: "",
            userEmail: "",
            pwdCompare : true,
            emailValidation: true,
        }
    },
    watch:{
        userPwdCheck: function(){
            console.log(this.userPwdCheck)
            if(this.userPwd!=this.userPwdCheck) this.pwdCompare = false;
            else this.pwdCompare = true;
        },
        userPwd: function(){
            console.log(this.userPwd)
            console.log(this.userPwd==this.userPwdCheck)
            if(this.userPwd!=this.userPwdCheck) this.pwdCompare = false;
            else this.pwdCompare = true;
        },
        userEmail:function(){
            let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            if(regex.test(this.userEmail)||this.userEmail=='') this.emailValidation = true;
            else this.emailValidation = false;
},
    },
    methods:{
        signup(){
            let cond = true;
            if(!this.dupCheckResult) cond = false;
            if(this.userId!=this.checkedUserId) cond = false;
            if(!this.emailValidation) cond = false;
            if(cond){
                let userInfo = {
                    userId: this.userId,
                    userPwd : this.userPwd,
                    userName : this.userName,
                    userGender : this.userGender,
                    userEmail : this.userEmail,
                }
                SignUp(userInfo, 
                () => {
                    alert('회원가입 성공')
                    this.$router.replace('/user/signin');
                },
                () => {
                    alert('에러 발생')
                })
            }else{
                alert('회원 정보를 다시 입력해주세요.')
            }
            
        },
        async idDupCheck(){
            if(this.userId==''){
                alert('아이디를 입력해주세요.')
                return
            }
            let userId = {
                userId : this.userId
            }
            IdCheck(userId, 
            ({data}) => {
                if(data.message==='fail'){
                    alert('이미 존재하는 아이디입니다.')
                }else {
                    alert('사용할 수 있는 아이디입니다.')
                    this.dupCheckResult=true
                    this.checkedUserId = this.userId;
                }}, 
                ()=>console.log('실패'))
        }   ,
        signin(){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.center{
    top:55%;
}
.dupCheck{
	display:flex;
	align-items: flex-end;
}
.dupCheck button{
	width:30%;
}
.discord, .discord:focus{
    border-bottom: 1px solid red;
    transition: border-bottom 0.3s ease-in-out;
}

</style>