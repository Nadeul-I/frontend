import { apiInstance } from './index.js'

const api = apiInstance();

// 여행 계획 목록 (userid, pgno)
async function planList(planSearch, success, fail){
    await api.post(`/plan/list`, JSON.stringify(planSearch)).then(success).catch(fail);
}

// 여행 계획 쓰기 -> 권한 체크
async function planWrite(planInfo, success, fail){
    await api.post(`/plan/write`, JSON.stringify(planInfo)).then(success).catch(fail);
}

// 여행 계획 상세보기
async function planView(planNo, success, fail){
    await api.get(`/plan/view/${planNo}`).then(success).catch(fail);
}

// 여행 계획 삭제 -> 권한 체크
async function planDelete(planNo, success, fail){
    await api.delete(`/plan/delete/${planNo}`).then(success).catch(fail);
}

// 여행 계획 수정 -> 권한 체크
async function planModify(planInfo, success, fail){
    await api.put(`/plan/modify`, JSON.stringify(planInfo)).then(success).catch(fail);
}

export {planList, planWrite, planView, planDelete, planModify};