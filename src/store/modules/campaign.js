import Vue from 'vue'
import Vuex from 'vuex'
import { makePageData } from '@/js/common.js';

import { getAgentList,
  getFileInfoList, getFileInfoListCnt, getFileSeqDataList, getFileSeqDataListCnt,
  getAgentDataList, getAgentDataListCnt, getAgentSeqDataList, getAgentSeqDataListCnt,
  getCampaignDateList, getCampaignDateListCnt, getCampaignConfirmList, getCampaignConfirmListCnt
} from "@/api/campaign.js"

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    file: null,
    agentList: [],
    agentListCnt: 0,
    agentPageData: {},

    dataList: [],
    dataListCnt: 0,
    dataInfoList: [],
    dataInfoListCnt: 0,
    dataSeqList:[],
    dataSeqListCnt: 0,
    // 페이지 처리 데이터
    infoPageData: {},
    /** 페이지 번호 */
    pageNo: 0,
    /** 한페이지에 표시할 게시물 수 */
    pagePerCount: 10,
    /** 페이지 처리에 사용하는 값 */
    pageData: {},
  },
  getters: {
    getCampaignFile(state) {
      return state.file;
    },
    getDataInfoList(state) {
      // console.log('[getters] getDataInfoList data : ', state.dataInfoList);
      return state.dataInfoList;
    },
    getDataInfoListCnt(state) {
      // console.log('[getters] getDataInfoListCnt data : ', state.dataInfoListCnt);
      return state.dataInfoListCnt;
    },
    getDataList(state) {
      // 전체 데이터를 불러온다.
      return state.dataList;
    },
    getDataListCnt(state) {
      // 전체 데이터의 갯수를 불러온다.(페이징 처리)
      return state.dataListCnt;
    },
    getSeqDataList(state){
      // console.log("[getters] getSeqDataList data : ", state.dataSeqList);
      return state.dataSeqList;
    },
    getSeqDataListCnt(state) {
      // console.log("[getters] dataSeqListCnt data : ", state.dataSeqListCnt);
      return state.dataSeqListCnt;
    },
    getAgentList(state) {
      // console.log('[getters] getAgentList data : ', state.agentList);
      return state.agentList;
    },
    getAgentListCnt(state) {
      // console.log('[getters] getAgentListCnt data : ', state.agentListCnt);
      return state.agentListCnt;
    },
    getPageData(state) {
      // 캠페인 데이터 처리 getters
      // console.log("[getters] getPageData data : ", state.pageData);
      return state.pageData;
    },
    getInfoPageData(state) {
      // 파일 info의 페이지 처리된 결과를 리턴한다.
      // console.log("[getters] getInfoPageData : ", state.infoPageData);
      return state.infoPageData;
    },
  },
  mutations: {
    setInitialize(state) {
      // 초기화 해준다.
      state.file = "";
      state.agentList = [];
      state.agentListCnt = 0;
      state.dataList = [];
      state.dataListCnt = 0;
      state.dataInfoList = [];
      state.dataInfoListCnt = 0;
    },
    setCampaignFile(state, payload) {
      state.file = payload;
    },
    setFileInfoDataList(state, payload) {
      // 파일 정보의 데이터
      state.dataInfoList = payload;
    },
    setFileInfoDataListCnt(state, payload) {
      // 파일 정보의 리스트 갯수(페이징 처리)
      state.dataInfoListCnt = payload;
      //    console.log('[mutations-setFileInfoDataListCnt] payload dataInfoList :', state.dataInfoListCnt);
    },
    setFileDataList(state, payload) {
      state.dataList = payload;
      //    console.log('[mutations-setFileDataList] payload dataList :', state.dataList);
    },
    setFileDataListCnt(state, payload) {
      state.dataListCnt = payload;
      //    console.log('[mutations-setFileDataListCnt] payload dataListCnt :', state.dataListCnt);
    },
    setSeqDataList(state, payload) {
      state.dataSeqList = payload;
    },
    setSeqDataListCnt(state, payload) {
      state.dataSeqListCnt = payload;
    },
    setPageData(state, payload) {
      // 파일 Data 페이지 Setting
      // console.log("[mutations-setPageData] payload pageData :", state.pageData);
      state.pageData = payload;
    },
    setInfoPageData(state, payload) {
      // 파일 Info 페이지 Setting
      // console.log("[mutations-setInfoPageData] payload pageData :",  state.infoPageData);
      state.infoPageData = payload;
    },
    setAgentList(state, payload) {
      state.agentList = payload;
    },
    setAgentListCnt(state, payload) {
      state.agentListCnt = payload;
    },
    setAgentPageData(state, payload) {
      console.log("[mutations-setAgentPageData] payload agentPageData :", state.agentPageData );
      state.agentPageData = payload;
    },
  },
  actions: {
    async fileDataPageSetting({ commit, state }, payload) {
      // 페이지 데이터를 세팅한다.
      let reqPage = payload.reqPage;
      if (!reqPage) {
        /** 페이지 Sync 맞추기위하여 추가 */
        reqPage = reqPage + 1;
      }
      // console.log("[Actions] ------- [fileDataPageSetting] -------");
      // console.log("[Actions] payload Data : ", payload);
      // console.log("[Actions] payload file_dataList : ", payload.file_dataListCnt);
      // console.log("[Actions] payload reqPage : ", payload.reqPage);
      // console.log("[Actions] ------- reqPage : ", payload.reqPage);
      // console.log("[Actions] payload pagePerCount : ", state.pagePerCount);
      // console.log("[Actions] ------- [fileDataPageSetting] -------");

      let pageData = makePageData(
        reqPage - 1,
        payload.file_dataListCnt,
        state.pagePerCount
      );
      commit("setPageData", pageData);
    },
    async comboAgentList({ commit }, payload) {
      // 콤보박스 상담사 처리
      // console.log("--------- [actions] comboAgentData --------- / ", payload);
      let response = await getAgentList(payload).catch((error) => {
        console.log("[API ERROR] campaign/comboAgentList : ", error);
      });
      // console.log("--------- [actions] comboAgentData --------- / ", response.data.items);
      commit("setAgentList", response.data.items);
      return response;
    },
    async fileInfoList({ commit }, payload) {
      // 파일 정보 처리.
      let response = await getFileInfoList(payload).catch((error) => {
        console.log("[API ERROR] campaign/fileInfoList : ", error);
      });
      commit("setFileInfoDataList", response.data.items);
      return response;
    },
    async fileInfoListCnt({ commit }) {
      // 파일 정보 처리.
      let response = await getFileInfoListCnt().catch((error) => {
        console.log("[API ERROR] campaign/fileInfoListCnt : ", error);
      });
      commit("setFileInfoDataListCnt", response.data.items[0].count);
      return response;
    },
    async fileInfoPageSetting({ commit, state }, payload) {
      // 파일정보의 페이지 데이터를 세팅한다.
      let reqPage = payload.reqPage;
      if (!reqPage) {
        /** 페이지 Sync 맞추기위하여 추가 */
        reqPage = reqPage + 1;
      }
      // console.log("[Actions] ------- fileInfoPageSetting -------");
      // console.log("[Actions] payload Data : ", payload);
      // console.log("[Actions] payload file_dataList : ", payload.file_infoListCnt);
      // console.log("[Actions] payload reqPage : ", payload.reqPage);
      // console.log("[Actions] ------- reqPage : ", payload.reqPage);
      // console.log("[Actions] payload pagePerCount : ", state.pagePerCount);
      // console.log("[Actions] ------- fileInfoPageSetting -------");

      let pageData = makePageData(reqPage - 1, payload.file_infoListCnt, state.pagePerCount );
      commit("setInfoPageData", pageData);
    },
    async fileDataList({ commit }, payload) {
      // fileSeq에 따른 처리
      let response = await getFileSeqDataList(payload).catch((error) => {
        console.log("[API ERROR] campaign/fileDataList : ", error);
      });
      commit("setFileDataList", response.data.items);
      return response;
    },
    async fileDataListCnt({ commit }, payload) {
      // fileSeq에 따른 처리
      let response = await getFileSeqDataListCnt(payload).catch((error) => {
        console.log("[API ERROR] - campaign/fileDataListCnt : ", error);
      });
      commit("setFileDataListCnt", response.data.items[0].count);
      return response;
    },
    async agentList({ commit }, payload) {
      // agent 정보 불러오기.
      // console.log("======== [Actions-agentList] ========");
      let response = await getAgentDataList(payload).catch((error) => {
        console.log("[API ERROR] - campaign/agentList : ", error);
      });
      commit("setAgentList", response.data.items);
      return response;
    },
    async agentListCnt({ commit }, payload) {
      // agent 정보 갯수 불러오기.
      let response = await getAgentDataListCnt(payload).catch((error) => {
        console.log("[API ERROR] - campaign/agentListCnt : ", error);
      });
      commit("setAgentListCnt", response.data.items[0].count);
      return response;
    },
    async agentSeqList({ commit }, payload) {
      // 해당 seq의 Agent 정보를 불러온다.
      // console.log('[Actions/agentSeqList] payloadData : ', payload);
      let response = await getAgentSeqDataList(payload).catch((error) => {
        console.log("[API ERROR] - campaign/agentSeqList : ", error);
      });
      commit("setFileDataList", response.data.items);
      return response;
    },
    async agentSeqListCnt({ commit }, payload) {
      // 해당 seq의 Agent 정보를 불러온다.
      // console.log('[Actions/agentSeqListCnt] payloadData : ', payload);
      await getAgentSeqDataListCnt(payload).then((response) => {
        commit("setFileDataListCnt", response.data.items[0].count);
      }).catch((error) => {
        console.log("[API ERROR] - campaign/agentSeqListCnt : ", error);
      });
    },
    async agentPageSetting({ commit,state }, payload) {
      // agent의 페이지 데이터를 세팅한다.
      let reqPage = payload.reqPage;
      if (!reqPage) {
        /** 페이지 Sync 맞추기위하여 추가 */
        reqPage = reqPage + 1;
      }
      // console.log("[Actions] ------- agentPageSetting -------");
      // console.log("[Actions] payload Data : ", payload);
      // console.log("[Actions] payload file_dataList : ", payload.campaignListCnt);
      // console.log("[Actions] payload reqPage : ", payload.reqPage);
      // console.log("[Actions] payload pagePerCount : ", state.pagePerCount);
      // console.log("[Actions] ------- agentPageSetting -------");

      let pageData = makePageData( reqPage - 1, payload.campaignListCnt, state.pagePerCount );
      commit("setPageData", pageData);
    },

    async campaignDateList({ commit }, payload) {
      // 날짜에 따른 Campaign 데이터를 불러온다.
      // console.log("[Actions/campaignDateList] payloadData : ", payload);
      let response = await getCampaignDateList(payload).catch((error) => {
        console.log("[API ERROR] - campaign/campaignDateList : ", error);
      });
      commit("setFileDataList", response.data.items);
      return response;
    },
    async campaignDateListCnt({ commit }, payload) {
      // 날짜에 따른 Campaign 데이터의 갯수를 불러온다.
      console.log("[Actions/campaignDateListCnt] payloadData : ", payload);
      let response = await getCampaignDateListCnt(payload)
        .then((response) => {
          if (response.data.items[0].count > 0) {
            commit("setFileDataListCnt", response.data.items[0].count);
          }
        })
        .catch((error) => {
          console.log("[API ERROR] - campaign/campaignDateListCnt : ", error);
        });
      return response;
    },
    async campaignPageSetting({ commit, state }, payload) {
      // 파일정보의 페이지 데이터를 세팅한다.
      let reqPage = payload.reqPage;
      if (!reqPage) {
        /** 페이지 Sync 맞추기위하여 추가 */
        reqPage = reqPage + 1;
      }
      // console.log("[Actions] ------- campaignPageSetting -------");
      // console.log("[Actions] payload Data : ", payload);
      // console.log( "[Actions] payload file_dataList : ", payload.campaignListCnt );
      // console.log("[Actions] payload reqPage : ", payload.reqPage);
      // console.log("[Actions] payload pagePerCount : ", state.pagePerCount);
      // console.log("[Actions] ------- campaignPageSetting -------");

      let pageData = makePageData( reqPage - 1, payload.campaignListCnt, state.pagePerCount);
      commit("setPageData", pageData);
    },

    async campaignSeqDataList({ commit }, payload) {
      // 캠페인 데이터에 등록된 데이터를 agentSeq로 가져오기 위한 처리
      console.log("[Actions/campaignSeqDataList] payloadData : ", payload);
      await getCampaignConfirmList(payload)
              .then((response) => {
                commit("setSeqDataList", response.data.items);
                console.log("campaign/campaignSeqDataList : ", response.data.items);

              })
              .catch((error) => {
                console.log("[API ERROR] - campaign/campaignSeqDataList : ", error);
              });
    },
    async campaignSeqDataListCnt({ commit }, payload) {
      // 캠페인 데이터에 등록된 데이터를 agentSeq로 가져오기 위한 처리
      console.log("[Actions/campaignSeqDataListCnt] payloadData : ", payload);
      await getCampaignConfirmListCnt(payload)
          .then((response) => {
            commit("setSeqDataListCnt", response.data.items[0].count);
            console.log("campaign/campaignSeqDataListCnt : ", response.data.items[0].count);
          })
          .catch((error) => {
            console.log("[API ERROR] - campaign/campaignSeqDataListCnt : ", error);
          });
    },
  },
};