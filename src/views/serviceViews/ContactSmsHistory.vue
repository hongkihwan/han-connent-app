<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">SMS 발송 이력목록</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>이력 추출 일자</span>
              <date-picker style="margin-left:20px;margin-right: 20px;" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              <span>상담사</span>
              <select v-model="agentseq" class="form-control" style="width:150px;margin-left:20px;margin-right:60px;">
                <option value="0">전체</option>
                <option v-for="item in agentlist" :key="item.agentseq" :value="item.agentseq">{{item.name}}</option>
              </select>
              <button class="btn btn-primary" style="margin-left:5px;" @click="loadData">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;" @click="excelExport">통계 추출 (Excel)</button>
            </div>
          </div>
      
          <table id="callhist" class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px;text-align:center;table-layout:fixed;">
            <thead>
              <tr>
                <th style="width:60px; text-align:center;">순서</th>
                <th style="width:60px; text-align:center;">구분</th>
                <th style="width:180px; text-align:center;">발송일자</th>
                <th style="width:90px;">상담사</th>                            
                <th style="width:120px; text-align:center;">전화번호</th>                            
                <th style="width:60px; text-align:center;">분류</th>
                <th style="width:60px; text-align:center;">결과</th>
                <th style="text-align:center;">발송내용</th>
                <th style="width:105px;">발송번호</th>
              </tr>
            </thead>
            <tbody style="height:300px; overflow:auto;">
              <template v-for="(item,index) in smsData.filter(item => item.regUser == agentseq || agentseq == 0)">
              <tr :key="index" @click="detailHistory(index)">
                <td>{{ index + 1 }}</td>
                <td>{{convBrand(item.extVal4)}}</td>
                <td>{{formatYMDHMS(item.regDt)}}</td>
                <td>{{findAgentName(item.regUser)}}</td>
                <td>{{item.title}}</td>
                <td>{{item.extVal1.toUpperCase()}}</td>
                <td>{{item.extVal3 == 1 ? '성공' : '실패'}}</td>
                <td style="overflow: hidden; white-space:nowrap; text-overflow:ellipsis;text-align:left;">{{item.content}}</td>
                <td>{{item.extVal2}}</td>
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
import axios from "axios";
import { fetchSmsList } from "@/api/sms.js";
import { makeDate, makeDateTime } from '@/js/common.js';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  mounted() {
    this.loadData();
  },
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date(),
      agentseq: 0,
      agentlist: [],
      smsData: [],
    }
  },
  methods: {
    excelExport(){
      console.log(this.smsData.length);
      if(this.smsData.length > 0){
        let uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
          })
        };
        let toExcel = document.getElementById("callhist").innerHTML;
        let ctx = {
        worksheet: name || '',
          table: toExcel
        };
        let link = document.createElement("a");
        link.download = makeDateTime(new Date()) + "_SMS발송이력 추출파일.xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
      } else {
        this.$swal({ 
          text:'목록을 조회해주세요.',
          width:300,
          type:'warning',
          allowOutsideClick: false
        });
      }
    },
    findAgentName(agentseq) {
      let agent = this.agentlist.find((agent) => agent.agentseq == agentseq);
      try {
        return agent.name;
      }
      catch {
        return "";
      }
    },
    convBrand(val) {
      return val == '0803223300' ? '2R' : '4R';
    },
    formatYMDHMS(date) {
      return makeDateTime(new Date(date));
    },
    commitTyping(e) {
      this.detail = e.target.value;
    },
    async detailHistory(idx) {
      console.log('[components-ContactSmsHistory] detailHistory : ', idx);
    },
    async loadData() {
      let self = this;

      self.contacts = [];
      await axios.get(process.env.VUE_APP_API_URL + '/api/agent/3')
      .then(function (res) {
          if(res.data.result === true) {
              self.agentlist = res.data.items;
          }
      });

      this.smsData = await fetchSmsList({
        selectColumns: {
          columns: ['regDt', 'regUser', 'extVal1', 'extVal2', 'extVal3', 'extVal4'],
          decColumns: ['title','content']
        },
        whereColumns: {
          cmsSeq: 19,
          regDt: makeDate(self.date)
        },
        reqPage: 1,
        pagePerCount: 999
      }).then((response) => { console.log('[Components-ContactSmsHistory] response : ', response);  return response.data.items; })
        .catch((error) => { console.log('[Components-ContactSmsHistory] ERROR : ', error);  return [];});

      if(this.smsData.length <= 0 ) {
        this.$swal({ 
          title: '데이터 확인필요',
          text: '기간을 확인해주세요.',
          confirmButtonText: '확인',
          width: 350,
          icon: 'warning',
          allowOutsideClick: false
        });
      }
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
.contact-history-view {
  text-align:left;
  height: 780px;
  overflow-y: auto;
}
.table-colored-bordered.table-bordered-info thead th {
  color:#000030;
  font-weight:600;
  text-align: center;
  background-color: #f0f0f2;
}
</style>