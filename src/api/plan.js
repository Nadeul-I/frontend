import { apiInstance } from './index.js'

const api = apiInstance();

// 아이디 중복 체크
async function IdCheck(userInfo, success, fail) {
    await api.post(`/user/idcheck`, JSON.stringify(userInfo)).then(success).catch(fail);
}
