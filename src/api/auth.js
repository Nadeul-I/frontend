import { apiInstance } from "./index.js"

const api = apiInstance();

// 게시글 목록
async function boardList(success, fail) {
    await api.get(`/board/list`).then(success).catch(fail);
}


export { boardList};