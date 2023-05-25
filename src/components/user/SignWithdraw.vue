<template>
  <div class="center">
        <h1>회원 탈퇴</h1>
        <form @submit.prevent="modifyComplete()">
            <div class="input dupCheck">
                <input type="password" v-model="userPwd" name="userPwd" required/>
                <label>비밀번호를 입력하세요.</label>
            </div>
            <label></label>
            <div class="input">
                <input type="button" @click="withdraw()" id="withDrawBtn" value="탈퇴"/>
                <input type="button" @click="mypage()" id="cancel" value="돌아가기"/>
            </div>
        </form>

    </div>
</template>

<script>
import { Withdraw } from '@/api/user';
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";
export default {
    name: 'SignWithdraw',
    data(){
        return{
            userPwd: "",
        }
    },
    computed:{
        ...mapGetters(userStore,["getUserId"])
    },
    methods:{
         ...mapActions(userStore, ["userLogout"]),
         withdraw(){
            let userInfo = {
                userId : this.getUserId,
                userPwd : this.userPwd  
            }
            Withdraw(userInfo,
            (data) => {
                if(data.data.message==='success'){
                    alert('회원 탈퇴에 성공하였습니다.')
                    this.userLogout(this.getUserId)
                    this.$router.replace('/')
                }else{
                    alert('비밀번호가 일치하지 않습니다.')
                    return
                }
            },
            ()=> {
                alert('오류 발생')
                return
            })
        },
        mypage(){
            this.$router.push('/user/mypage')
        }
    }
}
</script>

<style scoped>
.input input:disabled ~ label{
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
  background: #d92626;
  color: #d9f4fb;
}
input[type="button"]:first-child:hover {
  border-color: #d92626;
  transition: 0.5s;
}
</style>