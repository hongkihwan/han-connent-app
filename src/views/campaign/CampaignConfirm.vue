<template>
 <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-12">
        <div class="card m-b-30">
          <div class="card-header">
            <span>캠페인 데이터 확인</span>
          </div>
          <div class="row">
            <div class="col-lg-9" style="display:inline-flex;margin-left:10px;margin-top:20px;">
              <span style="width:200px;margin-top:5px;margin-right:3px;">이력 추출 기간</span>
              <date-picker v-model="begindate" id="begindate" format="yyyy-MM-dd" style="margin-right:10px;width:200px;"/>
              <span style='margin-right:10px;'>~</span>
              <date-picker v-model="enddate" id="enddate" format="yyyy-MM-dd" style="margin-right:10px;width:200px;" />
              <span style="width:100px;margin-top:5px;margin-right:0px;margin-left:20px;">상담사</span>
              <select v-model="agentseq" class="form-control" style="width:150px;">
                  <option value="0">전체</option>
                  <option v-for="item in agentlist" :key="item.agentseq" :value="item.agentseq">{{item.name}}</option>
              </select>
              <button class="btn btn-primary" style="margin-left:5px;" @click="periodData()">조회</button>
            </div>
            <div class="mt-5" style="width:800px;margin: auto;">
              <div class="Container-Tables">
                <table class="table table-colored-bordered table-bordered-info">
                  <thead>
                    <tr>
                      <th style="width:40px;"><input v-model="allSelected" type="checkbox" @change="selectAll"></th>
                      <th style="width:100px;">번호</th>
                      <th style="width:100px;">등록자</th>
                      <th style="width:100px;">제목</th>
                      <th style="width:">내용</th>
                      <th style="width:130px;">파일등록일자</th>
                      <th style="width:130px;">등록일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in campaignList">
                      <tr :key="index">
                        <td><input v-model="campaignDataSelected" :value="item" type="checkbox" @change="campaignDataSelect(item)" style="width: 100%;height: 15px;"/>
                        <td>{{ item.ad_no }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.campaign_title }}</td>
                        <td>{{ item.campaign_content }}</td>
                        <td>{{ $moment(item.file_regDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>{{ $moment(item.ad_regDate).format('YYYY-MM-DD HH:mm:ss')}}</td>
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
                  <li class="page-item" :class="{ disabled: pageData.isFirst }">
                    <div
                      class="page-link"
                      aria-label="Previous"
                      @click="dataPagingProc(1)">
                      &laquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: pageData.isFirst }">
                    <div
                      class="page-link"
                      @click="dataPagingProc(pageData.currentPage * 1 - 2)"
                    >
                      &lsaquo;
                    </div>
                  </li>
                  <!-- 페이지 번호 반복문 : 페이지번호에 active 클래스 주는 조건문 추가 필요 -->
                  <li v-for="i in pageData.pageBtns" :key="i" class="page-item">
                    <div @click="dataPagingProc(i)">
                      <span class="page-link">
                        {{ i }}
                        <span class="sr-only">(current)</span>
                      </span>
                    </div>
                  </li>
                  <!-- 다음 페이지 버튼 -->
                  <li class="page-item" :class="{ disabled: pageData.isLast }">
                    <div
                      class="page-link"
                      @click="dataPagingProc(pageData.currentPage * 1 + 2)"
                    >
                      &rsaquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: pageData.isLast }">
                    <div
                      class="page-link"
                      aria-label="Next"
                      @click="dataPagingProc(pageData.endPage)">
                      &raquo;
                    </div>
                  </li>
                </ul>
              </div>
              <div class="Container-data-deleteArea">
                <button class="btn btn-primary" style="margin-left:5px;" @click="deleteButton">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { makeDate } from "@/js/common.js";
import { deleteCampaignData} from "@/api/campaign.js"
import { mapGetters } from 'vuex';


export default {
  mounted(){
    this.loadAgent();
  },
  computed: {
    ...mapGetters({
      campaignListCnt: 'campaign/getSeqDataListCnt',
      pageData: 'campaign/getPageData',
      campaignList: 'campaign/getSeqDataList',
    })
  },
  components: {
    DatePicker,
  },
  data() {
    return {
      /** 한페이지에 표시할 게시물 수 */
      pagePerCount: 10,

      // 날짜 설정.
      begindate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      agentlist:[],
      // 상담사 agentseq,
      agentseq:0,

      // 데이터 정보 
      allSelected:false,
      campaignDataSelected:[],
      
    }
  },
  methods: {
    selectAll(){
      this.campaignDataSelected =[];

      if(this.allSelected) {
        // 모든 체크박스가 선택되면 list 추가.
        for(let campaign in this.campaignList) {
          this.campaignDataSelected.push(this.campaignList[campaign]);
        }
      }
    },
    async loadAgent() {
      // 콤보상자 등록
      await this.$store.dispatch('campaign/comboAgentList', this.$store.state.tenantid, {root: true});
      this.agentlist=this.$store.getters['campaign/getAgentList'];
    },
    campaignDataSelect(item) {
      
      // if(this.campaignDataSelected.indexOf(item) == -1) {
        this.campaignDataSelected.push(item);
      // }
      // 중복처리.
      // this.campaignDataSelected.filter((item, index) => this.campaignDataSelected.indexOf(item) === index);
      let duplication = this.campaignDataSelected;
      this.campaignDataSelected = Array.from(new Set(duplication.map(JSON.stringify))).map(JSON.parse);

      console.log('[campaingRegistry-campaignDataSelect] campaignDataSelected', this.campaignDataSelected);
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
        agentSeq: this.agentseq,
        reqPage,
      }; 
      console.log('[CampaignConfirm-dataPagingProc] reqPage : ', reqPage);
    
      await this.$store.dispatch('campaign/campaignSeqDataList', params, {root: true});
      await this.$store.dispatch('campaign/campaignPageSetting', params, {root: true});
      // await this.$store.commit('campaign/setPageData', pageData);
    },
    async deleteButton() {
      // 삭제 버튼 클릭시 
      console.log('[CampaignConfirm-deleteButton]');
      if(this.campaignDataSelected != '') {
        console.log('[campaignDataSelected Data] : ', this.campaignDataSelected);
        await deleteCampaignData(this.campaignDataSelected) .then(response => {
          console.log('[TEST] response Data : ', response);
          this.campaignDataSelected=[];
        }).catch(error => {
          console.log('[TEST] error Data : ', error);
          this.campaignDataSelected=[];
        })
        this.periodData();
      }
    },
    async periodData() {
      // 기간, 상담사에 대한 정보를 불러온다. 
      console.log('[CampaignConfirm-periodData] : ', this.begindate, this.enddate, this.agentseq);
      
      if(this.begindate == null || this.enddate == null || this.agentseq == 0) {
        this.$toast.open({
          type: "error",
          position:'top-right',
          message: `<div class="text-white" style="width:210px;height:40px;display:flex;justify-content:center;align-items:center;"><p class="font-weight-bold h5">날짜항목 및 상담사를 확인해주세요.</p></div>`,
          duration: 3000,
          dismissible: true
        });
      }else {
        let reqPage=0;

        if(!reqPage || reqPage==0) {
          reqPage= reqPage +1;
        }
        let cntParmas= {
          begin: makeDate(this.begindate),
          end: makeDate(this.enddate),
          agentSeq: this.agentseq,
        };
        await this.$store.commit('campaign/setInitialize');
        await this.$store.dispatch('campaign/campaignSeqDataListCnt', cntParmas, {root: true});

        console.log('[components] campaignListCnt : ', this.campaignListCnt);

        let params = {
          begin: makeDate(this.begindate),
          end: makeDate(this.enddate),
          pagePerCount: this.pagePerCount,
          campaignListCnt: this.campaignListCnt,
          agentSeq: this.agentseq,
          reqPage,
        };
        console.log('[CampaignConfirm-periodData] DATA CHECK Params : ', params);
        await this.$store.dispatch('campaign/campaignPageSetting', params, {root: true});
        await this.$store.dispatch('campaign/campaignSeqDataList', params, {root: true});
        // await this.$store.dispatch('campaign/comboAgentList', this.$store.state.tenantid, {root: true});
      }
    }
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

.Container-Tables {
  justify-content: center;
}
.Container-Tables tbody > td{
  max-height: 20px;
}
.Container-Tables tbody > tr:hover {
  color:#0004fffa;
  cursor: pointer;
}
.Container-PageArea {
  display: flex;
  justify-content: center;
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
.Container-data-deleteArea {
  display: flex;
  justify-content: center;
}
</style>