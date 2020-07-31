<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">모바일 만족도 조사 결과목록</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>답변 수신 일자</span>
              <div style="display: flex;">
                <date-picker v-model="range" mode='range' style="margin-left:20px;margin-right: 20px;" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              </div>
              <button class="btn btn-primary" style="margin-left:5px;" @click="loadData">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;" @click="surveyToExcel">통계 추출 (Excel)</button>
              <div>
                <div>
                  <button id="popover-surveyResult" class="btn btn-primary" style="margin-left:10px;" @click="agentSurveyResult">상담사별 만족도 표</button>
                </div>
                <!-- 상담사 만족도 표 보여주기-->

                <b-popover
                  target="popover-surveyResult"
                  placement="bottom">
                  <template v-slot:title>
                    <div style="display: flex;justify-content: center; ">
                    상담사별 만족도 표
                    </div>
                  </template>

                  <div id="survey_result">
                    <table>
                      <tr>
                        <td rowspan="3" >상담사</td>
                        <td rowspan="3">발송</td>
                        <td rowspan="3">회신</td>
                        <td colspan="9">항목별 점수</td>
                        <td rowspan="2" colspan="3">총점</td>
                      </tr>
                      <tr>
                        <td colspan="3">질문1 (친절도)</td>
                        <td colspan="3">질문2 (전달력)</td>
                        <td colspan="3">질문3 (전문성)</td>
                      </tr>
                      <tr>
                        <td>그렇다</td>
                        <td>아니다</td>
                        <td>만족도</td>
                        <td>그렇다</td>
                        <td>아니다</td>
                        <td>만족도</td>
                        <td>그렇다</td>
                        <td>아니다</td>
                        <td>만족도</td>
                        <td>긍정</td>
                        <td>부정</td>
                        <td>만족도(%)</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>{{total.send}}</td>
                        <td>{{total.recv}}</td>
                        <td>{{total.a1}}</td>
                        <td>{{total.recv-total.a1}}</td>
                        <td>{{toRate(total.recv, total.a1)}}%</td>
                        <td>{{total.a2}}</td>
                        <td>{{total.recv-total.a2}}</td>
                        <td>{{toRate(total.recv, total.a2)}}%</td>
                        <td>{{total.a3}}</td>
                        <td>{{total.recv-total.a3}}</td>
                        <td>{{toRate(total.recv, total.a3)}}%</td>
                        <td>{{total.posi}}</td>
                        <td>{{total.neg}}</td>
                        <td>{{toRate(total.recv*3, total.posi)}}%</td>
                      </tr>
                      <tr v-for="(item, index) in agentlist" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.send}}</td>
                        <td>{{item.recv}}</td>
                        <td>{{item.a1}}</td>
                        <td>{{item.recv-item.a1}}</td>
                        <td>{{toRate(item.recv, item.a1)}}%</td>
                        <td>{{item.a2}}</td>
                        <td>{{item.recv-item.a2}}</td>
                        <td>{{toRate(item.recv, item.a2)}}%</td>
                        <td>{{item.a3}}</td>
                        <td>{{item.recv-item.a3}}</td>
                        <td>{{toRate(item.recv, item.a3)}}%</td>
                        <td>{{item.posi}}</td>
                        <td>{{item.neg}}</td>
                        <td>{{toRate(item.recv*3, item.posi)}}%</td>
                      </tr>
                    </table>
                  </div>
                </b-popover>
              </div>
            </div>
          </div>
          <table id="survey_response" class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px; table-layout:fixed;text-align: center;">
            <thead>
              <tr>
                <th style="width:20px;">순서</th>
                <th style="width:60px;">발송일시</th>
                <th style="width:60px;">답변일시</th>
                <th style="width:60px;">통화일시</th>
                <th style="width:30px;">상담사</th>
                <th style="width:45px;">전화번호</th>
                <th style="width:40px;">콜백번호</th>
                <th style="width:30px;">답변1</th>
                <th style="width:30px;">답변2</th>
                <th style="width:30px;">답변3</th>
                <th style="width:150px;">답변4</th>
              </tr>
            </thead>
            <tbody style="height:300px; overflow:auto;">
              <template v-for="(item, index) in result.items.filter(item => item.agentseq == agentseq || agentseq == 0)">
              <tr :key="index">
                  <td>{{ index + 1}}</td>
                  <td>{{ $moment(item.sendDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ $moment(item.resultDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ $moment(item.contDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                  <td>{{ findAgentName(item.agentseq)}}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ convBrand(item.callback) }}</td>
                  <td>{{ item.ans1 }}</td>
                  <td>{{ item.ans2 }}</td>
                  <td>{{ item.ans3 }}</td>
                  <td style="text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{item.ans4}}</td>
              </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { makeDate } from '@/js/common.js';


export default {
  mounted() {
    this.loadData();
  },
  components: {
    DatePicker
  },
  data() {
    return {
      result: {items: [], agents: []},
      total: {send:0, recv:0, a1:0, a2:0, a3:0, posi:0, neg:0, satiRate:0},
      agentlist: [],
      agentseq: 0,
      
      keyword: '',
      range: {
        start: new Date(), 
        end: new Date()    
      },
    }
  },
  methods: {
    surveyToExcel() {
      let wb = window.XLSX.utils.book_new();

      wb.SheetNames.push("만족도");
      let ws1 = window.XLSX.utils.table_to_sheet(document.getElementById('survey_result'));
      wb.Sheets["만족도"] = ws1;

      wb.SheetNames.push("답변목록");
      let ws2 = window.XLSX.utils.table_to_sheet(document.getElementById('survey_response'));
      wb.Sheets["답변목록"] = ws2;

      let wbout = window.XLSX.write(wb, {bookType:'xlsx', bookSST: true, type: 'binary'});
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      let blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
      
      let saveData = (function () {
        let aTag = document.createElement("a");
        aTag.style.cssText = "displaTag: none";
        document.body.appendChild(aTag);
        return function (blob, fileName) {
          let url = window.URL.createObjectURL(blob);
          aTag.href = url;
          aTag.download = fileName;
          aTag.click();
          window.URL.revokeObjectURL(url);
        };
      }());
      saveData(blob, "만족도조사결과_" + makeDate(this.range.start) + "_" + makeDate(this.range.end) + ".xlsx");
    },
    findAgentName: function (agentseq) {
      // agentseq에 따라 상담사의 이름을 알려준다.
      let agent = this.agentlist.find((agent) => agent.agentseq == agentseq);
      try { return agent.name; }
      catch { return ""; }
    },
    convBrand(val) {
      return val == '0803223300' ? '2R' : '4R';
    },
  

    async loadData() {
      let self = this;
            
      self.result = { items:[], agents:[]};
      await axios.get(process.env.VUE_APP_API_URL + '/api/agent/3')
        .then(function (res) {
          if(res.data.result === true) {
            self.agentlist=[];
            res.data.items.forEach(item => {
                if(item.role != 'CLIENT' && item.agentid != 'test' && item.agentid != 'honda7' && item.agentid != 'honda1') {
                  self.agentlist.push({agentseq:item.agentseq, agentid:item.agentid, name:item.name, a1:0, a2:0, a3:0, send:0, recv:0, posi:0, neg:0, satiRate:0.0});
                }
            });
          }
      });

      await axios.get('https://q4zczadec8.execute-api.ap-northeast-2.amazonaws.com/dev/survey/3/2/' + makeDate(this.range.start) + '/' + makeDate(this.range.end) + '/result')
              .then(function(res) {
        if(res.data.result == true) {
          self.result.items = res.data.items;
          self.result.agents = res.data.agents;
          
          self.total =  {send:0, recv:0, a1:0, a2:0, a3:0, posi:0, neg:0, satiRate:0};

          self.agentlist.forEach(agent => {
            let item = self.result.agents.find(a => a.agentSeq == agent.agentseq);

            if(item != undefined) {
              self.total.send += parseInt(item.send);
              self.total.recv += parseInt(item.result);
              self.total.a1 += parseInt(item.a1);
              self.total.a2 += parseInt(item.a2);
              self.total.a3 += parseInt(item.a3);
              self.total.posi += parseInt(item.posi);
              self.total.neg += parseInt(item.neg);

              agent.a1 = item.a1;
              agent.a2 = item.a2;
              agent.a3 = item.a3;

              agent.send = item.send;
              agent.recv = item.result;
              agent.posi = item.posi;
              agent.neg  = item.neg;
              agent.satiRate = item.satiRate;
            } else {
              agent.a1 = 0;
              agent.a2 = 0;
              agent.a3 = 0;
              agent.send = 0;
              agent.recv = 0;
              agent.posi = 0;
              agent.neg = 0;
            }
          });
          console.log('[components-SurveyReport] serverVariable items : ', res.data.items);
          console.log('[components-SurveyReport] localvariable items : ', self.result.items);
          console.log('[components-SurveyReport] serverVariable agents : ', res.data.agents);
          console.log('[components-SurveyReport] serverVariable agents : ', self.result.agents);
        }
      });
    }, 
    toRate (base, val) {
      let rate = 0;

      if(base > 0) {
          rate = val / base * 100.0;

          if(rate == 100) {
              return rate.toFixed(0);
          }
      }
      return rate.toFixed(rate == 0 ? 0 : 1);
    },
    agentSurveyResult() { },
  }
}
</script>

<style scoped>
.contact-history-view {
  text-align:left;
  height: 780px;
  overflow-y: auto;
}
.popover {
  max-width: 100%;
  height: 32vh;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 0px;
  margin-left: 0px;
}
#survey_result table tr td {
  border: 1px solid #444444;
  text-align: center;
}
.table-colored-bordered.table-bordered-info thead th {
  color:#000030;
  font-weight:600;
  text-align: center;
  background-color: #f0f0f2;
}
</style>