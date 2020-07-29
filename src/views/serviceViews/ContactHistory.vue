<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">상담이력목록</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>이력 추출 기간</span>
              <div style="margin-left:20px;margin-right:20px;">
                <date-picker mode='range' v-model='range' :popover="{ placement: 'bottom', visibility: 'click' }"/>
              </div>
              <div style="width:70px;">
                <span>상담사</span>
              </div>
              <select class="form-control" style="width:150px;margin-left:20px;margin-right:60px;">
                  <option value="0">전체</option>
                  <option></option>
              </select>
              <div style="width:70px;">
                <span>키워드</span>
              </div>
              <input type="text" class="form-control" style="width:180px;">
              <button class="btn btn-primary" style="margin-left:5px;" @click="loadData">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
          </div>
          <div class="Container-table">
            <table id="callhist" class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:10px; table-layout:fixed;text-align:center;">
              <thead>
                <tr>
                  <!-- th rowspan="2">AgentName</th -->
                  <th style="width:60px;">순서</th>
                  <th style="width:170px;">통화일자</th>
                  <th style="width:170px;">종료시간</th>
                  <th style="width:80px;">상담사</th>                            
                  <th style="width:120px;">전화번호</th>
                  <th style="width:80px;">고객명</th>
                  <th style="width:90px;">통화유형</th>
                  <th style="width:90px;">인입구분</th>
                  <th style="width:90px;">차량종류</th>
                  <th style="width:90px;">통화결과</th>
                  <th style="width:200px;">대분류</th>
                  <th style="width:90px;">중분류</th>
                  <th style="width:125px;">소분류</th>
                  <th>통화메모</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item,index) in contacts">
                  <tr :key="index" v-if="keyword === '' || item.detail.indexOf(keyword) >= 0" @click="detailHistory(index)" >
                    <td>{{ index + 1}}</td>
                    <td>{{item.contdt}}</td>
                    <td>{{item.discdt}}</td>
                    <td>{{item.agentname}}</td>
                    <td>{{item.col2}}</td>
                    <td>{{item.col1}}</td>
                    <td>{{calltype(item.col5)}}</td>
                    <td>{{item.col4 == '1074' ? '2R' : '4R'}}</td>
                    <td style="overflow: hidden; white-space:nowrap; text-overflow:ellipsis;">{{item.catedetName}}</td>
                    <td>{{item.col7}}</td>
                    <td>{{item.catetopName}}</td>
                    <td>{{item.catemidName}}</td>
                    <td style="overflow: hidden; white-space:nowrap; text-overflow:ellipsis;">{{item.catebotName}}</td>
                    <td style="overflow: hidden; white-space:nowrap; text-overflow:ellipsis;">{{item.detail}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
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
  components: {
    DatePicker
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      range: {
        start: new Date(), 
        end: new Date()    
      },
      keyword: '',
      contacts: []
    }
  },
  methods: {
    async loadData() {
      // loadData
      let self = this;
      self.contacts = [];
      console.log('[components-ContactHistory] begindate/enddate :', makeDate(this.range.start), makeDate(this.range.end));                
      axios.get(process.env.VUE_APP_API_URL + '/api/contact/hist/' + makeDate(this.range.start) + '/' + makeDate(this.range.end) + '/3/0')
        .then((res) => {
          if(res.data.result === true) {    
            console.log('[components-ContactHistory] res.data.contacts : ', res.data.contacts);
            console.log('[components-ContactHistory] contacts : ', self.contacts);
            self.contacts = res.data.contacts;
          }
        });
    },
    calltype(type) {
      switch(type) {
        case '962':
          return '인입';
        case '963':
          return '아웃';
        case '964':
          return '콜백';
      }
      return '인입';
    },
    async detailHistory(idx) {
      console.log('[components-ContactHistory] detailHistory : ', idx);
    }
  }
}
</script>

<style scoped>

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 0px;
  margin-left: 0px;
}
.Container-table tbody{
  height:300px;
  overflow:auto;
}
.contact-history-view {
    text-align:left;
    height: 780px;
    overflow-y: auto;
}
</style>