import axios from "axios";

/**
 * API동작하는 내용을 정의한다. 
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

/** Agent의 정보를 불러온다. */
function getAgentList(tenantid) {
  return instance.get(`/api/agent/${tenantid}`);
}

/** file Info 목록 */
function getFileInfoList(reqObj) {
  // console.log("[API-CALL-getFileInfoList] reqObj: ", reqObj);
  return instance.post("/api/campaign/loadCompaignFileInfo", reqObj);
}
function getFileInfoListCnt() {
    return instance.post("/api/campaign/loadCompaignFileInfoCnt");
}
/** file Data Seq데이터 조회 */
function getFileSeqDataList(reqObj) {
    // console.log("[API-CALL-getFileSeqDataList] reqObj: ", reqObj);
    return instance.post('/api/campaign/loadCampaignFileSeqList',  reqObj);
}
/** file Data Seq 데이터 목록개수 */
function getFileSeqDataListCnt(fileSeq) {
    return instance.post('/api/campaign/loadCampaignFileSeqListCnt/' + fileSeq);
}
/** AgentSeq에 따른 데이터 조회 */
function getAgentSeqDataList(reqObj) {
  console.log("[API-CALL-getAgentSeqDataList] reqObj: ", reqObj);
  return instance.post("/api/campaign/choiceAgentList", reqObj);
}
/** AgentSeq에 따른 데이터 개수 조회 */
function getAgentSeqDataListCnt(reqObj) {
  // console.log("[API-CALL-getAgentSeqDataListCnt] reqObj: ", reqObj);
  return instance.post("/api/campaign/choiceAgentListCnt", reqObj);
}
/** 상담원 목록조회 */
function getAgentDataList(tenantid) {
    return instance.post('/api/campaign/loadAgentList/' + tenantid);
}
/** 상담원 목록 개수 */
function getAgentDataListCnt(tenantid) {
    return instance.post('/api/campaign/loadAgentListCnt/' + tenantid);
}
/** 데이터 insert*/
function setCampaignData(userName, agentList, CampaignList) {
  console.log('------------------[API DATA CHECK]------------------');
  console.log('[Agent selected Data] : ', agentList);
  console.log('[Campaign selected Data] : ', CampaignList);
  let reqObj = {
      userName: userName,
      agentList: agentList,
      CampaignList: CampaignList
  }
  return instance.post("/api/campaign/setCampaignData", reqObj);
}
/** 등록된 캠페인 데이터 개수  */
function getCampaignConfirmList(reqObj) {
  console.log("[API-CALL-getCampaignConfirmList] reqObj: ", reqObj);
  return instance.post("/api/campaign/regCampaignConfirmList", reqObj);
}

/** 등록된 캠페인 데이터  */
function getCampaignConfirmListCnt(reqObj) {
  console.log("[API-CALL-getCampaignConfirmListCnt] reqObj: ", reqObj);
  return instance.post("/api/campaign/regCampaignConfirmListCnt", reqObj);
}
/** 상담원 데이터 삭제 */
function deleteCampaignData(agentDataList) {
    console.log('------------------[API DATA CHECK]------------------');
    console.log('[agentDataList selected Data] : ', agentDataList);
    let reqObj = {
        agentDataList: agentDataList,
    }
    return axios.post(process.env.VUE_APP_API_URL + '/api/campaign/deleteCampaignData', reqObj);
}
/** 날짜에 따른 캠페인 데이터 처리 */
function getCampaignDateList(reqObj) {
  // console.log("[API-CALL-getCampaignDateList] reqObj: ", reqObj);
  return instance.post("/api/campaign/hist", reqObj);
}
/** 날짜에 따른 캠페인 데이터 갯수처리 */
function getCampaignDateListCnt(reqObj) {
  // console.log("[API-CALL-getCampaignDateListCnt] reqObj: ", reqObj);
  return instance.post("/api/campaign/histCnt", reqObj);
}

export {
  getAgentList,
  getFileInfoList,
  getFileInfoListCnt,
  getFileSeqDataList,
  getFileSeqDataListCnt,
  getAgentSeqDataList,
  getAgentSeqDataListCnt,
  getAgentDataList,
  getAgentDataListCnt,
  setCampaignData,
  getCampaignConfirmList,
  getCampaignConfirmListCnt,
  deleteCampaignData,
  getCampaignDateList,
  getCampaignDateListCnt
}