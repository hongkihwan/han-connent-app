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
export {
    fetchSms
}