<template>
   <div class="center">
        <h1>로그인</h1>
        <form>
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
            <div class="find" id="find">비밀번호를 잊으셨나요?</div>
            <div class="input">
                <input type="button" value="로그인" v-on:click="signin()" />
                <input type="button" id="signupBtn" value="회원가입">
            </div>	
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "SignIn",
    data(){
        return{
            userId : "",
            userPwd : "",
        }
    },
    methods:{
        signin(){
            console.log(this.userId)
            axios.post('/signin', {
                userId : this.userId,
                userPwd : this.userPwd
            }).then((data) => console.log(data))
            .catch((data) => {
                console.log(data) 
                console.log(" 전송됨?")});
        }
    }
}
</script>

<style>
.center{
    position:absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    width:400px;
    background: white;
    border : 1px solid black;
    border-radius : 10px;
}
.center h1{
    text-align:center;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid silver;

}
.center form{
    padding: 0 40px;
    box-sizing: border-box;
}
form .input{
    position: relative;
    border-bottom : 1px solid #adadad;
    margin: 30px 0;
}
form .input input:focus{
    border-bottom: 1px solid #2691d9;
    transition: border-bottom 0.3s ease-in-out;
}
.input input{
    width: 94%;
    height: 40px;
    padding : 0 10px;
    font-size: 16px;
    border:none;
    outline:none;
    background:none;
}

.input label{
    position:absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    font-size:16px;
    transition: .5s;
}

/* */
.input input:focus ~ label,
.input input:valid ~ label,
.input input:disabled ~ label{
    top : -5px;
    color: #2691d9;
}
.input input:focus ~ span::before,
.input input:valid ~ span::before{
    width: 100%;
}
.find{
    margin : -5px 0 20px 5px;
    color: #a6a6a6;
    cursor:pointer;
}
.find:hover{
    text-decoration:underline;
}
input[type="submit"],
input[type="button"]{
    width:100%;
    height:50px;
    font-size: 16px;
    cursor:pointer;
    outline:none;
}
input[type="submit"]{
    border : 1px solid white;
    background : #2691d9;
    color:#d9f4fb;
}
input[type="submit"]:hover{
    border-color: #2691d9;
    transition : .5s;
}
input[type="button"]{
    border : 1px solid white;
    background-color: white;
    color:#2691d9;
}
input[type="button"]:hover{
    border-color: #2691d9;
    transition: .5s ease;
}
.signup_link{
    margin: 30px 0;
    text-align : center;
    font-size: 16px;
    color : #666666;
}
.signup_link a{
    color: #2691d9;
    text-decoration:none;
}
.signup_link a:hover{
    text-decoration: underline;
}

</style>