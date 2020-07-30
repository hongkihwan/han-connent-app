import axios from "axios";

/**
 * API동작하는 내용을 정의한다. 
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

function fetchSms(requestObj) {
    return instance.post("/api/sms" + requestObj);
}

/** sms 목록 */
function fetchSmsList(obj) {
  if(!obj.selectColumns || (obj.selectColumns.columns.length < 1 && obj.selectColumns.decColumns.length < 1)) {
    obj = {
      ...obj,
      selectColumns: {
        columns: [
          "articleSeq",
          "parentArticleSeq",
          "cmsSeq",
          "articleType",
          "hit",
          "regUser",
          "regDt",
        ],
        decColumns: ["title"],
      },
    };
  }
  // URL 변경예정.
  return instance.post('/api/cms/articleList', obj);
}
export {
    fetchSms,
    fetchSmsList
}