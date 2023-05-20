import { apiInstance } from './index.js'

const api = apiInstance();

function SignIn(userInfo, success, fail) {
    api.post('/user/signin', JSON.stringify(userInfo)).then(success).catch(fail);
}

function IdCheck(userInfo, success, fail) {
    api.post(`/user/idcheck`, JSON.stringify(userInfo)).then(success).catch(fail);
}

function SignUp(userInfo, success, fail) {
    api.post(`/user`, JSON.stringify(userInfo)).then(success).catch(fail);
}

function FindPwd(userInfo, success, fail) {
    api.post(`/user/findpwd`, JSON.stringify(userInfo)).then(success).catch(fail);
}
export { SignIn, IdCheck, SignUp, FindPwd }