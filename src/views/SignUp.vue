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
                <input type="password" v-model="userPwd" name="userPwd" v-bind:class="{'discord': !this.pwdCompare}" required/>
                <span></span>
                <label>비밀번호</label>
            </div>
            <div class="input">
                <input type="password" v-model="userPwdCheck" id="userpwdCheck" v-bind:class="{'discord': !this.pwdCompare}" required/>
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
                <input type="text" v-model="userEmail" name="userEmail" required/>
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
import axios from '@/util.js'
export default {

    data(){
        return{
            dupCheckResult: false,
            userId: "",
            userPwd: "",
            userPwdCheck: "",
            userName: "",
            userGender: "",
            userEmail: "",
            pwdCompare : true,
        }
    },
    watch:{
        userPwdCheck: function(){
            if(this.userPwd!=this.userPwdCheck) this.pwdCompare = false;
            else this.pwdCompare = true;
        },
        userPwd: function(){
            if(this.userPwd!=this.userPwdCheck) this.pwdCompare = false;
            else this.pwdCompare = true;
        }
    },
    methods:{
        signup(){
            let cond = true;
            if(!this.dupCheckResult) cond = false;
            
            if(cond){
                axios.post('/auth/signup',{
                    userId: this.userId,
                    userPwd : this.userPwd,
                    userName : this.userName,
                    userGender : this.userGender,
                    userEmail : this.userEmail,
                }).then(({data})=>{
                    if(data.message==='success'){
                        alert('회원가입 성공')
                        this.$router.push('/signin')
                    }
                })
            }else{
                alert('바꾸셈')
            }
            
        },
        async idDupCheck(){
            await axios.post('/auth/idDupCheck', 
                this.userId,
            ).then(({data})=>{
                if(data.message==='fail'){
                    alert('이미 존재하는 아이디')
                }else {
                    alert('사용할 수 있는 아이디')
                    this.dupCheckResult=true
                }
            })
            .catch(({data})=>console.log(data))
        },
        signin(){
            this.$router.push('/signin')
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