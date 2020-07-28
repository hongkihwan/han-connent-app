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
              <button class="btn btn-primary" style="margin-left:5px;" @click="selectData">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
          </div>
      
          <table id="callhist" class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px; table-layout:fixed;">
            <thead>
                <tr>
                  <!-- th rowspan="2">AgentName</th -->
                  <th style="width:60px;">순서</th>
                  <th style="width:140px; text-align:center;">통화일자</th>
                  <th style="width:140px; text-align:center;">종료시간</th>
                  <th style="width:80px;">상담사</th>                            
                  <th style="width:100px; text-align:center;">전화번호</th>
                  <th style="width:80px;">고객명</th>
                  <th style="width:90px;">통화유형</th>
                  <th style="width:90px;">인입구분</th>
                  <th style="width:90px;">차량종류</th>
                  <th style="width:90px;">통화결과</th>
                  <th style="width:140px;">대분류</th>
                  <th style="width:80px;">중분류</th>
                  <th style="width:125px;">소분류</th>
                  <th style="text-align:center;">통화메모</th>
                </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      range: {
        start: new Date(2018, 0, 16), // Jan 16th, 2018
        end: new Date(2018, 0, 19)    // Jan 19th, 2018
      }
    }
  },
  methods: {

    selectData() {
      //<span>{{ $moment(item.regDt).format('YYYY-MM-DD HH:mm:ss')
      console.log('[Select RANGE DATE] : ', this.makeDate(this.range.start), this.makeDate(this.range.end));
    },
    makeDate(date) {
      let dateMake = new Date(date);
      let year = dateMake.getFullYear();
      let month = dateMake.getMonth() + 1;
      let day = dateMake.getDate();

      if (month < 10) {
          month = '0' + month.toString();
      }

      if (day < 10) {
          day = '0' + day.toString();
      }
      return year.toString() + month.toString() + day.toString();
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
</style>