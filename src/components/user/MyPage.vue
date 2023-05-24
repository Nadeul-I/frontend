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
export default {

}
</script>

<style>

</style>