import { apiInstance } from '@/api/index.js'

const api = apiInstance();

function sidoList(success, fail) {
    api.get(`/region/search`).then(success).catch(fail);
}

function gugunList(sidoInfo, success, fail) {
    api.get(`/region/search/${sidoInfo}`).then(success).catch(fail);
}

function regionSearch(sidoInfo, success, fail) {
    api.get(`/region/search/${sidoInfo.sidoCode}/${sidoInfo.gugunCode}/${sidoInfo.category}/${sidoInfo.keyword}/`)
        .then(success).catch(fail);
}
function hotPlace(success, fail) {
    api.get(`/region/hotplace`).then(success).catch(fail);
}

export { sidoList, gugunList, regionSearch, hotPlace }