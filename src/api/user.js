import { apiInstance } from './index.js'

const api = apiInstance();

// 아이디 중복 체크
async function IdCheck(userInfo, success, fail) {
    await api.post(`/user/idcheck`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 비밀번호 찾기
async function FindPwd(userInfo, success, fail) {
    await api.post(`/user/findpwd`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 회원 가입
async function SignUp(userInfo, success, fail) {
    await api.post(`/user/signup`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 회원 탈퇴
async function Withdraw(userInfo, success, fail) {
    await api.post(`/user/withdraw`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 회원 정보 수정
async function userModify(userInfo, success, fail){
    await api.put(`/user/modify`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 마이 페이지 정보
async function myPage(userId, success, fail) {
    await api.get(`/user/mypage/${userId}`, JSON.stringify(userId)).then(success).catch(fail);
}
export {IdCheck, FindPwd, SignUp, Withdraw, userModify, myPage }