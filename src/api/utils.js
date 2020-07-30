import axios from 'axios';

/**
 * API동작하는 내용을 정의한다. 
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

function uploadFile(formData) {
    // 파일을 업로드하여 s3에 등록
    return instance.post('/api/upload/uploadFiletoS3', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
function uploadToData(formData) {
    // 업로드한 파일의 데이터를 처리
    return instance.post('/api/upload/saveToDatafile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export {
    uploadFile,
    uploadToData
}