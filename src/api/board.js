import { apiInstance } from "./index.js"

const api = apiInstance();

// 게시글 목록
async function boardList(boardSearch, success, fail) {
    await api.post(`/board/list`, JSON.stringify(boardSearch)).then(success).catch(fail);
}

// 게시글 쓰기 -> 권한 체크
async function boardWrite(boardInfo, success, fail) {
    
    await api.post(`/board/write`, JSON.stringify(boardInfo)).then(success).catch(fail);
}

// 게시글 상세보기
async function boardView(boardNo, success, fail) {
    await api.get(`/board/view/${boardNo}`).then(success).catch(fail);
}

// 게시글 삭제 -> 권한 체크
async function boardDelete(boardNo, success, fail) {
    await api.delete(`/board/delete/${boardNo}`).then(success).catch(fail);
}

// 게시글 수정 -> 권한 체크
async function boardModify(boardInfo, success, fail) {
    await api.put(`/board/modify`, JSON.stringify(boardInfo)).then(success).catch(fail);
}

export { boardList, boardWrite, boardView, boardDelete, boardModify };