<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">문의유형별 통계</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="width:100%;display:flex;margin-top:15px;align-items:center;justify-content: center;">
              <span>통계구분</span>
              <select v-model="repType" class="form-control" style="width:200px;margin-right:10px;">
                <option value="1074">2R 모터사이클</option>
                <option value="1075">4R 혼다자동차</option>                                
              </select>
              <date-picker style="margin-left:20px;margin-right: 20px;" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              <button class="btn btn-primary" style="margin-left:5px;" @click="loadData">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
            <div style="overflow:auto;width:100%;margin-left:15px;">
              <table id="callhist" class="table table-striped table-colored-bordered table-bordered-info" style="margin-top: 20px;width:100%;border-bottom:1px solid #e0e0e0;">
                <tr>
                  <th colspan="7"><h3>1. 종합상담현황(인바운드)</h3></th>
                </tr>
                <tr>
                  <th rowspan="2">항목</th>
                  <th rowspan="2">전년비율</th>
                  <th colspan="5">{{ year }}년도 현황</th>
                </tr>
                <tr>
                  <th>누계</th>
                  <th>당월</th>
                  <th>당월 누계</th>
                  <th>당일</th>
                  <th>특이사항 (VOC)</th>
                </tr>
                <template v-for="(item,index) in report1">
                  <tr v-if="(item.code1 !== -99 && repType === '1074') || repType === '1075'" :key="index">
                    <td>{{item.title}}</td>
                    <td>{{item.preYear}} <span v-if="item.code1 > 0">%</span></td>
                    <td>{{item.yearSum}} %</td>
                    <td>{{item.monthRatio}} %</td>
                    <td>{{item.monthSum}}</td>
                    <td>{{item.dailySum}}</td>
                    <td></td>
                  </tr>
                </template>
                <tr>
                  <th colspan="7"><h3>2. 유형별 고객불만 접수현황(인바운드)</h3></th>
                </tr>
                <tr>
                  <th rowspan="2">항목</th>
                  <th rowspan="2">전년비율</th>
                  <th colspan="5">{{year}}년도 현황</th>
                </tr>
                <tr>
                  <th>누계</th>
                  <th>당월</th>
                  <th>당월 누계</th>
                  <th>당일</th>
                  <th>특이사항 (VOC)</th>
                </tr>
                <template v-for="(item,index) in report2">
                <tr v-if="(item.code1 !== -99 && repType === '1074') || repType === '1075'" :key="index+100">
                  <td>{{item.title}}</td>
                  <td>{{item.preYear}} <span v-if="item.code1 > 0">%</span></td>
                  <td>{{item.yearSum}} %</td>
                  <td>{{item.monthRatio}} %</td>
                  <td>{{item.monthSum}}</td>
                  <td>{{item.dailySum}}</td>
                  <td></td>
                </tr>
                </template>
              </table>
            </div>

          </div>
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
  mounted () {
    this.loadData();
  },
  components: {
    DatePicker
  },
  data() {
    return {
      repType: '1075',
      repdate: new Date(),
      year: 2029,
      date: new Date(),
      report1: [
          {title:'제품/영업',code1:1211, code2: 1175, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'SVC/부품/Acc',code1:1212, code2: 1176, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'출판물/기타',code1:1213, code2: 1177, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'불만/Claim',code1:1214, code2: 1178, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'합계(건수)',code1:-1, code2: -1, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0}
      ],

      report2: [
          {title:'제품',code1:1503, code2: 1192, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'영업',code1:1504, code2: 1193, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'SVC',code1:1505, code2: 1194, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'부품',code1:1506, code2: 1195, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'악세서리',code1:1507, code2: 1196, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'출판물',code1:-99, code2: 1197, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'기타',code1:-99, code2: 1198, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
          {title:'합계(건수)',code1:-2, code2: -2, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0}
      ],
      total: 0,
    }
  },
  methods: {
    async loadData() {
      let self = this;

      self.initForm();
      self.total = 0;
      axios.get('https://nodeapi.uniplat.net/api/hondadaily/new/' + makeDate(self.repdate) + '/' + self.repType)
        .then((res) => {
          if(res.data.result === true) {                    
              let idx = 0;
              let idxData = 0;
              let codeseq = 0;

              let preSub1 = 0;
              let preSub2 = 0;
              for(idx = 0; idx < res.data.list.length; idx++) {
                  codeseq = res.data.list[idx].catetop;
                  
                  if(res.data.list[idx].reptype === 1) {
                    for(idxData = 0; idxData < (self.report1.length-1); idxData++) {
                      if(self.repType == 1074) {
                        if(self.report1[idxData].code1 === codeseq) {
                          self.report1[idxData].preYear = res.data.list[idx].preYear;
                          self.report1[idxData].yearSum = res.data.list[idx].yearSum;
                          self.report1[idxData].monthRatio = res.data.list[idx].monthPercent;
                          self.report1[idxData].monthSum = res.data.list[idx].monthSum;
                          self.report1[idxData].dailySum = res.data.list[idx].dailySum;
                        }
                      } else {
                        if(self.report1[idxData].code2 === codeseq) {
                          self.report1[idxData].preYear = res.data.list[idx].preYear;
                          self.report1[idxData].yearSum = res.data.list[idx].yearSum;
                          self.report1[idxData].monthRatio = res.data.list[idx].monthPercent;
                          self.report1[idxData].monthSum = res.data.list[idx].monthSum;
                          self.report1[idxData].dailySum = res.data.list[idx].dailySum;
                        }
                      }
                    }
                    preSub1 += res.data.list[idx].preSub;
                  } else {
                    for(idxData = 0; idxData < (self.report2.length-1); idxData++) {
                      if(self.repType == 1074) {
                        if(self.report2[idxData].code1 === codeseq) {
                          self.report2[idxData].preYear = res.data.list[idx].preYear;
                          self.report2[idxData].yearSum = res.data.list[idx].yearSum;
                          self.report2[idxData].monthRatio = res.data.list[idx].monthPercent;
                          self.report2[idxData].monthSum = res.data.list[idx].monthSum;
                          self.report2[idxData].dailySum = res.data.list[idx].dailySum;
                        }
                      } else {
                        if(self.report2[idxData].code2 === codeseq) {
                          self.report2[idxData].preYear = res.data.list[idx].preYear;
                          self.report2[idxData].yearSum = res.data.list[idx].yearSum;
                          self.report2[idxData].monthRatio = res.data.list[idx].monthPercent;
                          self.report2[idxData].monthSum = res.data.list[idx].monthSum;
                          self.report2[idxData].dailySum = res.data.list[idx].dailySum;
                        }
                      }
                    }
                    preSub2 += res.data.list[idx].preSub;
                  }
              }
              //Post process
              for(idx = 0; idx < (self.report1.length-1);idx++) {
                self.report1[self.report1.length-1].monthRatio += self.report1[idx].monthRatio;
                self.report1[self.report1.length-1].yearSum += self.report1[idx].yearSum;
                self.report1[self.report1.length-1].monthSum += self.report1[idx].monthSum;
                self.report1[self.report1.length-1].dailySum += self.report1[idx].dailySum;
              }
              self.report1[self.report1.length-1].monthRatio = Math.round(self.report1[self.report1.length-1].monthRatio);
              self.report1[self.report1.length-1].yearSum = Math.round(self.report1[self.report1.length-1].yearSum);
              // self.report1[self.report1.length-1].monthSum = self.report1[self.report1.length-1].monthSum + self.report1[self.report1.length-1].dailySum;

              for(idx = 0; idx < (self.report2.length-1);idx++) {
                self.report2[self.report2.length-1].monthRatio += self.report2[idx].monthRatio;
                self.report2[self.report2.length-1].yearSum += self.report2[idx].yearSum;
                self.report2[self.report2.length-1].monthSum += self.report2[idx].monthSum;
                self.report2[self.report2.length-1].dailySum += self.report2[idx].dailySum;
              }
              self.report2[self.report1.length-1].monthRatio = Math.round(self.report2[self.report1.length-1].monthRatio);
              self.report2[self.report1.length-1].yearSum = Math.round(self.report2[self.report1.length-1].yearSum);

              if(self.repType === '1074') {
                self.report2[4].title = '악세서리/출판물/기타';
              } else {
                self.report2[4].title = '악세서리';
              }

              self.report1[self.report1.length-1].preYear = preSub1;
              self.report2[self.report2.length-1].preYear = preSub2;
          } else {
              self.initForm();
          }
        })
        .catch((error) => {
          console.log('[Components-DailyReport] ERROR : ', error);          
        });
    },
    initForm() {
            this.report1 =  [
                {title:'제품/영업',code1:1211, code2: 1175, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'SVC/부품/Acc',code1:1212, code2: 1176, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'출판물/기타',code1:1213, code2: 1177, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'불만/Claim',code1:1214, code2: 1178, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'합계(건수)',code1:-1, code2: -1, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0}
            ];

            this.report2 =  [
                {title:'제품',code1:1503, code2: 1192, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'영업',code1:1504, code2: 1193, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'SVC',code1:1505, code2: 1194, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'부품',code1:1506, code2: 1195, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'악세서리',code1:1507, code2: 1196, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'출판물',code1:-99, code2: 1197, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'기타',code1:-99, code2: 1198, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0},
                {title:'합계(건수)',code1:-2, code2: -2, preYear:0, yearSum:0, monthRatio:0, monthSum:0, dailySum:0}
            ];

            this.total =  0;
        },
  }
}
</script>

<style scoped>
.contact-history-view {
  text-align:left;
  height: 780px;
  overflow-y: auto;
}
.row {
  margin-right: 0px;
  margin-left: 0px;
}

</style>