import { apiInstance } from "./index.js"

const api = apiInstance();

// 로그인 
async function signIn(userInfo, success, fail) {
    await api.post(`/auth/signin`, JSON.stringify(userInfo)).then(success).catch(fail);
}

// 로그 아웃
async function logout(userId, success, fail){
    await api.get(`auth/logout/${userId}`).then(success).catch(fail);
}

// 토큰 인증
async function tokenCheck(token, success, fail) {
    if(token){
        api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    }
    else{
        api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
    }
    await api.get(`/auth/check`).then(success).catch(fail);
}


export {signIn, logout, tokenCheck};