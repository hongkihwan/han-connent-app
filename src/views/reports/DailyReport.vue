<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">문의유형별 통계</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>통계구분</span>
              <select class="form-control" style="width:150px;margin-left:20px;">
                <option value="0">2R 모터사이클</option>
                <option></option>
              </select>
              <date-picker style="margin-left:20px;margin-right: 20px;" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              <button class="btn btn-primary" style="margin-left:5px;">조회</button>
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
      date: new Date(),
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