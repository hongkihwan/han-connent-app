<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-12">
        <div class="card m-b-30">
          <div class="card-header">
            <span>캠페인 데이터 등록</span>
          </div>
          <div class="row">
            <div class="col-lg-9" style="display:inline-flex;margin-left:10px;margin-top:20px;">
              <span style="width:200px;margin-top:5px;margin-right:3px;">이력 추출 기간</span>
              <date-picker v-model="begindate" id="begindate" format="yyyy-MM-dd" style="margin-right:10px;width:200px;"/>
              <span style='margin-right:10px;'>~</span>
              <date-picker v-model="enddate" id="enddate" format="yyyy-MM-dd" style="margin-right:10px;width:200px;" />
              <button class="btn btn-primary" style="margin-left:5px;" @click="periodData()">조회</button>
              <button class="btn btn-primary" style="margin-left:5px;" @click="saveButton()">저장</button>
            </div>
            <div class="Container-Tables">
              <div class="Container-Agent ml-3">
                <table class="table table-colored-bordered table-bordered-info" style="width:450px;margin-top:20px; table-layout:fixed;">
                  <thead>
                    <tr>
                      <th style="width:40px;"></th>
                      <th style="width:80px;">순서</th>
                      <th style="width:100px;">아이디</th>
                      <th style="width:100px;">상담원이름</th>
                      <th style="width:100px;">CTI아이디</th>
                      <th style="width:80px;">타입</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in agentList">
                      <tr :key="index">
                        <td><input v-model="agentSelected" :checked=item.agentseq name="agent_radio"  type="radio" @change="selectAgent(item)" style="width: 100%;height: 15px;"></td>
                        <td>{{ item.agentseq }}</td>
                        <td>{{ item.agentid }}</td>
                        <td @click="agentDetailList(item)">{{ item.name }}</td>
                        <td>{{ item.ctiid }}</td>
                        <td>{{ item.role }}</td>
                      </tr>
                    </template>
                    <template v-if="agentList.length <= 0"> 
                      <tr>
                        <td colspan=7 class="text-center">NO DATA Select Condition</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="Container-Campaign-data ml-3 mr-5">
                <div>
                  <table  class="table table-colored-bordered table-bordered-info" style="width:865px; margin-left:15px; margin-top:20px; table-layout:fixed;">
                    <thead>
                      <tr>
                        <th style="width:60px;"><input v-model="allSelected" type="checkbox" @change="selectAll"></th>
                        <th style="width:50px;">순서</th>
                        <th style="width:60px;">번호</th>
                        <th style="width:130px;">제목</th>
                        <th class="text-center">내용</th>
                        <th style="width:75px;">파일번호</th>
                        <th style="width:145px;">파일이름</th>
                        <th style="width:145px;">등록일자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(item,index) in campaignList">
                        <tr :key="index" >
                          <td><input v-model="campaignSelected" type="checkbox" :value="item" style="width: 100%;height: 15px;"/>
                          <td>{{ item.t_no }}</td>
                          <td>{{ item.t_number }}</td>
                          <td>{{ item.t_title }}</td>
                          <td class="details">{{ item.t_content }}</td>
                          <td class="details">{{ item.file_seq }}</td>
                          <td class="details">{{ item.file_name }}</td>
                          <td class="details">{{ $moment(item.file_regDate).format('YYYY-MM-DD HH:mm:ss') }}</td>
                        </tr>
                      </template>
                      <template v-if="campaignList.length <= 0"> 
                        <tr>
                          <td colspan=7 class="text-center">NO DATA Select Condition</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div class="Container-PageArea">
                  <ul>
                    <!-- 이전 페이지 버튼 -->
                    <li class="page-item" :class="{ disabled: fileData_pageData.isFirst }">
                      <div
                        class="page-link"
                        aria-label="Previous"
                        @click="dataPagingProc(1)">
                        &laquo;
                      </div>
                    </li>
                    <li class="page-item" :class="{ disabled: fileData_pageData.isFirst }">
                      <div
                        class="page-link"
                        @click="dataPagingProc(fileData_pageData.currentPage * 1 - 2)"
                      >
                        &lsaquo;
                      </div>
                    </li>
                    <!-- 페이지 번호 반복문 : 페이지번호에 active 클래스 주는 조건문 추가 필요 -->
                    <li v-for="i in fileData_pageData.pageBtns" :key="i" class="page-item">
                      <div @click="dataPagingProc(i)">
                        <span class="page-link">
                          {{ i }}
                          <span class="sr-only">(current)</span>
                        </span>
                      </div>
                    </li>
                    <!-- 다음 페이지 버튼 -->
                    <li class="page-item" :class="{ disabled: fileData_pageData.isLast }">
                      <div
                        class="page-link"
                        @click="dataPagingProc(fileData_pageData.currentPage * 1 + 2)"
                      >
                        &rsaquo;
                      </div>
                    </li>
                    <li class="page-item" :class="{ disabled: fileData_pageData.isLast }">
                      <div
                        class="page-link"
                        aria-label="Next"
                        @click="dataPagingProc(fileData_pageData.endPage)">
                        &raquo;
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vueToast from "vue-toast-notification";
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { makeDate } from "@/js/common.js";
import { setCampaignData } from "@/api/campaign.js"
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.periodData();
  },
  components: {
    DatePicker,
  },
  computed: {
    ...mapGetters({
      agentList: 'campaign/getAgentList',
      campaignListCnt: 'campaign/getDataListCnt',
      fileData_pageData: 'campaign/getPageData',
      campaignList: 'campaign/getDataList',
    })
  },
  data() {
    return {
      /** 한페이지에 표시할 게시물 수 */
      pagePerCount: 10,

      //file_seq_Number:0,
      begindate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      // agentseq 
      agentseq:0,
      /** 상담사 정보 */
      agentSelected: [],
      
      /** 선택한 데이터  */
      allSelected: false,
      campaignSelected: [],
    }
  },
  methods: {
    async periodData() {
      // check 항목 초기화 
      this.allSelected=false;
      this.campaignSelected=[];

      // 기간선택에 대한 데이터를 조회처리.
      let reqPage=0;

      if(!reqPage || reqPage==0) {
        reqPage= reqPage +1;
      }

      let params = {
        begin: makeDate(this.begindate),
        end: makeDate(this.enddate),
        pagePerCount: this.pagePerCount,
        campaignListCnt: this.campaignListCnt,
        reqPage,
      }; 
      await this.$store.commit('campaign/setInitialize');
      await this.$store.dispatch('campaign/campaignDateListCnt', params, {root: true});
      await this.$store.dispatch('campaign/campaignPageSetting', params, {root: true});
      await this.$store.dispatch('campaign/campaignDateList', params, {root: true});
      await this.$store.dispatch('campaign/agentList', this.$store.state.tenantid, {root: true});
    },

    async dataPagingProc(reqPage) {
      // Campaign 데이터의 페이지 버튼을 누를때마다 처리한다.
      // Campaign 데이터 불러오기
      if (!reqPage || reqPage==0) {
          reqPage = this.pageNo + 1;
      }
      
      let params = {
        begin: makeDate(this.begindate),
        end: makeDate(this.enddate),
        pagePerCount: this.pagePerCount,
        campaignListCnt: this.campaignListCnt,
        reqPage,
      }; 
      // console.log('[CampaignRegistry-dataPagingProc] reqPage : ', reqPage);
      await this.$store.dispatch('campaign/campaignDateList', params, {root: true});
      await this.$store.dispatch('campaign/campaignPageSetting', params, {root: true});
    },
    agentDetailList(item) {
      // agentSeq에 따른 데이터 처리.
      let jsonObj = JSON.parse(JSON.stringify(item));
      // console.log('[campaingRegistry-loadCampaignDetailData] jsonObj', jsonObj);
      this.agentseq = jsonObj.agentseq;
      this.loadCampaignDetailData();
    },
    async insertCampaignData() {
      // 선택한 Agent, CampaignData를 Api 호출
      await setCampaignData(this.$store.state.agent.name, this.agentSelected, this.campaignSelected)
        .then(response => {
          console.log('[TEST-setCampaignData] response Data : ', response);
          let type = "success";
          let htmlMessage = `<div class="text-white" style="width:210px;height:40px;display:flex;justify-content:center;align-items:center;"><p class="font-weight-bold h5">성공적으로 등록되었습니다.</p></div>`;
          this.makeToast(type, htmlMessage);
        }).catch(error => {
          let type = "error";
          let htmlMessage = `<div class="text-white" style="width:210px;height:40px;display:flex;justify-content:center;align-items:center;"><p class="font-weight-bold h5">${error}</p></div>`;
          this.makeToast(type, htmlMessage);
          console.log("[API ERROR] - setCampaignData : ", error);
        });
    },
    async loadCampaignDetailData() {
      // 선택한 Agent의 데이터를 호출.
      let reqPage=0;

      if(!reqPage || reqPage==0) {
        reqPage= reqPage +1;
      }
      let params = {
        begin: makeDate(this.begindate),
        end: makeDate(this.enddate),
        pagePerCount: this.pagePerCount,
        campaignListCnt: this.campaignListCnt,
        agentSeq: this.agentseq,
        reqPage,
      };
      await this.$store.dispatch('campaign/agentList', this.$store.state.tenantid, {root: true});
      await this.$store.dispatch('campaign/agentSeqListCnt', params, {root: true});
      await this.$store.dispatch('campaign/agentPageSetting', params, {root: true});
      await this.$store.dispatch('campaign/agentSeqList', params, {root: true});
    },
    selectAll() {
      // checkBox를 모두 선택했을 때 동작한다.
      this.campaignSelected = [];

      if(this.allSelected) {
        // 모든 체크박스가 선택되면 list 추가.
        for(let campaign in this.campaignList) {
          this.campaignSelected.push(this.campaignList[campaign]);
        }
      }
    },
    saveButton() {
      // console.log('[campaignSelected] campaignSelected: ', this.campaignSelected);
      
      if(this.agentSelected.length != 0 && this.agentSelected != '' && this.campaignSelected.length != 0 && this.campaignSelected != '') {
        this.insertCampaignData();
        this.loadCampaignDetailData();

        this.campaignSelected=[];
        this.agentSelected=[];
        console.log('[componenets-saveButton] agentSelected/campaignSelected After : ', this.agentSelected, this.campaignSelected);
        // 기간에 대한 데이터 재로드
        this.periodData();
      }else {
        // 값이 없을때의 처리
        // console.log('[DEBUG]-componenets ===>>>>>  saveButton ShowDialog : ', this.agentSelected, this.campaignSelected);
        let type = 'error';
        let htmlMessage = `<div class="text-white" style="width:210px;height:40px;display:flex;justify-content:center;align-items:center;"><p class="font-weight-bold h5">항목을 확인해주세요.</p></div>`;

        this.makeToast(type, htmlMessage);
        this.campaignSelected=[];
        this.allSelected=false;
      }
    },
    makeToast(type, htmlMessage) {
      this.$toast.open({
        type: type,
        position:'top-right',
        message: htmlMessage,
        duration: 3000,
        dismissible: true
      });
    },
    selectAgent(item) {
      // 상담사를 선택한다.
      this.agentSelected=item;
      // let jsonObj = JSON.parse(JSON.stringify(item));
      // console.log('[campaingRegistry-selectAgent] jsonObj', jsonObj);
      // console.log('[campaingRegistry-selectAgent] agentSelected', this.agentSelected);
    },
    // campaignDataSelect(item) {
      // console.log('[DATA CHECK // camPaignRegistry-campaignDataSelect] campaignSelected, item : ', this.campaignSelected, item);
      
      // this.campaignSelected.push(item);
      // 중복처리.
      // let duplication = this.campaignSelected;
      // this.campaignSelected = Array.from(new Set(duplication.map(JSON.stringify))).map(JSON.parse);
    // },
  }
}
</script>

<style scoped>
.table-colored-bordered.table-bordered-info thead th {
  color:#000030;
  font-weight:600;
  text-align: center;
  background-color: #f0f0f2;
}

.Container-Agent tbody > tr:hover {
  color:#2196f3;
  cursor: pointer;
}

.Container-Tables {
  display: flex;
  justify-content: center;
}
.Container-PageArea {
  width: 100%;
  height: 40px;
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.Container-PageArea ul {
  list-style: none;
  display: flex;
}
.Container-PageArea li {
  margin: 0 10px;
}
.Container-PageArea .disabled {
  display: none;
}
.details {
  max-width: 130px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap; 
}
/* .Container-Agent thead > tr{
  width: 60px;
} */
</style>