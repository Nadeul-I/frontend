import { apiInstance } from "./index.js"

const api = apiInstance();

function boardList(success, fail) {
    api.get(`/board`).then(success).catch(fail);
}
function boardWrite(boardInfo, success, fail) {
    api.post(`/board`, JSON.stringify(boardInfo)).then(success).catch(fail);
}
function boardView(boardNo, success, fail) {
    api.get(`/board/${boardNo}`).then(success).catch(fail);
}

function boardDelete(boardNo, success, fail) {
    api.delete(`/board/${boardNo}`).then(success).catch(fail);
}

function boardModify(boardInfo, success, fail) {
    api.put(`/board`, JSON.stringify(boardInfo)).then(success).catch(fail);
}

export { boardList, boardWrite, boardView, boardDelete, boardModify };