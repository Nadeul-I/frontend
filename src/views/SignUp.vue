<template>
  <div class="center">
        <h1>회원가입</h1>
        <form method="POST" action="signup" id="form" onsubmit="return checkAll()">
            <div class="input dupCheck">
                <input type="text" id="userId" name="userId" required/>
                <label>아이디</label>
                <input type="button" id="dupCheckId" name="dupCheckId" value="아이디 중복 확인"/>
            </div>
            <label></label>
            <div class="input">
                <input type="password" id="userpwd" name="userPwd" required/>
                <span></span>
                <label>비밀번호</label>
            </div>
            <div class="input">
                <input type="password" id="userpwdCheck" required/>
                <span></span>
                <label>비밀번호 확인</label>
            </div>
            <div class="input">
                <input type="text" name="userName" required/>
                <span></span>
                <label>이름</label>
            </div>
            <div class="input">
                <input type="text" name="userGender" required/>
                <span></span>
                <label>성별</label>
            </div>
            <div class="input">
                <input type="text" name="userEmail" required/>
                <span></span>
                <label>이메일</label>
            </div>
            <div class="input">
                <input type="submit" id="signupBtn" value="회원가입"/>
                <input type="button" id="cancel" value="돌아가기"/>
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